# ProBikeStock — Contexte entreprise (pour assistant de code)

> À placer à la racine de ton projet VS Code sous le nom **`CLAUDE.md`** (Claude Code) ou
> **`.github/copilot-instructions.md`** (GitHub Copilot). L'assistant le lit automatiquement à chaque session.
> Généré le 25/09/2026 à partir de la boutique Shopify et du dépôt `alixmerceron-dotcom/probikestock`.
> Les points marqués *(déduit)* sont des interprétations à confirmer.

---

## 1. Identité
| Élément | Valeur |
|---|---|
| Nom | **ProBikeStock** (écrit aussi « Probikestock », wordmark `PRO BIKE STOCK`) |
| Activité | E-commerce de **matériel de cyclisme sur route haut de gamme** : composants, cockpits, roues, cadres, accessoires |
| Site | https://probikestock.com (boutique **Shopify**, plan **Basic**) |
| Pays / devise / fuseau | France · **EUR** · Europe/Paris (CEST) |
| Contact boutique | probikestock@outlook.fr |
| Réseaux | Handle **`@probikestock`** (Instagram / réseaux sociaux) |
| Langue client | **Français**, tutoiement systématique |

## 2. Positionnement
- **Le « matériel des pros »** : une large part du catalogue vient ou relève de l'univers des équipes
  WorldTour françaises. Exemples : cadres Lapierre **Xelius SL / Aircode DRS FDJ Suez**, casque et couvre-chaussures
  **Van Rysel AG2R Décathlon**, pièces de cockpit Lapierre spécifiques, Gobik « Édition World Tour ».
- Proposition de valeur *(déduit du catalogue et de la charte)* : **du matériel pro, neuf ou d'occasion, à prix
  réduit** (« −40 % sur le stock », « Arrivage », « Stock limité »). Les stocks sont souvent en **pièces uniques ou
  petites quantités** : beaucoup de références passent à 0.
- Preuve sociale affichée dans la charte : **4,9★ / 2 300 avis** (chiffre de communication, à revérifier avant réutilisation).
- Cible : cyclistes route passionnés et compétiteurs, triathlètes / contre-la-montre, quelques produits gravel.

## 3. Catalogue (état au 25/09/2026)
Environ **105 produits actifs**, organisés en **collections automatiques pilotées par tags**.

### Collections (rayons)
| Collection | Handle | Règle (tag) | Nb produits |
|---|---|---|---|
| Périphériques (cockpit) | `peripheriques` | `rayon-cockpit` | 35 |
| Accessoires et entretien | `accessoires-et-entretien` | `rayon-accessoires` | 21 |
| Transmission | `transmission` | `rayon-transmission` | 15 |
| Roues et pneus | `roues-et-pneus` | `rayon-roues` | 14 |
| Freinage | `freinage` | `rayon-freinage` | 8 |
| Équipement du cycliste | `equipement-du-cycliste` | `rayon-equipement` | 8 |
| Cadres et vélos | `cadres-et-velos` | `rayon-cadres` | 4 |
| **Produits à la une** | `selection` | `vitrine-selection` **ET** stock > 0 | 6 |
| **Promotions** | `promotions` | `vitrine-promotion` **ET** stock > 0 | 7 |

### Convention de tags (à respecter dans tout code/script)
- `rayon-<nom>` → range le produit dans son rayon (un seul rayon par produit en principe).
- `vitrine-selection` → mise en avant page d'accueil (visible seulement si stock > 0).
- `vitrine-promotion` → collection Promotions (visible seulement si stock > 0).
- `etat-occasion` → produit **d'occasion**. Absence du tag = produit **neuf**.

### Convention SKU
Format `FAMILLE.NNN.VV` en majuscules (ex. `CASS.003.01`, `CADR.001.02`, `COCK.002.01`, `ROUE.001.01.P`) :
préfixe 4 lettres de la famille, numéro de modèle, numéro de variante. Un bundle peut concaténer deux SKU
(`ROUE.001.01.P, CASS.003.01` = roues + cassette).

### Marques principales (par nombre de références)
Shimano (≈ 28, surtout **Dura-Ace R9200 12v**, Di2, pièces détachées) · **Lapierre** (≈ 19 : cadres, cockpits,
capots, entretoises) · **Elite** (≈ 11 : home-trainers, bidons, accessoires) · Look · Continental · Lazer · K-Edge ·
Vision · Van Rysel · Specialized/Roval · Prologo · Gobik · Zéfal · Michelin · FSA · CeramicSpeed · Colnago · EKOI · Supacaz.

### Fourchettes de prix
De ~4 € (entretoises, cales) à ~2 350 € (kit cadre Xelius SL). Cœur de gamme : 30–900 €
(cockpits 350–550 €, roues carbone 640–1 850 €, pédaliers 220–800 €).

### Types de produits (`productType`)
Cassette, Pédalier, Plateau, Boîtier de pédalier, Dérailleur, Levier, Étrier de frein, Disque de frein,
Plaquettes de frein, Roue, Pneu, Pièce de moyeu, Cockpit, Cintre, Potence, Entretoise, Capot, Contre-la-montre,
Support de compteur, Ruban de cintre, Selle, Tige de selle, Cadre, Casque, Couvre-chaussures, Lunettes, Cales,
Home-trainer, Accessoire home-trainer, Bidon, Pompe, Entretien, Protection, Nutrition, Accessoire, Pièce électronique.

