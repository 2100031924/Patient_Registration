import { FiCheck, FiClipboard, FiHeart } from "react-icons/fi";
import { TbDna, TbAmbulance } from "react-icons/tb";
import image1 from "../../../assets/images/landing/image1.png";
import image2 from "../../../assets/images/landing/image2.png";
import image3 from "../../../assets/images/landing/image3.png";
import image4 from "../../../assets/images/landing/image4.png";
import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  return (
    <section className="whychoose-section">
      <div className="whychoose-container">

        {/* Header Section */}
        <div className="whychoose-header">
          <span className="section-label">WHY CHOOSE US?</span>
          <h2>Healthcare Powered by Intelligence</h2>
        </div>

        {/* Grid Layout */}
        <div className="whychoose-grid">

          {/* Card 1: AI Health Insights */}
          <div className="whychoose-card">
            <div className="whychoose-visual">
              <img src={image1} alt="AI Health Insights" className="card-image" />
            </div>

            <div className="whychoose-card-body">
              <div className="title-wrapper">
                <div className="icon-badge">
                  <TbDna className="card-icon" />
                </div>
                <h3>AI Health Insights</h3>
              </div>
              <p className="card-description">
                Receive personalized health recommendations and risk assessments.
              </p>
              <ul className="whychoose-points">
                <li><FiCheck className="check-icon" /> Instant symptom analysis</li>
                <li><FiCheck className="check-icon" /> Health risk assessment</li>
                <li><FiCheck className="check-icon" /> Personalized recommendations</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Connected Medical Records */}
          <div className="whychoose-card">
            <div className="whychoose-visual">
              <img src={image2} alt="Connected Medical Records" className="card-image" />
            </div>

            <div className="whychoose-card-body">
              <div className="title-wrapper">
                <div className="icon-badge">
                  <FiClipboard className="card-icon" />
                </div>
                <h3>Connected Medical Records</h3>
              </div>
              <p className="card-description">
                Access prescriptions, reports, and consultations from one place.
              </p>
              <ul className="whychoose-points">
                <li><FiCheck className="check-icon" /> All records in one place</li>
                <li><FiCheck className="check-icon" /> Easy access anytime</li>
                <li><FiCheck className="check-icon" /> 100% secure & private</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Secure Healthcare Network */}
          <div className="whychoose-card">
            <div className="whychoose-visual">
              <img src={image3} alt="Secure Healthcare Network" className="card-image" />
            </div>

            <div className="whychoose-card-body">
              <div className="title-wrapper">
                <div className="icon-badge">
                  <TbAmbulance className="card-icon" />
                </div>
                <h3>Secure Healthcare Network</h3>
              </div>
              <p className="card-description">
                Enterprise-grade security and privacy protection.
              </p>
              <ul className="whychoose-points">
                <li><FiCheck className="check-icon" /> Instant symptom analysis</li>
                <li><FiCheck className="check-icon" /> Health risk assessment</li>
                <li><FiCheck className="check-icon" /> Personalized recommendations</li>
              </ul>
            </div>
          </div>

          {/* Card 4: Continuous Care */}
          <div className="whychoose-card">
            <div className="whychoose-visual">
              <img src={image4} alt="Continuous Care" className="card-image" />
            </div>

            <div className="whychoose-card-body">
              <div className="title-wrapper">
                <div className="icon-badge">
                  <FiHeart className="card-icon" />
                </div>
                <h3>Continuous Care</h3>
              </div>
              <p className="card-description">
                From appointments to follow-ups and monitoring.
              </p>
              <ul className="whychoose-points">
                <li><FiCheck className="check-icon" /> Health tips & articles</li>
                <li><FiCheck className="check-icon" /> Lifestyle recommendations</li>
                <li><FiCheck className="check-icon" /> Connect with experts</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
