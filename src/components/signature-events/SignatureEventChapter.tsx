import {
  formatEdition,
  hasRenderableMedia,
  type SignatureEvent,
} from "@/lib/signature-events";
import {
  SignatureEventMedia,
  featuredIsVertical,
} from "@/components/signature-events/SignatureEventMedia";

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
  const beside = showMedia && featuredIsVertical(event.year, event.media);
  const layoutClass = !showMedia
    ? "signature-event-layout signature-event-layout--copy"
    : beside
      ? "signature-event-layout signature-event-layout--media signature-event-layout--beside"
      : "signature-event-layout signature-event-layout--media signature-event-layout--stack";

  return (
    <article
      id={`signature-event-${event.year}`}
      data-signature-panel
      data-index={index}
      className="signature-event relative snap-start"
      aria-labelledby={`signature-event-${event.id}-title`}
      aria-setsize={total}
      aria-posinset={index + 1}
    >
      <div className={layoutClass}>
        <div className="signature-event-copy">
          <p className="signature-event-kicker">
            <span>
              {edition} / {formatEdition(total)}
            </span>
            <span className="signature-event-year">{event.year}</span>
          </p>

          <h3 id={`signature-event-${event.id}-title`}>{event.title}</h3>

          <div className="signature-event-meta">
            <p className="signature-event-category">{event.category}</p>
            {event.guest ? (
              <p className="signature-event-guest">{event.guest}</p>
            ) : null}
            {event.subtitle ? (
              <p className="signature-event-subtitle">{event.subtitle}</p>
            ) : null}
          </div>

          <p className="signature-event-desc">{event.description}</p>
        </div>

        {showMedia ? (
          <div className="signature-event-media-col">
            <SignatureEventMedia
              title={event.title}
              year={event.year}
              media={event.media}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
