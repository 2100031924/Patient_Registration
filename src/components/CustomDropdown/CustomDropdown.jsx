import useSearchableDropdown from "../../hooks/useSearchableDropdown";
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
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <div
        className={`custom-dropdown-trigger ${isOpen ? "open" : ""} ${error ? "error" : ""}`}
          onClick={toggleDropdown}
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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
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
                      onClick={() => selectOption(option)}
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
