import { useState, useRef, useEffect, useMemo, useCallback } from "react";

const useSearchableDropdown = ({ options, value, name, onChange, onBlur }) => {
  const dropdownRef = useRef(null);
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    const lowerSearch = searchValue.toLowerCase();
    return options.filter((opt) =>
      String(opt).toLowerCase().includes(lowerSearch)
    );
  }, [options, searchValue]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        setSearchValue("");
        setActiveIndex(0);
      }
      return !prev;
    });
  }, []);

  const selectOption = useCallback(
    (option) => {
      if (onChange) onChange({ target: { name, value: option } });
      if (onBlur) onBlur({ target: { name, value: option } });
      setIsOpen(false);
    },
    [name, onChange, onBlur]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev + 1 >= filteredOptions.length ? 0 : prev + 1
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredOptions[activeIndex]) {
            selectOption(filteredOptions[activeIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          break;
      }
    },
    [isOpen, filteredOptions, activeIndex, selectOption]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [searchValue]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIndex, isOpen]);

  return {
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
  };
};

export default useSearchableDropdown;
