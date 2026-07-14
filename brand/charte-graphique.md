# Charte graphique — ProBikeStock
**Version 2.0 — OFFICIELLE**, extraite du PDF « Base de communication ProBikeStock ».
> Fichier de référence de la routine « La sortie de la semaine ». À chaque run, je lis cette charte
> + `brand/tokens.css` (qui embarque les polices officielles) et j'applique cette identité aux visuels.

## 🎯 Règle d'or
**Navy en dominante, lime en signature. Le rouge reste rare (promo/urgence). On ne dilue jamais l'accent.**
Le **bleu (navy) est la couleur phare** : c'est toujours la base. On peut faire varier l'accent pour
rythmer le feed, mais le navy reste constant et le lime demeure la signature.

## 01 — Couleurs
| Rôle | Nom | Hex |
|------|-----|-----|
| Fond principal (dominante) | Navy Profond | `#002843` |
| Panneaux · inserts · cartes | Navy Encre | `#001B2E` |
| **Accent signature · CTA · chiffres** | **Vert Lime** | **`#C6F000`** |
| Titres · texte principal | Blanc | `#FFFFFF` |
| Texte secondaire | Bleu Brume | `#93B5CC` |
| Promo · urgence (à doser) | Rouge Signal | `#E5202B` |

## 02 — Typographie
| Voix | Police | Emploi |
|------|--------|--------|
| **DISPLAY & TEXTE** | **Arial / Helvetica** (grotesque) — **Bold** pour les titres, 400–700 pour le corps | titres, accroches, chiffres géants, sous-titres, corps. Interlignage serré, clair et direct. |
| **LABELS** | **Space Mono** — 700 | kickers, tags, données techniques. Toujours CAPITALES, tracking large. |

> ℹ️ **Note importante :** le PDF *nomme* « Archivo Expanded / Archivo », mais il est **effectivement composé
> en Arial/Helvetica** (police embarquée : *Arimo-Bold*). J'ai donc calé la charte sur **Arial/Helvetica**,
> ce qui correspond au rendu réel du PDF et de tes posts. La police embarquée est **Arimo** (équivalent
> open-source métrique-compatible d'Arial), **auto-hébergée** dans `brand/assets/fonts/` avec Space Mono.
> Si tu veux réellement passer à Archivo, dis-le et je bascule. Mise en avant : **un seul mot** du titre en lime.

## 03 — Logo & signature
- **Badge « P »** rond (blanc à P navy sur fond foncé / navy à P sur fond blanc) + wordmark **PRO BIKE STOCK**.
- Sous-titre catégorie en **Space Mono** sous le nom (ex. `TOUR DE FRANCE 2026`, `MATÉRIEL DES PROS`).
- **Toujours** accompagné du handle **`@probikestock`**.
- 👉 Le badge en CSS est une reconstitution : dépose le **SVG officiel** dans `brand/assets/logo/`.

## 04 — Éléments graphiques (la boîte à outils)
- **Pastilles & tags** : `NOUVEAU` (lime/navy), `PROMO −40%` (rouge/blanc), `ARRIVAGE`, `STOCK LIMITÉ` (contour). → `.pbs-tag`
- **Ruban coupé** à coin biseauté (lime) : `ROUTE · CARBONE`. → `.pbs-ribbon`
- **Flèche** `→` lime qui pointe l'action. → `.pbs-arrow`
- **Cartes chiffres** (insert navy encre) : `−40% SUR LE STOCK`, `4,9★ 2300 AVIS`. → `.pbs-numcard`
- **Liste ✓ & citation** (bord lime + attribution mono). → `.pbs-checks` / `.pbs-quote`
- **Badge VS** rond lime pour les comparatifs. → `.pbs-vs`
- **Filigrane « P »** géant, très discret, en bas-droite. → `.pbs-watermark`

## 05 — Ton & voix
**3 règles :** On tutoie, toujours · On va droit au bénéfice · Une idée par visuel, pas trois.
**Exemples :** « Le carbone des pros. » (court, factuel, désirable) · « Repéré. Ajouté. Livré. » (rythme 3 temps pour les reels).

## 06 — Do & Don't
| ✓ À faire | ✕ À éviter |
|-----------|-----------|
| Grosse accroche, une seule idée | Trois messages sur un visuel |
| Lime pour l'accent, jamais pour tout | Petit texte illisible en story |
| Produit détouré net sur navy | Dégradés, ombres portées lourdes |
| Marges généreuses, respiration | Rouge partout : il perd son sens |

## 07 — Formats & templates
Gabarits à taille réelle d'export ; deux mises en page par usage.
- **Feed carré 1080×1080** (`.pbs-1x1`) — F1 Nouvel arrivage (packshot + prix) · F2 Comparatif (VS) · F3 Avis client (preuve sociale) · F4 Conseil/Éditorial (renvoi article).
- **Feed portrait 1080×1350** (`.pbs-4x5`) · **Story/Reel 1080×1920** (`.pbs-9x16`).

## 08 — Composants (code dans `tokens.css`)
`.pbs-canvas` (+ `.pbs-1x1/4x5/9x16`) · `.pbs-bg` · `.pbs-watermark` · `.pbs-head`/`.pbs-badge`/`.pbs-word`/`.pbs-page` ·
`.pbs-kicker` · `.pbs-h1` (`.a`=mot accent) · `.pbs-lede` · `.pbs-stat` · `.pbs-tag(--lime/--promo/--ghost)` ·
`.pbs-ribbon` · `.pbs-arrow` · `.pbs-checks` · `.pbs-numcard` · `.pbs-card(--win)` · `.pbs-quote` · `.pbs-vs` ·
`.pbs-product` · `.pbs-price` · `.pbs-cta(--solid/--ghost)` · `.pbs-chips`/`.pbs-chip(--on)` · `.pbs-foot`.

## 09 — À compléter
- [ ] **Logo SVG officiel** (clair + blanc) → `brand/assets/logo/`
- [ ] **Photos produit détourées** → `brand/assets/photos/` (pour « produit net sur navy »)
- [ ] Débloquer `probikestock.com` côté environnement (actuellement bloqué par la politique réseau)
      pour extraire produits/prix/promos automatiquement.
