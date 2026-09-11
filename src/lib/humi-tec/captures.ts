/**
 * Inventario de capturas reales de HUMI-tec (humi-sistema) usadas en /tec.
 *
 * Reglas (ver "HUMI-tec Landing V2 — Design Blueprint"):
 *
 * - Presupuesto cerrado: 6 APARICIONES principales. Correcciones usa dos
 *   capturas que cuentan como un solo momento narrativo.
 * - Una captura puede generar derivados (zoom, crop, versión móvil). Un
 *   derivado NO es una aparición nueva y NO es una pantalla nueva.
 * - Nunca se inventa una pantalla. Si `src` no existe, el landing renderiza
 *   un placeholder explícito — jamás un dashboard simulado.
 * - Anonimización obligatoria: nombres sustituidos, teléfonos enmascarados,
 *   montos verosímiles pero no reales, sin datos identificables de menores.
 *
 * Para publicar una captura: coloca el archivo en `public/tec/` y rellena
 * `src` + `capturedAt`. No hace falta tocar los componentes.
 */

export type CaptureViewport = "admin" | "family";

export type Capture = {
  /** id estable; nombra la pantalla, no la sección del landing. */
  id: string;
  /** Nombre humano de la pantalla en el producto. */
  screen: string;
  /** Ruta en humi-sistema. */
  route: string;
  /** Viewport de captura. admin 1440×900 · family 390×844, siempre a 2×. */
  viewport: CaptureViewport;
  /** aspect-ratio CSS con el que se compone el hueco. */
  ratio: string;
  /** Texto alternativo: describe lo que muestra la pantalla. */
  alt: string;
  /** Ruta pública del PNG/WebP una vez capturado y anonimizado. */
  src?: string;
  /** ISO date de la captura, para auditar antigüedad. */
  capturedAt?: string;
};

export const CAPTURE_VIEWPORTS: Record<CaptureViewport, string> = {
  admin: "1440×900",
  family: "390×844",
};

export const TEC_CAPTURES = {
  direccion: {
    id: "cap-01",
    screen: "Dirección",
    route: "/admin",
    viewport: "admin",
    ratio: "16 / 10",
    alt: "Pantalla Dirección de HUMI-tec: indicadores del mes, semáforo de cobranza, cargos que requieren acción e ingresos de los últimos seis meses.",
  },
  direccionKpis: {
    id: "cap-01a",
    screen: "Dirección · indicadores del mes",
    route: "/admin",
    viewport: "admin",
    ratio: "16 / 7",
    alt: "Indicadores del mes en Dirección: alumnos activos, clases de hoy, asistencia de 7 días y cobranza.",
  },
  direccionSemaforo: {
    id: "cap-01b",
    screen: "Dirección · semáforo de cobranza",
    route: "/admin",
    viewport: "admin",
    ratio: "16 / 9",
    alt: "Semáforo de cobranza en Dirección: montos cobrado, por vencer y vencido del periodo.",
  },
  asistencia: {
    id: "cap-02",
    screen: "Asistencia",
    route: "/admin/asistencia",
    viewport: "admin",
    ratio: "3 / 2",
    alt: "Pase de lista en HUMI-tec: lista de alumnos de un grupo con las marcas Presente, Tarde y Ausente.",
  },
  cobranza: {
    id: "cap-03",
    screen: "Cobranza",
    route: "/admin/cobranza",
    viewport: "admin",
    ratio: "3 / 2",
    alt: "Pantalla Cobranza de HUMI-tec: cargos del mes por alumno con su categoría, método, estado y monto.",
  },
  portalAlumno: {
    id: "cap-04",
    screen: "Portal alumno · Inicio",
    route: "/alumno",
    viewport: "family",
    ratio: "390 / 780",
    alt: "Portal del alumno en HUMI-tec: nombre del alumno, escuela, grupo y cinta, su Athlete ID y los accesos a pagos, asistencia, agenda, exámenes y perfil.",
  },
  correccionFamilia: {
    id: "cap-05a",
    screen: "Perfil alumno · Solicitar corrección",
    route: "/alumno/perfil",
    viewport: "family",
    ratio: "4 / 3",
    alt: "Formulario del portal para solicitar la corrección de un dato del expediente.",
  },
  correccionOficina: {
    id: "cap-05b",
    screen: "Correcciones · oficina",
    route: "/admin/correcciones",
    viewport: "admin",
    ratio: "4 / 3",
    alt: "Bandeja de Correcciones en HUMI-tec: la solicitud de una familia con su estado y la acción para marcarla hecha.",
  },
  mensajes: {
    id: "cap-06",
    screen: "Mensajes",
    route: "/admin/mensajes",
    viewport: "admin",
    ratio: "4 / 3",
    alt: "Centro de recordatorios de HUMI-tec: vista previa del mensaje armado y el botón para abrir WhatsApp.",
  },
} as const satisfies Record<string, Capture>;

export type CaptureKey = keyof typeof TEC_CAPTURES;

/** Una captura está lista cuando existe el archivo anonimizado. */
export function isCaptureReady(capture: Capture): capture is Capture & { src: string } {
  return typeof capture.src === "string" && capture.src.length > 0;
}
