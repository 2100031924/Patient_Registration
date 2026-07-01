export default function DnaChipIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 4C11 8, 11 12, 6 16C4 17.5, 4 19.5, 6 21" />
      <path d="M11 4C6 8, 6 12, 11 16" />
      <line x1="7.5" y1="7" x2="9.5" y2="7" />
      <line x1="7.5" y1="13" x2="9.5" y2="13" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
      <path d="M15 10V13" />
      <path d="M18 10V13" />
      <path d="M15 20V23" />
      <path d="M18 20V23" />
      <path d="M10 15H13" />
      <path d="M10 18H13" />
      <path d="M20 15H23" />
      <path d="M20 18H23" />
    </svg>
  );
}
