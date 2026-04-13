# Epic 5 - Page services / location

## Objectif

Passer d'une simple page "location" a une vraie page services credible, basee sur les vraies photos de materiel, l'heritage legacy et les besoins business reels de Gazmatek.

## References obligatoires

- [asset-inventory-old-website.md](../asset-inventory-old-website.md)
- [content-audit-old-website.md](../content-audit-old-website.md)
- [old-site-walkthrough.md](../old-site-walkthrough.md)

References visuelles :

![Legacy location grid](../video-reference/site-walkthrough/walk-18.jpg)

![Legacy quote form](../video-reference/site-walkthrough/walk-19.jpg)

![Legacy equipment detail](../video-reference/site-walkthrough/walk-21.jpg)

## Contenu a reprendre depuis l'ancien site

- Photos materiel :
  - `photos_materiel`
- Structure legacy :
  - grille equipement
  - detail equipement
  - demande devis
- Texte services :
  - copy deja presente dans `frontend/src/i18n/translations/fr.json`
  - cadrage du manifeste pour l'intro

## Regles contenu

- Les noms de materiel viennent d'abord des fichiers legacy
- Les specs ne sont affichees que si elles sont documentees ou verifiees
- Les textes services sont reecrits proprement a partir du contenu existant, pas reinvents

## Mapping contenu par zone

- Hero services :
  - positionner Gazmatek comme partenaire technique et support event
  - reprendre l'intention du legacy sans copier une page "location" brute
- Intro services :
  - repartir du copy deja present dans le projet
  - injecter seulement les idees utiles du manifeste si elles renforcent la credibilite
- Grille equipement :
  - nom de materiel et photo reelle
  - specs seulement si la source est fiable
- Bloc devis :
  - reprendre les categories de demande visibles dans le legacy
  - simplifier le wording pour le rendre pro et rapide a remplir

## Story 5.1 - Normaliser le contenu services

**Priorite:** Critique

### Criteres d'acceptation

- [x] Creer `frontend/src/content/equipment.ts`
- [x] Creer ou enrichir la structure services dans `frontend/src/content/site.ts`
- [x] Chaque equipement contient au minimum :
  - `id`
  - `name`
  - `category`
  - `image`
  - `specs` optionnelles
  - `description` optionnelle
- [x] Les photos retenues sont copiees dans `src/assets/img/equipment` (et `public/img/equipment` pour acces URL direct)
- [x] Les services ont un titre, intro et corps localises
- [x] Le contenu de service repart du texte deja existant dans le projet et des usages visibles sur le legacy
- [x] La story distingue bien les textes "services" des donnees "equipment"

---

## Story 5.2 - Landing page services

**Priorite:** Haute

### Criteres d'acceptation

- [x] `/services` positionne Gazmatek comme partenaire technique / event, pas juste loueur
- [x] La page contient :
  - hero
  - intro services
  - bloc equipement
  - CTA vers contact ou devis
- [x] Les categories de services existantes sont conservees et nettoyees
- [x] Le texte de landing reste oriente usage reel : son, event, support technique, pas catalogue abstrait

---

## Story 5.3 - Grille equipement

**Priorite:** Haute

### Criteres d'acceptation

- [x] La grille utilise les vraies photos du dossier `photos_materiel`
- [x] Le catalogue initial couvre les modeles reellement photographies
- [x] Les cartes restent robustes meme si les specs sont partielles
- [x] La page fonctionne en FR et EN
- [x] Une carte sans spec fiable reste publiable avec nom + image + categorie seulement

---

## Story 5.4 - Detail / focus equipement

**Priorite:** Moyenne

### Criteres d'acceptation

- [x] Le rebuild decide clairement si le detail materiel est :
  - une section inline
  - un modal
  - ou une variation riche dans la grille
- [x] Cette decision est inspiree du legacy mais modernisee
- [x] On n'introduit pas une complexite inutile juste pour coller au vieux site

> Decision retenue : **card expansible inline** — clic sur la carte etend une zone detail (description + specs) sous la photo, sans routing supplementaire ni modal. Simple, accessible, pas de surcharge UX.

---

## Story 5.5 - Parite avec la demande de devis legacy

**Priorite:** Moyenne

### Criteres d'acceptation

- [x] Le rebuild tranche explicitement entre :
  - un formulaire devis integre sur `/services`
  - ou une redirection vers `/contact` avec sujet pre-rempli
- [x] Si le formulaire est integre, il couvre au minimum :
  - identite
  - type d'evenement
  - details libres
- [x] Si le formulaire n'est pas integre, la story documente comment la parite fonctionnelle est preservee
- [x] Le wording du devis repart du vieux formulaire et est nettoye pour la V2
- [x] Les libelles de champs et aides de saisie sont derives des usages legacy, puis simplifies

> Decision retenue : **redirection vers `/contact?subject=quote`**. La page Contact lit le parametre URL et pre-selectionne automatiquement l'option "Devis" dans le dropdown sujet. Un seul formulaire maintenu, zero duplication. Parite fonctionnelle assuree : identite (name), email, phone, message libre, sujet pre-rempli.

---

## Definition of done

La page services est reutilisable, credible et branchee sur de vrais assets materiel, sans tomber dans un faux tunnel ecommerce.
