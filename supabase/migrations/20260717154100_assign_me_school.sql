-- Assign the currently logged-in Auth user to a school (run in SQL Editor
-- while... actually SQL Editor runs as postgres, NOT as your app user).
--
-- So: paste YOUR auth user uuid below (Authentication → Users → copy id).

-- 1) Put your user id here:
-- select id, email from auth.users order by created_at desc limit 20;

do $$
declare
  v_user_id uuid := null; -- <<< PASTE UUID e.g. 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
  v_school_id uuid;
begin
  if v_user_id is null then
    raise exception 'Set v_user_id to your auth.users.id before running';
  end if;

  -- Reuse first school or create one
  select id into v_school_id from public.schools order by created_at asc limit 1;

  if v_school_id is null then
    insert into public.schools (name, city, created_by)
    values ('HUMI Taekwondo', 'Ensenada', v_user_id)
    returning id into v_school_id;
  end if;

  insert into public.school_members (school_id, user_id, role)
  values (v_school_id, v_user_id, 'school_admin'::public.school_role)
  on conflict (school_id, user_id) do update
    set role = excluded.role;

  raise notice 'Linked user % to school %', v_user_id, v_school_id;
end $$;

-- Verify:
-- select sm.*, s.name
-- from school_members sm
-- join schools s on s.id = sm.school_id;
