export default function RoleDoctorIcon({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.8 2.3A10.1 10.1 0 0 1 12 0a10.1 10.1 0 0 1 7.2 2.3" />
      <circle cx="12" cy="10" r="3" />
      <path d="M12 13v8M9 16h6" />
      <path d="M19 13.5a2.5 2.5 0 1 0 4 0v-4" />
    </svg>
  );
}
