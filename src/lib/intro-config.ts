import type { ReelPanelConfig } from "@/lib/reel-panel";

export type IntroPanelId = "form" | "human" | "energy";

export type IntroPanelConfig = ReelPanelConfig & { id: IntroPanelId };

/** Sources in /video/ — synced to /public/videos/intro/ via npm run sync:videos */
export const INTRO_PANELS: IntroPanelConfig[] = [
  {
    id: "form",
    label: "Form",
    videoSrc: "/videos/intro/form.mp4",
    posterSrc: "/images/pic01.jpg",
    sourceHashtagUrl: "https://www.instagram.com/explore/tags/humitaekwondo/",
  },
  {
    id: "human",
    label: "Human",
    videoSrc: "/videos/intro/human.mp4",
    posterSrc: "/images/pic07.jpg",
    sourceHashtagUrl: "https://www.instagram.com/explore/tags/humitaekwondo/",
  },
  {
    id: "energy",
    label: "Energy",
    videoSrc: "/videos/intro/energy.mp4",
    posterSrc: "/images/pic06.jpg",
    sourceHashtagUrl: "https://www.instagram.com/explore/tags/entrenaconconciencia/",
  },
];

export const INTRO_EXIT_MS = 900;
/** Tiempo entre videos en el grid intro (móvil) */
export const INTRO_GRID_DURATION_MS = 5000;
export const MOBILE_ROTATE_MIN_MS = INTRO_GRID_DURATION_MS;
export const MOBILE_ROTATE_MAX_MS = INTRO_GRID_DURATION_MS;
