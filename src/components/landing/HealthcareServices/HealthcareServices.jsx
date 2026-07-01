import { useRef, useState, useEffect, useMemo } from "react";
import {
  LuUser,
  LuDna,
  LuPill,
  LuFolderHeart,
  LuShieldPlus,
  LuHeartPulse,
  LuArrowRight,
} from "react-icons/lu";
import "./HealthcareServices.css";

const servicesData = [
  {
    id: "doctor-consultation",
    icon: LuUser,
    title: "Doctor Consultation",
    desc: "Book appointments with verified doctors across specialities.",
  },
  {
    id: "lab-tests",
    icon: LuDna,
    title: "Lab Tests",
    desc: "Book lab tests at Home with certified laboratories.",
  },
  {
    id: "online-pharmacy",
    icon: LuPill,
    title: "Online Pharmacy",
    desc: "Order medicines online and get them delivered to your doorstep.",
  },
  {
    id: "health-records",
    icon: LuFolderHeart,
    title: "Health Records",
    desc: "Access prescriptions, reports and medical history securely.",
  },
  {
    id: "insurance-claims",
    icon: LuShieldPlus,
    title: "Insurance Claims",
    desc: "Verify coverage, file claims and track approvals.",
  },
  {
    id: "remote-monitoring",
    icon: LuHeartPulse,
    title: "Remote Monitoring",
    desc: "Track your vitals and stay connected with your care team.",
  },
];

export default function HealthcareServices() {
  const sectionRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const services = useMemo(() => servicesData, []);

  // Advanced Intersection Observer for staggered scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          services.forEach((_, idx) => {
            setTimeout(() => {
              setVisibleCount((prev) => Math.max(prev, idx + 1));
            }, idx * 100);
          });
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [services]);

  return (
    <section className="services" ref={sectionRef}>
      <div className="services__container">
        <div className="services__heading">
          <span className="services__label">
            EVERYTHING YOU NEED FOR BETTER HEALTHCARE
          </span>
          <h2>
            Access care, diagnostics, medicines, records, insurance, and
            AI-powered health services from a{" "}
            <span>single platform.</span>
          </h2>
        </div>

        <div className="services__grid">
          {services.map(({ id, icon: Icon, title, desc }, index) => (
            <article
              className={`service ${index < visibleCount ? "is-visible" : ""}`}
              key={id}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="service__icon">
                <Icon />
              </div>

              <div className="service__content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>

              {/*
                Stretched-link pattern: The button acts as the primary interactive element.
                Its ::after pseudo-element covers the entire card, making the whole card clickable
                while maintaining strict accessibility tab-order and screen-reader semantics.
              */}
              <button
                className="service__arrow"
                aria-label={`Learn more about ${title}`}
                onClick={() => console.log(`Navigating to ${id}`)}
              >
                <LuArrowRight />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
