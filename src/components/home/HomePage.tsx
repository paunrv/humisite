"use client";

import { IntroGateway } from "@/components/intro";
import { IntroReplayButton } from "@/components/intro/IntroReplayButton";
import { IntroReplayOverlay } from "@/components/intro/IntroReplayOverlay";
import { MomentsReelsMount } from "@/components/moments/MomentsReelsMount";
import { SiteLanding } from "@/components/site/SiteLanding";
import { useIntroGate } from "@/hooks/useIntroGate";
import { useCallback, useState } from "react";

export function HomePage() {
  const { ready, skipIntro } = useIntroGate();
  const [introVisible, setIntroVisible] = useState(true);
  const [replayOpen, setReplayOpen] = useState(false);

  const handleIntroExit = useCallback(() => {
    setIntroVisible(false);
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleReplayToggle = useCallback(() => {
    setReplayOpen((open) => !open);
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

      <IntroReplayButton
        hidden={showIntro}
        active={replayOpen}
        onClick={handleReplayToggle}
      />

      <IntroReplayOverlay open={replayOpen} onClose={() => setReplayOpen(false)} />

      <SiteLanding introActive={showIntro || replayOpen} />
      <MomentsReelsMount />
    </>
  );
}
