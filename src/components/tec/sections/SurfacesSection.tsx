"use client";

import { TEC_SURFACES } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import type { Capture } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 03 — DOS SUPERFICIES
 *
 * Sección de posicionamiento, no catálogo. El argumento es que hay UNA cuenta
 * que se bifurca, así que la cuenta es el origen visual y de ella baja una
 * sola relación dibujada:
 *
 *      [ misma cuenta ]          ← origen, centrado en desktop
 *             │                  ← tallo
 *       ┌─────┴─────┐            ← horquilla (solo desktop)
 *   Academia     Familia
 *
 * En móvil la horquilla no existe: el mismo tallo encadena origen → Academia
 * → Familia en vertical, así que la procedencia común sobrevive la rotación
 * sin necesidad de dos columnas comprimidas.
 *
 * El contraste de formato se mantiene —Academia apaisada, Familia vertical—
 * porque es lo que demuestra que la familia no recibe un admin recortado.
 */
export function SurfacesSection() {
  return (
    <Section id={TEC_SURFACES.id} surface>
      <Reveal>
        <Eyebrow>{TEC_SURFACES.eyebrow}</Eyebrow>
        <SectionTitle className="max-w-[20ch]">{TEC_SURFACES.title}</SectionTitle>
        <SectionBody>{TEC_SURFACES.body}</SectionBody>
      </Reveal>

      {/* Origen: la cuenta. Es el centro de la sección, no un epígrafe. */}
      <Reveal delay={0.08}>
        <figure className="m-0 mt-12 rounded-xl border border-[var(--tec-line-strong)] bg-[var(--tec-bg)]/50 px-6 py-6 lg:mx-auto lg:max-w-[54ch] lg:text-center">
          <blockquote className="font-[family-name:var(--font-tec-display)] text-lg leading-snug font-medium text-balance text-[var(--tec-txt)] sm:text-xl">
            «{TEC_SURFACES.quote}»
          </blockquote>
          <figcaption className="mt-3">
            <Meta>{TEC_SURFACES.quoteSource}</Meta>
          </figcaption>
        </figure>
      </Reveal>

      {/*
        Tallo + reparto. Una sola relación dibujada en toda la sección: la
        cuenta baja por el tallo hasta una regla de la que cuelgan las dos
        columnas. Se prefiere a una horquilla en T porque no depende de que
        los brazos coincidan con el centro de cada columna.
      */}
      <div aria-hidden className="hidden lg:block">
        <span className="mx-auto block h-12 w-px bg-[var(--tec-line-strong)]" />
        <span className="block h-px w-full bg-[var(--tec-line-strong)]" />
      </div>

      <div className="grid items-start gap-0 lg:grid-cols-2 lg:gap-12 lg:pt-10">
        {/* Academia */}
        <Stem />
        <Reveal>
          <Plane
            label={TEC_SURFACES.academy.label}
            lead={TEC_SURFACES.academy.lead}
            count={`${TEC_SURFACES.academy.modules.length} módulos`}
            capture={TEC_CAPTURES.direccionKpis}
            sizes="(min-width: 1024px) 520px, 100vw"
            note={TEC_SURFACES.academy.note}
          />
        </Reveal>

        {/* Familia */}
        <Stem />
        <Reveal delay={0.1}>
          <Plane
            label={TEC_SURFACES.family.label}
            lead={TEC_SURFACES.family.lead}
            count={`${TEC_SURFACES.family.modules.length} pantallas`}
            capture={TEC_CAPTURES.portalAlumno}
            sizes="(min-width: 1024px) 240px, 60vw"
            captureClassName="max-w-[200px] sm:max-w-[240px]"
            note={TEC_SURFACES.family.note}
          />
        </Reveal>
      </div>
    </Section>
  );
}

/** Tramo de tallo en móvil: encadena origen → Academia → Familia. */
function Stem() {
  return (
    <span
      aria-hidden
      className="my-7 block h-10 w-px bg-[var(--tec-line-strong)] lg:hidden"
    />
  );
}

function Plane({
  label,
  lead,
  count,
  capture,
  sizes,
  captureClassName,
  note,
}: {
  label: string;
  lead: string;
  count: string;
  capture: Capture;
  sizes: string;
  captureClassName?: string;
  note: string;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <h3 className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.24em] text-[var(--tec-txt)] uppercase">
          {label}
        </h3>
        <Meta>{count}</Meta>
      </div>

      <p className="mt-2 max-w-[24ch] font-[family-name:var(--font-tec-display)] text-2xl leading-snug font-semibold tracking-tight">
        {lead}
      </p>

      <CaptureSlot
        capture={capture}
        sizes={sizes}
        className={`mt-6 ${captureClassName ?? ""}`}
      />

      <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-[var(--tec-mut)]">
        {note}
      </p>
    </div>
  );
}
