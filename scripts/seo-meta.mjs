/**
 * Title & meta description helpers (SERP + Open Graph).
 * Target: title ≤60 chars visible, description 150–158 chars.
 */

export const SEO_BRAND = "HUMI Taekwondo";
export const SEO_LOCATION = "Ensenada, B.C.";

/** @param {string} text */
export function clampMetaDescription(text, max = 158) {
  const t = String(text).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

/**
 * @param {string} primary
 * @param {{ brand?: string, max?: number }} [opts]
 */
export function formatPageTitle(primary, { brand = SEO_BRAND, max = 58 } = {}) {
  const suffix = ` | ${brand}`;
  const full = `${primary}${suffix}`;
  if (full.length <= max + 2) return full;
  const avail = Math.max(24, max - suffix.length);
  const trimmed = primary.slice(0, avail).replace(/\s+\S*$/, "").trim();
  return `${trimmed}…${suffix}`;
}

/**
 * @param {import("./blog-config.mjs").BLOG_ARTICLES[number]} article
 */
export function articleSeo(article) {
  const headline = article.title;
  let primary;

  if (article.seoTitle) {
    primary = article.seoTitle;
  } else if (article.category === "cinturones" && article.seriesLabel) {
    const short = headline.length > 42 ? `${headline.slice(0, 40).replace(/\s+\S*$/, "")}…` : headline;
    primary = `${article.seriesLabel}: ${short}`;
  } else if (article.category === "journal") {
    primary = headline.includes("Taekwondo") ? headline : `${headline} · Taekwondo`;
  } else {
    primary = headline;
  }

  const pageTitle = formatPageTitle(primary);
  const descCore = article.seoDescription ?? article.excerpt;
  const descTail =
    article.category === "cinturones"
      ? " Capítulo editorial · HUMI, Ensenada."
      : article.category === "journal"
        ? " Journal olímpico · HUMI, Ensenada."
        : " · HUMI Taekwondo, Ensenada.";

  const description = clampMetaDescription(`${descCore}${descTail}`);

  return { pageTitle, description, headline };
}

/**
 * @param {{ title: string, description: string, canonical?: string, ogImage?: string, type?: string }} opts
 */
export function socialMetaTags({ title, description, canonical, ogImage = "/images/pic11.jpg", type = "website" }) {
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const t = esc(title);
  const d = esc(description);
  const img = esc(ogImage);
  const canonUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${(process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://humisite.vercel.app").replace(/\/$/, "")}${canonical}`
    : undefined;
  const canon = canonUrl ? `\n\t<meta property="og:url" content="${esc(canonUrl)}" />` : "";
  return `
	<meta property="og:title" content="${t}" />
	<meta property="og:description" content="${d}" />
	<meta property="og:image" content="${img}" />
	<meta property="og:type" content="${type}" />
	<meta property="og:locale" content="es_MX" />${canon}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="${t}" />
	<meta name="twitter:description" content="${d}" />
	<meta name="twitter:image" content="${img}" />`;
}
