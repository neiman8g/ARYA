"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AryaLogo } from "@/components/AryaLogo";
import { useCart } from "@/components/commerce/CartProvider";

const SECTION_IDS = ["collection", "skin-health", "ethos", "problem", "fit", "mission", "founder", "waitlist", "arya-standard"];

export function HomeNav() {
  const { cartCount, setCartOpen } = useCart();
  const [navStuck, setNavStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  // Scroll-based nav stuck state
  useEffect(() => {
    const h = () => setNavStuck((prev) => { const over = window.scrollY > 60; return prev === over ? prev : over; });
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // BFCache restore
  useEffect(() => {
    const onPageShow = () => { setMenuOpen(false); document.body.style.overflow = ""; setNavStuck(window.scrollY > 60); };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // Close menu on route/hash change
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const onHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Scroll spy
  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= viewportMid && top + el.offsetHeight >= viewportMid) { current = id; break; }
        if (top < viewportMid) current = id;
      }
      setActiveSection((prev) => (current !== prev ? current : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  // Clear Explore dropdown focus on nav back
  useEffect(() => {
    if (pathname !== "/") return;
    requestAnimationFrame(() => {
      const el = document.activeElement;
      if (el instanceof HTMLElement && el.closest?.(".nav-explore")) el.blur();
    });
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile menu overlay */}
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

      {/* Desktop + mobile nav bar */}
      <nav className={`nav ${navStuck ? "stuck" : ""}`} role="navigation" aria-label="Main navigation">
        <a href="#" className="nav-logo-link" aria-label="Arya home">
          <AryaLogo size={32} markColor="#8B6A3E" textColor="#1E1810" />
        </a>
        <ul className="nav-links">
          <li><Link href="/collection" className={activeSection === "collection" ? "active" : ""}>Collection</Link></li>
          <li><Link href="/story" className={activeSection === "ethos" || activeSection === "problem" ? "active" : ""}>Story</Link></li>
          <li><Link href="/fit" className={activeSection === "fit" ? "active" : ""}>Fit</Link></li>
          <li><Link href="/mission" className={activeSection === "mission" ? "active" : ""}>Mission</Link></li>
          <li><Link href="/founder" className={activeSection === "founder" ? "active" : ""}>Founders</Link></li>
          <li><Link href="/arya-standard" className={activeSection === "arya-standard" ? "active" : ""}>The Standard</Link></li>
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
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  );
}

export function StickyCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > window.innerHeight * 0.6;
      setShow((prev) => (prev === shouldShow ? prev : shouldShow));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cta-bar ${show ? "visible" : ""}`}>
      <div className="sticky-cta-inner">
        <span className="sticky-cta-text">Founder pricing ends at launch</span>
        <a href="#waitlist" className="sticky-cta-btn">Join Waitlist</a>
      </div>
    </div>
  );
}

export function FadeInObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return null;
}
