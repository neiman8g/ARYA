"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { AryaLogo, AryaMark } from "@/components/AryaLogo";
import { FoundersSection } from "@/components/FoundersSection";
import { HomeBrandedFooter } from "@/components/HomeBrandedFooter";

// ─── Brand SVG Components ────────────────────────────────────────────────────

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
  "noble-legging":
    "Skin-conscious NobleFlex fabric. No PFAS, no toxic dyes, no synthetics against your skin. Four-way stretch engineered for athletic builds.",
  "noble-bra":
    "Skin-conscious NobleFlex. No PFAS or toxic dyes against your skin. Medium to high support with four-way stretch.",
  "noble-long-crop":
    "Skin-conscious NobleFlex. No PFAS, no toxic dyes. Pairs as a set with the Noble Sports Bra — four-way stretch, movement-ready.",
  "noble-short":
    "Skin-conscious NobleDry. No PFAS, no toxic dyes. Extended thigh room and four-way stretch for real movement.",
  "noble-tee":
    "Skin-conscious NobleSoft. No PFAS, no toxic dyes, no synthetics against your skin. Silk-like feel, naturally odor resistant.",
  "noble-pant":
    "Skin-conscious NobleDry. No PFAS, no toxic dyes. Five-pocket performance trouser — four-way stretch for the body that moves.",
};

function withNobleflexLink(text: string) {
  const parts = text.split("NobleFlex");
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && <Link href="/arya-standard">NobleFlex</Link>}
          {part}
        </span>
      ))}
    </>
  );
}

// ─── Types & Data ─────────────────────────────────────────────────────────────

