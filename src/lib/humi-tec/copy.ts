/**
 * HUMI-tec SaaS landing — voice from 15+ years running an academy,
 * marketing clarity, and B2B SaaS positioning.
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

export const TEC_HERO = {
  brand: "HUMI-tec",
  headline: "Operar la academia\ncon el mismo criterio\ncon el que se entrena.",
  support:
    "Plataforma SaaS para escuelas y agrupaciones. Nacida de más de 15 años en el dojang — no de un escritorio que nunca dio clase.",
  primaryCta: { label: "Ver lo que incluye", href: "#escuela" },
  secondaryCta: { label: "Iniciar sesión", href: "/login" },
  proof: "Calidad HUMI · Probado en operación real · Ensenada, B.C.",
} as const;

export const TEC_ESSENCE = {
  eyebrow: "Esencia HUMI",
  title: "La calidad no es un claim. Es el estándar con el que construimos.",
  body: "HUMI-tec no es software genérico con logo. Es la herramienta que necesitábamos para no elegir entre enseñar bien y administrar bien. Misma exigencia, misma calidez, mismo respeto por el detalle.",
} as const;

export const TEC_SCHOOL = {
  id: "escuela",
  eyebrow: "Nivel Escuela",
  title: "El día a día, bajo control",
  body: "Lo que un dueño o director necesita cada semana: alumnos claros, grupos ordenados, cobranza sin fricción y comunidad informada.",
  features: [
    {
      num: "01",
      title: "Alumnos, grupos y agenda",
      body: "Control de matrícula, grupos por edad u objetivo, y agenda de trabajo para que el staff sepa qué toca cada día — sin WhatsApp eterno ni Excel paralelo.",
    },
    {
      num: "02",
      title: "Cobranza que facilita a los papás",
      body: "Múltiples formas de pago para familias. Menos persecución de mensualidades; más claridad de quién está al corriente y quién necesita un recordatorio amable.",
    },
    {
      num: "03",
      title: "Expediente de cada alumno",
      body: "Historial, asistencia, progresión y notas en un solo lugar. Cuando un papá pregunta, respondes con datos — no con memoria.",
    },
    {
      num: "04",
      title: "Eventos que se comparten fácil",
      body: "Crea exámenes, clínicas o actividades y compártelos con la comunidad sin armar cadenas interminables. Información clara, un solo enlace.",
    },
  ],
} as const;

export const TEC_ENTERPRISE = {
  id: "enterprise",
  eyebrow: "Nivel Enterprise",
  title: "Una agrupación. Una dirección. Muchas escuelas alineadas.",
  body: "Para el director de agrupación que necesita conectar escuelas, levantar eventos serios y mantener comunicación clara — sin perder el hilo entre dojangs.",
  minSchools: "Mínimo 10 escuelas",
  features: [
    {
      title: "Red de escuelas conectada",
      body: "Cuenta master que afilia academias. Visibilidad de la red sin microgestionar el día a día de cada dojang.",
    },
    {
      title: "Eventos con logística de alto nivel",
      body: "Organiza torneos y concentraciones con estructura: sedes, roles, tiempos y seguimiento — no un grupo de chat improvisado.",
    },
    {
      title: "Brackets y agenda de competencia",
      body: "Desarrollo de brackets y agenda para que atletas, coaches y jueces sepan dónde estar y cuándo competir.",
    },
    {
      title: "Comunicación con el director",
      body: "Canal claro entre escuelas y la dirección de la agrupación. Menos ruido; más decisiones que llegan a tiempo.",
    },
  ],
} as const;

export const TEC_WEBSITE = {
  id: "website",
  eyebrow: "Website / Landing",
  title: "Tu academia, visible donde las familias buscan.",
  body: "Un website o landing bien hecho no es lujo: es la puerta de entrada. Solicítalo con HUMI-tec y posiciona tu academia en Google con la misma calidad con la que entrenas.",
  points: [
    "Landing o sitio completo con la identidad de tu academia",
    "Pensado para que te encuentren: SEO local y claridad de oferta",
    "Misma barra de calidad que el sitio de HUMI — no plantillas genéricas",
  ],
  ctaLabel: "Solicitar website",
  secondaryLabel: "Ver ejemplo HUMI →",
  secondaryHref: "/",
} as const;

export const TEC_PLANS_COPY = {
  eyebrow: "Planes",
  title: "Escuela o Enterprise",
  body: "Empieza con una academia, o escala con una agrupación. El cobro del software es aparte de la cobranza a tus alumnos.",
} as const;

export const TEC_ACCESS = {
  eyebrow: "Acceso",
  title: "Entra a la plataforma",
  body: "Admin, instructores y —cuando esté activo— portal de familias. Un login. Tu escuela o tu agrupación.",
} as const;

export const TEC_VERTICALS_NOTE =
  "Hoy lo probamos en taekwondo. El modelo sirve a ballet, gimnasia, fútbol, tenis y más academias que viven de la constancia.";

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
