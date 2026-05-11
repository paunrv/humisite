/** Google Maps embed (sección Ubicación) */
const HUMI_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.3753201934683!2d-116.62705212444732!3d31.86920987405615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d893ec6f498c99%3A0x76d0a2c80324fd09!2sHUMI%20%7C%20Taekwondo%2C%20Freestyle%20%26%20Martial%20Fitness!5e0!3m2!1sen!2smx!4v1778012458336!5m2!1sen!2smx";

/** Dirección del dojang (Ubicación, footer y enlaces a mapas) */
const HUMI_ADDRESS_LINES = "C. Séptima 436\nZona Centro\n22800 Ensenada, B.C.";
const HUMI_ADDRESS_MAP_QUERY = encodeURIComponent(
  "C. Séptima 436, Zona Centro, 22800 Ensenada, B.C., México",
);

/** Perfil oficial; las celdas pueden apuntar a cada publicación (Copiar enlace en Instagram). */
const INSTAGRAM_HUMI = "https://www.instagram.com/humi.taekwondo/";

const data = {
  hero: {
    kicker: "ENSENADA · DESARROLLO HUMANO A TRAVÉS DEL TAEKWONDO",
    title: "La confianza no se declara.\nSe entrena.",
    lede:
      "Para padres que buscan estructura emocional, no solo una actividad.\nEl Taekwondo es nuestro lenguaje; la presencia, el punto.",
    ctas: [
      {
        label: "Más información",
        href: "https://wa.me/526461093879",
        variant: "primary",
      },
      { label: "Ver horarios", href: "#schedule", variant: "ghost" },
    ],
    mediaImage: "/images/pic01.jpg",
  },
  instagram: {
    kicker: "INSTAGRAM",
    title: "@humi.taekwondo",
    sub:
      "En HUMI la comunidad es lo importante: por eso desarrollamos una metodología y un programa para asegurar experiencias únicas y un desarrollo íntegro de nuestros alumnos.",
    // Mantén 4 entradas: `image` en /public/images (o URL), `href` con «Copiar enlace» del post, `label` para accesibilidad.
    posts: [
      {
        image: "/images/pic10.png",
        href: INSTAGRAM_HUMI,
        label: "Publicación en Instagram",
      },
      {
        image: "/images/pic11.png",
        href: INSTAGRAM_HUMI,
        label: "Publicación en Instagram",
      },
      {
        image: "/images/pic12.png",
        href: INSTAGRAM_HUMI,
        label: "Publicación en Instagram",
      },
      {
        image: "/images/pic13.png",
        href: INSTAGRAM_HUMI,
        label: "Publicación en Instagram",
      },
    ],
    ctas: [{ label: "Ir a Instagram,", href: INSTAGRAM_HUMI, variant: "ghost" }],
  },
  manifesto: {
    kicker: "MANIFIESTO",
    pyramidLabel: "PROGRESIÓN DE GRADOS",
    pyramidFoot:
      "Cada color se amplía con el cursor; al salir de la pirámide, vuelve el manifiesto.",
    quote:
      "En HUMI el color cuenta lo que estás aprendiendo a ser, no solo lo que sabes hacer.\nPasa el cursor por la pirámide para leer el significado de cada cinta.",
    beltMeanings: {
      black: {
        title: "Cinta Negra",
        paragraphs: [
          "Une técnica, disciplina y carácter. No cierra el camino: abre un Taekwondo más profundo, tras años de constancia, respeto y autocontrol — hasta dominar cuerpo y mente bajo presión.",
          "Va más allá del grado: es compromiso con la excelencia, el liderazgo y la mejora constante.",
        ],
      },
      red: {
        title: "Rojo",
        paragraphs: [
          "La energía empieza a explotar. El estudiante aprende a controlar fuerza, impulsos y emociones mientras desarrolla técnica y enfoque.",
          "Etapa clave en el desarrollo de autocontrol y disciplina en artes marciales.",
        ],
      },
      blue: {
        title: "Azul",
        paragraphs: [
          "La visión se amplía. El practicante entiende estrategia, distancia y ritmo. Ya no solo reacciona: comienza a anticipar.",
          "Formación avanzada de técnica, concentración y lectura corporal.",
        ],
      },
      green: {
        title: "Verde",
        paragraphs: [
          "El crecimiento se vuelve evidente. La constancia empieza a dar resultados físicos y mentales visibles dentro y fuera del tatami.",
          "Nivel enfocado en resistencia, precisión y seguridad personal.",
        ],
      },
      yellow: {
        title: "Amarillo",
        paragraphs: [
          "La luz del conocimiento aparece. El alumno conecta técnica con propósito y desarrolla mayor confianza en combate y movimiento.",
          "Progresión enfocada en coordinación avanzada y liderazgo juvenil.",
        ],
      },
      orange: {
        title: "Naranja",
        paragraphs: [
          "La identidad del practicante se fortalece. Cada entrenamiento pule disciplina, velocidad y mentalidad competitiva.",
        ],
      },
      white: {
        title: "Blanco",
        paragraphs: [
          "Pureza, humildad y potencial infinito. El cinturón blanco representa el valor de comenzar y la valentía de aprender desde cero.",
          "Ideal para niños, adolescentes y adultos que buscan iniciar en taekwondo.",
        ],
      },
    },
    mediaImage: "/images/pic06.jpg",
  },
  programs: {
    kicker: "DOJANG",
    title: "Para quien participa — y para quien decide",
    body:
      "Los niños y jóvenes viven en el dojang; los padres buscan cambios que se notan en casa y en el aula. Cuatro entradas, una misma ética: respeto al proceso, al compañero y a uno mismo.",
    items: [
      {
        title: "Niños (3–6)",
        body: "Primer contacto con límites claros, juego con propósito y seguridad. Semillas de autocontrol y valentía tranquila.",
        href: "#schedule",
        image: "/images/pic07.jpg",
      },
      {
        title: "Niños (7–10)",
        body: "Foco, cuerpo y hábito: lo que se repite en el tatami se traduce en tareas, resiliencia ante el error y mirada al frente.",
        href: "#schedule",
        image: "/images/pic02.jpg",
      },
      {
        title: "Teens (11–16)",
        body: "Identidad en construcción: constancia bajo presión, manejo del estrés y orgullo por el esfuerzo, no por el volumen.",
        href: "#schedule",
        image: "/images/pic05.jpg",
      },
      {
        title: "Adultos",
        body: "Taekwondo, HIIT y pesas en una sola rutina: condición, técnica y cabeza despejada para quien también necesita un lugar serio.",
        href: "#schedule",
        image: "/images/pic17.jpg",
      },
    ],
  },
  instructors: {
    kicker: "EQUIPO",
    title: "Autoridad con calma.",
    body:
      "En HUMI la autoridad viene del criterio: se corrige con precisión y se acompaña sin humillar. Padres entienden el rumbo; los alumnos entienden el estándar del dojang.",
    people: [
      {
        name: "Paulina Noriega Romero Vargas",
        role: "5to Dan — Directora General",
        bio: "Liderazgo técnico y visión de largo plazo: disciplina como estructura amable, y desarrollo humano al centro de la exigencia.",
      },
      {
        name: "Dulce Carolina Curiel",
        role: "3er Dan — Especialista en Poomsae",
        bio: "Control, detalle y progresión medida. Enseña a que la precisión sea una forma de respeto propio.",
      },
      {
        name: "Mario Rodríguez Verti",
        role: "2do Dan — Instructor",
        bio: "Constancia y claridad en cada nivel. Acompaña la evolución técnica como hábito, no como prisa.",
      },
    ],
    fineprint:
      "¿Primera vez en Taekwondo? Empezamos por hábitos seguros y presencia en el dojang. ¿Ya entrenas? Aterrizamos tu nivel sin saltar fundamentos.",
  },
  philosophy: {
    kicker: "ESENCIA",
    title: "Antes del primer saludo en el tatami",
    body:
      "HUMI es tribu con reglas claras, no ruido motivacional. Te decimos qué encontrarás para que la primera vez sea honesta — para ti y para tu hijo o hija.",
    planItems: [
      {
        title: "Lo que entrenamos",
        body: "Seis pilares vivos en cada clase: integridad, respeto, espíritu indomable, cortesía, perseverancia y autocontrol. No lemas de pared: práctica repetida.",
        cta: "Ver prácticas",
        href: "#programs",
      },
      {
        title: "Dojang",
        body: "Grupos por edad, instructores presentes y acuerdos visibles. Sparring, Poomsae y Freestyle en los días que corresponden — siempre con contención.",
        cta: "Horarios",
        href: "#schedule",
      },
      {
        title: "Tu ritmo",
        body: "Progreso por niveles sin vergüenza pública. Defensa personal y herramientas ante el estrés como parte de una vida más capaz, no como show.",
        cta: "Cómo llegar",
        href: "#location",
      },
    ],
    support:
      "Llega 10 minutos antes la primera vez. Si tu hijo o hija es tímido o ansioso, avísanos: ajustamos la bienvenida sin presión.",
  },
  schedule: {
    kicker: "RUTA",
    hoursTag: "Programa de dojang",
    title: "Horarios por edad",
    body:
      "Elige el grupo que corresponde. Cada día tiene su énfasis (Sparring, Poomsae o Freestyle) según la edad. Si no estás seguro, escríbenos: te colocamos donde el reto sea real, no abrumador.",
    footerNote:
      "Sparring, Poomsae y Freestyle aplican según calendario por grupo. En fechas especiales los horarios pueden variar; confirma en sala o por mensaje.",
    footerCta: { label: "Agendar o preguntar →", href: "#location", variant: "primary" },
    groups: [
      {
        age: "3 años",
        days: "Martes, miércoles y jueves",
        time: "3:20 – 3:55 PM",
        types: ["Taekwondo (iniciación)"],
        focus: "Primeras rutinas de cuerpo y atención, con acompañamiento cercano y contención emocional.",
      },
      {
        age: "4–6 años",
        days: "Lunes — Sparring\nMartes y jueves — Programa básico\nViernes — Freestyle",
        time: "4:00 – 4:50 PM",
        types: ["Sparring", "Programa básico", "Freestyle"],
        focus: "Fundamentos, control y hábito de esfuerzo en un espacio seguro y predecible.",
      },
      {
        age: "7–10 años",
        days: "Lunes — Sparring\nMartes y jueves — Programa básico\nMiércoles — Poomsae\nViernes — Freestyle",
        time: "5:00 – 6:00 PM",
        types: ["Sparring", "Programa básico", "Poomsae", "Freestyle"],
        focus: "Técnica, condición y foco: el estándar sube con el cuerpo y con la actitud.",
      },
      {
        age: "11–16 años",
        days: "Lunes — Sparring\nMartes y jueves — Programa básico\nMiércoles — Poomsae\nViernes — Freestyle",
        time: "6:00 – 7:00 PM",
        types: ["Sparring", "Programa básico", "Poomsae", "Freestyle"],
        focus: "Constancia bajo exigencia, compañerismo y mentalidad: fuerza sin necesidad de gritar.",
      },
      {
        age: "Adultos (tarde)",
        days: "Martes y jueves",
        time: "7:00 – 8:00 PM",
        types: ["Taekwondo + HIIT + dumbbells"],
        focus: "Cuerpo fuerte, técnica clara y válvula seria para el estrés del día a día.",
      },
      {
        age: "Adultos (mañana)",
        days: "Lunes a jueves",
        time: "7:30 – 8:30 AM",
        types: ["Taekwondo + HIIT + dumbbells"],
        focus: "Energía y enfoque antes del trabajo: disciplina que cabe en la agenda real.",
      },
    ],
  },
  reviews: {
    kicker: "TESTIMONIOS",
    title: "Historias de quienes ya caminan con HUMI",
    body:
      "La reputación se gana en silencio: orden, técnica y trato. Estas voces son de familias y alumnos que ya eligieron el dojang.",
    note: "Opiniones reales, compartidas con permiso.",
    items: [
      {
        quote:
          "El lugar está súper bien montado y los instructores con gran capacidad técnica… mis nietos están felices y emocionados. ¡Ya se ven campeones!",
        name: "Aurea Torra",
        rating: 5,
      },
      {
        quote:
          "Excelente para hacer ejercicio y aprender técnica. Llevamos a nuestros sobrinos y les fascinó. Todo muy limpio y profesional. Totalmente recomendado.",
        name: "Lucia CM",
        rating: 5,
      },
      {
        quote:
          "No solo encontré un lugar para entrenar, encontré una familia. Clases dinámicas y muy enriquecedoras física y emocionalmente.",
        name: "Tammy Unger",
        rating: 5,
      },
    ],
  },
  blog: {
    kicker: "BLOG",
    title: "Artículos",
    body:
      "Textos sobre Taekwondo, su filosofía y su historia: contexto para entrenar con más claridad dentro y fuera del tatami.",
    posts: [
      {
        title: "Taekwondo y su Filosofía",
        excerpt:
          "La palabra Taekwondo viene del camino del desarrollo físico, mental y emocional… y va mucho más allá de una traducción literal.",
        href: "/blog-taekwondo-y-su-filosofia.html",
        cta: "Leer artículo →",
      },
      {
        title: "Historia del Taekwondo",
        excerpt:
          "Del origen coreano y el General Choi Hong Hi al crecimiento en México: Dai Won Moon, “karate coreano” y la potencia olímpica actual.",
        href: "/blog-historia-del-taekwondo.html",
        cta: "Leer artículo →",
      },
      {
        title: "Juramento, Reglas y Vocabulario del Taekwondo",
        excerpt:
          "Juramento, reglas del dojang y palabras en coreano que escucharás en clase: cultura, respeto y disciplina detrás de cada saludo.",
        href: "/blog-juramento-reglas-y-vocabulario-del-taekwondo.html",
        cta: "Leer artículo →",
      },
      {
        title: "Sydney 2000",
        excerpt:
          "Primera medalla olímpica oficial del Taekwondo mexicano: contexto, repechaje y el bronce que abrió la puerta a una potencia mundial.",
        href: "/blog-victor-estrada-sydney-2000.html",
        cta: "Leer artículo →",
      },
      {
        title: "Atenas 2004",
        excerpt:
          "Óscar Salazar, la plata en -58 kg y la familia Salazar: disciplina, coach José Luis Salazar y el puente olímpico hacia Beijing 2008.",
        href: "/blog-atenas-2004-hermanos-salazar.html",
        cta: "Leer artículo →",
      },
      {
        title: "Beijing 2008",
        excerpt:
          "Doble oro olímpico: Guillermo Pérez y María Espinoza, el contexto post-Sydney y el día en que México se consolidó como potencia en Taekwondo.",
        href: "/blog-beijing-2008-taekwondo-mexico.html",
        cta: "Leer artículo →",
      },
      {
        title: "Londres 2012",
        excerpt:
          "Tras el doble oro, defender el podio: Damián Villa, peto electrónico y el bronce de María Espinoza como prueba de élite sostenida.",
        href: "/blog-londres-2012-taekwondo-mexico.html",
        cta: "Leer artículo →",
      },
      {
        title: "Río 2016",
        excerpt:
          "Taekwondo electrónico, presión heredada de Beijing y la plata de María Espinoza: talento, estructura y el espejo de una nueva era global.",
        href: "/blog-rio-2016-taekwondo-mexico.html",
        cta: "Leer artículo →",
      },
      {
        title: "Tokyo 2020",
        excerpt:
          "Pandemia, el debate María Espinoza vs Briseida Acosta, sin medalla en Taekwondo y el legado de un ciclo olímpico sin precedentes en México.",
        href: "/blog-tokyo-2020-taekwondo-mexico.html",
        cta: "Leer artículo →",
      },
      {
        title: "París 2024",
        excerpt:
          "Post-Tokyo con hambre: Daniela Souza, Carlos Sansores, ranking y la lección de que el circuito no siempre se traduce en podio olímpico.",
        href: "/blog-paris-2024-taekwondo-mexico.html",
        cta: "Leer artículo →",
      },
    ],
  },
  location: {
    kicker: "VISITA",
    title: "Ensenada — puerta abierta con cita",
    headline: "HUMI · Taekwondo con propósito",
    address: HUMI_ADDRESS_LINES,
    // Ejemplo: "https://wa.me/526641234567?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20HUMI"
    whatsappHref: "",
    whatsappLabel: "WhatsApp →",
    mapsHref: `https://www.google.com/maps/search/?api=1&query=${HUMI_ADDRESS_MAP_QUERY}`,
    mapEmbedSrc: HUMI_MAP_EMBED_SRC,
    schedule: [
      { day: "Lunes", hours: "3:20–7:00 pm · 7:30–8:30 am" },
      { day: "Martes", hours: "3:20–8:00 pm · 7:30–8:30 am" },
      { day: "Miércoles", hours: "3:20–7:00 pm · 7:30–8:30 am" },
      { day: "Jueves", hours: "3:20–8:00 pm · 7:30–8:30 am" },
      { day: "Viernes", hours: "3:20–6:00 pm" },
      { day: "Sábado", hours: "—" },
      { day: "Domingo", hours: "—" },
    ],
    note: "Padres: llega unos minutos antes la primera vez. Pregunta por estacionamiento; el equipo te orienta.",
    mapNote: "Mapa vía Google Maps.",
  },
  social: {
    kicker: "COMUNIDAD",
    title: "Menos ruido, más trabajo",
    body:
      "En redes compartimos técnica, silencio antes del esfuerzo y la constancia del equipo.\n¿Respuesta rápida? Mensaje directo o visita en el horario de tu grupo.",
    links: [
      { label: "Instagram →", href: INSTAGRAM_HUMI, variant: "primary" },
      { label: "Facebook →", href: "https://www.facebook.com/HumiTaekwondo/", variant: "ghost" },
    ],
  },
};

