# Propuesta HUMI io — Maestros con cuenta · Una familia, un acceso

| Campo            | Valor                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Fecha            | 22 sep 2026 — cierre del primer mes MVP con operación real                                                     |
| Audiencia        | Interna (Product / Architecture / Engineering) · base para pitch a director WTU                                |
| Estado           | **Borrador — Engineering drafts, Product/Architect accept**                                                    |
| Código evaluado  | `paunrv/humi-sistema` @ `f374add`                                                                              |
| Fuente de verdad | `humi-sistema`                                                                                                 |
| Objetivo         | Corregir los huecos identificados en el primer mes y volver a probar HUMI io inmediatamente con operación real |

> Este documento vive en `humisite` porque aquí están los docs de HUMI io (E1–E7). Las decisiones técnicas, ADR, PDR y tickets derivados se crean en `humi-sistema`, que es la fuente de verdad.

---

# 0. Evaluación del mes MVP

### 22 ago → 22 sep 2026

El primer mes no fue un piloto teórico.

HUMI Ensenada operó su día a día utilizando HUMI io como sistema principal de captura:

| Evidencia                                      | Qué valida                                                              |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| Mensualidades capturadas y cobradas en sistema | Commercial puede sostener la cobranza diaria sin depender de Excel      |
| Playera **DTMP** vendida vía tienda            | Product + stock por talla + ticket agrupado funcionan con producto real |
| Examen de grados — lunes 22 sep                | Eventos internos y roster de examen están entrando en operación real    |
| Inscripciones nuevas                           | Alta de alumno + expediente + `athlete_id` funcionan                    |
| Cuentas de portal activadas                    | Provisioning Auth → `/alumno` funciona                                  |
| Operación diaria del tenant                    | El sistema ya soporta el flujo básico de una escuela real               |

### Conclusión

El MVP **sí está operativo**.

Los problemas encontrados no indican que el modelo comercial esté roto ni que sea necesario rediseñar el producto.

Los problemas están concentrados en dos conceptos que aparecieron al operar con personas reales:

1. **Quién opera la escuela:** maestros/instructores.
2. **Quién representa a varios alumnos:** guardian/familia.

Estos problemas deben resolverse **antes de ampliar la prueba**, porque son precisamente los casos que aparecerán cuando HUMI io salga de una operación controlada por la dueña y empiece a ser utilizado por otros miembros de la escuela.

---

# 1. Principio de esta iteración

Esta etapa tiene una regla:

> **Resolver lo que el MVP acaba de demostrar que falta. No construir lo que todavía no necesitamos.**

Por lo tanto, esta iteración no busca crear:

* un módulo completo de Recursos Humanos;
* un ERP familiar;
* un sistema de nómina;
* una nueva entidad `family`;
* un sistema financiero por familia;
* un nuevo módulo de promoción;
* una reestructuración completa del workspace.

Busca cerrar cuatro cosas:

### A. Identidad

Saber quién es cada persona dentro del sistema.

### B. Autorización

Que el sistema, y no solamente la UI, determine qué puede hacer cada persona.

### C. Trazabilidad

Saber quién realizó acciones operativas importantes.

### D. Acceso familiar

Permitir que una misma cuenta represente a varios alumnos sin duplicar identidades.

---

# 2. Problemas encontrados

## 2.1 Maestros

| ID | Problema                                                     | Estado                       |
| -- | ------------------------------------------------------------ | ---------------------------- |
| M1 | El dueño no puede invitar maestros desde su propia escuela   | Resolver                     |
| M2 | RLS no distingue adecuadamente `instructor` de `owner/admin` | **Resolver antes de prueba** |
| M3 | El maestro actualmente está representado como texto libre    | Resolver                     |
| M4 | No sabemos quién pasó lista                                  | Resolver                     |
| M5 | “Estimar objetivos” toca el dominio Promotion                | No bloquear MVP              |

### M1 — Invitación

Actualmente existen:

* `school_allowed_emails`
* `claim_school_memberships()`

pero el flujo está orientado a operaciones de plataforma.

El comportamiento necesario para el MVP es más sencillo:

> **El Owner/Admin de una escuela debe poder invitar a un maestro de su propia escuela.**

No necesitamos todavía un sistema sofisticado de onboarding.

El flujo mínimo es:

`Owner/Admin → invita email → cuenta Auth → membership en escuela → rol Instructor`

---

## M2 — Seguridad

Este es el problema que **sí bloquea la siguiente prueba**.

Actualmente la RLS permite acceso demasiado amplio sobre algunas tablas porque la pertenencia a la escuela se utiliza como criterio principal.

