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

// Advanced live phone formatting logic (US format example)
const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return "";

  const [, area, prefix, line] = match;
  let formatted = "";
  if (area) formatted += `(${area}`;
  if (area.length === 3) formatted += ") ";
  if (prefix) formatted += `${prefix}`;
  if (prefix.length === 3) formatted += "-";
  if (line) formatted += `${line}`;

  return formatted;
};

export default function EmergencyContact({ formData, errors, touched, handleChange, handleBlur }) {
  // Dynamic ARIA and error helper
  const getFieldProps = (name) => ({
    "aria-invalid": !!(touched?.[name] && errors?.[name]),
    "aria-describedby": touched?.[name] && errors?.[name] ? `${name}-error` : undefined,
  });

  const renderError = (name) => {
    if (touched?.[name] && errors?.[name]) {
      return (
        <span id={`${name}-error`} className="error-message" role="alert">
          {errors[name]}
        </span>
      );
    }
    return null;
  };

  // Intercept change for phone input to apply formatting before Formik handles it
  const handlePhoneChange = (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
    handleChange(e);
  };

  return (
    <div className="emergency-grid">
      <div className="field">
        <label htmlFor="emergencyName">Full Name <span className="required">*</span></label>
        <div className={`input-wrap ${touched?.emergencyName && errors?.emergencyName ? "error" : ""}`}>
          <FiUser className="input-icon" aria-hidden="true" />
          <input
            type="text"
            id="emergencyName"
            name="emergencyName"
            placeholder="Emergency contact name"
            value={formData.emergencyName || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            {...getFieldProps("emergencyName")}
          />
        </div>
        {renderError("emergencyName")}
      </div>

      <div className="field">
        <label htmlFor="emergencyRelationship">Relationship <span className="required">*</span></label>
        <div className={`input-wrap ${touched?.emergencyRelationship && errors?.emergencyRelationship ? "error" : ""}`}>
          <select
            id="emergencyRelationship"
            name="emergencyRelationship"
            value={formData.emergencyRelationship || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            {...getFieldProps("emergencyRelationship")}
          >
            <option value="" disabled>Select relationship</option>
            {relationships.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        {renderError("emergencyRelationship")}
      </div>

      <div className="field field-full">
        <label htmlFor="emergencyPhone">Phone Number <span className="required">*</span></label>
        <div className={`input-wrap ${touched?.emergencyPhone && errors?.emergencyPhone ? "error" : ""}`}>
          <FiPhone className="input-icon" aria-hidden="true" />
          <input
            type="tel"
            id="emergencyPhone"
            name="emergencyPhone"
            placeholder="(123) 456-7890"
            value={formData.emergencyPhone || ""}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            maxLength={14}
            inputMode="tel"
            autoComplete="tel"
            {...getFieldProps("emergencyPhone")}
          />
        </div>
        {renderError("emergencyPhone")}
      </div>
    </div>
  );
}
