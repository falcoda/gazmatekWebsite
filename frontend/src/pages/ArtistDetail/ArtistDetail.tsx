import "./ArtistDetail.scss";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBandcamp,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa";
import { Navigate, useParams } from "react-router-dom";

import { buildPagePath } from "@/config/pages";
import { getArtistBySlug, type ArtistLinks } from "@/content/artists";

import SeoHead from "@/components/SeoHead/SeoHead";
import type { AppLanguage } from "@/i18n/config";
import { canUseRawDisplayFont } from "@/Utils/Typography/rawDisplay";

import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import useAnimatedNavigate from "../../hooks/useAnimatedNavigate";
import ArtistGallery from "./ArtistGallery/ArtistGallery";

const PLACEHOLDER_HERO = "https://placehold.co/1920x800/141416/8b8b8b?text=";

const LINK_ICONS: Record<keyof ArtistLinks, React.ReactNode> = {
  soundcloud: <FaSoundcloud />,
  bandcamp: <FaBandcamp />,
  instagram: <FaInstagram />,
  facebook: <FaFacebookF />,
  youtube: <FaYoutube />,
  spotify: <FaSpotify />,
  website: <FaGlobe />,
};

const LINK_LABELS: Record<keyof ArtistLinks, string> = {
  soundcloud: "SoundCloud",
  bandcamp: "Bandcamp",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  spotify: "Spotify",
  website: "Website",
};

const ArtistDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n, t } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const lang = i18n.resolvedLanguage ?? "fr";

  const language = (lang === "en" ? "en" : "fr") as AppLanguage;
  const artist = slug ? getArtistBySlug(slug) : undefined;

  useEffect(() => {
    if (!contentRef.current || !artist) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    gsap.fromTo(
      contentRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.2,
      },
    );
  }, [artist]);

  if (!artist) {
    return <Navigate to=".." relative="path" replace />;
  }

  const heroSrc =
    artist.images.portrait ||
    `${PLACEHOLDER_HERO}${encodeURIComponent(artist.name)}`;

  const linkEntries = artist.links
    ? (Object.entries(artist.links) as [keyof ArtistLinks, string][]).filter(
        ([, url]) => !!url,
      )
    : [];

  const shortBio = artist.bio.short
    ? lang === "en"
      ? artist.bio.short.en
      : artist.bio.short.fr
    : undefined;

  const fullBio = artist.bio.full
    ? lang === "en"
      ? artist.bio.full.en
      : artist.bio.full.fr
    : undefined;

  const galleryImages = artist.images.gallery ?? [];
  const bioTitle = t("artists.bioFullLabel");
  const linksTitle = t("artists.linksTitle");
  const listenTitle = t("artists.listenTitle");
  const useRawDisplayName = canUseRawDisplayFont(artist.name);

  const artistSeoDescription = shortBio ?? artist.styles.join(", ");

  return (
    <Container className="artistDetail">
      <SeoHead
        title={`${artist.name} | Gazmatek`}
        description={artistSeoDescription}
        language={language}
        image={artist.images.portrait ?? undefined}
      />

      <section className="hero">
        <div className="heroImageWrap">
          <img src={heroSrc} alt={artist.name} className="heroImage" />
          <div className="heroOverlay" />
        </div>
        <div className="heroContent">
          <h1
            className={`heroName${useRawDisplayName ? "" : " fallbackDisplay"}`}
          >
            {artist.name}
          </h1>
          <span className="heroStyle">{artist.styles.join(" · ")}</span>
        </div>
      </section>

      <Section className="body">
        <div ref={contentRef} className="content">
          <button
            className="backButton"
            onClick={() => animatedNavigate(buildPagePath("artists"))}
            type="button"
          >
            ← {t("artists.backToList")}
          </button>

          {shortBio && (
            <div className="bioIntro">
              <span className="bioIntroLabel">
                {t("artists.bioIntroLabel")}
              </span>
              <p className="bioIntroText">{shortBio}</p>
            </div>
          )}

          {fullBio && (
            <div className="bio">
              <h2 className="bioTitle">{bioTitle}</h2>
              <p>{fullBio}</p>
            </div>
          )}

          {linkEntries.length > 0 && (
            <div className="links">
              <h2 className="linksTitle">{linksTitle}</h2>
              <div className="linksList">
                {linkEntries.map(([key, url]) => (
                  <a
                    key={String(key)}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    aria-label={LINK_LABELS[key]}
                  >
                    {LINK_ICONS[key]}
                    <span>{LINK_LABELS[key]}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {galleryImages.length > 0 && (
            <ArtistGallery images={galleryImages} artistName={artist.name} />
          )}

          {artist.links?.soundcloud && (
            <div className="embed">
              <h2 className="embedTitle">{listenTitle}</h2>
              <iframe
                title={`${artist.name} on SoundCloud`}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(artist.links.soundcloud)}&color=%2321c37a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
              />
            </div>
          )}
        </div>
      </Section>
    </Container>
  );
};

export default ArtistDetail;
