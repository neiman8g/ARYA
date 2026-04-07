"use client";

import { useState } from "react";
import Image from "next/image";
import { WeavePattern } from "@/components/brand/WeavePattern";
import { AryaMark } from "@/components/AryaLogo";

const WOMEN_SPECS = [
  { t: "Thighs", b: "Extended room. No pulling at any depth." },
  { t: "Hips", b: "Built for the hips that move. No squeezing, no gapping." },
  { t: "Waistband", b: "High-rise hold without digging or rolling." },
  { t: "Inseam", b: "True to movement, wherever your day takes you." },
];
const MEN_SPECS = [
  { t: "Thighs", b: "Extended circumference. No restriction through your full range." },
  { t: "Shoulders", b: "Wider yoke, sits at the true shoulder point." },
  { t: "Waist", b: "Tapered without restriction." },
  { t: "Chest", b: "Room to breathe. Structured, not boxy." },
];

export function FitSection() {
  const [fitTab, setFitTab] = useState<"women" | "men">("women");
  const specs = fitTab === "women" ? WOMEN_SPECS : MEN_SPECS;

  return (
    <section className="fit fade-section" id="fit">
      <div className="label">Fit Philosophy</div>
      <div className="fit-grid">
        <div>
          <h2 className="display" style={{ marginBottom: 28 }}>Every pattern starts with<br />the body that <em>moves.</em></h2>
          <p className="body-txt">Standard sizing was built for a standard body. Arya&apos;s patterns start from scratch, with real bodies and real movement in mind, and the belief that a body that surfs, moves, rides, and lives fully deserves fabric that keeps up.</p>
          <p className="body-txt" style={{ marginBottom: 32 }}>Our Women&apos;s and Men&apos;s cuts share the same philosophy: engineered separately for each form, so everyone gets the same standard of fit.</p>
          <div className="fit-tabs">
            <button type="button" className={`fit-tab ${fitTab === "women" ? "active" : ""}`} onClick={() => setFitTab("women")}>Women&apos;s</button>
            <button type="button" className={`fit-tab ${fitTab === "men" ? "active" : ""}`} onClick={() => setFitTab("men")}>Men&apos;s</button>
          </div>
          <div className="fit-specs">
            {specs.map((s, i) => (
              <div key={i} className="fspec"><div className="fspec-t">{s.t}</div><div className="fspec-b">{s.b}</div></div>
            ))}
          </div>
        </div>
        <div className="fit-visual">
          <div className="fit-main">
            <Image
              src="/arya-fit.jpg"
              alt="Athletic fit activewear engineered for strong quads and broad shoulders"
              className="fit-section-img"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <WeavePattern id="fit-p" opacity={0.06} color="#8B6A3E" />
            <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AryaMark size={80} color="#8B6A3E" />
            </div>
          </div>
          <div className="fit-stats-row">
            <div className="fit-mini"><div className="mini-n">4-way</div><div className="mini-l">Stretch in all directions</div></div>
            <div className="fit-mini"><div className="mini-n">XS–3XL</div><div className="mini-l">Women&apos;s inclusive sizing</div></div>
            <div className="fit-mini"><div className="mini-n">S–3XL</div><div className="mini-l">Men&apos;s inclusive sizing</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
