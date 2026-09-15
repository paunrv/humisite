"use client";

import { useState } from "react";
import {
  TEC_PLANS_COPY,
  TEC_PLAN_PRESENTATION,
  TEC_WHATSAPP_ENTERPRISE,
  TEC_WHATSAPP_ESCUELA,
} from "@/lib/humi-tec/copy";
import {
  enterpriseFloorMxn,
  formatMxn,
  TEC_PLANS,
  yearlySavingsEscuela,
  type BillingInterval,
} from "@/lib/humi-tec/pricing";
import { Eyebrow, Meta, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 10 — PLANES
 *
 * Es una decisión, no una tabla comparativa. La pregunta que resuelve es
 * «¿cuál HUMI necesito?», así que cada bloque cabe de una ojeada: nombre y
 * precio en la misma línea, una frase de a quién sirve, lo que incluye, y
 * una sola acción.
 *
 * Escuela es la puerta de entrada y lleva la única acción primaria de la
 * sección. Agrupación no es un plan superior ni «enterprise»: es otra
 * audiencia, la que ya coordina varias escuelas. Por eso se distinguen por
 * tratamiento —borde de acento frente a borde neutro— y no por jerarquía de
 * producto, y no hay badge de «recomendado».
 *
 * Los PRECIOS vienen de `pricing.ts` y no se derivan ni se reescriben aquí.
 * El nombre, la frase y los bullets vienen de `copy.ts`: el plan que el
 * código llama `enterprise` se presenta como «Agrupación».
 *
 * Los CTA llevan a conversación por WhatsApp, como hoy: el Checkout de
 * Stripe todavía no existe en el producto, así que no se usa lenguaje de
 * autoservicio («empieza gratis», «sin tarjeta», «cancela cuando quieras»).
 */
export function PlansSection() {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const savings = yearlySavingsEscuela();

  return (
    <Section id={TEC_PLANS_COPY.id} band surface>
      <Reveal>
        <Eyebrow>{TEC_PLANS_COPY.eyebrow}</Eyebrow>
        <SectionTitle>{TEC_PLANS_COPY.title}</SectionTitle>
        <SectionBody>{TEC_PLANS_COPY.body}</SectionBody>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-6">
          <IntervalToggle value={interval} onChange={setInterval} />
          {interval === "yearly" && savings > 0 ? (
            <span className="text-sm text-[var(--tec-txt-2)]">
              Escuela anual ahorra {formatMxn(savings)} al año
            </span>
          ) : null}
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {TEC_PLANS.map((plan, index) => {
          const price = plan.prices[interval];
          const copy = TEC_PLAN_PRESENTATION[plan.id];
          const isGroup = plan.id === "enterprise";
          const href = isGroup ? TEC_WHATSAPP_ENTERPRISE : TEC_WHATSAPP_ESCUELA;

          return (
            <Reveal key={plan.id} delay={0.06 * index}>
              <article
                className={`flex h-full flex-col rounded-xl border bg-[var(--tec-bg)]/60 p-5 sm:p-6 ${
                  isGroup
                    ? "border-[var(--tec-line)]"
                    : "border-[var(--tec-accent)]/30"
                }`}
              >
                {/* Nombre y precio en la misma línea: la decisión de un vistazo. */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-[family-name:var(--font-tec-display)] text-2xl font-semibold tracking-tight">
                    {copy.name}
                  </h3>
                  <p className="font-[family-name:var(--font-tec-display)] text-2xl font-semibold tracking-tight tabular-nums">
                    {formatMxn(price.amountMxn)}{" "}
                    <span className="text-sm font-normal text-[var(--tec-dim)]">
                      {price.per}
                    </span>
                  </p>
                </div>

                <p className="mt-1.5 text-sm text-[var(--tec-mut)]">{copy.lead}</p>

                {isGroup ? (
                  <p className="mt-1.5">
                    <Meta>
                      Desde {formatMxn(enterpriseFloorMxn(interval))} ·{" "}
                      {plan.minSchools} escuelas
                    </Meta>
                  </p>
                ) : null}

                <ul className="mt-4 flex flex-1 flex-col gap-2 border-t border-[var(--tec-line)] pt-4 text-sm text-[var(--tec-mut)] sm:mt-5 sm:pt-5">
                  {copy.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5">
                      <span className="text-[var(--tec-dim)]" aria-hidden>
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    isGroup
                      ? "mt-5 inline-flex justify-center rounded-lg border border-[var(--tec-line-strong)] px-4 py-3 text-sm transition hover:border-[var(--tec-accent)]/60 sm:mt-6"
                      : "mt-5 inline-flex justify-center rounded-lg bg-[var(--tec-accent)] px-4 py-3 text-sm font-medium text-[#12090a] transition hover:brightness-110 sm:mt-6"
                  }
                >
                  {copy.ctaLabel}
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function IntervalToggle({
  value,
  onChange,
}: {
  value: BillingInterval;
  onChange: (v: BillingInterval) => void;
}) {
  return (
    <div
      className="inline-flex rounded-lg border border-[var(--tec-line)] bg-[var(--tec-bg)]/80 p-1 text-sm"
      role="group"
      aria-label="Intervalo de facturación"
    >
      {(
        [
          ["monthly", "Mensual"],
          ["yearly", "Anual"],
        ] as const
      ).map(([id, label]) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={active}
            className={
              active
                ? "rounded-md bg-[var(--tec-accent)] px-3.5 py-1.5 font-medium text-[#12090a]"
                : "rounded-md px-3.5 py-1.5 text-[var(--tec-mut)] transition hover:text-[var(--tec-txt)]"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
