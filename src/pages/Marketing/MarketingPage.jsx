import { useLocation, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiHome,
  FiChevronRight,
  FiVideo,
  FiShield,
  FiClock,
  FiArrowRight,
  FiCheckCircle
} from "react-icons/fi";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import { useMemo, useEffect, memo, useState, useRef, Component } from "react";
import "./MarketingPage.css";

// Data-driven content map for all marketing pages
const PAGE_METADATA = {
  /* ---- Top-level pages ---- */
  "pricing": {
    title: "Pricing",
    subtitle: "Transparent plans for every healthcare need",
    badge: "PRICING",
    description: "Choose the right plan for your healthcare organization. From individual practitioners to large hospital networks, we have a solution that fits your needs.",
    sections: [
      { type: "grid", title: "Our Plans", items: [
        { name: "Starter", price: "$49/mo", features: ["Up to 100 patients", "Basic analytics", "Email support", "1 user"] },
        { name: "Professional", price: "$149/mo", features: ["Up to 500 patients", "Advanced analytics", "Priority support", "5 users"] },
        { name: "Enterprise", price: "Custom", features: ["Unlimited patients", "AI-powered insights", "24/7 dedicated support", "Unlimited users"] },
      ]},
      { type: "cta", title: "Need a custom solution?", buttonText: "Contact Sales", buttonLink: "/contact" }
    ]
  },
  "resources": {
    title: "Resources",
    subtitle: "Learn and grow with MediConnect",
    badge: "RESOURCES",
    description: "Access our comprehensive library of healthcare resources, guides, and documentation to help you get the most out of MediConnect.",
    sections: [
      { type: "list", title: "Featured Resources", items: [
        { name: "Getting Started Guide", desc: "Learn the basics of MediConnect platform" },
        { name: "Best Practices", desc: "Optimize your healthcare workflow" },
        { name: "Video Tutorials", desc: "Watch step-by-step tutorials" },
        { name: "Community Forum", desc: "Connect with other healthcare professionals" },
      ]}
    ]
  },

  /* ---- Solutions ---- */
  "solutions-telemedicine": {
    title: "Telemedicine",
    subtitle: "Virtual care, real connections",
    badge: "SOLUTIONS",
    description: "Deliver high-quality remote care with our HIPAA-compliant telemedicine platform. Secure video consultations, e-prescriptions, and integrated follow-ups.",
    sections: [
      {
        type: "features",
        title: "Platform Capabilities",
        items: [
          { icon: "video", title: "HD Video Consultations", desc: "Crystal clear, low-latency video optimized for medical environments." },
          { icon: "shield", title: "HIPAA Compliant", desc: "End-to-end encryption ensuring patient data security and privacy." },
          { icon: "clock", title: "Async Messaging", desc: "Secure messaging for follow-ups without requiring a live visit." }
        ]
      }
    ]
  },
  "solutions-ehr-integration": {
    title: "EHR Integration",
    subtitle: "Seamless data flow across systems",
    badge: "SOLUTIONS",
    description: "Connect your existing Electronic Health Records system with MediConnect for unified patient data management and real-time syncing.",
  },
  "solutions-analytics-&-reporting": {
    title: "Analytics & Reporting",
    subtitle: "Data-driven healthcare decisions",
    badge: "SOLUTIONS",
    description: "Leverage powerful analytics dashboards, patient outcome tracking, and customizable reports to improve care delivery and operational efficiency.",
  },

  /* ---- For Patients ---- */
  "for-patients-find-a-doctor": {
    title: "Find a Doctor",
    subtitle: "Discover the right specialist for you",
    badge: "FOR PATIENTS",
    description: "Search and connect with verified healthcare professionals across specialities. Read reviews, check availability, and book appointments instantly.",
  },
  "for-patients-patient-portal": {
    title: "Patient Portal",
    subtitle: "Your health at your fingertips",
    badge: "FOR PATIENTS",
    description: "Access your medical records, lab reports, prescriptions, and appointment history all in one secure place. Communicate with your care team anytime.",
  },
  "for-patients-health-records": {
    title: "Health Records",
    subtitle: "Secure, accessible, always",
    badge: "FOR PATIENTS",
    description: "Store and manage your complete health history — from immunization records to diagnostic reports. Share securely with any healthcare provider.",
  },

  /* ---- For Providers ---- */
  "for-providers-clinic-management": {
    title: "Clinic Management",
    subtitle: "Streamline your practice operations",
    badge: "FOR PROVIDERS",
    description: "Manage appointments, staff schedules, patient flow, and billing from a single dashboard. Reduce administrative overhead and focus on patient care.",
  },
  "for-providers-provider-scheduling": {
    title: "Provider Scheduling",
    subtitle: "Intelligent schedule optimization",
    badge: "FOR PROVIDERS",
    description: "Smart scheduling algorithms that optimize provider availability, reduce wait times, and maximize clinic efficiency with automated reminders.",
  },
  "for-providers-billing-&-claims": {
    title: "Billing & Claims",
    subtitle: "Simplified revenue cycle management",
    badge: "FOR PROVIDERS",
    description: "End-to-end billing and claims management with insurance verification, automated coding, and real-time claim tracking for faster reimbursements.",
  },
};

