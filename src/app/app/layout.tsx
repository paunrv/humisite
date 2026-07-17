import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
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

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email ||
    "Usuario";

  return (
    <div className="min-h-dvh bg-humi-black text-humi-off-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/app"
              className="text-sm tracking-[0.18em] text-humi-off-white uppercase"
            >
              HUMI
            </Link>
            <nav className="hidden gap-4 text-sm text-humi-muted sm:flex">
              <span className="text-humi-off-white">Dashboard</span>
              <span className="opacity-40">Alumnos</span>
              <span className="opacity-40">Clases</span>
              <span className="opacity-40">Asistencia</span>
              <span className="opacity-40">Pagos</span>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-humi-muted sm:inline">{displayName}</span>
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
