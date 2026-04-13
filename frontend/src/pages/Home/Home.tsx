import "./Home.scss";

import React from "react";
import { useTranslation } from "react-i18next";

import SeoHead from "@/components/SeoHead/SeoHead";
import type { AppLanguage } from "@/i18n/config";

import ContactForm from "../../components/ContactForm/ContactForm";
import Container from "../../components/Container/Container";
import CollectiveIntro from "./CollectiveIntro/CollectiveIntro";
import FeaturedArtists from "./FeaturedArtists/FeaturedArtists";
import Hero from "./Hero/Hero";
import NextEvent from "./NextEvent/NextEvent";
import ServicesTeaser from "./ServicesTeaser/ServicesTeaser";
import SoundCloudSection from "./SoundCloudSection/SoundCloudSection";
import ThreePillars from "./ThreePillars/ThreePillars";

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage ?? "fr") as AppLanguage;

  return (
    <Container className="home">
      <SeoHead
        title={t("seo.homeTitle")}
        description={t("seo.homeDescription")}
        language={language}
      />
      <Hero />
      <NextEvent />
      <CollectiveIntro />
      <ThreePillars />
      <SoundCloudSection />
      <FeaturedArtists />
      <ServicesTeaser />
      <section id="contact-section" className="homeContactSection">
        <ContactForm />
      </section>
    </Container>
  );
};

export default Home;
