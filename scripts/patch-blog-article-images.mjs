/**
 * One hero banner per article + og:image from blog-config ARTICLE_IMAGES.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ARTICLE_IMAGES, BLOG_ARTICLES, articleImageSrc } from "./blog-config.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OG_RE = /<meta\s+property="og:image"[^>]*>\s*/i;
const ALL_HERO_RE = /<figure class="hm-editorial__hero[\s\S]*?<\/figure>\s*/g;

function imagePath(slug, imageId) {
  return articleImageSrc(slug, imageId);
}

function heroMarkup(slug, imageId, alt) {
  return `
				<figure class="hm-editorial__hero hm-editorial__hero--landscape" style="--hero-focus: 50% 50%">
					<img
						class="hm-editorial__hero-img"
						src="${imagePath(slug, imageId)}"
						alt="${alt.replace(/"/g, "&quot;")}"
						width="1600"
						height="900"
						fetchpriority="high"
						decoding="async"
					/>
				</figure>

`;
}

function upsertOgImage(html, slug, imageId) {
  const tag = `<meta property="og:image" content="${imagePath(slug, imageId)}" />\n\t\t`;
  if (OG_RE.test(html)) return html.replace(OG_RE, tag);
  return html.replace(
    /(<meta\s+property="og:description"[^>]*\/>)/i,
    `$1\n\t\t${tag.trim()}`,
  );
}

for (const article of BLOG_ARTICLES) {
  const file = path.join(root, article.source);
  let html = readFileSync(file, "utf8");
  const imageId = ARTICLE_IMAGES[article.slug] ?? article.image ?? "pic29";

  html = html.replace(ALL_HERO_RE, "");
  html = upsertOgImage(html, article.slug, imageId);

  const hero = heroMarkup(article.slug, imageId, article.title);
  const articleOpen =
    /<article class="hm-article hm-editorial hm-wrap"[^>]*>/.test(html)
      ? /(<article class="hm-article hm-editorial hm-wrap"[^>]*>)/
      : /(<article class="hm-article hm-wrap">)/;

  if (!articleOpen.test(html)) {
    console.warn(`patch-blog-images: skip ${article.source} — no article wrapper`);
    continue;
  }

  html = html.replace(articleOpen, `$1${hero}`);
  writeFileSync(file, html);
  console.log(`patch-blog-images: ${article.slug} → ${imageId}`);
}
