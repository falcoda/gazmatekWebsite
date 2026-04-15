import albiovixPhoto from "@/assets/img/artists/albiovix.jpg";
import briouchKPhoto from "@/assets/img/artists/briouch-k.jpg";
import cantikPhoto from "@/assets/img/artists/cantik.jpg";
import ecleptixPhoto from "@/assets/img/artists/ecleptix.jpg";
import ekwazzPhoto from "@/assets/img/artists/ekwazz.jpg";
import electromancienPhoto from "@/assets/img/artists/electromancien.jpg";
import etatZeroPhoto from "@/assets/img/artists/etat-zero.jpg";
import exil3Photo from "@/assets/img/artists/exil3.jpg";
import fuzzeyPhoto from "@/assets/img/artists/fuzzey.jpg";
import gLittlePhoto from "@/assets/img/artists/g-little.jpg";
import ganjaflexxPhoto from "@/assets/img/artists/ganjaflexx.jpg";
import kemicalCrowPhoto from "@/assets/img/artists/kemical-crow.jpg";
import kromozomPhoto from "@/assets/img/artists/kromozom.jpg";
import lemmaPhoto from "@/assets/img/artists/lemma.jpg";
import mevenPhoto from "@/assets/img/artists/meven.jpg";
import minopolskaPhoto from "@/assets/img/artists/minopolska.jpg";
import mobykickPhoto from "@/assets/img/artists/mobykick.jpg";
import moracidPhoto from "@/assets/img/artists/moracid.jpg";
import nxPhoto from "@/assets/img/artists/n-x.jpg";
import nocidPhoto from "@/assets/img/artists/nocid.jpg";
import olibriumPhoto from "@/assets/img/artists/olibrius.jpg";
import raikPhoto from "@/assets/img/artists/raik.jpg";
import rkProjectPhoto from "@/assets/img/artists/rk-project.jpg";
import samePhoto from "@/assets/img/artists/same.jpg";
import sekter4Photo from "@/assets/img/artists/sekter4.jpg";
import sevenumoSixPhoto from "@/assets/img/artists/sevenum-six.jpg";
import shmykblickPhoto from "@/assets/img/artists/shmykblick.jpg";
import soul3dPhoto from "@/assets/img/artists/soul3d.jpg";
import staterakPhoto from "@/assets/img/artists/staterak.jpg";
import suarezPhoto from "@/assets/img/artists/suarez.jpg";
import tekiapyMobitekkPhoto from "@/assets/img/artists/tekiapy-mobitekk.jpg";
import terapeutekPhoto from "@/assets/img/artists/terapeutek.jpg";
import toxybluePhoto from "@/assets/img/artists/toxyblue.jpg";
import vizitor23Photo from "@/assets/img/artists/vizitor23.jpg";
import zetro23Photo from "@/assets/img/artists/zetro23.jpg";

import type { LocalizedText } from "./types";

export interface ArtistLinks {
  soundcloud?: string;
  bandcamp?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  spotify?: string;
  website?: string;
}

export interface ArtistImages {
  portrait?: string;
  gallery?: string[];
}

export interface ArtistBio {
  /** 2–4 line editorial summary, clearly marked as reformulation */
  short?: LocalizedText;
  /** Full cleaned bio from source documents */
  full?: LocalizedText;
}

export interface ArtistSeo {
  title: LocalizedText;
  description: LocalizedText;
}

/** Content readiness of an artist profile */
export type ArtistStatus = "ready" | "needs-cleanup" | "pages-blocked";

export interface ArtistProfile {
  id: string;
  slug: string;
  name: string;
  isResident: boolean;
  gender?: "m" | "f";
  /** Genre tags derived from source text */
  styles: string[];
  images: ArtistImages;
  links?: ArtistLinks;
  /** Optional specific track URL to embed instead of the SoundCloud profile */
  previewTrackUrl?: string;
  bio: ArtistBio;
  seo: ArtistSeo;
  /** Primary source document used for this profile */
  source: string;
  status: ArtistStatus;
}

// ---------------------------------------------------------------------------
// Normalized artist collection
// Source: Bio_artistes.pdf (primary) + dedicated PDFs where noted
// Naming normalized per epic-3 rules:
//   RK - Projekt → R.K PROJECT
//   Shmyblyk / Shmykblick → SHMYKBLICK
//   Suarez Antonio → SUAREZ
// ---------------------------------------------------------------------------

