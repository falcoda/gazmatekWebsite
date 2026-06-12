import "./FeaturedArtists.scss";

import { useTranslation } from "react-i18next";

import { buildPagePath } from "@/config/pages";
import { ARTISTS } from "@/content/artists";

import useAnimatedNavigate from "../../../hooks/useAnimatedNavigate";

const FEATURED_SLUGS = [
  "cantik",
  "ecleptix",
  "terapeutek",
  "toxyblue",
  "mobykick",
  "biomystic",
];

const isDefined = <T,>(value: T | undefined): value is T => value !== undefined;

const featuredArtists = FEATURED_SLUGS.map((slug) =>
  ARTISTS.find((a) => a.slug === slug),
).filter(isDefined);

function FeaturedArtists() {
  const { t } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();

  return (
    <section className="featuredArtists">
      <div className="featuredArtistsHeader">
        <h2 className="featuredArtistsSectionTitle">
          {t("featuredArtists.sectionTitle")}
        </h2>
        <button
          className="featuredArtistsSeeAll"
          type="button"
          onClick={() => animatedNavigate(buildPagePath("artists"))}
        >
          {t("featuredArtists.seeAll")} →
        </button>
      </div>
      <div className="featuredArtistsGrid">
        {featuredArtists.map((artist) => (
          <button
            key={artist.id}
            className="artistCard"
            type="button"
            onClick={() =>
              animatedNavigate(
                buildPagePath("artistDetail", { slug: artist.slug }),
              )
            }
          >
            <div className="artistCardPhoto">
              <img
                src={
                  artist.images.portrait ??
                  `https://placehold.co/400x500/141416/21c37a?text=${encodeURIComponent(artist.name)}`
                }
                alt={artist.name}
                className="artistCardImg"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="artistCardInfo">
              <h3 className="artistCardName">{artist.name}</h3>
              <p className="artistCardStyle">{artist.styles.join(" / ")}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FeaturedArtists;
