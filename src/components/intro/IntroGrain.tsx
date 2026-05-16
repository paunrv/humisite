"use client";

import { motion } from "framer-motion";

export function IntroGrain() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: "url(/images/overlay-grain.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
        animate={{ opacity: [0.1, 0.16, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_0%,rgba(0,0,0,0.45)_100%)]"
      />
    </>
  );
}
