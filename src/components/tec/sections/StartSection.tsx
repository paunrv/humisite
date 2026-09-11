"use client";

import { TEC_PLANS_COPY, TEC_START } from "@/lib/humi-tec/copy";
import { Eyebrow, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 09 — EMPEZAR
 *
 * El onboarding real de humi-sistema tiene CINCO pasos:
 * Academia · Cintas · Grupos · Horario · Revisión.
 *
 * Es el único lugar de la página donde numerar es honesto, porque el
 * onboarding sí es una secuencia. No se prometen tiempos de implementación:
 * no hay evidencia de cuánto tarda y no se inventa.
 */
export function StartSection() {
  return (
    <Section id={TEC_START.id} band>
      <Reveal>
        <Eyebrow>{TEC_START.eyebrow}</Eyebrow>
        <SectionTitle className="max-w-[20ch]">{TEC_START.title}</SectionTitle>
        <SectionBody>{TEC_START.body}</SectionBody>
      </Reveal>

      <Reveal delay={0.08}>
        <ol className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {TEC_START.steps.map((step) => (
            <li
              key={step.n}
              className="border-t border-[var(--tec-line)] pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-4"
            >
              <span className="font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.16em] text-[var(--tec-dim)]">
                {step.n}
              </span>
              <p className="mt-2 font-[family-name:var(--font-tec-display)] text-base font-semibold">
                {step.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--tec-mut)]">
                {step.note}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.12}>
        <a
          href={`#${TEC_PLANS_COPY.id}`}
          className="mt-10 inline-flex rounded-lg border border-[var(--tec-line-strong)] px-5 py-3 text-sm transition hover:border-[var(--tec-accent)]/60"
        >
          {TEC_START.ctaLabel} →
        </a>
      </Reveal>
    </Section>
  );
}
