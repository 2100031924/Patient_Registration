import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import { FiCheck, FiX, FiAlertTriangle, FiEye, FiEyeOff, FiCopy } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import "./Review.css";

const generatedSuggestions = [
  "PAT-7GH381",
  "PAT-9A4B12",
  "PAT-3F8K90",
  "PAT-5M2P41",
  "PAT-6Y7T23",
  "PAT-1X8W92",
  "PAT-4K9L10"
];

export default function Review() {
  const navigate = useNavigate();
  const { formData, updateForm, markStepComplete, resetForm, isSubmitted, setIsSubmitted } = useForm();
  const [suggestions, setSuggestions] = useState(generatedSuggestions);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [takenIds, setTakenIds] = useState(() => {
    const saved = localStorage.getItem("mediConnect_taken_ids");
    return saved ? JSON.parse(saved) : ["9A4B12", "3F8K90"];
  });

  const isIdTaken = takenIds.includes(formData.patientId.toUpperCase());

  const handleRefreshSuggestions = () => {
    const scrambled = [...generatedSuggestions]
      .map(id => id === `PAT-${formData.patientId}` ? id : `PAT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
      .sort(() => 0.5 - Math.random());
    setSuggestions(scrambled);
  };

  const checks = {
    length: formData.password.length >= 8,
    lowercase: /[a-z]/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password),
    numberOrSymbol: /[\d!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordStrong = checks.length && checks.lowercase && checks.uppercase && checks.numberOrSymbol;
  const isMatch = formData.password === formData.confirmPassword && formData.password !== "";
  const isValidToSubmit = isPasswordStrong && isMatch && !isIdTaken;

  useEffect(() => {
    markStepComplete("/review", isValidToSubmit);
  }, [isValidToSubmit, markStepComplete]);

  const handleSuggestionSelect = (id) => {
    const segment = id.split("-")[1] || id;
    updateForm({ patientId: segment.toUpperCase() });
  };

  const handleIdChange = (e) => {
    const cleanVal = e.target.value.replace(/[^a-zA-Z0-9]/g, "").substring(0, 6).toUpperCase();
    updateForm({ patientId: cleanVal });
  };

  const handleSubmit = () => {
    const updatedTakenIds = [...takenIds, formData.patientId.toUpperCase()];
    setTakenIds(updatedTakenIds);
    localStorage.setItem("mediConnect_taken_ids", JSON.stringify(updatedTakenIds));
    setIsSubmitted(true);
  };

  const handleResetRegistration = () => {
    resetForm();
    navigate("/");
  };

  const copyPatientId = () => {
    navigator.clipboard.writeText(`PAT-${formData.patientId}`);
  };

  const getCriteriaState = (met) => {
    if (!formData.password) return "neutral";
    return met ? "met" : "unmet";
  };

  const isConfirmTouched = formData.confirmPassword.length > 0;
  const showConfirmMismatch = isConfirmTouched && formData.password !== formData.confirmPassword;

  if (isSubmitted) {
    return (
      <div className="success-wrapper">
        <div className="brand-header">
          <div className="logo-icon teal-bg">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
              <rect x="15" y="4" width="6" height="28" rx="3" fill="white" />
              <rect x="4" y="15" width="28" height="6" rx="3" fill="white" />
            </svg>
          </div>
          <div className="logo-text"><h3>MediConnect</h3><span>Healthcare Ecosystem</span></div>
        </div>
        <div className="success-card">
          <div className="success-badge">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#005d4e" />
            </svg>
          </div>
          <h2>Account Created Successfully!</h2>
          <p className="success-description">Your patient account has been created successfully. You can now access your healthcare dashboard and manage your records securely.</p>
          <div className="unique-id-section">
            <span className="section-label">Unique ID</span>
            <div className="id-block-row">
              <span className="id-prefix">PAT</span>
              <div className="id-boxes">{formData.patientId.split("").map((char, i) => <span key={i} className="char-box">{char}</span>)}</div>
              <button type="button" className="copy-action-btn" onClick={copyPatientId} aria-label="Copy Patient ID"><FiCopy /></button>
            </div>
          </div>
          <p className="email-notif-msg">Your unique ID has also been sent to <strong>{formData.email || "abcd123@gmail.com"}</strong></p>
          <div className="note-card">
            <span className="note-title">Note</span>
            <p className="note-body">Use this ID or your registered phone number to securely access your healthcare workspace.</p>
          </div>
          <div className="success-buttons">
            <button type="button" className="secondary-action-btn" onClick={handleResetRegistration}>View Profile</button>
            <button type="button" className="primary-teal-btn" onClick={handleResetRegistration}>Go to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div className="review-workflow-stack">
        {/* Unique Patient ID */}
        <div className="credential-section">
          <h3>Create Your Unique Patient ID</h3>
          <p className="desc-subtext">This ID will be used to access your health records and services securely</p>
          <div className="id-segment-card">
            <label className="id-segment-lbl">MediConnect ID</label>
            <div className={`id-blocks-wrapper ${isIdTaken ? "taken" : "available"}`}>
              <span className="prefix-block">PAT</span>
              <div className="digit-blocks">
                {formData.patientId.padEnd(6, " ").split("").map((char, i) => (
                  <input key={i} type="text" className="digit-block-input" value={char.trim()} onChange={handleIdChange} maxLength={6} placeholder="•" />
                ))}
              </div>
            </div>
            {/* Availability Notification */}
            {isIdTaken ? (
              <div className="availability-msg taken">
                <FiAlertTriangle className="status-icon" />
                <span>This ID is already taken</span>
              </div>
            ) : (
              <div className="availability-msg available">
                <FiCheck className="status-icon" />
                <span>PAT-{formData.patientId} is available</span>
              </div>
            )}
          </div>
          <div className="suggestions-bar">
            <div className="suggestions-header">
              <span>Suggestions</span>
              <button type="button" className="refresh-btn" onClick={handleRefreshSuggestions}><LuRefreshCw /><span>Refresh</span></button>
            </div>
            <div className="suggestion-tags">
              {suggestions.map((item) => (
                <button key={item} type="button" className={`suggestion-tag-btn ${`PAT-${formData.patientId}` === item ? "selected" : ""}`} onClick={() => handleSuggestionSelect(item)} >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Create Password */}
        <div className="credential-section">
          <h3>Create a strong password</h3>
          <p className="desc-subtext">Create a strong password with a mix of letters, numbers and symbols</p>
          <div className="password-fields-row">
            <div className="field">
              <label>Create New Password</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="**********" value={formData.password} onChange={(e) => updateForm({ password: e.target.value })} />
                <button type="button" className="eye-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <div className={`input-wrap ${showConfirmMismatch ? "error" : ""}`}>
                <svg className="input-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="**********" value={formData.confirmPassword} onChange={(e) => updateForm({ confirmPassword: e.target.value })} />
                <button type="button" className="eye-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {showConfirmMismatch && (
                <span className="error-message">Confirm password should be same as entered password!</span>
              )}
            </div>
          </div>
          <div className="password-strength-meter">
            <div className="meter-bars">
              <div className={`bar ${formData.password.length > 0 ? (isPasswordStrong ? "green" : "orange") : ""}`} />
            </div>
            <span className={`strength-label ${isPasswordStrong ? "strong" : "weak"}`}>
              {formData.password.length === 0 ? "" : (isPasswordStrong ? "Very Good" : "Weak")}
            </span>
          </div>
          {/* Verification Checklist */}
          <div className="criteria-checklist">
            <h5>Should Contain:</h5>
            <div className="criteria-list">
              <div className={`criteria-item ${getCriteriaState(checks.length)}`}>
                <span className="check-bullet">
                  {getCriteriaState(checks.length) === "met" ? <FiCheck /> : getCriteriaState(checks.length) === "unmet" ? <FiX /> : <FiCheck />}
                </span>
                <span>At least 8 Characters</span>
              </div>
              <div className={`criteria-item ${getCriteriaState(checks.lowercase)}`}>
                <span className="check-bullet">
                  {getCriteriaState(checks.lowercase) === "met" ? <FiCheck /> : getCriteriaState(checks.lowercase) === "unmet" ? <FiX /> : <FiCheck />}
                </span>
                <span>At least one small letter</span>
              </div>
              <div className={`criteria-item ${getCriteriaState(checks.uppercase)}`}>
                <span className="check-bullet">
                  {getCriteriaState(checks.uppercase) === "met" ? <FiCheck /> : getCriteriaState(checks.uppercase) === "unmet" ? <FiX /> : <FiCheck />}
                </span>
                <span>At least one capital letter</span>
              </div>
              <div className={`criteria-item ${getCriteriaState(checks.numberOrSymbol)}`}>
                <span className="check-bullet">
                  {getCriteriaState(checks.numberOrSymbol) === "met" ? <FiCheck /> : getCriteriaState(checks.numberOrSymbol) === "unmet" ? <FiX /> : <FiCheck />}
                </span>
                <span>At least one number or symbol</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-actions stretch-actions">
        <button type="button" className="plain-back-btn" onClick={() => navigate("/health-records")}>Go Back</button>
        <button type="button" className="primary-dark-btn wide-btn" disabled={!isValidToSubmit} onClick={handleSubmit}>Create Profile</button>
      </div>
    </div>
  );
}
