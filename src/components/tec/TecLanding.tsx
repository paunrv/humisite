"use client";

import Link from "next/link";
import {
  TEC_BRAND,
  TEC_FOOTER,
  TEC_NAV,
  TEC_WHATSAPP_WEBSITE,
} from "@/lib/humi-tec/copy";
import { productLoginUrl } from "@/lib/humi-tec/product";
import { HeroSection } from "./sections/HeroSection";
import { ProductSection } from "./sections/ProductSection";
import { SurfacesSection } from "./sections/SurfacesSection";
import { OperationSection } from "./sections/OperationSection";
import { FamilySection } from "./sections/FamilySection";
import { CorrectionsSection } from "./sections/CorrectionsSection";
import { MessagesSection } from "./sections/MessagesSection";
import { ScaleSection } from "./sections/ScaleSection";
import { StartSection } from "./sections/StartSection";
import { PlansSection } from "./sections/PlansSection";
import { ClosingSection } from "./sections/ClosingSection";

/**
 * HUMI-tec Landing V2 — producto primero.
 *
 * Narrativa: marca → producto → dos superficies → operación → familia →
 * correcciones → mensajes → escala → empezar → planes → cierre.
 *
 * Presupuesto cerrado de 6 apariciones de producto (ver `lib/humi-tec/captures.ts`).
 * El servicio de website vive en el cierre, fuera del cuerpo principal.
 */
export function TecLanding() {
  return (
    <div className="tec relative min-h-dvh overflow-x-hidden bg-[var(--tec-bg)] text-[var(--tec-txt)]">
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link
          href="/tec"
          className="font-[family-name:var(--font-tec-display)] text-base font-semibold tracking-[0.2em] uppercase sm:text-lg"
        >
          {TEC_BRAND.name}
        </Link>

        <nav
          aria-label="Secciones de HUMI-tec"
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm"
        >
          {TEC_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-[var(--tec-mut)] transition hover:text-[var(--tec-txt)] md:inline"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/"
            className="text-[var(--tec-mut)] transition hover:text-[var(--tec-txt)]"
          >
            HUMI
          </Link>
          <a
            href={productLoginUrl()}
            className="rounded-lg border border-[var(--tec-line-strong)] px-3 py-1.5 transition hover:border-[var(--tec-accent)]/60"
          >
            Entrar
          </a>
        </nav>
      </header>

      <main>
        <HeroSection />
        <ProductSection />
        <SurfacesSection />
        <OperationSection />
        <FamilySection />
        <CorrectionsSection />
        <MessagesSection />
        <ScaleSection />
        <StartSection />
        <PlansSection />
        <ClosingSection />
      </main>

      <footer className="border-t border-[var(--tec-line)] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[var(--tec-dim)] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-tec-mono)] text-[0.6875rem] tracking-[0.18em] text-[var(--tec-mut)] uppercase">
              {TEC_BRAND.name}
            </p>
            <p className="mt-2 max-w-md">{TEC_FOOTER.legalNote}</p>
            <p className="mt-1">{TEC_FOOTER.termsNote}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="transition hover:text-[var(--tec-txt)]">
              Academia HUMI
            </Link>
            <a
              href={TEC_WHATSAPP_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[var(--tec-txt)]"
            >
              Solicitar website
            </a>
            <a
              href={productLoginUrl()}
              className="transition hover:text-[var(--tec-txt)]"
            >
              Entrar
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
