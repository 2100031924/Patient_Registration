// ================================================================================
// FILE: src/pages/PersonalInfo/PersonalInfo.jsx
// ================================================================================
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import { useEffect, useState, useRef } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiHeart,
  FiUserCheck,
  FiChevronDown,
  FiSearch
} from "react-icons/fi";
import "./PersonalInfo.css";

const states = [
  "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Goa", "Gujarat", "Haryana",
  "Karnataka", "Kerala", "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];
const bloodGroups = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-", "Don't Know"];
const cities = ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi", "Pune"];

// Reusable Searchable Custom Dropdown Component
function CustomSelect({
  label,
  name,
  value,
  options,
  placeholder,
  icon: Icon,
  error,
  errorMessage,
  onChange,
  onBlur
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          setIsOpen(false);
          onBlur({ target: { name } });
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, name, onBlur]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    if (isOpen) {
      onBlur({ target: { name } });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="field" ref={dropdownRef}>
      <label>
        {label} <span className="required">*</span>
      </label>
      <div className="custom-dropdown-container">
        <div
          className={`select-wrap ${error ? "error" : ""} ${isOpen ? "active" : ""}`}
          onClick={toggleDropdown}
        >
          {Icon && <Icon className="input-icon" />}
          <span className={`select-value ${!value ? "placeholder" : ""}`}>
            {value || placeholder}
          </span>
          <FiChevronDown className={`select-chevron ${isOpen ? "rotated" : ""}`} />
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="search-wrap">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder={`Search ${label}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <div className="options-list">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isSelected = value === opt;
                  return (
                    <div
                      key={opt}
                      className={`dropdown-option ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelect(opt)}
                    >
                      {opt}
                    </div>
                  );
                })
              ) : (
                <div className="no-options">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}

export default function PersonalInfo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { formData, updateForm, markStepComplete } = useForm();

  const [touched, setTouched] = useState({
    fullName: false,
    dob: false,
    gender: false,
    bloodGroup: false,
    state: false,
    city: false,
    email: false
  });

  const validateEmail = (email) => {
    if (!email) return true;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isValid =
    formData.fullName.trim() !== "" &&
    formData.dob !== "" &&
    formData.gender !== "" &&
    formData.bloodGroup !== "" &&
    formData.state !== "" &&
    formData.city !== "" &&
    validateEmail(formData.email);

  // Populate phone from URL query param, or set a demo number so the field isn't blank
  useEffect(() => {
    if (formData.phone) return; // already set
    const phoneFromUrl = searchParams.get("phone");
    updateForm({ phone: phoneFromUrl || "9876543210" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    markStepComplete("/", isValid);
  }, [isValid, markStepComplete]);

  return (
    <div className="personal-container">
      <div className="personal-grid">
        {/* Full Name */}
        <div className="field">
          <label>Full Name <span className="required">*</span></label>
          <div className={`input-wrap ${touched.fullName && !formData.fullName.trim() ? "error" : ""}`}>
            <FiUser className="input-icon" />
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.fullName && !formData.fullName.trim() && (
            <span className="error-message">Please enter your full name!</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="field">
          <label>Date of Birth <span className="required">*</span></label>
          <div className={`input-wrap ${touched.dob && !formData.dob ? "error" : ""}`}>
            <FiCalendar className="input-icon" />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.dob && !formData.dob && (
            <span className="error-message">Please select your date of birth!</span>
          )}
        </div>

        {/* Phone Number (Disabled) */}
        <div className="field">
          <label>Phone Number</label>
          <div className="input-wrap disabled">
            <FiPhone className="input-icon" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              disabled
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="field">
          <label>Email Address</label>
          <div className={`input-wrap ${touched.email && formData.email && !validateEmail(formData.email) ? "error" : ""}`}>
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email (optional)"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.email && formData.email && !validateEmail(formData.email) && (
            <span className="error-message">Enter a valid email address!</span>
          )}
        </div>

        {/* Gender */}
        <CustomSelect
          label="Gender"
          name="gender"
          value={formData.gender}
          options={genders}
          placeholder="Select your gender"
          icon={FiUserCheck}
          error={touched.gender && !formData.gender}
          errorMessage="Please select your gender!"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Blood Group */}
        <CustomSelect
          label="Blood Group"
          name="bloodGroup"
          value={formData.bloodGroup}
          options={bloodGroups}
          placeholder="Select your blood group"
          icon={FiHeart}
          error={touched.bloodGroup && !formData.bloodGroup}
          errorMessage="Please select your blood group!"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* State */}
        <CustomSelect
          label="State"
          name="state"
          value={formData.state}
          options={states}
          placeholder="Select state"
          icon={FiMapPin}
          error={touched.state && !formData.state}
          errorMessage="Please select your state!"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Current City */}
        <CustomSelect
          label="Current City"
          name="city"
          value={formData.city}
          options={cities}
          placeholder="Select your current city"
          icon={FiMapPin}
          error={touched.city && !formData.city}
          errorMessage="Please select your current city!"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {/* Warning Box */}
      <div className="validation-note">
        <span className="star-char">*</span>
        <span className="note-text">These fields are required!</span>
      </div>

      {/* Primary Action Button */}
      <div className="personal-actions">
        <button
          className="submit-step-btn"
          disabled={!isValid}
          onClick={() => navigate("/additional-info")}
        >
          Add Additional Information
        </button>
      </div>
    </div>
  );
}
