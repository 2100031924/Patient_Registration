import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiUser, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-container">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5v14M9 12h6" />
            </svg>
          </div>
          <div className="brand-meta">
            <span className="brand-text">MediConnect</span>
            <span className="brand-subtext">Healthcare Ecosystem</span>
          </div>
        </Link>

        <div className="navbar-links-desktop">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <div className="nav-dropdown-trigger">
            Solutions <FiChevronDown className="nav-dropdown-icon" />
          </div>
          <div className="nav-dropdown-trigger">
            For Patients <FiChevronDown className="nav-dropdown-icon" />
          </div>
          <div className="nav-dropdown-trigger">
            For Providers <FiChevronDown className="nav-dropdown-icon" />
          </div>
          <Link to="/pricing" className="nav-link">
            Pricing
          </Link>
          <Link to="/resources" className="nav-link">
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
          >
            {isMobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar-mobile-overlay ${isMobileOpen ? "open" : ""}`} onClick={() => setIsMobileOpen(false)} />
      <div className={`navbar-mobile-menu ${isMobileOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <div className="brand-logo-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5v14M9 12h6" />
            </svg>
          </div>
          <span className="brand-text">MediConnect</span>
          <button className="mobile-close-btn" onClick={() => setIsMobileOpen(false)}>
            <FiX />
          </button>
        </div>
        <div className="mobile-links-container">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileOpen(false)}>Home</Link>
          <div className="mobile-nav-expandable">Solutions</div>
          <div className="mobile-nav-expandable">For Patients</div>
          <div className="mobile-nav-expandable">For Providers</div>
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
