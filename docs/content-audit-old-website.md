# Old website content audit

## Summary

This audit is the working source of truth for rebuilding Gazmatek on top of the shared template.

Before choosing any visual or media file, use:

- [asset-inventory-old-website.md](./asset-inventory-old-website.md)

The old asset dump contains enough real material to build a strong first version of the site:

- official logo files
- opening/timeline media
- artist photos
- one master artist bio PDF
- two collective manifesto PDFs
- event archive folders with large media coverage
- equipment photos
- typography files used for the old visual identity

The main content risk is not lack of material. It is normalization, naming cleanup, and bilingual completion.

## Main source folders

- `old-website-assets/Assets Gazma Site/Logo`
- `old-website-assets/Assets Gazma Site/Videos`
- `old-website-assets/Assets Gazma Site/Texte presentation`
- `old-website-assets/Assets Gazma Site/Textes des artistes`
- `old-website-assets/Assets Gazma Site/Artiste/Artiste`
- `old-website-assets/Assets Gazma Site/Archives/Archives`
- `old-website-assets/Assets Gazma Site/Equipe/Equipe`
- `old-website-assets/Assets Gazma Site/photos_materiel`
- `old-website-assets/Assets Gazma Site/Typo`

## Reliable extracted documents

### Videos and motion references

Video review and extracted key frames are documented here:

- [asset-inventory-old-website.md](./asset-inventory-old-website.md)
- [video-reference-old-site.md](./video-reference-old-site.md)
- [old-site-walkthrough.md](./old-site-walkthrough.md)

The two useful motion assets are:

- `ouverture site.mov` for logo reveal / intro motion
- `ligne_du_temps.mov` for vertical particle/timeline atmosphere

The actual old-site navigation reference is:

- `gazma site.mp4`

This is the best source for page structure, hierarchy, and section ordering.

### Collective manifesto

Two PDF variants were extracted successfully:

- `Texte version Anna 5_12.pdf`
- `texte version thomas .pdf`

They say roughly the same thing and should be merged into one cleaned editorial source for:

- About page
- Home intro
- brand positioning
- services framing

Core points confirmed by source:

- Gazmatek is run by a 3-person operational core
- the structure is self-managed
- artists are not expected to carry organization work
- money is reinvested into sound, production, and events
- the collective stays open to emerging artists, with a Belgian focus

### Artists

Strongest source:

- `Textes des artistes/Bio_artistes.pdf`

Extra dedicated documents extracted:

- `Fuzzey Bio + Link.pdf`
- `Biographie R.K Project.pdf`
- `SAME.pdf`
- `All links and contacts.docx` for Kromozom

This is enough to build a first normalized artist collection, but not every artist has equally strong coverage.

### Team

Usable visual/team source:

- `Equipe/Equipe`

Visible member/collaborator assets include:

- Alex directeur technique
- Abyssal production
- Flavier Derville
- LSB Visual
- Aeriv

### Events

Archive source:

- `Archives/Archives`

Categories present:

- `legales`
- `illegales`

Archive density is high enough to build a serious event archive. The UI should not expose raw folder names directly.

### Equipment and services

Usable equipment image set:

- `EAW KF750`
- `MONTARBO B115`
- `MTH54 V1`
- `NEXO ALPHA _ B1-15`
- `NuQ122-AN`
- `PLM20 000Q`
- `Turbosound TPX122M`
- and related images

Current app copy already contains a broader service list in `frontend/src/i18n/translations/fr.json`.

### Typography

There is a dedicated typography source folder:

- `Typo/Typo`

Visible legacy font assets include:

- `ABITE.ttf`
- `Bang 4 Ya Buck.ttf`
- `DAMAGEPLAN PERSONAL USE.ttf`

What the old site confirms visually:

- distressed condensed display headings
- aggressive uppercase treatment for titles
- much simpler body text underneath

Rebuild implication:

- typography must be treated as part of the visual system, not as a late polish item
- heading font and body font should be separated explicitly in the new design system
- we should verify licensing before shipping any legacy font file in production

## Known gaps

Some artist and presentation docs exist only as `.pages` files and were not extracted into text in this pass:

- Kemical Crow
- Meven
- Tekiapy et Mobitekk
- Terapeutek
- Toxyblue
- Vizitor 23
- one extra presentation draft

These are not blockers for architecture. They are editorial backlog items.

## Naming issues to clean up

The old content has inconsistent naming that must be normalized in data:

- `Biomistic` / `Biomystic`
- `RK - Projekt` / `R.K Project`
- `Shmyblyk` / `Shmykblick`
- `Suarez Antonio` / `Suarez`
- `NX` / `N X`
- several accented or mojibake folder names

## Current app issues found during audit

Current `frontend/src/pages/Artistes/artists.ts` and `frontend/src/pages/Events/events.ts` are not a safe source of truth:

- lots of mojibake text
- inconsistent naming
- placeholder galleries and posters
- partially synthetic event descriptions

These files should be replaced by normalized `src/content/*` data.

## Recommended content structure

Use this split:

- `src/i18n/translations/*.json`
  - nav
  - buttons
  - labels
  - validation copy
  - generic SEO defaults
- `src/content/*`
  - long-form editorial copy
  - artists
  - events
  - equipment
  - team

Recommended localized field shape:

```ts
type LocalizedText = {
  fr: string;
  en: string;
};
```

## Launch priorities

1. Normalize content model and routes
2. Replace current artist and event data
3. Build home, about, artists, events, services, contact
4. Translate launch-critical long-form content to English
5. Close `.pages`-only gaps in a second pass
