import "./ArtistGallery.scss";

import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


interface ArtistGalleryProps {
  images: string[];
  artistName: string;
}

const ArtistGallery = ({ images, artistName }: ArtistGalleryProps) => {
  const { t } = useTranslation();
  const title = t("artists.galleryTitle");
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current || !trackRef.current) return;
      isAnimating.current = true;

      const target = index < 0 ? images.length - 1 : index % images.length;

      gsap.to(trackRef.current, {
        x: `-${target * 100}%`,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrent(target);
          isAnimating.current = false;
        },
      });
    },
    [images.length],
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  if (images.length === 0) return null;

  return (
    <div className="artistGallery">
      <h2 className="title">{title}</h2>
      <div className="viewport">
        <div ref={trackRef} className="track">
          {images.map((src, i) => (
            <div key={i} className="slide">
              <img
                src={src}
                alt={`${artistName} - ${i + 1}`}
                className="image"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              className="arrow arrowPrev"
              onClick={goPrev}
              type="button"
              aria-label={t("artists.galleryPrev")}
            >
              <FaChevronLeft />
            </button>
            <button
              className="arrow arrowNext"
              onClick={goNext}
              type="button"
              aria-label={t("artists.galleryNext")}
            >
              <FaChevronRight />
            </button>

            <div className="dots" role="tablist" aria-label={t("artists.galleryTitle")}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === current ? "dotActive" : ""}`}
                  onClick={() => goTo(i)}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={t("artists.gallerySlide", { n: i + 1 })}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArtistGallery;
