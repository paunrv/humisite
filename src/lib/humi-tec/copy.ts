/**
 * Information architecture + copy for /tec (HUMI-tec SaaS landing).
 * Voice: owners of academies / federations — vertical-agnostic; HUMI as proof.
 */

export const TEC_BRAND = {
  name: "HUMI-tec",
  umbrella: "HUMI",
  productLine: "tec",
} as const;

export const TEC_META = {
  title: "HUMI-tec · Software para academias deportivas",
  description:
    "Plataforma para administrar alumnos, asistencia y operación de academias. Hecha y probada en HUMI. Planes Escuela y Enterprise.",
  ogAlt: "HUMI-tec — plataforma para academias",
} as const;

export const TEC_HERO = {
  brand: "HUMI-tec",
  headline: "La academia se entrena.\nLa operación también.",
  support:
    "Software para academias deportivas: alumnos, asistencia y control en un solo lugar. Nacido en HUMI, listo para más escuelas.",
  primaryCta: { label: "Ver planes", href: "#planes" },
  secondaryCta: { label: "Iniciar sesión", href: "/login" },
  proof: "Hecho y probado en HUMI · Ensenada, B.C.",
} as const;

export const TEC_SECTIONS = {
  why: {
    eyebrow: "Por qué existe",
    title: "Operar no debería competir con enseñar",
    body: "HUMI-tec nace del dojang: la misma exigencia con la que entrenamos, aplicada a la administración. Menos hojas de cálculo. Más presencia en el tatami — o en la cancha, el estudio o el gimnasio.",
  },
  proof: {
    eyebrow: "Caso real",
    title: "Primero lo usamos nosotros",
    body: "HUMI Taekwondo es el tenant cero. Validamos admin, alumnos y asistencia en operación real antes de abrir la plataforma a otras academias y agrupaciones.",
    linkLabel: "Conocer HUMI →",
    linkHref: "/",
  },
  plans: {
    eyebrow: "Planes",
    title: "Elige cómo creces",
    body: "Escuela para una academia. Enterprise para federaciones y agrupaciones a partir de 10 escuelas.",
  },
  enterprise: {
    eyebrow: "Enterprise",
    title: "Una cuenta master. Muchas escuelas.",
    body: "Ideal para agrupaciones como WTU a nivel estatal: billing centralizado, invites limpios y onboarding repetible. Mínimo 10 escuelas.",
  },
  access: {
    eyebrow: "Acceso",
    title: "Entra a tu escuela o agrupación",
    body: "Mismo login para admin, instructores y, cuando esté activo, portal de alumnos.",
  },
} as const;

export const TEC_VERTICALS_NOTE =
  "Hoy taekwondo. El modelo está listo para ballet, gimnasia, fútbol, tenis y más academias.";

export const TEC_FOOTER = {
  legalNote: "HUMI-tec es un producto de HUMI. El sitio de familias y el software son superficies distintas.",
  termsNote: "Términos del servicio SaaS se publicarán antes del cobro a terceros.",
} as const;

export const TEC_WHATSAPP_ENTERPRISE =
  "https://wa.me/526461093879?text=" +
  encodeURIComponent(
    "Hola — me interesa HUMI-tec Enterprise para una agrupación de academias (≥10 escuelas).",
  );
