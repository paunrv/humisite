-- SUPERSEDED. Do not run on new projects.
-- Use 20260717152000_schools_clean_reset.sql (applied on humi-sistema).
-- Kept only as history of the partial-migration recovery attempt.

create schema if not exists private;

revoke all on schema private from public;
revoke all on schema private from anon;
grant usage on schema private to postgres, service_role, authenticated;

do $$ begin
  create type public.school_status as enum ('active', 'inactive');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.school_role as enum ('school_admin', 'coach');
exception when duplicate_object then null;
end $$;

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2),
  city text,
  status public.school_status not null default 'active',
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.school_members (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.school_role not null default 'coach',
  created_at timestamptz not null default now(),
  unique (school_id, user_id)
);

-- If an earlier partial schema created role/status as text, cast via ::text first
do $$
declare
  v_role_udt text;
  v_status_udt text;
begin
  select udt_name into v_role_udt
  from information_schema.columns
  where table_schema = 'public' and table_name = 'school_members' and column_name = 'role';

  if v_role_udt is not null and v_role_udt is distinct from 'school_role' then
    alter table public.school_members alter column role drop default;
    alter table public.school_members
      alter column role type public.school_role
      using (
        case role::text
          when 'school_admin' then 'school_admin'::public.school_role
          when 'coach' then 'coach'::public.school_role
          else 'coach'::public.school_role
        end
      );
    alter table public.school_members
      alter column role set default 'coach'::public.school_role;
  end if;

  select udt_name into v_status_udt
  from information_schema.columns
  where table_schema = 'public' and table_name = 'schools' and column_name = 'status';

  if v_status_udt is not null and v_status_udt is distinct from 'school_status' then
    alter table public.schools alter column status drop default;
    alter table public.schools
      alter column status type public.school_status
      using (
        case status::text
          when 'active' then 'active'::public.school_status
          when 'inactive' then 'inactive'::public.school_status
          else 'active'::public.school_status
        end
      );
    alter table public.schools
      alter column status set default 'active'::public.school_status;
  end if;
end $$;

create index if not exists school_members_user_id_idx on public.school_members (user_id);
create index if not exists school_members_school_id_idx on public.school_members (school_id);

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
  values (v_school.id, auth.uid(), 'school_admin');

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

alter table public.schools enable row level security;
alter table public.school_members enable row level security;

grant select, update on public.schools to authenticated;
grant select on public.school_members to authenticated;

drop policy if exists schools_select_member on public.schools;
drop policy if exists schools_update_admin on public.schools;
drop policy if exists school_members_select_member on public.school_members;

create policy schools_select_member
  on public.schools
  for select
  to authenticated
  using (private.is_school_member(id));

create policy schools_update_admin
  on public.schools
  for update
  to authenticated
  using (private.has_school_role(id, array['school_admin'::public.school_role]::public.school_role[]))
  with check (private.has_school_role(id, array['school_admin'::public.school_role]::public.school_role[]));

create policy school_members_select_member
  on public.school_members
  for select
  to authenticated
  using (private.is_school_member(school_id));
