# Veille business quotidienne — Probikestock
**Date : 12/09/2026** · Usage interne uniquement — ne pas publier

## 🔥 À la une
Journée calme sur le fond : **aucun changement de niveau de confiance**, aucun nouveau dossier. Deux
échéances suivies de près arrivent à leur terme dans les prochaines heures : la **visite du lot Accell/Lapierre
aux enchères (Auctivo, Ede) a eu lieu aujourd'hui** comme prévu (clôture des enchères demain 13/09, toujours
sans lien confirmé avec le matériel course de Picnic PostNL), et la **Vuelta a España se termine demain
13/09** — échéance de fond pour Kern Pharma (toujours aucun repreneur nommé ; Cyclingnews publie un
témoignage inédit de coureurs sous pression) et pour la bataille de classement UCI WorldTour
Movistar/Cofidis/Tudor/Pinarello-Q36.5, où une **cinquième version de classement contradictoire** a été
trouvée aujourd'hui, sans plus de fiabilité que les précédentes. TotalEnergies reste à J-3 avant l'échéance
UCI du 15/09, toujours sans sponsor 2027 nommé.

**Chantier interne du jour (hors périmètre veille) :** `tracker-equipes.json` et `historique-rumeurs.json`
avaient accumulé, depuis mi-juillet, une longue suite de mentions quotidiennes « RAS le JJ/MM » qui gonflait
inutilement leur taille. Les deux fichiers ont été réécrits aujourd'hui : chaque série de « RAS » consécutifs
sans élément de fond est désormais compressée en une phrase du type *« Sans changement depuis le
DD/MM/AAAA (dernier changement de statut : …) »*, alors que toute date de changement de niveau, toute
confirmation/infirmation et toutes les sources restent conservées intégralement. Taille combinée des deux
fichiers : 501 Ko → 451 Ko avant l'ajout des mises à jour du jour, malgré l'ajout du contenu du 12/09.

