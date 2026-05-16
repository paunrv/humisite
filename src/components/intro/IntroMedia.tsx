"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type IntroMediaProps = {
  videoSrc: string;
  posterSrc: string;
  isActive?: boolean;
  isHovered?: boolean;
  isDimmed?: boolean;
  overlayBase?: number;
  overlayActive?: number;
  scale?: number;
  className?: string;
};

export function IntroMedia({
  videoSrc,
  posterSrc,
  isActive = true,
  isHovered = false,
  isDimmed = false,
  overlayBase = 0.52,
  overlayActive = 0.4,
  scale = 1,
  className = "",
}: IntroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePoster, setUsePoster] = useState(false);

  const overlayOpacity = isHovered
    ? overlayActive
    : isDimmed
      ? Math.min(overlayBase + 0.06, 0.92)
      : overlayBase;

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || usePoster || !isActive) return;

    try {
      video.muted = true;
      await video.play();
    } catch {
      /* autoplay policies */
    }
  }, [isActive, usePoster]);

  useEffect(() => {
    void tryPlay();
  }, [tryPlay, isActive]);

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden bg-[#050505] ${className}`}
      animate={{ scale }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {!usePoster ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          loop
          autoPlay
          preload={isActive ? "auto" : "none"}
          onError={() => setUsePoster(true)}
          onLoadedData={() => void tryPlay()}
        />
      ) : (
        <motion.div
          className="absolute inset-[-8%] bg-cover bg-center"
          style={{ backgroundImage: `url(${posterSrc})` }}
          animate={{ scale: [1.06, 1.12, 1.06] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: overlayOpacity }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black/20"
        animate={{ opacity: isHovered ? 0.03 : 0.06 }}
        transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </motion.div>
  );
}
