import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";

export default function SearchBar({ value, onChange, placeholder = "Search...", onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) onSearch(value);
  };

  return (
    <div className="search-bar-wrapper">
      <FiSearch className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
