"use client";

import Image from "next/image";
import { TEC_SCALE, TEC_WHATSAPP_ENTERPRISE } from "@/lib/humi-tec/copy";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 08 — ESCALA
 *
 * Cambio de escala, no catálogo enterprise. La sección dibuja UNA jerarquía:
 *
 *   01 UNA DIRECCIÓN ─────────────────
 *              │
 *      ┬──┬──┬─┴─┬──┬──┬──┬            ← una se abre en muchas
 *   02 MUCHAS ESCUELAS ───────────────
 *              │
 *   03 EL MISMO CRITERIO ─────────────
 *
 * Los tres niveles eran antes tres columnas del mismo ancho: una fila de
 * iguales comunica «tenemos tres cosas», que es lo contrario de una
 * jerarquía. Ahora bajan en vertical y el tercer tiempo cierra el titular
 * en lugar de colgar una funcionalidad donde iba la conclusión.
 *
 * El peine es el único grafismo que importa: una línea que se convierte en
 * varias. Se lee sin leer el copy y se comporta igual en móvil, porque ya
 * es vertical — móvil no es el desktop comprimido, es el mismo dibujo.
 *
 * Honestidad: el peine representa multiplicidad, no un número de escuelas
 * ni una pantalla del producto. No hay captura aquí y no se fabrica una: un
 * bracket real y presentable sigue pendiente de verificación.
 */
export function ScaleSection() {
  return (
    <Section id={TEC_SCALE.id}>
      <Reveal className="max-w-2xl">
        <Eyebrow>{TEC_SCALE.eyebrow}</Eyebrow>
        <SectionTitle className="max-w-[22ch]">{TEC_SCALE.title}</SectionTitle>
        <SectionBody>{TEC_SCALE.body}</SectionBody>
      </Reveal>

      <Reveal delay={0.08}>
        <ol className="mt-10 sm:mt-12">
          <Level n="01" level={TEC_SCALE.levels[0]} />
          <Fork />
          <Level n="02" level={TEC_SCALE.levels[1]} />
          <Stem />
          <Level n="03" level={TEC_SCALE.levels[2]} closing />
        </ol>
      </Reveal>

      <Reveal delay={0.12}>
        <figure className="m-0 mt-10 sm:mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--tec-line)] sm:aspect-[3/1]">
            <Image
              src="/signature-events/2023/ki-games.jpg"
              alt="Atletas y entrenadores reunidos en un evento de la comunidad HUMI."
              fill
              loading="lazy"
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-3">
            <Meta>Comunidad HUMI · archivo de experiencias</Meta>
          </figcaption>
        </figure>
      </Reveal>

      <Reveal delay={0.16}>
        {/*
          La condición de entrada vive junto a la acción, no sobre el titular:
          ahí arriba se leía como badge de pricing.
        */}
        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={TEC_WHATSAPP_ENTERPRISE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg border border-[var(--tec-line-strong)] px-5 py-3 text-sm transition hover:border-[var(--tec-accent)]/60"
          >
            {TEC_SCALE.ctaLabel} →
          </a>
          <p className="rounded-full border border-[var(--tec-accent)]/35 px-3 py-1.5 font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.16em] text-[var(--tec-accent)] uppercase">
            {TEC_SCALE.minSchools}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/** Un nivel de la jerarquía: rótulo a la izquierda, lo que significa a la derecha. */
function Level({
  n,
  level,
  closing = false,
}: {
  n: string;
  level: { label: string; note: string };
  closing?: boolean;
}) {
  return (
    <li
      className={`flex flex-col gap-x-8 gap-y-1.5 border-t pt-3.5 sm:flex-row sm:items-baseline ${
        closing
          ? "border-[var(--tec-accent)]/40"
          : "border-[var(--tec-line-strong)]"
      }`}
    >
      <h3 className="flex shrink-0 items-baseline gap-3 sm:w-[14rem]">
        <span className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.2em] text-[var(--tec-accent)]">
          {n}
        </span>
        <span className="font-[family-name:var(--font-tec-display)] text-lg font-semibold tracking-tight">
          {level.label}
        </span>
      </h3>
      <p className="max-w-[54ch] text-sm leading-relaxed text-[var(--tec-mut)]">
        {level.note}
      </p>
    </li>
  );
}

/**
 * Una se abre en muchas. Es el único momento del landing donde una línea se
 * multiplica, y es lo que hace legible la relación sin leer una palabra.
 */
function Fork() {
  return (
    <li aria-hidden className="py-4">
      <span className="mx-auto block h-8 w-px bg-[var(--tec-line-strong)]" />
      <span className="block h-px w-full bg-[var(--tec-line-strong)]" />
      <div className="flex justify-between">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="block h-3.5 w-px bg-[var(--tec-line-strong)]"
          />
        ))}
      </div>
    </li>
  );
}

/** Tallo simple: de las muchas escuelas baja el criterio que comparten. */
function Stem() {
  return (
    <li aria-hidden className="py-4">
      <span className="mx-auto block h-8 w-px bg-[var(--tec-line-strong)]" />
    </li>
  );
}
