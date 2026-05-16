import { imageSrc } from "@/lib/media-assets";
import type { ReelPanelConfig } from "@/lib/reel-panel";

/** Community / training reels — synced from video/ via npm run sync:videos */
export const MOMENTS_EXTRA_PANELS: ReelPanelConfig[] = [
  {
    id: "training",
    label: "Training",
    videoSrc: "/videos/moments/taekwondo-training.mp4",
    posterSrc: imageSrc("poomsae"),
    sourceHashtagUrl: "https://www.instagram.com/explore/tags/humitaekwondo/",
  },
  {
    id: "games",
    label: "Community",
    videoSrc: "/videos/moments/taekwondo-games.mp4",
    posterSrc: imageSrc("second-generation-black-belts"),
    sourceHashtagUrl: "https://www.instagram.com/explore/tags/humitaekwondo/",
  },
];
