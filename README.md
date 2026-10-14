# Kyara Solo 0.4

Jeu personnel hors ligne, inspiré de Kyara. Projet indépendant, sans affiliation officielle.

## Windows

Téléchargez l’artefact `KyaraSolo-Windows-v0.4` dans GitHub Actions, extrayez **tout** le ZIP, puis lancez `KyaraSolo.exe`. Le dossier doit rester complet. L’application conserve ses sauvegardes dans son profil Windows. Exportez/importez votre JSON dans Paramètres pour transférer une partie du navigateur.

## Cette version

- **6 736 cartes et 6 736 portraits locaux**, récupérés depuis les références AniList du catalogue public de Kyara ; aucune illustration IA. Noms, anime, raretés et statistiques proviennent du catalogue public, sans rapprochements OCR inventés.
- Portraits WebP optimisés, environ 103 Mo pour le catalogue complet. Chargement progressif et pagination à 48 entrées pour les anciens PC.
- Neuf habillages de paquets distincts, inspirés de la vidéo fournie, déchirure et révélation, résumé en éventail.
- Ouvertures ×1, ×5 et ×10 ; reprise d’une ouverture interrompue sans nouveau débit.
- Six raretés et taux affichés, emplacements garantis, doré tous les dix paquets, pitié Mythique à 250 et divin 1/2000, d’après la configuration publique observée.
- **F7** ouvre les outils solo pour ajouter du chakra ; aucun bouton visible dans les menus.
- Albums avec le portrait d’un seul personnage par anime, fiches, recherche, doublons, recyclage et remplacement manuel de toute illustration.
- Anciennes sauvegardes et identifiants des 33 cartes du prototype conservés, y compris Loly malgré la correction de son rang.

## Limites connues

Les habillages des neuf boosters sont distincts. Leur sélection thématique de personnages reste à reproduire : la liste publique fournit les tailles des pools mais pas leurs identifiants. Le moteur utilise actuellement le catalogue complet pour les neuf types ; cette limitation n’est pas présentée comme une correspondance officielle. Les charges solo restent plafonnées à 15 pour préserver les parties existantes, contre un plafond public normal de 10. Les animations sont une reproduction locale et non les fichiers du site.

Les droits des portraits restent à leurs auteurs et ayants droit ; la présence publique d’une image ne garantit pas une licence commerciale. Voir `assets/portraits/CREDITS.md` et les licences des polices locales dans `assets/fonts/`.

## Développement

Node.js 24 : `npm ci`, puis `npm test`. Servez le dossier avec `python -m http.server 8000` pour les parcours Chromium. `npm run package:windows` prépare le dossier Windows ; le workflow Windows vérifie le véritable exécutable.

`src/engine.js` contient les règles sans interface ni réseau, `src/collection.js` les filtres, `data/catalogue-full.js` le catalogue, et `desktop/` l’enveloppe Electron isolée. Cette séparation permet une future couche serveur privée sans coupler le moteur aux API du site. Les rapports et observations OCR sont conservés dans `docs/` comme documents de travail.
