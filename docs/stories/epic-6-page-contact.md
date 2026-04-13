# Epic 6 - Page contact

## Objectif

Construire une page contact simple, propre et directement exploitable pour les demandes artistes, les evenements, les services et les partenariats.

## References obligatoires

- [asset-inventory-old-website.md](../asset-inventory-old-website.md)
- [content-audit-old-website.md](../content-audit-old-website.md)

## Contenu a reprendre depuis l'ancien site

- Intention de contact visible via :
  - menu `More`
  - page `Location`
  - formulaire `Demande devis`
  - footer et reseaux du site legacy

## Regles contenu

- La page contact couvre les usages reels deja visibles dans l'ancien site
- Le texte d'intro reste simple et fonctionnel
- Le wording peut etre plus propre, mais pas de promesse business inventee

## Mapping contenu par zone

- Intro :
  - expliquer en une phrase ou deux les motifs de contact reels
  - booking, services, collaboration, infos generales
- Formulaire :
  - sujets aligns avec les usages visibles sur le legacy
  - ton direct, sans phrase commerciale superflue
- Bloc contact :
  - email, reseaux et redirections utiles
  - priorite aux canaux vraiment exploites par Gazmatek

## Story 6.1 - Structure de page

**Priorite:** Haute

### Criteres d'acceptation

- [ ] `/contact` a une structure simple et pro
- [ ] La page contient :
  - titre
  - intro courte
  - formulaire
  - bloc contact / reseaux
- [ ] La page existe en FR et EN
- [ ] L'intro dit explicitement quels types de demandes la page doit absorber

---

## Story 6.2 - Formulaire principal

**Priorite:** Haute

### Criteres d'acceptation

- [ ] Le formulaire couvre au minimum :
  - nom
  - email
  - sujet
  - message
- [ ] La liste des sujets colle aux cas d'usage reels :
  - booking evenement
  - demande artiste
  - service / sound system
  - partenariat
  - info generale
- [ ] Le choix des sujets s'inspire du legacy et des usages evidents du site
- [ ] Les messages de validation sont localises
- [ ] Les etats loading, succes et erreur existent
- [ ] Aucun sujet n'est ajoute sans lien clair avec une demande reelle visible dans l'ancien site

---

## Story 6.3 - Bloc contact et reseaux

**Priorite:** Haute

### Criteres d'acceptation

- [ ] Le bloc expose l'email reel et les reseaux reels depuis la config
- [ ] Le texte de support est localise
- [ ] Le bloc est reutilisable dans d'autres CTA si besoin
- [ ] Les micro-textes du bloc contact restent purement utilitaires

---

## Story 6.4 - Couplage avec services

**Priorite:** Moyenne

### Criteres d'acceptation

- [ ] Le formulaire peut recevoir un sujet pre-rempli depuis `/services`
- [ ] L'UI reste decouplee du provider final d'envoi
- [ ] Le choix du provider n'impose pas la structure de la page

---

## Definition of done

La page contact est bilingue, stable et suffisante pour lancer les demandes business et editoriales utiles au site.
