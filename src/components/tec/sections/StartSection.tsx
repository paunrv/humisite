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
 *
 * La secuencia cambia de forma, no de contenido, según el ancho:
 *
 * - lg+: cinco columnas separadas por una regla vertical, cada paso apilando
 *   número → nombre → descripción. Es la lectura de «una sola pasada».
 * - por debajo: cada paso es una fila con número y nombre a la izquierda y la
 *   descripción a su lado, no debajo. Apilar los tres datos convertía los
 *   cinco pasos en 595px de pared vertical y empujaba el CTA fuera de
 *   pantalla durante todo el recorrido de la lista.
 *
 * Ningún paso pierde información en ninguno de los dos formatos.
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
        <ol className="mt-8 grid gap-0 sm:mt-10 lg:grid-cols-5 lg:gap-4">
          {TEC_START.steps.map((step) => (
            <li
              key={step.n}
              className="flex items-baseline gap-x-5 border-t border-[var(--tec-line)] py-3 lg:flex-col lg:gap-x-0 lg:border-t-0 lg:border-l lg:py-0 lg:pl-4"
            >
              <span className="flex w-[8.5rem] shrink-0 items-baseline gap-2.5 lg:block lg:w-auto">
                <span className="font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.16em] text-[var(--tec-dim)]">
                  {step.n}
                </span>
                <span className="block font-[family-name:var(--font-tec-display)] text-base font-semibold lg:mt-1.5">
                  {step.label}
                </span>
              </span>
              <span className="block min-w-0 flex-1 text-sm leading-relaxed text-[var(--tec-mut)] lg:mt-1 lg:flex-none">
                {step.note}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.12}>
        {/*
          Último paso antes de Planes: lleva relleno de acento en vez del
          borde neutro del resto de CTA secundarios. Mismo tamaño, más peso.
        */}
        <a
          href={`#${TEC_PLANS_COPY.id}`}
          className="mt-6 inline-flex rounded-lg bg-[var(--tec-accent)] px-5 py-3 text-sm font-medium text-[#12090a] transition hover:brightness-110 lg:mt-8"
        >
          {TEC_START.ctaLabel} →
        </a>
      </Reveal>
    </Section>
  );
}
