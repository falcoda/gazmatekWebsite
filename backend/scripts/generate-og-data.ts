/**
 * generate-og-data.ts
 * Extracts OG metadata (slug, title, description, image key) from the
 * frontend TypeScript content files and writes backend/src/og-data.json.
 *
 * Run: npm run generate-og   (from backend/)
 *
 * Re-run after adding/modifying artists or events.
 */

import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const frontendSrc = resolve(__dirname, "../../frontend/src");

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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Builds a map of { importedVarName → Vite manifest key } from the import
 * statements at the top of a TypeScript file.
 *
 * Example:
 *   import albiovixPhoto from "@/assets/img/artists/albiovix.jpg";
 *   → { albiovixPhoto: "src/assets/img/artists/albiovix.jpg" }
 *
 * @/ is the Vite alias for src/, so we replace it accordingly.
 */
function buildImportMap(content: string): Map<string, string> {
  const map = new Map<string, string>();
  const importPattern = /^import\s+(\w+)\s+from\s+"(@\/[^"]+)"/gm;
  let m: RegExpExecArray | null;

  while ((m = importPattern.exec(content)) !== null) {
    const varName = m[1];
    const path = m[2].replace("@/", "src/");
    map.set(varName, path);
  }

  return map;
}

// ---------------------------------------------------------------------------
// Artists
// ---------------------------------------------------------------------------

function parseArtists(content: string): OgEntry[] {
  const importMap = buildImportMap(content);
  const artists: OgEntry[] = [];
  const slugPattern = /slug:\s*"([^"]+)"/g;
  let slugMatch: RegExpExecArray | null;

  while ((slugMatch = slugPattern.exec(content)) !== null) {
    const slug = slugMatch[1];
    const window = content.slice(slugMatch.index, slugMatch.index + 6000);

    // seo: { title: { fr: "...", en: "..." }, description: { fr: "...", en: "..." } }
    const seoPattern =
      /seo:\s*\{[\s\S]*?title:\s*\{\s*fr:\s*"([^"]*)",\s*en:\s*"([^"]*)"\s*\}[\s\S]*?description:\s*\{[\s\S]*?fr:\s*"([^"]*)",[\s\S]*?en:\s*"([^"]*)"/;
    const seoMatch = seoPattern.exec(window);

    if (!seoMatch) continue;

    // images: { portrait: someVarName } — search only within the first 500
    // chars after the slug (stays inside the current artist's block)
    let imageKey: string | null = null;
    const nearWindow = window.slice(0, 500);
    const imagesStart = nearWindow.indexOf("images:");

    if (imagesStart !== -1) {
      const imagesSection = window.slice(imagesStart, imagesStart + 300);
      const portraitVarMatch = /portrait:\s*(\w+)/.exec(imagesSection);

      if (portraitVarMatch) {
        const varName = portraitVarMatch[1];
        imageKey = importMap.get(varName) ?? null;
      }
    }

    artists.push({
      slug,
      titleFr: seoMatch[1],
      titleEn: seoMatch[2],
      descFr: seoMatch[3],
      descEn: seoMatch[4],
      imageKey,
    });
  }

  return artists;
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

function parseEvents(content: string): OgEntry[] {
  const events: OgEntry[] = [];
  const slugPattern = /slug:\s*"([^"]+)"/g;
  let slugMatch: RegExpExecArray | null;

  while ((slugMatch = slugPattern.exec(content)) !== null) {
    const slug = slugMatch[1];
    const window = content.slice(slugMatch.index, slugMatch.index + 8000);

    // seo: createEventSeo("titleFr", "titleEn", "descFr", "descEn")
    const seoPattern =
      /seo:\s*createEventSeo\(\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"/;
    const seoMatch = seoPattern.exec(window);

    if (!seoMatch) continue;

    // poster: createEventMedia("events-relative-path/poster.ext", ...)
    // The path in createEventMedia is relative inside assets/img/events/
    const posterPattern = /poster:\s*createEventMedia\(\s*"([^"]+)"/;
    const posterMatch = posterPattern.exec(window);
    const imageKey = posterMatch
      ? `src/assets/img/events/${posterMatch[1]}`
      : null;

    events.push({
      slug,
      titleFr: seoMatch[1],
      titleEn: seoMatch[2],
      descFr: seoMatch[3],
      descEn: seoMatch[4],
      imageKey,
    });
  }

  return events;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const artistsContent = readFileSync(
  resolve(frontendSrc, "content/artists.ts"),
  "utf-8"
);
const eventsContent = readFileSync(
  resolve(frontendSrc, "content/events.ts"),
  "utf-8"
);

const artists = parseArtists(artistsContent);
const events = parseEvents(eventsContent);

const outDir = resolve(__dirname, "../src");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  resolve(outDir, "og-data.json"),
  JSON.stringify({ artists, events }, null, 2)
);

console.log(`✓ og-data.json: ${artists.length} artists, ${events.length} events`);

// Sanity check
const noImage = artists.filter((a) => !a.imageKey);
if (noImage.length > 0) {
  console.log(`  ℹ ${noImage.length} artists without portrait (will use default image): ${noImage.map((a) => a.slug).join(", ")}`);
}
