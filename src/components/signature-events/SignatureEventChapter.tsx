"use client";

import {
  formatEdition,
  formatEventCategory,
  type SignatureEvent,
} from "@/lib/signature-events";
import { motion, useReducedMotion } from "framer-motion";

type SignatureEventChapterProps = {
  event: SignatureEvent;
};

export function SignatureEventChapter({ event }: SignatureEventChapterProps) {
  const reduceMotion = useReducedMotion();
  const edition = formatEdition(event.id);
  const categoryLine = formatEventCategory(event);

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  const imageReveal = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: {
            duration: 0.65,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <article
      className="signature-event border-t border-black/[0.06] py-16 md:py-24"
      aria-labelledby={`signature-event-${event.id}-title`}
    >
      <motion.div {...reveal} className="mx-auto max-w-[720px]">
        <p
          className="font-mono text-[clamp(3.5rem,10vw,5.5rem)] font-light leading-none tracking-[-0.04em] text-black/[0.08]"
          aria-hidden="true"
        >
          {edition}
        </p>

        <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#164A89]">
          {event.year}
        </p>

        <h3
          id={`signature-event-${event.id}-title`}
          className="mt-3 text-[clamp(1.85rem,4.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0f0f0f]"
        >
          {event.title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-[#666]">
          {categoryLine}
          {event.subtitle ? (
            <>
              <br />
              <span className="text-[#999]">{event.subtitle}</span>
            </>
          ) : null}
        </p>

        <motion.figure
          {...imageReveal(0.08)}
          className="mt-10 overflow-hidden bg-[#ebebe8]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.poster}
            alt={`${event.title} — ${event.year}`}
            className="aspect-[3/4] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>

        <p className="mt-8 max-w-[38rem] text-[0.95rem] leading-[1.7] text-[#555] md:text-base">
          {event.description}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {event.images.map((src, index) => (
            <motion.figure
              key={src}
              {...imageReveal(0.12 + index * 0.08)}
              className="overflow-hidden bg-[#ebebe8]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </article>
  );
}
