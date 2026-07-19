"use client";

import {
  TEC_BRAND,
  TEC_FOOTER,
  TEC_HERO,
  TEC_PRODUCT,
  TEC_SECTIONS,
  TEC_VERTICALS_NOTE,
  TEC_WHATSAPP_ENTERPRISE,
} from "@/lib/humi-tec/copy";
import {
  enterpriseFloorMxn,
  formatMxn,
  TEC_PLANS,
  type BillingInterval,
  yearlySavingsEscuela,
} from "@/lib/humi-tec/pricing";
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
      className="inline-flex rounded-lg border border-white/10 bg-black/40 p-1 text-sm"
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
                ? "rounded-md bg-humi-accent px-4 py-2 font-medium text-humi-off-white"
                : "rounded-md px-4 py-2 text-humi-muted hover:text-humi-off-white"
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

  const fade = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#06080c] text-humi-off-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_10%_-10%,rgba(22,74,137,0.55),transparent_55%),radial-gradient(ellipse_80%_50%_at_90%_20%,rgba(74,143,212,0.12),transparent_50%),linear-gradient(180deg,#06080c_0%,#0a1018_45%,#06080c_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f5f0e8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <Link
          href="/tec"
          className="font-[family-name:var(--font-tec-display)] text-lg tracking-[0.18em] text-humi-off-white uppercase"
        >
          {TEC_BRAND.name}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-humi-muted transition hover:text-humi-off-white">
            Academia HUMI
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-white/15 px-3 py-1.5 text-humi-off-white transition hover:border-humi-accent-soft/60 hover:bg-white/5"
          >
            Iniciar sesión
          </Link>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[min(88dvh,820px)] max-w-6xl flex-col justify-end px-5 pb-16 pt-10 sm:px-8 sm:pb-24">
          <motion.p
            {...fade}
            className="font-[family-name:var(--font-tec-display)] text-xs tracking-[0.28em] text-humi-accent-soft uppercase"
          >
            {TEC_HERO.brand}
          </motion.p>
          <motion.h1
            {...fade}
            transition={{ ...fade.transition, delay: reduceMotion ? 0 : 0.08 }}
            className="mt-4 max-w-3xl font-[family-name:var(--font-tec-display)] text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-tight whitespace-pre-line"
          >
            {TEC_HERO.headline}
          </motion.h1>
          <motion.p
            {...fade}
            transition={{ ...fade.transition, delay: reduceMotion ? 0 : 0.16 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-humi-muted sm:text-lg"
          >
            {TEC_HERO.support}
          </motion.p>
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: reduceMotion ? 0 : 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={TEC_HERO.primaryCta.href}
              className="inline-flex items-center rounded-md bg-humi-accent px-5 py-3 text-sm font-medium text-humi-off-white transition hover:bg-humi-accent-soft"
            >
              {TEC_HERO.primaryCta.label}
            </a>
            <Link
              href={TEC_HERO.secondaryCta.href}
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm text-humi-off-white transition hover:border-white/40"
            >
              {TEC_HERO.secondaryCta.label}
            </Link>
          </motion.div>
          <p className="mt-8 text-xs tracking-wide text-humi-dim uppercase">
            {TEC_HERO.proof}
          </p>
        </section>

        <section className="border-t border-white/8 py-20" aria-labelledby="tec-product-title">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-xs tracking-[0.22em] text-humi-accent-soft uppercase">
              {TEC_PRODUCT.eyebrow}
            </p>
            <h2
              id="tec-product-title"
              className="mt-3 max-w-2xl font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl"
            >
              {TEC_PRODUCT.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-humi-muted">
              {TEC_PRODUCT.body}
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {TEC_PRODUCT.pillars.map((pillar) => (
                <div key={pillar.title}>
                  <h3 className="font-[family-name:var(--font-tec-display)] text-xl tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-humi-muted">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/8 bg-black/20 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs tracking-[0.22em] text-humi-accent-soft uppercase">
                {TEC_SECTIONS.why.eyebrow}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl">
                {TEC_SECTIONS.why.title}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-humi-muted">
                {TEC_SECTIONS.why.body}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.22em] text-humi-accent-soft uppercase">
                {TEC_SECTIONS.proof.eyebrow}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl">
                {TEC_SECTIONS.proof.title}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-humi-muted">
                {TEC_SECTIONS.proof.body}
              </p>
              <Link
                href={TEC_SECTIONS.proof.linkHref}
                className="mt-5 inline-block text-sm text-humi-accent-soft hover:underline"
              >
                {TEC_SECTIONS.proof.linkLabel}
              </Link>
              <p className="mt-8 max-w-md text-sm text-humi-dim">{TEC_VERTICALS_NOTE}</p>
            </div>
          </div>
        </section>

        <section id="planes" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-xs tracking-[0.22em] text-humi-accent-soft uppercase">
              {TEC_SECTIONS.plans.eyebrow}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl">
              {TEC_SECTIONS.plans.title}
            </h2>
            <p className="mt-3 max-w-xl text-humi-muted">{TEC_SECTIONS.plans.body}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <IntervalToggle value={interval} onChange={setInterval} />
              {interval === "yearly" && savings > 0 ? (
                <span className="text-sm text-humi-accent-soft">
                  Escuela anual ahorra {formatMxn(savings)} al año
                </span>
              ) : null}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {TEC_PLANS.map((plan) => {
                const price = plan.prices[interval];
                const isEnterprise = plan.id === "enterprise";
                const href = isEnterprise
                  ? TEC_WHATSAPP_ENTERPRISE
                  : `/signup?plan=${plan.signupPlan}&interval=${interval}`;

                return (
                  <article
                    key={plan.id}
                    className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                  >
                    <h3 className="font-[family-name:var(--font-tec-display)] text-2xl tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-sm text-humi-muted">{plan.tagline}</p>
                    <div className="mt-6">
                      <p className="font-[family-name:var(--font-tec-display)] text-4xl tracking-tight">
                        {formatMxn(price.amountMxn)}
                      </p>
                      <p className="mt-1 text-sm text-humi-dim">{price.per}</p>
                      {isEnterprise ? (
                        <p className="mt-2 text-sm text-humi-muted">
                          Desde {formatMxn(enterpriseFloorMxn(interval))} (
                          {plan.minSchools} escuelas)
                        </p>
                      ) : null}
                    </div>
                    <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm text-humi-muted">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-humi-accent-soft" aria-hidden>
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {isEnterprise ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex justify-center rounded-md bg-humi-accent px-4 py-3 text-sm font-medium transition hover:bg-humi-accent-soft"
                      >
                        {plan.ctaLabel}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="mt-8 inline-flex justify-center rounded-md bg-humi-accent px-4 py-3 text-sm font-medium transition hover:bg-humi-accent-soft"
                      >
                        {plan.ctaLabel}
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="text-xs tracking-[0.22em] text-humi-accent-soft uppercase">
              {TEC_SECTIONS.enterprise.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-tec-display)] text-3xl tracking-tight sm:text-4xl">
              {TEC_SECTIONS.enterprise.title}
            </h2>
            <p className="mt-4 max-w-xl text-humi-muted">{TEC_SECTIONS.enterprise.body}</p>
            <a
              href={TEC_WHATSAPP_ENTERPRISE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-md border border-white/20 px-5 py-3 text-sm transition hover:border-humi-accent-soft/50"
            >
              Coordinar onboarding Enterprise →
            </a>
          </div>
        </section>

        <section className="border-t border-white/8 bg-black/25 py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="text-xs tracking-[0.22em] text-humi-accent-soft uppercase">
                {TEC_SECTIONS.access.eyebrow}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-tec-display)] text-2xl tracking-tight sm:text-3xl">
                {TEC_SECTIONS.access.title}
              </h2>
              <p className="mt-2 max-w-md text-sm text-humi-muted">
                {TEC_SECTIONS.access.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-md bg-humi-accent px-5 py-3 text-sm font-medium transition hover:bg-humi-accent-soft"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/signup?plan=escuela"
                className="rounded-md border border-white/20 px-5 py-3 text-sm transition hover:border-white/40"
              >
                Crear cuenta
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/8 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-humi-dim sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-tec-display)] tracking-[0.18em] text-humi-muted uppercase">
              {TEC_BRAND.name}
            </p>
            <p className="mt-2 max-w-md">{TEC_FOOTER.legalNote}</p>
            <p className="mt-1">{TEC_FOOTER.termsNote}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-humi-off-white">
              Academia HUMI
            </Link>
            <Link href="/login" className="hover:text-humi-off-white">
              Login
            </Link>
            <Link href="/sitemap" className="hover:text-humi-off-white">
              Mapa del sitio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
