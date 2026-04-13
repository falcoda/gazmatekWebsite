# Epic 0 - Fondations template, contenu et i18n

## Objectif

Poser une base propre pour reconstruire Gazmatek sur le template existant, sans repartir de zero. Tout ce qui suit doit permettre un dev rapide, data-driven, bilingue FR/EN et sans ambiguite sur les assets.

## References obligatoires

- [asset-inventory-old-website.md](../asset-inventory-old-website.md)
- [content-audit-old-website.md](../content-audit-old-website.md)
- [old-site-walkthrough.md](../old-site-walkthrough.md)
- [video-reference-old-site.md](../video-reference-old-site.md)
- [design-system-foundations.md](../design-system-foundations.md)

## Decisions de base

- Conserver le stack du template : React, Vite, TypeScript, SCSS, React Router, i18next, GSAP, `covaltech-react-ui`.
- Conserver le routing localise dans l'URL : `/:lang/*`.
- Conserver les labels UI dans `frontend/src/i18n/translations/*.json`.
- Mettre le contenu editorial et les collections dans `frontend/src/content/*`.
- Utiliser des slugs stables et independants de la langue.
- Ne jamais consommer `old-website-assets` directement au runtime.

## Story 0.1 - Adopter le shell du template

**Priorite:** Critique

### Criteres d'acceptation

- [ ] Le shell du template est conserve : `App.tsx`, `Navbar`, `Footer`, `LanguageSwitcher`, `SeoHead`
- [ ] `I18N_ROUTING` reste actif
- [ ] La base des routes est `/:lang/*`
- [ ] La navigation est pilotee par des donnees et des traductions, pas par des labels hardcodes dans les composants
- [ ] Le shell est pret a accueillir plusieurs pages sans duplication structurelle

---

## Story 0.2 - Definir le modele de contenu

**Priorite:** Critique

### Criteres d'acceptation

- [ ] Ajouter `frontend/src/content/types.ts`
- [ ] Definir au minimum :
  ```ts
  type LocalizedText = {
    fr: string;
    en: string;
  };
  ```
- [ ] Creer les modules de contenu :
  - `frontend/src/content/site.ts`
  - `frontend/src/content/collective.ts`
  - `frontend/src/content/artists.ts`
  - `frontend/src/content/events.ts`
  - `frontend/src/content/equipment.ts`
- [ ] Chaque collection utilise des `id` et `slug` stables
- [ ] Les champs visibles au lancement existent en `fr` et `en`
- [ ] Aucun contenu long n'est disperse en dizaines de cles i18n

---

## Story 0.3 - Regles de selection des sources

**Priorite:** Critique

### Criteres d'acceptation

- [ ] Toute selection d'asset commence par `docs/asset-inventory-old-website.md`
- [ ] Toute decision de structure ou de contenu commence par :
  - `docs/content-audit-old-website.md`
  - `docs/old-site-walkthrough.md`
- [ ] Toute decision de motion commence par `docs/video-reference-old-site.md`
- [ ] Les fichiers de bruit sont ignores :
  - `__MACOSX`
  - `.DS_Store`
  - fichiers `._*`
- [ ] Les noms casses, accents moches et doublons sont normalises avant integration

---

## Story 0.4 - Regles de destination des assets

**Priorite:** Critique

### Criteres d'acceptation

- [ ] Les SVG de production vont dans `frontend/src/assets/svg`
- [ ] Les images raster de production vont dans `frontend/src/assets/img`
- [ ] Les fonts approuvees vont dans `frontend/src/assets/fonts`
- [ ] Regles de destination explicites :
  - logos SVG -> `src/assets/svg`
  - icones SVG -> `src/assets/svg`
  - photos artistes -> `src/assets/img/artists`
  - posters et galeries events -> `src/assets/img/events`
  - visuels equipe -> `src/assets/img/team`
  - photos materiel -> `src/assets/img/equipment`
- [ ] Les screenshots et references restent dans `docs/`
- [ ] Aucun composant frontend n'importe directement des fichiers depuis `old-website-assets`

---

## Story 0.5 - Cartographie des routes

**Priorite:** Haute

### Criteres d'acceptation

- [ ] Les routes de lancement sont figees :
  - `/:lang/`
  - `/:lang/about`
  - `/:lang/artists`
  - `/:lang/artists/:slug`
  - `/:lang/events`
  - `/:lang/events/upcoming`
  - `/:lang/events/archive`
  - `/:lang/events/:slug`
  - `/:lang/services`
  - `/:lang/contact`
