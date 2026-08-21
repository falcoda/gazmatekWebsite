import "./CollectiveIntro.scss";

import { useTranslation } from "react-i18next";

import { PAGES } from "@/config/pages";
import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";

function CollectiveIntro() {
  const { t } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();

  return (
    <section className="collectiveIntro">
      <div className="collectiveIntroInner">
        <div className="collectiveIntroSep" />
        <p className="collectiveIntroLabel">{t("collectiveIntro.title")}</p>
        <p className="collectiveIntroText">{t("collectiveIntro.text")}</p>
        <button
          className="collectiveIntroCta"
          type="button"
          onClick={() => animatedNavigate(PAGES.about)}
        >
          {t("collectiveIntro.cta")}
        </button>
        <div className="collectiveIntroSep" />
      </div>
    </section>
  );
}

export default CollectiveIntro;
