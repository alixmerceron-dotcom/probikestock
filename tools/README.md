# tools/

Sources des outils publiés en **Artifact** (claude.ai), versionnées ici pour pouvoir
les retrouver et les mettre à jour d'une session à l'autre.

## `feuille-de-route.html` — « La Feuille de Route »

Répertoire de tâches personnel, publié à l'adresse
<https://claude.ai/code/artifact/146a485b-32b5-453a-9097-7abb8c825143>.

Le fichier contient **le corps de la page uniquement** (`<title>`, `<style>`, le balisage,
puis `<script>`) : la plateforme l'enveloppe elle-même dans `<!doctype html>…<body>`.
Les polices (Barlow Condensed, Space Mono) sont embarquées en `data:` URI — la CSP des
Artifacts interdit tout appel réseau externe.

### Ce que fait la page
- **Ordre du jour** — le programme de la journée, dans l'ordre, réordonnable (↑ ↓),
  avec repère « à suivre » sur la prochaine étape et ajout direct au programme.
- **Barème de points** — chaque tâche vaut 1 (plat), 3 (vallonné), 5 (col) ou 8 (hors caté).
- **Palmarès** — total cumulé, classement (Néo-pro → Légende), points du jour,
  7 derniers jours, et **bonus d'étape** (+10) quand tout le programme du jour est franchi.
- **Horizons** — à trier / aujourd'hui / 2–3 jours / cette semaine / plus tard.
- **Import Gmail** — via `window.claude.mcp`, ne remonte que les e-mails des 7 derniers
  jours où quelque chose est demandé.

Tout l'état vit dans `localStorage` (`feuille-de-route-v3`, migration automatique
depuis `v2` et `v1` ; les tâches déjà franchies sont créditées au premier chargement).

### Mettre à jour la page publiée
Modifier ce fichier, puis republier **sur la même URL** avec l'outil Artifact
(paramètre `url` = l'adresse ci-dessus). Ne pas passer `capabilities` : la déclaration
déjà enregistrée — nécessaire à l'import Gmail — est conservée telle quelle.
