"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TEC_HERO } from "@/lib/humi-tec/copy";
import { productLoginUrl } from "@/lib/humi-tec/product";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 01 — MARCA
 *
 * Desktop: fotografía a sangre con el texto anclado abajo sobre el degradado.
 * Móvil: la foto ocupa el bloque superior y el texto baja a fondo sólido —
 * un titular sobre fotografía a 390px pierde legibilidad.
 */
export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section className="relative sm:min-h-[min(86dvh,820px)]">
      <div className="relative h-[46vh] min-h-[260px] sm:absolute sm:inset-0 sm:h-auto sm:min-h-0">
        <Image
          src="/images/pic11.jpg"
          alt="Entrenamiento infantil de taekwondo en HUMI, Ensenada."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--tec-bg)] via-[var(--tec-bg)]/20 to-transparent sm:bg-gradient-to-r sm:from-[var(--tec-bg)] sm:via-[var(--tec-bg)]/85 sm:to-[var(--tec-bg)]/35"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden sm:block sm:bg-gradient-to-t sm:from-[var(--tec-bg)] sm:via-transparent sm:to-[var(--tec-bg)]/60"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-end px-5 pt-10 pb-16 sm:min-h-[min(86dvh,820px)] sm:px-8 sm:pt-28 sm:pb-24">
        <motion.p
          {...fadeUp(0)}
          className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.3em] text-[var(--tec-accent)] uppercase"
        >
          {TEC_HERO.brand}
        </motion.p>

        <motion.h1
          {...fadeUp(0.08)}
          className="mt-5 max-w-[12ch] font-[family-name:var(--font-tec-display)] text-[clamp(2.25rem,7vw,4.25rem)] leading-[1.03] font-semibold tracking-tight whitespace-pre-line text-balance sm:max-w-[16ch]"
        >
          {TEC_HERO.headline}
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          className="mt-6 max-w-lg text-base leading-relaxed text-[var(--tec-txt-2)] sm:text-lg"
        >
          {TEC_HERO.support}
        </motion.p>

        <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap gap-3">
          <a
            href={TEC_HERO.primaryCta.href}
            className="inline-flex items-center rounded-lg bg-[var(--tec-accent)] px-5 py-3 text-sm font-medium text-[#12090a] transition hover:brightness-110"
          >
            {TEC_HERO.primaryCta.label}
          </a>
          <a
            href={productLoginUrl()}
            className="inline-flex items-center rounded-lg border border-[var(--tec-line-strong)] px-5 py-3 text-sm transition hover:border-[var(--tec-txt-2)]"
          >
            {TEC_HERO.secondaryCta.label}
          </a>
        </motion.div>

        <p className="mt-10 font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.16em] text-[var(--tec-dim)] uppercase">
          {TEC_HERO.proof}
        </p>
      </div>
    </section>
  );
}
