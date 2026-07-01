import { useEffect, useState, useRef, useCallback } from "react";
import DnaChipIcon from "../../../icons/DnaChipIcon";
import "./Statistics.css";

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
  const numberMatch = value.match(/^[\d.]+/);
  const matchedNumber = numberMatch?.[0] ?? null;
  const suffix = matchedNumber ? value.replace(matchedNumber, "") : "";
  const isDecimal = matchedNumber?.includes(".") ?? false;
  const target = matchedNumber ? parseFloat(matchedNumber) : 0;

  const getInitialState = useCallback(() => {
    if (!matchedNumber) return value;
    return `${isDecimal ? "0.0" : "0"}${suffix}`;
  }, [matchedNumber, isDecimal, suffix, value]);

  const [displayValue, setDisplayValue] = useState(getInitialState);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !matchedNumber) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1800;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo for a highly polished, decelerating animation
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = target * easing;

      const formattedCurrent = isDecimal
        ? current.toFixed(1)
        : Math.round(current).toString();

      setDisplayValue(`${formattedCurrent}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Guarantee exact final value
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, matchedNumber, value, target, isDecimal, suffix]);

  return (
    <>
      <span className="stat-value" aria-hidden="true">
        {displayValue}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
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
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
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
