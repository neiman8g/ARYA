import Link from "next/link";

export const metadata = {
  title: "Mission | Arya",
  description: "Built with purpose. Rooted in nobility. Arya is a brand with a conscience.",
};

export default function MissionPage() {
  return (
    <div className="section-page mission">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav className="sp-nav">
        <Link href="/" className="sp-logo">ARYA</Link>
        <div className="sp-links">
          <Link href="/story">Story</Link>
          <Link href="/mission" className="active">Mission</Link>
          <Link href="/fit">Fit</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founder</Link>
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist" className="sp-cta">Join Waitlist</Link>
        </div>
      </nav>

      <main className="sp-main mission-main">
        <span className="sp-label">Mission</span>
        <h1>Built with purpose.<br />Rooted in nobility.</h1>
        <p>Arya was built on a simple belief: that what you put on your body matters as much as what you put in it. We are a brand with a conscience. Every decision we make, from the fabrics we choose to the communities we invest in, is held to the same standard that has guided Persian craft for thousands of years. Precision as a form of respect. For the wearer. For the maker. For the world we all share.</p>
        <p>Arya believes that sport builds character, confidence, and community. We experienced it ourselves. We want every child to experience it too. A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities, starting with Iran and growing wherever the need exists. Because the body that moves is not just a physical thing. It is a confident thing. A hopeful thing. A noble thing.</p>
        <div className="mission-pillars">
          {[
            { n: "01", t: "Persian Craft", b: "Persian craft philosophy holds that doing something with complete precision is itself a form of art. Every stitch, every seam, every fit decision at Arya is held to that standard. No shortcuts. No compromises. Built to outlast trends by decades." },
            { n: "02", t: "Skin Conscious", b: "Every Arya fabric is chosen with your health in mind. No harmful dyes. No toxic synthetics against your body. OEKO-TEX certified materials that feel as good as they perform. Because luxury should never come at the cost of your wellbeing. What touches your skin should be as intentional as everything else you choose." },
            { n: "03", t: "Active Community", b: "Arya is for everyone who lives fully and moves often. Not one sport. Not one body type. Not one image. We believe people are too complex and too multidimensional for brands that speak to only one version of an active life. Clothing that crosses every terrain, every ritual, every version of you." },
            { n: "04", t: "Giving Back", b: "A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities, starting with Iran and growing wherever the need exists. Sport gave our founder his confidence and his mental strength. We believe every child deserves that same opportunity. Noble by nature means giving back by nature." },
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

      <footer className="sp-foot mission-foot">
        <Link href="/">Arya</Link>
        <div>
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founder</Link>
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist">Waitlist</Link>
        </div>
        <p>© 2026 Arya · Noble by nature.</p>
      </footer>
    </div>
  );
}
