import { Link } from "react-router-dom";
import { FiCalendar, FiVideo } from "react-icons/fi";
import ctaImage from "../../../assets/images/doctors/image.png";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        {/* Left Side: Image with fading edge */}
        <div className="cta-visual">
          <img
            src={ctaImage}
            alt="Doctor consulting senior couple"
            className="cta-img"
          />
        </div>

        {/* Right Side: Copy & Stacked Buttons */}
        <div className="cta-content">
          <h2 className="cta-heading">Ready to take charge <br />of your health?</h2>
          <p className="cta-subheading">Book an appointment or consult a doctor online</p>

          <div className="cta-actions">
            <Link to="/register" className="cta-btn-primary">
              <FiCalendar className="btn-icon" /> Book Appointment
            </Link>
            <Link to="/consult" className="cta-btn-secondary">
              <FiVideo className="btn-icon" /> Consult Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
