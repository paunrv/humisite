/**
 * Experiencias HUMI — archivo editorial de experiencias anuales.
 *
 * Display order: newest → oldest.
 *
 * To add a future event:
 *   1. Put media in `public/signature-events/<year>/`
 *   2. Add one object to SIGNATURE_EVENTS (newest first)
 *   3. Every video must set `poster` to a still from that same year
 *   4. Set `orientation` / `aspect` from the real file
 *
 * Public URLs are `/signature-events/<year>/<filename>`.
 * Filenames with spaces are stored as-is and encoded at render time.
 * Video posters are never inferred from array order.
 */

export type SignatureMediaType = "poster" | "image" | "video";

export type SignatureMediaOrientation = "portrait" | "landscape";

export type SignatureMediaItem = {
  type: SignatureMediaType;
  src: string;
  /**
   * Explicit thumbnail for `type: "video"` only.
   * Never inferred from other items or other events.
   */
  poster?: string;
  /** Cover-crop focus when the frame still needs a nudge. */
  objectPosition?: string;
  orientation?: SignatureMediaOrientation;
  /** CSS aspect-ratio, e.g. "3 / 4" or "9 / 16". */
  aspect?: string;
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
  media: SignatureMediaItem[];
};

export function hasRenderableMedia(media: SignatureMediaItem[]): boolean {
  return media.length > 0;
}

export function publicMediaSrc(src: string): string {
  return encodeURI(src);
}

export function isPortrait(item: SignatureMediaItem): boolean {
  if (item.orientation === "portrait") return true;
  if (item.orientation === "landscape") return false;
  return item.type === "video";
}

/**
 * Newest first → oldest last.
 * Aspects below were measured from the files on disk.
 */
export const SIGNATURE_EVENTS: SignatureEvent[] = [
  {
    id: 1,
    year: "2025",
    title: "Sunday Funday",
    category: "Clase Magistral · Jesús Aguilar",
    subtitle: "Atleta oficial de UFC",
    media: [
      {
        type: "poster",
        src: "/signature-events/2025/sunday-funday-poster.jpg",
        orientation: "portrait",
        aspect: "3 / 4",
      },
      {
        type: "image",
        src: "/signature-events/2025/sunday-funday-01.jpg",
        orientation: "landscape",
        aspect: "4 / 3",
      },
      {
        type: "image",
        src: "/signature-events/2025/sunday-funday-04.jpg",
        orientation: "portrait",
        aspect: "4 / 5",
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
      {
        type: "video",
        src: "/signature-events/2024/Taekwondo Games.mp4",
        poster: "/signature-events/2024/taekwondo-games.jpg",
        orientation: "portrait",
        aspect: "9 / 16",
      },
      {
        type: "video",
        src: "/signature-events/2024/tkd-games-previ.mp4",
        poster: "/signature-events/2024/taekwondo-games.jpg",
        orientation: "portrait",
        aspect: "9 / 16",
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
      {
        type: "image",
        src: "/signature-events/2023/ki-games.jpg",
        orientation: "landscape",
        aspect: "1375 / 719",
      },
      {
        type: "video",
        src: "/signature-events/2023/ki games.mp4",
        poster: "/signature-events/2023/ki-games.jpg",
        orientation: "portrait",
        aspect: "9 / 16",
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
    media: [
      {
        type: "video",
        src: "/signature-events/2022/Ruumble Humi.mp4",
        poster: "/signature-events/2022/rumble-humi-poster.jpg",
        orientation: "portrait",
        aspect: "9 / 16",
      },
    ],
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
        type: "image",
        src: "/signature-events/2019/2nd-tkdolympicbootcamp.jpg",
        orientation: "landscape",
        aspect: "3 / 2",
      },
      {
        type: "image",
        src: "/signature-events/2019/2nd-tkdolympicbootcamp-01.jpg",
        orientation: "landscape",
        aspect: "3 / 2",
      },
      {
        type: "image",
        src: "/signature-events/2019/2nd-tkdolympicbootcamp-02.jpg",
        orientation: "landscape",
        aspect: "3 / 2",
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
        type: "image",
        src: "/signature-events/2018/1st-tkdolympicbootcamp.jpg",
        orientation: "landscape",
        aspect: "3 / 2",
      },
      {
        type: "image",
        src: "/signature-events/2018/1st-tkdolympicbootcamp-01.jpg",
        orientation: "landscape",
        aspect: "3 / 2",
      },
      {
        type: "image",
        src: "/signature-events/2018/1st-tkdolympicbootcamp-02.jpg",
        orientation: "landscape",
        aspect: "3 / 2",
      },
    ],
    description:
      "HUMI abrió sus puertas al entrenamiento de nivel olímpico por primera vez. Precisión e intensidad de Londres 2012 llegaron a Ensenada y fijaron un nuevo estándar de lo que nuestra comunidad podía aspirar a ser cada año.",
  },
];

export function formatEdition(id: number): string {
  return String(id).padStart(2, "0");
}

export function descriptionWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
