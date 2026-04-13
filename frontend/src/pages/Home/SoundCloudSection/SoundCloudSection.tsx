import "./SoundCloudSection.scss";

import { useTranslation } from "react-i18next";

import { SOCIAL_LINKS } from "@/config/socials";
import soundcloudBg from "../../../assets/img/soundcloud-bg.jpg";

const SOUNDCLOUD_EMBED_URL = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SOCIAL_LINKS.soundcloud)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false`;

function SoundCloudSection() {
  const { t } = useTranslation();
  const title = t("soundcloud.title");

  return (
    <section className="soundcloudSection">
      <div className="background">
        <img src={soundcloudBg} alt="" className="backgroundImage" />
        <div className="backgroundOverlay" />
      </div>
      <div className="content">
        <h2 className="title">{title}</h2>
        <div className="embed">
          <iframe
            title="Gazmatek Records SoundCloud"
            width="100%"
            height="600"
            allow="autoplay"
            src={SOUNDCLOUD_EMBED_URL}
          />
        </div>
      </div>
    </section>
  );
}

export default SoundCloudSection;
