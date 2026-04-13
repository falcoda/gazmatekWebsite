# Typography System — Gazmatek

## Objectif

Documenter l'etat reel des polices dans le frontend, la decision de mapping retenue et les regles a appliquer uniformement sur toutes les pages.

## References

- [design-system-foundations.md](./design-system-foundations.md)
- [variables.scss](../frontend/src/assets/styles/variables.scss)
- [index.scss](../frontend/src/index.scss)
- [typography.scss](../frontend/src/assets/styles/typography.scss)

---

## Etat reel des polices (audit)

### Polices declarees dans `index.scss`

| Font | Fichier | Poids | Statut |
|---|---|---|---|
| **DAMAGEPLAN** | `DAMAGEPLAN.ttf` | 700 uniquement | Active — police body/defaut |
| **Bang4YaBuck** | `Bang4YaBuck.ttf` | 700 uniquement | Active — police display |
| **ABITE** | `ABITE.ttf` | 700 uniquement | Declared mais jamais ciblee directement |
| ~~Inter~~ | `Inter-{Light,Regular,Medium,SemiBold,Bold}.woff(2)` | 300/400/500/600/700 | Fichiers presents, **aucun @font-face**, non active |

### Variables SCSS

```scss
$default-font-family:  "DAMAGEPLAN", "ABITE", "Bang4YaBuck", Arial, sans-serif;
$display-font-family:  "Bang4YaBuck", "ABITE", "DAMAGEPLAN", "Impact", sans-serif;
```

### Base HTML

```scss
html { font-size: 25px; font-size-adjust: 1; }
// => 1rem = 25px dans tout le projet
```

---

## Font mapping par element

### Display — `$display-font-family` (Bang4YaBuck, 700)

Utiliser exclusivement pour les elements de marque et titres choc.

| Element | Taille cible | Poids | Contexte |
|---|---|---|---|
| H1 Hero (`heroTitle`) | 64px mobile → 96px+ desktop | 700 | Hero section uniquement |
| H1 sections (About, Events, Artists, Services) | 40px → 64px fluid | 700 | En-tete de chaque page |
| Section titles (Mission, Team, Timeline) | 28px → 48px fluid | 700 | Titre de bloc majeur |
| Event name (NextEvent, EventDetail) | 36px → 52px | 700 | Titre d'evenement |
| Artist name (ArtistDetail hero) | 32px → 48px | 700 | Nom en hero d'artiste |

**Interdit pour :** paragraphes, labels, formulaires, metadata fines, navbar.

---

### Body — `$default-font-family` (DAMAGEPLAN, 700 seul disponible)

Utiliser pour tous les elements hors display. Seul le poids 700 est disponible — les variantes visuelles passent par l'opacite, le `letter-spacing` et la `font-size`.

| Element | Taille cible | Opacite / lettre | Contexte |
|---|---|---|---|
| Corps de texte (prose, descriptions) | 16px → 20px | 0.72–0.85 | Intros, bios, descriptions services |
| Eyebrow labels (UPPERCASE) | 10px → 13px | 0.5–0.65, `ls: 0.12em` | Avant chaque section title |
| Tags / badges | 11px → 14px | 0.7 | Genre artiste, statut event, filtres |
| Navbar liens desktop | 14px | 1 | `font-family: inherit` |
| Navbar liens mobile | 16px | 1 | `font-family: inherit` |
| Navbar dropdown sous-menu | 13px | 0.75 | |
| Boutons | 13px → 20px | 1 | Selon variante |
| LanguageSwitcher | 0.62rem (~15px) | 0.65 actif / 0.4 inactif | |
| Footer liens | 12px → 14px | 0.6 | |
| Champs formulaire | 14px → 16px | 0.85 | Placeholders et valeurs |
| Legende galerie / caption | 12px → 13px | 0.5 | Sous images |

---

## Problemes a corriger

### 1. ABITE — police fantome

ABITE est dans la chaine de fallback et son fichier est declare en `@font-face` mais aucun composant ne l'utilise directement. Elle sert uniquement de filet. Ce n'est pas un bug bloquant mais inutile de la charger si elle ne sert jamais.

