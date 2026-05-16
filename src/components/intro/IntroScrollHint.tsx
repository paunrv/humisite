"use client";

import { motion } from "framer-motion";

type IntroScrollHintProps = {
  visible?: boolean;
};

export function IntroScrollHint({ visible = true }: IntroScrollHintProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-10 z-40 flex flex-col items-center gap-3"
      initial={false}
      animate={{ opacity: visible ? 0.45 : 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="block h-8 w-px bg-gradient-to-b from-transparent via-[#f5f0e8]/35 to-transparent" />
      <p className="text-[0.68rem] font-normal tracking-[0.22em] text-[#f5f0e8]/40 uppercase">
        Desliza para entrar
      </p>
    </motion.div>
  );
}