Ejemplo identificado:

`0001_init.sql:171`

```text
staff_all on charges for all
using (school_id in my_schools())
```

Esto significa que la frontera actual es esencialmente:

> “¿pertenece a la escuela?”

cuando debería ser:

> “¿pertenece a la escuela **y qué rol tiene**?”

### Decisión

La autorización debe existir en tres niveles:

```text
User
  ↓
School Membership
  ↓
Role
  ↓
Permission
```

Para esta iteración sólo necesitamos los roles que afectan el MVP:

```text
owner
admin
instructor
```

El objetivo no es crear un RBAC sofisticado.

El objetivo es que:

> **un instructor no pueda acceder directamente a información o acciones comerciales/administrativas simplemente llamando la API.**

La UI no puede ser el límite de seguridad.

---

# 3. Instructor como identidad

Actualmente:

```text
groups.coach_name
coach_hours.coach_name
```

representan al maestro como texto.

Esto funciona mientras existe una sola persona y nadie necesita preguntarle al sistema quién es ese maestro.

En cuanto queremos:

* invitarlo;
* darle acceso;
* restringirlo;
* saber qué clases tiene;
* saber quién tomó asistencia;

el texto deja de ser suficiente.

### Decisión MVP

Crear una relación de identidad de instructor con la escuela.

Conceptualmente:

```text
Auth User
    ↓
School Membership
    ↓
Instructor
    ↓
Groups / Classes
```

El nombre sigue siendo un dato de presentación.

La identidad real debe ser una referencia.

### No hacer todavía

No necesitamos:

* expediente laboral;
* contrato;
* nómina;
* horarios laborales complejos;
* vacaciones;
* evaluación de desempeño;
* HR module.

Sólo necesitamos saber:

> **qué cuenta es este maestro y qué clases puede operar.**

---

# 4. Quién pasó lista

Actualmente:

```text
attendance_sessions
attendance_records
```

no guardan autor.

Eso elimina una pieza importante de trazabilidad.

### Decisión

Una sesión de asistencia debe poder responder:

> **¿Quién tomó esta asistencia?**

Mínimamente:

```text
attendance_sessions
    recorded_by → instructor/user
```

o equivalente según el modelo final elegido por Engineering.

No necesitamos auditoría completa de cada click.

Sólo necesitamos conservar el actor de la operación.

---

# 5. Promotion no bloquea esta iteración

“Estimar objetivos” o determinar preparación para examen toca el concepto de **Promotion**.

El término todavía no está suficientemente cerrado en el Ubiquitous Language.

Por lo tanto:

> **No se resuelve en esta iteración.**

El MVP puede continuar mientras Promotion permanezca fuera del flujo crítico.

No debemos introducir un concepto de dominio sólo porque apareció durante una conversación de producto.

---

# 6. Hermanos y acceso familiar

Aquí el hallazgo es diferente.

## H1 — La capacidad técnica ya existe

El sistema ya tiene:

```text
student_access
(user_id, student_id)
```

como relación N:M.

Esto significa que una cuenta puede tener acceso a varios alumnos.

Además:

```text
provisionStudentPortalAccess
```

ya contempla el caso:

> Existing Auth account (other kids): link only, keep password

Por lo tanto:

### No necesitamos construir “family accounts”.

La capacidad fundamental ya está.

Necesitamos **hacerla entendible y robusta**.

---

# 7. Modelo familiar para el MVP

La decisión es:

> **No crear `family` como entidad de dominio todavía.**

El modelo actual puede expresarse como:

```text
Guardian/Auth User
       │
       ├──── Student A
       ├──── Student B
       └──── Student C
```

La familia, para esta etapa, es una **relación de acceso**, no una nueva entidad.

Esto mantiene el dominio pequeño y permite probar el comportamiento inmediatamente.

---

# 8. Problema de identidad del guardian

Actualmente el tutor puede deduplicarse mediante:

```text
nombre + teléfono exactos
```

Esto es frágil.

Un typo puede producir:

```text
Guardian A
Guardian B
```

cuando en realidad son la misma persona.

El problema se vuelve más grave cuando existen hermanos.

### Decisión MVP

Cuando existe una cuenta Auth/email identificable:

> **la cuenta debe ser la identidad estable del acceso al portal.**

El nombre y teléfono permanecen como información del guardian, pero no deben ser la identidad principal del acceso.

No necesitamos resolver ahora todos los posibles casos de identidad humana.

Sólo necesitamos que:

