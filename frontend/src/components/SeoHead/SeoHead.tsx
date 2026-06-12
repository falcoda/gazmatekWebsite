import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { SITE_NAME, SITE_SHARE_IMAGE, SITE_URL } from "@/config/site";
import type { AppLanguage } from "@/i18n/config";
import { buildLocalizedPath, stripLanguagePrefix } from "@/i18n/routing";

interface SeoHeadProps {
  title: string;
  description: string;
  language: AppLanguage;
  image?: string;
}

const SeoHead = ({ title, description, language, image }: SeoHeadProps) => {
  const location = useLocation();
  const canonicalUrl = new URL(location.pathname, SITE_URL).toString();

  // Convert image to absolute URL for Facebook sharing
  const shareImage = image
    ? image.startsWith("http")
      ? image
      : new URL(image, SITE_URL).toString()
    : SITE_SHARE_IMAGE;

  const pagePath = stripLanguagePrefix(location.pathname);
  const frUrl = new URL(
    buildLocalizedPath("fr", pagePath),
    SITE_URL,
  ).toString();
  const enUrl = new URL(
    buildLocalizedPath("en", pagePath),
    SITE_URL,
  ).toString();
  const ogLocale = language === "fr" ? "fr_BE" : "en_US";

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={frUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={shareImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      <meta itemProp="image" content={shareImage} />
    </Helmet>
  );
};

export default SeoHead;
