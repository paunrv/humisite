/**
 * HUMI redesign — nav móvil y FAQ accesible
 */
(function () {
  "use strict";

  var nav = document.querySelector("[data-hm-nav]");
  if (!nav) return;

  var toggle = nav.querySelector("[data-hm-nav-toggle]");
  var panel = nav.querySelector("[data-hm-nav-panel]");
  if (!toggle || !panel) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("hm-nav--open", open);
    document.body.classList.toggle("hm-nav-open", open);
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  panel.addEventListener("click", function (e) {
    var t = e.target;
    if (t && t.closest && t.closest("a")) setOpen(false);
  });

  window.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "Escape") setOpen(false);
    },
    true,
  );

  window.matchMedia("(min-width: 768px)").addEventListener("change", function (q) {
    if (q.matches) setOpen(false);
  });

  /* FAQ: teclado en botones */
  document.querySelectorAll("[data-hm-faq]").forEach(function (root) {
    root.querySelectorAll(".hm-faq__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".hm-faq__item");
        if (!item) return;
        var was = item.classList.contains("hm-faq__item--open");
        root.querySelectorAll(".hm-faq__item--open").forEach(function (o) {
          o.classList.remove("hm-faq__item--open");
          var b = o.querySelector(".hm-faq__btn");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!was) {
          item.classList.add("hm-faq__item--open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  });
})();
