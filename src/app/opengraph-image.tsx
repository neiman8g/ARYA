import { ImageResponse } from "next/og";

export const alt = "Arya — Noble by nature";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoSvg = `<svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="50,7 93,87 7,87" stroke="#8B6A3E" stroke-width="4.5" fill="none" stroke-linejoin="miter"/><line x1="27" y1="63" x2="73" y2="63" stroke="#8B6A3E" stroke-width="4.5"/></svg>`;
  const logoDataUrl = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F0E8",
          fontFamily: "Georgia, serif",
        }}
      >
        <img src={logoDataUrl} alt="" width={160} height={160} style={{ marginBottom: 24 }} />
        <div style={{ fontSize: 56, fontWeight: 400, color: "#1E1810", letterSpacing: "0.02em" }}>Arya</div>
        <div style={{ fontSize: 22, color: "#8B6A3E", marginTop: 8, letterSpacing: "0.12em", textTransform: "uppercase" }}>Noble by nature</div>
      </div>
    ),
    { ...size }
  );
}
