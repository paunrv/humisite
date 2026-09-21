/**
 * HUMI io landing — voice from 16+ years running an academy,
 * marketing clarity, and B2B SaaS positioning.
 */

export const TEC_BRAND = {
  name: "HUMI io",
  umbrella: "HUMI",
  productLine: "io",
} as const;

export const TEC_META = {
  title: "HUMI io · Software para administrar tu academia deportiva",
  description:
    "Software para academias deportivas: alumnos, cobranza, asistencia y exámenes. Brackets y logística para agrupaciones. Hecho en el dojang HUMI, Ensenada.",
  ogAlt: "HUMI io — software para administrar academias, hecho en el dojang HUMI",
  keywords: [
    "software academia deportiva",
    "sistema gestión escuela taekwondo",
    "plataforma cobranza alumnos",
    "brackets torneo academia",
    "website academia deportiva",
    "HUMI io",
    "software federación deportiva",
    "plataforma SaaS academias deportivas",
    "HUMI-tec",
  ],
} as const;

export const TEC_HERO = {
  brand: "HUMI io",
  headline: "Operar la academia\ncon el mismo criterio\ncon el que se entrena.",
  support:
    "El sistema para llevar tu escuela: alumnos, mensualidades, asistencia y exámenes. Nacido de más de 16 años en el dojang — no de un escritorio que nunca dio clase.",
  primaryCta: { label: "Ver lo que incluye", href: "#escuela" },
  secondaryCta: { label: "Iniciar sesión", href: "/login" },
  proof: "16 años de dojang · Generaciones de cintas negras · Ensenada, B.C.",
} as const;

export const TEC_EASE = {
  eyebrow: "De dónde viene",
  title: "Administrar una academia se complica más rápido de lo que crece.",
  body: "HUMI io nace de más de 16 años llevando un dojang, con varias generaciones de cintas negras formadas. Con alumnos entrando y saliendo todo el año, y exámenes, clínicas y torneos encima, seguir quién es quién y qué le toca a cada uno se vuelve un trabajo aparte.",
  seeLabel: "Lo que ves al entrar",
  see: "Quién debe y desde cuándo. Quién faltó las últimas tres clases. Cómo viene cada alumno. Quién ya reúne asistencia, tiempo en grado y pagos para presentar examen. Nada que vaciar, nada que buscar en tres chats.",
  audiences: [
    {
      who: "Para ti",
      what: "Ya no armas el reporte para saber cómo va la escuela. Entras y el reporte ya está.",
    },
    {
      who: "Para tu staff",
      what: "Pasan lista desde el celular, en el tatami, antes de que se les olvide.",
    },
    {
      who: "Para los papás",
      what: "Pagan desde su teléfono y ven cómo va su hijo, sin tener que escribirte un domingo.",
    },
  ],
  ease: "No hace falta curso. Si saben usar WhatsApp, ya saben usar esto. Los tres.",
  payoff:
    "Todo en un mismo lugar, para que decidas con el detalle completo y no con lo que alcanzas a recordar.",
} as const;

export const TEC_ESSENCE = {
  eyebrow: "Esencia HUMI",
  title: "HUMI es un dojang. HUMI io es lo que usamos para llevarlo.",
  body: "HUMI es una academia de taekwondo en Ensenada, con su dojang, sus alumnos y sus exámenes. HUMI io es el producto que construimos para administrarla, y que hoy abrimos a otras escuelas. No es software genérico con un logo encima: es lo que nos hacía falta para no elegir entre enseñar bien y administrar bien.",
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
  body: "Un website o landing bien hecho no es lujo: es la puerta de entrada. Solicítalo con HUMI io y posiciona tu academia en Google con la misma calidad con la que entrenas.",
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
  body: "Staff con su cuenta. Alumnos y familias con el correo de inscripción y la contraseña que define la academia en oficina. Un login; cada quien ve lo suyo.",
} as const;

export const TEC_VERTICALS_NOTE =
  "Hoy lo probamos en taekwondo. El modelo sirve a ballet, gimnasia, fútbol, tenis y más academias que viven de la constancia.";

export const TEC_FOOTER = {
  legalNote:
    "HUMI es la academia de taekwondo, con su dojang en Ensenada. HUMI io es el producto tecnológico que nació ahí para administrar academias. Dos cosas distintas, el mismo estándar de calidad.",
  termsNote: "Términos del servicio se publicarán antes del cobro a terceros.",
} as const;

export const TEC_WHATSAPP_ENTERPRISE =
  "https://wa.me/526461093879?text=" +
  encodeURIComponent(
    "Hola — me interesa HUMI io Enterprise para una agrupación (≥10 escuelas): red, eventos, brackets y comunicación.",
  );

export const TEC_WHATSAPP_WEBSITE =
  "https://wa.me/526461093879?text=" +
  encodeURIComponent(
    "Hola — quiero solicitar un website / landing para mi academia con HUMI io (posicionamiento y calidad HUMI).",
  );

export const TEC_WHATSAPP_ESCUELA =
  "https://wa.me/526461093879?text=" +
  encodeURIComponent(
    "Hola — me interesa el plan Escuela de HUMI io (alumnos, cobranza, expediente y eventos).",
  );
