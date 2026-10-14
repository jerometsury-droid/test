# Kyara Solo 0.6.0

Jeu personnel hors ligne, inspiré de Kyara. Projet indépendant, sans affiliation officielle.

## Version navigateur sans exécutable

Si l’archive Windows est bloquée par Chrome, ne désactivez pas sa protection pour la lancer. Le workflow fournit aussi `KyaraSolo-Web-v0.6.0` : extrayez tout le ZIP puis ouvrez `index.html` dans Chrome ou Edge. Ce paquet contient le jeu et ses 6 736 portraits, sans exécutable ni bibliothèque native. Les polices sont intégrées à la feuille de style pour le chargement direct depuis un fichier local.

La sauvegarde du navigateur est distincte de celle de l’application Windows : exportez votre JSON dans l’ancienne application, puis importez-le dans les Paramètres du jeu navigateur. Gardez le dossier au même endroit ; exportez votre sauvegarde avant de le déplacer.

La compilation Windows inclut désormais un contrôle Microsoft Defender, le statut des signatures et les empreintes SHA256. Le workflow n’envoie un nouvel artefact Windows « checked » que lorsqu’un scan exécuté avec succès n’a détecté aucune menace. Une indisponibilité du scanner est signalée, jamais présentée comme un résultat propre. Un scan antivirus ne garantit pas que le blocage de réputation Chrome soit levé. Le rapport est fourni dans `KyaraSolo-verification-v0.6.0`.

## Windows

Téléchargez l’artefact `KyaraSolo-Windows-v0.6.0` dans GitHub Actions, extrayez **tout** le ZIP, puis lancez `KyaraSolo.exe`. Le dossier doit rester complet. L’application conserve ses sauvegardes dans son profil Windows. Exportez/importez votre JSON dans Paramètres pour transférer une partie du navigateur.

Les résultats de chaque ouverture sont triés du Mythique au Commun, dans une grille compacte à sept colonnes sur grand écran. Les badges Nouveau restent associés aux bons tirages ; le résumé indique aussi les doublons et leur valeur de recyclage.

## Boutique et paquets spéciaux

Les trois onglets suivent les captures : **Gratuits**, **Du jour & limités**, **Boutique**. Les neuf paquets standard gardent leurs charges gratuites ; les nouveaux paquets coûtent du chakra même lorsque des charges ou boosters bonus sont disponibles.

| Paquet | Chakra | Cartes | Particularité |
| --- | ---: | ---: | --- |
| Sceau mythique | 1 000 | 4 | Rare, Épique, Légendaire et Mythique ou mieux ; achetable selon la demande, sans condition de récompense |
| Bannière Jujutsu Kaisen | 200 | 5 | Huit vedettes Mythiques vérifiées, 50 % des Mythiques vers une vedette, vedette garantie après 100 paquets sans vedette |
| Hall of Fame | 750 | 5 | Pool public des 1 000 favoris ; aucun personnage hors de ce pool |
| Deep Cuts | 100 | 5 | Pool public de 5 457 personnages ; aucune Légendaire ni Mythique disponible |
| Mini-booster | 100 | 3 | Commune, Peu commune, Rare ou mieux |
| Coffret | 550 | 20 | Une Épique et trois Rares ou mieux garanties |
| Prestige | 575 | 5 | Minimums U/R/R/E/E et taux augmentés, d’après les probabilités publiques |

Tous les pools sont récupérés depuis leurs propres réponses publiques, sans déduction par anime ou genre. Les chances affichées utilisent les mêmes probabilités par emplacement que le tirage. Le prix de 1 000 du Sceau est un choix solo : le site original le propose uniquement en récompense. La bannière demeure disponible hors ligne ; aucun faux compte à rebours n’est affiché. Les anciens identifiants de boosters restent inchangés et les nouvelles tailles de paquet reprennent correctement après rechargement.

## Nouveautés inspirées de la vidéo du 14 octobre

- Aperçu de chaque booster, classé par rareté, avec recherche, filtre des personnages manquants et chargement progressif.
- Missions solo quotidiennes et hebdomadaires avec récompenses réclamables, succès et série de connexion sur sept jours (20/30/40/50/60/80/100 chakra ; un booster doré gratuit au septième jour).
- Les trois missions du jour donnent un booster bonus ; les trois missions hebdomadaires donnent vingt boosters bonus. Les crédits restent disponibles lorsque les charges sont pleines. Une récompense déjà réclamée ne peut pas être réclamée à nouveau après rechargement.
- Tableau de collection avec taux de complétion, doublons et répartition des raretés ; grille plus compacte.
- Inclinaison et reflets au survol dans les fiches de cartes, véritable verso individuel avec nom, anime et statistiques. Le mode allégé désactive les mouvements.

Ces objectifs sont adaptés au solo : la mission de vente est remplacée par cinq ouvertures, et le bonus hebdomadaire est constitué de vingt boosters standard, pas du coffret du site. Le calendrier suit les dates de l’ordinateur ; aucune mission n’est récupérée depuis un compte Kyara. Les missions commencent avec cette version, tandis que les succès reconnaissent la collection et les ouvertures existantes. Le marché entre joueurs, les concours et le parrainage restent hors du mode solo.

## Catalogue et règles

- **6 736 cartes et 6 736 portraits locaux**, récupérés depuis les références AniList du catalogue public de Kyara ; aucune illustration IA. Noms, anime, raretés et statistiques proviennent du catalogue public, sans rapprochements OCR inventés.
- Portraits WebP optimisés, environ 103 Mo pour le catalogue complet. Chargement progressif et pagination à 48 entrées pour les anciens PC.
- Neuf habillages de paquets distincts, inspirés de la vidéo fournie, déchirure et révélation, résumé en éventail.
- Ouvertures ×1, ×5 et ×10 ; reprise d’une ouverture interrompue sans nouveau débit.
- Six raretés et taux affichés, emplacements garantis, doré tous les dix paquets, pitié Mythique à 250 et divin 1/2000, d’après la configuration publique observée.
- **F7** ouvre les outils solo pour ajouter du chakra ; aucun bouton visible dans les menus.
- Albums avec le portrait d’un seul personnage par anime, fiches, recherche, doublons, recyclage et remplacement manuel de toute illustration.
- Anciennes sauvegardes et identifiants des 33 cartes du prototype conservés, y compris Loly malgré la correction de son rang.

## Limites connues

Les neuf boosters utilisent désormais leurs listes exactes de personnages, récupérées depuis les réponses publiques du site. Les lots affichent toutes leurs cartes ensemble ; les Mythiques ont un cadre irisé et les Légendaires un fond doré sombre. Les charges solo restent plafonnées à 15 pour préserver les parties existantes, contre un plafond public normal de 10. Les animations sont une reproduction locale et non les fichiers du site.

Les droits des portraits restent à leurs auteurs et ayants droit ; la présence publique d’une image ne garantit pas une licence commerciale. Voir `assets/portraits/CREDITS.md` et les licences des polices locales dans `assets/fonts/`.

## Développement

Node.js 24 : `npm ci`, puis `npm test`. Servez le dossier avec `python -m http.server 8000` pour les parcours Chromium. `npm run package:windows` prépare le dossier Windows ; le workflow Windows vérifie le véritable exécutable.

`src/engine.js` contient les règles sans interface ni réseau, `src/collection.js` les filtres, `data/catalogue-full.js` le catalogue, et `desktop/` l’enveloppe Electron isolée. Cette séparation permet une future couche serveur privée sans coupler le moteur aux API du site. Les rapports et observations OCR sont conservés dans `docs/` comme documents de travail.
