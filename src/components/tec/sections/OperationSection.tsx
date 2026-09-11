"use client";

import { TEC_OPERATION } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

const MOMENT_CAPTURES = [TEC_CAPTURES.asistencia, TEC_CAPTURES.cobranza] as const;

/**
 * 04 — OPERACIÓN
 *
 * Dos momentos, no cuatro módulos. Recortes enfocados alternando lado en
 * desktop; en móvil siempre texto primero y recorte después — un recorte sin
 * su frase no significa nada a 390px.
 *
 * Agenda, grupos, tienda y eventos se comunican por inventario (ver `aside`):
 * el presupuesto de capturas es cerrado y no se amplía por comodidad.
 */
export function OperationSection() {
  return (
    <Section id={TEC_OPERATION.id}>
      <Reveal>
        <Eyebrow>{TEC_OPERATION.eyebrow}</Eyebrow>
        <SectionTitle className="max-w-[24ch]">{TEC_OPERATION.title}</SectionTitle>
        <SectionBody>{TEC_OPERATION.body}</SectionBody>
      </Reveal>

      <div className="mt-16 grid gap-16 sm:mt-20 sm:gap-24">
        {TEC_OPERATION.moments.map((moment, index) => {
          const capture = MOMENT_CAPTURES[index];
          const flipped = index % 2 === 1;

          return (
            <Reveal key={moment.id} delay={0.06}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className={flipped ? "lg:order-2" : undefined}>
                  <CaptureSlot
                    capture={capture}
                    sizes="(min-width: 1024px) 540px, 100vw"
                    ratio={undefined}
                    caption={`${capture.screen} · ${capture.productRoute}`}
                  />
                </div>

                <div className={flipped ? "lg:order-1" : undefined}>
                  <h3 className="max-w-[22ch] font-[family-name:var(--font-tec-display)] text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
                    {moment.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-[var(--tec-txt-2)]">
                    {moment.body}
                  </p>

                  <div className="mt-6 border-t border-[var(--tec-line)] pt-4">
                    <p className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.16em] text-[var(--tec-txt)] uppercase">
                      {moment.detailLabel}
                    </p>
                    <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-[var(--tec-mut)]">
                      {moment.detailNote}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-16 max-w-[54ch] border-t border-[var(--tec-line)] pt-6 text-sm leading-relaxed text-[var(--tec-mut)]">
          {TEC_OPERATION.aside}
        </p>
        <p className="mt-2">
          <Meta>Agenda · Grupos · Tienda · Eventos</Meta>
        </p>
      </Reveal>
    </Section>
  );
}
