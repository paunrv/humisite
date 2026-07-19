"use client";

import {
  TEC_ACCESS,
  TEC_BRAND,
  TEC_ENTERPRISE,
  TEC_ESSENCE,
  TEC_FOOTER,
  TEC_HERO,
  TEC_PLANS_COPY,
  TEC_SCHOOL,
  TEC_VERTICALS_NOTE,
  TEC_WEBSITE,
  TEC_WHATSAPP_ENTERPRISE,
  TEC_WHATSAPP_ESCUELA,
  TEC_WHATSAPP_WEBSITE,
} from "@/lib/humi-tec/copy";
import {
  enterpriseFloorMxn,
  formatMxn,
  TEC_PLANS,
  type BillingInterval,
  yearlySavingsEscuela,
} from "@/lib/humi-tec/pricing";
import { productLoginUrl } from "@/lib/humi-tec/product";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function IntervalToggle({
  value,
  onChange,
}: {
  value: BillingInterval;
  onChange: (v: BillingInterval) => void;
}) {
  return (
    <div
      className="inline-flex rounded-lg border border-white/12 bg-[#0a0e14]/80 p-1 text-sm"
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
            className={
              active
                ? "rounded-md bg-[#164a89] px-4 py-2 font-medium text-[#f5f0e8]"
                : "rounded-md px-4 py-2 text-[#8a8580] hover:text-[#f5f0e8]"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function TecLanding() {
  const reduceMotion = useReducedMotion();
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const savings = yearlySavingsEscuela();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#07090d] text-[#f5f0e8]">
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link
          href="/tec"
          className="font-[family-name:var(--font-tec-display)] text-base tracking-[0.2em] uppercase sm:text-lg"
        >
          {TEC_BRAND.name}
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
          <a href="#escuela" className="hidden text-[#8a8580] transition hover:text-[#f5f0e8] md:inline">
            Escuela
          </a>
          <a href="#enterprise" className="hidden text-[#8a8580] transition hover:text-[#f5f0e8] md:inline">
            Enterprise
          </a>
          <a href="#website" className="hidden text-[#8a8580] transition hover:text-[#f5f0e8] md:inline">
            Website
          </a>
          <a href="#planes" className="hidden text-[#8a8580] transition hover:text-[#f5f0e8] lg:inline">
            Planes
          </a>
          <Link href="/" className="text-[#8a8580] transition hover:text-[#f5f0e8]">
            HUMI
          </Link>
          <a
            href={productLoginUrl()}
            className="rounded-md border border-white/15 px-3 py-1.5 transition hover:border-[#4a8fd4]/50 hover:bg-white/5"
          >
            Entrar
          </a>
        </nav>
      </header>

      <main>
        {/* HERO — full-bleed image plane */}
        <section className="relative min-h-[min(92dvh,880px)] overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/pic11.jpg)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#07090d] via-[#07090d]/88 to-[#07090d]/45"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-[#07090d]/50"
          />

          <div className="relative z-10 mx-auto flex min-h-[min(92dvh,880px)] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 sm:px-8 sm:pb-24">
            <motion.p
              {...fadeUp(0)}
              className="font-[family-name:var(--font-tec-display)] text-xs tracking-[0.3em] text-[#4a8fd4] uppercase"
            >
              {TEC_HERO.brand}
            </motion.p>
            <motion.h1
              {...fadeUp(0.08)}
              className="mt-5 max-w-[16ch] font-[family-name:var(--font-tec-display)] text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.02] font-semibold tracking-tight whitespace-pre-line"
            >
              {TEC_HERO.headline}
            </motion.h1>
            <motion.p
              {...fadeUp(0.16)}
              className="mt-6 max-w-lg text-base leading-relaxed text-[#c8c2b8] sm:text-lg"
            >
              {TEC_HERO.support}
            </motion.p>
            <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap gap-3">
              <a
                href={TEC_HERO.primaryCta.href}
                className="inline-flex items-center rounded-md bg-[#164a89] px-5 py-3 text-sm font-medium transition hover:bg-[#4a8fd4]"
              >
                {TEC_HERO.primaryCta.label}
              </a>
              <a
                href={productLoginUrl()}
                className="inline-flex items-center rounded-md border border-white/25 px-5 py-3 text-sm transition hover:border-white/50"
              >
                {TEC_HERO.secondaryCta.label}
              </a>
            </motion.div>
            <p className="mt-10 text-[0.7rem] tracking-[0.14em] text-[#6a6560] uppercase">
              {TEC_HERO.proof}
            </p>
          </div>
        </section>

        {/* ESSENCE */}
        <section className="border-t border-white/8 bg-[#0b0f16] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <p className="text-xs tracking-[0.24em] text-[#4a8fd4] uppercase">
              {TEC_ESSENCE.eyebrow}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-[2.5rem] sm:leading-tight">
              {TEC_ESSENCE.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#8a8580] sm:text-lg">
              {TEC_ESSENCE.body}
            </p>
          </div>
        </section>

        {/* ESCUELA */}
        <section id="escuela" className="scroll-mt-20 border-t border-white/8 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-xs tracking-[0.24em] text-[#4a8fd4] uppercase">
              {TEC_SCHOOL.eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl">
              {TEC_SCHOOL.title}
            </h2>
            <p className="mt-4 max-w-xl text-[#8a8580]">{TEC_SCHOOL.body}</p>

            <ol className="mt-14 grid gap-0 border-t border-white/10 sm:grid-cols-2">
              {TEC_SCHOOL.features.map((feature) => (
                <li
                  key={feature.num}
                  className="border-b border-white/10 px-0 py-8 sm:px-6 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0"
                >
                  <span className="font-[family-name:var(--font-tec-display)] text-sm tracking-[0.16em] text-[#4a8fd4]">
                    {feature.num}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-tec-display)] text-xl tracking-tight sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#8a8580]">
                    {feature.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ENTERPRISE */}
        <section
          id="enterprise"
          className="scroll-mt-20 border-t border-white/8 bg-[#0b0f16] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs tracking-[0.24em] text-[#4a8fd4] uppercase">
                  {TEC_ENTERPRISE.eyebrow}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl">
                  {TEC_ENTERPRISE.title}
                </h2>
                <p className="mt-4 text-[#8a8580]">{TEC_ENTERPRISE.body}</p>
              </div>
              <p className="rounded-md border border-[#4a8fd4]/30 px-3 py-1.5 text-xs tracking-wide text-[#4a8fd4] uppercase">
                {TEC_ENTERPRISE.minSchools}
              </p>
            </div>

            <ul className="mt-14 grid gap-10 md:grid-cols-2">
              {TEC_ENTERPRISE.features.map((feature) => (
                <li key={feature.title} className="relative pl-5">
                  <span
                    aria-hidden
                    className="absolute top-1.5 left-0 h-2 w-2 rounded-full bg-[#164a89]"
                  />
                  <h3 className="font-[family-name:var(--font-tec-display)] text-xl tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">{feature.body}</p>
                </li>
              ))}
            </ul>

            <a
              href={TEC_WHATSAPP_ENTERPRISE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex rounded-md border border-white/20 px-5 py-3 text-sm transition hover:border-[#4a8fd4]/50"
            >
              Coordinar Enterprise →
            </a>
          </div>
        </section>

        {/* WEBSITE */}
        <section id="website" className="scroll-mt-20 relative overflow-hidden py-20 sm:py-28">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_20%,rgba(22,74,137,0.35),transparent_60%)]"
          />
          <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-xs tracking-[0.24em] text-[#4a8fd4] uppercase">
              {TEC_WEBSITE.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl">
              {TEC_WEBSITE.title}
            </h2>
            <p className="mt-4 max-w-xl text-[#8a8580]">{TEC_WEBSITE.body}</p>
            <ul className="mt-8 flex max-w-xl flex-col gap-3 text-sm text-[#c8c2b8]">
              {TEC_WEBSITE.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a8fd4]" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={TEC_WHATSAPP_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-[#164a89] px-5 py-3 text-sm font-medium transition hover:bg-[#4a8fd4]"
              >
                {TEC_WEBSITE.ctaLabel}
              </a>
              <Link
                href={TEC_WEBSITE.secondaryHref}
                className="inline-flex rounded-md border border-white/20 px-5 py-3 text-sm transition hover:border-white/40"
              >
                {TEC_WEBSITE.secondaryLabel}
              </Link>
            </div>
          </div>
        </section>

        {/* PLANES */}
        <section id="planes" className="scroll-mt-20 border-t border-white/8 bg-[#0b0f16] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-xs tracking-[0.24em] text-[#4a8fd4] uppercase">
              {TEC_PLANS_COPY.eyebrow}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl">
              {TEC_PLANS_COPY.title}
            </h2>
            <p className="mt-3 max-w-xl text-[#8a8580]">{TEC_PLANS_COPY.body}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <IntervalToggle value={interval} onChange={setInterval} />
              {interval === "yearly" && savings > 0 ? (
                <span className="text-sm text-[#4a8fd4]">
                  Escuela anual ahorra {formatMxn(savings)} al año
                </span>
              ) : null}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {TEC_PLANS.map((plan) => {
                const price = plan.prices[interval];
                const isEnterprise = plan.id === "enterprise";
                const href = isEnterprise
                  ? TEC_WHATSAPP_ENTERPRISE
                  : TEC_WHATSAPP_ESCUELA;

                return (
                  <article
                    key={plan.id}
                    className="flex flex-col border border-white/10 bg-[#07090d]/60 p-6 sm:p-8"
                  >
                    <h3 className="font-[family-name:var(--font-tec-display)] text-2xl tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#8a8580]">{plan.tagline}</p>
                    <div className="mt-6">
                      <p className="font-[family-name:var(--font-tec-display)] text-4xl tracking-tight">
                        {formatMxn(price.amountMxn)}
                      </p>
                      <p className="mt-1 text-sm text-[#6a6560]">{price.per}</p>
                      {isEnterprise ? (
                        <p className="mt-2 text-sm text-[#8a8580]">
                          Desde {formatMxn(enterpriseFloorMxn(interval))} ({plan.minSchools}{" "}
                          escuelas)
                        </p>
                      ) : null}
                    </div>
                    <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-sm text-[#8a8580]">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-[#4a8fd4]" aria-hidden>
                            —
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex justify-center rounded-md bg-[#164a89] px-4 py-3 text-sm font-medium transition hover:bg-[#4a8fd4]"
                    >
                      {plan.ctaLabel}
                    </a>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 text-sm text-[#6a6560]">{TEC_VERTICALS_NOTE}</p>
          </div>
        </section>

        {/* ACCESS */}
        <section className="border-t border-white/8 py-16 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="text-xs tracking-[0.24em] text-[#4a8fd4] uppercase">
                {TEC_ACCESS.eyebrow}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-tec-display)] text-2xl tracking-tight sm:text-3xl">
                {TEC_ACCESS.title}
              </h2>
              <p className="mt-2 max-w-md text-sm text-[#8a8580]">{TEC_ACCESS.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={productLoginUrl()}
                className="rounded-md bg-[#164a89] px-5 py-3 text-sm font-medium transition hover:bg-[#4a8fd4]"
              >
                Iniciar sesión
              </a>
              <a
                href={TEC_WHATSAPP_ESCUELA}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/20 px-5 py-3 text-sm transition hover:border-white/40"
              >
                Solicitar acceso Escuela
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[#6a6560] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-tec-display)] tracking-[0.18em] text-[#8a8580] uppercase">
              {TEC_BRAND.name}
            </p>
            <p className="mt-2 max-w-md">{TEC_FOOTER.legalNote}</p>
            <p className="mt-1">{TEC_FOOTER.termsNote}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-[#f5f0e8]">
              Academia HUMI
            </Link>
            <a href="#website" className="hover:text-[#f5f0e8]">
              Solicitar website
            </a>
            <a href={productLoginUrl()} className="hover:text-[#f5f0e8]">
              Login
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
