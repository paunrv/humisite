"use client";

import type { ReelPanelConfig } from "@/lib/reel-panel";
import { IntroMedia } from "@/components/intro/IntroMedia";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type MomentsReelCellProps = {
  panel: ReelPanelConfig;
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
      className="group relative h-full min-h-[200px] overflow-hidden bg-[#050505] md:min-h-0"
      aria-label={panel.label}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isHovered ? 1.01 : 1,
          filter: isHovered
            ? "brightness(1.08) contrast(1.03)"
            : "brightness(1) contrast(1)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <IntroMedia
          videoSrc={panel.videoSrc}
          posterSrc={panel.posterSrc}
          isActive={inView}
          isHovered={isHovered}
          isDimmed={isDimmed}
          overlayBase={0.44}
          overlayActive={0.28}
          scale={1}
          mediaTransitionMs={300}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-b from-[#f5f0e8]/[0.06] via-transparent to-[#f5f0e8]/[0.03]"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <span
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#f5f0e8]/45 transition-colors duration-700 md:text-[#f5f0e8]/0 md:group-hover:text-[#f5f0e8]/40"
        aria-hidden
      >
        {panel.label}
      </span>
    </article>
  );
}
