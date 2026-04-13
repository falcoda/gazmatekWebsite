import type { AppLanguage } from "@/i18n/config";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type TranslationStatus = "complete" | "en-pending";

export interface TranslationMeta {
  status: TranslationStatus;
  note?: string;
}

export interface LocalizedImage {
  src: string;
  alt: LocalizedText;
}

export function getLocalizedText(
  value: LocalizedText,
  language: AppLanguage | string | null | undefined,
): string {
  return language === "en" ? value.en : value.fr;
}

export function createLocalizedText(fr: string, en: string): LocalizedText {
  return { fr, en };
}

export function createPendingEnglishText(
  french: string,
  englishFallback: string,
): LocalizedText {
  return {
    fr: french,
    en: englishFallback,
  };
}
