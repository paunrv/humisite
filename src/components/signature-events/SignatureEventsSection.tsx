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

  const closingReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
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
            "radial-gradient(ellipse 80% 45% at 50% -10%, rgba(22,74,137,0.05), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f7f7f5 28%, #f3f3f0 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-5 py-20 md:px-10 md:py-28">
        <motion.header {...headerReveal} className="mx-auto max-w-[640px]">
          <h2
            id="signature-events-heading"
            className="text-[clamp(2.15rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#0f0f0f]"
          >
            Signature Events
          </h2>
          <p className="mt-6 max-w-[34rem] text-[clamp(1.15rem,2.2vw,1.4rem)] font-medium leading-[1.45] tracking-[-0.02em] text-[#1a1a1a]">
            For over a decade, HUMI has created experiences that bring athletes,
            families, and champions together.
          </p>
          <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-[#666]">
            Each edition becomes part of our story.
          </p>
        </motion.header>

        <div className="mt-10 md:mt-14">
          {SIGNATURE_EVENTS.map((event) => (
            <SignatureEventChapter key={event.id} event={event} />
          ))}
        </div>

        <motion.footer
          {...closingReveal}
          className="mx-auto mt-8 max-w-[420px] border-t border-black/[0.06] pt-16 text-center md:mt-12 md:pt-20"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89]">
            What&apos;s Next?
          </p>
          <p className="mt-5 text-[clamp(1.25rem,2.4vw,1.55rem)] font-semibold leading-snug tracking-[-0.025em] text-[#0f0f0f]">
            Every year brings a new chapter.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#666]">
            We&apos;re already working on the next Signature Event.
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
