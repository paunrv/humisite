-- =============================================================================
-- CLEAN RESET: schools domain (M1 / #13)
-- Use this on a fresh/empty project after partial failed migrations.
-- Drops ONLY school-related objects, then recreates a consistent schema.
-- =============================================================================

-- 1) Tear down (order: RPC → helpers → tables → types)
drop function if exists public.create_school(text, text) cascade;
drop function if exists private.create_school(text, text) cascade;
drop function if exists private.has_school_role(uuid, public.school_role[]) cascade;
drop function if exists private.is_school_member(uuid) cascade;

-- has_school_role may exist with different signatures from failed runs
do $$
declare r record;
begin
  for r in
    select n.nspname, p.proname, pg_get_function_identity_arguments(p.oid) as args
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname in ('public', 'private')
      and p.proname in ('create_school', 'has_school_role', 'is_school_member')
  loop
    execute format('drop function if exists %I.%I(%s) cascade', r.nspname, r.proname, r.args);
  end loop;
end $$;

drop table if exists public.school_members cascade;
drop table if exists public.schools cascade;

drop type if exists public.school_role cascade;
drop type if exists public.school_status cascade;

-- 2) Private schema for security-definer helpers
create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon;
grant usage on schema private to postgres, service_role, authenticated;

-- 3) Types
create type public.school_status as enum ('active', 'inactive');
create type public.school_role as enum ('school_admin', 'coach');

-- 4) Tables (role/status are enums from day one — no text→enum migration)
create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2),
  city text,
  status public.school_status not null default 'active'::public.school_status,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.school_members (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.school_role not null default 'coach'::public.school_role,
  created_at timestamptz not null default now(),
  unique (school_id, user_id)
);

create index school_members_user_id_idx on public.school_members (user_id);
create index school_members_school_id_idx on public.school_members (school_id);

-- 5) Helpers (private) — compare enum to enum only
create or replace function private.is_school_member(p_school_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.school_members m
    where m.school_id = p_school_id
      and m.user_id = auth.uid()
  );
$$;

create or replace function private.has_school_role(
  p_school_id uuid,
  p_roles public.school_role[]
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.school_members m
    where m.school_id = p_school_id
      and m.user_id = auth.uid()
      and m.role = any (p_roles)
  );
$$;

revoke all on function private.is_school_member(uuid) from public;
revoke all on function private.has_school_role(uuid, public.school_role[]) from public;
grant execute on function private.is_school_member(uuid) to authenticated, service_role;
grant execute on function private.has_school_role(uuid, public.school_role[]) to authenticated, service_role;

create or replace function private.create_school(p_name text, p_city text default null)
returns public.schools
language plpgsql
security definer
set search_path = public
as $$
declare
  v_school public.schools;
  v_name text := trim(p_name);
  v_city text := nullif(trim(coalesce(p_city, '')), '');
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  if v_name is null or char_length(v_name) < 2 then
    raise exception 'School name must be at least 2 characters';
  end if;

  insert into public.schools (name, city, created_by)
  values (v_name, v_city, auth.uid())
  returning * into v_school;

  insert into public.school_members (school_id, user_id, role)
  values (v_school.id, auth.uid(), 'school_admin'::public.school_role);

  return v_school;
end;
$$;

revoke all on function private.create_school(text, text) from public;

create or replace function public.create_school(p_name text, p_city text default null)
returns public.schools
language sql
security definer
set search_path = public, private
as $$
  select * from private.create_school(p_name, p_city);
$$;

revoke all on function public.create_school(text, text) from public;
grant execute on function public.create_school(text, text) to authenticated;

-- 6) RLS
alter table public.schools enable row level security;
alter table public.school_members enable row level security;

grant select, update on public.schools to authenticated;
grant select on public.school_members to authenticated;

-- Non-recursive RLS (do not call helpers that re-query the same tables)
create policy school_members_select_own
  on public.school_members
  for select
  to authenticated
  using (user_id = auth.uid());

create policy schools_select_member
  on public.schools
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.school_members m
      where m.school_id = schools.id
        and m.user_id = auth.uid()
    )
  );

create policy schools_update_admin
  on public.schools
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.school_members m
      where m.school_id = schools.id
        and m.user_id = auth.uid()
        and m.role = 'school_admin'::public.school_role
    )
  )
  with check (
    exists (
      select 1
      from public.school_members m
      where m.school_id = schools.id
        and m.user_id = auth.uid()
        and m.role = 'school_admin'::public.school_role
    )
  );

-- 7) Sanity check (returns one row if OK)
select
  'schools.role_col' as check_name,
  (
    select c.udt_name
    from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name = 'school_members'
      and c.column_name = 'role'
  ) as role_udt,
  (
    select to_regprocedure('public.create_school(text,text)') is not null
  ) as create_school_exists;
