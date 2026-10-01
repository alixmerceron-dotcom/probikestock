# Routine quotidienne — Radar matériel des équipes pro

> Prompt exécuté chaque jour par la routine planifiée. Livrable **100 % interne** :
> jamais publié, jamais de visuel. Règles refondues le 28/09/2026 : moins de bruit,
> uniquement ce qui peut mener à un rachat de matériel.

---

## 1. Mission

Détecter le plus tôt possible les signaux qui annoncent qu'une équipe pro (WorldTour,
ProTeam, Continentale de haut niveau, équipes féminines de même niveau) va se séparer de
son matériel. **Trois familles seulement :**

| Famille | Ce qu'on cherche |
|---|---|
| **1. Changement de matériel** | Rumeur ou annonce qu'une équipe change de marque de vélo, de groupe ou de roues pour la **saison suivante (2027) ou après**. Les rumeurs sont la priorité : c'est là qu'on a de l'avance. |
| **2. Fermeture d'équipe** | Fermeture annoncée, fusion qui fait disparaître une structure, ou menace de fermeture **explicitement évoquée** par une source (dirigeant, journaliste). |
| **3. Vente de matériel** | Vente de stock, vente privée, « stock sale », « stockverkoop », matériel d'équipe mis en vente (site, réseaux, revendeur). **Toujours extraire : date, lieu, lien, matériel concerné.** |

### Hors périmètre (ne pas chercher, ne pas écrire)
- Relégations, promotions, classement UCI, licences.
- Santé financière et sponsors-titres, **sauf** si une source évoque explicitement la
  disparition de l'équipe (→ famille 2).
- Nouveaux modèles des marques et déstockage de l'ancienne génération.
- Transferts de coureurs ou de staff, résultats, dopage.
- **Tout ce qui est déjà en place** : un changement effectif pour la saison en cours, ou
  annoncé il y a plus de 6 mois sans élément nouveau, n'est pas une info.
  Exemple : Ineos passé aux roues Scope en 2026 → hors radar.

---

## 2. Fichier d'état : `dossiers.json`

Une entrée par dossier (champs : `id`, `equipe`, `division`, `famille`, `resume`,
`materiel`, `confiance`, `premiere_detection`, `dernier_changement`, `sources`,
`vente` {date, lieu, lien} si connue, `contact_public` si connu, `statut`
actif/confirmé/infirmé/clos).

- Lire le fichier en entier **avant** toute recherche (dédoublonnage).
- `resume` = état actuel en 2-3 phrases, **réécrit** quand il change. Ne jamais y
  empiler des « RAS le JJ/MM » : si rien ne bouge, ne touche à rien.
- Un dossier infirmé ou dont le changement est devenu effectif passe en `clos`.
- `archive/` contient l'ancien tracker (avant refonte). Ne pas le lire à chaque run.

---

## 3. Sources

### Réseaux et forums , à fouiller en profondeur
Au début du run : `pipx install twitter-cli==0.8.5 || pip install twitter-cli==0.8.5` (version figée et vérifiée, ne jamais changer de version sans accord).
- **Twitter/X** : si les variables `TWITTER_AUTH_TOKEN` et `TWITTER_CT0` existent, `twitter search "requête" -n 20`
  (voir `twitter --help`). Ne jamais afficher, écrire ni committer ces valeurs. Si elles sont
  absentes ou refusées : chercher les tweets via WebSearch (`site:x.com {requête}`) et la presse.
  Sans identifiants, cibler aussi par WebSearch (`site:x.com "{nom}" {sujet}`) les journalistes
  de `comptes-a-suivre.md` : Daniel Benson, José Been, Sadhbh O'Shea, Stephen Farrand,
  Ronan Mc Laughlin, et les comptes WielerFlits, Escape Collective, Brújula Bike.
