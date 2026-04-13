import "./MissionSection.scss";

import { useTranslation } from "react-i18next";

import Section from "../../../components/Section/Section";
import { MISSION_SECTION } from "../../../content/collective";
import { getLocalizedText } from "../../../content/types";

const MissionSection: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? "fr";
  const title = getLocalizedText(MISSION_SECTION.title, language);

  return (
    <Section className="missionSection">
      <h2 className="sectionTitle">{title}</h2>

      <div className="intro">
        <p className="introText">
          {getLocalizedText(MISSION_SECTION.mission, language)}
        </p>
      </div>

      <div className="values">
        {MISSION_SECTION.values.map((value) => {
          const valueTitle = getLocalizedText(value.title, language);

          return (
            <div className="value" key={valueTitle}>
              <h3 className="valueTitle">{valueTitle}</h3>
              <p className="valueDescription">
                {getLocalizedText(value.description, language)}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default MissionSection;

