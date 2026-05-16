#!/usr/bin/env python3
"""Generate dan editorial blog HTML files."""
from __future__ import annotations

from pathlib import Path

KUKKIWON = "https://www.youtube.com/@Kukkiwon"
OUT = Path(__file__).resolve().parents[1] / "public"


def p(text: str) -> str:
    return f"\t\t\t\t\t<p>{text}</p>\n"


def h3(text: str) -> str:
    return f"\t\t\t\t\t<h3>{text}</h3>\n"


def nav(prev: tuple[str, str] | None, nxt: tuple[str, str] | None) -> str:
    prev_a = (
        f'<a href="{prev[0]}">← {prev[1]}</a>'
        if prev
        else '<span aria-hidden="true"></span>'
    )
    next_a = (
        f'<a href="{nxt[0]}">{nxt[1]} →</a>' if nxt else '<span aria-hidden="true"></span>'
    )
    return f"""				<nav class="hm-editorial__series" aria-label="Serie Los dan">
					<p class="hm-editorial__series-index">Serie editorial · Los dan</p>
					{prev_a}
					<a href="sitio-editorial.html#blog-danes">Índice de la serie</a>
					{next_a}
				</nav>"""


def render(
    slug: str,
    dan_attr: str,
    page_title: str,
    eyebrow: str,
    h1: str,
    quote: str,
    meta_desc: str,
    significado: list[str],
    story: str,
    poomsae: str,
    reflection: str,
    prev: tuple[str, str] | None,
    nxt: tuple[str, str] | None,
) -> str:
    sig = "".join(p(x) for x in significado)
    return f"""<!DOCTYPE HTML>
<html lang="es-MX" class="hm">
	<head>
		<title>{page_title} | HUMI</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<meta name="description" content="{meta_desc}" />
		<meta property="og:title" content="{page_title} | HUMI" />
		<meta property="og:description" content="{quote}" />
		<meta property="og:type" content="article" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
		<link rel="stylesheet" href="assets/css/humi-redesign.css" />
		<link rel="canonical" href="/{slug}.html" />
		<script type="application/ld+json">
			{{"@context":"https://schema.org","@type":"BlogPosting","headline":"{h1}","description":"{meta_desc}","author":{{"@type":"Organization","name":"HUMI Taekwondo"}},"datePublished":"2026-05-16","articleSection":"Serie editorial · Los dan"}}
		</script>
	</head>
	<body class="hm">
		<a class="hm-skip" href="#main">Saltar al contenido</a>
		<header class="hm-nav" data-hm-nav>
			<div class="hm-wrap hm-nav__bar">
				<a class="hm-logo" href="index.html">
					<span class="hm-logo__mark" aria-hidden="true"></span>
					HUMI <span>Taekwondo</span>
				</a>
				<button type="button" class="hm-nav__toggle" data-hm-nav-toggle aria-expanded="false" aria-controls="hm-nav-panel-blog" aria-label="Abrir menú">
					<span class="hm-nav__toggle-icon" aria-hidden="true"></span>
				</button>
				<div class="hm-nav__panel" id="hm-nav-panel-blog" data-hm-nav-panel>
					<nav class="hm-nav__links" aria-label="Principal">
						<a href="index.html">Inicio</a>
						<a href="sitio-editorial.html#ubicacion">Ubicación</a>
						<a href="sitio-editorial.html#horarios">Horarios</a>
						<a href="sitio-editorial.html#blog-danes">Blog</a>
					</nav>
					<div class="hm-nav__cta">
						<a class="hm-btn hm-btn--primary" href="https://wa.me/526461093879" target="_blank" rel="noreferrer noopener">WhatsApp</a>
						<a class="hm-btn hm-btn--ghost" href="https://www.instagram.com/humi.taekwondo/" target="_blank" rel="noreferrer noopener">Instagram</a>
					</div>
				</div>
			</div>
		</header>
		<main id="main" class="hm-main">
			<article class="hm-article hm-editorial hm-wrap" data-dan="{dan_attr}">
				<header class="hm-editorial__head">
					<p class="hm-eyebrow">{eyebrow}</p>
					<h1>{h1}</h1>
				</header>
				<blockquote class="hm-editorial__quote">{quote}</blockquote>
				<section class="hm-editorial__section hm-editorial__belt" aria-labelledby="sig-{dan_attr}">
					<h2 class="hm-editorial__section-label" id="sig-{dan_attr}">Significado</h2>
{sig}				</section>
				<section class="hm-editorial__section hm-editorial__story hm-prose" aria-labelledby="story-{dan_attr}">
					<h2 class="hm-editorial__section-label" id="story-{dan_attr}">Desarrollo emocional</h2>
{story}				</section>
				<section class="hm-editorial__section hm-editorial__poomsae" aria-labelledby="poom-{dan_attr}">
					<h2 class="hm-editorial__section-label" id="poom-{dan_attr}">Poomsae</h2>
					<p class="hm-editorial__poomsae-name">{poomsae}</p>
					<a class="hm-editorial__poomsae-link" href="{KUKKIWON}" target="_blank" rel="noreferrer noopener">Ver poomsae oficial Kukkiwon</a>
				</section>
				<footer class="hm-editorial__reflection">
					<p><strong>Reflexión final.</strong> {reflection}</p>
				</footer>
{nav(prev, nxt)}
			</article>
		</main>
		<footer class="hm-footer">
			<div class="hm-wrap hm-footer__row">
				<span>© HUMI Taekwondo · Ensenada</span>
				<span>
					<a href="index.html">Inicio</a>
					·
					<a href="sitio-editorial.html#blog-danes">Serie dan</a>
					·
					<a href="https://www.facebook.com/HumiTaekwondo/" target="_blank" rel="noreferrer noopener">Facebook</a>
				</span>
			</div>
		</footer>
		<script src="assets/js/humi-redesign.js" defer></script>
	</body>
</html>
"""


