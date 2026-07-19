/**
 * HUMI-tec public pricing (MXN). Keep in sync with docs/HUMI_TEC_PRICING.md
 */

export type BillingInterval = "monthly" | "yearly";

export type PlanId = "escuela" | "enterprise";

export type TecPlan = {
  id: PlanId;
  name: string;
  tagline: string;
  minSchools: number;
  features: string[];
  ctaLabel: string;
  /** signup query value */
  signupPlan: string;
  prices: Record<
    BillingInterval,
    {
      amountMxn: number;
      /** unit label shown under price */
      per: string;
      stripePriceEnv: string;
    }
  >;
};

export const TEC_CURRENCY = "MXN" as const;

export const TEC_PLANS: TecPlan[] = [
  {
    id: "escuela",
    name: "Escuela",
    tagline: "Para una academia que quiere operar con claridad.",
    minSchools: 1,
    features: [
      "Admin de alumnos, grupos y asistencia",
      "Portal para alumnos y tutores",
      "Roles owner, admin e instructor",
      "Soporte estándar",
    ],
    ctaLabel: "Empezar con Escuela",
    signupPlan: "escuela",
    prices: {
      monthly: {
        amountMxn: 1190,
        per: "por mes",
        stripePriceEnv: "STRIPE_PRICE_ESCUELA_MONTHLY",
      },
      yearly: {
        amountMxn: 11900,
        per: "por año",
        stripePriceEnv: "STRIPE_PRICE_ESCUELA_YEARLY",
      },
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Para federaciones y agrupaciones. Mínimo 10 escuelas.",
    minSchools: 10,
    features: [
      "Cuenta master con billing centralizado",
      "Invita y afilia escuelas en minutos",
      "Dashboard de agrupación",
      "Onboarding asistido para cohorts",
    ],
    ctaLabel: "Hablar de Enterprise",
    signupPlan: "enterprise",
    prices: {
      monthly: {
        amountMxn: 890,
        per: "por escuela / mes",
        stripePriceEnv: "STRIPE_PRICE_ENTERPRISE_MONTHLY",
      },
      yearly: {
        amountMxn: 8900,
        per: "por escuela / año",
        stripePriceEnv: "STRIPE_PRICE_ENTERPRISE_YEARLY",
      },
    },
  },
];

export function formatMxn(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Floor total for enterprise at minimum school count. */
export function enterpriseFloorMxn(interval: BillingInterval): number {
  const plan = TEC_PLANS.find((p) => p.id === "enterprise");
  if (!plan) return 0;
  return plan.prices[interval].amountMxn * plan.minSchools;
}

export function yearlySavingsEscuela(): number {
  const plan = TEC_PLANS.find((p) => p.id === "escuela");
  if (!plan) return 0;
  return plan.prices.monthly.amountMxn * 12 - plan.prices.yearly.amountMxn;
}
