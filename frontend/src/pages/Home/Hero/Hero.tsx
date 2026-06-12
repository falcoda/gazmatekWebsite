import "./Hero.scss";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

import heroBg from "../../../assets/img/hero/hero-bg.jpg";
import { Logo } from "../../../assets/svg/svgIcons";
import useAnimatedNavigate from "../../../hooks/useAnimatedNavigate";
import useAnimation from "../../../hooks/useAnimation";

function Hero() {
  const { t } = useTranslation();
  const heroContentRef = useRef<HTMLDivElement>(null);
  const animatedNavigate = useAnimatedNavigate();
  const { scrollToSection } = useAnimation();
  const welcome = t("hero.welcome");

  useEffect(() => {
    if (heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.3 },
      );
    }
  }, []);

  useEffect(() => {
    gsap.to(".overflowWrap", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "center+=20% top",
        scrub: 1,
      },
      borderBottomLeftRadius: "70px",
      borderBottomRightRadius: "70px",
    });
  }, []);

  return (
    <section className="hero">
      <div className="slider">
        <div className="overflowWrap">
          <img
            src={heroBg}
            alt="Gazmatek rave ambiance"
            className="heroImage"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="heroOverlay" />
        </div>

        <div className="heroContent" ref={heroContentRef}>
          <Logo className="heroLogo" />
          <h1 className="heroWelcome">{welcome}</h1>
          <p className="heroBaseline">{t("hero.baseline")}</p>
          <div className="heroCtas">
            <button
              className="heroCta primary"
              type="button"
              onClick={() => animatedNavigate("/evenements")}
            >
              {t("hero.ctaPrimary")}
            </button>
            <button
              className="heroCta secondary"
              type="button"
              onClick={() => scrollToSection("contact-section")}
            >
              {t("hero.ctaSecondary")}
            </button>
          </div>
        </div>

        <div className="scrollIndicator">
          <FaChevronDown />
        </div>
      </div>
    </section>
  );
}

export default Hero;
