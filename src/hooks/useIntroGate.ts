"use client";

import { shouldSkipIntro } from "@/lib/intro-storage";
import { useEffect, useState } from "react";

export function useIntroGate() {
  const [ready, setReady] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    setSkipIntro(shouldSkipIntro());
    setReady(true);
  }, []);

  return { ready, skipIntro };
}
