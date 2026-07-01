import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiVideo } from "react-icons/fi";
import ctaImage from "../../../assets/images/doctors/image.png";
import "./CTA.css";

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

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

export default function CTA() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const [headingRef, headingVisible] = useScrollReveal(0.2);
  const [subRef, subVisible] = useScrollReveal(0.3);
  const [actionsRef, actionsVisible] = useScrollReveal(0.4);

  const primaryBtn = useMagneticEffect(0.25);
  const secondaryBtn = useMagneticEffect(0.25);

  useEffect(() => {
    const handleParallax = (e) => {
      if (!visualRef.current || !sectionRef.current) return;
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / width;
      const y = (e.clientY - top - height / 2) / height;

      visualRef.current.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translate3d(0, 0, 0)`;
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleParallax);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleParallax);
      }
    };
  }, []);

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-container">
        <div className="cta-visual" ref={visualRef}>
          <div className="cta-visual-glow"></div>
          <img
            src={ctaImage}
            alt="Doctor consulting senior couple"
            className="cta-img"
          />
        </div>

        <div className="cta-content">
          <h2
            className={`cta-heading ${headingVisible ? 'is-visible' : ''}`}
            ref={headingRef}
          >
            Ready to take charge <br />of your health?
          </h2>
          <p
            className={`cta-subheading ${subVisible ? 'is-visible' : ''}`}
            ref={subRef}
          >
            Book an appointment or consult a doctor online
          </p>

          <div
            className={`cta-actions ${actionsVisible ? 'is-visible' : ''}`}
            ref={actionsRef}
          >
            <Link
              to="/register"
              className="cta-btn-primary"
              {...primaryBtn}
            >
              <FiCalendar className="btn-icon" /> Book Appointment
            </Link>
            <Link
              to="/consult"
              className="cta-btn-secondary"
              {...secondaryBtn}
            >
              <FiVideo className="btn-icon" /> Consult Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
