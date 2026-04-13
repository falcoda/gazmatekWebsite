import "./Artistes.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import SeoHead from "@/components/SeoHead/SeoHead";
import type { AppLanguage } from "@/i18n/config";

import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import { ARTISTS, getFeaturedArtists } from "../../content/artists";
import ArtistCard from "./ArtistCard/ArtistCard";
import ArtistSpotlight from "./ArtistSpotlight/ArtistSpotlight";

gsap.registerPlugin(ScrollTrigger);

const featuredArtists = getFeaturedArtists();

const Artistes: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage ?? "fr") as AppLanguage;
  const gridRef = useRef<HTMLDivElement>(null);
  const pageTitle = t("artists.pageTitle");

  useEffect(() => {
    if (!gridRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const cards = gridRef.current.querySelectorAll(".artistCard");

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Container className="artistesPage">
      <SeoHead
        title={t("seo.artistsTitle")}
        description={t("seo.artistsDescription")}
        language={language}
      />

      <section className="hero">
        <div className="heroContent">
          <h1 className="title">
            {pageTitle}
          </h1>
          <p className="subtitle">{t("artists.pageSubtitle")}</p>
        </div>
      </section>

      {featuredArtists.length > 0 && (
        <Section className="spotlightSection">
          <ArtistSpotlight artists={featuredArtists} />
        </Section>
      )}

      <Section className="gridSection">
        <h2 className="sectionLabel">{t("artists.allTitle")}</h2>
        <div ref={gridRef} className="grid">
          {ARTISTS.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </Section>
    </Container>
  );
};

export default Artistes;
