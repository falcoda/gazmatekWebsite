# Design System Foundations

## Objectif

Figuer les decisions de base du rebuild Gazmatek avant implementation des pages : palette, tokens, typo, motion et ecarts a corriger dans le frontend actuel.

## References

- [asset-inventory-old-website.md](./asset-inventory-old-website.md)
- [content-audit-old-website.md](./content-audit-old-website.md)
- [old-site-walkthrough.md](./old-site-walkthrough.md)
- [video-reference-old-site.md](./video-reference-old-site.md)
- [epic-0-setup-infrastructure.md](./stories/epic-0-setup-infrastructure.md)
- [epic-7-finitions.md](./stories/epic-7-finitions.md)

## Direction retenue

- Base visuelle sombre, contraste fort, accent lumineux ponctuel
- Dominante noir / blanc / gris inspiree du legacy
- Accent vert acide conserve comme marque de contraste et d'action
- Typo display expressive pour les titres, typo body sobre pour le texte
- Motion discrete et utile, jamais prioritaire sur le contenu

## Audit du frontend actuel

### Palette actuelle

Fichier principal :
- [variables.scss](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/assets/styles/variables.scss)

Etat actuel utile :
- `$primary-color: #0b0b0d`
- `$light-color: #f7f7f7`
- `$gray-color: #8b8b8b`
- `$blue-color: #21c37a`
- `$materials-color: #141416`
- `$danger-color: #d11b1b`

Constat :
- la direction globale est bonne pour Gazmatek
- les noms de variables ne sont pas assez semantiques
- `$blue-color` designe en fait un vert acide
- plusieurs composants gardent des couleurs hardcodees

Hardcodes a corriger en priorite :
- [App.scss](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/App.scss)
- [Button.scss](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/components/Button/Button.scss)
- [Dropdown.scss](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/components/Dropdown/Dropdown.scss)

### Typo actuelle

Fichiers utiles :
- [index.scss](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/index.scss)
- [variables.scss](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/assets/styles/variables.scss)

Constat :
- `index.scss` charge `Inter`
- `variables.scss` pointe vers `"switzer", Arial, sans-serif`
- `App.scss` force encore `font-family: "Inter"`
- la base typo n'est donc pas coherente

Decision :
- conserver une body font sobre et robuste pour la V1
- choisir une seule body font effective
- ajouter une display font separee pour les titres si la licence legacy le permet

### Motion actuelle

Fichiers utiles :
- [useAnimation.ts](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/hooks/useAnimation.ts)
- [useScrollAnimation.ts](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/hooks/useScrollAnimation.ts)
- [useAnimatedNavigate.ts](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/hooks/useAnimatedNavigate.ts)
- [Hero.scss](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/pages/Home/Hero/Hero.scss)
- [CustomCursor.scss](C:/Users/mcnde/work/personal/gazmatekWebsite/frontend/src/components/CustomCursor/CustomCursor.scss)

Constat :
- le projet a deja des hooks GSAP reutilisables
- il reste un `markers: true` dans `useAnimation.ts`
- certaines transitions sont globales et potentiellement lourdes, notamment via `document.body`
- plusieurs animations sont encore eparpillees entre hooks, pages et composants
- `useScrollAnimation.ts` est propre et deja compatible `prefers-reduced-motion`

Decision :
- garder GSAP comme seule lib de motion complexe
- garder les reveals scroll simples
- garder une animation hero legere si elle sert la lecture
- reconstruire la timeline en code natif ou GSAP leger, pas en video
- supprimer les marqueurs debug et les motions decoratives inutiles
- garder le custom cursor seulement s'il apporte une vraie valeur et reste impeccable en performance

## Palette de reference

Cette palette est la base recommandee pour le rebuild. Elle reprend la bonne direction du template actuel, mais en noms semantiques.

