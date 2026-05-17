/**
 * SEO copy for editorial section pages (programas, poomsae, generaciones, hubs).
 * Descriptions crafted to stay ≤158 chars (no trailing …).
 */
import { clampMetaDescription } from "./seo-meta.mjs";

const ENSENADA = "HUMI Taekwondo, Ensenada";

/** @type {Record<string, string>} */
const PROGRAMA_DESCRIPTIONS = {
  "tiny-tigers":
    "Taekwondo desde los 3 años en Ensenada: atención, juego con estructura y acompañamiento cercano. Mar–Jue 3:20 PM. Primera visita en HUMI.",
  kids: "Taekwondo para niños 4–10 años en Ensenada: hábito, coordinación y respeto. 4–6 PM. Agenda tu primera visita en HUMI Taekwondo.",
  teens: "Taekwondo para teens 11–16 en Ensenada: exigencia, equipo y mentalidad bajo presión. 6–7 PM. Conoce el dojang HUMI.",
  adultos:
    "Taekwondo + HIIT para adultos en Ensenada. Técnica y condición a las 7:30 AM o 7 PM. Primera visita sin compromiso — HUMI.",
};

/** @param {{ label: string, age: string, time: string, lede: string, slug: string }} p */
export function programaSeo(p) {
  const titles = {
    "tiny-tigers": "Tiny Tigers · Taekwondo 3 años",
    kids: "Kids · Taekwondo niños Ensenada",
    teens: "Teens · Taekwondo adolescentes",
    adultos: "Adultos · Taekwondo e HIIT Ensenada",
  };
  const ogImages = {
    "tiny-tigers": "/images/pic07.jpg",
    kids: "/images/pic16.jpg",
    teens: "/images/pic03.jpg",
    adultos: "/images/pic01.jpg",
  };
  return {
    title: titles[p.slug] ?? `Programa ${p.label}`,
    description: PROGRAMA_DESCRIPTIONS[p.slug] ?? clampMetaDescription(`${p.label} en ${ENSENADA}. ${p.lede}`),
    ogImage: ogImages[p.slug] ?? "/images/pic07.jpg",
  };
}

/** @param {{ label: string, belt: string, slug: string }} f */
export function poomsaeSeo(f) {
  const isDan = !f.label.startsWith("Taeguk");
  const shortLabel = isDan ? f.label : f.label.split(" · ")[0];
  return {
    title: isDan ? `Poomsae ${f.label}` : f.label.replace(" · ", " — "),
    description: isDan
      ? `Poomsae ${f.label} (dan, cinta ${f.belt}): forma oficial. Guía de referencia en ${ENSENADA}.`
      : `Poomsae ${shortLabel}, cinta ${f.belt}: forma oficial Taeguk. Referencia para entrenar en ${ENSENADA}.`,
    ogImage: "/images/pic29.jpg",
  };
}

/** @param {{ label: string, slug: string, image: string }} g */
export function generacionSeo(g) {
  const ordinals = {
    "primera-generacion": "primera",
    "segunda-generacion": "segunda",
    "tercera-generacion": "tercera",
    "cuarta-generacion": "cuarta",
    "quinta-generacion": "quinta",
    "sexta-generacion": "sexta",
    "septima-generacion": "séptima",
    "octava-generacion": "octava",
  };
  const ord = ordinals[g.slug] ?? "";
  return {
    title: `${g.label} de cintas negras`,
    description: `La ${ord} generación de cintas negras HUMI en Ensenada: memoria, familias y permanencia en el dojang.`,
    ogImage: `/images/${g.image}.jpg`,
  };
}

export const HUB_SEO = {
  poomsae: {
    title: "Poomsae · Formas de Taekwondo",
    description:
      "Taeguk 1–8 y formas de dan: guía de poomsae en HUMI Taekwondo, Ensenada. Técnica, respiración y memoria en el tatami.",
    ogImage: "/images/pic29.jpg",
  },
  comunidad: {
    title: "Comunidad HUMI Taekwondo",
    description:
      "Familias, generaciones de cintas negras y cultura del dojang en Ensenada. Comunidad HUMI Taekwondo — más que clases.",
    ogImage: "/images/pic25.jpg",
  },
  generaciones: {
    title: "Generaciones de cintas negras",
    description:
      "Ocho generaciones de cintas negras HUMI: archivo fotográfico y memoria de quienes eligieron quedarse. Ensenada, B.C.",
    ogImage: "/images/first-generation-black-belts.jpg",
  },
  internacional: {
    title: "Taekwondo olímpico · México",
    description:
      "Beijing, Tokyo y París: archivo olímpico del Taekwondo mexicano. Contexto e inspiración desde HUMI, Ensenada.",
    ogImage: "/images/pic42.jpg",
  },
  equipo: {
    title: "Equipo e instructores HUMI",
    description:
      "Paulina Noriega (5.º dan), instructores certificados y respaldo WTU México. Equipo HUMI Taekwondo en Ensenada.",
    ogImage: "/images/pic03.jpg",
  },
};
