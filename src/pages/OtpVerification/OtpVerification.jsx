import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PortalLogoIcon from "../../icons/PortalLogoIcon";
import SupportIcon from "../../icons/SupportIcon";
import ChevronLeftIcon from "../../icons/ChevronLeftIcon";
import PencilIcon from "../../icons/PencilIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import PillClockIcon from "../../icons/PillClockIcon";
import PillShieldIcon from "../../icons/PillShieldIcon";
import PillStarIcon from "../../icons/PillStarIcon";
import bannerImg from "../../assets/images/landing/image6.png";
import "./OtpVerification.css";

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phoneNumber
    ? `+91 ${location.state.phoneNumber}`
    : "+91 1010 110 100";

  const onBack = () => navigate("/patient-login");
  const onEditPhone = () => navigate("/patient-login");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const startTimer = useCallback(() => {
    setTimer(30);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const triggerVerify = useCallback((code) => {
    if (code.length === 6 && !isVerifying) {
      setIsVerifying(true);
      // Simulate API Call for Verification
      setTimeout(() => {
        setIsVerifying(false);
        navigate("/register");
      }, 1000);
    }
  }, [isVerifying, navigate]);

  const handleResend = (e) => {
    e.preventDefault();
    if (!canResend || isResending) return;

    setIsResending(true);
    // Simulate API Call for Resend OTP
    setTimeout(() => {
      setIsResending(false);
      setOtp(new Array(6).fill("")); // Reset OTP fields
      inputRefs.current[0]?.focus();
      startTimer();
    }, 1000);
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    // Sanitize input to only keep numbers
    const sanitizedVal = val.replace(/\D/g, '');

    if (!sanitizedVal) return;

    const newOtp = [...otp];

    // Handle multi-digit rapid input natively (some mobile keyboards do this)
    if (sanitizedVal.length > 1) {
      let pasteIndex = index;
      for (let i = 0; i < sanitizedVal.length && pasteIndex < 6; i++, pasteIndex++) {
        newOtp[pasteIndex] = sanitizedVal[i];
      }
      setOtp(newOtp);

      const focusIndex = Math.min(pasteIndex, 5);
      inputRefs.current[focusIndex]?.focus();

      if (newOtp.join("").length === 6) {
        triggerVerify(newOtp.join(""));
      }
      return;
    }

    newOtp[index] = sanitizedVal.substring(sanitizedVal.length - 1);
    setOtp(newOtp);

    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-verify if last box is filled
    if (newOtp.join("").length === 6) {
      triggerVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        e.preventDefault(); // Prevent default to handle state manually
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
      // If current has value, default backspace will clear it via onChange handler naturally
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digitsOnly = pastedData.replace(/\D/g, ""); // Extract only digits

    if (!digitsOnly) return;

    const newOtp = [...otp];
    let currIndex = index;

    for (let i = 0; i < digitsOnly.length && currIndex < 6; i++, currIndex++) {
      newOtp[currIndex] = digitsOnly[i];
    }

    setOtp(newOtp);

    const focusIndex = Math.min(currIndex, 5);
    inputRefs.current[focusIndex]?.focus();

    if (newOtp.join("").length === 6) {
      triggerVerify(newOtp.join(""));
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length === 6) {
      triggerVerify(finalOtp);
    } else {
      // Focus the first empty input if manual submit is attempted with incomplete OTP
      const firstEmptyIndex = otp.findIndex((val) => val === "");
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
    }
  };

  return (
    <div className="otp-portal-layout">
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
              <p>We've sent a 6-digit verification code to your registered phone number.</p>
              <div className="phone-status-pill">
                <span className="phone-number-highlight">{phoneNumber}</span>
                <button type="button" onClick={onEditPhone} className="edit-phone-btn">
                  <PencilIcon />
                  <span>Edit</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleVerify} className="auth-form">
              <div className="otp-input-group">
                <label className="otp-input-label">OTP</label>
                <div className="otp-fields-row">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={data}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={(e) => handlePaste(e, index)}
                      disabled={isVerifying}
                      className={`otp-digit-field ${data ? "filled" : ""}`}
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  ))}
                </div>
                <span className="otp-status-message">We have sent you an OTP!</span>
              </div>

              <button
                type="submit"
                className="auth-submit-cta"
                disabled={isVerifying || otp.join("").length !== 6}
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <p className="resend-disclaimer">
              Didn't receive an OTP?{" "}
              {canResend ? (
                <a
                  href="#resend"
                  className={`resend-link ${isResending ? "disabled" : ""}`}
                  onClick={handleResend}
                >
                  {isResending ? "Sending..." : "Resend OTP!"}
                </a>
              ) : (
                <span className="resend-timer">Resend in 00:{timer.toString().padStart(2, "0")}</span>
              )}
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
