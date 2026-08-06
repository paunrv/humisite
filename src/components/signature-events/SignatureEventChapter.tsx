"use client";

import {
  formatEdition,
  presentMedia,
  type SignatureEvent,
} from "@/lib/signature-events";
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
  const editionMeta = `${edition} / ${formatEdition(total)}`;
  const prioritize = index === 0;
  const isJourney = variant === "journey";

  const poster = presentMedia(event.poster)[0];
  const photos = presentMedia(event.photo1, event.photo2);
  const hasPoster = Boolean(poster);
  const hasRecap = Boolean(event.recapVideo);
  const hasPhotos = photos.length > 0;
  const hasSecondary = (hasPoster && (hasRecap || hasPhotos)) || (!hasPoster && hasPhotos);
  const recapThumbnail = event.recapThumbnail ?? poster;

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

  const photoFigures = (size: "stack" | "journey") =>
    photos.length > 0 ? (
      <div
        className={
          size === "journey"
            ? "flex gap-2.5"
            : "mt-8 grid max-w-[420px] grid-cols-2 gap-2.5 md:mt-10 md:flex md:flex-row md:gap-3"
        }
      >
        {photos.map((src) => (
          <figure
            key={src}
            className={
              size === "journey"
                ? "relative w-[min(100%,128px)] overflow-hidden bg-[#ebebe8]"
                : "relative w-full overflow-hidden bg-[#ebebe8] md:max-w-[200px]"
            }
          >
            <Image
              src={src}
              alt=""
              width={400}
              height={300}
              sizes={size === "journey" ? "128px" : "(max-width: 768px) 45vw, 200px"}
              loading="lazy"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </figure>
        ))}
      </div>
    ) : null;

  const recap = (compact: boolean) =>
    hasRecap && event.recapVideo ? (
      <SignatureEventRecap
        title={event.title}
        videoSrc={event.recapVideo}
        thumbnailSrc={recapThumbnail}
        compact={compact}
      />
    ) : null;

  const posterFigure = (opts: {
    className: string;
    sizes: string;
    imageClassName: string;
  }) =>
    poster ? (
      <figure className={opts.className}>
        <Image
          src={poster}
          alt={`${event.title} — ${event.year}`}
          width={720}
          height={960}
          sizes={opts.sizes}
          priority={prioritize}
          className={opts.imageClassName}
        />
      </figure>
    ) : null;

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
          {!isJourney
            ? posterFigure({
                className:
                  "group relative mt-9 w-full max-w-[min(100%,320px)] overflow-hidden bg-[#ebebe8] md:mt-11 md:max-w-[360px]",
                sizes: "(max-width: 768px) 88vw, 360px",
                imageClassName:
                  "aspect-[3/4] h-auto w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]",
              })
            : null}

          {!isJourney ? recap(false) : null}

          {!isJourney ? photoFigures("stack") : null}
        </div>

        {/* ── Visual column (journey) ──────────────────────────────── */}
        {isJourney && (hasPoster || hasRecap || hasPhotos) ? (
          <div
            className={
              hasPoster && hasSecondary
                ? "col-span-7 flex min-h-0 items-end gap-5 xl:gap-6"
                : "col-span-7 flex min-h-0 items-end"
            }
          >
            {hasPoster
              ? posterFigure({
                  className: hasSecondary
                    ? "group relative w-[min(100%,340px)] shrink-0 overflow-hidden bg-[#ebebe8] xl:w-[min(100%,380px)]"
                    : "group relative w-[min(100%,380px)] overflow-hidden bg-[#ebebe8] xl:w-[min(100%,420px)]",
                  sizes: "(max-width: 1280px) 340px, 420px",
                  imageClassName:
                    "aspect-[3/4] max-h-[min(56vh,500px)] w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]",
                })
              : null}

            {!hasPoster && hasRecap ? (
              <div className="w-full max-w-[560px]">{recap(false)}</div>
            ) : null}

            {hasPoster && hasSecondary ? (
              <div className="flex min-w-0 flex-1 flex-col justify-end gap-3 pb-0.5">
                {recap(true)}
                {photoFigures("journey")}
              </div>
            ) : null}

            {!hasPoster && hasPhotos ? (
              <div className="flex min-w-0 flex-1 flex-col justify-end gap-3 pb-0.5">
                {photoFigures("journey")}
              </div>
            ) : null}
          </div>
        ) : null}
      </motion.div>
    </article>
  );
}