- **Bluesky** (sans compte) :
  `curl -s "https://api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=REQUETE&sort=latest&limit=50"`
  (encoder la requête ; `public.api.bsky.app` renvoie 403, ne pas l'utiliser). Pour un compte
  précis : `curl -s "https://api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=HANDLE&limit=30"`.
  Trouver les handles Bluesky des journalistes ci-dessus et les noter dans `comptes-a-suivre.md`.
- **Reddit** : `curl -s -A "probikestock-radar/1.0" "https://www.reddit.com/r/peloton/search.json?q=REQUETE&restrict_sr=1&sort=new&t=week"`,
  sinon `https://r.jina.ai/<url>`, sinon WebSearch `site:reddit.com`.
  Subreddits : r/peloton, r/cycling, r/Velo, r/bikesgonewild (photos de vélos pros).
- **Forums matériel** : WeightWeenies (fils « pro bikes », « team bikes 2027 »), forums
  FR/NL/ES trouvés en chemin.
- Si un canal échoue (identifiants absents, réseau bloqué) : le noter **une fois** en bas
  du brief avec la raison exacte, puis continuer. Ne jamais contourner un blocage.

**Ce qu'on cherche sur les réseaux :**
- Journalistes et comptes spécialisés qui lâchent une rumeur de changement de vélo, de
  groupe ou de roues (découvrir ces comptes au fil des runs et les lister dans
  `comptes-a-suivre.md`, puis les interroger en priorité).
- Photos de coureurs sur un vélo d'une autre marque, vélos noirs sans logo, stages
  d'hiver, tests de matériel : ce sont les premiers indices d'un changement.
- Posts qui parlent de matériel d'équipe à vendre : vente de stock, vente privée,
  « ex-team bike », annonces de revendeurs qui écoulent un lot d'équipe.

Requêtes types, en FR/EN/NL/ES/IT/DE : `{équipe} bike sponsor 2027`, `new bike sponsor
2027`, `{équipe} nieuwe fietssponsor`, `{équipe} nuevo patrocinador bicicletas`,
`team stock sale bikes`, `stockverkoop wielerploeg`, `vente matériel équipe cycliste`,
`ex team bike for sale 2026`, `{équipe} closing down`, `équipe cycliste disparition 2027`.

### Presse (pour recouper)
Cyclingnews, Escape Collective, Velo, WielerFlits, Sporza, HLN, DirectVelo, Brújula Bike,
Tuttobiciweb, Radsport-News, sites officiels des équipes et des marques.

### Contacts pour la prospection
Pour chaque dossier en famille 2 ou 3, noter dans `contact_public` le canal que l'équipe
publie elle-même : adresse du service course, page ou e-mail de contact officiel, nom et
fonction d'une personne **annoncée publiquement** (manager, responsable logistique ou
matériel) avec sa page LinkedIn si elle existe.
**Interdit** : chercher, relever ou stocker des e-mails ou numéros personnels, des
données issues de fuites, de bases piratées ou de sites d'« annuaires » qui les
agrègent. Si une coordonnée personnelle apparaît par hasard, ne pas la recopier.

---

## 4. Confiance et pertinence

**Confiance** (obligatoire, datée) :
- **A** : annonce officielle ou presse majeure citant une source officielle nommée.
- **B** : deux sources indépendantes identifiées qui convergent.
- **C** : une seule source sérieuse identifiable (journaliste, média).
- **D** : tweet isolé, forum, photo sans contexte. Plausible, à surveiller.

C et D toujours au conditionnel. Ne jamais inventer une source.

**Pertinence** (sert à classer, 1 à 3 étoiles) :
- ★★★ : vente datée à venir, ou rumeur **nouvelle** (moins de 7 jours) sur une équipe
  WorldTour/ProTeam, ou matériel au cœur du catalogue (Shimano Dura-Ace, roues carbone).
- ★★ : rumeur qui monte en confiance, fermeture sans date de vente connue.
- ★ : Continentale, matériel peu recherché, signal D isolé.

---

## 5. Étapes

1. Installer twitter-cli (§3).
2. Lire `dossiers.json`, `comptes-a-suivre.md` et `signaux-manuels.md`.
3. Traiter `signaux-manuels.md` (sourcer, recouper), puis archiver les entrées dans
   `signaux-manuels-archive.md`.
4. Fouiller Twitter/X, Bluesky, Reddit et les forums (§3), puis recouper chaque piste dans la presse.
5. Vérifier les dossiers actifs : ne retenir que ce qui a **changé**.
6. Mettre à jour `dossiers.json` et `comptes-a-suivre.md`.
7. Écrire `content/veille-business-quotidienne/AAAA-MM-JJ/brief.md` avec
   `TEMPLATE-brief-quotidien.md`.
8. Commit et push sur la branche de travail.
9. Afficher le brief complet dans la réponse finale.
10. PushNotification (moins de 200 caractères) **seulement s'il y a du nouveau** :
    rumeur nouvelle, changement de confiance, vente datée. Sinon, pas de notification.

---

## 6. Règles du brief

- Lisible en 2 minutes. Seulement ce qui est **nouveau ou a changé** depuis le dernier run.
- Chaque ligne : équipe, info, confiance, pertinence, date de l'info, source (lien).
- Les dossiers sans changement tiennent en **une ligne** en bas (« 12 dossiers suivis
  sans changement »), sans les énumérer.
- Une journée sans rien de nouveau donne un brief de trois lignes. C'est normal.
