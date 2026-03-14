"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/products";

// ─── Brand SVG Components ────────────────────────────────────────────────────

function AryaMark({ size = 40, color = "#8B6A3E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,7 93,87 7,87" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="miter" />
      <line x1="27" y1="63" x2="73" y2="63" stroke={color} strokeWidth="4.5" />
    </svg>
  );
}

function AryaWordmark({ height = 20, color = "#2C2418" }: { height?: number; color?: string }) {
  return (
    <svg height={height} viewBox="0 0 200 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="26" textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'Garamond', Georgia, serif"
        fontSize="30" letterSpacing="12" fill={color} fontWeight="500">ARYA</text>
    </svg>
  );
}

function AryaLogo({ size = 36, textColor = "#2C2418", markColor = "#8B6A3E", stacked = false }:
  { size?: number; textColor?: string; markColor?: string; stacked?: boolean }) {
  if (stacked) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <AryaMark size={size} color={markColor} />
      <AryaWordmark height={size * 0.42} color={textColor} />
    </div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13 }}>
      <AryaMark size={size} color={markColor} />
      <AryaWordmark height={size * 0.48} color={textColor} />
    </div>
  );
}

function WeavePattern({ id, color = "#8B6A3E", opacity = 0.08 }: { id: string; color?: string; opacity?: number }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}
      viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
          <polygon points="36,3 69,21 69,51 36,69 3,51 3,21" fill="none" stroke={color} strokeWidth="0.6" />
          <polygon points="36,14 58,27 58,45 36,58 14,45 14,27" fill="none" stroke={color} strokeWidth="0.3" />
          <circle cx="36" cy="36" r="2.5" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="36" y1="3" x2="36" y2="69" stroke={color} strokeWidth="0.2" opacity="0.4" />
          <line x1="3" y1="36" x2="69" y2="36" stroke={color} strokeWidth="0.2" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill={`url(#${id})`} />
    </svg>
  );
}

function ProductPlaceholder({ name, patternId }: { name: string; patternId: string }) {
  return (
    <div className="p-placeholder">
      <div className="p-placeholder-bg" />
      <WeavePattern id={patternId} color="#8B6A3E" opacity={0.08} />
      <div className="p-placeholder-content">
        <AryaMark size={56} color="#8B6A3E" />
        <span className="p-placeholder-name">{name}</span>
      </div>
    </div>
  );
}

// ─── Collection card short descriptions (homepage) ───────────────────────────
const CARD_DESCRIPTIONS: Record<string, string> = {
  "noble-legging": "NobleFlex fabric. Four-way stretch, muscle compression, and extended thigh room.",
  "noble-bra": "NobleFlex fabric. Medium to high support, skin conscious construction.",
  "noble-long-crop": "NobleFlex fabric. Pairs as a set with the Noble Sports Bra.",
  "noble-short": "NobleDry fabric. Extended thigh room, four-way stretch, built for real movement.",
  "noble-tee": "NobleSoft fabric. Silk-like feel, no synthetics against your skin.",
  "noble-pant": "NobleDry fabric. Performance trouser engineered for the body that moves.",
};

// ─── Types & Data ─────────────────────────────────────────────────────────────

type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: string;
  size: string;
  color: string;
  qty: number;
};


// ─── Product Card ─────────────────────────────────────────────────────────────

type ProductCardProps = {
  p: (typeof PRODUCTS)[0];
  selectedColors: Record<string, string>;
  setColor: (productId: string, colorName: string) => void;
};

