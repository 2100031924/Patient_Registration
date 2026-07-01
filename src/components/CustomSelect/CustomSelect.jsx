import useSearchableDropdown from "../../hooks/useSearchableDropdown";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const highlightMatch = (text, search) => {
  if (!search) return text;
  const parts = String(text).split(new RegExp(`(${search})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <mark key={i} style={{ background: "transparent", fontWeight: 700 }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

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
    listRef,
    isOpen,
    searchValue,
    setSearchValue,
    filteredOptions,
    activeIndex,
    setActiveIndex,
    selectOption,
    toggleDropdown,
    handleKeyDown,
  } = useSearchableDropdown({ options, value, name, onChange, onBlur });

  const selectId = `select-${name}`;

  return (
    <div className="field" ref={dropdownRef}>
      <label htmlFor={selectId}>
        {label} <span className="required">*</span>
      </label>
      <div className="custom-dropdown-container">
        <div
          id={selectId}
          className={`select-wrap ${error ? "error" : ""} ${isOpen ? "active" : ""}`}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${selectId}-listbox`}
          aria-activedescendant={isOpen && filteredOptions[activeIndex] ? `${selectId}-option-${activeIndex}` : undefined}
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
                onClick={(e) => e.stopPropagation()} // Fixed missing propagation stop
                autoFocus
              />
            </div>
            <div className="options-list" ref={listRef} role="listbox" id={`${selectId}-listbox`}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, index) => {
                  const isSelected = value === opt;
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={opt}
                      id={`${selectId}-option-${index}`}
                      className={`dropdown-option ${isSelected ? "selected" : ""} ${isActive ? "active" : ""}`}
                      onClick={() => selectOption(opt)}
                      onMouseEnter={() => setActiveIndex(index)}
                      data-active={isActive}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {highlightMatch(opt, searchValue)}
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
