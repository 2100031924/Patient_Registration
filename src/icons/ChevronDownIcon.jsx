export default function ChevronDownIcon({ size = 10, className = "" }) {
  return (
    <svg width={size} height={Math.round(size * 6 / 10)} viewBox="0 0 10 6" fill="none" stroke="#475569" strokeWidth="1.5" className={className}>
      <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