const sections = [
  { id: "hero", templateId: "tpl-hero", props: data.hero },
  { id: "instagram", templateId: "tpl-instagram", props: data.instagram },
  { id: "manifesto", templateId: "tpl-manifesto", props: data.manifesto },
  { id: "programs", templateId: "tpl-programs", props: data.programs },
  { id: "philosophy", templateId: "tpl-philosophy", props: data.philosophy },
  { id: "schedule", templateId: "tpl-schedule", props: data.schedule },
  { id: "instructors", templateId: "tpl-instructors", props: data.instructors },
  { id: "reviews", templateId: "tpl-reviews", props: data.reviews },
  { id: "blog", templateId: "tpl-blog", props: data.blog },
  { id: "location", templateId: "tpl-location", props: data.location },
  { id: "social", templateId: "tpl-social", props: data.social },
];

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function createButton({ label, href, variant }) {
  const a = document.createElement("a");
  a.className = variant === "primary" ? "btn btn--primary" : "btn";
  a.href = href;
  a.textContent = label;
  return a;
}

function getTemplate(templateId) {
  const tpl = qs(`#${templateId}`);
  if (!tpl) throw new Error(`Missing template: ${templateId}`);
  return tpl;
}

function bindText(node, selector, value) {
  const el = node.querySelector(selector);
  if (!el || value == null) return;
  el.textContent = value;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function beltMeaningMarkup(entry) {
  const paras = (entry.paragraphs ?? []).map(
    (p) => `<p class="manifesto__beltPara">${escapeHtml(p)}</p>`,
  );
  return `<span class="manifesto__beltName">${escapeHtml(entry.title)}</span>${paras.join("")}`;
}

function bindManifestoBeltMeanings(fragment, props) {
  const quote = fragment.querySelector("[data-manifesto-quote]");
  const figure = fragment.querySelector(".beltPyramid");
  if (!quote || !figure || !props.beltMeanings) return;

  const baseText = props.quote ?? "";
  const meanings = props.beltMeanings;

  const showBase = () => {
    quote.classList.remove("manifesto--beltView");
    quote.textContent = baseText;
  };

  const showBelt = (key) => {
    if (!key) return;
    const entry = meanings[key];
    if (!entry) return;
    quote.classList.add("manifesto--beltView");
    quote.innerHTML = beltMeaningMarkup(entry);
  };

  figure.querySelectorAll("[data-belt]").forEach((tier) => {
    const key = tier.getAttribute("data-belt");
    if (!key) return;
    tier.addEventListener("pointerenter", () => showBelt(key));
  });

  figure.addEventListener("pointerleave", () => {
    showBase();
  });

  figure.addEventListener("focusin", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const tier = t.closest("[data-belt]");
    if (tier) showBelt(tier.getAttribute("data-belt") || "");
  });

  figure.addEventListener("focusout", (e) => {
    const next = e.relatedTarget;
    if (!next || !figure.contains(next)) showBase();
  });
}

