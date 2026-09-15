"use client";

import { TEC_FAMILY } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 05 — FAMILIA
 *
 * La única sección que mejora en móvil: la captura queda casi a escala 1:1
 * con el teléfono del lector, que es exactamente el formato en el que una
 * familia usa el portal. Por eso en móvil sube inmediatamente detrás del
 * titular — es el argumento, no la ilustración — mientras que en desktop se
 * mantiene a la derecha, acompañando toda la lectura.
 *
 * El orden del DOM (titular → captura → preguntas) sirve a móvil tal cual; en
 * desktop la rejilla recoloca la captura a una columna propia de dos filas.
 *
 * Las cuatro preguntas van en filas con línea de corte, no en rejilla 2×2:
 * una tabla de dos por dos se lee como ficha técnica, y esta es la sección
 * que menos debe parecerlo.
 *
 * Athlete ID es un dato de torneo, no el cierre emocional de la sección:
 * vive bajo la captura, en el mismo tono que los pies de captura del resto
 * de la página y sin color de alerta.
 */
export function FamilySection() {
  return (
    <Section id={TEC_FAMILY.id} surface>
      <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-[1fr_auto] lg:gap-x-20 lg:gap-y-12">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <Eyebrow>{TEC_FAMILY.eyebrow}</Eyebrow>
          <SectionTitle className="max-w-[20ch]">
            {TEC_FAMILY.title}
          </SectionTitle>
          <SectionBody className="max-w-[54ch]">{TEC_FAMILY.body}</SectionBody>
        </Reveal>

        {/* Protagonista. En móvil llega antes que cualquier explicación. */}
        <Reveal
          delay={0.1}
          className="justify-self-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-self-end"
        >
          <div className="w-[min(86vw,300px)]">
            <CaptureSlot
              capture={TEC_CAPTURES.portalAlumno}
              sizes="(min-width: 1024px) 300px, 86vw"
            />
            <p className="mt-4 border-t border-[var(--tec-line)] pt-3">
              <Meta>
                {TEC_FAMILY.detailLabel} · {TEC_FAMILY.detailNote}
              </Meta>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="lg:col-start-1 lg:row-start-2">
          <dl className="border-t border-[var(--tec-line)]">
            {TEC_FAMILY.questions.map((item) => (
              <div
                key={item.q}
                className="flex items-baseline gap-x-5 border-b border-[var(--tec-line)] py-3 sm:py-4"
              >
                <dt className="w-[7.5rem] shrink-0 font-[family-name:var(--font-tec-display)] text-base font-medium sm:w-[10rem] sm:text-lg">
                  {item.q}
                </dt>
                <dd className="max-w-[44ch] min-w-0 flex-1 text-sm leading-relaxed text-[var(--tec-mut)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
