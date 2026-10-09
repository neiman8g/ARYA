import Image from "next/image";

/** Stand-in until real product photography exists. Never replace with AI images of the product. */
export function ProductPlaceholder({ name, colorName, hex, alt }: { name: string; colorName: string; hex: string; alt: string }) {
  return (
    <div className="ph" style={{ backgroundColor: hex }} role="img" aria-label={`${alt}. Photo coming soon.`}>
      <Image className="ph-icon" src="/brand/arya-icon-light.png" alt="" width={64} height={54} />
      <span className="ph-name">{name}</span>
      <span className="caps ph-note">{colorName} &middot; Photography in production</span>
    </div>
  );
}
