import Link from "next/link";
import { AryaMark } from "@/components/AryaLogo";

type SiteFooterProps = {
  variant?: "section" | "product";
  /** Extra classes on `<footer>` (e.g. `mission-foot`). */
  className?: string;
};

const SECTION_DESKTOP_LINKS = [
  { href: "/story", label: "Story" },
  { href: "/mission", label: "Mission" },
  { href: "/collection", label: "Collection" },
  { href: "/founder", label: "Founders" },
  { href: "/arya-standard", label: "The Standard" },
  { href: "/#waitlist", label: "Waitlist" },
] as const;

const PRODUCT_DESKTOP_LINKS = [
  { href: "/story", label: "Our Story" },
  { href: "/mission", label: "Mission" },
  { href: "/collection", label: "Collection" },
  { href: "/founder", label: "Founders" },
  { href: "/arya-standard", label: "The Standard" },
  { href: "/blog", label: "The Journal" },
  { href: "/#waitlist", label: "Waitlist" },
] as const;

/**
 * Section pages: desktop = original `sp-foot` (Arya + link row + copy).
 * Mobile = brand + socials + contact + copy (no duplicate nav row).
 */
export function SiteFooter({ variant = "section", className = "" }: SiteFooterProps) {
  const rootClass =
    `${variant === "product" ? "p-foot" : "sp-foot"} site-footer-root ${className}`.trim();
  const links = variant === "product" ? PRODUCT_DESKTOP_LINKS : SECTION_DESKTOP_LINKS;

  return (
    <footer className={rootClass} aria-label="Footer navigation">
      <div className="site-footer-desktop-classic">
        {variant === "product" ? (
          <Link href="/" className="p-foot-logo">
            <AryaMark size={20} color="#8B6A3E" />
            <span>Arya</span>
          </Link>
        ) : (
          <Link href="/">Arya</Link>
        )}
        <div className={variant === "product" ? "p-foot-links" : ""}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="site-footer-mobile-rich">
        <div className="site-footer-mobile-inner">
          <div className="site-footer-brand">
            {variant === "product" ? (
              <Link href="/" className="p-foot-logo">
                <AryaMark size={20} color="#8B6A3E" />
                <span>Arya</span>
              </Link>
            ) : (
              <Link href="/">Arya</Link>
            )}
            <div className="site-footer-social">
              <a href="https://instagram.com/wear_arya" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://tiktok.com/@wear_arya" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
              <a href="mailto:hello@arya.clothing">Email</a>
            </div>
          </div>
          <div className="site-footer-contact">
            <h2 className="site-footer-contact-title">Contact</h2>
            <ul className="site-footer-contact-list">
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
      </div>

      <p className="site-footer-copy">© 2026 Arya · Noble by nature.</p>
    </footer>
  );
}
