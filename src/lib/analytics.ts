/**
 * GA4 bootstrap + delegated WhatsApp click tracking.
 * Disabled when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset.
 */

export type WhatsAppClickParams = {
  cta_location: string;
  program: string;
  page_path: string;
  link_url: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __humiGaInitialized?: boolean;
    __humiGaDelegationBound?: boolean;
    __HUMI_GA_MEASUREMENT_ID__?: string;
  }
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

export function deriveProgram(linkUrl: string): string {
  try {
    const url = new URL(linkUrl, window.location.origin);
    const rawText = url.searchParams.get("text");
    if (!rawText) return "general";

    const text = decodeURIComponent(rawText).toLowerCase();

    if (text.includes("iniciación") || text.includes("iniciacion")) return "iniciacion";
    if (text.includes("fundamentos")) return "fundamentos";
    if (text.includes("técnica") || text.includes("tecnica")) return "tecnica";
    if (text.includes("constancia")) return "constancia";
    if (text.includes("hiit") && text.includes("patadas")) return "adultos_am";
    if (text.includes("taekwondo") && text.includes("hiit")) return "adultos_pm";
    return "general";
  } catch {
    return "general";
  }
}

export function deriveCtaLocation(link: HTMLAnchorElement): string {
  if (link.closest(".hm-nav__cta, .hm-nav__panel, .hm-nav")) return "editorial_nav";
  if (link.closest("#site-nav-menu, .nav-menu-panel, .nav-menu-footer")) return "nav_mobile";
  if (link.closest(".nav-cta")) return "nav_desktop";
  if (link.closest(".hero-actions") || (link.closest(".hero") && link.classList.contains("btn-hero"))) {
    return "hero";
  }
  if (link.classList.contains("program-wa") || link.closest(".program-card")) return "program";
  if (link.closest(".cta-section, #contacto")) return "cta_section";
  if (link.closest("footer")) return "footer";
  return "unknown";
}

function bindWhatsAppDelegation(): void {
  if (window.__humiGaDelegationBound) return;
  window.__humiGaDelegationBound = true;

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest("a[href*='wa.me']");
    if (!(link instanceof HTMLAnchorElement)) return;

    const href = link.href;
    if (!href || !window.gtag) return;

    const params: WhatsAppClickParams = {
      cta_location: deriveCtaLocation(link),
      program: deriveProgram(href),
      page_path: window.location.pathname,
      link_url: href,
    };

    window.gtag("event", "whatsapp_click", params);
  });
}

export function initHumiAnalytics(measurementId?: string): void {
  if (typeof window === "undefined") return;

  const id = measurementId?.trim() || getGaMeasurementId();
  if (!id) return;

  if (!window.__humiGaInitialized) {
    window.__humiGaInitialized = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", id);
  }

  bindWhatsAppDelegation();
}
