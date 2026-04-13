# Old website asset inventory

## Purpose

This document is the canonical inventory of the legacy Gazmatek assets extracted under `old-website-assets/Assets Gazma Site`.

Use this inventory before:

- choosing hero media
- selecting logos
- building artist cards
- building event archives
- wiring services/equipment content
- selecting legacy fonts

Do not select assets directly from the raw folder tree without checking this document first.

When implementing in the frontend:

- put production-ready SVG assets in `frontend/src/assets/svg`
- put production-ready raster assets in `frontend/src/assets/img`
- put approved fonts in `frontend/src/assets/fonts`
- do not import runtime assets directly from `old-website-assets`

## Global snapshot

Root path:

- `old-website-assets/Assets Gazma Site`

Top-level folders:

- `Archives`
- `Artiste`
- `Equipe`
- `Images_Illustration`
- `Logo`
- `photos_materiel`
- `Texte présentation`
- `Textes des artistes`
- `Typo`
- `Vidéos`
- `Visuels Soirées`
- `gazma site.mp4`

Global file count by extension:

- `.jpg`: 1478
- `.jpeg`: 180
- `.png`: 82
- `.mov`: 27
- `.mp4`: 22
- `.pages`: 9
- `.pdf`: 9
- `.ttf`: 6
- `.txt`: 5
- `.gif`: 2
- `.svg`: 2
- `.docx`: 1

Noise to ignore in app code:

- `__MACOSX`
- `.DS_Store`
- files prefixed with `._`
- mojibake folder names that must be normalized before use

## Inventory by category

### 1. Branding and logo

Path:

- `old-website-assets/Assets Gazma Site/Logo/Logo`

Files available:

- `Logo+Typo Gazmatek vectorisé.svg`
- `Logo+Typo Gazmatek vectorisé.png`
- `Logo+Typo.png`
- `Logo sans fond noir.png`
- `Logo sans fond blanc.png`
- `Logo gras.png`
- `Design sans titre (2).png`
- several social/profile style images

Recommended use:

- primary brand source: `Logo+Typo Gazmatek vectorisé.svg`
- fallback brand image: `Logo sans fond noir.png` or `Logo sans fond blanc.png`
- avoid using social/profile images as primary logo assets

Status:

- enough for production branding
- naming cleanup recommended

### 2. Site walkthrough and motion references

Paths:

- `old-website-assets/Assets Gazma Site/gazma site.mp4`
- `old-website-assets/Assets Gazma Site/Vidéos/Vide╠üos/ouverture site.mov`
- `old-website-assets/Assets Gazma Site/Vidéos/Vide╠üos/ligne_du_temps.mov`
- `old-website-assets/Assets Gazma Site/Vidéos/Vide╠üos/4K-UHD-Twirl-Flare-Line-Particle-Animation-Intro-Screen.gif`

Recommended use:

- `gazma site.mp4`: page structure and IA reference
- `ouverture site.mov`: hero/logo motion inspiration
- `ligne_du_temps.mov`: about/timeline motion inspiration
- particle GIF: optional decorative motion only

Reference docs:

- [old-site-walkthrough.md](./old-site-walkthrough.md)
- [video-reference-old-site.md](./video-reference-old-site.md)

### 3. Artist assets

Path:

- `old-website-assets/Assets Gazma Site/Artiste/Artiste`

Artist folders currently present:

- `Albiovix`
- `Biomistic`
- `Briouch'k`
- `butternut`
- `Cantik`
- `Ecleptix`
- `Ekwazz`
- `Electromancien`
- `Etazero`
- `Ex!l3`
- `Fuzzey`
- `Ganjaflexx`
- `Geotik`
- `G-little`
- `kemical crow`
- `Kromozom`
- `Lemma`
- `Meven`
- `Minopolska`
- `Mobykick`
- `Moracid`
- `Nocid`
- `NX`
- `Olibrius`
- `Raik`
- `RK - Projekt`
- `Same`
- `Sekter4`
- `Sevenum SIx`
- `Shmyblyk`
- `Soul3d`
- `Staterak`
- `Suarez Antonio`
- `Tekiapy et Mobitekk`
- `Terapeutek`
- `Toxyblue`
- `Vizitor 23`
- `Zetro23`

What these folders contain:

- portraits
- performance shots
- sometimes PDFs / DOCX / PAGES docs
- sometimes video clips

Recommended use:

- source artist card and detail imagery from here
- normalize artist naming before importing anything into app data
- treat text docs in these folders as content sources, not just assets

Status:

- enough visual coverage for a strong artists section
- inconsistent naming and doc formats require normalization

### 4. Team assets

Path:

- `old-website-assets/Assets Gazma Site/Equipe/Equipe`

Detected items:

- `AERIV/`
- `Abyssal_production_vidéaste.jpg`
- `Alex_directeur_technique.jpg`
- `Flavier_derville_vidéaste.jpg`
- `logo quedal photo.png`
- `lsb_visual_vidéaste.JPG`
- `Ni_plus_ni_moins.jpg`

Recommended use:

- source team grid portraits and collaborator visuals from here
- combine with structured roles from the old walkthrough

Status:

- enough for a first `/about` team section

### 5. Event archive assets

Path:

- `old-website-assets/Assets Gazma Site/Archives/Archives`

Categories:

- `Légales`
- `Illégales`

Current folder count:

- legal archive media files: 686
- illegal archive media files: 24

Detected legal archive event folders:

