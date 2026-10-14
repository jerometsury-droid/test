# Kyara Solo 0.3

## Fonctionnement ajouté

Les albums par univers sont calculés à partir des personnages du prototype. Les compteurs représentent des personnages uniques, jamais le nombre de doublons ni le catalogue complet de Kyara. Les fiches dont l'œuvre reste vide ne sont pas affectées à un album supposé. Un album complété ne déclenche pas de récompense inventée.

La collection combine recherche insensible aux accents, rareté, univers, tri et doublons. La fiche s'ouvre par une vraie commande clavier/souris dans un dialogue natif : portrait, recto/verso, rareté, nom, œuvre, POW/AURA et quantité. Échap ferme le dialogue et le focus revient à la carte. Les statistiques observées dans le rapport sont distinguées des valeurs de démonstration. Aucune biographie, voix ou apparition inconnue n'est fabriquée.

Le Wiki affiche les fiches débloquées par possession, les portraits verrouillés en monochrome et un filtre Fiches débloquées seulement. Les identifiants et la clé de sauvegarde restent identiques. Les filtres et albums ne modifient pas la sauvegarde ; les entrées de futurs personnages dans d'anciennes sauvegardes sont préservées.

## Windows

Un paquet portable Windows x64 a été construit avec Electron 44.7.2 et @electron/packager 20.3.0. Il contient KyaraSolo.exe, les bibliothèques du runtime et resources/app.asar avec le jeu et tous ses portraits. Le code utilisateur s'exécute dans un renderer isolé, sans Node.js, avec sandbox, origine locale stable kyara://game, accès extérieur et permissions bloqués. Le protocole statique refuse les autres origines, les traversées de répertoire et les fichiers non applicatifs.

Les parties Electron sont conservées dans un dossier stable KyaraSolo. Le passage depuis un navigateur se fait par export/import JSON, car leurs stockages sont distincts. Le multijoueur n'est pas implémenté ; il devra ultérieurement avoir une couche serveur et une politique réseau explicite.

Le paquet a été construit et inspecté sous Linux, avec vérification des sommes SHA-256 de distribution Electron par le téléchargeur officiel. Le .exe a l'en-tête PE x64 attendu. Les ressources de l'application sont présentes dans app.asar. **Aucune exécution Windows réelle n'a eu lieu** ; l'archive constitue une version à essayer sur Windows 10/11 64 bits, pas une certification native.

## Validation

- Dix tests Node : moteur de tirage (dont 1 000 ouvertures), albums/filtres immuables et serveur statique local.
- Parcours Chromium de l'ouverture existante : sauvegarde ancienne, interruption/reprise, recyclage, import/export et images manuelles.
- Parcours Chromium de collection : albums, doublons, recherche, rareté, dialogue recto/verso, Échap/focus, mobile, Wiki verrouillé et conservation de l'inventaire.
- Portraits hors réseau : 30 illustrations intégrées et trois silhouettes explicitement non identifiantes.
- Parcours du renderer avec le vrai serveur statique et sa politique de contenu : démarrage, portraits, ouverture, stockage, collection et dialogue.

Le catalogue reste limité à 33 personnages jouables. Les pools thématiques, biographies, noms OCR, portraits inconnus, missions et multijoueur restent à développer.
