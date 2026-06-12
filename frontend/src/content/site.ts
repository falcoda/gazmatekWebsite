import type { PageKey } from "@/config/pages";

import { createLocalizedText, type LocalizedText } from "./types";

export interface SiteNavigationItem {
  id: string;
  page: PageKey;
  labelKey: string;
  children?: SiteNavigationItem[];
}

export const DEFAULT_SEO = {
  title: createLocalizedText("Gazmatek", "Gazmatek"),
  description: createLocalizedText(
    "Collectif belge de sound system, artistes residents, evenements tekno underground et location de sonorisation.",
    "Belgian sound system collective, resident artists, underground tekno events and sound system rental.",
  ),
};

export const HOME_EDITORIAL = {
  eyebrow: createLocalizedText("Collectif belge", "Belgian collective"),
  intro: createLocalizedText(
    "Gazmatek construit des nuits brutes, des line-ups residents et un son pense pour le terrain.",
    "Gazmatek builds raw nights, resident line-ups, and a sound system shaped for real-world events.",
  ),
};

export const CONTACT_INTRO = {
  title: createLocalizedText("Parlons projet", "Let's talk"),
  body: createLocalizedText(
    "Bookings, devis location, collaborations ou simple prise de contact: le point d'entree est volontairement unique.",
    "Bookings, rental quotes, collaborations, or a first conversation all start from one clear contact point.",
  ),
};

export const SERVICES_INTRO = {
  title: createLocalizedText("Partenaire technique", "Technical partner"),
  eyebrow: createLocalizedText("Services & location", "Services & rental"),
  body: createLocalizedText(
    "Gazmatek met son parc materiel et son expertise terrain au service de vos evenements. Location de systeme son, reglage, restauration d'enceintes ou conception de line-up : un seul interlocuteur, du montage au rappel.",
    "Gazmatek puts its equipment inventory and field expertise at the service of your events. Sound system rental, tuning, speaker restoration or line-up curation: one point of contact, from setup to encore.",
  ),
};

export const SITE_NAVIGATION: SiteNavigationItem[] = [
  {
    id: "home",
    page: "home",
    labelKey: "nav.home",
  },
  {
    id: "about",
    page: "about",
    labelKey: "nav.about",
  },
  {
    id: "artists",
    page: "artists",
    labelKey: "nav.artists",
  },
  {
    id: "events",
    page: "events",
    labelKey: "nav.events",
  },
  {
    id: "more",
    page: "services",
    labelKey: "nav.more",
    children: [
      {
        id: "services",
        page: "services",
        labelKey: "nav.services",
      },
      {
        id: "contact",
        page: "contact",
        labelKey: "nav.contact",
      },
    ],
  },
];

export const LEGACY_ROUTE_ALIASES = {
  about: "qui-sommes-nous",
  artists: "artistes",
  artistDetail: "artiste/:slug",
  events: "evenements",
  eventUpcoming: "next-events",
  eventArchive: "archives",
  eventDetail: "evenement/:slug",
  terms: "termes-dutilisation",
} as const;

export const FOOTER_COPY: {
  tagline: LocalizedText;
} = {
  tagline: createLocalizedText(
    "Collectif belge de sound system, artistes residents, evenements tekno underground et location de sonorisation.",
    "Belgian sound system collective, resident artists, underground tekno events and sound system rental.",
  ),
};
