import gazmatekLogo from "../assets/svg/logo.svg";
import {
  createLocalizedText,
  getLocalizedText,
  type LocalizedImage,
  type LocalizedText,
} from "./types";

type EventStatus = "upcoming" | "past";
type EventArchiveCategory = "legal" | "illegal";
type EventContentTier = "documented" | "rich";
type EventSourceKind =
  | "archive-folder"
  | "archive-photo"
  | "promo-visual"
  | "current-flyer"
  | "site-placeholder"
  | "facebook-event"
  | "facebook-doc";

interface EventSeo {
  title: LocalizedText;
  description: LocalizedText;
}

interface EventLegacySource {
  id: string;
  kind: EventSourceKind;
  label: string;
  path: string;
  note?: string;
}

interface EventSourceMap {
  title: string[];
  date: string[];
  description: string[];
  poster: string[];
  gallery: string[];
  venue?: string[];
  lineup?: string[];
}

interface EventMedia extends LocalizedImage {
  sourceId: string;
}

export interface GazmatekEvent {
  id: string;
  slug: string;
  title: LocalizedText;
  status: EventStatus;
  date: string;
  venue: string | null;
  city: string | null;
  country: string | null;
  address: string | null;
  poster: EventMedia;
  gallery: EventMedia[];
  lineup: string[];
  description: LocalizedText;
  summary: LocalizedText;
  seo: EventSeo;
  archiveCategory?: EventArchiveCategory;
  contentTier: EventContentTier;
  ticketUrl?: string;
  hubHighlight?: boolean;
  legacySources: EventLegacySource[];
  sourceMap: EventSourceMap;
}

