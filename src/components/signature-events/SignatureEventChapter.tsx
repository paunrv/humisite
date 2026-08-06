"use client";

import { formatEdition, type SignatureEvent } from "@/lib/signature-events";
import { SignatureEventRecap } from "@/components/signature-events/SignatureEventRecap";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

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
  const prioritize = index === 0;
  const isJourney = variant === "journey";

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 8 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  const meta = (
    <div className={isJourney ? "mt-4 space-y-1" : "mt-5 space-y-1.5 md:mt-6"}>
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
  );

  return (
    <article
      data-signature-panel
      data-index={index}
      className={
        isJourney
          ? "signature-event relative flex h-full w-full shrink-0 flex-col justify-center overflow-hidden px-6 md:px-10 lg:px-14 xl:px-20"
          : "signature-event relative flex w-full flex-col border-t border-black/[0.06] px-5 py-16 md:px-10"
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
              ? "relative col-span-5 flex min-h-0 flex-col justify-center pr-2"
              : "relative"
          }
        >
          <p
            className={
              isJourney
                ? "pointer-events-none absolute -top-2 left-0 select-none font-mono text-[clamp(4.5rem,10vw,7rem)] font-light leading-none tracking-[-0.06em] text-black/[0.07]"
                : "font-mono text-[clamp(4.5rem,14vw,7rem)] font-light leading-[0.85] tracking-[-0.06em] text-black/[0.12]"
            }
            aria-hidden="true"
          >
            {edition}
          </p>

          <p
            className={
              isJourney
                ? "relative mt-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89]"
                : "mt-6 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89] md:mt-8"
            }
          >
            {event.year}
          </p>

          <h3
            id={`signature-event-${event.id}-title`}
            className={
              isJourney
                ? "mt-2 max-w-[16ch] text-[clamp(1.65rem,2.8vw,2.45rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0f0f0f]"
                : "mt-3 max-w-[16ch] text-[clamp(1.85rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0f0f0f]"
            }
          >
            {event.title}
          </h3>

          {meta}

          {/* Stack: poster before body copy */}
          {!isJourney ? (
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
          ) : null}

          <p
            className={
              isJourney
                ? "mt-5 max-w-[32rem] text-[0.9rem] leading-[1.7] text-[#555] lg:text-[0.95rem]"
                : "mt-7 max-w-[34rem] text-[0.95rem] leading-[1.75] text-[#555] md:mt-8 md:text-base"
            }
          >
            {event.description}
          </p>

          {!isJourney && event.recapVideo ? (
            <SignatureEventRecap
              title={event.title}
              videoSrc={event.recapVideo}
              thumbnailSrc={event.recapThumbnail ?? event.poster}
            />
          ) : null}

          {!isJourney ? (
            <div className="mt-8 flex max-w-[420px] flex-col gap-3 sm:flex-row sm:gap-3 md:mt-10">
              {[event.photo1, event.photo2].map((src) => (
                <figure
                  key={src}
                  className="relative w-full max-w-[200px] overflow-hidden bg-[#ebebe8]"
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
          ) : null}
        </div>

        {/* ── Visual column (journey) ──────────────────────────────── */}
        {isJourney ? (
          <div className="col-span-7 flex min-h-0 items-end gap-5 xl:gap-6">
            <figure className="group relative w-[min(100%,340px)] shrink-0 overflow-hidden bg-[#ebebe8] xl:w-[min(100%,380px)]">
              <Image
                src={event.poster}
                alt={`${event.title} — ${event.year}`}
                width={720}
                height={960}
                sizes="(max-width: 1280px) 340px, 380px"
                priority={prioritize}
                className="aspect-[3/4] max-h-[min(56vh,500px)] w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]"
              />
            </figure>

            <div className="flex min-w-0 flex-1 flex-col justify-end gap-3 pb-0.5">
              {event.recapVideo ? (
                <SignatureEventRecap
                  title={event.title}
                  videoSrc={event.recapVideo}
                  thumbnailSrc={event.recapThumbnail ?? event.poster}
                  compact
                />
              ) : null}

              <div className="flex gap-2.5">
                {[event.photo1, event.photo2].map((src) => (
                  <figure
                    key={src}
                    className="relative w-[min(100%,128px)] overflow-hidden bg-[#ebebe8]"
                  >
                    <Image
                      src={src}
                      alt=""
                      width={400}
                      height={300}
                      sizes="128px"
                      loading="lazy"
                      className="aspect-[4/3] h-auto w-full object-cover"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>
    </article>
  );
}
