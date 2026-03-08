"use client";
import { useState, useEffect } from "react";

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

// ─── Types & Data ─────────────────────────────────────────────────────────────

type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: string;
  size: string;
  qty: number;
};

const PRODUCTS = [
  {
    id: "noble-legging", gender: "Women's", name: "The Noble Legging", price: "$118",
    desc: "The legging built for the body that does everything — from morning movement to the rest of your day.",
    specs: ["Extended thigh room — no restriction, no pulling", "High-rise waistband built for the hips that move", "Persian cotton, silk, and nylon blend", "Persian geometric detail woven into waistband"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "noble-short", gender: "Men's", name: "The Noble Short", price: "$98",
    desc: "The short that finally fits the way you move through the world — without restriction, without compromise.",
    specs: ["Extended thigh circumference — no pulling", "Persian cotton, silk, and nylon blend", "Persian geometric detail on interior waistband", "Deep side pockets — built for movement"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "noble-bra", gender: "Women's", name: "The Noble Sports Bra", price: "$68",
    desc: "Support that moves with you. Built for every part of your day, not just the workout.",
    specs: ["Encapsulation + compression hybrid", "Persian cotton, silk, and nylon blend", "Adjustable straps, hook-free", "Persian-inspired seam detail"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "noble-tee", gender: "Men's", name: "The Noble Tee", price: "$78",
    desc: "Cut for the way you're actually built. Soft, breathable, and made to go everywhere you do.",
    specs: ["Extended shoulder and sleeve room", "Persian cotton, silk, and nylon blend", "Minimal seam construction"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
];

// ─── Product Card ─────────────────────────────────────────────────────────────

type ProductCardProps = {
  p: typeof PRODUCTS[0];
  addedProductId: string | null;
  selectedSizes: Record<string, string>;
  setSize: (productId: string, size: string) => void;
  addToCart: (p: typeof PRODUCTS[0]) => void;
};

function ProductCard({ p, addedProductId, selectedSizes, setSize, addToCart }: ProductCardProps) {
  const isAdded = addedProductId === p.id;
  const selectedSize = selectedSizes[p.id];
  return (
    <div className="p-card">
      <div className="p-visual">
        <ProductPlaceholder name={p.name} patternId={`p-place-${p.id}`} />
        {/* Hover quick-add — desktop only */}
        <div className="p-card-quickadd" aria-hidden>
          <div className="p-quickadd-title">Quick Add</div>
          <div className="p-quickadd-sizes">
            {p.sizes.map(sz => (
              <button key={sz} type="button"
                className={selectedSize === sz ? "selected" : ""}
                onClick={() => setSize(p.id, sz)}>{sz}</button>
            ))}
          </div>
          <button type="button" className="p-quickadd-add"
            onClick={() => addToCart(p)}
            disabled={!selectedSize}>
            {isAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
        <div className="p-tag">Pre-Order</div>
      </div>
      <div className="p-info">
        <div className="p-cat">{p.gender}</div>
        <div className="p-name">{p.name}</div>
        <p className="p-desc">{p.desc}</p>
        <ul className="p-specs">{p.specs.map((s, j) => <li key={j}>{s}</li>)}</ul>
        {/* Mobile-friendly size selector — visible on all screens */}
        <div className="p-size-row">
          <span className="p-size-label">Size</span>
          <div className="p-size-btns">
            {p.sizes.map(sz => (
              <button key={sz} type="button"
                className={`p-size-btn ${selectedSize === sz ? "selected" : ""}`}
                onClick={() => setSize(p.id, sz)}>{sz}</button>
            ))}
          </div>
        </div>
        <div className="p-foot">
          <div className="p-price">{p.price}<small>USD</small></div>
          <button type="button"
            className={`btn-p ${isAdded ? "btn-p-added" : ""}`}
            onClick={() => addToCart(p)}
            disabled={!selectedSize}>
            {!selectedSize ? "Select Size" : isAdded ? "Added ✓" : "Pre-Order"}
          </button>
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
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [collectionFilter, setCollectionFilter] = useState<"all" | "women" | "men">("all");
  const [fitTab, setFitTab] = useState<"women" | "men">("women");
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);

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

  // Lock body scroll when mobile menu or cart is open
  useEffect(() => {
    document.body.style.overflow = (menuOpen || cartOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, cartOpen]);

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

  const setSize = (productId: string, size: string) =>
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));

  const addToCart = (p: typeof PRODUCTS[0]) => {
    const size = selectedSizes[p.id];
    if (!size) return;
    setCart(prev => {
      const existing = prev.find(i => i.productId === p.id && i.size === size);
      if (existing) return prev.map(i => i.productId === p.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: `${p.id}-${size}-${Date.now()}`, productId: p.id, name: p.name, price: p.price, size, qty: 1 }];
    });
    setAddedProductId(p.id);
    setTimeout(() => setAddedProductId(null), 1800);
    setCartOpen(true);
  };

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
          items: cart.map(({ id, name, price, size, qty }) => ({ id, name, price, size, qty })),
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
        }

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
          display: flex; align-items: center; justify-content: space-between;
          transition: all .45s cubic-bezier(.16,1,.3,1);
        }
        .nav.stuck {
          padding: 14px 64px;
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
          color: var(--sand); background: var(--ink); padding: 10px 26px;
          text-decoration: none; transition: all .25s; font-weight: 500;
          clip-path: polygon(0 0, 100% 0, 100% 68%, 92% 100%, 0 100%);
        }
        .nav-btn:hover { background: var(--cognac); }

        .hamburger {
          display: none; flex-direction: column; justify-content: center; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 8px; width: 36px; height: 36px;
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
          align-items: center; justify-content: center; gap: 10px;
          opacity: 0; visibility: hidden;
          transition: opacity .35s cubic-bezier(.16,1,.3,1), visibility .35s;
        }
        .mobile-menu.open { opacity: 1; visibility: visible; }
        .mobile-menu a {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 6vw, 48px);
          font-weight: 400; color: var(--ink); text-decoration: none;
          letter-spacing: .04em; transition: color .25s; padding: 8px 0;
        }
        .mobile-menu a:hover { color: var(--cognac); }
        .mobile-menu-divider { width: 40px; height: 1px; background: var(--sand-4); margin: 16px 0; }

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
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 24px;
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

        .hero-scroll {
          position: absolute; bottom: 48px; left: 64px; z-index: 2;
          display: flex; align-items: center; gap: 14px;
          animation: riseIn 1s .7s both;
        }
        .scroll-rule { width: 40px; height: 1px; background: linear-gradient(to right, var(--cognac), transparent); }
        .scroll-txt { font-size: 13px; letter-spacing: .38em; text-transform: uppercase; color: var(--ink-80); }

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
        .stats { display: flex; flex-direction: column; }
        .stat { padding: 36px 0; border-bottom: 1px solid var(--sand-4); }
        .stat:first-child { border-top: 1px solid var(--sand-4); }
        .stat-n {
          font-family: 'Cormorant Garamond', serif; font-size: 58px; font-weight: 400;
          color: var(--cognac); line-height: 1; margin-bottom: 10px;
        }
        .stat-l { font-size: 16px; line-height: 1.7; color: var(--ink-80); font-weight: 400; max-width: 280px; }

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

        .fit-visual { display: flex; flex-direction: column; gap: 2px; }
        .fit-main {
          background: var(--sand-3); border: 1px solid var(--sand-4);
          aspect-ratio: 3/4; position: relative; overflow: hidden;
        }
        .fit-main img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .fit-minis { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .fit-mini {
          background: var(--sand-2); border: 1px solid var(--sand-4);
          padding: 22px; display: flex; align-items: center; gap: 14px;
        }
        .mini-n { font-family: 'Cormorant Garamond', serif; font-size: 30px; color: var(--cognac); line-height: 1; }
        .mini-l { font-size: 14px; color: var(--ink-80); font-weight: 400; line-height: 1.4; }

        /* ── COLLECTION ── */
        .collection { padding: 160px 64px; background: var(--sand-2); }
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
          gap: 16px; max-width: 980px; margin: 0 auto;
        }

        .p-card {
          background: var(--sand); overflow: hidden;
          transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s;
          border: 1px solid var(--sand-3); position: relative;
        }
        .p-card:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(30,24,16,.07); }

        /* Hover quick-add — desktop only */
        .p-card-quickadd {
          position: absolute; inset: 0;
          background: rgba(245,239,228,.97); z-index: 10;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 16px; opacity: 0; visibility: hidden; transition: opacity .3s, visibility .3s;
        }
        .p-card:hover .p-card-quickadd { opacity: 1; visibility: visible; }
        .p-quickadd-title {
          font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 500;
          color: var(--ink); margin-bottom: 12px;
        }
        .p-quickadd-sizes { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-bottom: 12px; }
        .p-quickadd-sizes button {
          width: 38px; height: 38px; border: 1px solid var(--sand-4);
          background: var(--sand); font-family: 'Jost', sans-serif; font-size: 11px;
          font-weight: 500; color: var(--ink-80); cursor: pointer; transition: all .2s;
        }
        .p-quickadd-sizes button:hover,
        .p-quickadd-sizes button.selected { border-color: var(--cognac); background: var(--ink); color: var(--sand); }
        .p-quickadd-add {
          font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
          background: var(--ink); color: var(--sand); border: none; padding: 10px 24px;
          cursor: pointer; font-family: 'Jost', sans-serif; font-weight: 500;
          transition: all .3s; clip-path: polygon(0 0, 100% 0, 100% 68%, 92% 100%, 0 100%);
        }
        .p-quickadd-add:hover:not(:disabled) { background: var(--cognac); }
        .p-quickadd-add:disabled { opacity: .45; cursor: not-allowed; }

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
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .p-placeholder-name {
          font-family: 'Cormorant Garamond', serif; font-size: 13px;
          font-style: italic; color: var(--ink-60); letter-spacing: .06em;
        }
        .p-tag {
          position: absolute; top: 12px; left: 0;
          background: var(--ink); color: var(--sand);
          font-size: 9px; letter-spacing: .28em; text-transform: uppercase;
          font-weight: 500; padding: 5px 12px;
        }

        .p-info { padding: 20px 22px 24px; }
        .p-cat { font-size: 11px; letter-spacing: .38em; text-transform: uppercase; color: var(--cognac); font-weight: 600; margin-bottom: 6px; }
        .p-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500; color: var(--ink); margin-bottom: 10px; }
        .p-desc { font-size: 15px; line-height: 1.65; color: var(--ink-80); font-weight: 400; margin-bottom: 14px; }
        .p-specs { list-style: none; margin-bottom: 18px; }
        .p-specs li {
          font-size: 14px; color: var(--ink-80); font-weight: 400;
          padding: 7px 0; border-bottom: 1px solid var(--sand-3);
          display: flex; align-items: flex-start; gap: 10px; line-height: 1.5;
        }
        .p-specs li::before { content: '—'; color: var(--cognac); font-size: 9px; flex-shrink: 0; margin-top: 4px; }

        /* Mobile-friendly size selector */
        .p-size-row { margin-bottom: 16px; }
        .p-size-label { font-size: 11px; letter-spacing: .35em; text-transform: uppercase; color: var(--ink-60); font-weight: 500; display: block; margin-bottom: 8px; }
        .p-size-btns { display: flex; flex-wrap: wrap; gap: 6px; }
        .p-size-btn {
          min-width: 38px; height: 34px; padding: 0 8px;
          border: 1px solid var(--sand-4); background: var(--sand-2);
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500;
          color: var(--ink-80); cursor: pointer; transition: all .2s;
        }
        .p-size-btn:hover { border-color: var(--sand-5); color: var(--ink); }
        .p-size-btn.selected { border-color: var(--cognac); background: var(--ink); color: var(--sand); }

        .p-foot {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 14px; border-top: 1px solid var(--sand-3);
        }
        .p-price { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--ink); }
        .p-price small { font-size: 10px; color: var(--ink-60); letter-spacing: .1em; margin-left: 3px; }

        .btn-p {
          font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
          background: var(--ink); color: var(--sand); border: none; padding: 9px 18px;
          cursor: pointer; transition: all .3s; font-family: 'Jost', sans-serif; font-weight: 500;
          clip-path: polygon(0 0, 100% 0, 100% 68%, 88% 100%, 0 100%);
        }
        .btn-p:hover:not(:disabled) { background: var(--cognac); }
        .btn-p:disabled { background: var(--sand-5); cursor: not-allowed; }
        .btn-p-added { background: var(--cognac) !important; }

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
        .craft-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 80px; }
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
          background: var(--ink); border: none; color: var(--sand);
          font-family: 'Jost', sans-serif; font-weight: 500; font-size: 11px;
          letter-spacing: .26em; text-transform: uppercase; padding: 15px 28px;
          cursor: pointer; white-space: nowrap; transition: background .3s;
          clip-path: polygon(0 0, 100% 0, 100% 68%, 88% 100%, 0 100%);
          min-width: 140px;
        }
        .wl-submit:hover:not(:disabled) { background: var(--cognac); }
        .wl-submit:disabled { background: var(--sand-5); cursor: not-allowed; }
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
          height: 100vh; background: var(--sand); z-index: 301;
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

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .hamburger { display: flex; }
          .nav-links { display: none; }
          .nav, .nav.stuck { padding: 16px 24px; }
          .nav-btn { display: none; }

          .hero { grid-template-columns: 1fr; }
          .hero-right { display: none; }
          .hero-left { padding: 72px 24px 48px; }
          .hero-scroll { left: 24px; bottom: 36px; }

          .ethos, .problem, .founder { grid-template-columns: 1fr; gap: 56px; padding: 80px 24px; }
          .fit { padding: 80px 24px; }
          .fit-grid { grid-template-columns: 1fr; gap: 48px; }
          .fit-specs { grid-template-columns: 1fr; }
          .fit-minis { grid-template-columns: 1fr; }

          .collection { padding: 80px 24px; }
          .coll-header { grid-template-columns: 1fr; gap: 20px; }
          .product-grid { grid-template-columns: 1fr; max-width: none; }
          /* Hide hover quick-add on mobile since we have the inline size selector */
          .p-card-quickadd { display: none; }

          .craft { padding: 80px 24px; }
          .craft-pillars { grid-template-columns: 1fr; }

          .waitlist { padding: 80px 24px; }
          .wl-form { flex-direction: column; }
          .wl-input { border-right: 1px solid var(--sand-4); border-bottom: none; }
          .wl-submit { clip-path: none; }

          footer { padding: 56px 24px 32px; }
          .foot-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
          .foot-bottom { flex-direction: column; gap: 14px; text-align: center; }
        }
      `}</style>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <a href="#ethos" onClick={() => setMenuOpen(false)}>Story</a>
        <a href="#mission" onClick={() => setMenuOpen(false)}>Mission</a>
        <a href="#fit" onClick={() => setMenuOpen(false)}>Fit</a>
        <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
        <div className="mobile-menu-divider" />
        <a href="#waitlist" onClick={() => setMenuOpen(false)}>Join Waitlist</a>
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
                    <div className="cart-item-meta">Size {item.size}</div>
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
                {checkoutLoading ? "Redirecting to payment…" : "Checkout — Pre-Order"}
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
          <li><a href="#ethos">Story</a></li>
          <li><a href="#mission">Mission</a></li>
          <li><a href="#fit">Fit</a></li>
          <li><a href="#collection" onClick={() => setCollectionFilter("women")}>Women&apos;s</a></li>
          <li><a href="#collection" onClick={() => setCollectionFilter("men")}>Men&apos;s</a></li>
        </ul>
        <div className="nav-actions">
          <button type="button" className="nav-cart-btn" onClick={() => setCartOpen(true)} aria-label="Open cart">
            Bag
            {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
          </button>
          <a href="#waitlist" className="nav-btn">Join Waitlist</a>
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
      <section className="hero">
        <div className="hero-left">
          <div className="hero-content">
            <div className="eyebrow" style={{ fontSize: "20px" }}>
              <span className="eyebrow-rule" />
              Persian Craft · California Soul
            </div>
            <h1 className="hero-h1" style={{ fontSize: "clamp(60px, 8vw, 112px)" }}>
              Noble by<br /><em>nature.</em>
            </h1>
            <p className="hero-sub" style={{ fontSize: "24px" }}>
              Premium athleisure where Persian craft tradition meets the California coast. Built for every body. Made to last.
            </p>
            <div className="hero-ctas" style={{ fontSize: "24px" }}>
              <a href="#waitlist" className="btn-dark" style={{ fontSize: "18px" }}>Join Waitlist</a>
              <a href="#collection" className="btn-outline" style={{ fontSize: "18px" }}>Preview Collection</a>
            </div>
            <p className="hero-cta-note">
              Every purchase helps build schools and community spaces in Iran.
            </p>
          </div>
          <div className="hero-scroll">
            <div className="scroll-rule" />
            <span className="scroll-txt">Scroll to explore</span>
          </div>
        </div>
        <div className="hero-right">
          <WeavePattern id="hero-p" opacity={0.1} color="#8B6A3E" />
          <img src="/arya-hero.jpg" alt="Woman running in desert landscape at golden hour" className="hero-placeholder" />
          <div className="hero-right-overlay" />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex" }}>
              {["Persian Craft Heritage", "Built in Los Angeles", "For the Body That Moves", "Persian Cotton · Silk · Nylon", "Noble by Nature", "Pre-Order Open", "California Roots", "Built for Every Body"].map((t, j) => (
                <span key={j} className="ticker-item">{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── ETHOS (Our Story) — builds brand before products ── */}
      <section className="ethos" id="ethos">
        <div>
          <div className="ethos-card">
            <img src="/arya-story.jpg" alt="Arya brand story — texture and craft" className="ethos-card-img" loading="lazy" />
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
          <p className="body-txt">The name Arya comes from the ancient Persian word for noble and honorable — the very root of the name Iran itself. It reflects a simple belief: the way you move through the world should be matched by what you wear.</p>
          <p className="body-txt">At Arya, we build garments with care. Materials chosen with intention. Fit refined through movement. Craft without shortcuts.</p>
          <div className="ethos-divider" />
          <div className="values">
            <div className="val"><div className="val-b">Craft without compromise.</div></div>
            <div className="val"><div className="val-b">Garments that move with every part of your life.</div></div>
            <div className="val"><div className="val-b">Purpose that extends beyond the garment.</div></div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM — validates the need ── */}
      <section className="problem" id="problem">
        <div>
          <div className="label">The Gap We&apos;re Filling</div>
          <h2 className="display" style={{ marginBottom: 30 }}>Premium athleisure was never built for the body that <em>moves.</em></h2>
          <p className="body-txt">Most brands were designed for one silhouette — lean, narrow, and unchallenging. If you have strong quads, broad shoulders, or a chest that moves — you know the problem. The waistband gaps. The fabric pulls. The cut assumes a body that doesn&apos;t move, paddle, or ride.</p>
          <p className="body-txt">The active body has been an afterthought for every premium brand. Arya was built to change that. For everyone who lives fully and moves often.</p>
          <div className="pullquote">
            <p>&ldquo;The industry told you your body was the problem. It wasn&apos;t. The clothes were.&rdquo;</p>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-n">60%+</div>
            <div className="stat-l">Of athleisure buyers lead active lives — yet almost no premium brands engineer for the body that moves. Until now.</div>
          </div>
          <div className="stat">
            <div className="stat-n">$431B</div>
            <div className="stat-l">Global athleisure market in 2025. Growing to $731B by 2033. The category is real. The gap is real.</div>
          </div>
          <div className="stat">
            <div className="stat-n">3,000+</div>
            <div className="stat-l">Years of Persian textile craft tradition informing every Arya fit and fabric decision.</div>
          </div>
        </div>
      </section>

      {/* ── FIT — earns trust before asking for purchase ── */}
      <section className="fit" id="fit">
        <div className="label">Fit Philosophy</div>
        <div className="fit-grid">
          <div>
            <h2 className="display" style={{ marginBottom: 28 }}>Every pattern starts with<br />the body that <em>moves.</em></h2>
            <p className="body-txt">Standard sizing was built for a standard body. Arya&apos;s patterns start from scratch — with real movement data and the belief that a body that surfs, moves, rides, and lives fully deserves fabric that keeps up.</p>
            <p className="body-txt" style={{ marginBottom: 32 }}>Our Women&apos;s and Men&apos;s cuts share the same philosophy: engineered separately for each form, so everyone gets the same standard of fit.</p>
            <div className="fit-tabs">
              <button type="button" className={`fit-tab ${fitTab === "women" ? "active" : ""}`} onClick={() => setFitTab("women")}>Women&apos;s</button>
              <button type="button" className={`fit-tab ${fitTab === "men" ? "active" : ""}`} onClick={() => setFitTab("men")}>Men&apos;s</button>
            </div>
            <div className="fit-specs">
              {(fitTab === "women"
                ? [{ t: "Thighs", b: "Extended room. No pulling at any depth." }, { t: "Hips", b: "Built for the hips that move — no squeezing, no gapping." }, { t: "Waistband", b: "High-rise hold without digging or rolling." }, { t: "Inseam", b: "True to movement, wherever your day takes you." }]
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
            <div className="fit-minis">
              <div className="fit-mini"><div className="mini-n">4×</div><div className="mini-l">Stretch in all directions</div></div>
              <div className="fit-mini"><div className="mini-n">XS–3XL</div><div className="mini-l">Inclusive sizing, XS–3XL</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTION — shop after trust is built ── */}
      <section className="collection" id="collection">
        <div className="coll-header">
          <div>
            <div className="label">Launch Collection</div>
            <h2 className="display">The <em>foundation</em> pieces.</h2>
          </div>
          <p className="coll-note">Engineered from scratch for the body that moves. Select your size directly on each product card.</p>
        </div>
        <div className="coll-tabs">
          <button type="button" className={`coll-tab ${collectionFilter === "all" ? "active" : ""}`} onClick={() => setCollectionFilter("all")}>All</button>
          <button type="button" className={`coll-tab ${collectionFilter === "women" ? "active" : ""}`} onClick={() => setCollectionFilter("women")}>Women&apos;s</button>
          <button type="button" className={`coll-tab ${collectionFilter === "men" ? "active" : ""}`} onClick={() => setCollectionFilter("men")}>Men&apos;s</button>
        </div>

        <div className={`coll-section ${collectionFilter === "men" ? "hide-by-filter" : ""}`} id="women">
          <h3 className="coll-section-title">Women&apos;s</h3>
          <div className="product-grid">
            {womenProducts.map(p => <ProductCard key={p.id} p={p} addedProductId={addedProductId} selectedSizes={selectedSizes} setSize={setSize} addToCart={addToCart} />)}
          </div>
        </div>

        <div className={`coll-section ${collectionFilter === "women" ? "hide-by-filter" : ""}`} id="men">
          <h3 className="coll-section-title">Men&apos;s</h3>
          <div className="product-grid">
            {menProducts.map(p => <ProductCard key={p.id} p={p} addedProductId={addedProductId} selectedSizes={selectedSizes} setSize={setSize} addToCart={addToCart} />)}
          </div>
        </div>
      </section>

      {/* ── CRAFT / MISSION ── */}
      <section className="craft" id="mission">
        <WeavePattern id="craft-p" opacity={0.04} color="#C9A96E" />
        <div className="craft-inner">
          <div className="label">Mission</div>
          <h2 className="craft-h">Built in Los Angeles.<br /><em>Rooted in Persia.</em></h2>
          <p className="craft-body">Arya is a bridge between two worlds — the California coast where this founder was born, and the ancient land that gave him his culture, his values, and his name. Persian craft philosophy holds that doing something with complete precision is itself a form of art. Every stitch, every seam, every fit spec is held to that standard.</p>
          <p className="craft-body">A portion of every Arya purchase goes toward building schools and community spaces in Iran — because the land that gave this brand its soul deserves to see what its children can become.</p>
          <div className="craft-pillars">
            {[
              { n: "01", t: "Persian Craft", b: "Every garment held to the Persian artisan standard. No shortcuts, no compromises. Built to outlast trends by decades." },
              { n: "02", t: "Active Community", b: "For everyone who lives fully and moves often — and deserves clothing that keeps up with every part of that life." },
              { n: "03", t: "Giving Back", b: "Every purchase helps build schools and community spaces in Iran — the ancient land at the root of this brand." },
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
      <section className="founder" id="founder">
        <div>
          <div className="label">The Founder</div>
          <h2 className="display" style={{ marginBottom: 28 }}>I built what I couldn&apos;t <em>find.</em></h2>
          <p className="body-txt">I&apos;m Persian-American, born and raised in Los Angeles. I&apos;ve always been drawn to movement. The ocean. The mountains. The trail. Anywhere the body is meant to work.</p>
          <p className="body-txt">The people around me lived actively — but the clothing available to us rarely did. Most brands were built for one kind of space, not for the full life lived around it.</p>
          <p className="body-txt">I grew up visiting Iran as a child. The colors of Isfahan&apos;s architecture. The warmth of the people. The care in everything they made. In that culture, quality was a form of respect for both the maker and the wearer.</p>
          <p className="body-txt">Arya was born where those two worlds meet. The movement and energy of California, and the deep tradition of Persian craft.</p>
          <div className="f-sig">
            <AryaMark size={36} color="#8B6A3E" />
            <div>
              <div className="f-name">Nima G.</div>
              <div className="f-role">Founder & Creative Director</div>
            </div>
          </div>
        </div>
        <div className="f-photo">
          <img src="/arya-founder.png" alt="Nima G., Founder & Creative Director of Arya" loading="lazy" />
          <WeavePattern id="f-p" opacity={0.06} color="#8B6A3E" />
          <div className="f-photo-mark"><AryaMark size={72} color="#8B6A3E" /></div>
          <div className="f-corner" />
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section className="waitlist" id="waitlist">
        <WeavePattern id="wl-p" opacity={0.05} color="#8B6A3E" />
        <div className="wl-inner">
          <div className="label" style={{ justifyContent: "center" }}>Early Access</div>
          <h2 className="display" style={{ marginBottom: 16, fontSize: "clamp(42px,5vw,68px)" }}>Be first.<br /><em>Be noble.</em></h2>
          <p className="wl-sub">Join the Arya waitlist for early access to the launch collection, founder updates, and pre-order pricing. Men&apos;s and women&apos;s — dropping together.</p>
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

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-grid">
          <div>
            <AryaLogo size={30} markColor="#8B6A3E" textColor="#F5EFE4" />
            <p className="foot-tagline">Noble materials. Noble fit.<br />Noble purpose.</p>
            <div className="foot-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="mailto:hello@wearARYA.com">Email</a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Collection</h5>
            <ul>
              <li><a href="#collection" onClick={() => setCollectionFilter("women")}>Women&apos;s</a></li>
              <li><a href="#collection" onClick={() => setCollectionFilter("men")}>Men&apos;s</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Brand</h5>
            <ul>
              <li><a href="#ethos">Our Story</a></li>
              <li><a href="#mission">Mission</a></li>
              <li><a href="#founder">Founder</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@wearARYA.com">hello@wearARYA.com</a></li>
              <li><a href="mailto:press@wearARYA.com">Press</a></li>
              <li><a href="mailto:wholesale@wearARYA.com">Wholesale</a></li>
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
