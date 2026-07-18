-- =============================================================================
-- Link owner by EMAIL (more reliable than hard-coded UUID)
-- Also prints who exists in auth.users so we can see mismatches.
-- =============================================================================

-- 0) Who is in Auth right now?
select id, email, created_at, last_sign_in_at
from auth.users
order by created_at desc
limit 20;

-- 1) Schema bits humi-sistema needs (idempotent, no auth hard-fail)
alter table public.schools add column if not exists slug text;
alter table public.schools add column if not exists whatsapp text;
alter table public.schools add column if not exists created_at timestamptz default now();

update public.schools
set slug = 'humi-ensenada-' || substr(replace(id::text, '-', ''), 1, 8)
where slug is null or btrim(slug) = '';

update public.schools s
set slug = 'humi-ensenada'
where s.id = (select id from public.schools order by created_at nulls last limit 1)
  and not exists (
    select 1 from public.schools x where x.slug = 'humi-ensenada' and x.id <> s.id
  );

create unique index if not exists schools_slug_key on public.schools (slug);

-- role → text for humi-sistema
do $$
declare
  v_udt text;
begin
  select c.udt_name into v_udt
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'school_members'
    and c.column_name = 'role';

  if v_udt is not null and v_udt is distinct from 'text' then
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
  update public.school_members
  set role = case
    when role in ('owner', 'admin', 'instructor') then role
    when role = 'school_admin' then 'owner'
    when role = 'coach' then 'instructor'
    else 'owner'
  end;

  alter table public.school_members drop constraint if exists school_members_role_check;
  alter table public.school_members
    add constraint school_members_role_check
    check (role in ('owner', 'admin', 'instructor'));
exception when others then
  raise notice 'role constraint step: %', SQLERRM;
end $$;

do $$
begin
  alter table public.school_members
    add constraint school_members_school_user_key unique (school_id, user_id);
exception
  when duplicate_table then null;
  when duplicate_object then null;
  when others then
    raise notice 'unique constraint: %', SQLERRM;
end $$;

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

-- 2) Link by email (and fallback: latest auth user)
do $$
declare
  v_user_id uuid;
  v_email text;
  v_school_id uuid;
begin
  select u.id, u.email into v_user_id, v_email
  from auth.users u
  where lower(u.email) = lower('humi.tkd@gmail.com')
  limit 1;

  if v_user_id is null then
    select u.id, u.email into v_user_id, v_email
    from auth.users u
    order by u.created_at desc nulls last
    limit 1;
  end if;

  if v_user_id is null then
    raise exception
      'No hay filas en auth.users. Estás en el proyecto/SQL correcto? Authentication → Users debe listar al menos un usuario.';
  end if;

  raise notice 'Linking % (%)', v_email, v_user_id;

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

-- 3) Verify
select
  'member_linked' as check_name,
  exists (select 1 from public.school_members) as ok
union all
select
  'schools.slug',
  exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'schools' and column_name = 'slug'
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
  to_regprocedure('public.my_schools()') is not null;

select u.email, sm.role, s.slug, s.name, s.city, sm.user_id
from public.school_members sm
join public.schools s on s.id = sm.school_id
join auth.users u on u.id = sm.user_id;
