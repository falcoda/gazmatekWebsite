import "./ServicesTeaser.scss";

import { useTranslation } from "react-i18next";

import { PAGES } from "@/config/pages";
import equipment1 from "../../../assets/img/materiel/equipment-1.jpg";
import equipment2 from "../../../assets/img/materiel/equipment-2.jpg";
import equipment3 from "../../../assets/img/materiel/equipment-3.jpg";
import useAnimatedNavigate from "../../../hooks/useAnimatedNavigate";

const EQUIPMENT_PHOTOS = [equipment1, equipment2, equipment3];

function ServicesTeaser() {
  const { t } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();

  const servicesList = t("services.list", { returnObjects: true }) as Array<{
    name: string;
    description: string;
  }>;

  const teaserServices = servicesList.slice(0, 3);

  return (
    <section className="servicesTeaser">
      <div className="servicesTeaserInner">
        <h2 className="servicesTeaserSectionTitle">
          {t("servicesTeaser.sectionTitle")}
        </h2>
        <div className="servicesTeaserList">
          {teaserServices.map((service, index) => (
            <div key={service.name} className="serviceTeaserItem">
              <div className="serviceTeaserPhoto">
                <img
                  src={EQUIPMENT_PHOTOS[index]}
                  alt={service.name}
                  className="serviceTeaserImg"
                />
              </div>
              <div className="serviceTeaserContent">
                <h3 className="serviceTeaserName">{service.name}</h3>
                <p className="serviceTeaserExcerpt">
                  {service.description.slice(0, 90)}
                  {service.description.length > 90 ? "…" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="servicesTeaserCta"
          type="button"
          onClick={() => animatedNavigate(PAGES.services)}
        >
          {t("servicesTeaser.cta")}
        </button>
      </div>
    </section>
  );
}

export default ServicesTeaser;

