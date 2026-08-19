"use client";

import {
  formatEdition,
  SIGNATURE_EVENTS,
} from "@/lib/signature-events";
import { SignatureEventChapter } from "./SignatureEventChapter";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const TOTAL = SIGNATURE_EVENTS.length;

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduce;
}

export function SignatureEventsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  const scrollToIndex = useCallback(
    (index: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const next = Math.min(TOTAL - 1, Math.max(0, index));
      const panel = rail.querySelector<HTMLElement>(
        `[data-signature-panel][data-index="${next}"]`,
      );
      panel?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        inline: "start",
        block: "nearest",
      });
      setActiveIndex(next);
    },
    [reduceMotion],
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const syncActive = () => {
      const panels = [
        ...rail.querySelectorAll<HTMLElement>("[data-signature-panel]"),
      ];
      if (!panels.length) return;
      let best = 0;
      let bestDist = Infinity;
      for (const panel of panels) {
        const dist = Math.abs(panel.offsetLeft - rail.scrollLeft);
        const index = Number(panel.dataset.index ?? 0);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      }
      setActiveIndex(best);
    };

    rail.addEventListener("scroll", syncActive, { passive: true });
    return () => rail.removeEventListener("scroll", syncActive);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      window.scrollBy(0, event.deltaY);
    };

    rail.addEventListener("wheel", onWheel, { passive: false });
    return () => rail.removeEventListener("wheel", onWheel);
  }, []);

  const onRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(TOTAL - 1);
    }
  };

  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= TOTAL - 1;
  const previous = SIGNATURE_EVENTS[activeIndex - 1];
  const next = SIGNATURE_EVENTS[activeIndex + 1];

  return (
    <section
      id="signature-events"
      className="signature-events relative overflow-x-hidden border-t border-black/[0.06] bg-[#f7f7f5]"
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
        <header className="mx-auto max-w-[1100px] px-5 pb-6 pt-16 md:px-10 md:pb-8 md:pt-24">
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
            Cada año creamos una experiencia que deja huella.
          </p>
        </header>

        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 pb-4 md:px-10">
          <div
            role="navigation"
            aria-label="Archivo de experiencias"
            className="flex max-w-full flex-wrap items-center gap-x-1 font-mono text-[0.7rem] font-medium tracking-[0.1em] md:text-xs md:tracking-[0.12em]"
          >
            {SIGNATURE_EVENTS.map((event, index) => (
              <span key={event.id} className="inline-flex items-center">
                {index > 0 ? (
                  <span className="mx-1.5 text-black/15" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className="min-h-11 px-0.5 py-2 text-[#666] transition-colors hover:text-[#164A89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164A89] md:min-h-0"
                >
                  <span className="text-[#164A89]">
                    {formatEdition(index + 1)}
                  </span>
                  <span className="text-black/20"> — </span>
                  {event.year}
                </button>
              </span>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={atStart}
              aria-label={
                previous
                  ? `Anterior: ${previous.title}`
                  : "Anterior, inicio del archivo"
              }
              className="flex h-11 w-11 items-center justify-center border border-black/10 text-[#0f0f0f] transition-colors hover:border-black/25 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164A89] disabled:cursor-not-allowed disabled:border-black/[0.06] disabled:text-black/20"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={atEnd}
              aria-label={
                next ? `Siguiente: ${next.title}` : "Siguiente, fin del archivo"
              }
              className="flex h-11 w-11 items-center justify-center border border-black/10 text-[#0f0f0f] transition-colors hover:border-black/25 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164A89] disabled:cursor-not-allowed disabled:border-black/[0.06] disabled:text-black/20"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          tabIndex={0}
          onKeyDown={onRailKeyDown}
          className="signature-events-rail flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-5 pb-8 pt-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#164A89] md:scroll-px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Archivo horizontal de Experiencias HUMI"
        >
          {SIGNATURE_EVENTS.map((event, index) => (
            <SignatureEventChapter
              key={event.id}
              event={event}
              index={index}
              total={TOTAL}
            />
          ))}
          <div className="w-[8vw] shrink-0 snap-none" aria-hidden="true" />
        </div>

        <footer className="mx-auto max-w-[420px] border-t border-black/[0.06] px-5 pb-16 pt-12 text-center md:pb-24 md:pt-16">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89]">
            ¿Qué sigue?
          </p>
          <p className="mt-5 text-[clamp(1.25rem,2.4vw,1.55rem)] font-semibold leading-snug tracking-[-0.025em] text-[#0f0f0f]">
            Cada año llega un nuevo capítulo.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#666]">
            Ya estamos trabajando en la próxima Experiencia HUMI.
          </p>
        </footer>
      </div>
    </section>
  );
}
