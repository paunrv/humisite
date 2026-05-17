import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_ARTICLES, articlePath, categoryPath } from "./blog-config.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function routeForLegacySlug(legacySlug) {
  const found = BLOG_ARTICLES.find((a) => a.source === `${legacySlug}.html`);
  return found?.slug ?? legacySlug;
}

const SERIES = [
  {
    slug: "blog-cinturon-blanco-taekwondo",
    belt: "white",
    beltLabel: "Cinturón blanco",
    seoTitle: "Significado del cinturón blanco en Taekwondo | HUMI",
    seoDescription:
      "Inocencia, curiosidad y el instante antes de entender por qué el dojang cambiará todo. Memoria editorial HUMI.",
    heroTitle: "Todo comienza antes de entender por qué",
    quote:
      "Mucha gente entra por razones distintas. Muy pocos comprenden cuánto cambiará el hecho de quedarse.",
    beltMeaning: `El cinturón blanco representa la inocencia, la pureza y una mente vacía.
Es el comienzo, antes de que existan la disciplina, el miedo o la maestría.
El alumno entra sin experiencia, pero con curiosidad.
Con el tiempo, la constancia transforma esa inocencia en fuerza — no porque desaparezca, sino porque aprende a sostenerse.`,
    story: `Existen miles de actividades extracurriculares para niños.
Probé casi todas.

Pero las artes marciales siempre me llamaron la atención.

En realidad no entré hasta que mi mejor amiga lo hizo primero.

Dragon Ball Z, ver televisión con mi hermano mayor y la fantasía de volverse fuerte plantaron semillas diminutas de curiosidad dentro de mí.

La verdad es que nadie entra a un dojang por la misma razón exacta.

Algunos niños son hiperactivos.
Algunos sufren bullying.
Algunos buscan confianza.
Algunos quieren sentirse superhéroes.

Pero con el tiempo entendí algo importante:
la razón por la que entras no es tan importante como la razón por la que te quedas.

En ese momento no sabía nada sobre disciplina, dolor, torneos o perseverancia.

Era simplemente una niña pequeña entrando a un cuarto que, con los años, terminaría moldeando toda su vida.

Recuerdo el olor del tatami, las voces en coreano que aún no entendía, el peso del uniforme nuevo.
Nada de eso parecía trascendental entonces.
Parecía solo un martes más después de la escuela.

Años después, mirando hacia atrás, entiendo que ahí empezó algo que no tenía nombre:
la sensación de que el cuerpo podía aprender a hablar de otra manera.`,
    poomsae: "Kicho 1",
    poomsaeQuery: "Kukkiwon Kicho 1 poomsae",
    reflection:
      "A veces una vida entera comienza con una decisión pequeña que apenas entendemos en el momento.",
    prev: null,
    next: "blog-cinturon-naranja-taekwondo",
  },
  {
    slug: "blog-cinturon-naranja-taekwondo",
    belt: "orange",
    beltLabel: "Cinturón naranja",
    seoTitle: "Cinturón naranja en Taekwondo — Aprender que el progreso existe | HUMI",
    seoDescription:
      "Perseverancia, el primer examen y la primera vez que el camino deja de sentirse como juego. Serie editorial HUMI.",
    heroTitle: "La primera vez que sentí que avanzaba",
    quote: "La disciplina rara vez se siente dramática. La mayor parte del tiempo parece volver.",
    beltMeaning: `El cinturón naranja representa la perseverancia.
El alumno comienza a desarrollar bases más sólidas y aprende que el crecimiento se construye mediante la repetición — no mediante un solo día inspirador.`,
    story: `Hay cinturones naranja de cinco años y otros de cincuenta.

Las artes marciales enseñan algo hermoso:
nunca es demasiado temprano ni demasiado tarde para transformar la vida.

Todavía recuerdo mi primer examen de cinta.

Estoy segura de que no entendí del todo lo que estaba pasando.

Pero recuerdo con claridad romper una tabla.

Recuerdo salir con un color nuevo alrededor de la cintura y darme cuenta de que el Taekwondo avanzaba.
Había niveles.
Había pasos.
Siempre había algo más allá de la versión actual de uno mismo.

Hasta entonces todo seguía pareciendo un juego.

Pero el cinturón naranja me enseñó que la constancia, poco a poco, se convierte en identidad.

El cuerpo empieza a reconocer los movimientos.
La mente empieza a aceptar la corrección.
Sin darte cuenta, el dojang se vuelve familiar.

La perseverancia no suele sentirse inspiradora.
La mayor parte del tiempo simplemente parece presentarse otra vez.`,
    poomsae: "Kicho 2",
    poomsaeQuery: "Kukkiwon Kicho 2 poomsae",
    reflection: "La motivación puede abrir la puerta. La repetición es lo que te cambia.",
    prev: "blog-cinturon-blanco-taekwondo",
    next: "blog-cinturon-amarillo-taekwondo",
  },
  {
    slug: "blog-cinturon-amarillo-taekwondo",
    belt: "yellow",
    beltLabel: "Cinturón amarillo",
    seoTitle: "Cinturón amarillo en Taekwondo — Cuando la confianza empieza | HUMI",
    seoDescription:
      "Raíces bajo la superficie: esfuerzo, resultados y el primer sentido de pertenencia. Memoria editorial HUMI.",
    heroTitle: "Las primeras raíces bajo la superficie",
    quote: "La confianza crece en silencio antes de que alguien la note.",
    beltMeaning: `El cinturón amarillo representa la tierra y las raíces del crecimiento.
El alumno empieza a construir confianza y a comprender que el esfuerzo genera progreso — incluso cuando nadie aplaude.`,
    story: `Un solo año se siente como toda una vida cuando tienes seis años.

De pronto ya no era una de las alumnas más nuevas en la fila.

En casa ya tenía una medalla de tercer lugar en poomsae y una de segundo en combate.

Para un niño, esas victorias pequeñas se sienten enormes.

Fue el primer momento en que entendí de verdad que el esfuerzo crea resultados.

Si atacaba primero, probablemente ganaba.
Si practicaba mis formas, podía avanzar.
Si entrenaba más, podía mejorar.

Ideas simples.

Pero descubrirlas tan joven cambia la manera en que te ves a ti misma.

El cinturón amarillo fue donde la identidad empezó a formarse en silencio.

Empecé a sentir que pertenecía a ese lugar.

No por las medallas en la pared.
Sino porque el cuerpo ya sabía qué hacer cuando el maestro daba una orden.
Porque dejar de ir se sentía, por primera vez, como perder algo.`,
    poomsae: "Taegeuk 1",
    poomsaeQuery: "Kukkiwon Taegeuk 1 poomsae",
    reflection:
      "La confianza no nace de un día para otro. Crece lento, bajo tierra, antes de volverse visible.",
    prev: "blog-cinturon-naranja-taekwondo",
    next: "blog-cinturon-verde-taekwondo",
  },
  {
    slug: "blog-cinturon-verde-taekwondo",
    belt: "green",
    beltLabel: "Cinturón verde",
    seoTitle: "Cinturón verde en Taekwondo — Cuando el dojang se vuelve hogar | HUMI",
    seoDescription:
      "Crecimiento, pertenencia y las tardes que empezaron a tener dirección. Serie editorial HUMI.",
    heroTitle: "Crecer dentro del espacio que te formó",
    quote: "Algunos lugares, poco a poco, se vuelven parte de tu identidad.",
    beltMeaning: `El cinturón verde representa el crecimiento y el fortalecimiento de las raíces.
El alumno desarrolla una conciencia más profunda y una conexión emocional más fuerte con el entrenamiento.`,
    story: `Todo empezó a sentirse familiar.

Sabía cómo fluía la clase.
Sabía quién pateaba más fuerte.
Sabía quién corría más rápido.

También empecé a competir contra mí misma.

Mi cuarto se llenó poco a poco de medallas, trofeos y certificados.
Pero lo más importante no colgaba de la pared.

Lo más importante era que mis tardes ahora tenían dirección.

Mis amigos del dojang se convirtieron en las personas con las que crecí.

Juntos aprendimos a perder, ganar, fallar y continuar.

El cinturón verde fue cuando el Taekwondo dejó de sentirse como una actividad y empezó a ser parte de mi forma de vivir.

El movimiento ya no existía solo en el cuerpo.
También existía en la manera en que pensaba: en la paciencia, en el orgullo contenido, en saber que había algo que valía la pena repetir mañana.`,
    poomsae: "Taegeuk 2 y 3",
    poomsaeQuery: "Kukkiwon Taegeuk 2 poomsae",
    reflection: "Algunos lugares, en silencio, construyen a la persona en la que te conviertes.",
    prev: "blog-cinturon-amarillo-taekwondo",
    next: "blog-cinturon-azul-taekwondo",
  },
  {
    slug: "blog-cinturon-azul-taekwondo",
    belt: "blue",
    beltLabel: "Cinturón azul",
    seoTitle: "Cinturón azul en Taekwondo — La primera vez que sentí miedo | HUMI",
    seoDescription:
      "Permanencia, miedo y madurez: cuando muchos se van y el cielo se expande. Serie editorial HUMI.",
    heroTitle: "Aprender que el miedo también se mueve contigo",
    quote: "Muchos comienzan. Muy pocos permanecen.",
    beltMeaning: `El cinturón azul representa el cielo y la expansión.
Es la etapa en la que el alumno madura y comprende que el aprendizaje nunca termina del todo — solo se vuelve más honesto.`,
    story: `Empezamos siendo más de quince cinturones blancos.
Ahora solo quedábamos cuatro.

Esa fue mi primera lección real sobre la permanencia.

Esta etapa fue difícil.

Por primera vez sentí de verdad el impacto de los combates.
Por primera vez descubrí que la adrenalina no era la única emoción antes de competir.

A veces sentía miedo.

Según el rival, mi cuerpo reaccionaba distinto.

Y aprender eso siendo niña era extraño.

Porque el miedo no desaparece como prometen las películas.

Simplemente aprendes a moverte junto a él.

Los poomsae se volvieron mucho más difíciles.

Honestamente, hubo momentos en los que hubiera podido abandonar si hubiera tenido la opción.

Pero mi madre no dejaba muchas alternativas.

Con el tiempo entendí algo importante:
la disciplina muchas veces llega antes que la motivación.

No porque el entrenamiento fuera mágico.
Sino porque volver, incluso con miedo, enseña que el miedo no tiene la última palabra.`,
    poomsae: "Taegeuk 4 y 5",
    poomsaeQuery: "Kukkiwon Taegeuk 4 poomsae",
    reflection:
      "La madurez no es la ausencia de miedo. Es aprender que el miedo no decide tu dirección.",
    prev: "blog-cinturon-verde-taekwondo",
    next: "blog-cinturon-rojo-taekwondo",
  },
  {
    slug: "blog-cinturon-rojo-taekwondo",
    belt: "red",
    beltLabel: "Cinturón rojo",
    seoTitle: "Cinturón rojo en Taekwondo — Controlarte antes del combate | HUMI",
    seoDescription:
      "Peligro, nervios y la batalla silenciosa antes de subir al ring. Serie editorial HUMI.",
    heroTitle: "La batalla real ocurre antes de entrar al ring",
    quote: "Los nervios no son debilidad. Son energía esperando dirección.",
    beltMeaning: `El cinturón rojo representa el peligro, el control emocional y la madurez.
El alumno desarrolla habilidades avanzadas mientras aprende a controlar la emoción, el ego y el caos interno.`,
    story: `La cinta negra por fin se sentía cerca.

Todo empezó a enfocarse hacia esa meta.

Mi confianza creció enormemente en esta etapa.

Y también aprendí algo que cambió la competencia para siempre:

Sentir nervios no significa que estés derrotada.

Durante mucho tiempo confundí el miedo con la incapacidad.

Pero los nervios son simplemente energía sin dirección.

El cinturón rojo me enseñó que muchos combates se ganan en silencio antes de que empiece el match.

En este punto el talento ya no basta.

Todos son buenos.

La diferencia se vuelve quién sigue entrenando incluso cuando deja de ser divertido.

Recuerdo caminar hacia el área de calentamiento con el estómago apretado, repitiendo formas en la cabeza, fingiendo calma.
Nadie fuera del tatami lo notaba.
Adentro, sí.

Ahí entendí que el control no es no sentir.
Es no dejarse gobernar por lo que sientes.`,
    poomsae: "Taegeuk 6, 7 y 8",
    poomsaeQuery: "Kukkiwon Taegeuk 6 poomsae",
    reflection: "La paz mental también es algo que se entrena.",
    prev: "blog-cinturon-azul-taekwondo",
    next: null,
  },
];

