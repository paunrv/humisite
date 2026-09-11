"use client";

import { TEC_SURFACES } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 03 — DOS SUPERFICIES
 *
 * El argumento es el contraste de formato: ancho y denso frente a vertical
 * y con aire. Por eso los dos planos NO tienen el mismo tamaño ni la misma
 * proporción, y la familia no se presenta como un admin recortado.
 *
 * El eje (academia → HUMI → familia) es horizontal en desktop y rota a
 * vertical en móvil; la relación sobrevive la rotación.
 */
export function SurfacesSection() {
  return (
    <Section id={TEC_SURFACES.id} surface>
      <Reveal>
        <Eyebrow>{TEC_SURFACES.eyebrow}</Eyebrow>
        <SectionTitle className="max-w-[20ch]">{TEC_SURFACES.title}</SectionTitle>
        <SectionBody>{TEC_SURFACES.body}</SectionBody>
      </Reveal>

      <Reveal delay={0.08}>
        <figure className="mt-8 m-0 border-l border-[var(--tec-accent)] pl-4">
          <blockquote className="max-w-[46ch] font-[family-name:var(--font-tec-display)] text-lg leading-snug font-medium text-[var(--tec-txt)]">
            «{TEC_SURFACES.quote}»
          </blockquote>
          <figcaption className="mt-2">
            <Meta>{TEC_SURFACES.quoteSource}</Meta>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.15fr_auto_0.85fr] lg:gap-0">
        {/* Academia */}
        <Reveal className="lg:pr-12">
          <Plane label={TEC_SURFACES.academy.label} lead={TEC_SURFACES.academy.lead} />
          <CaptureSlot
            capture={TEC_CAPTURES.direccionKpis}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="mt-5"
          />
          <ModuleList modules={TEC_SURFACES.academy.modules} />
          <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-[var(--tec-mut)]">
            {TEC_SURFACES.academy.note}
          </p>
        </Reveal>

        {/* Eje */}
        <div
          aria-hidden
          className="flex items-center justify-center gap-3 lg:h-full lg:flex-col lg:px-2"
        >
          <span className="h-px w-full bg-[var(--tec-line-strong)] lg:h-full lg:w-px" />
          <span className="font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.28em] text-[var(--tec-accent)] uppercase lg:[writing-mode:vertical-rl]">
            HUMI
          </span>
          <span className="h-px w-full bg-[var(--tec-line-strong)] lg:h-full lg:w-px" />
        </div>

        {/* Familia */}
        <Reveal delay={0.12} className="lg:pl-12">
          <Plane label={TEC_SURFACES.family.label} lead={TEC_SURFACES.family.lead} />
          <CaptureSlot
            capture={TEC_CAPTURES.portalAlumno}
            sizes="(min-width: 1024px) 260px, 70vw"
            className="mt-5 max-w-[260px]"
          />
          <ModuleList modules={TEC_SURFACES.family.modules} />
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-[var(--tec-mut)]">
            {TEC_SURFACES.family.note}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

function Plane({ label, lead }: { label: string; lead: string }) {
  return (
    <>
      <h3 className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.24em] text-[var(--tec-txt)] uppercase">
        {label}
      </h3>
      <p className="mt-2 max-w-[38ch] font-[family-name:var(--font-tec-display)] text-xl leading-snug font-medium">
        {lead}
      </p>
    </>
  );
}

function ModuleList({ modules }: { modules: readonly string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
      {modules.map((module) => (
        <li key={module}>
          <span className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.06em] text-[var(--tec-txt-2)]">
            {module}
          </span>
        </li>
      ))}
    </ul>
  );
}
