import Image from "next/image";
import Link from "next/link";
import { WeavePattern } from "@/components/brand/WeavePattern";
import { AryaMark } from "@/components/AryaLogo";

export function StorySection() {
  return (
    <section className="ethos fade-section" id="ethos">
      <div>
        <div className="ethos-card">
          <Image
            src="/arya-story.jpg"
            alt="Arya brand — Persian craft meets California athleisure"
            className="ethos-card-img"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <WeavePattern id="ethos-p" opacity={0.12} color="#8B6A3E" />
          <div className="ethos-card-content">
            <AryaMark size={96} color="#8B6A3E" />
            <div className="ethos-card-label">A &nbsp; R &nbsp; Y &nbsp; A</div>
            <div className="ethos-card-meaning">Noble · Honorable · Pure</div>
          </div>
          <div className="ethos-corner" />
        </div>
      </div>
      <div>
        <div className="label">Our Story</div>
        <h2 className="display" style={{ marginBottom: 30 }}>Where the Pacific Coast<br />meets <em>Persian craft.</em></h2>
        <p className="body-txt">Arya was born between two worlds: the salt air of Southern California and the ancient textile traditions of Persia. One shaped by movement, the other by centuries of craft.</p>
        <p className="body-txt">The name Arya comes from the ancient Persian word for noble and honorable, the very root of the name Iran itself. It reflects a simple belief: the way you move through the world should be matched by what you wear.</p>
        <p className="body-txt">At Arya, we build garments with care. Materials chosen with intention. <Link href="/fit-guide">Fit</Link> refined through movement. <Link href="/sustainability">Craft</Link> without shortcuts. From <Link href="/arya-standard">NobleFlex</Link> to the final seam, every detail is intentional.</p>
        <div className="ethos-divider" />
        <div className="values">
          <div className="val"><div className="val-b">Built with intention.</div></div>
          <div className="val"><div className="val-b">Made to move with you.</div></div>
          <div className="val"><div className="val-b">Rooted in something real.</div></div>
        </div>
      </div>
    </section>
  );
}
