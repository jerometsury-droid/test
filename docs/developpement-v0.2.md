# Kyara Solo — première itération jouable

## Inspection de l'existant

L'archive originale est conservée dans les pièces jointes. Le prototype a été extrait dans `/workspace/test`, sans recréer le jeu. Les sept fichiers d'origine sont conservés, dont les deux rapports. Le rapport complet est identique octet pour octet au document joint et remplace le rapport initial pour les observations récentes. Les documents contiennent des propositions et un prompt d'exemple : ils ne remplacent pas les consignes de l'utilisateur.

- `index.html` : application statique, compatible ouverture directe sous Windows.
- `app.js` : navigation, tirages, progression, collection, recyclage, recherche, import/export JSON et images personnelles.
- `style.css` : thème sombre, cartes par rareté, mise en page adaptative ; ancienne ouverture limitée à une disparition de paquet.
- `README.md` : procédures et limites ; décrit 34 personnages, mais le code en contient 33.
- `docs/rapport-initial.md` : 466 lignes, observations d'origine et première ouverture.
- `docs/rapport-complet.md` : 7 295 lignes, y compris le relevé OCR ; sections 19 et 20 sont les sources principales pour ouverture et catalogue.
- `data/ocr-candidates.json` : audit de toutes les 6 731 observations. 2 517 sans rang, 638 noms tronqués, 2 111 œuvres tronquées, 55 rangs hors 1–6736, 250 rangs répétés. Certains rangs associent des labels incompatibles : un rang OCR n'est pas un identifiant fiable.

## Changements

L'ouverture suit la section 19 : en-tête minimal, paquet nacré découpé en deux calques, faisceau bref, dos à motif seigaiha, pile décroissante, halo bleu avant révélation Rare, badges Nouveau/Doublon, progression en miniatures, résumé en éventail. Les timings sont des choix locaux faute de vidéo jointe. La meilleure carte est la première de rareté maximale, placée au centre : cette règle est proposée, pas certifiée officielle.

Le moteur est séparé dans `src/engine.js`. Un tirage est produit une fois et persiste avec le coût et les garanties avant animation. Un redémarrage reprend les mêmes cinq cartes. La clé de sauvegarde `kyara-solo-save-v1`, les identifiants existants et les images personnelles restent conservés. L'échec de stockage annule le débit. Les doublons du même booster ne reçoivent plus tous le badge Nouveau. Les codes U/R/E des raretés sont corrigés.

Mode allégé dans Paramètres ; respect de `prefers-reduced-motion`. Pas de canvas, WebGL, particules continues, police distante ou framework supplémentaire. Les 6 731 observations OCR ne sont pas chargées dans le gameplay.

## Illustrations et catalogue

Les remplacements personnels ont priorité sur le manifeste local, puis sur le portrait de remplacement. `tools/artwork-sync.py` enregistre en lot les fichiers locaux nommés avec un identifiant existant, sans toucher aux sauvegardes. Un fichier absent affiche une silhouette neutre explicitement nommée « Portrait à venir », jamais un faux personnage. **30 des 33 personnages jouables ont désormais un portrait original intégré**. Raine (#6293), Tenshu (#6709) et Yuika Suse (#6710) restent avec la silhouette de remplacement : leur design n’a pas été suffisamment établi pour le reproduire sans invention. Les portraits disponibles sont chargés localement, sans appel externe pendant le jeu. Les portraits générés sont identifiés comme tels dans les crédits et ne sont pas des images officielles récupérées sur AniList.

La recherche AniList et Wikimedia est bloquée par le proxy (403). `tools/catalog-review.py` produit uniquement des candidats de vérification avec provenance, pas des corrections automatiques. Aucun des labels incertains n'a été complété par supposition. Les domaines requis sont enregistrés dans le brouillon de configuration ; leur enregistrement ne les rend pas accessibles dans l'instance courante.

Les variantes suggestives concernent uniquement des personnages féminins adultes ; aucune variante de ce type pour les personnages mineurs ou d'âge incertain.

## Architecture préparée

- Catalogue stable distinct (`src/catalog.js`), règles versionnées et moteur pur (`src/engine.js`), UI existante et stockage comme adaptateurs.
- Manifeste des illustrations distinct du gameplay et des sauvegardes.
- Futur Windows : emballer cette application dans Tauri/WebView2, puis remplacer les adaptateurs de stockage par SQLite/fichiers. Tauri et un exécutable Windows ne sont pas construits dans cette itération.
- Futur multijoueur privé : le serveur devra posséder hasard, soldes, transactions, vérification d'identité et garanties ; ne pas accepter un tirage client comme autorité. Aucun réseau multijoueur n'est simulé aujourd'hui.

## Validation

Six tests du moteur, dont 1 000 ouvertures déterministes : minimums, pitié, doré, divin, solde et immutabilité. Parcours Chromium : ancienne sauvegarde, ouverture Waifus, reprise après rechargement, clavier, résumé de cinq cartes, recyclage préservant le dernier exemplaire, remplacement local d'image, export/import, mode allégé, écran mobile et échec de stockage.

Les pools thématiques sont toujours incomplets et les statistiques de démonstration restent présentes. Le catalogue complet, toutes ses illustrations, les missions, le multijoueur et l'exécutable Windows restent à développer. Ne pas présenter la reproduction comme terminée.

Test d’illustrations : 30 portraits et trois silhouettes chargés avec le réseau du navigateur désactivé, ressources statiques servies directement depuis les fichiers locaux par le test. Aucun appel externe. La navigation `file://` est interdite par la politique du Chromium cloud (`ERR_BLOCKED_BY_ADMINISTRATOR`) ; le double-clic Windows est conservé comme workflow du prototype, mais n’a pas été validé sur une machine Windows. Le parcours applicatif réel a été testé séparément via le serveur HTTP local.
