import "./ThreePillars.scss";

import { useTranslation } from "react-i18next";
import { FaCalendarAlt, FaHeadphones, FaSlidersH } from "react-icons/fa";

import { PAGES } from "@/config/pages";
import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";

function ThreePillars() {
  const { t } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();

  const pillars = [
    {
      icon: <FaCalendarAlt />,
      titleKey: "pillars.events.title",
      textKey: "pillars.events.text",
      ctaKey: "pillars.events.cta",
      path: PAGES.events,
    },
    {
      icon: <FaHeadphones />,
      titleKey: "pillars.artists.title",
      textKey: "pillars.artists.text",
      ctaKey: "pillars.artists.cta",
      path: PAGES.artists,
    },
    {
      icon: <FaSlidersH />,
      titleKey: "pillars.services.title",
      textKey: "pillars.services.text",
      ctaKey: "pillars.services.cta",
      path: PAGES.services,
    },
  ];

  return (
    <section className="threePillars">
      <div className="threePillarsInner">
        <h2 className="threePillarsSectionTitle">
          {t("pillars.sectionTitle")}
        </h2>
        <div className="threePillarsGrid">
          {pillars.map((pillar) => (
            <div key={pillar.path} className="pillarCard">
              <span className="pillarIcon">{pillar.icon}</span>
              <h3 className="pillarTitle">{t(pillar.titleKey)}</h3>
              <p className="pillarText">{t(pillar.textKey)}</p>
              <button
                className="pillarCta"
                type="button"
                onClick={() => animatedNavigate(pillar.path)}
              >
                {t(pillar.ctaKey)} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ThreePillars;
