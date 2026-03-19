"use client";

import { useState, useEffect, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AryaLogo } from "@/components/AryaLogo";

type ActiveLink = "story" | "mission" | "fit" | "collection" | "founder" | "arya-standard";

type SectionNavProps = {
  activeLink?: ActiveLink;
  /** Dark nav text and treatments (mission page on ink background). */
  theme?: "light" | "dark";
};

export function SectionNav({ activeLink, theme = "light" }: SectionNavProps) {
  const mobileMenuId = useId();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navStuck, setNavStuck] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => {
      const over = window.scrollY > 60;
      setNavStuck((prev) => (prev === over ? prev : over));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Client navigation: always close the mobile sheet so it cannot appear “stuck” on the next page. */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* BFCache restore: clear sheet + scroll lock (same bug class as homepage). */
  useEffect(() => {
    const onPageShow = () => {
      setMenuOpen(false);
      document.body.style.overflow = "";
      setNavStuck(window.scrollY > 60);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const logoMark = "#8B6A3E";
  const logoText = theme === "dark" ? "#F5EFE4" : "#1E1810";

  /* Mobile sheet must NOT live inside .sp-nav: .stuck uses backdrop-filter, which makes
     position:fixed descendants paint inside the nav bar only (broken full-screen menu). */
  return (
    <>
      <div
        id={mobileMenuId}
        className={`sp-mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="sp-mobile-menu-primaries">
          <Link href="/collection" className="sp-mobile-menu-cta sp-mobile-menu-cta-primary" onClick={closeMenu}>
            Shop Collection
          </Link>
        </div>
        <div className="sp-mobile-menu-divider" />
        <div className="sp-links">
          <Link href="/collection" className={activeLink === "collection" ? "active" : ""} onClick={closeMenu}>
            Collection
          </Link>
          <Link href="/story" className={activeLink === "story" ? "active" : ""} onClick={closeMenu}>
            Story
          </Link>
          <Link href="/mission" className={activeLink === "mission" ? "active" : ""} onClick={closeMenu}>
            Mission
          </Link>
          <Link href="/fit" className={activeLink === "fit" ? "active" : ""} onClick={closeMenu}>
            Fit
          </Link>
          <Link href="/founder" className={activeLink === "founder" ? "active" : ""} onClick={closeMenu}>
            Founders
          </Link>
          <Link href="/arya-standard" className={activeLink === "arya-standard" ? "active" : ""} onClick={closeMenu}>
            The Standard
          </Link>
          <Link href="/blog" onClick={closeMenu}>
            Journal
          </Link>
          <Link href="/fit-guide" onClick={closeMenu}>
            Fit Guide
          </Link>
          <Link href="/faq" onClick={closeMenu}>
            FAQ
          </Link>
          <Link href="/sustainability" onClick={closeMenu}>
            Sustainability
          </Link>
        </div>
      </div>
      <nav
        className={`sp-nav ${navStuck ? "stuck" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link href="/" className="sp-logo" onClick={closeMenu} aria-label="Arya home">
          <AryaLogo size={32} markColor={logoMark} textColor={logoText} />
        </Link>
        <div className="sp-links">
          <Link href="/collection" className={activeLink === "collection" ? "active" : ""}>
            Collection
          </Link>
          <Link href="/story" className={activeLink === "story" ? "active" : ""}>
            Story
          </Link>
          <Link href="/mission" className={activeLink === "mission" ? "active" : ""}>
            Mission
          </Link>
          <Link href="/fit" className={activeLink === "fit" ? "active" : ""}>
            Fit
          </Link>
          <Link href="/founder" className={activeLink === "founder" ? "active" : ""}>
            Founders
          </Link>
          <Link href="/arya-standard" className={activeLink === "arya-standard" ? "active" : ""}>
            The Standard
          </Link>
          <div className="sp-explore">
            <button type="button" className="sp-explore-btn">Explore</button>
            <div className="sp-explore-menu">
              <Link href="/blog">Journal</Link>
              <Link href="/fit-guide">Fit Guide</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/sustainability">Sustainability</Link>
            </div>
          </div>
        </div>
        <div className="sp-actions">
          <Link href="/#waitlist" className="sp-waitlist-btn" onClick={closeMenu}>
            Join Waitlist
          </Link>
        </div>
        <button
          type="button"
          className={`sp-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={mobileMenuId}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}
