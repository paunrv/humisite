# Arquitectura HUMI-tec (validada)

Marca academia **HUMI** · Marca software **HUMI-tec** · Sitio piloto [humisite.vercel.app](https://humisite.vercel.app/)

Este documento valida las decisiones del plan de arquitectura. Fuente de verdad de producto/DB: **humi-sistema**. Este repo (humisite) hospeda marketing academia + landing SaaS `/tec`.

## Superficies

| Ruta | Superficie | Repo |
|------|------------|------|
| `/` | Academia HUMI (familias) | humisite |
| `/tec` | Landing HUMI-tec + planes + acceso | humisite |
| `/login`, `/signup` | Auth (puerta compartida) | humisite → producto |
| `/app` | Admin escuela / portal | humi-sistema (canónico) |
| `/agrupacion` | Enterprise (org master) | humi-sistema |

Escalado futuro (sin cambiar modelo de datos): subdominio `tec.` / dominio propio HUMI-tec.

**URL producto (piloto jul 2026):** `https://humi-sistema.vercel.app` — `app.humi.mx` pendiente DNS. Ver [`PILOTO_PUERTA_SAAS.md`](./PILOTO_PUERTA_SAAS.md).

## Tenancy

```
organizations (enterprise)
  └── schools (tenant operativo, sport_type)
        ├── school_members (owner | admin | instructor)
        ├── students / groups / attendance
        └── cobranza alumno (feature escuela)
subscriptions → billing_owner = school | organization
```

- **Escuela:** paga su propia suscripción.
- **Enterprise:** org paga; schools afiliadas heredan entitlement vía `organization_id`.
- **HUMI internal:** tenant `humi-ensenada` con plan `comped` en piloto.
- Mínimo enterprise: **10 escuelas** (cohort WTU BC ≥15).

## Billing

- Pasarela piloto: **Stripe Billing** (mensual/anual).
- CFDI México: offline al inicio.
- Separar siempre: cobro SaaS (HUMI-tec) vs mensualidad alumno (ops de la escuela).
- Price IDs y montos: [`HUMI_TEC_PRICING.md`](./HUMI_TEC_PRICING.md) · código [`src/lib/humi-tec/pricing.ts`](../src/lib/humi-tec/pricing.ts).

## Seguridad

- RLS en tablas de tenant; no autorizar con `user_metadata`.
- Entitlement: `active` / `trialing` en school, o org enterprise activa.
- Invites enterprise: token one-time.

## Timeline piloto

| Ventana | Objetivo |
|---------|----------|
| Semana 20 jul 2026 | Admin HUMI estable |
| Semana 27 jul 2026 | Portal alumno mínimo |
| Agosto 2026 | Números reales en HUMI |
| Post-estabilización | Enterprise WTU Baja California |

No abrir cohort WTU hasta estabilizar un tenant (bug ×15 escuelas).

## Docs relacionadas

- [`REPO_SPLIT.md`](./REPO_SPLIT.md)
- [`HUMI_TEC_EPICS.md`](./HUMI_TEC_EPICS.md)
- [`HUMI_TEC_PRICING.md`](./HUMI_TEC_PRICING.md)
- Copy landing: [`src/lib/humi-tec/copy.ts`](../src/lib/humi-tec/copy.ts)
