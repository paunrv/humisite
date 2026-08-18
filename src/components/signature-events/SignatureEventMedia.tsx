"use client";

import {
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

/**
 * Shared editorial frame for posters, photos, and videos.
 * Same crop, proportions, and container — media type should not change layout.
 */
function MediaFrame({
  kind,
  src,
  alt,
  className,
  sizes,
  priority = false,
  posterSrc,
  title,
  objectPosition,
}: {
  kind: "image" | "video";
  src: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
  posterSrc?: string;
  title?: string;
  objectPosition?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = useCallback(() => setPlaying(true), []);

  useEffect(() => {
    if (!playing || kind !== "video") return;
    void videoRef.current?.play().catch(() => {
      /* ignore autoplay / abort */
    });
  }, [playing, kind]);

  const coverClass = objectPosition
    ? "object-cover"
    : "object-cover object-center";
  const coverStyle = objectPosition ? { objectPosition } : undefined;

  return (
    <figure className={`relative overflow-hidden bg-[#ebebe8] ${className}`}>
      {kind === "image" ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={coverClass}
          style={coverStyle}
        />
      ) : !playing ? (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 z-10"
          aria-label={`Reproducir — ${title ?? alt}`}
        >
          {posterSrc ? (
            <Image
              src={posterSrc}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover object-center transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]"
            />
          ) : (
            <span className="absolute inset-0 bg-[#111]" />
          )}
          <span className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/15" />
          <span
            className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-black/25 text-white backdrop-blur-sm transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
            aria-hidden="true"
          >
            <span className="ml-0.5 text-xs leading-none">▶</span>
          </span>
        </button>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          controls
          playsInline
          preload="metadata"
          poster={posterSrc}
          src={src}
        />
      )}
    </figure>
  );
}

/**
 * Editorial media compositions derived from available items.
 * Videos use the same MediaFrame as images (aspect, crop, spacing).
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
  const sideImages = media.filter((item) => item.type === "image").slice(0, 2);
  const video = getVideo(media);

  const shell = isJourney
    ? "mx-auto flex w-[min(100%,32rem)] min-w-0 items-stretch gap-2.5 xl:gap-3"
    : "mx-auto mt-9 flex w-[min(100%,520px)] items-stretch gap-2.5 md:mt-11";

  const frameSizes = isJourney
    ? "(max-width: 1280px) 28vw, 280px"
    : "(max-width: 768px) 55vw, 240px";

  if (composition === "editorial" && poster) {
    return (
      <div className={shell} data-media-layout="editorial">
        <MediaFrame
          kind="image"
          src={poster}
          alt={altBase}
          className="aspect-[3/4] min-w-0 flex-1"
          sizes={frameSizes}
          priority={priority}
        />
        {sideImages.length > 0 ? (
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 self-stretch">
            {sideImages.map((item, i) => (
              <MediaFrame
                key={item.src}
                kind="image"
                src={item.src}
                alt={
                  i === 0
                    ? `${altBase} · momento`
                    : `${altBase} · ronqueo de atún`
                }
                className="min-h-0 w-full flex-1"
                sizes={frameSizes}
                objectPosition={item.objectPosition}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (composition === "poster-video" && poster && video) {
    // Same editorial shell as poster + image: equal 3/4 frames, shared crop language.
    return (
      <div className={shell} data-media-layout="poster-video">
        <MediaFrame
          kind="image"
          src={poster}
          alt={altBase}
          className="aspect-[3/4] min-w-0 flex-1"
          sizes={frameSizes}
          priority={priority}
        />
        <MediaFrame
          kind="video"
          src={video}
          alt={`${altBase} · video`}
          title={title}
          posterSrc={poster}
          className="aspect-[3/4] min-w-0 flex-1"
          sizes={frameSizes}
        />
      </div>
    );
  }

  if (composition === "video" && video) {
    return (
      <div className={shell} data-media-layout="video">
        <MediaFrame
          kind="video"
          src={video}
          alt={`${altBase} · video`}
          title={title}
          posterSrc={poster}
          className="aspect-[3/4] w-full max-w-[320px]"
          sizes={frameSizes}
          priority={priority}
        />
      </div>
    );
  }

  if (composition === "poster" && poster) {
    return (
      <div className={shell} data-media-layout="poster">
        <MediaFrame
          kind="image"
          src={poster}
          alt={altBase}
          className="aspect-[3/4] w-full max-w-[320px]"
          sizes={frameSizes}
          priority={priority}
        />
      </div>
    );
  }

  return null;
}
