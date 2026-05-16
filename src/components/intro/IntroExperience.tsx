"use client";

import { INTRO_PANELS, type IntroPanelId } from "@/lib/intro-config";
import { useState } from "react";
import { IntroGrain } from "./IntroGrain";
import { IntroMobile } from "./IntroMobile";
import { IntroPanel } from "./IntroPanel";

type IntroExperienceProps = {
  mobileRevealed?: boolean;
  onMobileReveal?: () => void;
};

export function IntroExperience({
  mobileRevealed: mobileRevealedProp,
  onMobileReveal,
}: IntroExperienceProps) {
  const [hoveredId, setHoveredId] = useState<IntroPanelId | null>(null);
  const [mobileRevealedInternal, setMobileRevealedInternal] = useState(false);

  const mobileRevealed = mobileRevealedProp ?? mobileRevealedInternal;
  const handleMobileReveal = onMobileReveal ?? (() => setMobileRevealedInternal(true));

  return (
    <>
      <div className="absolute inset-0 hidden md:flex">
        {INTRO_PANELS.map((panel) => (
          <IntroPanel
            key={panel.id}
            panel={panel}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>

      <IntroMobile revealed={mobileRevealed} onReveal={handleMobileReveal} />

      <IntroGrain />
    </>
  );
}
