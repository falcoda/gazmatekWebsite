import "./ArtistCard.scss";

import { useTranslation } from "react-i18next";

import { buildPagePath } from "@/config/pages";
import type { ArtistProfile } from "@/content/artists";

import useAnimatedNavigate from "../../../hooks/useAnimatedNavigate";

interface ArtistCardProps {
  artist: ArtistProfile;
}

const PLACEHOLDER_PHOTO = "https://placehold.co/400x400/141416/8b8b8b?text=";

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const { t, i18n } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();
  const lang = i18n.resolvedLanguage ?? "fr";

  const photoSrc =
    artist.images.portrait ||
    `${PLACEHOLDER_PHOTO}${encodeURIComponent(artist.name)}`;

  const shortBio = artist.bio.short
    ? lang === "en"
      ? artist.bio.short.en
      : artist.bio.short.fr
    : undefined;

  const handleClick = () => {
    animatedNavigate(buildPagePath("artistDetail", { slug: artist.slug }));
  };

  return (
    <div
      className="artistCard"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="imageWrap">
        <img
          src={photoSrc}
          alt={artist.name}
          className="image"
          loading="lazy"
          decoding="async"
        />
        <div className="overlay">
          <span className="discover">{t("artists.discover")} →</span>
        </div>
      </div>
      <div className="info">
        <h3 className="name">{artist.name}</h3>
        <span className="style">{artist.styles.join(" / ")}</span>
        {shortBio && <p className="bio">{shortBio}</p>}
      </div>
    </div>
  );
};

export default ArtistCard;
