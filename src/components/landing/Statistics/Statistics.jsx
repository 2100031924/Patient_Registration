import { useEffect, useState, useRef } from "react";
import "./Statistics.css";

// Precision custom DNA + Microchip SVG matching the exact style of the target UI
const DnaChipIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left Helix Strand */}
    <path d="M6 4C11 8, 11 12, 6 16C4 17.5, 4 19.5, 6 21" />
    
    {/* Right Helix Strand */}
    <path d="M11 4C6 8, 6 12, 11 16" />

    {/* Helix Connectors (Rungs) */}
    <line x1="7.5" y1="7" x2="9.5" y2="7" />
    <line x1="7.5" y1="13" x2="9.5" y2="13" />

    {/* Microchip Body */}
    <rect x="13" y="13" width="7" height="7" rx="1.5" />

    {/* Microchip Pins */}
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

const statsData = [
  {
    id: "patients-supported",
    value: "1M+",
    label: "Patients Supported",
    colorClass: "pink-theme",
  },
  {
    id: "appointments-completed",
    value: "50K+",
    label: "Appointments Completed",
    colorClass: "blue-theme",
  },
  {
    id: "healthcare-providers",
    value: "500+",
    label: "Healthcare Providers",
    colorClass: "purple-theme",
  },
  {
    id: "platform-availability",
    value: "99.9%",
    label: "Platform Availability",
    colorClass: "orange-theme",
  },
];

function AnimatedCounter({ value, isVisible }) {
  const numberMatch = value.match(/[\d.]+/);
  const matchedNumber = numberMatch?.[0] ?? null;
  const initialDisplayValue = numberMatch ? "0" : value;
  const [displayValue, setDisplayValue] = useState(initialDisplayValue);

  useEffect(() => {
    if (!isVisible) return;

    if (!matchedNumber) return;

    const target = parseFloat(matchedNumber);
    const suffix = value.replace(matchedNumber, "");
    const isDecimal = matchedNumber.includes(".");

    const duration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuad = progress * (2 - progress);
      const current = target * easeOutQuad;

      if (frame >= totalFrames) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(
          (isDecimal ? current.toFixed(1) : Math.round(current).toString()) +
            suffix
        );
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isVisible, matchedNumber, value]);

  return <span className="stat-value">{displayValue}</span>;
}

export default function Statistics() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={containerRef}>
      <div className="stats-container">
        {/* Header Block */}
        <div className="stats-header">
          <span className="stats-subtitle">Our Impact in Numbers</span>
          <h2 className="stats-title">
            Healthcare you can trust,<br />
            backed by <span className="highlight-text">real results</span>
          </h2>
        </div>

        {/* 4-Column Card Grid */}
        <div className="stats-grid">
          {statsData.map(({ id, value, label, colorClass }) => (
            <div key={id} className="stat-card">
              <div className={`icon-container ${colorClass}`}>
                <DnaChipIcon />
              </div>
              <div className="stat-info">
                <AnimatedCounter value={value} isVisible={hasAnimated} />
                <p className="stat-label">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
