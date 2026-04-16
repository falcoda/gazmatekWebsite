import "./SearchBar.scss";

import { FiSearch, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  const { t } = useTranslation();

  return (
    <div className="searchBar">
      <FiSearch className="searchIcon" aria-hidden="true" />
      <input
        type="search"
        className="searchInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? t("artists.searchPlaceholder")}
        aria-label={placeholder ?? t("artists.searchPlaceholder")}
      />
      {value.length > 0 && (
        <button
          className="clearBtn"
          onClick={() => onChange("")}
          aria-label={t("artists.searchClear")}
          type="button"
        >
          <FiX aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
