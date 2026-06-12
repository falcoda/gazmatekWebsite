import "./EquipmentCard.scss";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { EquipmentItem } from "@/content/equipment";
import { getLocalizedText } from "@/content/types";

interface EquipmentCardProps {
  item: EquipmentItem;
}

const EquipmentCard = ({ item }: EquipmentCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? "fr";

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <article
      className={`equipmentCard${expanded ? " expanded" : ""}`}
      onClick={handleToggle}
      aria-expanded={expanded}
    >
      <div className="image">
        <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
      </div>

      <div className="body">
        <span className="category">
          {getLocalizedText(item.category, lang)}
        </span>
        <h3 className="name">{item.name}</h3>
        <p className="summary">{getLocalizedText(item.summary, lang)}</p>
      </div>

      {expanded && (
        <div className="detail" onClick={(e) => e.stopPropagation()}>
          {item.description && (
            <p className="description">
              {getLocalizedText(item.description, lang)}
            </p>
          )}
          {item.specs && item.specs.length > 0 ? (
            <dl className="specs">
              <dt className="specsTitle">{t("servicesPage.specsLabel")}</dt>
              {item.specs.map((spec, idx) => (
                <div key={idx} className="specRow">
                  <dt>{getLocalizedText(spec.label, lang)}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            !item.description && (
              <p className="noSpecs">{t("servicesPage.noSpecs")}</p>
            )
          )}
        </div>
      )}

      <button
        className="toggle"
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        aria-label={expanded ? "Reduire" : "Voir le detail"}
        type="button"
      >
        <span className={`chevron${expanded ? " up" : ""}`} />
      </button>
    </article>
  );
};

export default EquipmentCard;
