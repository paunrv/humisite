import type { SignatureEventMediaLayout } from "@/lib/signature-events";

type SignatureEventMediaProps = {
  layout: SignatureEventMediaLayout;
  /** Desktop journey: fill the visual column. Mobile stack: sit under copy. */
  variant: "journey" | "stack";
};

function Frame({ className }: { className: string }) {
  return (
    <figure
      className={`overflow-hidden bg-[#ebebe8] ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Empty media compositions only — assets come later.
 * Supports exactly two layouts: `split` and `double`.
 */
export function SignatureEventMedia({
  layout,
  variant,
}: SignatureEventMediaProps) {
  const isJourney = variant === "journey";

  const shell = isJourney
    ? "flex w-full max-w-[560px] items-stretch gap-2.5 xl:gap-3"
    : "mt-9 flex w-full max-w-[min(100%,420px)] items-stretch gap-2.5 md:mt-11";

  if (layout === "double") {
    return (
      <div className={shell} data-media-layout="double">
        <Frame className="aspect-[3/4] min-w-0 flex-1" />
        <Frame className="aspect-[3/4] min-w-0 flex-1" />
      </div>
    );
  }

  // layout === "split": 1 vertical + 2 stacked horizontals (right column
  // stretches to the vertical’s height so the pair reads as one composition).
  return (
    <div className={shell} data-media-layout="split">
      <Frame className="aspect-[3/4] min-w-0 flex-1" />
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 self-stretch">
        <Frame className="min-h-0 w-full flex-1" />
        <Frame className="min-h-0 w-full flex-1" />
      </div>
    </div>
  );
}
