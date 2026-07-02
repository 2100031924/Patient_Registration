import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PortalLogoIcon from "../../icons/PortalLogoIcon";
import SupportIcon from "../../icons/SupportIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import ChevronDownIcon from "../../icons/ChevronDownIcon";
import PillClockIcon from "../../icons/PillClockIcon";
import PillShieldIcon from "../../icons/PillShieldIcon";
import PillStarIcon from "../../icons/PillStarIcon";
import bannerImg from "../../assets/images/landing/image6.png";
import "./PatientSignup.css";

const formatPhone = (val) => {
  const cleaned = val.replace(/\D/g, "").slice(0, 10);
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return "";
  const [, a, b, c] = match;
  let f = "";
  if (a) f += a;
  if (a?.length === 3) f += " ";
  if (b) f += b;
  if (b?.length === 3) f += " ";
  if (c) f += c;
  return f.trim();
};

export default function PatientSignup() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  const digits = phone.replace(/\D/g, "");
  const isPhoneValid = digits.length === 10 && !digits.startsWith("0") && !digits.startsWith("1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isPhoneValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulated network request for OTP generation
      await new Promise((resolve) => setTimeout(resolve, 1200));
      navigate("/otp-verification", { state: { phoneNumber: `+91${digits}` } });
    } catch (error) {
      setIsSubmitting(false);
      // Error handling logic here
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    setPhone(formatPhone(pastedData));
  };

  return (
    <div className="signup-portal-layout">
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
            <img src={bannerImg} alt="Healthcare" className="banner-illustration-img" />
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
              <h2>Create Account</h2>
              <p>Enter your phone number to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="signup-field-group">
                <label className="signup-field-label" htmlFor="signup-phone">Phone Number</label>
                <div
                  className={`signup-phone-input ${touched && !isPhoneValid ? "error" : ""} ${isPhoneValid ? "valid" : ""}`}
                >
                  <div className="signup-country-sim" aria-hidden="true">
                    <span className="signup-country-flag">🇮🇳</span>
                    <span className="signup-country-code">+91</span>
                    <ChevronDownIcon />
                  </div>
                  <div className="signup-input-divider"></div>
                  <input
                    ref={inputRef}
                    id="signup-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    onPaste={handlePaste}
                    onBlur={() => setTouched(true)}
                    maxLength={12}
                    className="signup-phone-field"
                    aria-label="Phone Number"
                    aria-invalid={touched && !isPhoneValid}
                    aria-describedby={touched && !isPhoneValid ? "phone-error" : undefined}
                    disabled={isSubmitting}
                  />
                </div>
                {touched && !isPhoneValid && (
                  <span id="phone-error" className="signup-error-message" role="alert">
                    Please enter a valid 10-digit mobile number.
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="signup-continue-btn"
                disabled={!isPhoneValid || isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-spinner" aria-hidden="true"></span>
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            <p className="signup-redirect-text">
              Already have an account?{" "}
              <a href="/patient-login" className="signup-redirect-link">
                Login
              </a>
            </p>

            <p className="signup-disclaimer-text">
              By continuing, you agree to receive updates from the MediConnect team and confirm that you have read, understood, and agree to MediConnect's <a href="#terms">Terms &amp; Conditions</a> and <a href="#privacy">Privacy Policy</a>.
            </p>

            <div className="signup-trust-box">
              <div className="signup-trust-icon"><ShieldIcon /></div>
              <div className="signup-trust-text">
                <h4>Secure &amp; HIPAA Ready</h4>
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
