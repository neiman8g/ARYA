import Link from "next/link";
import { AryaLogo, AryaMark } from "@/components/AryaLogo";

/** Full homepage-style footer (dark, 4-col desktop) for blog and other routes that need parity. */
export function HomeBrandedFooter() {
  return (
    <footer className="home-branded-footer fade-section" aria-label="Footer navigation">
      <div className="foot-grid">
        <div className="foot-brand">
          <AryaLogo size={30} markColor="#8B6A3E" textColor="#F5EFE4" />
          <p className="foot-tagline">Noble materials. Noble fit.<br />Noble purpose.</p>
          <div className="foot-social">
            <a href="https://instagram.com/wear_arya" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://tiktok.com/@wear_arya" target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a href="mailto:hello@arya.clothing">Email</a>
          </div>
        </div>
        <div className="foot-col foot-col-desktop-only">
          <h5>Collection</h5>
          <ul>
            <li>
              <Link href="/collection">Collection</Link>
            </li>
          </ul>
        </div>
        <div className="foot-col foot-col-desktop-only">
          <h5>Brand</h5>
          <ul>
            <li>
              <Link href="/story">Our Story</Link>
            </li>
            <li>
              <Link href="/mission">Mission</Link>
            </li>
            <li>
              <Link href="/founder">Founders</Link>
            </li>
            <li>
              <Link href="/arya-standard">The Standard</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/fit-guide">Fit Guide</Link>
            </li>
            <li>
              <Link href="/skin-conscious">Skin Conscious</Link>
            </li>
            <li>
              <Link href="/sustainability">Sustainability</Link>
            </li>
            <li>
              <Link href="/blog">The Journal</Link>
            </li>
          </ul>
        </div>
        <div className="foot-col foot-contact">
          <h5>Contact</h5>
          <ul>
            <li>
              <a href="mailto:hello@arya.clothing">hello@arya.clothing</a>
            </li>
            <li>
              <a href="mailto:press@arya.clothing">Press</a>
            </li>
            <li>
              <a href="mailto:wholesale@arya.clothing">Wholesale</a>
            </li>
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
  );
}
