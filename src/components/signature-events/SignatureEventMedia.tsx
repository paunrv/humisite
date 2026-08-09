import type { SignatureEventMediaLayout } from "@/lib/signature-events";
import Image from "next/image";

type SignatureEventMediaProps = {
  layout: SignatureEventMediaLayout;
  /** Desktop journey: fill the visual column. Mobile stack: sit under copy. */
  variant: "journey" | "stack";
  title: string;
  year: string;
  poster?: string | null;
  photo1?: string | null;
  photo2?: string | null;
  priority?: boolean;
};

function present(...srcs: Array<string | null | undefined>): string[] {
  return srcs.filter((src): src is string => typeof src === "string" && src.length > 0);
}

function Frame({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: {
  src?: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden bg-[#ebebe8] ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : null}
    </figure>
  );
}

/**
 * Media compositions for Signature Events.
 * Supports exactly two layouts: `split` and `double`.
 * Empty frames stay reserved when a curated asset is missing.
 */
export function SignatureEventMedia({
  layout,
  variant,
  title,
  year,
  poster,
  photo1,
  photo2,
  priority = false,
}: SignatureEventMediaProps) {
  const isJourney = variant === "journey";
  const altBase = `${title} — ${year}`;
  const images = present(poster, photo1, photo2);

  const shell = isJourney
    ? "flex w-full max-w-[560px] items-stretch gap-2.5 xl:gap-3"
    : "mt-9 flex w-full max-w-[min(100%,420px)] items-stretch gap-2.5 md:mt-11";

  const sizes = isJourney
    ? "(max-width: 1280px) 28vw, 280px"
    : "(max-width: 768px) 45vw, 210px";

  if (layout === "double") {
    return (
      <div className={shell} data-media-layout="double">
        <Frame
          src={images[0]}
          alt={images[0] ? altBase : ""}
          className="aspect-[3/4] min-w-0 flex-1"
          sizes={sizes}
          priority={priority}
        />
        <Frame
          src={images[1]}
          alt={images[1] ? `${altBase} · detalle` : ""}
          className="aspect-[3/4] min-w-0 flex-1"
          sizes={sizes}
        />
      </div>
    );
  }

  // layout === "split": 1 vertical + 2 stacked horizontals
  return (
    <div className={shell} data-media-layout="split">
      <Frame
        src={images[0]}
        alt={images[0] ? altBase : ""}
        className="aspect-[3/4] min-w-0 flex-1"
        sizes={sizes}
        priority={priority}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 self-stretch">
        <Frame
          src={images[1]}
          alt={images[1] ? `${altBase} · momento` : ""}
          className="min-h-0 w-full flex-1"
          sizes={sizes}
        />
        <Frame
          src={images[2]}
          alt={images[2] ? `${altBase} · comunidad` : ""}
          className="min-h-0 w-full flex-1"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
