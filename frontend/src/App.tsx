/// <reference types="vite-plugin-svgr/client" />

import "./App.scss";
import "./i18n/i18n";

import { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";

import AppShell from "@/app/AppShell";
import { buildPagePath, PAGES } from "@/config/pages";
import { SOCIAL_LINKS } from "@/config/socials";
import { LEGACY_ROUTE_ALIASES } from "@/content/site";
import useAnimatedNavigate from "@/hooks/useAnimatedNavigate";
import { type AppLanguage } from "@/i18n/config";
import {
  buildLocalizedPath,
  detectPreferredLanguage,
  isSupportedLanguage,
} from "@/i18n/routing";
import useSyncLanguage from "@/i18n/useSyncLanguage";
import AboutUs from "@/pages/AboutUs/AboutUs";
import ArtistDetail from "@/pages/ArtistDetail/ArtistDetail";
import Artistes from "@/pages/Artistes/Artistes";
import Contact from "@/pages/Contact/Contact";
import Archives from "@/pages/Events/Archives/Archives";
import EventDetail from "@/pages/Events/EventDetail/EventDetail";
import EventsHub from "@/pages/Events/EventsHub/EventsHub";
import NextEvents from "@/pages/Events/NextEvents/NextEvents";
import Home from "@/pages/Home/Home";
import Services from "@/pages/Services/Services";
import TermsOfUses from "@/pages/TermsOfUses/TermsOfUses";

function LangRedirect() {
  const lang = detectPreferredLanguage();

  return <Navigate to={`/${lang}/`} replace />;
}

function LegacyArtistDetailRedirect({ language }: { language: AppLanguage }) {
  const { slug = "" } = useParams<{ slug: string }>();

  return (
    <Navigate
      to={buildLocalizedPath(language, buildPagePath("artistDetail", { slug }))}
      replace
    />
  );
}

function LegacyEventDetailRedirect({ language }: { language: AppLanguage }) {
  const { slug = "" } = useParams<{ slug: string }>();

  return (
    <Navigate
      to={buildLocalizedPath(language, buildPagePath("eventDetail", { slug }))}
      replace
    />
  );
}

function ExternalRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return null;
}

function LocalizedApp() {
  const { lang } = useParams<{ lang: string }>();
  const animatedNavigate = useAnimatedNavigate();

  const currentLanguage: AppLanguage | null = isSupportedLanguage(lang)
    ? lang
    : null;

  useSyncLanguage(currentLanguage);

  useEffect(() => {
    if (!currentLanguage) {
      animatedNavigate("/", { replace: true, skipAnimation: true });
    }
  }, [animatedNavigate, currentLanguage]);

  if (!currentLanguage) {
    return null;
  }

  return (
    <AppShell language={currentLanguage}>
      <Routes>
        <Route index element={<Home />} />
        <Route path={PAGES.about.slice(1)} element={<AboutUs />} />
        <Route path={PAGES.artists.slice(1)} element={<Artistes />} />
        <Route path={PAGES.artistDetail.slice(1)} element={<ArtistDetail />} />
        <Route path={PAGES.events.slice(1)} element={<EventsHub />} />
        <Route path={PAGES.eventsUpcoming.slice(1)} element={<NextEvents />} />
        <Route path={PAGES.eventsArchive.slice(1)} element={<Archives />} />
        <Route path={PAGES.eventDetail.slice(1)} element={<EventDetail />} />
        <Route path={PAGES.services.slice(1)} element={<Services />} />
        <Route path={PAGES.contact.slice(1)} element={<Contact />} />
        <Route path={PAGES.termsOfUses.slice(1)} element={<TermsOfUses />} />

        <Route
          path={LEGACY_ROUTE_ALIASES.about}
          element={
            <Navigate
              to={buildLocalizedPath(currentLanguage, PAGES.about)}
              replace
            />
          }
        />
        <Route
          path={LEGACY_ROUTE_ALIASES.artists}
          element={
            <Navigate
              to={buildLocalizedPath(currentLanguage, PAGES.artists)}
              replace
            />
          }
        />
        <Route
          path={LEGACY_ROUTE_ALIASES.artistDetail}
          element={<LegacyArtistDetailRedirect language={currentLanguage} />}
        />
        <Route
          path={LEGACY_ROUTE_ALIASES.events}
          element={
            <Navigate
              to={buildLocalizedPath(currentLanguage, PAGES.events)}
              replace
            />
          }
        />
        <Route
          path={LEGACY_ROUTE_ALIASES.eventUpcoming}
          element={
            <Navigate
              to={buildLocalizedPath(currentLanguage, PAGES.eventsUpcoming)}
              replace
            />
          }
        />
        <Route
          path={LEGACY_ROUTE_ALIASES.eventArchive}
          element={
            <Navigate
              to={buildLocalizedPath(currentLanguage, PAGES.eventsArchive)}
              replace
            />
          }
        />
        <Route
          path={LEGACY_ROUTE_ALIASES.eventDetail}
          element={<LegacyEventDetailRedirect language={currentLanguage} />}
        />
        <Route
          path={LEGACY_ROUTE_ALIASES.terms}
          element={
            <Navigate
              to={buildLocalizedPath(currentLanguage, PAGES.termsOfUses)}
              replace
            />
          }
        />
        <Route
          path="*"
          element={<Navigate to={`/${currentLanguage}/`} replace />}
        />
      </Routes>
    </AppShell>
  );
}

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route
        path="/facebook"
        element={<ExternalRedirect href={SOCIAL_LINKS.facebook} />}
      />
      <Route path="/:lang/*" element={<LocalizedApp />} />
      <Route path="/" element={<LangRedirect />} />
      <Route path="*" element={<LangRedirect />} />
    </Routes>
  </Router>
);

export default AppWrapper;

