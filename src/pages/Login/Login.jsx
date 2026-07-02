import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PortalLogoIcon from "../../icons/PortalLogoIcon";
import SupportIcon from "../../icons/SupportIcon";
import RolePatientIcon from "../../icons/RolePatientIcon";
import RoleDoctorIcon from "../../icons/RoleDoctorIcon";
import RoleHospitalIcon from "../../icons/RoleHospitalIcon";
import RoleLaboratoryIcon from "../../icons/RoleLaboratoryIcon";
import RolePharmacyIcon from "../../icons/RolePharmacyIcon";
import RoleInsuranceIcon from "../../icons/RoleInsuranceIcon";
import PillClockIcon from "../../icons/PillClockIcon";
import Pill100Icon from "../../icons/Pill100Icon";
import PillStarIcon from "../../icons/PillStarIcon";
import "./Login.css";

const ROLES = [
  {
    id: "Patient",
    title: "Patient",
    desc: "Book appointments, consult doctor, and manage your healthcare.",
    icon: <RolePatientIcon />
  },
  {
    id: "Doctor",
    title: "Doctor",
    desc: "Manage appointments, consultations, and patient care.",
    icon: <RoleDoctorIcon />
  },
  {
    id: "Hospital",
    title: "Hospital",
    desc: "Manage departments, staff, patients, and operations.",
    icon: <RoleHospitalIcon />
  },
  {
    id: "Laboratory",
    title: "Laboratory",
    desc: "Manage test requests, reports, and diagnostics.",
    icon: <RoleLaboratoryIcon />
  },
  {
    id: "Pharmacy",
    title: "Pharmacy",
    desc: "Manage prescriptions, inventory, and medicine orders.",
    icon: <RolePharmacyIcon />
  },
  {
    id: "Insurance Vendor",
    title: "Insurance Vendor",
    desc: "Manage policies, claims, approvals, and coverage.",
    icon: <RoleInsuranceIcon />
  }
];

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("Patient");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleRoleSelect = useCallback((roleId) => {
    setSelectedRole(roleId);
  }, []);

  const handleRoleKeydown = useCallback((e, roleId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRoleSelect(roleId);
    }
  }, [handleRoleSelect]);

  const handleContinue = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const targetRoute = selectedRole === "Patient" ? "/patient-login" : "/register";
    const transitionTimer = setTimeout(() => {
      navigate(targetRoute, {
        state: { role: selectedRole, fromPortal: true }
      });
    }, 450);

    return () => clearTimeout(transitionTimer);
  }, [isTransitioning, selectedRole, navigate]);

  return (
    <div className="portal-layout">
      <header className="portal-nav">
        <div className="portal-brand-block">
          <PortalLogoIcon />
          <div className="portal-brand-text">
            <span className="brand-main">MediConnect</span>
            <span className="brand-tag">Healthcare Ecosystem</span>
          </div>
        </div>
        <div className="portal-support-block">
          <SupportIcon />
          <div className="portal-support-text">
            <span className="support-label">Need Help?</span>
            <a href="#support" className="support-action">Contact Support</a>
          </div>
        </div>
      </header>

      <main className="portal-main-card">
        <aside className="portal-banner-side" aria-label="Platform Information">
          <div className="banner-header-group">
            <span className="banner-badge">AI-Powered Healthcare Ecosystem</span>
            <h1>One Secure Access for Every Healthcare User</h1>
            <p>
              Patients, Doctors, Hospital, Pharmacies, Laboratories, and Insurance
              providers connected through one intelligent healthcare ecosystem.
            </p>
          </div>

          <div className="banner-highlights-row">
            <div className="banner-pill-card">
              <div className="pill-card-top">
                <PillClockIcon className="pill-green-icon" />
                <span className="pill-card-title">24/7</span>
              </div>
              <span className="pill-card-subtitle">Healthcare Access</span>
            </div>

            <div className="banner-pill-card">
              <div className="pill-card-top">
                <Pill100Icon className="pill-green-icon" />
                <span className="pill-card-title">100%</span>
              </div>
              <span className="pill-card-subtitle">Encrypted Login</span>
            </div>

            <div className="banner-pill-card">
              <div className="pill-card-top">
                <PillStarIcon className="pill-green-icon" />
                <span className="pill-card-title">AI</span>
              </div>
              <span className="pill-card-subtitle">AI Enabled Platform</span>
            </div>
          </div>
        </aside>

        <section className="portal-selector-side" aria-label="Role Selection">
          <div className="selector-header">
            <h2>Welcome to MediConnect</h2>
            <p>Choose your account type to continue</p>
          </div>

          <div
            className="selector-grid"
            role="radiogroup"
            aria-label="Account types"
          >
            {ROLES.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleRoleSelect(role.id)}
                  onKeyDown={(e) => handleRoleKeydown(e, role.id)}
                  className={`selector-item-card ${isSelected ? "selected" : ""}`}
                >
                  <div className={`selector-icon-wrap ${isSelected ? "selected" : ""}`}>
                    {role.icon}
                  </div>
                  <div className="selector-card-text">
                    <h3>{role.title}</h3>
                    <p>{role.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className={`selector-submit-button ${isTransitioning ? "is-loading" : ""}`}
            onClick={handleContinue}
            disabled={isTransitioning}
            aria-busy={isTransitioning}
          >
            {isTransitioning ? (
              <span className="btn-loading-content">
                <span className="btn-spinner" aria-hidden="true"></span>
                Preparing secure session...
              </span>
            ) : (
              `Continue as ${selectedRole}`
            )}
          </button>
        </section>
      </main>

      <footer className="portal-page-footer">
        <p>&copy; 2026 MediConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
