import "./Artistes.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import SearchBar from "@/components/SearchBar/SearchBar";
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtists = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ARTISTS;
    return ARTISTS.filter(
      (artist) =>
        artist.name.toLowerCase().includes(query) ||
        artist.styles.some((style) => style.toLowerCase().includes(query)),
    );
  }, [searchQuery]);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    // Scoped to this grid on purpose: the cleanup used to call
    // ScrollTrigger.getAll().kill(), which also killed the triggers owned by
    // other components, so every keystroke in the search field silently
    // disabled the rest of the page's scroll animations.
    const context = gsap.context(() => {
      gsap.fromTo(
        ".artistCard",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, grid);

    return () => context.revert();
  }, [filteredArtists]);

  return (
    <Container className="artistesPage">
      <SeoHead
        title={t("seo.artistsTitle")}
        description={t("seo.artistsDescription")}
        language={language}
      />

      <section className="hero">
        <div className="heroContent">
          <h1 className="title">{pageTitle}</h1>
          <p className="subtitle">{t("artists.pageSubtitle")}</p>
        </div>
      </section>

      {featuredArtists.length > 0 && (
        <Section className="spotlightSection">
          <ArtistSpotlight artists={featuredArtists} />
        </Section>
      )}

      <Section className="gridSection">
        <div className="gridHeader">
          <h2 className="sectionLabel">{t("artists.allTitle")}</h2>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        {filteredArtists.length === 0 ? (
          <p className="noResults">{t("artists.searchNoResults")}</p>
        ) : (
          <div ref={gridRef} className="grid">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
};

export default Artistes;
