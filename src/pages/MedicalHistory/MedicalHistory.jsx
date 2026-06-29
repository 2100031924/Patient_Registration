import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./MedicalHistory.css";

export default function MedicalHistory() {
  const navigate = useNavigate();
  const { formData, updateForm, markStepComplete } = useForm();

  const [newAllergyInput, setNewAllergyInput] = useState("");
  const [newConditionInput, setNewConditionInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 500) {
      updateForm({ [name]: value });
    }
  };

  const handleAddAllergyTag = (e) => {
    if (e.key === "Enter" && newAllergyInput.trim()) {
      e.preventDefault();
      const currentTags = formData.allergiesTags || [];
      const trimmedTag = newAllergyInput.trim();

      if (!currentTags.includes(trimmedTag)) {
        updateForm({
          allergiesTags: [...currentTags, trimmedTag]
        });
      }
      setNewAllergyInput("");
    }
  };

  const handleDeleteAllergyTag = (indexToRemove) => {
    const currentTags = formData.allergiesTags || [];
    updateForm({
      allergiesTags: currentTags.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleAddConditionTag = (e) => {
    if (e.key === "Enter" && newConditionInput.trim()) {
      e.preventDefault();
      const currentTags = formData.conditionsTags || [];
      const trimmedTag = newConditionInput.trim();

      if (!currentTags.includes(trimmedTag)) {
        updateForm({
          conditionsTags: [...currentTags, trimmedTag]
        });
      }
      setNewConditionInput("");
    }
  };

  const handleDeleteConditionTag = (indexToRemove) => {
    const currentTags = formData.conditionsTags || [];
    updateForm({
      conditionsTags: currentTags.filter((_, index) => index !== indexToRemove)
    });
  };

  useEffect(() => {
    markStepComplete("/medical-history", true);
  }, [markStepComplete]);

  const medicationsLength = (formData.medications || "").length;
  const surgeriesLength = (formData.surgeries || "").length;

  return (
    <div className="medical-history-container">
      <div className="history-form-grid">
        <div className="field full-width">
          <label>Allergies</label>
          <div className="textarea-wrapper">
            <textarea
              name="allergies"
              placeholder="List any allergies you have (If any)"
              value={formData.allergies || ""}
              onChange={handleChange}
            />

            <div className="tags-container">
              {(formData.allergiesTags || []).map((tag, idx) => (
                <span key={idx} className="medical-tag">
                  {tag}
                  <button
                    type="button"
                    className="delete-tag-btn"
                    onClick={() => handleDeleteAllergyTag(idx)}
                  >
                    <FiX />
                  </button>
                </span>
              ))}

              <input
                type="text"
                className="add-tag-inline-input"
                placeholder="+ Add tag (Press Enter)"
                value={newAllergyInput}
                onChange={(e) => setNewAllergyInput(e.target.value)}
                onKeyDown={handleAddAllergyTag}
              />
            </div>
          </div>
        </div>

        <div className="field full-width">
          <label>Current Medications</label>
          <div className="textarea-wrapper">
            <textarea
              name="medications"
              placeholder="List your current medications with dosage"
              value={formData.medications || ""}
              onChange={handleChange}
            />
            <div className="char-count">
              {500 - medicationsLength} Characters left
            </div>
          </div>
        </div>

        <div className="field full-width">
          <label>Existing Conditions</label>
          <div className="textarea-wrapper">
            <textarea
              name="conditions"
              placeholder="Enter any Conditions (e.g., diabetes, hypertension, asthma, etc.)"
              value={formData.conditions || ""}
              onChange={handleChange}
            />

            <div className="tags-container">
              {(formData.conditionsTags || []).map((tag, idx) => (
                <span key={idx} className="medical-tag">
                  {tag}
                  <button
                    type="button"
                    className="delete-tag-btn"
                    onClick={() => handleDeleteConditionTag(idx)}
                  >
                    <FiX />
                  </button>
                </span>
              ))}

              <input
                type="text"
                className="add-tag-inline-input"
                placeholder="+ Add condition (Press Enter)"
                value={newConditionInput}
                onChange={(e) => setNewConditionInput(e.target.value)}
                onKeyDown={handleAddConditionTag}
              />
            </div>
          </div>
        </div>

        <div className="field full-width">
          <label>Previous Surgeries</label>
          <div className="textarea-wrapper">
            <textarea
              name="surgeries"
              placeholder="Enter details of any past surgeries (If any)"
              value={formData.surgeries || ""}
              onChange={handleChange}
            />
            <div className="char-count">
              {500 - surgeriesLength} Characters left
            </div>
          </div>
        </div>
      </div>

      <div className="footer-actions">
        <button className="secondary-skip-btn" onClick={() => navigate("/insurance")}>
          Skip for now
        </button>
        <div className="right-group">
          <button className="plain-back-btn" onClick={() => navigate("/additional-info")}>
            Go Back
          </button>
          <button className="primary-dark-btn" onClick={() => navigate("/insurance")}>
            Add Insurance Information
          </button>
        </div>
      </div>
    </div>
  );
}
