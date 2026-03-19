"use client";

function AryaMark({ size = 40, color = "#8B6A3E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,7 93,87 7,87" stroke={color} strokeWidth="4.5" fill="none" strokeLinejoin="miter" />
      <line x1="27" y1="63" x2="73" y2="63" stroke={color} strokeWidth="4.5" />
    </svg>
  );
}

function AryaWordmark({ height = 20, color = "#2C2418" }: { height?: number; color?: string }) {
  /* Wide viewBox + overflow hidden: letterSpacing on text must not widen past box (iOS layout/scroll bugs). */
  return (
    <svg
      height={height}
      viewBox="0 0 220 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 1, minWidth: 0, maxWidth: "100%", overflow: "hidden" }}
    >
      <text
        x="110"
        y="26"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'Garamond', Georgia, serif"
        fontSize="28"
        letterSpacing="10"
        fill={color}
        fontWeight="500"
      >
        ARYA
      </text>
    </svg>
  );
}

export function AryaLogo({
  size = 36,
  textColor = "#2C2418",
  markColor = "#8B6A3E",
  stacked = false,
}: {
  size?: number;
  textColor?: string;
  markColor?: string;
  stacked?: boolean;
}) {
  if (stacked)
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <AryaMark size={size} color={markColor} />
        <AryaWordmark height={size * 0.42} color={textColor} />
      </div>
    );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 13,
        minWidth: 0,
        maxWidth: "100%",
      }}
    >
      <AryaMark size={size} color={markColor} />
      <AryaWordmark height={size * 0.48} color={textColor} />
    </div>
  );
}

export { AryaMark, AryaWordmark };
