import React, { useState, useEffect, useRef, memo } from "react";
import { FiCheck, FiClipboard, FiHeart } from "react-icons/fi";
import { TbDna, TbAmbulance } from "react-icons/tb";
import image1 from "../../../assets/images/landing/image1.png";
import image2 from "../../../assets/images/landing/image2.png";
import image3 from "../../../assets/images/landing/image3.png";
import image4 from "../../../assets/images/landing/image4.png";
import "./WhyChooseUs.css";

/* Advanced Logic: Custom Hook to respect user's reduced motion preferences */
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReduced(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
};

/* Advanced Logic: Custom Hook for Intersection Observer (Scroll Reveal) */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, show immediately without observer
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) observer.unobserve(ref.current); // Animate only once
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px", ...options });

    const element = ref.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [prefersReducedMotion, options]);

  return [ref, isInView];
};

/* Advanced Logic: Memoized Sub-component to prevent unnecessary re-renders */
const WhyChooseCard = memo(({ data, index }) => {
  const [ref, isInView] = useInView();
  const Icon = data.icon;

  return (
    <article
      ref={ref}
      className={`whychoose-card ${isInView ? "is-visible" : "is-hidden"}`}
      style={{ "--reveal-delay": `${index * 120}ms` }}
      aria-roledescription="feature"
    >
      <div className="whychoose-visual">
        <img src={data.image} alt={data.title} className="card-image" loading="lazy" />
      </div>

      <div className="whychoose-card-body">
        <div className="title-wrapper">
          <div className="icon-badge" aria-hidden="true">
            <Icon className="card-icon" />
          </div>
          <h3>{data.title}</h3>
        </div>
        <p className="card-description">{data.description}</p>
        <ul className="whychoose-points">
          {data.points.map((point, i) => (
            <li key={i}>
              <FiCheck className="check-icon" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
});

export default function WhyChooseUs() {
  // Data-driven architecture for scalability
  const featureData = [
    {
      id: 1,
      icon: TbDna,
      title: "AI Health Insights",
      image: image1,
      description: "Receive personalized health recommendations and risk assessments.",
      points: ["Instant symptom analysis", "Health risk assessment", "Personalized recommendations"]
    },
    {
      id: 2,
      icon: FiClipboard,
      title: "Connected Medical Records",
      image: image2,
      description: "Access prescriptions, reports, and consultations from one place.",
      points: ["All records in one place", "Easy access anytime", "100% secure & private"]
    },
    {
      id: 3,
      icon: TbAmbulance,
      title: "Secure Healthcare Network",
      image: image3,
      description: "Enterprise-grade security and privacy protection.",
      points: ["End-to-end encryption", "HIPAA compliant infrastructure", "Secure data transmission"]
    },
    {
      id: 4,
      icon: FiHeart,
      title: "Continuous Care",
      image: image4,
      description: "From appointments to follow-ups and monitoring.",
      points: ["Health tips & articles", "Lifestyle recommendations", "Connect with experts"]
    }
  ];

  return (
    <section className="whychoose-section" aria-labelledby="why-choose-heading">
      <div className="whychoose-container">
        <div className="whychoose-header">
          <span className="section-label">WHY CHOOSE US?</span>
          <h2 id="why-choose-heading">Healthcare Powered by Intelligence</h2>
        </div>

        <div className="whychoose-grid">
          {featureData.map((feature, index) => (
            <WhyChooseCard key={feature.id} data={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
