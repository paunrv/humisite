const data = {
  hero: {
    kicker: "HUMI Taekwondo",
    title: "Taekwondo en Ensenada\nTécnica, disciplina y evolución real",
    lede: "Más de 15 años formando atletas — 5 generaciones de cintas negras y un programa pionero en freestyle.",
    bullets: [
      "Programas para niños, jóvenes y adultos",
      "Equipo profesional KPNP SS",
      "Primera escuela con programa estructurado de freestyle",
      "Formación técnica y competitiva",
    ],
    ctas: [
      { label: "Agendar clase →", href: "#location", variant: "primary" },
      { label: "Ver horarios →", href: "#location", variant: "ghost" },
    ],
    extra: ["Ensenada, Baja California", "Clases toda la semana"],
    media: {
      label: "Entrenamiento real — HUMI Taekwondo",
      image: "images/picfs.jpg",
    },
  },
  programs: {
    kicker: "Programas",
    title: "Opciones claras por etapa y objetivo.",
    body: "Entrenamiento con estructura, disciplina y seguimiento. Te recomendamos el grupo ideal según edad y nivel.",
    items: [
      { title: "Niños", body: "Bases, coordinación, respeto y confianza. Progresión por niveles." },
      { title: "Jóvenes", body: "Técnica sólida, condición, disciplina y preparación competitiva." },
      { title: "Adultos", body: "Aprendizaje desde cero o continuidad. Técnica, salud y enfoque." },
      { title: "Freestyle", body: "Programa estructurado: fundamentos, control, combos y evolución." },
    ],
  },
  instructors: {
    kicker: "Instructores",
    title: "Equipo con experiencia real.",
    body: "Un buen programa depende de buenos instructores: técnica clara, disciplina y progreso medible.",
    people: [
      {
        name: "Instructor/a 1",
        rank: "Cinta negra — Dan __",
        years: "15+ años",
        bio: "Enfoque en técnica, disciplina y formación competitiva. (Listo para reemplazar con perfil real.)",
      },
      {
        name: "Instructor/a 2",
        rank: "Cinta negra — Dan __",
        years: "10+ años",
        bio: "Trabajo con grupos por edad y nivel; acompañamiento de progresión y preparación para examen.",
      },
      {
        name: "Instructor/a 3",
        rank: "Cinta negra — Dan __",
        years: "8+ años",
        bio: "Especialidad en freestyle: fundamentos, control y evolución progresiva con estructura.",
      },
    ],
    fineprint:
      "Este bloque está listo para nombres reales, grados exactos, certificaciones y fotos. Recomendado: 1–3 perfiles máximo.",
  },
  reviews: {
    kicker: "Reseñas",
    title: "Resultados que hablan por sí solos",
    body: "Testimonios editables hoy; listos para conectarse con reseñas de Google Maps cuando tengamos el Place ID.",
    note:
      "Nota: no estamos inventando reseñas. Pega aquí 2–3 reseñas reales (texto + nombre) y luego conectamos Google Maps.",
    items: [
      { quote: "Pega aquí una reseña real de Google o WhatsApp (con permiso).", name: "Nombre (real)", rating: 5 },
      { quote: "Pega aquí una reseña real (sin editar el sentido).", name: "Nombre (real)", rating: 5 },
      { quote: "Pega aquí una reseña real (puede ser iniciales si prefieren).", name: "Nombre (real)", rating: 5 },
    ],
  },
  location: {
    kicker: "Ubicación + horario",
    title: "Ubicación real, abierta y en operación",
    headline: "Ubicación real, abierta y en operación",
    address: "Ensenada, Baja California\n(Dirección exacta aquí)",
    mapsHref: "#",
    mapEmbedSrc: "",
    schedule: [
      { day: "Lunes", hours: "—" },
      { day: "Martes", hours: "—" },
      { day: "Miércoles", hours: "—" },
      { day: "Jueves", hours: "—" },
      { day: "Viernes", hours: "—" },
      { day: "Sábado", hours: "—" },
      { day: "Domingo", hours: "—" },
    ],
    note:
      "Sugerencia: agrega colonia, referencias y estacionamiento. Reemplaza el mapa con el iframe real de Google Maps (Embed).",
    mapNote: "Pega el `src` del iframe desde Google Maps → Compartir → Insertar un mapa.",
  },
  social: {
    kicker: "Social",
    title: "Síguenos y conoce el entrenamiento real",
    body: "Fotos y videos del entrenamiento real, clases y eventos.",
    links: [
      { label: "Instagram →", href: "https://www.instagram.com/humi.taekwondo/", variant: "primary" },
      { label: "Facebook →", href: "https://www.facebook.com/HumiTaekwondo/", variant: "ghost" },
    ],
  },
};

const sections = [
  { id: "hero", templateId: "tpl-hero", props: data.hero },
  { id: "programs", templateId: "tpl-programs", props: data.programs },
  { id: "instructors", templateId: "tpl-instructors", props: data.instructors },
  { id: "reviews", templateId: "tpl-reviews", props: data.reviews },
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

function renderTemplate(templateId, props) {
  const tpl = getTemplate(templateId);
  const fragment = tpl.content.cloneNode(true);

  bindText(fragment, "[data-kicker]", props.kicker);
  bindText(fragment, "[data-title]", props.title);
  bindText(fragment, "[data-body]", props.body);
  bindText(fragment, "[data-lede]", props.lede);

  // Hero: bullets, actions, extra, media
  const heroBullets = fragment.querySelector("[data-hero-bullets]");
  if (heroBullets && Array.isArray(props.bullets)) {
    props.bullets.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      heroBullets.appendChild(li);
    });
  }

  const actions = fragment.querySelector("[data-actions]");
  if (actions && Array.isArray(props.ctas)) {
    props.ctas.forEach((cta) => actions.appendChild(createButton(cta)));
  }

  const heroExtra = fragment.querySelector("[data-hero-extra]");
  if (heroExtra && Array.isArray(props.extra)) {
    props.extra.forEach((text) => {
      const span = document.createElement("span");
      span.className = "hero__extraItem";
      span.textContent = text;
      heroExtra.appendChild(span);
    });
  }

  const heroSection = fragment.querySelector("[data-hero-bg]");
  const heroBg = props.media?.image;
  if (heroSection && heroBg) {
    heroSection.style.setProperty("--hero-bg", `url("${heroBg}")`);
  }

  // Programs
  const programs = fragment.querySelector("[data-programs]");
  if (programs && Array.isArray(props.items)) {
    props.items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card programCard";
      card.innerHTML = `<p class="eyebrow">Programa</p><h3 class="programCard__title"></h3><p class="p"></p>`;
      card.querySelector(".programCard__title").textContent = item.title;
      card.querySelector(".p").textContent = item.body;
      programs.appendChild(card);
    });
  }

  // Instructors
  const instructors = fragment.querySelector("[data-instructors]");
  if (instructors && Array.isArray(props.people)) {
    props.people.forEach((person) => {
      const card = document.createElement("article");
      card.className = "card person";
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
      card.querySelector(".person__meta").textContent = `${person.rank} · ${person.years}`;
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

  const schedule = fragment.querySelector("[data-schedule]");
  if (schedule && Array.isArray(props.schedule)) {
    props.schedule.forEach((row) => {
      const div = document.createElement("div");
      div.className = "schedule__row";
      div.innerHTML = `<div class="schedule__day"></div><div class="schedule__hours"></div>`;
      div.querySelector(".schedule__day").textContent = row.day;
      div.querySelector(".schedule__hours").textContent = row.hours;
      schedule.appendChild(div);
    });
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
}

renderPage();

