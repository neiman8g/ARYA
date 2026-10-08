import Link from "next/link";
import Script from "next/script";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "FAQ | Arya | Sustainable Athleisure Questions Answered",
  description:
    "Sizing, fabrics, care, shipping, and launch. Designed in California. Launching 2027.",
};

const FAQ_SECTIONS = [
  {
    heading: "Sizing and Fit",
    items: [
      {
        q: "How does Arya sizing run?",
        a: "Patterns are built from scratch with extended thigh room and waistbands that hold. If you are between sizes, size up for the legging and down for the tee. Women's sizes run XS to 3XL. Men's sizes run S to 3XL.",
      },
      {
        q: "Will the Noble Legging fit if I need more thigh room?",
        a: "The Noble Legging is patterned with extended thigh and hip room so it does not pull or bunch.",
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
        a: "NobleFlex is Arya's performance fabric. Four-way stretch, muscle compression, UV protection, and shape retention after washing.",
      },
      {
        q: "What is NobleSoft?",
        a: "NobleSoft is the blend used in the Noble Tee. Silk-like from the first wear, odor resistant, and thermoregulating.",
      },
      {
        q: "What is NobleDry?",
        a: "NobleDry is the fabric used in the Noble Short and Noble Pant. Quick-dry and four-way stretch.",
      },
      {
        q: "Are Arya fabrics safe for sensitive skin?",
        a: "Fabric notes are on the Arya Standard page.",
      },
      {
        q: "What is the Arya Standard?",
        a: "Every fabric we approve must be OEKO-TEX 100 certified, free of added PFAS and free of toxic dyes, and must pass our own tests for opacity, compression, recovery and pilling. The full standard is on The Arya Standard page.",
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
        a: "Launching 2027. Join the waitlist for early access.",
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
        a: "Arya was founded by Nieman Gougerchian and Lucy Sager in Los Angeles. Designed in California. The founder page is at arya.clothing/founder.",
      },
      {
        q: "What does Arya mean?",
        a: "Arya is Persian for noble.",
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
          <h2>Join the waitlist.</h2>
          <p>Join the waitlist for early access and founder updates.</p>
          <Link href="/#waitlist" className="sp-btn">Join Waitlist</Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
