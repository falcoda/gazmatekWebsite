/**
 * generate-sitemap.mjs
 * Builds public/sitemap.xml from the routing config and content files:
 *   - static pages from src/config/pages.ts (dynamic ":param" routes skipped)
 *   - artist detail pages from src/content/artists.ts
 *   - event detail pages from src/content/events.ts
 *
 * Every path is emitted once per language (/fr, /en) with hreflang
 * alternates. Runs automatically as part of `npm run build`.
 *
 * Run manually: npm run generate-sitemap   (from frontend/)
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(scriptDir, "../src");

const SITE_URL = "https://gazmatek.com";
const LANGUAGES = ["fr", "en"];
const X_DEFAULT_LANGUAGE = "fr";

// ---------------------------------------------------------------------------
// Content extraction
// ---------------------------------------------------------------------------

/**
 * Extracts static page paths from the PAGES object in config/pages.ts.
 * Dynamic routes (containing ":param") are excluded — their concrete URLs
 * come from the content files instead.
 */
function extractStaticPaths(pagesContent) {
  const paths = [];
  const pattern = /^\s*\w+:\s*"(\/[^"]*)"/gm;
  let match;

  while ((match = pattern.exec(pagesContent)) !== null) {
    if (!match[1].includes(":")) {
      paths.push(match[1]);
    }
  }

  return paths;
}

/**
 * Extracts entry slugs from a content file. A slug is only kept when the
 * text between it and the next slug contains `entryMarker`, which filters
 * out incidental "slug" occurrences that are not top-level entries
 * (same heuristic as backend/scripts/generate-og-data.ts).
 */
function extractSlugs(content, entryMarker) {
  const slugs = [];
  const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];

  matches.forEach((match, index) => {
    const windowEnd =
      index + 1 < matches.length ? matches[index + 1].index : content.length;
    const window = content.slice(match.index, windowEnd);

    if (window.includes(entryMarker) && !slugs.includes(match[1])) {
      slugs.push(match[1]);
    }
  });

  return slugs;
}

// ---------------------------------------------------------------------------
// XML rendering
// ---------------------------------------------------------------------------

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function localizedUrl(language, path) {
  const suffix = path === "/" ? `/${language}/` : `/${language}${path}`;
  return escapeXml(`${SITE_URL}${suffix}`);
}

/** Renders one <url> entry per language for a given page path. */
function renderUrlEntries(path) {
  const alternates = [
    ...LANGUAGES.map(
      (language) =>
        `    <xhtml:link rel="alternate" hreflang="${language}" href="${localizedUrl(language, path)}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(X_DEFAULT_LANGUAGE, path)}"/>`,
  ].join("\n");

  return LANGUAGES.map(
    (language) =>
      `  <url>\n    <loc>${localizedUrl(language, path)}</loc>\n${alternates}\n  </url>`,
  ).join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const pagesContent = readFileSync(resolve(srcDir, "config/pages.ts"), "utf-8");
const artistsContent = readFileSync(
  resolve(srcDir, "content/artists.ts"),
  "utf-8",
);
const eventsContent = readFileSync(
  resolve(srcDir, "content/events.ts"),
  "utf-8",
);

const staticPaths = extractStaticPaths(pagesContent);
const artistSlugs = extractSlugs(artistsContent, "seo:");
const eventSlugs = extractSlugs(eventsContent, "createEventSeo(");

const paths = [
  ...staticPaths,
  ...artistSlugs.map((slug) => `/artists/${slug}`),
  ...eventSlugs.map((slug) => `/events/${slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.map(renderUrlEntries).join("\n")}
</urlset>
`;

writeFileSync(resolve(scriptDir, "../public/sitemap.xml"), xml);

console.log(
  `✓ sitemap.xml: ${staticPaths.length} static pages, ${artistSlugs.length} artists, ${eventSlugs.length} events → ${paths.length * LANGUAGES.length} URLs`,
);
