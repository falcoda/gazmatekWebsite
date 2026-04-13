import "./Footer.scss";

import { useTranslation } from "react-i18next";
import { FaSoundcloud, FaYoutube } from "react-icons/fa";

import { buildPagePath } from "@/config/pages";
import { Facebook, Instagram, Logo } from "../../assets/svg/svgIcons";
import { SOCIAL_LINKS } from "../../config/socials";
import useAnimatedNavigate from "../../hooks/useAnimatedNavigate";

const Footer = () => {
  const { t } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();

  const socialLinks = [
    {
      icon: <FaSoundcloud className="socialIcon" />,
      url: SOCIAL_LINKS.soundcloud,
      label: "SoundCloud",
    },
    {
      icon: <Instagram className="socialIcon" />,
      url: SOCIAL_LINKS.instagram,
      label: "Instagram",
    },
    {
      icon: <Facebook className="socialIcon" />,
      url: SOCIAL_LINKS.facebook,
      label: "Facebook",
    },
    {
      icon: <FaYoutube className="socialIcon" />,
      url: SOCIAL_LINKS.youtube,
      label: "YouTube",
    },
  ];

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerBrand">
          <Logo
            className="footerLogo"
            onClick={() => animatedNavigate(buildPagePath("home"))}
          />
        </div>

        <div className="footerSocial">
          <h4 className="footerTitle">{t("footer.findUsOn")}</h4>
          <div className="footerSocialLinks">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footerSocialLink"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footerCredits">
          <p className="footerCopyright">&copy; Gazmatek Records</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
