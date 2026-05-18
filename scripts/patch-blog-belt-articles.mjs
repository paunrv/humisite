import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_ARTICLES, articleImageSrc } from "./blog-config.mjs";
import { BELT_BLOG_ARTICLES, HERO_FRAMING, KUKKIWON_LINK_LABEL } from "./blog-belt-articles.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OG_RE = /<meta\s+property="og:image"[^>]*>\s*/i;
const ALL_HERO_RE = /<figure class="hm-editorial__hero[\s\S]*?<\/figure>\s*/g;
const POOMSAE_RE =
  /<section class="hm-editorial__section hm-editorial__poomsae"[\s\S]*?<\/section>/;
const LD_JSON_RE = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;

/** @param {string} watchUrl */
function youtubeEmbedUrl(watchUrl) {
  try {
    const url = new URL(watchUrl);
    const id = url.searchParams.get("v");
    if (!id) return watchUrl;
    const embed = new URL(`https://www.youtube.com/embed/${id}`);
    const t = url.searchParams.get("t") ?? url.searchParams.get("start");
    if (t) embed.searchParams.set("start", String(t).replace(/\D/g, "") || t);
    return embed.toString();
  } catch {
    return watchUrl;
  }
}

/** @param {string} watchUrl */
function youtubeVideoId(watchUrl) {
  try {
    return new URL(watchUrl).searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

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

/** @param {string} alt */
function formatPoomsaeAlt(alt) {
  const sep = alt.includes("·") ? "·" : alt.includes("|") ? "|" : null;
  if (sep) {
    const [en, ko] = alt.split(sep).map((s) => s.trim());
    return `${en} <span class="hm-editorial__poomsae-sep" aria-hidden="true">·</span> <span lang="ko">${ko}</span>`;
  }
  return alt.replace(/\(Korean: ([^)]+)\)/, '(Korean: <span lang="ko">$1</span>)');
}

function poomsaeItemMarkup({ poomsae, poomsaeAlt, youtube }) {
  const meta = poomsaeAlt
    ? `\n\t\t\t\t\t\t<p class="hm-editorial__poomsae-meta">${formatPoomsaeAlt(poomsaeAlt)}</p>`
    : "";
  const link = youtube
    ? `\n\t\t\t\t\t<a class="hm-editorial__poomsae-link" href="${youtube}" target="_blank" rel="noreferrer noopener" aria-label="Ver ${poomsae} en YouTube — Kukkiwon (abre en una pestaña nueva)">${KUKKIWON_LINK_LABEL}<span class="hm-editorial__poomsae-link-icon" aria-hidden="true">↗</span></a>`
    : "";

  return `\n\t\t\t\t<li class="hm-editorial__poomsae-item">
					<div class="hm-editorial__poomsae-item__body">
						<p class="hm-editorial__poomsae-name">${poomsae}</p>${meta}
					</div>${link}
				</li>`;
}

function poomsaeMarkup(config) {
  const { poomsaeSectionId, poomsaes, poomsae, poomsaeAlt, youtube } = config;
  const items = poomsaes ?? [{ poomsae, poomsaeAlt, youtube: youtube ?? null }];
  const hasVideo = items.some((entry) => entry.youtube);
  const body = items.map((entry) => poomsaeItemMarkup(entry)).join("");
  const formFoot =
    items.length === 1
      ? "Referencia oficial"
      : items.length === 2
        ? "Dos formas"
        : items.length === 3
          ? "Tres formas"
          : `${items.length} formas`;
  const foot = hasVideo ? `\n\t\t\t\t<p class="hm-editorial__poomsae-foot">${formFoot} · canal Kukkiwon</p>` : "";

  return `<section class="hm-editorial__section hm-editorial__poomsae" aria-labelledby="${poomsaeSectionId}">
					<h2 class="hm-editorial__section-label" id="${poomsaeSectionId}">Poomsae</h2>
					<ul class="hm-editorial__poomsae-list">${body}
					</ul>${foot}
				</section>`;
}

function videoObjectForEntry({ poomsae, poomsaeAlt, youtube }) {
  const videoId = youtubeVideoId(youtube);
  const embedUrl = youtubeEmbedUrl(youtube);
  const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined;
  const label = poomsaeAlt?.split("·")[0]?.trim() ?? poomsae;
  return {
    "@type": "VideoObject",
    name: `${poomsae} (${label}) — Poomsae oficial Kukkiwon`,
    description: `Demostración oficial del poomsae ${poomsae}${poomsaeAlt ? ` · ${poomsaeAlt}` : ""}, referencia técnica del canal Kukkiwon en YouTube.`,
    contentUrl: youtube,
    embedUrl,
    ...(thumbnailUrl ? { thumbnailUrl } : {}),
    publisher: {
      "@type": "Organization",
      name: "Kukkiwon",
      sameAs: "https://www.kukkiwon.or.kr/",
    },
  };
}

function upsertVideoSchema(html, config) {
  const entries =
    config.poomsaes ??
    (config.youtube ? [{ poomsae: config.poomsae, poomsaeAlt: config.poomsaeAlt, youtube: config.youtube }] : []);
  const videos = entries.filter((e) => e.youtube).map((e) => videoObjectForEntry(e));
  if (!videos.length || !LD_JSON_RE.test(html)) return html;
  const video = videos.length === 1 ? videos[0] : videos;

  return html.replace(LD_JSON_RE, (block) => {
    try {
      const jsonText = block.replace(/^<script type="application\/ld\+json">\s*/i, "").replace(/\s*<\/script>\s*$/i, "");
      const data = JSON.parse(jsonText);
      if (data["@type"] !== "BlogPosting") return block;
      data.video = video;
      const next = JSON.stringify(data, null, "\t\t\t\t").replace(/^/gm, "\t\t\t\t");
      return `<script type="application/ld+json">\n\t\t\t\t${next.trimStart()}\n\t\t\t</script>`;
    } catch {
      return block;
    }
  });
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
  html = upsertVideoSchema(html, config);

  writeFileSync(file, html);
  const poomsaeLabel = config.poomsaes
    ? config.poomsaes.map((e) => e.poomsae).join(" + ")
    : config.poomsae;
  console.log(`patch-blog-belt: ${slug} → ${config.imageId}, ${poomsaeLabel}`);
}
