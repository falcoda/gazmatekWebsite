# Epic 2 - Page qui sommes nous

## Objectif

Transformer le manifeste et les assets equipe du vieux site en une page `/about` propre, credible et structurante.

## References obligatoires

- [asset-inventory-old-website.md](../asset-inventory-old-website.md)
- [content-audit-old-website.md](../content-audit-old-website.md)
- [old-site-walkthrough.md](../old-site-walkthrough.md)
- [video-reference-old-site.md](../video-reference-old-site.md)

References visuelles :

![Legacy about intro](../video-reference/site-walkthrough/walk-04.jpg)

![Legacy team grid](../video-reference/site-walkthrough/walk-06.jpg)

## Contenu a reprendre depuis l'ancien site

- Texte de fond :
  - `Texte version Anna 5_12.pdf`
  - `texte version thomas .pdf`
- Structure :
  - intro collective visible dans la video walkthrough
  - equipe par roles visible dans la grille legacy
- Historique :
  - jalons recoupes avec les archives d'evenements

## Regles contenu

- `/about` est la version editorialisee du manifeste legacy
- On conserve les idees et preuves du vieux site
- On reecrit la forme pour qu'elle soit propre, concise et bilingue

## Mapping contenu par zone

- Hero / intro :
  - reprendre les idees d'ouverture du manifeste
  - garder un ton collectif, pas institutionnel
- Mission et fonctionnement :
  - fusionner les deux versions du manifeste
  - conserver les notions d'autogestion, reinjection, soutien aux artistes emergents et ancrage belge
- Histoire :
  - s'appuyer sur les archives d'evenements pour donner des jalons concrets
  - ne pas inventer une chronologie detaillee si elle n'est pas documentee
- Equipe :
  - reprendre les roles visibles dans le walkthrough et les assets equipe
  - garder les descriptions de role courtes et factuelles

## Story 2.1 - Hero et cadrage

**Priorite:** Haute

### Criteres d'acceptation

- [x] `/about` a un hero compact et fort
- [x] Le texte d'ouverture vient du manifeste legacy
- [x] Les images d'atmosphere et d'equipe sont copiees dans `src/assets/img`
- [x] Les titres respectent la direction typo du vieux site
- [x] La page existe en FR et EN
- [x] Le hero ne contient pas de slogan neuf invente hors du champ editorial du manifeste

---

## Story 2.2 - Fonctionnement et mission

**Priorite:** Critique

### Criteres d'acceptation

- [x] La page explique clairement :
  - l'autogestion
  - la separation artistes / organisation
  - la reinjection des recettes
  - l'ouverture aux artistes emergents avec focus belge
- [x] Le texte est nettoye editorialement sans perdre le sens source
- [x] La version anglaise est une vraie traduction
- [x] Les paragraphes viennent directement des versions PDF du manifeste puis sont fusionnes / reecrits
- [x] La structure finale dit clairement quoi mettre dans :
  - accroche
  - mission
  - mode de fonctionnement
  - engagement artistique

---

## Story 2.3 - Histoire et jalons

**Priorite:** Haute

### Criteres d'acceptation

- [x] La page contient une section histoire / jalons
- [x] Les jalons s'appuient sur les archives reelles
- [x] La ligne verticale legacy est reconstruite en frontend
- [x] Priorite a SCSS/CSS
- [x] JS ou GSAP seulement si necessaire pour une micro-animation
- [x] La video source n'est pas shippee comme implementation finale
- [x] Chaque jalon contient au minimum une date ou periode, un titre et une preuve legacy rattachee

---

## Story 2.4 - Equipe

**Priorite:** Haute

### Criteres d'acceptation

- [x] L'equipe reprend les roles visibles dans le walkthrough legacy
- [x] Les visuels proviennent du dossier `Equipe`
- [x] Chaque carte supporte :
  - nom
  - role
  - image
  - lien social optionnel
- [x] Les donnees vivent dans `src/content/collective.ts`
- [x] Les roles et libelles sont derives du walkthrough et des assets equipe
- [x] Si une bio equipe est absente, la carte reste minimale plutot que de remplir avec du faux texte

---

## Story 2.5 - SEO et couche de confiance

**Priorite:** Moyenne

### Criteres d'acceptation

- [x] `/about` a un SEO localise
- [x] La page reste concrete et verifiable
- [x] Le rendu final fait page collective pro, pas flyer d'event

---

## Definition of done

`/about` devient la page de reference sur l'identite de Gazmatek et peut etre reutilisee comme source pour les autres pages.

