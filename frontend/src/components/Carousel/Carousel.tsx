import "./Carousel.scss";

import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  images: string[];
  altPrefix: string;
  autoPlayMs?: number;
}

const Carousel = ({ images, altPrefix, autoPlayMs = 5000 }: CarouselProps) => {
  const { t } = useTranslation();
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
    if (images.length <= 1) return;
    const interval = setInterval(goNext, autoPlayMs);
    return () => clearInterval(interval);
  }, [goNext, autoPlayMs, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="carousel">
      <div ref={trackRef} className="track">
        {images.map((src, i) => (
          <div key={i} className="slide">
            <img
              src={src}
              alt={`${altPrefix} - ${i + 1}`}
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
  );
};

export default Carousel;
