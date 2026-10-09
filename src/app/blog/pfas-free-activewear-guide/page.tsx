import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const TITLE = "Non-toxic activewear: what to check before you buy";
const DESCRIPTION =
  "A plain checklist for choosing non-toxic activewear: certificates you can verify, PFAS finishes, dyes, fiber content, and the fit details that matter just as much.";

export const metadata: Metadata = {
  title: "Non-Toxic Activewear: What to Check Before You Buy",
  description: DESCRIPTION,
  alternates: { canonical: "/blog/pfas-free-activewear-guide" },
  openGraph: { type: "article", title: TITLE, description: DESCRIPTION },
};

export default function GuidePage() {
  return (
    <section className="first">
      <article className="wrap">
        <div className="article">
          <p className="caps bronze">Journal &middot; October 2026</p>
          <h1 className="h-1">{TITLE}</h1>
          <p className="lede">
            You shouldn&apos;t need a chemistry degree to buy a pair of leggings. Here are five things to look for on any brand&apos;s
            site. It takes about two minutes, and if a brand makes it hard to find these answers, that tells you something too.
          </p>

          <h2>1. A certificate you can look up yourself</h2>
          <p>
            &ldquo;Clean&rdquo; and &ldquo;non-toxic&rdquo; are words anyone can use. A certificate is different. The most common one
            for clothing is <strong>OEKO-TEX STANDARD 100</strong>, which means the finished fabric was tested by an independent lab for
            a long list of restricted substances.
          </p>
          <p>
            A real certificate has a number. You can type that number into the label check on OEKO-TEX&apos;s own website and see who
            holds it and what it covers. If a brand mentions OEKO-TEX but never shows a number, ask for it.
          </p>

          <h2>2. Whether PFAS were added</h2>
          <p>
            PFAS are a family of chemicals used to make fabric repel water, sweat or stains. In activewear they usually show up as a
            finish, so the useful question is simple: <strong>were any PFAS added?</strong> A brand that knows its supply chain can
            answer that in one line.
          </p>

          <h2>3. What the dyes are covered by</h2>
          <p>
            Color is part of the fabric too. Check that the certificate covers the dyed, finished fabric, not just the raw yarn. If
            a dark color bleeds heavily in the first wash, that&apos;s worth a second look.
          </p>

          <h2>4. The full fiber content</h2>
          <p>
            Every percentage, on the product page, before you buy. Vague phrases like &ldquo;a proprietary blend&rdquo; or &ldquo;our
            signature fabric&rdquo; with no breakdown make it impossible to compare one brand with another.
          </p>

          <h2>5. Then, the things you&apos;ll notice every day</h2>
          <p>A fabric can pass every lab test and still let you down. Before you commit to any legging, check:</p>
          <ul>
            <li><strong>Opacity.</strong> Squat in front of a mirror in good light.</li>
            <li><strong>The waistband.</strong> Does it hold without rolling or digging after an hour?</li>
            <li><strong>Pilling.</strong> Reviews mentioning month three or four tell you more than launch photos.</li>
          </ul>

          <h2>How ARYA answers these</h2>
          <p>
            We wrote our answers down before we made anything. Every ARYA fabric must be OEKO-TEX 100 certified, with no added PFAS
            and no toxic dyes, and it must stay opaque at full depth, hold its waistband and keep its shape through twenty wears.
            When the fabric is locked, we publish the certificate number, the mill and the full fiber content on every product page.
          </p>
          <p>
            <Link href="/arya-standard">Read the Arya Standard</Link> or <Link href="/women">see the collection</Link>.
          </p>
        </div>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          datePublished: "2026-10-09",
          author: { "@type": "Organization", name: "ARYA" },
          publisher: { "@type": "Organization", name: "ARYA", logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/arya-icon.png` } },
          mainEntityOfPage: `${SITE_URL}/blog/pfas-free-activewear-guide`,
        }}
      />
    </section>
  );
}
