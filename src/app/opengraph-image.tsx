import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ARYA, premium non-toxic activewear. Noble by nature.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/arya-tagline.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F5EFE4", gap: 40 }}>
        <img src={src} alt="" width={560} height={206} />
        <div style={{ fontSize: 22, letterSpacing: 8, color: "#6E522E", textTransform: "uppercase" }}>Premium non-toxic activewear</div>
      </div>
    ),
    { ...size }
  );
}
