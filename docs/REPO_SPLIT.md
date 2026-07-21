# Repos HUMI — separación

## Este repo = marketing + puerta SaaS

| | |
|--|--|
| **Repo** | [`paunrv/humisite`](https://github.com/paunrv/humisite) |
| **Qué es** | Landing academia HUMI, blog, SEO, intro cinematográfico, **landing HUMI-tec (`/tec`)** |
| **Deploy** | Vercel ([humisite.vercel.app](https://humisite.vercel.app/)) |

## Producto = humi-sistema

| | |
|--|--|
| **Repo** | [`paunrv/humi-sistema`](https://github.com/paunrv/humi-sistema) |
| **Remote** | `git@github.com:paunrv/humi-sistema.git` |
| **Qué es** | Admin escuela, portal alumno, cobranza alumno, enterprise, Stripe |
| **Issues** | https://github.com/paunrv/humi-sistema/issues |
| **DB** | Supabase `humi-sistema` — migraciones solo allá |

## Marcas

| Marca | Superficie |
|-------|------------|
| **HUMI** | Academia taekwondo (`/`) |
| **HUMI-tec** | Software multi-academia (`/tec` + app) |

## Importante

- Las rutas `/app`, `/login`, `/signup` redirigen a **humi-sistema** (`NEXT_PUBLIC_PRODUCT_URL`, default piloto `https://humi-sistema.vercel.app`; marca `https://app.humi.mx` cuando DNS esté listo). El stub local no es la fuente de verdad.
- Puerta piloto + 49 alumnos: [`PILOTO_PUERTA_SAAS.md`](./PILOTO_PUERTA_SAAS.md).
- Carpetas `supabase/migrations` experimentales en este repo **no** son la fuente de verdad del producto.
- Arquitectura validada: [`HUMI_TEC_ARCHITECTURE.md`](./HUMI_TEC_ARCHITECTURE.md)
- EPICs: [`HUMI_TEC_EPICS.md`](./HUMI_TEC_EPICS.md)
- Precios: [`HUMI_TEC_PRICING.md`](./HUMI_TEC_PRICING.md)
- No aplicar SQL de este repo sobre la DB de producción del sistema.

Ver también: `humi-sistema/docs/REPO_SPLIT.md`.
