import "./Archives.scss";

import { useTranslation } from "react-i18next";

import AnimatedTimeline, {
  AnimatedTimelineCardFrame,
  AnimatedTimelineItem,
} from "@/components/AnimatedTimeline/AnimatedTimeline";
import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";
import SeoHead from "@/components/SeoHead/SeoHead";
import { buildPagePath } from "@/config/pages";
import {
  type GazmatekEvent,
  getEventSummary,
  getEventTitle,
  getPastEvents,
} from "@/content/events";
import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";
const formatArchiveDate = (dateStr: string, language: string): string => {
  const date = new Date(dateStr);

  return date.toLocaleDateString(language === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
  });
};

const getEventLocation = (event: GazmatekEvent, emptyLabel: string): string => {
  const parts = [event.venue, event.city, event.country].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : emptyLabel;
};

const Archives = () => {
  const { i18n, t } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();
  const language = i18n.resolvedLanguage === "en" ? "en" : "fr";
  const pageTitle = t("events.archivesPageTitle");

  const pastEvents = getPastEvents();
  const years = [
    ...new Set(pastEvents.map((event) => new Date(event.date).getFullYear())),
  ].sort((a, b) => b - a);

  return (
    <Container className="archivesPage">
      <SeoHead
        title={t("events.seoArchiveTitle")}
        description={t("events.seoArchiveDescription")}
        language={language}
      />

      <section className="hero">
        <div className="heroContent">
          <span className="eyebrow">{t("events.archiveEyebrow")}</span>
          <h1 className="title">{pageTitle}</h1>
          <p className="subtitle">{t("events.archivesSubtitle")}</p>
        </div>
      </section>

      <Section className="archivesSection">
        <button
          className="backButton"
          onClick={() => animatedNavigate(buildPagePath("events"))}
          type="button"
        >
          ← {t("events.backToHub")}
        </button>

        <AnimatedTimeline className="archivesTimeline">
          {years.map((year) => {
            const yearEvents = pastEvents.filter(
              (event) => new Date(event.date).getFullYear() === year,
            );

            return (
              <section key={year} className="yearSection">
                <div className="yearHeader">
                  <span className="yearLine" />
                  <h2 className="yearTitle">{year}</h2>
                </div>

                <div className="yearItems">
                  {yearEvents.map((event, index) => {
                    const eventSummary = getEventSummary(event, language);

                    return (
                      <AnimatedTimelineItem
                        key={event.id}
                        className="archiveTimelineItem"
                        side={index % 2 === 0 ? "left" : "right"}
                      >
                        <AnimatedTimelineCardFrame
                          as="button"
                          className="timelineCard"
                          onClick={() =>
                            animatedNavigate(
                              buildPagePath("eventDetail", {
                                slug: event.slug,
                              }),
                            )
                          }
                        >
                          <div className="cardImageWrap">
                            <img
                              src={event.poster.src}
                              alt={event.poster.alt[language]}
                              className="cardImage"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>

                          <div className="cardBody">
                            <span className="cardDate">
                              {formatArchiveDate(event.date, language)}
                            </span>
                            <h3 className="cardName">
                              {getEventTitle(event, language)}
                            </h3>
                            <p className="cardLocation">
                              {getEventLocation(
                                event,
                                t("events.locationUnknown"),
                              )}
                            </p>
                            {eventSummary && (
                              <p className="cardSummary">{eventSummary}</p>
                            )}
                          </div>
                        </AnimatedTimelineCardFrame>
                      </AnimatedTimelineItem>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </AnimatedTimeline>
      </Section>
    </Container>
  );
};

export default Archives;
