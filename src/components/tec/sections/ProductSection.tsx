"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TEC_PRODUCT } from "@/lib/humi-tec/copy";
import { TEC_CAPTURES } from "@/lib/humi-tec/captures";
import { CaptureSlot } from "../CaptureSlot";
import { Eyebrow, Meta, Reveal, SectionBody, SectionTitle } from "../primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 02 — PRODUCTO
 *
 * Única pantalla completa de la página. Sangra por los lados y por abajo:
 * la captura entra en la página, no flota sobre ella.
 *
 * Bajo 768px se cambia el artefacto — no se encoge. Una pantalla de admin
 * reducida a 390px deja de ser información y pasa a ser textura, así que
 * se sustituye por dos derivados legibles de la misma captura.
 */
export function ProductSection() {
  const reduceMotion = useReducedMotion();

  const rise = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20, scale: 0.975 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease: EASE },
      };

  return (
    <section
      id={TEC_PRODUCT.id}
      className="scroll-mt-20 overflow-hidden border-t border-[var(--tec-line)] pt-20 sm:pt-28 lg:pt-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{TEC_PRODUCT.eyebrow}</Eyebrow>
          <SectionTitle className="max-w-[18ch]">
            {TEC_PRODUCT.title}
          </SectionTitle>
          <SectionBody>{TEC_PRODUCT.body}</SectionBody>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {TEC_PRODUCT.marks.map((mark) => (
              <li
                key={mark}
                className="flex gap-3 text-sm text-[var(--tec-mut)]"
              >
                <span
                  aria-hidden
                  className="mt-2 h-px w-3 shrink-0 bg-[var(--tec-line-strong)]"
                />
                <span>{mark}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Desktop ≥768px: pantalla completa, sangrando. */}
      <motion.div
        {...rise}
        className="mx-auto mt-14 hidden w-[92vw] max-w-[1280px] md:block"
      >
        <CaptureSlot
          capture={TEC_CAPTURES.direccion}
          sizes="92vw"
          frameless
          className="[&>div]:rounded-t-xl [&>div]:border [&>div]:border-b-0 [&>div]:border-[var(--tec-line-strong)]"
        />
        <div className="mx-auto mt-3 max-w-6xl px-5 sm:px-8">
          <Meta>Dirección · humi-sistema /admin</Meta>
        </div>
      </motion.div>

      {/* Móvil: derivados legibles en lugar de la pantalla completa. */}
      <div className="mx-auto mt-12 max-w-6xl px-5 md:hidden">
        <div className="grid gap-4">
          <CaptureSlot
            capture={TEC_CAPTURES.direccionKpis}
            sizes="100vw"
            caption="Indicadores del mes"
          />
          <CaptureSlot
            capture={TEC_CAPTURES.direccionSemaforo}
            sizes="100vw"
            caption="Semáforo de cobranza"
          />
        </div>
        <p className="mt-4">
          <Meta>Dirección · el mes de un vistazo</Meta>
        </p>
      </div>

      <div className="h-20 sm:h-28 lg:h-36" />
    </section>
  );
}
