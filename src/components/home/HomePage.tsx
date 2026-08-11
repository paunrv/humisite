"use client";

import { IntroGateway } from "@/components/intro";
import { MomentsReelsMount } from "@/components/moments/MomentsReelsMount";
import { SiteLanding } from "@/components/site/SiteLanding";
import { useIntroGate } from "@/hooks/useIntroGate";
import type { LegacyLandingPayload } from "@/lib/legacy-landing";
import { useCallback, useState } from "react";

type HomePageProps = {
  legacy: LegacyLandingPayload;
};

export function HomePage({ legacy }: HomePageProps) {
  const { ready, skipIntro } = useIntroGate();
  const [introVisible, setIntroVisible] = useState(true);

  const handleIntroExit = useCallback(() => {
    setIntroVisible(false);
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const showIntro = ready && !skipIntro && introVisible;
  // Keep landing in the DOM from the first paint (SEO). Cover only visually while the gate resolves.
  const introActive = !ready || showIntro;

  return (
    <>
      {!ready && (
        <div className="fixed inset-0 z-[100] bg-[#050505]" aria-busy="true" aria-label="Cargando" />
      )}
      {showIntro && <IntroGateway onExit={handleIntroExit} />}

      <SiteLanding legacy={legacy} introActive={introActive} />
      <MomentsReelsMount />
    </>
  );
}
