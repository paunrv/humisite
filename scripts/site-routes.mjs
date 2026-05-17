/**
 * All indexable routes (static pages in public/ with index.html).
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, "public");

export const SITE_URL = (process.env.SITE_URL ?? "https://humisite.vercel.app").replace(/\/$/, "");

const SKIP_DIRS = new Set(["assets", "images", "videos", "_next"]);

/**
 * @param {string} dir
 * @param {string} urlPath
 * @returns {string[]}
 */
function collectRoutes(dir, urlPath = "") {
  /** @type {string[]} */
  const routes = [];

  if (urlPath && existsSync(path.join(dir, "index.html"))) {
    routes.push(urlPath);
  }

  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return routes;
  }

  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    const nextPath = urlPath ? `${urlPath}/${name}` : `/${name}`;
    routes.push(...collectRoutes(full, nextPath));
  }

  return routes;
}

/** @returns {string[]} sorted unique paths including / */
export function getSiteRoutes() {
  const routes = collectRoutes(publicDir);
  if (!routes.includes("/")) routes.unshift("/");
  return [...new Set(routes)].sort((a, b) => a.localeCompare(b, "es"));
}

export function absoluteUrl(pathname) {
  const path = pathname === "/" ? "" : pathname;
  return `${SITE_URL}${path}`;
}
