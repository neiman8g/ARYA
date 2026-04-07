import Link from "next/link";

export function ProblemSection() {
  return (
    <section className="problem fade-section" id="problem">
      <div>
        <div className="label">THREE GAPS. ONE BRAND.</div>
        <h2 className="display" style={{ marginBottom: 30 }}>The clothes never kept up.</h2>
        <p className="body-txt">Most brands built their patterns around one body and called it standard. If you have strong quads, broad shoulders, a chest that moves, you already know. The waistband gaps. The fabric pulls. You leave the changing room feeling like the problem.</p>
        <p className="body-txt">You were never the problem. The clothes were.</p>
        <p className="body-txt">But fit is only one part of what the industry got wrong. The fabrics most brands use are loaded with synthetic polymers, chemical dyes, and PFAS coatings that sit against your skin all day. Nobody talks about this. Nobody fixes it.</p>
        <p className="body-txt">The sustainable options exist. But they sacrifice luxury, fit, and performance to get there.</p>
        <p className="body-txt">Arya was built to close all three gaps at once. Engineered fit for the body that actually moves. <Link href="/sustainability">Skin conscious materials</Link> that respect what they touch. <Link href="/arya-standard">The Arya Standard</Link> refuses to compromise any of it.</p>
        <div className="pullquote">
          <p>&ldquo;The industry told you your body was the problem. It wasn&apos;t. The clothes were.&rdquo;</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="stat-n">65%</div><div className="stat-l">Of athleisure products still made from conventional synthetic materials in 2026</div></div>
        <div className="stat"><div className="stat-n">176B</div><div className="stat-l">Sustainable athleisure market by 2030, doubling in six years</div></div>
        <div className="stat"><div className="stat-n">415B</div><div className="stat-l">Total athleisure market in 2026, premium sustainable is the fastest growing segment</div></div>
        <div className="stat"><div className="stat-n">3</div><div className="stat-l">Gaps Arya closes simultaneously. Fit, skin health, and sustainable luxury.</div></div>
      </div>
    </section>
  );
}