function ProductCard({ p, selectedColors, setColor }: ProductCardProps) {
  const selectedColor = selectedColors[p.id] ?? p.colors?.[0]?.name;
  return (
    <div className="p-card">
      <Link href={`/products/${p.slug}`} className="p-visual-link">
        <div className="p-visual" data-color={selectedColor}>
          <ProductPlaceholder name={p.name} patternId={`p-place-${p.id}`} />
          <div className="p-tag">Pre-Order</div>
        </div>
      </Link>
      <div className="p-info">
        <div className="p-cat">{p.gender}</div>
        <Link href={`/products/${p.slug}`} className="p-name">{p.name}</Link>
        {CARD_DESCRIPTIONS[p.id] && <p className="p-card-desc">{CARD_DESCRIPTIONS[p.id]}</p>}
        {p.colors?.length > 0 && (
          <div className="p-color-row">
            <span className="p-opt-label">Color</span>
            <div className="p-color-swatches">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`p-color-swatch ${selectedColor === c.name ? "selected" : ""}`}
                  style={{ background: c.hex }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setColor(p.id, c.name); }}
                  title={c.name}
                  aria-label={`Color ${c.name}`}
                />
              ))}
            </div>
          </div>
        )}
        <div className="p-foot">
          <div className="p-price">{p.price}<small>USD</small></div>
          <Link href={`/products/${p.slug}`} className="btn-p">
            Select size
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AryaPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [navStuck, setNavStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [collectionFilter, setCollectionFilter] = useState<"all" | "women" | "men">("all");
  const [fitTab, setFitTab] = useState<"women" | "men">("women");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const womenProducts = PRODUCTS.filter(p => p.gender === "Women's");
  const menProducts = PRODUCTS.filter(p => p.gender === "Men's");

  // Threshold-based scroll — only re-renders when crossing 60px
  useEffect(() => {
    const h = () => {
      const over = window.scrollY > 60;
      setNavStuck(prev => prev === over ? prev : over);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Sticky CTA bar: show on phone after scrolling past hero (~400px)
  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 400 && window.innerWidth <= 768);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  // Lock body scroll when mobile menu or cart is open
  useEffect(() => {
    document.body.style.overflow = (menuOpen || cartOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, cartOpen]);

  // Close mobile menu when route changes (e.g. hash change for #waitlist)
  const pathname = usePathname();

  // Scroll spy: highlight nav link for the section in view (homepage only)
  const sectionIds = ["collection", "ethos", "problem", "fit", "mission", "founder", "waitlist", "arya-standard"];
  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (top <= viewportMid && top + height >= viewportMid) {
          current = id;
          break;
        }
        if (top < viewportMid) current = id;
      }
      setActiveSection((prev) => (current !== prev ? current : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  // Section fade-in on scroll
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setWaitlistError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setWaitlistError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setEmail("");
    } catch {
      setWaitlistError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const setColor = (productId: string, colorName: string) =>
    setSelectedColors(prev => ({ ...prev, [productId]: colorName }));

  const updateQty = (id: string, delta: number) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const removeFromCart = (id: string) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const cartTotal = cart.reduce((sum, i) => sum + parseInt(i.price.replace("$", ""), 10) * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const goToCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(({ id, name, price, size, color, qty }) => ({ id, name, price, size, color, qty })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCheckoutError(data.error || "Checkout failed");
        setCheckoutLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setCheckoutError("Checkout is not configured");
    } catch {
      setCheckoutError("Something went wrong");
    }
    setCheckoutLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .fade-section {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.65s cubic-bezier(.16,1,.3,1), transform 0.65s cubic-bezier(.16,1,.3,1);
        }
        .fade-section.visible { opacity: 1; transform: translateY(0); }
        .hero.fade-section { opacity: 1; transform: none; }

        :root {
          --sand:    #F5EFE4;
          --sand-2:  #EEE6D8;
          --sand-3:  #E6DCC9;
          --sand-4:  #D4C9B4;
          --sand-5:  #B8A98F;
          --cognac:  #7A5A2F;
          --cognac-lt: #9A7040;
          --ink:     #1E1810;
          --ink-80:  rgba(30,24,16,.82);
          --ink-60:  rgba(30,24,16,.62);
          --ink-40:  rgba(30,24,16,.42);
          --ink-08:  rgba(30,24,16,.05);
        }

        body {
          background: var(--sand);
          color: var(--ink);
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          font-size: 16px;
          line-height: 1.6;
          cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='50,7 93,87 7,87' stroke='%237A5A2F' stroke-width='4.5' fill='none' stroke-linejoin='miter'/%3E%3Cline x1='27' y1='63' x2='73' y2='63' stroke='%237A5A2F' stroke-width='4.5'/%3E%3C/svg%3E") 16 2, auto;
        }
        a, button, [role="button"], [type="button"], [type="submit"], .nav-cart-btn, .hamburger, .fit-tab, .coll-tab, .p-quickadd-add, .p-quickadd-sizes button, .p-size-btn, .btn-p, .qty-btn, .wl-submit, .cart-drawer-close {
          cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='50,7 93,87 7,87' stroke='%237A5A2F' stroke-width='5' fill='none' stroke-linejoin='miter'/%3E%3Cline x1='27' y1='63' x2='73' y2='63' stroke='%237A5A2F' stroke-width='5'/%3E%3C/svg%3E") 16 2, pointer;
        }
        input, textarea { cursor: text; }

        a:focus-visible, button:focus-visible, input:focus-visible {
          outline: 2px solid var(--cognac);
          outline-offset: 2px;
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--sand); }
        ::-webkit-scrollbar-thumb { background: var(--sand-5); }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 26px 64px;
          padding-top: max(26px, env(safe-area-inset-top));
          display: flex; align-items: center; justify-content: space-between;
          transition: all .45s cubic-bezier(.16,1,.3,1);
        }
        .nav.stuck {
          padding: 14px 64px;
          padding-top: max(14px, env(safe-area-inset-top));
          background: rgba(245,239,228,.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--sand-4);
          box-shadow: 0 1px 20px rgba(30,24,16,.06);
        }
        .nav-logo-link { display: flex; align-items: center; text-decoration: none; }
        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a {
          font-size: 12px; letter-spacing: .22em; text-transform: uppercase;
          color: var(--ink-80); text-decoration: none; transition: color .25s;
          position: relative; font-weight: 500;
        }
        .nav-links a::after {
          content: ''; position: absolute; bottom: -3px; left: 0; right: 100%;
          height: 1px; background: var(--cognac); transition: right .3s;
        }
        .nav-links a:hover { color: var(--ink); }
        .nav-links a:hover::after { right: 0; }
        .nav-links a.active { color: var(--ink); }
        .nav-links a.active::after { right: 0; }

        .nav-actions { display: flex; align-items: center; gap: 10px; }

        .nav-cart-btn {
          position: relative; display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; letter-spacing: .24em; text-transform: uppercase;
          color: var(--ink-80); background: transparent;
          border: 1px solid var(--sand-4); padding: 9px 18px;
          cursor: pointer; font-family: 'Jost', sans-serif; font-weight: 500;
          transition: all .25s;
        }
        .nav-cart-btn:hover { border-color: var(--cognac); color: var(--cognac); }
        .nav-cart-count {
          min-width: 17px; height: 17px; background: var(--cognac); color: var(--sand);
          font-size: 10px; font-weight: 600; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center; padding: 0 3px;
        }

        .nav-btn {
          font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
          padding: 10px 26px; text-decoration: none; transition: all .25s; font-weight: 500;
        }
        .nav .btn-waitlist { padding: 10px 24px; }

        .hamburger {
          display: none; flex-direction: column; justify-content: center; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 14px; width: 44px; height: 44px;
          min-width: 44px; min-height: 44px;
        }
        .hamburger span {
          display: block; height: 1.5px; background: var(--ink);
          transition: all .3s cubic-bezier(.16,1,.3,1); transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .mobile-menu {
          position: fixed; inset: 0; z-index: 190;
          background: var(--sand); display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 4px;
          opacity: 0; visibility: hidden;
          transition: opacity .35s cubic-bezier(.16,1,.3,1), visibility .35s;
          padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
        }
        .mobile-menu.open { opacity: 1; visibility: visible; }
        .mobile-menu a {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 6vw, 44px);
          font-weight: 400; color: var(--ink); text-decoration: none;
          letter-spacing: .04em; transition: color .25s;
          padding: 16px 32px; min-height: 48px; display: inline-flex; align-items: center; justify-content: center;
          border-radius: 8px; min-width: 200px;
        }
        .mobile-menu a:hover { color: var(--cognac); background: rgba(30,24,16,.04); }
        .mobile-menu-primaries { display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 280px; margin-bottom: 8px; }
        .mobile-menu-cta {
          font-family: 'Jost', sans-serif !important; font-size: 12px !important;
          letter-spacing: .24em; text-transform: uppercase; font-weight: 500;
          padding: 18px 28px !important; min-height: 54px;
          display: inline-flex !important; align-items: center; justify-content: center;
          border-radius: 8px; min-width: auto; text-align: center;
        }
        .mobile-menu-cta-primary { background: var(--ink); color: var(--sand) !important; }
        .mobile-menu-cta-primary:hover { background: var(--cognac) !important; color: var(--sand) !important; }
        .mobile-menu-cta-secondary { background: transparent; border: 2px solid var(--ink); color: var(--ink) !important; }
        .mobile-menu-cta-secondary:hover { border-color: var(--cognac); color: var(--cognac) !important; background: transparent !important; }
        .mobile-menu .btn-waitlist { background: var(--sand) !important; border: 1px solid #A08C78 !important; color: var(--ink) !important; padding: 18px 28px; min-height: 54px; }
        .mobile-menu .btn-waitlist:hover { border-color: var(--cognac) !important; background: var(--sand-2) !important; color: var(--ink) !important; }
        .mobile-menu-divider { width: 40px; height: 1px; background: var(--sand-4); margin: 20px 0; }

        /* ── HERO ── */
        .hero {
          position: relative; min-height: 100vh;
          display: grid; grid-template-columns: 1fr 1fr; overflow: hidden;
        }
        .hero-left {
          position: relative; z-index: 2; display: flex; flex-direction: column;
          justify-content: center; padding: 64px 80px 72px; background: var(--sand);
        }
        .hero-right {
          position: relative; display: flex; align-items: center; justify-content: center;
          overflow: hidden; background: var(--sand-2);
        }
        .hero-right img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }
        .hero-right-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, rgba(245,239,228,.25) 0%, transparent 35%);
          pointer-events: none; z-index: 1;
        }
        .hero-content { animation: riseIn 1s cubic-bezier(.16,1,.3,1) .1s both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-content { animation: none; opacity: 1; }
          .ticker-track { animation: none; }
        }

        @keyframes riseIn { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:translateY(0) } }
        @keyframes scaleFade { from { opacity:0; transform:scale(.9) } to { opacity:1; transform:scale(1) } }

        .eyebrow {
          display: flex; align-items: center; gap: 14px;
          font-size: 12px; letter-spacing: .42em; text-transform: uppercase;
          color: var(--cognac); font-weight: 600; margin-bottom: 22px;
        }
        .eyebrow-rule { width: 28px; height: 1px; background: var(--cognac); flex-shrink: 0; }

        .hero-h1 {
          font-family: 'Cormorant Garamond', serif; font-weight: 400;
          font-size: clamp(52px, 6.5vw, 88px); line-height: 1.1;
          letter-spacing: -.01em; color: var(--ink); margin-bottom: 10px;
        }
        .hero-h1 em { font-style: italic; color: var(--cognac); }

        .hero-sub {
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 20px;
          color: var(--ink-80); font-weight: 400; margin-top: 22px; margin-bottom: 28px;
          line-height: 1.6; max-width: 440px;
        }

        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
        .hero-cta-note {
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 17px;
          color: var(--ink-80); font-weight: 400; margin-top: 16px;
        }

        .btn-dark {
          font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
          color: var(--sand); background: var(--ink); padding: 14px 36px;
          border: none; cursor: pointer; text-decoration: none; display: inline-block;
          transition: all .3s; clip-path: polygon(0 0, 100% 0, 100% 68%, 93% 100%, 0 100%);
          font-family: 'Jost', sans-serif; font-weight: 500;
        }
        .btn-dark:hover { background: var(--cognac); transform: translateY(-2px); }

        .btn-outline {
          font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
          color: var(--ink-80); background: transparent; padding: 14px 36px;
          border: 1px solid var(--sand-4); cursor: pointer; text-decoration: none;
          display: inline-block; transition: all .3s; font-family: 'Jost', sans-serif; font-weight: 500;
        }
        .btn-outline:hover { border-color: var(--cognac); color: var(--cognac); }

        /* ── TICKER ── */
        .ticker { background: var(--ink); padding: 12px 0; overflow: hidden; white-space: nowrap; }
        .ticker-track { display: inline-flex; animation: tick 32s linear infinite; }
        .ticker-item {
          font-size: 11px; letter-spacing: .4em; text-transform: uppercase;
          color: rgba(245,239,228,.6); padding: 0 32px; font-weight: 500;
          display: inline-flex; align-items: center; gap: 32px;
        }
        .ticker-item::after { content: '◆'; font-size: 4px; opacity: .35; }
        @keyframes tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        /* ── SHARED SECTION UTILS ── */
        .label {
          display: flex; align-items: center; gap: 14px;
          font-size: 11px; letter-spacing: .46em; text-transform: uppercase;
          color: var(--cognac); font-weight: 600; margin-bottom: 18px;
        }
        .label::after { content: ''; display: block; width: 26px; height: 1px; background: var(--cognac); }

        .display {
          font-family: 'Cormorant Garamond', serif; font-weight: 400;
          font-size: clamp(36px, 4vw, 58px); line-height: 1.05; color: var(--ink);
        }
        .display em { font-style: italic; color: var(--cognac); }

        .body-txt {
          font-size: 17px; line-height: 1.85; color: var(--ink-80);
          font-weight: 400; margin-bottom: 18px;
        }

        /* ── ETHOS (Our Story) ── */
        .ethos {
          padding: 160px 64px;
          background: var(--sand);
          display: grid; grid-template-columns: 1fr 1fr; gap: 120px; align-items: center;
        }
        .ethos-card {
          background: var(--sand-3); border: 1px solid var(--sand-4);
          aspect-ratio: 4/5; position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .ethos-card-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .5; }
        .ethos-card-content {
          position: relative; z-index: 2; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center; padding: 48px;
        }
        .ethos-card-label {
          font-size: 11px; letter-spacing: .5em; text-transform: uppercase;
          color: var(--ink); font-weight: 600; margin-top: 20px; margin-bottom: 10px;
        }
        .ethos-card-meaning {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 24px; font-weight: 500; color: var(--ink); line-height: 1.5;
        }
        .ethos-corner { position: absolute; bottom: 0; right: 0; width: 40%; height: 3px; background: var(--cognac); }
        .swatches { display: flex; border: 1px solid var(--sand-4); border-top: none; }
        .sw { flex: 1; height: 7px; }
        .ethos-divider { width: 40px; height: 1px; background: var(--cognac); margin: 40px 0; }

        .values { display: grid; grid-template-columns: 1fr; gap: 2px; }
        .val {
          background: var(--sand-2); padding: 20px 24px;
          border-left: 2px solid transparent; transition: border-color .3s;
        }
        .val:hover { border-left-color: var(--cognac); }
        .val-b {
          font-family: 'Cormorant Garamond', serif; font-size: 19px;
          font-style: italic; color: var(--ink); font-weight: 500; line-height: 1.5;
        }

        /* ── PROBLEM ── */
        .problem {
          padding: 160px 64px; background: var(--sand-2);
          display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center;
        }
        .pullquote {
          margin-top: 40px; padding: 28px 32px;
          border-left: 2px solid var(--cognac); background: var(--ink-08);
        }
        .pullquote p {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 22px; font-weight: 500; color: var(--ink); line-height: 1.55;
        }
        .stats {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
        }
        .stat {
          padding: 28px 24px; background: var(--sand); border: 1px solid var(--sand-4);
          border-radius: 8px; transition: border-color .25s;
          text-align: center;
        }
        .stat:hover { border-color: var(--cognac); }
        .stat-n {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 3vw, 34px); font-weight: 500;
          color: var(--cognac); line-height: 1; margin-bottom: 10px;
        }
        .stat-l { font-size: 14px; line-height: 1.6; color: var(--ink-80); font-weight: 400; }
        @media (min-width: 769px) {
          .stats { display: flex; flex-direction: row; flex-wrap: wrap; gap: 20px; }
          .stat { flex: 1; min-width: 160px; max-width: 240px; }
        }

        /* ── FIT ── */
        .fit { padding: 160px 64px; background: var(--sand); }
        .fit-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 120px; align-items: start; margin-top: 60px;
        }
        .fit-tabs { display: flex; gap: 2px; margin-bottom: 32px; }
        .fit-tab {
          font-size: 11px; letter-spacing: .24em; text-transform: uppercase;
          padding: 10px 20px; cursor: pointer; border: none;
          background: var(--sand-3); color: var(--ink-80); transition: all .3s;
          font-family: 'Jost', sans-serif; font-weight: 500;
        }
        .fit-tab.active { background: var(--ink); color: var(--sand); }
        .fit-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .fspec {
          background: var(--sand-2); padding: 24px 26px;
          border-left: 2px solid transparent; transition: border-color .3s;
        }
        .fspec:hover { border-left-color: var(--cognac); }
        .fspec-t { font-size: 11px; letter-spacing: .38em; text-transform: uppercase; color: var(--cognac); margin-bottom: 8px; font-weight: 600; }
        .fspec-b { font-size: 15px; line-height: 1.65; color: var(--ink-80); font-weight: 400; }

        .fit-visual { display: flex; flex-direction: column; gap: 12px; }
        .fit-main {
          background: var(--sand-3); border: 1px solid var(--sand-4);
          aspect-ratio: 3/4; position: relative; overflow: hidden;
        }
        .fit-main img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .fit-stats-row {
          display: flex; flex-direction: column; gap: 20px;
        }
        @media (min-width: 961px) {
          .fit-stats-row { flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: stretch; }
          .fit-mini { flex: 1; min-width: 140px; max-width: 220px; }
        }
        .fit-mini {
          display: flex; flex-direction: column; gap: 10px;
          padding: 20px 24px; border-radius: 8px;
          background: var(--sand); border: 1px solid var(--sand-4);
          flex: 1; min-width: 0;
          transition: border-color .25s, box-shadow .25s;
        }
        .fit-mini:hover { border-color: var(--cognac); box-shadow: 0 4px 16px rgba(30,24,16,.06); }
        .mini-n {
          font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500;
          color: var(--cognac); letter-spacing: .02em; line-height: 1.2;
        }
        .mini-l { font-size: 14px; color: var(--ink-80); font-weight: 400; line-height: 1.5; }

        /* ── COLLECTION ── */
        .collection { padding: 160px 64px; background: var(--sand-2); }
        .coll-sections { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .coll-sections .coll-section { margin-bottom: 0; }
        .coll-sections:has(.hide-by-filter) .coll-section:not(.hide-by-filter) { grid-column: 1 / -1; }
        .coll-header {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: flex-end; margin-bottom: 48px;
        }
        .coll-note { font-size: 17px; line-height: 1.8; color: var(--ink-80); font-weight: 400; }
        .coll-tabs { display: flex; gap: 2px; margin-bottom: 48px; }
        .coll-tab {
          font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
          padding: 12px 24px; cursor: pointer;
          border: 1px solid var(--sand-4); background: var(--sand); color: var(--ink-80);
          transition: all .3s; font-family: 'Jost', sans-serif; font-weight: 500;
        }
        .coll-tab:hover { color: var(--ink); border-color: var(--cognac); }
        .coll-tab.active { background: var(--ink); color: var(--sand); border-color: var(--ink); }
        .coll-section { margin-bottom: 64px; }
        .coll-section:last-child { margin-bottom: 0; }
        .coll-section.hide-by-filter { display: none; }
        .coll-section-title {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(26px, 3vw, 38px);
          font-weight: 500; color: var(--ink); margin-bottom: 32px; letter-spacing: -.01em;
        }

        .product-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 12px; max-width: 720px; margin: 0 auto;
        }

        .p-card {
          background: var(--sand); overflow: hidden;
          transition: transform .3s, box-shadow .3s;
          border: 1px solid var(--sand-3); position: relative;
        }
        .p-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(30,24,16,.06); }

        .p-visual-link { display: block; text-decoration: none; }
        .p-visual {
          aspect-ratio: 3/4; background: var(--sand-3);
          position: relative; overflow: hidden;
        }
        .p-placeholder {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .p-placeholder-bg {
          position: absolute; inset: 0;
          background: linear-gradient(165deg, var(--sand-2) 0%, var(--sand-3) 40%, #D4C4A8 100%);
        }
        .p-placeholder-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .p-placeholder-name {
          font-family: 'Cormorant Garamond', serif; font-size: 12px;
          font-style: italic; color: var(--ink-60); letter-spacing: .06em;
        }
        .p-tag {
          position: absolute; top: 8px; left: 0;
          background: var(--ink); color: var(--sand);
          font-size: 8px; letter-spacing: .24em; text-transform: uppercase;
          font-weight: 500; padding: 4px 10px;
        }

        .p-info { padding: 14px 16px 18px; }
        .p-cat { font-size: 10px; letter-spacing: .36em; text-transform: uppercase; color: var(--cognac); font-weight: 600; margin-bottom: 4px; }
        .p-name {
          font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 500; color: var(--ink);
          margin-bottom: 10px; text-decoration: none; display: block; transition: color .2s;
        }
        .p-name:hover { color: var(--cognac); }
        .p-card-desc { font-size: 13px; line-height: 1.5; color: var(--ink-80); margin: 0 0 12px; font-weight: 400; }
        .p-opt-label { font-size: 10px; letter-spacing: .32em; text-transform: uppercase; color: var(--ink-60); font-weight: 500; display: block; margin-bottom: 6px; }
        .p-color-row { margin-bottom: 10px; }
        .p-color-swatches { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .p-color-swatch {
          width: 24px; height: 24px; border-radius: 50%;
          border: 2px solid var(--sand-4); padding: 0; cursor: pointer;
          transition: transform .2s, border-color .2s; flex-shrink: 0;
        }
        .p-color-swatch:hover { transform: scale(1.08); border-color: var(--sand-5); }
        .p-color-swatch.selected { border-color: var(--ink); border-width: 2px; box-shadow: 0 0 0 1px var(--sand); }
        .p-size-row { margin-bottom: 10px; }
        .p-size-btns { display: flex; flex-wrap: wrap; gap: 6px; }
        .p-size-btn {
          width: 32px; height: 32px; min-width: 32px; min-height: 32px;
          border-radius: 50%; padding: 0; font-size: 10px; font-weight: 500;
          border: 1px solid var(--sand-4); background: var(--sand-2);
          font-family: 'Jost', sans-serif; color: var(--ink-80);
          cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; justify-content: center;
        }
        .p-size-btn:hover { border-color: var(--sand-5); color: var(--ink); }
        .p-size-btn.selected { border-color: var(--cognac); background: var(--ink); color: var(--sand); }

        .p-foot {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 10px; border-top: 1px solid var(--sand-3);
        }
        .p-price { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--ink); }
        .p-price small { font-size: 10px; color: var(--ink-60); letter-spacing: .1em; margin-left: 3px; }

        .btn-p {
          display: inline-block; text-decoration: none;
          font-size: 9px; letter-spacing: .22em; text-transform: uppercase;
          background: var(--ink); color: var(--sand); border: none; padding: 8px 14px;
          cursor: pointer; transition: all .3s; font-family: 'Jost', sans-serif; font-weight: 500;
          clip-path: polygon(0 0, 100% 0, 100% 68%, 88% 100%, 0 100%);
        }
        .btn-p:hover { background: var(--cognac); color: var(--sand); }
        .btn-p:disabled { background: var(--sand-5); cursor: not-allowed; }

        /* ── CRAFT / MISSION ── */
        .craft { padding: 160px 64px; background: var(--ink); position: relative; overflow: hidden; }
        .craft-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; text-align: center; }
        .craft .label { justify-content: center; color: rgba(245,239,228,.5); }
        .craft .label::after { background: rgba(245,239,228,.5); }
        .craft-h {
          font-family: 'Cormorant Garamond', serif; font-weight: 400;
          font-size: clamp(44px, 5.5vw, 76px); line-height: 1.0; color: var(--sand); margin-bottom: 28px;
        }
        .craft-h em { font-style: italic; color: #C9A96E; }
        .craft-body { font-size: 17px; line-height: 1.9; color: rgba(245,239,228,.8); font-weight: 400; margin-bottom: 16px; }
        .craft-pillars { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; margin-top: 80px; }
        .pillar {
          background: rgba(245,239,228,.04); padding: 52px 40px;
          text-align: left; border-top: 2px solid transparent; transition: border-color .3s;
        }
        .pillar:hover { border-top-color: #C9A96E; }
        .pil-n { font-family: 'Cormorant Garamond', serif; font-size: 48px; color: #C9A96E; line-height: 1; margin-bottom: 18px; }
        .pil-t { font-size: 11px; letter-spacing: .34em; text-transform: uppercase; color: rgba(245,239,228,.75); font-weight: 500; margin-bottom: 12px; }
        .pil-b { font-size: 15px; line-height: 1.75; color: rgba(245,239,228,.68); font-weight: 400; }

        /* ── FOUNDER ── */
        .founder {
          padding: 160px 64px; background: var(--sand-2);
          display: grid; grid-template-columns: 1fr 1fr; gap: 120px; align-items: center;
        }
        .f-photo {
          background: var(--sand-3); border: 1px solid var(--sand-4);
          aspect-ratio: 3/4; position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .f-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .f-photo-mark { position: relative; z-index: 2; opacity: .3; }
        .f-corner { position: absolute; bottom: 0; right: 0; width: 35%; height: 3px; background: var(--cognac); }
        .f-sig { margin-top: 48px; padding-top: 28px; border-top: 1px solid var(--sand-4); display: flex; align-items: center; gap: 18px; }
        .f-name { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 22px; color: var(--ink); margin-bottom: 2px; }
        .f-role { font-size: 11px; letter-spacing: .34em; text-transform: uppercase; color: var(--cognac); font-weight: 600; }

        /* ── WAITLIST ── */
        .waitlist { padding: 160px 64px; background: var(--sand-3); position: relative; text-align: center; overflow: hidden; }
        .wl-inner { position: relative; z-index: 2; max-width: 560px; margin: 0 auto; }
        .wl-sub { font-size: 17px; line-height: 1.85; color: var(--ink-80); font-weight: 400; margin-bottom: 52px; }
        .wl-form { display: flex; max-width: 480px; margin: 0 auto 16px; }
        .wl-input {
          flex: 1; background: var(--sand); border: 1px solid var(--sand-4); border-right: none;
          padding: 15px 22px; font-family: 'Jost', sans-serif; font-weight: 400;
          font-size: 15px; color: var(--ink); outline: none; transition: border-color .3s;
        }
        .wl-input::placeholder { color: var(--ink-60); }
        .wl-input:focus { border-color: var(--cognac); }
        .wl-submit {
          background: var(--sand); border: 1px solid #A08C78; color: var(--ink);
          font-family: 'Jost', sans-serif; font-weight: 500; font-size: 11px;
          letter-spacing: .26em; text-transform: uppercase; padding: 15px 28px;
          cursor: pointer; white-space: nowrap; transition: border-color .25s, background .25s, color .25s;
          clip-path: none; min-width: 140px;
        }
        .wl-submit:hover:not(:disabled) { border-color: var(--cognac); background: var(--sand-2); }
        .wl-submit:disabled { background: var(--sand-5); border-color: var(--sand-5); cursor: not-allowed; }
        .wl-error { font-size: 14px; color: var(--cognac); margin-bottom: 12px; }
        .wl-note { font-size: 13px; letter-spacing: .08em; color: var(--ink-60); }
        .wl-success {
          padding: 28px 44px; border: 1px solid var(--sand-5); background: var(--sand); display: inline-block;
        }
        .wl-success p { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 22px; color: var(--cognac); }

        /* ── CART DRAWER ── */
        .cart-overlay {
          position: fixed; inset: 0; background: rgba(30,24,16,.4); z-index: 300;
          opacity: 0; visibility: hidden; transition: opacity .3s, visibility .3s;
        }
        .cart-overlay.open { opacity: 1; visibility: visible; }
        .cart-drawer {
          position: fixed; top: 0; right: 0; width: 100%; max-width: 420px;
          height: 100vh; height: 100dvh;
          padding-bottom: env(safe-area-inset-bottom);
          background: var(--sand); z-index: 301;
          box-shadow: -8px 0 40px rgba(30,24,16,.12);
          transform: translateX(100%); transition: transform .35s cubic-bezier(.16,1,.3,1);
          overflow: hidden; display: flex; flex-direction: column;
        }
        .cart-overlay.open .cart-drawer { transform: translateX(0); }
        .cart-drawer-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 28px; border-bottom: 1px solid var(--sand-4);
          font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500; color: var(--ink);
        }
        .cart-drawer-close {
          background: none; border: none; cursor: pointer;
          padding: 8px; color: var(--ink-60); font-size: 22px; line-height: 1;
          transition: color .2s;
        }
        .cart-drawer-close:hover { color: var(--ink); }
        .cart-drawer-body { flex: 1; overflow: auto; padding: 20px 28px; }
        .cart-item { display: flex; gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--sand-3); }
        .cart-item-img { width: 72px; height: 90px; object-fit: cover; background: var(--sand-3); flex-shrink: 0; }
        .cart-item-details { flex: 1; min-width: 0; }
        .cart-item-name { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 500; color: var(--ink); margin-bottom: 4px; }
        .cart-item-meta { font-size: 13px; color: var(--ink-60); margin-bottom: 10px; }
        .cart-item-qty { display: flex; align-items: center; gap: 12px; }
        .qty-btn {
          width: 26px; height: 26px; border: 1px solid var(--sand-4); background: var(--sand-2);
          font-size: 14px; cursor: pointer; color: var(--ink-80);
          display: flex; align-items: center; justify-content: center; transition: all .2s;
          font-family: 'Jost', sans-serif;
        }
        .qty-btn:hover { border-color: var(--cognac); background: var(--sand); }
        .qty-num { font-size: 14px; font-weight: 500; color: var(--ink); min-width: 16px; text-align: center; }
        .cart-item-remove { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--cognac); background: none; border: none; cursor: pointer; padding: 0; font-family: 'Jost', sans-serif; margin-left: 8px; }
        .cart-item-remove:hover { text-decoration: underline; }
        .cart-item-price { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--ink); align-self: flex-start; flex-shrink: 0; }
        .cart-drawer-footer { padding: 20px 28px; border-top: 1px solid var(--sand-4); }
        .cart-preorder-note { font-size: 13px; color: var(--ink-60); text-align: center; margin-bottom: 16px; line-height: 1.5; }
        .cart-total {
          display: flex; justify-content: space-between;
          font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 500;
          color: var(--ink); margin-bottom: 14px;
        }
        .cart-checkout {
          width: 100%; font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
          background: var(--ink); color: var(--sand); border: none; padding: 14px;
          cursor: pointer; font-family: 'Jost', sans-serif; font-weight: 500;
          clip-path: polygon(0 0, 100% 0, 100% 92%, 98% 100%, 0 100%);
          transition: background .3s;
        }
        .cart-checkout:hover:not(:disabled) { background: var(--cognac); }
        .cart-checkout:disabled { opacity: .8; cursor: wait; }
        .cart-checkout-error { font-size: 13px; color: var(--cognac); text-align: center; margin-bottom: 10px; }
        .cart-empty { padding: 48px 20px; text-align: center; }
        .cart-empty p { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 18px; color: var(--ink-60); }

        /* ── ARYA STANDARD TEASER ── */
        .std-teaser {
          padding: 80px 64px; background: #2C2418;
          text-align: center;
        }
        .std-teaser .label { justify-content: center; color: rgba(245,239,228,.6); }
        .std-teaser .label::after { background: rgba(245,239,228,.6); }
        .std-teaser .std-teaser-h {
          font-family: 'Cormorant Garamond', serif; font-weight: 400;
          font-size: clamp(32px, 4vw, 48px); line-height: 1.2; color: var(--sand);
          margin: 0 auto 24px; max-width: 20ch;
        }
        .std-teaser .std-teaser-p {
          font-size: 17px; line-height: 1.75; color: rgba(245,239,228,.82);
          margin: 0 auto 36px; max-width: 44ch;
        }
        .std-teaser .std-teaser-btn {
          display: inline-block; padding: 14px 32px;
          font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
          color: var(--ink); background: var(--sand); text-decoration: none;
          font-family: 'Jost', sans-serif; font-weight: 500;
          clip-path: polygon(0 0, 100% 0, 100% 75%, 95% 100%, 0 100%);
          transition: background .3s, color .3s;
        }
        .std-teaser .std-teaser-btn:hover { background: #C9A96E; color: var(--ink); }
        @media (max-width: 960px) { .std-teaser { padding: 60px 24px; } }
        @media (max-width: 480px) { .std-teaser { padding: 56px 20px; } .std-teaser .std-teaser-btn { min-height: 52px; display: inline-flex; align-items: center; justify-content: center; } }

        /* ── FOOTER ── */
        footer { padding: 72px 64px 40px; background: var(--ink); }
        .foot-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 64px; }
        .foot-tagline {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 17px; color: rgba(245,239,228,.72); line-height: 1.7; margin: 18px 0 24px;
        }
        .foot-social { display: flex; gap: 18px; }
        .foot-social a { font-size: 12px; letter-spacing: .28em; text-transform: uppercase; color: rgba(245,239,228,.6); text-decoration: none; transition: color .3s; font-weight: 500; }
        .foot-social a:hover { color: #C9A96E; }
        .foot-col h5 { font-size: 11px; letter-spacing: .4em; text-transform: uppercase; color: rgba(245,239,228,.9); font-weight: 600; margin-bottom: 20px; }
        .foot-col ul { list-style: none; display: flex; flex-direction: column; gap: 11px; }
        .foot-col a { font-size: 15px; font-weight: 400; color: rgba(245,239,228,.58); text-decoration: none; transition: color .3s; }
        .foot-col a:hover { color: rgba(245,239,228,.88); }
        .foot-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 28px; border-top: 1px solid rgba(245,239,228,.08); }
        .foot-bottom p { font-size: 12px; letter-spacing: .06em; color: rgba(245,239,228,.45); }
        .foot-bottom-mark { display: flex; align-items: center; gap: 10px; }
        .foot-bottom-mark span { font-size: 11px; letter-spacing: .26em; text-transform: uppercase; color: rgba(245,239,228,.45); font-weight: 500; }

        /* ── RESPONSIVE: Tablet ── */
        @media (max-width: 960px) {
          .hamburger { display: flex; }
          .nav-links { display: none; }
          .nav, .nav.stuck { padding: 16px 32px; padding-top: max(16px, env(safe-area-inset-top)); }
          .nav-btn { display: none; }

          .hero {
            grid-template-columns: 1fr;
            grid-template-rows: minmax(50vh, 1fr) auto;
          }
          .hero-right { display: flex !important; order: 1; min-height: 50vh; }
          .hero-right img { object-position: center 30%; }
          .hero-right-overlay { background: linear-gradient(180deg, transparent 40%, rgba(245,239,228,.6) 100%); }
          .hero-left { order: 2; padding: 60px 24px 60px; }
          .hero-sub { font-size: 18px; }
          .btn-dark, .btn-outline { padding: 16px 28px; min-height: 48px; display: inline-flex; align-items: center; }

          .ethos, .problem, .founder { grid-template-columns: 1fr; gap: 48px; padding: 60px 24px; }
          .problem .stats { grid-template-columns: 1fr 1fr; gap: 24px; }
          .problem .stat-n { font-size: clamp(26px, 4vw, 30px); }
          .ethos-card { aspect-ratio: 16/10; }
          .ethos-card-img { opacity: .65; }
          .founder { gap: 48px; }
          .founder > div:first-child { order: 2; }
          .founder > div:last-child { order: 1; }
          .founder .f-photo { aspect-ratio: 4/5; }
          .f-photo-mark { opacity: .25; }

          .fit { padding: 60px 24px; }
          .fit-grid { grid-template-columns: 1fr; gap: 48px; }
          .fit-grid > div:first-child { order: 2; }
          .fit-grid > div:last-child { order: 1; }
          .fit-main { aspect-ratio: 4/5; }
          .fit-specs { grid-template-columns: 1fr; }
          .fit-tabs { margin-bottom: 24px; }
          .fit-tab { padding: 14px 24px; min-height: 44px; }
          .fit-stats-row { gap: 20px; }
          .fit-mini { min-width: 0; }

          .collection { padding: 60px 24px; }
          .coll-sections { grid-template-columns: 1fr; gap: 32px; }
          .coll-sections .coll-section { margin-bottom: 48px; }
          .coll-sections .coll-section:last-child { margin-bottom: 0; }
          .coll-header { grid-template-columns: 1fr; gap: 20px; }
          .coll-section { overflow: visible; }
          .product-grid {
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
            overflow: visible; margin: 0; padding: 0;
          }
          .product-grid .p-card {
            min-width: 0;
          }
          .coll-tab { padding: 14px 20px; min-height: 44px; }

          .craft { padding: 60px 24px; }
          .craft-pillars { grid-template-columns: 1fr; }

          .waitlist { padding: 60px 24px; }
          .wl-form { flex-direction: column; }
          .wl-input { border-right: 1px solid var(--sand-4); border-bottom: none; }
          .wl-submit { clip-path: none; min-height: 52px; }
          .wl-submit, .wl-input { min-height: 52px; }

          footer { padding: 60px 24px 40px; }
          .foot-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
          .foot-bottom { flex-direction: column; gap: 14px; text-align: center; }

          .nav-cart-btn { padding: 12px 20px; min-height: 44px; }
          .qty-btn { width: 36px; height: 36px; min-width: 36px; min-height: 36px; }
          .p-quickadd-add, .btn-p { min-height: 44px; padding: 12px 20px; }
          .p-size-btn { width: 36px; height: 36px; min-width: 36px; min-height: 36px; }
        }

        /* ── RESPONSIVE: Mobile (phones) ── */
        @media (max-width: 480px) {
          .nav, .nav.stuck { padding: 14px 20px; padding-top: max(14px, env(safe-area-inset-top)); }
          .hero-right { min-height: 52vh; }
          .hero-left { padding: 48px 20px 56px; padding-bottom: max(56px, env(safe-area-inset-bottom)); }
          .hero-h1 { font-size: clamp(36px, 10vw, 48px) !important; }
          .hero-ctas { flex-direction: column; width: 100%; gap: 14px; }
          .hero-ctas a { width: 100%; justify-content: center; min-height: 52px; padding: 16px 24px; }
          .body-txt { font-size: 18px; line-height: 1.75; }

          .ethos, .problem, .founder { padding: 60px 20px; gap: 40px; }
          .ethos, .problem, .fit, .collection, .craft, .founder, .waitlist { margin-bottom: 0; }
          section.fade-section { scroll-margin-top: 80px; }
          section.fade-section + section.fade-section { border-top: 1px solid var(--sand-4); }
          .label { font-size: 12px; letter-spacing: .4em; }
          .problem .stats { gap: 20px; }
          .problem .stat { padding: 24px 20px; }
          .problem .stat-n { font-size: 26px; }
          .ethos-card { aspect-ratio: 4/3; }
          .ethos-card-img { opacity: .7; }
          .display { font-size: clamp(28px, 7vw, 42px) !important; }

          .fit { padding: 60px 20px; }
          .fit-main { aspect-ratio: 3/4; }
          .fit-stats-row { gap: 18px; }
          .fit-mini { padding: 18px 20px; }

          .collection { padding: 60px 20px; }
          .product-grid .p-card { min-width: 0; }
          .craft { padding: 60px 20px; }
          .waitlist { padding: 60px 20px; }
          .waitlist .display { font-size: clamp(32px, 8vw, 48px) !important; }

          footer { padding: 60px 20px 32px; padding-bottom: max(32px, calc(80px + env(safe-area-inset-bottom))); }
          .foot-grid { grid-template-columns: 1fr; gap: 28px; }
        }
        @media (max-width: 768px) {
          footer { padding-bottom: max(32px, calc(80px + env(safe-area-inset-bottom))); }
        }

        /* ── STRONG MOBILE: sticky CTA bar (phones only) ── */
        .sticky-cta-bar {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 180;
          padding: 14px 20px; padding-bottom: max(14px, env(safe-area-inset-bottom));
          background: rgba(245,239,228,.98);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--sand-4);
          box-shadow: 0 -4px 24px rgba(30,24,16,.08);
          gap: 12px; align-items: stretch;
        }
        .sticky-cta-bar.visible { display: flex; }
        .sticky-cta-bar a {
          flex: 1; min-height: 52px; display: inline-flex; align-items: center; justify-content: center;
          font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
          font-family: 'Jost', sans-serif; font-weight: 500; text-decoration: none;
          transition: background .25s, color .25s;
        }
        .sticky-cta-bar .sticky-cta-primary {
          background: var(--ink); color: var(--sand);
          clip-path: polygon(0 0, 100% 0, 100% 85%, 96% 100%, 0 100%);
        }
        .sticky-cta-bar .sticky-cta-primary:hover { background: var(--cognac); }
        .sticky-cta-bar .btn-waitlist {
          background: var(--sand) !important; color: var(--ink) !important;
          border: 1px solid #A08C78 !important; clip-path: none !important;
        }
        .sticky-cta-bar .btn-waitlist:hover { border-color: var(--cognac) !important; background: var(--sand-2) !important; color: var(--ink) !important; }
        .sticky-cta-bar .sticky-cta-secondary {
          background: transparent; color: var(--ink);
          border: 1px solid var(--sand-4);
        }
        .sticky-cta-bar .sticky-cta-secondary:hover { border-color: var(--cognac); color: var(--cognac); }
        @media (min-width: 769px) { .sticky-cta-bar { display: none !important; } }
      `}</style>

      {/* ── STICKY MOBILE CTA BAR (phones, after scroll) ── */}
      <div className={`sticky-cta-bar ${showStickyBar ? "visible" : ""}`} aria-hidden={!showStickyBar}>
        <a href="#waitlist" className="sticky-cta-primary btn-waitlist">Join Waitlist</a>
        <Link href="/collection" className="sticky-cta-secondary">Shop Collection</Link>
      </div>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-primaries">
          <Link href="/collection" className="mobile-menu-cta mobile-menu-cta-primary" onClick={closeMenu} onTouchStart={closeMenu}>Shop Collection</Link>
          <a href="/#waitlist" className="mobile-menu-cta btn-waitlist" onClick={closeMenu} onTouchStart={closeMenu}>Join Waitlist</a>
        </div>
        <div className="mobile-menu-divider" />
        <Link href="/story" onClick={closeMenu} onTouchStart={closeMenu}>Story</Link>
        <Link href="/fit" onClick={closeMenu} onTouchStart={closeMenu}>Fit</Link>
        <Link href="/mission" onClick={closeMenu} onTouchStart={closeMenu}>Mission</Link>
        <Link href="/founder" onClick={closeMenu} onTouchStart={closeMenu}>Founders</Link>
        <Link href="/arya-standard" onClick={closeMenu} onTouchStart={closeMenu}>The Standard</Link>
      </div>

      {/* ── CART DRAWER ── */}
      <div
        className={`cart-overlay ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
        aria-hidden={!cartOpen}
      >
        <div className="cart-drawer" onClick={e => e.stopPropagation()} role="dialog" aria-label="Shopping cart">
          <div className="cart-drawer-header">
            Bag {cartCount > 0 && `(${cartCount})`}
            <button type="button" className="cart-drawer-close" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
          </div>
          <div className="cart-drawer-body">
            {cart.length === 0 ? (
              <div className="cart-empty"><p>Your bag is empty.</p></div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img" style={{ background: "var(--sand-3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AryaMark size={28} color="#8B6A3E" />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-meta">Size {item.size}{item.color ? ` · ${item.color}` : ""}</div>
                    <div className="cart-item-qty">
                      <button type="button" className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button type="button" className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      <button type="button" className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    {(parseInt(item.price.replace("$", ""), 10) * item.qty).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="cart-drawer-footer">
              <p className="cart-preorder-note">Pre-orders ship Spring 2026. Free shipping on all orders.</p>
              <div className="cart-total">
                <span>Total</span>
                <span>{cartTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
              </div>
              {checkoutError && <p className="cart-checkout-error">{checkoutError}</p>}
              <button type="button" className="cart-checkout" onClick={goToCheckout} disabled={checkoutLoading}>
                {checkoutLoading ? "Redirecting to payment…" : "Checkout Pre-Order"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className={`nav ${navStuck ? "stuck" : ""}`}>
        <a href="#" className="nav-logo-link" aria-label="Arya home">
          <AryaLogo size={32} markColor="#8B6A3E" textColor="#1E1810" />
        </a>
        <ul className="nav-links">
          <li><Link href="/collection" className={activeSection === "collection" ? "active" : ""} data-section="collection">Collection</Link></li>
          <li><Link href="/story" className={activeSection === "ethos" || activeSection === "problem" ? "active" : ""} data-section="ethos">Story</Link></li>
          <li><Link href="/fit" className={activeSection === "fit" ? "active" : ""} data-section="fit">Fit</Link></li>
          <li><Link href="/mission" className={activeSection === "mission" ? "active" : ""} data-section="mission">Mission</Link></li>
          <li><Link href="/founder" className={activeSection === "founder" ? "active" : ""} data-section="founder">Founders</Link></li>
          <li><Link href="/arya-standard" className={activeSection === "arya-standard" ? "active" : ""} data-section="arya-standard">The Standard</Link></li>
        </ul>
        <div className="nav-actions">
          <button type="button" className="nav-cart-btn" onClick={() => setCartOpen(true)} aria-label="Open cart">
            Bag
            {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
          </button>
          <a href="/#waitlist" className="nav-btn btn-waitlist">Join Waitlist</a>
          <button
            type="button"
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero fade-section">
        <div className="hero-left">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Persian Craft · California Soul
            </div>
            <h1 className="hero-h1" style={{ fontSize: "clamp(48px, 6.5vw, 88px)" }}>
              Noble by<br /><em>nature.</em>
            </h1>
            <p className="hero-sub">
              Where Persian craft meets California living. Engineered for the body that moves, built for every version of your life.
            </p>
            <div className="hero-ctas">
              <a href="#waitlist" className="btn-dark">Join Waitlist</a>
              <Link href="/collection" className="btn-outline">Preview Collection</Link>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <WeavePattern id="hero-p" opacity={0.1} color="#8B6A3E" />
          <img src="/arya-hero.jpg" alt="Woman running in desert landscape at golden hour" className="hero-placeholder" />
          <div className="hero-right-overlay" />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker fade-section">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex" }}>
              {["Luxury Materials", "Skin Conscious", "Sustainably Minded", "Noble by Nature", "Built for Every Body", "Persian Craft", "California Soul"].map((t, j) => (
                <span key={j} className="ticker-item">{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── COLLECTION ── */}
      <section className="collection fade-section" id="collection">
        <div className="coll-header">
          <div>
            <div className="label">Launch Collection</div>
            <h2 className="display">The <em>foundation</em> pieces.</h2>
          </div>
          <p className="coll-note">Engineered from scratch for the body that moves.</p>
        </div>
        <div className="coll-tabs">
          <button type="button" className={`coll-tab ${collectionFilter === "all" ? "active" : ""}`} onClick={() => setCollectionFilter("all")}>All</button>
          <button type="button" className={`coll-tab ${collectionFilter === "women" ? "active" : ""}`} onClick={() => setCollectionFilter("women")}>Women&apos;s</button>
          <button type="button" className={`coll-tab ${collectionFilter === "men" ? "active" : ""}`} onClick={() => setCollectionFilter("men")}>Men&apos;s</button>
        </div>

        <div className="coll-sections">
          <div className={`coll-section ${collectionFilter === "men" ? "hide-by-filter" : ""}`} id="women">
            <h3 className="coll-section-title">Women&apos;s</h3>
            <div className="product-grid">
              {womenProducts.map(p => <ProductCard key={p.id} p={p} selectedColors={selectedColors} setColor={setColor} />)}
            </div>
          </div>

          <div className={`coll-section ${collectionFilter === "women" ? "hide-by-filter" : ""}`} id="men">
            <h3 className="coll-section-title">Men&apos;s</h3>
            <div className="product-grid">
              {menProducts.map(p => <ProductCard key={p.id} p={p} selectedColors={selectedColors} setColor={setColor} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── ETHOS (Our Story) ── */}
      <section className="ethos fade-section" id="ethos">
        <div>
          <div className="ethos-card">
            <img src="/arya-story.jpg" alt="Arya brand story, texture and craft" className="ethos-card-img" loading="lazy" />
            <WeavePattern id="ethos-p" opacity={0.12} color="#8B6A3E" />
            <div className="ethos-card-content">
              <AryaMark size={96} color="#8B6A3E" />
              <div className="ethos-card-label">A &nbsp; R &nbsp; Y &nbsp; A</div>
              <div className="ethos-card-meaning">Noble · Honorable · Pure</div>
            </div>
            <div className="ethos-corner" />
          </div>
          <div className="swatches">
            <div className="sw" style={{ background: "#1E1810" }} />
            <div className="sw" style={{ background: "#7A5A2F" }} />
            <div className="sw" style={{ background: "#E6DCC9" }} />
            <div className="sw" style={{ background: "#3A5A6E" }} />
            <div className="sw" style={{ background: "#F5EFE4" }} />
          </div>
        </div>
        <div>
          <div className="label">Our Story</div>
          <h2 className="display" style={{ marginBottom: 30 }}>Where the Pacific Coast<br />meets <em>Persian craft.</em></h2>
          <p className="body-txt">Arya was born between two worlds: the salt air of Southern California and the ancient textile traditions of Persia. One shaped by movement, the other by centuries of craft.</p>
          <p className="body-txt">The name Arya comes from the ancient Persian word for noble and honorable, the very root of the name Iran itself. It reflects a simple belief: the way you move through the world should be matched by what you wear.</p>
          <p className="body-txt">At Arya, we build garments with care. Materials chosen with intention. Fit refined through movement. Craft without shortcuts.</p>
          <div className="ethos-divider" />
          <div className="values">
            <div className="val"><div className="val-b">Built with intention.</div></div>
            <div className="val"><div className="val-b">Made to move with you.</div></div>
            <div className="val"><div className="val-b">Rooted in something real.</div></div>
          </div>
        </div>
      </section>

      {/* ── THE GAP ── */}
      <section className="problem fade-section" id="problem">
        <div>
          <div className="label">THREE GAPS. ONE BRAND.</div>
          <h2 className="display" style={{ marginBottom: 30 }}>The clothes never kept up.</h2>
          <p className="body-txt">Most brands built their patterns around one body and called it standard. If you have strong quads, broad shoulders, a chest that moves, you already know. The waistband gaps. The fabric pulls. You leave the changing room feeling like the problem.</p>
          <p className="body-txt">You were never the problem. The clothes were.</p>
          <p className="body-txt">But fit is only one part of what the industry got wrong. The fabrics most brands use are loaded with synthetic polymers, chemical dyes, and PFAS coatings that sit against your skin all day. Nobody talks about this. Nobody fixes it.</p>
          <p className="body-txt">The sustainable options exist. But they sacrifice luxury, fit, and performance to get there.</p>
          <p className="body-txt">Arya was built to close all three gaps at once. Engineered fit for the body that actually moves. Skin conscious materials that respect what they touch. A standard of craft that refuses to compromise any of it.</p>
          <div className="pullquote">
            <p>&ldquo;The industry told you your body was the problem. It wasn&apos;t. The clothes were.&rdquo;</p>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-n">65%</div>
            <div className="stat-l">Of athleisure products still made from conventional synthetic materials in 2026</div>
          </div>
          <div className="stat">
            <div className="stat-n">$176B</div>
            <div className="stat-l">Sustainable athleisure market by 2030, doubling in six years</div>
          </div>
          <div className="stat">
            <div className="stat-n">$415B</div>
            <div className="stat-l">Total athleisure market in 2026, premium sustainable is the fastest growing segment</div>
          </div>
          <div className="stat">
            <div className="stat-n">3</div>
            <div className="stat-l">Gaps Arya closes simultaneously. Fit, skin health, and sustainable luxury.</div>
          </div>
        </div>
      </section>

      {/* ── FIT PHILOSOPHY ── */}
      <section className="fit fade-section" id="fit">
        <div className="label">Fit Philosophy</div>
        <div className="fit-grid">
          <div>
            <h2 className="display" style={{ marginBottom: 28 }}>Every pattern starts with<br />the body that <em>moves.</em></h2>
            <p className="body-txt">Standard sizing was built for a standard body. Arya&apos;s patterns start from scratch, with real bodies and real movement in mind, and the belief that a body that surfs, moves, rides, and lives fully deserves fabric that keeps up.</p>
            <p className="body-txt" style={{ marginBottom: 32 }}>Our Women&apos;s and Men&apos;s cuts share the same philosophy: engineered separately for each form, so everyone gets the same standard of fit.</p>
            <div className="fit-tabs">
              <button type="button" className={`fit-tab ${fitTab === "women" ? "active" : ""}`} onClick={() => setFitTab("women")}>Women&apos;s</button>
              <button type="button" className={`fit-tab ${fitTab === "men" ? "active" : ""}`} onClick={() => setFitTab("men")}>Men&apos;s</button>
            </div>
            <div className="fit-specs">
              {(fitTab === "women"
                ? [{ t: "Thighs", b: "Extended room. No pulling at any depth." }, { t: "Hips", b: "Built for the hips that move. No squeezing, no gapping." }, { t: "Waistband", b: "High-rise hold without digging or rolling." }, { t: "Inseam", b: "True to movement, wherever your day takes you." }]
                : [{ t: "Thighs", b: "Extended circumference. No restriction through your full range." }, { t: "Shoulders", b: "Wider yoke, sits at the true shoulder point." }, { t: "Waist", b: "Tapered without restriction." }, { t: "Chest", b: "Room to breathe. Structured, not boxy." }]
              ).map((s, i) => (
                <div key={i} className="fspec"><div className="fspec-t">{s.t}</div><div className="fspec-b">{s.b}</div></div>
              ))}
            </div>
          </div>
          <div className="fit-visual">
            <div className="fit-main">
              <img src="/arya-fit.jpg" alt="Fit and movement" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <WeavePattern id="fit-p" opacity={0.06} color="#8B6A3E" />
              <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AryaMark size={80} color="#8B6A3E" />
              </div>
            </div>
            <div className="fit-stats-row">
              <div className="fit-mini"><div className="mini-n">4-way</div><div className="mini-l">Stretch in all directions</div></div>
              <div className="fit-mini"><div className="mini-n">XS–3XL</div><div className="mini-l">Women&apos;s inclusive sizing</div></div>
              <div className="fit-mini"><div className="mini-n">S–3XL</div><div className="mini-l">Men&apos;s inclusive sizing</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CRAFT / MISSION ── */}
      <section className="craft fade-section" id="mission">
        <WeavePattern id="craft-p" opacity={0.04} color="#C9A96E" />
        <div className="craft-inner">
          <div className="label">Mission</div>
          <h2 className="craft-h">Built with purpose.<br /><em>Rooted in nobility.</em></h2>
          <p className="craft-body">Arya was built on a simple belief: that what you put on your body matters as much as what you put in it. Every decision we make, from the fabrics we choose to the communities we invest in, is held to the same standard that has guided Persian craft for thousands of years. Precision as a form of respect. For the wearer. For the maker. For the world we all share.</p>
          <div className="craft-pillars">
            {[
              { n: "01", t: "Persian Craft", b: "Persian craft philosophy holds that doing something with complete precision is itself a form of art. Every stitch, every seam, every fit decision at Arya is held to that standard. No shortcuts. No compromises. Built to outlast trends by decades." },
              { n: "02", t: "Skin Conscious", b: "Every Arya fabric is chosen with your health in mind. No harmful dyes. No toxic synthetics against your body. Materials that feel as good as they perform. Because luxury should never come at the cost of your wellbeing." },
              { n: "03", t: "Active Community", b: "For everyone who lives fully and moves often. Not one sport. Not one body type. Not one image. Clothing that crosses every terrain, every ritual, every version of you." },
              { n: "04", t: "Giving Back", b: "A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities, starting with Iran and growing wherever the need exists. Sport gave our founder his confidence and his mental strength. We believe every child deserves that same opportunity." },
            ].map((p, i) => (
              <div key={i} className="pillar">
                <div className="pil-n">{p.n}</div>
                <div className="pil-t">{p.t}</div>
                <p className="pil-b">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER — flipped layout for visual variety ── */}
      <section className="founder fade-section" id="founder">
        <div>
          <div className="label">The Founders</div>
          <h2 className="display" style={{ marginBottom: 28 }}>We built what didn&apos;t <em>exist.</em></h2>
          <p className="body-txt">Arya was born between two people, two worlds, and one shared belief: that clothing should make you feel like yourself.</p>
          <p className="body-txt">Nima grew up bigger than the clothes that were supposed to fit him. A state wrestler and football player, he lived in his body in a way most brands never accounted for. Joggers that fit his waist turned into skinny jeans at the thigh. Shirts that fit his shoulders billowed everywhere else. He would go for a run and come back with chafing. The fabrics were not right either. Synthetic polymers that did not breathe, did not last, and did not respect the body wearing them.</p>
          <p className="body-txt">But it was more than fit. Sport gave him his confidence. At his lowest points, athletics gave him his mental strength and his sense of self. He knows what it means when your body and your clothes finally work together. That feeling is what Arya is built to give everyone.</p>
          <p className="body-txt">Lucy came to Southern California from Florida in 2022 and found a life built around movement, wellness, and intention. Her first Persian New Year with Nima&apos;s family changed something in her. She was taught about the Haft Seen, each element on the table carrying a meaning, a wish, an intention. A culture that treated everything it touched as worth doing beautifully.</p>
          <p className="body-txt">Studying to become a family therapist, Lucy&apos;s life work is helping people overcome anxiety and rebuild their self worth. She knows the specific discomfort of women&apos;s activewear that rides up, pulls, and makes you self-conscious mid-movement when you should feel free. That problem is personal to her. Fixing it is personal to Arya.</p>
          <p className="body-txt">They share a belief that people are too complex for brands that speak to only one sport, one body, one image. Clothing does not have to choose between performance and beauty. Between function and intention.</p>
          <p className="body-txt">And they believe building something real means giving something back. A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities because the culture that shaped this brand deserves to see what its next generation can become.</p>
          <p className="body-txt">Together they built Arya. A meeting point between two worlds. The California coast that inspires the lifestyle, and the ancient Persian heritage that shaped the craft.</p>
          <div className="f-sig">
            <AryaMark size={36} color="#8B6A3E" />
            <div>
              <div className="f-name">Nima and Lucy, Founders of Arya</div>
            </div>
          </div>
        </div>
        <div className="f-photo">
          <img src="/arya-founder.png" alt="Nima and Lucy, Founders of Arya" loading="lazy" />
          <WeavePattern id="f-p" opacity={0.06} color="#8B6A3E" />
          <div className="f-photo-mark"><AryaMark size={72} color="#8B6A3E" /></div>
          <div className="f-corner" />
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section className="waitlist fade-section" id="waitlist">
        <WeavePattern id="wl-p" opacity={0.05} color="#8B6A3E" />
        <div className="wl-inner">
          <div className="label" style={{ justifyContent: "center" }}>Early Access</div>
          <h2 className="display" style={{ marginBottom: 16, fontSize: "clamp(42px,5vw,68px)" }}>Be first.<br /><em>Be noble.</em></h2>
          <p className="wl-sub">Join the Arya waitlist for early access to the launch collection, founder updates, and pre-order pricing. Men&apos;s and women&apos;s dropping together.</p>
          {submitted ? (
            <div className="wl-success"><p>You&apos;re on the list. We&apos;ll be in touch.</p></div>
          ) : (
            <>
              {waitlistError && <p className="wl-error">{waitlistError}</p>}
              <form className="wl-form" onSubmit={onSubmit}>
                <input
                  type="email" className="wl-input"
                  placeholder="Your email address"
                  value={email} onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="wl-submit" disabled={submitting}>
                  {submitting ? "Joining…" : "Join Waitlist"}
                </button>
              </form>
            </>
          )}
          <p className="wl-note">No spam. No noise. Just Arya.</p>
        </div>
      </section>

      {/* ── ARYA STANDARD TEASER ── */}
      <section className="std-teaser fade-section" id="arya-standard">
        <div className="label">THE ARYA STANDARD</div>
        <h2 className="std-teaser-h">There is a standard behind every decision we make.</h2>
        <p className="std-teaser-p">Every fabric. Every seam. Every fit decision. Held to the same standard that has guided Persian craft for thousands of years. We have nothing to hide and everything to share.</p>
        <Link href="/arya-standard" className="std-teaser-btn">Discover the Standard</Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="fade-section">
        <div className="foot-grid">
          <div>
            <AryaLogo size={30} markColor="#8B6A3E" textColor="#F5EFE4" />
            <p className="foot-tagline">Noble materials. Noble fit.<br />Noble purpose.</p>
            <div className="foot-social">
              <a href="https://instagram.com/wear_arya" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://tiktok.com/@wear_arya" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="mailto:hello@arya.clothing">Email</a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Collection</h5>
            <ul>
              <li><Link href="/collection">Collection</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Brand</h5>
            <ul>
              <li><Link href="/story">Our Story</Link></li>
              <li><Link href="/mission">Mission</Link></li>
              <li><Link href="/founder">Founders</Link></li>
              <li><Link href="/arya-standard">The Standard</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@arya.clothing">hello@arya.clothing</a></li>
              <li><a href="mailto:press@arya.clothing">Press</a></li>
              <li><a href="mailto:wholesale@arya.clothing">Wholesale</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <p>© 2026 Arya. All rights reserved. Built in Los Angeles.</p>
          <div className="foot-bottom-mark">
            <AryaMark size={16} color="#8B6A3E" />
            <span>Noble by nature.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
