"use client";

import { TEC_MESSAGES } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 07 — MENSAJES
 *
 * Banda corta: viene después del momento fuerte y tiene que bajar el pulso.
 *
 * El producto abre wa.me con el mensaje ya escrito, una conversación a la
 * vez. No hay WhatsApp Business API, no hay chat interno, no hay envíos
 * automáticos ni masivos — y esta sección no puede insinuar lo contrario.
 */
export function MessagesSection() {
  return (
    <Section id={TEC_MESSAGES.id} band surface>
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>{TEC_MESSAGES.eyebrow}</Eyebrow>
            <SectionTitle className="max-w-[16ch]">{TEC_MESSAGES.title}</SectionTitle>
            <SectionBody>{TEC_MESSAGES.body}</SectionBody>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {TEC_MESSAGES.steps.map((step) => (
                <li key={step.n} className="border-t border-[var(--tec-line-strong)] pt-3">
                  <Meta className="block">{step.n}</Meta>
                  <p className="mt-1.5 font-[family-name:var(--font-tec-display)] text-base font-medium">
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--tec-mut)]">
                    {step.note}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6">
              <Meta>{TEC_MESSAGES.note}</Meta>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <CaptureSlot
            capture={TEC_CAPTURES.mensajes}
            sizes="(min-width: 1024px) 420px, 100vw"
            caption="Mensajes · humi-sistema /admin/mensajes"
          />
        </Reveal>
      </div>
    </Section>
  );
}