## A. Changements d'équipementier
| Équipe | Ancien équipementier | Nouvel équipementier (pressenti) | Confiance | Depuis le | Sources | Impact matériel estimé |
|---|---|---|---|---|---|---|
| Soudal Quick-Step | Specialized (S-Works Tarmac SL9) | Merida (pressenti, 2027) | B | 15/07/2026 | [Escape Collective](https://escapecollective.com/reports-soudal-quick-step-to-switch-from-specialized-to-merida-in-2027/), [WielerFlits](https://www.wielerflits.be/materiaalzone/soudal-quick-step-neemt-afscheid-van-specialized-stapt-in-2027-over-op-merida/), [Cyclingnews](https://www.cyclingnews.com/bikes/pro-bikes/soudal-quickstep-and-specialized-set-to-end-near-20-year-partnership-according-to-report/) | Stock SL9 récent (1 an d'usage WorldTour) si confirmé — équipe + AG Insurance-Soudal (féminine) |
| Picnic PostNL | Lapierre (contrat 2025-2028, équipementier fragilisé) | Aucun changement annoncé côté équipe | A (faits juridiques) / D (impact équipementier) | 14/08/2026 | [Cyclingnews](https://www.cyclingnews.com/cycling-tech-components/parent-company-of-lapierre-and-raleigh-initiates-insolvency-proceedings-putting-major-brands-at-risk/) | Visite du lot Accell tenue aujourd'hui (Auctivo, Ede) ; clôture des enchères demain 13/09 — stock commercial/showroom du groupe, toujours pas confirmé lié au matériel course de l'équipe |
| NSN Cycling Team | Scott | CUBE (rumeur, source unique) | C | 16/08/2026 | [Brújula Bike](https://en.brujulabike.com/brand-dance-in-the-worldtour-cube-could-return-to-the-worldtour/) | Stock Scott (Foil, etc.) fin de saison 2026 si confirmé |
| TotalEnergies | CUBE | Pardus (rumeur, non sourcée) | D | 15/07/2026 | Aucune source primaire identifiée | — |

## B. Sponsors titres / incertitude financière
| Équipe | Situation | Confiance | Depuis le | Sources | Risque pour la structure |
|---|---|---|---|---|---|
| TotalEnergies | Retrait TotalEnergies acté fin 2026 ; aucun sponsor 2027 nommé ; échéance UCI 15/09 (**J-3**) | A (retrait) | 15/07/2026 | [franceinfo](https://www.franceinfo.fr/sports/cyclisme/cyclisme-la-perennite-de-l-equipe-totalenergies-n-est-pas-assuree-aujourd-hui-reconnait-jean-rene-bernaudeau-qui-cherche-un-sponsor-pour-la-saison-prochaine_7848128.html), [Orange Sport](https://sports.orange.fr/cyclisme/article/totalenergies-ne-sera-plus-sponsor-titre-fin-2026-CNT000002kUtiT.html) | Fermeture/rétrogradation si dossier non bouclé avant le 15/09 |
| Kern Pharma | Fin de sponsoring Kern Pharma ; licence ProTeam 2027 déposée sans financement ; aucun repreneur nommé | B | 22/07/2026 | [Cyclingnews (22/07)](https://www.cyclingnews.com/pro-cycling/teams-riders/if-we-have-to-take-a-step-back-we-will-despite-imminent-tour-de-france-grand-depart-on-home-soil-long-established-spanish-proteam-risks-folding-at-end-of-2026/), [Cyclingnews (11/09, nouveau)](https://www.cyclingnews.com/pro-cycling/teams-riders/youve-got-that-pressure-in-your-head-kern-pharma-hit-final-days-of-vuelta-a-espana-in-last-ditch-battle-to-continue-in-2027/) | Repli en Continentale ou disparition — échéance Vuelta 13/09 (**J-1**), dossier le plus chaud du tracker |
| Visma-Lease a Bike | Visma se retire du rôle de sponsor-titre 2027, recherche ~20-30 M€/an, aucun accord signé | B | 20/07/2026 | [Cyclingweekly](https://www.cyclingweekly.com/racing/tour-de-france/team-budgets-are-approaching-eur60-million-and-visma-lease-a-bike-is-still-hunting-for-a-title-sponsor-at-the-tour-de-france) | Équipementier (Cervélo) non concerné |
| Movistar Team | Telefónica (contrat jusqu'à 2029) chercherait à céder/partager son sponsoring via l'agence YouFirst-Gersh | B | 06/08/2026 | [Bloomberg](https://www.bloomberg.com/news/articles/2026-06-12/telefonica-considers-ending-sponsorship-of-movistar-cycling-team) | Équipementier (Canyon) non concerné à ce stade |
| Jayco AlUla | Nouvel investisseur de long terme trouvé (identité non communiquée) ; Gerry Ryan évoque 2027 comme possible dernière saison de financement personnel | B | 22/07/2026 | [Escape Collective](https://escapecollective.com/jayco-alula-founder-gerry-ryan-says-2027-will-likely-be-his-last-season/), [Domestique Cycling](https://www.domestiquecycling.com/en/news/jayco-alula-riders-informed-of-new-long-term-investor-as-team-moves-closer-to-stability/) | Équipementier Giant non menacé à court terme |
| Bahrain Victorious | Bapco Energies reconfirmé sponsor principal pour 2026 ; aucune officialisation 2027 trouvée | B | 04/09/2026 | [Bapco Energies](https://www.bapcoenergies.com/media-centre/press-releases/bapco-energies-and-bahrain-victorious-renew-partnership) | — |
| Canyon-SRAM (fém.) | Nouveau backer Scalable Capital ; rupture (pas fin normale) avec l'ex-titre Zondacrypto | B | 05/08/2026 | [Cyclingnews](https://www.cyclingnews.com/pro-cycling/womens-cycling/canyon-sram-announce-european-bank-scalable-capital-as-new-team-backer/) | Aucun changement d'équipementier vélo (Canyon) |

## C. Restructurations, rétrogradations, fermetures, montées de division
| Équipe | Type de signal | Confiance | Depuis le | Sources | Horizon probable de déstockage |
|---|---|---|---|---|---|
| Flanders-Baloise | Fermeture définitive actée fin 2026 (ProTeam belge) | A | 08/08/2026 | [Escape Collective](https://escapecollective.com/team-flanders-baloise-to-fold-after-33-years/) | Liquidation complète attendue fin de saison 2026 (Eddy Merckx, Shimano, Vermarc) — dossier le plus certain du tracker |
| St Michel-Préférence Home-Auber93 | Fermeture de l'équipe masculine fin 2026 (recentrage sur l'équipe féminine) | A | 06/09/2026 | [Escape Collective](https://escapecollective.com/st-michel-preference-home-auber-93-will-shutter-mens-squad-to-focus-on-womens-team/) | Stock masculin (Mavic co-équipementier) à surveiller, pas de date de vente connue |
| Picnic PostNL | Licence WorldTour limitée à 1 an ; équipementier Lapierre en redressement judiciaire (période d'observation 6 mois depuis le 25/08) | B | 15/07/2026 & 14/08/2026 | [ProCyclingUK](https://procyclinguk.com/picnic-postnl-mens-and-womens-worldtour-licence-initially-limited-to-single-year-as-full-list-of-2026-2028-wt-teams-released/) | Visite enchères Accell tenue le 12/09, clôture le 13/09 ; pas encore de lien confirmé avec le matériel course |
| Movistar / Cofidis / Tudor Pro Cycling / Pinarello-Q36.5 | Bataille de classement UCI WorldTour par équipes autour de la frontière 18e/19e (licences 2027-2029) | B (chiffres contradictoires selon les sources — 5e version différente trouvée aujourd'hui) | 01/09/2026 | [Cyclingnews Relegation Watch](https://www.cyclingnews.com/features/relegation-watch-movistar-drop-to-18th-in-uci-worldtour-team-rankings/), [CyclingUpToDate](https://cyclinguptodate.com/cycling/uci-world-tour-teams-ranking-update-danger-signs-flash-for-tom-pidcocks-pinarello-q365-and-movistar-as-fight-for-world-tour-spots-heat-up), firstcycling.com | Vuelta a España : étape reine aujourd'hui (20), clôture demain 13/09 — rien d'acté avant la finale UCI d'octobre, chiffres du jour à ne pas trancher (Movistar 15e, Lotto-Intermarché 16e, Cofidis 17e, Tudor 18e selon firstcycling.com, non recoupé) |
| Euskaltel-Euskadi | Risque de fermeture/rétrogradation évoqué (info de juin-juillet, jamais confirmée depuis) | B | 06/09/2026 | [Cyclingnews](https://www.cyclingnews.com/pro-cycling/teams-riders/if-we-have-to-take-a-step-back-we-will-despite-imminent-tour-de-france-grand-depart-on-home-soil-long-established-spanish-proteam-risks-folding-at-end-of-2026/) | Signal de continuité (Landa signé jusqu'à 2028) contredit partiellement le risque de fermeture |

## D. Nouveaux modèles → déstockage de l'ancienne génération
| Marque | Nouveau modèle | Ancien modèle concerné | Équipe(s) sponsorisée(s) | Confiance | Sources |
|---|---|---|---|---|---|
| Shimano | Dura-Ace WH-R9370 (dispo France 17/09/2026, dans 5 jours, prix confirmés) | Dura-Ace WH-R9200/R9270 | Alpecin - Premier Tech | A (sur le lancement/dispo) | [Cyclingweekly](https://www.cyclingweekly.com/products/new-shimano-dura-ace-wheels-are-up-to-220g-lighter-thanks-to-carbon-spokes), [road.cc](https://road.cc/tech-news/shimano-launches-lighter-more-aero-dura-ace-wheels) |
| Look | 795 Blade RS 3 | 795 Blade RS 2 | Cofidis | A (lancement) / D (déstockage lui-même) | [Cyclist](https://www.cyclist.co.uk/in-depth/pro-bike-cofidis-look-795-blade-rs-3-tour-de-france-2026), [BikeRadar](https://www.bikeradar.com/features/pro-bike/2026-tour-de-france-milan-fretin-look-795-blade-rs-3) |
| Van Rysel (Decathlon CMA CGM) | RCR-F Pro (clarifié : lancé le 28/03/2025, pas de nouvelle génération route annoncée depuis) | — | Decathlon CMA CGM | A (clarification) | Voir dossier `decathlon-cma-cgm-van-rysel-rcrf-pro-2027` |

## 📈 Évolution des dossiers suivis depuis hier
- Aucun changement de niveau de confiance aujourd'hui sur les 26 dossiers du tracker.
- Kern Pharma : nouvel élément de contexte (article Cyclingnews du 11/09/2026, non capté hier — témoignages
  de coureurs sur la pression à l'approche de la clôture de la Vuelta), sans changement de niveau (B).
  Échéance de fond demain (13/09).
- Picnic PostNL : la visite du lot aux enchères Accell (Auctivo) a eu lieu aujourd'hui comme prévu — clôture
  des enchères demain 13/09, toujours aucun lien confirmé avec le matériel course de l'équipe.
- Movistar / Tudor / Cofidis / Pinarello-Q36.5 : un **5e jeu de chiffres UCI contradictoire** trouvé aujourd'hui
  (firstcycling.com : Movistar 15e, Lotto-Intermarché 16e, Cofidis 17e, Tudor 18e), qui ne recoupe aucune des
  versions précédentes des 07-11/09 — situation toujours non tranchée, niveau maintenu à B. À noter : accès
  direct à firstcycling.com et cyclinguptodate.com bloqué par la politique réseau, ces chiffres proviennent
  uniquement de synthèses de recherche, pas d'une lecture intégrale de la source — prudence renforcée.

## 🆕 Nouveaux dossiers ouverts aujourd'hui
- Aucun — tous les signaux détectés aujourd'hui concernent des dossiers déjà trackés. Un nouveau ProTeam
  hongrois (MBH Bank CSB Telecom Fort, équipementier Cinelli) a été identifié en recherche large mais n'est
  **pas** ouvert comme dossier : c'est une montée en gamme d'une petite structure existante (signal inverse,
  hors périmètre opportunité de rachat), pas un signal de déstockage.

## 🗄️ Sources consultées aujourd'hui
- Lecture intégrale de `tracker-equipes.json` (26 équipes) et `historique-rumeurs.json` (33 signaux) avant
  recherche — les deux fichiers ont par ailleurs été réécrits aujourd'hui pour compresser l'accumulation de
  mentions « RAS le JJ/MM » quotidiennes (voir « À la une »).
- `signaux-manuels.md` : vide, aucune entrée à traiter.
- Recherches web ciblées : TotalEnergies sponsor 2027 ; Picnic PostNL/Lapierre/Accell/Auctivo ; Soudal
  Quick-Step/Safety Jogger/Merida ; Visma-Lease a Bike ; Kern Pharma (+ vérification de l'article Cyclingnews
  du 11/09) ; Movistar/Telefónica + classement UCI ; Tudor/classement UCI ; Jayco AlUla/Gerry Ryan ; FDJ-Suez/
  Nike ; EF Education-EasyPost ; Groupama-FDJ United/Madiot ; NSN Cycling/CUBE ; Euskaltel-Euskadi ; Decathlon
  CMA CGM/Van Rysel ; Vuelta a España (étapes 19-20, classement général) ; recherches larges "cycling team
  sponsor crisis rumor September 2026", "équipe cycliste changement équipementier 2027", "nouvelle équipe
  WorldTour ProTeam 2027 licence UCI", "Specialized Tarmac SL9 nouveau modèle 2027".
- Sources consultées : Cyclingnews, Escape Collective, Cyclingweekly, WielerFlits, Domestique Cycling, road.cc,
  BikeRadar, Cyclist, Bapco Energies (communiqué officiel), Bloomberg, ProCyclingUK, Brújula Bike. De
  nombreux sites habituellement suivis (cyclinguptodate.com, veloracycling.com, inrng.com, firstcycling.com,
  dicodusport.fr, cyclismactu.net) restent bloqués par la politique réseau en accès direct — utilisés
  uniquement via extraits de résultats de recherche, jamais comme lecture intégrale.

---
*Brief généré automatiquement — usage interne Probikestock, ne pas diffuser.*
