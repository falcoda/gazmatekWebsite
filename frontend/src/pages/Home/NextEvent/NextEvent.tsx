import "./NextEvent.scss";

import { useTranslation } from "react-i18next";

import { buildPagePath } from "@/config/pages";
import {
  getEventTitle,
  getPastEvents,
  getUpcomingEvents,
} from "@/content/events";
import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";

const formatDate = (dateStr: string, locale: string): string => {
  const date = new Date(dateStr);

  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function NextEvent() {
  const { t, i18n } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();
  const language = i18n.resolvedLanguage === "en" ? "en" : "fr";
  const upcomingEvents = getUpcomingEvents();
  const nextEvent = upcomingEvents[0];
  const archiveTitle = t("nextEvent.archiveTitle");

  if (!nextEvent) {
    const highlights = getPastEvents().slice(0, 3);

    return (
      <section className="nextEvent archive">
        <div className="content">
          <h2 className="title">{archiveTitle}</h2>
          <div className="archiveGrid">
            {highlights.map((event) => (
              <button
                key={event.id}
                className="archiveCard"
                type="button"
                onClick={() =>
                  animatedNavigate(
                    buildPagePath("eventDetail", { slug: event.slug }),
                  )
                }
              >
                <div className="archiveCardPoster">
                  <img
                    src={event.poster.src}
                    alt={event.poster.alt[language]}
                    className="archiveCardImg"
                  />
                </div>
                <div className="archiveCardInfo">
                  <h3 className="archiveCardName">{getEventTitle(event, language)}</h3>
                  <p className="archiveCardDate">
                    {formatDate(event.date, i18n.language)}
                  </p>
                  <p className="archiveCardCity">
                    {event.city ?? t("events.locationUnknown")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="nextEvent">
      <div className="bg">
        <img src={nextEvent.poster.src} alt="" className="bgImage" />
        <div className="bgOverlay" />
      </div>
      <div className="content">
        <p className="sectionLabel">{t("nextEvent.title")}</p>
        <h2 className="eventName">{getEventTitle(nextEvent, language)}</h2>
        <div className="eventMeta">
          <span className="metaItem">
            {formatDate(nextEvent.date, i18n.language)}
          </span>
          <span className="metaSep">Â·</span>
          <span className="metaItem">
            {[nextEvent.venue, nextEvent.city].filter(Boolean).join(" â€” ")}
          </span>
        </div>
        {nextEvent.lineup.length > 0 && (
          <p className="lineup">
            {nextEvent.lineup.slice(0, 4).join(" Â· ")}
            {nextEvent.lineup.length > 4 && " Â· ..."}
          </p>
        )}
        <div className="flyerWrapper">
          <img
            src={nextEvent.poster.src}
            alt={nextEvent.poster.alt[language]}
            className="flyer"
          />
        </div>
        <button
          className="eventCta"
          type="button"
          onClick={() =>
            animatedNavigate(
              buildPagePath("eventDetail", { slug: nextEvent.slug }),
            )
          }
        >
          {t("nextEvent.cta")}
        </button>
      </div>
    </section>
  );
}

export default NextEvent;
