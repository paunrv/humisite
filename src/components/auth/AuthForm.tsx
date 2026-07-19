"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthFormState } from "@/app/login/actions";

type AuthFormProps = {
  mode: "login" | "signup";
  action: (
    prev: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  next?: string;
};

const initialState: AuthFormState = {};

export function AuthForm({ mode, action, next = "/app" }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const isSignup = mode === "signup";

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      {isSignup ? (
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-humi-muted">Nombre</span>
          <input
            name="fullName"
            type="text"
            autoComplete="name"
            className="rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-humi-off-white outline-none ring-humi-accent-soft focus:ring-2"
          />
        </label>
      ) : null}

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-humi-muted">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-humi-off-white outline-none ring-humi-accent-soft focus:ring-2"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-humi-muted">Contraseña</span>
        <input
          name="password"
          type="password"
          required
          minLength={isSignup ? 8 : undefined}
          autoComplete={isSignup ? "new-password" : "current-password"}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-humi-off-white outline-none ring-humi-accent-soft focus:ring-2"
        />
      </label>

      {!isSignup ? <input type="hidden" name="next" value={next} /> : null}

      {state.error ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.error}
        </p>
      ) : null}

      {state.message ? (
        <p className="rounded-md border border-humi-accent/40 bg-humi-accent/15 px-3 py-2 text-sm text-humi-off-white">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-md bg-humi-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-humi-accent-soft disabled:opacity-60"
      >
        {pending
          ? "Espera…"
          : isSignup
            ? "Crear cuenta"
            : "Entrar"}
      </button>

      <p className="text-center text-sm text-humi-muted">
        {isSignup ? (
          <>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-humi-accent-soft hover:underline">
              Inicia sesión
            </Link>
          </>
        ) : (
          <>
            ¿Nueva escuela?{" "}
            <Link href="/signup?plan=escuela" className="text-humi-accent-soft hover:underline">
              Crear cuenta
            </Link>
            {" · "}
            <Link href="/tec" className="text-humi-accent-soft hover:underline">
              Planes
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