function renderNav(post) {
  const prev = post.prev
    ? `<a href="${articlePath(routeForLegacySlug(post.prev))}">← Anterior</a>`
    : `<span aria-hidden="true"></span>`;
  const next = post.next
    ? `<a href="${articlePath(routeForLegacySlug(post.next))}">Siguiente →</a>`
    : `<span aria-hidden="true"></span>`;
  return `
\t\t\t\t<nav class="hm-editorial__series" aria-label="Serie Cinturones">
\t\t\t\t\t<p class="hm-editorial__series-index">Cinturones · Memoria editorial</p>
\t\t\t\t\t${prev}
\t\t\t\t\t<a href="${categoryPath("cinturones")}">Más capítulos</a>
\t\t\t\t\t${next}
\t\t\t\t</nav>`;
}

function renderPost(post) {
  const youtubePlaceholder = "#poomsae-video";
  return `<!DOCTYPE HTML>
<html lang="es-MX" class="hm">
\t<head>
\t\t<title>${post.seoTitle}</title>
\t\t<meta charset="utf-8" />
\t\t<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
\t\t<meta name="description" content="${post.seoDescription}" />
\t\t<meta property="og:title" content="${post.seoTitle}" />
\t\t<meta property="og:description" content="${post.quote}" />
\t\t<meta property="og:type" content="article" />
\t\t<link rel="preconnect" href="https://fonts.googleapis.com" />
\t\t<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
\t\t<link
\t\t\thref="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
\t\t\trel="stylesheet"
\t\t/>
\t\t<link rel="stylesheet" href="assets/css/humi-redesign.css" />
\t\t<link rel="canonical" href="${articlePath(routeForLegacySlug(post.slug))}" />
\t\t<script type="application/ld+json">
\t\t\t{
\t\t\t\t"@context": "https://schema.org",
\t\t\t\t"@type": "BlogPosting",
\t\t\t\t"headline": ${JSON.stringify(post.heroTitle)},
\t\t\t\t"description": ${JSON.stringify(post.seoDescription)},
\t\t\t\t"author": { "@type": "Organization", "name": "HUMI Taekwondo" },
\t\t\t\t"datePublished": "2026-05-16",
\t\t\t\t"articleSection": "Cinturones"
\t\t\t}
\t\t</script>
\t</head>
\t<body class="hm">
\t\t<a class="hm-skip" href="#main">Saltar al contenido</a>

\t\t<header class="hm-nav" data-hm-nav>
\t\t\t<div class="hm-wrap hm-nav__bar">
\t\t\t\t<a class="hm-logo" href="/">
\t\t\t\t\t<span class="hm-logo__mark" aria-hidden="true"></span>
\t\t\t\t\tHUMI <span>Taekwondo</span>
\t\t\t\t</a>
\t\t\t\t<button
\t\t\t\t\ttype="button"
\t\t\t\t\tclass="hm-nav__toggle"
\t\t\t\t\tdata-hm-nav-toggle
\t\t\t\t\taria-expanded="false"
\t\t\t\t\taria-controls="hm-nav-panel-blog"
\t\t\t\t\taria-label="Abrir menú"
\t\t\t\t>
\t\t\t\t\t<span class="hm-nav__toggle-icon" aria-hidden="true"></span>
\t\t\t\t</button>
\t\t\t\t<div class="hm-nav__panel" id="hm-nav-panel-blog" data-hm-nav-panel>
\t\t\t\t\t<nav class="hm-nav__links" aria-label="Principal">
\t\t\t\t\t\t<a href="/">Inicio</a>
\t\t\t\t\t\t<a href="/blog/categoria/disciplina">Filosofía</a>
\t\t\t\t\t\t<a href="/#programas">Experiencia</a>
\t\t\t\t\t\t<a href="/blog">Blog</a>
\t\t\t\t\t\t<a href="/blog/categoria/comunidad">Comunidad</a>
\t\t\t\t\t\t<a href="/#instructores">Equipo</a>
\t\t\t\t\t\t<a href="/#contacto">Contacto</a>
\t\t\t\t\t</nav>
\t\t\t\t\t<div class="hm-nav__cta">
\t\t\t\t\t\t<a class="hm-btn hm-btn--primary" href="https://wa.me/526461093879" target="_blank" rel="noreferrer noopener">WhatsApp</a>
\t\t\t\t\t\t<a class="hm-btn hm-btn--ghost" href="https://www.instagram.com/humi.taekwondo/" target="_blank" rel="noreferrer noopener">Instagram</a>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t</header>

\t\t<main id="main" class="hm-main">
\t\t\t<article class="hm-article hm-editorial hm-wrap" data-belt="${post.belt}">
\t\t\t\t<header class="hm-editorial__head">
\t\t\t\t\t<p class="hm-eyebrow">Serie editorial · ${post.beltLabel}</p>
\t\t\t\t\t<h1>${post.heroTitle}</h1>
\t\t\t\t</header>

\t\t\t\t<blockquote class="hm-editorial__quote">${post.quote}</blockquote>

\t\t\t\t<section class="hm-editorial__section hm-editorial__belt" aria-labelledby="belt-${post.belt}">
\t\t\t\t\t<h2 class="hm-editorial__section-label" id="belt-${post.belt}">El cinturón</h2>
\t\t\t\t\t<p>${post.beltMeaning.replace(/\n/g, "<br /><br />")}</p>
\t\t\t\t</section>

\t\t\t\t<section class="hm-editorial__section hm-editorial__story hm-prose" aria-label="Memoria personal">
${post.story
  .split("\n\n")
  .map((p) => `\t\t\t\t\t<p>${p.replace(/\n/g, "<br />")}</p>`)
  .join("\n")}
\t\t\t\t</section>

\t\t\t\t<section class="hm-editorial__section hm-editorial__poomsae" aria-labelledby="poomsae-${post.belt}">
\t\t\t\t\t<h2 class="hm-editorial__section-label" id="poomsae-${post.belt}">Poomsae</h2>
\t\t\t\t\t<p class="hm-editorial__poomsae-name">${post.poomsae}</p>
\t\t\t\t\t<a
\t\t\t\t\t\tclass="hm-editorial__poomsae-link"
\t\t\t\t\t\thref="${youtubePlaceholder}"
\t\t\t\t\t\tdata-poomsae-youtube
\t\t\t\t\t>Ver poomsae oficial Kukkiwon</a>
\t\t\t\t\t<p class="hm-editorial__poomsae-note">Placeholder · enlace de YouTube oficial pendiente</p>
\t\t\t\t</section>

\t\t\t\t<footer class="hm-editorial__reflection">
\t\t\t\t\t<p>${post.reflection}</p>
\t\t\t\t</footer>
${renderNav(post)}
\t\t\t</article>
\t\t</main>

\t\t<footer class="hm-footer">
\t\t\t<div class="hm-wrap hm-footer__row">
\t\t\t\t<span>© HUMI Taekwondo · Ensenada</span>
\t\t\t\t<span>
\t\t\t\t\t<a href="/">Inicio</a>
\t\t\t\t\t·
\t\t\t\t\t<a href="${categoryPath("cinturones")}">Serie · Cinturones</a>
\t\t\t\t\t·
\t\t\t\t\t<a href="https://www.facebook.com/HumiTaekwondo/" target="_blank" rel="noreferrer noopener">Facebook</a>
\t\t\t\t</span>
\t\t\t</div>
\t\t</footer>

\t\t<script src="assets/js/humi-redesign.js" defer></script>
\t</body>
</html>
`;
}

for (const post of SERIES) {
  const file = path.join(root, `${post.slug}.html`);
  writeFileSync(file, renderPost(post));
  console.log("wrote", file);
}
