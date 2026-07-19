import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(22,74,137,0.35),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(245,240,232,0.06),_transparent_50%)]"
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Link
            href="/tec"
            className="text-sm tracking-[0.2em] text-humi-muted uppercase hover:text-humi-off-white"
          >
            HUMI-tec
          </Link>
          <Link
            href="/"
            className="text-xs tracking-[0.16em] text-humi-dim uppercase hover:text-humi-muted"
          >
            Academia HUMI
          </Link>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-humi-off-white">
            {title}
          </h1>
          <p className="mt-2 text-sm text-humi-muted">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
