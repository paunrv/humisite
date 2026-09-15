"use client";

import Image from "next/image";
import {
  TEC_CLOSING,
  TEC_WHATSAPP_ESCUELA,
  TEC_WHATSAPP_WEBSITE,
} from "@/lib/humi-tec/copy";
import { productLoginUrl } from "@/lib/humi-tec/product";
import { Eyebrow, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 11 — CIERRE
 *
 * No vuelve a explicar el producto: responde «¿y ahora qué?». La 10 ya hizo
 * elegir; aquí solo se empieza, así que hay UNA acción dominante y todo lo
 * demás baja de rango.
 *
 * El texto va primero en el DOM y en la columna izquierda: la versión
 * anterior abría con la fotografía en los dos viewports —medido: FOTO →
 * eyebrow → H2— y el cierre arrancaba con una imagen en vez de con la frase
 * que lo cierra.
 *
 * La fotografía se conserva porque rima con el hero y da fin de página, pero
 * deja de dominar: pasa de 525px a un retrato contenido en desktop y a un
 * recorte apaisado en móvil, donde a ancho completo costaba 438px.
 *
 * «Entrar al sistema» es para quien ya tiene cuenta, no para quien acaba de
 * decidir: por eso deja de ser el botón de acento y queda como enlace.
 */
export function ClosingSection() {
  return (
    <Section id={TEC_CLOSING.id}>
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal>
          <Eyebrow>{TEC_CLOSING.eyebrow}</Eyebrow>
          <SectionTitle className="max-w-[18ch]">
            {TEC_CLOSING.title}
          </SectionTitle>
          <SectionBody className="max-w-[54ch]">{TEC_CLOSING.body}</SectionBody>

          {/* Último paso de la página: un solo botón lleva el peso. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={TEC_WHATSAPP_ESCUELA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-[var(--tec-accent)] px-6 py-4 text-base font-medium text-[#12090a] transition hover:brightness-110"
            >
              {TEC_CLOSING.primaryCta} →
            </a>
            <a
              href={productLoginUrl()}
              className="text-sm text-[var(--tec-mut)] underline decoration-[var(--tec-line-strong)] underline-offset-4 transition hover:text-[var(--tec-txt)]"
            >
              {TEC_CLOSING.secondaryCta}
            </a>
          </div>

          <p className="mt-8 border-t border-[var(--tec-line)] pt-5 text-sm text-[var(--tec-mut)]">
            {TEC_CLOSING.websiteLine}{" "}
            <a
              href={TEC_WHATSAPP_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--tec-txt)] underline decoration-[var(--tec-line-strong)] underline-offset-4 transition hover:decoration-[var(--tec-accent)]"
            >
              {TEC_CLOSING.websiteCta} →
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-[var(--tec-line)] sm:aspect-[4/5] lg:ml-auto lg:max-w-[300px]">
            <Image
              src="/images/pic03.jpg"
              alt="Un instructor de HUMI ajusta la cinta de una alumna durante una ceremonia de graduación."
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 300px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
