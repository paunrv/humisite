"use client";

import { INTRO_EXIT_MS } from "@/lib/intro-config";
import { markIntroSeen } from "@/lib/intro-storage";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { IntroExperience } from "./IntroExperience";
import { IntroScrollHint } from "./IntroScrollHint";

type IntroGatewayProps = {
  onExit: () => void;
};

const EXIT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function IntroGateway({ onExit }: IntroGatewayProps) {
  const [mobileRevealed, setMobileRevealed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitStarted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { stiffness: 120, damping: 28 });
  const y = useTransform(smoothProgress, [0, 1], ["0%", "-108%"]);
  const opacity = useTransform(smoothProgress, [0, 0.55, 1], [1, 0.72, 0]);
  const blur = useTransform(smoothProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const filter = useMotionTemplate`${blur}`;

  const beginExit = useCallback(() => {
    if (exitStarted.current) return;
    exitStarted.current = true;
    setExiting(true);
    progress.set(1);
    markIntroSeen();

    window.setTimeout(() => {
      onExit();
    }, INTRO_EXIT_MS);
  }, [onExit, progress]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || exiting) return;

    const threshold = 14;

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0) return;
      event.preventDefault();
      beginExit();
    };

    const touch = { y: 0, active: false };

    const onTouchStart = (event: TouchEvent) => {
      touch.y = event.touches[0]?.clientY ?? 0;
      touch.active = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touch.active) return;
      const currentY = event.touches[0]?.clientY ?? touch.y;
      const delta = touch.y - currentY;
      if (delta > threshold) {
        event.preventDefault();
        beginExit();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        beginExit();
      }
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("touchstart", onTouchStart, { passive: true });
    node.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("touchstart", onTouchStart);
      node.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [beginExit, exiting]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] h-[100dvh] w-full touch-none select-none bg-[#050505]"
      style={{ y, opacity, filter }}
      transition={{ duration: INTRO_EXIT_MS / 1000, ease: EXIT_EASE }}
      role="dialog"
      aria-label="Bienvenida a HUMI"
      aria-modal="true"
    >
      <IntroExperience
        mobileRevealed={mobileRevealed}
        onMobileReveal={() => setMobileRevealed(true)}
      />

      <IntroScrollHint visible={!exiting} />

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-28 bg-gradient-to-t from-black/60 to-transparent"
        animate={{ opacity: exiting ? 0.92 : 1 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
