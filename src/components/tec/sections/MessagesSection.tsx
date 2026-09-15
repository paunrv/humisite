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
 * Extensión de la 06. Allí alguien pide algo y la academia lo resuelve; aquí
 * la academia necesita decir algo y sabe a quién, sin perseguir a nadie.
 *
 * El eje NO es «cómo se manda un mensaje» —eso era un tutorial, y además
 * armar el texto no es el valor: eso lo hace cualquiera—. El eje es a quién
 * le toca, que es lo único que WhatsApp no puede saber por sí solo.
 *
 * Tres pares fricción → respuesta, no tres pasos numerados: los pasos
 * enseñaban a operar la pantalla y su nota era un catálogo de plantillas.
 *
 * Límite que esta sección no cruza: el producto abre wa.me con el mensaje ya
 * escrito, una conversación a la vez. No hay WhatsApp Business API, no hay
 * chat interno, no hay envíos automáticos ni masivos, y la selección del
 * destinatario la hace una persona buscando — el sistema no la deduce sola.
 */
export function MessagesSection() {
  return (
    <Section id={TEC_MESSAGES.id} band surface>
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>{TEC_MESSAGES.eyebrow}</Eyebrow>
            <SectionTitle className="max-w-[20ch]">
              {TEC_MESSAGES.title}
            </SectionTitle>
            <SectionBody>{TEC_MESSAGES.body}</SectionBody>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-6 border-t border-[var(--tec-line)] sm:mt-7">
              {TEC_MESSAGES.pairs.map((pair) => (
                <div
                  key={pair.q}
                  className="flex items-baseline gap-x-5 border-b border-[var(--tec-line)] py-3 sm:py-3.5"
                >
                  <dt className="w-[8.5rem] shrink-0 font-[family-name:var(--font-tec-display)] text-base font-medium sm:w-[11rem]">
                    {pair.q}
                  </dt>
                  <dd className="max-w-[46ch] min-w-0 flex-1 text-sm leading-relaxed text-[var(--tec-mut)]">
                    {pair.a}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5">
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
