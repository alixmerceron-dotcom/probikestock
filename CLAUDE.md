# Routine « La sortie de la semaine » — ProBikeStock

## 🎯 Mission de la routine (à chaque exécution planifiée)
Veille commerciale **hebdomadaire** sur les nouveautés matériel du **cyclisme sur route**, et
production d'un **COMPTE RENDU INFORMATIONNEL DÉTAILLÉ**. **Aucune création de visuel.**
Le visuel est réalisé ensuite par l'utilisateur dans **Claude Design**, à partir de ce compte rendu.

> ⚠️ Changement de stratégie (14/07/2026) : ne plus générer de visuels ici (images, HTML, PNG, vidéos).
> Le rôle est **uniquement informationnel**. Le livrable est un fichier Markdown structuré, exportable
> tel quel vers Claude Design.

## 📋 Étapes à suivre à chaque run
1. **Veille web** : chercher les nouveautés de la **semaine écoulée** — vélos, composants, roues,
   pneus, technologies — chez les grandes marques (Specialized, Trek, Canyon, Colnago, Cervélo,
   Pinarello, Giant, Look, Scott, BMC, etc.) et les équipes pros.
2. **Sélectionner LA nouveauté la plus significative** (innovation, gain de performance, impact marché).
3. **Rédiger le compte rendu** en suivant `content/TEMPLATE-compte-rendu.md` — **toutes** les
   caractéristiques et détails (specs complètes, prix, dispo, sources).
4. **Sauvegarder** dans `content/sortie-de-la-semaine/AAAA-MM-JJ/compte-rendu.md`.
5. **Commit + push** sur la branche de travail (`git push -u origin <branche>`).
6. **Notifier** l'utilisateur (PushNotification) avec un résumé dans des balises `<routine_summary>`.
7. Si **rien de notable** cette semaine : le dire brièvement dans le compte rendu et la notification.

## ✅ À faire / ❌ à ne pas faire
- ✅ Compte rendu exhaustif, factuel, chiffré, **toujours sourcé** (liens officiels + presse).
- ✅ Inclure une section « Pour Claude Design » : angle éditorial, accroche, chiffres à mettre en
  avant, légendes prêtes, format conseillé — pour faciliter la création du visuel côté utilisateur.
- ❌ **Ne pas** générer d'images / HTML / PNG / vidéos, ni utiliser Higgsfield.
- ❌ Ne pas réutiliser de photos presse/marques (droits d'auteur) dans un livrable.

## 🎨 Charte (référence, pour info)
Le dossier `brand/` contient la charte graphique officielle (couleurs, typo Archivo + Space Mono,
logo, composants). Elle sert de **référence pour Claude Design** — ne pas produire de visuel ici.
- Navy `#002843` (dominante) · Lime `#C6F000` (signature) · Rouge `#E5202B` (rare) · Archivo + Space Mono.
- Signature imposée : `by probikestock` / `@probikestock`. Bandeau récurrent : « La sortie de la semaine ».

## 🔒 Limites connues de l'environnement
- `probikestock.com` et les hébergeurs d'images/CDN sont **bloqués** par la politique réseau : pas
  de crawl du site ni de téléchargement de photos produit. La veille se fait via recherche web + presse.
