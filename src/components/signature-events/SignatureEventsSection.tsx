"use client";

import {
  formatEdition,
  SIGNATURE_EVENTS,
} from "@/lib/signature-events";
import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SignatureEventChapter } from "./SignatureEventChapter";

const TOTAL = SIGNATURE_EVENTS.length;

export function SignatureEventsSection() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const navLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const panels = [
      ...track.querySelectorAll<HTMLElement>("[data-signature-panel]"),
    ];
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (navLockRef.current) return;
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
        if (best) setActiveIndex(best.index);
      },
      {
        root: isDesktop ? track : null,
        threshold: [0.45, 0.65, 0.8],
      },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [isDesktop]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const panel = track.querySelector<HTMLElement>(
        `[data-signature-panel][data-index="${index}"]`,
      );
      if (!panel) return;

      if (isDesktop) {
        const left =
          panel.getBoundingClientRect().left -
          track.getBoundingClientRect().left +
          track.scrollLeft;
        navLockRef.current = true;
        track.scrollTo({
          left,
          behavior: reduceMotion ? "auto" : "smooth",
        });
        setActiveIndex(index);
        window.setTimeout(() => {
          navLockRef.current = false;
        }, reduceMotion ? 50 : 450);
        return;
      }

      panel.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
      setActiveIndex(index);
    },
    [isDesktop, reduceMotion],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isDesktop) return;

    const onKey = (e: KeyboardEvent) => {
      const focused =
        document.activeElement === track ||
        track.contains(document.activeElement);
      if (!focused) return;
      if (navLockRef.current) {
        e.preventDefault();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        scrollToIndex(Math.min(activeIndexRef.current + 1, TOTAL - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        scrollToIndex(Math.max(activeIndexRef.current - 1, 0));
      }
    };

    track.addEventListener("keydown", onKey);
    return () => track.removeEventListener("keydown", onKey);
  }, [isDesktop, scrollToIndex]);

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

  const progress = ((activeIndex + 1) / TOTAL) * 100;

  return (
    <section
      id="signature-events"
      className="signature-events relative overflow-hidden border-t border-black/[0.06] bg-[#f7f7f5]"
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

      <div className="relative py-20 md:py-24">
        <motion.header
          {...headerReveal}
          className="mx-auto max-w-[1100px] px-5 md:px-10"
        >
          <h2
            id="signature-events-heading"
            className="text-[clamp(2.15rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#0f0f0f]"
          >
            Signature Events
          </h2>
          <p className="mt-6 max-w-[34rem] text-[clamp(1.15rem,2.2vw,1.4rem)] font-medium leading-[1.45] tracking-[-0.02em] text-[#1a1a1a]">
            For over a decade, HUMI has created experiences that bring athletes,
            families, and champions together.
          </p>
          <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-[#666]">
            Each edition becomes part of our story.
          </p>
        </motion.header>

        {/* Progress — chapters in the archive */}
        <div className="mx-auto mt-10 flex max-w-[1100px] items-center justify-between gap-6 px-5 md:mt-12 md:px-10">
          <p
            className="font-mono text-xs font-medium tracking-[0.14em] text-[#888]"
            aria-live="polite"
          >
            <span className="text-[#0f0f0f]">
              {formatEdition(activeIndex + 1)}
            </span>
            <span className="mx-1.5 text-[#ccc]">/</span>
            <span>{formatEdition(TOTAL)}</span>
          </p>

          <div
            className="h-px max-w-[12rem] flex-1 bg-black/[0.08] md:max-w-[16rem]"
            role="presentation"
          >
            <div
              className="h-px bg-[#164A89] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex" role="tablist" aria-label="Capítulos">
            {SIGNATURE_EVENTS.map((event, index) => (
              <button
                key={event.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Ir a ${formatEdition(event.id)} · ${event.title}`}
                onClick={() => scrollToIndex(index)}
                className={
                  index === activeIndex
                    ? "h-1.5 w-1.5 rounded-full bg-[#164A89]"
                    : "h-1.5 w-1.5 rounded-full bg-black/15 transition-colors hover:bg-black/30"
                }
              />
            ))}
          </div>
        </div>

        {/* Desktop: horizontal snap · Mobile: vertical stack */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Archivo Signature Events"
          className="mt-8 outline-none max-md:flex max-md:flex-col md:mt-10 md:flex md:snap-x md:snap-mandatory md:flex-row md:gap-6 md:overflow-x-auto md:scroll-px-10 md:px-10 md:pb-6 lg:gap-10 [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.2)_transparent]"
        >
          {SIGNATURE_EVENTS.map((event, index) => (
            <SignatureEventChapter
              key={event.id}
              event={event}
              index={index}
              total={TOTAL}
            />
          ))}
        </div>

        <p className="mx-auto mt-4 hidden max-w-[1100px] px-10 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#bbb] md:block">
          Desliza horizontalmente · ← →
        </p>

        <motion.footer
          {...closingReveal}
          className="mx-auto mt-16 max-w-[420px] border-t border-black/[0.06] px-5 pt-14 text-center md:mt-20 md:pt-16"
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
