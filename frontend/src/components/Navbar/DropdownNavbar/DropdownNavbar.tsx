import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

import ElementNavBar from "../ElementNavbar/ElementNavbar";

interface DropdownNavbarProps {
  title: string;
  subItems: {
    href: string;
    texts: string;
    page: string;
    className?: string;
  }[];
}

const DropdownNavbar: React.FC<DropdownNavbarProps> = ({ title, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { t } = useTranslation();
  const translatedTitle = t(`nav.${title}`);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <span className="dropdownTitle" onClick={toggleDropdown}>
        {translatedTitle}
        <FaChevronDown className={`icon ${isOpen ? "show" : ""}`} />
      </span>
      <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
        {subItems.map((subItem) => (
          <ElementNavBar
            key={subItem.href}
            href={subItem.href}
            texts={subItem.texts}
            page={subItem.page}
            className={subItem.className}
            onLinkClick={toggleDropdown}
          />
        ))}
      </div>
    </div>
  );
};

export default DropdownNavbar;
