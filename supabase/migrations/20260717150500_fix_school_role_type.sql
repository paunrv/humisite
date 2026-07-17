-- SUPERSEDED. Do not run. See 20260717152000_schools_clean_reset.sql.

do $$ begin
  create type public.school_status as enum ('active', 'inactive');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.school_role as enum ('school_admin', 'coach');
exception when duplicate_object then null;
end $$;

-- Normalize role column to enum if it still is text (or other)
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'school_members'
      and column_name = 'role'
      and udt_name = 'text'
  ) then
    alter table public.school_members
      alter column role drop default;

    alter table public.school_members
      alter column role type public.school_role
      using (
        case
          when role in ('school_admin', 'coach') then role::public.school_role
          else 'coach'::public.school_role
        end
      );

    alter table public.school_members
      alter column role set default 'coach'::public.school_role;
  end if;
end $$;

-- Same for schools.status if needed
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'schools'
      and column_name = 'status'
      and udt_name = 'text'
  ) then
    alter table public.schools
      alter column status drop default;

    alter table public.schools
      alter column status type public.school_status
      using (
        case
          when status in ('active', 'inactive') then status::public.school_status
          else 'active'::public.school_status
        end
      );

    alter table public.schools
      alter column status set default 'active'::public.school_status;
  end if;
end $$;

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

grant execute on function private.has_school_role(uuid, public.school_role[]) to authenticated, service_role;
