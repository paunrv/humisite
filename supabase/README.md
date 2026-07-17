# Supabase

SQL migrations and project config for the HUMI school / enterprise app live here.

## Local CLI note

The bundled Supabase CLI binary may not run on older macOS. Prefer:

1. Create/link a project in the [Supabase Dashboard](https://supabase.com/dashboard)
2. Apply migrations via Dashboard SQL editor, or a newer CLI on CI / another machine
3. Put keys in `.env.local` (see root `.env.example`)

## Layout

| Path | Purpose |
|------|---------|
| `migrations/` | Versioned SQL (create with a descriptive timestamp name) |
| `config.toml` | Project config scaffold for when the CLI is available |

## First-time setup

1. Create a Supabase project
2. Copy `.env.example` → `.env.local` and set URL + publishable (or anon) key
3. `npm run dev` — marketing site works even before keys are set; `/app` needs keys once Auth lands
