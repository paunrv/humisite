import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_ARTICLES, BLOG_CATEGORIES, articleImageSrc, articlePath, categoryPath } from "./blog-config.mjs";
import { escapeHtml, pageShell, siteFooter, siteNav } from "./editorial-shell.mjs";
import { articleSeo } from "./seo-meta.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicBlog = path.join(root, "public", "blog");

function estimateReadingMinutes(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

function continueReadingLinks(article, limit = 3) {
  const idx = BLOG_ARTICLES.findIndex((a) => a.slug === article.slug);
  const picked = [];
  const seen = new Set([article.slug]);

  const push = (candidate) => {
    if (!candidate || seen.has(candidate.slug) || picked.length >= limit) return;
    seen.add(candidate.slug);
    picked.push(candidate);
  };

  // Next/previous in the same category (series continuity)
  for (let i = idx + 1; i < BLOG_ARTICLES.length && picked.length < limit; i++) {
    if (BLOG_ARTICLES[i].category === article.category) push(BLOG_ARTICLES[i]);
  }
  for (let i = idx - 1; i >= 0 && picked.length < limit; i--) {
    if (BLOG_ARTICLES[i].category === article.category) push(BLOG_ARTICLES[i]);
  }

  // Prefer adjacent thematic categories before falling back to the full archive
  const preferredCategories = {
    movimiento: ["journal", "poomsae", "disciplina"],
    journal: ["movimiento", "disciplina"],
    disciplina: ["poomsae", "movimiento", "cinturones"],
    poomsae: ["disciplina", "movimiento"],
    cinturones: ["disciplina", "comunidad"],
    comunidad: ["cinturones", "disciplina"],
  }[article.category] ?? ["journal", "disciplina", "movimiento"];

  for (const category of preferredCategories) {
    for (const candidate of BLOG_ARTICLES) {
      if (picked.length >= limit) break;
      if (candidate.category === category) push(candidate);
    }
  }

  for (const candidate of BLOG_ARTICLES) {
    if (picked.length >= limit) break;
    push(candidate);
  }

  return picked;
}

function renderContinueReading(article) {
  const links = continueReadingLinks(article);
  if (!links.length) return "";
  const items = links
    .map(
      (a) =>
        `<li><a href="${articlePath(a.slug)}">${escapeHtml(a.seriesLabel ?? a.title)}</a></li>`,
    )
    .join("\n\t\t\t\t\t");
  return `
				<nav class="hm-continue" aria-label="Continuar leyendo">
					<p class="hm-continue__label">Continuar leyendo</p>
					<ul class="hm-continue__list">
					${items}
					</ul>
				</nav>`;
}

function renderArticleMeta(_article, minutes) {
  return `<p class="hm-article__meta"><span>${escapeHtml(String(minutes))} min de lectura</span><span class="hm-article__meta-sep" aria-hidden="true">·</span><span>HUMI Taekwondo</span></p>`;
}

function enhanceArticleMarkup(html, article) {
  const minutes = estimateReadingMinutes(html);
  const meta = renderArticleMeta(article, minutes);
  let out = html;

  // Reading body class — separates article immersion from expressive blog index
  if (!/\bhm-reading\b/.test(out.match(/<body[^>]*>/)?.[0] ?? "")) {
    out = out.replace(/<body class="([^"]*)"/, '<body class="$1 hm-reading"');
  }

  // Drop cap on story/prose opening paragraph
  out = out.replace(
    /class="([^"]*\bhm-editorial__story\b[^"]*\bhm-prose\b[^"]*)"/,
    (match, classes) => {
      if (classes.includes("hm-prose--dropcap")) return match;
      return `class="${classes} hm-prose--dropcap"`;
    },
  );
  out = out.replace(
    /<div class="hm-prose">/,
    '<div class="hm-prose hm-prose--dropcap">',
  );

  // Inject reading meta into article headers
  if (out.includes('class="hm-article__head"')) {
    if (out.includes("hm-article__lede")) {
      out = out.replace(
        /(<p class="hm-article__lede">[\s\S]*?<\/p>)/,
        `$1\n\t\t\t\t\t${meta}`,
      );
    } else {
      out = out.replace(/(<\/h1>)/, `$1\n\t\t\t\t\t${meta}`);
    }
  } else if (out.includes('class="hm-editorial__head"')) {
    out = out.replace(
      /(<header class="hm-editorial__head">[\s\S]*?<\/h1>)/,
      `$1\n\t\t\t\t\t${meta}`,
    );
  }

  // Prefer continue-reading over legacy series nav; keep series as fallback if injection fails
  const continueBlock = renderContinueReading(article);
  if (out.includes('class="hm-editorial__series"')) {
    out = out.replace(
      /<nav class="hm-editorial__series"[\s\S]*?<\/nav>/,
      continueBlock.trim(),
    );
  } else {
    out = out.replace(/<\/article>/, `${continueBlock}\n\t\t\t</article>`);
  }

  return out;
}

function patchArticleHtml(html, article) {
  const canonical = articlePath(article.slug);
  let out = enhanceArticleMarkup(html, article);

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
