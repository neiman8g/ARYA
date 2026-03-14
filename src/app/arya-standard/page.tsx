import Link from "next/link";
import { SectionNav } from "@/components/SectionNav";
import "./arya-standard.css";

export const metadata = {
  title: "The Arya Standard | Skin Conscious Sustainable Luxury Athleisure",
  description: "The Arya Standard explains every fabric decision, what we refuse to use, and why skin health is a luxury pillar. NobleFlex, NobleSoft, NobleDry and the harmful alternatives they replace.",
  keywords: "skin conscious activewear, sustainable luxury athleisure fabrics, NobleFlex fabric, NobleSoft fabric, NobleDry fabric, no PFAS activewear, no harmful dyes sportswear, eco friendly performance fabric, safe activewear materials",
  openGraph: {
    title: "The Arya Standard | Skin Conscious Sustainable Luxury Athleisure",
    description: "The Arya Standard explains every fabric decision, what we refuse to use, and why skin health is a luxury pillar. NobleFlex, NobleSoft, NobleDry and the harmful alternatives they replace.",
    images: ["/arya-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Arya Standard | Skin Conscious Sustainable Luxury Athleisure",
    description: "The Arya Standard explains every fabric decision, what we refuse to use, and why skin health is a luxury pillar. NobleFlex, NobleSoft, NobleDry and the harmful alternatives they replace.",
    images: ["/arya-hero.jpg"],
  },
};

const BLENDS = [
  {
    name: "NobleFlex",
    feel: "Four-way stretch that moves like a second skin.",
    description:
      "NobleFlex is Arya's proprietary performance fabric engineered for the body that moves. Designed for the Noble Legging and Noble Sports Bra, it delivers four-way stretch in every direction, muscle compression that supports without restricting, UV protection built into every fiber, and shape retention that holds after every wash.",
    replacedHeading: "What most brands use instead",
    replacedBody:
      "Conventional synthetic performance fabrics are made from virgin petroleum-based polymers. They trap heat, cause skin irritation, degrade into microplastics with every wash, and are treated with chemical finishes that sit against your skin all day. NobleFlex was engineered to replace all of that.",
    skin: "Skin certified. Free from harmful dyes and chemical treatments.",
  },
  {
    name: "NobleSoft",
    feel: "Silk-like from the first wear. Natural from the last fiber.",
    description:
      "NobleSoft is Arya's natural performance blend, used in the Noble Tee. Silk-like against your skin from the moment you put it on. Naturally odor resistant so it stays fresh through every hour of your day. Thermoregulating so it works with your body temperature rather than against it. No petroleum-based synthetics touching your skin. Ever.",
    replacedHeading: "What most brands use instead",
    replacedBody:
      "Most performance tees are made from polyester, a plastic fabric derived from petroleum. Polyester traps odor, causes skin irritation in many wearers, and never biodegrades. It is one of the largest sources of microplastic pollution in our oceans. NobleSoft contains no polyester and no petroleum-based synthetics against your skin.",
    skin: "No synthetics against your skin. Naturally breathable and thermoregulating.",
  },
  {
    name: "NobleDry",
    feel: "Engineered for real movement. Built to outlast it.",
    description:
      "NobleDry is Arya's performance short fabric, used in the Noble Short. Quick-dry, four-way stretch, and engineered with durability that holds up to daily training. Lightweight enough for a run, structured enough for the table. No harsh chemical treatments. No performance compromises.",
    replacedHeading: "What most brands use instead",
    replacedBody:
      "Standard performance shorts are built from virgin synthetic fabrics treated with chemical finishes like DWR coatings that contain PFAS, also known as forever chemicals. These chemicals never break down in the environment and have been linked to hormone disruption and other health concerns. NobleDry uses no PFAS treatments and no harmful chemical finishes.",
    skin: "No PFAS. No forever chemicals. No compromises.",
  },
];

const REFUSALS = [
  {
    name: "Virgin polyester",
    reason:
      "A petroleum-based plastic that traps heat, causes skin irritation, and sheds microplastics into waterways with every wash.",
  },
  {
    name: "PFAS coatings",
    reason:
      "Forever chemicals used in water repellent treatments that never break down in the environment and have been linked to serious health concerns.",
  },
  {
    name: "Harmful dyes",
    reason:
      "Conventional synthetic dyes contain heavy metals and toxic chemicals that sit against your skin and wash into water systems.",
  },
  {
    name: "Formaldehyde treatments",
    reason:
      "Used in wrinkle-resistant finishes, formaldehyde is a known carcinogen that has no place in fabric that touches your body.",
  },
  {
    name: "Virgin nylon from petroleum",
    reason:
      "Conventional nylon production is one of the most chemical-intensive processes in the textile industry.",
  },
  {
    name: "Chlorine bleach",
    reason:
      "Used in fabric whitening, chlorine bleach creates toxic byproducts that harm both the wearer and the environment.",
  },
];

const STATS = [
  {
    num: "1 in 3",
    label:
      "Children in underserved communities lack access to safe athletic facilities",
  },
  {
    num: "Every purchase",
    label: "A portion of every Arya sale goes directly to this mission",
  },
  {
    num: "Starting now",
    label: "Building schools and athletic centers beginning with Iran",
  },
];

export default function AryaStandardPage() {
  return (
    <div className="section-page std-page">
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <SectionNav activeLink="arya-standard" />

      <main className="sp-main">
        {/* Section 1: Hero */}
        <section className="std-hero">
          <span className="std-eyebrow">THE ARYA STANDARD</span>
          <h1>Noble materials. Noble purpose.</h1>
          <p className="std-subhead">
            At Arya, what goes into our clothes matters as much as how they fit.
            Every fabric decision is held to the same standard that has guided
            Persian craft for thousands of years. Precision as a form of respect.
            For your skin. For your body. For the world we all share.
          </p>
        </section>

        {/* Section 2: The Noble Blends */}
        <section className="std-section">
          <h2 className="std-section-heading">Our proprietary blends.</h2>
          <p className="std-section-intro">
            Every Arya fabric is developed to a single standard. Skin conscious,
            performance engineered, and built to outlast the alternatives.
          </p>
          <div className="std-blends">
            {BLENDS.map((b) => (
              <article key={b.name} className="std-blend-card">
                <h3 className="std-blend-name">{b.name}</h3>
                <p className="std-blend-feel">{b.feel}</p>
                <p className="std-blend-desc">{b.description}</p>
                <h4 className="std-blend-replaced-heading">
                  {b.replacedHeading}
                </h4>
                <p className="std-blend-replaced-body">{b.replacedBody}</p>
                <p className="std-blend-skin">{b.skin}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Section 3: What we refuse */}
        <section className="std-section">
          <h2 className="std-section-heading">What we will never use.</h2>
          <p className="std-section-intro">
            Every fabric decision starts with a refusal list. These are the
            materials and chemicals Arya has eliminated and why.
          </p>
          <div className="std-refusal-grid">
            {REFUSALS.map((r) => (
              <div key={r.name} className="std-refusal-card">
                <div className="std-refusal-name">{r.name}</div>
                <p className="std-refusal-reason">{r.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Skin health philosophy */}
        <section className="std-section std-skin-body">
          <h2 className="std-section-heading">
            Your skin is not an afterthought.
          </h2>
          <div>
            <p>
              Your skin is your largest organ. It absorbs what it touches. Every
              hour you spend in activewear is an hour your skin is in contact
              with whatever that fabric is made from and treated with.
            </p>
            <p>
              Most brands never think about this. They engineer for performance
              metrics and price points. The question of what sits against your
              skin all day is an afterthought at best.
            </p>
            <p>
              At Arya it is the first question. Before fit. Before performance.
              Before price. What is this fabric doing to the person wearing it?
            </p>
            <p>
              We believe skin conscious is the new luxury standard. Not as a
              marketing claim. As a design requirement. Every Arya fabric is
              chosen because it is the best option for the body wearing it,
              inside and out.
            </p>
          </div>
        </section>

        {/* Section 5: Giving back */}
        <section className="std-section">
          <h2 className="std-section-heading">
            Noble by nature means giving back by nature.
          </h2>
          <div className="std-giving-body">
            <p>
              Arya was built on the belief that sport builds character,
              confidence, and community. Our founder Nima knows this firsthand.
              At his lowest points, athletics gave him his mental strength and
              his sense of self. Lucy, who is studying to become a family
              therapist, sees every day how confidence built through movement
              changes lives.
            </p>
            <p>We want every child to have that opportunity.</p>
            <p>
              A portion of every Arya purchase goes toward building schools and
              athletic centers for children in underserved communities. We are
              starting with Iran, the ancient land at the root of this brand,
              and growing wherever the need exists.
            </p>
            <p>
              Because the body that moves is not just a physical thing. It is a
              confident thing. A hopeful thing. A noble thing.
            </p>
          </div>
          <div className="std-stats">
            {STATS.map((s) => (
              <div key={s.num} className="std-stat">
                <div className="std-stat-num">{s.num}</div>
                <p className="std-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Bottom CTA */}
        <section className="std-cta">
          <h2>Wear what you believe in.</h2>
          <p className="std-cta-sub">
            Every Arya purchase is a vote for a better standard. For your skin,
            for your body, and for the next generation.
          </p>
          <div className="std-cta-btns">
            <Link href="/collection" className="std-cta-btn-primary">
              View Collection
            </Link>
            <Link href="/#waitlist" className="std-cta-btn-secondary">
              Join Waitlist
            </Link>
          </div>
        </section>
      </main>

      <footer className="sp-foot">
        <Link href="/">Arya</Link>
        <div>
          <Link href="/story">Story</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/founder">Founders</Link>
          <Link href="/arya-standard">The Standard</Link>
          <Link href="/#waitlist">Waitlist</Link>
        </div>
        <p>© 2026 Arya · Noble by nature.</p>
      </footer>
    </div>
  );
}