function renderTemplate(templateId, props) {
  const tpl = getTemplate(templateId);
  const fragment = tpl.content.cloneNode(true);

  bindText(fragment, "[data-kicker]", props.kicker);
  bindText(fragment, "[data-title]", props.title);
  bindText(fragment, "[data-body]", props.body);
  bindText(fragment, "[data-lede]", props.lede);
  bindText(fragment, "[data-support]", props.support);

  // Hero: actions, media

  const actions = fragment.querySelector("[data-actions]");
  if (actions && Array.isArray(props.ctas)) {
    props.ctas.forEach((cta) => actions.appendChild(createButton(cta)));
  }

  const heroSection = fragment.querySelector("[data-hero-bg]");
  const heroBg = props.mediaImage ?? props.media?.image;
  if (heroSection && heroBg) {
    heroSection.style.setProperty("--hero-bg", `url("${heroBg}")`);
  }

  const manifestoSection = fragment.querySelector("[data-manifesto-bg]");
  if (manifestoSection && props.mediaImage) {
    manifestoSection.style.setProperty("--manifesto-bg", `url("${props.mediaImage}")`);
  }

  bindText(fragment, "[data-manifesto-quote]", props.quote);
  bindText(fragment, "[data-manifesto-pyramid-label]", props.pyramidLabel);
  bindText(fragment, "[data-manifesto-pyramid-foot]", props.pyramidFoot);
  bindManifestoBeltMeanings(fragment, props);

  const instaGrid = fragment.querySelector("[data-instagram-grid]");
  if (instaGrid && Array.isArray(props.posts)) {
    props.posts.forEach((post) => {
      const li = document.createElement("li");
      li.className = "instaGrid__cell";
      const a = document.createElement("a");
      a.className = "instaGrid__link";
      a.href = post.href;
      a.target = "_blank";
      a.rel = "noreferrer noopener";
      a.setAttribute("aria-label", post.label ?? "Ver en Instagram");
      const img = document.createElement("img");
      img.className = "instaGrid__img";
      img.src = post.image;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      a.appendChild(img);
      li.appendChild(a);
      instaGrid.appendChild(li);
    });
  }

  bindText(fragment, "[data-instagram-sub]", props.sub);

  const instaActions = fragment.querySelector("[data-instagram-actions]");
  if (instaActions && Array.isArray(props.ctas)) {
    props.ctas.forEach((cta) => instaActions.appendChild(createButton(cta)));
  }

  const planGrid = fragment.querySelector("[data-plan-items]");
  if (planGrid && Array.isArray(props.planItems)) {
    props.planItems.forEach((item) => {
      const pc = document.createElement("article");
      pc.className = "planCard";
      pc.innerHTML = `
        <h3 class="planCard__title"></h3>
        <p class="planCard__body"></p>
        <a class="planCard__link"></a>`;
      pc.querySelector(".planCard__title").textContent = item.title;
      pc.querySelector(".planCard__body").textContent = item.body;
      const pl = pc.querySelector(".planCard__link");
      pl.textContent = item.cta;
      pl.href = item.href;
      planGrid.appendChild(pc);
    });
  }

  bindText(fragment, "[data-hours-tag]", props.hoursTag);

  // Programs (offerings grid)
  const programs = fragment.querySelector("[data-programs]");
  if (programs && Array.isArray(props.items)) {
    props.items.forEach((item) => {
      const tone = Math.min(4, Math.max(1, Number(item.tone) || 1));
      const art = document.createElement("article");
      art.className = "offering";
      const href = item.href ?? "#";
      art.innerHTML = `
        <a class="offering__link" href="${href}">
          <div class="offering__media" aria-hidden="true"></div>
          <div class="offering__body">
            <h3 class="offering__title"></h3>
            <p class="offering__desc"></p>
            <span class="offering__cta">Ver tu grupo</span>
          </div>
        </a>`;
      const media = art.querySelector(".offering__media");
      if (item.image) {
        media.classList.add("offering__media--photo");
        media.style.backgroundImage = `linear-gradient(180deg, transparent 28%, rgba(10,10,9,0.92) 100%), url("${item.image}")`;
        media.style.backgroundSize = "cover";
        media.style.backgroundPosition = "center";
      } else {
        media.classList.add(`offering__media--${tone}`);
      }
      art.querySelector(".offering__title").textContent = item.title;
      art.querySelector(".offering__desc").textContent = item.body;
      programs.appendChild(art);
    });
  }

  // Instructors
  const instructors = fragment.querySelector("[data-instructors]");
  if (instructors && Array.isArray(props.people)) {
    props.people.forEach((person) => {
      const card = document.createElement("article");
      card.className = "person";
      card.innerHTML = `
        <div class="person__top">
          <div class="person__avatar" aria-hidden="true"></div>
          <div class="person__head">
            <h3 class="person__name"></h3>
            <p class="person__meta"></p>
          </div>
        </div>
        <p class="p person__bio"></p>
      `;
      card.querySelector(".person__name").textContent = person.name;
      const meta = [person.role, person.rank, person.years].filter(Boolean).join(" · ");
      card.querySelector(".person__meta").textContent = meta;
      card.querySelector(".person__bio").textContent = person.bio;
      instructors.appendChild(card);
    });
  }

  bindText(fragment, "[data-fineprint]", props.fineprint);

  // Reviews
  const reviews = fragment.querySelector("[data-reviews]");
  if (reviews && Array.isArray(props.items)) {
    props.items.forEach((review) => {
      const card = document.createElement("article");
      card.className = "card review";
      card.innerHTML = `
        <div class="review__stars" aria-label=""></div>
        <blockquote class="review__quote"></blockquote>
        <p class="review__name"></p>
      `;
      const stars = Math.max(1, Math.min(5, Number(review.rating ?? 5)));
      const starsEl = card.querySelector(".review__stars");
      starsEl.textContent = "★★★★★".slice(0, stars) + "☆☆☆☆☆".slice(0, 5 - stars);
      starsEl.setAttribute("aria-label", `${stars} de 5`);
      card.querySelector(".review__quote").textContent = `“${review.quote}”`;
      card.querySelector(".review__name").textContent = review.name;
      reviews.appendChild(card);
    });
  }

  bindText(fragment, "[data-reviews-note]", props.note);

  // Blog
  const blogPosts = fragment.querySelector("[data-blog-posts]");
  if (blogPosts && Array.isArray(props.posts)) {
    blogPosts.innerHTML = "";
    props.posts.forEach((post) => {
      const card = document.createElement("article");
      card.className = "blogPostCard";
      card.innerHTML = `
        <h3 class="blogPostCard__title"></h3>
        <p class="blogPostCard__excerpt p"></p>
        <div class="blogPostCard__cta"></div>`;

      card.querySelector(".blogPostCard__title").textContent = post.title ?? "";
      card.querySelector(".blogPostCard__excerpt").textContent = post.excerpt ?? "";

      const cta = createButton({
        label: post.cta ?? "Leer artículo →",
        href: post.href ?? "#",
        variant: "primary",
      });
      const ctaWrap = card.querySelector(".blogPostCard__cta");
      if (ctaWrap && cta) ctaWrap.appendChild(cta);

      blogPosts.appendChild(card);
    });
  }

  // Location + Schedule
  bindText(fragment, "[data-location-headline]", props.headline);
  bindText(fragment, "[data-address]", props.address);
  bindText(fragment, "[data-location-note]", props.note);
  bindText(fragment, "[data-map-note]", props.mapNote);

  const mapsLink = fragment.querySelector("[data-maps-link]");
  if (mapsLink && props.mapsHref) mapsLink.href = props.mapsHref;

  const mapIframe = fragment.querySelector("[data-map-iframe]");
  if (mapIframe && typeof props.mapEmbedSrc === "string") {
    mapIframe.src = props.mapEmbedSrc || "about:blank";
  }

  const locationSchedule = fragment.querySelector("[data-location-schedule]");
  if (locationSchedule && Array.isArray(props.schedule)) {
    locationSchedule.innerHTML = "";
    props.schedule.forEach((row) => {
      const line = document.createElement("div");
      line.className = "schedule__row";
      line.innerHTML = `<span class="schedule__day"></span><span class="schedule__hours"></span>`;
      line.querySelector(".schedule__day").textContent = row.day;
      line.querySelector(".schedule__hours").textContent = row.hours;
      locationSchedule.appendChild(line);
    });
  }

  const locationActions = fragment.querySelector("[data-location-actions]");
  if (locationActions && props.whatsappHref) {
    const wa = createButton({
      label: props.whatsappLabel ?? "WhatsApp →",
      href: props.whatsappHref,
      variant: "ghost",
    });
    wa.target = "_blank";
    wa.rel = "noreferrer";
    locationActions.appendChild(wa);
  }

  // Schedule cards (by age group)
  const scheduleCards = fragment.querySelector("[data-schedule-cards]");
  if (scheduleCards && Array.isArray(props.groups)) {
    props.groups.forEach((group) => {
      const card = document.createElement("article");
      card.className = "scheduleCard";
      card.innerHTML = `
        <div class="scheduleCard__top">
          <h3 class="scheduleCard__age"></h3>
          <div class="scheduleCard__time"></div>
        </div>
        <div class="scheduleCard__grid">
          <div class="scheduleCard__block">
            <p class="eyebrow">Días</p>
            <p class="p p--pre scheduleCard__days"></p>
          </div>
          <div class="scheduleCard__block">
            <p class="eyebrow">Clases</p>
            <div class="chips scheduleCard__types"></div>
          </div>
        </div>
        <p class="p scheduleCard__focus"></p>
      `;

      card.querySelector(".scheduleCard__age").textContent = group.age;
      card.querySelector(".scheduleCard__time").textContent = group.time;
      card.querySelector(".scheduleCard__days").textContent = group.days;
      card.querySelector(".scheduleCard__focus").textContent = group.focus;

      const types = card.querySelector(".scheduleCard__types");
      (group.types ?? []).forEach((t) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = t;
        types.appendChild(chip);
      });

      scheduleCards.appendChild(card);
    });

    bindText(fragment, "[data-schedule-note]", props.footerNote);
    const scheduleCta = fragment.querySelector("[data-schedule-cta]");
    if (scheduleCta && props.footerCta) {
      scheduleCta.appendChild(createButton(props.footerCta));
    }
  }

  // Social
  const socialActions = fragment.querySelector("[data-social-actions]");
  if (socialActions && Array.isArray(props.links)) {
    props.links.forEach((link) => {
      const a = createButton(link);
      a.target = "_blank";
      a.rel = "noreferrer";
      socialActions.appendChild(a);
    });
  }

  return fragment;
}

