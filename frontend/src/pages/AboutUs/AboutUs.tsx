import "./AboutUs.scss";

import { useTranslation } from "react-i18next";

import SeoHead from "@/components/SeoHead/SeoHead";
import { type AppLanguage } from "@/i18n/config";

import heroImg from "../../assets/img/about-hero.jpg";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import { ABOUT_SEO, COLLECTIVE_MANIFESTO } from "../../content/collective";
import { getLocalizedText } from "../../content/types";
import MissionSection from "./MissionSection/MissionSection";
import TeamSection from "./TeamSection/TeamSection";
import TimelineSection from "./TimelineSection/TimelineSection";

const HERO_IMAGE = heroImg;

const AboutUs: React.FC = () => {
  const { i18n, t } = useTranslation();
  const language: AppLanguage = i18n.resolvedLanguage === "en" ? "en" : "fr";
  const heroTitle = getLocalizedText(COLLECTIVE_MANIFESTO.title, language);

  return (
    <Container className="aboutUs">
      <SeoHead
        title={getLocalizedText(ABOUT_SEO.title, language)}
        description={getLocalizedText(ABOUT_SEO.description, language)}
        language={language}
      />

      <section className="hero">
        <div className="imageWrap">
          <img
            src={HERO_IMAGE}
            alt="Gazmatek crew"
            className="image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="overlay" />
        </div>
        <div className="content">
          <h1 className="title">{heroTitle}</h1>
          <p className="subtitle">
            {getLocalizedText(COLLECTIVE_MANIFESTO.subtitle, language)}
          </p>
        </div>
      </section>

      <Section className="intro">
        <h2 className="title">{t("aboutUs.heroSubtitle")}</h2>
        <p className="text">
          {getLocalizedText(COLLECTIVE_MANIFESTO.intro, language)}
        </p>
      </Section>

      <MissionSection />

      <TimelineSection />

      <TeamSection />
    </Container>
  );
};

export default AboutUs;
