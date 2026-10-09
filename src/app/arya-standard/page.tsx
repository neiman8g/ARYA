import type { Metadata } from "next";
import Link from "next/link";
import { StandardCertificate } from "@/components/StandardCertificate";

export const metadata: Metadata = {
  title: "The Arya Standard: What Non-Toxic Means at ARYA",
  description:
    "What makes ARYA non-toxic activewear: every fabric must be OEKO-TEX 100 certified, with no added PFAS and no toxic dyes, and must stay opaque, hold its waistband and keep its shape before it ships.",
  alternates: { canonical: "/arya-standard" },
};

export default function StandardPage() {
  return (
    <>
      <section className="first">
        <div className="wrap split top">
          <div className="stack">
            <h1 className="h-hero">
              <span className="kicker">The Arya Standard</span>
              Done once. Written down.
            </h1>
            <p className="body">
              Most activewear asks you to trust the label. We publish the test instead. Every fabric is held to the same written
              standard for fit and for what touches your skin. A fabric that misses a line doesn&apos;t ship, and no line is softened
              to let one pass.
            </p>
            <p className="body">We tried a natural fiber first. It lost its compression and went sheer at depth. We didn&apos;t ship it.</p>
            <Link className="link" href="/blog/pfas-free-activewear-guide">How to check any activewear brand</Link>
          </div>
          <StandardCertificate />
        </div>
      </section>
      <section className="dark">
        <div className="wrap stack" style={{ gap: 48 }}>
          <h2 className="h-1">How a fabric earns its place</h2>
          <div className="trio">
            <div><p className="caps">First, the certificate</p><p className="t">OEKO-TEX 100, no added PFAS, no toxic dyes.</p></div>
            <div><p className="caps">Then, the fit</p><p className="t">Opaque at full squat, a waistband that holds.</p></div>
            <div><p className="caps">Then, the wear</p><p className="t">Five testers, twenty sessions each.</p></div>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap split top">
          <h2 className="h-1">What non-toxic means here.</h2>
          <div className="stack">
            <p className="body">
              When we call ARYA non-toxic activewear, we mean three checkable things: the fabric carries an OEKO-TEX STANDARD 100
              certificate, nothing in it was treated with added PFAS, and the dyes are covered by that certificate.
            </p>
            <p className="body">
              We publish the certificate number, the mill and the full fiber content on every product page once the fabric is
              locked, so you can verify it yourself rather than take our word for it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
