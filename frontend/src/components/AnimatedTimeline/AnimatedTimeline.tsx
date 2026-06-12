import "./AnimatedTimeline.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface TimelineBorderPaths {
  svg: SVGSVGElement;
  base: SVGRectElement;
  top: SVGPathElement;
  bottom: SVGPathElement;
}

interface AnimatedTimelineProps {
  className?: string;
  title?: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
}

interface AnimatedTimelineItemProps {
  side: "left" | "right";
  className?: string;
  children: ReactNode;
}

interface AnimatedTimelineCardFrameProps {
  as?: "button" | "div";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const joinClassNames = (...values: Array<string | undefined | false>) =>
  values.filter(Boolean).join(" ");

const AnimatedTimeline = ({
  className,
  title,
  eyebrow,
  children,
}: AnimatedTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const railBaseRef = useRef<HTMLSpanElement>(null);
  const railCoreRef = useRef<HTMLSpanElement>(null);
  const railGlowRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (
      !timelineRef.current ||
      !railRef.current ||
      !railBaseRef.current ||
      !railCoreRef.current ||
      !railGlowRef.current ||
      !pulseRef.current
    ) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobileTimeline = window.matchMedia("(max-width: 768px)").matches;
    const timelineElement = timelineRef.current;
    const railElement = railRef.current;
    const railBase = railBaseRef.current;
    const railCore = railCoreRef.current;
    const railGlow = railGlowRef.current;
    const pulse = pulseRef.current;
    const markerXPercent = isMobileTimeline ? 0 : -50;

    const updateBorderPaths = (
      item: HTMLElement,
      card: HTMLElement,
      borderPaths: TimelineBorderPaths,
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      const computedStyle = window.getComputedStyle(card);
      const strokeWidth = 2;
      const inset = strokeWidth / 2;
      const baseRadius =
        Number.parseFloat(computedStyle.borderTopLeftRadius) || 8;
      const radius = Math.max(
        Math.min(baseRadius - inset, width / 2 - inset, height / 2 - inset),
        0,
      );
      const left = inset;
      const right = width - inset;
      const top = inset;
      const bottom = height - inset;
      const middle = height / 2;
      const isRightCard = item.classList.contains("right");

      const topPath = isRightCard
        ? `M ${left} ${middle} L ${left} ${top + radius} A ${radius} ${radius} 0 0 1 ${left + radius} ${top} L ${right - radius} ${top} A ${radius} ${radius} 0 0 1 ${right} ${top + radius} L ${right} ${middle}`
        : `M ${right} ${middle} L ${right} ${top + radius} A ${radius} ${radius} 0 0 0 ${right - radius} ${top} L ${left + radius} ${top} A ${radius} ${radius} 0 0 0 ${left} ${top + radius} L ${left} ${middle}`;
      const bottomPath = isRightCard
        ? `M ${left} ${middle} L ${left} ${bottom - radius} A ${radius} ${radius} 0 0 0 ${left + radius} ${bottom} L ${right - radius} ${bottom} A ${radius} ${radius} 0 0 0 ${right} ${bottom - radius} L ${right} ${middle}`
        : `M ${right} ${middle} L ${right} ${bottom - radius} A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom} L ${left + radius} ${bottom} A ${radius} ${radius} 0 0 1 ${left} ${bottom - radius} L ${left} ${middle}`;

      borderPaths.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      borderPaths.base.setAttribute("x", `${inset}`);
      borderPaths.base.setAttribute("y", `${inset}`);
      borderPaths.base.setAttribute("width", `${width - strokeWidth}`);
      borderPaths.base.setAttribute("height", `${height - strokeWidth}`);
      borderPaths.base.setAttribute("rx", `${radius}`);
      borderPaths.base.setAttribute("ry", `${radius}`);
      borderPaths.top.setAttribute("d", topPath);
      borderPaths.bottom.setAttribute("d", bottomPath);

      [borderPaths.top, borderPaths.bottom].forEach((path) => {
        const length = path.getTotalLength();

        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });
    };

    const updateRailBounds = (markers: HTMLElement[]) => {
      if (markers.length === 0) {
        return;
      }

      const timelineRect = timelineElement.getBoundingClientRect();
      const firstMarker = markers[0];
      const lastMarker = markers[markers.length - 1];
      const firstCenter =
        firstMarker.getBoundingClientRect().top -
        timelineRect.top +
        firstMarker.offsetHeight / 2;
      const lastCenter =
        lastMarker.getBoundingClientRect().top -
        timelineRect.top +
        lastMarker.offsetHeight / 2;
      const railHeight = Math.max(lastCenter - firstCenter, 0);

      railElement.style.top = `${firstCenter}px`;
      railElement.style.height = `${railHeight}px`;
    };

    if (reduceMotion) {
      const markers = Array.from(
        timelineElement.querySelectorAll<HTMLElement>(
          ".animatedTimelineMarker",
        ),
      );

      updateRailBounds(markers);
      gsap.set([railBase, railCore, railGlow], { opacity: 1 });
      gsap.set([railCore, railGlow], { scaleY: 1 });
      gsap.set(pulse, { opacity: 1 });
      gsap.set(
        timelineElement.querySelectorAll(
          ".animatedTimelineEyebrow, .animatedTimelineItem, .animatedTimelineMarker",
        ),
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          xPercent: markerXPercent,
          yPercent: -50,
        },
      );
      timelineElement
        .querySelectorAll<HTMLElement>(".animatedTimelineCard")
        .forEach((card) => {
          const item = card.closest<HTMLElement>(".animatedTimelineItem");
          const svg = card.querySelector<SVGSVGElement>(".timelineBorderSvg");
          const base = card.querySelector<SVGRectElement>(
            ".timelineBorderBase",
          );
          const topPath = card.querySelector<SVGPathElement>(
            ".timelineBorderActiveTop",
          );
          const bottomPath = card.querySelector<SVGPathElement>(
            ".timelineBorderActiveBottom",
          );

          if (!item || !svg || !base || !topPath || !bottomPath) {
            return;
          }

          updateBorderPaths(item, card, {
            svg,
            base,
            top: topPath,
            bottom: bottomPath,
          });

          gsap.set(card, { "--timeline-connector-fill": "1" });
          gsap.set([topPath, bottomPath], { strokeDashoffset: 0 });
        });
      return;
    }

