# Epic 4 - Pages evenements

## Objectif

Construire un systeme d'evenements et d'archives maintenable a partir des dossiers legacy, au lieu d'un melange de placeholders et de contenu brut.

## References obligatoires

- [asset-inventory-old-website.md](../asset-inventory-old-website.md)
- [content-audit-old-website.md](../content-audit-old-website.md)
- [old-site-walkthrough.md](../old-site-walkthrough.md)
- [video-reference-old-site.md](../video-reference-old-site.md)

Reference visuelle :

![Legacy archives timeline](../video-reference/site-walkthrough/walk-16.jpg)

## Contenu a reprendre depuis l'ancien site

- Noms, dates et matiere visuelle :
  - dossiers `Archives/Archives`
  - visuels `Visuels Soirees`
- Structure archives :
  - timeline verticale visible dans `gazma site.mp4`
- Logique event-first :
  - homepage legacy

## Regles contenu

- Un evenement doit etre base sur un dossier, un flyer, une date ou une preuve reelle
- Si une description detaillee n'existe pas, utiliser une version courte et factuelle
- Ne pas inventer de storytelling riche pour des archives pauvres

## Mapping contenu par zone

- Carte event :
  - titre propre
  - date normalisee
  - lieu / ville si connus
  - lineup court si visible sur le flyer ou dans le dossier
- Hero detail :
  - poster principal ou visuel le plus fort
  - bloc infos derive des vraies donnees archivees
- Description detail :
  - reprendre d'abord le texte des flyers, captions ou docs event si disponibles
  - sinon utiliser un resume editorial tres court base sur les faits
- Archive timeline :
  - chaque item doit rester lisible meme avec peu de contenu
  - ne pas exiger artificiellement un long texte pour chaque entree

## Decision de base

La distinction legacy `legales / illegales` peut rester comme metadata interne, mais ne doit pas forcement structurer l'IA publique.

## Story 4.1 - Normaliser la collection evenements

**Priorite:** Critique

### Criteres d'acceptation

- [x] Creer `frontend/src/content/events.ts`
- [x] Chaque evenement supporte au minimum :
  - `id`
  - `slug`
  - `status`
  - `date`
  - `venue`
  - `city`
  - `country`
  - `poster`
  - `gallery`
  - `lineup`
  - `description`
  - `seo`
  - metadata optionnelles comme `archiveCategory`
- [x] Les posters et galeries retenus sont copies dans `src/assets/img/events`
- [x] Les noms de dossiers sont convertis en titres lisibles
- [x] Les dates sont normalisees
- [x] Les descriptions placeholder disparaissent
- [x] Chaque champ textuel critique est rattache a une source legacy identifiable
- [x] La collection distingue les events riches editorialement des events documentes seulement par une date / un flyer

---

## Story 4.2 - Hub evenements

**Priorite:** Haute

### Criteres d'acceptation

- [x] `/events` sert de page hub
- [x] Elle met en avant :
  - le parcours evenements a venir
  - le parcours archives
- [x] Le wording est localise
- [x] Les visuels viennent des vraies archives / flyers

---

## Story 4.3 - Page evenements a venir

**Priorite:** Haute

### Criteres d'acceptation

- [x] `/events/upcoming` liste uniquement les evenements a venir
- [x] Si aucun evenement a venir n'existe, la page propose un fallback vers les archives
- [x] Les cartes montrent :
  - poster
  - date
  - lieu
  - ville
  - lineup court
  - CTA billeterie si dispo
- [x] Si un lineup complet n'est pas documente, la carte reste concise au lieu de supposer des noms

---

## Story 4.4 - Page archives

**Priorite:** Critique

### Criteres d'acceptation

- [x] `/events/archive` est alimentee par les donnees normalisees
- [x] Les archives peuvent etre groupees par annee
- [x] Les evenements ne sont pas affiches tels quels depuis les noms de dossiers
- [x] Le motif de timeline verticale legacy peut etre repris
- [x] Si cette timeline est reprise :
  - elle est reconstruite en frontend
  - pas de video lourde
  - alternance gauche / droite possible autour de la ligne centrale
- [x] Le rendu final fait archive curatee, pas dump de fichiers
- [x] Chaque entree archive choisit un niveau de texte adapte a la richesse du dossier source

---

## Story 4.5 - Detail evenement

**Priorite:** Haute

### Criteres d'acceptation

- [x] `/events/:slug` gere aussi bien upcoming que past
- [x] La page detail supporte :
  - hero poster
  - date et lieu
  - lineup
  - description riche
  - CTA ticket si disponible
  - galerie si evenement passe
- [x] Les galeries lourdes restent performantes
- [x] La description longue n'est exigee que pour les events qui ont vraiment de la matiere legacy

---

## Story 4.6 - Nettoyage editorial evenements

**Priorite:** Moyenne

### Criteres d'acceptation

- [x] Les events critiques ont un nom propre et une description propre
- [x] Les dates sont stockees en ISO et rendues de maniere localisee
- [x] Les noms ambigus comme `SP23`, `HERETIK`, `Synapse` sont clarifies
- [x] Les descriptions anglaises existent pour les evenements critiques
- [x] Les descriptions restent sobres quand l'ancien site ne donnait qu'un nom ou un visuel

---

## Definition of done

Les evenements deviennent une vraie collection maintenable, compatible avec une home event-first, une archive propre et des pages details solides.
