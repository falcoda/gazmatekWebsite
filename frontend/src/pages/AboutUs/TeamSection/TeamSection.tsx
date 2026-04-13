import "./TeamSection.scss";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import Section from "../../../components/Section/Section";
import { TEAM_MEMBERS } from "../../../content/collective";
import { getLocalizedText } from "../../../content/types";
import useAnimation from "../../../hooks/useAnimation";

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
};

const TeamSection: React.FC = () => {
  const { i18n, t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { animateFadeInWithMove } = useAnimation();
  const language = i18n.resolvedLanguage ?? "fr";

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".card");
    animateFadeInWithMove(
      Array.from(cards) as HTMLElement[],
      0.6,
      sectionRef.current,
    );
  }, [animateFadeInWithMove]);

  return (
    <Section className="teamSection">
      <h2
        className="sectionTitle"
      >
        {t("aboutUs.teamTitle")}
      </h2>
      <div className="grid" ref={sectionRef}>
        {TEAM_MEMBERS.map((member) => (
          <div className="card" key={member.id}>
            <div className="imageWrap">
              <img
                src={member.image}
                alt={member.name}
                className="image"
              />
            </div>
            <div className="info">
              <h3 className="name">
                {member.name}
              </h3>
              <p className="role">
                {getLocalizedText(member.role, language)}
              </p>
              {member.socials.length > 0 && (
                <div className="socials">
                  {member.socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.platform];

                    return (
                      <a
                        key={`${member.id}-${social.platform}`}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="socialLink"
                        aria-label={`${member.name} ${social.platform}`}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default TeamSection;
