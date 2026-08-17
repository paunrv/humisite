/**
 * Experiencias HUMI — archivo editorial de experiencias anuales.
 *
 * Media: drop/replace files in `public/experiencias-humi/`, then reference
 * the public path here (e.g. `/experiencias-humi/sunday-funday-01.jpg`).
 * No sync scripts. No generated maps.
 *
 * Display order: newest → oldest.
 */

export type ExperienciaMediaType = "poster" | "image" | "video";

export type ExperienciaMediaItem = {
  type: ExperienciaMediaType;
  src: string;
};

export type ExperienciaHumi = {
  id: number;
  year: string;
  title: string;
  category: string;
  guest?: string;
  subtitle?: string;
  /** ~35–45 words. */
  description: string;
  /** Ordered media the chapter may render. Layout adapts to what is present. */
  media: ExperienciaMediaItem[];
};

export type ExperienciaMediaComposition =
  | "editorial"
  | "poster-video"
  | "video"
  | "poster"
  | "none";

/** Derive the editorial composition from available media items. */
export function resolveMediaComposition(
  media: ExperienciaMediaItem[],
): ExperienciaMediaComposition {
  const poster = media.find((item) => item.type === "poster");
  const images = media.filter((item) => item.type === "image");
  const video = media.find((item) => item.type === "video");

  if (poster && images.length >= 2) return "editorial";
  if (poster && video) return "poster-video";
  if (video) return "video";
  if (poster && images.length > 0) return "editorial";
  if (poster) return "poster";
  return "none";
}

export function getPoster(media: ExperienciaMediaItem[]): string | undefined {
  return media.find((item) => item.type === "poster")?.src;
}

export function getImages(media: ExperienciaMediaItem[]): string[] {
  return media.filter((item) => item.type === "image").map((item) => item.src);
}

export function getVideo(media: ExperienciaMediaItem[]): string | undefined {
  return media.find((item) => item.type === "video")?.src;
}

/**
 * Newest first → oldest last.
 * `id` is the chapter mark in the journey (01 = today, 06 = beginning).
 */
export const EXPERIENCIAS_HUMI: ExperienciaHumi[] = [
  {
    id: 1,
    year: "2025",
    title: "Sunday Funday",
    category: "Clase Magistral · Jesús Aguilar",
    subtitle: "Atleta oficial de UFC",
    media: [
      { type: "poster", src: "/experiencias-humi/sunday-funday-poster.jpg" },
      { type: "image", src: "/experiencias-humi/sunday-funday-01.jpg" },
      { type: "image", src: "/experiencias-humi/sunday-funday-04.jpg" },
    ],
    description:
      "Para celebrar el 15.º aniversario de HUMI, reunimos a nuestra comunidad en una experiencia única con un ronqueo de atún y una clase magistral con el atleta de UFC Jesús Aguilar, en una marina de Ensenada.",
  },
  {
    id: 2,
    year: "2024",
    title: "Taekwondo Games",
    category: "Competencia Comunitaria",
    media: [
      { type: "poster", src: "/experiencias-humi/taekwondo-games.jpg" },
      // Shared with Moments reels (synced via npm run sync:videos).
      { type: "video", src: "/videos/moments/taekwondo-games.mp4" },
    ],
    description:
      "La competencia comunitaria que reunió a todas las generaciones en un mismo piso. Alumnos compitieron, se apoyaron y celebraron, convirtiendo un solo fin de semana en el retrato vivo de todo lo que HUMI había construido con los años.",
  },
  {
    id: 3,
    year: "2023",
    title: "KI Games",
    category: "Fin de Semana de Rendimiento",
    guest: "Gabriel Bracamontes",
    media: [],
    description:
      "Un fin de semana de rendimiento que fue más allá del formato habitual de clase. El dojang se convirtió en escenario de intensidad, técnica y el esfuerzo compartido que transforma una escuela en una familia unida por un propósito.",
  },
  {
    id: 4,
    year: "2022",
    title: "Rumble HUMI Interno WTU",
    category: "Competencia Interna",
    media: [],
    description:
      "Una competencia interna bajo estándares de World Taekwondo Union. Los atletas midieron meses de preparación contra sus propios compañeros, demostrando que el crecimiento más intenso a menudo nace dentro de la comunidad que los formó.",
  },
  {
    id: 5,
    year: "2019",
    title: "2º Bootcamp Olímpico de TKD",
    category: "Clase Magistral",
    guest: "Joel González",
    subtitle: "Campeón Olímpico · Londres 2012",
    media: [],
    description:
      "Un segundo año, un segundo campeón. El fuego olímpico volvió al dojang y profundizó una tradición de clases magistrales de clase mundial que define el ritmo anual de HUMI y eleva a cada alumno en el tatami.",
  },
  {
    id: 6,
    year: "2018",
    title: "1er Bootcamp Olímpico de TKD",
    category: "Clase Magistral",
    guest: "Carlo Molfetta",
    subtitle: "Campeón Olímpico · Londres 2012",
    media: [],
    description:
      "HUMI abrió sus puertas al entrenamiento de nivel olímpico por primera vez. Precisión e intensidad de Londres 2012 llegaron a Ensenada y fijaron un nuevo estándar de lo que nuestra comunidad podía aspirar a ser cada año.",
  },
];

export function formatEdition(id: number): string {
  return String(id).padStart(2, "0");
}

/** Assert descriptions stay in the 35–45 word band (dev aid). */
export function descriptionWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
