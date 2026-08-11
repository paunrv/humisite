"use client";

import {
  getImages,
  getPoster,
  getVideo,
  resolveMediaComposition,
  type SignatureMediaItem,
} from "@/lib/signature-events";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type SignatureEventMediaProps = {
  /** Desktop journey: fill the visual column. Mobile stack: sit under copy. */
  variant: "journey" | "stack";
  title: string;
  year: string;
  media: SignatureMediaItem[];
  priority?: boolean;
};

const VIDEO_CTA = "Revive la experiencia";

function Frame({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden bg-[#ebebe8] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </figure>
  );
}

function InlineVideo({
  title,
  src,
  posterSrc,
  compact,
}: {
  title: string;
  src: string;
  posterSrc?: string;
  compact: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = useCallback(() => setPlaying(true), []);

  useEffect(() => {
    if (!playing) return;
    void videoRef.current?.play().catch(() => {
      /* ignore autoplay / abort */
    });
  }, [playing]);

  return (
    <div className={compact ? "w-full min-w-0 flex-1" : "w-full"}>
      <p className="mb-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#888] md:mb-3 md:text-[0.7rem]">
        Resumen
      </p>
      <div className="relative aspect-video w-full overflow-hidden bg-[#111]">
        {!playing ? (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 z-10 flex w-full flex-col items-center justify-center text-left"
            aria-label={`${VIDEO_CTA} — ${title}`}
          >
            {posterSrc ? (
              <Image
                src={posterSrc}
                alt=""
                fill
                sizes={
                  compact
                    ? "(max-width: 768px) 90vw, 280px"
                    : "(max-width: 768px) 90vw, 520px"
                }
                className="object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]"
              />
            ) : null}
            <span
              className={
                posterSrc
                  ? "absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/28"
                  : "absolute inset-0 bg-black/20"
              }
            />
            <span className="relative z-10 flex flex-col items-center gap-2 px-3 sm:gap-3 sm:px-4">
              <span
                className={
                  compact
                    ? "flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
                    : "flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
                }
                aria-hidden="true"
              >
                <span
                  className={
                    compact
                      ? "ml-0.5 text-sm leading-none"
                      : "ml-0.5 text-lg leading-none"
                  }
                >
                  ▶
                </span>
              </span>
              <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white sm:text-[0.7rem]">
                ▶ {VIDEO_CTA}
              </span>
            </span>
          </button>
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={posterSrc}
            src={src}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Editorial media compositions derived from available items:
 * - poster + 2 images → photo layout
 * - poster + video → poster + large video
 * - video only → large video
 * - poster only → poster
 */
export function SignatureEventMedia({
  variant,
  title,
  year,
  media,
  priority = false,
}: SignatureEventMediaProps) {
  const composition = resolveMediaComposition(media);
  if (composition === "none") return null;

  const isJourney = variant === "journey";
  const altBase = `${title} — ${year}`;
  const poster = getPoster(media);
  const images = getImages(media).slice(0, 2);
  const video = getVideo(media);

  const shell = isJourney
    ? "flex w-full max-w-[560px] items-stretch gap-2.5 xl:gap-3"
    : "mt-9 flex w-full max-w-[min(100%,520px)] items-stretch gap-2.5 md:mt-11";

  const posterSizes = isJourney
    ? "(max-width: 1280px) 28vw, 280px"
    : "(max-width: 768px) 55vw, 240px";

  if (composition === "editorial" && poster) {
    const side = images.slice(0, 2);
    return (
      <div className={shell} data-media-layout="editorial">
        <Frame
          src={poster}
          alt={altBase}
          className="aspect-[3/4] min-w-0 flex-1"
          sizes={posterSizes}
          priority={priority}
        />
        {side.length > 0 ? (
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 self-stretch">
            {side.map((src, i) => (
              <Frame
                key={src}
                src={src}
                alt={
                  i === 0 ? `${altBase} · momento` : `${altBase} · comunidad`
                }
                className="min-h-0 w-full flex-1"
                sizes={posterSizes}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (composition === "poster-video" && poster && video) {
    return (
      <div className={shell} data-media-layout="poster-video">
        <Frame
          src={poster}
          alt={altBase}
          className="aspect-[3/4] w-[min(100%,200px)] shrink-0 sm:w-[min(100%,240px)]"
          sizes={posterSizes}
          priority={priority}
        />
        <InlineVideo
          title={title}
          src={video}
          posterSrc={poster}
          compact={isJourney}
        />
      </div>
    );
  }

  if (composition === "video" && video) {
    return (
      <div
        className={
          isJourney
            ? "w-full max-w-[560px]"
            : "mt-9 w-full max-w-[min(100%,520px)] md:mt-11"
        }
        data-media-layout="video"
      >
        <InlineVideo
          title={title}
          src={video}
          posterSrc={poster}
          compact={false}
        />
      </div>
    );
  }

  if (composition === "poster" && poster) {
    return (
      <div className={shell} data-media-layout="poster">
        <Frame
          src={poster}
          alt={altBase}
          className="aspect-[3/4] w-full max-w-[320px]"
          sizes={posterSizes}
          priority={priority}
        />
      </div>
    );
  }

  return null;
}
