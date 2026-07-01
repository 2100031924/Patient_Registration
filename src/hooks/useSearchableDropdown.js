import { useEffect, useMemo, useRef, useState } from "react";

export default function useSearchableDropdown({
  options = [],
  value = "",
  name,
  onChange,
  onBlur,
  closeOnOutsideClick = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!closeOnOutsideClick) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onBlur) {
          onBlur({ target: { name } });
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnOutsideClick, name, onBlur]);

  const filteredOptions = useMemo(
    () => options.filter((option) => option.toLowerCase().includes(searchValue.toLowerCase())),
    [options, searchValue]
  );

  const selectOption = (nextValue) => {
    onChange({ target: { name, value: nextValue } });
    setIsOpen(false);
    setSearchValue("");
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const openDropdown = () => {
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    if (isOpen && onBlur) {
      onBlur({ target: { name } });
    }
    setIsOpen((prev) => !prev);
  };

  return {
    dropdownRef,
    isOpen,
    searchValue,
    setSearchValue,
    filteredOptions,
    selectOption,
    closeDropdown,
    openDropdown,
    toggleDropdown,
    hasValue: Boolean(value),
  };
}