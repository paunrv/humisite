"use client";

import { formatEdition, type SignatureEvent } from "@/lib/signature-events";
import { motion, useReducedMotion } from "framer-motion";

type SignatureEventChapterProps = {
  event: SignatureEvent;
};

export function SignatureEventChapter({ event }: SignatureEventChapterProps) {
  const reduceMotion = useReducedMotion();
  const edition = formatEdition(event.id);

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  const imageReveal = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: 0.65,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <article
      className="signature-event border-t border-black/[0.06] py-20 md:py-28"
      aria-labelledby={`signature-event-${event.id}-title`}
    >
      <motion.div {...reveal} className="mx-auto max-w-[720px]">
        {/* Edition dominates the chapter */}
        <p
          className="font-mono text-[clamp(5.5rem,16vw,8.5rem)] font-light leading-[0.85] tracking-[-0.06em] text-black/[0.12]"
          aria-hidden="true"
        >
          {edition}
        </p>

        <p className="mt-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89]">
          {event.year}
        </p>

        <h3
          id={`signature-event-${event.id}-title`}
          className="mt-3 max-w-[20ch] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0f0f0f]"
        >
          {event.title}
        </h3>

        {/* Category / guest as supporting meta — never louder than the title */}
        <div className="mt-7 space-y-1.5">
          <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[#888]">
            {event.category}
          </p>
          {event.guest ? (
            <p className="text-[0.95rem] font-medium tracking-[-0.01em] text-[#444]">
              {event.guest}
            </p>
          ) : null}
          {event.subtitle ? (
            <p className="text-sm text-[#999]">{event.subtitle}</p>
          ) : null}
        </div>

        {/* Poster — the artifact. Breathing room above and below. */}
        <motion.figure
          {...imageReveal(0.06)}
          className="group mx-auto mt-16 w-full max-w-[400px] overflow-hidden bg-[#ebebe8] md:mt-20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.poster}
            alt={`${event.title} — ${event.year}`}
            className="aspect-[3/4] w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>

        <p className="mx-auto mt-14 max-w-[34rem] text-[0.95rem] leading-[1.75] text-[#555] md:mt-16 md:text-base">
          {event.description}
        </p>

        {/* Photos — memories. Secondary to the poster. */}
        <div className="mx-auto mt-14 flex max-w-[460px] flex-col items-center justify-center gap-3 sm:mt-16 sm:flex-row sm:items-start sm:gap-4">
          {event.images.map((src, index) => (
            <motion.figure
              key={src}
              {...imageReveal(0.1 + index * 0.06)}
              className="w-full max-w-[220px] overflow-hidden bg-[#ebebe8] opacity-90"
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
