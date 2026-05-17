"use client";

import { INTRO_PANELS } from "@/lib/intro-config";
import { useFinePointerHover } from "@/lib/use-fine-pointer-hover";
import { useState } from "react";
import { MomentsReelCell } from "./MomentsReelCell";

/** Form · Human · Energy — same trio as the cinematic intro */
const MOMENTOS_PANELS = INTRO_PANELS.slice(0, 3);

export function MomentsReelsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const finePointerHover = useFinePointerHover();
  const activeId = finePointerHover ? hoveredId : null;

  return (
    <section
      id="momentos"
      className="moments-section border-b border-white/[0.08] bg-[#080808] py-14 md:py-20"
      aria-label="Momentos del dojang"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#4a8fd4]">
          En el dojang
        </p>
        <h2 className="mb-4 max-w-[600px] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[#f5f5f5]">
          El movimiento y la comunidad es nuestro core.
        </h2>
        <p className="mb-10 max-w-[500px] text-base leading-relaxed text-[#888]">
          Técnica, vinculo y presencia caracterizan nuestra metodología.
        </p>

        <div
          className="grid min-h-[320px] grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-white/[0.08] bg-white/[0.08] md:min-h-[clamp(220px,42vw,440px)] md:grid-cols-3"
          onMouseLeave={() => setHoveredId(null)}
        >
          {MOMENTOS_PANELS.map((panel) => (
            <div
              key={panel.id}
              className="relative min-h-[140px] md:min-h-0"
              onMouseEnter={() => finePointerHover && setHoveredId(panel.id)}
            >
              <MomentsReelCell
                panel={panel}
                isHovered={activeId === panel.id}
                isDimmed={activeId !== null && activeId !== panel.id}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
