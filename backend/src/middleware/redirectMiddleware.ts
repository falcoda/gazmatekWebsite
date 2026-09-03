import type { NextFunction, Request, Response } from "express";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SUPPORTED_LANGUAGES = ["fr", "en"];
const DEFAULT_LANGUAGE = "fr";

/**
 * The single host search engines should see. Every other gazmatek.com
 * sub-host (www, mainly) is 301'd here: both used to answer 200, which made
 * the whole site look duplicated to Google.
 */
const CANONICAL_HOST = "gazmatek.com";

/** Flat root URLs inherited from the previous site → canonical page paths. */
const LEGACY_FLAT_URL_MAP: Record<string, string> = {
  nx: "artists/n-x",
  moracid: "artists/moracid",
  "gazmatek-party-3": "events/gazmatek-party-3",
  "nocturne-ulb": "events/nocturne-ulb",
};

/** Legacy route segments → canonical route paths (may span several segments). */
const LEGACY_SEGMENT_MAP: Record<string, string> = {
  "qui-sommes-nous": "about",
  artistes: "artists",
  evenements: "events",
  location: "services",
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

/**
 * Request host without the port, reading X-Forwarded-Host first since the app
 * runs behind a reverse proxy. Read here rather than through `trust proxy` so
 * enabling it does not also change req.ip / req.protocol app-wide.
 */
function requestHost(req: Request): string {
  const forwarded = req.headers["x-forwarded-host"];
  const raw =
    (typeof forwarded === "string" ? forwarded.split(",")[0] : undefined) ??
    req.headers.host ??
    "";

  return raw.trim().split(":")[0].toLowerCase();
}

/**
 * True for gazmatek.com sub-hosts only (www.gazmatek.com and friends), so
 * localhost and container hostnames are never redirected to production.
 */
function needsHostRedirect(host: string): boolean {
  return host !== CANONICAL_HOST && host.endsWith(`.${CANONICAL_HOST}`);
}

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

  // Flat root URLs from the previous site (/nx, /moracid, …). Without this
  // they fall through to the SPA, which answers 200 and then client-side
  // redirects to the home page — Google reads that as a soft 404 and drops
  // whatever ranking the old URL had earned.
  if (segments.length === 1) {
    const legacyTarget = LEGACY_FLAT_URL_MAP[segments[0]];

    if (legacyTarget) {
      return `/${lang ?? DEFAULT_LANGUAGE}/${legacyTarget}`;
    }
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
 *   - 301 off the www host onto the canonical one, folded into the path
 *     redirect below so a request never needs two hops
 *   - 302 on the root, based on Accept-Language (varies per visitor)
 *   - 301 on legacy aliases, legacy flat URLs, missing language prefixes
 *     and trailing slashes
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

  // Off-host requests are sent to the canonical host in the same hop as the
  // path fix, so www.gazmatek.com/evenements lands on gazmatek.com/fr/events
  // without chaining two redirects.
  const offHost = needsHostRedirect(requestHost(req));
  const absolute = (path: string) =>
    offHost ? `https://${CANONICAL_HOST}${path}` : path;

  if (req.path === "/") {
    const lang = preferredLanguage(req.headers["accept-language"]);
    res.vary("Accept-Language");
    res.redirect(302, absolute(`/${lang}/${query}`));
    return;
  }

  const canonical = canonicalPath(req.path);
  if (canonical) {
    res.redirect(301, absolute(`${canonical}${query}`));
    return;
  }

  if (offHost) {
    res.redirect(301, absolute(`${req.path}${query}`));
    return;
  }

  next();
}
