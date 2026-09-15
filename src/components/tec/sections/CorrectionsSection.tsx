"use client";

import Image from "next/image";
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
 * La sección es un puente entre DOS PERSONAS, no entre dos pantallas. Por eso
 * los rótulos nombran a quien actúa —la familia, la escuela— y el nombre de
 * la superficie baja al pie técnico de cada captura, junto a su ruta.
 *
 * La secuencia tiene que leerse sin leer el copy, así que se apoya en tres
 * señales y no en las leyendas: la numeración 01 / 02, el conector que va de
 * una a otra, y el estado como punto de llegada — centrado bajo las dos y
 * colgando de su propio tallo, porque el desenlace es de ambas.
 *
 * Honestidad visual: conector, numeración y píldora son elementos DEL
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
        viewport: { once: true, amount: 0.4 },
      };

  const familyCapture = TEC_CAPTURES.correccionFamilia;
  const officeCapture = TEC_CAPTURES.correccionOficina;

  return (
    <Section id={TEC_CORRECTIONS.id}>
      {/*
        El encabezado ocupaba media pantalla y dejaba el resto vacío. Ese hueco
        recibe ahora la fotografía: la tesis de la sección es que la solución
        sigue siendo humana, y hasta aquí solo la demostraban dos capturas de
        software. La columna de texto conserva su `max-w-[46ch]`, así que el
        titular rompe exactamente donde ya estaba aprobado.

        La pista de la foto es FIJA (260px), no `auto`: con una pista `auto` el
        ítem se encoge a su contenido y el `w-full` interior colapsa a cero.
      */}
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
        <Reveal className="max-w-[46ch]">
          <Eyebrow>{TEC_CORRECTIONS.eyebrow}</Eyebrow>
          <SectionTitle>{TEC_CORRECTIONS.title}</SectionTitle>
          <SectionBody>{TEC_CORRECTIONS.body}</SectionBody>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative aspect-[2/3] w-full max-w-[208px] overflow-hidden rounded-xl border border-[var(--tec-line)] sm:max-w-[260px]">
            <Image
              src="/images/pic07.jpg"
              alt="Un instructor de HUMI ajusta el cinturón de un alumno pequeño mientras el resto del grupo espera su turno."
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 260px, 208px"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>

      <motion.div {...stage} className="mt-10 sm:mt-14">
        <div className="grid items-start lg:grid-cols-[1fr_auto_1.1fr]">
          {/* 01 — quien señala */}
          <div className="lg:pr-10">
            <Step n="01" label={TEC_CORRECTIONS.family.label} />
            <CaptureSlot
              capture={familyCapture}
              sizes="(min-width: 1024px) 380px, 100vw"
              className="mt-4 max-w-[380px]"
              caption={`${familyCapture.screen} · ${familyCapture.productRoute}`}
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

          {/* Conector 01 → 02. Horizontal en desktop, vertical en móvil. */}
          <div
            aria-hidden
            className="flex items-center justify-center lg:h-full lg:px-1"
          >
            <motion.span
              variants={connectorX}
              style={{ transformOrigin: "left center" }}
              className="hidden h-px w-24 bg-[var(--tec-accent)]/60 lg:block"
            />
            <motion.span
              variants={connectorY}
              style={{ transformOrigin: "center top" }}
              className="my-6 block h-10 w-px bg-[var(--tec-accent)]/60 lg:hidden"
            />
          </div>

          {/* 02 — quien resuelve */}
          <div className="lg:pl-10">
            <Step n="02" label={TEC_CORRECTIONS.academy.label} />
            <CaptureSlot
              capture={officeCapture}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="mt-4 max-w-[480px]"
              caption={`${officeCapture.screen} · ${officeCapture.productRoute}`}
            />
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-[var(--tec-mut)]">
              {TEC_CORRECTIONS.academy.caption}
            </p>
          </div>
        </div>

        {/*
          Punto de llegada. Cuelga de su propio tallo y va centrado bajo las
          dos columnas: el desenlace no es de la escuela, es de las dos.
        */}
        <div className="flex flex-col items-start lg:items-center">
          <motion.span
            aria-hidden
            variants={connectorY}
            style={{ transformOrigin: "center top" }}
            className="mt-6 block h-8 w-px bg-[var(--tec-accent)]/60 lg:mt-10 lg:h-10"
          />
          <div className="mt-4 flex items-center gap-3 lg:mt-5">
            <Meta>Estado de la solicitud</Meta>
            <span className="relative inline-grid">
              <motion.span
                variants={stateOut}
                className="col-start-1 row-start-1 rounded-full border border-[var(--tec-warn)]/40 bg-[var(--tec-warn)]/10 px-3.5 py-1 font-[family-name:var(--font-tec-mono)] text-[0.75rem] tracking-[0.14em] text-[var(--tec-warn)]"
              >
                {TEC_CORRECTIONS.stateOpen}
              </motion.span>
              <motion.span
                variants={stateIn}
                className="col-start-1 row-start-1 rounded-full border border-[var(--tec-ok)]/40 bg-[var(--tec-ok)]/10 px-3.5 py-1 font-[family-name:var(--font-tec-mono)] text-[0.75rem] tracking-[0.14em] text-[var(--tec-ok)]"
              >
                {TEC_CORRECTIONS.stateDone}
              </motion.span>
            </span>
          </div>
        </div>
      </motion.div>

      <Reveal delay={0.1}>
        <p className="mt-12 max-w-[52ch] border-t border-[var(--tec-line)] pt-6 text-sm leading-relaxed text-[var(--tec-mut)]">
          {TEC_CORRECTIONS.footnote}
        </p>
      </Reveal>
    </Section>
  );
}

/**
 * Rótulo de paso. La numeración es lo que hace legible la dirección cuando
 * el lector no lee las leyendas: 01 antes que 02, en el color de acento.
 */
function Step({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.2em] text-[var(--tec-accent)]">
        {n}
      </span>
      <span aria-hidden className="h-px w-5 bg-[var(--tec-accent)]/40" />
      <span className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.2em] text-[var(--tec-txt)] uppercase">
        {label}
      </span>
    </div>
  );
}
