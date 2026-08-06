"use client";

import { INTRO_PANELS } from "@/lib/intro-config";
import { useFinePointerHover } from "@/lib/use-fine-pointer-hover";
import { useState } from "react";
import { MomentsReelCell } from "./MomentsReelCell";

/** Form · Human · Energy — mismo trío que el intro */
const MOMENTOS_PANELS = INTRO_PANELS;

export function MomentsReelsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const finePointerHover = useFinePointerHover();
  const activeId = finePointerHover ? hoveredId : null;

  return (
    <section
      id="momentos"
      className="moments-section border-b border-white/[0.08] bg-[#080808] py-16 md:py-20"
      aria-label="Momentos del dojang"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#4a8fd4] md:mb-4">
          En el dojang
        </p>
        <h2 className="mb-4 max-w-[16ch] text-[clamp(1.65rem,7vw,2.8rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#f5f5f5] md:max-w-[600px]">
          El movimiento y la comunidad son nuestro centro.
        </h2>
        <p className="mb-9 max-w-[34ch] text-[0.975rem] leading-relaxed text-[#888] md:mb-10 md:max-w-[500px] md:text-base">
          Técnica, vínculo y presencia caracterizan nuestra metodología.
        </p>

        <div
          className="grid min-h-0 grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.08] md:min-h-[clamp(220px,42vw,440px)] md:grid-cols-3 md:rounded-[14px]"
          onMouseLeave={() => setHoveredId(null)}
        >
          {MOMENTOS_PANELS.map((panel) => (
            <div
              key={panel.id}
              className="relative min-h-[200px] md:min-h-0"
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
