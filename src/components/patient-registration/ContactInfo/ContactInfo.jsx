import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./ContactInfo.css";

export default function ContactInfo({ formData, errors, touched, handleChange, handleBlur }) {
  return (
    <div className="contact-grid">
      <div className="field">
        <label>Phone Number <span className="required">*</span></label>
        <div className={`input-wrap ${touched?.phone && errors?.phone ? "error" : ""}`}>
          <FiPhone className="input-icon" />
          <input
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={formData.phone || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched?.phone && errors?.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="field">
        <label>Email Address</label>
        <div className={`input-wrap ${touched?.email && errors?.email ? "error" : ""}`}>
          <FiMail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched?.email && errors?.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="field full-width">
        <label>Address</label>
        <div className={`input-wrap ${touched?.address && errors?.address ? "error" : ""}`}>
          <FiMapPin className="input-icon" />
          <input
            type="text"
            name="address"
            placeholder="Street address"
            value={formData.address || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {touched?.address && errors?.address && <span className="error-message">{errors.address}</span>}
      </div>
    </div>
  );
}