> **dos hermanos puedan terminar correctamente vinculados a la misma cuenta.**

---

# 9. Cambio de correo del guardian

Actualmente:

```text
provisionStudentPortalAccess
```

puede actualizar el email del guardian al procesar otro alumno.

Esto es peligroso porque el guardian puede tener otros hijos vinculados.

Ejemplo:

```text
Pau@example.com
   │
   ├── Alumno A
   └── Alumno B
```

Si desde Alumno B se cambia el email:

```text
nuevo@example.com
```

no estamos cambiando solamente “el correo de B”.

Estamos modificando la identidad utilizada por ambos accesos.

### Decisión

Un cambio de email que afecte una identidad existente debe ser tratado como una operación explícita.

Para MVP:

* detectar que el guardian ya existe;
* no sobrescribir silenciosamente su identidad;
* mostrar/registrar que existen otros alumnos vinculados;
* requerir una acción explícita para modificar el email.

No necesitamos todavía un sistema completo de identity management.

---

# 10. Comunicación: una familia, un digest

Actualmente los recordatorios de adeudo se generan por alumno.

Por lo tanto:

```text
3 hijos
=
3 mensajes
```

cuando conceptualmente tenemos:

```text
1 guardian
=
1 relación familiar
=
3 alumnos
```

### Decisión MVP

Consolidar los recordatorios cuando varios alumnos pertenecen al mismo guardian.

Ejemplo conceptual:

```text
Hola, Pau.

Tienes 2 adeudos pendientes:

• Gael — mensualidad septiembre
• Pia — mensualidad septiembre
```

No necesitamos cambiar todavía el modelo financiero.

Los `charges` siguen perteneciendo al alumno.

Sólo cambia la forma de comunicar la información al guardian.

---

# 11. Modelo resultante

La arquitectura objetivo para esta iteración queda así:

```text
                         ┌───────────────┐
                         │   Auth User   │
                         └───────┬───────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │                               │
          School Membership                 Guardian Access
                 │                               │
          ┌──────┴──────┐                        │
          │             │                        │
        Owner        Instructor                  │
          │             │                        │
          │             └────── Classes           │
          │                       │               │
          │                  Attendance            │
          │                                       │
          └──────── School ───────────────────────┘
                                                  │
                                      ┌───────────┼───────────┐
                                      │           │           │
                                   Student A   Student B   Student C
```

La clave es que **Auth User deja de ser solamente una puerta de entrada al portal**.

Se convierte en la identidad desde la cual el sistema puede determinar:

* quién eres;
* en qué escuela operas;
* qué rol tienes;
* qué alumnos puedes ver;
* qué acciones puedes ejecutar.

---

# 12. Alcance de implementación

## P0 — Seguridad

**Debe estar listo antes de ampliar la prueba.**

* [ ] Definir roles `owner`, `admin`, `instructor`.
* [ ] Aplicar autorización por rol en RLS.
* [ ] Revisar `charges`.
* [ ] Revisar `guardians`.
* [ ] Revisar cualquier tabla administrativa accesible por instructor.
* [ ] Probar acceso directo vía API.
* [ ] Confirmar que UI y RLS tienen la misma frontera de permisos.

### Criterio de aceptación

Un instructor autenticado:

* puede operar lo que corresponde a su rol;
* no puede leer/modificar información comercial restringida;
* no puede modificar guardians;
* no puede modificar cargos;
* no puede escalar sus permisos llamando directamente a la API.

---

# 13. P1 — Maestros

* [ ] Crear/vincular identidad de instructor.
* [ ] Owner/Admin puede invitar instructor.
* [ ] Instructor puede aceptar/iniciar sesión.
* [ ] Instructor queda asociado a la escuela.
* [ ] Groups dejan de depender exclusivamente de `coach_name`.
* [ ] Instructor puede estar asociado a sus grupos/clases.
* [ ] Attendance registra `recorded_by`.

### Criterio de aceptación

Un maestro real de HUMI puede:

1. recibir una invitación;
2. crear/iniciar sesión con su cuenta;
3. entrar a HUMI io;
4. ver las clases que le corresponden;
5. tomar asistencia;
6. quedar registrado como responsable de esa asistencia;

sin tener acceso a funciones administrativas que no corresponden a su rol.

---

# 14. P1 — Hermanos

* [ ] Mantener `student_access` N:M.
* [ ] Una cuenta Auth puede acceder a varios alumnos.
* [ ] Detectar guardian existente.
* [ ] Evitar duplicación por pequeños cambios de nombre/teléfono.
* [ ] Evitar actualización silenciosa de email.
* [ ] Mostrar correctamente los alumnos vinculados.
* [ ] Consolidar recordatorios por guardian.

