# Epic 3 - Pages artistes

## Objectif

Remplacer les donnees artistes actuelles, fragiles et partiellement cassees, par un catalogue propre, type, traduisible et base sur les vraies sources du vieux site.

## References obligatoires

- [asset-inventory-old-website.md](../asset-inventory-old-website.md)
- [content-audit-old-website.md](../content-audit-old-website.md)
- [old-site-walkthrough.md](../old-site-walkthrough.md)

References visuelles :

![Legacy artist grid](../video-reference/site-walkthrough/walk-09.jpg)

![Legacy artist detail](../video-reference/site-walkthrough/walk-13.jpg)

## Contenu a reprendre depuis l'ancien site

- Source principale bios :
  - `Bio_artistes.pdf`
- Sources enrichies :
  - `Fuzzey Bio + Link.pdf`
  - `Biographie R.K Project.pdf`
  - `SAME.pdf`
  - `All links and contacts.docx`
  - docs presentes dans les dossiers artistes
- Images :
  - dossiers sous `old-website-assets/Assets Gazma Site/Artiste/Artiste`

## Regles contenu

- `bio.short` = version courte editorialisee issue du texte source
- `bio.full` = version longue nettoyee du texte source
- `styles` = derives du texte source
- `links` = seulement si trouves dans les docs ou verifies ailleurs
- Si une info n'existe pas, ne pas la fabriquer

## Mapping contenu par zone

- Carte index artiste :
  - nom officiel normalise
  - 1 ligne style / tags issue du texte source
  - image portrait principale
- Intro de fiche :
  - 2 a 4 lignes max
  - extraite de la partie la plus claire de la bio source
- Bio complete :
  - version nettoyee et structuree du PDF ou DOC source
  - garder les infos de parcours, style, label, collaborations si elles sont documentees
- Liens :
  - utiliser seulement les plateformes explicitement donnees dans les docs
- Galerie :
  - alimentee uniquement par les images qui apportent quelque chose a la fiche

## Story 3.1 - Normaliser la collection artistes

**Priorite:** Critique

### Criteres d'acceptation

- [x] Creer `frontend/src/content/artists.ts`
- [x] Chaque artiste contient au minimum :
  - `id`
  - `slug`
  - `name`
  - `isResident`
  - `styles`
  - `images`
  - `links`
  - `bio.short`
  - `bio.full`
  - `seo`
- [x] Les textes visibles existent en FR et EN
- [x] Les images de prod sont dans `src/assets/img/artists`
- [x] Le texte mojibake ou approximatif disparait
- [x] Les profils incomplets sont flagges explicitement
- [x] La phase de preparation associe une source de texte a chaque profil
- [x] Chaque artiste a une note de provenance indiquant le document principal utilise

---

## Story 3.2 - Page index artistes

**Priorite:** Haute

### Criteres d'acceptation

- [x] `/artists` est entierement pilotee par la collection normalisee
- [x] La page garde une identite visuelle forte, orientee portrait, proche de l'energie legacy
- [x] Les cartes montrent :
  - image
  - nom
  - style
  - lien detail
- [x] Aucun import runtime ne pointe vers `old-website-assets`
- [x] La page fonctionne en FR et EN
- [x] La grille n'affiche pas de phrase descriptive si aucune bio courte fiable n'existe encore

---

## Story 3.3 - Bloc secondaire "plus d'artistes"

**Priorite:** Moyenne

### Criteres d'acceptation

- [x] La page peut contenir un bloc secondaire inspire du "Plus d'artistes" legacy
- [x] Ce bloc est alimente par la meme collection
- [x] Il peut prendre la forme :
  - d'un slider horizontal
  - d'une rangee featured
  - d'une grille secondaire
- [x] Il ne duplique pas strictement le rendu de la grille principale

---

## Story 3.4 - Template detail artiste

**Priorite:** Critique

### Criteres d'acceptation

- [x] `/artists/:slug` est route-driven et content-driven
- [x] La page detail supporte :
  - hero image
  - intro courte
  - bio complete
  - liens
  - galerie optionnelle
  - embed ou CTA d'ecoute optionnel
- [x] La galerie peut utiliser un slider leger
- [x] Un slug inconnu redirige vers une 404 ou un fallback propre
- [x] Le layout n'impose pas la meme densite d'assets pour tous
- [x] La fiche distingue clairement ce qui vient du texte source et ce qui est une reformulation editoriale courte

---

## Story 3.5 - Nettoyage editorial et traductions

**Priorite:** Haute

### Criteres d'acceptation

- [x] Les bios FR sont nettoyees depuis les PDFs sources
- [x] Les bios EN existent pour les artistes critiques au lancement
- [x] Les trous EN restants sont documentes
- [x] Les noms et slugs incoherents sont normalises, notamment :
  - `RK - Projekt` / `R.K Project`
  - `Biomistic` / `Biomystic`
  - `Shmyblyk` / `Shmykblick`
  - `Suarez Antonio` / `Suarez`
- [x] Si une bio detaillee n'existe pas dans l'ancien site, elle n'est pas fabriquee artificiellement
- [x] Les lignes de style et descriptions courtes restent coherentes entre index, detail et SEO

---

## Story 3.6 - Suivi de couverture contenu

**Priorite:** Moyenne

### Criteres d'acceptation

- [x] La liste de lancement distingue :
  - pret
  - a nettoyer
  - bloque par `.pages`
- [x] Ce statut est documente dans `docs`

---

## Definition of done

La section artistes est suffisamment propre pour servir de source de verite, sans placeholder, sans textes casses et sans logique speciale dispersee dans les composants.
