"use client";

import { TEC_OPERATION } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

const MOMENT_CAPTURES = [TEC_CAPTURES.asistencia, TEC_CAPTURES.cobranza] as const;

/**
 * 04 — OPERACIÓN
 *
 * Una secuencia, no dos módulos equivalentes. El eje es el tiempo:
 *
 *   DURANTE EL DÍA ─────────────   → Asistencia   (el momento central)
 *   AL CIERRE DEL MES ──────────   → Cobranza     (la consecuencia)
 *
 * Cada fase abre con una regla rotulada que cruza la página. Es la relación
 * entre los dos momentos dibujada una sola vez, sin animación propia y con
 * coste de altura casi nulo: una etiqueta y 1px.
 *
 * El orden del DOM es SIEMPRE texto → captura, así que móvil hereda el orden
 * correcto sin utilidades de reordenado. La versión anterior documentaba esa
 * regla pero no la cumplía: `lg:order-*` no actúa por debajo de 1024px, y a
 * 390px la captura abría cada momento antes que su frase.
 *
 * La jerarquía entre los dos es explícita, no implícita: Asistencia lleva el
 * titular mayor y la columna de captura más ancha; Cobranza cierra con
 * titular menor y captura estrecha, para que se lea como consecuencia.
 */
export function OperationSection() {
  return (
    <Section id={TEC_OPERATION.id}>
      {/* Encabezado compacto: titular y entradilla comparten línea en desktop. */}
      <Reveal>
        <Eyebrow>{TEC_OPERATION.eyebrow}</Eyebrow>
        <div className="grid gap-x-14 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <SectionTitle className="max-w-[22ch]">
            {TEC_OPERATION.title}
          </SectionTitle>
          <SectionBody className="max-w-[46ch] lg:pb-1">
            {TEC_OPERATION.body}
          </SectionBody>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-12 sm:mt-14 sm:gap-16">
        {TEC_OPERATION.moments.map((moment, index) => {
          const capture = MOMENT_CAPTURES[index];
          /* El primer momento es el centro de la operación diaria. */
          const lead = index === 0;

          return (
            <Reveal key={moment.id} delay={0.06}>
              <Phase label={moment.when} />

              <div
                className={`mt-5 grid items-start gap-6 sm:mt-7 sm:gap-8 lg:gap-12 ${
                  lead
                    ? "lg:grid-cols-[1fr_1.15fr]"
                    : "lg:grid-cols-[1fr_0.62fr]"
                }`}
              >
                <div>
                  <h3
                    className={`max-w-[22ch] font-[family-name:var(--font-tec-display)] leading-tight font-semibold tracking-tight text-balance ${
                      lead ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                    }`}
                  >
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

                <CaptureSlot
                  capture={capture}
                  sizes={
                    lead
                      ? "(min-width: 1024px) 560px, 100vw"
                      : "(min-width: 1024px) 400px, 100vw"
                  }
                  caption={`${capture.screen} · ${capture.productRoute}`}
                />
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-[54ch] border-t border-[var(--tec-line)] pt-6 text-sm leading-relaxed text-[var(--tec-mut)] sm:mt-12">
          {TEC_OPERATION.aside}
        </p>
      </Reveal>
    </Section>
  );
}

/**
 * Regla rotulada que abre una fase. Marca el paso del tiempo y ata los dos
 * momentos en una sola lectura vertical; se comporta igual en móvil, así que
 * la secuencia sobrevive la rotación sin duplicar marcado.
 */
function Phase({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <p className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.2em] whitespace-nowrap text-[var(--tec-accent)] uppercase">
        {label}
      </p>
      <span
        aria-hidden
        className="h-px flex-1 bg-[var(--tec-line-strong)]"
      />
    </div>
  );
}
