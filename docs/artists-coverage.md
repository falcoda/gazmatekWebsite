# Artists Content Coverage

Tracking document for `frontend/src/content/artists.ts`.

Updated: 2026-04-12

## Status legend

- **ready** — bio sourced and cleaned (FR + EN), profile usable for launch
- **needs-cleanup** — content exists but needs editorial work or EN translation
- **pages-blocked** — additional primary source exists only as `.pages` file (not yet extracted)

---

## Coverage table

| Artist             | Status        | FR short | FR full | EN short | EN full | Portrait | Source                      |
| ------------------ | ------------- | -------- | ------- | -------- | ------- | -------- | --------------------------- |
| CANTIK             | ready         | ✓        | ✓       | ✓        | ✓       | ✓        | Bio_artistes.pdf            |
| ALBIOVIX           | ready         | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| BIOMYSTIC          | needs-cleanup | ✓        | ✓       | ✓        | ✓       | ✓        | Bio_artistes.pdf            |
| BRIOUCH'K          | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| BUTTERNUT          | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| ECLEPTIX           | ready         | ✓        | ✓       | ✓        | ✓       | ✓        | Bio_artistes.pdf            |
| EKWAZZ             | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| L'ELECTROMANCIEN   | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| ETAT ZERO          | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| EX!L3              | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| FUZZEY             | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Fuzzey Bio + Link.pdf       |
| G-LITTLE           | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| KEMIKAL CROW       | pages-blocked | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf + .pages   |
| KROMOZOM           | needs-cleanup | —        | —       | —        | —       | —        | All links and contacts.docx |
| LEMMA              | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| MEVEN              | pages-blocked | —        | —       | —        | —       | —        | .pages only                 |
| MINOPOLSKA         | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| MOBYKICK           | ready         | ✓        | ✓       | ✓        | ✓       | ✓        | Bio_artistes.pdf            |
| MORACID            | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| NOCID              | ready         | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| N X                | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| OLIBRIUS           | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| RAIK               | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| R.K PROJECT        | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Biographie R.K Project.pdf  |
| SAME               | needs-cleanup | —        | —       | —        | —       | —        | SAME.pdf                    |
| SEKTER4            | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| SEVENUM SIX        | ready         | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| SHMYKBLICK         | ready         | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| SOUL3D             | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| STATERAK           | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |
| SUAREZ             | needs-cleanup | —        | —       | —        | —       | —        | Bio_artistes.pdf            |
| TEKIAPY & MOBITEKK | pages-blocked | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf + .pages   |
| TERAPEUTEK         | ready         | ✓        | ✓       | ✓        | ✓       | ✓        | Bio_artistes.pdf            |
| TOXYBLUE           | ready         | ✓        | ✓       | ✓        | ✓       | ✓        | Bio_artistes.pdf            |
| VIZITOR 23         | pages-blocked | —        | —       | —        | —       | —        | .pages only                 |
| ZETRO23            | needs-cleanup | ✓        | ✓       | ✓        | ✓       | —        | Bio_artistes.pdf            |

---

## Summary

| Status        | Count  |
| ------------- | ------ |
| ready         | 9      |
| needs-cleanup | 24     |
| pages-blocked | 5      |
| **Total**     | **38** |

---

## Naming normalization applied

| Old name (in asset folders) | Normalized name      |
| --------------------------- | -------------------- |
| `Biomistic`                 | `BIOMYSTIC`          |
| `RK - Projekt`              | `R.K PROJECT`        |
| `Shmyblyk`                  | `SHMYKBLICK`         |
| `Suarez Antonio`            | `SUAREZ`             |
| `kemical crow`              | `KEMIKAL CROW`       |
| `Tekiapy et Mobitekk`       | `TEKIAPY & MOBITEKK` |
| `Vizitor 23`                | `VIZITOR 23`         |

---

## Missing portraits (launch backlog)

Artists without a portrait image need a photo sourced from their asset folder under:
`old-website-assets/Assets Gazma Site/Artiste/Artiste/`

Priority: Albiovix, Ecleptix, Nocid, Shmykblick, Sevenum Six, Terapeutek (has portrait already).

---

## Pages-blocked backlog

These artists have primary source content locked in `.pages` files not yet extracted:

- `Kemikal Crow` — partial bio from PDF, more in `.pages`
- `Meven` — no extracted content, full bio in `.pages`
- `Tekiapy & Mobitekk` — partial bio available, more in `.pages`
- `Vizitor 23` — no extracted content, full bio in `.pages`

Resolution: open `.pages` files in Pages/LibreOffice and extract plain text into `artists.ts`.

---

## English gaps (launch critical)

The following artists have no EN bio yet and are prominent enough to warrant translation before launch:

- MINOPOLSKA — has FR content, EN pending
- MORACID — has FR content, EN pending
- SOUL3D — has FR content, EN pending
- STATERAK — has FR content, EN pending
- OLIBRIUS — has FR content, EN pending
