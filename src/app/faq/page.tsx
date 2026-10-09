import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ: Non-Toxic Activewear, Sizing and Launch",
  description:
    "Answers about ARYA non-toxic activewear: what the standard requires, when you can buy, sizing for women and men, pricing and how to reach us.",
  alternates: { canonical: "/faq" },
};

const FAQ = [
  {
    q: "What makes ARYA non-toxic activewear?",
    a: "Every fabric must carry an OEKO-TEX STANDARD 100 certificate, have no added PFAS and no toxic dyes. We publish the certificate number, the mill and the full fiber content on each product page once the fabric is locked, so you can check it yourself.",
  },
  {
    q: "When can I buy?",
    a: "In 2027. We'll announce the date once the fabric has passed the standard and production is booked, and not before. The founding list hears first.",
  },
  {
    q: "What is the fabric?",
    a: "It's in final testing. Until it passes every line of the Arya Standard, we'd rather say nothing than guess.",
  },
  {
    q: "What else does the standard require?",
    a: "Fit tests, not just lab tests. The fabric must stay opaque at full squat depth, the waistband must hold without rolling, and the garment must keep its shape through twenty wears.",
  },
  {
    q: "How does sizing work?",
    a: "Women's sizes run XS to 3XL and men's run S to 3XL. Each line is patterned from scratch rather than graded from a single sample body. A full size guide with measurements comes with launch.",
  },
  {
    q: "What if my size isn't listed?",
    a: "Join the founding list and tell us. We'll expand sizing based on what people ask for.",
  },
  {
    q: "Will prices change?",
    a: "No recurring sales. The price you see is the price, every season.",
  },
  {
    q: "How do I reach you?",
    a: "Write to hello@arya.clothing. A founder reads every message.",
  },
];

export default function FaqPage() {
  return (
    <section className="first">
      <div className="wrap stack" style={{ gap: 44 }}>
        <h1 className="h-hero">
          <span className="kicker">Questions</span>
          Before you ask.
        </h1>
        <div className="faq">
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </section>
  );
}