### Variantes
Les options courantes : taille (XS/S/M, 165/170/172,5 mm), largeur × longueur de cockpit (`38cm / 90mm`),
développement (`11-30`, `52-36`), version avec/sans cassette. Stock géré **par variante**.

## 4. Identité visuelle (charte officielle V2.0)
**Règle d'or : navy en dominante, lime en signature, rouge rare. On ne dilue jamais l'accent.**

| Rôle | Nom | Hex | Variable CSS |
|---|---|---|---|
| Fond principal | Navy Profond | `#002843` | `--pbs-navy` |
| Panneaux / cartes | Navy Encre | `#001B2E` | `--pbs-ink` |
| Accent, CTA, chiffres | Vert Lime | `#C6F000` | `--pbs-lime` |
| Texte principal | Blanc | `#FFFFFF` | `--pbs-white` |
| Texte secondaire | Bleu Brume | `#93B5CC` | `--pbs-mist` |
| Promo / urgence | Rouge Signal | `#E5202B` | `--pbs-red` |
| Prix barré | — | `#5C7C93` | `--pbs-strike` |

- **Typo** : **Archivo** (titres en Black 900, texte 400–700, largeur normale, jamais « Expanded ») +
  **Space Mono** 700 pour les labels, toujours en CAPITALES avec un tracking large.
- **Logo** : badge rond « P » (blanc sur navy / navy sur blanc) + wordmark `PRO BIKE STOCK`, toujours avec `@probikestock`.
- **Rayons** : cartes 20 px, pilules 999 px, tags 8 px.
- **Composants** : tags `NOUVEAU` (lime), `PROMO −40%` (rouge), `ARRIVAGE`, `STOCK LIMITÉ` (contour),
  ruban biseauté lime, flèche `→` lime, cartes chiffres, badge VS, filigrane « P ».
- Mise en avant : **un seul mot** du titre en lime. Pas de dégradés criards ni d'ombres lourdes.
- Fichiers de référence (dépôt `probikestock`) : `brand/tokens.css` (variables + classes `.pbs-*`),
  `brand/charte-graphique.md`, `brand/assets/logo/*.svg`, `brand/assets/fonts/*.woff2` (polices auto-hébergées).

## 5. Ton et voix
- **Tutoiement toujours.** Direct, orienté bénéfice, phrases courtes.
- **Une idée par message / visuel.**
- Exemples de marque : « Le carbone des pros. » · « Repéré. Ajouté. Livré. » (rythme en 3 temps).
- Vocabulaire technique cycliste exact (12v, Di2, tubeless, boyau, UDH, flat-mount, BB86…) : ne pas simplifier à tort.

## 6. Outils et stack existants
- **Shopify** (Admin API / GraphQL) : catalogue, stock, commandes, collections, remises.
- **Dépôt GitHub** `alixmerceron-dotcom/probikestock` : charte (`brand/`) + routine hebdomadaire
  **« La sortie de la semaine »** (veille des nouveautés route, compte rendu Markdown dans
  `content/sortie-de-la-semaine/AAAA-MM-JJ/compte-rendu.md`, modèle `content/TEMPLATE-compte-rendu.md`).
- **Claude Design** : création des visuels réseaux sociaux à partir des comptes rendus.
- Autres connecteurs en usage : Meta Ads, Instagram, Strava, Gmail, Google Drive/Calendar.
- Formats réseaux : carré 1080×1080, portrait 1080×1350, story/reel 1080×1920.

## 7. Règles pour l'assistant de code
1. **Langue** : interface, textes et commentaires en **français** ; identifiants de code en anglais acceptés.
2. **Prix en EUR** avec virgule décimale et espace insécable pour les milliers (`2 350,00 €`), TVA incluse.
3. **Respecter la convention de tags et de SKU** ci-dessus ; ne jamais inventer un nouveau préfixe de tag sans le signaler.
4. **Charte** : réutiliser les variables `--pbs-*` plutôt que des couleurs en dur ; le navy reste le fond.
5. **Stock faible et pièces uniques** : tout affichage doit gérer proprement le stock 0 (rupture), 1 (dernière pièce)
   et les variantes épuisées.
6. **Neuf / occasion** : toujours distinguer visuellement un produit `etat-occasion`.
7. **Sécurité** : ne jamais committer de token Shopify / Meta / clé API ; utiliser un fichier `.env` ignoré par git.
8. **Images** : pas de photos presse ou de marques tierces sans droits ; utiliser les médias de la boutique Shopify.
9. En cas de doute sur une info métier (prix, politique de retour, livraison) : **demander**, ne pas inventer.

## 8. Informations manquantes (à compléter par toi)
- [ ] Statut juridique, SIRET, adresse, date de création
- [ ] Origine exacte du stock (partenariats équipes ? rachat de surplus ?) et part du neuf/occasion
- [ ] Politique de livraison (transporteurs, délais, frais, franco) et de retour
- [ ] Moyens de paiement, CGV
- [ ] Objectif du projet VS Code (site custom, outil interne, app, scripts d'automatisation…)
- [ ] Chiffres clés (CA, panier moyen, nombre de commandes) si utiles au projet