type CartItem = {
  id: string;
  productId: string;
  name: string;
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
        {CARD_DESCRIPTIONS[p.id] && <p className="p-card-desc">{withNobleflexLink(CARD_DESCRIPTIONS[p.id])}</p>}
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
          <div className="p-coming">Coming Fall 2026</div>
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
  const [emailInputError, setEmailInputError] = useState("");
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
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<string>("");

  const womenProducts = useMemo(() => PRODUCTS.filter((p) => p.gender === "Women's"), []);
  const menProducts = useMemo(() => PRODUCTS.filter((p) => p.gender === "Men's"), []);

  // Threshold-based scroll — only re-renders when crossing 60px.
  // Run once on mount so restored scroll position (back/forward) matches .nav.stuck.
  useEffect(() => {
    const h = () => {
      const over = window.scrollY > 60;
      setNavStuck(prev => prev === over ? prev : over);
    };
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Lock body scroll when mobile menu or cart is open
  useEffect(() => {
    document.body.style.overflow = (menuOpen || cartOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, cartOpen]);

  // Back/forward cache (mobile Safari, Chrome): restore can leave menu open + overflow locked
  useEffect(() => {
    const onPageShow = () => {
      setMenuOpen(false);
      setCartOpen(false);
      document.body.style.overflow = "";
      setNavStuck(window.scrollY > 60);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // Close mobile menu when route changes (e.g. hash change for #waitlist)
  const pathname = usePathname();

  // Scroll spy: highlight nav link for the section in view (homepage only)
  const sectionIds = ["collection", "skin-health", "ethos", "problem", "fit", "mission", "founder", "waitlist", "arya-standard"];
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

  useEffect(() => {
    const onHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* Desktop Explore uses :focus-within; clear focus when returning home so the dropdown
     does not stay open after client navigation or bfcache. */
  useEffect(() => {
    if (pathname !== "/") return;
    requestAnimationFrame(() => {
      const el = document.activeElement;
      if (el instanceof HTMLElement && el.closest?.(".nav-explore")) {
        el.blur();
      }
    });
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  // Section fade-in on scroll
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
      },
      /* No negative bottom inset — short sections at page end never reached 12% visible. */
      { threshold: 0.08, rootMargin: "0px 0px 0px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setEmailInputError("")

    const emailValue = email.trim()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
    if (!validEmail) {
      setEmailInputError("Please enter a valid email address.")
      setSubmitting(false)
      return
    }

    try {
      const response = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=RkkP9u', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'revision': '2023-12-15'
        },
        body: JSON.stringify({
          data: {
            type: 'subscription',
            attributes: {
              profile: {
                data: {
                  type: 'profile',
                  attributes: {
                    email: emailValue
                  }
                }
              }
            },
            relationships: {
              list: {
                data: {
                  type: 'list',
                  id: 'YxmBfA'
                }
              }
            }
          }
        })
      })

      if (response.ok || response.status === 202) {
        setSubmitted(true)
        setEmail('')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  };

  const setColor = (productId: string, colorName: string) =>
    setSelectedColors(prev => ({ ...prev, [productId]: colorName }));

  const updateQty = (id: string, delta: number) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const removeFromCart = (id: string) =>
    setCart(prev => prev.filter(i => i.id !== id));

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
          items: cart.map(({ id, productId, name, size, color, qty }) => ({ id, productId, name, size, color, qty })),
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
    <div className="arya-home">

      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ── MOBILE MENU (match SectionNav on other pages) ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-primaries">
          <a href="#waitlist" className="mobile-menu-cta mobile-menu-cta-primary" onClick={closeMenu}>Join Waitlist</a>
        </div>
        <div className="mobile-menu-divider" />
        <div className="mobile-menu-links">
          <Link href="/collection" className={activeSection === "collection" ? "active" : ""} onClick={closeMenu}>Collection</Link>
          <Link href="/story" className={activeSection === "ethos" || activeSection === "problem" ? "active" : ""} onClick={closeMenu}>Story</Link>
          <Link href="/mission" className={activeSection === "mission" ? "active" : ""} onClick={closeMenu}>Mission</Link>
          <Link href="/fit" className={activeSection === "fit" ? "active" : ""} onClick={closeMenu}>Fit</Link>
          <Link href="/founder" className={activeSection === "founder" ? "active" : ""} onClick={closeMenu}>Founders</Link>
          <Link href="/arya-standard" className={activeSection === "arya-standard" ? "active" : ""} onClick={closeMenu}>The Standard</Link>
          <Link href="/blog" onClick={closeMenu}>Journal</Link>
          <Link href="/fit-guide" onClick={closeMenu}>Fit Guide</Link>
          <Link href="/faq" onClick={closeMenu}>FAQ</Link>
          <Link href="/sustainability" onClick={closeMenu}>Sustainability</Link>
          <Link href="/skin-conscious" onClick={closeMenu}>Skin Conscious</Link>
        </div>
      </div>

      {/* ── CART DRAWER ── */}
      <div
        className={`cart-overlay ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
        aria-hidden={!cartOpen}
      >
        <div className="cart-drawer" onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="shopping-bag-heading" aria-describedby="shopping-bag-content">
          <div className="cart-drawer-header" id="shopping-bag-heading">
            Bag {cartCount > 0 && `(${cartCount})`}
            <button type="button" className="cart-drawer-close" onClick={() => setCartOpen(false)} aria-label="Close shopping bag">×</button>
          </div>
          <div className="cart-drawer-body" id="shopping-bag-content">
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
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="cart-drawer-footer">
              <p className="cart-preorder-note">Pre-orders ship Spring 2026. Free shipping on all orders.</p>
              {checkoutError && <p className="cart-checkout-error">{checkoutError}</p>}
              <button type="button" className="cart-checkout" onClick={goToCheckout} disabled={checkoutLoading}>
                {checkoutLoading ? "Redirecting to payment…" : "Checkout Pre-Order"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className={`nav ${navStuck ? "stuck" : ""}`} role="navigation" aria-label="Main navigation">
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
          <li className="nav-explore">
            <button type="button" className="nav-explore-btn">Explore</button>
            <div className="nav-explore-menu">
              <Link href="/blog">Journal</Link>
              <Link href="/fit-guide">Fit Guide</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/sustainability">Sustainability</Link>
              <Link href="/skin-conscious">Skin Conscious</Link>
            </div>
          </li>
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

      <div className="arya-home-main">
      {/* ── HERO ── */}
      <section className="hero fade-section" id="main-content">
        <div className="hero-left">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-rule" />
              Persian Craft · California Soul · Fall 2026
            </div>
            <h1 className="sr-only">Premium Activewear Engineered for Athletic Bodies — PFAS-Free, Skin-Conscious — Los Angeles</h1>
            <h2 className="hero-h1">
              Noble by<br /><em>nature.</em>
            </h2>
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
          <Image
            src="/arya-hero.jpg"
            alt="Woman running through desert — premium athleisure for athletic bodies by Arya"
            className="hero-placeholder"
            priority
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="hero-right-overlay" />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker fade-section">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex" }}>
              {[
                "BUILT FOR EVERY BODY",
                "PERSIAN CRAFT PHILOSOPHY",
                "CALIFORNIA SOUL",
                "NOBILITY IN EVERY THREAD",
                "SKIN CONSCIOUS",
                "SUSTAINABLY MINDED",
                "NO PFAS",
                "NO TOXIC DYES",
                "NO COMPROMISES",
              ].map((t, j) => (
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

      {/* ── SKIN HEALTH ── */}
      <section className="skin-health fade-section" id="skin-health">
        <div className="label">Materials</div>
        <h2 className="display">
          What touches your skin <em>matters.</em>
        </h2>
        <div className="skin-health-grid">
          <div className="skin-col">
            <h3>No PFAS coatings</h3>
            <p>
              Forever chemicals have no place in fabric that touches your skin all day. Every Arya material is PFAS-free by design.
            </p>
          </div>
          <div className="skin-col">
            <h3>No toxic dyes</h3>
            <p>
              Conventional dye systems carry compounds that sit against your skin for hours. We refuse every one of them.
            </p>
          </div>
          <div className="skin-col">
            <h3>No virgin synthetics</h3>
            <p>
              Most athleisure is plastic. Petroleum-based fibers that trap heat, irritate skin, and shed microplastics in every wash. Not here.
            </p>
          </div>
        </div>
        <p className="skin-health-pull">
          The Arya Standard: if we would not wear it against our own skin, we will not make it.
        </p>
      </section>

      {/* ── ETHOS (Our Story) ── */}
      <section className="ethos fade-section" id="ethos">
        <div>
          <div className="ethos-card">
            <Image
              src="/arya-story.jpg"
              alt="Arya brand — Persian craft meets California athleisure"
              className="ethos-card-img"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <WeavePattern id="ethos-p" opacity={0.12} color="#8B6A3E" />
            <div className="ethos-card-content">
              <AryaMark size={96} color="#8B6A3E" />
              <div className="ethos-card-label">A &nbsp; R &nbsp; Y &nbsp; A</div>
              <div className="ethos-card-meaning">Noble · Honorable · Pure</div>
            </div>
            <div className="ethos-corner" />
          </div>
        </div>
        <div>
          <div className="label">Our Story</div>
          <h2 className="display" style={{ marginBottom: 30 }}>Where the Pacific Coast<br />meets <em>Persian craft.</em></h2>
          <p className="body-txt">Arya was born between two worlds: the salt air of Southern California and the ancient textile traditions of Persia. One shaped by movement, the other by centuries of craft.</p>
          <p className="body-txt">The name Arya comes from the ancient Persian word for noble and honorable, the very root of the name Iran itself. It reflects a simple belief: the way you move through the world should be matched by what you wear.</p>
          <p className="body-txt">At Arya, we build garments with care. Materials chosen with intention. <Link href="/fit-guide">Fit</Link> refined through movement. <Link href="/sustainability">Craft</Link> without shortcuts. From <Link href="/arya-standard">NobleFlex</Link> to the final seam, every detail is intentional.</p>
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
          <p className="body-txt">Arya was built to close all three gaps at once. Engineered fit for the body that actually moves. <Link href="/sustainability">Skin conscious materials</Link> that respect what they touch. <Link href="/arya-standard">The Arya Standard</Link> refuses to compromise any of it.</p>
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
            <div className="stat-n">176B</div>
            <div className="stat-l">Sustainable athleisure market by 2030, doubling in six years</div>
          </div>
          <div className="stat">
            <div className="stat-n">415B</div>
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
              <Image
                src="/arya-fit.jpg"
                alt="Athletic fit activewear engineered for strong quads and broad shoulders"
                className="fit-section-img"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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
              { n: "01", t: "Persian Craft", href: "/story", b: "Persian craft philosophy holds that doing something with complete precision is itself a form of art. Every stitch, every seam, every fit decision at Arya is held to that standard. No shortcuts. No compromises. Built to outlast trends by decades." },
              { n: "02", t: "Skin Conscious", href: "/skin-conscious", b: "Every Arya fabric is chosen with your health in mind. No harmful dyes. No toxic synthetics against your body. Materials that feel as good as they perform. Because luxury should never come at the cost of your wellbeing." },
              { n: "03", t: "Active Community", href: "/collection", b: "For everyone who lives fully and moves often. Not one sport. Not one body type. Not one image. Clothing that crosses every terrain, every ritual, every version of you." },
              { n: "04", t: "Giving Back", href: "/arya-standard", b: "A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities, starting with Iran and growing wherever the need exists. Sport gave our founder his confidence and his mental strength. We believe every child deserves that same opportunity." },
            ].map((p, i) => (
              <div key={i} className="pillar">
                <div className="pil-n">{p.n}</div>
                <Link href={p.href} className="pil-t">{p.t}</Link>
                <p className="pil-b">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FoundersSection showCtas={false} />

      {/* ── WAITLIST ── */}
      <section className="waitlist fade-section" id="waitlist">
        <WeavePattern id="wl-p" opacity={0.05} color="#8B6A3E" />
        <div className="wl-inner">
          <div className="label" style={{ justifyContent: "center" }}>Early Access</div>
          <h2 className="display" style={{ marginBottom: 16, fontSize: "clamp(42px,5vw,68px)" }}>Be first.<br /><em>Be noble.</em></h2>
          <p className="wl-sub">Join the Arya waitlist for early access to the launch collection and founder updates. Men&apos;s and women&apos;s dropping together.<br /><span className="wl-launch">Launching Fall 2026. Your early access is reserved.</span></p>
          {submitted ? (
            <div className="wl-success"><p>You are on the list. We will be in touch.</p></div>
          ) : (
            <>
              {error && <p className="wl-error">{error}</p>}
              <p className="wl-priority">Waitlist members get first access before the public.</p>
              <form className="wl-form" onSubmit={handleSubmit}>
                <label htmlFor="waitlist-email" className="sr-only">Your email address</label>
                <input
                  id="waitlist-email"
                  type="email" className="wl-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    if (emailInputError) setEmailInputError("")
                  }}
                  required
                />
                {emailInputError && <p className="wl-input-error" role="alert">{emailInputError}</p>}
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
      </div>

      <HomeBrandedFooter />
    </div>
  );
}

