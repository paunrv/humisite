"use client";

import type { IntroPanelConfig } from "@/lib/intro-config";
import { IntroMedia } from "@/components/intro/IntroMedia";
import { useEffect, useRef, useState } from "react";

type MomentsReelCellProps = {
  panel: IntroPanelConfig;
  isHovered: boolean;
  isDimmed: boolean;
};

export function MomentsReelCell({ panel, isHovered, isDimmed }: MomentsReelCellProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="group relative h-full min-h-[140px] overflow-hidden bg-[#050505] md:min-h-0"
      aria-label={panel.label}
    >
      <IntroMedia
        videoSrc={panel.videoSrc}
        posterSrc={panel.posterSrc}
        isActive={inView}
        isHovered={isHovered}
        isDimmed={isDimmed}
        overlayBase={0.44}
        overlayActive={0.3}
        scale={isHovered ? 1.02 : 1}
      />

      <span
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#f5f0e8]/0 transition-colors duration-700 group-hover:text-[#f5f0e8]/40"
        aria-hidden
      >
        {panel.label}
      </span>
    </article>
  );
}
