/**
 * Editorial blog sitemap — belts live inside /blog as memoir chapters.
 */

import { SITE_REDIRECTS } from "./site-config.mjs";

export const BLOG_CATEGORIES = [
  { slug: "cinturones", label: "Cinturones", lede: "Capítulos de una vida en movimiento. Memoria, identidad y permanencia." },
  { slug: "comunidad", label: "Comunidad", lede: "Familias, dojang y vínculos que sostienen el camino." },
  { slug: "movimiento", label: "Movimiento", lede: "Cuerpo, combate, historia y archivo del tatami." },
  { slug: "disciplina", label: "Disciplina", lede: "Filosofía, cultura y hábitos que se entrenan." },
  { slug: "poomsae", label: "Poomsae", lede: "Formas como memoria, respiración y respeto propio." },
  { slug: "journal", label: "HUMI Journal", lede: "Línea olímpica, contexto y lecturas largas." },
];

/** Cover image → /images/{id}.jpg (copied by sync:media from humisite pic*) */
export const ARTICLE_IMAGES = {
  "cinturon-blanco": "pic11",
  "cinturon-naranja": "pic07",
  "cinturon-amarillo": "pic23",
  "cinturon-verde": "pic16",
  "cinturon-azul": "pic01",
  "cinturon-rojo": "pic33",
  "cinturon-negro": "pic24",
  "segundo-dan": "pic03",
  "tercer-dan": "pic27",
  "cuarto-dan": "pic28",
  "quinto-dan": "pic36",
  "taekwondo-y-su-filosofia": "pic05",
  "historia-del-taekwondo": "pic06",
  "juramento-reglas-y-vocabulario": "pic39",
  "poomsae-que-es-y-por-que-entrenarlo": "pic29",
  "kyorugi-como-se-puntua": "pic04",
  "victor-estrada-sydney-2000": "pic40",
  "atenas-2004-hermanos-salazar": "pic41",
  "beijing-2008-taekwondo-mexico": "pic42",
  "londres-2012-taekwondo-mexico": "pic43",
  "rio-2016-taekwondo-mexico": "pic44",
  "tokyo-2020-taekwondo-mexico": "pic45",
  "paris-2024-taekwondo-mexico": "pic46",
};

/** Slugs whose file extension is not .jpg after sync:media */
export const ARTICLE_IMAGE_EXT = {
  "paris-2024-taekwondo-mexico": "png",
};

export function articleImageSrc(slug, imageId = ARTICLE_IMAGES[slug]) {
  const id = imageId ?? ARTICLE_IMAGES[slug] ?? "pic29";
  const ext = ARTICLE_IMAGE_EXT[slug] ?? "jpg";
  return `/images/${id}.${ext}`;
}

/** Optional SEO overrides (title in SERP, meta description). */
export const BLOG_SEO_OVERRIDES = {
  "taekwondo-y-su-filosofia": {
    seoDescription:
      "Qué significa Taekwondo más allá del tatami: valores, respeto y práctica diaria. Guía clara para familias en Ensenada.",
  },
  "historia-del-taekwondo": {
    seoDescription:
      "Origen coreano, General Choi Hong Hi y cómo llegó el Taekwondo a México. Contexto histórico para entrenar con sentido.",
  },
  "juramento-reglas-y-vocabulario": {
    seoDescription:
      "Juramento, reglas de combate y vocabulario en coreano que escucharás en el dojang. Cultura y respeto en clase.",
  },
  "beijing-2008-taekwondo-mexico": {
    seoTitle: "Beijing 2008: doble oro del Taekwondo mexicano",
    seoDescription:
      "Doble oro en Beijing 2008: Guillermo Pérez (-58 kg) y María Espinoza (+67 kg). México como potencia olímpica del Taekwondo.",
  },
  "londres-2012-taekwondo-mexico": {
    seoTitle: "Londres 2012 · Taekwondo mexicano",
    seoDescription:
      "Continuidad de élite tras Beijing: presión, ranking y generación que sostuvo al Taekwondo mexicano en el podio olímpico.",
  },
  "rio-2016-taekwondo-mexico": {
    seoTitle: "Río 2016 · Taekwondo mexicano",
    seoDescription:
      "Chaleco electrónico, presión olímpica y la plata de María Espinoza. Cómo cambió competir en la era del marcador digital.",
  },
  "tokyo-2020-taekwondo-mexico": {
    seoTitle: "Tokyo 2020 · Taekwondo mexicano",
    seoDescription:
      "Juegos sin público, debate de reglas y un ciclo olímpico difícil. Lecciones del Taekwondo mexicano en la pandemia.",
  },
  "paris-2024-taekwondo-mexico": {
    seoTitle: "París 2024 · Taekwondo mexicano",
    seoDescription:
      "Ranking, hambre post-Tokyo y lecciones de podio. Qué dejó París 2024 al Taekwondo mexicano y al circuito mundial.",
  },
};

