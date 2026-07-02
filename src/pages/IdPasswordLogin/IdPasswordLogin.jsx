import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortalLogoIcon from "../../icons/PortalLogoIcon";
import SupportIcon from "../../icons/SupportIcon";
import ChevronLeftIcon from "../../icons/ChevronLeftIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import EyeIcon from "../../icons/EyeIcon";
import EyeOffIcon from "../../icons/EyeOffIcon";
import PillClockIcon from "../../icons/PillClockIcon";
import PillShieldIcon from "../../icons/PillShieldIcon";
import PillStarIcon from "../../icons/PillStarIcon";
import bannerImg from "../../assets/images/landing/image6.png";
import "./IdPasswordLogin.css";

export default function IdPasswordLogin() {
  const navigate = useNavigate();
  const onBack = () => navigate(-1);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Authenticating Secure Workspace access...");
  };

  return (
    <div className="pwd-portal-layout">
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
            <div className="back-btn-container">
              <button onClick={onBack} className="back-nav-btn">
                <span className="back-icon-circle"><ChevronLeftIcon /></span>
                <span>Back</span>
              </button>
            </div>

            <div className="auth-header">
              <h2>Secure Access</h2>
              <p>Enter your password to continue securely to your healthcare workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group-wrapper">
                <label htmlFor="patient-password" className="input-label-element">Password</label>
                <div className="password-input-combined">
                  <input
                    id="patient-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="nested-input-field"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-cta">Continue</button>
            </form>

            <p className="reset-password-disclaimer">
              Forgot your password? <a href="#reset" className="reset-link">Reset here!</a>
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
