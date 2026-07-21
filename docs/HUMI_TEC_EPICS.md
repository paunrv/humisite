# EPICs HUMI-tec

Criterios de aceptación (DoD) anclados al timeline piloto. Issues de implementación de producto viven en **humi-sistema**; landing/marketing en **humisite**.

**Piloto puerta + 49 alumnos (jul 2026):** ver runbooks en [`PILOTO_PUERTA_SAAS.md`](./PILOTO_PUERTA_SAAS.md).

---

## Ciclo piloto — EP-0 … EP-5 (puerta → 49 alumnos)

### EP-0 — Puerta viva (humisite) — blocker

**Repo:** humisite  
**Ventana:** inmediato (jul 2026)

#### Scope
- CTA **Plataforma** / redirects `/login` `/signup` `/app` → deploy vivo de humi-sistema.
- Default piloto: `https://humi-sistema.vercel.app` (`app.humi.mx` sin DNS).

#### DoD
- [x] Código default y CTAs `/tec` apuntan a `humi-sistema.vercel.app`.
- [ ] Env Vercel humisite + redeploy confirmados.
- [ ] Desde cualquier PC: home → Plataforma → login producto (HTTP 200).
- [ ] Login `humi.tkd@gmail.com` → `/workspace`.

---

### EP-1 — Dominio de marca `app.humi.mx`

**Repo:** DNS + Vercel (humi-sistema) + env humisite  
**Ventana:** cuando el dominio esté bajo control HUMI (no bloquea piloto)

#### DoD
- [ ] DNS + SSL; `https://app.humi.mx/login` → 200.
- [ ] Supabase allowlist + `NEXT_PUBLIC_PRODUCT_URL` actualizados.
- [ ] Misma sesión owner/alumnos vía dominio de marca.

---

### EP-2 — Owner HUMI operativo

**Repo:** humi-sistema  
**Ventana:** esta semana (antes de provisionar alumnos)

#### Scope
- Cuenta `humi.tkd@gmail.com` = owner de `humi-ensenada`.
- Ops: alumnos, grupos, asistencia, expediente.

#### DoD
- [ ] Login desde PC limpia vía humisite → workspace.
- [ ] Staff edita datos de ~49 alumnos sin SQL manual.
- [ ] Runbook de acceso publicado ([`PILOTO_PUERTA_SAAS.md`](./PILOTO_PUERTA_SAAS.md) § EP-2).

---

### EP-3 — Datos piloto + accesos 1×1

**Repo:** humi-sistema (+ ops admin HUMI)  
**Ventana:** esta semana → handoff papás **≤ 29 jul 2026**

#### Scope
- Admin corrige expedientes.
- Por alumno: email inscripción + password → Auth + `student_access` (sin invite masivo).

#### DoD
- [ ] 49 expedientes revisados.
- [ ] Accesos provisionados (o pendientes con motivo).
- [ ] Alumno/tutor → `/alumno` (no admin).
- [ ] Material de entrega a papás listo para el 29 jul.

---

### EP-4 — Portal alumno mínimo usable

**Repo:** humi-sistema  
**Ventana:** antes del 29 jul (paralelo a EP-3)

#### DoD
- [ ] Alumno/guardian entra sin ver admin de escuela.
- [ ] Ve historial de asistencia reciente.
- [ ] RLS: solo school + student link.
- [ ] Smoke ≥3 cuentas reales documentado antes del handoff.

---

### EP-5 — Hardening acceso público

**Repo:** humi-sistema (+ checklist humisite)  
**Ventana:** continuo; bloqueante si hay fuga entre tenants antes de papás

#### DoD
- [ ] Checklist “acceso desde cualquier PC” firmado (DNS, HTTPS, login, redirect).
- [ ] Advisors RLS críticos en verde para portal.
- [ ] Sin dependencia de localhost / cookies de un solo dispositivo.

---

## Orden piloto

```
EP-0 (humisite) → EP-2 (owner) → EP-3 + EP-4 → handoff papás 29 jul
EP-1 (dominio) cuando DNS listo · EP-5 continuo
```

---

## Roadmap producto (legacy E1–E7)

### E1 — Landing `/tec` + planes + acceso

**Repo:** humisite  
**Ventana:** antes del 20 jul 2026

#### Scope
- Página `/tec` con marca HUMI-tec, planes Escuela/Enterprise, CTAs registro/login.
- Enlace desde home academia (footer).
- Precios y copy centralizados en código.

#### DoD
- [x] `/tec` publica en el deploy Vercel.
- [x] Planes visibles (mensual/anual Escuela + Enterprise ≥10).
- [x] CTA “Iniciar sesión” → login producto; “Empezar” → signup/login producto.
- [x] Home footer enlaza a HUMI-tec.
- [x] `/tec` en sitemap.
- [x] URL de producto piloto corregida (`humi-sistema.vercel.app`; ver EP-0).
- [ ] Términos SaaS legales (borrador aceptable post-piloto).

