// components/Logo.tsx
// Usage:
//   <Logo />                      — default square mark (44px)
//   <Logo variant="lockup" />     — horizontal: mark + "Noba" + "Edx Morung"
//   <Logo variant="pill" />       — rounded pill badge
//   <Logo size={32} />            — any size
//   <Logo dark />                 — inverts for dark backgrounds


type LogoVariant = "mark" | "lockup" | "pill";

interface LogoProps {
  variant?: LogoVariant;
  size?: number;        // controls height; width scales automatically
  dark?: boolean;       // true = white ink on transparent (for dark bg)
  className?: string;
  style?: React.CSSProperties;
}

const INK = {
  light: "#1A1A18",
  dark: "#F7F4EF",
};
const AMBER = "#E8A020";
const MUTED = {
  light: "#8A867C",
  dark: "#A09C96",
};

/* ── The N letterform ─────────────────────────────────────
   Drawn on a 40×40 grid so it scales cleanly at any size.
   The amber dot sits at the terminal of the diagonal stroke.
────────────────────────────────────────────────────────── */
function NMark({
  ink,
  scale = 1,
}: {
  ink: string;
  scale?: number;
}) {
  const s = scale;
  return (
    <g>
      {/* Left stem */}
      <rect x={0} y={0} width={6 * s} height={40 * s} rx={1.5 * s} fill={ink} />
      {/* Right stem */}
      <rect x={34 * s} y={0} width={6 * s} height={40 * s} rx={1.5 * s} fill={ink} />
      {/* Diagonal */}
      <polygon
        points={`${6 * s},0 ${14 * s},0 ${40 * s},${40 * s} ${32 * s},${40 * s}`}
        fill={ink}
      />
      {/* Amber terminal dot */}
      <circle cx={40 * s} cy={40 * s} r={5 * s} fill={AMBER} />
    </g>
  );
}

/* ── Variant: Square mark ─────────────────────────────── */
function MarkVariant({ size = 44, dark = false }: { size?: number; dark?: boolean }) {
  const ink = dark ? INK.dark : INK.light;
  const pad = size * 0.18;
  const inner = size - pad * 2;
  const scale = inner / 40;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Noba logo"
    >
      <title>Noba</title>
      <g transform={`translate(${pad}, ${pad})`}>
        <NMark ink={ink} scale={scale} />
      </g>
    </svg>
  );
}

/* ── Variant: Horizontal lockup ───────────────────────── */
function LockupVariant({ size = 44, dark = false }: { size?: number; dark?: boolean }) {
  const ink = dark ? INK.dark : INK.light;
  const muted = dark ? MUTED.dark : MUTED.light;
  const markScale = size / 44;
  const markW = 40 * markScale;
  const markH = 40 * markScale;
  const pad = size * 0.1;
  const gap = size * 0.3;
  const divider = markW + pad * 2 + gap * 0.4;
  const textX = divider + gap * 0.6;
  const nameSize = size * 0.42;
  const subSize = size * 0.25;
  const totalW = textX + nameSize * 3.2; // approx "Noba" width
  const totalH = size + pad * 2;

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Noba — Edx Morung"
    >
      <title>Noba · Edx Morung</title>
      {/* Mark */}
      <g transform={`translate(${pad}, ${pad})`}>
        <NMark ink={ink} scale={markScale} />
      </g>
      {/* Divider */}
      <line
        x1={divider}
        y1={pad + markH * 0.1}
        x2={divider}
        y2={pad + markH * 0.9}
        stroke={dark ? "#FFFFFF30" : "#DDD9D0"}
        strokeWidth={1}
      />
      {/* Name */}
      <text
        x={textX}
        y={pad + markH * 0.52}
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize={nameSize}
        fontWeight={700}
        letterSpacing="-0.02em"
        fill={ink}
        dominantBaseline="middle"
      >
        Noba
      </text>
      {/* Subtext */}
      <text
        x={textX}
        y={pad + markH * 0.78}
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize={subSize}
        fontWeight={400}
        letterSpacing="0.06em"
        fill={muted}
        dominantBaseline="middle"
      >
        Edx Morung
      </text>
    </svg>
  );
}

/* ── Variant: Pill badge ──────────────────────────────── */
function PillVariant({ size = 44, dark = false }: { size?: number; dark?: boolean }) {
  const ink = dark ? INK.dark : INK.light;
  const bg = dark ? "#FFFFFF12" : "#FFFEF9";
  const border = dark ? "#FFFFFF20" : "#DDD9D0";
  const markScale = (size * 0.65) / 40;
  const markH = 40 * markScale;
  const markW = 40 * markScale;
  const padV = (size - markH) / 2;
  const padH = size * 0.3;
  const nameSize = size * 0.35;
  const gap = size * 0.25;
  const textX = padH + markW + gap;
  const nameW = nameSize * 2.8;
  const totalW = textX + nameW + padH;
  const totalH = size;
  const r = size / 2;

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Noba"
    >
      <title>Noba</title>
      <rect x={0.5} y={0.5} width={totalW - 1} height={totalH - 1} rx={r} fill={bg} stroke={border} strokeWidth={1} />
      <g transform={`translate(${padH}, ${padV})`}>
        <NMark ink={ink} scale={markScale} />
      </g>
      <text
        x={textX}
        y={size / 2}
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize={nameSize}
        fontWeight={700}
        letterSpacing="-0.02em"
        fill={ink}
        dominantBaseline="middle"
      >
        Noba
      </text>
    </svg>
  );
}

/* ── Main export ──────────────────────────────────────── */
export default function Logo({
  variant = "mark",
  size = 44,
  dark = false,
  className,
  style,
}: LogoProps) {
  const props = { size, dark };

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", ...style }}
    >
      {variant === "mark" && <MarkVariant {...props} />}
      {variant === "lockup" && <LockupVariant {...props} />}
      {variant === "pill" && <PillVariant {...props} />}
    </span>
  );
}