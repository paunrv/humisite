"use client";

import { SIGNATURE_EVENTS } from "@/lib/signature-events";
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

function panelAt(rail: HTMLDivElement, index: number) {
  return rail.querySelectorAll<HTMLElement>("[data-signature-panel]")[index];
}

export function SignatureEventsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const draggingRef = useRef(false);
  const programmaticRef = useRef(false);
  const programmaticTimerRef = useRef<number>(0);
  const reduceMotion = usePrefersReducedMotion();

  const scrollToIndex = useCallback(
    (index: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const next = Math.min(TOTAL - 1, Math.max(0, index));
      const panel = panelAt(rail, next);
      programmaticRef.current = true;
      window.clearTimeout(programmaticTimerRef.current);
      rail.scrollTo({
        left: panel?.offsetLeft ?? 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      activeIndexRef.current = next;
      setActiveIndex(next);
      programmaticTimerRef.current = window.setTimeout(() => {
        programmaticRef.current = false;
      }, 700);
    },
    [reduceMotion],
  );

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const syncActive = () => {
      if (draggingRef.current || programmaticRef.current) return;
      const panels = [...rail.querySelectorAll<HTMLElement>("[data-signature-panel]")];
      if (!panels.length) return;
      let best = 0;
      let bestDist = Infinity;
      panels.forEach((panel, index) => {
        const dist = Math.abs(panel.offsetLeft - rail.scrollLeft);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      activeIndexRef.current = best;
      setActiveIndex(best);
    };

    const onScrollEnd = () => {
      programmaticRef.current = false;
      syncActive();
    };

    rail.addEventListener("scroll", syncActive, { passive: true });
    rail.addEventListener("scrollend", onScrollEnd);
    return () => {
      rail.removeEventListener("scroll", syncActive);
      rail.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let startX = 0;
    let startY = 0;
    let startIndex = 0;
    let axis: "x" | "y" | null = null;

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      startIndex = activeIndexRef.current;
      axis = null;
    };

    const onMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (axis == null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (axis !== "x") return;
      event.preventDefault();
      draggingRef.current = true;
      const origin = panelAt(rail, startIndex);
      const page = origin?.offsetWidth ?? rail.clientWidth;
      const clamped = Math.max(-page, Math.min(page, dx));
      rail.scrollLeft = (origin?.offsetLeft ?? 0) - clamped;
    };

    const onEnd = (event: TouchEvent) => {
      if (axis !== "x") {
        axis = null;
        draggingRef.current = false;
        return;
      }
      const touch = event.changedTouches[0];
      const dx = touch ? touch.clientX - startX : 0;
      const origin = panelAt(rail, startIndex);
      const page = origin?.offsetWidth ?? rail.clientWidth;
      const threshold = Math.min(48, page * 0.18);
      draggingRef.current = false;
      axis = null;
      if (dx <= -threshold) scrollToIndex(startIndex + 1);
      else if (dx >= threshold) scrollToIndex(startIndex - 1);
      else scrollToIndex(startIndex);
    };

    rail.addEventListener("touchstart", onStart, { passive: true });
    rail.addEventListener("touchmove", onMove, { passive: false });
    rail.addEventListener("touchend", onEnd, { passive: true });
    rail.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      rail.removeEventListener("touchstart", onStart);
      rail.removeEventListener("touchmove", onMove);
      rail.removeEventListener("touchend", onEnd);
      rail.removeEventListener("touchcancel", onEnd);
    };
  }, [scrollToIndex]);

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
  const previousTitle = SIGNATURE_EVENTS[activeIndex - 1]?.title;
  const nextTitle = SIGNATURE_EVENTS[activeIndex + 1]?.title;

  return (
    <section
      id="signature-events"
      className="signature-events"
      aria-labelledby="signature-events-heading"
    >
      <style>{`
        #signature-events {
          background: #080808;
          color: #f5f5f5;
          max-width: none;
          overflow-x: hidden;
          padding-top: 7rem;
          padding-bottom: 6rem;
          padding-left: calc(50vw - 580px);
          padding-right: calc(50vw - 580px);
          border-top: 1px solid rgba(255,255,255,0.08);
          scroll-margin-top: 60px;
        }
        @media (max-width: 1200px) {
          #signature-events { padding-left: 2rem; padding-right: 2rem; }
        }
        @media (max-width: 768px) {
          #signature-events {
            padding-top: 5.5rem;
            padding-bottom: 4.5rem;
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
        }
        #signature-events .signature-events-masthead {
          position: static;
          margin: 0;
          padding: 0 0 2rem;
        }
        #signature-events .section-eyebrow {
          color: #4a8fd4;
          margin: 0 0 0.8rem;
        }
        #signature-events .section-title {
          color: #f5f5f5;
          margin: 0 0 0.7rem;
        }
        #signature-events .section-sub {
          color: #888;
          margin: 0;
        }
        @media (max-width: 768px) {
          #signature-events .signature-events-masthead {
            padding-bottom: 3.25rem;
          }
        }
        #signature-events .signature-events-rail {
          display: flex !important;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: flex-start;
          gap: 3rem;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          scrollbar-width: none;
          /* Trailing space so the last event can snap to the rail start. */
          padding-right: calc(100% - 820px);
        }
        #signature-events .signature-event {
          flex: 0 0 820px;
          width: 820px;
          max-width: 820px;
          min-width: 0;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          #signature-events .signature-events-rail {
            gap: 0;
            touch-action: pan-y;
            padding-right: 0;
          }
          #signature-events .signature-event {
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
            scroll-snap-stop: always;
          }
        }
        #signature-events .signature-event-layout {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 0.85rem;
          min-width: 0;
        }
        @media (min-width: 1024px) {
          #signature-events .signature-event-layout--beside {
            flex-direction: row;
            align-items: flex-start;
            gap: 1.25rem;
            width: auto;
            max-width: 100%;
          }
          #signature-events .signature-event-layout--beside .signature-event-copy {
            flex: 0 1 22rem;
            max-width: 22rem;
          }
          #signature-events .signature-event-layout--beside .signature-event-media-col {
            flex: 0 0 auto;
          }
          #signature-events .signature-event-layout--stack {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.85rem;
            width: auto;
            max-width: 100%;
          }
        }
        @media (max-width: 768px) {
          #signature-events .signature-event-layout {
            align-items: stretch;
            gap: 1.25rem;
          }
          #signature-events .signature-event-copy,
          #signature-events .signature-event-media-col {
            width: 100%;
            max-width: 100%;
          }
        }
        #signature-events .signature-event-copy {
          min-width: 0;
        }
        #signature-events .signature-event-kicker {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.32);
          margin: 0 0 0.7rem;
        }
        #signature-events .signature-event-year {
          color: #4a8fd4;
        }
        #signature-events .signature-event-copy h3 {
          margin: 0;
          max-width: 16ch;
          font-size: clamp(1.35rem, 2.6vw, 1.85rem);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #f5f5f5;
        }
        #signature-events .signature-event-meta {
          margin-top: 0.7rem;
        }
        #signature-events .signature-event-category {
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #888;
          margin: 0;
        }
        #signature-events .signature-event-guest {
          margin: 0.35rem 0 0;
          font-size: 0.9rem;
          color: #ccc;
        }
        #signature-events .signature-event-subtitle {
          margin: 0.2rem 0 0;
          font-size: 0.85rem;
          color: #888;
        }
        #signature-events .signature-event-desc {
          margin: 0.85rem 0 0;
          max-width: 28rem;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #999;
        }
        #signature-events .signature-event-media-col {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        #signature-events .signature-event-controls {
          display: inline-flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: flex-start;
          width: max-content;
          max-width: 100%;
          gap: 0.55rem;
          margin: 1.25rem 0 0;
        }
        #signature-events .signature-event-control {
          background: none;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          padding: 0;
          font-size: 15px;
          letter-spacing: 0;
          line-height: 1;
          color: rgba(232, 232, 232, 0.55);
          cursor: pointer;
        }
        @media (max-width: 768px) {
          #signature-events .signature-event-control {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            min-height: 40px;
          }
          #signature-events .signature-event-control span {
            font-size: 15px;
            line-height: 1;
          }
        }
        #signature-events .signature-event-control:hover:not(:disabled) {
          color: #ffffff;
        }
        #signature-events .signature-event-control:focus-visible {
          outline: 2px solid #4a8fd4;
          outline-offset: 2px;
        }
        #signature-events .signature-event-control:disabled {
          color: rgba(232, 232, 232, 0.16);
          cursor: not-allowed;
        }
        #signature-events .signature-media {
          min-width: 0;
          height: auto;
          max-height: none;
          overflow: visible;
          background: none;
          border: 0;
          box-shadow: none;
        }
        #signature-events .signature-media--portrait {
          width: 13.25rem;
          max-width: 100%;
        }
        #signature-events .signature-media--landscape {
          width: 24rem;
          max-width: 100%;
        }
        @media (max-width: 768px) {
          #signature-events .signature-media--portrait,
          #signature-events .signature-media--landscape {
            width: 100%;
            max-width: 100%;
          }
        }
        #signature-events .signature-media-frame {
          position: relative;
          margin: 0;
          overflow: visible;
          min-width: 0;
          width: 100%;
          height: auto;
          background: none;
          border: 0;
          box-shadow: none;
        }
        #signature-events .signature-media-frame img,
        #signature-events .signature-media-solo-video {
          display: block;
          width: 100%;
          height: auto;
          position: static;
          object-fit: contain;
          object-position: center;
          background: none;
          border: 0;
          box-shadow: none;
        }
        #signature-events .signature-media-solo-video {
          aspect-ratio: 9 / 16;
        }
      `}</style>
      <header className="signature-events-masthead">
        <span className="section-eyebrow">Archivo</span>
        <h2 id="signature-events-heading" className="section-title">
          Experiencias HUMI
        </h2>
        <div className="section-sub">Una década de experiencias compartidas.</div>
      </header>

      <div
        ref={railRef}
        tabIndex={0}
        onKeyDown={onRailKeyDown}
        className="signature-events-rail snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4a8fd4] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-roledescription="archivo"
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
      </div>

      <div className="signature-event-controls" aria-label="Navegación del archivo">
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={atStart}
          aria-label={
            previousTitle
              ? `Anterior: ${previousTitle}`
              : "Anterior, inicio del archivo"
          }
          className="signature-event-control signature-event-control--prev"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={atEnd}
          aria-label={
            nextTitle ? `Siguiente: ${nextTitle}` : "Siguiente, fin del archivo"
          }
          className="signature-event-control signature-event-control--next"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
