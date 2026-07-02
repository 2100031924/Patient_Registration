import React, { useState, useMemo, useCallback, useRef } from "react";
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

  const inputRef = useRef(null);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Advanced password rules definition
  const rules = useMemo(() => [
    { id: "length", label: "8+ characters", test: (v) => v.length >= 8 },
    { id: "upper", label: "Uppercase", test: (v) => /[A-Z]/.test(v) },
    { id: "lower", label: "Lowercase", test: (v) => /[a-z]/.test(v) },
    { id: "number", label: "Number", test: (v) => /[0-9]/.test(v) },
    { id: "special", label: "Special char", test: (v) => /[^A-Za-z0-9]/.test(v) },
  ], []);

  // Real-time validation check
  const passedRules = useMemo(() => rules.filter(rule => rule.test(password)), [password, rules]);
  const isPasswordValid = passedRules.length === rules.length;

  // Dynamic Strength Calculation
  const strength = useMemo(() => {
    if (!password) return 0;
    const score = passedRules.length + (password.length >= 12 ? 1 : 0);
    if (score <= 2) return 1; // Weak
    if (score <= 4) return 2; // Medium
    return 3; // Strong
  }, [password, passedRules.length]);

  const strengthMeta = [
    { label: "", color: "transparent" },
    { label: "Weak", color: "#ef4444" },
    { label: "Medium", color: "#f59e0b" },
    { label: "Strong", color: "#10b981" },
  ];

  // Hardware event detection: Caps Lock
  const handleKeyEvent = useCallback((e) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  }, []);

  const handleChange = (e) => {
    setPassword(e.target.value);
    if (authError) setAuthError("");
  };

  // Rate Limiting / Lockout Logic Simulation
  const triggerLockout = () => {
    setLockoutTimer(30); // 30 seconds lockout penalty
    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAttempts(0);
          setAuthError("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent action if locked out or invalid
    if (lockoutTimer > 0 || !isPasswordValid || isSubmitting) return;

    setIsSubmitting(true);
    setAuthError("");

    // Simulate Secure API Call Delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulated Auth Failure Logic for Demonstration
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 3) {
      setAuthError("Maximum attempts exceeded. Temporarily locked for security.");
      triggerLockout();
    } else {
      setAuthError(`Authentication failed. ${3 - newAttempts} attempt(s) remaining.`);
    }

    setIsSubmitting(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const isSubmitDisabled = isSubmitting || lockoutTimer > 0 || (password.length > 0 && !isPasswordValid);

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

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="form-group-wrapper">
                <label htmlFor="patient-password" className="input-label-element">Password</label>
                <div className={`password-input-combined ${authError ? "input-error-state" : ""}`}>
                  <input
                    ref={inputRef}
                    id="patient-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    onKeyDown={handleKeyEvent}
                    onKeyUp={handleKeyEvent}
                    required
                    className="nested-input-field"
                    aria-invalid={!!authError}
                    aria-describedby="password-error password-strength"
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

                {/* Caps Lock Warning */}
                {capsLockOn && (
                  <div className="caps-lock-warning">
                    <span className="warning-dot"></span>
                    Caps Lock is ON
                  </div>
                )}

                {/* Strength Meter & Validation Checklist */}
                {password.length > 0 && (
                  <div className="password-dynamic-feedback">
                    <div className="password-strength-meter" id="password-strength">
                      <div className="strength-bars">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`strength-bar ${strength >= i ? "active" : ""}`}
                            style={{ backgroundColor: strength >= i ? strengthMeta[strength].color : "" }}
                          ></div>
                        ))}
                      </div>
                      <span className="strength-label" style={{ color: strengthMeta[strength].color }}>
                        {strengthMeta[strength].label}
                      </span>
                    </div>

                    <div className="password-requirements">
                      {rules.map((rule) => {
                        const passed = rule.test(password);
                        return (
                          <div key={rule.id} className={`req-item ${passed ? "met" : ""}`}>
                            <span className="req-check">✓</span>
                            {rule.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Authentication Error Banner */}
                {authError && (
                  <div className="auth-error-banner" id="password-error" role="alert">
                    {authError} {lockoutTimer > 0 && `(${lockoutTimer}s)`}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="auth-submit-cta"
                disabled={isSubmitDisabled}
              >
                {isSubmitting ? (
                  <span className="btn-spinner"></span>
                ) : lockoutTimer > 0 ? (
                  `Locked (${lockoutTimer}s)`
                ) : (
                  "Continue"
                )}
              </button>
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
