/**
 * HUMI information architecture — editorial documentary site.
 */

export const PRIMARY_NAV = [
  { href: "/", label: "Inicio", key: "inicio" },
  { href: "/filosofia", label: "Filosofía", key: "filosofia" },
  { href: "/experiencia", label: "Experiencia", key: "experiencia" },
  { href: "/blog", label: "Blog", key: "blog" },
  { href: "/comunidad", label: "Comunidad", key: "comunidad" },
  { href: "/equipo", label: "Equipo", key: "equipo" },
  { href: "/contacto", label: "Contacto", key: "contacto" },
];

export const SECONDARY_NAV = [
  { href: "/poomsae", label: "Poomsae", key: "poomsae" },
  { href: "/blog/categoria/journal", label: "Journal", key: "journal" },
];

export const SITE_REDIRECTS = [
  { source: "/cinturones", destination: "/blog/categoria/cinturones", permanent: true },
  { source: "/cinturones/:path*", destination: "/blog/categoria/cinturones", permanent: true },
  { source: "/horarios", destination: "/contacto", permanent: false },
];

export const FILOSOFIA_SECTIONS = [
  { id: "movimiento-identidad", title: "Movimiento como identidad", body: "El cuerpo aprende antes que el discurso. Cada clase es una conversación entre presencia, respiración y la decisión de volver." },
  { id: "permanencia", title: "Permanencia", body: "No se trata de un verano de actividad. Se trata de años — de volver cuando cuesta, de quedarse cuando ya no hay aplausos." },
  { id: "disciplina-amable", title: "Disciplina amable", body: "La exigencia no necesita humillar. Se corrige con precisión y se acompaña con criterio." },
  { id: "crecimiento-humano", title: "Crecimiento humano", body: "Técnica, sí. Pero también carácter, regulación emocional y la confianza de saber quién eres bajo presión." },
  { id: "comunidad", title: "Comunidad", body: "El dojang es un ecosistema: familias, generaciones, memoria compartida." },
  { id: "ecosistema", title: "HUMI como ecosistema", body: "Programas por edad, archivo editorial, competencia con sentido y una filosofía que sostiene todo lo demás." },
];

export const EXPERIENCIA_SECTIONS = [
  { title: "Cómo se vive una clase", body: "Llegada, saludo, calentamiento con intención, bloque técnico, aplicación y cierre con presencia." },
  { title: "Tiny Tigers", body: "Primeras rutinas de cuerpo y atención — juego con estructura.", href: "/programas/tiny-tigers" },
  { title: "Kids", body: "Hábito, coordinación y respeto en un entorno predecible.", href: "/programas/kids" },
  { title: "Teens", body: "Exigencia, compañerismo y mentalidad bajo presión real.", href: "/programas/teens" },
  { title: "Adultos", body: "Técnica, condición y válvula seria para la vida fuera del tatami.", href: "/programas/adultos" },
  { title: "Poomsae", body: "Formas como memoria, respiración y respeto propio.", href: "/poomsae" },
  { title: "Combate", body: "Kyorugi con control, estrategia y aprendizaje emocional." },
  { title: "Desarrollo emocional", body: "Regular frustración, celebrar progreso sin comparación cruel." },
  { title: "Comunidad", body: "Familias que crecen juntas dentro y fuera del dojang.", href: "/comunidad" },
  { title: "Competencia", body: "Torneos como espejo — no como única definición de valor.", href: "/internacional" },
];

export const PROGRAMAS = [
  { slug: "tiny-tigers", label: "Tiny Tigers", age: "3 años", time: "Mar · Mié · Jue — 3:20 PM", lede: "Primeras rutinas de cuerpo y atención, con acompañamiento cercano." },
  { slug: "kids", label: "Kids", age: "4 a 10 años", time: "4:00 – 6:00 PM", lede: "Control, hábito de esfuerzo y progresión por niveles sin vergüenza pública." },
  { slug: "teens", label: "Teens", age: "11 a 16 años", time: "6:00 – 7:00 PM", lede: "Mentalidad bajo exigencia, compañerismo y fuerza sin necesidad de gritar." },
  { slug: "adultos", label: "Adultos", age: "AM y PM", time: "7:30 AM · 7:00 PM", lede: "Taekwondo + HIIT, técnica clara y disciplina que cabe en la agenda real." },
];

