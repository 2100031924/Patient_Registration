import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const CustomDropdown = ({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  error,
  placeholder = "Select"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onBlur) {
          onBlur({ target: { name } });
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur, name]);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearchQuery("");
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <div
        className={`custom-dropdown-trigger ${isOpen ? "open" : ""} ${error ? "error" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`selected-text ${!value ? "placeholder" : ""}`}>
          {value || placeholder}
        </span>
        <FiChevronDown className={`chevron-icon ${isOpen ? "rotated" : ""}`} />
      </div>

      {isOpen && (
        <div className="custom-dropdown-menu">
          <div className="dropdown-search-wrap">
            <div className="dropdown-search-inner">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder={`Search "${label}"`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="dropdown-options-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = value === option;
                return (
                  <div
                    key={option}
                    className={`dropdown-option ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                );
              })
            ) : (
              <div className="dropdown-no-results">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
