import useSearchableDropdown from "../../hooks/useSearchableDropdown";
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
  const {
    dropdownRef,
    isOpen,
    searchValue,
    setSearchValue,
    filteredOptions,
    selectOption,
    toggleDropdown,
  } = useSearchableDropdown({
    options,
    value,
    name,
    onChange,
    onBlur,
  });

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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
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
                      onClick={() => selectOption(opt)}
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
