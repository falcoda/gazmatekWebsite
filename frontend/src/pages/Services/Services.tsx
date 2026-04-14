import "./Services.scss";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { buildLocalizedPath } from "@/i18n/routing";

import EquipmentCard from "@/components/EquipmentCard/EquipmentCard";
import SeoHead from "@/components/SeoHead/SeoHead";
import type { AppLanguage } from "@/i18n/config";
import { PAGES } from "@/config/pages";
import { EQUIPMENT_ITEMS, SERVICE_OFFERS } from "@/content/equipment";
import { SERVICES_INTRO } from "@/content/site";
import { getLocalizedText } from "@/content/types";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Services = () => {
  const { i18n, t } = useTranslation();
  const language = (i18n.resolvedLanguage ?? "fr") as AppLanguage;

  useScrollAnimation();

  return (
    <div className="servicesPage">
      <SeoHead
        title={t("servicesPage.seoTitle")}
        description={t("servicesPage.seoDescription")}
        language={language}
      />

      {/* Hero */}
      <section className="hero fi">
        <p className="eyebrow">{t("servicesPage.heroEyebrow")}</p>
        <h1 className="heroTitle">
          {getLocalizedText(SERVICES_INTRO.title, language)}
        </h1>
        <p className="heroBody">
          {getLocalizedText(SERVICES_INTRO.body, language)}
        </p>
      </section>

      {/* Offers */}
      <section className="section fi">
        <div className="sectionHead">
          <p className="eyebrow">{t("servicesPage.offersEyebrow")}</p>
          <h2 className="sectionTitle">{t("servicesPage.offersTitle")}</h2>
        </div>
        <div className="offerGrid">
          {SERVICE_OFFERS.map((offer) => (
            <article key={offer.id} className="offerCard">
              <div className="offerIndex" aria-hidden="true" />
              <h3 className="offerTitle">
                {getLocalizedText(offer.title, language)}
              </h3>
              <p className="offerDesc">
                {getLocalizedText(offer.description, language)}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Equipment grid */}
      <section className="section dark fi">
        <div className="sectionHead">
          <p className="eyebrow">{t("servicesPage.equipmentEyebrow")}</p>
          <h2 className="sectionTitle">{t("servicesPage.equipmentTitle")}</h2>
          <p className="sectionSubtitle">{t("servicesPage.equipmentSubtitle")}</p>
        </div>
        <div className="equipmentGrid">
          {EQUIPMENT_ITEMS.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Quote CTA */}
      <section className="quoteSection fi">
        <div className="quoteContent">
          <p className="eyebrow">{t("servicesPage.quoteEyebrow")}</p>
          <h2 className="quoteTitle">{t("servicesPage.quoteTitle")}</h2>
          <p className="quoteBody">{t("servicesPage.quoteBody")}</p>
          <Link
            to={`${buildLocalizedPath(language, PAGES.contact)}?subject=quote`}
            className="quoteCta"
          >
            {t("servicesPage.quoteCta")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