export const POOMSAE_FORMS = [
  { slug: "taeguk-1", label: "Taeguk 1 · Il Jang", belt: "Amarillo" },
  { slug: "taeguk-2", label: "Taeguk 2 · Ee Jang", belt: "Verde" },
  { slug: "taeguk-3", label: "Taeguk 3 · Sam Jang", belt: "Verde avanzado" },
  { slug: "taeguk-4", label: "Taeguk 4 · Sa Jang", belt: "Azul" },
  { slug: "taeguk-5", label: "Taeguk 5 · Oh Jang", belt: "Azul avanzado" },
  { slug: "taeguk-6", label: "Taeguk 6 · Yuk Jang", belt: "Rojo" },
  { slug: "taeguk-7", label: "Taeguk 7 · Chil Jang", belt: "Rojo avanzado" },
  { slug: "taeguk-8", label: "Taeguk 8 · Pal Jang", belt: "Prenegro" },
  { slug: "koryo", label: "Koryo", belt: "1.º dan" },
  { slug: "keumgang", label: "Keumgang", belt: "2.º dan" },
  { slug: "taebaek", label: "Taebaek", belt: "3.º dan" },
  { slug: "pyongwon", label: "Pyongwon", belt: "4.º dan" },
  { slug: "sipjin", label: "Sipjin", belt: "5.º dan" },
];

export const GENERACIONES = [
  { slug: "primera-generacion", label: "Primera generación", image: "first-generation-black-belts" },
  { slug: "segunda-generacion", label: "Segunda generación", image: "second-generation-black-belts" },
  { slug: "tercera-generacion", label: "Tercera generación", image: "third-generation-black-belts" },
  { slug: "cuarta-generacion", label: "Cuarta generación", image: "fourth-generation-black-belts" },
  { slug: "quinta-generacion", label: "Quinta generación", image: "fifth-generation-black-belts" },
  { slug: "sexta-generacion", label: "Sexta generación", image: "sixth-generation-black-belts" },
  { slug: "septima-generacion", label: "Séptima generación", image: "seventh-generation-black-belts" },
  { slug: "octava-generacion", label: "Octava generación", image: "eighth-generation-black-belts" },
];

export const EQUIPO_HUMI = [
  { name: "Paulina Noriega Romero Vargas", role: "Directora General", meta: "5.º Dan" },
  { name: "Dulce Carolina Curiel", role: "Especialista en Poomsae", meta: "3.er Dan" },
  { name: "Mario Rodríguez Verti", role: "Instructor", meta: "2.º Dan" },
  { name: "Gisel Tinoco", role: "Supervisión y Administración", meta: "Estudios en Medicina" },
];

export const EQUIPO_WTU = [
  { name: "Gustavo Ortega", role: "World Taekwondo Union México", meta: "7.º Dan" },
  { name: "Julio Moreno", role: "World Taekwondo Union México", meta: "9.º Dan" },
];

export const INTERNACIONAL = [
  { slug: "beijing", label: "Beijing 2008", image: "beijing", lede: "Doble oro olímpico — el día en que México se consolidó como potencia." },
  { slug: "tokyo", label: "Tokyo 2020", image: "tokyo", lede: "Pandemia, debate y un ciclo que cerró sin medalla." },
  { slug: "paris", label: "París 2024", image: "paris", lede: "Ranking, hambre post-Tokyo y lecciones de podio." },
];

export const COMUNIDAD_SECTIONS = [
  { title: "Generaciones de cintas negras", body: "Ocho generaciones que narran permanencia, no solo titulares.", href: "/generaciones" },
  { title: "Historias HUMI", body: "Memorias de familias, atletas y años que no caben en un cartel.", href: "/blog/categoria/comunidad" },
  { title: "Eventos", body: "Exámenes, encuentros y momentos que marcan el calendario del dojang." },
  { title: "Torneos", body: "Competir con identidad — no solo por puntos.", href: "/internacional" },
  { title: "Cultura HUMI", body: "Respeto, vocabulario, juramento y la manera HUMI de estar en el tatami.", href: "/filosofia" },
  { title: "Comunidad familiar", body: "Padres, hermanos y generaciones que eligen quedarse." },
];
