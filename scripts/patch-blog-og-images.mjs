import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

import { BELT_BLOG_ARTICLES } from "./blog-belt-articles.mjs";

/** slug (no .html) → semantic image basename */
const BLOG_IMAGES = {
  "blog-historia-del-taekwondo": "tkdo-beginning",
  "blog-beijing-2008-taekwondo-mexico": "beijing",
  "blog-paris-2024-taekwondo-mexico": "paris",
  "blog-tokyo-2020-taekwondo-mexico": "tokyo",
  "blog-poomsae-que-es-y-por-que-entrenarlo": "poomsae",
  ...Object.fromEntries(
    Object.entries(BELT_BLOG_ARTICLES).map(([slug, { imageId }]) => [slug, imageId]),
  ),
};

const OG_RE = /<meta\s+property="og:image"[^>]*>\s*/i;

for (const [slug, imageId] of Object.entries(BLOG_IMAGES)) {
  const file = path.join(root, `${slug}.html`);
  let html = readFileSync(file, "utf8");
  const tag = `<meta property="og:image" content="/images/${imageId}.jpg" />\n\t\t`;

  if (OG_RE.test(html)) {
    html = html.replace(OG_RE, tag);
  } else {
    html = html.replace(
      /(<meta\s+property="og:description"[^>]*\/>)/i,
      `$1\n\t\t${tag.trim()}`,
    );
  }

  writeFileSync(file, html);
  console.log(`patch-blog-og: ${slug}.html → /images/${imageId}.jpg`);
}
