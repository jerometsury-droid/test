# Kyara Solo — prototype 0.1

Prototype personnel hors ligne inspiré des mécaniques décrites dans les rapports Kyara du 14 octobre 2026. Ce projet n'est pas affilié au site officiel.

## Lancer sous Windows

Double-cliquez sur `index.html` dans le dossier décompressé. Chrome, Edge ou Opera conviennent. Aucune installation, connexion ni achat nécessaire.

## Fonctionnalités

- 9 types de boosters, 5 cartes par ouverture ; scène de révélation, résumé.
- 6 raretés, emplacements garantis, pitié Mythique à 250, doré tous les 10 boosters, divin 1/2000.
- Chakra, charges gratuites, collection, doublons et recyclage.
- Import d'illustrations personnalisées par carte depuis Collection (2 Mo maximum).
- Sauvegarde locale dans le navigateur, export/import JSON.
- 34 personnages de démonstration issus des entrées visuellement confirmées par le rapport ; valeurs de POW/AURA de substitution pour les personnages non documentés.
- `data/ocr-candidates.json` : 6731 observations candidates extraites du rapport, **non validées** et **non utilisées comme cartes jouables**.

## Limites importantes

Il ne s'agit **pas** du jeu complet ni d'une reproduction pixel-perfect. Aucune image originale n'est intégrée. Les pools sont volontairement partiels : le prototype tire les cartes parmi les personnages de démonstration de la rareté appropriée, indépendamment du booster sélectionné. Les taux sont une approximation issue du rapport ; leur priorité exacte est inconnue. La recharge de 30 min est un paramètre proposé, non observé. Certaines valeurs de statistiques sont des substitutions de démonstration. Les images importées restent dans la sauvegarde du navigateur : utilisez l'export JSON régulièrement. Ne supprimez pas les données du navigateur sans export.

## Étapes suivantes pour Codex

