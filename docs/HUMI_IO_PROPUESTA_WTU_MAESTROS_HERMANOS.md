# Propuesta HUMI io — Maestros con cuenta · Una familia, un acceso

| Campo | Valor |
| --- | --- |
| Fecha | 22 sep 2026 — cierre del primer mes MVP con operación real |
| Audiencia | Interna (producto / arquitectura) · base para pitch a director WTU |
| Estado | **Borrador** — Engineering drafts, Product/Architect aceptan ([Governance §8](https://github.com/paunrv/humi-sistema/blob/main/docs/governance/GOVERNANCE.md)) |
| Código evaluado | `paunrv/humi-sistema` @ `f374add` |

> Este documento vive en humisite porque aquí están los docs de HUMI io (E1–E7). Los tickets, ADR y PDR que propone se crean en **humi-sistema**, que es la fuente de verdad.

---

## 0. Evaluación del mes MVP (22 ago → 22 sep)

Lo que el mes demostró, con operación capturada 100 % en HUMI:

| Evidencia | Qué valida |
| --- | --- |
| Mensualidades capturadas y cobradas en sistema | Cobranza (Commercial) sostiene la operación sin Excel |
| Playera **DTMP** vendida vía tienda | Tienda + stock por talla + ticket agrupado funcionan con producto real |
| Examen de grados **lunes 22 sep** | Eventos internos / roster de examen en uso real |
| Inscripciones nuevas | Alta de alumno + expediente + athlete_id |
| Cuentas de portal activadas | Provisioning Auth → `/alumno` funciona (falta explicarlo a familias) |

**Conclusión:** el tenant HUMI Ensenada está estable en el día a día. Los dos huecos que aparecieron no son de cobranza sino de **personas**: quién da la clase (maestros) y quién es la familia (hermanos). Son justo los dos puntos que un director de agrupación va a preguntar, porque escalan ×15 escuelas.

---

## 1. Preocupaciones (lo que hay que resolver antes de prometer)

### Maestros
| # | Preocupación | Evidencia en código |
| --- | --- | --- |
| M1 | El dueño **no puede invitar maestros** desde su escuela; solo la plataforma | `school_allowed_emails` + `claim_school_memberships()` existen, pero solo se usan en `app/(platform)` y `lib/actions/org.ts` |
| M2 | **Seguridad:** la RLS no distingue `instructor` de `owner/admin`. Un maestro con sesión puede leer **y escribir** `charges` y `guardians` llamando a la API directo; el bloqueo es solo de UI/server actions | `0001_init.sql:171` `staff_all on charges for all using (school_id in my_schools())`; `lib/school-role.ts` `requireBillingRole` |
| M3 | El maestro no es una identidad: `groups.coach_name` y `coach_hours.coach_name` son **texto libre** | `20260718160000_coach_day_assignment.sql` |
| M4 | No sabemos **quién pasó lista**: `attendance_sessions` / `attendance_records` no guardan autor | `20260718010000_attendance_sessions.sql` |
| M5 | "Estimar objetivos" (listo para examen) toca **Promotion**, término abierto | [Ubiquitous Language §9](https://github.com/paunrv/humi-sistema/blob/main/docs/domain/UBIQUITOUS-LANGUAGE.md) |

### Hermanos
| # | Preocupación | Evidencia en código |
| --- | --- | --- |
| H1 | **Ya funciona técnicamente** pero nadie lo sabe: un correo Auth puede ver N alumnos | `student_access (user_id, student_id)` N:M; `provisionStudentPortalAccess` → *"Existing Auth account (other kids): link only, keep password"*; `/workspace` + `/api/alumno/active` |
| H2 | El tutor se deduplica por **nombre + teléfono exactos**; un typo crea un segundo tutor y rompe el vínculo | `lib/actions/students.ts:341-369` |
| H3 | Cambiar el correo del tutor desde un hermano no avisa que afecta a los demás | `provisionStudentPortalAccess` hace `update guardians set email` |
| H4 | "Familia" **no es entidad** y el descuento por hermanos **no tiene modelo** — a propósito | [Domain Map §4](https://github.com/paunrv/humi-sistema/blob/main/docs/domain/DOMAIN-MAP.md), [PDR-001 §4.1](https://github.com/paunrv/humi-sistema/blob/main/docs/product/PDR-001-commercial-model.md) |
| H5 | Recordatorios / adeudos llegan por alumno: 3 hijos = 3 mensajes | `lib/digests/guardian-overdue.ts` |

---

## 2. Producto (qué ve cada persona)

### 2.1 Maestro con cuenta
- **Dueño** → Ajustes › **Equipo**: agrega correo + rol (`instructor` / `admin`). El maestro entra con ese correo y cae en *Asistencia* (FEAT-011 ya existe).
- **Maestro** → *Clase de hoy* (UX-020): abre su grupo, pasa lista en 30 s desde el celular. Al abrir la sesión queda registrado **quién la impartió** (su asistencia/horas) y **quién pasó lista**.
- **Maestro** → nota/objetivo de la clase en `attendance_sessions.notes` (ya existe la columna) → aparece en la Agenda.
- **Dueño** → reporte de horas por maestro (`coach_hours`) ligado a una persona real, no a un texto.
- **No ve:** cobranza, tienda, mensajes, ajustes (nav ya lo hace) — y tras M2, **tampoco por API**.

### 2.2 Una familia, un acceso
- **Oficina** → en el expediente del 2.º hijo: *Activar portal* con el **mismo correo** → el sistema lo reconoce y solo lo vincula (no cambia contraseña, manda correo "vinculado").
- **Oficina** → panel **Hermanos** en el expediente: lista los alumnos que comparten tutor, y botón *Usar tutor existente* al inscribir (evita H2).
- **Papá/mamá** → un login, selector de hijo en `/workspace` y en la barra del portal; ve asistencias, pagos y eventos de cada uno.
- **Después (requiere PDR):** estado de cuenta familiar consolidado y descuento por hermanos.

---

## 3. Caminos evaluados y elección

| Camino | Qué implica | Veredicto |
| --- | --- | --- |
| **A. Entidad `families`** + cuenta familiar | Nueva entidad, migración, contradice "Family no es entidad" del Foundation congelado → cambio de Foundation | ❌ No en MVP |
| **B. Tutor como ancla** (usar `guardians` + `student_access` que ya existen) | Solo UX + dedupe; cero cambios de esquema | ✅ **Elegido para hermanos** |
| **C. Maestro = texto** (seguir con `coach_name`) | Sin cuentas; no hay trazabilidad | ❌ No resuelve la petición |
| **D. Maestro = `school_member` role instructor** + FK opcional en grupo/horas/lista | Reusa rol, whitelist y claim existentes; columnas nullable aditivas | ✅ **Elegido para maestros** |
| **E. App separada para maestros** | Otra superficie, otro login | ❌ Rompe "una cuenta, varios workspaces" |

**Por qué B y D:** ambos reusan piezas que ya pasaron QA (whitelist + claim, `student_access` N:M, workspace switcher) y ninguno toca el Foundation congelado. Lo único que no es "routine" es la seguridad (M2) y la autoría de asistencia (M3/M4), que llevan un ADR corto.

---

## 4. Propuesta de ejecución (gate de gobernanza incluido)

Orden: **seguridad primero**, luego lo que se ve. Cada fila es un ticket en humi-sistema.

### Fase 1 — Esta semana (routine, sin esquema)

**T1 · Hermanos: vincular por correo existente + panel Hermanos + "usar tutor existente"**
```markdown
## Governance
1. **Capability** — none
2. **Domain** — Identity (guardian ↔ student access)
3. **Foundation** — Domain Map §4 "Family as an entity ❌" — respetado: no se crea entidad; se usa Guardian (Ubiquitous Language §3)
4. **ADR** — none needed (student_access N:M ya existe)
5. **PDR** — none needed (no hay precio ni regla de familia)
6. **Tests** — extender student-portal.resend.test.ts: correo existente → link sin reset de password; dedupe de tutor
7. **Risk** — bajo, reversible. Sin exposición financiera. Cuidar H3 (aviso al cambiar correo compartido)
```

**T2 · Runbook de oficina "activar portal a hermanos"** (1 página, para las ~5 familias). Sin código.

### Fase 2 — Antes de dar cuentas a maestros (bloqueante)

**T3 · SEC: RLS consciente de rol para `charges`, `guardians`, `charge_payment_proofs`, tienda**
```markdown
## Governance
1. **Capability** — none
2. **Domain** — Commercial (quién puede escribir un cargo)
3. **Foundation** — Ubiquitous Language §3 "Instructor … no commercial authority" — **contradicho en la base de datos** (solo se cumple en la app)
4. **ADR** — NEW ADR REQUIRED (autorización / RBAC de escuela; es el candidato ADR-F de PR #316)
5. **PDR** — none needed (el significado ya está decidido)
6. **Tests** — test de aislamiento tipo lib/architecture/entitlement-isolation.test.ts: instructor no puede insert/update charges
7. **Risk** — seguridad + financiero → impacto primero. Hoy latente: no hay instructores con cuenta. Se vuelve real el día que invitemos al primero
```
Propuesta técnica: helper `my_billing_schools()` (owner/admin) y separar `staff_all` en `staff_read` (todos) + `billing_write` (owner/admin) en tablas comerciales. Evaluar si el instructor necesita leer `guardians.phone` (probablemente sí, para emergencias) pero no `charges`.

### Fase 3 — Maestro con cuenta (siguiente sprint)

**T4 · Ajustes › Equipo** — UI sobre `school_allowed_emails` + `claim_school_memberships()` (ya existen; la policy de escritura ya exige owner/admin). Routine.

**T5 · Identidad del maestro en clase y lista**
```markdown
## Governance
1. **Capability** — Operations (abrir sesión de clase)
2. **Domain** — Academic (Attendance) — el maestro es Staff de Institutional
3. **Foundation** — Domain Map §3 Academic ↮ Commercial — respetado: horas del maestro no generan cargos
4. **ADR** — NEW ADR (pequeño): persistir autoría — columnas nullable `groups.coach_user_id`, `coach_hours.coach_user_id`, `attendance_sessions.opened_by`, `attendance_records.marked_by`. Aditivo, `coach_name` se conserva como fallback
5. **PDR** — none needed
6. **Tests** — abrir sesión como instructor crea/actualiza coach_hours con su user_id; lista registra marked_by
7. **Risk** — bajo, aditivo, reversible. Sin impacto financiero
```

**T6 · Objetivo de clase en Agenda** — usar `attendance_sessions.notes` como "objetivo de la sesión" visible en agenda staff. Routine.

### Fase 4 — Después (requiere decisión de producto)

| Tema | Registro necesario |
| --- | --- |
| Estado de cuenta familiar / un recordatorio por tutor | PDR (agrupar comunicación por Guardian) — Communication no cambia estado, pero sí define "a quién" |
| Descuento por hermanos | **PDR** — PDR-001 §4.1 |
| "Listo para examen" (asistencias vs objetivo por cinta) | **PDR** — definir Promotion (Ubiquitous Language §9) |
| Maestro que da clase en varias escuelas WTU | Ya soportado por `school_members` multi-escuela + workspace; validar en ensayo E5 |

---

## 5. Los dos puntos para el director WTU

**1. Cada maestro, su cuenta — cada clase, trazable.**
El maestro pasa lista desde su celular; el sistema registra quién dio la clase, quién asistió y cuántas horas lleva cada maestro. La dirección ve la agenda y el objetivo de cada sesión sin pedir reportes por WhatsApp. El maestro nunca ve dinero. Para la agrupación: horas y cobertura por maestro en todas las escuelas afiliadas, con el mismo login si da clase en varias.

**2. Una familia, un acceso.**
Papá o mamá con tres hijos entra con **un correo** y cambia de hijo con un toque: asistencias, pagos, exámenes y eventos de cada uno. Ya está funcionando en HUMI Ensenada. Menos soporte para la escuela y menos fricción para las familias el día de examen.

**Respaldo:** un mes completo de operación real en HUMI Ensenada — mensualidades, tienda (playera DTMP), examen de grados del 22 sep, inscripciones nuevas y portales activados.

**Qué NO prometer todavía:** descuento por hermanos, estado de cuenta familiar consolidado, "semáforo de listo para examen". Están reconocidos y van a PDR.
