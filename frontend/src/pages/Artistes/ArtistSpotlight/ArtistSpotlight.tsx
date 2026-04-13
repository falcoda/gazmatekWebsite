import "./ArtistSpotlight.scss";

import { useCallback, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { buildPagePath } from "@/config/pages";
import type { ArtistProfile } from "@/content/artists";
import useAnimatedNavigate from "../../../hooks/useAnimatedNavigate";

interface ArtistSpotlightProps {
  artists: ArtistProfile[];
}

const PLACEHOLDER = "https://placehold.co/480x560/141416/8b8b8b?text=";

const ArtistSpotlight = ({ artists }: ArtistSpotlightProps) => {
  const { t, i18n } = useTranslation();
  const animatedNavigate = useAnimatedNavigate();
  const lang = i18n.resolvedLanguage ?? "fr";
  const spotlightTitle = t("artists.spotlightTitle");
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  if (artists.length === 0) return null;

  return (
    <div className="artistSpotlight">
      <div className="spotlightHeader">
        <h2 className="spotlightTitle">
          {spotlightTitle}
        </h2>
        <div className="spotlightArrows">
          <button
            className={`arrowBtn ${canScrollLeft ? "" : "arrowDisabled"}`}
            onClick={() => scroll("left")}
            type="button"
            aria-label="Précédent"
            disabled={!canScrollLeft}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`arrowBtn ${canScrollRight ? "" : "arrowDisabled"}`}
            onClick={() => scroll("right")}
            type="button"
            aria-label="Suivant"
            disabled={!canScrollRight}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={stripRef}
        className="spotlightStrip"
        onScroll={updateScrollState}
      >
        {artists.map((artist) => {
          const shortBio = artist.bio.short
            ? lang === "en"
              ? artist.bio.short.en
              : artist.bio.short.fr
            : undefined;

          return (
            <button
              key={artist.id}
              className="spotlightCard"
              type="button"
              onClick={() =>
                animatedNavigate(
                  buildPagePath("artistDetail", { slug: artist.slug }),
                )
              }
            >
              <div className="spotlightImgWrap">
                <img
                  src={
                    artist.images.portrait ??
                    `${PLACEHOLDER}${encodeURIComponent(artist.name)}`
                  }
                  alt={artist.name}
                  className="spotlightImg"
                  loading="lazy"
                />
                <div className="spotlightGrad" />
              </div>
              <div className="spotlightInfo">
                <span className="spotlightStyles">
                  {artist.styles.join(" · ")}
                </span>
                <h3 className="spotlightName">
                  {artist.name}
                </h3>
                {shortBio && (
                  <p className="spotlightBio">{shortBio}</p>
                )}
                <span className="spotlightCta">{t("artists.discover")} →</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistSpotlight;
