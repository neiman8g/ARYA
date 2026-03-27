import Image from "next/image";
import Link from "next/link";
import "./founders-section.css";

type FoundersSectionProps = {
  /** Homepage omits the bottom CTAs; /founder keeps them. */
  showCtas?: boolean;
};

export function FoundersSection({ showCtas = true }: FoundersSectionProps) {
  return (
    <section className="founders-section fade-section" id="founder">
      <div className="founders-s1">
        <div className="founders-s1-inner">
          <span className="founders-s1-eyebrow">THE FOUNDERS</span>
          <h2 className="hero-h1">
            We built what didn&apos;t
            <br />
            <em>exist.</em>
          </h2>
          <p className="body-txt">
            Arya was born between two people, two worlds, and one shared belief: that clothing
            should make you feel like yourself.
          </p>
          <p className="body-txt">
            They share a belief that people are too complex for brands that speak to only one
            sport, one body, one image. Clothing does not have to choose between performance and
            beauty. Between function and intention.
          </p>
          <p className="body-txt">
            And they believe building something real means giving something back. A portion of
            every Arya purchase goes toward building schools and athletic centers for children in
            underserved communities because the culture that shaped this brand deserves to see what
            its next generation can become.
          </p>
          <p className="body-txt">
            Together they built Arya. A meeting point between two worlds. The California coast that
            inspires the lifestyle, and the ancient Persian heritage that shaped the craft.
          </p>
        </div>
      </div>

      <hr className="founders-rule" aria-hidden="true" />

      <div className="founders-split founders-nima">
        <div className="founders-split-photo">
          <Image
            src="/arya-founder.png"
            alt="Nima and Lucy — founders of Arya premium athleisure Los Angeles"
            className="founders-img"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="founders-split-copy">
          <span className="founders-name-label">NIMA GOUGERCHIAN</span>
          <p className="founders-role">Co-Founder</p>
          <p className="body-txt">
            Nima grew up bigger than the clothes that were supposed to fit him. A state wrestler and
            football player, he lived in his body in a way most brands never accounted for. Joggers
            that fit his waist turned into skinny jeans at the thigh. Shirts that fit his shoulders
            billowed everywhere else. He would go for a run and come back with chafing. The
            fabrics were not right either. Synthetic polymers that did not breathe, did not last,
            and did not respect the body wearing them.
          </p>
          <p className="body-txt">
            But it was more than fit. Sport gave him his confidence. At his lowest points, athletics
            gave him his mental strength and his sense of self. He knows what it means when your
            body and your clothes finally work together. That feeling is what Arya is built to give
            everyone.
          </p>
        </div>
      </div>

      <hr className="founders-rule" aria-hidden="true" />

      <div className="founders-split founders-lucy">
        <div className="founders-split-copy">
          <span className="founders-name-label">LUCY SAGER</span>
          <p className="founders-role">Co-Founder</p>
          <p className="body-txt">
            Lucy came to Southern California from Florida in 2022 and found a life built around
            movement, wellness, and intention. Her first Persian New Year with Nima&apos;s family
            changed something in her. She was taught about the Haft Seen, each element on the table
            carrying a meaning, a wish, an intention. A culture that treated everything it touched
            as worth doing beautifully.
          </p>
          <p className="body-txt">
            Studying to become a family therapist, Lucy&apos;s life work is helping people overcome
            anxiety and rebuild their self worth. She knows the specific discomfort of women&apos;s
            activewear that rides up, pulls, and makes you self-conscious mid-movement when you
            should feel free. That problem is personal to her. Fixing it is personal to Arya.
          </p>
        </div>
        <div className="founders-split-photo">
          <Image
            src="/lucy-founder.jpg"
            alt="Lucy Sager, Co-Founder of Arya, Los Angeles"
            className="founders-img"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {showCtas ? (
        <div className="founders-ctas">
          <div className="sp-btn-group">
            <Link href="/collection" className="sp-btn">
              View Collection
            </Link>
            <Link href="/#waitlist" className="btn-waitlist">
              Join Waitlist
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
