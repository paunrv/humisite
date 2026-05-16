"use client";

import type { IntroPanelConfig, IntroPanelId } from "@/lib/intro-config";
import { IntroMedia } from "./IntroMedia";

type IntroPanelProps = {
  panel: IntroPanelConfig;
  hoveredId: IntroPanelId | null;
  onHover: (id: IntroPanelId | null) => void;
};

export function IntroPanel({ panel, hoveredId, onHover }: IntroPanelProps) {
  const isHovered = hoveredId === panel.id;
  const isDimmed = hoveredId !== null && hoveredId !== panel.id;

  return (
    <article
      className="group relative h-full min-h-0 flex-1 overflow-hidden"
      onMouseEnter={() => onHover(panel.id)}
      onMouseLeave={() => onHover(null)}
      aria-label={panel.label}
    >
      <IntroMedia
        videoSrc={panel.videoSrc}
        posterSrc={panel.posterSrc}
        isActive
        isHovered={isHovered}
        isDimmed={isDimmed}
        overlayBase={0.52}
        overlayActive={0.38}
        scale={isHovered ? 1.02 : 1}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <span className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[0.62rem] font-medium uppercase tracking-[0.35em] text-[#f5f0e8]/0 transition-all duration-700 group-hover:text-[#f5f0e8]/35">
        {panel.label}
      </span>
    </article>
  );
}
