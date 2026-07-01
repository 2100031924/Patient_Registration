import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiVideo,
  FiSearch,
  FiMapPin,
  FiChevronDown,
  FiCheck,
  FiShield,
  FiUser,
  FiPhoneCall
} from "react-icons/fi";
import doctorImg from "../../../assets/images/doctors/Decorations.png";
import "./Hero.css";

const POPULAR_SEARCH_TAGS = [
  "Dermatologist",
  "Gynecologist",
  "Paediatrician",
  "Orthopaedic",
  "Dentist"
];

const SEARCH_SUGGESTIONS = [
  { name: "Dr. Sarah Jenkins", specialty: "Cardiologist", type: "Doctor" },
  { name: "Dr. Alex Patel", specialty: "Dermatologist", type: "Doctor" },
  { name: "General Checkup", specialty: "Primary Care", type: "Service" },
  { name: "Neurology Diagnostics", specialty: "Lab Test", type: "Diagnostic" },
  { name: "Apollo Medical Center", specialty: "Multi-specialty", type: "Hospital" }
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const searchWrapperRef = useRef(null);
  const visualContainerRef = useRef(null);
  const rafId = useRef(null);
  const latestEvent = useRef({ clientX: 0, clientY: 0 });

  const filteredSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_SUGGESTIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [filteredSuggestions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    latestEvent.current = { clientX: e.clientX, clientY: e.clientY };
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const el = visualContainerRef.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const { clientX, clientY } = latestEvent.current;
      setParallaxOffset({
        x: (clientX - left - width / 2) / 45,
        y: (clientY - top - height / 2) / 45
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setParallaxOffset({ x: 0, y: 0 });
  }, []);

  const handleSelectSuggestion = useCallback((value) => {
    setSearchQuery(value);
    setShowSuggestions(false);
    setActiveIndex(-1);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const chosen =
        activeIndex >= 0 && filteredSuggestions[activeIndex]
          ? filteredSuggestions[activeIndex].name
          : searchQuery.trim();
      if (!chosen) return;
      setSearchQuery(chosen);
      setShowSuggestions(false);
      setActiveIndex(-1);
    },
    [activeIndex, filteredSuggestions, searchQuery]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!showSuggestions || filteredSuggestions.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filteredSuggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(
          (i) => (i - 1 + filteredSuggestions.length) % filteredSuggestions.length
        );
      } else if (e.key === "Enter") {
        if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
          e.preventDefault();
          handleSelectSuggestion(filteredSuggestions[activeIndex].name);
        }
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    },
    [showSuggestions, filteredSuggestions, activeIndex, handleSelectSuggestion]
  );

  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* Left and Right Hero Content Grid */}
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <svg
                className="badge-spark"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"
                  fill="currentColor"
                />
              </svg>
              <span>AI-Powered Healthcare Ecosystem</span>
            </div>

            <h1 className="hero-title">
              One Platform for the Entire{" "}
              <span className="hero-highlight">Healthcare Ecosystem</span>
            </h1>

            <p className="hero-subtitle">
              Connect Patients, Doctors, Hospitals, Laboratories, Pharmacies,
              Insurance, and Healthcare providers through one secure AI-powered
              platform.
            </p>

            <div className="hero-actions">
              <Link
                to="/register"
                className="hero-btn-primary"
                aria-label="Book an Appointment"
              >
                <FiCalendar className="btn-icon" /> Book Appointment
              </Link>
              <Link
                to="/consult"
                className="hero-btn-secondary"
                aria-label="Consult Online"
              >
                <FiVideo className="btn-icon" /> Consult Online
              </Link>
            </div>

            {/* Horizontal Aligned Highlights */}
            <div className="hero-bullets">
              <div className="bullet-item">
                <div className="bullet-icon-wrapper">
                  <FiCheck className="bullet-icon" />
                </div>
                <div className="bullet-text">
                  <span className="bullet-label">Trusted by</span>
                  <span className="bullet-value">1M+ Patients</span>
                </div>
              </div>

              <div className="bullet-item">
                <div className="bullet-icon-wrapper">
                  <FiCheck className="bullet-icon" />
                </div>
                <div className="bullet-text">
                  <span className="bullet-label">Verified</span>
                  <span className="bullet-value">Healthcare Experts</span>
                </div>
              </div>

              <div className="bullet-item">
                <div className="bullet-icon-wrapper">
                  <FiShield className="bullet-icon" />
                </div>
                <div className="bullet-text">
                  <span className="bullet-label">Secure & Confidential</span>
                  <span className="bullet-value">Your data is protected</span>
                </div>
              </div>

              <div className="bullet-item">
                <div className="bullet-icon-wrapper">
                  <FiPhoneCall className="bullet-icon" />
                </div>
                <div className="bullet-text">
                  <span className="bullet-label">24/7 Care</span>
                  <span className="bullet-value">We're here for you</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div
            className="hero-visual"
            ref={visualContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="hero-image-wrapper">
              <img
                src={doctorImg}
                alt="Medical Professionals Consult"
                className="hero-doctor-img"
                loading="eager"
              />

              {/* Floating Cards mapped exactly as in the visual reference */}
              <div
                className="floating-card float-find-doctors"
                style={{
                  transform: `translate(${parallaxOffset.x * 1.1}px, ${parallaxOffset.y * 1.1}px)`
                }}
              >
                <div className="f-icon-box bg-teal">
                  <FiUser size={18} />
                </div>
                <div className="f-text-box">
                  <h4>Find Doctors</h4>
                  <p>Verified specialists</p>
                </div>
              </div>

              <div
                className="floating-card float-consult-online"
                style={{
                  transform: `translate(${parallaxOffset.x * -0.9}px, ${parallaxOffset.y * -0.9}px)`
                }}
              >
                <div className="f-icon-box bg-green">
                  <FiVideo size={18} />
                </div>
                <div className="f-text-box">
                  <h4>Consult Online</h4>
                  <p>Connect in Few Seconds</p>
                </div>
              </div>

              <div
                className="floating-card float-lab-tests"
                style={{
                  transform: `translate(${parallaxOffset.x * 0.7}px, ${parallaxOffset.y * 0.7}px)`
                }}
              >
                <div className="f-icon-box bg-blue">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 2v8M14 2v8M8.5 10h7M12 2v18M4.5 20.5a3.5 3.5 0 0 0 7 0H4.5Z" />
                  </svg>
                </div>
                <div className="f-text-box">
                  <h4>Lab Tests</h4>
                  <p>Book tests at home</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Wrapper inside Container for perfect alignment */}
        <form
          className="hero-search-wrapper"
          ref={searchWrapperRef}
          onSubmit={handleSubmit}
        >
          <div className="hero-search-box">
            <div className="search-field-location">
              <FiMapPin className="field-icon-loc" />
              <select
                className="select-location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Filter by Location"
              >
                <option value="">Select Location</option>
                <option value="ny">New York, USA</option>
                <option value="lon">London, UK</option>
                <option value="del">New Delhi, India</option>
                <option value="sf">San Francisco, CA</option>
              </select>
              <FiChevronDown className="select-arrow-custom" />
            </div>

            <div className="search-field-main">
              <FiSearch className="field-icon-search" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search Doctors, Specialities, Clinics and Hospitals..."
                aria-label="Search Medical Services"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-query-btn"
                  onClick={() => setSearchQuery("")}
                >
                  &times;
                </button>
              )}

              {showSuggestions &&
                (searchQuery.trim().length > 0 ||
                  filteredSuggestions.length > 0) && (
                  <div className="search-suggestions-dropdown">
                    {filteredSuggestions.length > 0 ? (
                      <div className="suggestions-list">
                        {filteredSuggestions.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`suggestion-item-option ${idx === activeIndex ? "active" : ""}`}
                            onClick={() => handleSelectSuggestion(item.name)}
                            onMouseEnter={() => setActiveIndex(idx)}
                          >
                            <div className="sug-left">
                              <span className="sug-name">{item.name}</span>
                              <span className="sug-specialty">{item.specialty}</span>
                            </div>
                            <span className={`sug-badge-type type-${item.type.toLowerCase()}`}>
                              {item.type}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="suggestions-empty">
                        <p>No results found matching "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}
            </div>

            <button type="submit" className="hero-search-btn">
              <span>Search</span>
            </button>
          </div>

          <div className="hero-popular-searches">
            <span className="pop-label">Popular Searches:</span>
            {POPULAR_SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`pop-tag ${searchQuery === tag ? "active" : ""}`}
                onClick={() => setSearchQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
