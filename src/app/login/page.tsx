import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = params.next?.startsWith("/") ? params.next : "/app";

  return (
    <AuthShell
      title="Entrar a tu escuela"
      subtitle="Staff, o alumno/familia con el correo y contraseña de inscripción."
    >
      {params.error === "auth_callback" ? (
        <p className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          No se pudo confirmar el acceso. Intenta iniciar sesión de nuevo.
        </p>
      ) : null}
      <AuthForm mode="login" action={login} next={next} />
    </AuthShell>
  );
}
