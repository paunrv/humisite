/**
 * Next.js App Router does not map /foo → public/foo/index.html automatically.
 * Generate beforeFiles rewrites for every static editorial page in public/.
 */
import { APP_ROUTES, getSiteRoutes } from "./site-routes.mjs";

const APP_ROUTE_SET = new Set(APP_ROUTES);

/** @returns {{ source: string; destination: string }[]} */
export function getStaticHtmlRewrites() {
  // Skip App Router pages (e.g. /tec) — rewriting them to missing public HTML causes 404.
  const routes = getSiteRoutes().filter((r) => r !== "/" && !APP_ROUTE_SET.has(r));
  // Deeper paths first so /blog/categoria/x wins over /blog/:slug if ever ambiguous
  routes.sort((a, b) => b.split("/").length - a.split("/").length);

  return routes.map((route) => ({
    source: route,
    destination: `${route}/index.html`,
  }));
}
