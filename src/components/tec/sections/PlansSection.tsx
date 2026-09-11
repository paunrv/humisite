"use client";

import { useState } from "react";
import {
  TEC_PLANS_COPY,
  TEC_VERTICALS_NOTE,
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
import { Eyebrow, Reveal, Section, SectionBody, SectionTitle } from "../primitives";

/**
 * 10 — PLANES
 *
 * Dos tarjetas del mismo peso: Enterprise no es un plan superior, es otra
 * audiencia. Sin tabla comparativa y sin badge de «recomendado».
 *
 * Los CTA llevan a conversación por WhatsApp, como hoy: el Checkout de
 * Stripe todavía no existe en el producto, así que no se usa lenguaje de
 * autoservicio («empieza gratis», «sin tarjeta», «cancela cuando quieras»).
 */
export function PlansSection() {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const savings = yearlySavingsEscuela();

  return (
    <Section id={TEC_PLANS_COPY.id} surface>
      <Reveal>
        <Eyebrow>{TEC_PLANS_COPY.eyebrow}</Eyebrow>
        <SectionTitle>{TEC_PLANS_COPY.title}</SectionTitle>
        <SectionBody>{TEC_PLANS_COPY.body}</SectionBody>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <IntervalToggle value={interval} onChange={setInterval} />
          {interval === "yearly" && savings > 0 ? (
            <span className="text-sm text-[var(--tec-txt-2)]">
              Escuela anual ahorra {formatMxn(savings)} al año
            </span>
          ) : null}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {TEC_PLANS.map((plan, index) => {
          const price = plan.prices[interval];
          const isEnterprise = plan.id === "enterprise";
          const href = isEnterprise ? TEC_WHATSAPP_ENTERPRISE : TEC_WHATSAPP_ESCUELA;

          return (
            <Reveal key={plan.id} delay={0.06 * index}>
              <article className="flex h-full flex-col rounded-xl border border-[var(--tec-line)] bg-[var(--tec-bg)]/60 p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-tec-display)] text-2xl font-semibold tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--tec-mut)]">{plan.tagline}</p>

                <div className="mt-6">
                  <p className="font-[family-name:var(--font-tec-display)] text-4xl font-semibold tracking-tight tabular-nums">
                    {formatMxn(price.amountMxn)}
                  </p>
                  <p className="mt-1 text-sm text-[var(--tec-dim)]">{price.per}</p>
                  {isEnterprise ? (
                    <p className="mt-2 text-sm text-[var(--tec-mut)]">
                      Desde {formatMxn(enterpriseFloorMxn(interval))} ({plan.minSchools}{" "}
                      escuelas)
                    </p>
                  ) : null}
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-sm text-[var(--tec-mut)]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-[var(--tec-dim)]" aria-hidden>
                        —
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    isEnterprise
                      ? "mt-8 inline-flex justify-center rounded-lg border border-[var(--tec-line-strong)] px-4 py-3 text-sm transition hover:border-[var(--tec-accent)]/60"
                      : "mt-8 inline-flex justify-center rounded-lg bg-[var(--tec-accent)] px-4 py-3 text-sm font-medium text-[#12090a] transition hover:brightness-110"
                  }
                >
                  {plan.ctaLabel}
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 max-w-[60ch] text-sm text-[var(--tec-dim)]">
        {TEC_VERTICALS_NOTE}
      </p>
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
                ? "rounded-md bg-[var(--tec-accent)] px-4 py-2 font-medium text-[#12090a]"
                : "rounded-md px-4 py-2 text-[var(--tec-mut)] transition hover:text-[var(--tec-txt)]"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
