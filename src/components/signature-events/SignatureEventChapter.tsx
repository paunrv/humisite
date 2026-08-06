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
        initial: { opacity: 0, y: 18 },
        animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 10 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  const meta = (
    <div className="mt-5 space-y-1.5 md:mt-6">
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

  const poster = (
    <figure
      className={
        isJourney
          ? "group relative mx-auto w-full max-w-[380px] overflow-hidden bg-[#ebebe8] lg:mx-0 lg:max-w-[420px] xl:max-w-[460px]"
          : "group relative mt-10 w-full max-w-[360px] overflow-hidden bg-[#ebebe8] md:mt-12"
      }
    >
      <Image
        src={event.poster}
        alt={`${event.title} — ${event.year}`}
        width={720}
        height={960}
        sizes={
          isJourney
            ? "(max-width: 1024px) 70vw, 420px"
            : "(max-width: 768px) 90vw, 360px"
        }
        priority={prioritize}
        className="aspect-[3/4] h-auto w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]"
      />
    </figure>
  );

  const photos = (
    <div
      className={
        isJourney
          ? "flex gap-3"
          : "mt-8 flex max-w-[420px] flex-col gap-3 sm:flex-row sm:gap-3 md:mt-10"
      }
    >
      {[event.photo1, event.photo2].map((src) => (
        <figure
          key={src}
          className={
            isJourney
              ? "relative w-[min(42vw,160px)] overflow-hidden bg-[#ebebe8] sm:w-[140px] lg:w-[150px]"
              : "relative w-full max-w-[200px] overflow-hidden bg-[#ebebe8]"
          }
        >
          <Image
            src={src}
            alt=""
            width={400}
            height={300}
            sizes={isJourney ? "150px" : "200px"}
            loading="lazy"
            className="aspect-[4/3] h-auto w-full object-cover"
          />
        </figure>
      ))}
    </div>
  );

  return (
    <article
      data-signature-panel
      data-index={index}
      className={
        isJourney
          ? "signature-event relative flex h-full w-full shrink-0 flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-20"
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
            ? "mx-auto grid h-full w-full max-w-[1280px] grid-cols-1 items-center gap-10 py-8 lg:grid-cols-12 lg:gap-14 lg:py-10"
            : "mx-auto flex w-full max-w-[520px] flex-col"
        }
      >
        {/* Copy column */}
        <div className={isJourney ? "relative lg:col-span-5 lg:pr-4" : "relative"}>
          <p
            className={
              isJourney
                ? "pointer-events-none absolute -top-4 left-0 select-none font-mono text-[clamp(5rem,12vw,8.5rem)] font-light leading-none tracking-[-0.06em] text-black/[0.07] lg:-top-8"
                : "font-mono text-[clamp(4.5rem,14vw,7rem)] font-light leading-[0.85] tracking-[-0.06em] text-black/[0.12]"
            }
            aria-hidden="true"
          >
            {edition}
          </p>

          <p
            className={
              isJourney
                ? "relative mt-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89] lg:mt-16"
                : "mt-6 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89] md:mt-8"
            }
          >
            {event.year}
          </p>

          <h3
            id={`signature-event-${event.id}-title`}
            className="mt-3 max-w-[16ch] text-[clamp(1.85rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0f0f0f]"
          >
            {event.title}
          </h3>

          {meta}

          {/* Stack (mobile): poster as visual anchor before body copy */}
          {!isJourney ? poster : null}

          <p className="mt-7 max-w-[34rem] text-[0.95rem] leading-[1.75] text-[#555] md:mt-8 md:text-base">
            {event.description}
          </p>

          {!isJourney && event.recapVideo ? (
            <SignatureEventRecap
              title={event.title}
              videoSrc={event.recapVideo}
              thumbnailSrc={event.recapThumbnail ?? event.poster}
            />
          ) : null}

          {!isJourney ? photos : null}
        </div>

        {/* Journey (desktop): poster + supporting media as the visual column */}
        {isJourney ? (
          <div className="flex flex-col gap-5 lg:col-span-7 lg:gap-6">
            {poster}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-4 lg:max-w-[520px]">
              {event.recapVideo ? (
                <div className="min-w-0 flex-1">
                  <SignatureEventRecap
                    title={event.title}
                    videoSrc={event.recapVideo}
                    thumbnailSrc={event.recapThumbnail ?? event.poster}
                    compact
                  />
                </div>
              ) : null}
              <div className={event.recapVideo ? "flex shrink-0 gap-3" : undefined}>
                {photos}
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>
    </article>
  );
}
