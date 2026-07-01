/* landing.js — Trulu landing interactivity + auth flow */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  document.documentElement.classList.add("js");

  /* ---------- Theme (shared key with dashboard) ---------- */
  const html = document.documentElement;
  function applyTheme(t) {
    html.setAttribute("data-theme", t);
    const moon = '<path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z"/>';
    const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.4 5.6 17 7M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6"/>';
    const btn = $("#themeBtn svg");
    if (btn) btn.innerHTML = t === "dark" ? sun : moon;
  }
  function readTheme() {
    try {
      const saved = JSON.parse(localStorage.getItem("trulu.theme.v2") || "null");
      if (saved && typeof saved.dark === "boolean") return saved.dark ? "dark" : "light";
    } catch (e) {}
    return "light";
  }
  applyTheme(readTheme());
  $("#themeBtn").addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      const cur = JSON.parse(localStorage.getItem("trulu.theme.v2") || "{}") || {};
      cur.dark = next === "dark";
      localStorage.setItem("trulu.theme.v2", JSON.stringify(cur));
    } catch (e) {}
  });

  /* ---------- Nav scroll state ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((el) => io.observe(el));
    // reveal in-view (above-the-fold) elements right away, synchronously
    const showInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.96 && r.bottom > -40) el.classList.add("in");
      });
    };
    showInView();
    requestAnimationFrame(showInView);
    window.addEventListener("scroll", showInView, { passive: true });
    // safety net: never leave content hidden
    window.addEventListener("load", () => setTimeout(() => reveals.forEach((el) => el.classList.add("in")), 700));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Hero 3D scroll-flatten (Aceternity-style, vanilla) ---------- */
  (function heroScroll() {
    const shot = $(".lp-shot");
    const card = $(".browser");
    if (!shot || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.style.transform = "none";
      return;
    }
    let ticking = false;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    function update() {
      ticking = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = shot.getBoundingClientRect();
      const mobile = window.innerWidth <= 768;
      // progress 0 (just entering from bottom) -> 1 (risen into upper viewport)
      const p = clamp((vh - r.top) / (vh * 0.85), 0, 1);
      const maxRot = mobile ? 10 : 16;
      const rot = (maxRot * (1 - p)).toFixed(2);
      const scale = (mobile ? 0.96 + 0.04 * p : 1.03 - 0.03 * p).toFixed(4);
      card.style.transform = "rotateX(" + rot + "deg) scale(" + scale + ")";
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  })();
})();
