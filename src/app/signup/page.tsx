import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { signup } from "./actions";

export const metadata: Metadata = {
  title: "Crear cuenta",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Empieza con el plan Escuela. Luego puedes unirte a una agrupación."
    >
      <AuthForm mode="signup" action={signup} />
    </AuthShell>
  );
}
