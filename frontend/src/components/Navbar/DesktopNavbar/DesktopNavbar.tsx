import "./DesktopNavbar.scss";

import { gsap } from "gsap";
import React, { type ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { buildPagePath, type PageKey } from "@/config/pages";
import { stripLanguagePrefix } from "@/i18n/routing";

import { Logo } from "../../../assets/svg/svgIcons";
import useAnimatedNavigate from "../../../hooks/useAnimatedNavigate";
import navItems from "../NavItems";

interface DesktopNavbarProps {
  langSwitcher?: ReactNode;
}

const isNavItemActive = (pathname: string, page: PageKey) => {
  const targetPath = buildPagePath(page);

  if (page === "home") {
    return pathname === targetPath;
  }

  if (page === "artists" || page === "events") {
    return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
  }

  return pathname === targetPath;
};

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ langSwitcher }) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<HTMLLIElement[]>([]);
  const animatedNavigate = useAnimatedNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const currentPath = stripLanguagePrefix(location.pathname);

  const handleLogoClick = () => {
    animatedNavigate(buildPagePath("home"));
  };

  const handleNavClick = (page: string) => {
    animatedNavigate(page);
  };

  useEffect(() => {
    if (!navbarRef.current) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([navbarRef.current, ...navItemRefs.current], {
        clearProps: "all",
        opacity: 1,
      });

      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        navbarRef.current,
        { y: -28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power3.out",
          delay: 0.12,
        },
      );

      gsap.fromTo(
        navItemRefs.current,
        { y: -18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.52,
          stagger: 0.055,
          ease: "power3.out",
          delay: 0.24,
        },
      );
    }, navbarRef);

    return () => context.revert();
  }, []);

  navItemRefs.current = [];

  return (
    <nav
      className="desktopNavbar"
      role="navigation"
      aria-label="Site Navigation"
      ref={navbarRef}
    >
      <div className="navPanel">
        <button
          type="button"
          className="navbarLogo"
          onClick={handleLogoClick}
          aria-label={t("nav.home")}
        >
          <Logo className="navLogoIcon" />
        </button>

        <ul className="navbarLinks">
          {navItems.map((item, index) => {
            const isActive = isNavItemActive(currentPath, item.page);

            return (
              <li
                key={item.id}
                className="navItem"
                ref={(element) => {
                  if (element) {
                    navItemRefs.current.push(element);
                  }
                }}
              >
                <button
                  className={`navLink ${isActive ? "active" : ""}`}
                  onClick={() => handleNavClick(buildPagePath(item.page))}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="navIndex">
                    {`${index + 1}`.padStart(2, "0")}
                  </span>
                  <span className="navLinkText">{t(item.labelKey)}</span>
                  <span className="navLinkAccent" />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="navbarTools">{langSwitcher}</div>
      </div>
    </nav>
  );
};

export default React.memo(DesktopNavbar);
