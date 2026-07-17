import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPrimaryMembership } from "@/lib/schools/queries";

const NAV = [
  { href: "/app", label: "Dashboard", ready: true },
  { href: "/app/alumnos", label: "Alumnos", ready: false },
  { href: "/app/clases", label: "Clases", ready: false },
  { href: "/app/asistencia", label: "Asistencia", ready: false },
  { href: "/app/pagos", label: "Pagos", ready: false },
] as const;

export default async function SchoolShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let membership = null;
  try {
    membership = await getPrimaryMembership();
  } catch {
    redirect("/app/onboarding");
  }

  if (!membership) {
    redirect("/app/onboarding");
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email ||
    "Usuario";

  const roleLabel =
    membership.role === "school_admin"
      ? "Admin"
      : membership.role === "coach"
        ? "Coach"
        : null;

  return (
    <div className="min-h-dvh bg-humi-black text-humi-off-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex min-w-0 items-center gap-6">
            <Link
              href="/app"
              className="shrink-0 text-sm tracking-[0.18em] text-humi-off-white uppercase"
            >
              HUMI
            </Link>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm text-humi-off-white">
                {membership.school.name}
              </p>
              <p className="text-xs text-humi-muted">
                {roleLabel}
                {membership.school.city ? ` · ${membership.school.city}` : ""}
              </p>
            </div>
            <nav className="hidden gap-4 text-sm text-humi-muted md:flex">
              {NAV.map((item) =>
                item.ready ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-humi-off-white hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span key={item.href} className="opacity-40">
                    {item.label}
                  </span>
                ),
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden max-w-[12rem] truncate text-humi-muted lg:inline">
              {displayName}
            </span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-md border border-white/15 px-3 py-1.5 text-humi-muted transition hover:border-white/30 hover:text-humi-off-white"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
