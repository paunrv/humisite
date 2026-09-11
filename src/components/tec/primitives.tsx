"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Entrada estándar de la landing: fade + 16px de subida, una sola vez.
 * Con prefers-reduced-motion el contenido se renderiza en su estado final.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.24em] text-[var(--tec-accent)] uppercase">
      {children}
    </p>
  );
}

/** Etiqueta técnica en mono: rutas, viewports, estados, pies de captura. */
export function Meta({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.1em] text-[var(--tec-dim)] ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-3 font-[family-name:var(--font-tec-display)] text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.12] font-semibold tracking-tight text-balance whitespace-pre-line ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-4 max-w-[62ch] text-base leading-relaxed text-[var(--tec-txt-2)] ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * Sección con el ritmo vertical del blueprint.
 * `band` usa el 60% del padding: bandas cortas (Mensajes, Empezar).
 */
export function Section({
  id,
  children,
  band = false,
  bordered = true,
  surface = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  band?: boolean;
  bordered?: boolean;
  surface?: boolean;
  className?: string;
}) {
  const pad = band
    ? "py-14 sm:py-16 lg:py-20"
    : "py-20 sm:py-28 lg:py-36";
  return (
    <section
      id={id}
      className={[
        "scroll-mt-20",
        pad,
        bordered ? "border-t border-[var(--tec-line)]" : "",
        surface ? "bg-[var(--tec-surf)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
