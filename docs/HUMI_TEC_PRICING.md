# Precios HUMI-tec (MXN)

Precios de piloto comercial. Fuente en código: [`src/lib/humi-tec/pricing.ts`](../src/lib/humi-tec/pricing.ts).

Moneda: **MXN**. Impuestos: precios publicados como **precio final al cliente** en piloto (ajustar si se facturan con IVA desglosado).

## Plan Escuela

Una academia / school. Cargo automático Stripe.

| Intervalo | Precio | Equivalente |
|-----------|--------|-------------|
| Mensual | **$1,190 MXN** / mes | — |
| Anual | **$11,900 MXN** / año | ≈ $992 MXN/mes (2 meses de ahorro vs mensual) |

Incluye: admin escuela, alumnos, grupos, asistencia, portal alumno (según roadmap), soporte estándar.

## Plan Enterprise

Cuenta master (`organization`). Afilia schools. **Mínimo 10 escuelas** para activar.

| Intervalo | Precio | Mínimo (10 escuelas) |
|-----------|--------|----------------------|
| Mensual | **$890 MXN** / escuela / mes | **$8,900 MXN** / mes |
| Anual | **$8,900 MXN** / escuela / año | **$89,000 MXN** / año |

Incluye: billing centralizado, invites a escuelas, dashboard de agrupación, onboarding asistido (cohort WTU).

## HUMI internal

Tenant `humi-ensenada`: plan **`comped`** durante piloto (sin Checkout). No aparece como plan público.

## Stripe Products (placeholders)

Crear en Stripe Dashboard y pegar IDs en env:

| Env var | Producto |
|---------|----------|
| `STRIPE_PRICE_ESCUELA_MONTHLY` | Escuela mensual $1,190 |
| `STRIPE_PRICE_ESCUELA_YEARLY` | Escuela anual $11,900 |
| `STRIPE_PRICE_ENTERPRISE_MONTHLY` | Enterprise por escuela / mes $890 |
| `STRIPE_PRICE_ENTERPRISE_YEARLY` | Enterprise por escuela / año $8,900 |

Checkout y webhooks se implementan en **humi-sistema** (E2). En `/tec`, CTAs de pago apuntan a signup con `?plan=` hasta que exista Checkout.

## Revisión

Revisar precios tras primer cohort WTU BC (volumen ≥15) y feedback de willingness-to-pay.
