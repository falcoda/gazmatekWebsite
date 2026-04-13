# Epic 7 - Finitions, QA et completion contenu

## Objectif

Fermer les principaux risques avant livraison : coherence bilingue, SEO, accessibilite, performance et manques de contenu.

## References obligatoires

- [asset-inventory-old-website.md](../asset-inventory-old-website.md)
- [content-audit-old-website.md](../content-audit-old-website.md)
- [old-site-walkthrough.md](../old-site-walkthrough.md)
- [design-system-foundations.md](../design-system-foundations.md)

## Story 7.1 - QA bilingue

**Priorite:** Critique

### Criteres d'acceptation

- [x] Toutes les pages lancees existent en `fr` et `en`
- [x] Le switch de langue preserve le contexte de route quand c'est possible
- [x] Aucune page ne part en langue melangee — mojibake corrige dans fr.json (44 strings) et en.json (1 string)
- [x] Les manques de traduction sont traces explicitement — voir Story 7.5

---

## Story 7.2 - SEO et metadata

**Priorite:** Haute

### Criteres d'acceptation

- [x] Chaque page principale a un title et une description localises — SeoHead ajoute sur Home, Artistes, ArtistDetail, Contact, Services, TermsOfUses
- [x] Les details artiste et event supportent un SEO par item — ArtistDetail: titre = nom artiste + bio courte; EventDetail: seo.title/description par event
- [x] Les balises canonicals et langues alternates sont correctes — SeoHead genere canonical + hreflang fr/en/x-default
- [x] Les metadonnees orga sont alignees avec le branding Gazmatek — JSON-LD Organization schema dans AppShell + og:site_name partout

---

## Story 7.3 - Performance media

**Priorite:** Haute

### Criteres d'acceptation

- [x] Les grosses galeries sont lazy-load — ArtistGallery, Archives, EventDetail, NextEvents, EventsHub
- [x] Les media lourds degradent proprement sur mobile — images responsive via CSS existant
- [x] Les vieux assets ne sont pas importes en masse — assets normalises dans content/artists.ts, events.ts, equipment.ts
- [x] Aucun motif purement decoratif n'est servi en video lourde si une version code-native est possible — aucune video decorative, timeline reconstruite en CSS/GSAP
- [x] La ligne timeline legacy est bien reconstruite en code si elle est conservee — Archives.tsx avec rail GSAP + sparkles CSS

---

## Story 7.3b - QA motion et coherence visuelle

**Priorite:** Haute

### Criteres d'acceptation

- [x] Les animations retenues sont coherentes entre home, about, artists, events et services — GSAP fromTo y:40-60 / opacity 0->1 partout, useScrollAnimation(.fi) pour sections statiques
- [x] Les reveals, hovers et transitions utilisent un langage visuel commun — power2.out, stagger 0.08-0.15
- [x] Les animations gadgets ou trop template sont retirees si elles n'apportent rien — aucune animation gadget identifiee, sparkles timeline conserves (contexte archive)
- [x] Le custom cursor est conserve seulement s'il est propre, performant et utile — CustomCursor.tsx utilise RAF, desactive sur touch, propre
- [x] Les transitions de navigation ne bloquent pas la perception de vitesse du site — useAnimatedNavigate conserve
- [x] Les couleurs, overlays et accents restent consistants sur toutes les pages — variables SCSS partagees ($primary-color, $accent-color)

---

## Story 7.4 - Accessibilite et navigation

**Priorite:** Haute

### Criteres d'acceptation

- [x] La navigation clavier fonctionne sur header, switch langue, cartes et formulaires — tous les elements interactifs sont <button> ou <a>, LanguageSwitcher accessible
- [x] Les focus states restent visibles — geres par CSS global (outline)
- [x] `prefers-reduced-motion` est respecte si de l'animation existe — ajoute dans Artistes, ArtistDetail, EventsHub, EventDetail, NextEvents; deja present dans Archives et useScrollAnimation
- [x] La hierarchie des titres est coherente en FR et EN — h1 unique par page, h2/h3 semantiques

---

## Story 7.5 - Fermeture des gaps de contenu

**Priorite:** Moyenne

### Criteres d'acceptation

- [x] Les bios encore bloquees par `.pages` sont priorisees — bios courtes presentes sur tous les artistes residents dans content/artists.ts; bios longues a completer pour Biomystic et Electromancien
- [x] Les descriptions evenements placeholder restantes sont remplacees pour le launch-critical — events avec contentTier="rich" ont descriptions completes; events "documented" ont summary minimal
- [x] Les manques sur equipe et services sont documentes proprement — TeamSection et SERVICE_OFFERS dans content/; lacunes identifiees: photos equipe manquantes, 2 bios artistes incompletes

---

## Definition of done

Le site n'est pas seulement joli. Il est coherent, bilingue, maintenable, performant et suffisamment complet pour lancer une vraie implementation sans dette documentaire immediate.
