import {
  formatEdition,
  SIGNATURE_EVENTS,
} from "@/lib/signature-events";
import { SignatureEventChapter } from "./SignatureEventChapter";

const TOTAL = SIGNATURE_EVENTS.length;

export function SignatureEventsSection() {
  return (
    <section
      id="signature-events"
      className="signature-events relative border-t border-black/[0.06] bg-[#f7f7f5]"
      aria-labelledby="signature-events-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 50% -10%, rgba(22,74,137,0.05), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f7f7f5 28%, #f3f3f0 100%)",
        }}
      />

      <div className="relative">
        <header className="mx-auto max-w-[1100px] px-5 pb-8 pt-16 md:px-10 md:pb-10 md:pt-24">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#164A89] md:mb-4">
            Experiencias HUMI
          </p>
          <h2
            id="signature-events-heading"
            className="max-w-[14ch] text-[clamp(1.85rem,7.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#0f0f0f] md:max-w-none"
          >
            Una década de experiencias compartidas.
          </h2>
          <p className="mt-5 max-w-[34ch] text-[clamp(1.05rem,3.8vw,1.4rem)] font-medium leading-[1.5] tracking-[-0.02em] text-[#1a1a1a] md:mt-6 md:max-w-[34rem]">
            Durante más de una década, HUMI ha creado experiencias que unen a
            atletas, familias y campeones.
          </p>
          <p className="mt-3.5 max-w-[34ch] text-[0.975rem] leading-relaxed text-[#666] md:mt-4 md:max-w-[30rem] md:text-base">
            Cada año creamos una experiencia que deja huella.
          </p>

          <div
            role="navigation"
            aria-label="Archivo de experiencias"
            className="mt-8 flex max-w-[40rem] flex-wrap gap-x-1 gap-y-1 font-mono text-[0.7rem] font-medium tracking-[0.1em] text-[#888] md:mt-10 md:text-xs md:tracking-[0.12em]"
          >
            {SIGNATURE_EVENTS.map((event, index) => (
              <span key={event.id} className="inline-flex items-center">
                {index > 0 ? (
                  <span className="mx-1.5 text-black/15" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <a
                  href={`#signature-event-${event.year}`}
                  className="min-h-11 min-w-11 px-0.5 py-2 text-[#666] transition-colors hover:text-[#164A89] md:min-h-0 md:min-w-0"
                >
                  <span className="text-[#164A89]">
                    {formatEdition(index + 1)}
                  </span>
                  <span className="text-black/20"> — </span>
                  {event.year}
                </a>
              </span>
            ))}
          </div>
        </header>

        <div role="region" aria-label="Archivo de Experiencias HUMI">
          {SIGNATURE_EVENTS.map((event, index) => (
            <SignatureEventChapter
              key={event.id}
              event={event}
              index={index}
              total={TOTAL}
            />
          ))}
        </div>

        <footer className="mx-auto max-w-[420px] border-t border-black/[0.06] px-5 pb-16 pt-12 text-center md:pb-24 md:pt-16">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89]">
            ¿Qué sigue?
          </p>
          <p className="mt-5 text-[clamp(1.25rem,2.4vw,1.55rem)] font-semibold leading-snug tracking-[-0.025em] text-[#0f0f0f]">
            Cada año llega un nuevo capítulo.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#666]">
            Ya estamos trabajando en la próxima Experiencia HUMI.
          </p>
        </footer>
      </div>
    </section>
  );
}
