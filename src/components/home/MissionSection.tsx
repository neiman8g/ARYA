import Link from "next/link";
import { WeavePattern } from "@/components/brand/WeavePattern";

const PILLARS = [
  { n: "01", t: "Persian Craft", href: "/story", b: "Persian craft philosophy holds that doing something with complete precision is itself a form of art. Every stitch, every seam, every fit decision at Arya is held to that standard. No shortcuts. No compromises. Built to outlast trends by decades." },
  { n: "02", t: "Skin Conscious", href: "/skin-conscious", b: "Every Arya fabric is chosen with your health in mind. No harmful dyes. No toxic synthetics against your body. Materials that feel as good as they perform. Because luxury should never come at the cost of your wellbeing." },
  { n: "03", t: "Active Community", href: "/collection", b: "For everyone who lives fully and moves often. Not one sport. Not one body type. Not one image. Clothing that crosses every terrain, every ritual, every version of you." },
  { n: "04", t: "Giving Back", href: "/arya-standard", b: "A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities, starting with Iran and growing wherever the need exists. Sport gave our founder his confidence and his mental strength. We believe every child deserves that same opportunity." },
];

export function MissionSection() {
  return (
    <section className="craft fade-section" id="mission">
      <WeavePattern id="craft-p" opacity={0.04} color="#C9A96E" />
      <div className="craft-inner">
        <div className="label">Mission</div>
        <h2 className="craft-h">Built with purpose.<br /><em>Rooted in nobility.</em></h2>
        <p className="craft-body">Arya was built on a simple belief: that what you put on your body matters as much as what you put in it. Every decision we make, from the fabrics we choose to the communities we invest in, is held to the same standard that has guided Persian craft for thousands of years. Precision as a form of respect. For the wearer. For the maker. For the world we all share.</p>
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
