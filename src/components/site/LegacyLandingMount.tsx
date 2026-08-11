"use client";

import { SignatureEventsSection } from "@/components/signature-events/SignatureEventsSection";
import type { LegacyLandingPayload, LegacyScript } from "@/lib/legacy-landing";
import { useEffect, useRef } from "react";

type LegacyLandingMountProps = {
  legacy: LegacyLandingPayload;
  introActive: boolean;
};

function runScripts(scripts: LegacyScript[], target: HTMLElement) {
  scripts.forEach((script) => {
    const el = document.createElement("script");
    if (script.src) {
      el.src = script.src;
      el.async = false;
    } else if (script.content) {
      el.textContent = script.content;
    } else {
      return;
    }
    target.appendChild(el);
  });
}

/**
 * Renders the legacy landing markup (SSR + hydrate) and re-executes
 * extracted <script> tags once after mount. Signature Events mounts
 * directly in the React tree between the split legacy body halves.
 */
export function LegacyLandingMount({ legacy, introActive }: LegacyLandingMountProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scriptsRan = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || scriptsRan.current) return;
    scriptsRan.current = true;

    // Defer so #blogBgGrid and other nodes are connected before inline scripts run.
    requestAnimationFrame(() => {
      runScripts(legacy.scripts, root);
      requestAnimationFrame(() => {
        root.dispatchEvent(new CustomEvent("legacy-landing:ready", { bubbles: true }));
      });
    });
  }, [legacy.scripts]);

  return (
    <div
      ref={rootRef}
      className={`legacy-landing-root min-h-screen transition-opacity duration-700 ${
        introActive ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {legacy.headHtml ? (
        <div
          className="legacy-landing-head"
          // Head assets (stylesheet links + critical CSS) injected once.
          dangerouslySetInnerHTML={{ __html: legacy.headHtml }}
        />
      ) : null}
      <div
        className="legacy-landing-body"
        dangerouslySetInnerHTML={{ __html: legacy.bodyHtmlBefore }}
      />
      <SignatureEventsSection />
      {legacy.bodyHtmlAfter ? (
        <div
          className="legacy-landing-body"
          dangerouslySetInnerHTML={{ __html: legacy.bodyHtmlAfter }}
        />
      ) : null}
    </div>
  );
}
