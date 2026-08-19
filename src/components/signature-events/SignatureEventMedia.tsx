"use client";

import {
  getVideos,
  getVisuals,
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
  item,
  title,
  className,
}: {
  item: SignatureMediaItem;
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
        muted
        preload="metadata"
        poster={item.poster ? publicMediaSrc(item.poster) : undefined}
        src={publicMediaSrc(item.src)}
        onError={() => setFailed(true)}
        aria-label={title}
      />
    </figure>
  );
}

function VisualsGallery({
  visuals,
  altBase,
  sizes,
  priority,
}: {
  visuals: SignatureMediaItem[];
  altBase: string;
  sizes: string;
  priority: boolean;
}) {
  const featured = visuals[0];
  const rest = visuals.slice(1);
  if (!featured) return null;

  if (rest.length === 0) {
    return (
      <ImageFrame
        item={featured}
        alt={altBase}
        className="aspect-[3/4] h-full w-full"
        sizes={sizes}
        priority={priority}
      />
    );
  }

  const pair = rest.slice(0, 2);
  const extra = rest.slice(2);

  return (
    <div className="flex h-full w-full flex-col gap-2.5">
      <div className="flex min-h-0 w-full flex-1 items-stretch gap-2.5">
        <ImageFrame
          item={featured}
          alt={altBase}
          className="aspect-[3/4] min-h-0 min-w-0 flex-1"
          sizes={sizes}
          priority={priority}
        />
        {pair.length > 0 ? (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2.5">
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
 * Renders stills and videos independently.
 * Video thumbnails come only from each item's explicit `poster` field.
 */
export function SignatureEventMedia({
  title,
  year,
  media,
  priority = false,
}: SignatureEventMediaProps) {
  const visuals = getVisuals(media);
  const videos = getVideos(media);
  if (visuals.length === 0 && videos.length === 0) return null;

  const altBase = `${title} — ${year}`;
  const sizes = "(max-width: 1024px) 88vw, 48vw";
  const videoTitle = `${title} — recap ${year}`;
  const pairVisualAndVideo = visuals.length === 1 && videos.length > 0;

  return (
    <div className="flex h-full w-full min-w-0 flex-col gap-2.5 empty:hidden">
      {pairVisualAndVideo ? (
        <div className="flex min-h-0 w-full flex-1 flex-col items-stretch gap-2.5 empty:hidden sm:flex-row">
          <ImageFrame
            item={visuals[0]}
            alt={altBase}
            className="aspect-[3/4] min-h-0 min-w-0 flex-1"
            sizes={sizes}
            priority={priority}
          />
          <VideoFrame
            item={videos[0]}
            title={videoTitle}
            className="aspect-[3/4] min-h-0 min-w-0 flex-1"
          />
        </div>
      ) : visuals.length > 0 ? (
        <VisualsGallery
          visuals={visuals}
          altBase={altBase}
          sizes={sizes}
          priority={priority}
        />
      ) : null}

      {videos.length > 0 && !pairVisualAndVideo ? (
        <div className="flex flex-col gap-2.5 empty:hidden">
          {videos.map((item) => (
            <VideoFrame
              key={item.src}
              item={item}
              title={videoTitle}
              className="aspect-video w-full min-h-[12rem]"
            />
          ))}
        </div>
      ) : null}

      {pairVisualAndVideo && videos.length > 1 ? (
        <div className="flex flex-col gap-2.5 empty:hidden">
          {videos.slice(1).map((item) => (
            <VideoFrame
              key={item.src}
              item={item}
              title={videoTitle}
              className="aspect-video w-full min-h-[12rem]"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
