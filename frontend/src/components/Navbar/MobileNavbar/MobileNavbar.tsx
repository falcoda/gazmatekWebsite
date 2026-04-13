import "./MobileNavbar.scss";

import { gsap } from "gsap";
import React, { type ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { buildPagePath, type PageKey } from "@/config/pages";
import { stripLanguagePrefix } from "@/i18n/routing";

import { Logo } from "../../../assets/svg/svgIcons";
import useAnimatedNavigate from "../../../hooks/useAnimatedNavigate";
import navItems from "../NavItems";

interface MobileNavbarProps {
  mobileLangSwitcher?: ReactNode;
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

const MobileNavbar: React.FC<MobileNavbarProps> = ({ mobileLangSwitcher }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animatedNavigate = useAnimatedNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const currentPath = stripLanguagePrefix(location.pathname);

  const toggleNavbar = () => {
    setIsOpen((currentState) => !currentState);
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    animatedNavigate(buildPagePath("home"));
  };

  const handleNavClick = (page: string) => {
    setIsOpen(false);
    animatedNavigate(page);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!headerRef.current) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(headerRef.current, { clearProps: "all", opacity: 1 });

      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.12,
        },
      );
    }, headerRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(menuRef.current, {
        autoAlpha: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
      });

      return;
    }

    const menuItems = itemRefs.current;

    if (isOpen) {
      const timeline = gsap.timeline();

      timeline
        .set(menuRef.current, {
          pointerEvents: "auto",
        })
        .fromTo(
          menuRef.current,
          {
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0 round 28px)",
          },
          {
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0 round 28px)",
            duration: 0.42,
            ease: "power3.out",
          },
        )
        .fromTo(
          menuItems,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.2",
        );

      return () => {
        timeline.kill();
      };
    }

    gsap.to(itemRefs.current, {
      y: 18,
      opacity: 0,
      duration: 0.18,
      stagger: 0.03,
      overwrite: "auto",
    });

    const closeTween = gsap.to(menuRef.current, {
      autoAlpha: 0,
      clipPath: "inset(0 0 100% 0 round 28px)",
      duration: 0.28,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(menuRef.current, {
          pointerEvents: "none",
        });
      },
    });

    return () => {
      closeTween.kill();
    };
  }, [isOpen]);

  itemRefs.current = [];

  return (
    <nav
      className="mobileNavbar"
      role="navigation"
      aria-label="Site Navigation"
    >
      <div className="mobileNavbarHeader" ref={headerRef}>
        <button
          type="button"
          className="navbarBrand"
          onClick={handleLogoClick}
          aria-label={t("nav.home")}
        >
          <Logo className="navLogoMobile" />
        </button>
        <button
          className={`burgerBtn ${isOpen ? "open" : ""}`}
          onClick={toggleNavbar}
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
        >
          <span className="burgerLine" />
          <span className="burgerLine" />
        </button>
      </div>

      <div className={`mobileMenu ${isOpen ? "open" : ""}`} ref={menuRef}>
        <div className="mobileMenuTopline">
          <span className="menuEyebrow">Gazmatek</span>
          {mobileLangSwitcher}
        </div>

        <ul className="mobileMenuList">
          {navItems.map((item, index) => {
            const isActive = isNavItemActive(currentPath, item.page);

            return (
              <li
                key={item.id}
                className="mobileMenuItem"
                ref={(element) => {
                  if (element) {
                    itemRefs.current.push(element);
                  }
                }}
              >
                <button
                  className={`mobileMenuLink ${isActive ? "active" : ""}`}
                  onClick={() => handleNavClick(buildPagePath(item.page))}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="mobileMenuIndex">
                    {`${index + 1}`.padStart(2, "0")}
                  </span>
                  <span className="mobileMenuText">{t(item.labelKey)}</span>
                  <span className="mobileMenuGlyph">/</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(MobileNavbar);
