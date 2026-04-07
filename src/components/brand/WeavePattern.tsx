/** Persian geometric weave pattern — brand signature SVG overlay */
export function WeavePattern({ id, color = "#8B6A3E", opacity = 0.08 }: { id: string; color?: string; opacity?: number }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
          <polygon points="36,3 69,21 69,51 36,69 3,51 3,21" fill="none" stroke={color} strokeWidth="0.6" />
          <polygon points="36,14 58,27 58,45 36,58 14,45 14,27" fill="none" stroke={color} strokeWidth="0.3" />
          <circle cx="36" cy="36" r="2.5" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="36" y1="3" x2="36" y2="69" stroke={color} strokeWidth="0.2" opacity="0.4" />
          <line x1="3" y1="36" x2="69" y2="36" stroke={color} strokeWidth="0.2" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill={`url(#${id})`} />
    </svg>
  );
}
