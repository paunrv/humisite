/**
 * HUMI — nav móvil, FAQ, carrusel blog, cinturones, scroll suave a anclas
 */
(function () {
  "use strict";

  var nav = document.querySelector("[data-hm-nav]");
  if (nav) {
    var toggle = nav.querySelector("[data-hm-nav-toggle]");
    var panel = nav.querySelector("[data-hm-nav-panel]");
    if (toggle && panel) {
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
    }
  }

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

(function () {
  "use strict";
  var info = document.querySelector("[data-hm-belts-info]");
  if (!info) return;
  document.querySelectorAll("[data-hm-belt]").forEach(function (btn) {
    function show() {
      var t = btn.getAttribute("data-hm-belt");
      if (t) info.textContent = t;
    }
    function clear() {
      info.textContent = "";
    }
    btn.addEventListener("mouseenter", show);
    btn.addEventListener("mouseleave", clear);
    btn.addEventListener("focus", show);
    btn.addEventListener("blur", clear);
  });
})();

(function () {
  "use strict";
  var viewport = document.querySelector("[data-blog-carousel]");
  if (!viewport) return;
  var slides = viewport.querySelectorAll(".hm-blog-slide");
  var prev = document.querySelector("[data-blog-prev]");
  var next = document.querySelector("[data-blog-next]");
  if (!slides.length) return;

  function currentIndex() {
    var mid = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    var best = 0;
    var bestDist = Infinity;
    for (var i = 0; i < slides.length; i++) {
      var r = slides[i].getBoundingClientRect();
      var c = r.left + r.width / 2;
      var d = Math.abs(c - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  }

  function go(delta) {
    var i = currentIndex() + delta;
    if (i < 0) i = 0;
    if (i >= slides.length) i = slides.length - 1;
    slides[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  if (prev) prev.addEventListener("click", function () { go(-1); });
  if (next) next.addEventListener("click", function () { go(1); });

  viewport.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  });
})();

(function () {
  "use strict";
  var nav = document.querySelector("[data-hm-nav]");
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      var y = target.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    });
  });
})();
