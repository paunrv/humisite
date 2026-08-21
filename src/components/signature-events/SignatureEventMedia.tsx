"use client";

import {
  publicMediaSrc,
  type SignatureMediaItem,
} from "@/lib/signature-events";
import { useState } from "react";

type SignatureEventMediaProps = {
  title: string;
  year: string;
  media: SignatureMediaItem[];
};

/** Presentation-only pick. Mapping and files stay untouched. */
const FEATURED_SRC: Record<string, string> = {
  "2025": "/signature-events/2025/sunday-funday-poster.jpg",
  "2024": "/signature-events/2024/Taekwondo Games.mp4",
  "2023": "/signature-events/2023/ki-games.jpg",
  "2022": "/signature-events/2022/Ruumble Humi.mp4",
  "2019": "/signature-events/2019/2nd-tkdolympicbootcamp.jpg",
  "2018": "/signature-events/2018/1st-tkdolympicbootcamp.jpg",
};

function nativeAspect(item: SignatureMediaItem) {
  if (item.aspect) return item.aspect;
  if (item.type === "video") return "9 / 16";
  if (item.orientation === "portrait") return "3 / 4";
  return "3 / 2";
}

function isPortraitPiece(item: SignatureMediaItem) {
  const [w, h] = nativeAspect(item)
    .split("/")
    .map((part) => Number.parseFloat(part.trim()));
  if (w > 0 && h > 0) return w / h < 1;
  return item.orientation === "portrait";
}

function featuredOf(year: string, media: SignatureMediaItem[]) {
  const wanted = FEATURED_SRC[year];
  return (wanted ? media.find((item) => item.src === wanted) : undefined) ?? media[0];
}

export function featuredIsVertical(year: string, media: SignatureMediaItem[]) {
  const item = featuredOf(year, media);
  return item ? isPortraitPiece(item) : false;
}

function NaturalStill({
  item,
  alt,
}: {
  item: SignatureMediaItem;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <figure
      className="signature-media-frame"
      style={{ aspectRatio: nativeAspect(item) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={publicMediaSrc(item.src)}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
        onError={() => setFailed(true)}
      />
    </figure>
  );
}

function NaturalVideo({
  item,
  title,
}: {
  item: SignatureMediaItem;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <video
      className="signature-media-solo-video"
      controls
      playsInline
      muted
      preload="metadata"
      poster={item.poster ? publicMediaSrc(item.poster) : undefined}
      src={publicMediaSrc(item.src)}
      onError={() => setFailed(true)}
      aria-label={title}
    />
  );
}

/**
 * Renders a single featured asset per event.
 * Extra mapped files remain on disk and in signature-events.ts.
 */
export function SignatureEventMedia({
  title,
  year,
  media,
}: SignatureEventMediaProps) {
  const item = featuredOf(year, media);
  if (!item) return null;

  const altBase = `${title} — ${year}`;
  const portrait = isPortraitPiece(item);

  return (
    <div
      className={
        portrait
          ? "signature-media signature-media--solo signature-media--portrait"
          : "signature-media signature-media--solo signature-media--landscape"
      }
    >
      {item.type === "video" ? (
        <NaturalVideo item={item} title={`${title} — recap ${year}`} />
      ) : (
        <NaturalStill item={item} alt={altBase} />
      )}
    </div>
  );
}
