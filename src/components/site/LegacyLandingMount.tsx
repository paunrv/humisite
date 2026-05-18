"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mounts the static landing HTML into the main document so scroll
 * continues naturally after the intro threshold.
 */
type LegacyLandingMountProps = {
  introActive: boolean;
};

export function LegacyLandingMount({ introActive }: LegacyLandingMountProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;

    function runScripts(scripts: HTMLScriptElement[], target: HTMLElement) {
      scripts.forEach((script) => {
        const el = document.createElement("script");
        if (script.src) {
          el.src = script.src;
          el.async = false;
        } else {
          el.textContent = script.textContent;
        }
        target.appendChild(el);
      });
    }

    async function mount() {
      const mountRoot = rootRef.current;
      if (!mountRoot) return;

      mountRoot.replaceChildren();

      try {
        const response = await fetch(`/legacy-landing.html?v=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error("legacy html missing");
        const html = await response.text();
        if (cancelled) return;

        const doc = new DOMParser().parseFromString(html, "text/html");

        doc.querySelectorAll("style, link[rel=\"stylesheet\"]").forEach((node) => {
          mountRoot.appendChild(node.cloneNode(true));
        });

        const body = doc.body;
        if (body) {
          Array.from(body.childNodes).forEach((node) => {
            if (node.nodeName === "SCRIPT") return;
            mountRoot.appendChild(node.cloneNode(true));
          });
        }

        const scripts = Array.from(doc.querySelectorAll("script"));
        if (cancelled) return;

        // Defer so #blogBgGrid and other nodes are connected before inline scripts run.
        requestAnimationFrame(() => {
          if (cancelled) return;
          runScripts(scripts, mountRoot);
          requestAnimationFrame(() => {
            if (cancelled) return;
            mountRoot.dispatchEvent(
              new CustomEvent("legacy-landing:ready", { bubbles: true }),
            );
            setStatus("ready");
          });
        });
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void mount();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "error") {
    return (
      <main className="px-6 pt-28 pb-20 text-center text-[#888]">
        <p>No se pudo cargar el sitio. Ejecuta <code className="text-[#f5f5f5]">npm run sync:legacy</code>.</p>
        <a href="/legacy-landing.html" className="mt-4 inline-block text-[#4a8fd4]">
          Abrir versión estática →
        </a>
      </main>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`legacy-landing-root min-h-screen transition-opacity duration-700 ${
        status === "loading" || introActive ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    />
  );
}
