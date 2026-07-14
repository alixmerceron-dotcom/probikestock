# Charte graphique — ProBikeStock
**Version 1.0 — extraite des carrousels Instagram officiels (juillet 2026).**
> Fichier de référence de la routine « La sortie de la semaine ». À chaque run, je lis cette
> charte + `brand/tokens.css` et j'applique cette identité aux visuels.
> ⚠️ Le site `probikestock.com` n'a pas pu être analysé (bloqué par la politique réseau de la
> session — voir § 10). Charte reconstituée à partir des visuels fournis. À confirmer/compléter.

---

## 1. Essence de marque
Boutique / média spécialisé cycliste route haut de gamme, format **éditorial « le guide »** :
on explique la tech du peloton et on vend les pièces. Ton **expert mais accessible**, factuel,
chiffré, avec une pointe d'attitude (« Plus court, plus fort. »). Toujours honnête (« un point de
départ, pas une vérité »).

- Signature imposée : **`by probikestock`** / handle **`@probikestock`** / site **`probikestock.com`**
- Univers : sombre, photographique, contrasté, premium-sportif.

## 2. Système d'accent thématique  ⭐ (clé de la charte)
La marque n'a **pas une seule couleur d'accent** : elle en choisit une **selon le sujet**, avec
une base photo assortie et **une typo de titre différente**.

| Thème | Accent | Base / fond | Typo titre | Sujets |
|-------|--------|-------------|------------|--------|
| **LIME** (défaut) | `#A8D400` vert hi-vis | bleu nuit `#0E2334` | **sans lourd** (Inter/Helvetica 800) | race, transmission, tech, comparatifs, promos |
| **OR** | `#C9A45A` or chaud | brun espresso `#221A13` | **serif éditorial** (Playfair) | guides, réglage/position, contenu « premium/heritage » |

→ classes prêtes : `.pbs-theme-lime` / `.pbs-theme-gold` dans `tokens.css`.

## 3. Palette complète (hex)
| Rôle | Hex |
|------|-----|
| Noir de base | `#0C0D0F` |
| Base bleu nuit (thème lime) | `#0E2334` |
| Base espresso (thème or) | `#221A13` |
| Accent lime | `#A8D400` |
| Accent or | `#C9A45A` |
| Blanc | `#FFFFFF` |
| Texte courant (blanc cassé) | `#ECEDEE` |
| Labels/footer atténués | `#9A9C9E` |
| Rouge PROMO | `#E23A2C` |
| Carte sombre (translucide) | `rgba(255,255,255,.06)` + bord `rgba(255,255,255,.16)` |
| Carte produit | fond `#FFFFFF`, texte `#14161A`, ancien prix barré `#9AA0A6` |

## 4. Typographies
- **Titres serif** (thème or) : type **Playfair Display** (haute-contraste, éditorial). Fallback `Georgia, serif`.
- **Titres sans / textes** (thème lime + tout le corps) : type **Inter / Helvetica Neue** 400–800. Fallback `Arial`.
- **Labels / eyebrows / footer / chips / pagination** : **monospace** type **Space Mono**, MAJUSCULES, interlettrage large (`.2–.28em`). Fallback `"Courier New", monospace`.
- Mise en avant : **un seul mot** du titre passe en couleur d'accent (« ...**court**... », « ...**vraiment ?** »).

> 📌 Pour un rendu 100 % fidèle, dépose les vrais fichiers de police dans `brand/assets/fonts/`
> (Playfair Display, Inter, Space Mono ou tes polices officielles) — les `@font-face` sont déjà
> préparés (commentés) en haut de `tokens.css`.

## 5. Logo & en-tête
- **Marque `P`** : rond blanc, « P » noir bold, à gauche.
- **Wordmark** : `PRO BIKE STOCK` en sans bold blanc.
- **Sous-titre catégorie** sous le wordmark, en **monospace** espacé : ex. `MANIVELLES · LE GUIDE`,
  `SHIMANO · TRANSMISSION` → toujours `THÉMATIQUE · RUBRIQUE`.
