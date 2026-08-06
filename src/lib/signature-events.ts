/**
 * Signature Events — editorial archive of annual HUMI experiences.
 *
 * Images live in /public/signature-events/{year}/
 *   poster.jpg   · 3:4
 *   photo-1.jpg  · 4:3
 *   photo-2.jpg  · 4:3
 *
 * To update visuals: replace those files (or change the paths below).
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
  /** 35–45 words. Hard limit. */
  description: string;
};

/** Helper — keeps paths consistent and easy to scan. */
function eventImages(year: string) {
  const base = `/signature-events/${year}`;
  return {
    poster: `${base}/poster.jpg`,
    photo1: `${base}/photo-1.jpg`,
    photo2: `${base}/photo-2.jpg`,
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
