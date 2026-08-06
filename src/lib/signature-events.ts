/**
 * Signature Events — editorial archive of annual HUMI experiences.
 *
 * Curated sources live in media/signature-events/ and video/
 * (see scripts/sync-signature-media.mjs and scripts/sync-videos.mjs).
 * Public paths under /public/signature-events/{year}/:
 *   poster.jpg       · 3:4 · optional
 *   photo-1.jpg      · 4:3 · optional
 *   photo-2.jpg      · 4:3 · optional
 *   recap.mp4        · optional local recap
 *   thumbnail.jpg    · optional video poster frame
 *
 * Media order: poster → description → recap → photos.
 * Omit any field (or set null) to hide that media — no empty gaps.
 */

export type SignatureEvent = {
  id: number;
  year: string;
  title: string;
  category: string;
  guest?: string;
  subtitle?: string;
  /** Optional visual anchor (3:4). Omit / null → not rendered. */
  poster?: string | null;
  /** Optional highlight. Omit / null → not rendered. */
  photo1?: string | null;
  /** Optional highlight. Omit / null → not rendered. */
  photo2?: string | null;
  /** Local mp4 path or YouTube/Vimeo URL. Omit / null → hide the player. */
  recapVideo?: string | null;
  /** Poster frame shown before play. Falls back to `poster` when present. */
  recapThumbnail?: string | null;
  /** 35–45 words. Hard limit. */
  description: string;
};

/** Poster path for a year folder. */
function eventPoster(year: string) {
  return { poster: `/signature-events/${year}/poster.jpg` };
}

/** Optional highlight photos for a year folder. */
function eventPhotos(year: string) {
  const base = `/signature-events/${year}`;
  return {
    photo1: `${base}/photo-1.jpg`,
    photo2: `${base}/photo-2.jpg`,
  };
}

/** Poster + both highlight photos. */
function eventImages(year: string) {
  return {
    ...eventPoster(year),
    ...eventPhotos(year),
  };
}

/**
 * Optional recap media for a year folder.
 * Local mp4s are synced via `npm run sync:videos`.
 */
function eventRecap(year: string, thumbnail?: string) {
  const base = `/signature-events/${year}`;
  return {
    recapVideo: `${base}/recap.mp4`,
    ...(thumbnail ? { recapThumbnail: thumbnail } : {}),
  };
}

/** Non-empty media paths only — use before rendering. */
export function presentMedia(
  ...srcs: Array<string | null | undefined>
): string[] {
  return srcs.filter((src): src is string => typeof src === "string" && src.length > 0);
}

export const SIGNATURE_EVENTS: SignatureEvent[] = [
  {
    id: 1,
    year: "2018",
    title: "1st Olympic Bootcamp",
    category: "Master Class",
    guest: "Carlo Molfetta",
    subtitle: "Olympic Champion · London 2012",
    // Sources: 1st-tkdolympicbootcamp.jpg · -01.jpg · -02.jpg (not -03)
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
    // Sources: 2nd-tkdolympicbootcamp.jpg · -01.jpg · -02.jpg (not -03)
    ...eventImages("2019"),
    description:
      "A second year, a second champion. Olympic fire returned to the dojang, deepening a tradition of world-class master classes that would define HUMI’s annual rhythm and raise the bar for every student on the mat.",
  },
  {
    id: 3,
    year: "2022",
    title: "Rumble HUMI Interno WTU",
    category: "Internal Competition",
    // Video only — source: Ruumble Humi.mp4
    ...eventRecap("2022"),
    description:
      "An internal competition under World Taekwondo Union standards. Athletes tested months of preparation against their own teammates, proving that the fiercest growth often happens inside the community that raised them, not on distant tournament floors.",
  },
  {
    id: 4,
    year: "2023",
    title: "KI Games",
    category: "Performance Weekend",
    guest: "Gabriel Bracamontes",
    // Poster + video — sources: ki-games.jpg · ki games.mp4 · no highlight photos
    ...eventPoster("2023"),
    ...eventRecap("2023"),
    description:
      "A performance weekend that pushed beyond the usual class format. The dojang became a stage for intensity, skill, and the kind of shared effort that turns a school into a lasting family bound by purpose.",
  },
  {
    id: 5,
    year: "2024",
    title: "Taekwondo Games",
    category: "Community Competition",
    // Video only — source: Taekwondo Games.mp4
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
