import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Our Mission | Arya",
  description: "Designed in California. A portion of every purchase builds schools for children.",
  keywords: "Arya mission, schools, activewear",
  openGraph: {
    title: "Our Mission | Arya",
    description: "Designed in California. A portion of every purchase builds schools for children.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission | Arya",
    description: "Designed in California. A portion of every purchase builds schools for children.",
    images: ["/arya-hero.jpg"],
  },
};

export default function MissionPage() {
  return (
    <div className="section-page mission">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav activeLink="mission" theme="dark" />

      <main className="sp-main mission-main">
        <span className="sp-label">Mission</span>
        <h1>Built with purpose.</h1>
        <p>Designed in California. Every decision we make, from the fabrics we choose to the communities we invest in, is held to the same standard.</p>
        <p>A portion of every Arya purchase goes toward building schools for children in underserved communities, starting with Iran and growing wherever the need exists.</p>
        <div className="mission-pillars">
          {[
            { n: "01", t: "Craft", b: "Every stitch, every seam, every fit decision at Arya is held to the same standard." },
            { n: "02", t: "Skin Conscious", b: "Every Arya fabric is chosen with the person wearing it in mind." },
            { n: "03", t: "Collection", b: "Women's and men's pieces, cut separately." },
            { n: "04", t: "Giving Back", b: "A portion of every Arya purchase goes toward building schools for children in underserved communities, starting with Iran and growing wherever the need exists." },
          ].map((p) => (
            <div key={p.n} className="pillar">
              <div className="pillar-n">{p.n}</div>
              <div className="pillar-t">{p.t}</div>
              <p>{p.b}</p>
            </div>
          ))}
        </div>
        <Link href="/collection" className="sp-btn">View Collection</Link>
      </main>

      <SiteFooter className="mission-foot" />
    </div>
  );
}
