import "./TimelineSection.scss";

import { useTranslation } from "react-i18next";

import AnimatedTimeline, {
  AnimatedTimelineCardFrame,
  AnimatedTimelineItem,
} from "@/components/AnimatedTimeline/AnimatedTimeline";
import Section from "@/components/Section/Section";
import { TIMELINE } from "@/content/collective";
import { getLocalizedText } from "@/content/types";
import { canUseRawDisplayFont } from "@/Utils/Typography/rawDisplay";

const TimelineSection = () => {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === "en" ? "en" : "fr";
  const title = getLocalizedText(
    { fr: "Notre histoire", en: "Our history" },
    language,
  );

  return (
    <Section className="timelineSection">
      <AnimatedTimeline
        eyebrow={getLocalizedText(
          {
            fr: "Une progression lisible, du premier noyau aux annees recentes.",
            en: "A readable progression from the first core to recent years.",
          },
          language,
        )}
        title={title}
      >
        {TIMELINE.map((event, index) => {
          const eventTitle = getLocalizedText(event.title, language);
          const useRawDisplayTitle = canUseRawDisplayFont(eventTitle);
          const side = index % 2 === 0 ? "left" : "right";

          return (
            <AnimatedTimelineItem
              key={`${event.year}-${eventTitle}`}
              side={side}
            >
              <AnimatedTimelineCardFrame className="timelineCard">
                <div className="year">
                  {getLocalizedText(event.period, language)}
                </div>
                <h3
                  className={`itemTitle${useRawDisplayTitle ? "" : " fallbackDisplay"}`}
                >
                  {eventTitle}
                </h3>
                <p className="description">
                  {getLocalizedText(event.description, language)}
                </p>
                <p className="proof">
                  {getLocalizedText(event.legacyProof, language)}
                </p>
              </AnimatedTimelineCardFrame>
            </AnimatedTimelineItem>
          );
        })}
      </AnimatedTimeline>
    </Section>
  );
};

export default TimelineSection;
