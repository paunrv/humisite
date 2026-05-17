import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  COMUNIDAD_SECTIONS,
  EQUIPO_HUMI,
  EQUIPO_WTU,
  EXPERIENCIA_SECTIONS,
  FILOSOFIA_SECTIONS,
  GENERACIONES,
  INTERNACIONAL,
  POOMSAE_FORMS,
  PROGRAMAS,
} from "./site-config.mjs";
import { cardGrid, pageHero, pageShell, sectionBlock, escapeHtml } from "./editorial-shell.mjs";
import { generacionSeo, HUB_SEO, poomsaeSeo, programaSeo } from "./editorial-seo.mjs";
import { clampMetaDescription } from "./seo-meta.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, "public");

function writePage(routeDir, html) {
  const dir = path.join(publicDir, routeDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
  console.log(`build-ia: /${routeDir.replace(/\\/g, "/")}`);
}

function wrapSections(sections) {
  return `
		<section class="hm-section">
			<div class="hm-wrap">
				${cardGrid(sections.map((s) => sectionBlock(s)))}
			</div>
		</section>`;
}

// —— Filosofía ——
writePage(
  "filosofia",
  pageShell({
    title: "Filosofía del Taekwondo",
    description:
      "Movimiento, permanencia y disciplina amable. Filosofía HUMI Taekwondo: dojang en Ensenada con enfoque humano y técnico.",
    activeNav: "filosofia",
    canonical: "/filosofia",
    main:
      pageHero({
        eyebrow: "Filosofía HUMI",
        title: "Desarrollo humano a través del movimiento",
        lede: "No vendemos cinturones. Entrenamos personas que eligen permanecer.",
      }) + wrapSections(FILOSOFIA_SECTIONS),
  }),
);

// —— Experiencia ——
writePage(
  "experiencia",
  pageShell({
    title: "Experiencia en el dojang",
    description:
      "Cómo es una clase en HUMI: calentamiento, técnica y comunidad. Programas por edad, poomsae y combate en Ensenada.",
    activeNav: "experiencia",
    canonical: "/experiencia",
    main:
      pageHero({
        eyebrow: "Experiencia",
        title: "Así se vive el dojang",
        lede: "Cada grupo tiene su ritmo. La ética es la misma: presencia, criterio y calidez.",
      }) + wrapSections(EXPERIENCIA_SECTIONS),
  }),
);

// —— Programas hub + children ——
writePage(
  "programas",
  pageShell({
    title: "Programas de Taekwondo por edad",
    description:
      "Tiny Tigers, Kids, Teens y Adultos: horarios y objetivos por edad. Escuela de Taekwondo HUMI en Ensenada, B.C.",
    activeNav: "experiencia",
    canonical: "/programas",
    main:
      pageHero({
        eyebrow: "Programas",
        title: "Cada etapa, con intención",
        lede: "Elige el grupo que corresponde — nosotros orientamos el resto.",
      }) +
      wrapSections(
        PROGRAMAS.map((p) => ({
          title: p.label,
          body: `${p.age} · ${p.time}. ${p.lede}`,
          href: `/programas/${p.slug}`,
        })),
      ),
  }),
);

for (const p of PROGRAMAS) {
  const seo = programaSeo(p);
  writePage(
    `programas/${p.slug}`,
    pageShell({
      title: seo.title,
      description: seo.description,
      activeNav: "experiencia",
      canonical: `/programas/${p.slug}`,
      ogImage: seo.ogImage,
      main:
        pageHero({ eyebrow: "Programa", title: p.label, lede: p.lede }) +
        `
		<section class="hm-section">
			<div class="hm-wrap hm-prose">
				<p><strong>Edad:</strong> ${escapeHtml(p.age)}</p>
				<p><strong>Horario:</strong> ${escapeHtml(p.time)}</p>
				<p><a href="/contacto">Agendar visita →</a> · <a href="/experiencia">Ver toda la experiencia</a></p>
			</div>
		</section>`,
    }),
  );
}

// —— Poomsae ——
writePage(
  "poomsae",
  pageShell({
    title: HUB_SEO.poomsae.title,
    description: HUB_SEO.poomsae.description,
    activeNav: "poomsae",
    canonical: "/poomsae",
    ogImage: HUB_SEO.poomsae.ogImage,
    main:
      pageHero({
        eyebrow: "Poomsae",
        title: "Memoria en movimiento",
        lede: "Precisión, respiración y la base de todo lo demás en el tatami.",
      }) +
      wrapSections(
        POOMSAE_FORMS.map((f) => ({
          title: f.label,
          body: `Asociado a ${f.belt}. Referencia en el camino editorial.`,
          href: `/poomsae/${f.slug}`,
        })),
      ),
  }),
);

for (const f of POOMSAE_FORMS) {
  const seo = poomsaeSeo(f);
  writePage(
    `poomsae/${f.slug}`,
    pageShell({
      title: seo.title,
      description: seo.description,
      activeNav: "poomsae",
      canonical: `/poomsae/${f.slug}`,
      ogImage: seo.ogImage,
      main:
        pageHero({ eyebrow: "Poomsae", title: f.label, lede: `Nivel: ${f.belt}` }) +
        `
		<section class="hm-section">
			<div class="hm-wrap hm-prose">
				<p>Archivo de referencia. Para estudio en clase, sigue la guía de tu instructor.</p>
				<p><a href="/poomsae">← Todas las formas</a> · <a href="/blog/poomsae-que-es-y-por-que-entrenarlo">¿Qué es el poomsae?</a></p>
			</div>
		</section>`,
    }),
  );
}

// —— Comunidad ——
writePage(
  "comunidad",
  pageShell({
    title: HUB_SEO.comunidad.title,
    description: HUB_SEO.comunidad.description,
    activeNav: "comunidad",
    canonical: "/comunidad",
    ogImage: HUB_SEO.comunidad.ogImage,
    main:
      pageHero({
        eyebrow: "Comunidad",
        title: "Lo que permanece entre clases",
        lede: "Familias, generaciones y memoria compartida.",
      }) + wrapSections(COMUNIDAD_SECTIONS),
  }),
);

// —— Generaciones ——
writePage(
  "generaciones",
  pageShell({
    title: HUB_SEO.generaciones.title,
    description: HUB_SEO.generaciones.description,
    activeNav: "comunidad",
    canonical: "/generaciones",
    ogImage: HUB_SEO.generaciones.ogImage,
    main:
      pageHero({
        eyebrow: "Generaciones",
        title: "Cintas negras que sostienen el dojang",
        lede: "No es un número. Es continuidad.",
      }) +
      wrapSections(
        GENERACIONES.map((g) => ({
          title: g.label,
          body: "Archivo fotográfico y memoria de quienes eligieron quedarse.",
          href: `/generaciones/${g.slug}`,
        })),
      ),
  }),
);

for (const g of GENERACIONES) {
  const img = `/images/${g.image}.jpg`;
  const seo = generacionSeo(g);
  writePage(
    `generaciones/${g.slug}`,
    pageShell({
      title: seo.title,
      description: seo.description,
      activeNav: "comunidad",
      canonical: `/generaciones/${g.slug}`,
      ogImage: seo.ogImage,
      main:
        pageHero({ eyebrow: "Generación", title: g.label, lede: "Permanencia en imagen." }) +
        `
		<section class="hm-section">
			<div class="hm-wrap">
				<figure class="hm-editorial__hero hm-editorial__hero--landscape">
					<img class="hm-editorial__hero-img" src="${img}" alt="${escapeHtml(g.label)}" width="1600" height="900" loading="lazy" />
				</figure>
				<p class="hm-section__lede" style="margin-top:1.5rem"><a href="/generaciones">← Generaciones</a> · <a href="/comunidad">Comunidad</a></p>
			</div>
		</section>`,
    }),
  );
}

// —— Internacional ——
writePage(
  "internacional",
  pageShell({
    title: HUB_SEO.internacional.title,
    description: HUB_SEO.internacional.description,
    activeNav: "journal",
    canonical: "/internacional",
    ogImage: HUB_SEO.internacional.ogImage,
    main:
      pageHero({
        eyebrow: "Internacional",
        title: "Movimiento sin fronteras",
        lede: "Contexto olímpico como espejo — no como única meta.",
      }) +
      `
		<section class="hm-section">
			<div class="hm-wrap">
				${cardGrid(
          INTERNACIONAL.map((item) => ({
            title: item.label,
            body: item.lede,
            href: `/blog/${item.slug === "beijing" ? "beijing-2008-taekwondo-mexico" : item.slug === "tokyo" ? "tokyo-2020-taekwondo-mexico" : "paris-2024-taekwondo-mexico"}`,
          })).map((s) => sectionBlock(s)),
        )}
			</div>
		</section>`,
  }),
);

// —— Equipo ——
const teamCards = (people) =>
  people
    .map(
      (p) => `
					<article class="hm-blog-card hm-ia-card">
						<h2 class="hm-ia-card__title">${escapeHtml(p.name)}</h2>
						<p class="hm-blog-card__meta">${escapeHtml(p.role)}</p>
						<p>${escapeHtml(p.meta)}</p>
					</article>`,
    )
    .join("");

writePage(
  "equipo",
  pageShell({
    title: HUB_SEO.equipo.title,
    description: HUB_SEO.equipo.description,
    activeNav: "equipo",
    canonical: "/equipo",
    ogImage: HUB_SEO.equipo.ogImage,
    main:
      pageHero({
        eyebrow: "Equipo",
        title: "Autoridad con calma",
        lede: "La autoridad viene del criterio. Se corrige con precisión y se acompaña sin humillar.",
      }) +
      `
		<section class="hm-section">
			<div class="hm-wrap">
				<h2 class="hm-section__title" style="font-size:1.15rem;margin-bottom:1rem">HUMI</h2>
				<div class="hm-grid-3">${teamCards(EQUIPO_HUMI)}</div>
				<h2 class="hm-section__title" style="font-size:1.15rem;margin:2rem 0 1rem">WTU México</h2>
				<div class="hm-grid-3">${teamCards(EQUIPO_WTU)}</div>
				<p style="margin-top:1.5rem"><a href="/#instructores">Ver en inicio</a> · <a href="/contacto">Contacto</a></p>
			</div>
		</section>`,
  }),
);

// —— Contacto ——
writePage(
  "contacto",
  pageShell({
    title: "Contacto y visita al dojang",
    description:
      "WhatsApp, dirección en Zona Centro Ensenada, horarios y primera visita. HUMI Taekwondo — escribe y agenda tu clase.",
    activeNav: "contacto",
    canonical: "/contacto",
    main:
      pageHero({
        eyebrow: "Contacto",
        title: "Visita el dojang",
        lede: "Primera visita sin compromiso — llega 10 minutos antes.",
      }) +
      `
		<section class="hm-section" id="ubicacion">
			<div class="hm-wrap">
				<div class="hm-grid-3" style="grid-template-columns:1fr;max-width:42rem">
					<div class="hm-card">
						<p class="hm-eyebrow">Dirección</p>
						<p>C. Séptima 436<br />Zona Centro<br />22800 Ensenada, B.C.</p>
						<p style="margin-top:1rem">
							<a class="hm-btn hm-btn--primary" href="https://wa.me/526461093879" target="_blank" rel="noreferrer noopener">WhatsApp</a>
							<a class="hm-btn hm-btn--ghost" href="https://www.google.com/maps/search/?api=1&amp;query=C.+S%C3%A9ptima+436,+Zona+Centro,+22800+Ensenada" target="_blank" rel="noreferrer noopener">Google Maps</a>
						</p>
					</div>
					<div class="hm-card" id="horarios">
						<p class="hm-eyebrow">Horarios</p>
						<p>Consulta grupos por edad en <a href="/experiencia">Experiencia</a> o escríbenos con la edad del alumno.</p>
						<p>Turno AM adultos: Lun–Jue 7:30–8:30 AM</p>
					</div>
					<div class="hm-card">
						<p class="hm-eyebrow">Redes</p>
						<p><a href="https://www.instagram.com/humi.taekwondo/" target="_blank" rel="noreferrer noopener">@humi.taekwondo</a></p>
						<p><a href="https://www.facebook.com/HumiTaekwondo/" target="_blank" rel="noreferrer noopener">Facebook</a></p>
					</div>
				</div>
			</div>
		</section>`,
  }),
);

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

console.log("build-ia: editorial pages complete");
