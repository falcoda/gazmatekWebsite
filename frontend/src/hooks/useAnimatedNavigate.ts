import { gsap } from "gsap";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DEFAULT_LANGUAGE, type AppLanguage } from "@/i18n/config";
import { buildLocalizedPath, isSupportedLanguage } from "@/i18n/routing";

interface AnimatedNavigateOptions {
  language?: AppLanguage;
  onComplete?: () => void;
  replace?: boolean;
  skipAnimation?: boolean;
}

let isTransitionRunning = false;

const useAnimatedNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const animatedNavigate = useCallback(
    (
      path: string,
      onCompleteOrOptions?: (() => void) | AnimatedNavigateOptions,
    ) => {
      const options: AnimatedNavigateOptions =
        typeof onCompleteOrOptions === "function"
          ? { onComplete: onCompleteOrOptions }
          : (onCompleteOrOptions ?? {});

      const [, maybeLanguage] = location.pathname.split("/");
      const language =
        options.language ??
        (isSupportedLanguage(maybeLanguage) ? maybeLanguage : DEFAULT_LANGUAGE);
      const localizedPath = buildLocalizedPath(language, path);

      if (location.pathname !== localizedPath) {
        const navigateToPath = () => {
          navigate(localizedPath, { replace: options.replace });
          window.scrollTo({ top: 0, behavior: "auto" });
          options.onComplete?.();
        };

        const shouldSkipAnimation =
          options.skipAnimation ||
          isTransitionRunning ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (shouldSkipAnimation) {
          navigateToPath();
          return;
        }

        const appElement = document.querySelector(".App");

        if (!appElement) {
          navigateToPath();
          return;
        }

        isTransitionRunning = true;

        gsap.killTweensOf(appElement);
        gsap
          .timeline({
            onComplete: () => {
              navigateToPath();
              gsap.set(appElement, { opacity: 0, y: 18, filter: "blur(6px)" });
              gsap.to(appElement, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.32,
                ease: "power2.out",
                clearProps: "filter",
                onComplete: () => {
                  isTransitionRunning = false;
                },
              });
            },
          })
          .to(appElement, {
            opacity: 0,
            y: -14,
            filter: "blur(2px)",
            duration: 0.24,
            ease: "power2.in",
          });

        return;
      }

      options.onComplete?.();
    },
    [location.pathname, navigate],
  );

  return animatedNavigate;
};

export default useAnimatedNavigate;

