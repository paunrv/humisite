"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { TEC_CORRECTIONS } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 06 — CORRECCIONES
 *
 * Único momento de motion protagonista de la página: ABIERTA → HECHA.
 * Se reproduce una sola vez, dura ~1.6s y no se repite al volver a subir.
 *
 * Honestidad visual: el conector y la píldora de estado son elementos DEL
 * LANDING, no de la interfaz — el producto no dibuja ninguna línea entre el
 * portal y la oficina. Por eso viven fuera de los marcos de captura, en la
 * tipografía de la página, y usan los dos estados reales del producto
 * (`open` en ámbar, resuelta en verde). No hay un tercer estado.
 */

const sent: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { delay: 0.15, duration: 0.24, ease: EASE } },
};

const connectorX: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { delay: 0.5, duration: 0.4, ease: EASE } },
};

const connectorY: Variants = {
  hidden: { scaleY: 0 },
  shown: { scaleY: 1, transition: { delay: 0.5, duration: 0.4, ease: EASE } },
};

const stateOut: Variants = {
  hidden: { opacity: 1 },
  shown: { opacity: 0, transition: { delay: 1.0, duration: 0.3, ease: EASE } },
};

const stateIn: Variants = {
  hidden: { opacity: 0, y: 4 },
  shown: { opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.3, ease: EASE } },
};

export function CorrectionsSection() {
  const reduceMotion = useReducedMotion();

  // Con reduced motion se renderiza el estado final: la historia se entiende
  // igual leyendo las dos tarjetas, sin ninguna transición.
  const stage = reduceMotion
    ? { initial: "shown" as const }
    : {
        initial: "hidden" as const,
        whileInView: "shown" as const,
        viewport: { once: true, amount: 0.6 },
      };

  return (
    <Section id={TEC_CORRECTIONS.id}>
      <Reveal className="max-w-[46ch]">
        <Eyebrow>{TEC_CORRECTIONS.eyebrow}</Eyebrow>
        <SectionTitle>{TEC_CORRECTIONS.title}</SectionTitle>
        <SectionBody>{TEC_CORRECTIONS.body}</SectionBody>
      </Reveal>

      <motion.div
        {...stage}
        className="mt-16 grid items-center gap-8 sm:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-0"
      >
        {/* Familia */}
        <div className="lg:pr-12">
          <Meta className="block">{TEC_CORRECTIONS.family.label}</Meta>
          <CaptureSlot
            capture={TEC_CAPTURES.correccionFamilia}
            sizes="(min-width: 1024px) 440px, 100vw"
            className="mt-3 max-w-[440px]"
          />
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-[var(--tec-mut)]">
            {TEC_CORRECTIONS.family.caption}
          </p>
          <motion.p
            variants={sent}
            className="mt-3 flex items-center gap-2 font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.08em] text-[var(--tec-txt-2)]"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--tec-accent)]"
            />
            Solicitud enviada a la escuela
          </motion.p>
        </div>

        {/* Conector — grafismo del landing, no del producto */}
        <div
          aria-hidden
          className="flex items-center justify-center lg:h-full lg:px-2"
        >
          <motion.span
            variants={connectorX}
            style={{ transformOrigin: "left center" }}
            className="hidden h-px w-16 bg-[var(--tec-accent)]/30 lg:block"
          />
          <motion.span
            variants={connectorY}
            style={{ transformOrigin: "center top" }}
            className="block h-10 w-px bg-[var(--tec-accent)]/30 lg:hidden"
          />
        </div>

        {/* Academia */}
        <div className="lg:pl-12">
          <Meta className="block">{TEC_CORRECTIONS.academy.label}</Meta>
          <CaptureSlot
            capture={TEC_CAPTURES.correccionOficina}
            sizes="(min-width: 1024px) 440px, 100vw"
            className="mt-3 max-w-[440px]"
          />
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-[var(--tec-mut)]">
            {TEC_CORRECTIONS.academy.caption}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <Meta>Estado</Meta>
            <span className="relative inline-grid">
              <motion.span
                variants={stateOut}
                className="col-start-1 row-start-1 rounded-full border border-[var(--tec-warn)]/40 bg-[var(--tec-warn)]/10 px-2.5 py-0.5 font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.12em] text-[var(--tec-warn)]"
              >
                {TEC_CORRECTIONS.stateOpen}
              </motion.span>
              <motion.span
                variants={stateIn}
                className="col-start-1 row-start-1 rounded-full border border-[var(--tec-ok)]/40 bg-[var(--tec-ok)]/10 px-2.5 py-0.5 font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.12em] text-[var(--tec-ok)]"
              >
                {TEC_CORRECTIONS.stateDone}
              </motion.span>
            </span>
          </div>
        </div>
      </motion.div>

      <Reveal delay={0.1}>
        <p className="mt-14 max-w-[52ch] border-t border-[var(--tec-line)] pt-6 text-sm leading-relaxed text-[var(--tec-mut)]">
          {TEC_CORRECTIONS.footnote}
        </p>
      </Reveal>
    </Section>
  );
}
