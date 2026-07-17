-- Optional: run this alone first if you want to see the broken state.
-- Does not change anything.

select
  c.table_name,
  c.column_name,
  c.data_type,
  c.udt_name,
  c.column_default
from information_schema.columns c
where c.table_schema = 'public'
  and c.table_name in ('schools', 'school_members')
order by c.table_name, c.ordinal_position;

select
  n.nspname as schema,
  p.proname as function,
  pg_get_function_identity_arguments(p.oid) as args
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname in ('public', 'private')
  and p.proname in ('create_school', 'has_school_role', 'is_school_member')
order by 1, 2;

select schemaname, tablename, policyname, cmd, qual
from pg_policies
where tablename in ('schools', 'school_members');
