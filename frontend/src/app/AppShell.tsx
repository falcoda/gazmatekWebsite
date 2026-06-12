import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import CookieBanner from "@/components/CookieBanner/CookieBanner";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Footer from "@/components/Footer/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Navbar from "@/components/Navbar/Navbar";
import SeoHead from "@/components/SeoHead/SeoHead";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { SOCIAL_LINKS } from "@/config/socials";
import { DEFAULT_SEO } from "@/content/site";
import { getLocalizedText } from "@/content/types";
import type { AppLanguage } from "@/i18n/config";

interface AppShellProps {
  children: ReactNode;
  language: AppLanguage;
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  sameAs: [
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.soundcloud,
  ],
  description:
    "Belgian sound system collective, resident artists, underground tekno events and sound system rental.",
};

function AppShell({ children, language }: AppShellProps) {
  return (
    <div className="App">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>
      <SeoHead
        title={getLocalizedText(DEFAULT_SEO.title, language)}
        description={getLocalizedText(DEFAULT_SEO.description, language)}
        language={language}
      />
      <header>
        <Navbar
          langSwitcher={<LanguageSwitcher />}
          mobileLangSwitcher={<LanguageSwitcher mobile />}
        />
      </header>
      <CustomCursor />
      <main>{children}</main>
      <Footer />
      <Toaster position="bottom-right" reverseOrder={false} />
      <CookieBanner />
    </div>
  );
}

export default AppShell;
