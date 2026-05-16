export type IntroPanelId = "form" | "human" | "energy" | "presence";

export type IntroPanelConfig = {
  id: IntroPanelId;
  label: string;
  videoSrc: string;
  posterSrc: string;
  sourceHashtagUrl?: string;
};

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
  {
    id: "presence",
    label: "Presence",
    videoSrc: "/videos/intro/presence.mp4",
    posterSrc: "/images/pic12.png",
    sourceHashtagUrl: "https://www.instagram.com/explore/tags/entrenaconconciencia/",
  },
];

export const INTRO_EXIT_MS = 900;
export const MOBILE_ROTATE_MIN_MS = 5500;
export const MOBILE_ROTATE_MAX_MS = 7500;
