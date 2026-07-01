import React from "react";
import "./Ecosystem.css";

const nodes = [
  {
    id: "patients",
    title: "Patients",
    subtitle: "Manage your health and access care",
    // Patient icon with badge outline matching reference image
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M16 11h6" />
      </svg>
    ),
  },
  {
    id: "doctors",
    title: "Doctors",
    subtitle: "Doctor care and consultations",
    // Clinical Doctor with stethoscope matching reference image
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 14v4" />
        <path d="M10 16.5h4" />
      </svg>
    ),
  },
  {
    id: "hospitals",
    title: "Hospitals",
    subtitle: "Streamline operations and patient care",
    // Clinical Medical Team avatar matching reference image
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "laboratories",
    title: "Laboratories",
    subtitle: "Accurate tests and timely reports",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 14v4" />
        <path d="M10 16.5h4" />
      </svg>
    ),
  },
  {
    id: "pharmacies",
    title: "Pharmacies",
    subtitle: "Dispense and deliver medicine with ease",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 14v4" />
        <path d="M10 16.5h4" />
      </svg>
    ),
  },
  {
    id: "insurance",
    title: "Insurance",
    subtitle: "Simplify policies and claims",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 14v4" />
        <path d="M10 16.5h4" />
      </svg>
    ),
  },
];

export default function Ecosystem() {
  return (
    <section className="eco-section">
      <div className="eco-container">
        {/* Header matched perfectly to reference image typography */}
        <div className="eco-header">
          <span className="section-label">ONE CONNECTED HEALTHCARE NETWORK</span>
          <h2>
            Built to connect every participant in the <br className="desktop-br" /> healthcare journey
          </h2>
          <p className="eco-subtitle">
            From booking to recovery, we make healthcare simple, accessible and personalized for you.
          </p>
        </div>

        {/* Dynamic Connected Node Map */}
        <div className="eco-flow-container">
          {nodes.map(({ id, title, subtitle, icon }, i) => (
            <React.Fragment key={id}>
              <div className="eco-node-wrapper">
                <div className="eco-node">
                  <div className="eco-node-circle-outer">
                    <div className="eco-node-icon">
                      {icon}
                    </div>
                  </div>
                  <div className="eco-node-text">
                    <h4>{title}</h4>
                    <p>{subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Ultra-fine Dotted Connector line rendering between nodes */}
              {i < nodes.length - 1 && (
                <div className="eco-flow-connector">
                  <div className="eco-dotted-line" />
                  <svg className="eco-connector-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Styled Centered Call To Action Button */}
        <div className="eco-cta-wrapper">
          <button className="eco-explore-btn">
            Explore Ecosystem
          </button>
        </div>
      </div>
    </section>
  );
}
