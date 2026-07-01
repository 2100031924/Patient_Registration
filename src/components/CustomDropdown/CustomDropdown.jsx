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

  const dropdownId = `dropdown-${name}`;

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <div
        className={`custom-dropdown-trigger ${isOpen ? "open" : ""} ${error ? "error" : ""}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${dropdownId}-listbox`}
        aria-activedescendant={isOpen && filteredOptions[activeIndex] ? `${dropdownId}-option-${activeIndex}` : undefined}
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
                autoFocus
              />
            </div>
          </div>

          <div className="dropdown-options-list" ref={listRef} role="listbox" id={`${dropdownId}-listbox`}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = value === option;
                const isActive = activeIndex === index;
                return (
                  <div
                    key={option}
                    id={`${dropdownId}-option-${index}`}
                    className={`dropdown-option ${isSelected ? "selected" : ""} ${isActive ? "active" : ""}`}
                    onClick={() => selectOption(option)}
                    onMouseEnter={() => setActiveIndex(index)}
                    data-active={isActive}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {highlightMatch(option, searchValue)}
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
