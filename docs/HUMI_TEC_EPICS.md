# EPICs HUMI-tec

Criterios de aceptación (DoD) anclados al timeline piloto. Issues de implementación de producto viven en **humi-sistema**; landing/marketing en **humisite**.

---

## E1 — Landing `/tec` + planes + acceso

**Repo:** humisite  
**Ventana:** antes del 20 jul 2026

### Scope
- Página `/tec` con marca HUMI-tec, planes Escuela/Enterprise, CTAs registro/login.
- Enlace desde home academia (footer).
- Precios y copy centralizados en código.

### DoD
- [x] `/tec` publica en el deploy Vercel.
- [x] Planes visibles (mensual/anual Escuela + Enterprise ≥10).
- [x] CTA “Iniciar sesión” → `/login`; “Empezar” → `/signup`.
- [x] Home footer enlaza a HUMI-tec.
- [x] `/tec` en sitemap.
- [ ] Términos SaaS legales (borrador aceptable post-piloto).

---

## E2 — Billing Stripe

**Repo:** humi-sistema (+ env en ambos deploys)  
**Ventana:** agosto 2026 (después de ops reales en HUMI; HUMI usa `comped`)

### Scope
- Products/Prices Stripe alineados a [`HUMI_TEC_PRICING.md`](./HUMI_TEC_PRICING.md).
- Checkout Escuela (mensual/anual) y Enterprise.
- Webhooks → `subscriptions` + entitlements.
- Customer Portal para cambiar/cancelar.

### DoD
- [ ] Price IDs en env de producción.
- [ ] Checkout crea/actualiza subscription en DB.
- [ ] School sin pago (y sin org enterprise) no entra a `/app` (salvo `comped` / trial).
- [ ] Enterprise: una factura en org; schools hijas sin paywall propio.
- [ ] Webhook idempotente; logs auditables.

---

## E3 — Admin school piloto (HUMI)

**Repo:** humi-sistema  
**Ventana:** semana **20 jul 2026**

### Scope
- Tenant `humi-ensenada`: alumnos, grupos, asistencia base, roles owner/admin/instructor.
- Staff opera el día a día sin Excel crítico.

### DoD
- [ ] Login staff → `/app` con escuela correcta.
- [ ] CRUD alumnos + asignación a grupos.
- [ ] Pasar lista (attendance sessions/records) usable en clase.
- [ ] Roles: instructor no ve billing SaaS; admin/owner sí ven ops.
- [ ] Cero SQL manual para el staff HUMI.

---

## E4 — Portal alumno

**Repo:** humi-sistema  
**Ventana:** semana **27 jul 2026**

### Scope
- Portal mínimo: login alumno/tutor, ver asistencias, aviso, estado de pago alumno (si existe).

### DoD
- [ ] Alumno/guardian entra sin ver admin de escuela.
- [ ] Ve historial de asistencia reciente.
- [ ] Feedback de ≥5 familias documentado (qué falta para agosto).
- [ ] RLS: solo datos de su school + su student link.

---

## E5 — Enterprise org + invites WTU

**Repo:** humi-sistema  
**Ventana:** prep agosto · cohort **post-estabilización** (≥15 escuelas WTU BC)

### Scope
- `organizations`, `org_members`, invites one-time.
- Dashboard org: listar escuelas, invitar, métricas básicas.
- Gate mínimo 10 schools para tier enterprise.

### DoD
- [ ] Org owner crea/gestiona organización.
- [ ] Invite &lt; 2 min por escuela (email o link).
- [ ] School admin acepta → membership + school bajo org.
- [ ] Billing solo en org; escuelas afiliadas no ven “paga tu plan”.
- [ ] Ensayo interno con ≥3 schools fantasma antes de WTU.
- [ ] Runbook onboarding WTU BC (pasos + roles + soporte).

---

## E6 — Hardening RLS / entitlements

**Repo:** humi-sistema  
**Ventana:** continuo; bloqueante antes de WTU

### DoD
- [ ] Toda tabla tenant con RLS; advisors Supabase en verde crítico.
- [ ] Helpers `my_schools()` / `my_orgs()` sin recursión de policies.
- [ ] Tests o checklist: usuario A no lee school B.
- [ ] Entitlement centralizado (función o claim fresco, no solo UI).

---

## E7 — Multi-vertical `sport_type`

**Repo:** humi-sistema (+ copy `/tec`)  
**Ventana:** post primer cohort TKD

### Scope
- Campo `sport_type` en schools; feature flags por módulo.
- Landing `/tec` ya habla “academias” (no solo taekwondo).

### DoD
- [ ] Schema admite sport_type (taekwondo default).
- [ ] UI admin no hardcodea “dojang/cinta” en strings críticos (o i18n por vertical).
- [ ] Segundo vertical piloto definido (ballet / gym / fútbol / tenis) sin migrar tenancy.

---

## Orden de ejecución

```
E1 (humisite) → E3 (admin) → E4 (alumno) → números reales → E6 → E2 + E5 (WTU) → E7
```

E1 se entrega en este repo. E3–E7 se trackean en issues de humi-sistema.
