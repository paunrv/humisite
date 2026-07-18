# Repos HUMI — separación

## Este repo = marketing

| | |
|--|--|
| **Repo** | [`paunrv/humisite`](https://github.com/paunrv/humisite) |
| **Qué es** | Landing, blog, SEO, intro cinematográfico |
| **Deploy** | Vercel (sitio público) |

## Producto = humi-sistema

| | |
|--|--|
| **Repo** | [`paunrv/humi-sistema`](https://github.com/paunrv/humi-sistema) |
| **Remote** | `git@github.com:paunrv/humi-sistema.git` |
| **Qué es** | Admin escuela, cobranza, alumnos, enterprise |
| **Issues** | https://github.com/paunrv/humi-sistema/issues |
| **DB** | Supabase `humi-sistema` — migraciones solo allá |

## Importante

- Las rutas `/app`, `/login`, `/signup` y carpetas `supabase/migrations` experimentales en este repo **no** son la fuente de verdad del producto.
- Roadmap y épicas abiertas se movieron a **humi-sistema** (2026-07-17).
- No aplicar SQL de este repo sobre la DB de producción del sistema.

Ver también: `humi-sistema/docs/REPO_SPLIT.md`.
