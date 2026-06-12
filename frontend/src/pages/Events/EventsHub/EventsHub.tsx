import "./EventsHub.scss";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import Container from "@/components/Container/Container";
import SeoHead from "@/components/SeoHead/SeoHead";
import { buildPagePath } from "@/config/pages";
import {
  getArchiveHighlightEvent,
  getEventSummary,
  getEventTitle,
  getPastEvents,
  getUpcomingEvents,
} from "@/content/events";
import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";

const formatDateShort = (dateStr: string, language: string): string => {
  const date = new Date(dateStr);

  return date.toLocaleDateString(language === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const EventsHub = () => {
  const { t, i18n } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();
  const blocksRef = useRef<HTMLDivElement>(null);
  const language = i18n.resolvedLanguage === "en" ? "en" : "fr";

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const nextEvent = upcomingEvents[0];
  const archiveHighlight = getArchiveHighlightEvent();
  const upcomingVisual = nextEvent?.poster ?? archiveHighlight?.poster;
  const hubTitle = t("events.hubTitle");
  const upcomingTitle = t("events.upcomingTitle");
  const archivesTitle = t("events.archivesTitle");
  const archivePreview = archiveHighlight
    ? getEventSummary(archiveHighlight, language)
    : "";

  useEffect(() => {
    if (!blocksRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const blocks = blocksRef.current.querySelectorAll(".block");

    gsap.fromTo(
      blocks,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.2,
      },
    );
  }, []);

  return (
    <Container className="eventsHub">
      <SeoHead
        title={t("events.seoHubTitle")}
        description={t("events.seoHubDescription")}
        language={language}
      />

      <section className="hero">
        <div className="heroContent">
          <span className="eyebrow">{t("events.hubEyebrow")}</span>
          <h1 className="title">{hubTitle}</h1>
          <p className="subtitle">{t("events.hubSubtitle")}</p>
        </div>
      </section>

      <div ref={blocksRef} className="blocksGrid">
        <button
          className="block blockUpcoming"
          onClick={() => animatedNavigate(buildPagePath("eventsUpcoming"))}
          type="button"
        >
          <div className="blockBg">
            {upcomingVisual && (
              <img
                src={upcomingVisual.src}
                alt=""
                className="blockBgImage"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="blockOverlay" />
          </div>
          <div className="blockContent">
            <span className="blockLabel">{t("events.upcoming")}</span>
            <h2 className="blockTitle">{upcomingTitle}</h2>
            {nextEvent ? (
              <p className="blockPreview">
                {getEventTitle(nextEvent, language)}
                {" · "}
                {formatDateShort(nextEvent.date, language)}
              </p>
            ) : (
              <p className="blockPreview">
                {t("events.upcomingFallbackPreview")}
              </p>
            )}
            <span className="blockMeta">
              {t("events.upcomingCount", { count: upcomingEvents.length })}
            </span>
            <span className="blockCta">{t("events.discover")}</span>
          </div>
        </button>

        <button
          className="block blockArchives"
          onClick={() => animatedNavigate(buildPagePath("eventsArchive"))}
          type="button"
        >
          <div className="blockBg">
            {archiveHighlight && (
              <img
                src={archiveHighlight.poster.src}
                alt=""
                className="blockBgImage"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="blockOverlayArchive" />
          </div>
          <div className="blockContent">
            <span className="blockLabel">{t("events.past")}</span>
            <h2 className="blockTitle">{archivesTitle}</h2>
            <p className="blockPreview">
              {archivePreview || t("events.archivesDesc")}
            </p>
            <span className="blockMeta">
              {t("events.archiveCount", { count: pastEvents.length })}
            </span>
            <span className="blockCta">{t("events.browse")}</span>
          </div>
        </button>
      </div>
    </Container>
  );
};

export default EventsHub;