---

### E2 — Billing Stripe

**Repo:** humi-sistema (+ env en ambos deploys)  
**Ventana:** agosto 2026 (después de ops reales en HUMI; HUMI usa `comped`)

#### Scope
- Products/Prices Stripe alineados a [`HUMI_TEC_PRICING.md`](./HUMI_TEC_PRICING.md).
- Checkout Escuela (mensual/anual) y Enterprise.
- Webhooks → `subscriptions` + entitlements.
- Customer Portal para cambiar/cancelar.

#### DoD
- [ ] Price IDs en env de producción.
- [ ] Checkout crea/actualiza subscription en DB.
- [ ] School sin pago (y sin org enterprise) no entra a `/app` (salvo `comped` / trial).
- [ ] Enterprise: una factura en org; schools hijas sin paywall propio.
- [ ] Webhook idempotente; logs auditables.

---

### E3 — Admin school piloto (HUMI)

**Repo:** humi-sistema  
**Ventana:** semana **20 jul 2026** · **superseded en ops por EP-2 / EP-3**

#### Scope
- Tenant `humi-ensenada`: alumnos, grupos, asistencia base, roles owner/admin/instructor.
- Staff opera el día a día sin Excel crítico.

#### DoD
- [ ] Login staff → workspace con escuela correcta.
- [ ] CRUD alumnos + asignación a grupos.
- [ ] Pasar lista (attendance sessions/records) usable en clase.
- [ ] Roles: instructor no ve billing SaaS; admin/owner sí ven ops.
- [ ] Cero SQL manual para el staff HUMI.

---

### E4 — Portal alumno

**Repo:** humi-sistema  
**Ventana:** semana **27 jul 2026** · **alineado a EP-3 / EP-4** · handoff papás **29 jul 2026**

#### Scope
- Portal mínimo: login alumno/tutor, ver asistencias, aviso, estado de pago alumno (si existe).
- **Acceso:** la academia define contraseña; el alumno/familia entra con el correo de inscripción (oficina).

#### Flujo de acceso
1. En expediente admin: email de inscripción + contraseña (o generar).
2. Sistema crea/actualiza usuario Auth + `student_access`.
3. Login en `/login` → workspace → Portal alumno (`/alumno`).

#### DoD
- [x] Academia puede provisionar email + password desde expediente.
- [ ] Alumno/guardian entra sin ver admin de escuela.
- [ ] Ve historial de asistencia reciente.
- [ ] Feedback de ≥5 familias documentado (qué falta para agosto).
- [ ] RLS: solo datos de su school + su student link.

---

### E5 — Enterprise org + invites WTU

**Repo:** humi-sistema  
**Ventana:** prep agosto · cohort **post-estabilización** (≥15 escuelas WTU BC)

#### Scope
- `organizations`, `org_members`, invites one-time.
- Dashboard org: listar escuelas, invitar, métricas básicas.
- Gate mínimo 10 schools para tier enterprise.

#### DoD
- [ ] Org owner crea/gestiona organización.
- [ ] Invite &lt; 2 min por escuela (email o link).
- [ ] School admin acepta → membership + school bajo org.
- [ ] Billing solo en org; escuelas afiliadas no ven “paga tu plan”.
- [ ] Ensayo interno con ≥3 schools fantasma antes de WTU.
- [ ] Runbook onboarding WTU BC (pasos + roles + soporte).

---

### E6 — Hardening RLS / entitlements

**Repo:** humi-sistema  
**Ventana:** continuo; bloqueante antes de WTU · **alineado a EP-5**

#### DoD
- [ ] Toda tabla tenant con RLS; advisors Supabase en verde crítico.
- [ ] Helpers `my_schools()` / `my_orgs()` sin recursión de policies.
- [ ] Tests o checklist: usuario A no lee school B.
- [ ] Entitlement centralizado (función o claim fresco, no solo UI).

---

### E7 — Multi-vertical `sport_type`

**Repo:** humi-sistema (+ copy `/tec`)  
**Ventana:** post primer cohort TKD

#### Scope
- Campo `sport_type` en schools; feature flags por módulo.
- Landing `/tec` ya habla “academias” (no solo taekwondo).

#### DoD
- [ ] Schema admite sport_type (taekwondo default).
- [ ] UI admin no hardcodea “dojang/cinta” en strings críticos (o i18n por vertical).
- [ ] Segundo vertical piloto definido (ballet / gym / fútbol / tenis) sin migrar tenancy.

---

## Orden de ejecución (roadmap completo)

```
EP-0 (puerta) → EP-2 (owner) → EP-3 + EP-4 (49 alumnos / portal) → handoff 29 jul
→ EP-5 hardening · EP-1 dominio marca
→ E2 Stripe + E5 Enterprise (WTU) → E7 multi-vertical
```

E1 + EP-0 se entregan en este repo. EP-2–EP-5 y E2–E7 de producto se trackean en humi-sistema (+ ops admin).
