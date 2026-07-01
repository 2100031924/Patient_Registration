import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <span className="brand-dot">✦</span> MediConnect
          </div>
          <div className="login-left-content">
            <h1>Welcome Back</h1>
            <p>Sign in to access your healthcare dashboard, manage appointments, and more.</p>
            <div className="login-left-features">
              <div className="left-feat">
                <span className="feat-num">01</span>
                <span>Book & manage appointments</span>
              </div>
              <div className="left-feat">
                <span className="feat-num">02</span>
                <span>Access health records</span>
              </div>
              <div className="left-feat">
                <span className="feat-num">03</span>
                <span>Consult doctors online</span>
              </div>
              <div className="left-feat">
                <span className="feat-num">04</span>
                <span>Track insurance claims</span>
              </div>
            </div>
          </div>
          <p className="login-footer-text">
            Don't have an account? <Link to="/register" className="login-link">Create one</Link>
          </p>
        </div>

        <div className="login-right">
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Sign In</h2>
            <p className="login-form-sub">Access your MediConnect account</p>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input id="email" type="email" placeholder="name@example.com" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input id="password" type={showPwd ? "text" : "password"} placeholder="Enter your password" />
                <button type="button" className="toggle-pwd" onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <button type="submit" className="login-submit-btn">
              Sign In <FiArrowRight />
            </button>

            <p className="login-or">Or continue with</p>

            <div className="social-login">
              <button type="button" className="social-btn google">Google</button>
              <button type="button" className="social-btn apple">Apple</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