- `color-bg-base: #0b0b0d`
- `color-bg-surface: #141416`
- `color-bg-elevated: #1b1b1f`
- `color-text-primary: #f7f7f7`
- `color-text-secondary: #8b8b8b`
- `color-border-subtle: rgba(247, 247, 247, 0.12)`
- `color-accent: #21c37a`
- `color-accent-hover: #2ce08b`
- `color-danger: #d11b1b`

## Mapping recommande vers les variables SCSS

Objectif :
- ne pas casser tout le template d'un coup
- garder une couche de compatibilite courte
- converger vers des tokens semantiques

Tokens recommandes :
- `$color-bg-base`
- `$color-bg-surface`
- `$color-bg-elevated`
- `$color-text-primary`
- `$color-text-secondary`
- `$color-border-subtle`
- `$color-accent`
- `$color-accent-hover`
- `$color-danger`

Aliases transitoires acceptables si necessaire :
- `$primary-color -> $color-bg-base`
- `$secondary-color -> $color-bg-surface`
- `$light-color -> $color-text-primary`
- `$gray-color -> $color-text-secondary`
- `$accent-color -> $color-accent`

Regles :
- ne plus introduire de nouvelle couleur hardcodee dans les composants
- ne pas garder de noms de variables visuellement faux comme `$blue-color` pour du vert
- toute couleur de composant doit etre exprimable via un token global

## Regles typo

- `body font` :
  - une seule police active dans l'app
  - priorite a la lisibilite
  - bonne tenue en paragraphes, labels, formulaires et mobile
- `display font` :
  - reservee aux hero titles, section titles, event headlines
  - derivee du dossier `Typo` si licence acceptable
  - fallback moderne propre si la fonte legacy ne peut pas etre shippee
- ne jamais utiliser la display font pour :
  - paragraphes longs
  - champs de formulaire
  - metadata fines

## Strategie motion

### Patterns conserves

- fade-in leger au scroll
- stagger discret pour grilles ou listes
- micro-hover sur boutons, liens et cartes
- hero motion subtile
- timeline event/about si utile a la comprehension

### Patterns a eviter

- transition pleine page lourde sur chaque navigation
- animation qui bloque l'acces au contenu
- video lourde pour un motif purement decoratif
- accumulation de keyframes non harmonisees
- effets gadget qui sentent le template plus que Gazmatek

### Regles techniques

- GSAP pour les sequences complexes
- CSS/SCSS pour les micro-animations simples
- `prefers-reduced-motion` respecte par defaut
- aucun `markers: true` en production
- une animation doit avoir un role :
  - guider
  - reveler
  - hierarchiser
  - signaler une interaction

## Ce qu'on garde du template actuel

- la base dark avec accent vert
- les hooks GSAP reutilisables
- le pattern de reveal scroll simple
- le shell global React + SCSS + i18n

## Ce qu'on change

- renommer et clarifier les variables de couleur
- supprimer les hardcodes couleur dans les composants
- unifier la body font
- introduire une vraie display font de marque
- trier les animations pour ne garder que les plus utiles
- enlever les transitions de navigation si elles donnent une impression de lenteur

## Checklist implementation

- [ ] creer ou refactorer les tokens couleur dans `frontend/src/assets/styles/variables.scss`
- [ ] corriger les hardcodes dans les composants de base
- [ ] fixer la body font unique dans `index.scss` et `App.scss`
- [ ] choisir la display font et documenter son statut de licence
- [ ] retirer les marqueurs debug GSAP
- [ ] auditer `useAnimatedNavigate.ts` et valider si la transition body est gardee
- [ ] valider le maintien ou la suppression du custom cursor
- [ ] appliquer les memes tokens et regles motion sur home, about, artists, events, services

## Usage dans les stories

Ce document doit etre utilise en meme temps que :
- `docs/stories/epic-0-setup-infrastructure.md` pour les decisions de fondation
- `docs/stories/epic-1-page-accueil.md` a `epic-6-page-contact.md` pour appliquer palette et motion sans redecider
- `docs/stories/epic-7-finitions.md` pour la QA finale
