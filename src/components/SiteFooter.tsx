import Image from "next/image";
import Link from "next/link";
import { SOCIAL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div className="stack" style={{ gap: 14 }}>
          <Image className="foot-icon" src="/brand/arya-icon.png" alt="ARYA" width={41} height={34} />
          <p className="soft small">Premium non-toxic activewear. Designed in California.</p>
        </div>
        <div>
          <h2 className="foot-h">Shop</h2>
          <ul>
            <li><Link href="/women">Women</Link></li>
            <li><Link href="/men">Men</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="foot-h">ARYA</h2>
          <ul>
            <li><Link href="/arya-standard">The Standard</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Journal</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="foot-h">Write to us</h2>
          <ul>
            <li><a href="mailto:hello@arya.clothing">hello@arya.clothing</a></li>
            <li><a href="mailto:press@arya.clothing">press@arya.clothing</a></li>
            <li><a href={SOCIAL.instagram}>Instagram</a></li>
            <li><a href={SOCIAL.tiktok}>TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap legal">
        <span>&copy; {new Date().getFullYear()} ARYA</span>
        <span>
          <Link href="/shipping-returns">Shipping &amp; Returns</Link> &middot; <Link href="/privacy">Privacy</Link> &middot;{" "}
          <Link href="/terms">Terms</Link>
        </span>
        <Image className="legal-mark" src="/brand/arya-wordmark.png" alt="" width={70} height={14} />
      </div>
    </footer>
  );
}