### Criterio de aceptación

Una familia real con dos o más alumnos puede:

1. recibir una sola cuenta;
2. iniciar sesión una vez;
3. seleccionar/ver a cada alumno;
4. consultar su información correspondiente;
5. recibir comunicación consolidada.

---

# 15. Lo que queda fuera

Para proteger la velocidad del MVP:

### No construir ahora

* `families` como nueva entidad.
* descuentos por hermanos como nuevo módulo.
* cuentas financieras familiares.
* nómina de maestros.
* HR.
* vacaciones/permisos.
* evaluación de maestros.
* Promotion completo.
* workflow avanzado de permisos.
* auditoría completa de todas las acciones.
* rediseño general del portal.

Estas decisiones pueden regresar después de observar el comportamiento real.

---

# 16. Orden de prueba

La implementación debe terminar en una nueva prueba con personas reales.

### Test 1 — Owner

**Actor:** directora/dueña de HUMI.

Debe poder:

```text
School
  ↓
Invite Instructor
  ↓
Instructor accepts
  ↓
Instructor membership created
```

### Test 2 — Instructor

**Actor:** maestro real.

Debe poder:

```text
Login
  ↓
My classes
  ↓
Attendance
  ↓
Submit
  ↓
recorded_by = instructor
```

Y debe fallar correctamente al intentar:

```text
Charges
Guardians
Administrative operations
```

### Test 3 — Family

**Actor:** guardian con dos o más alumnos.

Debe poder:

```text
Login
  ↓
Student A
Student B
  ↓
Switch student
```

sin crear cuentas adicionales.

### Test 4 — Identity

Intentar registrar al segundo hermano con:

* mismo email;
* mismo teléfono;
* variación de nombre;
* guardian ya existente.

Resultado esperado:

> **No se crea una identidad duplicada.**

### Test 5 — Communication

Con varios alumnos y adeudos:

```text
Student A → charge
Student B → charge
Student C → paid
```

el guardian recibe:

```text
1 consolidated communication
```

y no tres mensajes independientes.

---

# 17. Definition of Done

Esta iteración está terminada cuando HUMI Ensenada pueda operar con:

### Escuela

```text
Owner
  ↓
Instructor
  ↓
Classes
  ↓
Attendance
```

y:

```text
Guardian
  ↓
Student A
Student B
Student C
```

con autorización correcta en backend.

Más concretamente:

* [ ] Owner puede invitar maestros.
* [ ] Maestro tiene cuenta propia.
* [ ] Maestro tiene rol `instructor`.
* [ ] RLS respeta el rol.
* [ ] Maestro puede pasar lista.
* [ ] Sistema registra quién pasó lista.
* [ ] Guardian puede tener varios alumnos.
* [ ] No se duplican cuentas innecesariamente.
* [ ] Cambio de email no rompe vínculos existentes.
* [ ] Comunicación de adeudos puede consolidarse.
* [ ] Los flujos anteriores de Commercial, Store, Enrollment y Events siguen funcionando.

---

# 18. Decisiones que deben convertirse en artefactos

De este documento deberían salir únicamente los artefactos necesarios para implementar y probar.

### ADR

**ADR — Identity & School Membership Roles**

Define:

* Auth User;
* School Membership;
* roles;
* Instructor;
* autorización.

### ADR

**ADR — Guardian Multi-Student Access**

Define:

* guardian identity;
* `student_access`;
* multi-student access;
* email changes;
* deduplication.

### ADR

**ADR — Attendance Attribution**

Define:

* quién registra asistencia;
* relación con instructor/user;
* mínima trazabilidad necesaria.

### PDR

**PDR — Staff & Family Access MVP**

Unifica el comportamiento esperado desde producto sin expandir el dominio.

### Tickets

Los tickets deben salir de los criterios de aceptación anteriores.

No crear tickets para conceptos que no sean necesarios para pasar las pruebas.

---

# 19. Resultado esperado

El resultado de esta iteración no es “tener un sistema más completo”.

Es algo más concreto:

> **HUMI io debe poder pasar de una operación donde la dueña controla el sistema a una operación donde diferentes personas pueden utilizarlo con sus propias identidades y permisos, mientras una misma cuenta familiar puede representar a varios alumnos.**

Ese es el siguiente experimento.

Si funciona con HUMI Ensenada:

```text
1 escuela
+
1 owner
+
1–N instructors
+
familias con 1–N students
```