**Decision :** la garder comme fallback silencieux si la performance ne pose pas de probleme. Sinon la retirer du `@font-face`.

### 2. Inter — fichiers morts

10 fichiers `.woff/.woff2` Inter sont presents dans `src/assets/fonts/` mais aucun `@font-face` n'est declare. Inter n'est donc jamais charge.

**Decision :** deux options —
- **Option A** : reactiver Inter comme body font lisible (bonne pour prose longue, formulaires)
- **Option B** : supprimer les fichiers pour alleger le build

### 3. Un seul poids disponible (700)

DAMAGEPLAN, Bang4YaBuck et ABITE sont tous declares en `font-weight: 700` uniquement. Les declarations `font-weight: 300`, `400`, `500`, `600` dans les SCSS n'ont aucun effet — le navigateur synthetiise un faux bold.

**Impact direct :** les `font-weight: 300` (texte corps allege) sont visuellement identiques au 700.

**Decision :** pour les blocs de texte long, soit —
- reactiver Inter (qui a les vrais poids 300 a 700)
- ou accepter que tout le corps soit en 700 synthetique et compenser par taille et opacite

### 4. `font-size: 25px` sur html

La base de 25px est elevee pour du `rem`. Cela amplifie toutes les valeurs rem. Les composants qui melangent `px` et `rem` peuvent avoir des incoherences.

**Decision :** ne pas changer brutalement la base — cela casserait toutes les valeurs rem existantes. Documenter et stabiliser a 25px.

---

## Regles a appliquer par l'agent

1. **Ne jamais utiliser `$display-font-family` pour le corps de texte**, les formulaires ou les labels de navigation
2. **Ne jamais hardcoder** `font-family: "Inter"`, `font-family: "Bang4YaBuck"` etc. directement dans un composant — toujours passer par `$display-font-family` ou `$default-font-family`
3. **Les tailles** doivent utiliser `smoothValue()` entre deux breakpoints plutot qu'une valeur fixe unique
4. **Les eyebrow labels** : toujours `text-transform: uppercase`, `letter-spacing: 0.1em` minimum, taille 10–13px, opacite reduite
5. **Les balises semantiques** (`h1`, `h2`, `h3`, `p`) doivent correspondre a leur role typographique, pas juste leur style
6. **`font-weight` inferieur a 700** n'a aucun effet avec les polices actuelles — si besoin de hierarchie visuelle, jouer sur `opacity`, `font-size`, `letter-spacing`

---

## Variables SCSS cibles (a ajouter dans `typography.scss`)

```scss
// Display scale
$font-size-display-xl:  clamp(3rem, 8vw, 5rem);    // H1 hero
$font-size-display-lg:  clamp(2rem, 5vw, 3.2rem);   // Section titles
$font-size-display-md:  clamp(1.4rem, 3vw, 2rem);   // Sub-section, event name

// Body scale
$font-size-body-lg:     clamp(0.72rem, 1.5vw, 0.88rem);  // Corps principal
$font-size-body-md:     clamp(0.62rem, 1.2vw, 0.76rem);  // Corps secondaire
$font-size-body-sm:     clamp(0.52rem, 1vw, 0.64rem);    // Meta, caption

// UI scale
$font-size-label:       clamp(0.44rem, 0.8vw, 0.56rem);  // Eyebrow, tags
$font-size-nav:         0.56rem;                           // Navbar links
$font-size-button:      clamp(0.52rem, 1vw, 0.72rem);    // Boutons
```

---

## Checklist pour la story

- [ ] Auditer tous les `font-weight: 300` et `400` — aucun effet avec les polices actuelles
- [ ] Decider Inter reactiver ou supprimer
- [ ] Remplir `typography.scss` avec les variables de scale ci-dessus
- [ ] Supprimer tous les `font-family` hardcodes dans les composants
- [ ] Ajouter les variables dans le global SCSS auto-import Vite
- [ ] Verifier la coherence visuelle sur home, about, artists, events
- [ ] Valider sur mobile (font-size 25px base peut etre brutal en petit ecran)
