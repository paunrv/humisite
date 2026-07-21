/** Canonical product app (humi-sistema). Marketing CTAs must point here. */

/** Live deploy URL while app.humi.mx DNS is not configured. */
export const PRODUCT_URL_PILOT = "https://humi-sistema.vercel.app";

/** Branded domain target once DNS + Vercel custom domain are ready. */
export const PRODUCT_URL_BRAND = "https://app.humi.mx";

export function productBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_PRODUCT_URL?.replace(/\/$/, "") || PRODUCT_URL_PILOT
  );
}

export function productLoginUrl(next = "/workspace") {
  const n = next.startsWith("/") ? next : `/${next}`;
  return `${productBaseUrl()}/login?next=${encodeURIComponent(n)}`;
}

export function productWorkspaceUrl() {
  return `${productBaseUrl()}/workspace`;
}