    let refreshTimelineLayout: (() => void) | undefined;

    const context = gsap.context(() => {
      const eyebrowElement = timelineElement.querySelector(
        ".animatedTimelineEyebrow",
      );
      const items = gsap.utils.toArray<HTMLElement>(".animatedTimelineItem");
      const markers = items
        .map((item) =>
          item.querySelector<HTMLElement>(".animatedTimelineMarker"),
        )
        .filter((marker): marker is HTMLElement => Boolean(marker));
      const itemEffects = items.map((item) => {
        const card = item.querySelector<HTMLElement>(".animatedTimelineCard");
        const marker = item.querySelector<HTMLElement>(
          ".animatedTimelineMarker",
        );
        const svg = item.querySelector<SVGSVGElement>(".timelineBorderSvg");
        const base = item.querySelector<SVGRectElement>(".timelineBorderBase");
        const topPath = item.querySelector<SVGPathElement>(
          ".timelineBorderActiveTop",
        );
        const bottomPath = item.querySelector<SVGPathElement>(
          ".timelineBorderActiveBottom",
        );

        if (!card || !marker || !svg || !base || !topPath || !bottomPath) {
          return null;
        }

        const borderPaths = { svg, base, top: topPath, bottom: bottomPath };
        updateBorderPaths(item, card, borderPaths);

        gsap.set(card, { "--timeline-connector-fill": "0" });

        const activate = gsap.timeline({ paused: true });
        activate
          .to(
            card,
            {
              "--timeline-connector-fill": "1",
              duration: 0.16,
              ease: "power2.out",
            },
            0,
          )
          .to(
            topPath,
            {
              strokeDashoffset: 0,
              duration: 0.46,
              ease: "power2.out",
            },
            0.08,
          )
          .to(
            bottomPath,
            {
              strokeDashoffset: 0,
              duration: 0.46,
              ease: "power2.out",
            },
            0.08,
          )
          .to(
            card,
            {
              boxShadow:
                "0 24px 48px rgba(3, 7, 18, 0.42), 0 0 26px rgba(114, 214, 227, 0.14)",
              duration: 0.45,
              ease: "power2.out",
            },
            0,
          );

        return { item, marker, activate, borderPaths, card };
      });

      refreshTimelineLayout = () => {
        updateRailBounds(markers);

        itemEffects.forEach((effect) => {
          if (!effect) {
            return;
          }

          updateBorderPaths(effect.item, effect.card, effect.borderPaths);
        });
      };

      refreshTimelineLayout();
      ScrollTrigger.addEventListener("refreshInit", refreshTimelineLayout);

      gsap.set([railCore, railGlow], {
        scaleY: 0,
        transformOrigin: "top center",
      });
      gsap.set(railBase, { opacity: 1 });
      gsap.set(pulse, { opacity: 0.85 });

      if (eyebrowElement) {
        gsap.fromTo(
          eyebrowElement,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: eyebrowElement,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      items.forEach((item) => {
        const card = item.querySelector(".animatedTimelineCard");
        const marker = item.querySelector(".animatedTimelineMarker");
        const offsetX = item.classList.contains("right") ? 72 : -72;
        const cardFrom = isMobileTimeline
          ? { y: 28, opacity: 0 }
          : { x: offsetX, opacity: 0 };
        const cardTo = isMobileTimeline
          ? { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          : { x: 0, opacity: 1, duration: 0.65, ease: "power3.out" };

        if (card) {
          gsap.fromTo(card, cardFrom, {
            ...cardTo,
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
              once: true,
            },
          });
        }

        if (marker) {
          gsap.fromTo(
            marker,
            {
              scale: 0.3,
              opacity: 0,
              xPercent: markerXPercent,
              yPercent: -50,
            },
            {
              scale: 1,
              opacity: 1,
              xPercent: markerXPercent,
              yPercent: -50,
              duration: 0.35,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 84%",
                once: true,
              },
            },
          );
        }
      });

      ScrollTrigger.create({
        trigger: timelineElement,
        start: "top 24%",
        end: "bottom 82%",
        scrub: 0.55,
        onUpdate: (self) => {
          const distance = Math.max(railElement.offsetHeight, 0);

          gsap.set([railCore, railGlow], { scaleY: self.progress });
          gsap.set(pulse, { y: distance * self.progress });

          const pulseCenter =
            pulse.getBoundingClientRect().top + pulse.offsetHeight / 2;

          itemEffects.forEach((effect) => {
            if (!effect) {
              return;
            }

            const markerCenter =
              effect.marker.getBoundingClientRect().top +
              effect.marker.offsetHeight / 2;

            if (pulseCenter >= markerCenter) {
              effect.activate.play();
            } else {
              effect.activate.reverse();
            }
          });
        },
      });

      gsap.to(pulse, {
        boxShadow:
          "0 0 18px rgba(114, 214, 227, 0.4), 0 0 42px rgba(114, 214, 227, 0.18)",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, timelineElement);

    return () => {
      if (refreshTimelineLayout) {
        ScrollTrigger.removeEventListener("refreshInit", refreshTimelineLayout);
      }

      context.revert();
    };
  }, []);

  return (
    <div className={joinClassNames("animatedTimeline", className)}>
      {title ? <h2 className="animatedTimelineTitle">{title}</h2> : null}

      <div className="animatedTimelineFrame" ref={timelineRef}>
        {eyebrow ? <p className="animatedTimelineEyebrow">{eyebrow}</p> : null}

        <div className="animatedTimelineRail" aria-hidden="true" ref={railRef}>
          <span ref={railBaseRef} className="animatedTimelineRailBase" />
          <span ref={railGlowRef} className="animatedTimelineRailGlow" />
          <span ref={railCoreRef} className="animatedTimelineRailCore" />
          <span ref={pulseRef} className="animatedTimelinePulse" />
        </div>

        <div className="animatedTimelineContent">{children}</div>
      </div>
    </div>
  );
};

export const AnimatedTimelineItem = ({
  side,
  className,
  children,
}: AnimatedTimelineItemProps) => (
  <article className={joinClassNames("animatedTimelineItem", side, className)}>
    <div className="animatedTimelineMarker" aria-hidden="true" />
    {children}
  </article>
);

export const AnimatedTimelineCardFrame = ({
  as = "div",
  className,
  children,
  onClick,
  type = "button",
}: AnimatedTimelineCardFrameProps) => {
  if (as === "button") {
    return (
      <button
        className={joinClassNames("animatedTimelineCard", className)}
        onClick={onClick}
        type={type}
      >
        <svg
          aria-hidden="true"
          className="timelineBorderSvg"
          preserveAspectRatio="none"
        >
          <rect className="timelineBorderBase" />
          <path className="timelineBorderActive timelineBorderActiveTop" />
          <path className="timelineBorderActive timelineBorderActiveBottom" />
        </svg>
        {children}
      </button>
    );
  }

  return (
    <div className={joinClassNames("animatedTimelineCard", className)}>
      <svg
        aria-hidden="true"
        className="timelineBorderSvg"
        preserveAspectRatio="none"
      >
        <rect className="timelineBorderBase" />
        <path className="timelineBorderActive timelineBorderActiveTop" />
        <path className="timelineBorderActive timelineBorderActiveBottom" />
      </svg>
      {children}
    </div>
  );
};

export default AnimatedTimeline;
