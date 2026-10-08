import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Our Story | Arya",
  description: "Designed in California.",
  keywords: "Arya, California, activewear",
  openGraph: {
    title: "Our Story | Arya",
    description: "Designed in California.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | Arya",
    description: "Designed in California.",
    images: ["/arya-hero.jpg"],
  },
};

export default function StoryPage() {
  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav activeLink="story" />

      <main className="sp-main">
        <div className="sp-hero">
          <div className="sp-hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/arya-story.jpg" alt="Arya" className="sp-img" />
          </div>
          <div className="sp-hero-content">
            <span className="sp-label">Our Story</span>
            <h1>Designed in California.</h1>
            <p>At Arya, we build garments with care. Materials chosen with intention. Fit refined through wear. Craft without shortcuts.</p>
            <div className="sp-values">
              <div>Built with intention.</div>
              <div>Rooted in something real.</div>
            </div>
            <div className="sp-btn-group">
              <Link href="/collection" className="sp-btn">View Collection</Link>
              <Link href="/founder" className="sp-btn sp-btn-secondary">Meet the Founders</Link>
            </div>
            <p>Arya is Persian for noble.</p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
