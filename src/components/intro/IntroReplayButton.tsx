"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const SLOT_ID = "humi-intro-replay-slot";

type IntroReplayButtonProps = {
  active: boolean;
  hidden?: boolean;
  onClick: () => void;
};

/** Vertical reel frame + play — reads as video/reel at nav size */
function ReelIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.25" />
      <path
        d="M10.25 9.25v5.5l4.75-2.75-4.75-2.75z"
        fill={active ? "currentColor" : "none"}
        stroke={active ? "none" : "currentColor"}
        strokeWidth={active ? 0 : 1.25}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IntroReplayButton({ active, hidden, onClick }: IntroReplayButtonProps) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const resolve = () => document.getElementById(SLOT_ID);

    setSlot(resolve());

    const observer = new MutationObserver(() => {
      setSlot(resolve());
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (hidden || !slot) return null;

  const button = (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
        active
          ? "border-[#f5f0e8]/30 bg-[#f5f0e8]/12 text-[#f5f0e8]"
          : "border-white/[0.08] bg-white/[0.04] text-[#888] hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-[#f5f5f5]"
      }`}
      aria-label={active ? "Cerrar reels" : "Ver reels"}
      aria-pressed={active}
      title="Ver reels"
    >
      <ReelIcon active={active} />
    </button>
  );

  return createPortal(button, slot);
}
