import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_ARTICLES, articleImageSrc } from "./blog-config.mjs";
import { BELT_BLOG_ARTICLES, HERO_FRAMING, KUKKIWON_CTA } from "./blog-belt-articles.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OG_RE = /<meta\s+property="og:image"[^>]*>\s*/i;
const ALL_HERO_RE = /<figure class="hm-editorial__hero[\s\S]*?<\/figure>\s*/g;
const POOMSAE_RE =
  /<section class="hm-editorial__section hm-editorial__poomsae"[\s\S]*?<\/section>/;

function imagePath(blogFileSlug, imageId) {
  const article = BLOG_ARTICLES.find((a) => a.source === `${blogFileSlug}.html`);
  if (article) return articleImageSrc(article.slug, imageId);
  return `/images/${imageId}.jpg`;
}

function heroMarkup(blogFileSlug, { imageId, alt }) {
  const src = imagePath(blogFileSlug, imageId);
  const frame = HERO_FRAMING[imageId] ?? { aspect: "landscape", focus: "50% 50%" };
  return `
				<figure class="hm-editorial__hero hm-editorial__hero--${frame.aspect}" style="--hero-focus: ${frame.focus}">
					<img
						class="hm-editorial__hero-img"
						src="${src}"
						alt="${alt}"
						width="1600"
						height="900"
						fetchpriority="high"
						decoding="async"
					/>
				</figure>

`;
}

function poomsaeMarkup({ poomsae, youtube, poomsaeSectionId }) {
  const link = youtube
    ? `\n\t\t\t\t\t<a class="hm-editorial__poomsae-link" href="${youtube}" target="_blank" rel="noreferrer noopener">${KUKKIWON_CTA}<span class="hm-editorial__poomsae-link-icon" aria-hidden="true">↗</span></a>`
    : "";

  return `<section class="hm-editorial__section hm-editorial__poomsae" aria-labelledby="${poomsaeSectionId}">
					<h2 class="hm-editorial__section-label" id="${poomsaeSectionId}">Poomsae</h2>
					<p class="hm-editorial__poomsae-name">${poomsae}</p>${link}
				</section>`;
}

function upsertOgImage(html, blogFileSlug, imageId) {
  const tag = `<meta property="og:image" content="${imagePath(blogFileSlug, imageId)}" />\n\t\t`;
  if (OG_RE.test(html)) return html.replace(OG_RE, tag);
  return html.replace(
    /(<meta\s+property="og:description"[^>]*\/>)/i,
    `$1\n\t\t${tag.trim()}`,
  );
}

function upsertHero(html, blogFileSlug, config) {
  const hero = heroMarkup(blogFileSlug, config);
  const stripped = html.replace(ALL_HERO_RE, "");
  return stripped.replace(/(<article class="hm-article hm-editorial hm-wrap"[^>]*>)/, `$1${hero}`);
}

for (const [slug, config] of Object.entries(BELT_BLOG_ARTICLES)) {
  const file = path.join(root, `${slug}.html`);
  let html = readFileSync(file, "utf8");

  if (!POOMSAE_RE.test(html)) {
    console.warn(`patch-blog-belt: skip ${slug} — no poomsae section`);
    continue;
  }

  html = upsertOgImage(html, slug, config.imageId);
  html = upsertHero(html, slug, config);
  html = html.replace(POOMSAE_RE, poomsaeMarkup(config));

  writeFileSync(file, html);
  console.log(
    `patch-blog-belt: ${slug} → ${config.imageId}, ${config.poomsae}${config.youtube ? ", youtube" : ""}`,
  );
}
