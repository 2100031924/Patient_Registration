import { FiPhone, FiUser } from "react-icons/fi";
import "./EmergencyContact.css";

const relationships = [
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

export default function EmergencyContact({ formData, errors, touched, handleChange, handleBlur }) {
  return (
    <div className="emergency-grid">
      <div className="field">
        <label>Full Name <span className="required">*</span></label>
        <div className={`input-wrap ${touched?.emergencyName && errors?.emergencyName ? "error" : ""}`}>
          <FiUser className="input-icon" />
          <input
            type="text"
            name="emergencyName"
            placeholder="Emergency contact name"
            value={formData.emergencyName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched?.emergencyName && errors?.emergencyName && <span className="error-message">{errors.emergencyName}</span>}
      </div>

      <div className="field">
        <label>Relationship <span className="required">*</span></label>
        <div className={`input-wrap ${touched?.emergencyRelationship && errors?.emergencyRelationship ? "error" : ""}`}>
          <select
            name="emergencyRelationship"
            value={formData.emergencyRelationship || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select relationship</option>
            {relationships.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        {touched?.emergencyRelationship && errors?.emergencyRelationship && (
          <span className="error-message">{errors.emergencyRelationship}</span>
        )}
      </div>

      <div className="field">
        <label>Phone Number <span className="required">*</span></label>
        <div className={`input-wrap ${touched?.emergencyPhone && errors?.emergencyPhone ? "error" : ""}`}>
          <FiPhone className="input-icon" />
          <input
            type="tel"
            name="emergencyPhone"
            placeholder="Emergency contact number"
            value={formData.emergencyPhone || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched?.emergencyPhone && errors?.emergencyPhone && <span className="error-message">{errors.emergencyPhone}</span>}
      </div>
    </div>
  );
}
