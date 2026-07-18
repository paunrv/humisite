import type { Metadata } from "next";
import Link from "next/link";
import { getPrimaryMembership } from "@/lib/schools/queries";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AppHomePage() {
  const membership = await getPrimaryMembership();

  if (!membership) {
    return null;
  }

  const modules = [
    {
      label: "Alumnos",
      status: "Próximo",
      href: null as string | null,
      hint: "Aún no implementado (#16)",
    },
    {
      label: "Clases",
      status: "Próximo",
      href: null,
      hint: "Aún no implementado (#15)",
    },
    {
      label: "Asistencia",
      status: "Próximo",
      href: null,
      hint: "Aún no implementado (#19)",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-[0.18em] text-humi-muted uppercase">
          Escuela activa
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          {membership.school.name}
        </h1>
        <p className="mt-1 text-sm text-humi-muted">
          {membership.role === "school_admin" ? "Admin escuela" : "Coach"}
          {membership.school.city ? ` · ${membership.school.city}` : ""}
        </p>
      </div>

      <div className="rounded-xl border border-humi-accent/30 bg-humi-accent/10 p-4 text-sm">
        <p className="font-medium text-humi-off-white">
          Tu cuenta y escuela están conectadas.
        </p>
        <p className="mt-1 text-humi-muted">
          Los módulos de alumnos, clases y pagos se irán activando en M2. Lo que
          ves en “—” no es un error: todavía no hay datos porque esas pantallas
          no existen.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {modules.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs tracking-wide text-humi-muted uppercase">
                {card.label}
              </p>
              <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] tracking-wide text-humi-muted uppercase">
                {card.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-humi-muted">{card.hint}</p>
            {card.href ? (
              <Link
                href={card.href}
                className="mt-3 inline-block text-sm text-humi-accent-soft hover:underline"
              >
                Abrir
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