entonces tenemos evidencia para continuar la prueba de escalabilidad del modelo.

Si aparecen nuevos problemas, se documentan como evidencia del siguiente ciclo.

**No se anticipan como features.**

---

# 20. Decisión propuesta

### Aprobar para implementación inmediata

**Sí:**

* Instructor como identidad.
* Invitación de instructor desde escuela.
* Role-based authorization.
* RLS por rol.
* Attribution de asistencia.
* Guardian multi-student access.
* Protección contra duplicación/cambio silencioso de identidad.
* Comunicación consolidada por guardian.

### No incluir en esta iteración

* Family entity.
* Family billing.
* Sibling discount model.
* HR.
* Payroll.
* Promotion redesign.
* Advanced permissions.

### Objetivo del siguiente ciclo

> **Volver a operar HUMI Ensenada con estas capacidades en producción y validar el comportamiento con maestros y familias reales.**

La prueba no termina cuando el código está desplegado.

**Termina cuando las personas reales pueden usarlo sin necesitar que Pau intervenga para resolver el flujo.**

---

# Anexo — Notas de revisión de Engineering (22 sep 2026)

Contrastadas contra `humi-sistema` @ `f374add`. No cambian las decisiones de arriba; aclaran lo que Product tiene que confirmar antes de escribir los artefactos.

| # | Sección | Nota | Pregunta para Product |
| --- | --- | --- | --- |
| R1 | §2 M1, §16 Test 1 | La invitación **ya funciona a nivel base de datos**: `claim_school_memberships()` se ejecuta al iniciar sesión (`lib/school.ts:31`) y crea el membership con el rol de `school_allowed_emails`. Falta la pantalla para el Owner/Admin (Ajustes › Equipo); la policy de escritura ya exige owner/admin. Es el ticket más barato del plan. | — |
| R2 | §13 punto 4 ("ver las clases que le corresponden") | Hoy RLS da al instructor **todos** los alumnos de la escuela (`my_schools()`). Filtrar "mis clases" en UI es barato; hacerlo frontera de seguridad (RLS por grupo) es bastante más grande y complica suplencias (`coach_hours.coach_name` = sustituto). | ¿"Mis clases" es **vista por defecto** (recomendado para MVP) o **restricción**? |
| R3 | §12 criterio "no puede modificar guardians" | Compatible con que el instructor **lea** el teléfono del tutor (emergencias en clase). Conviene decirlo explícito en el ADR para no bloquear lectura por accidente. | ¿El instructor lee teléfono del tutor? (recomendado: sí, solo lectura) |
| R4 | §8, §16 Test 4 | Muchos tutores se inscriben **sin correo** (el alta exige teléfono, no email). Con email, la dedupe es trivial; sin email, la única llave es el teléfono. | ¿La dedupe cae a **teléfono** cuando no hay email, con confirmación en pantalla ("este tutor ya existe con Gael")? |
| R5 | §18 | Cuatro artefactos es más de lo necesario según [Governance §5](https://github.com/paunrv/humi-sistema/blob/main/docs/governance/GOVERNANCE.md) ("restating a settled rule is drift"). `student_access` N:M ya existe y no cambia de estructura. Propuesta: **1 ADR** (roles/autorización + atribución de asistencia; ambos estructurales y el primero ya está como candidato **ADR-F "school RBAC"** en PR #316) + **1 PDR** (Staff & Family Access MVP, que incluye dedupe, cambio de email y digest por guardian — son reglas de negocio, no estructura). | ¿Consolidar en 1 ADR + 1 PDR? |
| R6 | §10 | El digest consolidado es de Communication; no cambia estado (Blueprint), así que es compatible con [PDR-002 §7](https://github.com/paunrv/humi-sistema/blob/main/docs/product/PDR-002-humi-commercial-model.md). El guardian overdue es **opt-in** hoy (`off` por defecto): la prueba de §16 Test 5 requiere activarlo para HUMI Ensenada. | — |
| R7 | §12 P0 | Además de `charges` y `guardians`, revisar con la misma regla: `charge_payment_proofs`, tienda/pedidos, `student_access` (hoy cualquier staff puede escribirla → un instructor podría darse acceso de portal a un alumno) y `school_allowed_emails` (ya bien: owner/admin). | — |

**Orden de trabajo sugerido:** R5 decidido → ADR + PDR aceptados → P0 (RLS + tests de aislamiento) → Ajustes › Equipo → atribución de asistencia → hermanos (dedupe, email explícito, digest) → pruebas §16 con personas reales.
