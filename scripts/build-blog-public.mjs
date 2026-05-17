import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_ARTICLES, BLOG_CATEGORIES, articleImageSrc, articlePath, categoryPath } from "./blog-config.mjs";
import { escapeHtml, pageShell, siteFooter, siteNav } from "./editorial-shell.mjs";
import { articleSeo } from "./seo-meta.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicBlog = path.join(root, "public", "blog");

function patchArticleHtml(html, article) {
  const canonical = articlePath(article.slug);
  let out = html;

  out = out.replace(/href="assets\//g, 'href="/assets/');
  out = out.replace(/src="assets\//g, 'src="/assets/');
  out = out.replace(/href="index\.html"/g, 'href="/"');
  out = out.replace(/href="sitio-editorial\.html#blog-cinturones"/g, `href="${categoryPath("cinturones")}"`);
  out = out.replace(/href="sitio-editorial\.html#blog-danes"/g, `href="${categoryPath("cinturones")}"`);
  out = out.replace(/href="sitio-editorial\.html#blog-index"/g, 'href="/blog"');
  out = out.replace(/href="sitio-editorial\.html"/g, 'href="/blog"');
  out = out.replace(/href="sitio-editorial\.html#/g, 'href="/blog#');

  for (const other of BLOG_ARTICLES) {
    const legacy = other.source;
    const next = articlePath(other.slug);
    out = out.replaceAll(`href="${legacy}"`, `href="${next}"`);
  }

  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);

  const seo = articleSeo(article);
  const ogImage = articleImageSrc(article.slug, article.image);
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.pageTitle)}</title>`);
  out = out.replace(
    /<meta\s+name="description"[^>]*\/?>/i,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  );
  if (/<meta\s+property="og:title"/i.test(out)) {
    out = out.replace(
      /<meta\s+property="og:title"[^>]*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(seo.pageTitle)}" />`,
    );
    out = out.replace(
      /<meta\s+property="og:description"[^>]*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    );
    out = out.replace(
      /<meta\s+property="og:image"[^>]*\/?>/i,
      `<meta property="og:image" content="${ogImage}" />`,
    );
  }
  if (/"@type":\s*"BlogPosting"/.test(out)) {
    out = out.replace(/"headline":\s*"[^"]*"/, `"headline": ${JSON.stringify(seo.headline)}`);
    out = out.replace(/"description":\s*"[^"]*"/, `"description": ${JSON.stringify(seo.description)}`);
  }

  if (article.category === "cinturones") {
    out = out.replace(/Serie editorial · Los cinturones/g, "Cinturones · Memoria editorial");
    out = out.replace(/Serie editorial · Los dan/g, "Cinturones · Dan");
    out = out.replace(/"articleSection": "Serie editorial · Los cinturones"/g, `"articleSection": "Cinturones"`);
    out = out.replace(/"articleSection": "Serie editorial · Los dan"/g, `"articleSection": "Cinturones"`);
    out = out.replace(/Índice de la serie/g, "Más capítulos");
    out = out.replace(/Índice colores/g, "Más capítulos");
    out = out.replace(/Serie cinturones/g, "Serie · Cinturones");
  }

  const navBlock = siteNav("blog");
  out = out.replace(
    /<nav class="hm-nav__links" aria-label="Principal">[\s\S]*?<\/nav>\s*<nav class="hm-nav__links hm-nav__links--secondary"[\s\S]*?<\/nav>/,
    navBlock.trim(),
  );
  out = out.replace(/<nav class="hm-nav__links" aria-label="Principal">[\s\S]*?<\/nav>/, navBlock.trim());

  out = out.replace(/<footer class="hm-footer">[\s\S]*?<\/footer>/, siteFooter());

  return out;
}

function renderBlogCard(article, { cta = "Leer" } = {}) {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === article.category);
  const meta = article.seriesLabel ?? cat?.label ?? article.category;
  const href = articlePath(article.slug);
  const img = articleImageSrc(article.slug, article.image);
  return `
					<article class="hm-blog-card hm-blog-card--visual" data-category="${article.category}">
						<a class="hm-blog-card__hit" href="${href}">
							<div class="hm-blog-card__media">
								<img src="${img}" alt="" width="640" height="400" loading="lazy" decoding="async" />
							</div>
							<div class="hm-blog-card__body">
								<span class="hm-blog-card__meta">${escapeHtml(meta)}</span>
								<h3 class="hm-blog-card__title">${escapeHtml(article.title)}</h3>
								<p class="hm-blog-card__excerpt">${escapeHtml(article.excerpt)}</p>
								<span class="hm-blog-card__cta">${cta} →</span>
							</div>
						</a>
					</article>`;
}

