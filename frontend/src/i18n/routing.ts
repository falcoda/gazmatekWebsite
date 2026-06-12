import {
  type AppLanguage,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from "./config";

export function isSupportedLanguage(
  value: string | null | undefined,
): value is AppLanguage {
  return Boolean(value && SUPPORTED_LANGUAGES.includes(value as AppLanguage));
}

export function getStoredLanguage(): AppLanguage | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage
    .getItem(LANGUAGE_STORAGE_KEY)
    ?.toLowerCase();

  return isSupportedLanguage(stored) ? stored : null;
}

export function detectPreferredLanguage(): AppLanguage {
  const stored = getStoredLanguage();

  if (stored) {
    return stored;
  }

  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.split("-")[0]?.toLowerCase();

    if (isSupportedLanguage(browserLang)) {
      return browserLang;
    }
  }

  return DEFAULT_LANGUAGE;
}

export function stripLanguagePrefix(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const [, firstSegment, ...rest] = normalized.split("/");

  if (!isSupportedLanguage(firstSegment)) {
    return normalized;
  }

  const remaining = rest.join("/");

  return remaining ? `/${remaining}` : "/";
}

export function buildLocalizedPath(
  language: AppLanguage,
  pathname: string = "/",
): string {
  const normalized = stripLanguagePrefix(pathname);

  return normalized === "/" ? `/${language}/` : `/${language}${normalized}`;
}
