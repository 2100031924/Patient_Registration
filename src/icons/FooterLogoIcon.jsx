export default function FooterLogoIcon({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="footerHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00a896" />
          <stop offset="100%" stopColor="#028090" />
        </linearGradient>
      </defs>
      <path
        d="M17 31C17 31 2 21 2 11.5C2 6 6.5 2.5 11.5 2.5C14.5 2.5 16 4 17 5.5C18 4 19.5 2.5 22.5 2.5C27.5 2.5 32 6 32 11.5C32 21 17 31 17 31Z"
        fill="url(#footerHeartGradient)"
      />
      <path
        d="M17 9V19M12 14H22"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
