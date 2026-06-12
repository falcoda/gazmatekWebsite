import "./LanguageSwitcher.scss";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";

import {
  type AppLanguage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "../../i18n/config";
import { buildLocalizedPath, stripLanguagePrefix } from "../../i18n/routing";

interface LanguageSwitcherProps {
  mobile?: boolean;
  toggleNavbar?: () => void;
}

const LanguageSwitcher = ({
  mobile = false,
  toggleNavbar,
}: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const animatedNavigate = useAnimatedNavigate();
  const currentLanguage = (i18n.resolvedLanguage ||
    DEFAULT_LANGUAGE) as AppLanguage;

  const setLanguage = (lang: AppLanguage) => {
    if (currentLanguage === lang) return;
    const nextPath = buildLocalizedPath(
      lang,
      stripLanguagePrefix(location.pathname),
    );
    void i18n.changeLanguage(lang);
    animatedNavigate(stripLanguagePrefix(nextPath), { language: lang });

    if (mobile && toggleNavbar) {
      toggleNavbar();
    }
  };

  return (
    <div
      className={`languageSwitcher ${mobile ? "mobile" : ""}`}
      role="group"
      aria-label={t("language.switcher_aria")}
    >
      {SUPPORTED_LANGUAGES.map((language) => (
        <button
          key={language}
          type="button"
          className={currentLanguage === language ? "active" : ""}
          onClick={() => setLanguage(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
