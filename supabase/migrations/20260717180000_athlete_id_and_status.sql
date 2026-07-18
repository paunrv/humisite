-- #52 athlete public ID + pause timestamp for #49 (2-month → eliminated)
-- Run in Supabase SQL Editor if CLI unavailable.

alter table public.students
  add column if not exists athlete_id text;

alter table public.students
  add column if not exists paused_at timestamptz;

-- Backfill stable public IDs from uuid (deterministic, unique)
update public.students
set athlete_id = 'H' || upper(substr(replace(id::text, '-', ''), 1, 8))
where athlete_id is null or btrim(athlete_id) = '';

create unique index if not exists students_athlete_id_key
  on public.students (athlete_id);

alter table public.students
  alter column athlete_id set not null;

-- Auto-assign on insert
create or replace function public.students_set_athlete_id()
returns trigger
language plpgsql
as $$
begin
  if new.id is null then
    new.id := gen_random_uuid();
  end if;
  if new.athlete_id is null or btrim(new.athlete_id) = '' then
    new.athlete_id := 'H' || upper(substr(replace(new.id::text, '-', ''), 1, 8));
  end if;
  return new;
end;
$$;

drop trigger if exists trg_students_athlete_id on public.students;
create trigger trg_students_athlete_id
  before insert on public.students
  for each row
  execute function public.students_set_athlete_id();

-- Track pause start for 2-month rule
create or replace function public.students_track_paused_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'paused' and (old.status is distinct from 'paused') then
    new.paused_at := coalesce(new.paused_at, now());
  end if;
  if new.status is distinct from 'paused' then
    new.paused_at := null;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_students_paused_at on public.students;
create trigger trg_students_paused_at
  before update of status on public.students
  for each row
  execute function public.students_track_paused_at();

-- Verify
select athlete_id, full_name, status, paused_at
from public.students
order by full_name
limit 10;
