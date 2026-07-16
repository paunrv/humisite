"use client";

import type { LegacyLandingPayload } from "@/lib/legacy-landing";
import { LegacyLandingMount } from "./LegacyLandingMount";

type SiteLandingProps = {
  introActive: boolean;
  legacy: LegacyLandingPayload;
};

export function SiteLanding({ introActive, legacy }: SiteLandingProps) {
  return (
    <main
      className="relative bg-[#080808]"
      aria-hidden={introActive}
      {...(introActive ? { inert: true } : {})}
    >
      <LegacyLandingMount legacy={legacy} introActive={introActive} />
    </main>
  );
}
