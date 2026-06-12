import "./ContactForm.scss";

import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
  FaYoutube,
} from "react-icons/fa";

import { SOCIAL_LINKS } from "@/config/socials";

interface SubjectChip {
  key: string;
  labelKey: string;
}

const SUBJECT_CHIPS: SubjectChip[] = [
  { key: "booking", labelKey: "contact.subjects.booking" },
  { key: "rental", labelKey: "contact.subjects.rental" },
  { key: "artist", labelKey: "contact.subjects.artist" },
  { key: "partnership", labelKey: "contact.subjects.partnership" },
  { key: "general", labelKey: "contact.subjects.general" },
];

const SOCIAL_ITEMS = [
  {
    key: "soundcloud",
    href: SOCIAL_LINKS.soundcloud,
    Icon: FaSoundcloud,
    label: "SoundCloud",
  },
  {
    key: "instagram",
    href: SOCIAL_LINKS.instagram,
    Icon: FaInstagram,
    label: "Instagram",
  },
  {
    key: "facebook",
    href: SOCIAL_LINKS.facebook,
    Icon: FaFacebook,
    label: "Facebook",
  },
  {
    key: "youtube",
    href: SOCIAL_LINKS.youtube,
    Icon: FaYoutube,
    label: "YouTube",
  },
] as const;

const ContactForm = () => {
  const { t } = useTranslation();

  const mailtoHref = `mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent(t("contact.emailSubject"))}`;

  return (
    <div className="contactBlock">
      <div className="contactBlockInner">
        {/* Left column — context */}
        <div className="contactLeft">
          <p className="contactContextText">{t("contact.contextLeft")}</p>

          <ul className="contactChips" aria-label={t("contact.subjectsLabel")}>
            {SUBJECT_CHIPS.map(({ key, labelKey }) => (
              <li key={key} className="contactChip">
                {t(labelKey)}
              </li>
            ))}
          </ul>

          <p className="contactResponseTime">
            <span className="contactResponseDot" aria-hidden="true" />
            {t("contact.responseTime")}
          </p>
        </div>

        {/* Divider */}
        <div className="contactDivider" aria-hidden="true" />

        {/* Right column — actions */}
        <div className="contactRight">
          <a
            href={mailtoHref}
            className="contactEmailCta"
            aria-label={`${t("contact.emailCta")} — ${SOCIAL_LINKS.email}`}
          >
            <span className="contactEmailLabel">{t("contact.emailCta")}</span>
            <span className="contactEmailLine">
              <span className="contactEmailAddress">{SOCIAL_LINKS.email}</span>
              <span className="contactEmailArrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>

          <div className="contactSocials">
            <p className="contactSocialsTitle">{t("contact.socialTitle")}</p>
            <div className="contactSocialsRow">
              {SOCIAL_ITEMS.map(({ key, href, Icon, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`contactSocialIcon ${key}`}
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
