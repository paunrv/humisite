/**
 * Next.js App Router does not map /foo → public/foo/index.html automatically.
 * Generate beforeFiles rewrites for every static editorial page in public/.
 */
import { getSiteRoutes } from "./site-routes.mjs";

/** @returns {{ source: string; destination: string }[]} */
export function getStaticHtmlRewrites() {
  const routes = getSiteRoutes().filter((r) => r !== "/");
  // Deeper paths first so /blog/categoria/x wins over /blog/:slug if ever ambiguous
  routes.sort((a, b) => b.split("/").length - a.split("/").length);

  return routes.map((route) => ({
    source: route,
    destination: `${route}/index.html`,
  }));
}
