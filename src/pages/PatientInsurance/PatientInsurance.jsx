import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import "./PatientInsurance.css";
import {
  FiShield,
  FiUser,
  FiCheckCircle
} from "react-icons/fi";

export default function PatientInsurance() {
  const navigate = useNavigate();
  const { formData, updateForm } = useForm();
  const hasInsurance = formData.hasInsurance;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Patient Insurance</h2>
        <p>Let us know if you have an active health insurance plan.</p>
      </div>

      <div className="insurance-decision">
        <p className="insurance-question">Do you have health insurance?</p>

        <div className="insurance-options">
          <div
            className={`insurance-card ${hasInsurance === true ? "selected" : ""}`}
            onClick={() => updateForm({ hasInsurance: true })}
          >
            <FiShield className="insurance-card-icon" />
            <h3>Yes, I have insurance</h3>
            <p>I have an active health insurance policy</p>
          </div>

          <div
            className={`insurance-card ${hasInsurance === false ? "selected" : ""}`}
            onClick={() => updateForm({ hasInsurance: false })}
          >
            <FiUser className="insurance-card-icon" />
            <h3>No, I don't have insurance</h3>
            <p>I will pay for medical expenses out-of-pocket</p>
          </div>
        </div>

        {hasInsurance === false && (
          <div className="no-insurance-info">
            <FiCheckCircle className="info-icon" />
            <p>
              You've selected that you don't have insurance. You can still proceed
              with registration. Our team will discuss payment options with you.
            </p>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="back-btn" onClick={() => navigate("/insurance")}>Back</button>
        <button
          disabled={hasInsurance === null}
          className={`continue-btn ${hasInsurance !== null ? "active" : ""}`}
          onClick={() => navigate("/health-records")}
        >
          {hasInsurance === true ? "Add Insurance Details" : "Continue Without Insurance"}
        </button>
      </div>
    </div>
  );
}
