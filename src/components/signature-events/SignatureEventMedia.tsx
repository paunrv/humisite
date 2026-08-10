import type { SignatureEventMediaLayout } from "@/lib/signature-events";
import Image from "next/image";

type SignatureEventMediaProps = {
  layout: SignatureEventMediaLayout;
  /** Desktop journey: fill the visual column. Mobile stack: sit under copy. */
  variant: "journey" | "stack";
  title: string;
  year: string;
  images: string[];
  priority?: boolean;
};

function Frame({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden bg-[#ebebe8] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </figure>
  );
}

/**
 * Renders only the images provided.
 * - `split` → 1 vertical + up to 2 stacked horizontals
 * - `double` → up to 2 equal verticals
 */
export function SignatureEventMedia({
  layout,
  variant,
  title,
  year,
  images,
  priority = false,
}: SignatureEventMediaProps) {
  if (images.length === 0) return null;

  const isJourney = variant === "journey";
  const altBase = `${title} — ${year}`;

  const shell = isJourney
    ? "flex w-full max-w-[560px] items-stretch gap-2.5 xl:gap-3"
    : "mt-9 flex w-full max-w-[min(100%,420px)] items-stretch gap-2.5 md:mt-11";

  const sizes = isJourney
    ? "(max-width: 1280px) 28vw, 280px"
    : "(max-width: 768px) 45vw, 210px";

  if (layout === "double") {
    const frames = images.slice(0, 2);
    return (
      <div className={shell} data-media-layout="double">
        {frames.map((src, i) => (
          <Frame
            key={src}
            src={src}
            alt={i === 0 ? altBase : `${altBase} · detalle`}
            className="aspect-[3/4] min-w-0 flex-1"
            sizes={sizes}
            priority={priority && i === 0}
          />
        ))}
      </div>
    );
  }

  // layout === "split"
  const [vertical, ...stacked] = images;
  const side = stacked.slice(0, 2);

  return (
    <div className={shell} data-media-layout="split">
      <Frame
        src={vertical}
        alt={altBase}
        className="aspect-[3/4] min-w-0 flex-1"
        sizes={sizes}
        priority={priority}
      />
      {side.length > 0 ? (
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 self-stretch">
          {side.map((src, i) => (
            <Frame
              key={src}
              src={src}
              alt={
                i === 0 ? `${altBase} · momento` : `${altBase} · comunidad`
              }
              className="min-h-0 w-full flex-1"
              sizes={sizes}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
