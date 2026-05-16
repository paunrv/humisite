"use client";

import { shouldSkipIntro } from "@/lib/intro-storage";
import { useEffect, useState } from "react";

export function useIntroGate() {
  const [ready, setReady] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    const forceIntro =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("intro") === "1";
    setSkipIntro(!forceIntro && shouldSkipIntro());
    setReady(true);
  }, []);

  return { ready, skipIntro };
}
