/* ============================================================
   TRULU — One-page site: waitlist + scroll interactions
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  document.documentElement.classList.add("js");
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     ⬇️  WAITLIST CONFIG — connect signups to your office email
     ------------------------------------------------------------------
     GOAL: when someone joins the waitlist, the signup lands in a Google
     Sheet and Google emails you at your office address.

     ONE-TIME SETUP (Google Forms — free):
       1. Go to forms.google.com → new form → add ONE "Short answer"
          question called "Email". (Add "Name" too if you want.)
       2. Top-right ⋮ menu → "Get pre-filled link" → type anything in the
          Email box → "Get link" → copy it. It looks like:
            https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&entry.1234567890=test
          • The number after "entry." is your googleEntryId  (e.g. entry.1234567890)
          • Replace the trailing "/viewform...." with "/formResponse" to get
            the POST endpoint. Final waitlistEndpoint looks like:
            https://docs.google.com/forms/d/e/FORM_ID/formResponse
       3. In the form's "Responses" tab → link a Google Sheet, then click
          the Sheet's ⋮ → "Notification settings" (or Tools ▸ Notification
          rules) → "Notify me: Any time a form is submitted" → save.
          Those emails go to whatever Google account owns the form — so
          CREATE/OWN THE FORM WITH YOUR OFFICE EMAIL.
       4. Paste the two values below. Done — test one signup end to end.

     Other services also work here (any URL that accepts an "email" field):
       • Formspree: "https://formspree.io/f/XXXXXXX"  (leave googleEntryId "")
       • Getform / Web3Forms / Basin / Tally: their form POST URL
  ------------------------------------------------------------------ */
  const CONFIG = {
    // Google Forms → paste the "…/formResponse" URL here:
    waitlistEndpoint: "https://docs.google.com/forms/d/e/1FAIpQLSfcJVeBYeJxdYooQ4-MxlYbkslYbItWI71FUDyw-bf0kDSy5g/formResponse",
    googleEntryId: "entry.1941758690",  // the Email field's entry id
    startingCount: 1247            // the "spot in line" / social-proof base
  };

  /* ---------- Freeze-safe reveal safety net ----------
     Hero entrance animations look great in a focused tab, but if the page
     is ever rendered with a paused animation clock, force content visible. */
  window.setTimeout(function () {
    $$(".cs-reveal").forEach(function (el) { el.style.animation = "none"; el.style.opacity = "1"; });
  }, 1400);

  /* ---------- Sticky nav — slides in after the hero ---------- */
  const nav = $("#siteNav");
  const hero = $("#hero");
  function navCheck() {
    const threshold = (hero ? hero.offsetHeight : window.innerHeight) * 0.72;
    nav.classList.toggle("show", window.scrollY > threshold);
  }
  navCheck();
  window.addEventListener("scroll", navCheck, { passive: true });
  window.addEventListener("resize", navCheck, { passive: true });

  /* ---------- "Join the waitlist" buttons → scroll to hero form ---------- */
  $$("[data-scroll-top]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      window.setTimeout(function () {
        const inp = $("#csEmail");
        const formView = $("#csForm");
        if (inp && formView && formView.style.display !== "none") inp.focus({ preventScroll: true });
      }, reducedMotion ? 0 : 700);
    });
  });

  /* ---------- Scroll reveal for sections (transform only — freeze-safe) ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    // reveal anything already in view right away
    const showInView = function () {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach(function (el) {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.96 && r.bottom > -40) el.classList.add("in");
      });
    };
    showInView();
    requestAnimationFrame(showInView);
    // safety net: never leave content offset
    window.addEventListener("load", function () {
      window.setTimeout(function () { reveals.forEach(function (el) { el.classList.add("in"); }); }, 900);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Product shot: 3D flatten on scroll ---------- */
  (function shotScroll() {
    const shot = $(".lp-shot");
    const card = $(".browser");
    if (!shot || !card) return;
    if (reducedMotion) { card.style.transform = "none"; return; }
    let ticking = false;
    const clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
    function update() {
      ticking = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = shot.getBoundingClientRect();
      const mobile = window.innerWidth <= 768;
      const p = clamp((vh - r.top) / (vh * 0.85), 0, 1);
      const maxRot = mobile ? 10 : 16;
      const rot = (maxRot * (1 - p)).toFixed(2);
      const scale = (mobile ? 0.96 + 0.04 * p : 1.03 - 0.03 * p).toFixed(4);
      card.style.transform = "rotateX(" + rot + "deg) scale(" + scale + ")";
    }
    const onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  })();

  /* ---------- Floating particles (hero) ---------- */
  (function particles() {
    const wrap = $("#particles");
    if (!wrap || reducedMotion) return;
    const colors = ["#1b9cd8", "#7b6cf6", "#18c29c", "#f5a623", "#ff5da2"];
    const N = window.innerWidth < 620 ? 10 : 18;
    let html = "";
    for (let i = 0; i < N; i++) {
      const left = Math.random() * 100;
      const size = 5 + Math.random() * 6;
      const dur = 14 + Math.random() * 16;
      const delay = -Math.random() * dur;
      const drift = (Math.random() * 120 - 60).toFixed(0) + "px";
      const c = colors[i % colors.length];
      html += `<i style="left:${left}%;width:${size}px;height:${size}px;background:${c};--drift:${drift};animation-duration:${dur}s;animation-delay:${delay}s"></i>`;
    }
    wrap.innerHTML = html;
  })();

  /* ---------- Social-proof count-up ---------- */
  (function countUp() {
    const el = $("#csCount");
    if (!el) return;
    const target = CONFIG.startingCount;
    if (reducedMotion) { el.textContent = target.toLocaleString("en-US") + "+"; return; }
    let t0;
    function step(now) {
      if (!t0) t0 = now;
      const p = Math.min(1, (now - t0) / 1400);
      const cur = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = cur.toLocaleString("en-US") + "+";
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  })();

  /* ---------- Waitlist submit ---------- */
  const form = $("#waitForm");
  const emailInp = $("#csEmail");
  const submitBtn = $("#csSubmit");
  const errEl = $("#csErr");

  function valid(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  function nextSpot() {
    let n = 0;
    try { n = parseInt(localStorage.getItem("trulu.waitlist.n") || "0", 10) || 0; } catch (e) {}
    n += 1;
    try { localStorage.setItem("trulu.waitlist.n", String(n)); } catch (e) {}
    return CONFIG.startingCount + n;
  }

  function saveLocal(email) {
    try {
      const list = JSON.parse(localStorage.getItem("trulu.waitlist") || "[]");
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("trulu.waitlist", JSON.stringify(list));
    } catch (e) {}
  }

  function sendToEndpoint(email) {
    const url = (CONFIG.waitlistEndpoint || "").trim();
    if (!url) return Promise.resolve();
    const body = new URLSearchParams();
    body.set("email", email);
    if (CONFIG.googleEntryId) body.set(CONFIG.googleEntryId, email);
    // no-cors so third-party endpoints (Mailchimp/Google/Formspree) accept it without CORS errors
    return fetch(url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body })
      .catch(function () { /* swallow — we already captured locally */ });
  }

  function showSuccess(email, spot) {
    $("#csForm").style.display = "none";
    const ok = $("#csSuccess");
    ok.classList.add("show");
    $("#csSuccessMsg").innerHTML = "We'll email <b>" + email.replace(/</g, "&lt;") + "</b> the moment Trulu opens. Keep an eye out for early-access perks.";
    $("#csSpot").textContent = "#" + spot.toLocaleString("en-US");
    burst();
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = (emailInp.value || "").trim();
      errEl.textContent = "";
      if (!valid(email)) { errEl.textContent = "Please enter a valid email address."; emailInp.focus(); return; }

      submitBtn.disabled = true;
      submitBtn.innerHTML = "Joining…";

      saveLocal(email);
      const spot = nextSpot();
      sendToEndpoint(email);  // fire to Google Forms in the background
      // show success on a fixed delay so a slow/blocked request never stalls the UI
      setTimeout(function () { showSuccess(email, spot); }, 650);
    });
  }

  /* ---------- Confetti burst ---------- */
  function burst() {
    if (reducedMotion) return;
    const host = $("#burst");
    if (!host) return;
    const colors = ["#1b9cd8", "#7b6cf6", "#18c29c", "#f5a623", "#ff5da2", "#4fc3ef"];
    for (let i = 0; i < 70; i++) {
      const p = document.createElement("i");
      const ang = Math.random() * Math.PI * 2;
      const vel = 120 + Math.random() * 320;
      const dx = Math.cos(ang) * vel;
      const dy = Math.sin(ang) * vel - 120;
      p.style.background = colors[i % colors.length];
      p.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      host.appendChild(p);
      const dur = 900 + Math.random() * 900;
      p.animate(
        [
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + dx + "px," + dy + "px) rotate(" + (Math.random() * 720 - 360) + "deg)", opacity: 0 }
        ],
        { duration: dur, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" }
      );
      setTimeout(function () { p.remove(); }, dur + 60);
    }
  }

  /* ---------- Share ---------- */
  const shareUrl = location.href.split("#")[0];
  const shareText = "Trulu is launching soon — the AI-first HR & payroll platform. Join the waitlist:";
  document.addEventListener("click", function (e) {
    const a = e.target.closest("[data-share]");
    if (!a) return;
    e.preventDefault();
    const k = a.dataset.share;
    if (k === "x") window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&url=" + encodeURIComponent(shareUrl), "_blank");
    else if (k === "linkedin") window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl), "_blank");
    else if (k === "copy") {
      const done = function () { const c = $("#csCopy"); if (c) { const o = c.innerHTML; c.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17l9-10"/></svg>'; setTimeout(function () { c.innerHTML = o; }, 1500); } };
      if (navigator.clipboard) navigator.clipboard.writeText(shareUrl).then(done).catch(done); else done();
    }
  });
})();
