import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { TEC_PLANS } from "@/lib/humi-tec/pricing";
import { signup } from "./actions";

export const metadata: Metadata = {
  title: "Crear cuenta",
  robots: { index: false, follow: false },
};

type SignupPageProps = {
  searchParams: Promise<{ plan?: string; interval?: string }>;
};

function planSubtitle(plan?: string, interval?: string): string {
  const matched = TEC_PLANS.find((p) => p.id === plan || p.signupPlan === plan);
  if (matched?.id === "enterprise") {
    return "Registro Enterprise: después coordinamos la cuenta master y las escuelas afiliadas (mín. 10).";
  }
  if (interval === "yearly") {
    return "Plan Escuela anual. Tras crear tu cuenta, completarás el alta de tu academia.";
  }
  if (matched?.id === "escuela" || plan === "escuela") {
    return "Plan Escuela. Tras crear tu cuenta, completarás el alta de tu academia.";
  }
  return "Empieza con el plan Escuela. Luego puedes unirte a una agrupación.";
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;

  return (
    <AuthShell
      title="Crear cuenta HUMI-tec"
      subtitle={planSubtitle(params.plan, params.interval)}
    >
      <AuthForm mode="signup" action={signup} />
      <p className="mt-4 text-center text-xs text-humi-dim">
        <a href="/tec" className="text-humi-accent-soft hover:underline">
          Ver planes HUMI-tec
        </a>
      </p>
    </AuthShell>
  );
}