1. Migrer vers React + TypeScript + Vite et Tauri v2 pour construire un exécutable Windows (voir https://v2.tauri.app/start/create-project/).
2. Convertir les observations OCR en catalogue contrôlé : correspondances AniList, noms complets, œuvres, identifiants stables, raretés et statistiques vérifiées ; ne pas confondre 6731 observations avec 6731 personnages uniques.
3. Ajouter des pools de booster corrects (genre, thème, œuvre), les pages Collection/Missions/Boutique et les visuels/animations manquants.
4. Migrer le stockage des illustrations vers des fichiers locaux/IndexedDB et la sauvegarde vers SQLite avant d'augmenter le catalogue.
5. Préparer une couche serveur distincte pour un futur multijoueur privé, sans dépendre des API de Kyara.

## Provenance

Les fichiers de rapport d'origine sont inclus dans `docs/` pour Codex. Les cartes/valeurs non confirmées ne doivent pas être présentées comme officielles.

## Itération 0.2

Le prototype est amélioré sur place : ouverture avec paquet déchiré, pile de dos, révélation, badges, miniatures et résumé en éventail. Le moteur et le catalogue sont désormais séparés dans `src/`. Le jeu contient **33 personnages jouables** ; les observations OCR restent à vérifier.

Une ouverture interrompue reprend après rechargement, sans nouveau débit. Les anciennes sauvegardes restent compatibles. Pour transférer votre partie vers ce dossier ou une autre origine (un serveur HTTP et un fichier local ne partagent pas le stockage), exportez d'abord la sauvegarde de l'ancienne version puis importez-la dans Paramètres.

Le mode allégé se trouve dans Paramètres ; les préférences d'animations réduites du système sont également respectées. Les portraits intégrés sont locaux et peuvent toujours être remplacés depuis Collection. Les images absentes montrent « Portrait à venir ». Les crédits et l'état du chantier se trouvent dans `docs/developpement-v0.2.md` et `assets/portraits/CREDITS.md`.

### Développement et tests

Aucun outil supplémentaire n'est nécessaire pour jouer : ouvrez `index.html`. Pour développer via HTTP :

```sh
cd /workspace/test
python -m http.server 8000 --bind 127.0.0.1 --directory /workspace/test
node --test tests/engine.test.cjs
```

Pour le test navigateur optionnel, installez Playwright en dehors du dépôt et fournissez son chemin. Chromium est requis ; ajustez `executablePath` dans le test sur votre système :

```sh
npm install --prefix /tmp/kyara-tools --cache /tmp/npm-cache playwright
PLAYWRIGHT_PATH=/tmp/kyara-tools/node_modules/playwright node tests/browser.cjs
```

Audit hors ligne du catalogue : `python tools/catalog-review.py`. Recherche d'une entrée (réseau AniList requis) : `python tools/catalog-review.py --search 'Rebecca Bluega…' --work 'EDENS ZERO'`. La sortie reste une proposition à contrôler ; elle ne modifie jamais les personnages jouables.

Test supplémentaire des portraits hors connexion :

```sh
PLAYWRIGHT_PATH=/tmp/kyara-tools/node_modules/playwright node tests/offline-artwork.cjs
```

**30 portraits originaux intégrés sur 33 cartes de démonstration**, avec crédits dans `assets/portraits/CREDITS.md`. Les trois personnages dont le design reste incertain ont une silhouette étiquetée. Pour remplacer en lot des portraits par vos propres fichiers, déposez des images nommées avec les identifiants stables (`18.webp` pour Makima, par exemple) dans `assets/portraits/`, puis exécutez `python tools/artwork-sync.py`. L’import individuel depuis Collection reste disponible et prioritaire.

## Itération 0.3 — albums et version Windows

Collection : albums par univers (progression limitée aux personnages de démonstration), recherche, tri par rareté/nom/rang, filtre doublons et fiches de cartes agrandies. Le Wiki classe les personnages par rang, montre les fiches verrouillées et permet de n'afficher que les fiches débloquées. Obtenir une carte débloque sa fiche ; les biographies et noms incertains ne sont pas inventés.

### Windows portable

Une compilation **Windows 10/11, 64 bits** est préparée dans `dist/KyaraSolo-win32-x64/`. Extrayez **tout le dossier** de l'archive Windows puis lancez **KyaraSolo.exe**. Le `.exe` dépend des DLL et du dossier `resources` à côté de lui : ne le copiez pas seul.

La fenêtre utilise Electron 44.7.2 et fonctionne avec les ressources locales. Le moteur, le catalogue et les illustrations sont identiques à la version navigateur. Le dossier de partie est stable d'une version à l'autre : `%APPDATA%\KyaraSolo`. Une partie jouée dans un navigateur doit être exportée en JSON puis importée dans Paramètres ; cette opération est compatible avec les sauvegardes v0.1/v0.2.

Le runtime Windows a été récupéré depuis les releases officielles Electron avec validation SHA-256 par `@electron/get`. Le paquet et son format PE x64 ont été vérifiés sous Linux. **Le processus Windows n'a pas été exécuté ici.** Le parcours du jeu et le serveur statique avec sa politique de contenu ont été exercés dans Chromium. Un test sur Windows reste nécessaire avant de certifier l'exécution native.

La version navigateur reste la plus légère pour un ancien PC. La version Windows embarque son propre Chromium. Activez Mode allégé dans Paramètres ; si le rendu accéléré pose problème, lancez `KyaraSolo.exe --software-rendering`.

### Reproduire la compilation

Node.js 24 et npm sont utilisés ici. Sous Windows, `npm ci` installe le runtime Electron local pour `npm start`. Dans un environnement cloud Linux qui prépare uniquement les archives Windows :

```sh
cd /workspace/test
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm ci --cache /tmp/npm-cache
npm test
NODE_USE_ENV_PROXY=1 NODE_USE_SYSTEM_CA=1 npm run package:windows
```

Les options Node de proxy et de certificats système respectent le réseau et les autorités de confiance fournis ; aucune vérification TLS ou de checksum n'est désactivée. Le script ne remplace pas un dossier de compilation existant. Les tests Chromium supplémentaires sont `tests/collection-browser.cjs` et `tests/desktop-browser.cjs`, avec le même `PLAYWRIGHT_PATH` que les tests précédents.

### Téléchargement GitHub

Le workflow **Kyara Solo Windows** compile, teste et fournit le dossier Windows dans les artefacts GitHub Actions à chaque envoi sur `main`. Voir [la procédure de téléchargement](docs/telecharger-windows.md). Le test Windows est effectué par GitHub, pas par la machine Linux de développement.
