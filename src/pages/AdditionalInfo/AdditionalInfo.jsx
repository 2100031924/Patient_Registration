import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import { useEffect, useState } from "react";
import { FiPhone, FiChevronDown } from "react-icons/fi";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import "./AdditionalInfo.css";

export default function AdditionalInfo() {
  const navigate = useNavigate();
  const { formData, updateForm, markStepComplete } = useForm();

  const [touched, setTouched] = useState({
    height: false,
    weight: false,
    bloodPressure: false,
    bloodSugar: false,
    physicalActivity: false,
    dietaryPreference: false,
    smoking: false,
    alcohol: false,
    emergencyRelationship: false,
    emergencyContact: false,
  });

  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const errors = {};

  const heightUnit = formData.heightUnit || "cm";
  if (formData.height) {
    const h = parseFloat(formData.height);
    if (isNaN(h)) {
      errors.height = "Please enter a valid height value.";
    } else if (heightUnit === "cm") {
      if (h < 50 || h > 250) {
        errors.height = "Height should be between 50 cm and 250 cm.";
      }
    } else if (heightUnit === "ft") {
      if (h < 1 || h > 8) {
        errors.height = "Height should be between 1 ft and 8 ft.";
      }
    }
  }

  const weightUnit = formData.weightUnit || "kg";
  if (formData.weight) {
    const w = parseFloat(formData.weight);
    if (isNaN(w)) {
      errors.weight = "Please enter a valid weight value.";
    } else if (weightUnit === "kg") {
      if (w < 2 || w > 500) {
        errors.weight = "Weight should be between 2 kg and 500 kg.";
      }
    } else if (weightUnit === "lb") {
      if (w < 5 || w > 1100) {
        errors.weight = "Weight should be between 5 lb and 1100 lb.";
      }
    }
  }

  if (formData.bloodPressure) {
    const bpRegex = /^\d{2,3}\/\d{2,3}$/;
    if (!bpRegex.test(formData.bloodPressure.trim())) {
      errors.bloodPressure = "Enter blood pressure in the format: 120/80 mmHg.";
    } else {
      const [sys, dia] = formData.bloodPressure.split("/").map((num) => parseInt(num.trim(), 10));
      if (sys < 50 || sys > 250 || dia < 30 || dia > 150) {
        errors.bloodPressure = "Please enter a realistic blood pressure value.";
      }
    }
  }

  if (formData.bloodSugar) {
    const bs = parseFloat(formData.bloodSugar);
    if (isNaN(bs)) {
      errors.bloodSugar = "Please enter a valid blood sugar value.";
    } else if (bs < 0) {
      errors.bloodSugar = "Blood sugar cannot be negative.";
    } else if (bs > 500) {
      errors.bloodSugar = "Please verify the blood sugar value entered.";
    }
  }

  if (!formData.physicalActivity) {
    errors.physicalActivity = "Please select your activity level.";
  }
  if (!formData.dietaryPreference) {
    errors.dietaryPreference = "Please select a valid dietary preference.";
  }
  if (!formData.smoking) {
    errors.smoking = "Please select a valid smoking status.";
  }
  if (!formData.alcohol) {
    errors.alcohol = "Please select a valid alcohol consumption preference.";
  }
  if (!formData.emergencyRelationship) {
    errors.emergencyRelationship = "Please select your relationship with the emergency contact.";
  }

  if (!formData.emergencyContact || formData.emergencyContact.trim() === "") {
    errors.emergencyContact = "Emergency contact number is required.";
  } else {
    const cleanPhone = formData.emergencyContact.replace(/\D/g, "");
    const cleanUserPhone = formData.phone ? formData.phone.replace(/\D/g, "") : "";

    if (cleanPhone.length !== 10) {
      errors.emergencyContact = "Please enter a valid 10-digit mobile number.";
    } else if (cleanUserPhone && cleanPhone === cleanUserPhone) {
      errors.emergencyContact = "Emergency contact should be different from your mobile number.";
    }
  }

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    markStepComplete("/register/additional-info", isValid);
  }, [isValid, markStepComplete]);

  const physicalActivityOptions = [
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active",
    "Highly Active"
  ];

  const dietaryPreferenceOptions = [
    "No Preference",
    "Vegetarian",
    "Vegan",
    "Eggetarian",
    "Pescatarian",
    "Non-Vegetarian",
    "Other"
  ];

  const smokingOptions = [
    "Never Smoked",
    "Former Smoker",
    "Occasional Smoker",
    "Regular Smoker",
    "Prefer Not to Say"
  ];

  const alcoholOptions = [
    "Never",
    "Occasionally",
    "Monthly",
    "Weekly",
    "Frequently",
    "Prefer Not to Say"
  ];

  const emergencyRelationshipOptions = [
    "Parent",
    "Spouse",
    "Sibling",
    "Child",
    "Relative",
    "Friend",
    "Caregiver",
    "Guardian",
    "Other"
  ];

  return (
    <div className="additional-container">
      <div className="additional-grid">
        <div className="field">
          <label>Height</label>
          <div className={`unit-field ${touched.height && errors.height ? "error" : ""}`}>
            <input
              type="text"
              name="height"
              placeholder="Enter height"
              value={formData.height || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="unit-select-container">
              <div className="chevron-circle">
                <FiChevronDown className="unit-chevron" />
              </div>
              <span className="unit-display-text">{heightUnit}</span>
              <select
                name="heightUnit"
                value={heightUnit}
                onChange={handleChange}
                className="hidden-unit-select"
              >
                <option value="cm">cm</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>
          {touched.height && errors.height && (
            <span className="error-message">{errors.height}</span>
          )}
        </div>

        <div className="field">
          <label>Weight</label>
          <div className={`unit-field ${touched.weight && errors.weight ? "error" : ""}`}>
            <input
              type="text"
              name="weight"
              placeholder="Enter weight"
              value={formData.weight || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="unit-select-container">
              <div className="chevron-circle">
                <FiChevronDown className="unit-chevron" />
              </div>
              <span className="unit-display-text">{weightUnit}</span>
              <select
                name="weightUnit"
                value={weightUnit}
                onChange={handleChange}
                className="hidden-unit-select"
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>
          {touched.weight && errors.weight && (
            <span className="error-message">{errors.weight}</span>
          )}
        </div>

        <div className="field">
          <label>Blood Pressure (if Known)</label>
          <div className={`unit-field ${touched.bloodPressure && errors.bloodPressure ? "error" : ""}`}>
            <input
              type="text"
              name="bloodPressure"
              placeholder="Enter Blood Pressure (If Known), e.g. 120/80"
              value={formData.bloodPressure || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="static-unit"><span>mmHg</span></div>
          </div>
          {touched.bloodPressure && errors.bloodPressure && (
            <span className="error-message">{errors.bloodPressure}</span>
          )}
        </div>

        <div className="field">
          <label>Blood Sugar (if Known)</label>
          <div className={`unit-field ${touched.bloodSugar && errors.bloodSugar ? "error" : ""}`}>
            <input
              type="text"
              name="bloodSugar"
              placeholder="Enter Blood Sugar (If Known), e.g. 90"
              value={formData.bloodSugar || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="static-unit"><span>mg/dL</span></div>
          </div>
          {touched.bloodSugar && errors.bloodSugar && (
            <span className="error-message">{errors.bloodSugar}</span>
          )}
        </div>

        <div className="field">
          <label>Physical Activity Level</label>
          <CustomDropdown
            label="Physical Activity Level"
            name="physicalActivity"
            options={physicalActivityOptions}
            value={formData.physicalActivity || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.physicalActivity && errors.physicalActivity}
          />
          {touched.physicalActivity && errors.physicalActivity && (
            <span className="error-message">{errors.physicalActivity}</span>
          )}
        </div>

        <div className="field">
          <label>Dietary Preference</label>
          <CustomDropdown
            label="Dietary Preference"
            name="dietaryPreference"
            options={dietaryPreferenceOptions}
            value={formData.dietaryPreference || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dietaryPreference && errors.dietaryPreference}
          />
          {touched.dietaryPreference && errors.dietaryPreference && (
            <span className="error-message">{errors.dietaryPreference}</span>
          )}
        </div>

        <div className="field">
          <label>Smoking Status</label>
          <CustomDropdown
            label="Smoking Status"
            name="smoking"
            options={smokingOptions}
            value={formData.smoking || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.smoking && errors.smoking}
          />
          {touched.smoking && errors.smoking && (
            <span className="error-message">{errors.smoking}</span>
          )}
        </div>

        <div className="field">
          <label>Alcohol Consumption</label>
          <CustomDropdown
            label="Alcohol Consumption"
            name="alcohol"
            options={alcoholOptions}
            value={formData.alcohol || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.alcohol && errors.alcohol}
          />
          {touched.alcohol && errors.alcohol && (
            <span className="error-message">{errors.alcohol}</span>
          )}
        </div>

        <div className="field">
          <label>Emergency Contact Relationship <span className="required">*</span></label>
          <CustomDropdown
            label="Relationship"
            name="emergencyRelationship"
            options={emergencyRelationshipOptions}
            value={formData.emergencyRelationship || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.emergencyRelationship && errors.emergencyRelationship}
          />
          {touched.emergencyRelationship && errors.emergencyRelationship && (
            <span className="error-message">{errors.emergencyRelationship}</span>
          )}
        </div>

        <div className="field">
          <label>Emergency Contact Number <span className="required">*</span></label>
          <div className={`input-wrap ${touched.emergencyContact && errors.emergencyContact ? "error" : ""}`}>
            <FiPhone className="input-icon" />
            <input
              type="text"
              name="emergencyContact"
              placeholder="+91 98765 43210"
              value={formData.emergencyContact || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.emergencyContact && errors.emergencyContact && (
            <span className="error-message">{errors.emergencyContact}</span>
          )}
        </div>
      </div>

      <div className="footer-actions">
          <button className="secondary-skip-btn" onClick={() => navigate("/register/medical-history")}>Skip for now</button>
        <div className="right-group">
          <button className="plain-back-btn" onClick={() => navigate("/register")}>Go Back</button>
          <button
            className="primary-dark-btn"
            disabled={!isValid}
            onClick={() => navigate("/register/medical-history")}
          >
            Add Medical History
          </button>
        </div>
      </div>
    </div>
  );
}
