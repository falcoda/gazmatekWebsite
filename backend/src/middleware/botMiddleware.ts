import fs from "fs";
import type { NextFunction, Request, Response } from "express";
import path from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OgEntry {
  slug: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  imageKey: string | null;
}

interface OgData {
  artists: OgEntry[];
  events: OgEntry[];
}

interface ViteManifestEntry {
  file: string;
  src?: string;
}

type ViteManifest = Record<string, ViteManifestEntry>;

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SITE_URL = "https://gazmatek.com";
const SITE_NAME = "Gazmatek";
const DEFAULT_IMAGE = `${SITE_URL}/shared-thumbnail.jpg`;

/** Social media and link-preview crawlers that do NOT execute JavaScript. */
const BOT_PATTERNS = [
  "facebookexternalhit",
  "facebot",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "slackbot-linkexpanding",
  "slackbot",
  "discordbot",
  "redditbot",
  "vkshare",
  "applebot",
  "ia_archiver",
  "outbrain",
  "pinterest",
  "bingpreview",
  "rogerbot",
];

// ---------------------------------------------------------------------------
// Startup data loading (cached in memory)
// ---------------------------------------------------------------------------

// In dev:  __dirname = backend/src/middleware/  → ../build = backend/src/build/
// In prod: __dirname = $REPO_PATH/middleware/   → ../build = $REPO_PATH/build/  ✅
const BUILD_DIR = path.join(__dirname, "..", "build");

function loadOgData(): OgData {
  try {
    const raw = fs.readFileSync(path.join(__dirname, "..", "og-data.json"), "utf-8");
    return JSON.parse(raw) as OgData;
  } catch {
    return { artists: [], events: [] };
  }
}

function loadManifest(): ViteManifest | null {
  try {
    const raw = fs.readFileSync(
      path.join(BUILD_DIR, ".vite", "manifest.json"),
      "utf-8"
    );
    return JSON.parse(raw) as ViteManifest;
  } catch {
    return null;
  }
}

const ogData: OgData = loadOgData();
const manifest: ViteManifest | null = loadManifest();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some((pattern) => ua.includes(pattern));
}

/**
 * Resolves a Vite source key (e.g. "src/assets/img/artists/cantik.jpg")
 * to an absolute URL using the build manifest, or falls back to the default.
 */
function resolveImageUrl(imageKey: string | null): string {
  if (!imageKey || !manifest) return DEFAULT_IMAGE;
  const entry = manifest[imageKey];
  if (!entry) return DEFAULT_IMAGE;
  return `${SITE_URL}/${entry.file}`;
}

/**
 * Strips the language prefix from a pathname.
 * e.g. "/fr/artists/cantik" → "/artists/cantik"
 */
function stripLang(pathname: string): { lang: string; rest: string } {
  const parts = pathname.split("/").filter(Boolean);
  const supportedLangs = ["fr", "en"];

  if (parts.length > 0 && supportedLangs.includes(parts[0])) {
    return { lang: parts[0], rest: "/" + parts.slice(1).join("/") };
  }

  return { lang: "fr", rest: pathname };
}

function buildOgHtml(params: {
  title: string;
  description: string;
  imageUrl: string;
  canonicalUrl: string;
  lang: string;
}): string {
  const { title, description, imageUrl, canonicalUrl, lang } = params;
  const ogLocale = lang === "en" ? "en_US" : "fr_BE";
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <title>${escaped(title)}</title>
  <meta name="description" content="${escaped(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="${ogLocale}" />
  <meta property="og:title" content="${escaped(title)}" />
  <meta property="og:description" content="${escaped(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escaped(title)}" />
  <meta name="twitter:description" content="${escaped(description)}" />
  <meta name="twitter:image" content="${imageUrl}" />
</head>
<body></body>
</html>`;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

export function botMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!isBot(req.headers["user-agent"])) {
    next();
    return;
  }

  const { lang, rest } = stripLang(req.path);

  // Match /artists/:slug
  const artistMatch = rest.match(/^\/artists\/([^/]+)\/?$/);
  if (artistMatch) {
    const slug = artistMatch[1];
    const entry = ogData.artists.find((a) => a.slug === slug);

    if (entry) {
      const title = lang === "en" ? entry.titleEn : entry.titleFr;
      const description = lang === "en" ? entry.descEn : entry.descFr;
      const imageUrl = resolveImageUrl(entry.imageKey);
      const canonicalUrl = `${SITE_URL}${req.path}`;

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(buildOgHtml({ title, description, imageUrl, canonicalUrl, lang }));
      return;
    }
  }

  // Match /events/:slug (not /events/upcoming or /events/archive)
  const eventMatch = rest.match(/^\/events\/([^/]+)\/?$/);
  if (eventMatch) {
    const slug = eventMatch[1];
    const RESERVED = ["upcoming", "archive"];

    if (!RESERVED.includes(slug)) {
      const entry = ogData.events.find((e) => e.slug === slug);

      if (entry) {
        const title = lang === "en" ? entry.titleEn : entry.titleFr;
        const description = lang === "en" ? entry.descEn : entry.descFr;
        const imageUrl = resolveImageUrl(entry.imageKey);
        const canonicalUrl = `${SITE_URL}${req.path}`;

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(buildOgHtml({ title, description, imageUrl, canonicalUrl, lang }));
        return;
      }
    }
  }

  // Not a dynamic detail page — serve normally
  next();
}
