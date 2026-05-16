"use client";

import { IntroGateway } from "@/components/intro";
import { MomentsReelsMount } from "@/components/moments/MomentsReelsMount";
import { SiteLanding } from "@/components/site/SiteLanding";
import { useIntroGate } from "@/hooks/useIntroGate";
import { useCallback, useState } from "react";

export function HomePage() {
  const { ready, skipIntro } = useIntroGate();
  const [introVisible, setIntroVisible] = useState(true);

  const handleIntroExit = useCallback(() => {
    setIntroVisible(false);
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const showIntro = ready && !skipIntro && introVisible;

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050505]" aria-busy="true" aria-label="Cargando" />
    );
  }

  return (
    <>
      {showIntro && <IntroGateway onExit={handleIntroExit} />}

      <SiteLanding introActive={showIntro} />
      <MomentsReelsMount />
    </>
  );
}
