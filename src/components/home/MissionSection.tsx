import Link from "next/link";
import { WeavePattern } from "@/components/brand/WeavePattern";

const PILLARS = [
  { n: "01", t: "Craft", href: "/story", b: "Every stitch, every seam, every fit decision at Arya is held to the same standard." },
  { n: "02", t: "Skin Conscious", href: "/skin-conscious", b: "Every Arya fabric is chosen with the person wearing it in mind." },
  { n: "03", t: "Collection", href: "/collection", b: "Women's and men's pieces, cut separately." },
  { n: "04", t: "Giving Back", href: "/arya-standard", b: "A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities, starting with Iran and growing wherever the need exists. Sport gave our founder his confidence and his mental strength. We believe every child deserves that same opportunity." },
];

export function MissionSection() {
  return (
    <section className="craft fade-section" id="mission">
      <WeavePattern id="craft-p" opacity={0.04} color="#C9A96E" />
      <div className="craft-inner">
        <div className="label">Mission</div>
        <h2 className="craft-h">Built with purpose.</h2>
        <p className="craft-body">Every decision we make, from the fabrics we choose to the communities we invest in, is held to the same standard. Designed in California.</p>
        <div className="craft-pillars">
          {PILLARS.map((p, i) => (
            <div key={i} className="pillar">
              <div className="pil-n">{p.n}</div>
              <Link href={p.href} className="pil-t">{p.t}</Link>
              <p className="pil-b">{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