- [ ] Les langues non supportees redirigent proprement
- [ ] Les routes inconnues redirigent vers une 404 ou vers l'accueil localise

---

## Story 0.6 - Information architecture de navigation

**Priorite:** Haute

### Criteres d'acceptation

- [ ] La navigation reprend la logique legacy utile :
  - accueil
  - qui sommes nous
  - nos artistes
  - evenements
  - more
- [ ] `More` regroupe les pages secondaires :
  - services / location
  - contact
- [ ] Les labels sont traduits en FR et EN
- [ ] La nav peut etre geree par configuration, pas par conditions dispersees dans les composants

---

## Story 0.7 - Strategie i18n

**Priorite:** Critique

### Criteres d'acceptation

- [ ] `frontend/src/i18n/translations/fr.json` et `en.json` contiennent :
  - navigation
  - CTA
  - labels
  - messages de validation
  - SEO par defaut
- [ ] Le contenu long reste dans `frontend/src/content/*`
- [ ] Les textes anglais ne sont pas dupliques a l'aveugle depuis le francais
- [ ] Les manques EN sont traces explicitement

---

## Story 0.8 - Primitives de page partagees

**Priorite:** Moyenne

### Criteres d'acceptation

- [ ] Reutiliser en priorite `Container`, `Section`, `Title`, `Button`, `Card`, `Dropdown`, `Spinner`
- [ ] Ajouter seulement les patterns necessaires :
  - hero media
  - intro de section
  - grille de contenu
  - bandeau CTA
  - galerie
- [ ] Ces primitives restent content-driven et locale-aware

---

## Story 0.9 - Systeme typo

**Priorite:** Haute

### Criteres d'acceptation

- [ ] Definir une paire typo de lancement :
  - display pour les gros titres
  - body lisible pour texte, forms, labels
- [ ] La direction de la typo display vient du vieux site et du dossier `Typo`
- [ ] La licence des fonts legacy est verifiee avant usage prod
- [ ] Des tokens typo clairs existent pour :
  - hero title
  - section title
  - card title
  - body
  - meta / label
- [ ] Les gros titres gardent l'energie condensed / distressed
- [ ] Les longs paragraphes et les formulaires ne reprennent pas la typo display

---

## Story 0.10 - Systeme couleurs et tokens UI

**Priorite:** Haute

### Criteres d'acceptation

- [ ] Auditer les couleurs deja presentes dans `frontend/src/assets/styles/variables.scss`
- [ ] Partir de la direction actuelle utile du template :
  - fond sombre
  - texte clair
  - accent acid green
- [ ] Remplacer les noms flous ou trompeurs par de vrais tokens semantiques
- [ ] Definir au minimum :
  - background principal
  - background surface / card
  - texte principal
  - texte secondaire
  - bordure
  - accent
  - etat danger
- [ ] Documenter les valeurs retenues dans les variables SCSS de reference
- [ ] Eviter les couleurs hardcodees dispersees dans les composants et pages
- [ ] Les pages principales utilisent les memes tokens, pas des variations ad hoc
- [ ] Le choix final reste coherent avec le legacy analyse :
  - noir / blanc dominant
  - accent lumineux ponctuel
  - contraste suffisant pour lecture et formulaires

---

## Story 0.11 - Strategie motion et animations

**Priorite:** Haute

### Criteres d'acceptation

- [ ] Auditer les animations existantes dans :
  - `frontend/src/hooks/useAnimation.ts`
  - `frontend/src/hooks/useScrollAnimation.ts`
  - `frontend/src/hooks/useAnimatedNavigate.ts`
  - composants ou SCSS qui definissent des keyframes locales
- [ ] Definir quelles animations sont conservees, simplifiees ou supprimees
- [ ] Limiter la motion de lancement a quelques patterns clairs :
  - reveals au scroll
  - transitions de hero
  - hover states utiles
  - timeline code-native si retenue
- [ ] Eviter les transitions globales lourdes sur `document.body` si elles ralentissent la navigation
- [ ] Aucun marqueur de debug GSAP ne reste actif en production
- [ ] La motion reste secondaire au contenu et a la lisibilite
- [ ] `prefers-reduced-motion` est pris en compte dans les patterns retenus
- [ ] La video legacy ne sert que de reference, pas d'implementation finale pour un motif simple

---

## Definition of done

Quand l'Epic 0 est termine, on peut implementer les pages une par une sans redecider a chaque fois les routes, l'i18n, la structure des donnees, la palette, la motion ou la destination des assets.
