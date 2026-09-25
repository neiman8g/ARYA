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
            alt="Arya"
            className="ethos-card-img"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <WeavePattern id="ethos-p" opacity={0.12} color="#8B6A3E" />
          <div className="ethos-card-content">
            <AryaMark size={96} color="#8B6A3E" />
            <div className="ethos-card-label">A &nbsp; R &nbsp; Y &nbsp; A</div>
          </div>
          <div className="ethos-corner" />
        </div>
      </div>
      <div>
        <div className="label">Our Story</div>
        <h2 className="display" style={{ marginBottom: 30 }}>Designed in California. Made in Spain.</h2>
        <p className="body-txt">At Arya, we build garments with care. Materials chosen with intention. <Link href="/fit-guide">Fit</Link> refined through wear. <Link href="/sustainability">Craft</Link> without shortcuts. From <Link href="/arya-standard">NobleFlex</Link> to the final seam, every detail is intentional.</p>
        <div className="ethos-divider" />
        <div className="values">
          <div className="val"><div className="val-b">Built with intention.</div></div>
          <div className="val"><div className="val-b">Rooted in something real.</div></div>
        </div>
      </div>
    </section>
  );
}
