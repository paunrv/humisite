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
    tagline: "Para la academia que ya no quiere administrar a ciegas.",
    minSchools: 1,
    features: [
      "Alumnos, grupos y agenda de trabajo",
      "Cobranza con múltiples opciones para papás",
      "Expediente y data de cada alumno",
      "Eventos compartidos con la comunidad",
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
    tagline: "Para agrupaciones y federaciones. Mínimo 10 escuelas.",
    minSchools: 10,
    features: [
      "Red de escuelas bajo una cuenta master",
      "Eventos con logística de alto nivel",
      "Brackets y agenda de competencia",
      "Comunicación clara con el director de agrupación",
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
