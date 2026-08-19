"use client";

import {
  getStills,
  getVideos,
  publicMediaSrc,
  type SignatureMediaItem,
} from "@/lib/signature-events";
import Image from "next/image";
import { useState } from "react";

type SignatureEventMediaProps = {
  title: string;
  year: string;
  media: SignatureMediaItem[];
  priority?: boolean;
};

function ImageFrame({
  item,
  alt,
  className,
  sizes,
  priority = false,
}: {
  item: SignatureMediaItem;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  const coverClass = item.objectPosition
    ? "object-cover"
    : "object-cover object-center";
  const coverStyle = item.objectPosition
    ? { objectPosition: item.objectPosition }
    : undefined;

  return (
    <figure className={`relative overflow-hidden bg-[#ebebe8] ${className}`}>
      <Image
        src={publicMediaSrc(item.src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={coverClass}
        style={coverStyle}
        onError={() => setFailed(true)}
      />
    </figure>
  );
}

function VideoFrame({
  src,
  posterSrc,
  title,
  className,
}: {
  src: string;
  posterSrc?: string;
  title: string;
  className: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <figure className={`relative overflow-hidden bg-[#111] ${className}`}>
      <video
        className="absolute inset-0 h-full w-full object-contain object-center"
        controls
        playsInline
        preload="metadata"
        poster={posterSrc ? publicMediaSrc(posterSrc) : undefined}
        src={publicMediaSrc(src)}
        onError={() => setFailed(true)}
        aria-label={title}
      />
    </figure>
  );
}

function StillsGallery({
  stills,
  altBase,
  sizes,
  priority,
}: {
  stills: SignatureMediaItem[];
  altBase: string;
  sizes: string;
  priority: boolean;
}) {
  const featured = stills[0];
  const rest = stills.slice(1);

  if (!featured) return null;

  if (rest.length === 0) {
    return (
      <ImageFrame
        item={featured}
        alt={altBase}
        className="aspect-[3/4] w-full max-w-[22rem]"
        sizes={sizes}
        priority={priority}
      />
    );
  }

  const pair = rest.slice(0, 2);
  const extra = rest.slice(2);

  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="flex w-full items-stretch gap-2.5">
        <ImageFrame
          item={featured}
          alt={altBase}
          className="aspect-[3/4] min-w-0 flex-1"
          sizes={sizes}
          priority={priority}
        />
        {pair.length > 0 ? (
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 self-stretch">
            {pair.map((item, i) => (
              <ImageFrame
                key={item.src}
                item={item}
                alt={`${altBase} · ${i + 1}`}
                className="min-h-0 w-full flex-1"
                sizes={sizes}
              />
            ))}
          </div>
        ) : null}
      </div>
      {extra.length > 0 ? (
        <div
          className={
            extra.length === 1
              ? "grid grid-cols-1 gap-2.5 empty:hidden"
              : "grid grid-cols-2 gap-2.5 empty:hidden"
          }
        >
          {extra.map((item, i) => (
            <ImageFrame
              key={item.src}
              item={item}
              alt={`${altBase} · ${pair.length + i + 1}`}
              className="aspect-[3/2] w-full"
              sizes={sizes}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Renders whatever media an event actually has: poster, images, video, or mixes.
 * Failed URLs are omitted so broken elements never stay on the page.
 */
export function SignatureEventMedia({
  title,
  year,
  media,
  priority = false,
}: SignatureEventMediaProps) {
  const stills = getStills(media);
  const videos = getVideos(media);
  if (stills.length === 0 && videos.length === 0) return null;

  const altBase = `${title} — ${year}`;
  const posterSrc = stills[0]?.src;
  const sizes = "(max-width: 768px) 92vw, (max-width: 1200px) 70vw, 820px";
  const posterVideo =
    stills.length === 1 && videos.length > 0 && stills[0].type === "poster";

  return (
    <div className="mt-8 w-full empty:hidden md:mt-10">
      {posterVideo ? (
        <div className="flex w-full flex-col items-stretch gap-2.5 empty:hidden sm:flex-row">
          <ImageFrame
            item={stills[0]}
            alt={altBase}
            className="aspect-[3/4] min-w-0 flex-1"
            sizes={sizes}
            priority={priority}
          />
          <VideoFrame
            src={videos[0].src}
            posterSrc={posterSrc}
            title={`${title} — recap ${year}`}
            className="aspect-[3/4] min-w-0 flex-1"
          />
        </div>
      ) : stills.length > 0 ? (
        <StillsGallery
          stills={stills}
          altBase={altBase}
          sizes={sizes}
          priority={priority}
        />
      ) : null}

      {videos.length > 0 && !posterVideo ? (
        <div
          className={
            stills.length > 0
              ? "mt-2.5 flex flex-col gap-2.5 empty:hidden"
              : "flex flex-col gap-2.5 empty:hidden"
          }
        >
          {videos.map((item) => (
            <VideoFrame
              key={item.src}
              src={item.src}
              posterSrc={posterSrc}
              title={`${title} — recap ${year}`}
              className="aspect-video w-full"
            />
          ))}
        </div>
      ) : null}

      {posterVideo && videos.length > 1 ? (
        <div className="mt-2.5 flex flex-col gap-2.5 empty:hidden">
          {videos.slice(1).map((item) => (
            <VideoFrame
              key={item.src}
              src={item.src}
              posterSrc={posterSrc}
              title={`${title} — recap ${year}`}
              className="aspect-video w-full"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
