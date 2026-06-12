import c21Image from "@/assets/img/equipment/c21.jpg";
import eawKf750Image from "@/assets/img/equipment/eaw-kf750.jpg";
import montarboB115Image from "@/assets/img/equipment/montarbo-b115.jpg";
import mth54V1Image from "@/assets/img/equipment/mth54-v1.jpg";
import nexoAlphaB115Image from "@/assets/img/equipment/nexo-alpha-b1-15.jpg";
import nuq122AnImage from "@/assets/img/equipment/nuq122-an.jpg";
import plm20000qImage from "@/assets/img/equipment/plm20000q.jpg";
import turbosoundTpx122mImage from "@/assets/img/equipment/turbosound-tpx122m.jpg";

import { createLocalizedText, type LocalizedText } from "./types";

export interface ServiceOffer {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface EquipmentSpec {
  label: LocalizedText;
  value: string;
}

export interface EquipmentItem {
  id: string;
  slug: string;
  name: string;
  category: LocalizedText;
  summary: LocalizedText;
  image: string;
  specs?: EquipmentSpec[];
  description?: LocalizedText;
}

export const SERVICE_OFFERS: ServiceOffer[] = [
  {
    id: "sound-system-rental",
    title: createLocalizedText(
      "Location de systeme son",
      "Sound system rental",
    ),
    description: createLocalizedText(
      "Packages de diffusion adaptes a la taille du lieu, au type de public et aux contraintes de montage. La large gamme d'equipements audio s'accompagne de l'expertise de nos ingenieurs du son.",
      "System packages adapted to venue size, audience, and install constraints. Our wide range of audio equipment comes backed by the expertise of our sound engineers.",
    ),
  },
  {
    id: "system-tuning",
    title: createLocalizedText("Reglage systeme son", "Sound system tuning"),
    description: createLocalizedText(
      "Calibration, mise en phase et optimisation pour evenements ou installations fixes. Nos experts veillent a creer une experience auditive exceptionnelle, sur systeme fixe comme ephemere.",
      "Calibration, phase alignment, and optimization for events or fixed installs. Our experts ensure an exceptional auditory experience on permanent or temporary systems.",
    ),
  },
  {
    id: "speaker-restoration",
    title: createLocalizedText(
      "Restauration d'enceintes",
      "Speaker restoration",
    ),
    description: createLocalizedText(
      "Reparation, entretien et optimisation de vos equipements audio pour assurer une performance dans la duree. Nos techniciens specialises prolongent la duree de vie de vos enceintes.",
      "Repair, maintenance, and optimization of your audio equipment for lasting performance. Our specialized technicians extend the life of your speakers.",
    ),
  },
  {
    id: "line-up-support",
    title: createLocalizedText("Conception de line-up", "Line-up curation"),
    description: createLocalizedText(
      "Accompagnement artistique et programmation coherente avec le format de l'evenement. Nous collaborons avec des artistes reconnus et des talents emergents pour une programmation sur mesure.",
      "Artistic support and line-up curation aligned with the event format. We work with recognised artists and emerging talents to deliver a tailored programme.",
    ),
  },
];

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: "eaw-kf750",
    slug: "eaw-kf750",
    name: "EAW KF750",
    category: createLocalizedText("Diffusion", "Speaker system"),
    image: eawKf750Image,
    summary: createLocalizedText(
      "Element de diffusion grand format, reference de l'inventaire Gazmatek pour les grandes jauges.",
      "Large-format speaker element, the flagship of the Gazmatek inventory for high-capacity events.",
    ),
    description: createLocalizedText(
      "L'EAW KF750 est une enceinte de diffusion grand format concue pour les grandes jauges. Element central du parc Gazmatek, il offre une projection puissante et un controle precis des frequences mediums et aigus.",
      "The EAW KF750 is a large-format speaker designed for high-capacity venues. A central element of the Gazmatek inventory, it delivers powerful projection and precise control of mid and high frequencies.",
    ),
    specs: [
      {
        label: createLocalizedText("Type", "Type"),
        value: "2-way passive",
      },
      {
        label: createLocalizedText("Utilisation", "Usage"),
        value: "Grand format / Large format",
      },
    ],
  },
  {
    id: "nexo-alpha-b1-15",
    slug: "nexo-alpha-b1-15",
    name: "NEXO Alpha B1-15",
    category: createLocalizedText("Subwoofer", "Subwoofer"),
    image: nexoAlphaB115Image,
    summary: createLocalizedText(
      'Subwoofer 1x15" de la gamme Alpha NEXO, pour une reproduction grave profonde et controlee.',
      '1x15" subwoofer from the NEXO Alpha range, delivering deep and controlled low-end reproduction.',
    ),
    description: createLocalizedText(
      "Le NEXO Alpha B1-15 est un subwoofer 1x15\" concu pour s'integrer au systeme Alpha. Il assure une reproduction basse frequence profonde et precise, adaptee aux evenements de taille moyenne a grande.",
      'The NEXO Alpha B1-15 is a 1x15" subwoofer designed to integrate with the Alpha system. It delivers deep and precise low-frequency reproduction suited to medium to large-scale events.',
    ),
    specs: [
      {
        label: createLocalizedText("Configuration", "Configuration"),
        value: '1 x 15"',
      },
      {
        label: createLocalizedText("Gamme", "Range"),
        value: "NEXO Alpha",
      },
    ],
  },
  {
    id: "montarbo-b115",
    slug: "montarbo-b115",
    name: "Montarbo B115",
    category: createLocalizedText("Subwoofer", "Subwoofer"),
    image: montarboB115Image,
    summary: createLocalizedText(
      'Subwoofer passif 1x15" de la marque italienne Montarbo, pour le renfort des basses.',
      'Passive 1x15" subwoofer by Italian brand Montarbo, for low-end reinforcement.',
    ),
    description: createLocalizedText(
      "Le Montarbo B115 est un subwoofer passif robuste et fiable, repertorie dans l'inventaire legacy Gazmatek pour le renfort des basses dans les configurations medium format.",
      "The Montarbo B115 is a robust and reliable passive subwoofer, listed in the Gazmatek legacy inventory for low-end reinforcement in medium-format configurations.",
    ),
    specs: [
      {
        label: createLocalizedText("Configuration", "Configuration"),
        value: '1 x 15"',
      },
      {
        label: createLocalizedText("Type", "Type"),
        value: "Passif / Passive",
      },
    ],
  },
  {
    id: "plm20000q",
    slug: "plm20000q",
    name: "PLM20000Q",
    category: createLocalizedText("Amplification", "Power amplifier"),
    image: plm20000qImage,
    summary: createLocalizedText(
      "Amplificateur de puissance 4 canaux haute densite, coeur de l'installation amplification Gazmatek.",
      "4-channel high-density power amplifier, at the heart of the Gazmatek amplification setup.",
    ),
    description: createLocalizedText(
      "Le PLM20000Q est un amplificateur de puissance 4 canaux concu pour les installations pro de grande envergure. Il integre un DSP embarque permettant le filtrage, le delay et la protection du systeme.",
      "The PLM20000Q is a 4-channel power amplifier designed for large-scale professional installations. It features an onboard DSP enabling filtering, delay, and system protection.",
    ),
    specs: [
      {
        label: createLocalizedText("Canaux", "Channels"),
        value: "4",
      },
      {
        label: createLocalizedText("DSP integre", "Built-in DSP"),
        value: "Oui / Yes",
      },
    ],
  },
  {
    id: "nuq122-an",
    slug: "nuq122-an",
    name: "NuQ122-AN",
    category: createLocalizedText("Amplification", "Power amplifier"),
    image: nuq122AnImage,
    summary: createLocalizedText(
      "Amplificateur de puissance repertorie dans le parc Gazmatek pour la gestion des circuits d'amplification.",
      "Power amplifier listed in the Gazmatek inventory for amplification circuit management.",
    ),
  },
  {
    id: "mth54-v1",
    slug: "mth54-v1",
    name: "MTH54 V1",
    category: createLocalizedText("Traitement / Gestion", "Processing / DSP"),
    image: mth54V1Image,
    summary: createLocalizedText(
      "Unite de traitement et gestion du signal, element de la chaine de traitement Gazmatek.",
      "Signal processing and management unit, part of the Gazmatek processing chain.",
    ),
  },
  {
    id: "turbosound-tpx122m",
    slug: "turbosound-tpx122m",
    name: "Turbosound TPX122M",
    category: createLocalizedText("Monitoring", "Stage monitor"),
    image: turbosoundTpx122mImage,
    summary: createLocalizedText(
      'Monitor de scene 12" pour le retour artiste. Utilise sur les configurations live et DJ sets.',
      '12" stage monitor for artist foldback. Used in live and DJ set configurations.',
    ),
    specs: [
      {
        label: createLocalizedText("Configuration", "Configuration"),
        value: '1 x 12"',
      },
      {
        label: createLocalizedText("Usage", "Usage"),
        value: "Monitor de scene / Stage monitor",
      },
    ],
  },
  {
    id: "c21",
    slug: "c21",
    name: "C21",
    category: createLocalizedText("Tops", "Full-range tops"),
    image: c21Image,
    summary: createLocalizedText(
      "Enceinte tops pleine bande de l'inventaire Gazmatek, adaptee aux configurations medium format.",
      "Full-range top speaker from the Gazmatek inventory, suited for medium-format configurations.",
    ),
  },
];
