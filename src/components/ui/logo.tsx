export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  const color = light ? "#ffffff" : "#1e293b";
  const subColor = light ? "rgba(255,255,255,0.6)" : "#64748b";

  return (
    <svg viewBox="0 0 200 50" className={className} aria-label="Emalink Property Management">
      <text
        x="0"
        y="28"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="4"
        fill={color}
      >
        EMALINK
      </text>
      <text
        x="0"
        y="44"
        fontFamily="system-ui, sans-serif"
        fontSize="8.5"
        letterSpacing="2.5"
        fill={subColor}
      >
        PROPERTY MANAGEMENT
      </text>
    </svg>
  );
}
