"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { IntroExperience } from "./IntroExperience";

type IntroReplayOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function IntroReplayOverlay({ open, onClose }: IntroReplayOverlayProps) {
  const [mobileRevealed, setMobileRevealed] = useState(false);

  const handleClose = useCallback(() => {
    setMobileRevealed(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) setMobileRevealed(false);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] h-[100dvh] w-full bg-[#050505]"
          role="dialog"
          aria-modal="true"
          aria-label="Momentos HUMI"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <IntroExperience
            mobileRevealed={mobileRevealed}
            onMobileReveal={() => setMobileRevealed(true)}
          />

          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-[#f5f0e8]/70 backdrop-blur-sm transition hover:border-white/20 hover:bg-black/60 hover:text-[#f5f0e8]"
            aria-label="Cerrar"
          >
            <span className="text-xl leading-none" aria-hidden>
              ×
            </span>
          </button>

          <p className="pointer-events-none absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-[0.65rem] tracking-[0.2em] text-[#f5f0e8]/35 uppercase">
            Pasa el cursor · Esc para cerrar
          </p>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