- **Pagination** en haut à droite : pastille bordée `1/3`, `4/4` (monospace).

## 6. Grille & format
- **Format carrousel par défaut : 1080 × 1350 (4:5)**. Un fichier = une slide, à taille d'export.
- Marges : ~60 px. Contenu **aligné à gauche**.
- Rythme vertical : `en-tête → eyebrow → titre → corps/composants → (espace) → footer`.
- Fond : **photo plein cadre** + dégradé sombre bas (lisibilité) + color-grade selon le thème.

## 7. Structure d'un carrousel
1. **Slide 1 — accroche** : eyebrow rubrique (`LE GUIDE PBS`, `LE COMPARATIF`), gros titre-accroche
   (1 mot en accent), 1–2 phrases de teaser, éventuel sélecteur de chips, `SWIPE →`.
2. **Slides intermédiaires — contenu** : gros chiffre-stat, `POURQUOI ÇA MARCHE` (label souligné),
   listes à flèches `→`, barres de comparaison, blocs comparatifs, callout à bord accent.
3. **Dernière slide — verdict + shop** : `LE VERDICT`, cartes comparatives (la « gagnante » a un bord
   accent), section `LES PIÈCES DU RACE · EN PROMO`, cartes produit + CTA `— lien en bio →`.

## 8. Composants (voir `tokens.css` pour le code)
| Composant | Classe | Notes |
|-----------|--------|-------|
| Eyebrow / rubrique | `.pbs-eyebrow` | mono, accent, espacé |
| Label de section | `.pbs-label` | mono accent, souligné 2px |
| Titre | `.pbs-h1` (+ `.a` sur le mot accent) | serif ou sans selon thème |
| Chapô | `.pbs-lede` | |
| Gros chiffre | `.pbs-stat` (`<u>` = unité) | ex. `165mm`, `−278g` |
| Liste à flèches | `.pbs-list` | puce `→` en accent |
| Barres comparatives | `.pbs-bars` / `.pbs-bar` (`--muted`) | data-viz horizontale |
| Callout / citation | `.pbs-callout` | bord gauche accent |
| Carte / comparatif | `.pbs-card` (`--win`) | bord accent = « gagnant » |
| Carte produit | `.pbs-product` + `.pbs-badge` | blanc, `PROMO` rouge, prix accent, ancien prix barré |
| Bouton CTA | `.pbs-cta` (`--ghost` / `--solid`) | « lien en bio → » |
| Chips / sélecteur | `.pbs-chips` / `.pbs-chip` (`--on`) | ex. `150 · 165 · 170 mm` |
| Footer | `.pbs-foot` | gauche = action/handle accent, droite = url/handle atténué |

## 9. Règles rapides (do / don't)
- ✅ 1 accent par carrousel, cohérent sur toutes les slides.
- ✅ Un seul mot du titre coloré. Chiffres clés en accent dans le corps.
- ✅ Toujours logo + sous-titre catégorie + pagination + footer.
- ✅ Toujours créditer la source d'un chiffre / d'une actu.
- ❌ Pas de mélange lime + or sur la même slide.
- ❌ Pas de fond clair sur les slides éditoriales (produits exceptés = cartes blanches).

## 10. À compléter (idéalement)
- [ ] Vraies polices officielles → `brand/assets/fonts/`
- [ ] Logo vectoriel officiel (SVG clair + blanc) → `brand/assets/logo/`
- [ ] Photos produit/ambiance officielles → `brand/assets/photos/`
- [ ] Confirmer les hex exacts (les valeurs ci-dessus sont calées à l'œil sur tes visuels).
- [ ] **Débloquer `probikestock.com`** pour la routine (réglage réseau de l'environnement) afin
      que je puisse en extraire couleurs/produits/promos automatiquement — ou colle-moi ici les infos.
