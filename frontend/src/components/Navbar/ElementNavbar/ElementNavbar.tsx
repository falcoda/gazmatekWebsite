import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch } from "react-router-dom";

import useAnimatedNavigate from "../../../hooks/useAnimatedNavigate";
import useAnimation from "../../../hooks/useAnimation";

interface ElementNavBarProps {
  href: string;
  texts: string;
  icon?: string;
  page: string;
  className?: string;
  onLinkClick?: () => void;
}

export const LanguageButton = () => {
  const { i18n } = useTranslation();
  const languages = ["EN", "FR"];

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("i18nextLng")?.toUpperCase() || "FR",
  );

  useEffect(() => {
    console.log("selectedLanguage", selectedLanguage);
    i18n.changeLanguage(selectedLanguage.toLowerCase());
  }, [selectedLanguage]);

  const handleLanguageChange = () => {
    const nextIndex =
      (languages.indexOf(selectedLanguage) + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    setSelectedLanguage(nextLanguage);
    i18n.changeLanguage(nextLanguage.toLowerCase());
    localStorage.setItem("i18nextLng", nextLanguage);

    window.location.reload();
  };

  const { useHoverAnimation } = useAnimation();
  const barRef = useRef<HTMLElement>(null);
  useHoverAnimation([barRef as React.RefObject<HTMLElement>]);

  return (
    <button className="language-button" onClick={handleLanguageChange}>
      {selectedLanguage}
      <span ref={barRef} className="nav-bar"></span>
    </button>
  );
};

const ElementNavBar = React.forwardRef<HTMLLIElement, ElementNavBarProps>(
  ({ href, texts, icon, className, onLinkClick, page }, ref) => {
    const { t } = useTranslation();
    const translatedText = t(`nav.${texts}`);
    const match = useMatch(href);
    const [IconComponent, setIconComponent] = useState<React.FC<{
      className?: string;
    }> | null>(null);
    const animatedNavigate = useAnimatedNavigate();
    const { useHoverAnimation, scrollToSection } = useAnimation();
    const barRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (icon) {
        import(`../../../assets/svg/navbar/${icon}.svg`)
          .then((module) => setIconComponent(() => module.ReactComponent))
          .catch((error) => console.error("Error loading SVG icon:", error));
      }
    }, [icon]);

    useHoverAnimation([barRef as React.RefObject<HTMLElement>]);

    const handleClick = () => {
      onLinkClick?.();
      const currentPath = location.pathname;

      // Gérer la navigation sur la même page
      if (currentPath === page && href.startsWith("#")) {
        scrollToSection(href.substring(1));
        return;
      }

      // Gérer la navigation vers une autre page
      if (currentPath !== page) {
        if (href.includes("#")) {
          const sectionId = href.split("#")[1];
          animatedNavigate(page, () => {
            window.setTimeout(() => scrollToSection(sectionId), 50);
          });
        } else {
          animatedNavigate(page);
        }
      }
    };

    const linkClassName = `nav-link ${
      href === "/" || !href.startsWith("#") ? "end" : ""
    }`;

    return (
      <>
        <li className={`nav-item ${className} ${match ? "active" : ""}`}>
          <section
            onClick={handleClick}
            aria-current={match ? "page" : undefined}
            className={linkClassName}
          >
            {IconComponent && <IconComponent className="navLogo" />}
            <span className="link-text">{translatedText}</span>
            <span ref={barRef} className="nav-bar"></span>
          </section>
        </li>
      </>
    );
  },
);
ElementNavBar.displayName = "ElementNavBar";

export default React.memo(ElementNavBar);
