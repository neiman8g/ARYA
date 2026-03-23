import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "FAQ | Arya | Sustainable Athleisure Questions Answered",
  description:
    "Everything you need to know about Arya sizing, NobleFlex fabric, care instructions, shipping, and pre-order. Premium sustainable athleisure engineered for the body that moves.",
};

const FAQ_SECTIONS = [
  {
    heading: "Sizing and Fit",
    items: [
      {
        q: "How does Arya sizing run?",
        a: "Arya is engineered for the athletic body. Our patterns are built from scratch with extended thigh room, shoulder room, and waistbands that hold. If you are between sizes we recommend sizing up for the legging and down for the tee. Our full size range runs XS to 3XL for women and S to 3XL for men.",
      },
      {
        q: "I have muscular thighs. Will the Noble Legging fit me?",
        a: "Yes. That is exactly who the Noble Legging is designed for. Standard leggings assume a narrow thigh profile. The Noble Legging is patterned with extended thigh and hip room so it fits the body that actually trains without pulling, bunching, or restricting movement.",
      },
      {
        q: "What if my size is not listed?",
        a: "We are launching with XS to 3XL for women and S to 3XL for men. If you need a size outside that range join the waitlist and tell us. We are listening and will expand sizing based on demand.",
      },
      {
        q: "Do you have a size guide?",
        a: "Our detailed size guide with measurements will be available at launch. Join the waitlist to be notified when it goes live.",
      },
    ],
  },
  {
    heading: "Fabric and Materials",
    items: [
      {
        q: "What is NobleFlex?",
        a: "NobleFlex is Arya's proprietary performance fabric engineered for the body that moves. It delivers four-way stretch, muscle compression, UV protection, and shape retention that holds after every wash. It is skin certified and free from harmful dyes and chemical treatments.",
      },
      {
        q: "What is NobleSoft?",
        a: "NobleSoft is Arya's natural performance blend used in the Noble Tee. Silk-like against the skin from the first wear, naturally odor resistant, and thermoregulating. No petroleum based synthetics touch your skin.",
      },
      {
        q: "What is NobleDry?",
        a: "NobleDry is Arya's performance short fabric used in the Noble Short and Noble Pant. Quick-dry, four-way stretch, and engineered with durability for daily training. No PFAS treatments, no harmful chemical finishes.",
      },
      {
        q: "Are Arya fabrics safe for sensitive skin?",
        a: "Yes. Every Arya fabric is skin certified and free from harmful dyes, PFAS coatings, and toxic synthetics. We chose our materials specifically because what touches your skin all day should be held to the highest standard.",
      },
      {
        q: "Are the fabrics sustainable?",
        a: "Sustainability is built into every fabric decision at Arya. We chose materials that respect both the person wearing them and the environment they live in. Full details on our materials and sustainability commitments are on The Arya Standard page.",
      },
    ],
  },
  {
    heading: "Care and Longevity",
    items: [
      {
        q: "How do I wash my Arya pieces?",
        a: "Machine wash cold with like colors. Gentle cycle. Lay flat or hang to dry. Do not use fabric softener as it can break down the performance properties of NobleFlex. Do not bleach. Do not tumble dry on high heat.",
      },
      {
        q: "How long will my Arya pieces last?",
        a: "We engineer for longevity not trend cycles. NobleFlex retains its shape and compression properties after repeated washing. We do not cut corners on construction. Your Arya pieces are built to outlast fast fashion alternatives by years.",
      },
      {
        q: "Can I wear NobleFlex in the water?",
        a: "NobleFlex has UV protection built in and is designed for movement in all environments. It performs well in light water exposure. For extended swimming we recommend rinsing after exposure to chlorine or salt water.",
      },
    ],
  },
  {
    heading: "Orders and Shipping",
    items: [
      {
        q: "When will Arya ship?",
        a: "Arya launches Fall 2026. Join the waitlist to receive early access before the general public.",
      },
      {
        q: "Can I pre-order now?",
        a: "You can select your size and add to bag now to reserve your spot. Payment will be processed at launch when your order ships.",
      },
      {
        q: "Where do you ship?",
        a: "We will ship across the United States at launch with international shipping to follow. Join the waitlist to be notified about shipping to your region.",
      },
      {
        q: "What is your return policy?",
        a: "We will offer free returns within 30 days of delivery at launch. Full details will be published at launch.",
      },
    ],
  },
  {
    heading: "About Arya",
    items: [
      {
        q: "Who founded Arya?",
        a: "Arya was founded by Nieman Gougerchian and Lucy Sager in Los Angeles. Nieman is Persian-American, a former state wrestler and football player who spent years unable to find clothes that fit his athletic body. Lucy came from Florida to California and discovered Persian culture through Nieman. Together they built what did not exist. Read the full founder story at arya.clothing/founder.",
      },
      {
        q: "What does Arya mean?",
        a: "Arya comes from the ancient Persian word for noble and honorable. It is the etymological root of the word Iran itself. The name reflects our core belief that clothing should be worthy of the person wearing it.",
      },
      {
        q: "How does Arya give back?",
        a: "A portion of every Arya purchase goes toward building schools and athletic centers for children in underserved communities starting with Iran and growing wherever the need exists. Sport gave our founder his confidence and his mental strength. We believe every child deserves that opportunity.",
      },
    ],
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };

  return (
    <div className="section-page">
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      <SectionNav />
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <main className="sp-main faq-main">
        <span className="sp-label">FAQ</span>
        <h1>Frequently asked questions.</h1>

        {FAQ_SECTIONS.map((section) => (
          <section key={section.heading} className="faq-section">
            <h2>{section.heading}</h2>
            <div className="faq-list">
              {section.items.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="faq-contact">
          <h2>Still have questions?</h2>
          <p>We are here. Reach out directly and we will get back to you.</p>
          <a href="mailto:hello@arya.clothing" className="sp-btn">Contact Us</a>
        </section>

        <section className="sp-waitlist-cta">
          <h2>Be first. Be noble.</h2>
          <p>Join the waitlist for early access and founder updates.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
