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
      data-signature-panel
      data-index={index}
      className="signature-event relative flex h-full w-[min(88vw,72rem)] shrink-0 snap-start flex-col justify-center px-5 py-10 md:w-[min(82vw,76rem)] md:px-10 md:py-14 lg:px-14"
      aria-labelledby={`signature-event-${event.id}-title`}
      aria-setsize={total}
      aria-posinset={index + 1}
    >
      <div
        className={
          showMedia
            ? "grid h-full min-h-[22rem] w-full items-center gap-8 lg:min-h-[32rem] lg:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.35fr)] lg:gap-12 xl:gap-16"
            : "flex h-full min-h-[22rem] w-full max-w-[40rem] flex-col justify-center lg:min-h-[32rem]"
        }
      >
        <div className="flex min-w-0 flex-col justify-center">
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/25">
            {edition} / {formatEdition(total)}
          </p>

          <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#164A89] md:mt-5">
            {event.year}
          </p>

          <h3
            id={`signature-event-${event.id}-title`}
            className="mt-3 max-w-[16ch] text-[clamp(1.85rem,4.2vw,2.85rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-[#0f0f0f]"
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

          <p className="mt-6 max-w-[36rem] text-[0.975rem] leading-[1.75] text-[#555] md:mt-8 md:text-base">
            {event.description}
          </p>
        </div>

        {showMedia ? (
          <div className="flex h-full min-h-[20rem] min-w-0 w-full items-center lg:min-h-[28rem]">
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
