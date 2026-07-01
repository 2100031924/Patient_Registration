import { Link } from "react-router-dom";
import { FiYoutube, FiFacebook, FiLinkedin, FiArrowRight } from "react-icons/fi";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00a896" />
                    <stop offset="100%" stopColor="#028090" />
                  </linearGradient>
                </defs>
                <path
                  d="M17 31C17 31 2 21 2 11.5C2 6 6.5 2.5 11.5 2.5C14.5 2.5 16 4 17 5.5C18 4 19.5 2.5 22.5 2.5C27.5 2.5 32 6 32 11.5C32 21 17 31 17 31Z"
                  fill="url(#heartGradient)"
                />
                <path
                  d="M17 9V19M12 14H22"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="logo-meta">
                <span className="logo-text">MediConnect</span>
                <span className="logo-sub">Healthcare Ecosystem</span>
              </div>
            </Link>
            <p className="brand-desc">
              One Integrated platform for all your healthcare needs. Empowering hospitals, Doctors and patients with AI and Technology.
            </p>
          </div>

          {/* Platform Column */}
          <div className="footer-links-col">
            <h4>Platform</h4>
            <Link to="/hospital-management">Hospital Management</Link>
            <Link to="/telemedicine">Telemedicine</Link>
            <Link to="/pharmacy-system">Pharmacy System</Link>
            <Link to="/lab-management">Lab Management</Link>
            <Link to="/health-insurance">Health Insurance</Link>
            <Link to="/appointments">Appointment and Scheduling</Link>
            <Link to="/remote-monitoring">Remote monitoring</Link>
            <Link to="/ai-analytics">AI & Analytics</Link>
          </div>

          {/* Resources Column */}
          <div className="footer-links-col">
            <h4>Resources</h4>
            <Link to="/documentation">Documentation</Link>
            <Link to="/api-reference">API Reference</Link>
            <Link to="/integration">Integration</Link>
            <Link to="/case-studies">Case studies</Link>
          </div>

          {/* Company Column */}
          <div className="footer-links-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/press">Press</Link>
            <Link to="/partners">Partners</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          {/* Newsletter & Socials Column */}
          <div className="footer-newsletter-col">
            <h4>Newsletter</h4>
            <p className="newsletter-desc">Subscribe to get latest updates!</p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter Your Email ID" required />
              <button type="submit" aria-label="Subscribe">
                <FiArrowRight />
              </button>
            </form>

            <div className="social-wrap">
              <h4>Our Socials</h4>
              <div className="social-icons">
                {/* Modern X (formerly Twitter) Icon */}
                <a href="#twitter" aria-label="Twitter">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#youtube" aria-label="Youtube"><FiYoutube /></a>
                <a href="#facebook" aria-label="Facebook"><FiFacebook /></a>
                <a href="#linkedin" aria-label="LinkedIn"><FiLinkedin /></a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            @ 2026 Healthcare. All Rights Reserved. Privacy policy, Terms of Service, HIPAA Notice, Cookie Settings, Accessibility.
          </p>
        </div>
      </div>
    </footer>
  );
}
