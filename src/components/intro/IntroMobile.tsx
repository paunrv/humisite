"use client";

import { INTRO_PANELS, MOBILE_ROTATE_MAX_MS, MOBILE_ROTATE_MIN_MS } from "@/lib/intro-config";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IntroMedia } from "./IntroMedia";

type IntroMobileProps = {
  revealed: boolean;
  onReveal: () => void;
};

function pickSessionIndex(): number {
  if (typeof window === "undefined") return 0;
  const stored = sessionStorage.getItem("humi_intro_mobile_index");
  if (stored !== null) {
    const parsed = Number(stored);
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed < INTRO_PANELS.length) {
      return parsed;
    }
  }
  const index = Math.floor(Math.random() * INTRO_PANELS.length);
  sessionStorage.setItem("humi_intro_mobile_index", String(index));
  return index;
}

function randomRotateDelay(): number {
  const span = MOBILE_ROTATE_MAX_MS - MOBILE_ROTATE_MIN_MS;
  return MOBILE_ROTATE_MIN_MS + Math.floor(Math.random() * span);
}

export function IntroMobile({ revealed, onReveal }: IntroMobileProps) {
  const initialIndex = useMemo(() => pickSessionIndex(), []);
  const [index, setIndex] = useState(initialIndex);
  const [rotateEnabled, setRotateEnabled] = useState(false);

  const panel = INTRO_PANELS[index];

  const advance = useCallback(() => {
    setIndex((current) => (current + 1) % INTRO_PANELS.length);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setRotateEnabled(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!rotateEnabled) return;
    const delay = randomRotateDelay();
    const timer = window.setTimeout(advance, delay);
    return () => window.clearTimeout(timer);
  }, [advance, index, rotateEnabled]);

  return (
    <div
      className="relative h-full w-full md:hidden"
      onPointerDown={onReveal}
      role="presentation"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={panel.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <IntroMedia
            videoSrc={panel.videoSrc}
            posterSrc={panel.posterSrc}
            isHovered={revealed}
            overlayBase={revealed ? 0.44 : 0.54}
            overlayActive={0.36}
            scale={revealed ? 1.015 : 1}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
