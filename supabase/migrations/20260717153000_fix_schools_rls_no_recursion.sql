-- Fix RLS: avoid policy helpers that re-query the same tables.
-- school_members: see your own rows (user_id = auth.uid()).
-- schools: see if you have a membership row (simple EXISTS, no recursion).

drop policy if exists schools_select_member on public.schools;
drop policy if exists schools_update_admin on public.schools;
drop policy if exists school_members_select_member on public.school_members;
drop policy if exists school_members_select_own on public.school_members;

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

-- Keep private helpers for later admin checks; not required for these policies.
