# Epic 8 - Systeme typographique

## Objectif

Unifier et rendre coherent le systeme de polices du frontend Gazmatek. Eliminer les declarations mortes, clarifier les roles de chaque police, creer les tokens de scale, et appliquer uniformement sur tous les composants et pages existants.

## References obligatoires

- [typography-system.md](../typography-system.md) — audit complet + decisions + mapping cible
- [design-system-foundations.md](../design-system-foundations.md) — regles typo generales
- [variables.scss](../../frontend/src/assets/styles/variables.scss) — tokens actuels
- [index.scss](../../frontend/src/index.scss) — declarations @font-face
- [typography.scss](../../frontend/src/assets/styles/typography.scss) — fichier cible (vide)

## Perimetre

Uniquement le layer typographique : `font-family`, `font-size`, `font-weight`, `letter-spacing`, `line-height`. Ne pas toucher aux couleurs, spacing, layout ou motion.

---

## Story 8.1 - Decider et fixer la body font

**Priorite:** Critique — bloquante pour les autres stories

### Contexte

DAMAGEPLAN est la seule police body active mais n'a qu'un seul poids (700). Les `font-weight: 300/400/500/600` n'ont aucun effet. Inter est presente en fichiers mais n'a aucun `@font-face`.

Deux options documentees dans [typography-system.md](../typography-system.md#problemes-a-corriger) :
- **Option A** : reactiver Inter comme body font (lisibilite prose, vrais poids 300-700)
- **Option B** : garder DAMAGEPLAN seul, compenser par opacite et taille

Decision retenue pour cette implementation : **Option A**.

### Criteres d'acceptation

- [x] Une decision explicite est prise entre Option A et Option B
- [ ] Si Option A :
  - [x] Un `@font-face` est ajoute dans `index.scss` pour Inter (300, 400, 500, 600, 700)
  - [x] `$default-font-family` devient `"Inter", Arial, sans-serif`
  - [x] Les anciennes declarations Inter mortes dans `App.scss` sont nettoyees
- [ ] Si Option B :
  - [ ] Les `font-weight` inferieurs a 700 sont remplaces par des variantes `opacity` ou `font-size` dans les composants
  - [ ] Les fichiers Inter inutilises sont supprimes de `src/assets/fonts/`
- [ ] Dans les deux cas :
  - [x] `$display-font-family` reste `"Bang4YaBuck", ...`
  - [x] DAMAGEPLAN reste dans la chaine de fallback display minimum
  - [x] Le role de chaque variable est commente dans `variables.scss`

---

## Story 8.2 - Creer les tokens de scale typographique

**Priorite:** Haute

### Contexte

Les tailles de texte sont actuellement dispersees composant par composant en px bruts ou rem sans reference commune. Le fichier `typography.scss` est vide.

### Criteres d'acceptation

- [x] `typography.scss` contient les variables de scale suivantes (ajuster les valeurs si necessaire) :

```scss
// Display — Bang4YaBuck
$font-size-display-xl:  clamp(3rem, 8vw, 5rem);      // H1 hero
$font-size-display-lg:  clamp(2rem, 5vw, 3.2rem);    // Titres de section
$font-size-display-md:  clamp(1.4rem, 3vw, 2rem);    // Sous-titres, event name

// Body — police body retenue (story 8.1)
$font-size-body-lg:     clamp(0.72rem, 1.5vw, 0.88rem);  // Corps principal
$font-size-body-md:     clamp(0.62rem, 1.2vw, 0.76rem);  // Corps secondaire
$font-size-body-sm:     clamp(0.52rem, 1vw, 0.64rem);    // Meta, caption

// UI
$font-size-label:       clamp(0.44rem, 0.8vw, 0.56rem);  // Eyebrow, tags, badges
$font-size-nav:         0.56rem;                           // Liens navbar
$font-size-button:      clamp(0.52rem, 1vw, 0.72rem);    // Boutons

// Letter spacing
$letter-spacing-eyebrow: 0.12em;
$letter-spacing-nav:     0.04em;

// Line heights
$line-height-display:    1.05;
$line-height-body:       1.55;
$line-height-label:      1.2;
```

- [x] `typography.scss` est ajoute dans le `preprocessorOptions.scss.additionalData` de `vite.config.mts` pour etre disponible globalement
- [x] Aucune valeur n'est hardcodee en doublon dans les composants si elle correspond a un token existant

---

## Story 8.3 - Supprimer les font-family hardcodes

**Priorite:** Haute

### Contexte

Plusieurs composants declarent `font-family` en dur plutot que via les variables. Liste a traiter :

- `App.scss` — `font-family` directement applique
- Tout composant utilisant `font-family: "Inter"` ou `font-family: "Bang4YaBuck"` directement

### Procedure pour l'agent

1. Chercher dans `frontend/src` tous les fichiers SCSS contenant `font-family:` (hors `variables.scss` et `index.scss`)
2. Remplacer chaque declaration directe par `$display-font-family` ou `$default-font-family` selon le role de l'element

### Criteres d'acceptation

- [x] Aucun `font-family` en dur dans les composants SCSS (hors variables et @font-face)
- [x] Tout element display utilise `$display-font-family`
- [x] Tout element body/UI utilise `$default-font-family` ou `inherit`
- [x] Le build passe sans erreur TypeScript ni SCSS apres les changements

---

## Story 8.4 - Corriger les font-weight sans effet

**Priorite:** Moyenne

### Contexte

Avec DAMAGEPLAN (700 seul) comme body font, tous les `font-weight: 300`, `400`, `500`, `600` dans les composants sont rendus par le navigateur en 700 synthetique. Si la story 8.1 retient Option A (Inter), ce probleme disparait naturellement.

Cette story n'est a faire que si l'Option B est retenue (DAMAGEPLAN seul).

### Criteres d'acceptation (Option B uniquement)

- [ ] Identifier tous les `font-weight` < 700 dans les SCSS des composants et pages
- [ ] Pour les elements qui doivent etre "legers" visuellement :
  - Appliquer `opacity: 0.55` a `0.75` selon le besoin
  - Ou reduire `font-size` pour creer la hierarchie
- [ ] Supprimer les declarations `font-weight: 300/400/500/600` qui n'ont plus d'effet
- [ ] Documenter en commentaire dans les composants touches pourquoi le weight est specifie si conserve

---

## Story 8.5 - Appliquer la hierarchie semantique HTML

**Priorite:** Moyenne

### Contexte

Certains titres sont rendus avec les bonnes classes CSS mais la balise HTML ne correspond pas au role (`div` a la place de `h1`, `span` a la place de `h2`). C'est un probleme d'accessibilite et de SEO.

### Procedure pour l'agent

Parcourir les pages suivantes et verifier les balises de titres :
- `pages/Home/Hero/Hero.tsx`
- `pages/Home/NextEvent/NextEvent.tsx`
- `pages/AboutUs/AboutUs.tsx`
- `pages/Artistes/Artistes.tsx`
- `pages/ArtistDetail/ArtistDetail.tsx`
- `pages/Events/EventsHub/EventsHub.tsx`

### Criteres d'acceptation

- [x] Chaque page a un seul `<h1>` qui correspond au titre principal
- [x] Les titres de section sont en `<h2>`
- [x] Les sous-titres de card ou bloc sont en `<h3>`
- [x] Aucun `<h1>` n'est utilise plusieurs fois sur la meme page
- [x] Le style visuel n'est pas affecte par ces changements de balise

---

## Story 8.6 - Validation visuelle

**Priorite:** Haute — derniere avant merge

### Criteres d'acceptation

- [x] Le build passe : `npm run build` sans erreur
- [ ] La hierarchie visuelle est correcte sur :
  - Home (hero, section titles, body text, eyebrow)
  - About Us (hero, team names, body text)
  - Artistes (page title, artist names, genre tags)
  - Events hub (title, card titles, metadata)
- [ ] Sur mobile (`< 576px`) : les titres display ne debordent pas, le texte reste lisible
- [ ] `prefers-reduced-motion` ne casse pas la typo
- [ ] Aucune regression de style detectee sur Navbar et Footer

---

## Notes pour l'agent

- Commencer **obligatoirement** par lire [typography-system.md](../typography-system.md) avant tout changement
- La decision story 8.1 conditionne toutes les autres — ne pas skipper
- Ne pas toucher aux couleurs, au layout ou aux animations — perimetre strict typo
- Le fichier `App.scss` contient potentiellement des declarations a nettoyer — verifier avant de modifier les composants
- `vite.config.mts` doit etre lu avant d'ajouter `typography.scss` en global pour ne pas casser l'ordre des imports SCSS existants
