"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ActiveLink = "story" | "mission" | "fit" | "collection" | "founder" | "arya-standard";

export function SectionNav({ activeLink }: { activeLink?: ActiveLink }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className={`sp-nav ${menuOpen ? "sp-nav-menu-open" : ""}`}>
      <Link href="/" className="sp-logo" onClick={closeMenu}>
        ARYA
      </Link>
      <button
        type="button"
        className={`sp-hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`sp-mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="sp-links">
          <Link href="/story" className={activeLink === "story" ? "active" : ""} onClick={closeMenu} onTouchStart={closeMenu}>
            Story
          </Link>
          <Link href="/mission" className={activeLink === "mission" ? "active" : ""} onClick={closeMenu} onTouchStart={closeMenu}>
            Mission
          </Link>
          <Link href="/fit" className={activeLink === "fit" ? "active" : ""} onClick={closeMenu} onTouchStart={closeMenu}>
            Fit
          </Link>
          <Link href="/collection" className={activeLink === "collection" ? "active" : ""} onClick={closeMenu} onTouchStart={closeMenu}>
            Collection
          </Link>
          <Link href="/founder" className={activeLink === "founder" ? "active" : ""} onClick={closeMenu} onTouchStart={closeMenu}>
            Founders
          </Link>
          <Link href="/arya-standard" className={activeLink === "arya-standard" ? "active" : ""} onClick={closeMenu} onTouchStart={closeMenu}>
            The Standard
          </Link>
          <Link href="/#waitlist" className="btn-waitlist" onClick={closeMenu} onTouchStart={closeMenu}>
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
