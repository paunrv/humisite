/**
 * Experiencias HUMI — archivo editorial de experiencias anuales de HUMI.
 *
 * Display order: newest → oldest (present back to the first Bootcamp).
 *
 * Media: each event uses one of two compositions via `layout`.
 * Assets are wired later — frames render empty until then.
 */

export type SignatureEventMediaLayout = "split" | "double";

export type SignatureEvent = {
  id: number;
  year: string;
  title: string;
  category: string;
  guest?: string;
  subtitle?: string;
  /** ~35–45 words. */
  description: string;
  /**
   * Media composition only:
   * - `split` → 1 vertical + 2 stacked horizontals
   * - `double` → 2 equal verticals
   */
  layout: SignatureEventMediaLayout;
};

/**
 * Newest first → oldest last.
 * `id` is the chapter mark in the journey (01 = today, 06 = beginning).
 */
export const SIGNATURE_EVENTS: SignatureEvent[] = [
  {
    id: 1,
    year: "2025",
    title: "Sunday Funday",
    category: "Master Class · Jesús Aguilar",
    subtitle: "Official UFC Athlete",
    layout: "split",
    description:
      "To celebrate HUMI's 15th Anniversary, we brought our community together for a unique experience featuring a tuna cutting ceremony (Ronqueo de Atún) and a Master Class with UFC athlete Jesús Aguilar, all hosted at a beautiful marina in Ensenada.",
  },
  {
    id: 2,
    year: "2024",
    title: "Taekwondo Games",
    category: "Competencia Comunitaria",
    layout: "double",
    description:
      "La competencia comunitaria que reunió a todas las generaciones en un mismo piso. Alumnos compitieron, se apoyaron y celebraron, convirtiendo un solo fin de semana en el retrato vivo de todo lo que HUMI había construido con los años.",
  },
  {
    id: 3,
    year: "2023",
    title: "KI Games",
    category: "Fin de Semana de Rendimiento",
    guest: "Gabriel Bracamontes",
    layout: "double",
    description:
      "Un fin de semana de rendimiento que fue más allá del formato habitual de clase. El dojang se convirtió en escenario de intensidad, técnica y el esfuerzo compartido que transforma una escuela en una familia unida por un propósito.",
  },
  {
    id: 4,
    year: "2022",
    title: "Rumble HUMI Interno WTU",
    category: "Competencia Interna",
    layout: "double",
    description:
      "Una competencia interna bajo estándares de World Taekwondo Union. Los atletas midieron meses de preparación contra sus propios compañeros, demostrando que el crecimiento más intenso a menudo nace dentro de la comunidad que los formó.",
  },
  {
    id: 5,
    year: "2019",
    title: "2º Bootcamp Olímpico de TKD",
    category: "Clase Magistral",
    guest: "Joel González",
    subtitle: "Campeón Olímpico · Londres 2012",
    layout: "split",
    description:
      "Un segundo año, un segundo campeón. El fuego olímpico volvió al dojang y profundizó una tradición de clases magistrales de clase mundial que define el ritmo anual de HUMI y eleva a cada alumno en el tatami.",
  },
  {
    id: 6,
    year: "2018",
    title: "1er Bootcamp Olímpico de TKD",
    category: "Clase Magistral",
    guest: "Carlo Molfetta",
    subtitle: "Campeón Olímpico · Londres 2012",
    layout: "split",
    description:
      "HUMI abrió sus puertas al entrenamiento de nivel olímpico por primera vez. Precisión e intensidad de Londres 2012 llegaron a Ensenada y fijaron un nuevo estándar de lo que nuestra comunidad podía aspirar a ser cada año.",
  },
];

export function formatEdition(id: number): string {
  return String(id).padStart(2, "0");
}

/** Assert descriptions stay in the 35–45 word band (dev aid). */
export function descriptionWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
