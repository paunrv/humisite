-- Link YOUR login to a school (fixes "SIN ESCUELA" in humi-sistema).
--
-- Steps:
-- 1) Authentication → Users → copy your user UUID
-- 2) Replace the UUID below
-- 3) Run this whole script

-- Optional: list users
-- select id, email, created_at from auth.users order by created_at desc;

do $$
declare
  -- >>> PASTE your auth user id here <<<
  v_user_id uuid := '00000000-0000-0000-0000-000000000000';
  v_school_id uuid;
  v_has_slug boolean;
  v_role_type text;
begin
  if v_user_id = '00000000-0000-0000-0000-000000000000'::uuid then
    raise exception 'Paste your real auth.users.id into v_user_id';
  end if;

  if not exists (select 1 from auth.users where id = v_user_id) then
    raise exception 'User % not found in auth.users', v_user_id;
  end if;

  select exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'schools' and column_name = 'slug'
  ) into v_has_slug;

  select c.udt_name into v_role_type
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'school_members'
    and c.column_name = 'role';

  -- Ensure a school exists
  select id into v_school_id from public.schools order by created_at nulls last limit 1;

  if v_school_id is null then
    if v_has_slug then
      insert into public.schools (name, slug, city)
      values ('HUMI Ensenada', 'humi-ensenada', 'Ensenada')
      returning id into v_school_id;
    else
      insert into public.schools (name, city)
      values ('HUMI Ensenada', 'Ensenada')
      returning id into v_school_id;
    end if;
  end if;

  -- Insert membership with role compatible with current column type
  if v_role_type = 'school_role' then
    insert into public.school_members (school_id, user_id, role)
    values (v_school_id, v_user_id, 'school_admin'::public.school_role)
    on conflict (school_id, user_id) do update set role = excluded.role;
  else
    -- humi-sistema original: text check ('owner','admin','instructor')
    insert into public.school_members (school_id, user_id, role)
    values (v_school_id, v_user_id, 'owner')
    on conflict (school_id, user_id) do update set role = excluded.role;
  end if;

  raise notice 'OK: user % → school % (role_type=%)', v_user_id, v_school_id, v_role_type;
end $$;

select sm.user_id, sm.role, s.id as school_id, s.name
from public.school_members sm
join public.schools s on s.id = sm.school_id;
