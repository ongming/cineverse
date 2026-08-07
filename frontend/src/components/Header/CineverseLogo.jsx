export default function CineverseLogo({ className = "w-11 h-11" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
    >
      {/* 1. Solid Cyan Badge Disk */}
      <circle cx="50" cy="50" r="48" fill="#00e5e5" />

      {/* 2. Pure Circular Letter 'C' Arc with Extra Narrow Mouth Opening */}
      <path
        d="M 74 38 A 26 26 0 1 0 74 62"
        stroke="#0d0d0d"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* 3. Centered Play Triangle */}
      <polygon points="43,38 63,50 43,62" fill="#0d0d0d" />
    </svg>
  );
}
