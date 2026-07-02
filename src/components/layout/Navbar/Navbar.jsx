import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiUser, FiArrowRight } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import LogoIcon from "../../../icons/LogoIcon";
import brandLogo from "../../../assets/images/landing/image5.png";
import "./Navbar.css";

const NAV_DROPDOWNS = {
  Solutions: ["Telemedicine", "EHR Integration", "Analytics & Reporting"],
  "For Patients": ["Find a Doctor", "Patient Portal", "Health Records"],
  "For Providers": ["Clinic Management", "Provider Scheduling", "Billing & Claims"]
};

export default function Navbar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);

  const navRef = useRef(null);

  // Handle Navbar Scroll Elevation
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Body scroll lock & Escape key listener when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => e.key === "Escape" && setIsMobileOpen(false);
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isMobileOpen]);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" aria-label="MediConnect Home">
          <img src={brandLogo} alt="MediConnect" className="navbar-brand-logo" />
        </Link>

        <div className="navbar-links-desktop">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>

          {Object.entries(NAV_DROPDOWNS).map(([title, links]) => (
            <div
              key={title}
              className="nav-dropdown"
              onMouseEnter={() => setOpenDropdown(title)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`nav-dropdown-trigger ${openDropdown === title ? "active" : ""}`}
                onClick={() => setOpenDropdown(openDropdown === title ? null : title)}
                aria-expanded={openDropdown === title}
              >
                {title} <FiChevronDown className={`nav-dropdown-icon ${openDropdown === title ? "rotate" : ""}`} />
              </button>
              <div className={`nav-dropdown-menu ${openDropdown === title ? "open" : ""}`}>
                {links.map((link) => (
                  <Link
                    key={link}
                    to={`/${title.toLowerCase().replace(/\s+/g, "-")}/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="nav-dropdown-item"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link to="/pricing" className={`nav-link ${location.pathname === "/pricing" ? "active" : ""}`}>
            Pricing
          </Link>
          <Link to="/resources" className={`nav-link ${location.pathname === "/resources" ? "active" : ""}`}>
            Resources
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/register" className="nav-btn-signup">
            <FiUser className="btn-icon" /> Sign up
          </Link>
          <Link to="/login" className="nav-btn-login">
            <FiUser className="btn-icon" /> Login
          </Link>
          <button
            type="button"
            className="navbar-hamburger"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar-mobile-overlay ${isMobileOpen ? "open" : ""}`} onClick={() => setIsMobileOpen(false)} />
      <div className={`navbar-mobile-menu ${isMobileOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <img src={brandLogo} alt="MediConnect" className="navbar-brand-logo mobile-brand-logo" />
          <button className="mobile-close-btn" onClick={() => setIsMobileOpen(false)} aria-label="Close menu">
            <FiX />
          </button>
        </div>

        <div className="mobile-links-container">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Home</Link>

          {Object.entries(NAV_DROPDOWNS).map(([title, links]) => (
            <div key={title} className="mobile-nav-expandable-wrapper">
              <button
                type="button"
                className="mobile-nav-expandable"
                onClick={() => setOpenMobileAccordion(openMobileAccordion === title ? null : title)}
                aria-expanded={openMobileAccordion === title}
              >
                {title}
                <FiChevronDown className={`accordion-icon ${openMobileAccordion === title ? "rotate" : ""}`} />
              </button>
              <div className={`mobile-accordion-content ${openMobileAccordion === title ? "open" : ""}`}>
                {links.map((link) => (
                  <Link
                    key={link}
                    to={`/${title.toLowerCase().replace(/\s+/g, "-")}/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="mobile-sublink"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link to="/pricing" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Pricing</Link>
          <Link to="/resources" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Resources</Link>
        </div>

        <div className="mobile-menu-footer">
          <Link to="/login" className="mobile-btn-secondary" onClick={() => setIsMobileOpen(false)}>Login</Link>
          <Link to="/register" className="mobile-btn-primary" onClick={() => setIsMobileOpen(false)}>
            Sign up <FiArrowRight />
          </Link>
        </div>
      </div>
    </nav>
  );
}
