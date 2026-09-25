import Link from "next/link";

export function ProblemSection() {
  return (
    <section className="problem fade-section" id="problem">
      <div>
        <div className="label">Fit</div>
        <h2 className="display" style={{ marginBottom: 30 }}>The clothes never kept up.</h2>
        <p className="body-txt">Most brands built their patterns around one body and called it standard. The waistband gaps. The fabric pulls. You leave the changing room feeling like the problem.</p>
        <p className="body-txt">You were never the problem. The clothes were.</p>
        <p className="body-txt">The sustainable options exist. But they sacrifice luxury, fit, and performance to get there.</p>
        <p className="body-txt"><Link href="/sustainability">Skin conscious materials</Link> that respect what they touch. <Link href="/arya-standard">The Arya Standard</Link> is how we decide.</p>
        <div className="pullquote">
          <p>&ldquo;The industry told you your body was the problem. It wasn&apos;t. The clothes were.&rdquo;</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="stat-n">176B</div><div className="stat-l">Sustainable athleisure market by 2030, doubling in six years</div></div>
        <div className="stat"><div className="stat-n">415B</div><div className="stat-l">Total athleisure market in 2026, premium sustainable is the fastest growing segment</div></div>
      </div>
    </section>
  );
}
