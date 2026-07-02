import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PortalLogoIcon from "../../icons/PortalLogoIcon";
import SupportIcon from "../../icons/SupportIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import UserIcon from "../../icons/UserIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import PillClockIcon from "../../icons/PillClockIcon";
import PillShieldIcon from "../../icons/PillShieldIcon";
import PillStarIcon from "../../icons/PillStarIcon";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import bannerImg from "../../assets/images/landing/image6.png";
import "./PatientLogin.css";

export default function PatientLogin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("phone");
  const [phone, setPhone] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [errors, setErrors] = useState({ phone: "", uniqueId: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input sanitization and formatting
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 10) {
      setPhone(rawValue);
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleUniqueIdChange = (e) => {
    const rawValue = e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toUpperCase();
    setUniqueId(rawValue);
    if (errors.uniqueId) setErrors((prev) => ({ ...prev, uniqueId: "" }));
  };

  // Advanced Validation Logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = { phone: "", uniqueId: "" };

    if (activeTab === "phone") {
      if (!phone) {
        newErrors.phone = "Phone number is required.";
        isValid = false;
      } else if (phone.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
        isValid = false;
      } else if (!/^[6-9]\d{9}$/.test(phone)) {
        newErrors.phone = "Indian mobile numbers must start with 6, 7, 8, or 9.";
        isValid = false;
      }
    } else {
      if (!uniqueId) {
        newErrors.uniqueId = "Unique ID is required.";
        isValid = false;
      } else if (uniqueId.length < 8) {
        newErrors.uniqueId = "Unique ID seems too short.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API Call / Async Operation before routing
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (activeTab === "phone") {
        navigate("/otp-verification", {
          state: { phoneNumber: `+91${phone}`, method: "phone" }
        });
      } else {
        navigate("/otp-verification", {
          state: { uniqueId: uniqueId, method: "id" }
        });
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [activeTab]: "Authentication service unavailable. Please try again."
      }));
      setIsSubmitting(false);
    }
  };

  // Disable button logic
  const isButtonDisabled = useMemo(() => {
    if (isSubmitting) return true;
    if (activeTab === "phone") return phone.length < 10;
    return uniqueId.length < 8;
  }, [activeTab, phone, uniqueId, isSubmitting]);

  return (
    <div className="patient-portal-layout">
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
        <div className="portal-banner-side">
          <div className="banner-header-group">
            <span className="banner-badge">AI-Powered Healthcare Ecosystem</span>
            <h1>One Secure Access for Every Healthcare User</h1>
            <p>
              Patients, Doctors, Hospital, Pharmacies, Laboratories, and Insurance
              providers connected through one intelligent healthcare ecosystem.
            </p>
          </div>

          <div className="banner-visual-wrapper">
            <img src={bannerImg} alt="Healthcare professional with senior patient" className="banner-illustration-img" />
            <div className="banner-illustration-gradient-overlay"></div>
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
                <PillShieldIcon className="pill-green-icon" />
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
        </div>

        <div className="portal-form-side">
          <div className="auth-container">
            <div className="auth-header">
              <h2>Welcome Back!</h2>
              <p>Continue securely using your phone number or Unique ID.</p>
            </div>

            <div className="login-method-selector">
              <span className="input-label-context">Login with</span>
              <div className="tabs-container-pill">
                <button
                  type="button"
                  onClick={() => setActiveTab("phone")}
                  className={`method-tab-btn ${activeTab === "phone" ? "active" : ""}`}
                >
                  <PhoneIcon />
                  Phone Number
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("id")}
                  className={`method-tab-btn ${activeTab === "id" ? "active" : ""}`}
                >
                  <UserIcon />
                  Unique ID
                </button>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="auth-form" noValidate>
              {activeTab === "phone" ? (
                <div className="form-group-wrapper">
                  <label htmlFor="patient-phone" className="input-label-element">Phone Number</label>
                  <div className={`phone-input-combined ${errors.phone ? "has-error" : ""}`}>
                    <div className="country-dropdown-sim">
                      <span className="country-flag">🇮🇳</span>
                      <span className="country-code-text">+91</span>
                      <ChevronDownIcon />
                    </div>
                    <div className="input-divider-line"></div>
                    <input
                      id="patient-phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      maxLength={10}
                      className="nested-input-field"
                    />
                  </div>
                  {errors.phone && <span className="input-error-message">{errors.phone}</span>}
                </div>
              ) : (
                <div className="form-group-wrapper">
                  <label htmlFor="patient-id" className="input-label-element">Unique ID</label>
                  <div className={`input-container-unified ${errors.uniqueId ? "has-error" : ""}`}>
                    <input
                      id="patient-id"
                      type="text"
                      placeholder="Enter Unique ID"
                      value={uniqueId}
                      onChange={handleUniqueIdChange}
                      required
                      className="standalone-input-field"
                    />
                  </div>
                  {errors.uniqueId && <span className="input-error-message">{errors.uniqueId}</span>}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit-cta"
                disabled={isButtonDisabled}
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Verifying...
                  </>
                ) : "Continue"}
              </button>
            </form>

            <p className="signup-redirect-link">
              Don't have an account? <a href="/patient-signup">Sign up</a>
            </p>

            <p className="auth-consent-disclaimer">
              By continuing, you agree to receive updates from the MediConnect team and confirm that you have read, understood, and agree to MediConnect's <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a>.
            </p>

            <div className="compliance-trust-box">
              <div className="compliance-icon-left"><ShieldIcon /></div>
              <div className="compliance-details-right">
                <h4>Secure & HIPAA Ready</h4>
                <p>Your healthcare information is protected with enterprise grade encryption and secure authentication.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="portal-page-footer">
        <p>&copy; 2026 MediConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
