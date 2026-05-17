import { PRIMARY_NAV, SECONDARY_NAV } from "./site-config.mjs";
import { formatPageTitle, socialMetaTags } from "./seo-meta.mjs";

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function siteFooter() {
  return `<footer class="hm-footer">
		<div class="hm-wrap hm-footer__inner">
			<div class="hm-footer__row">
				<span>© HUMI Taekwondo · Ensenada</span>
				<nav class="hm-footer__links" aria-label="Pie de página">
					<a href="/">Inicio</a>
					<a href="/blog">Blog</a>
					<a href="/contacto">Contacto</a>
					<a href="/sitemap">Mapa del sitio</a>
				</nav>
			</div>
			<p class="hm-footer__meta">
				<a href="/sitemap.xml">Sitemap XML</a> · <a href="https://www.instagram.com/humi.taekwondo/" target="_blank" rel="noreferrer noopener">Instagram</a>
			</p>
		</div>
	</footer>`;
}

export function siteNav(active = "inicio") {
  const link = (href, label, key) =>
    `<a href="${href}"${active === key ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`;
  const primary = PRIMARY_NAV.map((item) => link(item.href, item.label, item.key)).join("\n\t\t\t\t\t");
  const secondary = SECONDARY_NAV.map((item) => link(item.href, item.label, item.key)).join("\n\t\t\t\t\t");
  return `
				<nav class="hm-nav__links" aria-label="Principal">
					${primary}
				</nav>
				<nav class="hm-nav__links hm-nav__links--secondary" aria-label="Secundario">
					${secondary}
				</nav>`;
}

export function pageShell({ title, description, main, activeNav = "inicio", canonical, ogImage }) {
  const pageTitle = formatPageTitle(title, { brand: "HUMI Taekwondo" });
  const canon = canonical ? `\n\t<link rel="canonical" href="${escapeHtml(canonical)}" />` : "";
  const social = socialMetaTags({
    title: pageTitle,
    description,
    canonical,
    ogImage: ogImage ?? "/images/pic11.jpg",
  });
  return `<!DOCTYPE html>
<html lang="es-MX" class="hm">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>${escapeHtml(pageTitle)}</title>
	<meta name="description" content="${escapeHtml(description)}" />${canon}${social}
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
	<link rel="stylesheet" href="/assets/css/humi-redesign.css" />
	<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
</head>
<body class="hm hm-editorial-site">
	<a class="hm-skip" href="#contenido">Saltar al contenido</a>
	<header class="hm-nav" data-hm-nav>
		<div class="hm-wrap hm-nav__bar">
			<a class="hm-logo" href="/">
				<span class="hm-logo__mark" aria-hidden="true"></span>
				HUMI <span>Taekwondo</span>
			</a>
			<button type="button" class="hm-nav__toggle" data-hm-nav-toggle aria-expanded="false" aria-controls="hm-nav-panel-site" aria-label="Abrir menú">
				<span class="hm-nav__toggle-icon" aria-hidden="true"></span>
			</button>
			<div class="hm-nav__panel" id="hm-nav-panel-site" data-hm-nav-panel>
				${siteNav(activeNav)}
				<div class="hm-nav__cta">
					<a class="hm-btn hm-btn--primary" href="https://wa.me/526461093879" target="_blank" rel="noreferrer noopener">WhatsApp</a>
					<a class="hm-btn hm-btn--ghost" href="https://www.instagram.com/humi.taekwondo/" target="_blank" rel="noreferrer noopener">Instagram</a>
				</div>
			</div>
		</div>
	</header>
	<main id="contenido">${main}</main>
	${siteFooter()}
	<script src="/assets/js/humi-redesign.js" defer></script>
</body>
</html>`;
}

export function pageHero({ eyebrow, title, lede }) {
  return `
		<section class="hm-hero hm-section--tight" aria-labelledby="page-title">
			<div class="hm-wrap">
				${eyebrow ? `<p class="hm-hero__eyebrow"><span class="hm-hero__eyebrow-dot" aria-hidden="true"></span> ${escapeHtml(eyebrow)}</p>` : ""}
				<h1 id="page-title" class="hm-page-title">${escapeHtml(title)}</h1>
				${lede ? `<p class="hm-hero__lede hm-page-lede">${escapeHtml(lede)}</p>` : ""}
			</div>
		</section>`;
}

export function sectionBlock({ title, body, href }) {
  const link = href ? `<a class="hm-blog-card__link" href="${href}">Explorar →</a>` : "";
  return `
					<article class="hm-blog-card hm-ia-card">
						<h2 class="hm-ia-card__title">${escapeHtml(title)}</h2>
						<p>${escapeHtml(body)}</p>
						${link}
					</article>`;
}

export function cardGrid(items) {
  return `<div class="hm-grid-3 hm-ia-grid">${items.join("")}</div>`;
}
