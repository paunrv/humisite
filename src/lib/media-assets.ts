/**
 * Editorial media registry — semantic IDs, categories, and legacy aliases.
 * Paths are served from /public/images/ after `npm run sync:media`.
 */

export type MediaCategory =
  | "belts"
  | "dan-grades"
  | "poomsae"
  | "generations"
  | "international"
  | "training"
  | "community"
  | "origins";

export type MediaAsset = {
  id: string;
  file: string;
  category: MediaCategory;
  /** Former filename stem, e.g. pic19 */
  legacy?: string;
  alt: string;
};

const ext = ".jpg";

/** pic19–pic39 → semantic editorial names */
export const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: "tkdo-beginning",
    file: `tkdo-beginning${ext}`,
    category: "origins",
    legacy: "pic19",
    alt: "Orígenes del Taekwondo — primeras etapas",
  },
  {
    id: "beijing",
    file: `beijing${ext}`,
    category: "international",
    legacy: "pic20",
    alt: "Inspiración olímpica — atmósfera internacional",
  },
  {
    id: "dan-02",
    file: `dan-02${ext}`,
    category: "dan-grades",
    legacy: "pic21",
    alt: "Segundo dan — hito de maestría",
  },
  {
    id: "orange-belt",
    file: `orange-belt${ext}`,
    category: "belts",
    legacy: "pic22",
    alt: "Cinturón naranja — progresión",
  },
  {
    id: "white-belt",
    file: `white-belt${ext}`,
    category: "belts",
    legacy: "pic23",
    alt: "Cinturón blanco — primeros pasos",
  },
  {
    id: "dan-03",
    file: `dan-03${ext}`,
    category: "dan-grades",
    legacy: "pic24",
    alt: "Tercer dan — hito de maestría",
  },
  {
    id: "first-generation-black-belts",
    file: `first-generation-black-belts${ext}`,
    category: "generations",
    legacy: "pic25",
    alt: "Primera generación de cintas negras HUMI",
  },
  {
    id: "second-generation-black-belts",
    file: `second-generation-black-belts${ext}`,
    category: "generations",
    legacy: "pic26",
    alt: "Segunda generación de cintas negras HUMI",
  },
  {
    id: "third-generation-black-belts",
    file: `third-generation-black-belts${ext}`,
    category: "generations",
    legacy: "pic27",
    alt: "Tercera generación de cintas negras HUMI",
  },
  {
    id: "dan-04",
    file: `dan-04${ext}`,
    category: "dan-grades",
    legacy: "pic28",
    alt: "Cuarto dan — hito de maestría",
  },
  {
    id: "poomsae",
    file: `poomsae${ext}`,
    category: "poomsae",
    legacy: "pic29",
    alt: "Poomsae — precisión y disciplina del movimiento",
  },
  {
    id: "fifth-generation-black-belts",
    file: `fifth-generation-black-belts${ext}`,
    category: "generations",
    legacy: "pic30",
    alt: "Quinta generación de cintas negras HUMI",
  },
  {
    id: "sixth-generation-black-belts",
    file: `sixth-generation-black-belts${ext}`,
    category: "generations",
    legacy: "pic31",
    alt: "Sexta generación de cintas negras HUMI",
  },
  {
    id: "seventh-generation-black-belts",
    file: `seventh-generation-black-belts${ext}`,
    category: "generations",
    legacy: "pic32",
    alt: "Séptima generación de cintas negras HUMI",
  },
  {
    id: "red-belt",
    file: `red-belt${ext}`,
    category: "belts",
    legacy: "pic33",
    alt: "Cinturón rojo — madurez y control emocional",
  },
  {
    id: "eighth-generation-black-belts",
    file: `eighth-generation-black-belts${ext}`,
    category: "generations",
    legacy: "pic34",
    alt: "Octava generación de cintas negras HUMI",
  },
  {
    id: "fourth-generation-black-belts",
    file: `fourth-generation-black-belts${ext}`,
    category: "generations",
    legacy: "pic35",
    alt: "Cuarta generación de cintas negras HUMI",
  },
  {
    id: "dan-05",
    file: `dan-05${ext}`,
    category: "dan-grades",
    legacy: "pic36",
    alt: "Quinto dan — hito de maestría",
  },
  {
    id: "blue-belt",
    file: `blue-belt${ext}`,
    category: "belts",
    legacy: "pic37",
    alt: "Cinturón azul — permanencia y madurez",
  },
  {
    id: "paris",
    file: `paris${ext}`,
    category: "international",
    legacy: "pic38",
    alt: "París — movimiento y aspiración internacional",
  },
  {
    id: "tokyo",
    file: `tokyo${ext}`,
    category: "international",
    legacy: "pic39",
    alt: "Tokyo — disciplina e inspiración olímpica",
  },
];

const byId = new Map(MEDIA_ASSETS.map((a) => [a.id, a]));

/** Public URL for a semantic image id */
export function imageSrc(id: string): string {
  const asset = byId.get(id);
  if (!asset) throw new Error(`Unknown media id: ${id}`);
  return `/images/${asset.file}`;
}

export function assetsByCategory(category: MediaCategory): MediaAsset[] {
  return MEDIA_ASSETS.filter((a) => a.category === category);
}

/** Blog slug → hero / OG image */
export const BLOG_FEATURED_IMAGE: Record<string, string> = {
  "blog-historia-del-taekwondo": "tkdo-beginning",
  "blog-beijing-2008-taekwondo-mexico": "beijing",
  "blog-paris-2024-taekwondo-mexico": "paris",
  "blog-tokyo-2020-taekwondo-mexico": "tokyo",
  "blog-poomsae-que-es-y-por-que-entrenarlo": "poomsae",
  "blog-cinturon-blanco-taekwondo": "white-belt",
  "blog-cinturon-naranja-taekwondo": "orange-belt",
  "blog-cinturon-amarillo-taekwondo": "poomsae",
  "blog-cinturon-verde-taekwondo": "poomsae",
  "blog-cinturon-azul-taekwondo": "blue-belt",
  "blog-cinturon-rojo-taekwondo": "red-belt",
  "blog-cinta-negra-taekwondo": "dan-02",
  "blog-segundo-dan-taekwondo": "dan-02",
  "blog-tercer-dan-taekwondo": "dan-03",
  "blog-cuarto-dan-taekwondo": "dan-04",
  "blog-quinto-dan-taekwondo": "dan-05",
};

export function blogFeaturedSrc(slug: string): string | undefined {
  const id = BLOG_FEATURED_IMAGE[slug];
  return id ? imageSrc(id) : undefined;
}
