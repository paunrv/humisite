/**
 * Belt / dan editorial articles — memoir chapters inside /blog.
 * Images map to public/images/* after sync:media (legacy pic19–39).
 */

/** @typedef {{ poomsae: string, poomsaeAlt?: string, youtube: string | null }} PoomsaeEntry */

/** @type {Record<string, { imageId: string, alt: string, poomsae?: string, poomsaeAlt?: string, youtube?: string | null, poomsaes?: PoomsaeEntry[], poomsaeSectionId: string, themes?: string[] }>} */
export const BELT_BLOG_ARTICLES = {
  "blog-cinturon-blanco-taekwondo": {
    imageId: "pic11",
    alt: "Cinturón blanco — inocencia y primeros pasos",
    poomsae: "Kicho 1",
    youtube: null,
    poomsaeSectionId: "poomsae-white",
    themes: ["inocencia", "inicio", "infancia", "curiosidad"],
  },
  "blog-cinturon-naranja-taekwondo": {
    imageId: "pic07",
    alt: "Cinturón naranja — perseverancia y repetición",
    poomsae: "Kicho 2",
    youtube: null,
    poomsaeSectionId: "poomsae-orange",
    themes: ["perseverancia", "repetición", "primeros avances"],
  },
  "blog-cinturon-amarillo-taekwondo": {
    imageId: "pic23",
    alt: "Cinturón amarillo — raíces y confianza",
    poomsae: "Taeguk 1",
    poomsaeAlt: "Taeguk Il Jang · 태극1장",
    youtube: "https://www.youtube.com/watch?v=WhkjRruCBTo&t=93s",
    poomsaeSectionId: "poomsae-yellow",
    themes: ["raíces", "confianza", "crecimiento"],
  },
  "blog-cinturon-verde-taekwondo": {
    imageId: "pic16",
    alt: "Cinturón verde — identidad y pertenencia",
    poomsaes: [
      {
        poomsae: "Taeguk 2",
        poomsaeAlt: "Taeguk Yi Jang · 태극2장",
        youtube: "https://www.youtube.com/watch?v=tGlrUplKHh8",
      },
      {
        poomsae: "Taeguk 3",
        poomsaeAlt: "Taeguk Sam Jang · 태극3장",
        youtube: "https://www.youtube.com/watch?v=ksSqKt0UkWo",
      },
    ],
    poomsaeSectionId: "poomsae-green",
    themes: ["identidad", "pertenencia", "comunidad"],
  },
  "blog-cinturon-azul-taekwondo": {
    imageId: "pic01",
    alt: "Cinturón azul — miedo y permanencia",
    poomsaes: [
      {
        poomsae: "Taeguk 4",
        poomsaeAlt: "Taeguk Sam Jang · 태극4장",
        youtube: "https://www.youtube.com/watch?v=Lt917gacJho&t=688s",
      },
      {
        poomsae: "Taeguk 5",
        poomsaeAlt: "Taeguk Oh Jang · 태극5장",
        youtube: "https://www.youtube.com/watch?v=VdqNEAHWCBM",
      },
    ],
    poomsaeSectionId: "poomsae-blue",
    themes: ["miedo", "permanencia", "madurez"],
  },
  "blog-cinturon-rojo-taekwondo": {
    imageId: "pic33",
    alt: "Cinturón rojo — control emocional bajo presión",
    poomsaes: [
      {
        poomsae: "Taeguk 6",
        poomsaeAlt: "Taeguk Yuk Jang · 태극6장",
        youtube: "https://www.youtube.com/watch?v=VdqNEAHWCBM",
      },
      {
        poomsae: "Taeguk 7",
        poomsaeAlt: "Taeguk Chil Jang · 태극7장",
        youtube: "https://www.youtube.com/watch?v=6FUM1p6qqhQ&t=137s",
      },
      {
        poomsae: "Taeguk 8",
        poomsaeAlt: "Taeguk Pal Jang · 태극8장",
        youtube: "https://www.youtube.com/watch?v=Gr_Je2ZkgkI&t=303s",
      },
    ],
    poomsaeSectionId: "poomsae-red",
    themes: ["control emocional", "disciplina", "presión"],
  },
  "blog-cinta-negra-taekwondo": {
    imageId: "pic24",
    alt: "Cinta negra — conciencia e identidad",
    poomsae: "Koryo",
    poomsaeAlt: "Koryo · 고려",
    youtube: "https://www.youtube.com/watch?v=mGa60JDtWmg&t=601s",
    poomsaeSectionId: "poom-1",
    themes: ["conciencia", "identidad", "alto rendimiento"],
  },
  "blog-segundo-dan-taekwondo": {
    imageId: "pic03",
    alt: "Segundo dan — estabilidad y consolidación",
    poomsae: "Keumgang",
    poomsaeAlt: "Keumgang · 금강",
    youtube: "https://www.youtube.com/watch?v=CRGVSOmaQaY&t=16s",
    poomsaeSectionId: "poom-2",
    themes: ["estabilidad", "consolidación", "permanencia"],
  },
  "blog-tercer-dan-taekwondo": {
    imageId: "pic27",
    alt: "Tercer dan — liderazgo y nacimiento de HUMI",
    poomsae: "Taebaek",
    poomsaeAlt: "Taebaek · 태백",
    youtube: "https://www.youtube.com/watch?v=Q4dYdFRbE4U",
    poomsaeSectionId: "poom-3",
    themes: ["liderazgo", "enseñanza", "nacimiento de HUMI"],
  },
  "blog-cuarto-dan-taekwondo": {
    imageId: "pic28",
    alt: "Cuarto dan — comunidad y largo plazo",
    poomsae: "Pyongwon",
    poomsaeAlt: "Pyongwon · 평원",
    youtube: "https://www.youtube.com/watch?v=RB-7mBtvtZw",
    poomsaeSectionId: "poom-4",
    themes: ["comunidad", "estructura", "largo plazo"],
  },
  "blog-quinto-dan-taekwondo": {
    imageId: "pic36",
    alt: "Quinto dan — legado y generaciones",
    poomsae: "Sipjin",
    poomsaeAlt: "Sipjin · 십진",
    youtube: "https://www.youtube.com/watch?v=hOZB0IESJ38",
    poomsaeSectionId: "poom-5",
    themes: ["legado", "generaciones", "madurez"],
  },
};

export const KUKKIWON_CTA = "Ver poomsae oficial de Kukkiwon";
export const KUKKIWON_LINK_LABEL = "YouTube";

/** @type {Record<string, { aspect: "portrait" | "square" | "landscape" | "wide", focus: string }>} */
export const HERO_FRAMING = {
  pic11: { aspect: "portrait", focus: "54% 32%" },
  pic07: { aspect: "square", focus: "50% 38%" },
  pic23: { aspect: "square", focus: "50% 40%" },
  pic16: { aspect: "landscape", focus: "50% 42%" },
  pic03: { aspect: "landscape", focus: "50% 40%" },
  pic06: { aspect: "landscape", focus: "50% 40%" },
  pic01: { aspect: "square", focus: "50% 42%" },
  pic33: { aspect: "portrait", focus: "50% 46%" },
  pic24: { aspect: "landscape", focus: "50% 48%" },
  pic28: { aspect: "wide", focus: "50% 36%" },
  pic27: { aspect: "landscape", focus: "50% 44%" },
  pic36: { aspect: "square", focus: "50% 36%" },
};
