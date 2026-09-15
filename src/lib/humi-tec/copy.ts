/**
 * HUMI-tec SaaS landing — voice from 15+ years running an academy,
 * marketing clarity, and B2B SaaS positioning.
 *
 * Landing V2: producto primero. Cada afirmación de este archivo está
 * respaldada por una pantalla real de humi-sistema. No agregar capacidades
 * que el producto no tenga.
 */

export const TEC_BRAND = {
  name: "HUMI-tec",
  umbrella: "HUMI",
  productLine: "tec",
} as const;

export const TEC_META = {
  title: "HUMI-tec · Plataforma SaaS para academias y agrupaciones",
  description:
    "Software para escuelas deportivas: alumnos, grupos, agenda, cobranza, expediente y eventos. Enterprise con brackets y logística. Website para posicionarte en Google. Hecho y probado en HUMI.",
  ogAlt: "HUMI-tec — plataforma para academias y enterprise",
  keywords: [
    "software academia deportiva",
    "sistema gestión escuela taekwondo",
    "plataforma cobranza alumnos",
    "brackets torneo academia",
    "website academia deportiva",
    "HUMI-tec",
    "software federación deportiva",
  ],
} as const;

export const TEC_NAV = [
  { href: "#producto", label: "Producto" },
  { href: "#operacion", label: "Operación" },
  { href: "#familia", label: "Familia" },
  { href: "#escala", label: "Escala" },
  { href: "#planes", label: "Planes" },
] as const;

/* 01 — MARCA */
export const TEC_HERO = {
  brand: "HUMI-tec",
  headline: "Operar la academia\ncon el mismo criterio\ncon el que se entrena.",
  support:
    "Plataforma SaaS para escuelas y agrupaciones. Nacida de más de 15 años en el dojang — no de un escritorio que nunca dio clase.",
  primaryCta: { label: "Conoce HUMI-tec →", href: "#producto" },
  secondaryCta: { label: "Iniciar sesión" },
  proof: "Probado en operación real · Ensenada, B.C.",
} as const;

/* 02 — PRODUCTO */
export const TEC_PRODUCT = {
  id: "producto",
  eyebrow: "El sistema",
  title: "El mes de tu academia, en una pantalla.",
  body: "Dirección reúne lo que normalmente vive en cinco lugares: quién entrena hoy, quién ya pagó, quién lleva tres semanas sin venir. No es un demo — es la pantalla con la que se abre el día.",
  marks: [
    "Alumnos activos y altas del mes",
    "Clases de hoy y asistencia de los últimos 7 días",
    "Semáforo de cobranza: cobrado, por vencer, vencido",
    "Ingresos de los últimos 6 meses",
  ],
} as const;

/* 03 — DOS SUPERFICIES */
export const TEC_SURFACES = {
  id: "superficies",
  eyebrow: "Dos superficies",
  title: "Una plataforma. Dos experiencias.",
  body: "La academia opera. La familia entiende. Misma cuenta, y nadie entra a un lugar que no es el suyo.",
  quote: "Misma cuenta. Elige escuela, agrupación o portal alumno.",
  quoteSource: "Pantalla de acceso de HUMI-tec",
  academy: {
    label: "Academia",
    lead: "Tu equipo sabe qué hacer.",
    modules: [
      "Dirección",
      "Agenda",
      "Eventos",
      "Asistencia",
      "Cobranza",
      "Tienda",
      "Alumnos",
      "Grupos",
      "Graduación",
      "Onboarding",
      "Correcciones",
      "Mensajes",
      "Ajustes",
    ],
    note: "Por rol: un instructor entra a pasar lista, no a la cobranza. Graduación se activa según el programa de cada escuela.",
  },
  family: {
    label: "Familia",
    lead: "Las familias saben qué pasa.",
    modules: [
      "Inicio",
      "Pagos",
      "Pedidos",
      "Asistencia",
      "Agenda",
      "Exámenes",
      "Perfil",
    ],
    note: "No es el panel de la escuela en versión reducida. Es otra cosa, para otra persona.",
  },
} as const;

