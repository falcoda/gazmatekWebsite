import "./EventDetail.scss";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaTimes,
} from "react-icons/fa";
import { Navigate, useParams } from "react-router-dom";

import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";
import SeoHead from "@/components/SeoHead/SeoHead";
import { buildPagePath } from "@/config/pages";
import {
  getEventBySlug,
  getEventSummary,
  getEventTitle,
  isEventPast,
} from "@/content/events";
import { getLocalizedText } from "@/content/types";
import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";
import { canUseRawDisplayFont } from "@/Utils/Typography/rawDisplay";

const formatFullDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr);

  return date.toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const language = i18n.resolvedLanguage === "en" ? "en" : "fr";

  const event = slug ? getEventBySlug(slug) : undefined;

  useEffect(() => {
    if (!contentRef.current || !event) {
      return;
    }

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
  }, [event]);

  useEffect(() => {
    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!event) {
    return <Navigate to=".." relative="path" replace />;
  }

  const isPast = isEventPast(event.date);
  const backPath = isPast
    ? buildPagePath("eventsArchive")
    : buildPagePath("eventsUpcoming");

  const locationParts = [
    event.venue,
    event.address,
    event.city,
    event.country,
  ].filter(Boolean);
  const eventTitle = getEventTitle(event, language);
  const eventSummary = getEventSummary(event, language);
  const eventDescription = getLocalizedText(event.description, language).trim();
  const useRawDisplayTitle = canUseRawDisplayFont(eventTitle);
  const descriptionTitle = t("events.description");
  const lineupTitle = t("events.lineup");
  const galleryTitle = t("events.gallery");

  return (
    <Container className="eventDetail">
      <SeoHead
        title={getLocalizedText(event.seo.title, language)}
        description={getLocalizedText(event.seo.description, language)}
        language={language}
      />

      <section className="hero">
        <div className="heroImageWrap">
          <img
            src={event.poster.src}
            alt={event.poster.alt[language]}
            className="heroImage"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="heroOverlay" />
        </div>
        <div className="heroContent">
          <span className="heroBadge">
            {isPast ? t("events.pastBadge") : t("events.upcoming")}
          </span>
          <h1
            className={`heroName${useRawDisplayTitle ? "" : " fallbackDisplay"}`}
          >
            {eventTitle}
          </h1>
          {eventSummary && <p className="heroSummary">{eventSummary}</p>}
          {event.ticketUrl && !isPast && (
            <a
              className="ticketButton"
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTicketAlt className="ticketIcon" />
              {t("events.bookTicket")}
            </a>
          )}
        </div>
      </section>

      <Section className="body">
        <div ref={contentRef} className="content">
          <button
            className="backButton"
            onClick={() => animatedNavigate(backPath)}
            type="button"
          >
            ← {t("events.back")}
          </button>

          <div className="infoGrid">
            <div className="infoItem">
              <FaCalendarAlt className="infoIcon" />
              <div>
                <p className="infoLabel">{t("events.date")}</p>
                <p className="infoValue">
                  {formatFullDate(event.date, language)}
                </p>
              </div>
            </div>

            <div className="infoItem">
              <FaMapMarkerAlt className="infoIcon" />
              <div>
                <p className="infoLabel">{t("events.location")}</p>
                <p className="infoValue">
                  {locationParts.length > 0
                    ? locationParts.join(" · ")
                    : t("events.locationUnknown")}
                </p>
              </div>
            </div>
          </div>

          {eventDescription && (
            <div className="description">
              <h2 className="sectionTitle">{descriptionTitle}</h2>
              <div className="descriptionCard">
                <p>{eventDescription}</p>
              </div>
            </div>
          )}

          {event.lineup.length > 0 && (
            <div className="lineup">
              <h2 className="sectionTitle">{lineupTitle}</h2>
              <div className="lineupList">
                {event.lineup.map((artist) => (
                  <span key={artist} className="lineupArtist">
                    {artist}
                  </span>
                ))}
              </div>
            </div>
          )}

          {event.gallery.length > 0 && (
            <div className="gallery">
              <h2 className="sectionTitle">{galleryTitle}</h2>
              <div className="galleryGrid">
                {event.gallery.map((photo, index) => (
                  <button
                    key={photo.src}
                    className="galleryItem"
                    onClick={() => setLightboxImage(photo.src)}
                    type="button"
                    aria-label={
                      photo.alt[language] ||
                      `${getEventTitle(event, language)} ${index + 1}`
                    }
                  >
                    <img
                      src={photo.src}
                      alt={
                        photo.alt[language] ||
                        `${getEventTitle(event, language)} ${index + 1}`
                      }
                      className="galleryImage"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {lightboxImage && (
        <div
          className="lightbox"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t("events.gallery")}
        >
          <button
            className="lightboxClose"
            onClick={() => setLightboxImage(null)}
            type="button"
            aria-label={language === "fr" ? "Fermer" : "Close"}
          >
            <FaTimes />
          </button>
          <img
            src={lightboxImage}
            alt=""
            className="lightboxImage"
            loading="eager"
            decoding="async"
            onClick={(mouseEvent) => mouseEvent.stopPropagation()}
          />
        </div>
      )}
    </Container>
  );
};

export default EventDetail;