function renderBlogIndex() {
  const categorySections = BLOG_CATEGORIES.map((cat) => {
    const items = BLOG_ARTICLES.filter((a) => a.category === cat.slug);
    if (!items.length) return "";
    const cards = items
      .map((a) => renderBlogCard(a, { cta: cat.slug === "cinturones" ? "Leer capítulo" : "Leer" }))
      .join("");
    const gridClass = cat.slug === "cinturones" ? "hm-blog-grid hm-blog-grid--belts" : "hm-blog-grid";
    return `
		<section class="hm-blog-group" id="cat-${cat.slug}" data-blog-group="${cat.slug}" aria-labelledby="blog-group-${cat.slug}">
			<div class="hm-wrap">
				<header class="hm-blog-group__head">
					<h2 class="hm-blog-group__title" id="blog-group-${cat.slug}">${escapeHtml(cat.label)}</h2>
					<p class="hm-blog-group__lede">${escapeHtml(cat.lede)}</p>
					<a class="hm-blog-group__all" href="${categoryPath(cat.slug)}">Ver categoría →</a>
				</header>
				<div class="${gridClass}">${cards}</div>
			</div>
		</section>`;
  }).join("");

  const main = `
		<section class="hm-blog-hero" aria-labelledby="blog-title">
			<div class="hm-wrap">
				<p class="hm-hero__eyebrow"><span class="hm-hero__eyebrow-dot" aria-hidden="true"></span> HUMI Journal</p>
				<h1 id="blog-title" class="hm-blog-hero__title">Memoria, movimiento y comunidad</h1>
				<p class="hm-blog-hero__lede">
					Archivo editorial: capítulos de cinturón, filosofía y lecturas largas. Elige una historia — toda la tarjeta es clicable.
				</p>
			</div>
		</section>
		<div class="hm-blog-archive" id="blog-archive">
			${categorySections}
		</div>`;

  return pageShell({
    title: "Blog de Taekwondo · Memoria editorial",
    description:
      "Capítulos de cinturón, filosofía, poomsae y archivo olímpico. Lecturas largas de HUMI Taekwondo en Ensenada, B.C.",
    main,
    activeNav: "blog",
    canonical: "/blog",
    ogImage: "/images/pic11.jpg",
  });
}

function renderCategoryPage(category) {
  const items = BLOG_ARTICLES.filter((a) => a.category === category.slug);
  const cards = items.map((a) => renderBlogCard(a)).join("");

  const main = `
		<section class="hm-section hm-section--tight" aria-labelledby="cat-title">
			<div class="hm-wrap">
				<p class="hm-eyebrow"><a href="/blog">Blog</a> · Categoría</p>
				<h1 class="hm-section__title" id="cat-title">${escapeHtml(category.label)}</h1>
				<p class="hm-section__lede">${escapeHtml(category.lede)}</p>
			</div>
		</section>
		<section class="hm-section">
			<div class="hm-wrap">
				<div class="hm-blog-grid">${cards || "<p>Próximamente.</p>"}</div>
			</div>
		</section>`;

  const catSeo = {
    cinturones: {
      title: "Cinturones · Capítulos editoriales",
      description:
        "Serie de cintas: memoria, identidad y permanencia en el dojang. Relatos editoriales HUMI Taekwondo, Ensenada.",
    },
    journal: {
      title: "Journal olímpico · Taekwondo México",
      description:
        "Sydney 2000 a París 2024: contexto, podios y lecciones del Taekwondo mexicano. Archivo editorial HUMI.",
    },
  }[category.slug];

  return pageShell({
    title: catSeo?.title ?? `${category.label} · Blog Taekwondo`,
    description: catSeo?.description ?? `${category.lede} HUMI Taekwondo · Ensenada, B.C.`,
    main,
    activeNav: category.slug === "disciplina" ? "filosofia" : category.slug === "comunidad" ? "comunidad" : category.slug === "journal" ? "journal" : "blog",
    canonical: categoryPath(category.slug),
    ogImage: "/images/pic06.jpg",
  });
}

function build() {
  if (existsSync(publicBlog)) {
    rmSync(publicBlog, { recursive: true });
  }
  mkdirSync(publicBlog, { recursive: true });

  for (const article of BLOG_ARTICLES) {
    const sourcePath = path.join(root, article.source);
    if (!existsSync(sourcePath)) {
      console.warn(`build-blog: skip missing ${article.source}`);
      continue;
    }
    const html = readFileSync(sourcePath, "utf8");
    const patched = patchArticleHtml(html, article);
    const outDir = path.join(publicBlog, article.slug);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, "index.html"), patched);
    console.log(`build-blog: /blog/${article.slug}`);
  }

  writeFileSync(path.join(publicBlog, "index.html"), renderBlogIndex());
  console.log("build-blog: /blog");

  for (const category of BLOG_CATEGORIES) {
    const catDir = path.join(publicBlog, "categoria", category.slug);
    mkdirSync(catDir, { recursive: true });
    writeFileSync(path.join(catDir, "index.html"), renderCategoryPage(category));
    console.log(`build-blog: /blog/categoria/${category.slug}`);
  }
}

build();
