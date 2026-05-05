const data = {
  hero: {
    title: "Taekwondo en Ensenada\nTécnica, disciplina y evolución real",
    lede:
      "Formación técnica, disciplina y confianza en un entorno seguro.\nClases para niños, jóvenes y adultos en Ensenada.",
    ctas: [
      { label: "Agendar clase →", href: "#location", variant: "primary" },
      { label: "Ver horarios →", href: "#location", variant: "ghost" },
    ],
    mediaImage: "images/pic02.jpg",
  },
  stats: {
    items: [
      { value: "15+", label: "Años formando atletas" },
      { value: "5", label: "Generaciones de cintas negras" },
      { value: "Freestyle", label: "Programa pionero" },
      { value: "KPNP SS", label: "Equipo profesional" },
    ],
    sub: ["Programas para niños, jóvenes y adultos", "Formación técnica y competitiva"],
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
        name: "Paulina Noriega Romero Vargas",
        role: "5to Dan — Directora General",
        bio: "Formación de alto nivel con enfoque en disciplina, estructura y desarrollo integral. Más de una década formando atletas y equipos competitivos.",
      },
      {
        name: "Dulce Carolina Curiel",
        role: "3er Dan — Especialista en Poomsae",
        bio: "Precisión técnica, control y fundamentos. Acompaña procesos de aprendizaje con enfoque en detalle y progresión.",
      },
      {
        name: "Mario Rodríguez Verti",
        role: "2do Dan — Instructor",
        bio: "Trabajo técnico y formación por niveles. Enfoque en constancia, disciplina y evolución progresiva.",
      },
    ],
    fineprint: "",
  },
  philosophy: {
    kicker: "Filosofía",
    title: "Más que entrenamiento",
    body:
      "Formamos atletas, pero sobre todo personas.\n\nCreamos un espacio seguro donde cada alumno desarrolla confianza, disciplina y carácter.\n\nNuestros valores: integridad, respeto y espíritu indomable.",
    support: "Clases de lunes a viernes.\nGrupos segmentados por edad para un aprendizaje más efectivo.",
  },
  schedule: {
    kicker: "Horarios",
    title: "Horarios claros por edad",
    body:
      "Encuentra tu grupo en menos de 10 segundos.\nSelecciona por edad y revisa horarios disponibles.",
    groups: [
      {
        age: "3 años",
        days: "Martes, miércoles y jueves",
        time: "3:25 – 3:55 PM",
        types: ["Taekwondo (iniciación)"],
        focus: "Coordinación, disciplina y confianza con acompañamiento cercano.",
      },
      {
        age: "4–6 años",
        days: "Lunes — Sparring\nMartes y jueves — Programa básico\nViernes — Freestyle",
        time: "4:00 – 4:50 PM",
        types: ["Sparring", "Programa básico", "Freestyle"],
        focus: "Fundamentos, control y hábitos de disciplina en un entorno seguro.",
      },
      {
        age: "7–10 años",
        days: "Lunes — Sparring\nMartes y jueves — Programa básico\nMiércoles — Poomsae\nViernes — Freestyle",
        time: "5:00 – 6:00 PM",
        types: ["Sparring", "Programa básico", "Poomsae", "Freestyle"],
        focus: "Técnica sólida, progresión por niveles y preparación competitiva.",
      },
      {
        age: "11–17 años",
        days: "Lunes — Sparring\nMartes y jueves — Programa básico\nMiércoles — Poomsae\nViernes — Freestyle",
        time: "6:00 – 7:00 PM",
        types: ["Sparring", "Programa básico", "Poomsae", "Freestyle"],
        focus: "Disciplina, condición y técnica con enfoque en constancia y evolución.",
      },
      {
        age: "Adultos (tarde)",
        days: "Martes y jueves",
        time: "7:00 – 8:00 PM",
        types: ["Taekwondo"],
        focus: "Entrenamiento técnico y físico para salud, enfoque y progreso real.",
      },
      {
        age: "Adultos (mañana)",
        days: "Lunes a jueves",
        time: "7:30 AM / 8:30 AM",
        types: ["HIIT + Taekwondo"],
        focus: "Energía, condición y técnica. Ideal para rutina antes del trabajo.",
      },
    ],
    cta: { label: "Agendar clase →", href: "#location", variant: "primary" },
  },
  reviews: {
    kicker: "Reseñas",
    title: "Lo que dicen quienes entrenan aquí",
    body: "Testimonios reales de alumnos y familias en Ensenada.",
    note: "Reseñas reales compartidas con permiso.",
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
  location: {
    kicker: "Ubicación + horario",
    title: "Ubicación real, abierta y en operación",
    headline: "Ubicación real, abierta y en operación",
    address: "Ensenada, Baja California\n(Dirección exacta aquí)",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=31.86920987405615,-116.62705212444732",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.3753201934683!2d-116.62705212444732!3d31.86920987405615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d893ec6f498c99%3A0x76d0a2c80324fd09!2sHUMI%20%7C%20Taekwondo%2C%20Freestyle%20%26%20Martial%20Fitness!5e0!3m2!1sen!2smx!4v1778012458336!5m2!1sen!2smx",
    schedule: [
      { day: "Lunes", hours: "—" },
      { day: "Martes", hours: "—" },
      { day: "Miércoles", hours: "—" },
      { day: "Jueves", hours: "—" },
      { day: "Viernes", hours: "—" },
      { day: "Sábado", hours: "—" },
      { day: "Domingo", hours: "—" },
    ],
    note: "Si quieres, agrega referencias de llegada (colonia, puntos de referencia, estacionamiento).",
    mapNote: "Mapa embebido desde Google Maps.",
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
  { id: "stats", templateId: "tpl-stats", props: data.stats },
  { id: "programs", templateId: "tpl-programs", props: data.programs },
  { id: "schedule", templateId: "tpl-schedule", props: data.schedule },
  { id: "instructors", templateId: "tpl-instructors", props: data.instructors },
  { id: "philosophy", templateId: "tpl-philosophy", props: data.philosophy },
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


  // Schedule cards (by age group)
  const scheduleCards = fragment.querySelector("[data-schedule-cards]");
  if (scheduleCards && Array.isArray(props.groups)) {
    props.groups.forEach((group) => {
      const card = document.createElement("article");
      card.className = "card scheduleCard";
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
        <div class="actions actions--tight scheduleCard__cta"></div>
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

      const ctaWrap = card.querySelector(".scheduleCard__cta");
      if (ctaWrap && props.cta) ctaWrap.appendChild(createButton(props.cta));

      scheduleCards.appendChild(card);
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

  // Stats banner
  const stats = fragment.querySelector("[data-stats]");
  if (stats && Array.isArray(props.items)) {
    props.items.forEach((item) => {
      const cell = document.createElement("div");
      cell.className = "stat";
      cell.innerHTML = `
        <div class="stat__value"></div>
        <div class="stat__label"></div>
      `;
      cell.querySelector(".stat__value").textContent = item.value;
      cell.querySelector(".stat__label").textContent = item.label;
      stats.appendChild(cell);
    });
  }

  const statsSub = fragment.querySelector("[data-stats-sub]");
  if (statsSub && Array.isArray(props.sub)) {
    props.sub.forEach((text) => {
      const span = document.createElement("span");
      span.className = "statsBanner__subItem";
      span.textContent = text;
      statsSub.appendChild(span);
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

