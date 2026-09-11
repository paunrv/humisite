"use client";

import Image from "next/image";
import {
  CAPTURE_VIEWPORTS,
  isCaptureReady,
  type Capture,
} from "@/lib/humi-tec/captures";
import { Meta } from "./primitives";

/**
 * Hueco de captura real del producto.
 *
 * Si la captura ya existe (`src`), se renderiza optimizada con next/image.
 * Si todavía no existe, se renderiza un PLACEHOLDER EXPLÍCITO con el id, la
 * pantalla y el viewport que hacen falta. Nunca se dibuja una interfaz
 * simulada: el landing no puede mostrar un producto que no fue capturado.
 */
export function CaptureSlot({
  capture,
  sizes,
  priority = false,
  ratio,
  caption,
  className = "",
  frameless = false,
}: {
  capture: Capture;
  sizes: string;
  priority?: boolean;
  /** Sobrescribe el aspect-ratio del inventario (derivados y móvil). */
  ratio?: string;
  caption?: string;
  className?: string;
  /** Sin marco: para el sangrado de la sección 02. */
  frameless?: boolean;
}) {
  const ready = isCaptureReady(capture);

  const frame = frameless
    ? "overflow-hidden"
    : "overflow-hidden rounded-xl border border-[var(--tec-line-strong)]";

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`relative w-full bg-[var(--tec-surf)] ${frame}`}
        style={{ aspectRatio: ratio ?? capture.ratio }}
      >
        {ready ? (
          <Image
            src={capture.src}
            alt={capture.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        ) : (
          <PendingCapture capture={capture} />
        )}
        {/* Reflejo superior de 1px: sugiere plano de pantalla sin sombras. */}
        {!frameless ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgba(245,240,232,0.06)]"
          />
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mt-3">
          <Meta>{caption}</Meta>
        </figcaption>
      ) : null}
    </figure>
  );
}

function PendingCapture({ capture }: { capture: Capture }) {
  return (
    <div
      role="img"
      aria-label={`Captura pendiente: ${capture.screen} (${capture.route})`}
      className="absolute inset-0 grid place-content-center gap-2 p-6 text-center"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(245,240,232,0.035) 0 1px, transparent 1px 9px)",
      }}
    >
      <span className="font-[family-name:var(--font-tec-mono)] text-[0.625rem] tracking-[0.22em] text-[var(--tec-accent)] uppercase">
        Captura pendiente
      </span>
      <span className="font-[family-name:var(--font-tec-display)] text-sm font-medium text-[var(--tec-txt-2)]">
        {capture.id} · {capture.screen}
      </span>
      <Meta className="block">
        {capture.route} · {CAPTURE_VIEWPORTS[capture.viewport]} · 2×
      </Meta>
      <Meta className="block max-w-[34ch]">
        Anonimizar antes de publicar: sin datos identificables de menores.
      </Meta>
    </div>
  );
}
