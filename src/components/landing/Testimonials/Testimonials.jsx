import { useState, useEffect, useRef, useCallback } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AvatarPlaceholderIcon from "../../../icons/AvatarPlaceholderIcon";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    title: "Fast & Reliable Lab Tests",
    quote: "“I scheduled my lab test online and received reports quickly.”",
    author: "John Smith",
    role: "Business Analyst",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    title: "Consult Online",
    quote: "“Convenient online consultations from home.”",
    author: "Vikram Rao",
    role: "Accountant",
    img: "",
    rating: 5,
    usePlaceholder: true,
  },
  {
    id: 3,
    title: "Insurance Support",
    quote: "“Smooth and hassle-free insurance support.”",
    author: "Kavya",
    role: "Teacher",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    title: "Hospital Care",
    quote: "“Quick booking and quality care.”",
    author: "Rahul Sharma",
    role: "Software Engineer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    rating: 5,
  },
];

const createRatingStars = (rating) => Array.from({ length: rating });
const CAROUSEL_BREAKPOINT = 1200;

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselMode, setIsCarouselMode] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const trackRef = useRef(null);

  // Handle responsive breakpoint detection synchronously with CSS
  useEffect(() => {
    const checkMode = () => setIsCarouselMode(window.innerWidth <= CAROUSEL_BREAKPOINT);
    checkMode();
    window.addEventListener("resize", checkMode);
    return () => window.removeEventListener("resize", checkMode);
  }, []);

  // Intersection Observer for precise slide tracking without scroll throttling issues
  useEffect(() => {
    if (!isCarouselMode || !trackRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveSlide(index);
          }
        });
      },
      { root: trackRef.current, threshold: 0.6 }
    );

    const cards = trackRef.current.querySelectorAll(".testimonial-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [isCarouselMode]);

  const handleImageError = useCallback((id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  }, []);

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;

    const targetCard = track.querySelector(`[data-index="${index}"]`);
    if (targetCard) {
      track.scrollTo({
        left: targetCard.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });
    }
    setActiveSlide(index);
  }, []);

  const handleNavigation = useCallback(
    (direction) => {
      const maxIndex = testimonialsData.length - 1;
      const nextIndex = direction === "next"
        ? Math.min(activeSlide + 1, maxIndex)
        : Math.max(activeSlide - 1, 0);

      scrollToIndex(nextIndex);
    },
    [activeSlide, scrollToIndex]
  );

  // Keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (e) => {
      if (!isCarouselMode) return;
      if (e.key === "ArrowRight") handleNavigation("next");
      if (e.key === "ArrowLeft") handleNavigation("prev");
    },
    [isCarouselMode, handleNavigation]
  );

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="testimonials-container">

        {/* Left Column: Heading & Description */}
        <div className="testimonials-left-col">
          <span className="testimonials-tagline">WHAT OUR PATIENTS SAY</span>
          <h2 id="testimonials-heading" className="testimonials-heading">
            Trusted by Millions
          </h2>
          <p className="testimonials-description">
            From booking to recovery, we make healthcare simple, accessible and personalized for you.
          </p>

          {/* Carousel Controls - Rendered only in carousel mode */}
          {isCarouselMode && (
            <div className="carousel-controls" role="group" aria-label="Carousel controls">
              <button
                className="carousel-arrow prev"
                onClick={() => handleNavigation("prev")}
                disabled={activeSlide === 0}
                aria-label="Previous testimonials"
              >
                <FaChevronLeft />
              </button>

              <div className="carousel-dots" role="tablist">
                {testimonialsData.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${i === activeSlide ? "active" : ""}`}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-selected={i === activeSlide}
                    role="tab"
                  />
                ))}
              </div>

              <button
                className="carousel-arrow next"
                onClick={() => handleNavigation("next")}
                disabled={activeSlide === testimonialsData.length - 1}
                aria-label="Next testimonials"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Cards Grid/Track */}
        <div
          className="testimonials-track"
          ref={trackRef}
          role="list"
          tabIndex={isCarouselMode ? 0 : -1}
          onKeyDown={handleKeyDown}
          aria-live="polite"
        >
          {testimonialsData.map((testimonial, index) => {
            const { id, title, quote, author, role, img, rating, usePlaceholder } = testimonial;
            const showPlaceholder = usePlaceholder || imageErrors[id] || !img;

            return (
              <div
                key={id}
                className="testimonial-card"
                data-index={index}
                role="listitem"
                aria-roledescription={isCarouselMode ? "slide" : undefined}
                aria-label={isCarouselMode ? `${index + 1} of ${testimonialsData.length}` : undefined}
              >
                {/* Rating Row */}
                <div className="card-rating-row">
                  <div className="stars-wrapper" aria-label={`Rated ${rating} out of 5 stars`}>
                    {createRatingStars(rating).map((_, i) => (
                      <FaStar key={i} className="star-icon-filled" />
                    ))}
                  </div>
                  <span className="rating-value">{rating}/5</span>
                </div>

                {/* Card Title & Quote */}
                <div className="card-body">
                  <h3 className="card-title">{title}</h3>
                  <p className="card-quote">{quote}</p>
                </div>

                {/* Profile Footer */}
                <div className="card-profile-footer">
                  {showPlaceholder ? (
                    <div className="avatar-placeholder" aria-hidden="true">
                      <AvatarPlaceholderIcon className="fallback-svg" />
                    </div>
                  ) : (
                    <img
                      src={img}
                      alt={`Portrait of ${author}`}
                      className="profile-avatar"
                      draggable="false"
                      onError={() => handleImageError(id)}
                      loading="lazy"
                    />
                  )}
                  <div className="profile-details">
                    <span className="profile-name">{author}</span>
                    <span className="profile-role">{role}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