function renderPage() {
  const mount = qs("#app");
  if (!mount) throw new Error("Missing #app mount");

  const dom = document.createDocumentFragment();
  sections.forEach((sectionConfig) => {
    const fragment = renderTemplate(sectionConfig.templateId, sectionConfig.props);
    const sectionEl = fragment.querySelector("section");
    if (sectionEl) sectionEl.id = sectionConfig.id;
    dom.appendChild(fragment);
  });
  mount.appendChild(dom);

  // Mark current nav item on click/scroll (basic)
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const ids = links.map((a) => a.getAttribute("href")?.slice(1)).filter(Boolean);
  const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);

  const setCurrent = (id) => {
    links.forEach((a) => {
      const target = a.getAttribute("href")?.slice(1);
      if (target === id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  };

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
      if (visible?.target?.id) setCurrent(visible.target.id);
    },
    { rootMargin: "-20% 0px -70% 0px", threshold: [0.05, 0.15, 0.3] }
  );

  nodes.forEach((n) => obs.observe(n));

  // Mobile CTA: esconderlo cuando el "primer feature" (hero) está visible.
  const mobileCta = document.querySelector(".mobile-bottom-cta");
  const heroEl = document.getElementById("hero");
  const isMobile = window.matchMedia("(max-width: 720px)").matches;
  if (mobileCta && heroEl && isMobile) {
    const setMobileCtaVisible = (visible) => {
      mobileCta.classList.toggle("is-visible", visible);
      document.body.classList.toggle("mobile-bottom-cta-visible", visible);
    };

    // Al cargar, asumimos que el hero está visible; evitamos un "flicker".
    setMobileCtaVisible(false);

    const heroObs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        // Queremos CTA visible cuando el hero NO está en vista.
        setMobileCtaVisible(!entry.isIntersecting);
      },
      { threshold: [0, 0.15, 0.3], rootMargin: "0px 0px -10% 0px" },
    );

    heroObs.observe(heroEl);
  }
}

renderPage();

