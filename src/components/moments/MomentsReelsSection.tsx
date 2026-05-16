"use client";

import { INTRO_PANELS, type IntroPanelId } from "@/lib/intro-config";
import { useCallback, useState } from "react";
import { MomentsReelCell } from "./MomentsReelCell";

export function MomentsReelsSection() {
  const [hoveredId, setHoveredId] = useState<IntroPanelId | null>(null);
  const [touchedId, setTouchedId] = useState<IntroPanelId | null>(null);

  const activeId = hoveredId ?? touchedId;

  const handlePointerDown = useCallback((id: IntroPanelId) => {
    setTouchedId((current) => (current === id ? null : id));
  }, []);

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
          Contacto humano, en movimiento
        </h2>
        <p className="mb-10 max-w-[500px] text-base leading-relaxed text-[#888]">
          Técnica, vínculo y presencia. Apoyo visual de lo que ocurre en clase.
        </p>

        <div
          className="grid min-h-[320px] grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-white/[0.08] bg-white/[0.08] md:min-h-[clamp(220px,42vw,440px)] md:grid-cols-4"
          onMouseLeave={() => setHoveredId(null)}
        >
          {INTRO_PANELS.map((panel) => (
            <div
              key={panel.id}
              className="relative min-h-[140px] md:min-h-0"
              onMouseEnter={() => setHoveredId(panel.id)}
              onPointerDown={() => handlePointerDown(panel.id)}
            >
              <MomentsReelCell
                panel={panel}
                isHovered={activeId === panel.id}
                isDimmed={activeId !== null && activeId !== panel.id}
              />
            </div>
          ))}
        </div>

        <p className="mt-4 text-center font-mono text-[0.65rem] tracking-[0.18em] text-[#555] uppercase md:text-left">
          Pasa el cursor · Toca en móvil
        </p>
      </div>
    </section>
  );
}
