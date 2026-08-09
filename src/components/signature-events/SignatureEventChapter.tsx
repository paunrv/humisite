"use client";

import {
  formatEdition,
  type SignatureEvent,
} from "@/lib/signature-events";
import { SignatureEventMedia } from "@/components/signature-events/SignatureEventMedia";
import { motion, useReducedMotion } from "framer-motion";

type SignatureEventChapterProps = {
  event: SignatureEvent;
  index: number;
  total: number;
  /** Desktop journey: fill the sticky viewport. Mobile stack: natural height. */
  variant: "journey" | "stack";
  isActive?: boolean;
};

export function SignatureEventChapter({
  event,
  index,
  total,
  variant,
  isActive = true,
}: SignatureEventChapterProps) {
  const reduceMotion = useReducedMotion();
  const edition = formatEdition(event.id);
  const editionMeta = `${edition} / ${formatEdition(total)}`;
  const isJourney = variant === "journey";

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 8 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  const meta = (
    <div className={isJourney ? "mt-5 space-y-1" : "mt-5 space-y-1.5 md:mt-6"}>
      <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#888] md:text-[0.7rem]">
        {event.category}
      </p>
      {event.guest ? (
        <p className="text-[0.95rem] font-medium tracking-[-0.01em] text-[#444]">
          {event.guest}
        </p>
      ) : null}
      {event.subtitle ? (
        <p className="text-sm leading-snug text-[#999]">{event.subtitle}</p>
      ) : null}
    </div>
  );

  const media = (
    <SignatureEventMedia
      layout={event.layout}
      variant={variant}
      title={event.title}
      year={event.year}
      poster={event.poster}
      photo1={event.photo1}
      photo2={event.photo2}
      priority={index === 0}
    />
  );

  return (
    <article
      data-signature-panel
      data-index={index}
      className={
        isJourney
          ? "signature-event relative flex h-full w-full shrink-0 flex-col justify-center overflow-hidden px-6 md:px-10 lg:px-14 xl:px-20"
          : "signature-event relative flex w-full flex-col border-t border-black/[0.06] px-5 py-14 md:px-10 md:py-16"
      }
      aria-labelledby={`signature-event-${event.id}-title`}
      aria-setsize={total}
      aria-posinset={index + 1}
      aria-current={isActive ? "true" : undefined}
    >
      <motion.div
        {...reveal}
        className={
          isJourney
            ? "mx-auto grid h-full w-full max-w-[1200px] grid-cols-12 items-center gap-8 py-4 lg:gap-12"
            : "mx-auto flex w-full max-w-[520px] flex-col"
        }
      >
        {/* ── Copy ─────────────────────────────────────────────────── */}
        <div
          className={
            isJourney
              ? "col-span-5 flex min-h-0 flex-col justify-center pr-2"
              : "flex flex-col"
          }
        >
          {/* Subtle book-like page mark — never a watermark */}
          <p
            className={
              isJourney
                ? "font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/25"
                : "font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/25"
            }
          >
            {editionMeta}
          </p>

          <p
            className={
              isJourney
                ? "mt-5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89]"
                : "mt-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89] md:mt-5"
            }
          >
            {event.year}
          </p>

          <h3
            id={`signature-event-${event.id}-title`}
            className={
              isJourney
                ? "mt-3 max-w-[16ch] text-[clamp(1.85rem,3vw,2.65rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#0f0f0f]"
                : "mt-3 max-w-[15ch] text-[clamp(1.85rem,7vw,2.55rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0f0f0f] md:max-w-[16ch] md:text-[clamp(2rem,3.8vw,2.75rem)]"
            }
          >
            {event.title}
          </h3>

          {meta}

          <p
            className={
              isJourney
                ? "mt-6 max-w-[32rem] text-[0.9rem] leading-[1.7] text-[#555] lg:text-[0.95rem]"
                : "mt-6 max-w-[34ch] text-[0.975rem] leading-[1.75] text-[#555] md:mt-8 md:max-w-[34rem] md:text-base"
            }
          >
            {event.description}
          </p>

          {/* Stack: media after copy — title stays the hero */}
          {!isJourney ? media : null}
        </div>

        {/* ── Visual column (journey) ──────────────────────────────── */}
        {isJourney ? (
          <div className="col-span-7 flex min-h-0 items-end justify-end">
            {media}
          </div>
        ) : null}
      </motion.div>
    </article>
  );
}
