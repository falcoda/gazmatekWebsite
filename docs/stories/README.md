# Conventions stories

## Regles

- Toujours partir de :
  - `docs/asset-inventory-old-website.md`
  - `docs/content-audit-old-website.md`
  - `docs/old-site-walkthrough.md`
  - `docs/design-system-foundations.md`
- Les assets frontend ne viennent jamais directement de `old-website-assets` au runtime
- Les destinations sont :
  - `frontend/src/assets/svg`
  - `frontend/src/assets/img`
  - `frontend/src/assets/fonts`
- Le contenu long vit dans `frontend/src/content/*`
- Les labels UI vivent dans `frontend/src/i18n/translations/*.json`

## Intention

Les epics doivent permettre d’implementer vite, sans redecider :

- les sources
- les routes
- la destination des assets
- la separation contenu / traduction
- les compromis legacy a conserver ou moderniser
- la palette, la typo et la motion a figer
