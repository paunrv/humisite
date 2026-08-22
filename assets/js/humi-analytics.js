/**
 * GA4 + WhatsApp click tracking for static editorial HTML pages.
 * Measurement ID is injected at build time via editorial-shell.mjs:
 *   window.__HUMI_GA_MEASUREMENT_ID__
 */
(function () {
  "use strict";

  function deriveProgram(linkUrl) {
    try {
      var url = new URL(linkUrl, window.location.origin);
      var rawText = url.searchParams.get("text");
      if (!rawText) return "general";

      var text = decodeURIComponent(rawText).toLowerCase();

      if (text.indexOf("iniciación") !== -1 || text.indexOf("iniciacion") !== -1) return "iniciacion";
      if (text.indexOf("fundamentos") !== -1) return "fundamentos";
      if (text.indexOf("técnica") !== -1 || text.indexOf("tecnica") !== -1) return "tecnica";
      if (text.indexOf("constancia") !== -1) return "constancia";
      if (text.indexOf("hiit") !== -1 && text.indexOf("patadas") !== -1) return "adultos_am";
      if (text.indexOf("taekwondo") !== -1 && text.indexOf("hiit") !== -1) return "adultos_pm";
      return "general";
    } catch (_e) {
      return "general";
    }
  }

  function deriveCtaLocation(link) {
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

  function bindWhatsAppDelegation() {
    if (window.__humiGaDelegationBound) return;
    window.__humiGaDelegationBound = true;

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || !target.closest) return;

      var link = target.closest("a[href*='wa.me']");
      if (!link || !link.href || !window.gtag) return;

      window.gtag("event", "whatsapp_click", {
        cta_location: deriveCtaLocation(link),
        program: deriveProgram(link.href),
        page_path: window.location.pathname,
        link_url: link.href,
      });
    });
  }

  function init() {
    var id = (window.__HUMI_GA_MEASUREMENT_ID__ || "").trim();
    if (!id) return;

    if (!window.__humiGaInitialized) {
      window.__humiGaInitialized = true;

      var script = document.createElement("script");
      script.async = true;
      script.src =
        "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", id);
    }

    bindWhatsAppDelegation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
