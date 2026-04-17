import abyssalImage from "../assets/img/team/abyssal.jpg";
import aerivImage from "../assets/img/team/aeriv/aeriv-portrait.jpg";
import alexImage from "../assets/img/team/alex.jpg";
import flavienImage from "../assets/img/team/flavien.jpg";
import lsbImage from "../assets/img/team/lsb-visual.jpg";
import niPlusNiMoinsImage from "../assets/img/team/ni-plus-ni-moins.jpg";
import terapeutekImage from "../assets/img/team/terapeutek.jpg";
import { createLocalizedText, type LocalizedText } from "./types";

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedText;
  summary: LocalizedText;
  image: string;
  socials: Array<{
    platform: "facebook" | "instagram";
    url: string;
  }>;
}

export const COLLECTIVE_MANIFESTO = {
  title: createLocalizedText("Qui sommes nous", "About Gazmatek"),
  subtitle: createLocalizedText(
    "Le collectif derriere Gazmatek",
    "The collective behind Gazmatek",
  ),
  intro: createLocalizedText(
    "Gazmatek est un noyau auto-gere concentre sur les evenements, le son et la progression des artistes. Le collectif reste ouvert a l'emergence locale, avec une logique claire: reinvestir dans la production, le materiel et les soirees plutot que disperser l'energie.",
    "Gazmatek is a self-managed core focused on events, sound, and artist growth. The collective stays open to emerging local acts with a clear rule: reinvest in production, equipment, and nights instead of scattering the energy.",
  ),
};

export const ABOUT_SEO = {
  title: createLocalizedText(
    "Gazmatek | Qui sommes-nous",
    "Gazmatek | About us",
  ),
  description: createLocalizedText(
    "Collectif belge autogere: mission, fonctionnement, histoire et equipe Gazmatek.",
    "Self-managed Belgian collective: mission, operating model, history, and Gazmatek team.",
  ),
};

export const MISSION_SECTION = {
  title: createLocalizedText("Notre mission", "Our mission"),
  mission: createLocalizedText(
    "Gazmatek porte un projet collectif du son et de la programmation culturelle. Nous construisons des espaces accessibles ou les artistes emergents du Plateau belge trouvent une plateforme, un soutien technique et une audience engagee.",
    "Gazmatek carries a collective project in sound and cultural programming. We build accessible spaces where emerging artists from the Belgian Plateau find a platform, technical support, and an engaged audience.",
  ),
  values: [
    {
      title: createLocalizedText("Autogestion", "Self-management"),
      description: createLocalizedText(
        "Nos decisions se prennent collectivement. Chacun apporte son expertise, partage les risques et les recompenses equitablement.",
        "Our decisions are made collectively. Everyone brings their expertise and shares risks and rewards fairly.",
      ),
    },
    {
      title: createLocalizedText("Reinvestissement", "Reinvestment"),
      description: createLocalizedText(
        "Les recettes des soirees retournent dans la production, le materiel et les prochains evenements. Zero extraction, maximum creation.",
        "Event revenue goes back into production, equipment, and future nights. Zero extraction, maximum creation.",
      ),
    },
    {
      title: createLocalizedText("Emergence artistique", "Artist emergence"),
      description: createLocalizedText(
        "Nous donnons les moyens aux artistes locaux et regionaux de progresser, experimenter et trouver leur public.",
        "We give local and regional artists the resources to progress, experiment, and find their audience.",
      ),
    },
    {
      title: createLocalizedText("Excellence sonore", "Sound excellence"),
      description: createLocalizedText(
        "Lors de chaque projet, la technique du son est systematiquement au centre de notre attention. C'est notre signature et engagement envers tout collaborateur.",
        "On every project, sound engineering is systematically at the center of our attention. This is our signature and our commitment to every collaborator.",
      ),
    },
    {
      title: createLocalizedText(
        "Scenographie profonde",
        "Deep scenography",
      ),
      description: createLocalizedText(
        "Entre decoration unique, prestation artistique live, light show dynamique, notre collectif met l'accent sur l'ambiance de nos evenements.",
        "Between unique decoration, live artistic performance, and dynamic light shows, our collective puts the emphasis on the atmosphere of our events.",
      ),
    },
  ],
};

export interface TimelineEvent {
  year: number | string;
  period: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  legacyProof: LocalizedText;
}

