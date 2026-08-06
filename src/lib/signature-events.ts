/**
 * Signature Events — editorial archive of annual HUMI experiences.
 *
 * Assets live in /public/signature-events/{year}/
 *   poster.jpg       · 3:4
 *   photo-1.jpg      · 4:3
 *   photo-2.jpg      · 4:3
 *   recap.mp4        · optional local recap
 *   thumbnail.jpg    · optional video poster frame
 *
 * To update visuals: replace those files (or change the paths below).
 * To add a recap: set `recapVideo` (local path or YouTube/Vimeo URL).
 * No component changes required.
 */

export type SignatureEvent = {
  id: number;
  year: string;
  title: string;
  category: string;
  guest?: string;
  subtitle?: string;
  poster: string;
  photo1: string;
  photo2: string;
  /** Local mp4 path or YouTube/Vimeo URL. Omit to hide the player. */
  recapVideo?: string;
  /** Poster frame shown before play (local image). Falls back to `poster`. */
  recapThumbnail?: string;
  /** 35–45 words. Hard limit. */
  description: string;
};

/** Still imagery — always present. */
function eventImages(year: string) {
  const base = `/signature-events/${year}`;
  return {
    poster: `${base}/poster.jpg`,
    photo1: `${base}/photo-1.jpg`,
    photo2: `${base}/photo-2.jpg`,
  };
}

/**
 * Optional recap media for a year folder.
 * Thumbnail defaults to poster when `recapThumbnail` is omitted.
 * Local mp4s are synced via `npm run sync:videos` (see scripts/sync-videos.mjs).
 */
function eventRecap(year: string, thumbnail?: string) {
  const base = `/signature-events/${year}`;
  return {
    recapVideo: `${base}/recap.mp4`,
    ...(thumbnail ? { recapThumbnail: thumbnail } : {}),
  };
}

export const SIGNATURE_EVENTS: SignatureEvent[] = [
  {
    id: 1,
    year: "2018",
    title: "1st Olympic Bootcamp",
    category: "Master Class",
    guest: "Carlo Molfetta",
    subtitle: "Olympic Champion · London 2012",
    ...eventImages("2018"),
    description:
      "HUMI opened its doors to Olympic-level training for the first time. Precision and intensity from London 2012 arrived in Ensenada, setting a new standard for what our community could aspire to become each year ahead.",
  },
  {
    id: 2,
    year: "2019",
    title: "2nd Olympic Bootcamp",
    category: "Master Class",
    guest: "Joel González",
    subtitle: "Olympic Champion · London 2012",
    ...eventImages("2019"),
    description:
      "A second year, a second champion. Olympic fire returned to the dojang, deepening a tradition of world-class master classes that would define HUMI’s annual rhythm and raise the bar for every student on the mat.",
  },
  {
    id: 3,
    year: "2022",
    title: "Rumble HUMI Interno WTU",
    category: "Internal Competition",
    ...eventImages("2022"),
    description:
      "An internal competition under World Taekwondo Union standards. Athletes tested months of preparation against their own teammates, proving that the fiercest growth often happens inside the community that raised them, not on distant tournament floors.",
  },
  {
    id: 4,
    year: "2023",
    title: "KI Games",
    category: "Performance Weekend",
    guest: "Gabriel Bracamontes",
    ...eventImages("2023"),
    description:
      "A performance weekend that pushed beyond the usual class format. The dojang became a stage for intensity, skill, and the kind of shared effort that turns a school into a lasting family bound by purpose.",
  },
  {
    id: 5,
    year: "2024",
    title: "Taekwondo Games",
    category: "Community Competition",
    ...eventImages("2024"),
    ...eventRecap("2024"),
    description:
      "The community competition that brought every generation onto the same floor. Students competed, supported, and celebrated, turning a single weekend into a living portrait of everything HUMI had carefully built across years of shared training.",
  },
  {
    id: 6,
    year: "2025",
    title: "Sunday Funday",
    category: "Master Class",
    guest: "Jesús Aguilar",
    subtitle: "Official UFC Athlete",
    ...eventImages("2025"),
    description:
      "Technique met entertainment in a master class that filled the dojang with energy. A community that trains hard, and knows how to enjoy the journey together, made the day feel like one house under the same roof.",
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

/** Detect local file vs YouTube / Vimeo for the inline player. */
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
