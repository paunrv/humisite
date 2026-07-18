-- =============================================================================
-- HUMI Sistema × Supabase — integration hardening (safe, idempotent)
-- Target user: humi.tkd@gmail.com
-- UID: 7453c9ef-850b-4d2a-b2f2-3518ff7ffae1
--
-- Makes the DB match what humi-sistema expects:
--   schools(id, name, slug, city, whatsapp)
--   school_members(school_id, user_id, role text in owner|admin|instructor)
--   my_schools() + non-recursive RLS
--   membership row for the owner user
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- A) schools: required columns for humi-sistema
-- ---------------------------------------------------------------------------
alter table public.schools add column if not exists slug text;
alter table public.schools add column if not exists whatsapp text;
alter table public.schools add column if not exists created_at timestamptz default now();

-- Backfill slug for any school missing it
update public.schools
set slug = 'humi-ensenada-' || substr(replace(id::text, '-', ''), 1, 8)
where slug is null or btrim(slug) = '';

-- Prefer a stable slug for the first school
update public.schools s
set slug = 'humi-ensenada'
where s.id = (select id from public.schools order by created_at nulls last limit 1)
  and not exists (
    select 1 from public.schools x where x.slug = 'humi-ensenada' and x.id <> s.id
  );

create unique index if not exists schools_slug_key on public.schools (slug);

-- ---------------------------------------------------------------------------
-- B) school_members.role → text roles used by humi-sistema
-- ---------------------------------------------------------------------------
do $$
declare
  v_udt text;
begin
  select c.udt_name into v_udt
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'school_members'
    and c.column_name = 'role';

  if v_udt is null then
    raise exception 'school_members.role column missing — apply base schema first';
  end if;

  if v_udt is distinct from 'text' then
    -- Drop policies that may reference enum comparisons
    drop policy if exists schools_update_admin on public.schools;
    drop policy if exists schools_select_member on public.schools;
    drop policy if exists school_members_select_own on public.school_members;
    drop policy if exists school_members_select_member on public.school_members;
    drop policy if exists member_self on public.school_members;
    drop policy if exists staff_sel on public.schools;

    alter table public.school_members alter column role drop default;

    alter table public.school_members
      alter column role type text
      using (
        case role::text
          when 'school_admin' then 'owner'
          when 'coach' then 'instructor'
          when 'owner' then 'owner'
          when 'admin' then 'admin'
          when 'instructor' then 'instructor'
          else 'owner'
        end
      );
  end if;
end $$;

alter table public.school_members alter column role set default 'instructor';

do $$
begin
  alter table public.school_members
    drop constraint if exists school_members_role_check;
  alter table public.school_members
    add constraint school_members_role_check
    check (role in ('owner', 'admin', 'instructor'));
exception
  when others then
    -- If constraint name differs, ensure values are valid then re-add
    update public.school_members
    set role = case
      when role in ('owner', 'admin', 'instructor') then role
      when role in ('school_admin') then 'owner'
      when role in ('coach') then 'instructor'
      else 'owner'
    end;
    alter table public.school_members
      drop constraint if exists school_members_role_check;
    alter table public.school_members
      add constraint school_members_role_check
      check (role in ('owner', 'admin', 'instructor'));
end $$;

-- Ensure uniqueness for membership (humi-sistema PK)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.school_members'::regclass
      and contype = 'u'
      and pg_get_constraintdef(oid) ilike '%school_id%user_id%'
  ) and not exists (
    select 1 from pg_constraint
    where conrelid = 'public.school_members'::regclass
      and contype = 'p'
      and pg_get_constraintdef(oid) ilike '%school_id%user_id%'
  ) then
    alter table public.school_members
      add constraint school_members_school_user_key unique (school_id, user_id);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- C) Helper used by humi-sistema RLS
-- ---------------------------------------------------------------------------
create or replace function public.my_schools()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select m.school_id
  from public.school_members m
  where m.user_id = auth.uid();
$$;

revoke all on function public.my_schools() from public;
grant execute on function public.my_schools() to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- D) RLS — simple, non-recursive, compatible with humi-sistema
-- ---------------------------------------------------------------------------
alter table public.schools enable row level security;
alter table public.school_members enable row level security;

drop policy if exists schools_select_member on public.schools;
drop policy if exists schools_update_admin on public.schools;
drop policy if exists school_members_select_own on public.school_members;
drop policy if exists school_members_select_member on public.school_members;
drop policy if exists member_self on public.school_members;
drop policy if exists staff_sel on public.schools;

create policy member_self
  on public.school_members
  for select
  to authenticated
  using (user_id = auth.uid());

create policy staff_sel
  on public.schools
  for select
  to authenticated
  using (id in (select public.my_schools()));

grant select on public.schools to authenticated;
grant select on public.school_members to authenticated;

-- ---------------------------------------------------------------------------
-- E) Ensure school + link owner user
-- ---------------------------------------------------------------------------
do $$
declare
  v_user_id uuid := '7453c9ef-850b-4d2a-b2f2-3518ff7ffae1';
  v_school_id uuid;
begin
  if not exists (select 1 from auth.users where id = v_user_id) then
    raise exception 'Auth user % not found', v_user_id;
  end if;

  select id into v_school_id
  from public.schools
  where slug = 'humi-ensenada'
  limit 1;

  if v_school_id is null then
    select id into v_school_id
    from public.schools
    order by created_at nulls last
    limit 1;
  end if;

  if v_school_id is null then
    insert into public.schools (name, slug, city)
    values ('HUMI Ensenada', 'humi-ensenada', 'Ensenada')
    returning id into v_school_id;
  else
    update public.schools
    set
      name = coalesce(nullif(btrim(name), ''), 'HUMI Ensenada'),
      slug = coalesce(nullif(btrim(slug), ''), 'humi-ensenada'),
      city = coalesce(city, 'Ensenada')
    where id = v_school_id;
  end if;

  insert into public.school_members (school_id, user_id, role)
  values (v_school_id, v_user_id, 'owner')
  on conflict (school_id, user_id) do update
    set role = excluded.role;
end $$;

-- ---------------------------------------------------------------------------
-- F) Verification report — every `ok` should be true; membership row must show
-- ---------------------------------------------------------------------------
select
  'schools.slug' as check_name,
  exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'schools' and column_name = 'slug'
  ) as ok
union all
select
  'schools.whatsapp',
  exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'schools' and column_name = 'whatsapp'
  )
union all
select
  'role_is_text',
  exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'school_members'
      and column_name = 'role' and udt_name = 'text'
  )
union all
select
  'my_schools_fn',
  to_regprocedure('public.my_schools()') is not null
union all
select
  'member_linked',
  exists (
    select 1 from public.school_members
    where user_id = '7453c9ef-850b-4d2a-b2f2-3518ff7ffae1'
  );

-- Membership detail (this is what the app reads)
select
  u.email,
  sm.role,
  s.slug,
  s.name,
  s.city
from public.school_members sm
join public.schools s on s.id = sm.school_id
join auth.users u on u.id = sm.user_id
where sm.user_id = '7453c9ef-850b-4d2a-b2f2-3518ff7ffae1';
