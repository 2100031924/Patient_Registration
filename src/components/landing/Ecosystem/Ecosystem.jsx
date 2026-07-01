import React, { useRef, useState, useEffect, useCallback } from "react";
import EcoPatientsIcon from "../../../icons/EcoPatientsIcon";
import EcoDoctorIcon from "../../../icons/EcoDoctorIcon";
import EcoHospitalsIcon from "../../../icons/EcoHospitalsIcon";
import EcoArrowIcon from "../../../icons/EcoArrowIcon";
import "./Ecosystem.css";

const nodes = [
  { id: "patients", title: "Patients", subtitle: "Manage your health and access care", Icon: EcoPatientsIcon },
  { id: "doctors", title: "Doctors", subtitle: "Doctor care and consultations", Icon: EcoDoctorIcon },
  { id: "hospitals", title: "Hospitals", subtitle: "Streamline operations and patient care", Icon: EcoHospitalsIcon },
  { id: "laboratories", title: "Laboratories", subtitle: "Accurate tests and timely reports", Icon: EcoDoctorIcon },
  { id: "pharmacies", title: "Pharmacies", subtitle: "Dispense and deliver medicine with ease", Icon: EcoDoctorIcon },
  { id: "insurance", title: "Insurance", subtitle: "Simplify policies and claims", Icon: EcoDoctorIcon },
];

// Advanced intersection observer hook for scroll-triggered sequencing
const useScrollReveal = (options = { threshold: 0.2 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

// Performance-optimized 3D tilt system tracking mouse proximity across the container
const use3DTiltContainer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = null;
    const nodes = container.querySelectorAll(".eco-node-circle-outer");

    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        nodes.forEach((node) => {
          const nodeRect = node.getBoundingClientRect();
          const nodeCenterX = nodeRect.left + nodeRect.width / 2 - rect.left;
          const nodeCenterY = nodeRect.top + nodeRect.height / 2 - rect.top;

          const distanceX = mouseX - nodeCenterX;
          const distanceY = mouseY - nodeCenterY;
          const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

          const maxDistance = 180;
          if (distance < maxDistance) {
            const intensity = 1 - distance / maxDistance;
            const rotateY = (distanceX / maxDistance) * 20 * intensity;
            const rotateX = -(distanceY / maxDistance) * 20 * intensity;
            node.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.05)`;
            node.style.boxShadow = `0 10px 25px rgba(0, 143, 117, ${0.15 * intensity})`;
          } else {
            node.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
            node.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.02)";
          }
        });
      });
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      nodes.forEach((node) => {
        node.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
        node.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.02)";
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return containerRef;
};

// Magnetic effect hook for the CTA button
const useMagneticEffect = (strength = 0.3) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
};

export default function Ecosystem() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.3 });
  const [flowRef, flowVisible] = useScrollReveal({ threshold: 0.2 });
  const tiltRef = use3DTiltContainer();
  const [ctaRef, ctaVisible] = useScrollReveal({ threshold: 0.5 });

  const magneticBtn = useMagneticEffect(0.25);
  const buttonRef = useRef(null);

  // Ripple effect logic
  const createRipple = (event) => {
    const button = buttonRef.current;
    if (!button) return;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("eco-ripple");

    const ripple = button.getElementsByClassName("eco-ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  return (
    <section className="eco-section">
      <div className="eco-container">
        <div className={`eco-header ${headerVisible ? "is-visible" : ""}`} ref={headerRef}>
          <span className="section-label">ONE CONNECTED HEALTHCARE NETWORK</span>
          <h2>
            Built to connect every participant in the <br className="desktop-br" /> healthcare journey
          </h2>
          <p className="eco-subtitle">
            From booking to recovery, we make healthcare simple, accessible and personalized for you.
          </p>
        </div>

        <div
          className={`eco-flow-container ${flowVisible ? "is-visible" : ""}`}
          ref={(el) => {
            flowRef.current = el;
            tiltRef.current = el;
          }}
        >
          {nodes.map(({ id, title, subtitle, Icon }, i) => (
            <React.Fragment key={id}>
              <div
                className="eco-node-wrapper"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="eco-node">
                  <div className="eco-node-circle-outer">
                    <div className="eco-node-icon">
                      <Icon />
                    </div>
                    <div className="eco-node-glow" />
                  </div>
                  <div className="eco-node-text">
                    <h4>{title}</h4>
                    <p>{subtitle}</p>
                  </div>
                </div>
              </div>

              {i < nodes.length - 1 && (
                <div
                  className="eco-flow-connector"
                  style={{ transitionDelay: `${i * 0.12 + 0.06}s` }}
                >
                  <div className="eco-dotted-line" />
                  <EcoArrowIcon className="eco-connector-arrow" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className={`eco-cta-wrapper ${ctaVisible ? "is-visible" : ""}`} ref={ctaRef}>
          <button
            className="eco-explore-btn"
            ref={buttonRef}
            onMouseDown={createRipple}
            {...magneticBtn}
          >
            Explore Ecosystem
          </button>
        </div>
      </div>
    </section>
  );
}
