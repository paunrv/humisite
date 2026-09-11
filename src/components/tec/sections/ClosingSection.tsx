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
 * Vuelve la fotografía y cierra el círculo con el hero. El servicio de
 * website sale del cuerpo principal y queda como una línea con enlace:
 * es otra venta, a otro comprador, en otro momento.
 */
export function ClosingSection() {
  return (
    <Section id={TEC_CLOSING.id}>
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-xl border border-[var(--tec-line)]">
            <Image
              src="/images/pic03.jpg"
              alt="Un instructor de HUMI ajusta la cinta de una alumna durante una ceremonia de graduación."
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Eyebrow>{TEC_CLOSING.eyebrow}</Eyebrow>
          <SectionTitle className="max-w-[16ch]">{TEC_CLOSING.title}</SectionTitle>
          <SectionBody>{TEC_CLOSING.body}</SectionBody>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={productLoginUrl()}
              className="inline-flex rounded-lg bg-[var(--tec-accent)] px-5 py-3 text-sm font-medium text-[#12090a] transition hover:brightness-110"
            >
              {TEC_CLOSING.primaryCta}
            </a>
            <a
              href={TEC_WHATSAPP_ESCUELA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg border border-[var(--tec-line-strong)] px-5 py-3 text-sm transition hover:border-[var(--tec-txt-2)]"
            >
              {TEC_CLOSING.secondaryCta}
            </a>
          </div>

          <p className="mt-10 border-t border-[var(--tec-line)] pt-6 text-sm text-[var(--tec-mut)]">
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
      </div>
    </Section>
  );
}
