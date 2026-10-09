import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About ARYA: Nima Gougerchian and Lucy Sager",
  description:
    "ARYA is premium non-toxic activewear founded by Nima Gougerchian and Lucy Sager in Santa Monica, California. Arya is Persian for noble.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="first">
      <div className="wrap stack" style={{ gap: 72 }}>
        <div className="split">
          <div className="stack">
            <h1 className="h-hero">
              <span className="kicker">About ARYA</span>
              Two founders who got tired of checking.
            </h1>
            <p className="body">
              ARYA began with a simple complaint. Premium activewear kept costing more and fitting worse, and nobody could tell you
              what was in it. So we wrote down what good actually means, and we&apos;re making only what meets it.
            </p>
            <p className="body">Arya is Persian for noble. Designed in Santa Monica, California.</p>
          </div>
          <figure className="window">
            <div className="hero-arch" style={{ aspectRatio: "3 / 4" }}>
              <Image src="/images/founders.jpg" alt="ARYA founders Nima Gougerchian and Lucy Sager by the water at sunset" fill sizes="(max-width: 900px) 92vw, 460px" style={{ objectFit: "cover" }} />
            </div>
            <figcaption className="caps soft">
              <span>Nima and Lucy</span>
              <span>Noble by nature</span>
            </figcaption>
          </figure>
        </div>
        <div className="founders">
          <div className="founder">
            <hr className="rule" />
            <p className="caps bronze">Co-founder</p>
            <h2 className="h-2">Nima Gougerchian</h2>
            <p className="body">
              Grew up bigger than the clothes that were supposed to fit him. A state wrestler and football player who spent years
              in gear that pulled at the thigh and billowed everywhere else.
            </p>
          </div>
          <div className="founder">
            <hr className="rule" />
            <p className="caps bronze">Co-founder</p>
            <h2 className="h-2">Lucy Sager</h2>
            <p className="body">
              Came to Southern California from Florida in 2022 and is training as a family therapist. She knows the particular
              frustration of a legging that rides up and a waistband that won&apos;t stay put.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
