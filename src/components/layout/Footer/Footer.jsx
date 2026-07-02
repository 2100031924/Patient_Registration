import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiYoutube, FiFacebook, FiLinkedin, FiArrowRight, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import FooterLogoIcon from "../../../icons/FooterLogoIcon";
import footerBrandLogo from "../../../assets/images/landing/image5.png";
import TwitterIcon from "../../../icons/TwitterIcon";
import "./Footer.css";

// Custom Hook: Intersection Observer for scroll reveal
const useScrollReveal = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // Animate only once
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

// Data Models for scalable link rendering
const FOOTER_LINKS = {
  platform: [
    { label: "Hospital Management", path: "/hospital-management" },
    { label: "Telemedicine", path: "/telemedicine" },
    { label: "Pharmacy System", path: "/pharmacy-system" },
    { label: "Lab Management", path: "/lab-management" },
    { label: "Health Insurance", path: "/health-insurance" },
    { label: "Appointment and Scheduling", path: "/appointments" },
    { label: "Remote monitoring", path: "/remote-monitoring" },
    { label: "AI & Analytics", path: "/ai-analytics" },
  ],
  resources: [
    { label: "Documentation", path: "/documentation" },
    { label: "API Reference", path: "/api-reference" },
    { label: "Integration", path: "/integration" },
    { label: "Case studies", path: "/case-studies" },
  ],
  company: [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Press", path: "/press" },
    { label: "Partners", path: "/partners" },
    { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/contact" },
  ],
};

const SOCIAL_LINKS = [
  { id: "twitter", label: "Twitter", Icon: TwitterIcon, customSize: 15, href: "#twitter" },
  { id: "youtube", label: "Youtube", Icon: FiYoutube, customSize: 18, href: "#youtube" },
  { id: "facebook", label: "Facebook", Icon: FiFacebook, customSize: 18, href: "#facebook" },
  { id: "linkedin", label: "LinkedIn", Icon: FiLinkedin, customSize: 18, href: "#linkedin" },
];

// Newsletter Form Component with State Machine
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // Simulate API Call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setMessage("Successfully subscribed! Check your inbox.");
      setEmail("");

      // Reset status after 4 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    } catch (err) {
      setStatus("error");
      setMessage("Subscription failed. Please try again later.");
    }
  };

  return (
    <div className="newsletter-wrapper">
      <form className="footer-newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Your Email ID"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          required
          aria-label="Email for newsletter subscription"
          className={status === "error" ? "input-error" : ""}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading" || status === "success"}
          className={status}
        >
          {status === "loading" ? <FiLoader className="spin-icon" /> :
           status === "success" ? <FiCheckCircle /> : <FiArrowRight />}
        </button>
      </form>

      {message && (
        <div className={`newsletter-message ${status}`} role="alert">
          {status === "error" ? <FiAlertCircle /> : <FiCheckCircle />}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  const [footerRef, isFooterVisible] = useScrollReveal({ threshold: 0.1 });
  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className={`footer ${isFooterVisible ? "footer-visible" : "footer-hidden"} no-print`}
    >
      <div className="footer-container">
        <div className="footer-grid">

          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="MediConnect Home">
              <img src={footerBrandLogo} alt="MediConnect" className="footer-brand-logo" />
            </Link>
            <p className="brand-desc">
              One Integrated platform for all your healthcare needs. Empowering hospitals, Doctors and patients with AI and Technology.
            </p>
          </div>

          {/* Platform Column */}
          <div className="footer-links-col">
            <h4>Platform</h4>
            {FOOTER_LINKS.platform.map((link) => (
              <Link key={link.path} to={link.path}>{link.label}</Link>
            ))}
          </div>

          {/* Resources Column */}
          <div className="footer-links-col">
            <h4>Resources</h4>
            {FOOTER_LINKS.resources.map((link) => (
              <Link key={link.path} to={link.path}>{link.label}</Link>
            ))}
          </div>

          {/* Company Column */}
          <div className="footer-links-col">
            <h4>Company</h4>
            {FOOTER_LINKS.company.map((link) => (
              <Link key={link.path} to={link.path}>{link.label}</Link>
            ))}
          </div>

          {/* Newsletter & Socials Column */}
          <div className="footer-newsletter-col">
            <h4>Newsletter</h4>
            <p className="newsletter-desc">Subscribe to get latest updates!</p>

            <NewsletterForm />

            <div className="social-wrap">
              <h4>Our Socials</h4>
              <div className="social-icons">
                {SOCIAL_LINKS.map(({ id, label, Icon, customSize, href }) => (
                  <a
                    key={id}
                    href={href}
                    aria-label={label}
                    className="social-link-wrapper"
                  >
                    <Icon size={customSize} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Healthcare. All Rights Reserved. Privacy policy, Terms of Service, HIPAA Notice, Cookie Settings, Accessibility.
          </p>
        </div>
      </div>
    </footer>
  );
}
