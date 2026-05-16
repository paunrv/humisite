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

    async function mount() {
      const mountRoot = rootRef.current;
      if (!mountRoot) return;

      try {
        const response = await fetch("/legacy-landing.html", { cache: "no-store" });
        if (!response.ok) throw new Error("legacy html missing");
        const html = await response.text();
        if (cancelled) return;

        const doc = new DOMParser().parseFromString(html, "text/html");

        doc.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
          mountRoot.appendChild(node.cloneNode(true));
        });

        const body = doc.body;
        if (body) {
          Array.from(body.childNodes).forEach((node) => {
            mountRoot.appendChild(node.cloneNode(true));
          });
        }

        doc.querySelectorAll("script").forEach((script) => {
          const el = document.createElement("script");
          if (script.src) {
            el.src = script.src;
            el.async = false;
          } else {
            el.textContent = script.textContent;
          }
          mountRoot.appendChild(el);
        });

        setStatus("ready");
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
