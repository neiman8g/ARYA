/* ARYA: pre-launch site interactions */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero archway: opens as you scroll ---------- */
  const hero = $("[data-hero]");
  const header = $("[data-header]");
  let heroP = reduceMotion ? 1 : 0;
  const heroVideo = $("[data-hero-video]");
  let lastY = window.scrollY; // used by the header tuck logic

  if (!reduceMotion) {
    hero.classList.add("is-scrolly");
    let ticking = false;
    const update = () => {
      ticking = false;
      const travel = hero.offsetHeight - window.innerHeight;
      const raw = travel > 0 ? -hero.getBoundingClientRect().top / travel : 1;
      heroP = Math.min(1, Math.max(0, raw));
      // ease-in-out so the opening feels deliberate
      const eased = heroP < 0.5 ? 2 * heroP * heroP : 1 - Math.pow(-2 * heroP + 2, 2) / 2;
      hero.style.setProperty("--p", eased.toFixed(4));
      hero.classList.toggle("is-open", eased > 0.82);
      updateHeader();
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------- Hero film: the cove loops inside the arch and stays as it opens; pauses once scrolled past ---------- */
  const saveData = navigator.connection && navigator.connection.saveData;
  if (heroVideo && !reduceMotion && !saveData) {
    // Landscape on desktop, portrait on phones. MP4 first on iOS for reliable inline autoplay.
    const base = window.matchMedia("(max-width: 767px)").matches ? "assets/cove-portrait" : "assets/cove-landscape";
    const iOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const sources = [[base + ".webm", "video/webm"], [base + ".mp4", "video/mp4"]];
    if (iOS) sources.reverse();
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.autoplay = true;
    heroVideo.playsInline = true;
    heroVideo.poster = base.replace("cove-", "cove-poster-") + ".webp?v=3";
    sources.forEach(([src, type]) => { const s = document.createElement("source"); s.src = src + "?v=3"; s.type = type; heroVideo.appendChild(s); });
    heroVideo.preload = "auto";
    heroVideo.load();
    heroVideo.addEventListener("playing", () => heroVideo.classList.add("is-playing"), { once: true });
    const tryPlay = () => { const p = heroVideo.play(); if (p) p.catch(() => {}); };
    heroVideo.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => {
        if (en.isIntersecting) heroVideo.play().catch(() => {}); else heroVideo.pause();
      }).observe(hero.querySelector(".hero-stage"));
    }
  }

  /* ---------- Fit film: plays only while on screen ---------- */
  const fitVideo = $("[data-fit-video]");
  if (fitVideo) {
    if (reduceMotion || !("IntersectionObserver" in window)) fitVideo.controls = true;
    else new IntersectionObserver(([en]) => {
      if (en.isIntersecting) fitVideo.play().catch(() => {}); else fitVideo.pause();
    }, { threshold: 0.25 }).observe(fitVideo);
  }

  /* ---------- Header: light text over the open image, solid after ---------- */
  // Past the hero the menu tucks away while scrolling down and returns on any scroll up
  function updateHeader() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const overHero = heroBottom > header.offsetHeight + 4;
    const onImage = overHero && (reduceMotion || heroP > 0.55);
    header.classList.toggle("on-image", onImage);
    header.classList.toggle("is-solid", !overHero);
    const y = window.scrollY;
    const menuOpen = header.classList.contains("menu-open");
    if (overHero || menuOpen || y < lastY - 6) header.classList.remove("is-tucked");
    else if (y > lastY + 6) header.classList.add("is-tucked");
    if (Math.abs(y - lastY) > 6) lastY = y;
  }
  // Keep the menu visible whenever keyboard focus moves into it
  header.addEventListener("focusin", () => header.classList.remove("is-tucked"));

  // Announcement bar hides for people who have already signed up
  const SIGNED_KEY = "arya_signed_up";
  try { if (localStorage.getItem(SIGNED_KEY)) document.documentElement.classList.add("no-announce"); } catch (_) {}
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Mobile menu ---------- */
  const toggle = $("[data-menu-toggle]");
  const menu = $("#mobile-menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
    menu.hidden = !open;
    header.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); }
  });

  /* ---------- Active nav link ---------- */
  const navLinks = $$(".nav-links a");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          if (a.getAttribute("href") === `#${entry.target.id}`) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach((a) => { const s = $(a.getAttribute("href")); if (s) obs.observe(s); });
    obs.observe(hero); // no link matches #top, so the hero clears the highlight
  }

  /* ---------- Collection: arch colonnade ---------- */
  const COLORS = {
    cognac: { name: "Cognac", hex: "#8C4A25", ink: "#ECE6DB" },
    sand:   { name: "Sand",   hex: "#D6C4A3", ink: "#1B2A4A" },
    slate:  { name: "Slate",  hex: "#6B7176", ink: "#ECE6DB" },
    ink:    { name: "Ink",    hex: "#23262C", ink: "#D6C4A3" },
  };
  const PRODUCTS = [
    { name: "The Noble Sports Bra", cut: "womens", desc: "Medium to high support, four way stretch.", color: "sand" },
    { name: "The Noble Legging",    cut: "womens", desc: "Four way stretch and a high rise waistband.", color: "cognac" },
    { name: "The Noble Short",      cut: "womens", desc: "Four way stretch, cut for her.", color: "slate" },
    { name: "The Noble Slim Tank",  cut: "womens", desc: "A fitted tank that pairs with the Noble Sports Bra.", color: "ink" },
    { name: "The Noble Tee",        cut: "mens",   desc: "A silky feel that resists odor.", color: "sand" },
    { name: "The Noble Short",      cut: "mens",   desc: "Extended thigh room, four way stretch.", color: "ink" },
    { name: "The Noble Jogger",     cut: "mens",   desc: "A tapered jogger with four way stretch.", color: "cognac" },
  ];
  const cutLabel = (c) => (c === "womens" ? "Women's" : "Men's");

  const track = $("[data-track]");
  const piece = $(".piece");
  const pieceMeta = $("[data-piece-meta]");
  const pieceName = $("[data-piece-name]");
  const pieceDesc = $("[data-piece-desc]");
  const colorways = $("[data-colorways]");
  const count = $("[data-count]");

  track.innerHTML = PRODUCTS.map((p, i) => {
    const c = COLORS[p.color];
    return `
      <li class="slide" data-i="${i}" data-cut="${p.cut}">
        <button type="button" class="slide-arch" style="--frame:${c.hex};--ink:${c.ink}" aria-label="${p.name}, ${cutLabel(p.cut)}" tabindex="-1">
          <span class="slide-label" aria-hidden="true">
            <svg class="slide-mark" viewBox="200 200 800 680" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round"><path pathLength="1" d="M600 220 975.5 859.5H224.5Z"/><path pathLength="1" d="M395 623H804"/></svg>
            <span class="slide-kicker">The Noble</span>
            <span class="slide-title">${p.name.replace("The Noble ", "")}</span>
            <span class="slide-fabric">${cutLabel(p.cut)}</span>
          </span>
        </button>
      </li>`;
  }).join("");
  colorways.innerHTML = Object.entries(COLORS).map(([key, c]) =>
    `<button type="button" class="colorway" style="--c:${c.hex}" data-color="${key}" aria-pressed="false" aria-label="${c.name}"></button>`).join("");

  const slides = $$(".slide", track);
  const visible = () => slides.filter((s) => !s.hidden);
  let active = -1;

  const renderPiece = () => {
    const p = PRODUCTS[active];
    pieceMeta.textContent = cutLabel(p.cut);
    pieceName.textContent = p.name;
    pieceDesc.textContent = `${p.desc} Shown in ${COLORS[p.color].name}.`;
    $$("button", colorways).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.color === p.color)));
    const vis = visible();
    count.textContent = `${vis.findIndex((s) => Number(s.dataset.i) === active) + 1} / ${vis.length}`;
    piece.classList.remove("is-swapping");
    void piece.offsetWidth;
    piece.classList.add("is-swapping");
  };

  // Scale and fade each arch by its distance from the centre of the colonnade
  let measuring = false;
  const measure = () => {
    measuring = false;
    const box = track.getBoundingClientRect();
    const mid = box.left + box.width / 2;
    let best = null, bestD = Infinity;
    for (const s of visible()) {
      const r = s.getBoundingClientRect();
      const d = (r.left + r.width / 2 - mid) / r.width;
      const ad = Math.min(Math.abs(d), 1.6);
      s.style.setProperty("--s", (1 - Math.min(ad, 1) * 0.16).toFixed(3));
      s.style.setProperty("--o", (1 - Math.min(ad, 1) * 0.45).toFixed(3));
      if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = s; }
    }
    const i = best ? Number(best.dataset.i) : -1;
    if (i !== active && i > -1) {
      slides.forEach((s) => s.classList.toggle("is-active", s === best));
      active = i;
      renderPiece();
    }
  };
  const requestMeasure = () => { if (!measuring) { measuring = true; requestAnimationFrame(measure); } };
  track.addEventListener("scroll", requestMeasure, { passive: true });
  window.addEventListener("resize", () => {
    const s = slides.find((sl) => Number(sl.dataset.i) === active);
    if (s) centre(s, false);
    requestMeasure();
  });

  const centre = (slide, smooth = true) => {
    const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left, behavior: smooth && !reduceMotion ? "smooth" : "auto" });
  };
  const step = (dir) => {
    const vis = visible();
    const at = vis.findIndex((s) => Number(s.dataset.i) === active);
    const next = vis[Math.min(vis.length - 1, Math.max(0, at + dir))];
    if (next) centre(next);
  };
  $("[data-prev]").addEventListener("click", () => step(-1));
  $("[data-next]").addEventListener("click", () => step(1));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });

  // Mouse drag (touch already scrolls natively)
  let drag = null;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag = { x: e.clientX, left: track.scrollLeft, moved: false };
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; track.classList.add("is-dragging"); }
    if (drag.moved) track.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!drag) return;
    const wasDrag = drag.moved;
    drag = null;
    track.classList.remove("is-dragging");
    if (wasDrag) {
      const s = slides.find((sl) => Number(sl.dataset.i) === active);
      if (s) centre(s);
      const kill = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
      track.addEventListener("click", kill, { capture: true, once: true });
      setTimeout(() => track.removeEventListener("click", kill, { capture: true }), 0);
    }
  });

  // Click a side arch to bring it to the centre
  track.addEventListener("click", (e) => {
    const s = e.target.closest(".slide");
    if (s && Number(s.dataset.i) !== active) centre(s);
  });

  // Colourway: wash the new colour up through the arch
  colorways.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b || active < 0 || PRODUCTS[active].color === b.dataset.color) return;
    const p = PRODUCTS[active];
    const c = COLORS[b.dataset.color];
    p.color = b.dataset.color;
    const arch = $(".slide-arch", slides[active]);
    const apply = () => {
      arch.style.setProperty("--frame", c.hex);
      arch.style.setProperty("--ink", c.ink);
      arch.classList.remove("is-washing");
    };
    if (reduceMotion) apply();
    else {
      arch.style.setProperty("--wash", c.hex);
      arch.style.setProperty("--ink", c.ink);
      arch.classList.remove("is-washing");
      void arch.offsetWidth;
      arch.classList.add("is-washing");
      arch.addEventListener("animationend", apply, { once: true });
    }
    renderPiece();
  });

  const filters = $$(".cut-filter button");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    slides.forEach((s) => { s.hidden = f !== "all" && s.dataset.cut !== f; });
    active = -1;
    const first = visible()[0];
    centre(first, false);
    requestMeasure();
  }));

  // Menu links "Women" and "Men" open the collection pre-filtered
  document.querySelectorAll("[data-shop]").forEach((a) => a.addEventListener("click", () => {
    const btn = document.querySelector(`.cut-filter [data-filter="${a.dataset.shop}"]`);
    if (btn) btn.click();
  }));

  // Start on the first piece, centred
  requestAnimationFrame(() => { centre(slides[0], false); measure(); });

  /* ---------- Calm motion across the page ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion");

    // Gentle parallax on photographs
    const plx = $$(".arch img, .about-photo img").filter((img) => !img.closest(".hero"));
    let plxTicking = false;
    const parallax = () => {
      plxTicking = false;
      const vh = window.innerHeight;
      for (const img of plx) {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const t = (r.top + r.height / 2 - vh / 2) / vh; // roughly -1 to 1 across the screen
        img.style.translate = `0 ${(t * -6).toFixed(2)}%`;
      }
    };
    window.addEventListener("scroll", () => { if (!plxTicking) { plxTicking = true; requestAnimationFrame(parallax); } }, { passive: true });
    parallax();

  }

  /* ---------- Signup forms (hero + first drop) to Klaviyo ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const INVALID = "Enter an email address like name@example.com.";
  const BUTTON = "Don't miss the first drop";

  // Attribution: UTM tags from the landing URL, kept for the visit so a refresh does not lose them
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"];
  const utm = {};
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((k) => {
    let v = params.get(k);
    try {
      if (v) sessionStorage.setItem("arya_" + k, v);
      else v = sessionStorage.getItem("arya_" + k);
    } catch (_) { /* storage blocked: use the URL only */ }
    if (v) utm[k] = v;
  });

  const subscribe = async (form, address, interests) => {
    const properties = { ...utm, signup_page_url: window.location.href, signup_form: form.dataset.source };
    if (interests.length) properties.waitlist_interest = interests;
    const res = await fetch(`https://a.klaviyo.com/client/subscriptions?company_id=${encodeURIComponent(form.dataset.klaviyoCompany)}`, {
      method: "POST",
      headers: { "Content-Type": "application/vnd.api+json", revision: "2024-10-15" },
      body: JSON.stringify({
        data: {
          type: "subscription",
          attributes: {
            custom_source: form.dataset.source,
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: address,
                  properties,
                },
              },
            },
          },
          relationships: { list: { data: { type: "list", id: form.dataset.klaviyoList } } },
        },
      }),
    });
    if (!res.ok) throw new Error(`Klaviyo responded ${res.status}`);
  };

  $$("[data-signup]").forEach((form) => {
    const email = $("input[type=email]", form);
    const error = $(".field-error", form);
    const submit = $("[data-submit]", form);
    const success = $("[data-success]", form.parentElement);
    const showError = (msg) => {
      error.textContent = msg;
      error.hidden = !msg;
      if (msg) email.setAttribute("aria-invalid", "true"); else email.removeAttribute("aria-invalid");
    };
    email.addEventListener("blur", () => { if (email.value && !EMAIL_RE.test(email.value.trim())) showError(INVALID); });
    email.addEventListener("input", () => { if (!error.hidden && EMAIL_RE.test(email.value.trim())) showError(""); });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const address = email.value.trim();
      if (!address) { showError("Enter your email address to get first access."); email.focus(); return; }
      if (!EMAIL_RE.test(address)) { showError(INVALID); email.focus(); return; }
      showError("");
      submit.disabled = true;
      submit.setAttribute("aria-busy", "true");
      $(".btn-label", submit).textContent = "Signing you up";
      try {
        await subscribe(form, address, $$('input[name="interest"]:checked', form).map((i) => i.value));
        form.hidden = true;
        success.hidden = false;
        try { localStorage.setItem(SIGNED_KEY, "1"); } catch (_) {}
        document.documentElement.classList.add("no-announce");
        success.focus();
      } catch (err) {
        console.error(err);
        showError("Your email was not added. Check your connection and try again, or write to hello@arya.clothing.");
      } finally {
        submit.disabled = false;
        submit.removeAttribute("aria-busy");
        $(".btn-label", submit).textContent = BUTTON;
      }
    });
  });

  $("[data-year]").textContent = new Date().getFullYear();
})();
