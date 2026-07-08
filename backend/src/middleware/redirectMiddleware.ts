import type { NextFunction, Request, Response } from "express";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SUPPORTED_LANGUAGES = ["fr", "en"];
const DEFAULT_LANGUAGE = "fr";

/** Legacy route segments → canonical route paths (may span several segments). */
const LEGACY_SEGMENT_MAP: Record<string, string> = {
  "qui-sommes-nous": "about",
  artistes: "artists",
  evenements: "events",
  "next-events": "events/upcoming",
  archives: "events/archive",
};

/** Legacy detail-page prefixes → canonical prefixes (followed by a slug). */
const LEGACY_DETAIL_PREFIX_MAP: Record<string, string> = {
  artiste: "artists",
  evenement: "events",
};

/**
 * First path segments owned by the SPA router. Paths without a language
 * prefix are only redirected when they start with one of these, so
 * non-page routes (e.g. /facebook) are left untouched.
 */
const KNOWN_PAGE_SEGMENTS = new Set([
  "about",
  "artists",
  "events",
  "services",
  "contact",
  "termes-dutilisation",
  ...Object.keys(LEGACY_SEGMENT_MAP),
  ...Object.keys(LEGACY_DETAIL_PREFIX_MAP),
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Picks the first supported language from an Accept-Language header. */
function preferredLanguage(header: string | undefined): string {
  if (!header) return DEFAULT_LANGUAGE;

  const codes = header
    .split(",")
    .map((part) => part.split(";")[0].trim().split("-")[0].toLowerCase());

  for (const code of codes) {
    if (SUPPORTED_LANGUAGES.includes(code)) return code;
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Computes the canonical URL path for a page request:
 *   - legacy aliases are rewritten (/artiste/x → /artists/x, /artistes → /artists)
 *   - a missing language prefix is added for known pages (/artists → /fr/artists)
 *   - trailing slashes are stripped (/fr/artists/ → /fr/artists), except on
 *     the localized home which keeps its trailing slash (/fr/)
 *
 * Returns null when the path is already canonical or not owned by the SPA.
 */
function canonicalPath(path: string): string | null {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return null; // root is handled separately

  let lang: string | null = null;
  if (SUPPORTED_LANGUAGES.includes(segments[0])) {
    lang = segments.shift() ?? null;
  }

  if (!lang && (segments.length === 0 || !KNOWN_PAGE_SEGMENTS.has(segments[0]))) {
    return null;
  }

  if (segments.length > 0) {
    const flatAlias = LEGACY_SEGMENT_MAP[segments[0]];
    const detailAlias = LEGACY_DETAIL_PREFIX_MAP[segments[0]];

    if (flatAlias && segments.length === 1) {
      segments.splice(0, 1, ...flatAlias.split("/"));
    } else if (detailAlias && segments.length === 2) {
      segments[0] = detailAlias;
    }
  }

  const resolvedLang = lang ?? DEFAULT_LANGUAGE;
  const canonical =
    segments.length === 0
      ? `/${resolvedLang}/`
      : `/${resolvedLang}/${segments.join("/")}`;

  return canonical === path ? null : canonical;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

/**
 * Server-side redirects so search engines get real HTTP redirects instead
 * of the SPA's client-side <Navigate> ones:
 *   - 302 on the root, based on Accept-Language (varies per visitor)
 *   - 301 on legacy aliases, missing language prefixes and trailing slashes
 */
export function redirectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.method !== "GET" && req.method !== "HEAD") {
    next();
    return;
  }

  // Never redirect file requests (assets, robots.txt, sitemap.xml, …)
  if (/\.[^/]+$/.test(req.path)) {
    next();
    return;
  }

  const queryIndex = req.originalUrl.indexOf("?");
  const query = queryIndex === -1 ? "" : req.originalUrl.slice(queryIndex);

  if (req.path === "/") {
    const lang = preferredLanguage(req.headers["accept-language"]);
    res.vary("Accept-Language");
    res.redirect(302, `/${lang}/${query}`);
    return;
  }

  const canonical = canonicalPath(req.path);
  if (canonical) {
    res.redirect(301, `${canonical}${query}`);
    return;
  }

  next();
}
