# Piloto: puerta humisite → SaaS → 49 alumnos

Runbooks y checklists del ciclo **EP-0 … EP-5**. Producto canónico: **humi-sistema**. Marketing/puerta: **humisite**.

| Host | Rol | Estado (jul 2026) |
|------|-----|-------------------|
| [humisite.vercel.app](https://humisite.vercel.app/) | Landing academia + CTA Plataforma | Vivo |
| [humi-sistema.vercel.app](https://humi-sistema.vercel.app/login) | App SaaS (login / workspace / alumno) | **Vivo — URL piloto** |
| `app.humi.mx` | Dominio de marca | Sin DNS (EP-1) |

**Cuenta owner piloto:** `humi.tkd@gmail.com` · tenant `humi-ensenada`  
**Handoff papás:** ≤ **29 jul 2026**

---

## EP-0 — Puerta viva (humisite)

### Qué hizo engineering
- Default `NEXT_PUBLIC_PRODUCT_URL` → `https://humi-sistema.vercel.app` en código ([`next.config.ts`](../next.config.ts), [`src/lib/humi-tec/product.ts`](../src/lib/humi-tec/product.ts)).
- Redirects `/login`, `/signup`, `/app` y CTAs `/tec` usan esa base.

### Checklist deploy Vercel (humisite)
- [ ] En Vercel → Project → Settings → Environment Variables:  
      `NEXT_PUBLIC_PRODUCT_URL=https://humi-sistema.vercel.app`  
      (si existía `app.humi.mx`, reemplazar; si no hay variable, el default de código basta tras redeploy).
- [ ] Redeploy Production.
- [ ] Desde PC limpia / incógnito:
  1. Abrir `https://humisite.vercel.app/`
  2. Clic **Plataforma** (nav) y **Portal** (footer)
  3. Debe abrir `https://humi-sistema.vercel.app/login?next=%2Fworkspace` (HTTP 200, no “can't be reached”)
  4. En `/tec`, **Iniciar sesión** → misma base

### DoD
- [x] Código apunta al deploy vivo.
- [ ] Env/redeploy prod confirmado.
- [ ] Login owner llega a `/workspace`.

---

## EP-1 — Dominio `app.humi.mx` (no bloquea piloto)

### Prerrequisitos
- Dominio `humi.mx` bajo control HUMI (registrar / DNS panel).
- Acceso al proyecto Vercel de **humi-sistema**.

### Pasos DNS + Vercel
1. En Vercel (humi-sistema) → Domains → Add `app.humi.mx`.
2. Crear registro DNS que indique Vercel (típicamente `CNAME app` → `cname.vercel-dns.com`, o A según el panel).
3. Esperar SSL Issued.
4. Verificar: `dig +short app.humi.mx` y `curl -I https://app.humi.mx/login` → 200.
5. Supabase Auth → URL Configuration: Site URL + Redirect URLs incluyen `https://app.humi.mx/**` y callback.
6. Actualizar en **ambos** proyectos Vercel:  
   `NEXT_PUBLIC_PRODUCT_URL=https://app.humi.mx`
7. Redeploy humisite + humi-sistema.
8. Smoke: humisite → Plataforma → login marca → workspace.

### DoD
- [ ] DNS resuelve; HTTPS en `/login`.
- [ ] Misma sesión owner/alumnos vía dominio de marca.
- [ ] `app.humi.mx` documentado como URL canónica (código default puede volver a marca).

---

## EP-2 — Owner HUMI operativo

**Repo ops:** humi-sistema · **Ventana:** esta semana (antes de provisionar 49)

### Runbook — cómo entrar a la plataforma
1. Ir a [humisite.vercel.app](https://humisite.vercel.app/) (o directo a [humi-sistema.vercel.app/login](https://humi-sistema.vercel.app/login?next=/workspace)).
2. Clic **Plataforma**.
3. Iniciar sesión con `humi.tkd@gmail.com` + contraseña owner.
4. Debe aterrizar en `/workspace` de la escuela **humi-ensenada**.

### Checklist validación owner
- [ ] Login desde PC distinta al entorno de desarrollo (incógnito).
- [ ] Usuario Auth existe; membership `owner` en `humi-ensenada`.
- [ ] Ve alumnos / grupos / asistencia / expediente (email inscripción).
- [ ] Puede editar datos sin SQL manual.
- [ ] Logout + re-login OK.

### Soporte
Si no entra: reset password en Supabase Auth (proyecto `humi-sistema`) o “Forgot password” en la app; confirmar `school_members.role = owner`.

---

## EP-3 — Datos piloto + accesos 1×1 (49 alumnos)

**Ventana:** admin esta semana → entrega a papás **≤ 29 jul 2026**  
**Modelo de acceso:** sin invite masivo / magic link. Academia define email + password en expediente → Auth + `student_access`.

### Flujo por alumno (admin)
1. Abrir expediente del alumno.
2. Confirmar / corregir datos (nombre, grupo, email de inscripción de papá/tutor).
3. Definir o generar contraseña temporal.
4. Guardar → sistema crea/actualiza usuario Auth + `student_access`.
5. Anotar en hoja de control: email, password temporal, fecha, estado (OK / pendiente / motivo).

### Hoja de control (columnas sugeridas)

| # | Alumno | Email inscripción | Pass temporal | Provisionado | Probado login | Entregado papá | Notas |
|---|--------|-------------------|---------------|--------------|---------------|----------------|-------|
| 1 | … | … | … | | | | |

Meta: **49** filas; pendientes con motivo explícito.

### Material de entrega a papás (29 jul)
Incluir por familia (impreso o mensaje privado) — plantilla: [`templates/entrega-papas-acceso.md`](./templates/entrega-papas-acceso.md).  
Hoja de control: [`templates/alumnos-accesos-49.csv`](./templates/alumnos-accesos-49.csv).

Incluir:
- URL: `https://humi-sistema.vercel.app/login` (o `app.humi.mx` si EP-1 listo)
- Email de inscripción
- Contraseña temporal + instrucción de cambiarla al entrar (si la app lo permite)
- Soporte: contacto oficina HUMI / `humi.tkd@gmail.com`
- Aviso: no compartir credenciales fuera de la familia

### DoD
- [ ] 49 expedientes revisados.
- [ ] Accesos provisionados (o lista de pendientes con motivo).
- [ ] Al menos 1 smoke login alumno → `/alumno` (no admin).
- [ ] Pack de entrega listo para el 29 jul.

---

## EP-4 — Portal alumno mínimo usable

**Repo:** humi-sistema · **Paralelo a EP-3** · antes del handoff masivo

### Smoke test (≥3 cuentas reales)
- [ ] Login alumno/tutor → cae en `/alumno` (no ve admin escuela).
- [ ] Ve historial de asistencia reciente.
- [ ] Alumno A no ve datos de alumno B (RLS).
- [ ] Documentar 3–5 hallazgos internos antes del 29 jul.

### DoD abierto (producto)
- [ ] Alumno/guardian entra sin ver admin.
- [ ] Asistencia reciente visible.
- [ ] RLS school + student link.
- [ ] Feedback familias (meta ≥5 post-handoff; pre-handoff basta prueba interna).

---

## EP-5 — Hardening acceso público

### Checklist “acceso desde cualquier PC”
- [ ] DNS/HTTPS del host de producto OK.
- [ ] humisite → Plataforma → login sin error de red.
- [ ] Cookies de sesión funcionan en Chrome/Safari/Firefox (no solo localhost).
- [ ] Supabase redirect allowlist incluye host de producto en uso.
- [ ] Stub auth de humisite **no** es fuente de verdad (solo redirects).
- [ ] Advisors RLS críticos en verde para tablas del portal (humi-sistema).
- [ ] Usuario A school X no lee school Y.

---

## Orden

```
EP-0 (puerta) → EP-2 (owner) → EP-3 + EP-4 en paralelo → handoff 29 jul
EP-1 (dominio marca) cuando DNS esté listo
EP-5 continuo / bloqueante si hay fuga entre tenants
```

Fuera de este ciclo: Stripe (E2 legacy), Enterprise WTU (E5 legacy), multi-vertical (E7).
