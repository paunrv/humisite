"use client";

import { LegacyLandingMount } from "./LegacyLandingMount";

type SiteLandingProps = {
  introActive: boolean;
};

export function SiteLanding({ introActive }: SiteLandingProps) {
  return (
    <main
      className="relative bg-[#080808]"
      aria-hidden={introActive}
      {...(introActive ? { inert: true } : {})}
    >
      <LegacyLandingMount introActive={introActive} />
    </main>
  );
}