/* 04 — OPERACIÓN */
export const TEC_OPERATION = {
  id: "operacion",
  eyebrow: "Operación",
  title: "Lo que se repite todos los días es lo que tiene que estar bien hecho.",
  body: "Pasar lista y cobrar. Todo lo demás en una academia depende de que esas dos cosas no se caigan.",
  moments: [
    {
      id: "asistencia",
      when: "Durante el día",
      title: "Tres toques por alumno. Se guarda solo.",
      body: "El pase de lista se hace en el tatami, no en la oficina. Cada marca se guarda al instante — y avisa cuando no pudo guardarse.",
      detailLabel: "Presente · Tarde · Ausente",
      detailNote:
        "El color de cinta de cada alumno viaja con su fila, para reconocer al grupo de un vistazo.",
    },
    {
      id: "cobranza",
      when: "Al cierre del mes",
      title: "Quién pagó, quién no, y quién está por vencer.",
      body: "El mes entero en tres estados. Desde ahí se marca un pago o se manda un recordatorio, sin cambiar de pantalla.",
      detailLabel: "Pagado · Por vencer · Vencido",
      detailNote:
        "Cada cargo guarda su categoría, su método y su comprobante. El mes cierra sin reconstruir nada de memoria.",
    },
  ],
  aside:
    "La agenda de clases, los grupos, la tienda y los eventos viven en el mismo sistema — no en cuatro hojas de cálculo distintas.",
} as const;

/* 05 — FAMILIA */
export const TEC_FAMILY = {
  id: "familia",
  eyebrow: "Familia",
  title: "La academia también se vive del otro lado del escritorio.",
  body: "Entra y lo ve: si su hijo entró a clase, qué debe este mes, qué sigue. Un martes a las seis o un domingo a las diez de la noche — sin esperar a que abra la oficina y sin mandar un mensaje para preguntar.",
  questions: [
    { q: "¿Qué pasa?", a: "Si entró a clase hoy, y qué tiene esta semana su grupo." },
    { q: "¿Qué debo?", a: "Cuánto es, si ya quedó aplicado y dónde está el comprobante." },
    { q: "¿Qué sigue?", a: "La fecha del próximo examen y del próximo torneo." },
    { q: "¿Cómo va?", a: "En qué grado está hoy y qué guarda su expediente." },
  ],
  detailLabel: "Athlete ID",
  detailNote: "El identificador del alumno para torneos y agrupación.",
} as const;

/* 06 — CORRECCIONES */
export const TEC_CORRECTIONS = {
  id: "correcciones",
  eyebrow: "Correcciones",
  title: "La tecnología organiza el proceso.\nLa solución sigue siendo humana.",
  body: "Una familia ve un dato mal en el expediente y lo describe. La escuela lo recibe en un solo lugar, lo corrige y lo marca hecho. Nadie persigue a nadie.",
  family: {
    label: "La familia",
    caption: "La familia describe qué hay que corregir y lo envía.",
  },
  academy: {
    label: "La escuela",
    caption: "La solicitud llega a Correcciones y se resuelve en el expediente.",
  },
  stateOpen: "ABIERTA",
  stateDone: "HECHA",
  footnote:
    "Dos estados. Sin tickets, sin folios, sin un canal más que revisar.",
} as const;

/* 07 — MENSAJES */
export const TEC_MESSAGES = {
  id: "mensajes",
  eyebrow: "Mensajes",
  title: "Saber a quién escribirle es la mitad del mensaje.",
  body: "Eliges la plantilla, buscas al alumno o al grupo, y WhatsApp se abre con el mensaje ya armado. Tus familias ya están ahí — no vamos a pedirles que aprendan otra cosa, ni a inventar otro chat.",
  pairs: [
    {
      q: "¿A quién le toca?",
      a: "Buscas por alumno, tutor o grupo, con el estado del mes ya delante.",
    },
    {
      q: "¿Qué le digo?",
      a: "El mensaje parte de lo que ya está registrado: el cargo, la falta, el evento.",
    },
    {
      q: "¿Y la conversación?",
      a: "Ocurre en WhatsApp. Esa parte sigue siendo tuya.",
    },
  ],
  note: "Abre wa.me con el texto listo, una conversación a la vez.",
} as const;

/* 08 — ESCALA */
export const TEC_SCALE = {
  id: "escala",
  eyebrow: "Escala",
  title: "Una agrupación. Una dirección. Muchas escuelas alineadas.",
  body: "Cuando ya no es una escuela. Una cuenta principal afilia academias y ve el conjunto; cada escuela sigue operando su día. Eventos de agrupación con inscripciones y seguimiento, bajo la misma cuenta.",
  minSchools: "Desde 10 escuelas",
  levels: [
    {
      label: "Una dirección",
      note: "La cuenta principal afilia escuelas y lleva el registro de la red.",
    },
    {
      label: "Muchas escuelas",
      note: "Cada academia opera su día a día: sus grupos, su cobranza, su gente.",
    },
    {
      label: "El mismo criterio",
      note: "Nadie reinventa cómo se trabaja al crecer. Una escuela nueva entra operando bajo el mismo criterio.",
    },
  ],
  ctaLabel: "Hablar de agrupaciones",
} as const;

