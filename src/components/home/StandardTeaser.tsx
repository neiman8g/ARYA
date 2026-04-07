import Link from "next/link";

export function StandardTeaser() {
  return (
    <section className="std-teaser fade-section" id="arya-standard">
      <div className="label">THE ARYA STANDARD</div>
      <h2 className="std-teaser-h">There is a standard behind every decision we make.</h2>
      <p className="std-teaser-p">Every fabric. Every seam. Every fit decision. Held to the same standard that has guided Persian craft for thousands of years. We have nothing to hide and everything to share.</p>
      <Link href="/arya-standard" className="std-teaser-btn">Discover the Standard</Link>
    </section>
  );
}
