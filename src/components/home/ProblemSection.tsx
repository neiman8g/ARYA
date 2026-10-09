import Link from "next/link";

export function ProblemSection() {
  return (
    <section className="problem fade-section" id="problem">
      <div>
        <div className="label">Fit</div>
        <h2 className="display" style={{ marginBottom: 30 }}>The clothes never kept up.</h2>
        <p className="body-txt">Most brands built their patterns around one body and called it standard. The waistband gaps. The fabric pulls. You leave the changing room feeling like the problem.</p>
        <p className="body-txt">You were never the problem. The clothes were.</p>
        <p className="body-txt">Premium activewear got expensive without getting better. It goes sheer in a squat, rolls at the waist, and pills by month four.</p>
        <p className="body-txt"><Link href="/skin-conscious">Materials</Link> held to a published standard. <Link href="/arya-standard">The Arya Standard</Link> is how we decide.</p>
        <div className="pullquote">
          <p>&ldquo;The industry told you your body was the problem. It wasn&apos;t. The clothes were.&rdquo;</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="stat-n">Squat</div><div className="stat-l">Every fabric is opacity tested at full depth before it is approved</div></div>
        <div className="stat"><div className="stat-n">20</div><div className="stat-l">Wears a fabric must hold its shape through before it ships</div></div>
      </div>
    </section>
  );
}
