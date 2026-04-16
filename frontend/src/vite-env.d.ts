/// <reference types="vite/client" />

// Google Consent Mode / gtag global
interface Window {
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
}
