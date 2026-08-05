"use client";

import { SIGNATURE_EVENTS } from "@/lib/signature-events";
import { motion, useReducedMotion } from "framer-motion";
import { SignatureEventChapter } from "./SignatureEventChapter";

export function SignatureEventsSection() {
  const reduceMotion = useReducedMotion();

  const headerReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="signature-events"
      className="signature-events relative overflow-hidden border-t border-black/[0.06] bg-[#f7f7f5]"
      aria-labelledby="signature-events-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 50% -10%, rgba(22,74,137,0.06), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f7f7f5 28%, #f3f3f0 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-5 py-20 md:px-10 md:py-28">
        <motion.header {...headerReveal} className="mx-auto max-w-[640px]">
          <h2
            id="signature-events-heading"
            className="text-[clamp(2rem,4.5vw,3.1rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#0f0f0f]"
          >
            Signature Events
          </h2>
          <p className="mt-4 text-[clamp(1.15rem,2.2vw,1.4rem)] font-medium leading-snug tracking-[-0.02em] text-[#222]">
            Every year, we create an experience worth remembering.
          </p>
          <p className="mt-5 max-w-[36rem] text-base leading-relaxed text-[#666]">
            A collection of the moments that have shaped the HUMI community
            through world-class training, competition, and unforgettable
            experiences.
          </p>
        </motion.header>

        <div className="mt-6 md:mt-10">
          {SIGNATURE_EVENTS.map((event) => (
            <SignatureEventChapter key={event.id} event={event} />
          ))}
        </div>

        <motion.p
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true, amount: 0.6 },
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
              })}
          className="mx-auto mt-8 max-w-[28rem] text-center font-mono text-xs uppercase tracking-[0.14em] text-[#999] md:mt-12"
        >
          The next chapter is still unwritten.
        </motion.p>
      </div>
    </section>
  );
}
