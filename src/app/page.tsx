import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { StandardCertificate } from "@/components/StandardCertificate";
import { productsFor } from "@/lib/products";

export default function Home() {
  return (
    <>
      <section className="first">
        <div className="wrap split">
          <div className="stack" style={{ gap: 30 }}>
            <h1 className="h-hero">
              <span className="kicker">Premium non-toxic activewear &middot; Designed in California</span>
              You were never the problem. The clothes were.
            </h1>
            <hr className="rule" />
            <p className="lede">
              Activewear made to a written standard for fit and for what touches your skin. Someone already did the checking, so
              you can stop.
            </p>
            <div className="actions">
              <a className="btn solid" href="#join">Join the founding list</a>
              <Link className="btn" href="/arya-standard">The Arya Standard</Link>
            </div>
          </div>
          <figure className="window">
            <div className="hero-arch">
              <Image src="/images/drape.jpg" alt="Bronze and sand fabric draped through a limestone arch" fill priority sizes="(max-width: 900px) 92vw, 520px" style={{ objectFit: "cover", objectPosition: "60% 50%" }} />
            </div>
            <figcaption className="caps soft">
              <span>Arriving 2027</span>
              <span>Noble by nature</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="dark">
        <div className="wrap stack" style={{ gap: 52 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 760 }}>
            <p className="caps label">Why we started</p>
            <h2 className="h-1">Premium activewear got expensive without getting better.</h2>
          </div>
          <div className="trio">
            <div><p className="caps">At full depth</p><p className="t">Goes sheer in a squat.</p></div>
            <div><p className="caps">By the second hour</p><p className="t">Rolls at the waist.</p></div>
            <div><p className="caps">By month four</p><p className="t">Pills where it rubs.</p></div>
          </div>
          <p className="body">Every ARYA fabric is tested against all three before it is approved.</p>
        </div>
      </section>

      <section>
        <div className="wrap split top">
          <div className="stack">
            <p className="caps bronze">The Arya Standard</p>
            <h2 className="h-1">The checking, done once and written down.</h2>
            <p className="body">
              A fabric ships only if it meets every line. If it misses one, we don&apos;t argue with the result. We tried a natural
              fiber first. It lost its compression and went sheer. We didn&apos;t ship it.
            </p>
            <Link className="link" href="/arya-standard">Read the standard</Link>
          </div>
          <StandardCertificate />
        </div>
      </section>

      <section className="plaster">
        <div className="wrap">
          <div className="grid-head">
            <h2 className="h-1">Women</h2>
            <Link className="link" href="/women">View all</Link>
          </div>
          <ProductGrid products={productsFor("Women")} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="grid-head">
            <h2 className="h-1">Men</h2>
            <Link className="link" href="/men">View all</Link>
          </div>
          <ProductGrid products={productsFor("Men")} />
        </div>
      </section>
    </>
  );
}