// Normalize strings for slug matching
const normalize = (str) => str.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9-]/g, "");

// Precompute normalized metadata map for O(1) lookup
const NORMALIZED_PAGE_METADATA = Object.keys(PAGE_METADATA).reduce((acc, key) => {
  acc[normalize(key)] = PAGE_METADATA[key];
  return acc;
}, {});

/**
 * Advanced path resolution logic.
 * Safely decodes URI, handles trailing slashes, normalizes special characters,
 * and attempts both exact and slug-normalized matching in O(1) time.
 */
const resolvePageMeta = (pathname = '') => {
  try {
    const cleanPath = decodeURIComponent(pathname).replace(/\/+$/, "");
    const parts = cleanPath.split("/").filter(Boolean);

    if (parts.length === 0) return null;

    const rawKey = parts.length === 1 ? parts[0] : `${parts[0]}-${parts.slice(1).join("-")}`;

    // 1. Attempt exact key match
    if (PAGE_METADATA[rawKey]) return PAGE_METADATA[rawKey];

    // 2. Fallback: Normalized slug match via precomputed map
    return NORMALIZED_PAGE_METADATA[normalize(rawKey)] || null;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[MarketingPage] Failed to resolve path: ${pathname}`, error);
    }
    return null;
  }
};

// --- Hooks ---

/**
 * Intersection Observer hook for performant scroll animations
 */
const useReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Unobserve after first reveal
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [ref, isVisible];
};

// --- Error Boundary for Section Rendering ---

class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[MarketingPage] Section Render Error:', error);
    }
  }

  render() {
    if (this.state.hasError) {
      return <div className="mp-section-error">Failed to load this section.</div>;
    }
    return this.props.children;
  }
}

// --- Memoized Layout & Section Components ---

const Reveal = memo(function Reveal({ children, delay = 0 }) {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className={`mp-reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
});

