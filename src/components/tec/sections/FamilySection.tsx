"use client";

import { TEC_FAMILY } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 05 — FAMILIA
 *
 * La única sección que mejora en móvil: la captura queda casi a escala 1:1
 * con el teléfono del lector, que es exactamente el formato en el que una
 * familia usa el portal.
 *
 * Composición vertical y con aire, deliberadamente distinta de la densidad
 * de la sección 04. Sin mockup de dispositivo.
 */
export function FamilySection() {
  return (
    <Section id={TEC_FAMILY.id} surface>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>{TEC_FAMILY.eyebrow}</Eyebrow>
            <SectionTitle className="max-w-[20ch]">{TEC_FAMILY.title}</SectionTitle>
            <SectionBody>{TEC_FAMILY.body}</SectionBody>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-x-10">
              {TEC_FAMILY.questions.map((item) => (
                <div key={item.q}>
                  <dt className="font-[family-name:var(--font-tec-display)] text-lg font-medium">
                    {item.q}
                  </dt>
                  <dd className="mt-1 max-w-[34ch] text-sm leading-relaxed text-[var(--tec-mut)]">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.16} className="justify-self-center">
          <div className="w-[min(86vw,300px)]">
            <CaptureSlot
              capture={TEC_CAPTURES.portalAlumno}
              sizes="(min-width: 1024px) 300px, 86vw"
            />
            <div className="mt-5 border-t border-[var(--tec-line)] pt-4">
              <p className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.2em] text-[var(--tec-warn)] uppercase">
                {TEC_FAMILY.detailLabel}
              </p>
              <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-[var(--tec-mut)]">
                {TEC_FAMILY.detailNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
