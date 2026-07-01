import "./Input.css";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  disabled = false,
  error
}) => {
  return (
    <div className={`input-field ${error ? "has-error" : ""}`}>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className={`input-wrapper ${disabled ? "disabled" : ""}`}>
        {Icon && <Icon className="input-icon" />}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
