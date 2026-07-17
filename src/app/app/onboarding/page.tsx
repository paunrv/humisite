"use client";

import { useActionState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { createSchoolAction, type OnboardingState } from "./actions";

const initialState: OnboardingState = {};

export default function OnboardingPage() {
  const [state, formAction, pending] = useActionState(
    createSchoolAction,
    initialState,
  );

  return (
    <AuthShell
      title="Tu escuela"
      subtitle="Crea el dojang para empezar a llevar alumnos, clases y asistencia."
    >
      <form action={formAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-humi-muted">Nombre de la escuela</span>
          <input
            name="name"
            type="text"
            required
            minLength={2}
            placeholder="HUMI Taekwondo"
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-humi-off-white outline-none ring-humi-accent-soft focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-humi-muted">Ciudad (opcional)</span>
          <input
            name="city"
            type="text"
            placeholder="Ensenada"
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-humi-off-white outline-none ring-humi-accent-soft focus:ring-2"
          />
        </label>

        {state.error ? (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 rounded-md bg-humi-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-humi-accent-soft disabled:opacity-60"
        >
          {pending ? "Creando…" : "Crear escuela"}
        </button>
      </form>
    </AuthShell>
  );
}
