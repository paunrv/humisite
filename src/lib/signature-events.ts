/**
 * Eventos Emblemáticos — archivo editorial de experiencias anuales de HUMI.
 *
 * Media: ONLY exact curated files from media/signature-events/ (and video/),
 * synced by scripts/sync-signature-media.mjs + sync-signature-recaps.mjs.
 * Never reference placeholder or “similar” assets.
 */

import { CURATED_EVENT_MEDIA } from "@/lib/signature-events-media.generated";

export type SignatureEvent = {
  id: number;
  year: string;
  title: string;
  category: string;
  guest?: string;
  subtitle?: string;
  /** Optional. Omit / null → not rendered. */
  poster?: string | null;
  photo1?: string | null;
  photo2?: string | null;
  recapVideo?: string | null;
  recapThumbnail?: string | null;
  /** ~35–45 words. */
  description: string;
};

/** Non-empty media paths only — use before rendering. */
export function presentMedia(
  ...srcs: Array<string | null | undefined>
): string[] {
  return srcs.filter((src): src is string => typeof src === "string" && src.length > 0);
}

function mediaFor(year: string) {
  return CURATED_EVENT_MEDIA[year] ?? {};
}

export const SIGNATURE_EVENTS: SignatureEvent[] = [
  {
    id: 1,
    year: "2018",
    title: "1er Bootcamp Olímpico de TKD",
    category: "Clase Magistral",
    guest: "Carlo Molfetta",
    subtitle: "Campeón Olímpico · Londres 2012",
    ...mediaFor("2018"),
    description:
      "HUMI abrió sus puertas al entrenamiento de nivel olímpico por primera vez. Precisión e intensidad de Londres 2012 llegaron a Ensenada y fijaron un nuevo estándar de lo que nuestra comunidad podía aspirar a ser cada año.",
  },
  {
    id: 2,
    year: "2019",
    title: "2º Bootcamp Olímpico de TKD",
    category: "Clase Magistral",
    guest: "Joel González",
    subtitle: "Campeón Olímpico · Londres 2012",
    ...mediaFor("2019"),
    description:
      "Un segundo año, un segundo campeón. El fuego olímpico volvió al dojang y profundizó una tradición de clases magistrales de clase mundial que define el ritmo anual de HUMI y eleva a cada alumno en el tatami.",
  },
  {
    id: 3,
    year: "2022",
    title: "Rumble HUMI Interno WTU",
    category: "Competencia Interna",
    ...mediaFor("2022"),
    description:
      "Una competencia interna bajo estándares de World Taekwondo Union. Los atletas midieron meses de preparación contra sus propios compañeros, demostrando que el crecimiento más intenso a menudo nace dentro de la comunidad que los formó.",
  },
  {
    id: 4,
    year: "2023",
    title: "KI Games",
    category: "Fin de Semana de Rendimiento",
    guest: "Gabriel Bracamontes",
    ...mediaFor("2023"),
    description:
      "Un fin de semana de rendimiento que fue más allá del formato habitual de clase. El dojang se convirtió en escenario de intensidad, técnica y el esfuerzo compartido que transforma una escuela en una familia unida por un propósito.",
  },
  {
    id: 5,
    year: "2024",
    title: "Taekwondo Games",
    category: "Competencia Comunitaria",
    ...mediaFor("2024"),
    description:
      "La competencia comunitaria que reunió a todas las generaciones en un mismo piso. Alumnos compitieron, se apoyaron y celebraron, convirtiendo un solo fin de semana en el retrato vivo de todo lo que HUMI había construido con los años.",
  },
  {
    id: 6,
    year: "2025",
    title: "Sunday Funday",
    category: "Clase Magistral",
    guest: "Jesús Aguilar",
    subtitle: "Atleta oficial de UFC",
    ...mediaFor("2025"),
    description:
      "La técnica se encontró con el entretenimiento en una clase magistral que llenó el dojang de energía. Una comunidad que entrena duro y sabe disfrutar el camino juntos hizo que el día se sintiera como una sola casa bajo el mismo techo.",
  },
];

export function formatEdition(id: number): string {
  return String(id).padStart(2, "0");
}

/** Assert descriptions stay in the 35–45 word band (dev aid). */
export function descriptionWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export type HostedVideoKind = "youtube" | "vimeo" | "file";

export function getRecapVideoKind(src: string): HostedVideoKind {
  if (/youtube\.com|youtu\.be/i.test(src)) return "youtube";
  if (/vimeo\.com/i.test(src)) return "vimeo";
  return "file";
}

export function getYouTubeEmbedId(src: string): string | null {
  const short = src.match(/youtu\.be\/([\w-]{6,})/i);
  if (short?.[1]) return short[1];
  const watch = src.match(/[?&]v=([\w-]{6,})/i);
  if (watch?.[1]) return watch[1];
  const embed = src.match(/youtube\.com\/embed\/([\w-]{6,})/i);
  return embed?.[1] ?? null;
}

export function getVimeoEmbedId(src: string): string | null {
  const match = src.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return match?.[1] ?? null;
}