const GridSection = memo(function GridSection({ section }) {
  return (
    <div className="mp-section">
      <h3 className="mp-section-title">{section.title}</h3>
      <div className="mp-grid">
        {section.items.map((item, i) => (
          <div key={item.name || i} className="mp-card">
            <h4 className="mp-card-title">{item.name}</h4>
            {item.price && <span className="mp-card-price">{item.price}</span>}
            {item.features && (
              <ul className="mp-card-features">
                {item.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

const ListSection = memo(function ListSection({ section }) {
  return (
    <div className="mp-section">
      <h3 className="mp-section-title">{section.title}</h3>
      <div className="mp-list">
        {section.items.map((item, i) => (
          <div key={item.name || i} className="mp-list-item">
            <h4>{item.name}</h4>
            {item.desc && <p>{item.desc}</p>}
          </div>
        ))}
      </div>
    </div>
  );
});

const ICON_MAP = {
  video: FiVideo,
  shield: FiShield,
  clock: FiClock,
  check: FiCheckCircle
};

const FeaturesSection = memo(function FeaturesSection({ section }) {
  return (
    <div className="mp-section">
      <h3 className="mp-section-title">{section.title}</h3>
      <div className="mp-features">
        {section.items.map((item, i) => {
          const Icon = ICON_MAP[item.icon] || FiCheckCircle;
          return (
            <div key={item.title || i} className="mp-feature-card">
              <div className="mp-feature-icon">
                <Icon size={20} />
              </div>
              <h4 className="mp-feature-title">{item.title}</h4>
              {item.desc && <p className="mp-feature-desc">{item.desc}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
});

const CtaSection = memo(function CtaSection({ section }) {
  return (
    <div className="mp-cta">
      <h3>{section.title}</h3>
      <Link to={section.buttonLink} className="mp-cta-btn">
        {section.buttonText} <FiArrowRight />
      </Link>
    </div>
  );
});

// Extensible Registry Pattern for rendering dynamic sections
const SECTION_REGISTRY = {
  grid: GridSection,
  list: ListSection,
  features: FeaturesSection,
  cta: CtaSection
};

const PageSection = memo(function PageSection({ section }) {
  const Component = SECTION_REGISTRY[section.type];

  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[MarketingPage] Unknown section type: ${section.type}`);
    }
    return null;
  }

  return (
    <SectionErrorBoundary>
      <Component section={section} />
    </SectionErrorBoundary>
  );
});

const Breadcrumbs = memo(function Breadcrumbs({ meta }) {
  return (
    <nav className="mp-breadcrumb" aria-label="Breadcrumb">
      <Link to="/" aria-label="Home"><FiHome /></Link>
      <FiChevronRight className="mp-bread-sep" aria-hidden="true" />
      <span>{meta.badge || "Page"}</span>
      <FiChevronRight className="mp-bread-sep" aria-hidden="true" />
      <span className="mp-bread-current" aria-current="page">{meta.title}</span>
    </nav>
  );
});

export default function MarketingPage() {
  const location = useLocation();

  // Memoize metadata resolution to prevent unnecessary computations on re-renders
  const meta = useMemo(() => resolvePageMeta(location.pathname), [location.pathname]);

  // SPA Lifecycle: SEO Title Management, Scroll Restoration, and JSON-LD Injection
  useEffect(() => {
    document.title = meta ? `${meta.title} | MediConnect` : "MediConnect";

    // Instant scroll to top preventing native browser scroll restoration issues
    window.scrollTo(0, 0);

    let scriptElement = null;

    if (meta) {
      // Structured Data Injection for SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": meta.title,
        "description": meta.description,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": window.location.origin },
            { "@type": "ListItem", "position": 2, "name": meta.badge },
            { "@type": "ListItem", "position": 3, "name": meta.title, "item": window.location.href }
          ]
        }
      };

      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      scriptElement.text = JSON.stringify(structuredData);
      document.head.appendChild(scriptElement);
    }

    return () => {
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [meta, location.pathname]);

  if (!meta) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="mp-page">
          <div className="mp-container">
            <div className="mp-empty" aria-live="polite">
              <h2>Page Under Development</h2>
              <p>We're working on bringing you the best content for this page.</p>
              <Link to="/" className="mp-back-link"><FiArrowLeft /> Back to Home</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="mp-page">
        <div className="mp-container">
          <Breadcrumbs meta={meta} />

          <Reveal>
            <div className="mp-header">
              <span className="mp-badge">{meta.badge}</span>
              <h1>{meta.title}</h1>
              <p className="mp-subtitle">{meta.subtitle}</p>
            </div>

            <p className="mp-description">{meta.description}</p>
          </Reveal>

          {meta.sections && meta.sections.map((section, i) => (
            <Reveal key={`${section.type}-${i}`} delay={i * 100}>
              <PageSection section={section} />
            </Reveal>
          ))}

          {/* Fallback CTA if no sections are defined */}
          {(!meta.sections || meta.sections.length === 0) && (
            <Reveal delay={200}>
              <div className="mp-cta">
                <h3>Want to learn more about {meta.title}?</h3>
                <Link to="/contact" className="mp-cta-btn">
                  Get in Touch <FiArrowRight />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
