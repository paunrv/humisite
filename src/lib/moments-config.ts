import { imageSrc } from "@/lib/media-assets";
import type { ReelPanelConfig } from "@/lib/reel-panel";

/** Reels de comunidad / entrenamiento — sync desde video/ vía npm run sync:videos */
export const MOMENTS_EXTRA_PANELS: ReelPanelConfig[] = [
  {
    id: "training",
    label: "Entrenamiento",
    videoSrc: "/videos/moments/taekwondo-training.mp4",
    posterSrc: imageSrc("poomsae"),
    sourceHashtagUrl: "https://www.instagram.com/explore/tags/humitaekwondo/",
  },
  {
    id: "games",
    label: "Comunidad",
    videoSrc: "/videos/moments/taekwondo-games.mp4",
    posterSrc: imageSrc("second-generation-black-belts"),
    sourceHashtagUrl: "https://www.instagram.com/explore/tags/humitaekwondo/",
  },
];
