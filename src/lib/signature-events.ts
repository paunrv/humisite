/**
 * Experiencias HUMI — archivo editorial de experiencias anuales.
 *
 * Display order: newest → oldest.
 *
 * To add a future event:
 *   1. Put media in `public/signature-events/<year>/`
 *   2. Add one object to SIGNATURE_EVENTS (newest first)
 *   3. For every video, set `poster` to a still from THAT event
 *
 * Public URLs are `/signature-events/<year>/<filename>`.
 * Filenames with spaces are stored as-is and encoded at render time.
 */

export type SignatureMediaType = "poster" | "image" | "video";

export type SignatureMediaItem = {
  type: SignatureMediaType;
  src: string;
  /**
   * Explicit thumbnail for `type: "video"` only.
   * Never inferred from other items or other events.
   */
  poster?: string;
  /** Cover-crop focus. Use when a frame would otherwise hide the subject. */
  objectPosition?: string;
};

export type SignatureEvent = {
  id: number;
  year: string;
  title: string;
  category: string;
  guest?: string;
  subtitle?: string;
  /** ~35–45 words. */
  description: string;
  /** Ordered media the chapter may render. Layout adapts to what is present. */
  media: SignatureMediaItem[];
};

/** Stills shown in the chapter gallery (designed poster + photographs). */
export function getVisuals(media: SignatureMediaItem[]): SignatureMediaItem[] {
  return media.filter((item) => item.type === "poster" || item.type === "image");
}

export function getVideos(media: SignatureMediaItem[]): SignatureMediaItem[] {
  return media.filter((item) => item.type === "video");
}

export function hasRenderableMedia(media: SignatureMediaItem[]): boolean {
  return media.length > 0;
}

/** Encode a public path so filenames with spaces resolve. */
export function publicMediaSrc(src: string): string {
  return encodeURI(src);
}

/**
 * Newest first → oldest last.
 * `id` is the chapter mark (01 = most recent, 06 = beginning).
 *
 * Only paths that exist on disk are listed.
 * Videos must declare their own `poster` — never infer it.
 */
export const SIGNATURE_EVENTS: SignatureEvent[] = [
  {
    id: 1,
    year: "2025",
    title: "Sunday Funday",
    category: "Clase Magistral · Jesús Aguilar",
    subtitle: "Atleta oficial de UFC",
    media: [
      { type: "poster", src: "/signature-events/2025/sunday-funday-poster.jpg" },
      { type: "image", src: "/signature-events/2025/sunday-funday-01.jpg" },
      {
        type: "image",
        src: "/signature-events/2025/sunday-funday-04.jpg",
        objectPosition: "center top",
      },
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
      { type: "image", src: "/signature-events/2024/taekwondo-games.jpg" },
      {
        type: "video",
        src: "/signature-events/2024/Taekwondo Games.mp4",
        poster: "/signature-events/2024/taekwondo-games.jpg",
      },
      {
        type: "video",
        src: "/signature-events/2024/taekwondo-games-previ.mp4",
        poster: "/signature-events/2024/taekwondo-games.jpg",
      },
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
    media: [
      { type: "image", src: "/signature-events/2023/ki-games.jpg" },
      {
        type: "video",
        src: "/signature-events/2023/ki games.mp4",
        poster: "/signature-events/2023/ki-games.jpg",
      },
    ],
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
    media: [
      {
        type: "poster",
        src: "/signature-events/2019/2nd-tkdolympicbootcamp.jpg",
        objectPosition: "center 40%",
      },
      {
        type: "image",
        src: "/signature-events/2019/2nd-tkdolympicbootcamp-01.jpg",
        objectPosition: "center 30%",
      },
      {
        type: "image",
        src: "/signature-events/2019/2nd-tkdolympicbootcamp-02.jpg",
        objectPosition: "center 45%",
      },
    ],
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
    media: [
      {
        type: "poster",
        src: "/signature-events/2018/1st-tkdolympicbootcamp.jpg",
        objectPosition: "center 40%",
      },
      {
        type: "image",
        src: "/signature-events/2018/1st-tkdolympicbootcamp-01.jpg",
        objectPosition: "center 35%",
      },
      {
        type: "image",
        src: "/signature-events/2018/1st-tkdolympicbootcamp-02.jpg",
        objectPosition: "center 40%",
      },
    ],
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
