import {
  formatEdition,
  hasRenderableMedia,
  type SignatureEvent,
} from "@/lib/signature-events";
import { SignatureEventMedia } from "@/components/signature-events/SignatureEventMedia";

type SignatureEventChapterProps = {
  event: SignatureEvent;
  index: number;
  total: number;
};

export function SignatureEventChapter({
  event,
  index,
  total,
}: SignatureEventChapterProps) {
  const edition = formatEdition(event.id);
  const showMedia = hasRenderableMedia(event.media);

  return (
    <article
      id={`signature-event-${event.year}`}
      className="signature-event relative scroll-mt-[6.5rem] border-t border-black/[0.06] px-5 py-14 md:px-10 md:py-20"
      aria-labelledby={`signature-event-${event.id}-title`}
      aria-setsize={total}
      aria-posinset={index + 1}
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="max-w-[40rem]">
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/25">
            {edition} / {formatEdition(total)}
          </p>

          <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89] md:mt-5">
            {event.year}
          </p>

          <h3
            id={`signature-event-${event.id}-title`}
            className="mt-3 max-w-[16ch] text-[clamp(1.85rem,6vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#0f0f0f]"
          >
            {event.title}
          </h3>

          <div className="mt-5 space-y-1.5 md:mt-6">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#888] md:text-[0.7rem]">
              {event.category}
            </p>
            {event.guest ? (
              <p className="text-[0.95rem] font-medium tracking-[-0.01em] text-[#444]">
                {event.guest}
              </p>
            ) : null}
            {event.subtitle ? (
              <p className="text-sm leading-snug text-[#999]">{event.subtitle}</p>
            ) : null}
          </div>

          <p className="mt-6 max-w-[34rem] text-[0.975rem] leading-[1.75] text-[#555] md:mt-8 md:text-base">
            {event.description}
          </p>
        </div>

        {showMedia ? (
          <div className="max-w-[820px]">
            <SignatureEventMedia
              title={event.title}
              year={event.year}
              media={event.media}
              priority={index === 0}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
