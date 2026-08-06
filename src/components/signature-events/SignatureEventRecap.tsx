"use client";

import {
  getRecapVideoKind,
  getVimeoEmbedId,
  getYouTubeEmbedId,
} from "@/lib/signature-events";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type SignatureEventRecapProps = {
  title: string;
  videoSrc: string;
  thumbnailSrc: string;
};

const CTA = "Relive the Experience";

export function SignatureEventRecap({
  title,
  videoSrc,
  thumbnailSrc,
}: SignatureEventRecapProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const kind = getRecapVideoKind(videoSrc);

  const start = useCallback(() => {
    setPlaying(true);
  }, []);

  // Native file: play after the <video> mounts (user already clicked)
  useEffect(() => {
    if (!playing || kind !== "file") return;
    void videoRef.current?.play().catch(() => {
      /* ignore abort / autoplay policy edge cases */
    });
  }, [playing, kind]);

  const youtubeId = kind === "youtube" ? getYouTubeEmbedId(videoSrc) : null;
  const vimeoId = kind === "vimeo" ? getVimeoEmbedId(videoSrc) : null;

  return (
    <div className="mt-10 w-full max-w-[520px] md:mt-12">
      <p className="mb-3 font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-[#888]">
        Recap
      </p>

      <div className="relative aspect-video w-full overflow-hidden bg-[#111]">
        {!playing ? (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 z-10 flex w-full flex-col items-center justify-center text-left"
            aria-label={`${CTA} — ${title}`}
          >
            <Image
              src={thumbnailSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 520px"
              className="object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:brightness-[1.03]"
            />
            <span className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/28" />
            <span className="relative z-10 flex flex-col items-center gap-3 px-4">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
                aria-hidden="true"
              >
                <span className="ml-0.5 text-lg leading-none">▶</span>
              </span>
              <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white">
                ▶ {CTA}
              </span>
            </span>
          </button>
        ) : kind === "file" ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={thumbnailSrc}
            src={videoSrc}
          />
        ) : kind === "youtube" && youtubeId ? (
          <iframe
            title={`${title} recap`}
            className="h-full w-full border-0"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : kind === "vimeo" && vimeoId ? (
          <iframe
            title={`${title} recap`}
            className="h-full w-full border-0"
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <p className="flex h-full items-center justify-center px-4 text-center text-sm text-[#999]">
            Unable to play this recap.
          </p>
        )}
      </div>
    </div>
  );
}
