/** Canonical product app (humi-sistema). Marketing CTAs must point here. */

export function productBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_PRODUCT_URL?.replace(/\/$/, "") ||
    "https://app.humi.mx"
  );
}

export function productLoginUrl(next = "/workspace") {
  const n = next.startsWith("/") ? next : `/${next}`;
  return `${productBaseUrl()}/login?next=${encodeURIComponent(n)}`;
}

export function productWorkspaceUrl() {
  return `${productBaseUrl()}/workspace`;
}