- `2018_14_7soirée barlok 2018`
- `2019_2_3 gazmatek party 2`
- `2019_29_6 Gazmatek party 3`
- `2022_17_12 manifestive lille`
- `2022_18_11 Tekwarz 2`
- `2023_2_12 Gazmatek live act party`
- `2023_23_09 Gazmatek party`
- `2023_25_03 Tekno ravolution`
- `2023_27_06 nocturne ULB`
- `2023_29_9 Synapse`
- `2023_30_6 tekwarz4`
- `2023_31_10 halloween party`
- `2023_9_12 Vyniles_Rules`
- `2024_13_07 SP23`
- `2024_17_02 PLANET PARK PARTY`
- `2024_20_01 BUDA`
- `2024_23_03 SMURF PARTY`
- `2024_24_02 INTO THE RAVE`
- `2024_29_03 SYNAPSE SONORISED BY`
- `2024_9_03 ESCAPE INVITE GAZMATEK`
- `HERETIK`

Detected illegal archive event folders:

- `2021_1novembre_gazmatek party 5years`

Recommended use:

- use as the source for archive galleries and event posters
- normalize dates, titles, and slugs in `src/content/events.ts`
- keep `legales/illegales` as optional metadata, not mandatory public IA

Status:

- strong archive coverage
- requires naming cleanup and curation

### 6. Event flyers and promo visuals

Path:

- `old-website-assets/Assets Gazma Site/Visuels Soirées/Visuels Soire╠ües`

Examples:

- `BANN FACEBOOK.png`
- `BANN FB.png`
- `BANNIERE - Gazmatek x Falcohm Halloween Bday.png`
- `Gazma Facebook cover.png`
- `BUDA TEMPLE.png`
- multiple event promo images

Recommended use:

- source hero/event poster alternatives from here
- compare with archive folders before selecting a final poster

Status:

- useful support set for events and social visuals

### 7. Illustration and atmosphere images

Path:

- `old-website-assets/Assets Gazma Site/Images_Illustration/Images_Illustration`

Detected files:

- `2023-06-27 23.54.17.jpg`
- `327350189_1357939264979920_1059703362996643246_n.jpg`
- `BV1A0369-Avec accentuation-Bruit_edited.jpg`
- `IMG_20240228_042252-55_edited.jpg`

Recommended use:

- atmosphere imagery for hero, section backgrounds, or content breaks

Status:

- small but useful mood library

### 8. Equipment photos

Path:

- `old-website-assets/Assets Gazma Site/photos_materiel/photos_materiel`

Detected files:

- `C21 .jpg`
- `C21--ConvertImage-2.jpg`
- `C21--ConvertImage.jpg`
- `EAW KF750.jpg`
- `MONTARBO B115.jpg`
- `MTH54 V1.jpg`
- `NEXO ALPHA _ B1-15 .jpg`
- `NuQ122-AN face.jpg`
- `NuQ122-AN.jpg`
- `PLM20 000Q.jpg`
- `Turbosound TPX122M.jpg`

Recommended use:

- core source for services/equipment catalog
- normalize names to product IDs before use in app content

Status:

- enough for a first service catalog page

### 9. Collective text sources

Path:

- `old-website-assets/Assets Gazma Site/Texte présentation/Texte pre╠üsentation`

Detected useful files:

- `Texte version Anna 5_12.pdf`
- `texte version thomas .pdf`
- `version 5_12.pages`

Recommended use:

- primary source for home intro, about page, brand positioning, services framing

Status:

- strong source
- one `.pages` version remains extra reference only

### 10. Artist text sources

Paths:

- `old-website-assets/Assets Gazma Site/Textes des artistes/Textes des artistes/Bio_artistes.pdf`
- artist subfolders under `Artiste/Artiste`

Detected dedicated docs:

- `Fuzzey Bio + Link.pdf`
- `Biographie R.K Project.pdf`
- `SAME.pdf`
- `All links and contacts.docx`
- several `.pages` presentation files

Recommended use:

- primary source for normalized artist bios
- use dedicated docs to enrich selected artist profiles

Status:

- enough for launch data model
- some profiles still require manual completion from `.pages`

### 11. Typography assets

Path:

- `old-website-assets/Assets Gazma Site/Typo/Typo`

Detected font files:

- `Bang 4 Ya Buck.ttf`
- `ABITE.ttf`
- `DAMAGEPLAN PERSONAL USE.ttf`

Supporting files:

- `READ ME.txt`
- `Terms of Use End User Lisence Agreement.txt`
- preview images

Recommended use:

- reference the legacy heading style from here
- verify license before bundling any font into production
- separate display font use from body text use

Status:

- enough to define heading direction
- production use blocked until license validation

## Production-ready priorities

### Safe to use early

- vector logo
- event walkthrough screenshots
- artist portraits
- event archive media
- equipment photos
- manifesto PDFs
- `Bio_artistes.pdf`

### Use with cleanup first

- event folder names
- inconsistent artist folder names
- social/profile style logo variants
- files with broken accents in names

### Do not ship blindly

- `.DS_Store`
- `__MACOSX`
- fonts without license validation
- random social/avatar images as main branding

## Mandatory usage rule

When working on the rebuild:

1. start from this inventory
2. then confirm the exact path in the raw asset folder
3. then normalize naming and copy the selected asset into:
   - `frontend/src/assets/svg`
   - `frontend/src/assets/img`
   - `frontend/src/assets/fonts`
4. document any missing or ambiguous asset back in `docs/`
