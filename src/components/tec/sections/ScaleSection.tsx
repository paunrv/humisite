"use client";

import Image from "next/image";
import { TEC_SCALE, TEC_WHATSAPP_ENTERPRISE } from "@/lib/humi-tec/copy";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 08 — ESCALA
 *
 * Diagrama + fotografía real de evento, sin capturas: el objetivo es
 * comunicar escala, no demostrar que /org existe. Un bracket real y
 * presentable sigue pendiente de verificación y no se fabrica uno.
 *
 * El diagrama es horizontal en desktop y rota a columna en móvil.
 */
export function ScaleSection() {
  return (
    <Section id={TEC_SCALE.id}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal className="max-w-2xl">
          <Eyebrow>{TEC_SCALE.eyebrow}</Eyebrow>
          <SectionTitle className="max-w-[22ch]">{TEC_SCALE.title}</SectionTitle>
          <SectionBody>{TEC_SCALE.body}</SectionBody>
        </Reveal>
        <p className="rounded-full border border-[var(--tec-accent)]/35 px-3 py-1.5 font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.16em] text-[var(--tec-accent)] uppercase">
          {TEC_SCALE.minSchools}
        </p>
      </div>

      <Reveal delay={0.08}>
        <ol className="mt-14 grid gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start">
          {TEC_SCALE.levels.map((level, index) => (
            <li key={level.label} className="contents">
              <div className="lg:px-0">
                <div className="flex items-center gap-3 lg:block">
                  <span
                    aria-hidden
                    className="h-2 w-2 shrink-0 rounded-full bg-[var(--tec-line-strong)]"
                  />
                  <h3 className="font-[family-name:var(--font-tec-display)] text-lg font-semibold tracking-tight lg:mt-4">
                    {level.label}
                  </h3>
                </div>
                <p className="mt-2 max-w-[34ch] pb-8 pl-5 text-sm leading-relaxed text-[var(--tec-mut)] lg:pb-0 lg:pl-0">
                  {level.note}
                </p>
              </div>
              {index < TEC_SCALE.levels.length - 1 ? (
                <span
                  aria-hidden
                  className="hidden self-start bg-[var(--tec-line-strong)] lg:mx-8 lg:mt-1 lg:block lg:h-px lg:w-12"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.12}>
        <figure className="m-0 mt-14">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--tec-line)] sm:aspect-[21/9]">
            <Image
              src="/signature-events/2023/ki-games.jpg"
              alt="Atletas y entrenadores reunidos en un evento de la comunidad HUMI."
              fill
              loading="lazy"
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-3">
            <Meta>Comunidad HUMI · archivo de experiencias</Meta>
          </figcaption>
        </figure>
      </Reveal>

      <Reveal delay={0.16}>
        <a
          href={TEC_WHATSAPP_ENTERPRISE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex rounded-lg border border-[var(--tec-line-strong)] px-5 py-3 text-sm transition hover:border-[var(--tec-accent)]/60"
        >
          {TEC_SCALE.ctaLabel} →
        </a>
      </Reveal>
    </Section>
  );
}
