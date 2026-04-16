import "./CookieBanner.scss";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "gazmatek_consent";

type ConsentValue = "granted" | "denied";

interface ConsentPreferences {
  analytics: ConsentValue;
  ads: ConsentValue;
}

function pushConsentUpdate(prefs: ConsentPreferences) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: prefs.analytics,
    ad_storage: prefs.ads,
    ad_user_data: prefs.ads,
    ad_personalization: prefs.ads,
  });
}

function loadStoredPreferences(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

function savePreferences(prefs: ConsentPreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

const CookieBanner = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [adsEnabled, setAdsEnabled] = useState(false);

  useEffect(() => {
    const stored = loadStoredPreferences();
    if (stored) {
      pushConsentUpdate(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const applyAndClose = (prefs: ConsentPreferences) => {
    savePreferences(prefs);
    pushConsentUpdate(prefs);
    setVisible(false);
  };

  const handleAcceptAll = () => {
    applyAndClose({ analytics: "granted", ads: "granted" });
  };

  const handleRejectAll = () => {
    applyAndClose({ analytics: "denied", ads: "denied" });
  };

  const handleSaveCustom = () => {
    applyAndClose({
      analytics: analyticsEnabled ? "granted" : "denied",
      ads: adsEnabled ? "granted" : "denied",
    });
  };

  if (!visible) return null;

  return (
    <div className="cookieBanner" role="dialog" aria-modal="true" aria-label={t("cookieBanner.title")}>
      <div className="cookieBannerInner">
        <h3 className="cookieBannerTitle">{t("cookieBanner.title")}</h3>
        <p className="cookieBannerBody">{t("cookieBanner.body")}</p>

        {customizing && (
          <div className="cookieBannerOptions">
            <label className="cookieBannerOption">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              />
              <span className="cookieBannerOptionLabel">
                <strong>{t("cookieBanner.analytics")}</strong>
                <span className="cookieBannerOptionDesc">{t("cookieBanner.analyticsDesc")}</span>
              </span>
            </label>

            <label className="cookieBannerOption">
              <input
                type="checkbox"
                checked={adsEnabled}
                onChange={(e) => setAdsEnabled(e.target.checked)}
              />
              <span className="cookieBannerOptionLabel">
                <strong>{t("cookieBanner.ads")}</strong>
                <span className="cookieBannerOptionDesc">{t("cookieBanner.adsDesc")}</span>
              </span>
            </label>
          </div>
        )}

        <div className="cookieBannerActions">
          {customizing ? (
            <>
              <button className="cookieBannerBtn cookieBannerBtnSecondary" onClick={handleRejectAll}>
                {t("cookieBanner.rejectAll")}
              </button>
              <button className="cookieBannerBtn cookieBannerBtnPrimary" onClick={handleSaveCustom}>
                {t("cookieBanner.savePreferences")}
              </button>
            </>
          ) : (
            <>
              <button
                className="cookieBannerBtn cookieBannerBtnGhost"
                onClick={() => setCustomizing(true)}
              >
                {t("cookieBanner.customize")}
              </button>
              <button className="cookieBannerBtn cookieBannerBtnSecondary" onClick={handleRejectAll}>
                {t("cookieBanner.rejectAll")}
              </button>
              <button className="cookieBannerBtn cookieBannerBtnPrimary" onClick={handleAcceptAll}>
                {t("cookieBanner.acceptAll")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
