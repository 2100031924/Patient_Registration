import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const CustomSelect = ({
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

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
};

export default CustomSelect;
