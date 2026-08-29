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

/**
 * Splits file content into one block per entry, each running from its own
 * `slug:` declaration up to the start of the next one.
 *
 * Scanning a fixed-size window instead lets a lazy `[\s\S]*?` run past the
 * end of the current entry: if a field does not match inside its own block
 * the regex silently continues into the following entry and returns *its*
 * values. That is how several artists ended up publishing another artist's
 * name and description in their OG tags. Bounding each block makes that
 * class of bug impossible rather than unlikely.
 */
function blocksBySlug(content: string): { slug: string; block: string }[] {
  const slugPattern = /slug:\s*"([^"]+)"/g;
  const found: { slug: string; index: number }[] = [];
  let m: RegExpExecArray | null;

  while ((m = slugPattern.exec(content)) !== null) {
    found.push({ slug: m[1], index: m.index });
  }

  return found.map(({ slug, index }, i) => ({
    slug,
    block: content.slice(index, found[i + 1]?.index ?? content.length),
  }));
}

// ---------------------------------------------------------------------------
// Artists
// ---------------------------------------------------------------------------

function parseArtists(content: string): OgEntry[] {
  const importMap = buildImportMap(content);
  const artists: OgEntry[] = [];
  const unparsed: string[] = [];

  for (const { slug, block } of blocksBySlug(content)) {
    // seo: { title: { fr: "...", en: "..." }, description: { fr: "...", en: "..." } }
    // Prettier keeps the title inline when it is short but wraps it across
    // lines once it grows, which adds a trailing comma after the `en` value —
    // hence the optional comma before the closing brace.
    const seoPattern =
      /seo:\s*\{[\s\S]*?title:\s*\{\s*fr:\s*"([^"]*)",\s*en:\s*"([^"]*)",?\s*\}[\s\S]*?description:\s*\{[\s\S]*?fr:\s*"([^"]*)",[\s\S]*?en:\s*"([^"]*)"/;
    const seoMatch = seoPattern.exec(block);

    if (!seoMatch) {
      unparsed.push(slug);
      continue;
    }

    // images: { portrait: someVarName }
    let imageKey: string | null = null;
    const portraitVarMatch = /images:\s*\{[\s\S]*?portrait:\s*(\w+)/.exec(block);

    if (portraitVarMatch) {
      imageKey = importMap.get(portraitVarMatch[1]) ?? null;
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

  if (unparsed.length > 0) {
    throw new Error(
      `Could not parse seo block for ${unparsed.length} artist(s): ${unparsed.join(", ")}. ` +
        `Fix the parser or the entry — skipping them silently would publish missing or wrong OG metadata.`
    );
  }

  return artists;
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

function parseEvents(content: string): OgEntry[] {
  const events: OgEntry[] = [];
  const unparsed: string[] = [];

  for (const { slug, block } of blocksBySlug(content)) {
    // seo: createEventSeo("titleFr", "titleEn", "descFr", "descEn")
    const seoPattern =
      /seo:\s*createEventSeo\(\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"/;
    const seoMatch = seoPattern.exec(block);

    if (!seoMatch) {
      unparsed.push(slug);
      continue;
    }

    // poster: createEventMedia("events-relative-path/poster.ext", ...)
    // The path in createEventMedia is relative inside assets/img/events/
    const posterPattern = /poster:\s*createEventMedia\(\s*"([^"]+)"/;
    const posterMatch = posterPattern.exec(block);
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

  if (unparsed.length > 0) {
    throw new Error(
      `Could not parse seo block for ${unparsed.length} event(s): ${unparsed.join(", ")}. ` +
        `Fix the parser or the entry — skipping them silently would publish missing or wrong OG metadata.`
    );
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

// An artist's OG title must name that artist. This is the symptom that a
// parser bug leaked another entry's fields into this one — previously
// /electromancien and /tekiapy-mobitekk shipped a different artist's name and
// bio to every social crawler. Warn rather than throw: a deliberately
// reworded title is legitimate, a borrowed one never is.
const namesBySlug = new Map(
  blocksBySlug(artistsContent).map(({ slug, block }) => [
    slug,
    /name:\s*"([^"]*)"/.exec(block)?.[1],
  ])
);
const borrowedName = artists.filter((a) => {
  const name = namesBySlug.get(a.slug);

  return name ? !a.titleFr.startsWith(name) : false;
});
if (borrowedName.length > 0) {
  console.warn(
    `  ⚠ ${borrowedName.length} artist(s) whose OG title does not start with their own name — check for cross-entry leakage: ${borrowedName.map((a) => `${a.slug} → "${a.titleFr}"`).join(", ")}`
  );
}
