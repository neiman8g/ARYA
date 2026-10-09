import Image from "next/image";

const FIT = [
  ["Opaque at full squat depth", "Required"],
  ["Holds its shape through twenty wears", "Required"],
  ["Waistband holds without rolling", "Required"],
];

const MATERIALS = [
  ["OEKO-TEX 100 certified", "Required"],
  ["Added PFAS", "None"],
  ["Toxic dyes", "None"],
  ["Fiber content", "Published at launch"],
  ["Mill", "Published at launch"],
];

function Lines({ rows }: { rows: string[][] }) {
  return rows.map(([k, v]) => (
    <div className="line" key={k}>
      <dt>{k}</dt>
      <span className="dots" aria-hidden="true" />
      <dd>{v}</dd>
    </div>
  ));
}

/** Requirements only. Never show a result as passed until a test has actually been run. */
export function StandardCertificate({ subject = "Every ARYA fabric" }: { subject?: string }) {
  return (
    <div className="cert">
      <div className="crest">
        <Image src="/brand/arya-icon.png" alt="" width={42} height={35} />
        <p className="caps bronze">{subject}</p>
        <h3>The Arya Standard</h3>
      </div>
      <dl>
        <p className="caps grp">Fit</p>
        <Lines rows={FIT} />
        <p className="caps grp">Materials</p>
        <Lines rows={MATERIALS} />
      </dl>
      <p className="seal">Results and the certificate number are published when the fabric is locked.</p>
    </div>
  );
}