/* 09 — EMPEZAR */
export const TEC_START = {
  id: "empezar",
  eyebrow: "Empezar",
  title: "Empezar es configurar, no implementar.",
  body: "Cinco pasos guiados dentro del sistema. Al terminar, ya estás pasando lista.",
  steps: [
    { n: "01", label: "Academia", note: "Nombre, zona horaria y moneda." },
    { n: "02", label: "Cintas", note: "El sistema de grados de tu escuela." },
    { n: "03", label: "Grupos", note: "Al menos un grupo o programa." },
    { n: "04", label: "Horario", note: "Días y horas de cada grupo." },
    { n: "05", label: "Revisión", note: "Confirmas y queda configurado." },
  ],
  ctaLabel: "Ver planes",
} as const;

/* 10 — PLANES */
export const TEC_PLANS_COPY = {
  id: "planes",
  eyebrow: "Planes",
  title: "Escuela o agrupación",
  body: "Empieza con una academia, o escala con una agrupación. El cobro del software es aparte de la cobranza a tus alumnos.",
} as const;

/**
 * Cómo se NOMBRA y se EXPLICA cada plan en el landing.
 *
 * Los PRECIOS, el mínimo de escuelas y el intervalo siguen viviendo en
 * `lib/humi-tec/pricing.ts` y no se tocan desde aquí: esto es solo la capa
 * de presentación de la página, indexada por el `PlanId` de ese archivo.
 *
 * El plan que `pricing.ts` llama internamente `enterprise` se presenta como
 * «Agrupación»: en la página no se usa lenguaje de enterprise genérico, y la
 * cuenta que coordina varias escuelas es una CUENTA PRINCIPAL, no una
 * «master account».
 */
export const TEC_PLAN_PRESENTATION = {
  escuela: {
    name: "Escuela",
    lead: "Para una academia.",
    bullets: [
      "Alumnos, grupos, agenda y asistencia",
      "Cobranza del mes: cargos, pagos, pendientes y comprobantes",
      "Expediente del alumno",
      "Eventos de la escuela",
    ],
    ctaLabel: "Empezar con Escuela",
  },
  enterprise: {
    name: "Agrupación",
    lead: "Para una cuenta que coordina varias escuelas.",
    bullets: [
      "Una cuenta principal que afilia escuelas",
      "Cada escuela afiliada sigue operando su día a día",
      "Eventos de agrupación con inscripciones y seguimiento",
    ],
    ctaLabel: "Hablar de agrupaciones",
  },
} as const;

export const TEC_VERTICALS_NOTE =
  "Hoy lo probamos en taekwondo. El modelo sirve a ballet, gimnasia, fútbol, tenis y más academias que viven de la constancia.";

/* 11 — CIERRE */
export const TEC_CLOSING = {
  id: "cierre",
  eyebrow: "HUMI",
  title: "Hecho en una academia. Para academias.",
  body: "HUMI-tec es la herramienta que necesitábamos para no elegir entre enseñar bien y administrar bien.",
  primaryCta: "Entrar al sistema",
  secondaryCta: "Hablar con nosotros",
  websiteLine: "También hacemos el sitio web de tu escuela",
  websiteCta: "Solicitar website",
} as const;

export const TEC_FOOTER = {
  legalNote:
    "HUMI-tec es un producto de HUMI. El sitio de familias y la plataforma SaaS son superficies distintas con el mismo estándar de calidad.",
  termsNote: "Términos del servicio SaaS se publicarán antes del cobro a terceros.",
} as const;

export const TEC_WHATSAPP_ENTERPRISE =
  "https://wa.me/526461093879?text=" +
  encodeURIComponent(
    "Hola — me interesa HUMI-tec Enterprise para una agrupación (≥10 escuelas): red, eventos, brackets y comunicación.",
  );

export const TEC_WHATSAPP_WEBSITE =
  "https://wa.me/526461093879?text=" +
  encodeURIComponent(
    "Hola — quiero solicitar un website / landing para mi academia con HUMI-tec (posicionamiento y calidad HUMI).",
  );

export const TEC_WHATSAPP_ESCUELA =
  "https://wa.me/526461093879?text=" +
  encodeURIComponent(
    "Hola — me interesa el plan Escuela de HUMI-tec (alumnos, cobranza, expediente y eventos).",
  );
