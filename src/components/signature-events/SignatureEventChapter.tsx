"use client";

import { formatEdition, type SignatureEvent } from "@/lib/signature-events";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type SignatureEventChapterProps = {
  event: SignatureEvent;
  index: number;
  total: number;
};

export function SignatureEventChapter({
  event,
  index,
  total,
}: SignatureEventChapterProps) {
  const reduceMotion = useReducedMotion();
  const edition = formatEdition(event.id);
  /** First panel is above-the-fold once the section is reached */
  const prioritize = index === 0;

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <article
      data-signature-panel
      data-index={index}
      className="signature-event flex w-full shrink-0 snap-center flex-col px-5 max-md:border-t max-md:border-black/[0.06] max-md:py-16 md:h-full md:w-[min(88vw,640px)] md:snap-start md:snap-always md:px-8 lg:w-[min(72vw,600px)] lg:px-10"
      aria-labelledby={`signature-event-${event.id}-title`}
      aria-setsize={total}
      aria-posinset={index + 1}
    >
      <motion.div {...reveal} className="mx-auto flex h-full w-full max-w-[520px] flex-col md:mx-0">
        <p
          className="font-mono text-[clamp(4.5rem,14vw,7rem)] font-light leading-[0.85] tracking-[-0.06em] text-black/[0.12]"
          aria-hidden="true"
        >
          {edition}
        </p>

        <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89] md:mt-8">
          {event.year}
        </p>

        <h3
          id={`signature-event-${event.id}-title`}
          className="mt-3 max-w-[18ch] text-[clamp(1.85rem,4vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0f0f0f]"
        >
          {event.title}
        </h3>

        <div className="mt-6 space-y-1.5">
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

        <figure className="group relative mt-10 w-full max-w-[360px] overflow-hidden bg-[#ebebe8] md:mt-12">
          <Image
            src={event.poster}
            alt={`${event.title} — ${event.year}`}
            width={720}
            height={960}
            sizes="(max-width: 768px) 90vw, 360px"
            priority={prioritize}
            className="aspect-[3/4] h-auto w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]"
          />
        </figure>

        <p className="mt-8 max-w-[34rem] text-[0.95rem] leading-[1.75] text-[#555] md:mt-10 md:text-base">
          {event.description}
        </p>

        <div className="mt-8 flex max-w-[420px] flex-col gap-3 sm:flex-row sm:gap-3 md:mt-10">
          {[event.photo1, event.photo2].map((src) => (
            <figure
              key={src}
              className="relative w-full max-w-[200px] overflow-hidden bg-[#ebebe8] opacity-90"
            >
              <Image
                src={src}
                alt=""
                width={400}
                height={300}
                sizes="200px"
                loading="lazy"
                className="aspect-[4/3] h-auto w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </motion.div>
    </article>
  );
}