export const TIMELINE: TimelineEvent[] = [
  {
    year: 2010,
    period: createLocalizedText("2010", "2010"),
    title: createLocalizedText(
      "Naissance du collectif",
      "Birth of the collective",
    ),
    description: createLocalizedText(
      "Les premiers membres se reunissent autour d'une vision commune : creer un espace autonome pour la musique experimentale et les artistes emergents.",
      "First members gather around a shared vision: create an autonomous space for experimental music and emerging artists.",
    ),
    legacyProof: createLocalizedText(
      "Preuve legacy: recoupement archives d'evenements (dossier Archives).",
      "Legacy proof: cross-check with event archives (Archives folder).",
    ),
  },
  {
    year: 2012,
    period: createLocalizedText("2012", "2012"),
    title: createLocalizedText(
      "Premiere serie d'evenements",
      "First event series",
    ),
    description: createLocalizedText(
      "Les premieres soirees regulieres etablissent la crew comme reference locale pour la qualite sonore et artistique.",
      "First regular events establish the crew as a local reference for sound quality and artistic excellence.",
    ),
    legacyProof: createLocalizedText(
      "Preuve legacy: chronologie visible dans old-site-walkthrough et archives.",
      "Legacy proof: chronology visible in old-site walkthrough and archives.",
    ),
  },
  {
    year: "2015-2018",
    period: createLocalizedText("2015-2018", "2015-2018"),
    title: createLocalizedText(
      "Expansion et materiel",
      "Expansion and equipment",
    ),
    description: createLocalizedText(
      "Investissement dans un systeme de son proprietaire et professionnalisation de l'organisation.",
      "Investment in a proprietary sound system and professionalization of operations.",
    ),
    legacyProof: createLocalizedText(
      "Preuve legacy: assets techniques et traces d'evenements dans les inventaires.",
      "Legacy proof: technical assets and event traces in inventory documents.",
    ),
  },
  {
    year: "2019-2021",
    period: createLocalizedText("2019-2021", "2019-2021"),
    title: createLocalizedText(
      "Label et distribution",
      "Label and distribution",
    ),
    description: createLocalizedText(
      "Creation du label Gazmatek pour distribuer les artistes du crew et capturer l'evolution sonore du collectif.",
      "Launch of the Gazmatek label to distribute crew artists and capture the collective's sonic evolution.",
    ),
    legacyProof: createLocalizedText(
      "Preuve legacy: references du label dans les contenus du site historique.",
      "Legacy proof: label references in historical site content.",
    ),
  },
  {
    year: "2022-2024",
    period: createLocalizedText("2022-2024", "2022-2024"),
    title: createLocalizedText(
      "Consolidation et reseau",
      "Consolidation and network",
    ),
    description: createLocalizedText(
      "Developpement d'un reseau plus large tout en preservant l'ancrage local et la qualite sonore signature.",
      "Development of a broader network while preserving local roots and signature sound quality.",
    ),
    legacyProof: createLocalizedText(
      "Preuve legacy: continuite constatable entre archives recentes et walkthrough video.",
      "Legacy proof: continuity visible across recent archives and the walkthrough video.",
    ),
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "alex",
    name: "Alex",
    role: createLocalizedText("Directeur technique", "Technical director"),
    summary: createLocalizedText(
      "Pilotage technique du systeme et des installations.",
      "Technical lead for the sound system and installs.",
    ),
    image: alexImage,
    socials: [],
  },
  {
    id: "aeriv",
    name: "Aeriv",
    role: createLocalizedText("Photographe", "Photographer"),
    summary: createLocalizedText(
      "Documentation photo des soirees et de la scene.",
      "Photographic coverage of nights and scene life.",
    ),
    image: aerivImage,
    socials: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/aeriv_/",
      },
    ],
  },
  {
    id: "abyssal-production",
    name: "Abyssal Production",
    role: createLocalizedText("Videaste", "Videographer"),
    summary: createLocalizedText(
      "Captation et montage pour prolonger l'atmosphere des evenements.",
      "Capture and edit work that extends the atmosphere of the events.",
    ),
    image: abyssalImage,
    socials: [],
  },
  {
    id: "flavien-derville",
    name: "Flavien Derville",
    role: createLocalizedText("Videaste", "Videographer"),
    summary: createLocalizedText(
      "Production video et couverture terrain.",
      "Video production and field coverage.",
    ),
    image: flavienImage,
    socials: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/flavien.derville",
      },
    ],
  },
  {
    id: "lsb-visual",
    name: "LSB Visual",
    role: createLocalizedText("Videaste", "Videographer"),
    summary: createLocalizedText(
      "Images de scene et contenu social.",
      "Stage visuals and social content.",
    ),
    image: lsbImage,
    socials: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/lsb_visual/",
      },
    ],
  },
  {
    id: "ni-plus-ni-moins",
    name: "Ni Plus Ni Moins",
    role: createLocalizedText("Peintre live", "Live painter"),
    summary: createLocalizedText(
      "Interventions visuelles live pendant les soirees.",
      "Live visual interventions during events.",
    ),
    image: niPlusNiMoinsImage,
    socials: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/niplus.nimoins/",
      },
    ],
  },
  {
    id: "terapeutek",
    name: "Terapeutek",
    role: createLocalizedText("Co-fondateur", "Co-founder"),
    summary: createLocalizedText(
      "Co-fondateur du Gazmatek Sound System et artiste du crew.",
      "Co-founder of Gazmatek Sound System and crew artist.",
    ),
    image: terapeutekImage,
    socials: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/terapeutek/",
      },
    ],
  },
];