const EVENT_IMAGES = import.meta.glob(
  "../assets/img/events/**/*.{png,jpg,jpeg,JPG,JPEG}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

function getEventImage(path: string): string {
  const key = `../assets/img/events/${path}`;
  const image = EVENT_IMAGES[key];

  if (!image) {
    return gazmatekLogo;
  }

  return image;
}

function createEventMedia(
  path: string,
  frenchAlt: string,
  englishAlt: string,
  sourceId: string,
): EventMedia {
  return {
    src: getEventImage(path),
    alt: createLocalizedText(frenchAlt, englishAlt),
    sourceId,
  };
}

function createEventMediaFromSrc(
  src: string,
  frenchAlt: string,
  englishAlt: string,
  sourceId: string,
): EventMedia {
  return {
    src,
    alt: createLocalizedText(frenchAlt, englishAlt),
    sourceId,
  };
}

function createEventPlaceholderMedia(
  frenchAlt: string,
  englishAlt: string,
  sourceId: string,
): EventMedia {
  return createEventMediaFromSrc(gazmatekLogo, frenchAlt, englishAlt, sourceId);
}

function createEventSeo(
  frenchTitle: string,
  englishTitle: string,
  frenchDescription: string,
  englishDescription: string,
): EventSeo {
  return {
    title: createLocalizedText(frenchTitle, englishTitle),
    description: createLocalizedText(frenchDescription, englishDescription),
  };
}

export const EVENTS: GazmatekEvent[] = [
  {
    id: "gazmatek-invite-alchimyst-infrabass",
    slug: "gazmatek-invite-alchimyst-infrabass",
    title: createLocalizedText(
      "Gazmatek Invite Alchimyst Infrabass",
      "Gazmatek Invite Alchimyst Infrabass",
    ),
    status: "upcoming",
    date: "2026-07-04T22:00:00",
    venue: "Buda BXL",
    city: "Brussels",
    country: "Belgium",
    address: "Chaussée de Buda 96, 1130 Bruxelles",
    poster: createEventMedia(
      "gazmatek-invite-alchimyst-infrabass/poster.png",
      "Flyer Gazmatek Invite Alchimyst Infrabass",
      "Gazmatek Invite Alchimyst Infrabass flyer",
      "shotgun-alchimyst-infrabass",
    ),
    gallery: [],
    lineup: [
      "David Green",
      "Sevenum Six",
      "Looping",
      "T-Rence",
      "Terapeutek",
      "Olibrius",
      "Nocid",
      "Kemikal Crow",
    ],
    description: createLocalizedText(
      "GAZMATEK INVITE — ALCHIMYST INFRABASS\n\nUne rencontre entre deux univers. Deux énergies. Une seule fréquence.\n\nLe 04 juillet 2026, Buda BXL devient le point de convergence d'un son brut, industriel et sans compromis. Attends-toi à une nuit dense, sombre et hypnotique, où la tekno industrielle, les basses lourdes et les textures infrabass vont redéfinir l'espace.\n\nUne immersion totale avec un mapping en 3 dimensions.\n\nLINE UP : David Green, Sevenum Six, Looping, T-Rence, Terapeutek, Olibrius, Nocid, Kemikal Crow\nVJING : Toff (Alchimyst/Infrabass), Panoramix (Gazmatek)\n\nCapacité limitée. Presales 15€ / 18€ / 20€. At doors 20€.",
      "GAZMATEK INVITE — ALCHIMYST INFRABASS\n\nA meeting between two worlds. Two energies. One single frequency.\n\nOn July 4, 2026, Buda BXL becomes the convergence point of a raw, industrial and uncompromising sound. Expect a dense, dark and hypnotic night where industrial tekno, heavy bass and infrabass textures will redefine space.\n\nTotal immersion with 3D mapping.\n\nLINE UP: David Green, Sevenum Six, Looping, T-Rence, Terapeutek, Olibrius, Nocid, Kemikal Crow\nVJING: Toff (Alchimyst/Infrabass), Panoramix (Gazmatek)\n\nLimited capacity. Presales 15€ / 18€ / 20€. At doors 20€.",
    ),
    summary: createLocalizedText(
      "Gazmatek invite Alchimyst Infrabass au Buda BXL pour une nuit de tekno industrielle et basses lourdes avec mapping 3D.",
      "Gazmatek invites Alchimyst Infrabass at Buda BXL for a night of industrial tekno and heavy bass with 3D mapping.",
    ),
    seo: createEventSeo(
      "Gazmatek Invite Alchimyst Infrabass | Gazmatek",
      "Gazmatek Invite Alchimyst Infrabass | Gazmatek",
      "Le 4 juillet 2026, Gazmatek invite Alchimyst Infrabass au Buda BXL à Bruxelles pour une nuit de tekno industrielle avec David Green, Sevenum Six, Kemikal Crow et plus.",
      "On July 4, 2026, Gazmatek invites Alchimyst Infrabass at Buda BXL in Brussels for a night of industrial tekno featuring David Green, Sevenum Six, Kemikal Crow and more.",
    ),
    contentTier: "documented",
    ticketUrl:
      "https://shotgun.live/fr/events/gazmatek-invite-alchimyst-infrabass",
    hubHighlight: true,
    legacySources: [
      {
        id: "shotgun-alchimyst-infrabass",
        kind: "facebook-event",
        label: "Shotgun: Gazmatek Invite Alchimyst Infrabass",
        path: "https://shotgun.live/fr/events/gazmatek-invite-alchimyst-infrabass",
        note: "Source officielle de billetterie. Confirme la date, le lieu, le lineup et les tarifs.",
      },
    ],
    sourceMap: {
      title: ["shotgun-alchimyst-infrabass"],
      date: ["shotgun-alchimyst-infrabass"],
      description: ["shotgun-alchimyst-infrabass"],
      poster: ["shotgun-alchimyst-infrabass"],
      gallery: [],
      venue: ["shotgun-alchimyst-infrabass"],
      lineup: ["shotgun-alchimyst-infrabass"],
    },
  },
  {
    id: "bodies-in-space-2026",
    slug: "bodies-in-space-2026",
    title: createLocalizedText("Insolent x Gazmatek", "Insolent x Gazmatek"),
    status: "past",
    date: "2026-03-27T22:00:00",
    venue: "Bodies in Space",
    city: "Brussels",
    country: "Belgium",
    address: "Rue de Flandre 46",
    poster: createEventMedia(
      "bodies-in-space/poster.jpg",
      "Flyer Insolent x Gazmatek",
      "Insolent x Gazmatek flyer",
      "current-flyer",
    ),
    gallery: [],
    lineup: [
      "Cantik",
      "Ecleptix",
      "Sevenum Six",
      "Terapeutek",
      "Raik",
      "Soul3D",
      "Toxyblue",
      "Mobykick",
    ],
    description: createLocalizedText(
      "Insolent x Gazmatek prend la forme d'une birthday tekno rave sur deux nuits, les 27 et 28 mars 2026, au Bodies In Space a Berchem-Sainte-Agathe. Cette premiere nuit aligne Cantik, Ecleptix, Sevenum Six, Terapeutek, Raik, Soul3D, Toxyblue et Mobykick.",
      "Insolent x Gazmatek takes the form of a two-night birthday tekno rave on March 27 and 28, 2026 at Bodies In Space in Berchem-Sainte-Agathe. This first night lines up Cantik, Ecleptix, Sevenum Six, Terapeutek, Raik, Soul3D, Toxyblue, and Mobykick.",
    ),
    summary: createLocalizedText(
      "Birthday tekno rave sur deux nuits au Bodies In Space, avec Insolent Events et un line-up Gazmatek complet.",
      "A two-night birthday tekno rave at Bodies In Space, with Insolent Events and a full Gazmatek lineup.",
    ),
    seo: createEventSeo(
      "Insolent x Gazmatek | Gazmatek",
      "Insolent x Gazmatek | Gazmatek",
      "Flyer recent Gazmatek au Bodies in Space a Bruxelles, date du 27 mars 2026 et line-up documente.",
      "Recent Gazmatek flyer for Bodies in Space in Brussels, dated March 27, 2026 with a documented lineup.",
    ),
    contentTier: "documented",
    legacySources: [
      {
        id: "current-flyer",
        kind: "current-flyer",
        label: "Insolent x Gazmatek flyer",
        path: "frontend/src/assets/img/events/27_03_26_bodies_in_space.jpg",
      },
      {
        id: "fb-bodies-in-space-2026",
        kind: "facebook-event",
        label: "Facebook: Gazmatek x Insolent Events in space (2 nights)",
        path: "https://www.facebook.com/events/2413971385728877",
        note: "Confirme la co-organisation avec Insolent Events et le format 2 nuits.",
      },
    ],
    sourceMap: {
      title: ["current-flyer"],
      date: ["current-flyer"],
      description: ["current-flyer", "fb-bodies-in-space-2026"],
      poster: ["current-flyer"],
      gallery: [],
      venue: ["current-flyer"],
      lineup: ["current-flyer"],
    },
  },
  {
    id: "gazmatek-invites-sp23",
    slug: "gazmatek-invites-sp23",
    title: createLocalizedText("Gazmatek invite SP23", "Gazmatek Invites SP23"),
    status: "past",
    date: "2024-07-13T22:00:00",
    venue: null,
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "gazmatek-invites-sp23/poster.jpg",
      "Photo d'archive SP23 du 13 juillet 2024",
      "SP23 archive photo from July 13, 2024",
      "sp23-poster",
    ),
    gallery: [
      createEventMedia(
        "gazmatek-invites-sp23/gallery-01.jpg",
        "Public de la date SP23",
        "Crowd at the SP23 date",
        "sp23-gallery-01",
      ),
      createEventMedia(
        "gazmatek-invites-sp23/gallery-02.jpg",
        "Scene SP23 dans les archives",
        "SP23 scene in the archive",
        "sp23-gallery-02",
      ),
      createEventMedia(
        "gazmatek-invites-sp23/gallery-03.jpg",
        "Fin de soiree SP23",
        "SP23 closing scene",
        "sp23-gallery-03",
      ),
    ],
    lineup: ["SP23"],
    description: createLocalizedText(
      "Gazmatek invite SP23 pour une collaboration Open Air & Indoor a Bruxelles le 13 juillet 2024. L'evenement met en avant le collectif en full crew et prolonge la volonte de Gazmatek d'accueillir des figures historiques du mouvement.",
      "Gazmatek invites SP23 for an Open Air & Indoor collaboration in Brussels on July 13, 2024. The event puts the collective forward in full crew mode and extends Gazmatek's intent to host key figures from the movement.",
    ),
    summary: createLocalizedText(
      "Collaboration Open Air & Indoor a Bruxelles avec SP23 en full crew.",
      "An Open Air & Indoor collaboration in Brussels with SP23 in full crew mode.",
    ),
    seo: createEventSeo(
      "Gazmatek invite SP23 | Gazmatek",
      "Gazmatek Invites SP23 | Gazmatek",
      "Archive photo Gazmatek liee a SP23, date du 13 juillet 2024 confirmee par le dossier legacy.",
      "Gazmatek photo archive tied to SP23, with the July 13, 2024 date confirmed by the legacy folder.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "sp23-folder",
        kind: "archive-folder",
        label: "Archive folder 2024_13_07 SP23",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2024_13_07 SP23",
      },
      {
        id: "sp23-poster",
        kind: "archive-photo",
        label: "DSC04012.jpg",
        path: "old-website-assets/.../2024_13_07 SP23/JPEG/DSC04012.jpg",
        note: "Used as the lead visual because no dedicated flyer survives in the recovered assets.",
      },
      {
        id: "sp23-gallery-01",
        kind: "archive-photo",
        label: "DSC04101.jpg",
        path: "old-website-assets/.../2024_13_07 SP23/JPEG/DSC04101.jpg",
      },
      {
        id: "sp23-gallery-02",
        kind: "archive-photo",
        label: "DSC04405.jpg",
        path: "old-website-assets/.../2024_13_07 SP23/JPEG/DSC04405.jpg",
      },
      {
        id: "sp23-gallery-03",
        kind: "archive-photo",
        label: "DSC04852.jpg",
        path: "old-website-assets/.../2024_13_07 SP23/JPEG/DSC04852.jpg",
      },
      {
        id: "fb-sp23",
        kind: "facebook-event",
        label: "Facebook: GAZMATEK invite SP23 |FULL CREW| - OPEN AIR & INDOOR",
        path: "https://www.facebook.com/events/432050539410076",
        note: "Confirme le format Open Air & Indoor, le lieu Bruxelles et le collectif SP23.",
      },
    ],
    sourceMap: {
      title: ["sp23-folder"],
      date: ["sp23-folder"],
      description: ["sp23-folder", "fb-sp23"],
      poster: ["sp23-poster"],
      gallery: ["sp23-gallery-01", "sp23-gallery-02", "sp23-gallery-03"],
      venue: ["fb-sp23"],
      lineup: ["fb-sp23"],
    },
  },
  {
    id: "gazmatek-invites-heretik",
    slug: "gazmatek-invites-heretik",
    title: createLocalizedText(
      "Gazmatek invite Heretik - Molitor B-Day",
      "Gazmatek Invites Heretik - Molitor B-Day",
    ),
    status: "past",
    date: "2024-04-13T22:00:00",
    venue: "Buda BXL",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "gazmatek-invites-heretik/poster.png",
      "Flyer Gazmatek invite Heretik - Molitor B-Day",
      "Flyer for Gazmatek Invites Heretik - Molitor B-Day",
      "heretik-poster",
    ),
    gallery: [
      createEventMedia(
        "gazmatek-invites-heretik/gallery-01.jpg",
        "Public de la soiree Heretik",
        "Crowd at the Heretik night",
        "heretik-gallery-01",
      ),
      createEventMedia(
        "gazmatek-invites-heretik/gallery-02.jpg",
        "Scene Heretik dans l'archive Gazmatek",
        "Heretik scene in the Gazmatek archive",
        "heretik-gallery-02",
      ),
      createEventMedia(
        "gazmatek-invites-heretik/gallery-03.jpg",
        "Ambiance industrielle de la date Heretik",
        "Industrial mood from the Heretik date",
        "heretik-gallery-03",
      ),
    ],
    lineup: ["Heretik"],
    description: createLocalizedText(
      "Gazmatek invite Heretik pour la Molitor B-Day a Buda BXL le 13 avril 2024. La date prend la forme d'une nuit club plus frontale et industrielle autour du crew invite.",
      "Gazmatek invites Heretik for Molitor B-Day at Buda BXL on April 13, 2024. The event takes the shape of a more direct and industrial club night built around the invited crew.",
    ),
    summary: createLocalizedText(
      "Molitor B-Day avec Heretik a Buda BXL.",
      "Molitor B-Day with Heretik at Buda BXL.",
    ),
    seo: createEventSeo(
      "Gazmatek invite Heretik - Molitor B-Day | Gazmatek",
      "Gazmatek Invites Heretik - Molitor B-Day | Gazmatek",
      "Archive Gazmatek avec flyer Heretik, date du 13 avril 2024 a Buda BXL et galerie photo.",
      "Gazmatek archive with the Heretik flyer, an April 13, 2024 date at Buda BXL, and a photo gallery.",
    ),
    archiveCategory: "legal",
    contentTier: "rich",
    hubHighlight: true,
    legacySources: [
      {
        id: "heretik-folder",
        kind: "archive-folder",
        label: "Archive folder HERETIK",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/HERETIK",
      },
      {
        id: "heretik-poster",
        kind: "promo-visual",
        label: "BANN FB.png",
        path: "old-website-assets/.../HERETIK/BANN FB.png",
        note: "Main poster because it contains the clearest surviving title, date, and venue.",
      },
      {
        id: "heretik-gallery-01",
        kind: "archive-photo",
        label: "429985991_413268464714730_2106863247268970263_n.jpg",
        path: "old-website-assets/.../HERETIK/429985991_413268464714730_2106863247268970263_n.jpg",
      },
      {
        id: "heretik-gallery-02",
        kind: "archive-photo",
        label: "BV1A1236-Avec accentuation-Bruit.jpg",
        path: "old-website-assets/.../HERETIK/BV1A1236-Avec accentuation-Bruit.jpg",
      },
      {
        id: "heretik-gallery-03",
        kind: "archive-photo",
        label: "BV1A1264-Avec accentuation-Bruit.jpg",
        path: "old-website-assets/.../HERETIK/BV1A1264-Avec accentuation-Bruit.jpg",
      },
      {
        id: "fb-heretik",
        kind: "facebook-event",
        label: "Facebook: GAZMATEK invite HERETIK ||Molitor Bday 23||",
        path: "https://www.facebook.com/events/1456170958668220",
        note: "Confirme Heretik comme artiste invite et le lien avec le Molitor Bday 23.",
      },
    ],
    sourceMap: {
      title: ["heretik-poster", "heretik-folder"],
      date: ["heretik-poster"],
      description: ["heretik-poster", "heretik-folder"],
      poster: ["heretik-poster"],
      gallery: [
        "heretik-gallery-01",
        "heretik-gallery-02",
        "heretik-gallery-03",
      ],
      venue: ["heretik-poster"],
      lineup: ["heretik-poster", "fb-heretik"],
    },
  },
  {
    id: "buda-temple",
    slug: "buda-temple",
    title: createLocalizedText("Buda Temple", "Buda Temple"),
    status: "past",
    date: "2024-01-20T22:00:00",
    venue: "Buda Temple",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "buda-temple/poster.png",
      "Flyer Buda Temple",
      "Buda Temple flyer",
      "buda-poster",
    ),
    gallery: [
      createEventMedia(
        "buda-temple/gallery-01.jpg",
        "Photo d'ambiance Buda Temple",
        "Buda Temple atmosphere photo",
        "buda-gallery-01",
      ),
      createEventMedia(
        "buda-temple/gallery-02.jpg",
        "Autre vue Buda Temple",
        "Another Buda Temple view",
        "buda-gallery-02",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Buda Temple transforme Buda BXL en nuit immersive le 20 janvier 2024, avec mapping, preventes par vagues et une programmation etalee de 22h jusqu'au matin.",
      "Buda Temple turns Buda BXL into an immersive night on January 20, 2024, with mapping, tiered presales, and programming running from 10pm into the morning.",
    ),
    summary: createLocalizedText(
      "Nuit immersive a Buda BXL avec mapping et format grand volume.",
      "An immersive Buda BXL night with mapping and a large-capacity format.",
    ),
    seo: createEventSeo(
      "Buda Temple | Gazmatek",
      "Buda Temple | Gazmatek",
      "Archive Gazmatek Buda Temple, date du 20 janvier 2024 documentee par flyer et photos.",
      "Gazmatek Buda Temple archive, a January 20, 2024 date documented through flyer and photos.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "buda-folder",
        kind: "archive-folder",
        label: "Archive folder 2024_20_01 BUDA",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2024_20_01 BUDA",
      },
      {
        id: "buda-poster",
        kind: "promo-visual",
        label: "BUDA TEMPLE.png",
        path: "old-website-assets/.../2024_20_01 BUDA/BUDA TEMPLE.png",
      },
      {
        id: "buda-gallery-01",
        kind: "archive-photo",
        label: "gazmatek buda temple-77-2.jpg",
        path: "old-website-assets/.../2024_20_01 BUDA/gazmatek buda temple-77-2.jpg",
      },
      {
        id: "buda-gallery-02",
        kind: "archive-photo",
        label: "gazmatek buda temple-80-2.jpg",
        path: "old-website-assets/.../2024_20_01 BUDA/gazmatek buda temple-80-2.jpg",
      },
      {
        id: "fb-buda-temple",
        kind: "facebook-event",
        label: "Facebook: Gazmatek Buda Temple",
        path: "https://www.facebook.com/events/1486949501877350",
      },
    ],
    sourceMap: {
      title: ["buda-poster", "buda-folder"],
      date: ["buda-folder", "buda-poster"],
      description: ["buda-folder", "buda-poster", "fb-buda-temple"],
      poster: ["buda-poster"],
      gallery: ["buda-gallery-01", "buda-gallery-02"],
      venue: ["buda-poster", "fb-buda-temple"],
    },
  },
  {
    id: "gazmatek-party-planet-park",
    slug: "gazmatek-party-planet-park",
    title: createLocalizedText(
      "Gazmatek Party - Planet Park Area",
      "Gazmatek Party - Planet Park Area",
    ),
    status: "past",
    date: "2024-02-17T22:00:00",
    venue: "Planet Park Area",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "gazmatek-party-planet-park/poster.png",
      "Flyer Gazmatek Party Planet Park Area",
      "Gazmatek Party Planet Park Area flyer",
      "planet-park-poster",
    ),
    gallery: [
      createEventMedia(
        "gazmatek-party-planet-park/gallery-01.jpg",
        "Photo live Planet Park",
        "Planet Park live photo",
        "planet-park-gallery-01",
      ),
      createEventMedia(
        "gazmatek-party-planet-park/gallery-02.jpg",
        "Public Planet Park",
        "Planet Park crowd",
        "planet-park-gallery-02",
      ),
      createEventMedia(
        "gazmatek-party-planet-park/gallery-03.jpg",
        "Detail de scene Planet Park",
        "Planet Park stage detail",
        "planet-park-gallery-03",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Gazmatek Party - Planet Park Area se tient le 17 fevrier 2024 a Planet Park, a Haren, dans un format de grande salle avec preventes par vagues et programmation de 22h jusqu'a l'aube.",
      "Gazmatek Party - Planet Park Area takes place on February 17, 2024 at Planet Park in Haren, in a large-room format with tiered presales and programming from 10pm until dawn.",
    ),
    summary: createLocalizedText(
      "Grande date 2024 a Planet Park, pensee pour la salle et l'endurance.",
      "A major 2024 Planet Park date built for room scale and endurance.",
    ),
    seo: createEventSeo(
      "Gazmatek Party - Planet Park Area | Gazmatek",
      "Gazmatek Party - Planet Park Area | Gazmatek",
      "Archive Gazmatek Planet Park Area a Bruxelles, date du 17 fevrier 2024 avec flyer et galerie photo.",
      "Gazmatek archive for Planet Park Area in Brussels, dated February 17, 2024 with flyer and gallery.",
    ),
    archiveCategory: "legal",
    contentTier: "rich",
    legacySources: [
      {
        id: "planet-park-folder",
        kind: "archive-folder",
        label: "Archive folder 2024_17_02 PLANET PARK PARTY",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2024_17_02 PLANET PARK PARTY",
      },
      {
        id: "planet-park-poster",
        kind: "promo-visual",
        label: "BANN FACEBOOK.png",
        path: "old-website-assets/.../2024_17_02 PLANET PARK PARTY/BANN FACEBOOK.png",
      },
      {
        id: "planet-park-gallery-01",
        kind: "archive-photo",
        label: "BV1A5417-Avec accentuation-Bruit.jpg",
        path: "old-website-assets/.../2024_17_02 PLANET PARK PARTY/BV1A5417-Avec accentuation-Bruit.jpg",
      },
      {
        id: "planet-park-gallery-02",
        kind: "archive-photo",
        label: "BV1A5708-Avec accentuation-Bruit.jpg",
        path: "old-website-assets/.../2024_17_02 PLANET PARK PARTY/BV1A5708-Avec accentuation-Bruit.jpg",
      },
      {
        id: "planet-park-gallery-03",
        kind: "archive-photo",
        label: "BV1A5980-Avec accentuation-Bruit.jpg",
        path: "old-website-assets/.../2024_17_02 PLANET PARK PARTY/BV1A5980-Avec accentuation-Bruit.jpg",
      },
      {
        id: "fb-planet-park",
        kind: "facebook-event",
        label: "Facebook: Gazmatek Party | Planet Park Area",
        path: "https://www.facebook.com/events/764634198913714",
        note: "2.2K interested, 277 going. Confirme le nom officiel et la date.",
      },
    ],
    sourceMap: {
      title: ["planet-park-poster", "planet-park-folder"],
      date: ["planet-park-poster", "planet-park-folder", "fb-planet-park"],
      description: [
        "planet-park-poster",
        "planet-park-folder",
        "fb-planet-park",
      ],
      poster: ["planet-park-poster"],
      gallery: [
        "planet-park-gallery-01",
        "planet-park-gallery-02",
        "planet-park-gallery-03",
      ],
      venue: ["planet-park-poster"],
    },
  },
  {
    id: "into-the-rave",
    slug: "into-the-rave",
    title: createLocalizedText("Into The Rave", "Into The Rave"),
    status: "past",
    date: "2024-02-24T22:00:00",
    venue: "Imprimerie",
    city: "Brussels",
    country: "Belgium",
    address: "Boulevard de Berlaimont 56, 1000 Brussels",
    poster: createEventMedia(
      "into-the-rave/poster.jpg",
      "Flyer Into The Rave",
      "Into The Rave flyer",
      "into-the-rave-poster",
    ),
    gallery: [
      createEventMedia(
        "into-the-rave/gallery-01.jpg",
        "Photo de foule Into The Rave",
        "Into The Rave crowd photo",
        "into-the-rave-gallery-01",
      ),
      createEventMedia(
        "into-the-rave/gallery-02.jpg",
        "Scene Into The Rave",
        "Into The Rave scene",
        "into-the-rave-gallery-02",
      ),
      createEventMedia(
        "into-the-rave/gallery-03.jpg",
        "Public en salle pour Into The Rave",
        "Indoor crowd for Into The Rave",
        "into-the-rave-gallery-03",
      ),
    ],
    lineup: ["Falc'ohm"],
    description: createLocalizedText(
      "Into The Rave installe une immersion son et lumiere a l'Imprimerie, au centre de Bruxelles, avec laser show, jauge de 500 personnes et format Falc'ohm x Gazmatek.",
      "Into The Rave sets up a sound-and-light immersion at Imprimerie in central Brussels, with a laser show, a 500-person capacity, and a Falc'ohm x Gazmatek format.",
    ),
    summary: createLocalizedText(
      "Immersion rave a Bruxelles avec laser show et format Falc'ohm x Gazmatek.",
      "A Brussels rave immersion with a laser show and a Falc'ohm x Gazmatek format.",
    ),
    seo: createEventSeo(
      "Into The Rave | Gazmatek",
      "Into The Rave | Gazmatek",
      "Archive Gazmatek Into The Rave a l'Imprimerie de Bruxelles, date du 24 fevrier 2024.",
      "Gazmatek archive for Into The Rave at Imprimerie in Brussels, dated February 24, 2024.",
    ),
    archiveCategory: "legal",
    contentTier: "rich",
    legacySources: [
      {
        id: "into-the-rave-folder",
        kind: "archive-folder",
        label: "Archive folder 2024_24_02 INTO THE RAVE",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2024_24_02 INTO THE RAVE",
      },
      {
        id: "into-the-rave-poster",
        kind: "promo-visual",
        label: "bann fb.jpg",
        path: "old-website-assets/Assets Gazma Site/Visuels Soirees/bann fb.jpg",
      },
      {
        id: "into-the-rave-gallery-01",
        kind: "archive-photo",
        label: "BV1A0339-Avec accentuation-Bruit-Modifier.jpg",
        path: "old-website-assets/.../2024_24_02 INTO THE RAVE/BV1A0339-Avec accentuation-Bruit-Modifier.jpg",
      },
      {
        id: "into-the-rave-gallery-02",
        kind: "archive-photo",
        label: "BV1A0369-Avec accentuation-Bruit.jpg",
        path: "old-website-assets/.../2024_24_02 INTO THE RAVE/BV1A0369-Avec accentuation-Bruit.jpg",
      },
      {
        id: "into-the-rave-gallery-03",
        kind: "archive-photo",
        label: "BV1A8173-Avec accentuation-Bruit-Modifier.jpg",
        path: "old-website-assets/.../2024_24_02 INTO THE RAVE/BV1A8173-Avec accentuation-Bruit-Modifier.jpg",
      },
      {
        id: "fb-into-the-rave",
        kind: "facebook-event",
        label: "Facebook: INTO THE RAVE / FALC'OHM VS GAZMATEK",
        path: "https://www.facebook.com/events/703119748617065",
        note: "Confirme le format Falc'ohm vs Gazmatek.",
      },
    ],
    sourceMap: {
      title: ["into-the-rave-poster"],
      date: ["into-the-rave-poster", "into-the-rave-folder"],
      description: [
        "into-the-rave-poster",
        "into-the-rave-folder",
        "fb-into-the-rave",
      ],
      poster: ["into-the-rave-poster"],
      gallery: [
        "into-the-rave-gallery-01",
        "into-the-rave-gallery-02",
        "into-the-rave-gallery-03",
      ],
      venue: ["into-the-rave-poster"],
      lineup: ["fb-into-the-rave"],
    },
  },
  {
    id: "escape-invite-gazmatek",
    slug: "escape-invite-gazmatek",
    title: createLocalizedText(
      "Escape Invite : Gazmatek Crew",
      "Escape Invites Gazmatek Crew",
    ),
    status: "past",
    date: "2024-03-09T22:00:00",
    venue: "Escape Club",
    city: "Liege",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "escape-invite-gazmatek/poster.jpg",
      "Flyer Escape Invite : Gazmatek Crew",
      "Escape Invite : Gazmatek Crew flyer",
      "escape-fallback-poster",
    ),
    gallery: [],
    lineup: ["Gazmatek Crew"],
    description: createLocalizedText(
      "Escape Club invite le Gazmatek Crew a Liege le 9 mars 2024 pour une nuit consacree au collectif.",
      "Escape Club invites the Gazmatek Crew to Liege on March 9, 2024 for a night centered on the collective.",
    ),
    summary: createLocalizedText(
      "Gazmatek Crew invite a l'Escape Club de Liege.",
      "Gazmatek Crew invited to Escape Club in Liege.",
    ),
    seo: createEventSeo(
      "Escape Invite : Gazmatek Crew | Gazmatek",
      "Escape Invites Gazmatek Crew | Gazmatek",
      "Archive Gazmatek du 9 mars 2024 a l'Escape Club de Liege, documentee par le dossier legacy et l'evenement Facebook.",
      "Gazmatek archive for March 9, 2024 at Escape Club in Liege, documented by the legacy folder and the Facebook event.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "escape-folder",
        kind: "archive-folder",
        label: "Archive folder 2024_9_03 ESCAPE INVITE GAZMATEK",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/Le╠ügales/2024_9_03 ESCAPE INVITE GAZMATEK",
        note: "Folder exists in the recovered archive, but no dedicated media survived inside it.",
      },
      {
        id: "escape-fallback-poster",
        kind: "promo-visual",
        label: "485648687_671987518842822_5783518791425704640_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/485648687_671987518842822_5783518791425704640_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-escape-invite-gazmatek",
        kind: "facebook-event",
        label: "Facebook: Escape Invite : Gazmatek Crew",
        path: "https://www.facebook.com/events/1857517524681553",
        note: "734 interested, 59 going. Confirms Escape Club in Liege and the Gazmatek Crew naming.",
      },
    ],
    sourceMap: {
      title: ["escape-folder", "fb-escape-invite-gazmatek"],
      date: ["escape-folder", "fb-escape-invite-gazmatek"],
      description: ["escape-folder", "fb-escape-invite-gazmatek"],
      poster: ["escape-fallback-poster"],
      gallery: [],
      venue: ["fb-escape-invite-gazmatek"],
      lineup: ["fb-escape-invite-gazmatek"],
    },
  },
  {
    id: "smurf-party-gazmatek-and-gs6",
    slug: "smurf-party-gazmatek-and-gs6",
    title: createLocalizedText(
      "Smurf Party Gazmatek and GS6",
      "Smurf Party Gazmatek and GS6",
    ),
    status: "past",
    date: "2024-03-23T22:00:00",
    venue: "Camping 58",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "smurf-party-gazmatek-and-gs6/poster.jpg",
      "Flyer Smurf Party Gazmatek and GS6",
      "Smurf Party Gazmatek and GS6 flyer",
      "smurf-fallback-poster",
    ),
    gallery: [],
    lineup: ["GS6"],
    description: createLocalizedText(
      "Smurf Party Gazmatek and GS6 se tient au Camping 58 a Bruxelles le 23 mars 2024, avec GS6 au centre de l'affiche.",
      "Smurf Party Gazmatek and GS6 takes place at Camping 58 in Brussels on March 23, 2024, with GS6 at the center of the bill.",
    ),
    summary: createLocalizedText(
      "Smurf Party a Bruxelles avec Gazmatek et GS6.",
      "A Brussels Smurf Party with Gazmatek and GS6.",
    ),
    seo: createEventSeo(
      "Smurf Party Gazmatek and GS6 | Gazmatek",
      "Smurf Party Gazmatek and GS6 | Gazmatek",
      "Archive Gazmatek du 23 mars 2024 a Bruxelles, reliee a la Smurf Party et a GS6.",
      "Gazmatek archive for March 23, 2024 in Brussels, tied to the Smurf Party and GS6.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "smurf-folder",
        kind: "archive-folder",
        label: "Archive folder 2024_23_03 SMURF PARTY",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/Le╠ügales/2024_23_03 SMURF PARTY",
        note: "Folder exists in the recovered archive, but no dedicated media survived inside it.",
      },
      {
        id: "smurf-fallback-poster",
        kind: "promo-visual",
        label: "485762423_671996082175299_2421117190037158864_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/485762423_671996082175299_2421117190037158864_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-smurf-party",
        kind: "facebook-event",
        label: "Facebook: Smurf Party Gazmatek and GS6",
        path: "https://www.facebook.com/events/309108228303748",
        note: "2.1K interested, 221 going. Confirms Camping 58 in Brussels and the GS6 naming.",
      },
    ],
    sourceMap: {
      title: ["smurf-folder", "fb-smurf-party"],
      date: ["smurf-folder", "fb-smurf-party"],
      description: ["smurf-folder", "fb-smurf-party"],
      poster: ["smurf-fallback-poster"],
      gallery: [],
      venue: ["fb-smurf-party"],
      lineup: ["fb-smurf-party"],
    },
  },
  {
    id: "synapse-sonorised-by",
    slug: "synapse-sonorised-by",
    title: createLocalizedText(
      "Synapse Sonorised By Gazmatek",
      "Synapse Sonorised By Gazmatek",
    ),
    status: "past",
    date: "2024-03-29T22:00:00",
    venue: null,
    city: null,
    country: null,
    address: null,
    poster: createEventPlaceholderMedia(
      "Visuel legacy Gazmatek utilise en fallback pour Synapse Sonorised By",
      "Legacy Gazmatek visual used as a fallback for Synapse Sonorised By",
      "synapse-sonorised-by-fallback-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText("", ""),
    summary: createLocalizedText("", ""),
    seo: createEventSeo(
      "Synapse Sonorised By Gazmatek | Gazmatek",
      "Synapse Sonorised By Gazmatek | Gazmatek",
      "Archive Gazmatek du 29 mars 2024 issue du dossier legacy Synapse Sonorised By.",
      "Gazmatek archive for March 29, 2024 sourced from the legacy Synapse Sonorised By folder.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "synapse-sonorised-by-folder",
        kind: "archive-folder",
        label: "Archive folder 2024_29_03 SYNAPSE SONORISED BY",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/Le╠ügales/2024_29_03 SYNAPSE SONORISED BY",
        note: "Folder exists in the recovered archive, but no dedicated media survived inside it.",
      },
      {
        id: "synapse-sonorised-by-fallback-poster",
        kind: "site-placeholder",
        label: "Gazmatek base logo.svg",
        path: "frontend/src/assets/svg/logo.svg",
        note: "Site placeholder used because no dedicated event image was recovered.",
      },
    ],
    sourceMap: {
      title: ["synapse-sonorised-by-folder"],
      date: ["synapse-sonorised-by-folder"],
      description: ["synapse-sonorised-by-folder"],
      poster: ["synapse-sonorised-by-fallback-poster"],
      gallery: [],
    },
  },
  {
    id: "halloween-bday-party",
    slug: "halloween-bday-party",
    title: createLocalizedText(
      "Halloween B-Day Party",
      "Halloween B-Day Party",
    ),
    status: "past",
    date: "2023-10-31T22:00:00",
    venue: "Planet Park Brussels",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "halloween-bday-party/poster.png",
      "Flyer Halloween B-Day Party",
      "Halloween B-Day Party flyer",
      "halloween-poster",
    ),
    gallery: [
      createEventMedia(
        "halloween-bday-party/gallery-01.jpeg",
        "Public Halloween B-Day Party",
        "Halloween B-Day Party crowd",
        "halloween-gallery-01",
      ),
      createEventMedia(
        "halloween-bday-party/gallery-02.jpeg",
        "Decor Halloween en archive",
        "Halloween decor in the archive",
        "halloween-gallery-02",
      ),
      createEventMedia(
        "halloween-bday-party/gallery-03.jpeg",
        "Ambiance de scene Halloween",
        "Halloween stage mood",
        "halloween-gallery-03",
      ),
    ],
    lineup: ["Falcohm"],
    description: createLocalizedText(
      "Halloween B-Day Party prend place au Planet Park Brussels le 31 octobre 2023, dans une ambiance dark montee avec Planet Park et Falcohm en tete d'affiche.",
      "Halloween B-Day Party takes over Planet Park Brussels on October 31, 2023, in a dark setting built with Planet Park and Falcohm as the headliner.",
    ),
    summary: createLocalizedText(
      "Halloween 2023 au Planet Park avec Falcohm en invite principal.",
      "A 2023 Planet Park Halloween night with Falcohm as the main guest.",
    ),
    seo: createEventSeo(
      "Halloween B-Day Party | Gazmatek",
      "Halloween B-Day Party | Gazmatek",
      "Archive Halloween Gazmatek x Falcohm du 31 octobre 2023 au Planet Park Brussels.",
      "Gazmatek x Falcohm Halloween archive from October 31, 2023 at Planet Park Brussels.",
    ),
    archiveCategory: "legal",
    contentTier: "rich",
    legacySources: [
      {
        id: "halloween-folder",
        kind: "archive-folder",
        label: "Archive folder 2023_31_10 halloween party",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2023_31_10 halloween party",
      },
      {
        id: "halloween-poster",
        kind: "promo-visual",
        label: "BANNIERE - Gazmatek x Falcohm Halloween Bday.png",
        path: "old-website-assets/Assets Gazma Site/Visuels Soirees/BANNIERE - Gazmatek x Falcohm Halloween Bday.png",
      },
      {
        id: "halloween-gallery-01",
        kind: "archive-photo",
        label: "396115842_341054468602797_6503758918823919432_n.jpeg",
        path: "old-website-assets/.../2023_31_10 halloween party/396115842_341054468602797_6503758918823919432_n.jpeg",
      },
      {
        id: "halloween-gallery-02",
        kind: "archive-photo",
        label: "398663018_2021029141592076_5268746157838424642_n.jpeg",
        path: "old-website-assets/.../2023_31_10 halloween party/398663018_2021029141592076_5268746157838424642_n.jpeg",
      },
      {
        id: "halloween-gallery-03",
        kind: "archive-photo",
        label: "398895182_2021029414925382_7939077397892683905_n.jpeg",
        path: "old-website-assets/.../2023_31_10 halloween party/398895182_2021029414925382_7939077397892683905_n.jpeg",
      },
      {
        id: "fb-halloween-bday-party",
        kind: "facebook-event",
        label:
          "Facebook: Halloween birthday party GAZMATEK invite Falcohm in collaboration with Planet Park",
        path: "https://www.facebook.com/events/2658946300923710",
        note: "Confirme la collaboration avec Planet Park et Falcohm comme artiste invite.",
      },
    ],
    sourceMap: {
      title: ["halloween-poster"],
      date: ["halloween-poster", "halloween-folder"],
      description: [
        "halloween-poster",
        "halloween-folder",
        "fb-halloween-bday-party",
      ],
      poster: ["halloween-poster"],
      gallery: [
        "halloween-gallery-01",
        "halloween-gallery-02",
        "halloween-gallery-03",
      ],
      venue: ["halloween-poster"],
      lineup: ["halloween-poster", "fb-halloween-bday-party"],
    },
  },
  {
    id: "vinyl-rules",
    slug: "vinyl-rules",
    title: createLocalizedText("Vinyl Rules", "Vinyl Rules"),
    status: "past",
    date: "2023-12-09T22:00:00",
    venue: "Planet Park Brussels",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "vinyl-rules/poster.png",
      "Flyer Vinyl Rules",
      "Vinyl Rules flyer",
      "vinyl-rules-poster",
    ),
    gallery: [
      createEventMedia(
        "vinyl-rules/gallery-01.jpeg",
        "Public Vinyl Rules",
        "Vinyl Rules crowd",
        "vinyl-rules-gallery-01",
      ),
      createEventMedia(
        "vinyl-rules/gallery-02.jpg",
        "Set Vinyl Rules dans l'archive",
        "Vinyl Rules set in the archive",
        "vinyl-rules-gallery-02",
      ),
      createEventMedia(
        "vinyl-rules/gallery-03.jpg",
        "Ambiance de piste Vinyl Rules",
        "Vinyl Rules dancefloor mood",
        "vinyl-rules-gallery-03",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Vinyl Rules est pensee comme une nuit de soutien au Planet Park jouee uniquement par des DJs vinyl, avec une programmation centree sur la selection, la rotation des platines et plusieurs invites exterieurs.",
      "Vinyl Rules is built as a support night for Planet Park played only by vinyl DJs, with programming centered on selection, turntable rotation, and several outside guests.",
    ),
    summary: createLocalizedText(
      "Soiree Planet Park 100% vinyl autour des platines et de la selection.",
      "A 100% vinyl Planet Park night built around decks and selection.",
    ),
    seo: createEventSeo(
      "Vinyl Rules | Gazmatek",
      "Vinyl Rules | Gazmatek",
      "Archive Gazmatek Vinyl Rules du 9 decembre 2023, basee sur le flyer et la galerie legacy.",
      "Gazmatek Vinyl Rules archive from December 9, 2023, based on the flyer and the legacy gallery.",
    ),
    archiveCategory: "legal",
    contentTier: "rich",
    legacySources: [
      {
        id: "vinyl-rules-folder",
        kind: "archive-folder",
        label: "Archive folder 2023_9_12 Vyniles_Rules",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2023_9_12 Vyniles_Rules",
      },
      {
        id: "vinyl-rules-poster",
        kind: "promo-visual",
        label: "BANNIERE 3.png",
        path: "old-website-assets/Assets Gazma Site/Visuels Soirees/BANNIERE 3.png",
      },
      {
        id: "vinyl-rules-gallery-01",
        kind: "archive-photo",
        label: "AEZbX7qg.jpeg",
        path: "old-website-assets/.../2023_9_12 Vyniles_Rules/AEZbX7qg.jpeg",
      },
      {
        id: "vinyl-rules-gallery-02",
        kind: "archive-photo",
        label: "gazmatek - Vinyl Rules (24 sur 73).jpg",
        path: "old-website-assets/.../2023_9_12 Vyniles_Rules/gazmatek - Vinyl Rules (24 sur 73).jpg",
      },
      {
        id: "vinyl-rules-gallery-03",
        kind: "archive-photo",
        label: "gazmatek - Vinyl Rules (48 sur 73).jpg",
        path: "old-website-assets/.../2023_9_12 Vyniles_Rules/gazmatek - Vinyl Rules (48 sur 73).jpg",
      },
      {
        id: "fb-vinyl-rules",
        kind: "facebook-event",
        label: "Facebook: Vinyl Rules by Gazmatek system",
        path: "https://www.facebook.com/events/1383091229286372",
        note: 'Confirme le nom complet "Vinyl Rules by Gazmatek system".',
      },
    ],
    sourceMap: {
      title: ["vinyl-rules-poster", "vinyl-rules-folder", "fb-vinyl-rules"],
      date: ["vinyl-rules-poster", "vinyl-rules-folder"],
      description: [
        "vinyl-rules-poster",
        "vinyl-rules-folder",
        "fb-vinyl-rules",
      ],
      poster: ["vinyl-rules-poster"],
      gallery: [
        "vinyl-rules-gallery-01",
        "vinyl-rules-gallery-02",
        "vinyl-rules-gallery-03",
      ],
      venue: ["vinyl-rules-poster"],
    },
  },
  {
    id: "synapse-warehouse-night",
    slug: "synapse-warehouse-night",
    title: createLocalizedText(
      "Synapse Warehouse Night",
      "Synapse Warehouse Night",
    ),
    status: "past",
    date: "2023-09-29T22:00:00",
    venue: null,
    city: null,
    country: null,
    address: null,
    poster: createEventMedia(
      "synapse-warehouse-night/poster.jpeg",
      "Photo phare de l'archive Synapse",
      "Lead photo from the Synapse archive",
      "synapse-poster",
    ),
    gallery: [
      createEventMedia(
        "synapse-warehouse-night/gallery-01.jpeg",
        "Laser room Synapse",
        "Synapse laser room",
        "synapse-gallery-01",
      ),
      createEventMedia(
        "synapse-warehouse-night/gallery-02.jpeg",
        "Public Synapse",
        "Synapse crowd",
        "synapse-gallery-02",
      ),
      createEventMedia(
        "synapse-warehouse-night/gallery-03.jpeg",
        "Autre vue Synapse",
        "Another Synapse view",
        "synapse-gallery-03",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Synapse Warehouse Night porte une ambiance warehouse tres axee sur la lumiere, les lasers et la profondeur de salle pour la date du 29 septembre 2023.",
      "Synapse Warehouse Night carries a warehouse atmosphere built around lighting, lasers, and room depth for the September 29, 2023 date.",
    ),
    summary: createLocalizedText(
      "Date Synapse 2023 dans une ambiance warehouse et laser.",
      "A 2023 Synapse date in a warehouse and laser-heavy atmosphere.",
    ),
    seo: createEventSeo(
      "Synapse Warehouse Night | Gazmatek",
      "Synapse Warehouse Night | Gazmatek",
      "Archive Gazmatek issue du dossier Synapse du 29 septembre 2023, avec galerie photo warehouse.",
      "Gazmatek archive drawn from the September 29, 2023 Synapse folder, with a warehouse-style gallery.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "synapse-folder",
        kind: "archive-folder",
        label: "Archive folder 2023_29_9 Synapse",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2023_29_9 Synapse",
      },
      {
        id: "synapse-poster",
        kind: "archive-photo",
        label: "384774574_122117172002035842_3946079949170779527_n.jpeg",
        path: "old-website-assets/.../2023_29_9 Synapse/384774574_122117172002035842_3946079949170779527_n.jpeg",
        note: "Used as a lead visual because no dedicated flyer could be recovered.",
      },
      {
        id: "synapse-gallery-01",
        kind: "archive-photo",
        label: "384775938_122117172476035842_4857107369225911950_n.jpeg",
        path: "old-website-assets/.../2023_29_9 Synapse/384775938_122117172476035842_4857107369225911950_n.jpeg",
      },
      {
        id: "synapse-gallery-02",
        kind: "archive-photo",
        label: "384776035_122117171732035842_117726053301389124_n.jpeg",
        path: "old-website-assets/.../2023_29_9 Synapse/384776035_122117171732035842_117726053301389124_n.jpeg",
      },
      {
        id: "synapse-gallery-03",
        kind: "archive-photo",
        label: "384777819_122117171576035842_9007910584606726965_n.jpeg",
        path: "old-website-assets/.../2023_29_9 Synapse/384777819_122117171576035842_9007910584606726965_n.jpeg",
      },
    ],
    sourceMap: {
      title: ["synapse-folder"],
      date: ["synapse-folder"],
      description: ["synapse-folder", "synapse-poster"],
      poster: ["synapse-poster"],
      gallery: [
        "synapse-gallery-01",
        "synapse-gallery-02",
        "synapse-gallery-03",
      ],
    },
  },
  {
    id: "gazmatek-party-2023",
    slug: "gazmatek-party-2023",
    title: createLocalizedText("Gazmatek Party", "Gazmatek Party"),
    status: "past",
    date: "2023-09-23T22:00:00",
    venue: null,
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "gazmatek-party-2023/poster.jpg",
      "Photo de scene Gazmatek Party 2023",
      "Gazmatek Party 2023 stage photo",
      "gazmatek-party-2023-poster",
    ),
    gallery: [
      createEventMedia(
        "gazmatek-party-2023/gallery-01.jpg",
        "Photo live Gazmatek Party 2023",
        "Gazmatek Party 2023 live photo",
        "gazmatek-party-2023-gallery-01",
      ),
      createEventMedia(
        "gazmatek-party-2023/gallery-02.jpg",
        "Public Gazmatek Party 2023",
        "Gazmatek Party 2023 crowd",
        "gazmatek-party-2023-gallery-02",
      ),
      createEventMedia(
        "gazmatek-party-2023/gallery-03.jpg",
        "Cloture Gazmatek Party 2023",
        "Gazmatek Party 2023 closing moment",
        "gazmatek-party-2023-gallery-03",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Gazmatek Party du 23 septembre 2023 garde un format club brut et direct, centre sur l'ambiance de salle plus que sur une annonce de line-up detaillee.",
      "Gazmatek Party on September 23, 2023 keeps a raw, direct club format centered more on room energy than on a heavily detailed lineup announcement.",
    ),
    summary: createLocalizedText(
      "Date club Gazmatek de septembre 2023, brute et directe.",
      "A raw and direct Gazmatek club date from September 2023.",
    ),
    seo: createEventSeo(
      "Gazmatek Party | Gazmatek",
      "Gazmatek Party | Gazmatek",
      "Archive photo Gazmatek Party du 23 septembre 2023, issue du dossier legacy.",
      "Photographic archive of Gazmatek Party from September 23, 2023, drawn from the legacy folder.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "gazmatek-party-2023-folder",
        kind: "archive-folder",
        label: "Archive folder 2023_23_09 Gazmatek party",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2023_23_09 Gazmatek party",
      },
      {
        id: "gazmatek-party-2023-poster",
        kind: "archive-photo",
        label: "IMG_0738-Avec accentuation-Bruit.jpg",
        path: "old-website-assets/.../2023_23_09 Gazmatek party/IMG_0738-Avec accentuation-Bruit.jpg",
      },
      {
        id: "gazmatek-party-2023-gallery-01",
        kind: "archive-photo",
        label: "IMG20230924031746.jpg",
        path: "old-website-assets/.../2023_23_09 Gazmatek party/IMG20230924031746.jpg",
      },
      {
        id: "gazmatek-party-2023-gallery-02",
        kind: "archive-photo",
        label: "IMG_0930.jpg",
        path: "old-website-assets/.../2023_23_09 Gazmatek party/IMG_0930.jpg",
      },
      {
        id: "gazmatek-party-2023-gallery-03",
        kind: "archive-photo",
        label: "IMG_1326.jpg",
        path: "old-website-assets/.../2023_23_09 Gazmatek party/IMG_1326.jpg",
      },
      {
        id: "fb-gazmatek-party-2023",
        kind: "facebook-event",
        label: "Facebook: Gazmatek party Bruxelles",
        path: "https://www.facebook.com/events/796001352119026",
        note: "Confirme la ville: Bruxelles.",
      },
    ],
    sourceMap: {
      title: ["gazmatek-party-2023-folder"],
      date: ["gazmatek-party-2023-folder"],
      description: ["gazmatek-party-2023-folder"],
      poster: ["gazmatek-party-2023-poster"],
      gallery: [
        "gazmatek-party-2023-gallery-01",
        "gazmatek-party-2023-gallery-02",
        "gazmatek-party-2023-gallery-03",
      ],
      venue: ["fb-gazmatek-party-2023"],
    },
  },
  {
    id: "nocturne-ulb",
    slug: "nocturne-ulb",
    title: createLocalizedText("Nocturne ULB", "Nocturne ULB"),
    status: "past",
    date: "2023-06-27T22:00:00",
    venue: "ULB",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "nocturne-ulb/poster.jpg",
      "Photo facade Nocturne ULB",
      "Nocturne ULB facade photo",
      "nocturne-ulb-poster",
    ),
    gallery: [
      createEventMedia(
        "nocturne-ulb/gallery-01.jpg",
        "Installation Gazmatek a la Nocturne ULB",
        "Gazmatek setup at Nocturne ULB",
        "nocturne-ulb-gallery-01",
      ),
      createEventMedia(
        "nocturne-ulb/gallery-02.jpg",
        "Moment de nuit Nocturne ULB",
        "Night moment at Nocturne ULB",
        "nocturne-ulb-gallery-02",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Nocturne ULB marque une intervention Gazmatek a l'ULB le 27 juin 2023, avec installation facade et ambiance nocturne sur site.",
      "Nocturne ULB marks a Gazmatek intervention at ULB on June 27, 2023, with a facade installation and a night-time atmosphere on site.",
    ),
    summary: createLocalizedText(
      "Intervention Gazmatek a l'ULB autour d'une installation de nuit.",
      "A Gazmatek intervention at ULB built around a night installation.",
    ),
    seo: createEventSeo(
      "Nocturne ULB | Gazmatek",
      "Nocturne ULB | Gazmatek",
      "Archive Gazmatek de la Nocturne ULB du 27 juin 2023 a Bruxelles.",
      "Gazmatek archive of the Nocturne ULB event held in Brussels on June 27, 2023.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "nocturne-ulb-folder",
        kind: "archive-folder",
        label: "Archive folder 2023_27_06 nocturne ULB",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2023_27_06 nocturne ULB",
      },
      {
        id: "nocturne-ulb-poster",
        kind: "archive-photo",
        label: "2023-06-27 16.16.04.jpg",
        path: "old-website-assets/.../2023_27_06 nocturne ULB/2023-06-27 16.16.04.jpg",
      },
      {
        id: "nocturne-ulb-gallery-01",
        kind: "archive-photo",
        label: "2023-06-27 15.34.44.jpg",
        path: "old-website-assets/.../2023_27_06 nocturne ULB/2023-06-27 15.34.44.jpg",
      },
      {
        id: "nocturne-ulb-gallery-02",
        kind: "archive-photo",
        label: "2023-06-27 21.54.19.jpg",
        path: "old-website-assets/.../2023_27_06 nocturne ULB/2023-06-27 21.54.19.jpg",
      },
    ],
    sourceMap: {
      title: ["nocturne-ulb-folder"],
      date: ["nocturne-ulb-folder"],
      description: ["nocturne-ulb-folder", "nocturne-ulb-poster"],
      poster: ["nocturne-ulb-poster"],
      gallery: ["nocturne-ulb-gallery-01", "nocturne-ulb-gallery-02"],
      venue: ["nocturne-ulb-folder", "nocturne-ulb-poster"],
    },
  },
  {
    id: "tekno-ravolution",
    slug: "tekno-ravolution",
    title: createLocalizedText("Tekno Ravolution", "Tekno Ravolution"),
    status: "past",
    date: "2023-03-25T22:00:00",
    venue: null,
    city: null,
    country: null,
    address: null,
    poster: createEventMedia(
      "tekno-ravolution/poster.jpeg",
      "Photo phare Tekno Ravolution",
      "Lead Tekno Ravolution photo",
      "tekno-ravolution-poster",
    ),
    gallery: [
      createEventMedia(
        "tekno-ravolution/gallery-01.jpeg",
        "Tekno Ravolution dans la foule",
        "Tekno Ravolution in the crowd",
        "tekno-ravolution-gallery-01",
      ),
      createEventMedia(
        "tekno-ravolution/gallery-02.jpeg",
        "Autre vue de Tekno Ravolution",
        "Another Tekno Ravolution view",
        "tekno-ravolution-gallery-02",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Tekno Ravolution du 25 mars 2023 s'inscrit dans une energie rave frontale, avec une salle deja bien chargee et un format nocturne continu.",
      "Tekno Ravolution on March 25, 2023 lands in a direct rave energy, with a room already running dense and a continuous night-time format.",
    ),
    summary: createLocalizedText(
      "Date rave 2023 dans un format dense et nocturne.",
      "A 2023 rave date in a dense night-time format.",
    ),
    seo: createEventSeo(
      "Tekno Ravolution | Gazmatek",
      "Tekno Ravolution | Gazmatek",
      "Archive photo Gazmatek Tekno Ravolution du 25 mars 2023.",
      "Gazmatek photo archive for Tekno Ravolution on March 25, 2023.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "tekno-ravolution-folder",
        kind: "archive-folder",
        label: "Archive folder 2023_25_03 Tekno ravolution",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2023_25_03 Tekno ravolution",
      },
      {
        id: "tekno-ravolution-poster",
        kind: "archive-photo",
        label: "354581974_266323312742580_4472717682806440663_n.jpeg",
        path: "old-website-assets/.../2023_25_03 Tekno ravolution/354581974_266323312742580_4472717682806440663_n.jpeg",
      },
      {
        id: "tekno-ravolution-gallery-01",
        kind: "archive-photo",
        label: "354602312_266322956075949_4352116709406294311_n.jpeg",
        path: "old-website-assets/.../2023_25_03 Tekno ravolution/354602312_266322956075949_4352116709406294311_n.jpeg",
      },
      {
        id: "tekno-ravolution-gallery-02",
        kind: "archive-photo",
        label: "355255880_266323242742587_5273987449363370261_n.jpeg",
        path: "old-website-assets/.../2023_25_03 Tekno ravolution/355255880_266323242742587_5273987449363370261_n.jpeg",
      },
      {
        id: "fb-tekno-ravolution",
        kind: "facebook-event",
        label: "Facebook: Tekno Ravolution // SEVENUM SIX // INSANE TEKNOLOGY",
        path: "https://www.facebook.com/events/570570374487072",
        note: "2.2K interested, 442 going. Co-organise avec Sevenum Six et Insane Teknology. Confirme Bruxelles.",
      },
    ],
    sourceMap: {
      title: ["tekno-ravolution-folder"],
      date: ["tekno-ravolution-folder"],
      description: ["tekno-ravolution-folder", "fb-tekno-ravolution"],
      poster: ["tekno-ravolution-poster"],
      gallery: ["tekno-ravolution-gallery-01", "tekno-ravolution-gallery-02"],
      venue: ["fb-tekno-ravolution"],
    },
  },
  {
    id: "manifestive-lille",
    slug: "manifestive-lille",
    title: createLocalizedText("Manifestive Lille", "Manifestive Lille"),
    status: "past",
    date: "2022-12-17T22:00:00",
    venue: null,
    city: "Lille",
    country: "France",
    address: null,
    poster: createEventMedia(
      "manifestive-lille/poster.jpg",
      "Photo d'archive Manifestive Lille",
      "Manifestive Lille archive photo",
      "manifestive-lille-poster",
    ),
    gallery: [
      createEventMedia(
        "manifestive-lille/gallery-01.jpg",
        "Public de Manifestive Lille",
        "Manifestive Lille crowd",
        "manifestive-lille-gallery-01",
      ),
      createEventMedia(
        "manifestive-lille/gallery-02.jpg",
        "Cloture de la date Manifestive Lille",
        "Manifestive Lille closing shot",
        "manifestive-lille-gallery-02",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Manifestive Lille marque une date Gazmatek a Lille le 17 decembre 2022, dans un format export plus compact hors de Bruxelles.",
      "Manifestive Lille marks a Gazmatek date in Lille on December 17, 2022, in a more compact export format outside Brussels.",
    ),
    summary: createLocalizedText(
      "Date Gazmatek a Lille dans un format plus compact.",
      "A Gazmatek date in Lille in a more compact format.",
    ),
    seo: createEventSeo(
      "Manifestive Lille | Gazmatek",
      "Manifestive Lille | Gazmatek",
      "Archive Gazmatek Manifestive Lille du 17 decembre 2022.",
      "Gazmatek archive for Manifestive Lille on December 17, 2022.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "manifestive-lille-folder",
        kind: "archive-folder",
        label: "Archive folder 2022_17_12 manifestive lille",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2022_17_12 manifestive lille",
      },
      {
        id: "manifestive-lille-poster",
        kind: "archive-photo",
        label: "2022-12-18 21.38.34-2.jpg",
        path: "old-website-assets/.../2022_17_12 manifestive lille/2022-12-18 21.38.34-2.jpg",
      },
      {
        id: "manifestive-lille-gallery-01",
        kind: "archive-photo",
        label: "2022-12-19 01.26.50-8.jpg",
        path: "old-website-assets/.../2022_17_12 manifestive lille/2022-12-19 01.26.50-8.jpg",
      },
      {
        id: "manifestive-lille-gallery-02",
        kind: "archive-photo",
        label: "2022-12-19 01.27.37.jpg",
        path: "old-website-assets/.../2022_17_12 manifestive lille/2022-12-19 01.27.37.jpg",
      },
    ],
    sourceMap: {
      title: ["manifestive-lille-folder"],
      date: ["manifestive-lille-folder"],
      description: ["manifestive-lille-folder"],
      poster: ["manifestive-lille-poster"],
      gallery: ["manifestive-lille-gallery-01", "manifestive-lille-gallery-02"],
      venue: ["manifestive-lille-folder"],
    },
  },
  {
    id: "tekwarz-2",
    slug: "tekwarz-2",
    title: createLocalizedText(
      "Tekwarz 2 sonorise par Gazmatek",
      "Tekwarz 2 Sound by Gazmatek",
    ),
    status: "past",
    date: "2022-11-18T22:00:00",
    venue: "IKON Antwerp",
    city: "Antwerp",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "tekwarz-2/poster.jpeg",
      "Photo phare Tekwarz 2",
      "Lead Tekwarz 2 photo",
      "tekwarz-2-poster",
    ),
    gallery: [
      createEventMedia(
        "tekwarz-2/gallery-01.jpeg",
        "Tekwarz 2 dans la foule",
        "Tekwarz 2 in the crowd",
        "tekwarz-2-gallery-01",
      ),
      createEventMedia(
        "tekwarz-2/gallery-02.jpeg",
        "Autre vue Tekwarz 2",
        "Another Tekwarz 2 view",
        "tekwarz-2-gallery-02",
      ),
    ],
    lineup: ["ReZet", "L'hallucidite", "Aku Soundsystems"],
    description: createLocalizedText(
      "Tek Wars 2 reunit ReZet, L'hallucidite et Aku Soundsystems le 18 novembre 2022 a IKON Antwerp, avec Gazmatek au son.",
      "Tek Wars 2 brings together ReZet, L'hallucidite, and Aku Soundsystems on November 18, 2022 at IKON Antwerp, with Gazmatek on sound.",
    ),
    summary: createLocalizedText(
      "Tek Wars 2 a IKON Antwerp avec ReZet, L'hallucidite et Aku Soundsystems.",
      "Tek Wars 2 at IKON Antwerp with ReZet, L'hallucidite, and Aku Soundsystems.",
    ),
    seo: createEventSeo(
      "Tekwarz 2 Sound by Gazmatek | Gazmatek",
      "Tekwarz 2 Sound by Gazmatek | Gazmatek",
      "Archive Tekwarz 2 sonorise par Gazmatek, le 18 novembre 2022 a IKON Antwerp avec ReZet, L'hallucidite et Aku Soundsystems.",
      "Archive for Tekwarz 2 powered by Gazmatek, held on November 18, 2022 at IKON Antwerp with ReZet, L'hallucidite, and Aku Soundsystems.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "tekwarz-2-folder",
        kind: "archive-folder",
        label: "Archive folder 2022_18_11 Tekwarz 2",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2022_18_11 Tekwarz 2",
      },
      {
        id: "tekwarz-2-poster",
        kind: "archive-photo",
        label: "316267351_652314259723709_2007260947465850588_n.jpeg",
        path: "old-website-assets/.../2022_18_11 Tekwarz 2/316267351_652314259723709_2007260947465850588_n.jpeg",
      },
      {
        id: "tekwarz-2-gallery-01",
        kind: "archive-photo",
        label: "316406474_652311593057309_8661128369995693040_n.jpeg",
        path: "old-website-assets/.../2022_18_11 Tekwarz 2/316406474_652311593057309_8661128369995693040_n.jpeg",
      },
      {
        id: "tekwarz-2-gallery-02",
        kind: "archive-photo",
        label: "316415350_652316933056775_19061880427122884_n.jpeg",
        path: "old-website-assets/.../2022_18_11 Tekwarz 2/316415350_652316933056775_19061880427122884_n.jpeg",
      },
      {
        id: "fb-tekwarz-2",
        kind: "facebook-event",
        label: "Facebook: Tek Wars 2: Rezet, L'hallucidite & Aku soundsystems",
        path: "https://www.facebook.com/events/408934984465671",
        note: "2.2K interested, 1K going. Confirms IKON Antwerp and the core lineup.",
      },
    ],
    sourceMap: {
      title: ["tekwarz-2-folder", "fb-tekwarz-2"],
      date: ["tekwarz-2-folder", "fb-tekwarz-2"],
      description: ["tekwarz-2-folder", "fb-tekwarz-2"],
      poster: ["tekwarz-2-poster"],
      gallery: ["tekwarz-2-gallery-01", "tekwarz-2-gallery-02"],
      venue: ["fb-tekwarz-2"],
      lineup: ["fb-tekwarz-2"],
    },
  },
  {
    id: "gazmatek-party-5-years",
    slug: "gazmatek-party-5-years",
    title: createLocalizedText(
      "Gazmatek Party - 5 Years",
      "Gazmatek Party - 5 Years",
    ),
    status: "past",
    date: "2021-11-01T22:00:00",
    venue: null,
    city: null,
    country: null,
    address: null,
    poster: createEventMedia(
      "gazmatek-party-5-years/poster.jpeg",
      "Visuel 5 Years dans les archives illegales",
      "5 Years visual from the illegal archive",
      "gazmatek-party-5-years-poster",
    ),
    gallery: [
      createEventMedia(
        "gazmatek-party-5-years/gallery-01.jpg",
        "Foule du 5 Years",
        "5 Years crowd",
        "gazmatek-party-5-years-gallery-01",
      ),
      createEventMedia(
        "gazmatek-party-5-years/gallery-02.jpg",
        "Moment de nuit 5 Years",
        "5 Years night moment",
        "gazmatek-party-5-years-gallery-02",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Gazmatek Party - 5 Years marque l'anniversaire des 5 ans du crew le 1er novembre 2021.",
      "Gazmatek Party - 5 Years marks the crew's 5-year anniversary on November 1, 2021.",
    ),
    summary: createLocalizedText(
      "Anniversaire des 5 ans de Gazmatek.",
      "Gazmatek's 5-year anniversary.",
    ),
    seo: createEventSeo(
      "Gazmatek Party - 5 Years | Gazmatek",
      "Gazmatek Party - 5 Years | Gazmatek",
      "Archive Gazmatek 5 Years du 1er novembre 2021 issue des dossiers illegaux.",
      "Gazmatek 5 Years archive from November 1, 2021, sourced from the illegal folders.",
    ),
    archiveCategory: "illegal",
    contentTier: "documented",
    legacySources: [
      {
        id: "gazmatek-party-5-years-folder",
        kind: "archive-folder",
        label: "Archive folder 2021_1novembre_gazmatek party 5years",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2021_1novembre_gazmatek party 5years",
      },
      {
        id: "gazmatek-party-5-years-poster",
        kind: "archive-photo",
        label: "dfuHe77y.jpeg",
        path: "old-website-assets/.../2021_1novembre_gazmatek party 5years/dfuHe77y.jpeg",
      },
      {
        id: "gazmatek-party-5-years-gallery-01",
        kind: "archive-photo",
        label: "Photo 1-11-21 11 04 02 (3).jpg",
        path: "old-website-assets/.../2021_1novembre_gazmatek party 5years/Photo 1-11-21 11 04 02 (3).jpg",
      },
      {
        id: "gazmatek-party-5-years-gallery-02",
        kind: "archive-photo",
        label: "Photo 2-11-21 00 47 31.jpg",
        path: "old-website-assets/.../2021_1novembre_gazmatek party 5years/Photo 2-11-21 00 47 31.jpg",
      },
    ],
    sourceMap: {
      title: ["gazmatek-party-5-years-folder"],
      date: ["gazmatek-party-5-years-folder"],
      description: ["gazmatek-party-5-years-folder"],
      poster: ["gazmatek-party-5-years-poster"],
      gallery: [
        "gazmatek-party-5-years-gallery-01",
        "gazmatek-party-5-years-gallery-02",
      ],
    },
  },
  {
    id: "soiree-barlok-2018",
    slug: "soiree-barlok-2018",
    title: createLocalizedText("Soiree Barlok 2018", "Barlok Night 2018"),
    status: "past",
    date: "2018-07-14T22:00:00",
    venue: "Le Barlok",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "soiree-barlok-2018/poster.jpeg",
      "Premiere archive Barlok 2018",
      "Early 2018 Barlok archive image",
      "soiree-barlok-2018-poster",
    ),
    gallery: [
      createEventMedia(
        "soiree-barlok-2018/gallery-01.jpeg",
        "Public Barlok 2018",
        "Barlok 2018 crowd",
        "soiree-barlok-2018-gallery-01",
      ),
      createEventMedia(
        "soiree-barlok-2018/gallery-02.jpeg",
        "Autre photo Barlok 2018",
        "Another Barlok 2018 photo",
        "soiree-barlok-2018-gallery-02",
      ),
    ],
    lineup: [],
    description: createLocalizedText("", ""),
    summary: createLocalizedText("", ""),
    seo: createEventSeo(
      "Soiree Barlok 2018 | Gazmatek",
      "Barlok Night 2018 | Gazmatek",
      "Une des premieres archives evenementielles Gazmatek, datee du 14 juillet 2018 au Barlok.",
      "One of the earliest Gazmatek event archives, dated July 14, 2018 at Le Barlok.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "soiree-barlok-2018-folder",
        kind: "archive-folder",
        label: "Archive folder 2018_14_7soiree barlok 2018",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/2018_14_7soiree barlok 2018",
      },
      {
        id: "soiree-barlok-2018-poster",
        kind: "archive-photo",
        label: "37189692_498716913894022_603602476007948288_n.jpeg",
        path: "old-website-assets/.../2018_14_7soiree barlok 2018/37189692_498716913894022_603602476007948288_n.jpeg",
      },
      {
        id: "soiree-barlok-2018-gallery-01",
        kind: "archive-photo",
        label: "37232351_498716880560692_7709711599082143744_n.jpeg",
        path: "old-website-assets/.../2018_14_7soiree barlok 2018/37232351_498716880560692_7709711599082143744_n.jpeg",
      },
      {
        id: "soiree-barlok-2018-gallery-02",
        kind: "archive-photo",
        label: "37245597_498716863894027_5617459705795313664_n.jpeg",
        path: "old-website-assets/.../2018_14_7soiree barlok 2018/37245597_498716863894027_5617459705795313664_n.jpeg",
      },
      {
        id: "fb-soiree-barlok-2018",
        kind: "facebook-event",
        label: "Facebook: Gazmatek Party (14 juillet 2018, Le Barlok)",
        path: "https://www.facebook.com/events/2227457587477330",
        note: "1.7K interested, 263 going. Confirme la date et l'organisateur Gazmatek System.",
      },
    ],
    sourceMap: {
      title: ["soiree-barlok-2018-folder"],
      date: ["soiree-barlok-2018-folder", "fb-soiree-barlok-2018"],
      description: ["soiree-barlok-2018-folder"],
      poster: ["soiree-barlok-2018-poster"],
      gallery: [
        "soiree-barlok-2018-gallery-01",
        "soiree-barlok-2018-gallery-02",
      ],
      venue: ["soiree-barlok-2018-folder"],
    },
  },
  {
    id: "tekwarz-4",
    slug: "tekwarz-4",
    title: createLocalizedText(
      "Tek Wars 4 sonorise par Gazmatek",
      "Tek Wars 4 Sound by Gazmatek",
    ),
    status: "past",
    date: "2023-06-30T22:00:00",
    venue: null,
    city: "Antwerp",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "tekwarz-4/poster.jpg",
      "Photo d'archive Tek Wars 4 - 30 juin 2023",
      "Tek Wars 4 archive photo from June 30, 2023",
      "tekwarz-4-poster",
    ),
    gallery: [
      createEventMedia(
        "tekwarz-4/gallery-01.jpg",
        "Foule Tek Wars 4",
        "Tek Wars 4 crowd",
        "tekwarz-4-gallery-01",
      ),
      createEventMedia(
        "tekwarz-4/gallery-02.jpg",
        "Ambiance Tek Wars 4",
        "Tek Wars 4 atmosphere",
        "tekwarz-4-gallery-02",
      ),
      createEventMedia(
        "tekwarz-4/gallery-03.jpg",
        "Nuit Tek Wars 4",
        "Tek Wars 4 night scene",
        "tekwarz-4-gallery-03",
      ),
      createEventMedia(
        "tekwarz-4/gallery-04.jpg",
        "Scene Tek Wars 4",
        "Tek Wars 4 stage",
        "tekwarz-4-gallery-04",
      ),
      createEventMedia(
        "tekwarz-4/gallery-05.jpg",
        "Cloture Tek Wars 4",
        "Tek Wars 4 closing",
        "tekwarz-4-gallery-05",
      ),
      createEventMedia(
        "tekwarz-4/gallery-06.jpg",
        "Dernier moment Tek Wars 4",
        "Tek Wars 4 last moment",
        "tekwarz-4-gallery-06",
      ),
    ],
    lineup: ["Aku", "Zouawotek", "Kritiek"],
    description: createLocalizedText(
      "Tek Wars 4 se tient a Anvers le 30 juin 2023, avec Gazmatek au son aux cotes d'Aku, Zouawotek et Kritiek, dans une nuit qui file jusqu'au lever du jour.",
      "Tek Wars 4 takes place in Antwerp on June 30, 2023, with Gazmatek on sound alongside Aku, Zouawotek, and Kritiek in a night that runs through sunrise.",
    ),
    summary: createLocalizedText(
      "Quatrieme edition Tek Wars a Anvers avec Gazmatek, Aku, Zouawotek et Kritiek.",
      "A fourth Tek Wars edition in Antwerp with Gazmatek, Aku, Zouawotek, and Kritiek.",
    ),
    seo: createEventSeo(
      "Tek Wars 4 Sound by Gazmatek | Gazmatek",
      "Tek Wars 4 Sound by Gazmatek | Gazmatek",
      "Archive Tek Wars 4 sonorise par Gazmatek, 30 juin 2023 a Anvers avec Aku, Zouawotek et Kritiek.",
      "Tek Wars 4 archive powered by Gazmatek, June 30, 2023 in Antwerp with Aku, Zouawotek and Kritiek.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "tekwarz-4-folder",
        kind: "archive-folder",
        label: "Archive folder 2023_30_6 tekwarz4",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/Legales/2023_30_6 tekwarz4",
      },
      {
        id: "tekwarz-4-poster",
        kind: "archive-photo",
        label: "2023-06-30 18.19.22.jpg",
        path: "old-website-assets/.../2023_30_6 tekwarz4/2023-06-30 18.19.22.jpg",
        note: "Used as lead visual — first chronological photo from the event.",
      },
      {
        id: "tekwarz-4-gallery-01",
        kind: "archive-photo",
        label: "2023-07-01 01.11.53.jpg",
        path: "old-website-assets/.../2023_30_6 tekwarz4/2023-07-01 01.11.53.jpg",
      },
      {
        id: "tekwarz-4-gallery-02",
        kind: "archive-photo",
        label: "2023-07-01 03.40.57.jpg",
        path: "old-website-assets/.../2023_30_6 tekwarz4/2023-07-01 03.40.57.jpg",
      },
      {
        id: "tekwarz-4-gallery-03",
        kind: "archive-photo",
        label: "2023-07-01 04.48.54.jpg",
        path: "old-website-assets/.../2023_30_6 tekwarz4/2023-07-01 04.48.54.jpg",
      },
      {
        id: "tekwarz-4-gallery-04",
        kind: "archive-photo",
        label: "2023-07-01 06.01.58.jpg",
        path: "old-website-assets/.../2023_30_6 tekwarz4/2023-07-01 06.01.58.jpg",
      },
      {
        id: "tekwarz-4-gallery-05",
        kind: "archive-photo",
        label: "2023-07-01 06.02.39.jpg",
        path: "old-website-assets/.../2023_30_6 tekwarz4/2023-07-01 06.02.39.jpg",
      },
      {
        id: "tekwarz-4-gallery-06",
        kind: "archive-photo",
        label: "2023-07-01 06.02.45.jpg",
        path: "old-website-assets/.../2023_30_6 tekwarz4/2023-07-01 06.02.45.jpg",
      },
      {
        id: "fb-tekwarz-4",
        kind: "facebook-event",
        label: "Facebook: Tek Wars 4: Aku, Zouawotek, Gazmatek & Kritiek",
        path: "https://www.facebook.com/events/916717286204023",
        note: "Confirme la ville Antwerp, le line-up et la co-organisation avec Aku, Zouawotek et Kritiek.",
      },
    ],
    sourceMap: {
      title: ["fb-tekwarz-4", "tekwarz-4-folder"],
      date: ["tekwarz-4-folder"],
      description: ["tekwarz-4-folder", "fb-tekwarz-4"],
      poster: ["tekwarz-4-poster"],
      gallery: [
        "tekwarz-4-gallery-01",
        "tekwarz-4-gallery-02",
        "tekwarz-4-gallery-03",
        "tekwarz-4-gallery-04",
        "tekwarz-4-gallery-05",
        "tekwarz-4-gallery-06",
      ],
      venue: ["fb-tekwarz-4"],
      lineup: ["fb-tekwarz-4"],
    },
  },
  {
    id: "live-act-party",
    slug: "live-act-party",
    title: createLocalizedText(
      "Gazmatek Live Act Party",
      "Gazmatek Live Act Party",
    ),
    status: "past",
    date: "2023-12-02T22:00:00",
    venue: null,
    city: null,
    country: null,
    address: null,
    poster: createEventMedia(
      "live-act-party/poster.png",
      "Visuel R.K Project - Gazmatek Live Act Party",
      "R.K Project visual for Gazmatek Live Act Party",
      "live-act-party-poster",
    ),
    gallery: [],
    lineup: ["R.K Project"],
    description: createLocalizedText(
      "Gazmatek Live Act Party se tient au Lac de 19h a minuit, avec entree a 5 euros, jauge de 250 personnes, textile printing et un focus hardtekno joue en live.",
      "Gazmatek Live Act Party takes place at Le Lac from 7pm to midnight, with a 5-euro entry, a 250-person capacity, textile printing, and a hardtekno focus played live.",
    ),
    summary: createLocalizedText(
      "Soiree live acts au Lac, avec petite jauge, entree accessible et focus hardtekno live.",
      "A live acts night at Le Lac, with a small capacity, accessible entry price, and a hardtekno live focus.",
    ),
    seo: createEventSeo(
      "Gazmatek Live Act Party | Gazmatek",
      "Gazmatek Live Act Party | Gazmatek",
      "Archive Gazmatek Live Act Party du 2 decembre 2023 avec R.K Project.",
      "Gazmatek Live Act Party archive from December 2, 2023 featuring R.K Project.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "live-act-party-folder",
        kind: "archive-folder",
        label: "Archive folder 2023_2_12 Gazmatek live act party",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/Legales/2023_2_12 Gazmatek live act party",
      },
      {
        id: "live-act-party-poster",
        kind: "promo-visual",
        label: "R.K project.png",
        path: "old-website-assets/.../2023_2_12 Gazmatek live act party/R.K project.png",
        note: "Only surviving visual — used as lead image.",
      },
      {
        id: "fb-live-act-party",
        kind: "facebook-event",
        label: "Facebook: GAZMATEK LIVE ACT PARTY",
        path: "https://www.facebook.com/events/1759237037928688",
        note: "Confirme la date du 2 decembre 2023 et le format Live Act.",
      },
    ],
    sourceMap: {
      title: ["live-act-party-folder", "fb-live-act-party"],
      date: ["live-act-party-folder"],
      description: ["live-act-party-folder", "fb-live-act-party"],
      poster: ["live-act-party-poster"],
      gallery: [],
      lineup: ["live-act-party-poster", "fb-live-act-party"],
    },
  },
  {
    id: "gazmatek-party-3",
    slug: "gazmatek-party-3",
    title: createLocalizedText("Gazmatek Party 3", "Gazmatek Party 3"),
    status: "past",
    date: "2019-06-29T22:00:00",
    venue: null,
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "gazmatek-party-3/poster.jpg",
      "Photo d'archive Gazmatek Party 3 - 29 juin 2019",
      "Gazmatek Party 3 archive photo from June 29, 2019",
      "gazmatek-party-3-poster",
    ),
    gallery: [
      createEventMedia(
        "gazmatek-party-3/gallery-01.jpg",
        "Foule Gazmatek Party 3",
        "Gazmatek Party 3 crowd",
        "gazmatek-party-3-gallery-01",
      ),
      createEventMedia(
        "gazmatek-party-3/gallery-02.jpg",
        "Ambiance Gazmatek Party 3",
        "Gazmatek Party 3 atmosphere",
        "gazmatek-party-3-gallery-02",
      ),
      createEventMedia(
        "gazmatek-party-3/gallery-03.jpg",
        "Moment de nuit Gazmatek Party 3",
        "Gazmatek Party 3 night moment",
        "gazmatek-party-3-gallery-03",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Gazmatek Party 3 se deroule le 29 juin 2019 dans une secret location a Schaerbeek, avec une programmation continue de 19h jusqu'au matin.",
      "Gazmatek Party 3 runs on June 29, 2019 in a secret location in Schaerbeek, with continuous programming from 7pm into the morning.",
    ),
    summary: createLocalizedText(
      "Troisieme edition a Bruxelles, avec line-up long format et bonne couverture photo.",
      "A third Brussels edition with a long-format lineup and solid photo coverage.",
    ),
    seo: createEventSeo(
      "Gazmatek Party 3 | Gazmatek",
      "Gazmatek Party 3 | Gazmatek",
      "Archive Gazmatek Party 3 du 29 juin 2019 a Bruxelles, documentee par photos et evenement Facebook.",
      "Gazmatek Party 3 archive from June 29, 2019 in Brussels, documented through photos and a Facebook event.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "gazmatek-party-3-folder",
        kind: "archive-folder",
        label: "Archive folder 2019_29_6 Gazmatek party 3",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/Legales/2019_29_6 Gazmatek party 3",
      },
      {
        id: "gazmatek-party-3-poster",
        kind: "archive-photo",
        label: "IMG_5244.JPG",
        path: "old-website-assets/.../2019_29_6 Gazmatek party 3/IMG_5244.JPG",
        note: "Used as lead visual — no flyer survives in the archive.",
      },
      {
        id: "gazmatek-party-3-gallery-01",
        kind: "archive-photo",
        label: "IMG_5245.JPG",
        path: "old-website-assets/.../2019_29_6 Gazmatek party 3/IMG_5245.JPG",
      },
      {
        id: "gazmatek-party-3-gallery-02",
        kind: "archive-photo",
        label: "IMG_5246.JPG",
        path: "old-website-assets/.../2019_29_6 Gazmatek party 3/IMG_5246.JPG",
      },
      {
        id: "gazmatek-party-3-gallery-03",
        kind: "archive-photo",
        label: "IMG_5247.JPG",
        path: "old-website-assets/.../2019_29_6 Gazmatek party 3/IMG_5247.JPG",
      },
      {
        id: "fb-gazmatek-party-3",
        kind: "facebook-event",
        label: "Facebook: Gazmatek Party 3",
        path: "https://www.facebook.com/events/2192537801063171",
        note: "2.6K interested, 297 going. Confirme Bruxelles, 29 juin 2019.",
      },
    ],
    sourceMap: {
      title: ["fb-gazmatek-party-3", "gazmatek-party-3-folder"],
      date: ["gazmatek-party-3-folder"],
      description: ["gazmatek-party-3-folder", "fb-gazmatek-party-3"],
      poster: ["gazmatek-party-3-poster"],
      gallery: [
        "gazmatek-party-3-gallery-01",
        "gazmatek-party-3-gallery-02",
        "gazmatek-party-3-gallery-03",
      ],
      venue: ["fb-gazmatek-party-3"],
    },
  },
  {
    id: "gazmatek-party-2",
    slug: "gazmatek-party-2",
    title: createLocalizedText("Gazmatek Party 2", "Gazmatek Party 2"),
    status: "past",
    date: "2019-03-02T22:00:00",
    venue: null,
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "gazmatek-party-2/poster.jpg",
      "Photo d'archive Gazmatek Party 2 - 2 mars 2019",
      "Gazmatek Party 2 archive photo from March 2, 2019",
      "gazmatek-party-2-poster",
    ),
    gallery: [
      createEventMedia(
        "gazmatek-party-2/gallery-01.jpg",
        "Foule Gazmatek Party 2",
        "Gazmatek Party 2 crowd",
        "gazmatek-party-2-gallery-01",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-02.jpg",
        "Ambiance Gazmatek Party 2",
        "Gazmatek Party 2 atmosphere",
        "gazmatek-party-2-gallery-02",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-03.jpg",
        "Scene Gazmatek Party 2",
        "Gazmatek Party 2 stage",
        "gazmatek-party-2-gallery-03",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-04.jpg",
        "Dancefloor Gazmatek Party 2",
        "Gazmatek Party 2 dancefloor",
        "gazmatek-party-2-gallery-04",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-05.jpg",
        "Public Gazmatek Party 2",
        "Gazmatek Party 2 public",
        "gazmatek-party-2-gallery-05",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-06.jpg",
        "Nuit Gazmatek Party 2",
        "Gazmatek Party 2 night",
        "gazmatek-party-2-gallery-06",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-07.jpg",
        "Installation Gazmatek Party 2",
        "Gazmatek Party 2 setup",
        "gazmatek-party-2-gallery-07",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-08.jpg",
        "Lights Gazmatek Party 2",
        "Gazmatek Party 2 lights",
        "gazmatek-party-2-gallery-08",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-09.jpg",
        "Cloture Gazmatek Party 2",
        "Gazmatek Party 2 closing",
        "gazmatek-party-2-gallery-09",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-10.jpg",
        "Dernier moment Gazmatek Party 2",
        "Gazmatek Party 2 last moment",
        "gazmatek-party-2-gallery-10",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-11.jpg",
        "Archive Gazmatek Party 2",
        "Gazmatek Party 2 archive",
        "gazmatek-party-2-gallery-11",
      ),
      createEventMedia(
        "gazmatek-party-2/gallery-12.jpg",
        "Photo de fin Gazmatek Party 2",
        "Gazmatek Party 2 final photo",
        "gazmatek-party-2-gallery-12",
      ),
    ],
    lineup: [],
    description: createLocalizedText(
      "Gazmatek Party 2 prend place dans une secret location a Bruxelles avec un sound system de 10 kW et une programmation Techno, Psy, Acid, Tekno et Tribe etalee jusqu'au matin.",
      "Gazmatek Party 2 takes place in a secret location in Brussels with a 10 kW sound system and a Techno, Psy, Acid, Tekno, and Tribe program stretching into the morning.",
    ),
    summary: createLocalizedText(
      "Deuxieme Gazmatek Party a Bruxelles avec 10 kW et programmation multi-styles.",
      "A second Gazmatek Party in Brussels with 10 kW and multi-style programming.",
    ),
    seo: createEventSeo(
      "Gazmatek Party 2 | Gazmatek",
      "Gazmatek Party 2 | Gazmatek",
      "Archive Gazmatek Party 2 du 2 mars 2019 a Bruxelles, documentee par 13 photos legacy et un evenement Facebook.",
      "Gazmatek Party 2 archive from March 2, 2019 in Brussels, documented through 13 legacy photos and a Facebook event.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "gazmatek-party-2-folder",
        kind: "archive-folder",
        label: "Archive folder 2019_2_3 gazmatek party 2",
        path: "old-website-assets/Assets Gazma Site/Archives/Archives/Legales/2019_2_3 gazmatek party 2",
      },
      {
        id: "gazmatek-party-2-poster",
        kind: "archive-photo",
        label: "53487519_651003971998648_2661838425878953984_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53487519_651003971998648_2661838425878953984_n.jpeg",
        note: "Used as lead visual — no dedicated flyer survives in the archive.",
      },
      {
        id: "gazmatek-party-2-gallery-01",
        kind: "archive-photo",
        label: "53563809_651004591998586_8462661912016977920_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53563809_651004591998586_8462661912016977920_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-02",
        kind: "archive-photo",
        label: "53578877_651004991998546_1680164839390969856_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53578877_651004991998546_1680164839390969856_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-03",
        kind: "archive-photo",
        label: "53648494_651004891998556_8572143703588601856_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53648494_651004891998556_8572143703588601856_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-04",
        kind: "archive-photo",
        label: "53662391_651005405331838_819342939598618624_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53662391_651005405331838_819342939598618624_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-05",
        kind: "archive-photo",
        label: "53717353_651006518665060_5300780278023716864_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53717353_651006518665060_5300780278023716864_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-06",
        kind: "archive-photo",
        label: "53731967_651006291998416_6919806296610832384_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53731967_651006291998416_6919806296610832384_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-07",
        kind: "archive-photo",
        label: "53781072_651003951998650_6113296294090899456_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53781072_651003951998650_6113296294090899456_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-08",
        kind: "archive-photo",
        label: "53819579_651008035331575_1955454930051399680_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53819579_651008035331575_1955454930051399680_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-09",
        kind: "archive-photo",
        label: "53838517_651004941998551_4630006295917756416_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53838517_651004941998551_4630006295917756416_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-10",
        kind: "archive-photo",
        label: "53846762_651006231998422_6366607546744045568_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/53846762_651006231998422_6366607546744045568_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-11",
        kind: "archive-photo",
        label: "54214883_651004898665222_3681746262207496192_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/54214883_651004898665222_3681746262207496192_n.jpeg",
      },
      {
        id: "gazmatek-party-2-gallery-12",
        kind: "archive-photo",
        label: "54396427_651008058664906_7145134024854339584_n.jpeg",
        path: "old-website-assets/.../2019_2_3 gazmatek party 2/54396427_651008058664906_7145134024854339584_n.jpeg",
      },
      {
        id: "fb-gazmatek-party-2",
        kind: "facebook-event",
        label: "Facebook: Gazmatek Party 2",
        path: "https://www.facebook.com/events/2177740375776780",
        note: "617 interested, 151 going. Confirms Brussels and the second-edition naming.",
      },
    ],
    sourceMap: {
      title: ["gazmatek-party-2-folder", "fb-gazmatek-party-2"],
      date: ["gazmatek-party-2-folder", "fb-gazmatek-party-2"],
      description: ["gazmatek-party-2-folder", "fb-gazmatek-party-2"],
      poster: ["gazmatek-party-2-poster"],
      gallery: [
        "gazmatek-party-2-gallery-01",
        "gazmatek-party-2-gallery-02",
        "gazmatek-party-2-gallery-03",
        "gazmatek-party-2-gallery-04",
        "gazmatek-party-2-gallery-05",
        "gazmatek-party-2-gallery-06",
        "gazmatek-party-2-gallery-07",
        "gazmatek-party-2-gallery-08",
        "gazmatek-party-2-gallery-09",
        "gazmatek-party-2-gallery-10",
        "gazmatek-party-2-gallery-11",
        "gazmatek-party-2-gallery-12",
      ],
      venue: ["fb-gazmatek-party-2"],
    },
  },
  {
    id: "gazmatek-be-pulsed-faya",
    slug: "gazmatek-be-pulsed-faya",
    title: createLocalizedText(
      "Gazmatek - Be Pulsed - Faya",
      "Gazmatek - Be Pulsed - Faya",
    ),
    status: "past",
    date: "2019-08-24T22:00:00",
    venue: "L'uZinne",
    city: null,
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "gazmatek-be-pulsed-faya/poster.jpg",
      "Flyer Gazmatek - Be Pulsed - Faya",
      "Gazmatek - Be Pulsed - Faya flyer",
      "faya-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText(
      "Gazmatek - Be Pulsed - Faya se tient a L'uZinne le 24 aout 2019 dans un format compact, avec jauge limitee a 150 personnes et prevente conseillee.",
      "Gazmatek - Be Pulsed - Faya takes place at L'uZinne on August 24, 2019 in a compact format, with capacity limited to 150 people and presales strongly advised.",
    ),
    summary: createLocalizedText(
      "Collaboration compacte entre Gazmatek, Be Pulsed et Faya a L'uZinne.",
      "A compact collaboration between Gazmatek, Be Pulsed, and Faya at L'uZinne.",
    ),
    seo: createEventSeo(
      "Gazmatek - Be Pulsed - Faya | Gazmatek",
      "Gazmatek - Be Pulsed - Faya | Gazmatek",
      "Archive Gazmatek du 24 aout 2019, documentee par les donnees Facebook preservees.",
      "Gazmatek archive dated August 24, 2019, documented through preserved Facebook data.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "faya-poster",
        kind: "promo-visual",
        label: "66358839_725579327874445_8007893968509468672_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/66358839_725579327874445_8007893968509468672_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-faya-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Gazmatek-_Be_Pulsed_-_Faya.json",
        path: "docs/facebook/Gazmatek-_Be_Pulsed_-_Faya.json",
      },
      {
        id: "fb-faya",
        kind: "facebook-event",
        label: "Facebook: Gazmatek- Be Pulsed - Faya",
        path: "https://www.facebook.com/events/465113967615615",
      },
    ],
    sourceMap: {
      title: ["fb-faya-doc", "fb-faya"],
      date: ["fb-faya"],
      description: ["fb-faya-doc"],
      poster: ["faya-poster"],
      gallery: [],
      venue: ["fb-faya-doc"],
    },
  },
  {
    id: "gazmatek-aku-conectik-birthday-party",
    slug: "gazmatek-aku-conectik-birthday-party",
    title: createLocalizedText(
      "Gazmatek Aku Conectik Birthday Party",
      "Gazmatek Aku Conectik Birthday Party",
    ),
    status: "past",
    date: "2020-03-28T22:00:00",
    venue: "Secret location",
    city: null,
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "gazmatek-aku-conectik-birthday-party/poster.jpg",
      "Flyer Gazmatek Aku Conectik Birthday Party",
      "Gazmatek Aku Conectik Birthday Party flyer",
      "aku-conectik-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText(
      "Gazmatek Aku Conectik Birthday Party annonce une birthday party en secret location le 28 mars 2020, portee par Gazmatek, Aku et Conectik.",
      "Gazmatek Aku Conectik Birthday Party announces a birthday party in a secret location on March 28, 2020, led by Gazmatek, Aku, and Conectik.",
    ),
    summary: createLocalizedText(
      "Birthday party en secret location avec Gazmatek, Aku et Conectik.",
      "A secret-location birthday party with Gazmatek, Aku, and Conectik.",
    ),
    seo: createEventSeo(
      "Gazmatek Aku Conectik Birthday Party | Gazmatek",
      "Gazmatek Aku Conectik Birthday Party | Gazmatek",
      "Archive Gazmatek du 28 mars 2020 issue des metadonnees Facebook publiques.",
      "Gazmatek archive for March 28, 2020 sourced from public Facebook metadata.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "aku-conectik-poster",
        kind: "promo-visual",
        label: "89863093_918607791904930_2181781362745278464_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/89863093_918607791904930_2181781362745278464_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-aku-conectik",
        kind: "facebook-event",
        label: "Facebook: Gazmatek Aku Conectik Birthday Party",
        path: "https://www.facebook.com/events/2843994069021457",
      },
    ],
    sourceMap: {
      title: ["fb-aku-conectik"],
      date: ["fb-aku-conectik"],
      description: ["fb-aku-conectik"],
      poster: ["aku-conectik-poster"],
      gallery: [],
      venue: ["fb-aku-conectik"],
    },
  },
  {
    id: "full-of-gazmatek-system",
    slug: "full-of-gazmatek-system",
    title: createLocalizedText(
      "Full of Gazmatek System",
      "Full of Gazmatek System",
    ),
    status: "past",
    date: "2021-04-10T20:00:00",
    venue: "Online livestream",
    city: null,
    country: null,
    address: null,
    poster: createEventMedia(
      "full-of-gazmatek-system/poster.jpg",
      "Flyer Full of Gazmatek System",
      "Full of Gazmatek System flyer",
      "full-of-gazmatek-poster",
    ),
    gallery: [],
    lineup: ["Soul3d", "Terapeutek", "Miss Tiapy", "Nocid", "Moracid"],
    description: createLocalizedText(
      "Full of Gazmatek System est une soiree streaming du 10 avril 2021 entierement dediee aux artistes du crew, avec un running order autour de Soul3d, Terapeutek, Miss Tiapy, Nocid et Moracid.",
      "Full of Gazmatek System is a streaming night on April 10, 2021 entirely dedicated to crew artists, with a running order built around Soul3d, Terapeutek, Miss Tiapy, Nocid, and Moracid.",
    ),
    summary: createLocalizedText(
      "Une date streaming 2021 tres lisible, portee uniquement par les artistes Gazmatek.",
      "A very legible 2021 streaming date carried entirely by Gazmatek artists.",
    ),
    seo: createEventSeo(
      "Full of Gazmatek System | Gazmatek",
      "Full of Gazmatek System | Gazmatek",
      "Archive Gazmatek du 10 avril 2021 en format streaming.",
      "Gazmatek archive for April 10, 2021 in a streaming format.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "full-of-gazmatek-poster",
        kind: "promo-visual",
        label: "169827494_1913348408830930_7156423562710906849_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/169827494_1913348408830930_7156423562710906849_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-full-of-gazmatek-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Full_of_Gazmatek_System.json",
        path: "docs/facebook/Full_of_Gazmatek_System.json",
      },
      {
        id: "fb-full-of-gazmatek",
        kind: "facebook-event",
        label: "Facebook: Full of Gazmatek System",
        path: "https://www.facebook.com/events/713668012636241",
      },
    ],
    sourceMap: {
      title: ["fb-full-of-gazmatek-doc", "fb-full-of-gazmatek"],
      date: ["fb-full-of-gazmatek"],
      description: ["fb-full-of-gazmatek-doc"],
      poster: ["full-of-gazmatek-poster"],
      gallery: [],
      venue: ["fb-full-of-gazmatek-doc"],
      lineup: ["fb-full-of-gazmatek-doc"],
    },
  },
  {
    id: "cybertek-odyssey",
    slug: "cybertek-odyssey",
    title: createLocalizedText("Cybertek - Odyssey", "Cybertek - Odyssey"),
    status: "past",
    date: "2022-10-01T22:00:00",
    venue: "Club 26",
    city: "Genk",
    country: "Belgium",
    address: "Europalaan 26, 3600 Genk",
    poster: createEventMedia(
      "cybertek-odyssey/poster.jpg",
      "Flyer Cybertek - Odyssey",
      "Cybertek - Odyssey flyer",
      "cybertek-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText(
      "Cybertek - Odyssey est une deuxieme edition montee avec DON a Club 26 a Genk, dans un format intense entre sound experience, light show, visual mapping et live acts techno.",
      "Cybertek - Odyssey is a second edition built with DON at Club 26 in Genk, in an intense format balancing sound experience, light show, visual mapping, and techno live acts.",
    ),
    summary: createLocalizedText(
      "Seconde edition Cybertek a Genk, marquee par le tandem Gazmatek x DON, le mapping et les live acts.",
      "A second Cybertek edition in Genk marked by the Gazmatek x DON pairing, mapping, and live acts.",
    ),
    seo: createEventSeo(
      "Cybertek - Odyssey | Gazmatek",
      "Cybertek - Odyssey | Gazmatek",
      "Archive Gazmatek du 1er octobre 2022 a Club 26 a Genk.",
      "Gazmatek archive for October 1, 2022 at Club 26 in Genk.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "cybertek-poster",
        kind: "promo-visual",
        label: "473301805_585796534067567_3152293636760069792_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/473301805_585796534067567_3152293636760069792_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-cybertek-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Cybertek_-_Odyssey.json",
        path: "docs/facebook/Cybertek_-_Odyssey.json",
      },
      {
        id: "fb-cybertek",
        kind: "facebook-event",
        label: "Facebook: Cybertek - Odyssey",
        path: "https://www.facebook.com/events/428533182447186",
      },
    ],
    sourceMap: {
      title: ["fb-cybertek-doc", "fb-cybertek"],
      date: ["fb-cybertek"],
      description: ["fb-cybertek-doc"],
      poster: ["cybertek-poster"],
      gallery: [],
      venue: ["fb-cybertek-doc"],
    },
  },
  {
    id: "hedon-invites-gazmatek",
    slug: "hedon-invites-gazmatek",
    title: createLocalizedText(
      "HEDON invites Gazmatek",
      "HEDON Invites Gazmatek",
    ),
    status: "past",
    date: "2024-05-09T23:00:00",
    venue: "Chinastraat",
    city: "Ghent",
    country: "Belgium",
    address: "Chinastraat 1",
    poster: createEventMedia(
      "hedon-invites-gazmatek/poster.jpg",
      "Flyer HEDON invites Gazmatek",
      "HEDON invites Gazmatek flyer",
      "hedon-poster",
    ),
    gallery: [],
    lineup: [
      "Albiovix",
      "Daanya",
      "Nocid",
      "Syr3n",
      "Shmyckblyck",
      "Tekko",
      "Terapeutek",
    ],
    description: createLocalizedText(
      "HEDON Invites Gazmatek se tient le 9 mai 2024 a Chinastraat, dans un format veille de jour ferie pense comme un voyage cosmique entre tekno, mental tekno, acidcore, hardtek, tribe, acid tekno, psydub et zenon.",
      "HEDON Invites Gazmatek takes place on May 9, 2024 at Chinastraat, in a holiday-eve format built as a cosmic trip through tekno, mental tekno, acidcore, hardtek, tribe, acid tekno, psydub, and zenon.",
    ),
    summary: createLocalizedText(
      "Invitation HeDon a Chinastraat, avec spectre stylistique large et line-up bien borne.",
      "A HeDon invitation at Chinastraat with a broad stylistic range and a clearly bounded lineup.",
    ),
    seo: createEventSeo(
      "HEDON Invites Gazmatek | Gazmatek",
      "HEDON Invites Gazmatek | Gazmatek",
      "Archive Gazmatek du 9 mai 2024 a Chinastraat a Gand.",
      "Gazmatek archive for May 9, 2024 at Chinastraat in Ghent.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "hedon-poster",
        kind: "promo-visual",
        label: "482320900_603259706038456_8394667814113735694_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/482320900_603259706038456_8394667814113735694_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-hedon-doc",
        kind: "facebook-doc",
        label: "Facebook extract: HEDON_invites_GAZMATEK_...json",
        path: "docs/facebook/HEDON_invites_GAZMATEK_•_Albiovix_•_Daänya_•_Nocid_•_Syr3n_•_Shmyckblyck_•_Tekko_•_Terapeutek.json",
      },
      {
        id: "fb-hedon",
        kind: "facebook-event",
        label: "Facebook: HEDON invites Gazmatek",
        path: "https://www.facebook.com/events/435737085626143",
      },
    ],
    sourceMap: {
      title: ["fb-hedon-doc", "fb-hedon"],
      date: ["fb-hedon"],
      description: ["fb-hedon-doc"],
      poster: ["hedon-poster"],
      gallery: [],
      venue: ["fb-hedon-doc"],
      lineup: ["fb-hedon-doc"],
    },
  },
  {
    id: "halloween-bday-party-2",
    slug: "halloween-bday-party-2",
    title: createLocalizedText(
      "Halloween B-Day Party #2",
      "Halloween B-Day Party #2",
    ),
    status: "past",
    date: "2024-10-31T22:00:00",
    venue: "Dark Cube",
    city: "Liege",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "halloween-bday-party-2/poster.jpg",
      "Flyer Halloween B-Day Party #2",
      "Halloween B-Day Party #2 flyer",
      "halloween-2-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText(
      "Halloween B-Day Party #2 transforme le Dark Cube a Liege en nuit costumee le 31 octobre 2024, avec Ben 9mm, Trackwasher, Blazphem, mapping show, stands make-up et photomaton.",
      "Halloween B-Day Party #2 turns Dark Cube in Liege into a costumed night on October 31, 2024, with Ben 9mm, Trackwasher, Blazphem, a mapping show, make-up stands, and a photo booth.",
    ),
    summary: createLocalizedText(
      "Suite Halloween 2024 au Dark Cube, avec vraie scenographie et guests explicites.",
      "A 2024 Halloween follow-up at Dark Cube with real staging and clearly named guests.",
    ),
    seo: createEventSeo(
      "Halloween B-Day Party #2 | Gazmatek",
      "Halloween B-Day Party #2 | Gazmatek",
      "Archive Gazmatek du 31 octobre 2024 au Dark Cube a Liege.",
      "Gazmatek archive for October 31, 2024 at Dark Cube in Liege.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "halloween-2-poster",
        kind: "promo-visual",
        label: "486502114_675532165155024_6288508193252416394_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/486502114_675532165155024_6288508193252416394_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-halloween-2-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Halloween_B-Day_party_#2_by_Gazmatek_...json",
        path: "docs/facebook/Halloween_B-Day_party_#2_by_Gazmatek_-_Guest_Ben_9mm_Trackwasher_and_Blazphem_-.json",
      },
      {
        id: "fb-halloween-2",
        kind: "facebook-event",
        label: "Facebook: Halloween B-Day Party #2 by Gazmatek",
        path: "https://www.facebook.com/events/412016355328573",
      },
    ],
    sourceMap: {
      title: ["fb-halloween-2-doc", "fb-halloween-2"],
      date: ["fb-halloween-2"],
      description: ["fb-halloween-2-doc"],
      poster: ["halloween-2-poster"],
      gallery: [],
      venue: ["fb-halloween-2-doc"],
    },
  },
  {
    id: "speeding-records-ravolution",
    slug: "speeding-records-ravolution",
    title: createLocalizedText(
      "Gazmatek & Vakarm Invite Speeding Records",
      "Gazmatek & Vakarm Invite Speeding Records",
    ),
    status: "past",
    date: "2025-01-25T22:00:00",
    venue: "Chinastraat",
    city: "Ghent",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "speeding-records-ravolution/poster.jpg",
      "Flyer Gazmatek & Vakarm Invite Speeding Records",
      "Gazmatek & Vakarm Invite Speeding Records flyer",
      "speeding-records-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText(
      "Gazmatek & Vakarm Invite Speeding Records marque une premiere collaboration avec le collectif suisse a Chinastraat, dans un format deux rooms ouvert a l'Acidcore, la Hardtechno, la Hitech, la Tribe et la Forest.",
      "Gazmatek & Vakarm Invite Speeding Records marks a first collaboration with the Swiss collective at Chinastraat, in a two-room format open to Acidcore, Hardtechno, Hitech, Tribe, and Forest.",
    ),
    summary: createLocalizedText(
      "Premiere collab avec Speeding Records et premiere date Chinastraat en mode deux rooms.",
      "First collaboration with Speeding Records and first Chinastraat date in a two-room format.",
    ),
    seo: createEventSeo(
      "Gazmatek & Vakarm Invite Speeding Records | Gazmatek",
      "Gazmatek & Vakarm Invite Speeding Records | Gazmatek",
      "Archive Gazmatek du 25 janvier 2025 a Chinastraat a Gand.",
      "Gazmatek archive for January 25, 2025 at Chinastraat in Ghent.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "speeding-records-poster",
        kind: "promo-visual",
        label: "475000510_122138793770532171_2122213997030560109_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/475000510_122138793770532171_2122213997030560109_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-speeding-doc",
        kind: "facebook-doc",
        label:
          "Facebook extract: GAZMATEK_&_VAKARM_Invite_SPEEDING_RECORDS.json",
        path: "docs/facebook/■_GAZMATEK_&_VAKɅRM_Invite_SPEEDING_RECORDS_-_RAVOLUTION_EDITION_-_2_ROOMS_■_Chinastraat,_Ghent.json",
      },
      {
        id: "fb-speeding",
        kind: "facebook-event",
        label: "Facebook: Gazmatek & Vakarm Invite Speeding Records",
        path: "https://www.facebook.com/events/424604800696655",
      },
    ],
    sourceMap: {
      title: ["fb-speeding-doc", "fb-speeding"],
      date: ["fb-speeding"],
      description: ["fb-speeding-doc"],
      poster: ["speeding-records-poster"],
      gallery: [],
      venue: ["fb-speeding-doc"],
    },
  },
  {
    id: "vinyls-rules-2",
    slug: "vinyls-rules-2",
    title: createLocalizedText("Vinyls Rules 2", "Vinyls Rules 2"),
    status: "past",
    date: "2025-04-05T22:00:00",
    venue: "Buda BXL",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "vinyls-rules-2/poster.jpg",
      "Flyer Vinyls Rules 2",
      "Vinyls Rules 2 flyer",
      "vinyls-rules-2-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText(
      "Vinyls Rules 2 prend la forme d'une soiree hybride a Buda BXL, avec concert electro punk de Charpie, sets techno, tribe, hardtek et hardcore, mapping show, big sound et espace merch.",
      "Vinyls Rules 2 takes the form of a hybrid night at Buda BXL, with an electro-punk concert by Charpie, techno, tribe, hardtek, and hardcore sets, a mapping show, big sound, and a merch area.",
    ),
    summary: createLocalizedText(
      "Suite Vinyls Rules a Buda BXL, entre concert electro punk, platines et jauge encadree.",
      "A Vinyls Rules follow-up at Buda BXL, balancing electro-punk concert energy, decks, and a bounded capacity.",
    ),
    seo: createEventSeo(
      "Vinyls Rules 2 | Gazmatek",
      "Vinyls Rules 2 | Gazmatek",
      "Archive Gazmatek du 5 avril 2025 a Buda BXL.",
      "Gazmatek archive for April 5, 2025 at Buda BXL.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "vinyls-rules-2-poster",
        kind: "promo-visual",
        label: "486816795_676537351721172_9206962553251818578_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/486816795_676537351721172_9206962553251818578_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-vinyls-rules-2-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Gazmatek_Party_Vinyls_Rules_2.json",
        path: "docs/facebook/Gazmatek_Party_Vinyls_Rules_2_+_Concert_Electro_Punk.json",
      },
      {
        id: "fb-vinyls-rules-2",
        kind: "facebook-event",
        label: "Facebook: Gazmatek Party Vinyls Rules 2 + Concert Electro Punk",
        path: "https://www.facebook.com/events/443497055396395",
      },
    ],
    sourceMap: {
      title: ["fb-vinyls-rules-2-doc", "fb-vinyls-rules-2"],
      date: ["fb-vinyls-rules-2"],
      description: ["fb-vinyls-rules-2-doc"],
      poster: ["vinyls-rules-2-poster"],
      gallery: [],
      venue: ["fb-vinyls-rules-2-doc"],
    },
  },
  {
    id: "into-the-rave-2",
    slug: "into-the-rave-2",
    title: createLocalizedText("Into The Rave 2", "Into The Rave 2"),
    status: "past",
    date: "2025-05-17T22:00:00",
    venue: "La Fabriek",
    city: "Anderlecht",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "into-the-rave-2/poster.jpg",
      "Flyer Into The Rave 2",
      "Into The Rave 2 flyer",
      "into-the-rave-2-poster",
    ),
    gallery: [],
    lineup: [
      "Vizitor23",
      "Shmykblick",
      "Albiovix",
      "NX",
      "Cantik",
      "Butternut",
    ],
    description: createLocalizedText(
      "Into The Rave 2 se tient a La Fabriek a Anderlecht de 22h a 06h dans un format 100% live monte avec Falc'ohm, autour de Vizitor23, Shmykblick, Albiovix, NX, Cantik et Butternut.",
      "Into The Rave 2 takes place at La Fabriek in Anderlecht from 10pm to 6am in a 100% live format built with Falc'ohm, around Vizitor23, Shmykblick, Albiovix, NX, Cantik, and Butternut.",
    ),
    summary: createLocalizedText(
      "Deuxieme round 100% live a La Fabriek, avec six lives clairement annonces.",
      "A second 100% live round at La Fabriek with six clearly announced live acts.",
    ),
    seo: createEventSeo(
      "Into The Rave 2 | Gazmatek",
      "Into The Rave 2 | Gazmatek",
      "Archive Gazmatek du 17 mai 2025 a La Fabriek.",
      "Gazmatek archive for May 17, 2025 at La Fabriek.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "into-the-rave-2-poster",
        kind: "promo-visual",
        label: "491405181_695466259828281_6872390236248908168_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/491405181_695466259828281_6872390236248908168_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-into-the-rave-2-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Gazmatek_X_Falcohm_Into_the_Rave_2.json",
        path: "docs/facebook/Gazmatek_X_Falc'ohm_Into_the_Rave_2_-_100%_Live_!!.json",
      },
      {
        id: "fb-into-the-rave-2",
        kind: "facebook-event",
        label: "Facebook: Gazmatek X Falc'ohm Into the Rave 2 - 100% Live !!",
        path: "https://www.facebook.com/events/624281870492259",
      },
    ],
    sourceMap: {
      title: ["fb-into-the-rave-2-doc", "fb-into-the-rave-2"],
      date: ["fb-into-the-rave-2"],
      description: ["fb-into-the-rave-2-doc"],
      poster: ["into-the-rave-2-poster"],
      gallery: [],
      venue: ["fb-into-the-rave-2-doc"],
      lineup: ["fb-into-the-rave-2-doc"],
    },
  },
  {
    id: "festival-gazmatek-2025",
    slug: "festival-gazmatek-2025",
    title: createLocalizedText("Festival Gazmatek", "Gazmatek Festival"),
    status: "past",
    date: "2025-07-05T14:00:00",
    venue: "Buda BXL",
    city: "Brussels",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "festival-gazmatek-2025/poster.jpg",
      "Flyer Festival Gazmatek 2025",
      "Gazmatek Festival 2025 flyer",
      "festival-gazmatek-poster",
    ),
    gallery: [],
    lineup: ["Cult Collective", "Le Diable Au Corps"],
    description: createLocalizedText(
      "Le Festival Gazmatek prend place le premier week-end de juillet a Bruxelles, entre open-air de jour et interieur survolte a Buda BXL, avec Cult Collective et Le Diable Au Corps parmi les invites.",
      "Gazmatek Festival takes place on the first weekend of July in Brussels, balancing daytime open air and a charged indoor night at Buda BXL, with Cult Collective and Le Diable Au Corps among the guests.",
    ),
    summary: createLocalizedText(
      "Le format festival 2025 prend corps autour de Buda, de l'outdoor et de deux labels invites.",
      "The 2025 festival format takes shape around Buda, the outdoor setup, and two invited labels.",
    ),
    seo: createEventSeo(
      "Gazmatek Festival | Gazmatek",
      "Gazmatek Festival | Gazmatek",
      "Archive Gazmatek du 5 juillet 2025 a Buda BXL.",
      "Gazmatek archive for July 5, 2025 at Buda BXL.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "festival-gazmatek-poster",
        kind: "promo-visual",
        label: "492529179_698396769535230_8044705847052188329_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/492529179_698396769535230_8044705847052188329_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-festival-gazmatek-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Festival_Gazmatek_2025.json",
        path: "docs/facebook/Festival_Gazmatek_w_Cult_Collective_&_Le_Diable_Au_Corps_Outdoor_&_Indoor.json",
      },
      {
        id: "fb-festival-gazmatek",
        kind: "facebook-event",
        label: "Facebook: Festival Gazmatek",
        path: "https://www.facebook.com/events/1297865391294046",
      },
    ],
    sourceMap: {
      title: ["fb-festival-gazmatek-doc", "fb-festival-gazmatek"],
      date: ["fb-festival-gazmatek"],
      description: ["fb-festival-gazmatek-doc"],
      poster: ["festival-gazmatek-poster"],
      gallery: [],
      venue: ["fb-festival-gazmatek-doc"],
      lineup: ["fb-festival-gazmatek-doc"],
    },
  },
  {
    id: "teknoise-gs6-taktik-plt",
    slug: "teknoise-gs6-taktik-plt",
    title: createLocalizedText(
      "Gazmatek Invite Teknoise, GS6, Taktik et PLT",
      "Gazmatek Invites Teknoise, GS6, Taktik and PLT",
    ),
    status: "past",
    date: "2025-10-18T22:00:00",
    venue: "Chinastraat",
    city: "Ghent",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "teknoise-gs6-taktik-plt/poster.jpg",
      "Flyer Gazmatek Invite Teknoise, GS6, Taktik et PLT",
      "Gazmatek Invites Teknoise, GS6, Taktik and PLT flyer",
      "teknoise-poster",
    ),
    gallery: [],
    lineup: ["Teknoise", "GS6", "Taktik", "PLT"],
    description: createLocalizedText(
      "Gazmatek Invites Teknoise, GS6, Taktik and PLT se joue a Chinastraat dans un format confettis night party, avec Teknoise sur la big stage et une seconde scene accessible gratuitement.",
      "Gazmatek Invites Teknoise, GS6, Taktik and PLT plays out at Chinastraat in a confetti night party format, with Teknoise on the big stage and a second room open for free.",
    ),
    summary: createLocalizedText(
      "Date Chinastraat 2025 avec big stage et seconde scene gratuite.",
      "A 2025 Chinastraat date with a big stage and a free second room.",
    ),
    seo: createEventSeo(
      "Gazmatek Invites Teknoise, GS6, Taktik and PLT | Gazmatek",
      "Gazmatek Invites Teknoise, GS6, Taktik and PLT | Gazmatek",
      "Archive Gazmatek du 18 octobre 2025 a Chinastraat a Gand.",
      "Gazmatek archive for October 18, 2025 at Chinastraat in Ghent.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "teknoise-poster",
        kind: "promo-visual",
        label: "565125819_837265262315046_7144546247128718189_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/565125819_837265262315046_7144546247128718189_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-teknoise-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Gazmatek_invite_Teknoise_...json",
        path: "docs/facebook/Gazmatek_invite_Teknoise,_Gs6,_Taktik_et_Plt_one_big_stage_10€_confettis_party.json",
      },
      {
        id: "fb-teknoise",
        kind: "facebook-event",
        label: "Facebook: Gazmatek invite Teknoise, GS6, Taktik et PLT",
        path: "https://www.facebook.com/events/1864351434196820",
      },
    ],
    sourceMap: {
      title: ["fb-teknoise-doc", "fb-teknoise"],
      date: ["fb-teknoise"],
      description: ["fb-teknoise-doc"],
      poster: ["teknoise-poster"],
      gallery: [],
      venue: ["fb-teknoise-doc"],
      lineup: ["fb-teknoise-doc"],
    },
  },
  {
    id: "shadow-halloween-2025",
    slug: "shadow-halloween-2025",
    title: createLocalizedText(
      "Shadow Halloween 2025",
      "Shadow Halloween 2025",
    ),
    status: "past",
    date: "2025-10-31T22:00:00",
    venue: "Studio Citygate",
    city: "Anderlecht",
    country: "Belgium",
    address: "Rue de la Petite Ile 1A",
    poster: createEventMedia(
      "shadow-halloween-2025/poster.jpg",
      "Flyer Shadow Halloween 2025",
      "Shadow Halloween 2025 flyer",
      "shadow-halloween-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText(
      "Shadow Halloween 2025 reunit Gazmatek, Blanquette, Falc'ohm et La Fabriek a Studio Citygate pour trois stages et 22 artistes dans un entrepot de plus de 2000 m2, avec un cadre safer present sur place.",
      "Shadow Halloween 2025 brings together Gazmatek, Blanquette, Falc'ohm, and La Fabriek at Studio Citygate for three stages and 22 artists inside a warehouse of more than 2,000 square meters, with a safer framework on site.",
    ),
    summary: createLocalizedText(
      "Grosse date Halloween multi-crews, multi-stages, avec un cadre safer explicitement documente.",
      "A major multi-crew, multi-stage Halloween date with an explicitly documented safer framework.",
    ),
    seo: createEventSeo(
      "Shadow Halloween 2025 | Gazmatek",
      "Shadow Halloween 2025 | Gazmatek",
      "Archive Gazmatek du 31 octobre 2025 a Studio Citygate.",
      "Gazmatek archive for October 31, 2025 at Studio Citygate.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "shadow-halloween-poster",
        kind: "promo-visual",
        label: "567678472_1419786916814818_3931184235005776352_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/567678472_1419786916814818_3931184235005776352_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-shadow-halloween-doc",
        kind: "facebook-doc",
        label: "Facebook extract: Shadow_Halloween_2025.json",
        path: "docs/facebook/Shadow_Halloween_2025_-_Citygate_3_stages.json",
      },
      {
        id: "fb-shadow-halloween",
        kind: "facebook-event",
        label: "Facebook: Shadow Halloween 2025 - Citygate 3 stages",
        path: "https://www.facebook.com/events/1792424957974619",
      },
    ],
    sourceMap: {
      title: ["fb-shadow-halloween-doc", "fb-shadow-halloween"],
      date: ["fb-shadow-halloween"],
      description: ["fb-shadow-halloween-doc"],
      poster: ["shadow-halloween-poster"],
      gallery: [],
      venue: ["fb-shadow-halloween-doc"],
    },
  },
  {
    id: "into-the-rave-iii",
    slug: "into-the-rave-iii",
    title: createLocalizedText("Into The Rave III", "Into The Rave III"),
    status: "past",
    date: "2025-12-06T22:00:00",
    venue: "La Fabriek",
    city: "Anderlecht",
    country: "Belgium",
    address: null,
    poster: createEventMedia(
      "into-the-rave-iii/poster.jpg",
      "Flyer Into The Rave III",
      "Into The Rave III flyer",
      "into-the-rave-iii-poster",
    ),
    gallery: [],
    lineup: [],
    description: createLocalizedText(
      "Into The Rave III prolonge la serie montee par Falc'ohm System et Gazmatek a La Fabriek, toujours dans un format 100% live set sans USB ni sync.",
      "Into The Rave III extends the series built by Falc'ohm System and Gazmatek at La Fabriek, still in a 100% live-set format with no USBs and no sync.",
    ),
    summary: createLocalizedText(
      "Troisieme round Into The Rave, toujours 100% live et explicitement pense sans filet numerique.",
      "A third Into The Rave round, still 100% live and explicitly framed without digital safety nets.",
    ),
    seo: createEventSeo(
      "Into The Rave III | Gazmatek",
      "Into The Rave III | Gazmatek",
      "Archive Gazmatek du 6 decembre 2025 a La Fabriek.",
      "Gazmatek archive for December 6, 2025 at La Fabriek.",
    ),
    archiveCategory: "legal",
    contentTier: "documented",
    legacySources: [
      {
        id: "into-the-rave-iii-poster",
        kind: "promo-visual",
        label: "594404388_1176463097921189_1758331117124451451_n.jpg",
        path: "old-website-assets/Assets Gazma Site/fb img/594404388_1176463097921189_1758331117124451451_n.jpg",
        note: "Recovered flyer preserved in the legacy fb img folder.",
      },
      {
        id: "fb-into-the-rave-iii-doc",
        kind: "facebook-doc",
        label: "Facebook extract: INTO_THE_RAVE_III.json",
        path: "docs/facebook/INTO_THE_RAVE_III.json",
      },
      {
        id: "fb-into-the-rave-iii",
        kind: "facebook-event",
        label: "Facebook: INTO THE RAVE III",
        path: "https://www.facebook.com/events/25516270474645632",
      },
    ],
    sourceMap: {
      title: ["fb-into-the-rave-iii-doc", "fb-into-the-rave-iii"],
      date: ["fb-into-the-rave-iii"],
      description: ["fb-into-the-rave-iii-doc"],
      poster: ["into-the-rave-iii-poster"],
      gallery: [],
      venue: ["fb-into-the-rave-iii-doc"],
    },
  },
];

export function getEventBySlug(slug: string): GazmatekEvent | undefined {
  return EVENTS.find((event) => event.slug === slug);
}

export function isEventPast(date: string): boolean {
  const cutoff = new Date(date);
  cutoff.setDate(cutoff.getDate() + 1);
  cutoff.setHours(0, 0, 0, 0);
  return new Date() >= cutoff;
}

export function getUpcomingEvents(): GazmatekEvent[] {
  return EVENTS.filter((event) => !isEventPast(event.date)).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function getPastEvents(): GazmatekEvent[] {
  return EVENTS.filter((event) => isEventPast(event.date)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArchiveHighlightEvent(): GazmatekEvent | undefined {
  return getPastEvents()[0];
}

export function getEventTitle(
  event: GazmatekEvent,
  language: string | null | undefined,
): string {
  return getLocalizedText(event.title, language);
}

export function getEventSummary(
  event: GazmatekEvent,
  language: string | null | undefined,
): string {
  return getLocalizedText(event.summary, language).trim();
}

export const getArchivedEvents = getPastEvents;