export const ARTISTS: ArtistProfile[] = [
  // ── Cantik ────────────────────────────────────────────────────────────────
  {
    id: "cantik",
    slug: "cantik",
    name: "CANTIK",
    isResident: true,
    styles: ["Hardtek", "Frenchcore"],
    images: { portrait: cantikPhoto },
    links: {
      soundcloud: "https://soundcloud.com/cantik",
      instagram: "https://www.instagram.com/cantik_music",
      facebook: "https://www.facebook.com/cantik.hardmusic",
    },
    bio: {
      short: {
        fr: "Originaire du nord de la France, Cantik découvre l'univers de la Rave en 2007, influencé par Billx, Floxytek et Narkotek. Producteur depuis 2008, il intègre des influences trance, dubstep, drum'n'bass et frenchcore dans un style positif et énergisant.",
        en: "From northern France, Cantik discovered the rave scene in 2007, influenced by Billx, Floxytek and Narkotek. Producing since 2008, he weaves trance, dubstep, drum'n'bass and frenchcore into a positive, energizing sound.",
      },
      full: {
        fr: "Originaire du nord de la France, c'est en 2007 que Cantik découvre l'univers de la Rave. À cette époque, la Hardtek domine les dancefloors, et c'est lors de ses rencontres avec des figures emblématiques telles que Billx, Floxytek, Mat Weasel Buster, ainsi que certains membres du crew Narkotek, que naît le désir de créer. Ses premières tracks voient le jour en 2008. Depuis lors, son style s'est affiné, intégrant des influences trance, dubstep, drum'n'bass et frenchcore dans ses nouvelles productions. Sa philosophie reste la même depuis ses débuts : créer une musique positive et énergisante !",
        en: "From northern France, Cantik discovered the rave scene in 2007. At the time, Hardtek dominated the dancefloors, and it was through encounters with iconic figures such as Billx, Floxytek, Mat Weasel Buster and members of the Narkotek crew that the desire to create was born. His first tracks appeared in 2008. Since then his style has evolved, incorporating trance, dubstep, drum'n'bass and frenchcore influences. His philosophy has never changed: create positive, energizing music.",
      },
    },
    seo: {
      title: { fr: "CANTIK — Gazmatek", en: "CANTIK — Gazmatek" },
      description: {
        fr: "Cantik, producteur de Hardtek et Frenchcore originaire du nord de la France, résident chez Gazmatek.",
        en: "Cantik, Hardtek and Frenchcore producer from northern France, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Albiovix ───────────────────────────────────────────────────────────────
  {
    id: "albiovix",
    slug: "albiovix",
    name: "ALBIOVIX",
    isResident: true,
    styles: ["Acid Tekno", "Dark Tekno"],
    images: { portrait: albiovixPhoto },
    links: {
      soundcloud: "https://soundcloud.com/albiovix",
      bandcamp: "https://albiovix.bandcamp.com",
      instagram: "https://www.instagram.com/albiovix/",
      facebook: "https://www.facebook.com/albiovix23/",
      youtube: "https://www.youtube.com/@albiovix",
      website: "https://www.albiovix.com/",
    },
    bio: {
      short: {
        fr: "Né en Belgique en 1994, Albiovix découvre la tekno underground free en 2016. Porté par les énergies sombres de la culture free, il commence à produire dès 2017 et rejoint Gazmatek Records comme résident.",
        en: "Born in Belgium in 1994, Albiovix discovered the underground free tekno scene in 2016. Drawn by its dark energies, he began producing in 2017 and joined Gazmatek Records as a resident artist.",
      },
      full: {
        fr: "Après des années à fréquenter les concerts de metal, hardcore, death core et slamming death metal, ainsi que des festivals depuis l'âge de 14 ans, élevé par la musique, Thomas, né en Belgique en 1994, a été présenté à la musique underground free tekno et à la culture par son frère en 2016 à l'âge de 21 ans. En assistant pour la première fois à des événements de différents genres de musique électronique, Albiovix s'est laissé emporter par l'atmosphère de la culture underground free tekno. Se sentant compris et saisissant les énergies sombres de la tourmente et de la frustration, il a rapidement ressenti un besoin naturel de recréer et d'exprimer ces énergies. Il a commencé à produire depuis le début de 2017 lors de diverses fêtes gratuites. Albiovix a été invité en tant que résident de Gazmatek Records, rapidement encouragé par des organisations et des artistes belges emblématiques qu'il admirait.",
        en: "After years attending metal, hardcore, death core and slamming death metal concerts and festivals from the age of 14, Thomas — born in Belgium in 1994 — was introduced to underground free tekno music and culture by his brother in 2016 at the age of 21. At his first underground events, Albiovix was swept up by the atmosphere of free tekno culture. Feeling understood and seized by its dark, turbulent energies, he felt a natural drive to recreate and express what he found there. He began producing in early 2017 at various free parties, and was soon invited to join Gazmatek Records as a resident, encouraged by iconic Belgian organizations and artists he had long admired.",
      },
    },
    seo: {
      title: { fr: "ALBIOVIX — Gazmatek", en: "ALBIOVIX — Gazmatek" },
      description: {
        fr: "Albiovix, producteur de tekno sombre originaire de Belgique, résident chez Gazmatek Records.",
        en: "Albiovix, dark tekno producer from Belgium, resident at Gazmatek Records.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Briouch'k ──────────────────────────────────────────────────────────────
  {
    id: "briouk",
    slug: "briouk",
    name: "BRIOUCH'K",
    isResident: true,
    styles: ["Mental Tekno", "Dark Tekno"],
    images: { portrait: briouchKPhoto },
    links: { soundcloud: "https://soundcloud.com/briouchk" },
    bio: {
      short: {
        fr: "Artiste belge issu des cercles underground, Briouch'K produit une Mental Tekno aux atmosphères singulières et sombres.",
        en: "A Belgian artist from the underground scene, Briouch'K produces Mental Tekno with singular, dark atmospheres.",
      },
      full: {
        fr: "Artiste belge issu des cercles underground, Briouch'K est un producteur de Mental Tekno qui aime créer des atmosphères singulières à travers des ambiances dark. Il vous fera danser avec un rythme palpitant !",
        en: "A Belgian artist from the underground scene, Briouch'K is a Mental Tekno producer who crafts singular atmospheres through dark moods. He will make you dance to a pounding rhythm.",
      },
    },
    seo: {
      title: { fr: "BRIOUCH'K — Gazmatek", en: "BRIOUCH'K — Gazmatek" },
      description: {
        fr: "Briouch'K, producteur de Mental Tekno belge, résident chez Gazmatek.",
        en: "Briouch'K, Belgian Mental Tekno producer, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Butternut ──────────────────────────────────────────────────────────────
  {
    id: "butternut",
    slug: "butternut",
    name: "BUTTERNUT",
    isResident: true,
    styles: ["Hardtekno", "Underground Tekno", "Psytrance"],
    images: {},
    links: {
      soundcloud: "https://soundcloud.com/butternut-ktb",
      bandcamp: "https://butternutktb.bandcamp.com",
    },
    bio: {
      short: {
        fr: "Originaire de Nantes, Butternut produit de l'hardtekno, de l'underground tekno et de la psytrance. Ses morceaux mêlent intros jungle et minimal style Hardfloor autour de 180 BPM.",
        en: "From Nantes, Butternut produces hardtekno, underground tekno and psytrance. His tracks blend jungle-style intros with minimal Hardfloor-esque patterns around 180 BPM.",
      },
      full: {
        fr: "Originaire de Nantes en France, Butternut produit de la musique électronique hard, du hardtekno, de l'underground tekno, de la psytrance et du tekno. Ses morceaux se caractérisent par des passages d'intro jungle qui se transforment en tracks minimal de style hardfloor autour de 180 BPM.",
        en: "From Nantes, France, Butternut produces hard electronic music, hardtekno, underground tekno, psytrance and tekno. His tracks are characterised by jungle-style intro passages that evolve into minimal, Hardfloor-influenced patterns around 180 BPM.",
      },
    },
    seo: {
      title: { fr: "BUTTERNUT — Gazmatek", en: "BUTTERNUT — Gazmatek" },
      description: {
        fr: "Butternut, producteur de Hardtekno et Psytrance de Nantes, résident chez Gazmatek.",
        en: "Butternut, Hardtekno and Psytrance producer from Nantes, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Ecleptix ───────────────────────────────────────────────────────────────
  {
    id: "ecleptix",
    slug: "ecleptix",
    name: "ECLEPTIX",
    isResident: true,
    styles: ["Hi-Tech", "Hardtek", "Frenchcore"],
    images: { portrait: ecleptixPhoto },
    links: { soundcloud: "https://soundcloud.com/ecleptixmusic" },
    bio: {
      short: {
        fr: "Label DJ importé du cœur de la Belgique, Ecleptix mêle Hi-Tech, Hardtek et Frenchcore dans un style énergique et hybride. Sa mission : servir la musique la plus groovy et la plus lourde possible.",
        en: "A label DJ from the heart of Belgium, Ecleptix blends Hi-Tech, Hardtek and Frenchcore into a high-energy hybrid style. His mission: to deliver the grooviest and heaviest music on every dancefloor.",
      },
      full: {
        fr: "Label DJ directement importé du cœur de la Belgique, Ecleptix plonge dans un mix hybride énergétique allant du Hi-Tech groovy au Hardtek percutant avec même des touches de Frenchcore. Sa mission : proposer la musique la plus groovy et la plus lourde possible pour faire danser les foules.",
        en: "A label DJ imported directly from the heart of Belgium, Ecleptix dives into an energetic hybrid mix ranging from groovy Hi-Tech to hard-hitting Hardtek with touches of Frenchcore. His mission: to deliver the grooviest and heaviest music possible to get crowds dancing.",
      },
    },
    seo: {
      title: { fr: "ECLEPTIX — Gazmatek", en: "ECLEPTIX — Gazmatek" },
      description: {
        fr: "Ecleptix, DJ label belge mêlant Hi-Tech, Hardtek et Frenchcore, résident chez Gazmatek.",
        en: "Ecleptix, Belgian label DJ blending Hi-Tech, Hardtek and Frenchcore, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Ekwazz ────────────────────────────────────────────────────────────────
  {
    id: "ekwazz",
    slug: "ekwazz",
    name: "EKWAZZ",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: ekwazzPhoto },
    links: { soundcloud: "https://soundcloud.com/ekwazz" },
    bio: {},
    seo: {
      title: { fr: "EKWAZZ — Gazmatek", en: "EKWAZZ — Gazmatek" },
      description: {
        fr: "Ekwazz, artiste résident du collectif Gazmatek.",
        en: "Ekwazz, resident artist of the Gazmatek collective.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── L'Electromancien ──────────────────────────────────────────────────────
  {
    id: "electromancien",
    slug: "electromancien",
    name: "L'ELECTROMANCIEN",
    isResident: true,
    styles: ["Tekno", "Frenchcore", "Breakcore", "IDM"],
    images: { portrait: electromancienPhoto },
    links: {
      soundcloud: "https://soundcloud.com/lelectromancien",
      bandcamp: "https://lelectromancien.bandcamp.com",
    },
    bio: {
      short: {
        fr: "Artiste bruxellois évoluant entre tekno, frenchcore, IDM et breakcore. Il a sorti l'EP 'The Story Of Teknocore' sur Gazmatek Records.",
        en: "Brussels-based artist navigating tekno, frenchcore, IDM and breakcore. He released the EP 'The Story Of Teknocore' on Gazmatek Records.",
      },
      full: {
        fr: "Artiste basé à Bruxelles, L'Electromancien évolue dans les genres électronique, frenchcore, IDM, breakcore et tekno. Il combine des influences tekno et hardtek avec des éléments de musique électronique expérimentale, intégrant notamment des esthétiques breakcore et IDM dans son style de production. Il a sorti l'EP 'The Story Of Teknocore' sur Gazmatek Records.",
        en: "Brussels-based, L'Electromancien moves through electronic, frenchcore, IDM, breakcore and tekno genres. He combines tekno and hardtek influences with elements of experimental electronic music, weaving breakcore and IDM aesthetics into his production style. He released the EP 'The Story Of Teknocore' on Gazmatek Records.",
      },
    },
    seo: {
      title: {
        fr: "L'ELECTROMANCIEN — Gazmatek",
        en: "L'ELECTROMANCIEN — Gazmatek",
      },
      description: {
        fr: "L'Electromancien, artiste bruxellois de tekno, frenchcore et IDM, résident chez Gazmatek.",
        en: "L'Electromancien, Brussels tekno, frenchcore and IDM artist, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Etat Zero ─────────────────────────────────────────────────────────────
  {
    id: "etat-zero",
    slug: "etat-zero",
    name: "ETAT ZERO",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: etatZeroPhoto },
    links: { soundcloud: "https://soundcloud.com/etat-zero" },
    bio: {},
    seo: {
      title: { fr: "ETAT ZERO — Gazmatek", en: "ETAT ZERO — Gazmatek" },
      description: {
        fr: "Etat Zero, artiste résident du collectif Gazmatek.",
        en: "Etat Zero, resident artist of the Gazmatek collective.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── EX!L3 ────────────────────────────────────────────────────────────────
  {
    id: "exil3",
    slug: "exil3",
    name: "EX!L3",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: exil3Photo },
    links: {
      soundcloud: "https://soundcloud.com/exil3",
      bandcamp: "https://crystalcorps.bandcamp.com/album/isolate",
    },
    bio: {},
    seo: {
      title: { fr: "EX!L3 — Gazmatek", en: "EX!L3 — Gazmatek" },
      description: {
        fr: "EX!L3, artiste de la scène tekno underground belge, résident chez Gazmatek.",
        en: "EX!L3, Belgian underground tekno artist, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Fuzzey ────────────────────────────────────────────────────────────────
  {
    id: "fuzzey",
    slug: "fuzzey",
    name: "FUZZEY",
    isResident: true,
    styles: ["Multi-genre"],
    images: { portrait: fuzzeyPhoto },
    links: {
      soundcloud: "https://soundcloud.com/fuzzeysound",
      instagram: "https://www.instagram.com/fuzzey_studio",
      facebook: "https://www.facebook.com/FUZZEYsound",
    },
    bio: {
      short: {
        fr: "Artiste indépendant multi-instrumentiste, Fuzzey compose dans plusieurs styles différents. Il est également leader, compositeur et producteur du groupe GLITCHH.",
        en: "An independent multi-instrumentalist, Fuzzey composes across several different styles. He is also the leader, composer and producer of the group GLITCHH.",
      },
      full: {
        fr: "Artiste indépendant multi-instrumentiste qui compose des compositions originales dans plusieurs styles différents. Fuzzey est également le leader, compositeur et producteur du groupe GLITCHH.",
        en: "An independent multi-instrumentalist who composes original compositions across several different styles. Fuzzey is also the leader, composer and producer of the group GLITCHH.",
      },
    },
    seo: {
      title: { fr: "FUZZEY — Gazmatek", en: "FUZZEY — Gazmatek" },
      description: {
        fr: "Fuzzey, multi-instrumentiste et producteur du groupe GLITCHH, résident chez Gazmatek.",
        en: "Fuzzey, multi-instrumentalist and producer of the group GLITCHH, resident at Gazmatek.",
      },
    },
    source: "Fuzzey Bio + Link.pdf",
    status: "needs-cleanup",
  },

  // ── Ganjaflexx ────────────────────────────────────────────────────────────
  {
    id: "ganjaflexx",
    slug: "ganjaflexx",
    name: "GANJAFLEXX",
    isResident: true,
    styles: ["Tekno", "Techno"],
    images: { portrait: ganjaflexxPhoto },
    links: { soundcloud: "https://soundcloud.com/ganjaflexx" },
    bio: {
      short: {
        fr: "DJ résident chez Gazmatek, Atohm et Foorsystem, GanjaFlexx travaille au vinyle et aux timecodes Traktor. Son style allie basslines pulsantes et mélodies éthérées pour des compositions énergiques.",
        en: "Resident DJ at Gazmatek, Atohm and Foorsystem, GanjaFlexx works with vinyl and Traktor timecodes. His style combines pulsing basslines with ethereal melodies for energetic compositions.",
      },
      full: {
        fr: "DJ résident chez Gazmatek, Atohm et Foorsystem, GanjaFlexx travaille avec du vinyle et les timecodes Traktor. Ses morceaux se distinguent par leur énergie contagieuse, leurs rythmes complexes et leurs couches épaisses de synthétiseurs, combinant des basslines pulsantes et des mélodies éthérées pour créer des compositions énergétiques et engageantes.",
        en: "Resident DJ at Gazmatek, Atohm and Foorsystem, GanjaFlexx works with vinyl and Traktor timecodes. His tracks are distinguished by their contagious energy, complex rhythms and thick layers of synthesizers, combining pulsing basslines with ethereal melodies to create energetic, engaging compositions.",
      },
    },
    seo: {
      title: { fr: "GANJAFLEXX — Gazmatek", en: "GANJAFLEXX — Gazmatek" },
      description: {
        fr: "GanjaFlexx, DJ vinyle résident chez Gazmatek, Atohm et Foorsystem.",
        en: "GanjaFlexx, vinyl DJ resident at Gazmatek, Atohm and Foorsystem.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── G-Little ──────────────────────────────────────────────────────────────
  {
    id: "g-little",
    slug: "g-little",
    name: "G-LITTLE",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: gLittlePhoto },
    links: { soundcloud: "https://soundcloud.com/g-little" },
    bio: {},
    seo: {
      title: { fr: "G-LITTLE — Gazmatek", en: "G-LITTLE — Gazmatek" },
      description: {
        fr: "G-Little, artiste résident du collectif Gazmatek.",
        en: "G-Little, resident artist of the Gazmatek collective.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Kemikal Crow ──────────────────────────────────────────────────────────
  {
    id: "kemical-crow",
    slug: "kemical-crow",
    name: "KEMIKAL CROW",
    isResident: true,
    styles: ["Tekno", "Hardware Live"],
    images: { portrait: kemicalCrowPhoto },
    links: { soundcloud: "https://soundcloud.com/gazmatek/kemikal-crow-dissident-9" },
    previewTrackUrl: "https://soundcloud.com/gazmatek/kemikal-crow-dissident-9",
    bio: {
      short: {
        fr: "Le projet Kemikal Crow est un voyage auditif mental qui repousse constamment les limites du politiquement correct ainsi que les normes standards fixées par l'industrie de la musique.",
        en: "The Kemikal Crow project is a mental auditory journey that constantly pushes the limits of political correctness and the standard norms set by the music industry.",
      },
      full: {
        fr: "Le projet Kemikal Crow est un voyage auditif mental qui repousse constamment les limites du politiquement correct ainsi que les normes standards fixées par l'industrie de la musique.",
        en: "The Kemikal Crow project is a mental auditory journey that constantly pushes the limits of political correctness and the standard norms set by the music industry.",
      },
    },
    seo: {
      title: { fr: "KEMIKAL CROW — Gazmatek", en: "KEMIKAL CROW — Gazmatek" },
      description: {
        fr: "Kemikal Crow, un voyage auditif mental qui repousse les limites du politiquement correct, résident chez Gazmatek.",
        en: "Kemikal Crow, a mental auditory journey constantly pushing the limits of political correctness, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Kromozom ─────────────────────────────────────────────────────────────
  {
    id: "kromozom",
    slug: "kromozom",
    name: "KROMOZOM",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: kromozomPhoto },
    links: {},
    bio: {},
    seo: {
      title: { fr: "KROMOZOM — Gazmatek", en: "KROMOZOM — Gazmatek" },
      description: {
        fr: "Kromozom, artiste résident du collectif Gazmatek.",
        en: "Kromozom, resident artist of the Gazmatek collective.",
      },
    },
    source: "All links and contacts.docx",
    status: "needs-cleanup",
  },

  // ── Lemma ─────────────────────────────────────────────────────────────────
  {
    id: "lemma",
    slug: "lemma",
    name: "LEMMA",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: lemmaPhoto },
    links: { soundcloud: "https://soundcloud.com/lemma" },
    bio: {},
    seo: {
      title: { fr: "LEMMA — Gazmatek", en: "LEMMA — Gazmatek" },
      description: {
        fr: "Lemma, artiste résident du collectif Gazmatek.",
        en: "Lemma, resident artist of the Gazmatek collective.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Meven ─────────────────────────────────────────────────────────────────
  // Note: full bio only in .pages file — not extracted
  {
    id: "meven",
    slug: "meven",
    name: "MEVEN",
    isResident: true,
    styles: ["Hard Techno"],
    images: { portrait: mevenPhoto },
    links: { soundcloud: "https://soundcloud.com/meven" },
    bio: {},
    seo: {
      title: { fr: "MEVEN — Gazmatek", en: "MEVEN — Gazmatek" },
      description: {
        fr: "Meven, producteur de Hard Techno, résident chez Gazmatek.",
        en: "Meven, Hard Techno producer, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "pages-blocked",
  },

  // ── Minopolska ────────────────────────────────────────────────────────────
  {
    id: "minopolska",
    slug: "minopolska",
    name: "MINOPOLSKA",
    isResident: true,
    styles: ["Hard Techno"],
    images: { portrait: minopolskaPhoto },
    links: {
      soundcloud: "https://soundcloud.com/minopolska",
      instagram: "https://www.instagram.com/minopolska/",
    },
    bio: {
      short: {
        fr: "DJ et productrice de Hard Techno originaire de Belgique, Minopolska prêche la techno depuis 2009. Résidente chez Gazmatek, elle est une figure incontournable de la scène bruxelloise.",
        en: "Belgian Hard Techno DJ and producer, Minopolska has been preaching techno since 2009. A resident at Gazmatek, she is a key figure of the Brussels scene.",
      },
      full: {
        fr: "DJ et productrice de Hard Techno originaire de Belgique, Minopolska prêche la techno depuis 2009. Résidente chez Gazmatek, elle fait partie intégrante de la scène tekno bruxelloise.",
        en: "Belgian Hard Techno DJ and producer, Minopolska has been preaching techno since 2009. A resident at Gazmatek, she is an integral part of the Brussels tekno scene.",
      },
    },
    seo: {
      title: { fr: "MINOPOLSKA — Gazmatek", en: "MINOPOLSKA — Gazmatek" },
      description: {
        fr: "Minopolska, DJ et productrice de Hard Techno belge, résidente chez Gazmatek depuis 2009.",
        en: "Minopolska, Belgian Hard Techno DJ and producer, resident at Gazmatek since 2009.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Mobykick ──────────────────────────────────────────────────────────────
  {
    id: "mobykick",
    slug: "mobykick",
    name: "MOBYKICK",
    isResident: true,
    styles: ["Acid Tekno"],
    images: { portrait: mobykickPhoto },
    links: { soundcloud: "https://soundcloud.com/mobykick" },
    bio: {
      short: {
        fr: "Co-fondateur de Gazmatek, Mobykick s'installe à Bruxelles en 2013. Son project mêle acid mélodieux et kick bass gargantuesque, oscillant entre ses origines, ses influences et une technicité vivante et organique.",
        en: "Co-founder of Gazmatek, Mobykick settled in Brussels in 2013. His project blends melodic acid with colossal kick bass, oscillating between his origins, influences and a living, organic technicality.",
      },
      full: {
        fr: "Épicurien musical ayant grandi à travers de nombreux styles musicaux, Mobykick a connu l'essor de la musique électronique depuis son plus jeune âge. Originaire d'une des villes les plus industrielles de Belgique, il s'installe à Bruxelles en 2013 et profite du dynamisme de cette ville pour développer et apprendre les métiers de l'audiovisuel. Technicien son et lumière, il est l'un des fondateurs du mouvement et label Gazmatek. Son projet Mobykick trouve son origine dans une musique acid mélodieuse aux kick bass gargantuesque, oscillant entre ses origines, ses influences et une technicité vivante et organique.",
        en: "A musical epicurean who grew up across many musical styles, Mobykick was immersed in the rise of electronic music from a young age. From one of Belgium's most industrial cities, he settled in Brussels in 2013 and embraced the city's energy to develop his skills in audio-visual work. A sound and lighting technician, he is one of the founders of the Gazmatek movement and label. His Mobykick project originates in melodic acid music with colossal kick bass, oscillating between his origins, influences and a living, organic technicality.",
      },
    },
    seo: {
      title: { fr: "MOBYKICK — Gazmatek", en: "MOBYKICK — Gazmatek" },
      description: {
        fr: "Mobykick, co-fondateur de Gazmatek et producteur d'Acid Tekno mélodie, basé à Bruxelles.",
        en: "Mobykick, co-founder of Gazmatek and melodic Acid Tekno producer, based in Brussels.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Moracid ───────────────────────────────────────────────────────────────
  {
    id: "moracid",
    slug: "moracid",
    name: "MORACID",
    isResident: true,
    styles: ["Tekno", "Hardware Live"],
    images: { portrait: moracidPhoto },
    links: {
      soundcloud: "https://soundcloud.com/moracid",
      instagram: "https://www.instagram.com/moracid_",
    },
    bio: {
      short: {
        fr: "Producteur belge ayant débuté à 16 ans sous FL Studio 8, Moracid est membre du crew Gazmatek. Il a sorti des tracks comme 'Mental Rec' et 'Raspoutine' sur Gazmatek Records.",
        en: "Belgian producer who started at 16 with FL Studio 8, Moracid is a member of the Gazmatek crew. He has released tracks such as 'Mental Rec' and 'Raspoutine' on Gazmatek Records.",
      },
      full: {
        fr: "Producteur de musique belge, Moracid a commencé à produire à l'âge de 16 ans en utilisant FL Studio 8, débutant avec sa première sortie en club. Membre du crew Gazmatek, il a sorti des tracks comme 'Mental Rec' et 'Raspoutine' sur le label Gazmatek Records.",
        en: "Belgian music producer, Moracid began producing at the age of 16 using FL Studio 8, starting with his first club release. A member of the Gazmatek crew, he has released tracks such as 'Mental Rec' and 'Raspoutine' on the Gazmatek Records label.",
      },
    },
    seo: {
      title: { fr: "MORACID — Gazmatek", en: "MORACID — Gazmatek" },
      description: {
        fr: "Moracid, producteur tekno belge et membre de Gazmatek Records.",
        en: "Moracid, Belgian tekno producer and Gazmatek Records member.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Nocid ─────────────────────────────────────────────────────────────────
  {
    id: "nocid",
    slug: "nocid",
    name: "NOCID",
    isResident: true,
    styles: ["Acid Tekno"],
    images: { portrait: nocidPhoto },
    links: { soundcloud: "https://soundcloud.com/nocid" },
    bio: {
      short: {
        fr: "Figure majeure de la tekno underground belge, Nocid crée les événements Escape to Acid depuis 2005. Il s'est produit en Belgique, France, Luxembourg, Allemagne et Pays-Bas. En 2019, il fonde l'Escape Club Underground.",
        en: "A major figure of the Belgian underground tekno scene, Nocid has been running Escape to Acid events since 2005. He has performed in Belgium, France, Luxembourg, Germany and the Netherlands. In 2019 he founded Escape Club Underground.",
      },
      full: {
        fr: "En 2005, Nocid s'installe à Liège et crée les événements Escape to Acid. Il a été invité à travers toute la Belgique, la France, le Luxembourg, l'Allemagne et les Pays-Bas, se produisant aussi bien en free parties que dans des lieux comme le Pétrole Club à Anvers, Structure Béton à Bruxelles, Njoy à Arlon et Urban Spree à Berlin. En 2010, Nocid traverse une période de production majeure et sort des tracks sur des labels comme Translucide Rec, Puzzling Rec, Pandead Rec et Belgian Tekno Conspiracy. Il devient également animateur de radio FM puis directeur de Warm Radio. Tout en continuant à se produire et à organiser Escape to Acid, en 2019 il crée l'Escape Club Underground, sa principale occupation.",
        en: "In 2005, Nocid settled in Liège and created the Escape to Acid events. He has performed across Belgium, France, Luxembourg, Germany and the Netherlands, at free parties and venues such as Pétrole Club in Antwerp, Structure Béton in Brussels, Njoy in Arlon and Urban Spree in Berlin. In 2010, Nocid entered a major production period, releasing tracks on labels including Translucide Rec, Puzzling Rec, Pandead Rec and Belgian Tekno Conspiracy. He also became an FM radio presenter and later director of Warm Radio. While continuing to perform and organise Escape to Acid, he founded Escape Club Underground in 2019, which remains his main focus.",
      },
    },
    seo: {
      title: { fr: "NOCID — Gazmatek", en: "NOCID — Gazmatek" },
      description: {
        fr: "Nocid, figure majeure de l'Acid Tekno underground belge et fondateur d'Escape to Acid, résident Gazmatek.",
        en: "Nocid, major figure of the Belgian underground Acid Tekno scene and founder of Escape to Acid, Gazmatek resident.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── N X ───────────────────────────────────────────────────────────────────
  {
    id: "n-x",
    slug: "n-x",
    name: "N X",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: nxPhoto },
    links: { soundcloud: "https://soundcloud.com/nx" },
    bio: {},
    seo: {
      title: { fr: "N X — Gazmatek", en: "N X — Gazmatek" },
      description: {
        fr: "N X, artiste résident du collectif Gazmatek.",
        en: "N X, resident artist of the Gazmatek collective.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Olibrius ──────────────────────────────────────────────────────────────
  {
    id: "olibrius",
    slug: "olibrius",
    name: "OLIBRIUS",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: olibriumPhoto },
    links: { soundcloud: "https://soundcloud.com/nunus02" },
    bio: {
      short: {
        fr: "Associé à Legz Breakerz, Gazmatek, Indiscret, MCSTB et Dissonant Tekno Records, Olibrius est un acteur incontournable de la scène tekno underground. Releases : Transelucid 07, Mental Assembly V.3, Engraine 0.",
        en: "Associated with Legz Breakerz, Gazmatek, Indiscret, MCSTB and Dissonant Tekno Records, Olibrius is a key player in the underground tekno scene. Releases include Transelucid 07, Mental Assembly V.3 and Engraine 0.",
      },
      full: {
        fr: "Associé à Legz Breakerz et Gazmatek, faisant partie du PLT & GTK krew, Olibrius est également impliqué avec Indiscret, MCSTB et Dissonant Tekno Records. Ses releases incluent Transelucid 07, Mental Assembly V.3 et Engraine 0. Acteur incontournable de la scène tekno underground.",
        en: "Associated with Legz Breakerz and Gazmatek, part of the PLT & GTK krew, Olibrius is also involved with Indiscret, MCSTB and Dissonant Tekno Records. His releases include Transelucid 07, Mental Assembly V.3 and Engraine 0. A key player in the underground tekno scene.",
      },
    },
    seo: {
      title: { fr: "OLIBRIUS — Gazmatek", en: "OLIBRIUS — Gazmatek" },
      description: {
        fr: "Olibrius, acteur de la scène tekno underground belge, résident chez Gazmatek.",
        en: "Olibrius, a key player in the Belgian underground tekno scene, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Raik ──────────────────────────────────────────────────────────────────
  {
    id: "raik",
    slug: "raik",
    name: "RAIK",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: raikPhoto },
    links: { soundcloud: "https://soundcloud.com/raikrecords" },
    bio: {},
    seo: {
      title: { fr: "RAIK — Gazmatek", en: "RAIK — Gazmatek" },
      description: {
        fr: "Raik, DJ et producteur tekno belge, résident chez Gazmatek.",
        en: "Raik, Belgian tekno DJ and producer, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── R.K Project ───────────────────────────────────────────────────────────
  // Note: folder named "RK - Projekt" — normalized to R.K PROJECT
  {
    id: "rk-project",
    slug: "rk-project",
    name: "R.K PROJECT",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: rkProjectPhoto },
    links: {
      soundcloud: "https://soundcloud.com/remx-kinesis",
      facebook: "https://www.facebook.com/RKProjectbelgium",
    },
    bio: {
      short: {
        fr: "R.K Project est un artiste résident chez Gazmatek Records, avec la release 'Ride The Vibe' sur le label.",
        en: "R.K Project is a resident artist at Gazmatek Records, with the release 'Ride The Vibe' on the label.",
      },
      full: {
        fr: "R.K Project est un artiste résident chez Gazmatek Records, avec des releases comme 'Ride The Vibe' sur le label.",
        en: "R.K Project is a resident artist at Gazmatek Records, with releases such as 'Ride The Vibe' on the label.",
      },
    },
    seo: {
      title: { fr: "R.K PROJECT — Gazmatek", en: "R.K PROJECT — Gazmatek" },
      description: {
        fr: "R.K Project, artiste résident de Gazmatek Records.",
        en: "R.K Project, resident artist at Gazmatek Records.",
      },
    },
    source: "Biographie R.K Project.pdf",
    status: "needs-cleanup",
  },

  // ── SAME ──────────────────────────────────────────────────────────────────
  {
    id: "same",
    slug: "same",
    name: "SAME",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: samePhoto },
    links: { soundcloud: "https://soundcloud.com/same" },
    bio: {},
    seo: {
      title: { fr: "SAME — Gazmatek", en: "SAME — Gazmatek" },
      description: {
        fr: "SAME, artiste résident du collectif Gazmatek.",
        en: "SAME, resident artist of the Gazmatek collective.",
      },
    },
    source: "SAME.pdf",
    status: "needs-cleanup",
  },

  // ── Sekter4 ───────────────────────────────────────────────────────────────
  {
    id: "sekter4",
    slug: "sekter4",
    name: "SEKTER4",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: sekter4Photo },
    links: { soundcloud: "https://soundcloud.com/sekter4" },
    bio: {},
    seo: {
      title: { fr: "SEKTER4 — Gazmatek", en: "SEKTER4 — Gazmatek" },
      description: {
        fr: "Sekter4, artiste résident du collectif Gazmatek.",
        en: "Sekter4, resident artist of the Gazmatek collective.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Sevenum Six ───────────────────────────────────────────────────────────
  {
    id: "sevenum-six",
    slug: "sevenum-six",
    name: "SEVENUM SIX",
    isResident: true,
    styles: ["Acid Tekno"],
    images: { portrait: sevenumoSixPhoto },
    links: { soundcloud: "https://soundcloud.com/sevenumsix_live" },
    bio: {
      short: {
        fr: "Musicien électronique depuis 17 ans en 2008, Sevenum Six est membre du Cult Collective. Il a contribué au premier vinyle Gazmatek Records 01 avec le track 'Human Perception'.",
        en: "Making electronic music since the age of 17 in 2008, Sevenum Six is a member of the Cult Collective. He contributed the track 'Human Perception' to Gazmatek Records' first vinyl release.",
      },
      full: {
        fr: "Sevenum Six a commencé la musique électronique à l'âge de 17 ans en 2008. Il est rapidement devenu accro à la combinaison de sons analogiques et numériques en studio, et au fil des années, la scène free party et la musique acid ont fait de lui ce qu'il est aujourd'hui. Il fait partie du collectif Cult Collective associé à Gazmatek et a contribué au premier vinyle Gazmatek Records 01 avec le track 'Human Perception'.",
        en: "Sevenum Six began making electronic music at the age of 17 in 2008. He quickly became captivated by the combination of analogue and digital sounds in the studio, and over the years the free party scene and acid music shaped him into the artist he is today. He is a member of the Cult Collective associated with Gazmatek and contributed the track 'Human Perception' to the first Gazmatek Records vinyl release.",
      },
    },
    seo: {
      title: { fr: "SEVENUM SIX — Gazmatek", en: "SEVENUM SIX — Gazmatek" },
      description: {
        fr: "Sevenum Six, membre du Cult Collective et artiste Acid Tekno, résident chez Gazmatek.",
        en: "Sevenum Six, Cult Collective member and Acid Tekno artist, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Shmykblick ────────────────────────────────────────────────────────────
  // Note: folders named "Shmyblyk" — normalized to SHMYKBLICK
  {
    id: "shmykblick",
    slug: "shmykblick",
    name: "SHMYKBLICK",
    isResident: true,
    styles: ["Dark Tekno", "Analog Live"],
    images: { portrait: shmykblickPhoto },
    links: { soundcloud: "https://soundcloud.com/nihellzz" },
    bio: {
      short: {
        fr: "Artiste liégeois du collectif Avotrez, Shmykblick performe en analog live set avec ses Elektrons. Il crée des univers sombres, rythmiques et explosifs issus de la culture free party underground.",
        en: "A Liège-based artist from the Avotrez collective, Shmykblick performs analog live sets with Elektron hardware, crafting dark, rhythmic and explosive soundscapes rooted in underground free party culture.",
      },
      full: {
        fr: "Artiste liégeois membre du collectif Avotrez, Shmykblick est également connu sous le nom d'Ekymoze, grâce à ses nombreux designs créés pour des sound systems et artistes de la scène underground free party. Il se produit avec ses deux Elektrons, créant un univers musical qui mêle sons sombres, rythmes énergétiques et kicks explosifs. Résident chez Gazmatek, il performe en analog live set avec du matériel Elektron AR MK1.",
        en: "A Liège-based artist and member of the Avotrez collective, Shmykblick is also known as Ekymoze for his many designs created for sound systems and artists in the underground free party scene. He performs with two Elektrons, creating a musical world that blends dark sounds, energetic rhythms and explosive kicks. A resident at Gazmatek, he performs analog live sets using Elektron AR MK1 hardware.",
      },
    },
    seo: {
      title: { fr: "SHMYKBLICK — Gazmatek", en: "SHMYKBLICK — Gazmatek" },
      description: {
        fr: "Shmykblick, live analog Elektron du collectif Avotrez, résident chez Gazmatek.",
        en: "Shmykblick, Elektron analog live act from the Avotrez collective, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Soul3d ────────────────────────────────────────────────────────────────
  {
    id: "soul3d",
    slug: "soul3d",
    name: "SOUL3D",
    isResident: true,
    styles: ["Tekno", "Vinyl"],
    images: { portrait: soul3dPhoto },
    links: {
      soundcloud: "https://soundcloud.com/soul3d",
      instagram: "https://www.instagram.com/dj_soul3d/",
    },
    bio: {
      short: {
        fr: "Élevé par un père DJ et collectionneur de vinyles depuis les années 1970, Soul3d a grandi dans la musique. Résident chez Gazmatek, sa philosophie : VINYL RULES.",
        en: "Raised by a father who DJed and collected vinyl since the 1970s, Soul3d grew up immersed in music. A resident at Gazmatek, his philosophy: VINYL RULES.",
      },
      full: {
        fr: "Soul3d a commencé à écouter de la musique électronique très jeune, son père étant DJ et collectionneur de vinyles depuis les années 1970. Sa philosophie musicale : VINYL RULES. Résident chez Gazmatek, il fait partie de la scène tekno bruxelloise.",
        en: "Soul3d began listening to electronic music very young, his father being a DJ and vinyl collector since the 1970s. His musical philosophy: VINYL RULES. A resident at Gazmatek, he is part of the Brussels tekno scene.",
      },
    },
    seo: {
      title: { fr: "SOUL3D — Gazmatek", en: "SOUL3D — Gazmatek" },
      description: {
        fr: "Soul3d, DJ vinyle de la scène tekno bruxelloise, résident chez Gazmatek.",
        en: "Soul3d, vinyl DJ from the Brussels tekno scene, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Staterak ──────────────────────────────────────────────────────────────
  {
    id: "staterak",
    slug: "staterak",
    name: "STATERAK",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: staterakPhoto },
    links: { soundcloud: "https://soundcloud.com/staterak" },
    bio: {
      short: {
        fr: "L'histoire musicale de Staterak commence en 2019 lorsqu'il reçoit FL Studio. Depuis, il développe son univers sonore et rejoint le collectif Gazmatek comme résident.",
        en: "Staterak's musical journey began in 2019 when he received FL Studio. Since then he has developed his sonic universe and joined the Gazmatek collective as a resident.",
      },
      full: {
        fr: "L'histoire musicale de Staterak commence en 2019 lorsqu'il reçoit FL Studio comme instrument lors d'une fête. Depuis, il a développé son univers sonore et rejoint le collectif Gazmatek en tant que résident, contribuant à la scène tekno underground bruxelloise.",
        en: "Staterak's musical journey began in 2019 when he received FL Studio as a gift at a party. Since then he has developed his sonic universe and joined the Gazmatek collective as a resident, contributing to the Brussels underground tekno scene.",
      },
    },
    seo: {
      title: { fr: "STATERAK — Gazmatek", en: "STATERAK — Gazmatek" },
      description: {
        fr: "Staterak, producteur tekno bruxellois, résident chez Gazmatek.",
        en: "Staterak, Brussels tekno producer, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Suarez ────────────────────────────────────────────────────────────────
  // Note: folder named "Suarez Antonio" — normalized to SUAREZ
  {
    id: "suarez",
    slug: "suarez",
    name: "SUAREZ",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: suarezPhoto },
    links: {},
    bio: {},
    seo: {
      title: { fr: "SUAREZ — Gazmatek", en: "SUAREZ — Gazmatek" },
      description: {
        fr: "Suarez, artiste résident du collectif Gazmatek.",
        en: "Suarez, resident artist of the Gazmatek collective.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },

  // ── Tekiapy & Mobitekk ────────────────────────────────────────────────────
  // Note: full bio only in .pages file — not extracted
  {
    id: "tekiapy-mobitekk",
    slug: "tekiapy-mobitekk",
    name: "TEKIAPY & MOBITEKK",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: tekiapyMobitekkPhoto },
    links: { soundcloud: "https://soundcloud.com/miss-tiapy" },
    bio: {
      short: {
        fr: "Tekiapy est DJ/Productrice depuis 2011, résidente chez Gazmatek, Éphémère & Keereki Were Soundsystem et Bad Station Radio. Avec Mobitekk, ils forment un duo de la scène tekno underground.",
        en: "Tekiapy has been a DJ/Producer since 2011, resident at Gazmatek, Éphémère & Keereki Were Soundsystem and Bad Station Radio. Together with Mobitekk they form a duo of the underground tekno scene.",
      },
      full: {
        fr: "Tekiapy est DJ/Productrice depuis 2011, résidente chez Gazmatek ainsi que chez Éphémère & Keereki Were Soundsystem et Bad Station Radio Livestream. Ensemble avec Mobitekk, ils forment un duo de la scène tekno underground.",
        en: "Tekiapy has been a DJ and producer since 2011, resident at Gazmatek as well as Éphémère & Keereki Were Soundsystem and Bad Station Radio Livestream. Together with Mobitekk they form a duo of the underground tekno scene.",
      },
    },
    seo: {
      title: {
        fr: "TEKIAPY & MOBITEKK — Gazmatek",
        en: "TEKIAPY & MOBITEKK — Gazmatek",
      },
      description: {
        fr: "Tekiapy & Mobitekk, duo de la scène tekno underground, résidents chez Gazmatek.",
        en: "Tekiapy & Mobitekk, underground tekno duo, residents at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "pages-blocked",
  },

  // ── Terapeutek ────────────────────────────────────────────────────────────
  // Note: additional .pages content not extracted
  {
    id: "terapeutek",
    slug: "terapeutek",
    name: "TERAPEUTEK",
    isResident: true,
    styles: ["Tribe", "Hardtek", "Raggatek", "Acidcore", "Hardcore"],
    images: { portrait: terapeutekPhoto },
    links: {
      soundcloud: "https://soundcloud.com/terapeutek",
      instagram: "https://www.instagram.com/terapeutek/",
    },
    bio: {
      short: {
        fr: "Co-fondateur du Gazmatek Sound System en 2016, Terapeutek est un DJ underground français passionné de vinyle. Actif depuis les années 2000, il parcourt les free parties et teknivals à travers l'Europe.",
        en: "Co-founder of the Gazmatek Sound System in 2016, Terapeutek is a French underground DJ and vinyl devotee. Active since the early 2000s, he has toured free parties and teknivals across Europe.",
      },
      full: {
        fr: "DJ underground originaire de France, actif depuis les années 2000, Terapeutek est passionné par le mix vinyle. Il fréquente les free parties, raves et teknivals à travers l'Europe depuis plus de 20 ans, se spécialisant dans le Pumping Tribe, Tribe, Hardtek, Raggatek, Acidcore et Hardcore. Co-fondateur du Gazmatek Sound System en Belgique créé en 2016, il produit désormais les artistes du crew et découvre de nouveaux talents.",
        en: "An underground DJ from France, active since the early 2000s, Terapeutek is passionate about vinyl mixing. He has attended free parties, raves and teknivals across Europe for over 20 years, specialising in Pumping Tribe, Tribe, Hardtek, Raggatek, Acidcore and Hardcore. Co-founder of the Gazmatek Sound System in Belgium in 2016, he now produces the crew's artists and discovers new talent.",
      },
    },
    seo: {
      title: { fr: "TERAPEUTEK — Gazmatek", en: "TERAPEUTEK — Gazmatek" },
      description: {
        fr: "Terapeutek, co-fondateur de Gazmatek Sound System et DJ vinyle de Tribe et Hardtek, actif depuis les années 2000.",
        en: "Terapeutek, co-founder of Gazmatek Sound System and vinyl DJ of Tribe and Hardtek, active since the early 2000s.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Toxyblue ──────────────────────────────────────────────────────────────
  // Note: additional .pages content not extracted
  {
    id: "toxyblue",
    slug: "toxyblue",
    name: "TOXYBLUE",
    isResident: true,
    gender: "f",
    styles: ["Hardpsy", "Acid Tekno", "Gabber", "Live Instrument"],
    images: { portrait: toxybluePhoto },
    links: {
      soundcloud: "https://soundcloud.com/toxyblue",
      bandcamp: "https://toxyblue.bandcamp.com",
      instagram: "https://www.instagram.com/toxyblue.music",
    },
    previewTrackUrl: "https://soundcloud.com/toxyblue/toxyblue-antifa",
    bio: {
      short: {
        fr: "TØXYBLUE est une productrice musicale belgo-italienne issue d'une famille de musiciens et passionnée de musique depuis son enfance.\nMulti-instrumentiste et chanteuse, elle fusionne aujourd'hui son univers avec l'énergie brute de la scène rave pour créer un son hybride innovent. Elle a beaucoup voyagée à la recherche de nouvelles inspirations sonore.",
        en: "TØXYBLUE is a Belgian-Italian music producer from a family of musicians, passionate about music since childhood. A multi-instrumentalist and singer, she fuses her world with the raw energy of the rave scene to create an innovative hybrid sound, travelling widely in search of new sonic inspirations.",
      },
      full: {
        fr: "TØXYBLUE est une productrice musicale belgo-italienne issue d'une famille de musiciens et passionnée de musique depuis son enfance.\nMulti-instrumentiste et chanteuse, elle fusionne aujourd'hui son univers avec l'énergie brute de la scène rave pour créer un son hybride innovent. Elle a beaucoup voyagée à la recherche de nouvelles inspirations sonores.\nSa passion contagieuse se reflète dans ses performances — mélange entre mix et live — marquées par une énergie Bouncy assumée et associée à la Hardpsy et à l'Acid Tekno.\nSa signature artistique reste reconnaissable : un son puissant et libre.\nFin 2022, elle rejoint le crew Gazmatek System, se fait connaître en jouant dans des lieux emblématiques tels que La Zinzinerie et l'Accroche, et conquis le public Belge grâce à ses premières productions.\nEn 2024, son style musical s'affine, ses productions se multiplient et décide de se consacrer plainement au développement de sa carrière. Celle-ci prenant un tournant lui permettant de jouer aux côtés d'artistes qui l'ont inspirée.",
        en: "TØXYBLUE is a Belgian-Italian music producer from a family of musicians, passionate about music since childhood. A multi-instrumentalist and singer, she fuses her world with the raw energy of the rave scene to create an innovative hybrid sound, travelling widely in search of new sonic inspirations. Her contagious passion shines through her performances — a blend of mix and live — marked by an unapologetic Bouncy energy rooted in Hardpsy and Acid Tekno. Her artistic signature remains unmistakable: a powerful, free sound. In late 2022 she joined the Gazmatek System crew, making her name at iconic venues such as La Zinzinerie and l'Accroche, and winning over the Belgian crowd with her first productions. In 2024 her sound sharpened, her output grew, and she committed fully to her career — a turning point that brought her to perform alongside the artists who inspired her.",
      },
    },
    seo: {
      title: { fr: "TOXYBLUE — Gazmatek", en: "TOXYBLUE — Gazmatek" },
      description: {
        fr: "TØXYBLUE, multi-instrumentiste et co-fondatrice de VAKɅRM, évoluant entre Hardpsy et Acid Tekno, résidente chez Gazmatek.",
        en: "TØXYBLUE, multi-instrumentalist and co-founder of VAKɅRM, moving between Hardpsy and Acid Tekno, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "ready",
  },

  // ── Vizitor 23 ────────────────────────────────────────────────────────────
  // Note: full bio only in .pages file — not extracted
  {
    id: "vizitor23",
    slug: "vizitor23",
    name: "VIZITOR 23",
    isResident: true,
    styles: ["Tekno"],
    images: { portrait: vizitor23Photo },
    links: { soundcloud: "https://soundcloud.com/vizitor23" },
    bio: {},
    seo: {
      title: { fr: "VIZITOR 23 — Gazmatek", en: "VIZITOR 23 — Gazmatek" },
      description: {
        fr: "Vizitor 23, artiste résident du collectif Gazmatek.",
        en: "Vizitor 23, resident artist of the Gazmatek collective.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "pages-blocked",
  },

  // ── Zetro23 ───────────────────────────────────────────────────────────────
  {
    id: "zetro23",
    slug: "zetro23",
    name: "ZETRO23",
    isResident: true,
    styles: ["Tekno", "Hardware Live"],
    images: { portrait: zetro23Photo },
    links: { soundcloud: "https://soundcloud.com/zetro23" },
    bio: {
      short: {
        fr: "DJ/producteur depuis 2018, Zetro23 produit exclusivement en live avec du hardware (Korg EMX, ER1mk2, EA1). Adepte du 'ONLY LIVE, NO MASTER', résident chez Gazmatek.",
        en: "DJ/producer since 2018, Zetro23 produces exclusively live with hardware (Korg EMX, ER1mk2, EA1). A devotee of 'ONLY LIVE, NO MASTER', resident at Gazmatek.",
      },
      full: {
        fr: "DJ/producteur depuis 2018, originaire du nord de la France. Adepte du 'ONLY LIVE, NO MASTER', Zetro23 produit exclusivement en live avec du matériel hardware comme le Korg EMX, ER1mk2 et EA1. Résident chez Gazmatek, il apporte une énergie brute et analogique à la scène.",
        en: "DJ/producer since 2018, originally from northern France. A devotee of 'ONLY LIVE, NO MASTER', Zetro23 produces exclusively live using hardware such as the Korg EMX, ER1mk2 and EA1. A resident at Gazmatek, he brings raw, analogue energy to the scene.",
      },
    },
    seo: {
      title: { fr: "ZETRO23 — Gazmatek", en: "ZETRO23 — Gazmatek" },
      description: {
        fr: "Zetro23, DJ/producteur hardware live du nord de la France, résident chez Gazmatek.",
        en: "Zetro23, hardware live DJ/producer from northern France, resident at Gazmatek.",
      },
    },
    source: "Bio_artistes.pdf",
    status: "needs-cleanup",
  },
];

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

export function getArtistBySlug(slug: string): ArtistProfile | undefined {
  return ARTISTS.find((a) => a.slug === slug);
}

export function getResidentArtists(): ArtistProfile[] {
  return ARTISTS.filter((a) => a.isResident);
}

export function getFeaturedArtists(): ArtistProfile[] {
  return ARTISTS.filter((a) => a.images.portrait);
}

