/**
 * Generates sitemap.xml, robots.txt, and HTML map at /sitemap.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_ARTICLES, BLOG_CATEGORIES, articlePath, categoryPath } from "./blog-config.mjs";
import { pageShell, escapeHtml } from "./editorial-shell.mjs";
import {
  GENERACIONES,
  POOMSAE_FORMS,
  PRIMARY_NAV,
  PROGRAMAS,
  SECONDARY_NAV,
} from "./site-config.mjs";
import { absoluteUrl, getSiteRoutes, SITE_URL } from "./site-routes.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, "public");

const today = new Date().toISOString().slice(0, 10);

function priorityFor(route) {
  if (route === "/") return "1.0";
  if (route === "/tec") return "0.95";
  if (route === "/blog" || route === "/sitemap") return "0.9";
  if (route.startsWith("/blog/categoria/")) return "0.75";
  if (route.startsWith("/blog/")) return "0.65";
  if (["/filosofia", "/experiencia", "/contacto", "/comunidad", "/equipo"].includes(route)) {
    return "0.85";
  }
  return "0.7";
}

function changefreqFor(route) {
  if (route === "/" || route === "/blog") return "weekly";
  if (route.startsWith("/blog/")) return "monthly";
  return "monthly";
}

function buildXml() {
  const routes = getSiteRoutes();
  const urls = routes
    .map((route) => {
      const loc = absoluteUrl(route);
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreqFor(route)}</changefreq>
    <priority>${priorityFor(route)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function linkList(items) {
  return `<ul class="hm-sitemap__list">${items.map((i) => `<li><a href="${i.href}">${escapeHtml(i.label)}</a></li>`).join("")}</ul>`;
}

function buildHtmlSitemap() {
  const main = PRIMARY_NAV.map((i) => ({ href: i.href, label: i.label }));
  const secondary = SECONDARY_NAV.map((i) => ({ href: i.href, label: i.label }));
  const programas = PROGRAMAS.map((p) => ({ href: `/programas/${p.slug}`, label: p.label }));
  const poomsae = [
    { href: "/poomsae", label: "Índice Poomsae" },
    ...POOMSAE_FORMS.map((f) => ({ href: `/poomsae/${f.slug}`, label: f.label })),
  ];
  const generaciones = [
    { href: "/generaciones", label: "Generaciones" },
    ...GENERACIONES.map((g) => ({ href: `/generaciones/${g.slug}`, label: g.label })),
  ];
  const blogCats = BLOG_CATEGORIES.map((c) => ({
    href: categoryPath(c.slug),
    label: c.label,
  }));
  const blogArticles = BLOG_ARTICLES.map((a) => ({
    href: articlePath(a.slug),
    label: a.title,
  }));

  const sections = `
		<section class="hm-section hm-section--tight" aria-labelledby="sitemap-title">
			<div class="hm-wrap">
				<p class="hm-eyebrow">SEO · Navegación</p>
				<h1 id="sitemap-title" class="hm-section__title">Mapa del sitio</h1>
				<p class="hm-section__lede">Todas las páginas públicas de HUMI Taekwondo. También disponible para buscadores en <a href="/sitemap.xml">sitemap.xml</a>.</p>
			</div>
		</section>
		<section class="hm-section">
			<div class="hm-wrap hm-sitemap">
				<div class="hm-sitemap__col">
					<h2 class="hm-sitemap__heading">Principal</h2>
					${linkList([
            ...main,
            ...secondary,
            { href: "/internacional", label: "Internacional" },
            { href: "/tec", label: "HUMI-tec" },
            { href: "/login", label: "Portal / Login" },
          ])}
				</div>
				<div class="hm-sitemap__col">
					<h2 class="hm-sitemap__heading">Programas</h2>
					${linkList([{ href: "/programas", label: "Todos los programas" }, ...programas])}
				</div>
				<div class="hm-sitemap__col">
					<h2 class="hm-sitemap__heading">Poomsae</h2>
					${linkList(poomsae)}
				</div>
				<div class="hm-sitemap__col">
					<h2 class="hm-sitemap__heading">Comunidad</h2>
					${linkList(generaciones)}
				</div>
				<div class="hm-sitemap__col hm-sitemap__col--wide">
					<h2 class="hm-sitemap__heading">Blog · Categorías</h2>
					${linkList([{ href: "/blog", label: "Índice del blog" }, ...blogCats])}
				</div>
				<div class="hm-sitemap__col hm-sitemap__col--wide">
					<h2 class="hm-sitemap__heading">Blog · Artículos</h2>
					${linkList(blogArticles)}
				</div>
			</div>
		</section>`;

  return pageShell({
    title: "Mapa del sitio",
    description:
      "Índice de páginas HUMI Taekwondo: filosofía, experiencia, blog, programas, poomsae, generaciones y contacto en Ensenada.",
    main: sections,
    activeNav: "inicio",
    canonical: "/sitemap",
  });
}

writeFileSync(path.join(publicDir, "sitemap.xml"), buildXml());
writeFileSync(path.join(publicDir, "robots.txt"), buildRobots());

const sitemapDir = path.join(publicDir, "sitemap");
mkdirSync(sitemapDir, { recursive: true });
writeFileSync(path.join(sitemapDir, "index.html"), buildHtmlSitemap());

console.log(`build-sitemap: ${getSiteRoutes().length} URLs → sitemap.xml`);
console.log(`build-sitemap: robots.txt → Sitemap: ${SITE_URL}/sitemap.xml`);
console.log("build-sitemap: /sitemap (HTML)");
