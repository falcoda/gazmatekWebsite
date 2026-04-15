import "./NextEvents.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";
import SeoHead from "@/components/SeoHead/SeoHead";
import { buildPagePath } from "@/config/pages";
import {
  type GazmatekEvent,
  getEventSummary,
  getEventTitle,
  getUpcomingEvents,
} from "@/content/events";
import { canUseRawDisplayFont } from "@/Utils/Typography/rawDisplay";
import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";

gsap.registerPlugin(ScrollTrigger);

const formatDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr);

  return date.toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getEventLocation = (event: GazmatekEvent, emptyLabel: string): string => {
  const parts = [event.venue, event.city, event.country].filter(Boolean);

  return parts.length > 0 ? parts.join(" \u00b7 ") : emptyLabel;
};

const NextEvents = () => {
  const { t, i18n } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const language = i18n.resolvedLanguage === "en" ? "en" : "fr";
  const pageTitle = t("events.nextEventsTitle");

  const upcomingEvents = getUpcomingEvents();

  useEffect(() => {
    if (!gridRef.current || upcomingEvents.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const cards = gridRef.current.querySelectorAll(".eventCard");

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
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
  }, [upcomingEvents.length]);

  return (
    <Container className="nextEventsPage">
      <SeoHead
        title={t("events.seoUpcomingTitle")}
        description={t("events.seoUpcomingDescription")}
        language={language}
      />

      <section className="hero">
        <div className="heroContent">
          <span className="eyebrow">{t("events.upcomingEyebrow")}</span>
          <h1 className="title">{pageTitle}</h1>
          <p className="subtitle">{t("events.upcomingSubtitle")}</p>
        </div>
      </section>

      <Section className="eventsSection">
        <button
          className="backButton"
          onClick={() => animatedNavigate(buildPagePath("events"))}
          type="button"
        >
          {"\u2190"} {t("events.backToHub")}
        </button>

        {upcomingEvents.length === 0 ? (
          <div className="emptyState">
            <p className="emptyText">{t("events.noUpcoming")}</p>
            <button
              className="archiveFallbackButton"
              onClick={() => animatedNavigate(buildPagePath("eventsArchive"))}
              type="button"
            >
              {t("events.upcomingFallbackCta")}
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="eventsGrid">
            {upcomingEvents.map((event) => {
              const eventTitle = getEventTitle(event, language);
              const eventSummary = getEventSummary(event, language);
              const useRawDisplayTitle = canUseRawDisplayFont(eventTitle);

              return (
                <article key={event.id} className="eventCard">
                  <div className="cardPoster">
                    <img
                      src={event.poster.src}
                      alt={event.poster.alt[language]}
                      className="posterImage"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="cardInfo">
                    <h2
                      className={`cardName${useRawDisplayTitle ? "" : " fallbackDisplay"}`}
                    >
                      {eventTitle}
                    </h2>
                    <p className="cardDate">
                      {formatDate(event.date, language)}
                    </p>
                    <p className="cardLocation">
                      {getEventLocation(event, t("events.locationUnknown"))}
                    </p>
                    {eventSummary && (
                      <p className="cardSummary">{eventSummary}</p>
                    )}

                    {event.lineup.length > 0 && (
                      <p className="cardLineup">
                        {event.lineup.slice(0, 4).join(" \u00b7 ")}
                        {event.lineup.length > 4 && " ..."}
                      </p>
                    )}

                    <div className="cardActions">
                      {event.ticketUrl && (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="cardCta cardCtaPrimary"
                        >
                          {t("events.bookTicket")}
                        </a>
                      )}
                      <button
                        className="cardCta"
                        onClick={() =>
                          animatedNavigate(
                            buildPagePath("eventDetail", { slug: event.slug }),
                          )
                        }
                        type="button"
                      >
                        {t("events.moreInfo")}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Section>
    </Container>
  );
};

export default NextEvents;
