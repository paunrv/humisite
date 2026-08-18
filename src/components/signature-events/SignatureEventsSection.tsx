"use client";

import {
  formatEdition,
  EXPERIENCIAS_HUMI,
} from "@/lib/experiencias-humi";
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

const TOTAL = EXPERIENCIAS_HUMI.length;
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
          className="mx-auto max-w-[1100px] px-5 pb-6 pt-16 md:px-10 md:pb-6 md:pt-24"
        >
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#164A89] md:mb-4">
            Experiencias HUMI
          </p>
          <h2
            id="signature-events-heading"
            className="max-w-[14ch] text-[clamp(1.85rem,7.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#0f0f0f] md:max-w-none"
          >
            Una década de experiencias compartidas.
          </h2>
          <p className="mt-5 max-w-[34ch] text-[clamp(1.05rem,3.8vw,1.4rem)] font-medium leading-[1.5] tracking-[-0.02em] text-[#1a1a1a] md:mt-6 md:max-w-[34rem]">
            Durante más de una década, HUMI ha creado experiencias que unen a
            atletas, familias y campeones.
          </p>
          <p className="mt-3.5 max-w-[34ch] text-[0.975rem] leading-relaxed text-[#666] md:mt-4 md:max-w-[30rem] md:text-base">
            Cada año creamos una experiencia que deja huella. Desplázate para
            recorrerlas.
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
          className="mx-auto max-w-[420px] border-t border-black/[0.06] px-5 pb-16 pt-12 text-center md:pb-24 md:pt-16"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89]">
            ¿Qué sigue?
          </p>
          <p className="mt-5 text-[clamp(1.25rem,2.4vw,1.55rem)] font-semibold leading-snug tracking-[-0.025em] text-[#0f0f0f]">
            Cada año llega un nuevo capítulo.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#666]">
            Ya estamos trabajando en la próxima Experiencia HUMI.
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
          hint="Desplázate para continuar"
        />

        <motion.div
          style={{ x, width: `${TOTAL * 100}%` }}
          className="flex min-h-0 flex-1 will-change-transform"
          role="region"
          aria-roledescription="timeline"
          aria-label="Recorrido de Experiencias HUMI"
        >
          {EXPERIENCIAS_HUMI.map((event, index) => (
            <div
              key={event.id}
              className="relative h-full shrink-0"
              style={{ width: `${100 / TOTAL}%` }}
            >
              {/*
                Edge rails sit above overflowing media so adjacent chapters
                always keep a visible pause between them.
              */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(3rem,8vw,6.5rem)] bg-[#f7f7f5]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(3rem,8vw,6.5rem)] bg-[#f7f7f5]"
                aria-hidden="true"
              />
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
      <div className="sticky top-[60px] z-10 border-b border-black/[0.04] bg-[#f7f7f5]/95 backdrop-blur-md supports-[padding:max(0px)]:top-[max(60px,env(safe-area-inset-top))]">
        <ChapterProgress
          activeIndex={activeIndex}
          onSelect={goToChapter}
        />
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-0"
        role="region"
        aria-label="Archivo de Experiencias HUMI"
      >
        {EXPERIENCIAS_HUMI.map((event, index) => (
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
    <div className="relative z-20 flex shrink-0 items-center justify-between gap-3 border-b border-black/[0.04] px-4 py-2.5 md:gap-4 md:px-10 md:py-3.5 lg:px-16 xl:px-20">
      {/*
        Use role="navigation" — NOT <nav>. Legacy landing CSS targets bare `nav`
        (fixed header), which would swallow this progress control.
      */}
      <div
        role="navigation"
        aria-label="Experiencias"
        className="-mx-1 flex max-w-[min(100%,20rem)] items-center gap-0 overflow-x-auto overscroll-x-contain px-1 font-mono text-[0.7rem] font-medium tracking-[0.1em] [-ms-overflow-style:none] [scrollbar-width:none] md:max-w-none md:flex-wrap md:overflow-visible md:text-xs md:tracking-[0.12em] [&::-webkit-scrollbar]:hidden"
      >
        {EXPERIENCIAS_HUMI.map((event, index) => {
          const active = index === activeIndex;
          return (
            <span key={event.id} className="inline-flex shrink-0 items-center">
              {index > 0 ? (
                <span
                  className="mx-0.5 text-black/15 md:mx-2"
                  aria-hidden="true"
                >
                  →
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={active ? "true" : undefined}
                aria-label={`${formatEdition(index + 1)} / ${formatEdition(TOTAL)} · ${event.title} · ${event.year}`}
                className={
                  active
                    ? "flex min-h-11 min-w-11 items-center justify-center px-1.5 text-[#164A89] transition-colors duration-300 md:min-h-0 md:min-w-0 md:px-0"
                    : "flex min-h-11 min-w-11 items-center justify-center px-1.5 text-[#999] transition-colors duration-300 hover:text-[#555] md:min-h-0 md:min-w-0 md:px-0"
                }
              >
                {formatEdition(index + 1)}
              </button>
            </span>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <p
          className="font-mono text-[0.65rem] tracking-[0.14em] text-black/30"
          aria-live="polite"
        >
          {formatEdition(activeIndex + 1)} / {formatEdition(TOTAL)}
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
