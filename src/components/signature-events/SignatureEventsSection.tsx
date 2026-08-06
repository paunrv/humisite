"use client";

import {
  formatEdition,
  SIGNATURE_EVENTS,
} from "@/lib/signature-events";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SignatureEventChapter } from "./SignatureEventChapter";

const TOTAL = SIGNATURE_EVENTS.length;
/** Vertical scroll length per chapter — higher = slower, more intentional. */
const VH_PER_CHAPTER = 100;
/** Site nav height (index.html) */
const NAV_OFFSET_PX = 60;

export function SignatureEventsSection() {
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Journey needs enough width for the editorial spread; tablet/mobile stack.
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const useJourney = isDesktop && !reduceMotion;

  const headerReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  const closingReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.45 },
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="signature-events"
      className="signature-events relative border-t border-black/[0.06] bg-[#f7f7f5]"
      aria-labelledby="signature-events-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 50% -10%, rgba(22,74,137,0.05), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f7f7f5 28%, #f3f3f0 100%)",
        }}
      />

      <div className="relative">
        <motion.header
          {...headerReveal}
          className="mx-auto max-w-[1100px] px-5 pb-4 pt-20 md:px-10 md:pb-6 md:pt-24"
        >
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#164A89]">
            Signature Events
          </p>
          <h2
            id="signature-events-heading"
            className="text-[clamp(2.15rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#0f0f0f]"
          >
            A decade of shared experiences.
          </h2>
          <p className="mt-6 max-w-[34rem] text-[clamp(1.15rem,2.2vw,1.4rem)] font-medium leading-[1.45] tracking-[-0.02em] text-[#1a1a1a]">
            For over a decade, HUMI has created experiences that bring athletes,
            families, and champions together.
          </p>
          <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-[#666]">
            Each edition becomes part of our story. Scroll to walk through them.
          </p>
        </motion.header>

        {useJourney ? (
          <JourneyTrack
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />
        ) : (
          <StackTrack
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />
        )}

        <motion.footer
          {...closingReveal}
          className="mx-auto max-w-[420px] border-t border-black/[0.06] px-5 pb-20 pt-14 text-center md:pb-24 md:pt-16"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89]">
            What&apos;s Next?
          </p>
          <p className="mt-5 text-[clamp(1.25rem,2.4vw,1.55rem)] font-semibold leading-snug tracking-[-0.025em] text-[#0f0f0f]">
            Every year brings a new chapter.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#666]">
            We&apos;re already working on the next Signature Event.
          </p>
        </motion.footer>
      </div>
    </section>
  );
}

/* ── Desktop: vertical scroll → horizontal journey ───────────────────────── */

type TrackProps = {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

function JourneyTrack({ activeIndex, onActiveIndexChange }: TrackProps) {
  const pinRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    // Sticky engages at NAV_OFFSET_PX — start progress when the pin reaches that line.
    offset: [`start ${NAV_OFFSET_PX}px`, "end end"],
  });

  // translateX % is relative to the track itself (width = TOTAL * 100% of viewport).
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((TOTAL - 1) / TOTAL) * 100}%`],
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      TOTAL - 1,
      Math.max(0, Math.round(v * (TOTAL - 1))),
    );
    onActiveIndexChange(idx);
  });

  const goToChapter = useCallback((index: number) => {
    const pin = pinRef.current;
    if (!pin) return;
    const rect = pin.getBoundingClientRect();
    const pinTop = window.scrollY + rect.top;
    // Match sticky top offset so chapter 0 aligns when pin reaches the nav edge.
    const scrollable = Math.max(
      1,
      pin.offsetHeight - (window.innerHeight - NAV_OFFSET_PX),
    );
    const target =
      pinTop - NAV_OFFSET_PX + (index / Math.max(1, TOTAL - 1)) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={pinRef}
      className="relative"
      style={{ height: `${TOTAL * VH_PER_CHAPTER}vh` }}
    >
      {/* Sit below the fixed 60px site nav so chapter progress stays visible */}
      <div
        className="sticky flex flex-col overflow-hidden"
        style={{
          top: NAV_OFFSET_PX,
          height: `calc(100dvh - ${NAV_OFFSET_PX}px)`,
        }}
      >
        <ChapterProgress
          activeIndex={activeIndex}
          onSelect={goToChapter}
          hint="Scroll to continue"
        />

        <motion.div
          style={{ x, width: `${TOTAL * 100}%` }}
          className="flex min-h-0 flex-1 will-change-transform"
          role="region"
          aria-roledescription="timeline"
          aria-label="Signature Events journey"
        >
          {SIGNATURE_EVENTS.map((event, index) => (
            <div
              key={event.id}
              className="h-full shrink-0"
              style={{ width: `${100 / TOTAL}%` }}
            >
              <SignatureEventChapter
                event={event}
                index={index}
                total={TOTAL}
                variant="journey"
                isActive={index === activeIndex}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Mobile / reduced-motion: vertical editorial stack ───────────────────── */

function StackTrack({ activeIndex, onActiveIndexChange }: TrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const panels = [
      ...track.querySelectorAll<HTMLElement>("[data-signature-panel]"),
    ];
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number(
            (entry.target as HTMLElement).dataset.index ?? -1,
          );
          if (index < 0) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { index, ratio: entry.intersectionRatio };
          }
        }
        if (best) onActiveIndexChange(best.index);
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [onActiveIndexChange]);

  const goToChapter = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const panel = track.querySelector<HTMLElement>(
      `[data-signature-panel][data-index="${index}"]`,
    );
    panel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      <div className="sticky top-[60px] z-10 border-b border-black/[0.04] bg-[#f7f7f5]/92 backdrop-blur-sm">
        <ChapterProgress
          activeIndex={activeIndex}
          onSelect={goToChapter}
        />
      </div>

      <div
        ref={trackRef}
        className="flex flex-col"
        role="region"
        aria-label="Signature Events archive"
      >
        {SIGNATURE_EVENTS.map((event, index) => (
          <SignatureEventChapter
            key={event.id}
            event={event}
            index={index}
            total={TOTAL}
            variant="stack"
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Understated chapter progress: 01 → 02 → … ───────────────────────────── */

function ChapterProgress({
  activeIndex,
  onSelect,
  hint,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  hint?: string;
}) {
  return (
    <div className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-b border-black/[0.04] px-5 py-3.5 md:px-10 lg:px-16 xl:px-20">
      {/*
        Use role="navigation" — NOT <nav>. Legacy landing CSS targets bare `nav`
        (fixed header), which would swallow this progress control.
      */}
      <div
        role="navigation"
        aria-label="Chapters"
        className="flex flex-wrap items-center gap-x-0.5 font-mono text-[0.7rem] font-medium tracking-[0.1em] md:text-xs md:tracking-[0.12em]"
      >
        {SIGNATURE_EVENTS.map((event, index) => {
          const active = index === activeIndex;
          return (
            <span key={event.id} className="inline-flex items-center">
              {index > 0 ? (
                <span
                  className="mx-1.5 text-black/15 md:mx-2"
                  aria-hidden="true"
                >
                  →
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={active ? "true" : undefined}
                aria-label={`Chapter ${formatEdition(event.id)} · ${event.title} · ${event.year}`}
                className={
                  active
                    ? "text-[#164A89] transition-colors duration-300"
                    : "text-[#999] transition-colors duration-300 hover:text-[#555]"
                }
              >
                {formatEdition(event.id)}
              </button>
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <p
          className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#999]"
          aria-live="polite"
        >
          {SIGNATURE_EVENTS[activeIndex]?.year}
        </p>
        {hint ? (
          <p className="hidden font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#ccc] lg:block">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
