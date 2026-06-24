import "./Select.css";

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select",
  required = false,
  error
}) => {
  return (
    <div className={`select-field ${error ? "has-error" : ""}`}>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          return <option key={val} value={val}>{lbl}</option>;
        })}
      </select>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Select;
