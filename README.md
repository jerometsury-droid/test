# Kyara Solo 0.5.1

Jeu personnel hors ligne, inspiré de Kyara. Projet indépendant, sans affiliation officielle.

## Windows

Téléchargez l’artefact `KyaraSolo-Windows-v0.5.1` dans GitHub Actions, extrayez **tout** le ZIP, puis lancez `KyaraSolo.exe`. Le dossier doit rester complet. L’application conserve ses sauvegardes dans son profil Windows. Exportez/importez votre JSON dans Paramètres pour transférer une partie du navigateur.

Les résultats de chaque ouverture sont triés du Mythique au Commun, dans une grille compacte à sept colonnes sur grand écran. Les badges Nouveau restent associés aux bons tirages ; le résumé indique aussi les doublons et leur valeur de recyclage.

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
