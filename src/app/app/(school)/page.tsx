import type { Metadata } from "next";
import { getPrimaryMembership } from "@/lib/schools/queries";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AppHomePage() {
  const membership = await getPrimaryMembership();

  // Layout already redirects if missing; narrow for TS.
  if (!membership) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-humi-muted">
          {membership.school.name}
          {membership.school.city ? ` · ${membership.school.city}` : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Alumnos", value: "—" },
          { label: "Clases hoy", value: "—" },
          { label: "Asistencia", value: "—" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-xs tracking-wide text-humi-muted uppercase">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-medium">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-humi-muted">
        <p>
          Rol:{" "}
          <span className="text-humi-off-white">
            {membership.role === "school_admin" ? "Admin escuela" : "Coach"}
          </span>
        </p>
        <p className="mt-2">
          Siguiente en el roadmap: clases y alumnos (M2 / #15–#16).
        </p>
      </div>
    </div>
  );
}