/** @type {Array<{ slug: string, source: string, category: string, seriesLabel?: string, title: string, excerpt: string, image?: string, seoTitle?: string, seoDescription?: string }>} */
export const BLOG_ARTICLES = [
  { slug: "cinturon-blanco", source: "blog-cinturon-blanco-taekwondo.html", category: "cinturones", seriesLabel: "Cinta blanca", title: "El inicio nunca necesita explicación", excerpt: "Inocencia, curiosidad y la niña que entró descalza sin imaginar lo que vendría." },
  { slug: "cinturon-naranja", source: "blog-cinturon-naranja-taekwondo.html", category: "cinturones", seriesLabel: "Cinta naranja", title: "Descubrir que avanzar también se aprende", excerpt: "Perseverancia, el primer examen y la primera tabla rota." },
  { slug: "cinturon-amarillo", source: "blog-cinturon-amarillo-taekwondo.html", category: "cinturones", seriesLabel: "Cinta amarilla", title: "El momento donde entiendes que puedes mejorar", excerpt: "La tierra, el esfuerzo con consecuencias y el primer sentido de pertenencia." },
  { slug: "cinturon-verde", source: "blog-cinturon-verde-taekwondo.html", category: "cinturones", seriesLabel: "Cinta verde", title: "Crecer también significa echar raíces", excerpt: "Cuando el dojang deja de ser actividad y se vuelve estilo de vida." },
  { slug: "cinturon-azul", source: "blog-cinturon-azul-taekwondo.html", category: "cinturones", seriesLabel: "Cinta azul", title: "El día que descubrí el miedo", excerpt: "Permanencia, golpes de verdad y aprender a moverte con el miedo." },
  { slug: "cinturon-rojo", source: "blog-cinturon-rojo-taekwondo.html", category: "cinturones", seriesLabel: "Cinta roja", title: "Aprender a controlar la fuerza", excerpt: "Nervios, madurez y las batallas que se ganan antes del combate." },
  { slug: "cinturon-negro", source: "blog-cinta-negra-taekwondo.html", category: "cinturones", seriesLabel: "1.º dan · Cinta negra", title: "El inicio que todos confunden con el final", excerpt: "Conciencia, disciplina invisible y el año donde el Taekwondo dejó de ser extracurricular." },
  { slug: "segundo-dan", source: "blog-segundo-dan-taekwondo.html", category: "cinturones", seriesLabel: "2.º dan", title: "Cuando la disciplina se convierte en identidad", excerpt: "Consolidación, combates que dejan de sentirse caóticos y confianza sin ruido." },
  { slug: "tercer-dan", source: "blog-tercer-dan-taekwondo.html", category: "cinturones", seriesLabel: "3.º dan", title: "El día que planté HUMI", excerpt: "Enseñanza, propósito y la segunda semilla que cambió todo." },
  { slug: "cuarto-dan", source: "blog-cuarto-dan-taekwondo.html", category: "cinturones", seriesLabel: "4.º dan", title: "Construir una vida a través del movimiento", excerpt: "Siete años de promesa, comunidad y permanencia que construye estructura." },
  { slug: "quinto-dan", source: "blog-quinto-dan-taekwondo.html", category: "cinturones", seriesLabel: "5.º dan", title: "Ver crecer generaciones", excerpt: "Legado, la séptima generación de cintas negras y permanecer como forma de amar." },
  { slug: "taekwondo-y-su-filosofia", source: "blog-taekwondo-y-su-filosofia.html", category: "disciplina", title: "Taekwondo y su filosofía", excerpt: "Significado, valores y práctica cotidiana." },
  { slug: "historia-del-taekwondo", source: "blog-historia-del-taekwondo.html", category: "movimiento", title: "Historia del Taekwondo", excerpt: "Origen coreano y desarrollo en México." },
  { slug: "juramento-reglas-y-vocabulario", source: "blog-juramento-reglas-y-vocabulario-del-taekwondo.html", category: "disciplina", title: "Juramento, reglas y vocabulario", excerpt: "Cultura y palabras que escucharás en clase." },
  { slug: "poomsae-que-es-y-por-que-entrenarlo", source: "blog-poomsae-que-es-y-por-que-entrenarlo.html", category: "poomsae", title: "Poomsae: qué es y por qué entrenarlo", excerpt: "Formas, memoria muscular y base del combate." },
  { slug: "kyorugi-como-se-puntua", source: "blog-kyorugi-como-se-puntua-el-combate.html", category: "movimiento", title: "Kyorugi: cómo se puntúa el combate", excerpt: "Rounds, puntos electrónicos y penalizaciones." },
  { slug: "victor-estrada-sydney-2000", source: "blog-victor-estrada-sydney-2000.html", category: "journal", title: "Sydney 2000 — Víctor Estrada", excerpt: "Primera medalla olímpica del Taekwondo mexicano." },
  { slug: "atenas-2004-hermanos-salazar", source: "blog-atenas-2004-hermanos-salazar.html", category: "journal", title: "Atenas 2004 — Hermanos Salazar", excerpt: "Óscar Salazar y la plata en -58 kg." },
  { slug: "beijing-2008-taekwondo-mexico", source: "blog-beijing-2008-taekwondo-mexico.html", category: "journal", title: "Beijing 2008", excerpt: "Doble oro: Guillermo Pérez y María Espinoza." },
  { slug: "londres-2012-taekwondo-mexico", source: "blog-londres-2012-taekwondo-mexico.html", category: "journal", title: "Londres 2012", excerpt: "Elite sostenida tras Beijing." },
  { slug: "rio-2016-taekwondo-mexico", source: "blog-rio-2016-taekwondo-mexico.html", category: "journal", title: "Río 2016", excerpt: "Electrónico, presión y plata de María Espinoza." },
  { slug: "tokyo-2020-taekwondo-mexico", source: "blog-tokyo-2020-taekwondo-mexico.html", category: "journal", title: "Tokyo 2020", excerpt: "Pandemia, debate y ciclo sin medalla." },
  { slug: "paris-2024-taekwondo-mexico", source: "blog-paris-2024-taekwondo-mexico.html", category: "journal", title: "París 2024", excerpt: "Ranking, hambre post-Tokyo y lecciones de podio." },
].map((a) => ({
  ...a,
  image: ARTICLE_IMAGES[a.slug] ?? "pic29",
  ...(BLOG_SEO_OVERRIDES[a.slug] ?? {}),
}));

/** Legacy filenames → new /blog/{slug} paths */
export const LEGACY_REDIRECTS = [
  ...BLOG_ARTICLES.map((a) => ({
    source: `/${a.source}`,
    destination: `/blog/${a.slug}`,
    permanent: true,
  })),
  { source: "/blog-sistema-de-cinturones-taekwondo.html", destination: "/blog/categoria/cinturones", permanent: true },
  { source: "/cinturones", destination: "/blog/categoria/cinturones", permanent: true },
  { source: "/cinturones/:path*", destination: "/blog/categoria/cinturones", permanent: true },
  { source: "/sitio-editorial.html", destination: "/blog", permanent: true },
  { source: "/sitio-editorial", destination: "/blog", permanent: true },
  ...SITE_REDIRECTS,
];

export function articlePath(slug) {
  return `/blog/${slug}`;
}

export function categoryPath(slug) {
  return `/blog/categoria/${slug}`;
}
