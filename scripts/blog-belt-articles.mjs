/**
 * Belt / dan editorial articles — one image, one poomsae, optional YouTube per article.
 * Patched into HTML via scripts/patch-blog-belt-articles.mjs
 */

/** @type {Record<string, { imageId: string, alt: string, poomsae: string, youtube: string | null, poomsaeSectionId: string }>} */
export const BELT_BLOG_ARTICLES = {
  "blog-cinturon-blanco-taekwondo": {
    imageId: "white-belt",
    alt: "Cinturón blanco — primeros pasos en el dojang",
    poomsae: "Kicho 1",
    youtube: null,
    poomsaeSectionId: "poomsae-white",
  },
  "blog-cinturon-naranja-taekwondo": {
    imageId: "orange-belt",
    alt: "Cinturón naranja — progresión y repetición",
    poomsae: "Kicho 2",
    youtube: null,
    poomsaeSectionId: "poomsae-orange",
  },
  "blog-cinturon-amarillo-taekwondo": {
    imageId: "poomsae",
    alt: "Poomsae — precisión y disciplina del movimiento",
    poomsae: "Taeguk 1",
    youtube: "https://www.youtube.com/watch?v=WhkjRruCBTo",
    poomsaeSectionId: "poomsae-yellow",
  },
  "blog-cinturon-verde-taekwondo": {
    imageId: "poomsae",
    alt: "Poomsae — precisión y disciplina del movimiento",
    poomsae: "Taeguk 2",
    youtube: "https://www.youtube.com/@kukkiwonpr/search?query=taegeuk+2jang",
    poomsaeSectionId: "poomsae-green",
  },
  "blog-cinturon-azul-taekwondo": {
    imageId: "blue-belt",
    alt: "Cinturón azul — permanencia y madurez",
    poomsae: "Taeguk 4",
    youtube: "https://www.youtube.com/@kukkiwonpr/search?query=taegeuk+4jang",
    poomsaeSectionId: "poomsae-blue",
  },
  "blog-cinturon-rojo-taekwondo": {
    imageId: "red-belt",
    alt: "Cinturón rojo — madurez y control emocional",
    poomsae: "Taeguk 6",
    youtube: "https://www.youtube.com/@kukkiwonpr/search?query=taegeuk+6jang",
    poomsaeSectionId: "poomsae-red",
  },
  "blog-cinta-negra-taekwondo": {
    imageId: "dan-02",
    alt: "Segundo dan — hito de maestría",
    poomsae: "Koryo",
    youtube: "https://www.youtube.com/watch?v=mGa60JDtWmg",
    poomsaeSectionId: "poom-1",
  },
  "blog-segundo-dan-taekwondo": {
    imageId: "dan-02",
    alt: "Segundo dan — hito de maestría",
    poomsae: "Keumgang",
    youtube: "https://www.youtube.com/@kukkiwonpr/search?query=keumgang",
    poomsaeSectionId: "poom-2",
  },
  "blog-tercer-dan-taekwondo": {
    imageId: "dan-03",
    alt: "Tercer dan — hito de maestría",
    poomsae: "Taebaek",
    youtube: "https://www.youtube.com/@kukkiwonpr/search?query=taebaek",
    poomsaeSectionId: "poom-3",
  },
  "blog-cuarto-dan-taekwondo": {
    imageId: "dan-04",
    alt: "Cuarto dan — hito de maestría",
    poomsae: "Pyongwon",
    youtube: "https://www.youtube.com/@kukkiwonpr/search?query=pyongwon",
    poomsaeSectionId: "poom-4",
  },
  "blog-quinto-dan-taekwondo": {
    imageId: "dan-05",
    alt: "Quinto dan — hito de maestría",
    poomsae: "Sipjin",
    youtube: "https://www.youtube.com/@kukkiwonpr/search?query=sipjin",
    poomsaeSectionId: "poom-5",
  },
};

export const KUKKIWON_CTA = "Ver poomsae oficial de Kukkiwon";

/**
 * Hero crop tuning — aspect + object-position after visual review.
 * @type {Record<string, { aspect: "portrait" | "square" | "landscape" | "wide", focus: string }>}
 */
export const HERO_FRAMING = {
  "white-belt": { aspect: "portrait", focus: "54% 32%" },
  "orange-belt": { aspect: "square", focus: "50% 38%" },
  poomsae: { aspect: "square", focus: "50% 40%" },
  "blue-belt": { aspect: "square", focus: "50% 42%" },
  "red-belt": { aspect: "portrait", focus: "50% 46%" },
  "dan-02": { aspect: "wide", focus: "50% 36%" },
  "dan-03": { aspect: "landscape", focus: "50% 48%" },
  "dan-04": { aspect: "landscape", focus: "50% 40%" },
  "dan-05": { aspect: "square", focus: "50% 36%" },
};