ARTICLES = [
    dict(
        slug="blog-cinta-negra-taekwondo",
        dan_attr="1",
        page_title="Cinta negra en Taekwondo — El inicio que todos confunden con el final",
        eyebrow="Serie editorial · Cinta negra (1.º dan)",
        h1="El inicio que todos confunden con el final",
        quote="La cinta que todos reconocen, pero pocos entienden.",
        meta_desc="Madurez, conciencia y el momento donde entiendes cuánto te falta por recorrer. Serie editorial HUMI.",
        significado=[
            "La cinta negra representa madurez, conocimiento y reflexión.",
            "Es lo opuesto a la cinta blanca: ya no existe inocencia, ahora existe conciencia.",
            "Pero dentro del Taekwondo hay algo importante que pocas personas entienden: la cinta negra no representa el final del aprendizaje. Representa el momento donde el estudiante finalmente comprende cuánto le falta por recorrer.",
            "La oscuridad del negro simboliza profundidad.",
            "La capacidad de seguir aprendiendo incluso después de años de práctica.",
        ],
        story=(
            h3("El año donde el Taekwondo dejó de ser una actividad")
            + p(
                "Fui cinta negra en Tang Soo Do a los nueve años. Ese mismo año me cambié a Taekwondo. Y un año después presenté nuevamente examen para cinta negra."
            )
            + p(
                "A esa edad el Taekwondo ya no era una actividad extracurricular. Era el ritmo completo de mi vida."
            )
            + p(
                "Logré ganarme mi espacio dentro de la selección de Baja California y, sin darme cuenta, todo empezó a girar alrededor del entrenamiento."
            )
            + p("Respiraba Taekwondo. Dormía Taekwondo. Vivía Taekwondo de lunes a domingo.")
            + p(
                "Cuando somos niños pensamos que la cinta negra es una especie de súper poder. Que después de obtenerla finalmente llegas “al final”."
            )
            + p(
                "Pero honestamente, ese grado fue el primero que me hizo consciente de todo lo invisible detrás de ser buena en algo."
            )
            + p(
                "Las horas que nadie ve. La disciplina que nadie celebra. La repetición. El cansancio. La permanencia."
            )
            + p(
                "Porque hay algo que el deporte enseña muy rápido: el talento rara vez sobrevive sin disciplina."
            )
            + h3("La diferencia entre habilidad y madurez")
            + p(
                "En Taekwondo, la cinta negra oficial se entrega después de los dieciséis años. Antes de eso existe la roja-negra."
            )
            + p(
                "Y aunque técnicamente la diferencia parece pequeña, emocionalmente significa muchísimo."
            )
            + p("Porque la habilidad puede llegar temprano. La madurez no.")
            + p(
                "Con el tiempo entendí que crecer no solo significa patear mejor o ganar más peleas. También significa aprender a controlar emociones, sostener compromisos y construir identidad alrededor de algo durante muchos años."
            )
            + p(
                "La cinta negra no me convirtió en alguien distinta. Simplemente confirmó la persona que llevaba años construyéndose en silencio."
            )
        ),
        poomsae="Koryo",
        reflection="La cinta negra nunca fue el final del camino. Fue el momento donde entendí que el movimiento podía convertirse en una forma de vivir.",
        prev=("blog-cinturon-rojo-taekwondo.html", "Cinta roja"),
        nxt=("blog-segundo-dan-taekwondo.html", "Siguiente"),
    ),
    dict(
        slug="blog-segundo-dan-taekwondo",
        dan_attr="2",
        page_title="Segundo dan en Taekwondo — Cuando la disciplina se convierte en identidad",
        eyebrow="Serie editorial · 2.º dan",
        h1="Cuando la disciplina se convierte en identidad",
        quote="Hay un punto donde ya no preguntas si puedes seguir.",
        meta_desc="Consolidación, estabilidad y el momento donde competir deja de sentirse caótico. Serie editorial HUMI.",
        significado=[
            "El segundo dan representa consolidación, estabilidad y profundidad técnica.",
            "En esta etapa el practicante deja de entrenar solamente por motivación.",
            "La disciplina empieza a convertirse en parte de su identidad.",
            "El Taekwondo deja de sentirse temporal.",
        ],
        story=(
            h3("El momento donde competir deja de sentirse caótico")
            + p("Hay un punto dentro del entrenamiento donde ya no cuestionas tanto las cosas.")
            + p("Simplemente sigues.")
            + p("Eso fue segundo dan para mí.")
            + p(
                "Ahí me di cuenta que, a pesar de mi edad, era genuinamente buena en algo. No por accidente. No solamente por talento. Sino por años de permanencia."
            )
            + p("Los combates también cambiaron completamente.")
            + p("Dejaron de sentirse caóticos o impredecibles.")
            + p("El Taekwondo empezó a sentirse plenamente como un deporte.")
            + p("Ganaba quien mejor había entrenado.")
            + p("Y eso transforma muchísimo la relación con el esfuerzo.")
            + p(
                "Porque entiendes que el torneo no es donde se construye el resultado. El resultado ya venía construyéndose desde semanas atrás, dentro del entrenamiento invisible de todos los días."
            )
            + h3("Cuando entrenar deja de sentirse opcional")
            + p("Segundo dan me enseñó algo importante: la verdadera confianza rara vez hace ruido.")
            + p("Ya no necesitas demostrar tanto.")
            + p("Simplemente entrenas.")
            + p("Simplemente avanzas.")
            + p(
                "Y quizá esa sea una de las cosas más hermosas del deporte de alto rendimiento: llega un momento donde la disciplina deja de sentirse pesada y empieza a sentirse natural."
            )
            + p("Como respirar.")
        ),
        poomsae="Keumgang",
        reflection="La disciplina repetida durante años eventualmente deja de ser esfuerzo. Y termina convirtiéndose en personalidad.",
        prev=("blog-cinta-negra-taekwondo.html", "Cinta negra"),
        nxt=("blog-tercer-dan-taekwondo.html", "Siguiente"),
    ),
    dict(
        slug="blog-tercer-dan-taekwondo",
        dan_attr="3",
        page_title="Tercer dan en Taekwondo — El día que planté HUMI",
        eyebrow="Serie editorial · 3.º dan",
        h1="El día que planté HUMI",
        quote="Algunas ideas empiezan como disciplina y terminan convirtiéndose en propósito.",
        meta_desc="Liderazgo, enseñanza y la segunda semilla que cambió todo. Serie editorial HUMI.",
        significado=[
            "El tercer dan representa liderazgo, enseñanza y responsabilidad.",
            "El practicante deja de enfocarse únicamente en su crecimiento personal y comienza a transmitir conocimiento a otras personas.",
            "Aquí el movimiento deja de ser individual.",
        ],
        story=(
            h3("Mi segunda semilla")
            + p("Con este grado obtuve oficialmente mi título como profesora.")
            + p(
                "Por primera vez podía abrir mi propia escuela bajo la supervisión de mi maestro."
            )
            + p(
                "Y aunque hacia afuera parecía simplemente otro grado más, emocionalmente algo había cambiado muchísimo dentro de mí."
            )
            + p("Competir ya no me llamaba igual.")
            + p(
                "Llevaba años manteniendo prácticamente el mismo peso, entrenando constantemente, preparando torneos, exigiéndole muchísimo a mi cuerpo."
            )
            + p("Y poco a poco empezó a crecer otra idea. Más silenciosa. Más profunda.")
            + p("La primera semilla importante de mi vida había sido mi cinta blanca.")
            + p("Esta fue la segunda.")
            + p("La llamamos HUMI.")
            + p("Al principio era pequeña. Frágil incluso.")
            + p(
                "Pero el Taekwondo ya me había enseñado algo importante: las cosas más importantes rara vez empiezan viéndose impresionantes."
            )
            + h3("Enseñar también transforma")
            + p(
                "Tercer dan me hizo entender que enseñar no significa solamente corregir técnicas."
            )
            + p("Significa acompañar procesos.")
            + p("Ver cómo alguien inseguro empieza a confiar en sí mismo.")
            + p("Ver cómo los niños encuentran dirección.")
            + p("Ver cómo el movimiento transforma personas igual que alguna vez me transformó a mí.")
            + p(
                "Ahí entendí que el Taekwondo ya no solamente formaba parte de mi identidad. Ahora también formaba parte de mi propósito."
            )
        ),
        poomsae="Taebaek",
        reflection="Enseñar es descubrir que tu historia puede convertirse en el comienzo de alguien más.",
        prev=("blog-segundo-dan-taekwondo.html", "2.º dan"),
        nxt=("blog-cuarto-dan-taekwondo.html", "Siguiente"),
    ),
    dict(
        slug="blog-cuarto-dan-taekwondo",
        dan_attr="4",
        page_title="Cuarto dan en Taekwondo — Construir una vida a través del movimiento",
        eyebrow="Serie editorial · 4.º dan",
        h1="Construir una vida a través del movimiento",
        quote="La promesa que me negué a romper.",
        meta_desc="Estabilidad, liderazgo y siete años sosteniendo un sueño. Serie editorial HUMI.",
        significado=[
            "El cuarto dan representa estabilidad, liderazgo y madurez a largo plazo.",
            "En esta etapa el practicante entiende que el crecimiento real no ocurre en momentos aislados, sino en años de permanencia, disciplina y constancia.",
            "El Taekwondo deja de medirse solamente en grados o medallas.",
            "Empieza a medirse en vidas impactadas, comunidades construidas y tiempo sostenido.",
        ],
        story=(
            h3("Siete años después")
            + p(
                "Me prometí que no presentaría examen para cuarto dan hasta haber formado al menos una cinta negra propia."
            )
            + p("Y cumplí esa promesa.")
            + p("Siete años después finalmente hice ese examen.")
            + p("Para entonces HUMI también había cambiado muchísimo.")
            + p(
                "Lo que alguna vez comenzó como una pequeña idea ya empezaba a consolidarse como una academia respetada en Ensenada."
            )
            + p("Ya no era solamente un proyecto personal. Era una comunidad creciendo en movimiento.")
            + p("Y quizá esa fue una de las partes más emocionales de ese grado.")
            + p(
                "Porque de niña aprendí que avanzar significaba cambiar de cinta. Pero de adulta entendí que avanzar también significa sostener algo durante años sin abandonarlo."
            )
            + p("Estudiantes creciendo. Familias creciendo.")
            + p(
                "Generaciones completas aprendiendo disciplina, identidad y confianza dentro del mismo espacio."
            )
            + h3("El movimiento ya no solo ocurre en el cuerpo")
            + p("Con el tiempo entendí que gran parte de mi vida había sido guiada por movimiento.")
            + p("No solamente movimiento físico.")
            + p("Movimiento emocional. Movimiento personal. Movimiento colectivo.")
            + p("Mover personas hacia una mejor versión de sí mismas.")
            + p("Mover niños inseguros hacia confianza.")
            + p("Mover familias hacia comunidad.")
            + p(
                "El cuarto dan me enseñó que la permanencia eventualmente construye estructura."
            )
            + p("Y que los sueños más importantes rara vez crecen rápido.")
        ),
        poomsae="Pyongwon",
        reflection="Algunas personas construyen negocios. Otras construyen espacios donde las vidas lentamente cambian de dirección.",
        prev=("blog-tercer-dan-taekwondo.html", "3.º dan"),
        nxt=("blog-quinto-dan-taekwondo.html", "Siguiente"),
    ),
    dict(
        slug="blog-quinto-dan-taekwondo",
        dan_attr="5",
        page_title="Quinto dan en Taekwondo — Ver crecer generaciones",
        eyebrow="Serie editorial · 5.º dan",
        h1="Ver crecer generaciones",
        quote="La belleza de permanecer el tiempo suficiente.",
        meta_desc="Legado, transmisión y el examen más humano de todos. Serie editorial HUMI.",
        significado=[
            "El quinto dan representa legado, transmisión de conocimiento y madurez profunda.",
            "Aquí el practicante entiende que el verdadero crecimiento ya no se trata solamente de sí mismo, sino de las generaciones que continúan avanzando gracias a años de enseñanza y permanencia.",
            "El Taekwondo se convierte en herencia emocional.",
        ],
        story=(
            h3("El examen más humano de todos")
            + p("HUMI cumplió quince años.")
            + p(
                "Y en esa misma etapa hice examen para quinto dan junto a mi sobrino y uno de mis primeros alumnos."
            )
            + p(
                "Un alumno que, curiosamente, había entrado y salido muchas veces durante los años."
            )
            + p("Y quizá por eso mismo el momento fue todavía más especial.")
            + p("Porque entendí que crecer no siempre es lineal.")
            + p("Juntos formamos la séptima generación de cintas negras de HUMI.")
            + p("Y el ambiente de ese examen se sintió distinto.")
            + p("Había madurez. Orgullo. Conciencia. Gratitud.")
            + p("No solamente por el grado.")
            + p(
                "Sino por todo lo que había sobrevivido el tiempo suficiente para llegar hasta ahí."
            )
            + p("Las generaciones. Las historias. Las derrotas.")
            + p("Las veces que casi nadie continuó… y aun así seguimos.")
            + h3("Permanecer también es una forma de amar")
            + p("Cuando somos niños soñamos con volvernos fuertes.")
            + p("Pero crecer enseña algo mucho más profundo:")
            + p(
                "la verdadera belleza está en permanecer el tiempo suficiente para ver crecer a otros contigo."
            )
            + p("Ese examen se sintió mágico.")
            + p("No por perfección. No por técnica.")
            + p(
                "Sino porque todas las personas presentes entendían el peso emocional de los años detrás de ese momento."
            )
        ),
        poomsae="Sipjin",
        reflection="El legado no se construye en una sola victoria. Se construye permaneciendo en movimiento junto a otras personas durante muchos años.",
        prev=("blog-cuarto-dan-taekwondo.html", "4.º dan"),
        nxt=None,
    ),
]

if __name__ == "__main__":
    for a in ARTICLES:
        html = render(**a)
        # Fix accidental motion tags if any slipped in template
        html = html.replace("</div>", "</div>").replace(
            "</div>", "</div>"
        )
        path = OUT / f"{a['slug']}.html"
        path.write_text(html, encoding="utf-8")
        print("wrote", path.name)
