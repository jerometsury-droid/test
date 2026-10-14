# Kyara — audit de reproduction locale solo

**Date : 14 octobre 2026. Site : https://kyara.games/. Mise à jour : analyse de la vidéo utilisateur de 23,45 secondes (1920 × 1080, 60 images/s).**

## 1. Portée, résultat et limite de l’audit

Ce document sert de cahier de reconstruction à ChatGPT et Codex. Il décrit les observations réellement obtenues sur le site, les données chiffrées affichées et les choix d’implémentation proposés pour une version locale solo.

**L’exploration exhaustive demandée n’a pas pu être terminée.** Un widget Cloudflare « Vérifiez que vous êtes humain » est apparu pendant l’examen des cartes sur `/raretes`. Il était encore présent après un unique rechargement. L’exploration du site a été arrêtée à ce point, sans résolution de CAPTCHA ni contournement. Les pages Collection, Marché, Missions, Parrainage, Wiki et les profils n’ont donc pas été visitées dans le navigateur de l’assistant. Le catalogue Wiki a ensuite été observé dans une vidéo utilisateur (section 20), sans ouverture des fiches individuelles. Leurs liens et certaines de leurs fonctions sont visibles depuis l’accueil, mais cela ne constitue pas une inspection de leurs écrans.

Aucun achat, aucune enchère, aucun échange, aucun recyclage et aucune ouverture de booster n’ont été effectués par l’assistant. Une ouverture gratuite réalisée par l’utilisateur a ensuite été observée dans sa vidéo ; voir section 19. Aucun compte n’a été créé. Aucun accès au code source du projet, à sa base de données, à ses API privées ou à sa logique serveur n’a été obtenu. Une reproduction absolument identique ne peut pas être garantie à partir de ces seules observations.

### Convention de fiabilité

- **Observé** : texte, interface ou image effectivement vu dans le navigateur ou dans la vidéo utilisateur ; la provenance vidéo est précisée.
- **Déduit** : conséquence raisonnable des observations, à confirmer.
- **Proposé** : décision de reconstruction locale, pas une affirmation sur Kyara.
- **Inconnu** : donnée inaccessible ou non examinée.

Les sources principales sont les états de page live de l’accueil, du menu Plus, de `/regles`, de `/raretes` et du dialogue d’agrandissement de Satoru Gojou. La lecture web classique de l’accueil ne retournait pratiquement que le caractère キ : les informations détaillées ont été recueillies dans le navigateur après chargement de l’application.

## 2. Boucle de jeu réellement identifiable

La boucle principale affichée est : recevoir des boosters gratuits qui se rechargent pendant la journée → ouvrir cinq cartes → compléter des albums correspondant aux univers → échanger ou recycler les doublons → obtenir du chakra → débloquer davantage de boosters. Obtenir une carte ouvre également la fiche wiki du personnage, avec biographie, apparitions, seiyū et cote au marché.

Le jeu présente une collection de personnages d’anime, plusieurs familles de boosters, six niveaux de rareté, un marché avec enchères, des classements et des fonctions sociales. Aucun système de combat n’a été observé. Les statistiques POW et AURA sont présentes sur les cartes ; leur utilisation dans un éventuel autre mode reste inconnue.

**Important pour le solo :** les cartes, albums, boosters, garanties et recyclage constituent le cœur reproductible. Marché et échanges nécessiteront soit une simulation locale, soit une adaptation explicitement assumée. Des joueurs réels, classements mondiaux et notifications de tirages ne peuvent pas être reproduits hors ligne à l’identique.

## 3. Carte des pages et des accès

| Route visible | Fonction affichée | Niveau d’inspection |
|---|---|---|
| `/` | Boosters, accueil, mise en avant, tirages, enchères, podium, avis | Page chargée et observée ; onglets secondaires non ouverts |
| `/collection` | Collection et recyclage de doublons | Lien observé seulement |
| `/marche` | Marché | Liens et aperçus d’enchères observés seulement |
| `/missions` | Missions | Lien observé seulement |
| `/parrainage` | Parrainage | Lien observé seulement |
| `/amis` | Amis et messages | Lien du menu Plus observé seulement |
| `/wiki` | Toutes les fiches des personnages | Catalogue observé dans la seconde vidéo utilisateur ; fiches individuelles non ouvertes |
| `/wiki/{identifiant}` | Fiche d’un personnage | Liens observés ; fiche non ouverte |
| `/profil/{uuid}` | Profil public d’un collectionneur | Liens observés ; page non ouverte |
| `/classement` | Meilleurs collectionneurs | Liens observés seulement |
| `/avis` | Avis, bugs, idées | Liens et extraits publics sur l’accueil |
| `/avis?contester=1` | Contestation d’une sanction | Lien dans les règles seulement |
| `/raretes` | Raretés, composition, garanties, recyclage | Page chargée et observée ; carte Mythique agrandie |
| `/regles` | Règles communautaires | Page chargée et observée |
| `/nouveautes` | Nouveautés | Lien de pied de page seulement |
| `/ouvrir/banner-jjk` | Ouverture de bannière Jujutsu Kaisen | Lien seulement, non activé |
| `/ouvrir/season-2026-fall` | Ouverture du booster Automne 2026 | Lien seulement, non activé |
| `/marche?annonce={uuid}` | Accès ciblé à une annonce | Liens d’aperçus seulement |

Il n’a pas été établi s’il existe une route `/boutique` : la boutique effectivement observée est un **onglet de l’accueil**. Ne pas inventer une route existante sur la base du nom de cet onglet.

## 4. Structure de l’interface

### 4.1 En-tête global

L’en-tête desktop comporte un sceau circulaire rouge/orange キ à gauche, le logotype KYARA en capitales grasses, puis les liens Boosters, Collection, Marché, Missions et Parrainage. Parrainage est mis en jaune avec une petite icône cadeau. Un bouton Plus ouvre un menu comportant Amis, Wiki, Classement et Avis et bugs, chacun avec un symbole japonais et une courte description.

À droite : une capsule Ressources et un bouton Profil circulaire avec le sceau キ. Dans la session inspectée, Ressources montrait des valeurs de chargement « – » et « … », pas des soldes exploitables. La capsule montre notamment un symbole de diamant cyan. Le fonctionnement de son panneau, les autres ressources et le menu personnel n’ont pas été inspectés.

Un lien d’évitement « Aller au contenu » pointe sur `#contenu`. Les catégories sont de vrais onglets accessibles et les boosters une barre d’outils de boutons, avec état sélectionné. Préserver ces détails pour une reconstruction utilisable au clavier.

### 4.2 Pied de page

Il contient KYARA, une mention de projet fan non officiel et de propriété des personnages, puis Raretés, Règles, Nouveautés, Classement, Avis et bugs. Un sélecteur propose Français et English. Certains états montrent un libellé de nœud API (`api-1`, `api-2`, `api-6`) ; cette indication d’infrastructure est superflue en solo.

### 4.3 Message de performance

Le navigateur a reçu un bandeau indiquant que l’accélération matérielle était désactivée et que les ouvertures de boosters risquaient de ralentir. Il contient un bouton d’aide Chrome et une fermeture « Masquer pour 3 jours ». Ce message révèle une attention portée au rendu graphique, mais ne prouve pas quelle technologie d’animation est utilisée.

### 4.4 Chargement

Une vue sombre avec le sceau キ centré apparaît lors des navigations. Les données peuvent arriver en plusieurs étapes : l’accueil a d’abord montré des sections sans boosters ni flux rempli, puis les catalogues et le flux ont été ajoutés. Ne pas confondre ces états provisoires avec un inventaire vide ou un compte sans cartes.

## 5. Direction artistique et reconstruction visuelle

### Observations desktop

Le viewport inspecté mesurait environ 1 348 × 926 pixels. Le fond est presque noir, légèrement violet ; les surfaces secondaires sont des noirs plus clairs. Le texte principal est blanc cassé, le texte secondaire gris. Les accents sont rouge/orange vif pour la marque, violet pour la bannière JJK et jaune pour certains états et éléments de navigation.

Le contenu a environ 64 pixels de marge latérale et une largeur utile proche de 1 200 pixels. L’en-tête mesure approximativement 68 pixels de haut. Ces valeurs sont des estimations visuelles, **pas des mesures CSS extraites**.

Les titres utilisent une police très grasse, arrondie et géométrique. Le corps utilise une sans-serif plus sobre. Les sur-titres, chiffres de carte et statistiques utilisent une présentation monospace ou équivalente, avec espacement des lettres. **Les noms exacts des polices n’ont pas été vérifiés.**

Les grandes surfaces ont des coins arrondis, bordures fines et halos diffus. Les boutons importants sont arrondis en capsule. Les images de personnages sont recadrées pour occuper des cartes verticales. Les textes longs sont tronqués avec points de suspension sur les mini-cartes.

### Tokens proposés, à calibrer

| Token | Valeur de départ proposée |
|---|---|
| Fond général | `#0d0c12` |
| Surface | `#15131c` |
| Bordure | `#302b3b` |
| Texte principal | `#f1eee6` |
| Texte secondaire | `#96939e` |
| Accent marque | `#ff482b` |
| Violet | `#b36bff` |
| Or | `#f2ce28` |
| Rayon grand panneau | 24–28 px |
| Rayon carte | 12–14 px |
| Largeur maximum | environ 1 200 px |

Ces tokens ne sont pas les valeurs originales du site. Les utiliser comme première approximation, puis comparer visuellement. Le responsive mobile, les points de rupture et les dimensions sur téléphone sont inconnus.

## 6. Accueil et présentation des boosters

### 6.1 Carrousel de mise en avant

Trois onglets ont été observés : Jujutsu Kaisen, Waifus, Automne 2026. La bannière a changé de sélection entre deux observations sans clic sur ses onglets : **rotation automatique fortement suggérée**, mais intervalle et animation de transition inconnus.

La bannière JJK contient un sur-titre de période limitée jusqu’au 18 octobre, un grand titre sur deux lignes, un texte de taux augmenté, un bouton d’ouverture à 200 ◆ et un bouton Voir le booster. À droite, trois portraits de cartes sont disposés en éventail avec rotations, bordures orangées et halo. Les personnages visibles sont Satoru Gojou, Yuuji Itadori et Megumi Fushiguro. En bas à gauche, les trois indicateurs sont des petits segments, l’actif étant plus long et violet.

La bannière Automne 2026 indique une édition limitée jusqu’au 1 janvier, un thème de saison et un prix de 175 ◆. Les personnages visibles étaient Maomao, Mai Sakurajima et Yami Sukehiro. Ne pas déduire de ces seuls exemples la liste complète du pool saisonnier.

### 6.2 Explication en trois colonnes

Sous la bannière, trois grands numéros orange 01, 02, 03 introduisent l’ouverture, la complétion des séries et le déblocage du wiki. Sur desktop, les trois colonnes sont alignées horizontalement avec descriptions grises.

### 6.3 Sélecteur de booster

La section comporte trois catégories : Gratuits, Du jour & limités et Boutique. Du jour & limités avait un indicateur « à ouvrir ». Un bouton Plein écran est présent, sans comportement testé.

La catégorie Gratuits expose aussi des **prix en chakra**. Ce n’est pas une contradiction nécessaire : l’interface indique que des charges gratuites existent et que le chakra en débloque davantage, mais la règle de consommation exacte reste inconnue.

| Booster observé | Sous-titre | Symbole | Prix affiché | Cartes |
|---|---|---|---:|---:|
| Shōnen Mix | Tous les persos | 混 | 150 ◆ | 5 |
| Shōnen | Œuvres shōnen | 少 | 175 ◆ | 5 |
| Isekai | Un autre monde | 異 | 175 ◆ | 5 |
| Seinen | Œuvres seinen | 青 | 175 ◆ | 5 |
| Shōjo | Œuvres shōjo | 花 | 175 ◆ | 5 |
| Sport | Terrains et compétitions | 球 | 175 ◆ | 5 |
| Mecha | Robots géants | 機 | 175 ◆ | 5 |
| Waifus | Personnages féminins | 姫 | 150 ◆ | 5 |
| Husbandos | Personnages masculins | 侍 | 150 ◆ | 5 |

Les objets de sélection reprennent KYARA, le sceau キ, le symbole du thème, le nom, le sous-titre, le nombre de cartes et le prix. Shōnen Mix était sélectionné, avec un état de bouton pressé.

Le panneau de détail de Shōnen Mix donne : cinq cartes, Rare ou mieux garantie, 250 avant Mythique sûre, 6 457 personnages possibles, bouton pour voir ces personnages, tableau de chances par booster et bouton d’ouverture. Le bouton d’ouverture était désactivé et affichait une ellipse ; il n’est pas possible d’attribuer avec certitude cet état à une absence de connexion plutôt qu’à un chargement ou à la vérification.

Les contenus Boutique et Du jour & limités n’ont pas été consultés. Prix réels éventuels, packs premium, monnaies additionnelles et offres sont inconnus.

## 7. Cartes, raretés et statistiques

La rareté d’un personnage dépend de son nombre de favoris AniList, selon une classification par popularité affichée sur le site. L’algorithme exact, les seuils entiers, le traitement des ex æquo et les dates de synchronisation ne sont pas connus.

| Rareté | Code sur la carte | Popularité affichée | Taux affiché « des cartes tirées » | Recyclage | Style décrit |
|---|---|---|---:|---:|---|
| Commune | C | Reste, 25 % | 62 % | 1 ◆ | Gris mat, sans effet |
| Peu commune | U | Top 50–75 % | 25 % | 1 ◆ | Vert, filet lumineux |
| Rare | R | Top 25–50 % | 11,4 % | 3 ◆ | Bleu, halo léger |
| Épique | E | Top 10–25 % | 1,4 % | 10 ◆ | Violet, premier reflet holo animé |
| Légendaire | L | Top 3–10 % | 0,15 % | 40 ◆ | Or brossé, holo et forte lueur |
| Mythique | M | Top 3 % | 0,025 % | 150 ◆ | Arc-en-ciel, holo intégral |

### Anatomie visible d’une carte

En haut : nom du personnage à gauche, rond de rareté à droite. Dans la zone illustrée : portrait recadré, nom japonais disponible dans la représentation textuelle et numéro de catalogue superposé. Sous l’image : nom de l’œuvre, puis une bande sombre compacte avec POW et AURA. Le cadre et la surface reprennent la couleur de rareté.

Les numéros vus sont des rangs de catalogue, par exemple `#0001/6736`. **Ce n’est pas la preuve d’un exemplaire unique numéroté ou d’une édition limitée à 6 736 copies.** La numérotation exacte doit être conservée comme donnée distincte de l’identifiant du personnage.

| Exemple sur la page Raretés | Rareté | Numéro | Œuvre | POW | AURA |
|---|---|---|---|---:|---:|
| ACDC | Commune | #5053/6736 | JoJo’s Bizarre Adventure | 55 | 40 |
| Hoshino Takanashi | Peu commune | #3369/6736 | Blue Archive The Animation | 70 | 48 |
| Yukio Tanaka | Rare | #1685/6736 | BECK | 84 | 55 |
| Illumi Zoldyck | Épique | #0675/6736 | Hunter x Hunter | 93 | 63 |
| Akame | Légendaire | #0204/6736 | Akame ga Kill! | 97 | 72 |
| Satoru Gojou | Mythique | #0001/6736 | JUJUTSU KAISEN | 99 | 86 |

**Incohérence apparente à préserver dans l’audit :** Shōnen Mix annonce 6 457 personnages possibles, alors que les exemples de cartes utilisent un dénominateur 6 736. Cela peut correspondre à un pool de booster différent du catalogue global, à une évolution des données ou à une autre règle. Aucun diagnostic n’a été confirmé. Ne pas imposer le même compteur partout sans vérification.

### Agrandissement et verso

Cliquer la carte Mythique a produit un dialogue nommé avec le personnage. Le dialogue expose Fermer, Retourner la carte, le nom, la rareté, le numéro, le nom japonais, l’œuvre, les deux statistiques et un lien vers la fiche wiki. Il invite à bouger la souris ou le doigt pour incliner la carte et à toucher la carte pour la retourner.

Le comportement d’inclinaison et le retournement sont **décrits par l’interface**, mais leurs amplitudes, durées et easing n’ont pas été mesurés. La capture prise immédiatement après le clic ne permet pas de documenter proprement l’état final du dialogue, notamment à cause du widget Cloudflare.

Le dos de carte possède des vagues seigaiha dorées, un sceau キ central, KYARA en bas, une bordure décorative et des ornements aux coins. Le site précise que le dos prend la teinte du booster, jamais la teinte de rareté. La texture du dos reste liée au booster. Toutefois la vidéo montre un halo bleu autour du dos des cartes Rares avant retournement : la rareté peut donc être annoncée par un effet externe, distinct de la texture du verso.

## 8. Probabilités et garanties

### Règles explicites

- Cartes 1 à 3 : Commune ou mieux.
- Carte 4 : Peu commune ou mieux.
- Carte 5 : Rare ou mieux garantie.
- Au 250ᵉ booster sans Mythique, la cinquième carte est obligatoirement Mythique.
- Chaque Mythique remet à zéro le compteur de pitié.
- Chaque dixième booster standard contient une Épique ou mieux : booster doré.
- Probabilité d’un booster divin : 1 sur 2 000. Il contient cinq Épiques ou mieux, dont une Mythique garantie.
- La bannière JJK affiche une chance sur deux d’obtenir une vedette lors de chaque Mythique.

L’expression « standard » n’a pas été définie dans les écrans consultés. Le partage des compteurs entre boosters, la priorité entre pitié/doré/divin, le fonctionnement d’une éventuelle garantie après une vedette manquée et la pondération des vedettes restent inconnus.

### Tableau de l’accueil pour Shōnen Mix

| Rareté | Chance par booster affichée |
|---|---:|
| Rare | 94,1 % |
| Épique | 17,6 % |
| Légendaire | 2 % |
| Mythique | 0,33 % |

Ces nombres ne doivent pas être additionnés ni utilisés comme un choix exclusif de rareté. Un même booster peut contenir plusieurs raretés. « Rare ou mieux garantie » garantit un minimum, tandis qu’un taux de Rare à 94,1 % peut désigner la présence d’au moins une Rare exacte ; **cette interprétation est plausible, pas confirmée**.

### Attention aux taux bruts

Les six taux de la page Raretés totalisent **99,975 %**, et non 100 %. Cela peut venir d’un arrondi ou d’une convention différente. Il ne faut pas inventer une septième rareté pour combler 0,025 point de pourcentage.

Un modèle provisoire raisonnable consiste à normaliser ces poids puis à conditionner chaque tirage selon la rareté minimum de son emplacement. Dans ce modèle, une probabilité par booster d’au moins une rareté r vaut `1 − produit(1 − p_slot(r))`. Le modèle donne environ 0,33 % de Mythique par booster avant garanties, ce qui est proche de l’affichage. Cette proximité constitue un indice, **pas la preuve de l’algorithme serveur**. Les garanties périodiques et divines modifient les statistiques à long terme.

La normalisation, les taux par emplacement et les garanties doivent être dans un fichier de configuration versionné. Ne pas cacher les hypothèses dans la logique de tirage. L’interface doit pouvoir afficher « règles proposées » tant que l’algorithme n’est pas validé.

## 9. Monnaies et progression

Le chakra est la ressource identifiée, représentée par ◆ dans les prix et le recyclage. Il débloque des boosters supplémentaires. La page Raretés indique que le recyclage conserve toujours un exemplaire de chaque carte.

Règle minimale pour la version locale : si une carte est possédée en q exemplaires, le maximum recyclable est `max(0, q − 1)`. La valeur obtenue est ce maximum multiplié par la valeur de rareté. Le retrait des doublons et le crédit de chakra doivent être atomiques.

Les modalités des boosters gratuits restent inconnues : capacité de stockage, durée de recharge, quantité initiale, recharge hors connexion, limite quotidienne et priorité entre charge gratuite et paiement en chakra. Les récompenses de missions, séries, connexion quotidienne et parrainage n’ont pas été examinées. Aucune seconde monnaie ne peut être documentée avec certitude.

## 10. Fonctions sociales visibles indirectement

### Tirages publics

L’accueil montre un flux de gros tirages consacré aux Légendaires et Mythiques. Les lignes contiennent rareté, personnage lié au wiki, pseudonyme lié au profil, badges et temps relatif. Le flux a fini par afficher une vingtaine d’entrées. Le premier état vide était un état de chargement, pas une absence certaine de tirages.

### Marché

Une section d’enchères proches de la fin contient nom de carte, rareté, nombre d’enchères, montant en ◆ et état temporel. Les exemples observés allaient d’une Légendaire sans enchère à une Mythique avec 38 enchères et 4 214 ◆. Ces montants sont des événements ponctuels, **pas des cotes fixes à coder**. Les exemples portaient « terminé » au moment de l’observation.

Inconnus : durées autorisées, prix minimum, pas d’enchère, achat immédiat, frais, réservation du chakra, remboursement du perdant, prolongation anti-sniping, nombre d’annonces et gestion des cartes mises en vente.

### Classement

L’accueil affiche un podium de trois collectionneurs, avec nombre de cartes et compteur abrégé suffixé M. Le contexte suggère que M correspond aux Mythiques, mais le texte affiché seul ne suffit pas à établir la formule de classement. Les positions sont explicitement affichées 2, 1, 3 dans l’ordre visuel du podium. Ne pas déduire un tri simple par quantité totale de cartes.

### Badges

Trois badges et leurs explications ont été observés dans les tirages : 初 pour les joueurs présents au lancement ; 証 pour un compte Discord protégé par double authentification ; 招 pour avoir fait venir cinq joueurs pendant le lancement. Le libellé de pionnier peut être genré. Les badges ne doivent pas être remplacés par des bonus de gameplay sans preuve.

### Avis

L’accueil affiche une moyenne, un total d’avis, six extraits à la fois, des étoiles, la date et cinq onglets de pages. La page d’avis visible dans le carrousel a changé sans action sur les onglets, suggérant une rotation automatique. Les commentaires et pseudonymes réels ne sont pas nécessaires à une version personnelle : utiliser des exemples locaux clairement fictifs si cette section est conservée.

## 11. Règles communautaires observées

Le site impose un compte par personne, interdit robots/scripts/failles et interdit la vente de cartes ou comptes contre de l’argent réel. Il annonce des contrôles contre les gros dons déséquilibrés via marché ou échanges, des sanctions pour abus et un score de confiance pouvant retirer classement, parrainage ou marché. Activer la double authentification Discord est présenté comme un moyen d’améliorer ce score. Les appels de sanction sont limités à un à la fois avec sept jours d’attente après une décision.

Ces règles décrivent l’environnement multijoueur d’origine. La version solo proposée n’a pas besoin de score de confiance, authentification Discord, sanctions ou modération ; conserver éventuellement une page d’information locale, sans prétendre appliquer les règles du service officiel.

## 12. Plan technique proposé pour Codex

### Objectif d’architecture

Application locale sans connexion obligatoire. React et TypeScript avec un bundler classique constituent un choix possible, **pas une identification de la stack de Kyara**. Pour les données volumineuses et la sauvegarde, IndexedDB est préférable à un unique énorme objet localStorage. Les préférences simples peuvent rester dans localStorage. Un fonctionnement totalement hors ligne nécessite aussi les portraits et les polices localement.

Ne pas dépendre du service Kyara pour le gameplay. Ne pas inclure ses endpoints privés ou des identifiants de profils réels dans la simulation. Pour une exécution Windows simple, fournir une procédure locale claire ; ne pas supposer qu’un HTML chargé en `file://` supportera toutes les fonctionnalités d’une application construite.

### Modèle de données proposé

| Objet | Champs utiles |
|---|---|
| Character | id, noms latin/japonais, œuvre principale, œuvres associées, genre si connu, favoris, rang de catalogue, rareté, POW, AURA, portrait local, biographie, seiyū |
| BoosterDefinition | id, nom, thème, symbole, couleur, catégorie, prix chakra, pool de personnages, dates de disponibilité, règles par emplacement, vedettes et taux |
| InventoryEntry | characterId, quantité, date de première obtention, favoris/verrouillage éventuel |
| PlayerSave | version de schéma, pseudonyme, chakra, inventaire, statistiques, compteurs de garantie, recharge, missions, préférences |
| OpeningRecord | identifiant unique, boosterId, coût, type de garantie, cinq résultats, date |
| MissionDefinition | type d’objectif, seuil, période, récompense, état de récupération |
| LocalMarketListing | carte, vendeur fictif, prix, historique local, échéance, état |

Les champs non observés comme favoris de collection, verrouillage et historique sont des choix proposés. Les distinguer des champs obligatoires pour reproduire les écrans connus.

### Ouverture : transaction proposée

1. Vérifier la disponibilité du booster et la charge ou le solde nécessaire.
2. Calculer les garanties applicables à partir d’un état cohérent.
3. Produire les cinq cartes une seule fois.
4. Enregistrer ensemble coût, cartes, compteur de pitié, compteur standard, statistiques et événement de mission.
5. Jouer l’animation à partir du résultat enregistré.
6. En cas de fermeture ou rechargement, restaurer ce résultat plutôt que relancer le hasard.

L’animation ne doit pas modifier l’issue du tirage. Prévoir un identifiant de transaction pour éviter deux débits au double-clic. La priorité pitié/doré/divin est à documenter comme un choix local tant qu’elle reste inconnue.

### Animation observée dans la vidéo utilisateur

La séquence réellement observée est désormais documentée en section 19. Elle remplace la proposition initiale : page d’ouverture dédiée, paquet central, découpe du haut et lumière verticale, pile de cinq dos, révélation d’une seule carte à la fois, puis résumé en éventail. Les variantes Épique/Légendaire/Mythique et les sons n’ont pas été analysés.

Pour une reconstruction : prévoir des états distincts, les miniatures de progression, les commandes de révélation et la mise en avant de la meilleure carte. Les valeurs exactes de transformations et d’easing restent des paramètres à calibrer ; aucune stack graphique d’origine n’a été identifiée.

### Sauvegarde

Prévoir export/import JSON, version de schéma, migration de sauvegarde et validation avant import. Enregistrer les dates de recharge sous forme de timestamps. Les garanties doivent survivre au redémarrage. En solo, une modification de l’horloge système peut être tolérée ou encadrée par une règle claire ; ne pas inventer une protection anti-triche officielle.

## 13. Adaptations nécessaires au solo

| Fonction originale | Adaptation locale proposée |
|---|---|
| Connexion/profil Discord | Profil local choisi librement |
| Marché entre joueurs | Marché simulé avec vendeurs fictifs, ou conversion locale explicitement nommée |
| Échanges | Collectionneur fictif demandant des échanges, avec règles locales |
| Classement mondial | Statistiques personnelles ou adversaires fictifs clairement identifiés |
| Gros tirages en direct | Historique de ses propres tirages |
| Parrainage | Retirer du cœur de jeu, ou onglet d’information sans récompense externe |
| Messages et amis | Facultatif, sans faux service de messagerie connecté |
| Nouveautés | Journal local de versions |
| Boutique | Achats uniquement en monnaie de jeu ; aucun paiement réel |

Pour se rapprocher de l’apparence, les onglets peuvent rester visibles. Pour se rapprocher de l’expérience solo, ils doivent expliquer ce qui est simulé. Ne pas produire des écrans prétendument connectés à des joueurs inexistants.

## 14. Ordre de reconstruction conseillé

1. Créer le thème et le shell : navigation, footer, états de chargement, modal de carte.
2. Construire le composant de carte avec les six styles et le dos.
3. Ajouter un catalogue local et des définitions de boosters distinctes.
4. Implémenter le moteur de tirage, garanties, recharge et sauvegarde.
5. Ajouter la collection, les albums et le recyclage conservant un exemplaire.
6. Ajouter les fiches wiki à partir des données disponibles.
7. Reconstituer les catégories limitées et boutique après clarification des écrans manquants.
8. Ajouter missions et éventuel marché simulé avec règles locales explicites.
9. Ajuster le responsive et les animations après comparaison visuelle.

Une première version avec quelques dizaines de personnages suffit à valider le moteur, mais ne suffit pas à reproduire le contenu de Kyara. Le corpus complet, les portraits et les biographies représentent un chantier distinct. Les règles de rareté doivent rester stables ou être recalculées selon une stratégie versionnée.

## 15. Vérifications utiles

- Chaque ouverture produit exactement cinq cartes.
- Les minimums des emplacements sont respectés.
- La cinquième carte devient Mythique au seuil de pitié prévu.
- Toute Mythique remet le compteur à zéro.
- Le dixième booster standard satisfait la garantie dorée.
- Le divin contient cinq Épiques ou mieux, dont une Mythique.
- Le recyclage ne retire jamais le dernier exemplaire.
- Une ouverture ne peut pas créer un solde négatif ou deux transactions pour un double-clic.
- Rechargement et import/export conservent inventaire et garanties.
- Les simulations de fréquences distinguent tirages bruts et tirages avec garanties.
- La texture du verso suit le thème du booster ; les Rares peuvent recevoir le halo bleu préalable observé dans la vidéo.
- Clavier, fermeture de dialogue et animations réduites fonctionnent.
- La version annoncée hors ligne ne demande pas de ressources externes indispensables.

## 16. Données encore nécessaires pour une reproduction fidèle

**Priorité très haute :** durée complète de recharge des boosters gratuits (capacité affichée 15 dans la vidéo) ; variantes rares de l’ouverture, sons et modes multiples ; onglets Boutique et Du jour & limités ; règles des bannières ; détail des compteurs ; catalogue complet et portraits.

**Priorité haute :** collection avec cartes possédées et manquantes ; navigation par séries ; tris et filtres ; opérations de recyclage ; missions avec récompenses et reset ; soldes et panneau Ressources ; profil personnel ; wiki accessible et verrouillé.

**Priorité secondaire :** annonces de marché détaillées ; frais et enchères ; statistiques du profil public ; formule de classement ; paramètres ; amis, messages, parrainage, avis et nouveautés ; comportement mobile.

Une poursuite autorisée dans un navigateur capable d’accéder normalement au site, ou des captures/vidéos fournies des écrans manquants, permettraient de compléter ces rubriques. Ne pas demander de mots de passe ni de codes de connexion dans le chat.

## 17. Prompt prêt à transmettre à ChatGPT/Codex

> Construis une application locale solo inspirée de Kyara en utilisant ce rapport comme cahier des charges. Ne présente comme identiques que les éléments marqués Observé. Les pages non visitées et les variantes d’animation absentes de la vidéo doivent être signalées comme provisoires. Reproduis la séquence d’ouverture observée en section 19, y compris la pile, les miniatures et le résumé en éventail. Reproduis d’abord le shell sombre, les cartes à six raretés, le dos seigaiha, le sélecteur de boosters, le chakra, les minimums par emplacement, la pitié à 250, le doré tous les dix boosters standards et le divin à 1/2000. Place les probabilités et pools dans des données configurables, distingue les taux bruts des garanties, et documente les ambiguïtés. Enregistre chaque ouverture de façon atomique avant l’animation. Ajoute collection, albums, recyclage qui conserve un exemplaire, wiki et sauvegarde locale exportable. Aucun achat réel, aucune connexion Discord obligatoire, aucune dépendance au backend Kyara. Simule explicitement les fonctions multijoueurs si elles sont conservées. Privilégie les performances et les animations réduites. Ne remplace pas les informations manquantes par de prétendues règles officielles.

## 18. Conclusion opérationnelle

Les observations permettent de reconstruire assez précisément l’identité visuelle desktop, la carte, le shell et les règles principales des boosters. La vidéo complète maintenant l’ouverture normale du booster Waifus. Les observations ne suffisent pas à garantir l’identité des pages non visitées, du catalogue, des animations de hautes raretés, des missions ou de l’économie complète. Ce rapport constitue un audit partiel détaillé et un plan de reconstruction exploitable, pas une exploration exhaustive achevée.


## 19. Analyse de l’ouverture — vidéo utilisateur

### 19.1 Source et limites

**Observé dans la vidéo « 2026-10-14 11-01-49.mp4 »**, fournie par l’utilisateur, durée 23,45 s, image 1920 × 1080 à 60 images/s. Une seule ouverture Waifus, gratuite, mode ×1, avec deux Communes, une Peu commune et deux Rares. Cette source permet de documenter l’ouverture normale et l’accueil connecté, sans nouvelle interaction avec le site par l’assistant.

Les temps ci-dessous sont relatifs au début du fichier et approximatifs, obtenus par examen de planches à 1 puis 4 images/s et de fenêtres détaillées. Les pauses de l’utilisateur ne sont pas des durées obligatoires d’animation. Aucun effet sonore n’a été écouté ou identifié ; présence d’un bouton son observée seulement. Une capture vidéo ne révèle pas les clics exacts, les événements clavier ou le code qui produit le rendu.

### 19.2 Informations nouvelles sur l’accueil connecté

- Les boosters standards portent « Gratuit » quand une charge est disponible, là où la session initiale affichait leur coût en chakra.
- La jauge de charges affiche 1/15 avant ouverture et 0/15 après. **Capacité affichée : 15** ; ne pas extrapoler la durée de recharge complète.
- Le solde chakra reste identique avant/après : cohérent avec l’ouverture gratuite observée.
- Le bouton annonce une charge gratuite restante ; un décompte du prochain gratuit est visible. À un moment, il reste 14 secondes : c’est un temps résiduel, pas la période totale de recharge.
- Waifus annonce 2 909 personnages possibles, une garantie Mythique restante de 46 boosters et 10 avant le doré. Ce sont les compteurs de cette session, pas les seuils généraux.
- Un encart d’envies indique cinq personnages souhaités présents dans le booster et 0,022 % d’en obtenir un par booster. Cela révèle une fonction de liste d’envies et de calcul de chance personnalisé, sans montrer comment ajouter une envie.
- Navigation connectée : présence de Concours et d’un bouton de notifications, absents de l’état initial inspecté. Le contenu de Concours reste inconnu.

### 19.3 Accès à l’ouverture

Le clic sur Ouvrir dans le panneau de booster conduit à **`/ouvrir/waifu`**. Ce premier clic ouvre la scène ; il ne révèle pas immédiatement les cartes. Un second bouton Ouvrir déclenche l’ouverture effective.

La scène occupe la page web, mais la barre du navigateur et la barre des tâches Windows restent visibles : **ce n’est pas un passage automatique en plein écran du système**. La navigation principale et le pied de page cèdent la place à un en-tête minimal : retour Boosters à gauche, 姫 Waifus au centre, charges et chakra à droite, icône de volume à l’extrémité.

Le fond est presque noir, avec un halo rose radial derrière le paquet et un immense 姫 tracé en contours très sombres, partiellement hors écran en bas à droite.

Le paquet central mesure visuellement environ 300 × 460 px dans cette vidéo, de x≈810 à 1110 et y≈263 à 725. Il possède une ombre ovale sous lui, un matériau rose nacré, des bordures fines dorées, KYARA, un grand sceau 姫, nom et description, et une pastille de cinq cartes. Une ligne de découpe ondulée traverse sa partie supérieure.

Sous le paquet : consigne pour ouvrir, sélecteur ×1 / ×5 / ×10 en capsule (×1 rose sélectionné), grand bouton rose Ouvrir avec charge gratuite et ligne de garantie Mythique. Les modes ×5 et ×10 sont visibles mais ne sont pas testés : nombre d’ouvertures, coût et résumé de groupe restent inconnus.

### 19.4 Chronologie visuelle

| Temps approximatif | État observé | Détail utile pour reproduire |
|---|---|---|
| 0–5 s | Accueil et défilement | Catalogue en grille, détail à droite |
| 5–7 s | Waifus sélectionné | Paquet rose et détail de son pool |
| 7–9,3 s | Scène prête | Paquet vertical, bouton Ouvrir, choix ×1/×5/×10 |
| 9,3–9,9 s | Ouverture du paquet | Haut découpé selon une ligne dentelée ; lumière blanche verticale depuis l’ouverture |
| Vers 9,9–10 s | Paquet remplacé par les cartes | Pile de dos roses, faces cachées |
| 10–11,4 s | Carte 1 cachée | Compteur 1/5, pile et cases de progression |
| Vers 11,4–12 s | Carte 1 révélée | Raine, Commune, halo neutre, badge Nouveau |
| Vers 12–13 s | Carte 2 | Dos puis Loly Aivirrne, Commune |
| Vers 13–14 s | Carte 3 | Dos puis Haato Akai, Peu commune, halo vert |
| Vers 14–15,5 s | Carte 4 | Dos entouré de bleu avant révélation ; Seri Kikyou, Rare |
| Vers 15,5–17 s | Carte 5 | Dos puis Saya Takagi, Rare, halo bleu |
| Vers 17–18 s | Transition finale | Cartes se déployant progressivement vers un éventail |
| 18–20,5 s | Résumé | Cinq cartes, meilleure au centre, boutons de suite |
| Vers 21 s | Retour à l’accueil | Retour au catalogue sans autre ouverture |

### 19.5 Déchirure du paquet

L’utilisateur déclenche l’ouverture depuis le bouton. La vidéo ne démontre pas un geste de déchirure manuel à la souris. Le haut du paquet présente une séparation dentelée ; un faisceau blanc/gris monte verticalement au-dessus de la déchirure. L’état dure une fraction de seconde puis le paquet disparaît au profit de la pile. La bande arrachée et ses éventuelles particules ne sont pas suffisamment nettes pour en donner une physique exacte.

Reconstruction proposée : découper le paquet en deux calques selon une ligne irrégulière, séparer/effacer le haut, faire apparaître une lumière ascendante, puis remplacer le paquet par la pile. Ce choix de calques est une méthode technique proposée, pas l’implémentation originale.

### 19.6 Pile et révélation individuelle

Une grande carte verticale est au centre, avec les cartes suivantes légèrement décalées derrière elle vers le haut et la droite. Le dos conserve le sceau rose du booster et les vagues seigaiha. Les losanges aux quatre coins sont visibles. La pile diminue au fil des révélations.

En haut à gauche, un compteur indique le numéro courant sur cinq. Sous la carte, cinq petites cases sont initialement sombres ; chacune devient une miniature de portrait lorsqu’une carte est découverte.

Avant révélation, une consigne indique de toucher la carte pour la retourner. Après révélation, la consigne indique de glisser ou toucher pour la suivante. Un bouton Tout révéler est présent. Une ligne précise : **Espace : suivante ; maintenir : avance rapide**. Ces commandes sont documentées par les textes de la vidéo ; leur activation par l’utilisateur et leurs comportements détaillés ne peuvent pas tous être établis.

Le passage dos/recto est très bref dans l’enregistrement. L’échantillonnage détaillé montre le remplacement du dos par le recto, puis l’arrivée du portrait et du badge ; il ne permet pas d’affirmer une rotation complète à 180° ni une durée CSS précise. Ne pas imposer une longue animation de flip 3D sous prétexte que le bouton dit « retourner ».

Le recto mesure environ 340 × 475 px dans cette scène. Le nom, rond de rareté, image, numéro, œuvre, POW et AURA reprennent le composant de carte. Un badge blanc arrondi Nouveau apparaît au-dessus. Sous la grande carte : rareté colorée, nom en titre gras, œuvre en texte gris. Un halo de la couleur de rareté s’étend derrière la carte.

**Correction du rapport initial :** le motif et la teinte du dos suivent le booster, mais les cartes Rares observées reçoivent déjà un contour et un halo bleu avant leur révélation. La règle « le verso ne révèle jamais la rareté » était trop forte. Conserver le dos rose, puis ajouter un effet externe bleu à l’état de pré-révélation Rare.

### 19.7 Résultats du tirage

| Ordre de révélation | Personnage | Rareté | Numéro catalogue | POW | AURA |
|---|---|---|---|---:|---:|
| 1 | Raine | Commune | #6293/6736 | 44 | 31 |
| 2 | Loly Aivirrne | Commune | #6085/6736 | 46 | 33 |
| 3 | Haato Akai | Peu commune | #4131/6736 | 63 | 46 |
| 4 | Seri Kikyou | Rare | #2566/6736 | 77 | 51 |
| 5 | Saya Takagi | Rare | #2154/6736 | 80 | 53 |

Les cinq cartes portent Nouveau et le résumé annonce cinq nouvelles cartes. Le comportement d’un doublon reste inconnu. **La troisième carte est Peu commune et la quatrième Rare :** cela respecte les minimums du rapport ; ces minimums ne sont pas des raretés fixes par emplacement.

### 19.8 Résumé en éventail

Le titre Waifus est centré au-dessus du résultat. Les cinq cartes se répartissent en arc : deux inclinées vers la gauche, une centrale droite et plus grande, deux inclinées vers la droite. Les rotations extérieures semblent de l’ordre de 10–15°, estimées visuellement. La centrale est surélevée et porte Meilleure carte. Un halo bleu diffuse derrière l’ensemble.

L’ordre du résumé diffère de celui des révélations : Raine, Loly Aivirrne, **Seri Kikyou au centre**, Haato Akai, Saya Takagi. Seri est mise en avant malgré une autre Rare avec POW/AURA supérieurs. **L’algorithme de « meilleure carte » reste inconnu** : ne pas supposer qu’il maximise POW, AURA ou rang de popularité. Il pourrait choisir la première carte du niveau le plus élevé, mais un seul exemple ne prouve pas cette règle.

Sous les cartes : choix ×1/×5/×10, puis Ouvrir un autre, Changer de booster, Voir la collection, Copier le lien, Image. Le bouton de nouvelle ouverture indique désormais 150 ◆ puisque la dernière charge gratuite a été consommée. Aucun de ces achats n’est effectué dans la vidéo. Les fonctions de partage/export sont visibles seulement : format de l’image, destination du lien et éventuelle fenêtre de partage non testés.

### 19.9 Spécification d’états proposée pour le clone

`ready → openingPack → hiddenCard(i) → revealedCard(i) → hiddenCard(i+1) → summary`.

- `ready` : paquet, quantités, coût, garantie et solde.
- `openingPack` : éviter les interactions concurrentes ; déchirure et lumière.
- `hiddenCard` : pile, compteur, miniatures, Tout révéler ; effet externe de rareté si prévu.
- `revealedCard` : recto, Nouveau/doublon selon données, nom et œuvre ; possibilité d’avancer.
- `summary` : résultat entier, meilleure carte mise en avant, commandes de suite.

La logique de stockage atomique décrite en section 12 reste une proposition technique. Cette vidéo ne révèle pas le moment exact où le serveur débite la charge ou écrit les cartes. Le changement visible 1/15 → 0/15 confirme une consommation, pas une architecture de transaction particulière.

### 19.10 Ce qui manque encore

Variantes Épique/Légendaire/Mythique ; booster doré et divin ; sons ; tirage avec doublons ; ouverture ×5/×10 ; activation de Tout révéler ; contrôle par glissement ; ouverture à la souris versus au clavier ; choix de la meilleure carte ; règles de recharge complètes ; comportement mobile. La vidéo permet de reproduire le flux normal observé avec bien plus de fidélité, mais ne complète pas toutes les pages du site.


## 20. Catalogue de personnages — seconde vidéo utilisateur

### 20.1 Source et couverture

Source : « 2026-10-14 11-13-14.mp4 », fournie par l’utilisateur, 362,33 secondes, 1920 × 1080, 60 images/s. Le fichier montre le défilement du catalogue `/wiki` depuis ses premières entrées jusqu’au bas de la liste, dont le dernier rang est 6736. **La vidéo parcourt le catalogue complet, mais tous les noms et titres ne sont pas intégralement lisibles** : une partie est tronquée par l’interface et certaines images sont prises pendant le mouvement.

Le texte de l’en-tête indique 959 fiches débloquées sur 6 736 pour ce compte. C’est une progression personnelle, pas un paramètre universel du jeu. Chaque carte obtenue débloque la fiche complète de son personnage.

### 20.2 Interface du wiki désormais observée

Grand titre « Le wiki des persos », sur-titre WIKI avec caractères japonais, compteur de progression, champ de recherche « Perso ou univers… » et case « Fiches débloquées seulement ». Le filtre est décoché dans la vidéo. La grille desktop comporte quatre colonnes dans un conteneur d’environ 1 216 px.

Chaque vignette horizontale comporte une image étroite à gauche, un nom en gras, une seconde ligne contenant l’œuvre et le numéro de catalogue quand il tient dans la largeur, une lettre de rareté colorée à droite et, pour de nombreuses entrées, un cadenas. Les portraits verrouillés sont sombres et monochromes ; des fiches montrent un portrait coloré sans cadenas visible, cohérent avec le déblocage annoncé. L’ordre initial correspond aux rangs croissants : #0001, #0002, etc. Les groupes de rareté évoluent de Mythique vers Commune au cours du défilement.

Les noms longs et titres sont coupés visuellement. Le champ permet une recherche par personnage ou univers, mais la recherche et le filtre ne sont pas activés dans cette vidéo. Aucun écran de fiche personnelle, biographie ou seiyū n’y est ouvert. Le catalogue comprend aussi des personnages d’œuvres liées aux jeux et adaptations animées : il ne faut pas limiter le modèle de données aux mangas.

### 20.3 Correspondances lisibles vérifiées visuellement

Ce tableau est un sous-ensemble contrôlé sur les images ; l’annexe 20.5 contient l’extraction plus large. Une orthographe a été conservée telle qu’affichée plutôt que remplacée par une translittération supposée.

| Rang | Personnage affiché | Œuvre affichée | Rareté visible |
|---|---|---|---|
| 0001 | Satoru Gojou | JUJUTSU KAISEN | Mythique |
| 0002 | Levi | Attack on Titan | Mythique |
| 0003 | Luffy Monkey | ONE PIECE | Mythique |
| 0004 | Killua Zoldyck | Hunter x Hunter | Mythique |
| 0005 | Eren Yeager | Attack on Titan | Mythique |
| 0006 | Zoro Roronoa | ONE PIECE | Mythique |
| 0009 | L Lawliet | Death Note | Mythique |
| 0010 | Ken Kaneki | Tokyo Ghoul | Mythique |
| 0012 | Arataka Reigen | Mob Psycho 100 | Mythique |
| 0013 | Guts | Berserk | Mythique |
| 0016 | Kurisu Makise | Steins;Gate | Mythique |
| 0018 | Makima | Chainsaw Man | Mythique |
| 0019 | Itachi Uchiha | Naruto | Mythique |
| 0020 | Rintarou Okabe | Steins;Gate | Mythique |
| 0022 | Yuuji Itadori | JUJUTSU KAISEN | Mythique |
| 0023 | Denji | Chainsaw Man | Mythique |
| 0024 | Kurapika | Hunter x Hunter | Mythique |
| 2361 | Afro Samurai | Afro Samurai | Rare |
| 2364 | Becky Blackbell | SPY × FAMILY | Rare |
| 2365 | Vamola | DAN DA DAN | Rare |
| 2366 | Elf Yamada | Eromanga Sensei | Rare |
| 2368 | Dragon | ONE PIECE | Rare |
| 2369 | Zombieman | One-Punch Man | Rare |
| 2375 | Lenalee Lee | D.Gray-man | Rare |
| 2377 | Laura Bodewig | Infinite Stratos | Rare |
| 2379 | Yuzuru Yamai | Date A Live | Rare |
| 2380 | Ringo Oginome | Penguindrum | Rare |
| 2382 | Tsukasa Kazuki | Romantic Killer | Rare |
| 2384 | Rizu Ogata | We Never Learn | Rare |
| 2387 | Shan Meihua | Scissor Seven | Rare |
| 2389 | Kaoru Hanayama | BAKI | Rare |
| 2390 | Rebecca Bluega… | EDENS ZERO | Rare |
| 2391 | Merlin | Fate/Zero | Rare |
| 2394 | Soo-Won | Yona of the Dawn | Rare |
| 2395 | Ayumi Otosaka | Charlotte | Rare |
| 6709 | Tenshu | Fairy Tail | Commune |
| 6710 | Yuika Suse | Witch on the Holy Night | Commune |
| 6711 | Mattan Ginger | Fairy Tail | Commune |
| 6715 | Krov | Fairy Tail | Commune |
| 6716 | Wan Chanzi | Fairy Tail | Commune |
| 6717 | Ribbon | Fairy Tail | Commune |
| 6718 | Byard | Fairy Tail | Commune |
| 6719 | Snarl | Fairy Tail | Commune |
| 6720 | Joey Fullborn | Fairy Tail | Commune |
| 6721 | Aed | Fairy Tail | Commune |
| 6722 | Balsamico Haku… | Fairy Tail | Commune |
| 6723 | Older Vanish Bro… | Fairy Tail | Commune |
| 6724 | Fortune Teller | Fairy Tail | Commune |
| 6725 | Eisenwald Twins | Fairy Tail | Commune |
| 6726 | Younger Vanish … | Fairy Tail | Commune |
| 6727 | Mimi | Fairy Tail | Commune |
| 6729 | Eita Takasugi | Aoashi | Commune |
| 6730 | Klodoa | Fairy Tail | Commune |
| 6731 | Youko | Fairy Tail | Commune |

### 20.4 Méthode et limites d’extraction

Des images du catalogue sont échantillonnées à une image par seconde. Les zones de navigateur, avatar et notifications sont exclues de la reconnaissance ; seuls les noms et sous-titres de la grille sont traités. La lecture automatique est regroupée par vignette, avec un repère temporel permettant de retrouver l’entrée dans la vidéo.

**L’annexe est un relevé OCR à contrôler, pas une base officielle validée.** Le texte « … » indique souvent une troncature déjà présente à l’écran. Certaines erreurs OCR peuvent remplacer lettres, accents, ponctuation ou chiffres. Un numéro n’est retenu comme rang candidat que s’il est reconnu sous la forme # suivie de quatre chiffres. Les répétitions dues au défilement sont regroupées quand possible ; les candidats sans rang peuvent encore contenir des doublons ou des homonymes.

Ne pas remplir les noms tronqués à partir de souvenirs. Pour construire un catalogue exploitable, conserver les labels visibles et leur provenance, puis résoudre les entrées partielles avec une source de données structurée vérifiée. Cette vidéo ne fournit pas les fichiers de portraits originaux, leurs URLs, les identifiants AniList individuels, les biographies ni toutes les statistiques des cartes.

### 20.5 Annexe — relevé des noms et œuvres visibles

**11,462 observations OCR**, regroupées en **6,736 couples de labels candidats distincts** (la ponctuation et les rangs sont exclus de la clé de regroupement). Ce nombre ne prouve pas la couverture de 6 736 personnages : variantes OCR, homonymes, troncatures et entrées manquées peuvent modifier le total. Les rangs éventuellement présents dans la colonne Œuvre sont aussi des lectures OCR à contrôler. Les correspondances de la section 20.3 priment sur les lignes automatiques contradictoires.

| Personnage — lecture OCR | Œuvre et rang éventuel — lecture OCR | Repère vidéo |
|---|---|---|
| Maomao | The Apothecary Diaries -... | 00:00 |
| Itachi Uchiha | Naruto - #0019 | 00:00 |
| Emilia | Re:ZERO -Starting Life i... | 00:00 |
| Lelouch Lampe... | Code Geass: Lelouch of ... | 00:01 |
| Eren Yeager | Attack on Titan - #00605 | 00:02 |
| Yuuji Itadori | JUJUTSU KAISEN « #0622 | 00:02 |
| Denji | Chainsaw Man - #0023 | 00:02 |
| Killua Zoldyck | Hunter x Hunter - #0004 | 00:02 |
| Kurapika | Hunter x Hunter - #0024 | 00:02 |
| Kurisu Makise | Steins:Gate - #0016 | 00:02 |
| Luffy Monkey | ONE PIECE - #0003 | 00:03 |
| L Lawliet | Death Note - #0009 | 00:04 |
| Satoru Gojou | JUJUTSU KAISEN - #0001 | 00:04 |
| Thorfinn Karlse... | Vinland Saga - #6017 | 00:04 |
| Ken Kaneki | Tokyo Ghoul - #0610 | 00:04 |
| Levi | Attack on Titan - #0002 | 00:04 |
| Light Yagami | Death Note - #0038 | 00:04 |
| Zoro Roronoa | ONE PIECE - #0006 | 00:04 |
| Frieren | Frieren: Beyond Journey’... | 00:04 |
| Mikasa Ackerm... | Attack on Titan ‘#0011 | 00:04 |
| Arataka Reigen | Mob Psycho 100 - #0012 | 00:04 |
| Rintarou Okabe | Steins:Gate - #0020 | 00:04 |
| Guts | Berserk - #0013 | 00:05 |
| Mai Sakurajima | Rascal Does Not Dream ... | 00:05 |
| Violet Evergard... | Violet Evergarden « #0829 | 00:05 |
| Kaguya Shinonii... | Kaguya-sama: Love is W... | 00:05 |
| Makima | Chainsaw Man - #0018 | 00:05 |
| Osamu Dazai | Bungo Stray Dogs - #8042 | 00:05 |
| Shouto Todoroki | My Hero Academia * #08... | 00:05 |
| Yuuiji Itadori | JUJUTSU KAISEN - #0822 | 00:05 |
| Deniji | Chainsaw Man « #0023 | 00:05 |
| Edward Elric | Fullmetal Alchemist - #6... | 00:05 |
| Kakashi Hatake | Naruto - #0027 | 00:05 |
| Megumi Fushig... | JUJUTSU KAISEN - #0035 | 00:05 |
| Power | Chainsaw Man - #0028 | 00:05 |
| Joseph Joestar | JoJo's Bizarre Adventur... | 00:06 |
| Shigeo Kageya... | Mob Psycho 100 - #0025 | 00:06 |
| Subaru Natsuki | Re:ZERO -Starting Life i... | 00:06 |
| Tanjirou Kamado | Demon Slayer: Kimetsu n... | 00:06 |
| itsuki Nakano | The Quintessential Quint... | 00:06 |
| Sakura Matou | Fate/Zero - #0034 | 00:06 |
| Katsuki Bakugou | My Hero Academia - #00... | 00:06 |
| Kiyotaka Ayano... | Classroom of the Elite - ... | 00:06 |
| Megumin | KONOSUBA -God's bless... | 00:06 |
| Saitama | One-Punch Man - #0655 | 00:06 |
| Chika Fujiwara | Kaguya-sama: Love is W... | 00:06 |
| Ichigo | DARLING in the FRANXX... | 00:06 |
| Marin Kitagawa | My Dress-Up Darling - #... | 00:06 |
| Naruto Uzumaki | Naruto * #0032 | 00:06 |
| Aki Hayakawa | Chainsaw Man - #0061 | 00:07 |
| Hitagi Senjougc... | Bakemonogatari - #0057 | 00:07 |
| Jin-U Seong | Solo Leveling - #0053 | 00:07 |
| Rem | Re:ZERO -Starting Life i... | 00:07 |
| Gintoki Sakata | Gintama - #6046 | 00:07 |
| Izumi Miyamura | Horimiya - #8058 | 00:07 |
| Miko lino | Kaguya-sama: Love is W... | 00:07 |
| Gon Freecss | Hunter x Hunter - #0651 | 00:07 |
| Yuu Ishigami | Kaguya-sama: Love is W... | 00:07 |
| Zero Two | DARLING in the FRANXX... | 00:07 |
| Askeladd | Vinland Saga - #0048 | 00:07 |
| Saniji | ONE PIECE - #0052 | 00:07 |
| Inosuke Hashibi... | Demon Slayer: Kimetsu n... | 00:08 |
| Izuku Midoriya | My Hero Academia * #08... | 00:08 |
| Nezuko Kamado | Demon Slayer: Kimetsu n... | 00:08 |
| Senkuu Ishigami | Dr. STONE - #0056 | 00:08 |
| Zenitsu Agatsu... | Demon Slayer: Kimetsu n... | 00:08 |
| Joutarou Kuujou | JoJo's Bizarre Adventur... | 00:08 |
| ichigo Kurosaki | Bleach - #0067 | 00:08 |
| Hisoka Morow | Hunter x Hunter - #8072 | 00:08 |
| Kusuo Saiki | The Disastrous Life of S... | 00:08 |
| Robin Nico | ONE PIECE - #0056 | 00:08 |
| Sanji | ONE PIECE - #0052 | 00:08 |
| Shouyou Hinata | HAIKYU!! - #0064 | 00:08 |
| Armin Arlert | Attack on Titan - #0873 | 00:09 |
| Tobio Kageyama | HAIKYUI! - #6889 | 00:09 |
| Yor Forger | SPY x FAMILY - #0069 | 00:09 |
| Asuka Langley ... | Neon Genesis Evangelio... | 00:09 |
| Sasuke Uchiha | Naruto - #0082 | 00:09 |
| Spike Spiegel | Cowboy Bebop - #0070 | 00:09 |
| Hachiman Hikig... | My Teen Romantic Come... | 00:09 |
| Maki Zenin | JUJUTSU KAISEN - #0083 | 00:09 |
| Shinobu Oshino | Bakemonogatari - #0075 | 00:09 |
| Erwin Smith | Attack on Titan - #0084 | 00:09 |
| Koyomi Araragi | Bakemonogatari - #0088 | 00:09 |
| Roy Mustang | Fullmetal Alchemist - #0... | 00:09 |
| Anya Forger | SPY x FAMILY - #0081 | 00:10 |
| Hange Zoe | Attack on Titan - #0877 | 00:10 |
| Rei Ayanami | Neon Genesis Evangelio... | 00:10 |
| Yato | Noragami - #0085 | 00:10 |
| Kento Nanami | JUJUTSU KAISEN - #0079 | 00:10 |
| Homura Akemi | Puella Magi Madoka Mag... | 00:10 |
| Johan Liebert | Monster * #0104 | 00:10 |
| Nobara Kugisaki | JUJUTSU KAISEN - #0880 | 00:10 |
| Rimuru Tempest | That Time / Got Reincar... | 00:10 |
| Artoria Pendra... | Fate/Zero - #0693 | 00:11 |
| Kana Arima | OSHI NO KO - #0097 | 00:11 |
| Karma Akabane | Assassination Classroom... | 00:11 |
| Nino Nakano | The Quintessential Quint... | 00:11 |
| Yami Sukehiro | Black Clover - #0169 | 00:11 |
| Hitori Gotou | BOCCHI THE ROCK! #... | 00:11 |
| Kyou Souma | Fruits Basket - #0114 | 00:11 |
| Kyoujurou Reng... | Demon Slayer: Kimetsu n... | 00:11 |
| Miku Nakano | The Quintessential Quint... | 00:11 |
| Misato Katsura... | Neon Genesis Evangelio... | 00:11 |
| Rin Toosaka | Fate/Zero - #0086 | 00:11 |
| Yuuta Okkotsu | JUJUTSU KAISEN - #0898 | 00:11 |
| Cc.c. | Code Geass: Lelouch of ... | 00:11 |
| Giyuu Tomioka | Demon Slayer: Kimetsu n... | 00:11 |
| Kyouko Hori | Horimiya - #0095 | 00:11 |
| Sakuta Azusazg... | Rascal Does Not Dream ... | 00:11 |
| AiHayasaka | Kaguya-sama: Love is W... | 00:11 |
| Shouko Nishinmii... | A Silent Voice - #0160 | 00:11 |
| Sukuna | JUJUTSU KAISEN - #0896 | 00:11 |
| Yuu Nishinoya | HAIKYUI!! - #0112 | 00:11 |
| Shouya Ishida | A Silent Voice - #0116 | 00:12 |
| Toge Inumaki | JUJUTSU KAISEN - #0126 | 00:12 |
| Kenma Kozume | HAIKYU!! - #0127 | 00:12 |
| Reze | Chainsaw Man - #0115 | 00:12 |
| Roxy Migurdia | Mushoku Tensei: Jobless... | 00:12 |
| Shinji Ikari | Neon Genesis Evangelio... | 00:12 |
| c.c. | Code Geass: Lelouch of ... | 00:12 |
| Kurena Kukumila | 86 EIGHTY-SIX - #0128 | 00:12 |
| Manjirou Sano | Tokyo Revengers - #0120 | 00:12 |
| Shouko Nishimii... | A Silent Voice - #0166 | 00:12 |
| Yukino Yukinoshita | My Teen Romantic Comedy S | 00:12 |
| Yuu Nishinoya | HAIKYU!! - #0112 | 00:12 |
| Gabi Braun | Attack on Titan ‘#0133 | 00:13 |
| Kazuma Satou | KONOSUBA -God's bless... | 00:13 |
| Nami | ONE PIECE : #0117 | 00:13 |
| Ash Lynx | BANANA FISH - #0138 | 00:13 |
| Phosphophyllite | Land of the Lustrous: #... | 00:13 |
| Viadilena Milizé | 86 EIGHTY-SIX - #0118 | 00:13 |
| Gyro Zeppeli | JoJo's Bizarre Adventur... | 00:13 |
| Koro-sensei | Assassination Classroom... | 00:13 |
| Gokuu Son | Dragon Ball - #0132 | 00:13 |
| Law Trafalgar | ONE PIECE - #0116 | 00:13 |
| Meruem | Hunter x Hunter - #01480 | 00:13 |
| Ace Portgas | ONE PIECE - #0145 | 00:14 |
| Kaori Miyazono | Your lie in April - #0141 | 00:14 |
| Loid Forger | SPY x FAMILY - #0121 | 00:14 |
| Musashi Miyam... | Vagabond - #0129 | 00:14 |
| Ray | The Promised Neverland... | 00:14 |
| Asuna Yuuki | Sword Art Online - #0119 | 00:14 |
| Dio Brando | JoJo's Bizarre Adventur... | 00:14 |
| Lucy | Cyberpunk: Edgerunners... | 00:14 |
| Miyuki Shirogane | Kaguya-sama: Love is W... | 00:14 |
| Rudeus Greyrat | Mushoku Tensei: Jobless... | 00:15 |
| Tatsumaki | One-Punch Man - #0149 | 00:15 |
| Chrollo Lucilfer | Hunter x Hunter - #0134 | 00:15 |
| Fern | Frieren: Beyond Journey’... | 00:15 |
| Mami Nanami | Rent-a-Girlfriend - #0136 | 00:15 |
| Shouta Aizawa | My Hero Academia * #61... | 00:15 |
| Tooru Oikawa | HAIKYUI!! - #6142 | 00:15 |
| Chopper Tony T... | ONE PIECE - #0151 | 00:15 |
| Howl | Howl's Moving Castle - #... | 00:15 |
| Shinobu Kochou | Demon Slayer: Kimetsu n... | 00:15 |
| Asta | Black Clover - #6136 | 00:15 |
| Aqua | KONOSUBA -God's bless... | 00:16 |
| Kisuke Urahara | Bleach - #0162 | 00:16 |
| Suguru Getou | JUJUTSU KAISEN + #0166 | 00:16 |
| Tooru Honda | Fruits Basket - #0146 | 00:16 |
| Tooru Oikawa | HAIKYU!! - #0142 | 00:16 |
| Yoshikage Kira | JoJo's Bizarre Adventur... | 00:16 |
| Griffith | Berserk - #0163 | 00:16 |
| Kamina | Gurren Lagann - #0143 | 00:16 |
| Kazuto Kirigaya | Sword Art Online - #6147 | 00:16 |
| Kenzou Tenma | Monster - #0155 | 00:16 |
| Kurumi Tokisaki | Date A Live - #0171 | 00:16 |
| Shikamaru Nara | Naruto - #01680 | 00:16 |
| Touka Kirishima | Tokyo Ghoul - #0164 | 00:16 |
| Yumeko Jabami | Kakegurui - #0152 | 00:16 |
| Jousuke Higash... | JoJo's Bizarre Adventur... | 00:17 |
| Lain lwakura | Serial Experiments Lain -... | 00:17 |
| Sasha Blouse | Attack on Titan - #0169 | 00:17 |
| Taiga Aisaka | Toradora! - #0161 | 00:17 |
| Rikka Takanashi | Love, Chunibyo & Other ... | 00:17 |
| Simon | Gurren Lagann - #0178 | 00:17 |
| Kei Tsukishima | HAIKYUI! - #0175 | 00:17 |
| Hanako | Toilet-bound Hanako-ku... | 00:17 |
| Revy | Black Lagoon - #0168 | 00:17 |
| Shouko Komi | Komi Can’t Communicat... | 00:17 |
| Shinei Nouzen | 86 EIGHTY-SIX - #0177 | 00:18 |
| Touji Fushiguro | JUJUTSU KAISEN - #0181 | 00:18 |
| Gaara | Naruto - #0194 | 00:18 |
| Rukia Kuchiki | Bleach - #0186 | 00:18 |
| Tengen Uzui | Demon Slayer: Kimetsu n... | 00:18 |
| Aoi Toudou | JUJUTSU KAISEN - #0195 | 00:18 |
| Eikichi Onizuka | GTO: Great Teacher Oni... | 00:18 |
| Gilgamesh | Fate/Zero - #0183 | 00:18 |
| Kei Tsukishima | HAIKYU!! - #0175 | 00:18 |
| Ryuuko Matoi | Kill la Kill - #0167 | 00:18 |
| Vegeta | Dragon Ball - #0191 | 00:18 |
| Nana Oosaki | NANA - #0176 | 00:18 |
| Alphonse Elric | Fullmetal Alchemist - #6... | 00:19 |
| Chisato Nishikigi | Lycoris Recoil - #0197 | 00:19 |
| Eris Boreas Gre... | Mushoku Tensei: Jobless... | 00:19 |
| Ranpo Edogawa | Bungo Stray Dogs - #0189 | 00:19 |
| Chifuyu Matsuno | Tokyo Revengers - #8202 | 00:19 |
| Erza Scarlet | Fairy Tail - #0198 | 00:19 |
| Reiner Braun | Attack on Titan - #0182 | 00:19 |
| Jolyne Kuujou | JoJo's Bizarre Adventur... | 00:19 |
| Ryuk | Death Note - #0199 | 00:19 |
| Sousuke Aizen | Bleach - #0203 | 00:19 |
| Ban | The Seven Deadly Sins- ... | 00:19 |
| Houtarou Oreki | Hyouka - #0196 | 00:19 |
| Momo Ayase | DAN DA DAN - #8188 | 00:19 |
| Souma Yukihira | Food Wars! - #0208 | 00:19 |
| Tsubasa Hanek... | Bakemonogatari - #0180 | 00:19 |
| Nijika Ijichi | BOCCHI THE ROCK! - #6... | 00:20 |
| Wolfgang Grim... | Monster - #0209 | 00:20 |
| Johnny Joestar | JoJo's Bizarre Adventur... | 00:20 |
| Ken Ryuuguji | Tokyo Revengers - #0207 | 00:20 |
| Kiritsugu Emiya | Fate/Zero - #0211 | 00:20 |
| Nazuna Nanaku... | Call of the Night - #0215 | 00:20 |
| Holo | Spice and Wolf - #0200 | 00:20 |
| Juuzou Suzuya | Tokyo Ghoul - #0192 | 00:20 |
| Cid Kagenou | The Eminence in Shadow -... | 00:21 |
| Toshinori Yagi | My Hero Academia - #6213 | 00:21 |
| Yoruichi Shihouin | Bleach - #0201 | 00:21 |
| Chuuya Nakahara | Bungo Stray Dogs - #0218 | 00:21 |
| Koutarou Bokuto | HAIKYUI!! - #6210 | 00:21 |
| Misa Amane | Death Note - #0266 | 00:21 |
| Raphtalia | The Rising of the Shield H... | 00:21 |
| Tetsurou Kuroo | HAIKYUI!! - #6226 | 00:21 |
| Giorno Giovanna | JoJo's Bizarre Adventure ... | 00:21 |
| Ken Ryuuguii | Tokyo Revengers - #0207 | 00:21 |
| Akame | Akame ga Kill! - #0204 | 00:21 |
| Mitsuri Kanroji | Demon Slayer: Kimetsu n... | 00:21 |
| Nagisa Shiota | Assassination Classroom -... | 00:21 |
| Nijika ljichi | BOCCHI THE ROCK! - #8... | 00:22 |
| Norman | The Promised Neverland *... | 00:22 |
| Faye Valentine | Cowboy Bebop - #0222 | 00:22 |
| Legoshi | BEASTARS - #0234 | 00:22 |
| Leorio Paradinig... | Hunter x Hunter - #0242 | 00:22 |
| Bruno Bucciarati | JoJo's Bizarre Adventure ... | 00:22 |
| Hina Chouno | Blue Box - #0223 | 00:22 |
| Jiraiya | Naruto - #0231 | 00:22 |
| Tanya Degurech... | Saga of Tanya the Evil - #... | 00:22 |
| Benimaru Shinm... | Fire Force - #0224 | 00:22 |
| Chizuru Ichinose | Rent-a-Girlfriend - #0226 | 00:22 |
| Garou | One-Punch Man‘ #0236 | 00:22 |
| Rohan Kishibe | JoJo's Bizarre Adventure ... | 00:22 |
| Akane Kurokawa | OSHI NO KO - #0241 | 00:23 |
| Chousou | JUJUTSU KAISEN - #0245 | 00:23 |
| Eijirou Kirishima | My Hero Academia - #0237 | 00:23 |
| Esdeath | Akame ga Kill! - #0229 | 00:23 |
| Rei Kiriyama | March comes in like a lion ... | 00:23 |
| Usopp | ONE PIECE - #0225 | 00:23 |
| Ai Hoshino | OSHI NO KO - #8238 | 00:23 |
| Death the Kid | Soul Eater - #0230 | 00:23 |
| Minato Namikaze | Naruto - #0251 | 00:23 |
| Meguru Bachira | BLUE LOCK - #0232 | 00:23 |
| Mio Akiyama | K-ON! - #6256 | 00:23 |
| Yui Hirasawa | K-ONI! - #6248 | 00:23 |
| Aira Shiratori | DAN DA DAN : #0257 | 00:24 |
| Alucard | Hellsing - #8249 | 00:24 |
| Asa Mitaka | Chainsaw Man - #0261 | 00:24 |
| lris | Fire Force - #0265 | 00:24 |
| Hinata Hyuuga | Naruto - #0266 | 00:24 |
| Jean Kirstein | Attack on Titan - #0250 | 00:24 |
| Kagura | Gintama - #0254 | 00:24 |
| Leorio Paradiinig... | Hunter x Hunter - #0242 | 00:24 |
| Stark | Frieren: Beyond Journey’s... | 00:24 |
| Hyakkimaru | Dororo ‘ #0239 | 00:24 |
| Rias Gremory | High School DxD - #8243 | 00:24 |
| Yoichi Isagi | BLUE LOCK - #8259 | 00:24 |
| Yuno Gasai | The Future Diary - #0267 | 00:24 |
| Genos | One-Punch Man « #0246 | 00:24 |
| Nanachi | Made in Abyss - #0252 | 00:24 |
| Ryou Yamada | BOCCHI THE ROCK! - #6... | 00:24 |
| Mayuri Shiina | Steins:Gate - #0269 | 00:25 |
| Mikoto Misaka | A Certain Magical Index - #02 | 00:25 |
| Seishirou Nagi | BLUE LOCK - #6253 | 00:25 |
| iris | Fire Force - #0265 | 00:25 |
| Yui Yuigahama | My Teen Romantic Comed... | 00:25 |
| Albedo | Overlord - #6263 | 00:25 |
| Deishuu Kaiki | Bakemonogatari - #0247 | 00:25 |
| Kenpachi Zaraki | Bleach - #0255 | 00:25 |
| Shirley Fenette | Code Geass: Lelouch of the F | 00:25 |
| Shinra Kusakabe | Fire Force - #0272 | 00:25 |
| Shun Kaidou | The Disastrous Life of Sai... | 00:25 |
| Yui Hirasawa | K-ON! - #0248 | 00:25 |
| Himiko Toga | My Hero Academia - #0258 | 00:26 |
| Rin Okumura | Blue Exorcist - #0278 | 00:26 |
| Natsu Dragneel | Fairy Tail - #0283 | 00:26 |
| Dabi | My Hero Academia - #0292 | 00:26 |
| Darkness | KONOSUBA -God's blessi... | 00:26 |
| Kaoruko Waguri | The Fragrant Flower Bloo... | 00:26 |
| Nao Tomori | Charlotte - #0281 | 00:27 |
| Punpun Onodera | Goodnight Punpun - #0289 | 00:27 |
| Reki Kyan | SK8 the Infinity - #0285 | 00:27 |
| Shanks | ONE PIECE - #0273 | 00:27 |
| Takumi Usui | Maid-Sama! - #0293 | 00:27 |
| Akeno Himejima | High School DxD - #0298 | 00:27 |
| Gabimaru | Hell’s Paradise - #0294 | 00:27 |
| Kanna Kamui | Miss Kobayashi's Dragon ... | 00:27 |
| Ochako Uraraka | My Hero Academia - #0298 | 00:27 |
| Vanitas | The Case Study of Vanita... | 00:27 |
| Koushi Sugawara | HAIKYUI! - #0291 | 00:27 |
| Naofumi lwatani | The Rising of the Shield H... | 00:27 |
| Shiro | No Game, No Life - #6271 | 00:27 |
| Aquamarine Hos... | OSHI NO KO - #6276 | 00:27 |
| Emma | The Promised Neverland -... | 00:27 |
| Momonga | Overlord - #0288 | 00:27 |
| Yotsuba Nakano | The Quintessential Quintu... | 00:28 |
| Elaina | Wandering Witch: The Jo... | 00:28 |
| Rebecca | Cyberpunk: Edgerunners -... | 00:28 |
| Vash the Stamp... | Trigun - #8282 | 00:28 |
| Kaworu Nagisa | Neon Genesis Evangelion - #€ | 00:28 |
| Koushi Sugawara | HAIKYU!! - #0291 | 00:28 |
| Tomoe | Kamisama Kiss - #0287 | 00:28 |
| Ais Wallenstein | Is It Wrong to Try to Pick ... | 00:28 |
| Kobeni Higashiy... | Chainsaw Man - #0312 | 00:28 |
| Pochita | Chainsaw Man - #0304 | 00:28 |
| Mafuyu Satou | given * #0297 | 00:29 |
| Pain | Naruto - #0305 | 00:29 |
| Shirou Emiya | Fate/Zero - #0313 | 00:29 |
| Takumi Usui | Maid-Samal! - #0293 | 00:29 |
| Hak Son | Yona of the Dawn - #0302 | 00:29 |
| Kumiko Oumae | Sound! Euphonium - #6318 | 00:29 |
| Rio Futaba | Rascal Does Not Dream o... | 00:29 |
| Arthur Boyle | Fire Force ‘ #0323 | 00:29 |
| Kosaki Onodera | Nisekoi - #0311 | 00:29 |
| Madoka Kaname | Puella Magi Madoka Magi... | 00:29 |
| Muichirou Tokitou | Demon Slayer: Kimetsu n... | 00:29 |
| Tomura Shigaraki | My Hero Academia - #0295 | 00:29 |
| Hayase Nagatoro | DON'T TOY WITH ME, MI... | 00:29 |
| Kanao Tsuyuri | Demon Slayer: Kimetsu n... | 00:29 |
| Kobeni Higashiv... | Chainsaw Man - #0312 | 00:29 |
| Mugen | Samurai Champloo - #0324 | 00:29 |
| Sebastian Mich... | Black Butler - #0306 | 00:29 |
| Maka Albarn | Soul Eater - #0333 | 00:30 |
| Noelle Silva | Black Clover - #0329 | 00:30 |
| Yona | Yona of the Dawn - #0369 | 00:30 |
| Shinoa Hiiragi | Seraph of the End: Vampi... | 00:30 |
| Archer | Fate/Zero - #0327 | 00:30 |
| David Martinez | Cyberpunk: Edgerunners -... | 00:30 |
| Tohru | Miss Kobayashi’s Dragon ... | 00:30 |
| Aguero Agnis Kh... | Tower of God - #0332 | 00:30 |
| Annie Leonhart | Attack on Titan - #0336 | 00:30 |
| Gen Asagiri | Dr. STONE - #0316 | 00:30 |
| Brook | ONE PIECE - #0321 | 00:31 |
| Hae-In Cha | Solo Leveling - #0345 | 00:31 |
| Madara Uchiha | Naruto - #0341 | 00:31 |
| Rin Shima | Laid-Back Camp ‘ #0325 | 00:31 |
| Rock Lee | Naruto - #0317 | 00:31 |
| Langa Hasegawa | SK8 the Infinity - #0326 | 00:31 |
| Nadeko Sengoku | Bakemonogatari - #0334 | 00:31 |
| Ryuunosuke Aku... | Bungo Stray Dogs - #0322 | 00:31 |
| Shino Asada | Sword Art Online - #0338 | 00:31 |
| Nana Komatsu | NANA * #0331 | 00:31 |
| Yatora Yaguchi | Blue Period - #0335 | 00:31 |
| Ken Takakura | DAN DA DAN - #8348 | 00:31 |
| Noriaki Kakyouin | JoJo's Bizarre Adventure ... | 00:31 |
| Tamaki Suou | Ouran High School Host ... | 00:31 |
| Hancock Boa | ONE PIECE : #0337 | 00:32 |
| Sora | No Game, No Life - #0357 | 00:32 |
| Mikaela Hyakuya | Seraph of the End: Vampi... | 00:32 |
| William Moriarty | Moriarty the Patriot - #03... | 00:32 |
| Dok-Ja Kim | Omniscient Reader - #0343 | 00:32 |
| Jean-Pierre Poin... | JoJo's Bizarre Adventure ... | 00:32 |
| Kousei Arima | Your lie in April - #0339 | 00:32 |
| Tenshi no Akuma | Chainsaw Man - #0359 | 00:32 |
| Akira Fudou | Devilman Crybaby - #0340 | 00:32 |
| Hanamichi Saku... | Slam Dunk - #0356 | 00:32 |
| Tomoya Okazaki | Clannad « #0352 | 00:32 |
| Haruhi Fujioka | Ouran High School Host ... | 00:33 |
| Kyouko kKirigiri | Danganronpa: The Anima... | 00:33 |
| Yuki Souma | Fruits Basket - #0353 | 00:33 |
| Jinshi | The Apothecary Diaries - ... | 00:33 |
| Mayoi Hachikuji | Bakemonogatari - #0342 | 00:33 |
| Mitsuha Miyanii... | Your Name. - #0366 | 00:33 |
| Tsukasa Yuzaki | TONIKAWA: Over The Mo... | 00:33 |
| Beatrice | Re:ZERO -Starting Life in... | 00:33 |
| Fubuki | One-Punch Man ‘ #0372 | 00:33 |
| Lucy Heartfilia | Fairy Tail - #0364 | 00:33 |
| Sawako Kuronu... | Kimi ni Todoke: From Me t... | 00:33 |
| Denki Kaminari | My Hero Academia - #0373 | 00:34 |
| Mashiro Shiina | The Pet Girl of Sakurasou... | 00:34 |
| Erina Nakiri | Food Wars! - #0362 | 00:34 |
| Feitan Portor | Hunter x Hunter - #0374 | 00:34 |
| Guido Mista | JoJo's Bizarre Adventure ... | 00:34 |
| Himmel | Frieren: Beyond Journey’s... | 00:34 |
| Casca | Berserk * #0367 | 00:34 |
| Eru Chitanda | Hyouka ‘ #0355 | 00:34 |
| Meliodas | The Seven Deadly Sins - #... | 00:34 |
| Shiki Ryougi | the Garden of sinners Ch... | 00:34 |
| Suzune Horikita | Classroom of the Elite - #... | 00:34 |
| Ulquiorra Cifer | Bleach - #0368 | 00:34 |
| Hirotaka Nifuji | Wotakoi: Love is Hard for ... | 00:35 |
| Kyouko Kirigiri | Danganronpa: The Anima... | 00:35 |
| Sylphiette | Mushoku Tensei: Jobless ... | 00:35 |
| Yuuichi Katagiri | Tomodachi Game - #0381 | 00:35 |
| Himeno | Chainsaw Man - #0378 | 00:35 |
| Mary Sactome | Kakegurui - #0386 | 00:35 |
| Akaza | Demon Slayer: Kimetsu n... | 00:35 |
| Doflamingo Don... | ONE PIECE - #0383 | 00:35 |
| Grimmjow Jaege... | Bleach - #0387 | 00:35 |
| Ougi Oshino | Bakemonogatari - #0379 | 00:35 |
| Ginko | MUSHI-SHI - #0376 | 00:35 |
| Izaya Orihara | Durarara!! - #0392 | 00:35 |
| Kotarou Katsura | Gintama - #0384 | 00:35 |
| Keisuke Baji | Tokyo Revengers * #0377 | 00:36 |
| Ritsuka Uenoyc... | given * #0401 | 00:36 |
| isaac Foster | Angels of Death - #0397 | 00:36 |
| Keigo Takami | My Hero Academia - #0394 | 00:36 |
| Mako Mankansh... | Kill la Kill - #0382 | 00:36 |
| Winry Rockbell | Fullmetal Alchemist - #0398 | 00:36 |
| Daiki Aomine | Kuroko's Basketball - #0396 | 00:36 |
| Eiji Okumura | BANANA FISH - #0388 | 00:36 |
| Izaya Orihara | Durararal!! - #0392 | 00:36 |
| Marcille Donato | Delicious in Dungeon - #6... | 00:36 |
| Bojii | Ranking of Kings - #0389 | 00:37 |
| Ritsuka Uenoyca... | given * #0401 | 00:37 |
| Sinbad | Magi: The Labyrinth of M... | 00:37 |
| Tsuyu Asui | My Hero Academia - #0393 | 00:37 |
| Azusa Nakano | K-ON! - #6390 | 00:37 |
| Haruhi Suzumiya | The Melancholy of Haruhi ... | 00:37 |
| Joe Yabuki | Megalobox - #0411 | 00:37 |
| Ram | Re:ZERO -Starting Life in... | 00:37 |
| Ryuunosuke Tan... | HAIKYUI! - #0403 | 00:37 |
| Takina Inoue | Lycoris Recoil - #0399 | 00:37 |
| Shinya Kougami | PSYCHO-PASS - #0400 | 00:37 |
| Escanor | The Seven Deadly Sins - #... | 00:38 |
| Mirio Togata | My Hero Academia - #0413 | 00:38 |
| Ritsuka VUenoyca... | given * #0401 | 00:38 |
| Decim | Death Parade - #0436 | 00:38 |
| Franky | ONE PIECE - #0410 | 00:38 |
| Naoka Ueno | A Silent Voice - #0406 | 00:38 |
| Riza Hawkeye | Fullmetal Alchemist - #0402 | 00:38 |
| Maki Oze | Fire Force ‘ #0427 | 00:38 |
| Nagito Komaeda | Danganronpa: The Anima... | 00:38 |
| Ruby Hoshino | OSHI NO KO - #0423 | 00:38 |
| Rui Tachibana | Domestic Girlfriend - #8407 | 00:38 |
| Chisa Kotegawa | Grand Blue Dreaming - #6... | 00:38 |
| Ikuyo Kita | BOCCHI THE ROCK! - #8... | 00:38 |
| Ippo Makunouchi | Hajime no Ippo: The Fight... | 00:38 |
| Newgate Edward | ONE PIECE - #0404 | 00:38 |
| Tetsuya Kuroko | Kuroko's Basketball - #0424 | 00:38 |
| Sumi Sakurasa... | Rent-a-Girlfriend - #0437 | 00:39 |
| Suruga Kanbaru | Bakemonogatari - #0417 | 00:39 |
| Trunks | Dragon Ball - #0425 | 00:39 |
| Tsumugi Kotobuki | K-ON! - #0469 | 00:39 |
| Yuri Nakamura | Angel Beats! - #0429 | 00:39 |
| Fushi | To Your Eternity - #8414 | 00:39 |
| Kallen Stactfeld | Code Geass: Lelouch of the Ff | 00:39 |
| Kyouka Jirou | My Hero Academia - #0418 | 00:39 |
| Shinichi Izumi | Parasyte -the maxim-- #... | 00:39 |
| Milim Nava | That Time / Got Reincarn... | 00:39 |
| Kanade Tachiba... | Angel Beats! - #0412 | 00:39 |
| Soul Eater Evans | Soul Eater - #8432 | 00:39 |
| Yuusuke Urames... | Yu Yu Hakusho - #0416 | 00:39 |
| Krista Lenz | Attack on Titan * #0441 | 00:40 |
| Shizuo Heiwajima | Durarara!! - #0449 | 00:40 |
| Sumi Sakurasca... | Rent-a-Girlfriend - #0437 | 00:40 |
| Tamaki Amajiki | My Hero Academia - #0433 | 00:40 |
| Kallen Stacdtfeld | Code Geass: Lelouch of the FR | 00:40 |
| Nene Yashiro | Toilet-bound Hanako-kun ... | 00:40 |
| Victor Nikiforov | Yuri!!! on ICE - #0426 | 00:40 |
| Chitoge Kirisaki | Nisekoi - #0431 | 00:40 |
| Miyako Shikimori | Shikimori's Not Just a Cu... | 00:40 |
| Tamaki Kotatsu | Fire Force - #0448 | 00:40 |
| Xiaoshi Cheng | Link Click - #0446 | 00:40 |
| Motoko Kusanagi | Ghost in the Shell - #0461 | 00:41 |
| Ryo Asuka | Devilman Crybaby - #0445 | 00:41 |
| Sumi Sakurasc... | Rent-a-Girlfriend - #0437 | 00:41 |
| Kallen Stadtfeld | Code Geass: Lelouch of the FR | 00:41 |
| Kou Mabuchi | Blue Spring Ride - #0462 | 00:41 |
| Noé Archiviste | The Case Study of Vanita... | 00:41 |
| Orihime Inoue | Bleach - #0446 | 00:41 |
| Ai Coto | WONDER EGG PRIORITY ... | 00:41 |
| Alisa Kujou | Alya Sometimes Hides Her Fe | 00:41 |
| Gray Fullbuster | Fairy Tail #0459 | 00:41 |
| Ling Yao | Fullmetal Alchemist - #8455 | 00:41 |
| Thorkell | Vinland Saga - #8443 | 00:41 |
| Crona | Soul Eater - #0444 | 00:41 |
| Ciel Phantomhive | Black Butler - #0453 | 00:42 |
| Youko Littner | Gurren Lagann - #0469 | 00:42 |
| Iskandar | Fate/Zero ‘ #0474 | 00:42 |
| Nagisa Furukawa | Clannad « #0466 | 00:42 |
| Ritsu Tainaka | K-ON! - #0450 | 00:42 |
| Toushirou Hijikata | Gintama - #0454 | 00:42 |
| Ai Ooto | WONDER EGG PRIORITY ... | 00:42 |
| Mash Burnedead | MASHLE: MAGIC AND MU... | 00:42 |
| Miku Hatsune | COLORFUL STAGE! The ... | 00:42 |
| Toushirou Hitsu... | Bleach - #0452 | 00:42 |
| Yotsugi Ononoki | Bakemonogatari - #0460 | 00:42 |
| Bell Cranel | Is It Wrong to Try to Pick ... | 00:43 |
| Hatsuharu Sou... | Fruits Basket - #0465 | 00:43 |
| Piccolo | Dragon Ball - #0477 | 00:43 |
| Fumikage Tokoy... | My Hero Academia - #0478 | 00:43 |
| Megumi Katou | Saekano: How to Raise a ... | 00:43 |
| Yuno | Black Clover - #8486 | 00:43 |
| lori Kitahara | Grand Blue Dreaming - #6... | 00:43 |
| Atsushi Nakajima | Bungo Stray Dogs - #0467 | 00:43 |
| Qifrey | Witch Hat Atelier - #0475 | 00:43 |
| Rin Matsuoka | Free! -lwatobi Swim Club-... | 00:43 |
| Shiori Sakurazaka | More than a Married Cou... | 00:43 |
| Ayumu Kasuga | Azumanga Daioh - #0468 | 00:43 |
| Beatrice | When They Cry - #0488 | 00:43 |
| Misaki Ayuzawa | Maid-Sama! - #0484 | 00:43 |
| Sakura Yamauchi | / Want to Eat Your Pancre... | 00:43 |
| Satsuki Kiryuuin | Kill la Kill - #0464 | 00:43 |
| Yuuri Plisetsky | Yuri!!! on ICE - #0476 | 00:43 |
| Alice Zuberg | Sword Art Online - #0485 | 00:44 |
| Mei Misaki | Another - #0493 | 00:44 |
| Vivy | Vivy -Fluorite Eye's Song-... | 00:44 |
| Yuu Koito | Bloom Into You - #0481 | 00:44 |
| Zeke | Attack on Titan - #0489 | 00:44 |
| Daisuke Kanbe | The Millionaire Detective ... | 00:44 |
| Edward Wong kH... | Cowboy Bebop - #0498 | 00:44 |
| Guang Lu | Link Click - #0496 | 00:44 |
| Goblin Slayer | GOBLIN SLAYER - #8479 | 00:44 |
| Iichika Nakano | The Quintessential Quintu... | 00:44 |
| Kaiji tou | Kaiji - Ultimate Survivor - ... | 00:44 |
| Kirei Kotomine | Fate/Zero - #0488 | 00:44 |
| Momo Yaoyorozu | My Hero Academia ‘ #0492 | 00:44 |
| Konata Izumi | Lucky3%Star - #0561 | 00:45 |
| Rintarou Tsumugi | The Fragrant Flower Bloo... | 00:45 |
| Kaiman | Dorohedoro - #65180 | 00:45 |
| Byakuya Kuchiki | Bleach - #0499 | 00:45 |
| Chiaki Nanami | Danganronpa: The Anima... | 00:45 |
| Keiji Akaashi | HAIKYUI!! - #0511 | 00:45 |
| Sagiri | Hell’s Paradise - #0503 | 00:45 |
| Suzuha Amane | Steins;Gate - #0507 | 00:45 |
| ichika Nakano | The Quintessential Quintu... | 00:45 |
| Kaiji ltou | Kaiji - Ultimate Survivor - ... | 00:45 |
| Kaori Shirasaki | Arifureta: From Common... | 00:46 |
| Kohaku | Dr. STONE - #0521 | 00:46 |
| Konata Izumi | Luckys¢Star - #0501 | 00:46 |
| Edward Wong H... | Cowboy Bebop - #0498 | 00:46 |
| Hiyori Iki | Noragami « #0562 | 00:46 |
| Kaede Azusaga... | Rascal Does Not Dream o... | 00:46 |
| Narancia Ghirga | JoJo's Bizarre Adventure ... | 00:46 |
| Tomoe Koga | Rascal Does Not Dream o... | 00:46 |
| Mine | Akame ga Kill! - #0515 | 00:46 |
| Mo-Ri Jin | The God of High School - ... | 00:46 |
| Wakana Gojou | My Dress-Up Darling - #0... | 00:46 |
| Anos Voldigoad | The Misfit of Demon King ... | 00:46 |
| Mathiru Shiina | The Angel Next Door Spoi... | 00:46 |
| Pieck Finger | Attack on Titan - #0508 | 00:46 |
| Shougo Makishi... | PSYCHO-PASS - #0516 | 00:46 |
| Isla | Plastic Memories - #0529 | 00:47 |
| Ruka Sarashina | Rent-a-Girlfriend - #0517 | 00:47 |
| Ryuuji Takasu | Toradora! - #0513 | 00:47 |
| Takashi Mitsuya | Tokyo Revengers * #0505 | 00:47 |
| Yuu Otosaka | Charlotte - #0525 | 00:47 |
| Jirou Sakuranos... | Bleach - #0536 | 00:47 |
| Mirai Kuriyama | Beyond the Boundary - #0... | 00:47 |
| Tomoko Kuroki | WataMote: No Matter Ho... | 00:47 |
| lllyasviel von Ein... | Fate/Zero - #0534 | 00:47 |
| Keiji Akaashi | HAIKYU!! - #0511 | 00:47 |
| Sakura Kinomoto | Cardcaptor Sakura - #0523 | 00:47 |
| Nikaido | Dorohedoro - #0532 | 00:47 |
| Sougo Okita | Gintama - #0536 | 00:47 |
| Takagi | Teasing Master Takagi-sa... | 00:47 |
| Takashi Natsume | Natsume's Book of Friend... | 00:47 |
| Ymir | Attack on Titan - #0524 | 00:47 |
| Jonathan Joestar | JoJo's Bizarre Adventure ... | 00:48 |
| Hestia | Is It Wrong to Try to Pick ... | 00:48 |
| Illyasviel von Ein... | Fate/Zero - #0534 | 00:48 |
| Rika Furude | When They Cry ‘ #0526 | 00:48 |
| Accelerator | A Certain Magical Index ° ... | 00:48 |
| Char Aznable | Mobile Suit Gundam - #6531 | 00:48 |
| Fumino Furuhashi | We Never Learn - #0539 | 00:48 |
| Funny Valentine | JoJo's Bizarre Adventure ... | 00:48 |
| Kikuri Hiroi | BOCCHI THE ROCK! - #6... | 00:48 |
| Noi | Dorohedoro - #0528 | 00:48 |
| Akari Watanabe | More than a Married Cou... | 00:49 |
| Tatsu | The Way of the Househus... | 00:49 |
| Twenty-Fifth Ba... | Tower of God - #0533 | 00:49 |
| YoRHa 2-gou B-g... | NieR:Automata Ver1.1a - #... | 00:49 |
| Saichi Sugimoto | Golden Kamuy * #0554 | 00:49 |
| Guren Ichinose | Seraph of the End: Vampi... | 00:49 |
| Kou Minamoto | Toilet-bound Hanako-kun ... | 00:49 |
| Kojirou Sasaki | Vagabond - #0560 | 00:49 |
| Laios Thorden | Delicious in Dungeon - #6... | 00:49 |
| Yotsuba Koiwai | Yotsuba&! - #0540 | 00:49 |
| Hinata Kawamo... | March comes in like a lion ... | 00:50 |
| Shin | Dorohedoro « #0565 | 00:50 |
| Takemichi Hana... | Tokyo Revengers * #0557 | 00:50 |
| Anna Yamada | The Dangers in My Heart ... | 00:50 |
| Hanako Koyanagi | Wotakoi: Love is Hard for ... | 00:50 |
| Wenli Yang | Legend of the Galactic H... | 00:50 |
| Ekubo | Mob Psycho 100 - #0543 | 00:50 |
| Shinichi Okazaki | NANA + #0555 | 00:50 |
| Jin | Samurai Champloo - #0548 | 00:50 |
| Nadeshiko Kaga... | Laid-Back Camp - #0556 | 00:50 |
| Hinata Kawameo... | March comes in like a lion ... | 00:51 |
| Rena Ryuuguu | When They Cry - #80573 | 00:51 |
| Yukine | Noragami - #0549 | 00:51 |
| Kei Karuizawa | Classroom of the Elite - #... | 00:51 |
| Kobayashi | Miss Kobayashi's Dragon ... | 00:51 |
| Mathito | JUJUTSU KAISEN « #0582 | 00:51 |
| Meme Oshino | Bakemonogatari - #0578 | 00:51 |
| Allen Walker | D.Gray-man - #0583 | 00:51 |
| Celty Sturluson | Durarara!! - #0586 | 00:51 |
| Tobi | Naruto ‘ #0568 | 00:51 |
| Misaki Nakahara | Welcome to the N-H-K - #... | 00:52 |
| Okuyasu Nijimura | JoJo's Bizarre Adventure ... | 00:52 |
| Shinsuke Takasu... | Gintama - #0581 | 00:52 |
| Akane Tsunemori | PSYCHO-PASS - #0562 | 00:52 |
| Canute Svenson | Vinland Saga - #0578 | 00:52 |
| Cheng Hua | Heaven Official's Blessing... | 00:52 |
| Bondrewd | Made in Abyss - #0587 | 00:52 |
| Greed | Fullmetal Alchemist - #0563 | 00:52 |
| Mereoleona Ver... | Black Clover ‘ #0591 | 00:52 |
| Migi | Parasyte -the maxim- * #... | 00:52 |
| Satoru Fujinuma | ERASED - #0579 | 00:52 |
| Stocking Anarchy | Panty & Stocking with Ga... | 00:52 |
| Atsumu Miya | HAIKYUI!! - #6572 | 00:52 |
| Lucy Montgome... | Bungo Stray Dogs - #0584 | 00:52 |
| Ryuu Lion | Is It Wrong to Try to Pick ... | 00:52 |
| Jibril | No Game, No Life - #0601 | 00:53 |
| Mamoru Takam... | Hajime no Ippo: The Fight... | 00:53 |
| Haku | Spirited Away - #0590 | 00:53 |
| Jinbe | ONE PIECE - #0586 | 00:53 |
| Lian Xie | Heaven Official's Blessing... | 00:53 |
| Kishibe | Chainsaw Man: #0595 | 00:53 |
| Narumi Momose | Wotakoi: Love is Hard for ... | 00:53 |
| Obanai Iguro | Demon Slayer: Kimetsu n... | 00:53 |
| Chise Hatori | The Ancient Magus’ Bride... | 00:53 |
| Satori Tendou | HAIKYU!! - #0604 | 00:53 |
| Yuki Nagato | The Melancholy of Haruhi ... | 00:53 |
| Kasumi Miwa | JUJUTSU KAISEN - #0589 | 00:54 |
| Taki Tachibana | Your Name. - #0593 | 00:54 |
| Sayaka Miki | Puella Magi Madoka Magi... | 00:54 |
| BlackxStar | Soul Eater - #0607 | 00:54 |
| Kenshin Himura | Rurouni Kenshin - #6603 | 00:54 |
| Diego Brando | JoJo's Bizarre Adventure ... | 00:54 |
| Maes Hughes | Fullmetal Alchemist - #0588 | 00:54 |
| Rosinante Dona... | ONE PIECE - #0612 | 00:54 |
| Shallitear Blood... | Overlord - #0596 | 00:54 |
| Chtholly Nota Se... | WorldEnd: What are you d... | 00:55 |
| Miya Chinen | SK8 the Infinity - #0609 | 00:55 |
| Sanemi Shinazu... | Demon Slayer: Kimetsu n... | 00:55 |
| Wuxian Wei | The Founder of Diabolism... | 00:55 |
| Yuuichirou Hyak... | Seraph of the End: Vampi... | 00:55 |
| Bishamon | Noragami « #0598 | 00:55 |
| Buntarou Mori | The Climber - #0622 | 00:55 |
| Hitoshi Shinsou | My Hero Academia * #0626 | 00:55 |
| Julius Novachro... | Black Clover - #8602 | 00:55 |
| Kyouko Sakura | Puella Magi Madoka Magi... | 00:55 |
| Oguri Cap | Umamusume: Pretty Derb... | 00:55 |
| lroha Isshiki | My Teen Romantic Comed... | 00:55 |
| Jousuke Higashi... | JoJo's Bizarre Adventure ... | 00:55 |
| Sakura Haruno | Naruto * #0608 | 00:55 |
| Hiei | Yu Yu Hakusho - #0621 | 00:56 |
| Hitohito Tadano | Komi Can’t Communicate ... | 00:56 |
| Misuzu Gundou | Tomo-chan Is a Girl! - #06... | 00:56 |
| Morgiana | Magi: The Labyrinth of M... | 00:56 |
| Astolfo | Fate/Zero ‘#0616 | 00:56 |
| Caesar Zeppeli | JoJo's Bizarre Adventure ... | 00:56 |
| Hideyoshi Nagac... | Tokyo Ghoul - #0614 | 00:56 |
| Seijuurou Akashi | Kuroko's Basketball - #0630 | 00:56 |
| Luck Voltia | Black Clover ‘#0631 | 00:56 |
| isaac Netero | Hunter x Hunter ‘ #0619 | 00:56 |
| Chrome | Dr. STONE - #0616 | 00:56 |
| Mitsumi lwakura | Skip and Loafer - #0640 | 00:56 |
| Inuyasha | InuYasha - #0633 | 00:57 |
| Ryouta Kise | Kuroko's Basketball - #0649 | 00:57 |
| Joker | Fire Force - #0650 | 00:57 |
| Kaoru Sakuraya... | SKB the Infinity - #0638 | 00:57 |
| Shizuku Murasaki | Hunter x Hunter - #0646 | 00:57 |
| Shm-Ah | Yona of the Dawn - #0634 | 00:57 |
| Delta | The Eminence in Shadow -... | 00:57 |
| Hyoumai Chigiri | BLUE LOCK - #0635 | 00:57 |
| Guy Might | Naruto - #0652 | 00:57 |
| Kyon | The Melancholy of Haruhi ... | 00:57 |
| Nanami Momoz... | Kamisama Kiss - #0648 | 00:57 |
| Utena Tenjou | Revolutionary Girl Utena - ... | 00:57 |
| Neferpitou | Hunter x Hunter - #0645 | 00:58 |
| Sara | Mushoku Tensei: Jobless ... | 00:58 |
| Atsuko Kagari | Little Witch Academia - #... | 00:58 |
| Kaoru Sakuraya... | SK8 the Infinity - #0638 | 00:58 |
| Sesshoumaru | InuYasha * #0658 | 00:58 |
| lruma Suzuki | Welcome to Demon Schoo... | 00:58 |
| Conan Edogawa | Detective Conan - #0643 | 00:58 |
| Panda | JUJUTSU KAISEN - #0663 | 00:58 |
| Sousuke Mitsuba | Toilet-bound Hanako-kun ... | 00:58 |
| Juvia Lockser | Fairy Tail - #0660 | 00:58 |
| Mitsumi hwakura | Skip and Loafer - #0640 | 00:58 |
| Shion | That Time ! Got Reincarn... | 00:58 |
| Tadashi Yamagu... | HAIKYUI!! - #6644 | 00:58 |
| Usagi Tsukino | Sailor Moon - #0636 | 00:58 |
| Haruki Nakayama | given - #0657 | 00:59 |
| Katakuri Charlo... | ONE PIECE - #0653 | 00:59 |
| Miko Yotsuya | Mieruko-chan * #0673 | 00:59 |
| Reina Kousaka | Sound! Euphonium - #0665 | 00:59 |
| Alice Nakiri | Food Wars! - #0674 | 00:59 |
| Coco | Witch Hat Atelier - #0670 | 00:59 |
| Yue | Arifureta: From Common... | 00:59 |
| Rei Miyamoto | High School of the Dead -... | 00:59 |
| Shinji Hirako | Bleach - #0667 | 00:59 |
| Soushirou Hoshi... | Kaiju No. 8- #8655 | 00:59 |
| Takumi Fujiwara | Initial D Ist Stage - #0651 | 00:59 |
| Neji Hyuuga | Naruto * #0668 | 00:59 |
| Rika Kawai | WONDER EGG PRIORITY ... | 00:59 |
| Chito | Girls' Last Tour - #0661 | 01:00 |
| Enjin | Gachiakuta - #0681 | 01:00 |
| Kurama | Yu Yu Hakusho - #0685 | 01:00 |
| Togata | Fire Punch «#0669 | 01:00 |
| Yuzuru Nishimiya | A Silent Voice - #0677 | 01:00 |
| Reg | Made in Abyss - #0662 | 01:00 |
| Haruka Nanase | Free! -lwatobi Swim Club-... | 01:00 |
| Calcifer | Howl's Moving Castle - #8... | 01:00 |
| Rumi Usagiyama | My Hero Academia ‘ #0688 | 01:00 |
| Mina Ashido | My Hero Academia - #0693 | 01:01 |
| San | Princess Mononoke « #0689 | 01:01 |
| Mihael Keehl | Death Note - #0678 | 01:01 |
| Rumiko Manbagi | Komi Can’t Communicate ... | 01:01 |
| Tatsuya Shiba | The Irregular at Magic Hi... | 01:01 |
| Yuki Suou | Alya Sometimes Hides Her Fe | 01:01 |
| Ameri Azazel | Welcome to Demon Scho... | 01:01 |
| Diablo | That Time / Got Reincarn... | 01:01 |
| Ren Amamiya | PERSONAS the Animatio... | 01:01 |
| Rikka Takarada | SSSS.GRIDMAN - #0687 | 01:01 |
| Tsunade Senju | Naruto - #0671 | 01:01 |
| illumi Zoldyck | Hunter x Hunter - #0675 | 01:01 |
| Kiyoko Shimizu | HAIKYU!! - #6692 | 01:01 |
| Nate River | Death Note - #0684 | 01:01 |
| Renge Miyauchi | Non Non Biyori - #0760 | 01:01 |
| Yuki Yoshikawa | Horimiya - #0676 | 01:01 |
| Yuuri Katsuki | Yurill! on [CE - #0701 | 01:02 |
| Beam | Chainsaw Man - #0702 | 01:02 |
| Jeanne | The Case Study of Vanita... | 01:02 |
| Robert E. O. Spee... | JoJo's Bizarre Adventure ... | 01:02 |
| Senshi | Delicious in Dungeon - #0... | 01:02 |
| Stella Vermillion | Chivalry of a Failed Knight « 4 | 01:02 |
| Sabo | ONE PIECE - #0696 | 01:02 |
| Yunyun | KONOSUBA -God's blessi... | 01:02 |
| Yuuri | Girls' Last Tour - #0688 | 01:02 |
| Dracule Mihawk | ONE PIECE - #07865 | 01:03 |
| Kino | Kino's Journey - #8697 | 01:03 |
| Yuuri Katsuki | Yurill! on ICE - #0761 | 01:03 |
| Scar | Fullmetal Alchemist - #0694 | 01:03 |
| Thors Snorresson | Vinland Saga - #0714 | 01:03 |
| Battler Ushiromii... | When They Cry - #0715 | 01:03 |
| Chizuru Hishiro | ReLIFE - #0699 | 01:03 |
| Xin Li | Kingdom * #0711 | 01:03 |
| Laurent Thierry | Great Pretender - #0724 | 01:03 |
| Weather Report | JoJo's Bizarre Adventure ... | 01:03 |
| Anko Uguisu | Call of the Night - #0713 | 01:04 |
| Kusuriuri | Mononoke - #0709 | 01:04 |
| Olivier Mira Arm... | Fullmetal Alchemist - #0717 | 01:04 |
| Ryuusui Nanami | Dr. STONE - #0721 | 01:04 |
| Yuuri Katsuki | Yuri!!! on ICE - #0701 | 01:04 |
| Perona | ONE PIECE - #0734 | 01:04 |
| Rin Itoshi | BLUE LOCK - #0722 | 01:04 |
| Yuzuriha | Hell’s Paradise - #0716 | 01:04 |
| Sniper Kamen | High-Rise Invasion - #0703 | 01:04 |
| Xim Li | Kingdom * #0711 | 01:04 |
| Akito Yamada | My Love Story with Yama... | 01:04 |
| Reinhard von Lo... | Legend of the Galactic H... | 01:04 |
| Teruki Hanazawa | Mob Psycho 100 - #0720 | 01:04 |
| Yasushi Takagi | NANA - #0716 | 01:04 |
| Akiko Yosano | Bungo Stray Dogs - #0733 | 01:05 |
| Shorter Wong | BANANA FISH - #0741 | 01:05 |
| Chinatsu Kano | Blue Box - #0746 | 01:05 |
| Grell Sutcliff | Black Butler - #0730 | 01:05 |
| Kishou Arima | Tokyo Ghoul - #0726 | 01:05 |
| Yamato | ONE PIECE - #0718 | 01:05 |
| Anna Yanami | Makeine: Too Many Losin... | 01:05 |
| Connie Springer | Attack on Titan ‘ #0747 | 01:05 |
| Koneko Toujou | High School DxD - #8723 | 01:05 |
| Ouzen | Made in Abyss - #0719 | 01:05 |
| Tatsuhiro Satou | Welcome to the N-H-K - #... | 01:05 |
| Utaha Kasumigza... | Saekano: How to Raise a... | 01:05 |
| Rory Mercury | Gate - #0732 | 01:05 |
| Eugeo | Sword Art Online - #0745 | 01:06 |
| Haruka Sakura | WIND BREAKER - #0729 | 01:06 |
| Kumoko | So I'm a Spider, So What? - # | 01:06 |
| Momiji Souma | Fruits Basket - #0725 | 01:06 |
| Baki Hanma | BAKI - #0738 | 01:06 |
| Bentham | ONE PIECE - #0758 | 01:06 |
| Suika | Dr. STONE - #0758 | 01:06 |
| Suzaku Kururugi | Code Geass: Lelouch of the F | 01:06 |
| Aki Adagaki | Masamune-kun's Revenge * # | 01:06 |
| Enrico Pucci | JoJo's Bizarre Adventure ... | 01:06 |
| Kyouya Ootori | Ouran High School Host ... | 01:06 |
| Phil | The Promised Neverland -... | 01:06 |
| Su-Yeong Han | Omniscient Reader - #0740 | 01:06 |
| Franken Stein | Soul Eater ‘ #0761 | 01:07 |
| Inori Yuzuriha | Guilty Crown - #0753 | 01:07 |
| Kite | Hunter x Hunter ‘ #0757 | 01:07 |
| Rudo | Gachiakuta - #0737 | 01:07 |
| Shouta Kazehaya | Kimi ni Todoke: From Me ... | 01:07 |
| Baki Hanma | BAK! - #0738 | 01:07 |
| Midari Ikishima | Kakegurui - #0742 | 01:07 |
| Aiko Tanaka | Goodnight Punpun - #6759 | 01:07 |
| Kirari Momobami | Kakegurui - #0743 | 01:07 |
| Nicholas D. Wolf... | Trigun - #0763 | 01:07 |
| Undertaker | Black Butler - #0767 | 01:07 |
| Utaha Kasumiga... | Saekano: How to Raise a... | 01:07 |
| Akihiko Kaji | given - #0768 | 01:07 |
| Himeko Inaba | Kokoro Connect - #0760 | 01:07 |
| Hajime Nagumo | Arifureta: From Common... | 01:08 |
| Yoichi Nagumo | SAKAMOTO DAYS - #8777 | 01:08 |
| Lucy | Elfen Lied - #0754 | 01:08 |
| Riyou Reaper | Gachiakuta - #0762 | 01:08 |
| Asuka Tanaka | Sound! Euphonium - #0755 | 01:08 |
| Chihaya Ayase | Chihayafuru - #0771 | 01:08 |
| Hikaru Hitachiin | Ouran High School Host ... | 01:08 |
| Seiko Ayase | DAN DA DAN -: #0779 | 01:08 |
| Satan Jacob | The Devil is a - #60756 | 01:08 |
| Nanami Aoyama | The Pet Girl of Sakurasou... | 01:09 |
| Princess Hibana | Fire Force - #0769 | 01:09 |
| Subaru Hoshina | The Fragrant Flower Bloo... | 01:09 |
| Abigail Jones | Great Pretender - #0782 | 01:09 |
| Cua Chulainn | Fate/Zero ‘#0766 | 01:09 |
| Kayo Hinazuki | ERASED - #0778 | 01:09 |
| Narrator | Attack on Titan - #0770 | 01:09 |
| Otto Suwen | Re:ZERO -Starting Life in... | 01:09 |
| Nia Teppelin | Gurren Lagann - #0791 | 01:09 |
| Quanxi | Chainsaw Man « #0783 | 01:09 |
| Gin Ichimaru | Bleach - #0784 | 01:09 |
| Junko Enoshima | Danganronpa: The Anima... | 01:09 |
| Kouichi Hirose | JoJo's Bizarre Adventure ... | 01:09 |
| Kouko Kaga | Golden Time - #0786 | 01:09 |
| Saeko Busujima | High School of the Dead -... | 01:09 |
| Shirayuki | Snow White with the Red ... | 01:09 |
| Megumi Tadokoro | Food Wars! - #0801 | 01:10 |
| Ami Kawashima | Toradora! - #0786 | 01:10 |
| Asahi Azumane | HAIKYUI!! - #6798 | 01:10 |
| Muzan Kibutsuji | Demon Slayer: Kimetsu n... | 01:10 |
| Saki Yumihara | In/Spectre - #0794 | 01:10 |
| Sherlock Holmes | Moriarty the Patriot - #07... | 01:10 |
| Clara Valac | Welcome to Demon Scho... | 01:10 |
| Riki Nendou | The Disastrous Life of Sai... | 01:10 |
| Totoro | My Neighbor Totoro « #07... | 01:10 |
| Leone Abbacchio | JoJo's Bizarre Adventure ... | 01:10 |
| Ryuuji Ayukawa | Blue Period - #0796 | 01:10 |
| Veldora Tempest | That Time !/ Got Reincarn... | 01:10 |
| Yuki Itose | A Sign of Affection - #0806 | 01:10 |
| Buggy | ONE PIECE - #0865 | 01:11 |
| Daichi Sawamura | HAIKYUI!! - #0869 | 01:11 |
| Najimi Osana | Komi Can’t Communicate ... | 01:11 |
| Onsoku no Sonic | One-Punch Man - #0789 | 01:11 |
| Taiga Kagami | Kuroko's Basketball - #0813 | 01:11 |
| Asahi Azumane | HAIKYU!! - #0798 | 01:11 |
| Hiro | DARLING in the FRANXX - #6 | 01:11 |
| Gin | Into the Forest of Fireflie... | 01:11 |
| Makoto Tachibca... | Free! -lwatobi Swim Club... | 01:11 |
| Shuna | That Time / Got Reincarn... | 01:11 |
| Umaru Doma | Himouto! Umaru-chan - #... | 01:11 |
| Toukai Teiou | Umamusume: Pretty Derb... | 01:11 |
| Fyodor Dostove... | Bungo Stray Dogs - #0817 | 01:12 |
| Happy | Fairy Tail * #0821 | 01:12 |
| Heinrich Runge | Monster - #0797 | 01:12 |
| Shizuka Hiratsu... | My Teen Romantic Come... | 01:12 |
| Benimaru | That Time ! Got Reincarn... | 01:12 |
| Lloyd Frontera | The Greatest Estate Deve... | 01:12 |
| Makoto Tachibcu... | Free! -lwatobi Swim Club... | 01:12 |
| Ubel | Frieren: Beyond Journey’s... | 01:12 |
| Wiz | KONOSUBA -God's blessi... | 01:12 |
| Eri | My Hero Academia - #0828 | 01:12 |
| Filo | The Rising of the Shield ... | 01:12 |
| Sabito | Demon Slayer: Kimetsu n... | 01:12 |
| Daichi Sawamura | HAIKYU!! - #0869 | 01:13 |
| Anna Liebert | Monster - #0818 | 01:13 |
| Leone | Akame ga Kill! - #0810 | 01:13 |
| Mamimi Samejima | FLCL - #6836 | 01:13 |
| Mina Ashiro | Kaiju No. 8 - #0822 | 01:13 |
| King | The Seven Deadly Sins - #... | 01:13 |
| Haru Yoshida | My Little Monster - #6812 | 01:13 |
| Louis | BEASTARS - #0824 | 01:13 |
| Touko Nanami | Bloom Into You * #0832 | 01:13 |
| Crocodile | ONE PIECE - #0841 | 01:14 |
| Sayu Ogiwara | Higehiro: After Being Rej... | 01:14 |
| Vivi Nefertari | ONE PIECE - #0845 | 01:14 |
| issei Hyoudou | High School DxD - #0829 | 01:14 |
| Katarina Claes | My Next Life as a Villaine... | 01:14 |
| Kokomi Teruhashi | The Disastrous Life of Sai... | 01:14 |
| Sachi Nanjou | Goodnight Punpun - #0838 | 01:14 |
| Tatsumi | Akame ga Kill! - #0826 | 01:14 |
| Balalaika | Black Lagoon - #0835 | 01:14 |
| Celestia Ludenb... | Danganronpa: The Anima... | 01:14 |
| Jin Bubaigawara | My Hero Academia - #0831 | 01:14 |
| Mordred Pendra... | Fate/Zero - #0851 | 01:14 |
| Shiro | Deadman Wonderland - #... | 01:14 |
| Asirpa | Golden Kamuy « #0844 | 01:14 |
| Kafka Hibino | Kaiju No. 8 - #0848 | 01:14 |
| Minori Kushieda | Toradora! - #0846 | 01:14 |
| Mio Kofune | Summer Time Rendering - #6 | 01:14 |
| Seras Victoria | Hellsing * #0836 | 01:14 |
| Mami Tomoe | Puella Magi Madoka Magi... | 01:15 |
| Sakunosuke Oda | Bungo Stray Dogs - #0861 | 01:15 |
| Tarou Kabakura | Wotakoi: Love is Hard for ... | 01:15 |
| Tsukasa Shishiou | Dr. STONE - #0837 | 01:15 |
| Jeanne d’Arc | Fate/Zero - #0842 | 01:15 |
| Meiko Honma | Anohana: The Flower We ... | 01:15 |
| Balaloika | Black Lagoon - #0835 | 01:15 |
| Uta | Tokyo Ghoul - #0839 | 01:15 |
| Shuumei Sasaki | Sasaki and Miyano * #0857 | 01:16 |
| Yamada | Smoking Behind the Supe... | 01:16 |
| Angelo Lagusa | 91 Days ‘ #0870 | 01:16 |
| Unmei | takt op.Destiny - #0862 | 01:16 |
| Alex Louis Arms... | Fullmetal Alchemist - #8855 | 01:16 |
| Aroueid Brunestud | Carnival Phantasm * #0871 | 01:16 |
| Kuro Nero | Black Clover ‘ #0875 | 01:16 |
| Reki | Haibane Renmei - #0863 | 01:16 |
| Alibaba Saluja | Magi: The Labyrinth of M... | 01:16 |
| Satoru | One-Punch Man : #0856 | 01:16 |
| Hei | Darker than Black - #6865 | 01:17 |
| Hiromi Higuruma | JUJUTSU KAISEN - #6881 | 01:17 |
| Satanichia Kuru... | Gabriel DropOut - #0873 | 01:17 |
| Jet Black | Cowboy Bebop - #0858 | 01:17 |
| Karane Inda | The 100 Girlfriends Who R... | 01:17 |
| Minene Uryuu | The Future Diary - #0866 | 01:17 |
| Momo Deviluke | To Love Ru Darkness - #0... | 01:17 |
| Obi | Snow White with the Red ... | 01:17 |
| Tenya lida | My Hero Academia - #0887 | 01:17 |
| Yutaka Hoshino | Ping Pong the Animation -... | 01:17 |
| Caren Hortensia | Carnival Phantasm - #0880 | 01:17 |
| Diane | The Seven Deadly Sins - #08: | 01:17 |
| Taichi Mashima | Chihayafuru - #0864 | 01:17 |
| Tomo Aizawa | Tomo-chan Is a Girl! - #6876 | 01:17 |
| Xerxes Break | PandoraHearts ‘ #0868 | 01:17 |
| Foo Fighters | JoJo's Bizarre Adventure ... | 01:18 |
| Orochimaru | Naruto - #0897 | 01:18 |
| Keishin Ukai | HAIKYU!! - #6878 | 01:18 |
| Renji Abarai | Bleach - #6894 | 01:18 |
| Ruijerd Superdia | Mushoku Tensei: Jobless -.. | 01:18 |
| Akari Mizunashi | Aria - #0899 | 01:18 |
| Elias Ainsworth | The Ancient Magus' Bride... | 01:18 |
| Lum | Urusei Yatsura - #0867 | 01:18 |
| Enji Todoroki | My Hero Academia - #0884 | 01:18 |
| Krul Tepes | Seraph of the End: Vampi... | 01:19 |
| Tsukuyo | Gintama - #0877 | 01:19 |
| Kaonashi | Spirited Away - #0902 | 01:19 |
| Keishin Ukai | HAIKYUI!! - #0878 | 01:19 |
| Kai Chisaki | My Hero Academia - #6903 | 01:19 |
| Kyouka Izumi | Bungo Stray Dogs - #0879 | 01:19 |
| Zen Wistaria | Snow White with the Red ... | 01:19 |
| Azusa Hamaoka | Grand Blue Dreaming - #6... | 01:19 |
| Kouhei Imamura | Grand Blue Dreaming - #6... | 01:19 |
| Reinhard van As... | Re:ZERO -Starting Life in... | 01:19 |
| Tarou Sakamoto | SAKAMOTO DAYS - #0968 | 01:19 |
| Chihiro Ogino | Spirited Away - #0893 | 01:20 |
| Doppo Kunikida | Bungo Stray Dogs - #0905 | 01:20 |
| Kaito Kuroba | Detective Conan - #0913 | 01:20 |
| Makoto Yuuki | Persona 3 the Movie: #1 S... | 01:20 |
| Watashi | The Tatami Galaxy - #0909 | 01:20 |
| Akane Kinoshita | My Love Story with Yama... | 01:20 |
| Itsuomi Nagi | A Sign of Affection - #0898 | 01:20 |
| Nicolas Brown | GANGSTA. - #0910 | 01:20 |
| Rouran | The Apothecary Diaries - ... | 01:20 |
| Zanka Nijiku | Gachiakuta - #0891 | 01:20 |
| Ein | Cowboy Bebop - #0896 | 01:20 |
| Bond | SPY x FAMILY - #6901 | 01:21 |
| Genya Shinazug... | Demon Slayer: Kimetsu n... | 01:21 |
| Adam | Record of Ragnarok - #09... | 01:21 |
| Aladdin | Magi: The Labyrinth of M... | 01:21 |
| Medusa | Fate/Zero - #0907 | 01:21 |
| Shouei Barou | BLUE LOCK - #6915 | 01:21 |
| Envy | Fullmetal Alchemist - #0928 | 01:21 |
| Jung-Hyeok Yu | Omniscient Reader - #6904 | 01:21 |
| Kazutora Hane... | Tokyo Revengers - #6932 | 01:21 |
| Kurokami no On... | Death Parade - #0912 | 01:21 |
| Chika Kudou | Kono Oto Tomare! ‘#0941 | 01:22 |
| Genya Shinazuzg... | Demon Slayer: Kimetsu n... | 01:22 |
| MEM-oho | OSHI NO KO - #0925 | 01:22 |
| Mitsuki Koga | The Guy She Was Interested / | 01:22 |
| Zora ideale | Black Clover - #0929 | 01:22 |
| Ayato Kirishima | Tokyo Ghoul - #0938 | 01:22 |
| Kintarou Oce | GOLDEN BOY - #0942 | 01:22 |
| Re-I Mayer | Ergo Proxy - #6914 | 01:22 |
| Saki Hanajima | Fruits Basket - #0918 | 01:22 |
| Shigure Souma | Fruits Basket - #0922 | 01:22 |
| Yami Yuugi | Yu-Gi-Oh! - #0926 | 01:22 |
| Yuuko Aioi | Nichijou - My Ordinary Lif... | 01:22 |
| Elma | Miss Kobayashi's Dragon ... | 01:22 |
| Haru Katou | The Millionaire Detective ... | 01:22 |
| Kuzan | ONE PIECE - #0927 | 01:22 |
| Uryuu Ishida | Bleach - #0935 | 01:22 |
| Ange Ushiromiya | When They Cry - #0916 | 01:22 |
| Igris | Solo Leveling - #8920 | 01:22 |
| Jin Enjouji | DAN DA DAN - #8944 | 01:22 |
| Senko | The Helpful Fox Senko-sa... | 01:22 |
| Lubbock | Akame ga Kill! - #0953 | 01:23 |
| Rak Wraithraiser | Tower of God - #8945 | 01:23 |
| Elizabeth Liones | The Seven Deadly Sins - #... | 01:23 |
| Temari | Naruto - #6936 | 01:23 |
| Aurora Suya Rhy... | Sleepy Princess in the De... | 01:23 |
| Maki Nishikino | Love Live! School Idol Pro... | 01:23 |
| Rangiku Matsu... | Bleach - #0955 | 01:23 |
| Siesta | The Detective Is Already ... | 01:23 |
| Honami Ichinose | Classroom of the Elite - #... | 01:23 |
| Deidara | Naruto - #0965 | 01:24 |
| Ninym Ralei | The Genius Prince's Guide... | 01:24 |
| Alpha Hatsuseno | Yokohama Kaidashi Kikou ... | 01:24 |
| Kintarou Ooe | GOLDEN BOY - #0942 | 01:24 |
| Nico Yazawa | Love Live! School Idol Pro... | 01:24 |
| Twelve | Terror in Resonance * #09... | 01:24 |
| Nausicaa | Nausicaa of the Valley of ... | 01:24 |
| Hatori Souma | Fruits Basket - #0948 | 01:24 |
| Mitsukuni Hanin... | Ouran High School Host ... | 01:24 |
| Leonardo Watch | Blood Blockade Battlefro... | 01:25 |
| Origami Tobiiohi | Date A Live - #0961 | 01:25 |
| Satou | AJIN: Demi-Human - #0957 | 01:25 |
| Tadaomi Karasu... | Assassination Classroom -... | 01:25 |
| Wangji Lan | The Founder of Diabolism... | 01:25 |
| Zabuza Momochi | Naruto - #0949 | 01:25 |
| Isuzu Sento | Amagi Brilliant Park - #09... | 01:25 |
| Kou Yamori | Call of the Night - #0962 | 01:25 |
| Kyoutarou Ichik... | The Dangers in My Heart ... | 01:25 |
| Tomoyo Daidouji | Cardcaptor Sakura - #0978 | 01:25 |
| Falin Thorden | Delicious in Dungeon - #0... | 01:25 |
| Ruri Gokou | Eromanga Sensei ‘ #0967 | 01:25 |
| Tomoyo Sakaga... | Clannad - #0975 | 01:25 |
| izutsumi | Delicious in Dungeon - #0... | 01:25 |
| Hayato Suou | WIND BREAKER - #0968 | 01:25 |
| Hyakunosuke O... | Golden Kamuy * #0980 | 01:25 |
| Kaoru Hitachiin | Ouran High School Host ... | 01:25 |
| Kei Shirogane | Kaguya-sama: Love is Wa... | 01:25 |
| Kenji Endou | 20th Century Boys ‘ #0972 | 01:25 |
| Nelliel Tu Odersc... | Bleach - #0952 | 01:25 |
| Seto Kaiba | Yu-Gi-Oh! - #0968 | 01:25 |
| Chelsea | Akame ga Kill! - #0982 | 01:26 |
| Merlin | The Seven Deadly Sins - #... | 01:26 |
| Dororo | Dororo ‘#0971 | 01:26 |
| Soi Fon | Bleach - #0979 | 01:26 |
| Gorou Akechi | PERSONAS the Animatio... | 01:26 |
| Shinpei Ajiro | Summer Time Rendering -... | 01:26 |
| Arisu Sakayanagi | Classroom of the Elite - #... | 01:27 |
| Sophie Hatter | Howl's Moving Castle - #0... | 01:27 |
| Yuuko Ichihara | xxxHOLiC - #6985 | 01:27 |
| isuzu Souma | Fruits Basket - #0989 | 01:27 |
| Myne | Ascendance of a Bookwor... | 01:27 |
| Hiroto Suwa | Orange - #0999 | 01:27 |
| Kazuma Kuwab... | Yu Yu Hakusho - #0991 | 01:27 |
| Schwi Dola | No Game, No Life - #6995 | 01:27 |
| Tomie | Junji Ito Collection - #0983 | 01:27 |
| Baku Madarame | Usogui ‘ #1004 | 01:27 |
| Futaba Sakura | PERSONAS the Animation * # | 01:27 |
| Hyakunosuke ©... | Golden Kamuy « #0980 | 01:27 |
| Touma Kamijou | A Certain Magical Index ° ... | 01:28 |
| Oscar Francois ... | Lady Oscar: The Rose of ... | 01:28 |
| Yuuki Konno | Sword Art Online - #0986 | 01:28 |
| Gyoumei Himeii... | Demon Slayer: Kimetsu n... | 01:28 |
| Hizuru Minakata | Summer Time Rendering -... | 01:28 |
| Osaragi | SAKAMOTO DAYS - #1611 | 01:28 |
| Van Hohenheim | Fullmetal Alchemist - #0987 | 01:28 |
| Yoru | Chainsaw Man ‘ #1067 | 01:28 |
| Quetzalcoatl | Miss Kobayashi’s Dragon ... | 01:28 |
| Ushikai Musume | GOBLIN SLAYER : #1066 | 01:28 |
| Yui Yoshioka | Angel Beats! - #0996 | 01:28 |
| Kaede Honjou | BOFURI: / Don't Want to ... | 01:29 |
| King Bradley | Fullmetal Alchemist - #1825 | 01:29 |
| Vanessa Enoteca | Black Clover - #1021 | 01:29 |
| Ayumu Narumi | Spiral: Bond of Reasoning... | 01:29 |
| Karen Araragi | Bakemonogatari - #1002 | 01:29 |
| Konjiki no Yami | To Love Ru - #1018 | 01:29 |
| Oz Vessalius | PandoraHearts - #1014 | 01:29 |
| Tanaka | Tanaka-kun is Always List... | 01:29 |
| Felix Argyle | Re:ZERO -Starting Life in... | 01:29 |
| Gyoumei Himei... | Demon Slayer: Kimetsu n... | 01:29 |
| Saku Natsusawa | The Fragrant Flower Bloo... | 01:29 |
| Puck | Berserk - #1008 | 01:29 |
| Rei Hino | Sailor Moon - #1612 | 01:29 |
| Ruiko Saten | A Certain Magical Index: ... | 01:29 |
| Shirase Kobuchii... | A Place Further Than the ... | 01:29 |
| Endorsi Jahad | Tower of God - #1033 | 01:30 |
| Gugu ‘#1005 | To Your Eternity | 01:30 |
| Shion | Hell’s Paradise - #1669 | 01:30 |
| Sodachi Oikura | Bakemonogatari - #1013 | 01:30 |
| Anzu Hoshino | Romantic Killer - #1636 | 01:30 |
| Aren Kuboyasu | The Disastrous Life of Sai... | 01:30 |
| Ayumu Spiral: Narumi | Bond of Reasoning... | 01:30 |
| Mohammed Avdol | JoJo's Bizarre Adventure ... | 01:30 |
| Biscuit Krueger | Hunter x Hunter - #1046 | 01:30 |
| Remi Ayasaki | Horimiya - #1832 | 01:30 |
| Takashi Morinoz... | Ouran High School Host ... | 01:30 |
| Wakatoshi Ushiii... | HAIKYU!! - #1036 | 01:30 |
| Gajeel Redfox | Fairy Tail - #1045 | 01:31 |
| Kazuya Miyuki | Ace of the Diamond - #10... | 01:31 |
| Moafuyu Kirisu | We Never Learn - #1649 | 01:31 |
| Shion Sonozaki | When They Cry - #1029 | 01:31 |
| Ushio Kofune | Summer Time Rendering -... | 01:31 |
| Hina Amano | Weathering With You - #1... | 01:31 |
| Hinata Tachibana | Tokyo Revengers - #1026 | 01:31 |
| Nejire Hadou | My Hero Academia * #1042 | 01:31 |
| Tsuchigomori | Toilet-bound Hanako-kun ... | 01:31 |
| Alpha | The Eminence in Shadow ... | 01:31 |
| Kuma Bartholo... | ONE PIECE - #1839 | 01:31 |
| Monica Everett | Secrets of the Silent Witc... | 01:31 |
| Shinako Morino... | SING YESTERDAY FOR ... | 01:31 |
| Gilbert Bougainv... | Violet Evergarden - #1048 | 01:31 |
| Kuroko Shirai | A Certain Magical Index - ... | 01:31 |
| Nimura Furuta | Tokyo Ghoul - #1044 | 01:31 |
| Shirase Kobuchi... | A Place Further Than the ... | 01:31 |
| Wakatoshi Ushiiji... | HAIKYU!! - #1036 | 01:31 |
| Hifumi Takimoto | NEW GAME! - #1038 | 01:32 |
| Klein Moretti | Lord of Mysteries - #1056 | 01:32 |
| Miyuki Shiba | The Irregular at Magic High S | 01:32 |
| Reno Ichikawa | Kaiju No. 8 - #1052 | 01:32 |
| Buddha | Record of Ragnarok - #18... | 01:33 |
| Sasori | Naruto - #1661 | 01:33 |
| Yoshiki Tsujinaka | The Summer Hikaru Died ... | 01:33 |
| Haruki Shiga | / Want to Eat Your Pancre... | 01:33 |
| Mirajane Strauss | Fairy Tail - #1058 | 01:33 |
| Ouran Nakagawa | Dead Dead Demon's Ded... | 01:33 |
| Sakamoto | Nichijou - My Ordinary Lif... | 01:33 |
| Anthy Himemiya | Revolutionary Girl Utena °... | 01:33 |
| Eijun Sawamura | Ace of the Diamond - #1063 | 01:33 |
| Sagiri zumi | Eromanga Sensei * #1067 | 01:33 |
| Sawa Nakamura | The Flowers of Evil - #1043 | 01:33 |
| Sousuke Shima | Skip and Loafer - #1055 | 01:33 |
| Tomodachi | 20th Century Boys - #1047 | 01:33 |
| Rindou Kobayashi | Food Wars! - #1064 | 01:33 |
| Futaba Yoshioka | Blue Spring Ride - #1057 | 01:34 |
| Michiru Kagemori | BNA - #1073 | 01:34 |
| Satoshi | Pokémon - #1853 | 01:34 |
| Shuuji Taira | You and / Are Polar Oppo... | 01:34 |
| Faputa | Made in Abyss - #1078 | 01:34 |
| Victorique ce BI... | Gosick - #1875 | 01:34 |
| Agott Arkrome | Witch Hat Atelier - #1076 | 01:34 |
| Alluka Zoldyck | Hunter x Hunter - #1068 | 01:34 |
| Arséne Lupin Ill | Detective Conan - #1072 | 01:34 |
| Nezumi | No.6 - #1086 | 01:34 |
| Chiyo Sakura | Monthly Girls' Nozaki-kun ... | 01:35 |
| Naota Nandaba | FLCL- #1681 | 01:35 |
| Hikaru Indou | The Summer Hikaru Died ... | 01:35 |
| Hitoka Yachi | HAIKYU!! - #1090 | 01:35 |
| Jellal Fernandes | Fairy Tail - #1670 | 01:35 |
| Kagome Higuras... | InuYasha * #1074 | 01:35 |
| Mash Kyrielight | Fate/Grand Order Absolu... | 01:35 |
| Sayaka Kanamori | Keep Your Hands Off Eizouke | 01:35 |
| Diavolo | JoJo's Bizarre Adventure ... | 01:35 |
| Komugi | Hunter x Hunter - #1071 | 01:35 |
| Momoe Sawaki | WONDER EGG PRIORITY ... | 01:35 |
| Wendy Marvell | Fairy Tail - #1091 | 01:35 |
| Susumu Nakoshi | Homunculus - #1084 | 01:35 |
| Yuujirou Hanma | BAK! - #1092 | 01:35 |
| Bulma | Dragon Ball - #1085 | 01:36 |
| Gowther | The Seven Deadly Sins - #... | 01:36 |
| Kiki | Kiki's Delivery Service - #... | 01:36 |
| Ritsu Kageyama | Mob Psycho 100 - #1097 | 01:36 |
| Hitoka Yachi | HAIKYUI!! - #1096 | 01:36 |
| Garfiel Tinsel | Re:ZERO -Starting Life in... | 01:36 |
| Hajime Ilwaizumi | HAIKYUI!! - #1899 | 01:36 |
| Mizuki | Kamisama Kiss * #1095 | 01:36 |
| Yasutora Sado | Bleach - #1679 | 01:36 |
| Bad | One-Punch Man - #1096 | 01:36 |
| Shizuka Mikazuki | Zom 100: Bucket List of th... | 01:36 |
| Shouko leiri | JUJUTSU KAISEN - #1166 | 01:36 |
| Yuri Ha Jahad | Tower of God - #1688 | 01:36 |
| Akari Kawamoto | March comes in like a lion... | 01:37 |
| Machi Komaocine | Hunter x Hunter - #1118 | 01:37 |
| Madara | Natsume's Book of Friend... | 01:37 |
| Mikoto Mikoshiba | Monthly Girls' Nozaki-kun ... | 01:37 |
| Charmy Pappits... | Black Clover ‘#1119 | 01:37 |
| Hajime lwaizumi | HAIKYUI!! - #18699 | 01:37 |
| King | One-Punch Man: #1126 | 01:37 |
| Koutarou Amon | Tokyo Ghoul - #1101 | 01:38 |
| Koutarou Tatsumi | ZOMBIE LAND SAGA - #1... | 01:38 |
| Kurama | Naruto - #1105 | 01:38 |
| Taizou Hasegawa | Gintama - #1113 | 01:38 |
| Akitaru Oubi | Fire Force - #1114 | 01:38 |
| Isabella | The Promised Neverland -... | 01:38 |
| Nina Iseri | Girls Band Cry «#1126 | 01:38 |
| lrina Jelavic | Assassination Classroom -... | 01:38 |
| Arche Eeb Rile F... | Overlord - #1103 | 01:38 |
| Ebisu | Dorohedoro ‘#1111 | 01:38 |
| Tao Hu | Genshin Impact - #1123 | 01:38 |
| Hinami Fueguchi | Tokyo Ghoul - #1116 | 01:38 |
| Mion Sonozaki | When They Cry - #1112 | 01:38 |
| Ririka Momobami | Kakegurui - #1108 | 01:38 |
| Dandy | Space Dandy « #1125 | 01:39 |
| Mio Naganohara | Nichijou - My Ordinary Lif... | 01:39 |
| Yoshiko Tsushima | Love Live! School Idol Pro... | 01:39 |
| ishtar | Fate/Grand Order Absolu... | 01:39 |
| Arata Kaizaki | ReLIFE - #1142 | 01:39 |
| Machi Komaoine | Hunter x Hunter - #1118 | 01:39 |
| Nasa Yuzaki | TONIKAWA: Over The Mo... | 01:39 |
| Rayleigh Silvers | ONE PIECE - #1134 | 01:39 |
| Utena Hiiragi | Gushing Over Magical Girls + 7 | 01:39 |
| Dominique de Sa... | The Case Study of Vanita... | 01:39 |
| Mimosa Vermilli... | Black Clover ‘#1127 | 01:39 |
| Nagisa Kubo | Kubo Won't Let Me Be Inv... | 01:39 |
| Tsukihi Araragi | Bakemonogatari - #1115 | 01:39 |
| Kikoru Shinomiya | Kaiju No. 8 - #1144 | 01:39 |
| Sanosuke Sagara | Rurouni Kenshin : #1124 | 01:39 |
| Ging Freecss | Hunter x Hunter - #1149 | 01:40 |
| Hana Uzaki | Uzaki-chan Wants to Han... | 01:40 |
| Lei Qiang | Kingdom * #1137 | 01:40 |
| Nero Claudius | Fate/Grand Order Absolu... | 01:40 |
| Rensuke Kunigca... | BLUE LOCK - #1145 | 01:40 |
| Kofuku Ebisu | Noragami * #1154 | 01:40 |
| Misha Necron | The Misfit of Demon King... | 01:40 |
| Farnese de Vand... | Berserk - #1139 | 01:40 |
| Kinji Hakari | JUJUTSU KAISEN - #1147 | 01:40 |
| Kotoko lwanaga | In/Spectre - #1151 | 01:40 |
| Mimosa Vermiilli... | Black Clover - #1127 | 01:40 |
| Takopi | Takopi's Original Sin - #1... | 01:40 |
| Xenovia Quarta | High School DxD - #1131 | 01:40 |
| Misogi Kumag«... | Medaka Box - #1156 | 01:40 |
| Nine | Terror in Resonance * #11... | 01:40 |
| Shouko Makinoh... | Rascal Does Not Dream o... | 01:40 |
| Shuu Tsukiyama | Tokyo Ghoul - #1136 | 01:40 |
| Alice Asmodeus | Welcome to Demon Scho... | 01:41 |
| Rensuke Kuniga... | BLUE LOCK - #1145 | 01:41 |
| Riko | Made in Abyss * #1141 | 01:41 |
| Raohel Gardner | Angels of Death - #1166 | 01:41 |
| Hitomi Mishima | HINAMATSURI - #1163 | 01:41 |
| Chii | Chobits - #1148 | 01:41 |
| Freeza | Dragon Ball - #1152 | 01:41 |
| Misogi Kumagce... | Medaka Box - #1156 | 01:41 |
| Togame | Katanagatari - #1168 | 01:41 |
| Makoto Edamura | Great Pretender - #1165 | 01:42 |
| Satou Matsuzaka | Happy Sugar Life - #1157 | 01:42 |
| Ashitaka | Princess Mononoke - #1150 | 01:42 |
| Jae-Ha | Yona of the Dawn - #1158 | 01:42 |
| Rachel Gardiner | Angels of Death - #1166 | 01:42 |
| Tsunayoshi Saw... | REBORN! - #1170 | 01:42 |
| Agni | Fire Punch - #1159 | 01:42 |
| Shin Asakura | SAKAMOTO DAYS - #1167 | 01:42 |
| Misogi Kumagc«... | Medaka Box - #1156 | 01:42 |
| Rize Kamishiro | Tokyo Ghoul - #1180 | 01:42 |
| Broly | Dragon Ball - #1189 | 01:43 |
| Izumi Curtis | Fullmetal Alchemist - #1162 | 01:43 |
| Mahiro Oyama | ONIMAI: I'm Now Your Sis... | 01:43 |
| Raohel Gardiner | Angels of Death - #1166 | 01:43 |
| Eto | Tokyo Ghoul - #1183 | 01:43 |
| Kojirou Nanjou | SK8 the Infinity - #1175 | 01:43 |
| Rokuro Okajima | Black Lagoon - #1191 | 01:43 |
| Sucy Manbavar... | Little Witch Academia - #... | 01:43 |
| Kakeru Kurosawa | Onani Master Kurosawa °... | 01:43 |
| Kyousuke Hori | Horimiya - #1188 | 01:43 |
| Shizu | That Time ! Got Reincarn... | 01:43 |
| x | To Be Hero X ‘#1172 | 01:43 |
| Hasuki Komai | Boarding School Juliet - #... | 01:44 |
| Makoto Tsukimo... | Ping Pong the Animation -... | 01:44 |
| Tenka Izumo | Chained Soldier - #1177 | 01:44 |
| Yuuko Kanoe | Dusk Maiden of Amnesia - #1 | 01:44 |
| Zeref | Fairy Tail - #1173 | 01:44 |
| Fran | Reincarnated as a Sword ... | 01:44 |
| Hanabi Yasurco... | Scum's Wish - #1194 | 01:44 |
| Mio Chibana | The Stranger by the Shor... | 01:44 |
| Ranma Saotome | Ranmal/2 * #1178 | 01:44 |
| Retsu Unohana | Bleach - #1198 | 01:44 |
| Alisa llichina Amii... | God Eater - #1171 | 01:44 |
| Richeh | Witch Hat Atelier - #1195 | 01:44 |
| Sei Handa | Barakamon - #1187 | 01:44 |
| Sucy Manbaver... | Little Witch Academia - #... | 01:44 |
| Luka Urushibara | Steins:Gate - #1176 | 01:44 |
| Narciso Annasui | JoJo's Bizarre Adventure ... | 01:44 |
| Nobuo Terashima | NANA - #1192 | 01:44 |
| Clare | Claymore - #1181 | 01:45 |
| Hakkekkyuu U-11... | Cells at Work! - #1193 | 01:45 |
| Hikaru Kusakabe | Doukyuusei -Classmates- ... | 01:45 |
| Hanabi Yasurao... | Scum's Wish * #1194 | 01:45 |
| Risa Koizumi | Lovely Complex - #1182 | 01:45 |
| Einar | Vinland Saga - #1211 | 01:45 |
| Makoto Naegi | Danganronpa: The Anima... | 01:45 |
| Sakamoto | Haven't You Heard? I'm S... | 01:45 |
| Waver Velvet | Fate/Zero - #1184 | 01:45 |
| Ashito Aoi | Aoashi - #1213 | 01:46 |
| Mizore Yoroizuka | Sound! Euphonium - #1205 | 01:46 |
| Finral Roulacase | Black Clover - #1202 | 01:46 |
| Xiaolang Li | Cardcaptor Sakura - #1216 | 01:46 |
| Agnes Tachyon | Umamusume: Pretty Derb... | 01:46 |
| Garp | ONE PIECE « #1207 | 01:46 |
| Kyouka Uzen | Chained Soldier - #1219 | 01:46 |
| Satowa Houzuki | Kono Oto Tomare! ‘#1215 | 01:46 |
| Beru | Solo Leveling - #1216 | 01:46 |
| Jack the Ripper | Record of Ragnarok * #12... | 01:46 |
| Miyagi | Three Days of Happiness ... | 01:46 |
| Roger Gold | ONE PIECE - #1220 | 01:46 |
| Amo Empool | Gachiakuta * #1229 | 01:47 |
| Smoker | ONE PIECE - #1209 | 01:47 |
| Anisphia Wynn P... | The Magical Revolution of... | 01:47 |
| Integra Fairbroo... | Hellsing - #1214 | 01:47 |
| Monokuma | Danganronpa: The Anima... | 01:47 |
| Shinsuke Kita | HAIKYU!! - #1222 | 01:47 |
| Hanako Honda | Asobi Asobase - worksho... | 01:47 |
| Tooru Ishikawa | Horimiya * #1227 | 01:47 |
| Yuuta Togashi | Love, Chunibyo & Other D... | 01:47 |
| Keima Katsuragi | The World God Only Know... | 01:47 |
| Kenya Kobayashi | ERASED - #1212 | 01:47 |
| Tsukasa Yugi | Toilet-bound Hanako-kun ... | 01:47 |
| Yakumo Yuuraku... | Showa Genroku Rakugo S... | 01:47 |
| Gilbert Nightray | PandoraHearts - #1225 | 01:48 |
| Mayuri Kurotsuc... | Bleach - #1237 | 01:48 |
| Mei Hatsume | My Hero Academia - #1221 | 01:48 |
| Schierke | Berserk - #1245 | 01:48 |
| Seishirou Tsugumi | Nisekoi ‘#1217 | 01:48 |
| Crusch Karsten | Re:ZERO -Starting Life in... | 01:48 |
| Ikki Kurogane | Chivalry of a Failed Knigh... | 01:48 |
| Kokichi Ouma | New Danganronpa V3: Mi... | 01:48 |
| Nano Shinonome | Nichijou - My Ordinary Lif... | 01:48 |
| Shinsuke Kita | HAIKYUI! - #1222 | 01:48 |
| Yasuho Hirose | JoJo's Bizarre Adventure ... | 01:48 |
| Fuuko Ibuki | Clannad - #1247 | 01:48 |
| Mikoto Suoh | K + #1239 | 01:48 |
| Ugetsu Murata | given * #1231 | 01:48 |
| Ayame Souma | Fruits Basket - #1224 | 01:48 |
| Tomoe | TSUKIMICHI -Moonlit Fan... | 01:48 |
| Laxus Dreyar | Fairy Tail - #1233 | 01:49 |
| Rei Suwa | Buddy Daddies - #1257 | 01:49 |
| Miria Harvent | Baccano! - #1258 | 01:49 |
| Panty Anarchy | Panty & Stocking with Ga... | 01:49 |
| Tomomi Nomiya | Real - #1258 | 01:49 |
| Demiurge | Overlord - #1243 | 01:49 |
| Fuutarou Uesugi | The Quintessential Quintu... | 01:49 |
| Emilia Justina | The Devil is a - #1240 | 01:49 |
| Josee | Josee, the Tiger and the ... | 01:49 |
| Rakurou Hizuto... | Shangri-La Frontier - #12... | 01:49 |
| Knuckle Bine | Hunter x Hunter - #1261 | 01:50 |
| Makio Koudai | Journal with Witch - #1249 | 01:50 |
| Uramichi Omota | Life Lessons with Uramichi O | 01:50 |
| Akashi | The Tatami Galaxy - #1246 | 01:50 |
| Mima Kirigoe | Perfect Blue - #1266 | 01:50 |
| Teresa | Claymore « #1263 | 01:50 |
| Yuuji Kazami | The Fruit of Grisaia * #12... | 01:50 |
| Zero Kiryuu | Vampire Knight - #1267 | 01:50 |
| Makoto Niijima | PERSONAS the Animatio... | 01:50 |
| Souei | That Time / Got Reincarn... | 01:50 |
| Sumireko Sansh... | ORESUKI: Are you the onl... | 01:50 |
| Aigis | Persona 3 the Movie: #1 S... | 01:51 |
| Sistine Fibel | Akashic Records of Basta... | 01:51 |
| Ayame Kajou | SHIMONETA: A Boring W... | 01:51 |
| Urara Shiraishi | Yamada and the Seven Wi... | 01:51 |
| Ai Haibara | Detective Conan - #1271 | 01:51 |
| Louise Francois... | The Familiar of Zero - #1... | 01:51 |
| Shinya Hiiragi | Seraph of the End: Vampic... | 01:51 |
| Dante | Devil May Cry - #1293 | 01:52 |
| Kyou Fujibayashi | Clannad - #1269 | 01:52 |
| Nayuta Kani | A Sister's All You Need. ° ... | 01:52 |
| Sachiko Fujinuma | ERASED : #1273 | 01:52 |
| Shinpachi Shimu... | Gintama * #1265 | 01:52 |
| Konan | Naruto * #1294 | 01:52 |
| Mavis Vermillion | Fairy Tail - #1270 | 01:52 |
| Isaac Dian | Durarara!! - #1295 | 01:52 |
| Ryouta Miyagi | Slam Dunk - #1287 | 01:52 |
| Shizuku Mizutani | My Little Monster - #1283 | 01:52 |
| Toua Tokuchi | One Outs - #1291 | 01:52 |
| Touko Fukawa | Danganronpa: The Anima... | 01:52 |
| Ayane Yano | Kimi ni Todoke: From Me ... | 01:52 |
| Hiroshi Odokawa | ODDTAX! - #1288 | 01:52 |
| Nagisa Hazuki | Free! -lwatobi Swim Club... | 01:52 |
| Rin Nanakura | Pseudo Harem - #1268 | 01:52 |
| Yoshikazu Miyano | Sasaki and Miyano - #1296 | 01:52 |
| Eiko Tsukimi | Ya Boy Kongming! « #1297 | 01:53 |
| Kage | Ranking of Kings - #1285 | 01:53 |
| Sakura Adachi | Adachi and Shimamura - ... | 01:53 |
| Michael Kaiser | BLUE LOCK - #1278 | 01:53 |
| Mizuho | Sonny Boy - #1286 | 01:53 |
| Puck | Re:ZERO -Starting Life in... | 01:53 |
| Shizuka Yoshimoto | The 100 Girlfriends Who Reall | 01:53 |
| Chidori Takashiro | Kiznaiver - #1303 | 01:53 |
| Nozomu Itoshiki | Sayonara, Zetsubou-Sens... | 01:53 |
| Sanae Dekomori | Love, Chunibyo & Other D... | 01:53 |
| Haiji Kiyose | Run with the Wind - #12860 | 01:53 |
| Jahy | The Great Jahy Will Not B... | 01:53 |
| Shinya Hiiragi | Seraph of the End: Vampi... | 01:53 |
| Shiroe | Log Horizon - #1292 | 01:53 |
| Joe | Megalobox - #1309 | 01:54 |
| Karyl | Princess Connect! Re:Div... | 01:54 |
| Ling Qiao | Link Click - #1301 | 01:54 |
| Neiru Aonuma | WONDER EGG PRIORITY ... | 01:54 |
| Ai Kamiya | Shikimori's Not Just a Cu... | 01:54 |
| Akatsuki | Log Horizon - #1298 | 01:54 |
| Pikachu | Pokémon - #1310 | 01:54 |
| Roberta Cisneros | Black Lagoon - #1314 | 01:54 |
| Koyuki Hikawa | The Ramparts of Ice * #1... | 01:54 |
| En | Dorohedoro - #1300 | 01:54 |
| Reo Mikage | BLUE LOCK - #1312 | 01:54 |
| YoRHa A-gata 2-... | NieR:Automata Ver1.1a - #... | 01:54 |
| iii | Kiki's Delivery Service * #... | 01:54 |
| Hajime Hinata | Danganronpa 3: The End ... | 01:55 |
| Yuuko Yoshida | The Demon Girl Next Doo... | 01:55 |
| Beta | The Eminence in Shadow ... | 01:55 |
| Kakeru Naruse | Orange - #1302 | 01:55 |
| Aru Akise | The Future Diary * #1311 | 01:55 |
| Mikoto Urabe | Mysterious Girlfriend X° ... | 01:55 |
| Shinsha | Land of the Lustrous - #1... | 01:55 |
| Vermeil | Vermeil in Gold - #1328 | 01:55 |
| Frederioa Bernkast | When They Cry - #1333 | 01:56 |
| Tamako Kitashir... | Tamako Market * #1325 | 01:56 |
| Kyouko Toshinou | YuruYuri ‘ #1330 | 01:56 |
| Moka Akashiya | Rosario + Vampire - #1322 | 01:56 |
| Hina Tachibana | Domestic Girlfriend - #1335 | 01:56 |
| Miyu Suzuki | You and / Are Polar Oppo... | 01:56 |
| Tokushirou Tsur... | Golden Kamuy - #1319 | 01:56 |
| Ame-chan | NEEDY GIRL OVERDOSE -... | 01:56 |
| Ibuki Mioda | Danganronpa: The Anima... | 01:56 |
| Iggy | JoJo's Bizarre Adventure ... | 01:56 |
| Jiii | Kiki's Delivery Service * #... | 01:56 |
| Nano Eiai | The 100 Girlfriends Who R... | 01:56 |
| The Skull Knight | Berserk - #1324 | 01:56 |
| Douma | Demon Slayer: Kimetsu n... | 01:57 |
| Hirofumi Yoshida | Chainsaw Man - #1329 | 01:57 |
| Yoriichi Tsugikuni | Demon Slayer: Kimetsu n... | 01:57 |
| Benedict Blue | Violet Evergarden - #1334 | 01:57 |
| Diana Cavendish | Little Witch Academia ° #... | 01:57 |
| Jinzouningen 18-... | Dragon Ball - #1356 | 01:57 |
| Mei Mei | JUJUTSU KAISEN - #1343 | 01:57 |
| Oden Kouzuki | ONE PIECE - #1347 | 01:57 |
| Sakaki | Azumanga Daioh * #1339 | 01:57 |
| Suletta Meroury | Mobile Suit Gundam - #1323 | 01:57 |
| Fuu Kasumi | Samurai Champloo - #1356 | 01:57 |
| Ranga | That Time ! Got Reincarn... | 01:57 |
| Sheele | Akame ga Kill! - #1348 | 01:57 |
| Yousei Yunde | GOBLIN SLAYER « #1352 | 01:57 |
| Hana Midorikawa | Prison School - #1341 | 01:58 |
| Sasha Neoron | The Misfit of Demon King Acz | 01:58 |
| Takehito Moroku... | Prison School - #1353 | 01:58 |
| Itaru Hashida | Steins:Gate - #1342 | 01:58 |
| Seiya Ryuguin | Cautious Hero: The Hero /... | 01:58 |
| Saika Totsuka | My Teen Romantic Come... | 01:58 |
| Ghislaine Dedoldia | Mushoku Tensei: Jobless Reir | 01:58 |
| Sebas Tian | Overlord - #1364 | 01:58 |
| Pen Pen | Neon Genesis Evangelion - #1 | 01:59 |
| Akane Shinjou | SSSS.GRIDMAN - #1346 | 01:59 |
| Hawk | The Seven Deadly Sins - #... | 01:59 |
| Juliet Persia | Boarding School Juliet - #... | 01:59 |
| Kagami Hiiragi | Lucky3yStar - #1371 | 01:59 |
| Byakuya Togami | Danganronpa: The Anima... | 01:59 |
| Anzu | HINAMATSURI - #1377 | 02:00 |
| Euphyllia Magen... | The Magical Revolution of... | 02:00 |
| Penelope Eckhart | Villains Are Destined to D... | 02:00 |
| Shirou Oogami | BNA: #1365 | 02:00 |
| Zeno | Yona of the Dawn - #1357 | 02:00 |
| Gabriel Tenma W... | Gabriel DropOut - #1362 | 02:00 |
| Hermes Costello | JoJo's Bizarre Adventure ... | 02:00 |
| Kiruko | Tengoku Daimakyo - #1358 | 02:00 |
| Michel Bollinger | Fata Morgana no Yakata: ... | 02:00 |
| YoRHa 9-gou S-g... | NieR:Automata Ver1.1a ° #... | 02:00 |
| Akio Furukawa | Clannad - #1367 | 02:00 |
| Alice | PandoraHearts - #1359 | 02:00 |
| Dae-Wi Han | The God of High School - ... | 02:00 |
| Ereshkigal | Fate/Grand Order Absolu... | 02:00 |
| Kagami Hiiragi | LuckyyyStar - #1371 | 02:00 |
| Subaru Awa | Girls Band Cry - #1375 | 02:00 |
| Touta Matsuda | Death Note - #1387 | 02:00 |
| Bang | One-Punch Man : #1368 | 02:00 |
| Airi Katagiri | ERASED : #1389 | 02:01 |
| Lala Deviluke | To Love Ru - #1369 | 02:01 |
| Rem Galleu | How NOT to Summon a D... | 02:01 |
| Sae Itoshi | BLUE LOCK - #1373 | 02:01 |
| Makoto Kino | Sailor Moon * #1398 | 02:01 |
| Saki Nikaidou | ZOMBIE LAND SAGA °: #1... | 02:01 |
| Chizuru Yoshida | Kimi ni Todoke: From Me ... | 02:01 |
| Kagami Hiiragi | Lucky¥zStar - #1371 | 02:01 |
| Shintarou Midori... | Kuroko's Basketball - #1395 | 02:01 |
| Umi Asanagi | / Made Friends with the S... | 02:01 |
| ikumi Mito | Food Wars! - #1391 | 02:01 |
| Miwako Sakura... | Paradise Kiss - #1384 | 02:01 |
| Nona | Death Parade - #1372 | 02:01 |
| Viral | Gurren Lagann ‘#1388 | 02:01 |
| Naru Kotoishi | Barakamon - #1393 | 02:02 |
| Sango | InuYasha - #1401 | 02:02 |
| Anju Emma | 86 EIGHTY-SIX - #1396 | 02:02 |
| Hild | Vinland Saga - #1382 | 02:02 |
| Ryuu Sanada | Kimi ni Todoke: From Me ... | 02:02 |
| Seika Ijichi | BOCCHI THE ROCK! : #11... | 02:02 |
| Beerus | Dragon Ball - #1411 | 02:02 |
| iIkumi Mito | Food Wars! - #1391 | 02:02 |
| Charlotte Roselei | Black Clover - #1392 | 02:02 |
| Cynthia Moore | Great Pretender - #1404 | 02:02 |
| Ryuusei Shidou | BLUE LOCK - #1388 | 02:02 |
| Nana Daiba | Revue Starlight - #1409 | 02:03 |
| Nonon Jakuzure | Kill la Kill: #1405 | 02:03 |
| Suguha Kirigaya | Sword Art Online - #1413 | 02:03 |
| Kojirou | Pokémon - #1410 | 02:03 |
| Ponyo | Ponyo #1394 | 02:03 |
| Sajuna Inui | My Dress-Up Darling - #1... | 02:03 |
| Yuzu Aihara | Citrus - #1414 | 02:03 |
| Fafnir | Miss Kobayashi's Dragon ... | 02:03 |
| Misaki Shokuhou | A Certain Magical Index - #1¢ | 02:03 |
| Marine Houshou | Holo no Graffiti - #1424 | 02:03 |
| Satoko Houjou | When They Cry - #1396 | 02:03 |
| Satoshi Isshiki | Food Wars! - #1400 | 02:03 |
| Athanasia de Al... | Who Made Me a Princess ... | 02:04 |
| Nana Hiiragi | Talentless Nana - #1421 | 02:04 |
| Uta | ONE PIECE - #1425 | 02:04 |
| Maho Hiyajou | Steins:Gate - #1426 | 02:04 |
| Mio | TSUKIMICHI -Moonlit Fan... | 02:04 |
| Liugqi Wu | Scissor Seven * #1423 | 02:04 |
| Qi Wang | Kingdom * #1487 | 02:04 |
| Ippanjin | Akudama Drive ‘ #1436 | 02:04 |
| Mari Makinami Ilhus | Evangelion: 1.0 You Are (Not) | 02:04 |
| Mikoto Aiura | The Disastrous Life of Sai... | 02:04 |
| Mumei | Kabaneri of the Iron Fortr... | 02:04 |
| Osamu Miya | HAIKYUI!! - #1426 | 02:04 |
| Yui | Sword Art Online - #1416 | 02:04 |
| Yoh Asakura | SHAMAN KING - #1429 | 02:05 |
| Gesioht | PLUTO - #1418 | 02:05 |
| Yuzuru Otonashi | Angel Beats! - #1438 | 02:05 |
| Aya Oosawa | The Guy She Was Interest... | 02:05 |
| Botan | Yu Yu Hakusho - #1443 | 02:05 |
| Cell | Dragon Ball - #1427 | 02:05 |
| Liuqi Wu | Scissor Seven * #1423 | 02:05 |
| Olruggio | Witch Hat Atelier - #1419 | 02:05 |
| Yoshino | Date A Live - #1435 | 02:05 |
| Ippanjm | Akudama Drive - #1436 | 02:05 |
| Kotori Minami | Love Live! School Idol Pro... | 02:05 |
| Narberal Gamma | Overlord - #1428 | 02:05 |
| Umi Sonoda | Love Live! School Idol Pro... | 02:05 |
| Mai Minakami | Nichijou - My Ordinary Lif... | 02:06 |
| Minami Nanami | Bottom-Tier Character T... | 02:06 |
| Miyo Saimori | My Happy Marriage « #14... | 02:06 |
| Reina Aharen | Aharen-san wa Hakarenai... | 02:06 |
| Shoutarou Kane... | Akira - #1445 | 02:06 |
| Azusa Aizawa | I've Been Killing Slimes fo... | 02:06 |
| Chihiro Rokuhira | Kagurabachi - #1442 | 02:06 |
| Maika Sakurano... | BLEND-S - #1446 | 02:06 |
| Minako Aino | Sailor Moon - #1434 | 02:06 |
| Shinka Nibutani | Love, Chunibyo & Other D... | 02:06 |
| Lucas | Who Made Me a Princess ... | 02:06 |
| Mariya Kujou | Alya Sometimes Hides Her Fé | 02:06 |
| Shichika Yasuri | Katanagatari - #1447 | 02:06 |
| Boruto Uzumaki | Naruto #1452 | 02:06 |
| Mari Makinami Illus | Evangelion: 1.0 You Are (Not) | 02:06 |
| Paul Greyrat | Mushoku Tensei: Jobless ... | 02:06 |
| Hakari Hanazono | The 100 Girlfriends Who R... | 02:07 |
| Nacht Faust | Black Clover ‘ #1469 | 02:07 |
| Rintarou Suna | HAIKYU!! - #1465 | 02:07 |
| Sena Kashiwazc... | Haganai ‘ #1461 | 02:07 |
| Hajime Umemiya | WIND BREAKER - #1470 | 02:07 |
| Marie-Joseph S... | Innocent ‘#1466 | 02:07 |
| Rentarou Aijou | The 100 Girlfriends Who R... | 02:07 |
| Judeau | Berserk - #1451 | 02:07 |
| Venti | Genshin - #1471 | 02:07 |
| Yukino Miyazawa | His and Her Circumstanc... | 02:07 |
| Misaki Takasaki | LOVE and LIES - #1444 | 02:07 |
| Komachi Hikigaya | My Teen Romantic Comedy S | 02:08 |
| Neito Monoma | My Hero Academia - #1477 | 02:08 |
| Sena Kashiwaza... | Haganai ‘ #1461 | 02:08 |
| Arisa Votani | Fruits Basket - #1478 | 02:08 |
| Morgana | Fata Morgana no Yakata: ... | 02:08 |
| Serpico | Berserk - #1458 | 02:08 |
| Mariya Kujou | Alya Sometimes Hides Her Fe | 02:08 |
| Mio Naruse | The Testament of Sister New | 02:08 |
| Haru | BEASTARS - #1464 | 02:08 |
| Tsubaki Nakats... | Soul Eater - #1456 | 02:08 |
| Aoko Aozaki | Carnival Phantasm * #1493 | 02:09 |
| Miia | Monster Musume: Everyd... | 02:09 |
| Rintarou Suna | HAIKYUI! - #1465 | 02:09 |
| Wenge Kong | Ping Pong the Animation -... | 02:09 |
| Alice Lendrott | The Duke of Death and Hi... | 02:09 |
| Arisa Uotani | Fruits Basket - #1478 | 02:09 |
| Bulat | Akame ga Kill! - #1462 | 02:09 |
| Haru Nonaka | SING YESTERDAY FOR ... | 02:09 |
| Hisashi Mitsui | Slam Dunk - #1479 | 02:09 |
| Kokushibo | Demon Slayer: Kimetsu n... | 02:09 |
| Kurumi Ebisuza... | SCHOOL-LIVE! - #1495 | 02:09 |
| Nozomi Toujou | Love Live! School Idol Pro... | 02:09 |
| Shura Kirigakure | Blue Exorcist - #1491 | 02:09 |
| Diamond | Land of the Lustrous: #1... | 02:09 |
| Judar | Magi: The Labyrinth of M... | 02:09 |
| Junpei Yoshino | JUJUTSU KAISEN + #1472 | 02:09 |
| Kate | SHADOWS HOUSE - #1484 | 02:09 |
| Ren Honjou | NANA - #1476 | 02:09 |
| Erika Furudo | Umineko When They Cry ... | 02:10 |
| Karen Kohiruimaki | Sword Art Online - #1481 | 02:10 |
| Akira Asai | Call of the Night - #1486 | 02:10 |
| Choubei Aza | Hell’s Paradise - #1506 | 02:10 |
| lrisviel von Einzb... | Fate/Zero - #1496 | 02:10 |
| PA-san | BOCCHI THE ROCK! - #1... | 02:10 |
| Keiichi Maebara | When They Cry * #1496 | 02:10 |
| Vinegar Doppio | JoJo's Bizarre Adventure ... | 02:10 |
| Zangetsu | Bleach - #1488 | 02:10 |
| Hakase Shinono... | Nichijou - My Ordinary Lif... | 02:11 |
| Ki-Ja | Yona of the Dawn * #1561 | 02:11 |
| Masumi Seki | Goodnight Punpun - #1509 | 02:11 |
| Naruko Anjou | Anohana: The Flower We ... | 02:11 |
| Wilhelm van Ast... | Re:ZERO -Starting Life in... | 02:11 |
| Hotaru Shidare | Dagashi Kashi - #1518 | 02:11 |
| Shion | No.6 - #1498 | 02:11 |
| Takehisa Hinawa | Fire Force - #1502 | 02:11 |
| Gally | Battle Angel Alita ‘#1487 | 02:11 |
| Kurumi Ebisuzca... | SCHOOL-LIVE! - #1495 | 02:11 |
| Kyomoto | LOOK BACK - #1583 | 02:11 |
| Magna Swing | Black Clover ‘#1519 | 02:11 |
| Akihito Narihisc... | ID: INVADED - #1520 | 02:11 |
| Kushina Uzumaki | Naruto * #1508 | 02:11 |
| Shirou Fubuki | Inazuma Eleven - #1504 | 02:11 |
| Maki Kuwana | Blue Period - #1521 | 02:12 |
| Asia Argento | High School DxD - #1526 | 02:12 |
| Gen Narumi | Kaiju No. 8 - #1514 | 02:12 |
| Sai | Naruto * #1522 | 02:12 |
| Kanna Endou | 20th Century Boys - #1511 | 02:12 |
| Taiki nomata | Blue Box - #1499 | 02:12 |
| li | Kubikiri Cycle: The Blue S... | 02:12 |
| Akihito Narihisca... | ID: INVADED - #1520 | 02:12 |
| Julius Euclius | Re:ZERO -Starting Life in... | 02:12 |
| Kamille Bidan | Mobile Suit Gundam - #158660 | 02:12 |
| Mei Aihara | Citrus - #1512 | 02:12 |
| Mikan Taumiki | Danganronpa: The Animation | 02:12 |
| Atsushi Murasa... | Kuroko's Basketball - #1537 | 02:13 |
| Falco Grice | Attack on Titan ‘#1513 | 02:13 |
| Michiko Malandro | Michiko & Hatchin - #1529 | 02:13 |
| Shana | Shakugan no Shana - #15... | 02:13 |
| Shino Kiryuu | Girlfriend, Girlfriend - #15... | 02:13 |
| Gyokuyou | The Apothecary Diaries - ... | 02:13 |
| Lisa Lisa | JoJo's Bizarre Adventure ... | 02:13 |
| Chilchuck Tims | Delicious in Dungeon - #1... | 02:13 |
| Chizome Akaguro | My Hero Academia - #1523 | 02:13 |
| Stephanie Dola | No Game, No Life - #1527 | 02:13 |
| Yotasuke Takcah... | Blue Period - #1531 | 02:13 |
| Damian Desmond | SPY x FAMILY - #1516 | 02:13 |
| Utahime lori | JUJUTSU KAISEN « #1532 | 02:13 |
| Kuranosuke Koib... | Princess Jellyfish - #1549 | 02:14 |
| Rice Shower | Umamusume: Pretty Derby ° j | 02:14 |
| Cloud Strife | Final Fantasy Vil: Advent ... | 02:14 |
| Marco | ONE PIECE - #1542 | 02:14 |
| Ukyou Saionji | Dr. STONE - #1530 | 02:14 |
| Glenn Radars | Akashic Records of Basta... | 02:14 |
| Hidenori Tabata | Daily Lives of High School... | 02:14 |
| Kei Kurono | Gantz - #1551 | 02:14 |
| Onna Shinkan | GOBLIN SLAYER - #1535 | 02:14 |
| Yotasuke Takah... | Blue Period - #1531 | 02:14 |
| Atsushi Ootani | Lovely Complex - #1552 | 02:14 |
| Fuuko Izumo | Undead Unluck - #1548 | 02:14 |
| Ling Wang | The Daily Life of the Imm... | 02:14 |
| Mikan Tsumiki | Danganronpa: The Animation | 02:14 |
| Pannacotta Fugo | JoJo's Bizarre Adventure ... | 02:14 |
| Altair | Re:CREATORS - #1557 | 02:15 |
| Kotarou Kashima | School Babysitters - #1553 | 02:15 |
| Nemuri Kayama | My Hero Academia - #1545 | 02:15 |
| Rice Shower | Umamusume: Pretty Derby ° 3 | 02:15 |
| Tomori Takamat... | BanG Dream! It's MyGO!!!... | 02:15 |
| Aoba Suzukaze | NEW GAME! - #1554 | 02:15 |
| Elfaria Serfort | Wistoria: Wand and Swor... | 02:15 |
| Kiyoka Kudou | My Happy Marriage - #15... | 02:15 |
| Teach Marshall | ONE PIECE - #1558 | 02:15 |
| Akane Yanagi | Horimiya #1547 | 02:15 |
| Akira Tendou | Zom 100: Bucket List of th... | 02:15 |
| Hashirama Senju | Naruto - #1567 | 02:15 |
| Kid Eustass | ONE PIECE - #1571 | 02:15 |
| Rea Sanka | Sankarea: Undying Love - ... | 02:15 |
| Maine | Cyberpunk: Edgerunners -... | 02:15 |
| Mephisto Pheles | Blue Exorcist - #1556 | 02:15 |
| Ryou Kurokiba | Food Wars! - #1544 | 02:15 |
| Will Serfort | Wistoria: Wand and Swor... | 02:15 |
| Kamui | Gintama * #1565 | 02:16 |
| Kiyoomi Sakusa | HAIKYUI!! - #1573 | 02:16 |
| Takeshi Sendo | Hajime no Ippo: The Fight... | 02:16 |
| Ami Mizuno | Sailor Moon - #1574 | 02:16 |
| Daisuke Jigen | Detective Conan * #1570 | 02:16 |
| Emilico | SHADOWS HOUSE - #1562 | 02:16 |
| Katsuhira Agata | Kiznaiver * #1566 | 02:16 |
| Shun Hashimoto | The Stranger by the Shor... | 02:16 |
| lroha Sakayori | Cosmic Princess Kaguya! ... | 02:16 |
| Carol Olston | Tomo-chan Is a Girl! - #15... | 02:16 |
| Rakka | Haibane Renmei - #1575 | 02:16 |
| Risotto Nero | JoJo's Bizarre Adventure ... | 02:16 |
| Jinta Yadomi | Anohana: The Flower We ... | 02:16 |
| Pakunoda | Hunter x Hunter - #1576 | 02:16 |
| Roswaal Mathers | Re:ZERO -Starting Life in... | 02:16 |
| Ryouji Kaji | Neon Genesis Evangelion * #1 | 02:16 |
| Akane Ousaki | Akane-banashi * #1597 | 02:17 |
| Eriri Sawamura | Saekano: How to Raise a ... | 02:17 |
| Hiling | Ranking of Kings - #1581 | 02:17 |
| Kaguya | Cosmic Princess Kaguya! ... | 02:17 |
| Naoto Shirogane | Persona 4 the Animation *... | 02:17 |
| Rae Taylor | I'm in Love with the Villain... | 02:17 |
| Takeo Gouda | My Love Story!! - #1577 | 02:17 |
| Yuu Takeyama | My Hero Academia - #1585 | 02:17 |
| Chino Kafuu | Is the Order a Rabbit? - #... | 02:17 |
| Jouichirou Yukih... | Food Wars! - #1582 | 02:17 |
| Suisei Hoshimac... | Holo no Graffiti - #1590 | 02:17 |
| Hanta Sero | My Hero Academia - #1591 | 02:17 |
| Lucifer | The Devil is a - #1595 | 02:17 |
| Petelgeuse Rom... | Re:ZERO -Starting Life in... | 02:17 |
| Shidou Itsuka | Date A Live - #1579 | 02:17 |
| Yuki Tsukumo | JUJUTSU KAISEN - #1599 | 02:17 |
| Yuuma Kuga | World Trigger ~ #1583 | 02:17 |
| Anna Nishikino... | SHIMONETA: A Boring W... | 02:17 |
| Emanon | Memories of Emanon - #1... | 02:17 |
| Ouma Tokita | KENGAN ASHURA - #1588 | 02:17 |
| Retsuko | Aggretsuko - #1592 | 02:17 |
| Zhongli | Genshin Impact - #1608 | 02:17 |
| Kaseki | Dr. STONE - #1617 | 02:18 |
| Nishiki Nishio | Tokyo Ghoul - #1609 | 02:18 |
| Sonio the Hedgeho: | Sonic X ‘#1621 | 02:18 |
| Ayame Himuro | Science Fell in Love, So! ... | 02:18 |
| Kayden Break | Eleceed ‘ #1618 | 02:18 |
| Kongming Zhuge | Ya Boy Kongming! - #1626 | 02:18 |
| Mizuki Akiyama | COLORFUL STAGE! The ... | 02:18 |
| Shaiapouf | Hunter x Hunter - #1610 | 02:18 |
| Shuka Karino | Darwin's Game - #1614 | 02:18 |
| Yuu Narukami | Persona 4 the Animation -... | 02:18 |
| Goku Black | Dragon Ball - #16867 | 02:18 |
| Hulu | Miss Kobayashi's Dragon ... | 02:18 |
| Kuki Urie | Tokyo Ghoul - #1611 | 02:18 |
| Lucifer The Devil is #1595 | a - | 02:18 |
| Souichi Kiruma | Usogui - #1619 | 02:18 |
| Hinata Miyake | A Place Further Than the Uni | 02:18 |
| Ryuuji Sakamoto | PERSONAS the Animatio... | 02:18 |
| Saki Ayase | Days with My Stepsister ° ... | 02:18 |
| Yuu Kashima | Monthly Girls’ Nozaki-kun ... | 02:18 |
| Alice Carroll | Aria - #1637 | 02:19 |
| Dia | The World's Finest Assass... | 02:19 |
| Kazuma | Noragami - #1629 | 02:19 |
| Kyouko Mogami | Skip Beat! - #1641 | 02:19 |
| Taiju Ooki | Dr. STONE - #1625 | 02:19 |
| Kaede Kayano | Assassination Classroom -... | 02:19 |
| Rafat | Orb: On the Movements o... | 02:19 |
| Tooru Kirishima | The Yakuza's Guide to Ba... | 02:19 |
| Gundham Tanaka | Danganronpa: The Anima... | 02:19 |
| Kuririn | Dragon Ball « #1643 | 02:19 |
| Ojisan | The Promised Neverland -... | 02:19 |
| Yukina Himeragi | Strike the Blood - #1615 | 02:19 |
| Ange le Carré | Princess Principal - #1632 | 02:19 |
| Masaochika Kuze | Alya Sometimes Hides Her Fi | 02:19 |
| Mio Fuyutsuki | The Ice Guy and His Cool ... | 02:19 |
| Saki Kawasaki | My Teen Romantic Come... | 02:19 |
| Soho Takuan | Vagabond - #1616 | 02:19 |
| YiHuan | Kingdom - #1636 | 02:19 |
| lrina Shidou | High School DxD - #1628 | 02:19 |
| Claire Stanfield | Baccano! - #1645 | 02:20 |
| Mayumi Saegusa | The Irregular at Magic Hi... | 02:20 |
| Tartaglia | Genshin Impact - #1633 | 02:20 |
| Yuuki Anzai | Devils’ Line - #1657 | 02:20 |
| Hideki Hinata | Angel Beats! - #1654 | 02:20 |
| Nobuchika Ginoza | PSYCHO-PASS - #1658 | 02:20 |
| Opera | Welcome to Demon Scho... | 02:20 |
| Shuu lura | Horimiya - #1662 | 02:20 |
| Terakomari Gan... | The Vexations of a Shut-l... | 02:20 |
| Kei Yonagi | ACT-AGE - #1635 | 02:20 |
| Kimihiro Watanu... | xxxHOLiC - #1639 | 02:20 |
| Kraft Lawrence | Spice and Wolf - #1655 | 02:20 |
| Rokurouta Saku... | Rainbow - #1647 | 02:20 |
| Worick Arcangelo | GANGSTA. - #1663 | 02:20 |
| Chihiro Fujisaki | Danganronpa: The Anima... | 02:20 |
| Hotaru Tomoe | Sailor Moon - #1656 | 02:20 |
| Kai Shimada | March comes in like a lion... | 02:20 |
| Masachika Kuze | Alya Sometimes Hides Her Fi | 02:20 |
| Momoka Kawarr... | Girls Band Cry - #1664 | 02:20 |
| Tamayo | Demon Slayer: Kimetsu n... | 02:20 |
| Airi Sakura | Classroom of the Elite - #166 | 02:21 |
| Blair | Soul Eater ‘ #1649 | 02:21 |
| Ja-Hyeon Jo | Wind Breaker - #1677 | 02:21 |
| Kaede Rukawa | Slam Dunk - #1665 | 02:21 |
| Ristarte | Cautious Hero: The Hero /... | 02:21 |
| Ino Yamanaka | Naruto - #1674 | 02:21 |
| Kirino Kousaka | Eromanga Sensei - #1666 | 02:21 |
| Orsted | Mushoku Tensei: Jobless -.. | 02:21 |
| Shigeru Akagi | Akagi - #1658 | 02:21 |
| Antarcticite | Land of the Lustrous - #1... | 02:21 |
| Edgar Poe | Bungo Stray Dogs - #1675 | 02:21 |
| Inori Yuitsuka | Medalist - #1659 | 02:21 |
| Shou Kusakabe | Fire Force ‘#1667 | 02:21 |
| Kakashi no Kabu | Howl's Moving Castle - #1... | 02:21 |
| Kazusa Touma | White Album 2 - #1680 | 02:21 |
| Noriko Sonozaki | Kiznaiver * #1672 | 02:21 |
| Yumiella Dolkness | Villainess Level 99: / May ... | 02:21 |
| Daki | Demon Slayer: Kimetsu n... | 02:22 |
| Nikolai Gogol | Bungo Stray Dogs « #1697 | 02:22 |
| Shuuhei Hisagi | Bleach - #1673 | 02:22 |
| Vincent Law | Ergo Proxy * #1693 | 02:22 |
| Yukio Tanaka | BECK - #1685 | 02:22 |
| Ahiru Arima | Princess Tutu - #1694 | 02:22 |
| Badeni | Orb: On the Movements o... | 02:22 |
| Clair Aoki | Gleipnir - #1678 | 02:22 |
| Fenrys | Chillin' in Another World with | 02:22 |
| Mejiro McQueen | Umamusume: Pretty Derb... | 02:22 |
| Vanilla | Nekopara - #1686 | 02:22 |
| Bocchi Hitori | Hitoribocchi no Marumar... | 02:22 |
| Eisen | Frieren: Beyond Journey’s... | 02:22 |
| Kuro | SERVAMP - #1695 | 02:22 |
| Riko Sakurauchi | Love Live! School Idol Pro... | 02:22 |
| Ritsuko Akagi | Neon Genesis Evangelion - #1 | 02:22 |
| Senketsu | Kill la Kill - #1683 | 02:22 |
| Fiona Frost | SPY x FAMILY - #1688 | 02:22 |
| Hotaru Haganez... | Demon Slayer: Kimetsu n... | 02:22 |
| Yukichi Fukuzawa | Bungo Stray Dogs - #1696 | 02:22 |
| Kenshirou | Fist of the North Star - #... | 02:23 |
| Takumi Aldini | Food Wars! ‘#1761 | 02:23 |
| Touka Takanashi | Love, Chunibyo & Other ... | 02:23 |
| Gold Ship | Umamusume: Pretty Derby * i | 02:23 |
| Takt Asahina | takt op.Destiny - #1710 | 02:23 |
| Yukana Yame | My First Girltriend is a Gal * # | 02:23 |
| Claire Frangois | I'm in Love with the Villainess | 02:23 |
| Kyouya Hibari | REBORN! - #1691 | 02:23 |
| Lavi | D.Gray-man - #1715 | 02:23 |
| Shihuang Qin | Record of Ragnarok - #17... | 02:23 |
| Sora Kasugano | Yosuga no Sora: In Solitu... | 02:23 |
| Andy | Undead Unluck - #17606 | 02:23 |
| Kenji Miyazawa | Bungo Stray Dogs - #17280 | 02:23 |
| Miorine Rembran | Mobile Suit Gundam - #1764 | 02:23 |
| Satella | Re:ZERO -Starting Life in... | 02:23 |
| Alexander Ander... | Hellsing - #1733 | 02:24 |
| Cale Henituse | Lout of Count’s Family * #... | 02:24 |
| Gouhin | BEASTARS - #1729 | 02:24 |
| Lemon Yakishio | Makeine: Too Many Losin... | 02:24 |
| Midori Asakusa | Keep Your Hands Off Eizo... | 02:24 |
| Shisui Uchiha | Naruto - #1713 | 02:24 |
| Gold Ship | Umamusume: Pretty Derby ° 3 | 02:24 |
| Isaki Magari | Insomniacs After School - #1’ | 02:24 |
| Mai Zenin | JUJUTSU KAISEN « #1726 | 02:24 |
| Ryousuke Takah... | Initial D 1st Stage - #1718 | 02:24 |
| Urumi Kanzaki | GTO: Great Teacher Onizuka | 02:24 |
| Xiao | Genshin Impact - #1722 | 02:24 |
| Akihito Kanbara | Beyond the Boundary - #... | 02:24 |
| Canti | FLCL- #1711 | 02:24 |
| Hakobiya | Akudama Drive - #1727 | 02:24 |
| Haku | Naruto - #1723 | 02:24 |
| Alciel | The Devil is a- #1712 | 02:24 |
| Muten Roushi | Dragon Ball - #1728 | 02:24 |
| Sarada Uchiha | Naruto - #1724 | 02:24 |
| Keyaru | Redo of Healer - #1725 | 02:25 |
| Lugh Tuatha Dé | The World's Finest Assas... | 02:25 |
| Raeliana MoMillan | Why Raeliana Ended Up at th | 02:25 |
| Shino Azuma | You and / Are Polar Oppo... | 02:25 |
| Akane Tendou | Ranmal/2 ‘#1734 | 02:25 |
| Mutsumi Wakaba | BanG Dream! It's MyGO!!!... | 02:25 |
| Naoto Hachiouji | DON'T TOY WITH ME, MISS f | 02:25 |
| Yun | Yona of the Dawn - #1738 | 02:25 |
| Aoi Inuyama | Laid-Back Camp #1743 | 02:25 |
| Honoka Kousaka | Love Live! School Idol Pro... | 02:25 |
| Sayaka Saeki | Bloom Into You - #1751 | 02:25 |
| T.M. Opera O | Umamusume: Pretty Derb... | 02:25 |
| izana Kurokawa | Tokyo Revengers - #1755 | 02:25 |
| Cattleya Baudelair | Violet Evergarden - #1752 | 02:25 |
| Judai Yuki | Yu-Gi-Oh! - #1736 | 02:25 |
| Shinigami | Soul Eater - #1740 | 02:25 |
| Suzailgiererzegaln: | Uncle from Another World - # | 02:25 |
| Yuzuki Murashige | Skip and Loafer - #1732 | 02:25 |
| Saiko Yonebayc... | Tokyo Ghoul - #1745 | 02:26 |
| Sakura Kouno | Horimiya ‘#1757 | 02:26 |
| Tooru Rikiishi | Megalobox - #1749 | 02:26 |
| Youichi Hiruma | Eyeshield 21 - #1773 | 02:26 |
| Albert Moriarty | Moriarty the Patriot * #1... | 02:26 |
| Chomusuke | KONOSUBA -God's blessi... | 02:26 |
| Gyuutarou | Demon Slayer: Kimetsu n... | 02:26 |
| Mitsuki | Naruto ‘#1766 | 02:26 |
| Mitsuki Nase | Beyond the Boundary ° #... | 02:26 |
| Naoto Hachiouji | DON'T TOY WITH ME, MISS & | 02:26 |
| Priscilla Barielle | Re:ZERO -Starting Life in... | 02:26 |
| Tao Saotome | Gokurakugai - #1762 | 02:26 |
| Chika Komari | Makeine: Too Many Losin... | 02:26 |
| Kotomi lohinose | Clannad - #1747 | 02:26 |
| Lance Crown | MASHLE: MAGIC AND M... | 02:26 |
| Shuuichi Saihara | New Danganronpa V3: Mi... | 02:26 |
| Akari Akaza | YuruYuri ‘ #1766 | 02:26 |
| Minami Fuyuki | Hokkaido Gals Are Super ... | 02:26 |
| Reiji Mitsurugi | Ace Attorney - #1748 | 02:26 |
| Turbo Babaa | DAN DA DAN - #1756 | 02:26 |
| Ushio Okazaki | Clannad « #1772 | 02:26 |
| Claude de Alger ... | Who Made Me a Princess ... | 02:27 |
| Ganyu | Genshin Impact - #1777 | 02:27 |
| Rem | Death Note - #1769 | 02:27 |
| Trish Una | JoJo's Bizarre Adventure ... | 02:27 |
| Leon Fou Bartfort | Trapped in a Dating Sim: The | 02:27 |
| Momo Kawamoto | March comes in like a lion... | 02:27 |
| Noko Shikanoko | My Deer Friend Nokotan °... | 02:27 |
| Shadow the Hedge | Sonic X - #1796 | 02:27 |
| BlackxRock Sho... | Black Rock Shooter - #17... | 02:27 |
| Diluc Ragnvindr | Genshin Impact - #1791 | 02:27 |
| Heiji Hattori | Detective Conan - #1763 | 02:27 |
| Yelena | Attack on Titan - #1775 | 02:27 |
| Cerberus | Cardcaptor Sakura - #1780 | 02:27 |
| Kuro | Blue Exorcist - #1764 | 02:27 |
| Yuusuke Kitaga... | PERSONAS the Animatio... | 02:27 |
| Hougetsu Shima... | Adachi and Shimamura -... | 02:28 |
| Kaina Tsutsumi | My Hero Academia - #1805 | 02:28 |
| Kotarou Satou | Kotaro Lives Alone - #1789 | 02:28 |
| Raiden Shuga | 86 EIGHTY-SIX - #1785 | 02:28 |
| Touko Aozaki | Fate/stay night [Heaven's... | 02:28 |
| Chris Yukine | Symphogear - #1794 | 02:28 |
| Fujiko Mine | Detective Conan - #1810 | 02:28 |
| Makoto Misumi | TSUKIMICHI -Moonlit Fan... | 02:28 |
| Mamoru Endou | Inazuma Eleven - #1806 | 02:28 |
| Cadis Etrama di... | Noblesse - #1787 | 02:28 |
| Kaoru Yamazaki | Welcome to the N-H-K - #... | 02:28 |
| Mey-Rin | Black Butler - #1783 | 02:28 |
| Yukio Okumura | Blue Exorcist - #1811 | 02:28 |
| Gong-Ja Kim | SSS-Class Revival Hunter... | 02:28 |
| Lev Haiba | HAIKYUI!! - #1808 | 02:28 |
| Yang Yu | Here U Are - #1804 | 02:28 |
| Yui Kotegawa | To Love Ru - #1796 | 02:28 |
| Yuki Takeya | SCHOOL-LIVE! - #1792 | 02:28 |
| Kabane Kusaka | Kemono Jihen - #1869 | 02:29 |
| Luminous Valentin | That Time / Got Reincarnatec | 02:29 |
| Noah Wynknight | Why Raeliana Ended Up a... | 02:29 |
| Tae Yamada | ZOMBIE LAND SAGA - #11... | 02:29 |
| Yuki Osanai | SHOSHIMIN: How to Beco... | 02:29 |
| Kokkoro | Princess Connect! Re:Dive - # | 02:29 |
| Miki Makimura | Devilman Crybaby - #1798 | 02:29 |
| Tamon Fukuhara | Tamon's B-Side - #1814 | 02:29 |
| Yuu Kanda | D.Gray-man * #1818 | 02:29 |
| Enel | ONE PIECE - #1815 | 02:29 |
| Maquia | Maquia: When the Promis... | 02:29 |
| Tobirama Senju | Naruto ‘#1803 | 02:29 |
| Watashi | Humanity Has Declined - ... | 02:29 |
| Haruhime Sanjo... | Is It Wrong to Try to Pick ... | 02:29 |
| Kaho Hinata | BLEND-S - #1866 | 02:29 |
| Koko Hekmatyar | Jormungand ‘ #1824 | 02:29 |
| Lev Haiba | HAIKYU!! - #1808 | 02:29 |
| Mayuko Nise | High-Rise Invasion - #1828 | 02:29 |
| Natsuki Nakagze... | Sound! Euphonium - #1832 | 02:29 |
| Rina Tennouji | Love Live! School Idol Pro... | 02:29 |
| Benio Adashino | Twin Star Exorcists - #18... | 02:30 |
| Jabber Wonger | Gachiakuta * #1817 | 02:30 |
| Luminous Valentine | That Time / Got Reincarnatec | 02:30 |
| Nayuta | Chainsaw Man - #1829 | 02:30 |
| Takao Kasuga | The Flowers of Evil - #1833 | 02:30 |
| ikkaku Madara... | Bleach - #1845 | 02:30 |
| Bartolomeo | ONE PIECE - #1826 | 02:30 |
| Kana Kimishima | Parasyte -the maxim-- #... | 02:30 |
| Nagara | Sonny Boy - #1830 | 02:30 |
| Nobume Imai | Gintama - #1838 | 02:30 |
| Oskar von Reuen... | Legend of the Galactic H... | 02:30 |
| Serena | Pokémon - #1834 | 02:30 |
| Brunhilde | Record of Ragnarok - #18... | 02:30 |
| Isao Kondou | Gintama - #1823 | 02:30 |
| Kars | JoJo's Bizarre Adventure ... | 02:30 |
| Rion Enomoto | Can a Boy-Girl Friendship... | 02:30 |
| Rishe Weitzner | 7th Time Loop: The Villain... | 02:30 |
| Shun Uruma | Juujika no Rokunin - #1843 | 02:30 |
| Sigma | Bungo Stray Dogs - #1835 | 02:30 |
| Kumin Tsuyuri | Love, Chunibyo & Other ... | 02:30 |
| Kyuubey | Puella Magi Madoka Magi... | 02:30 |
| Natsuki Nakage... | Sound! Euphonium - #1832 | 02:30 |
| Vignette Tsukin... | Gabriel DropOut - #1848 | 02:30 |
| Yashiro Isana | K - #1840 | 02:30 |
| Hibiki Sakura | How Heavy Are the Dumb... | 02:31 |
| Hibiki Tachibana | Symphogear - #1865 | 02:31 |
| Masaomi Kida | Durarara!! - #1849 | 02:31 |
| Nishikata | Teasing Master Takagi-sa... | 02:31 |
| Shia Haulia | Arifureta: From Common... | 02:31 |
| ikaros | Heaven's Lost Property - ... | 02:31 |
| Liliruca Arde | Is It Wrong to Try to Pick ... | 02:31 |
| Masuzu Natsuk... | Oreshura - #1862 | 02:31 |
| Setsuna Yuki | Love Live! School Idol Pro... | 02:31 |
| Shaula | Re:ZERO -Starting Life in... | 02:31 |
| Jacopo Bearzatti | Fata Morgana no Yakata: ... | 02:31 |
| Jing Sun | Tamen De Gushi - #1851 | 02:31 |
| Juugo | NANBAKA - #1867 | 02:31 |
| Rin Hoshizora | Love Live! School Idol Pro... | 02:31 |
| Ron Kamonohashi | Ron Kamonohashi's Forbi... | 02:31 |
| Heiter | Frieren: Beyond Journey’s... | 02:31 |
| Hodaka Morishi... | Weathering With You - #1... | 02:31 |
| Ryoutarou Tsuboi | Sword Art Online - #1852 | 02:31 |
| Eiji Niizuma | Bakuman. - #1869 | 02:32 |
| Jack Vessalius | PandoraHearts - #1857 | 02:32 |
| Komichi Akebi | Akebi’s Sailor Uniform - #... | 02:32 |
| Maru | Tengoku Daimakyo * #1881 | 02:32 |
| Maki Shijo | Kaguya-sama: Love is Wa... | 02:32 |
| Rudol von Stroh... | JoJo's Bizarre Adventure ... | 02:32 |
| Zapp Renfro | Blood Blockade Battlefro... | 02:32 |
| Hakuryuu Ren | Magi: The Labyrinth of M... | 02:32 |
| Shera L Greenw... | How NOT to Summon a D... | 02:32 |
| Yaohiru Kusajishi | Bleach - #1855 | 02:32 |
| lrisdina Bernhard | Schwarzes Marken ‘ #1879 | 02:32 |
| Diablo | How NOT to Summon a D... | 02:32 |
| Sakiko Togawa | BanG Dream! It's MyGO!!!... | 02:32 |
| Shinjirou Kurama | Kamisama Kiss - #1880 | 02:32 |
| Soarlet El Vandimic | May / Ask for One Final Thine | 02:32 |
| Bardock | Dragon Ball - #1889 | 02:33 |
| Sawako Yaman... | K-ON! - #1897 | 02:33 |
| Sekkekkyuu AES... | Cells at Work! - #1885 | 02:33 |
| Shiki Tohno | Carnival Phantasm * #1893 | 02:33 |
| Tatsumi Oga | Beelzebub ‘ #1877 | 02:33 |
| Yin | Darker than Black - #1901 | 02:33 |
| Aoi Akane | Toilet-bound Hanako-kun... | 02:33 |
| Chouji Ochiai | 20th Century Boys - #1874 | 02:33 |
| Hinako Yaotose | This Monster Wants to Eat M | 02:33 |
| Sensei | The Girl from the Other S... | 02:33 |
| Staz Blood | Blood Lad « #1882 | 02:33 |
| Chiyo Mihama | Azumanga Daioh - #1891 | 02:33 |
| Saki Saki | Girlfriend, Girlfriend * #1... | 02:33 |
| Touko Sakurai | My Senpai is Annoying - #196 | 02:33 |
| Zheng Ying | Kingdom - #1883 | 02:33 |
| Akira Hayama | Food Wars! - #1876 | 02:33 |
| Fable | The Fable - #1888 | 02:33 |
| Ikuya Kirishima | Free! -Dive to the Future... | 02:33 |
| Medea Belial | Your Throne - #1906 | 02:33 |
| Mizore Shirayuki | Rosario + Vampire - #1884 | 02:33 |
| Fremy Speeddra... | Hinako Rokka -Braves Yaotose of the Six ... | 02:34 |
| Jinpachi Ego | BLUE LOCK - #1905 | 02:34 |
| Shiori Oumi | This Monster Wants to Ea... | 02:34 |
| Umetarou Nozaki | Monthly Girls' Nozaki-kun ... | 02:34 |
| Elizabeth | Gintama - #1894 | 02:34 |
| Korone Inugami | Holo no Graffiti - #1906 | 02:34 |
| Peoorine | Princess Connect! Re:Dive - 4 | 02:34 |
| Sakura Minamoto | ZOMBIE LAND SAGA - #1... | 02:34 |
| Yuzuki Seo | Monthly Girls' Nozaki-kun ... | 02:34 |
| Excalibur | Soul Eater - #1967 | 02:34 |
| Haruka Tenou | Sailor Moon - #1895 | 02:34 |
| Yukina Minato | BanG Dream! - #1899 | 02:34 |
| AiEnma | Hell Girl - #1924 | 02:34 |
| Chain Sumeragi | Blood Blockade Battlefro... | 02:34 |
| March | To Your Eternity - #1904 | 02:34 |
| Meiko Shiraki | Prison School - #1968 | 02:34 |
| Teru Minamoto | Toilet-bound Hanako-kun... | 02:34 |
| Yousuke Hanam... | Persona 4 the Animation -... | 02:34 |
| Asuma Mutsumi | Kiss Him, Not Me - #1937 | 02:35 |
| D | VAMPIRE HUNTER D- #11... | 02:35 |
| Fremy Speeddra... | Rokka -Braves of the Six ... | 02:35 |
| Levy McGarden | Fairy Tail - #1917 | 02:35 |
| Nowak | Orb: On the Movements o... | 02:35 |
| Shirou Fujimoto | Blue Exorcist - #1929 | 02:35 |
| Katsuya Jonouchi | Yu-Gi-Oh! - #1922 | 02:35 |
| Kazuki Kurusu | Buddy Daddies - #1934 | 02:35 |
| Killy | BLAME! : #1926 | 02:35 |
| Kuroyukihime | Accel World - #1918 | 02:35 |
| Peoorine | Princess Connect! Re:Dive - # | 02:35 |
| Aoi Hinami | Bottom-Tier Character T... | 02:35 |
| Felt | Re:ZERO -Starting Life in... | 02:35 |
| Floch Forster | Attack on Titan ‘#1923 | 02:35 |
| Gobta | That Time / Got Reincarn... | 02:35 |
| Kon | Bleach - #1935 | 02:35 |
| Masamune Mak... | Masamune-kun's Revenge... | 02:35 |
| Takane Enomoto | Mekakucity Actors - #1931 | 02:35 |
| Tio Klarus | Arifureta: From Common... | 02:35 |
| Jewelry Bonney | ONE PIECE - #1936 | 02:35 |
| Kanon Shibuya | Love Live! School Idol Pro... | 02:35 |
| Yoshino Koiwai | Masamune-kun's Revenge... | 02:35 |
| Amane Fujimiya | The Angel Next Door Spo... | 02:36 |
| Miko Yashiro | This Monster Wants to Ea... | 02:36 |
| N Harmonia | Pokémon * #1957 | 02:36 |
| Azaka Kokutou | the Garden of sinners Ch... | 02:36 |
| Mochizou Ooji | Tamako Market - #1930 | 02:36 |
| Rose | The Wrong Way to Use Healir | 02:36 |
| Silence Suzuka | Umamusume: Pretty Derb... | 02:36 |
| Souichi Tsujii | Junji Ito Collection - #1946 | 02:36 |
| Yuuri Briar | SPY x FAMILY - #1954 | 02:36 |
| Shuuichi Akai | Detective Conan - #1943 | 02:36 |
| Aki Shino | Remake Our Life! - #1960 | 02:36 |
| Haruka Hashida | Blue Period - #1932 | 02:36 |
| Hisanobu Takah... | Real - #1944 | 02:36 |
| Kurumi | Lycoris Recoil - #1956 | 02:36 |
| Nahoya Kawata | Tokyo Revengers - #1940 | 02:36 |
| Souya Kawata | Tokyo Revengers - #1948 | 02:36 |
| Kiyomasa Senji | Deadman Wonderland - #194 | 02:37 |
| Viktoriya Serebr... | Saga of Tanya the Evil - #... | 02:37 |
| Yu-Bin Hong | Wind Breaker - #1953 | 02:37 |
| Yuri Ayato | YarichinszBitch-bu ‘#1977 | 02:37 |
| Bertolt Hoover | Attack on Titan - #1958 | 02:37 |
| Eri | Goodbye, Eri - #1974 | 02:37 |
| Naoto Tachibana | Tokyo Revengers - #1962 | 02:37 |
| Satone Shichinii... | Love, Chunibyo & Other ... | 02:37 |
| Ann Takamaki | PERSONAS the Animatio... | 02:37 |
| Anne Shirley | Anne Shirley - #1975 | 02:37 |
| Asumi Kominami | We Never Learn - #1959 | 02:37 |
| Bunta Fujiwara | Initial D Ist Stage - #1951 | 02:37 |
| Hina | HINAMATSURI - #1947 | 02:37 |
| Lieselotte Sherlo... | TRINITY SEVEN - #1971 | 02:37 |
| Seishuu Inui | Tokyo Revengers - #1955 | 02:37 |
| Yoshitake Shircii... | Golden Kamuy - #1967 | 02:37 |
| Futaba Igarashi | My Senpai is Annoying - #... | 02:37 |
| Kawaki | Naruto * #1952 | 02:37 |
| Noel Niihashi | BURN THE WITCH - #1968 | 02:37 |
| Tetia | Witch Hat Atelier - #1964 | 02:37 |
| AiMie | The Girl / Like Forgot Her Gla | 02:38 |
| Dia Kurosawa | Love Live! School Idol Pro... | 02:38 |
| Gin Akutagawa | Bungo Stray Dogs « #1965 | 02:38 |
| Hahari Hanazono | The 100 Girlfriends Who Reall | 02:38 |
| Hideri Kanzaki | BLEND-S - #1981 | 02:38 |
| Mi-Ra Yu | The God of High School: ... | 02:38 |
| Yuri Ayato | YarichinsxBitch-bu - #1977 | 02:38 |
| Enkidu | Fate/Grand Order Absolu... | 02:38 |
| Eva Heinemann | Monster - #1986 | 02:38 |
| Genryuusai Yam... | Bleach - #1982 | 02:38 |
| Kojirou Sasaki | Record of Ragnarok - #19... | 02:38 |
| Nagisa Minase | Girlfriend, Girlfriend - #1... | 02:38 |
| Rumiho Akiha | Steins:Gate - #1970 | 02:38 |
| Aliceliese Lou Ne... | Our Last Crusade or the ... | 02:38 |
| Noel Vermillion | BlazBlue: Alter Memory ° ... | 02:38 |
| Shuuya Gouenji | Inazuma Eleven - #1983 | 02:38 |
| Yoshitake Shirai... | Golden Kamuy - #1967 | 02:38 |
| Moriko Morioka | Recovery of an MMO Jun... | 02:38 |
| Noe! Niihashi | BURN THE WITCH - #1968 | 02:38 |
| Raphiel Shiraha ... | Gabriel DropOut - #1996 | 02:38 |
| Rei Ryuugazaki | Free! -lwatobi Swim Club... | 02:38 |
| Freya | Is It Wrong to Try to Pick ... | 02:39 |
| Maha | The World's Finest Assas... | 02:39 |
| Musashi Gouda | Mob Psycho 100 - #1993 | 02:39 |
| Shall Fen Shaill | Sugar Apple Fairy Tale - ... | 02:39 |
| Sousuke Sagara | Full Metal Panic! - #1997 | 02:39 |
| Naoya Nifuji | Wotakoi: Love is Hard for ... | 02:39 |
| Yoshida | Higehiro: After Being Rej... | 02:39 |
| Yuugi Mutou | Yu-Gi-Oh! - #2006 | 02:39 |
| Epsilon | The Eminence in Shadow ... | 02:39 |
| Kohaku | Carnival Phantasm * #2003 | 02:39 |
| Ran Mouri | Detective Conan - #1991 | 02:39 |
| Roxana Agriche | Roxana ‘ #2011 | 02:39 |
| Tifa Lockhart | Final Fantasy VII: Advent ... | 02:39 |
| Hana | Wolf Children - #2600 | 02:39 |
| Mikuru Asahina | The Melancholy of Haruhi... | 02:39 |
| Tenten | Naruto * #2004 | 02:39 |
| Nodoka Toyoha... | Rascal Does Not Dream o... | 02:40 |
| Ringo Roadagain | JoJo's Bizarre Adventure ... | 02:40 |
| Shail Fen Shall | Sugar Apple Fairy Tale - ... | 02:40 |
| Tian He | 19 Tian - #2021 | 02:40 |
| Tyki Mikk | D.Gray-man - #2013 | 02:40 |
| Akira Ogata | My Dress-Up Darling - #2... | 02:40 |
| Kou Yagami | NEW GAME! - #2002 | 02:40 |
| Lan Fan | Fullmetal Alchemist - #2014 | 02:40 |
| Yu | The Boxer - #2030 | 02:40 |
| Mamoru Chiba | Sailor Moon - #2019 | 02:40 |
| Tomohiro Nagat... | A Silent Voice - #2015 | 02:40 |
| Xiu Ye | The King's Avatar - #2007 | 02:40 |
| Yuuichi Onodera | Goodnight Punpun - #2023 | 02:40 |
| Ako Tamaki | And you thought there is ... | 02:40 |
| Hanamaru Kunik... | Love Live! School Idol Pro... | 02:40 |
| Kaeya Alberich | Genshin Impact - #2028 | 02:40 |
| Kiba Inuzuka | Naruto - #2008 | 02:40 |
| Ren Yamashiro | Chained Soldier - #2032 | 02:40 |
| Coyote Starrk | Bleach - #2633 | 02:41 |
| Hebi | Vinland Saga - #2025 | 02:41 |
| Kusunoki | Three Days of Happiness ... | 02:41 |
| Setsuna | Redo of Healer - #2037 | 02:41 |
| Shampoo | Ranmal/2 - #2049 | 02:41 |
| Alexia Midgar | The Eminence in Shadow * #2 | 02:41 |
| Gamma | The Eminence in Shadow ... | 02:41 |
| Hiroomi Nase | Beyond the Boundary - #... | 02:41 |
| Patricia Thompson | Soul Eater - #26042 | 02:41 |
| Rise Kujikawa | Persona 4 the Animation -... | 02:41 |
| Alice Kuonji | Witch on the Holy Night - ... | 02:41 |
| Erika Amano | A Couple of Cuckoos - #2... | 02:41 |
| Senju Kawaragi | Tokyo Revengers - #2031 | 02:41 |
| Yukito Tsukishiro | Cardcaptor Sakura - #2039 | 02:41 |
| Ayato Sakamaki | Diabolik Lovers - #2036 | 02:41 |
| Eris | KONOSUBA -God's blessi... | 02:41 |
| Lina Inverse | The Slayers - #2046 | 02:41 |
| Natsumi Nishi | You and / Are Polar Oppo... | 02:41 |
| Vulcan Joseph | Fire Force - #2024 | 02:41 |
| Kaname Kuran | Vampire Knight - #2053 | 02:42 |
| Mikan Yuuki | To Love Ru - #2041 | 02:42 |
| Shampoo | Ranmatl/2 - #2049 | 02:42 |
| Youhei Sunohara | Clannad - #2065 | 02:42 |
| Eucliwood Hellsc... | Is this a Zombie? - #2056 | 02:42 |
| Hiro Shishigami | Inuyashiki ~ #2046 | 02:42 |
| Saeko Tanaka | HAIKYUI!! - #2066 | 02:42 |
| Sakura Nanamine | Toilet-bound Hanako-kun - #% | 02:42 |
| Sing Soo-Ling | BANANA FISH « #2054 | 02:42 |
| Akira Oono | Hi Score Girl - #2647 | 02:42 |
| Chiho Sasaki | The Devil is a - #2055 | 02:42 |
| Desumi Magahara | Love After World Domination | 02:42 |
| Eli Ayase | Love Live! School Idol Project | 02:42 |
| Kusuri Yakuzen | The 100 Girlfriends Who R... | 02:42 |
| Mari Ohara | Love Live! School Idol Pro... | 02:42 |
| Taiga Hirano | Sasaki and Miyano - #2063 | 02:42 |
| Byakuya Ishigami | Dr. STONE - #2056 | 02:42 |
| Chika Takami | Love Live! School Idol Pro... | 02:42 |
| Uruka Takemoto | We Never Learn ‘#2060 | 02:42 |
| Chisato Hasega... | The Testament of Sister ... | 02:43 |
| Junko Konno | ZOMBIE LAND SAGA - #2... | 02:43 |
| Maho Minami | BECK - #2081 | 02:43 |
| Mammon | Obey Me! - #2057 | 02:43 |
| Rinko Yamato | My Love Story!! - #2073 | 02:43 |
| Ryouko Tamiya | Parasyte -the maxim- * #... | 02:43 |
| Akito Souma | Fruits Basket - #2086 | 02:43 |
| Kokoro | DARLING in the FRANXX - #2 | 02:43 |
| Okuto Nakamura | Go For It, Nakamura-kun!... | 02:43 |
| Saeko Tanaka | HAIKYU!! - #2066 | 02:43 |
| Shinra Kishitani | Durarara!! - #2076 | 02:43 |
| Anon Chihaya | BanG Dream! It's MyGO!!!... | 02:43 |
| Chioe von Einzbern | Fate/Zero - #2079 | 02:43 |
| Pino | Ergo Proxy * #2067 | 02:43 |
| Aoi Asahina | Danganronpa: The Anima... | 02:43 |
| Kurome | Akame ga Kill! - #2072 | 02:43 |
| Nemu Kurotsuchi | Bleach - #2064 | 02:43 |
| Rachnera Arach... | Monster Musume: Everyd... | 02:43 |
| Yukari Akiyama | Girls und Panzer - #2076 | 02:43 |
| Killer Bee | Naruto - #2889 | 02:44 |
| Kitasan Black | Umamusume: Pretty Derb... | 02:44 |
| Licht Bach | Plunderer - #2077 | 02:44 |
| Raku Ichijou | Nisekoi ‘#2165 | 02:44 |
| Shuuji Hanma | Tokyo Revengers - #2097 | 02:44 |
| Arata Kasuga | TRINITY SEVEN - #2698 | 02:44 |
| Batou | Ghost in the Shell - #2678 | 02:44 |
| Honoka Sawada | Horimiya - #2106 | 02:44 |
| Saya Kisaragi | Blood-C - #20960 | 02:44 |
| Tsukimi Kurashita | Princess Jellyfish - #2082 | 02:44 |
| Yuwei Liu | To Be Hero X - #2094 | 02:44 |
| Aoi Miyamori | SHIROBAKO - #2091 | 02:44 |
| Carrot | ONE PIECE « #2167 | 02:44 |
| Emporio Alnino | JoJo's Bizarre Adventure ... | 02:44 |
| Mutta Nanba | Space Brothers - #2083 | 02:44 |
| Aoi Ascahina | Danganronpa: The Anima... | 02:44 |
| I-Jin Yu | Teenage Mercenary * #21... | 02:44 |
| Liebe | Black Clover - #2108 | 02:44 |
| Satsujinki | Akudama Drive - #2088 | 02:44 |
| Yuzuriha Ogawa | Dr. STONE - #2092 | 02:44 |
| lrina Luminesk | Irina: The Vampire Cosmo... | 02:44 |
| Hwaryun | Tower of God - #2125 | 02:45 |
| Juri Arisugawa | Revolutionary Girl Utena °... | 02:45 |
| Louis Moriarty | Moriarty the Patriot - #2... | 02:45 |
| Makoto Sunaka... | My Love Story!! + #2121 | 02:45 |
| Rit | Banished from the Hero’s... | 02:45 |
| Klaus von Reinhe... | Blood Blockade Battlefro... | 02:45 |
| Medaka Kuroka... | Medaka Box - #2102 | 02:45 |
| Pekora Usada | Holo no Graffiti - #2118 | 02:45 |
| Ikalgo | Hunter x Hunter ‘#2163 | 02:45 |
| Kakeru Sengoku | Horimiya #2095 | 02:45 |
| Mini Yaemori | Rent-a-Girlfriend - #2123 | 02:45 |
| Rain Ames | MASHLE: MAGIC AND M... | 02:45 |
| Rio Nakamura | Assassination Classroom ... | 02:45 |
| Tier Harribel | Bleach - #2119 | 02:45 |
| -Jin Yu | Teenage Mercenary * #21... | 02:45 |
| Akane Aoi | Toilet-bound Hanako-kun... | 02:45 |
| Isshou | ONE PIECE - #2096 | 02:45 |
| Kuroo Hazama | Black Jack - #2124 | 02:45 |
| Toyohisa Shimazu | DRIFTERS - #2120 | 02:45 |
| Tsukasa Hiiragi | LuckyyStar ‘#2128 | 02:45 |
| lrinca Luminesk | Irina: The Vampire Cosmo... | 02:45 |
| Borsalino | ONE PIECE - #2137 | 02:46 |
| Lambdadelta | When They Cry - #2113 | 02:46 |
| Shaotang Lu | SAKAMOTO DAYS - #2133 | 02:46 |
| Vueroeruko | Made in Abyss - #2141 | 02:46 |
| lruka Umino | Naruto - #2129 | 02:46 |
| Kou Sakuragi | Wotakoi: Love is Hard for ... | 02:46 |
| Mokke | Toilet-bound Hanako-kun... | 02:46 |
| Sang-U O | Killing Stalking - #2130 | 02:46 |
| Shirogane no Ch... | Kaguya-sama: Love is Wa... | 02:46 |
| Yhwach | Bleach #2114 | 02:46 |
| Kazuya Kinoshita | Rent-a-Girlfriend - #2115 | 02:46 |
| Kittan Baochika | Gurren Lagann - #2135 | 02:46 |
| Kuon | Utawarerumono The Fals... | 02:46 |
| Syipha | / Was Reincarnated as th... | 02:46 |
| Claudia Hodgins | Violet Evergarden - #2146 | 02:46 |
| Maki Katsuragi | Stars Align - #2132 | 02:46 |
| Mikari Tachibana | 2.5 Dimensional Seductio... | 02:46 |
| Tsukasa Hiiragi | LuckyyeStar - #2128 | 02:46 |
| Callisto Regulus | Villains Are Destined to D... | 02:47 |
| Esil Radiru | Solo Leveling ~ #2157 | 02:47 |
| Kenji Harima | School Rumble - #2145 | 02:47 |
| Tatsuma Sakam... | Gintama * #2161 | 02:47 |
| Hana Iohijou | Aoashi ‘#2142 | 02:47 |
| Jeanne d'Arc Alt... | Fate/Grand Order Absolu... | 02:47 |
| Milly Thompson | Trigun - #2146 | 02:47 |
| Touya Kinomoto | Cardcaptor Sakura - #2134 | 02:47 |
| Aurora | The Eminence in Shadow - #2 | 02:47 |
| Juseteu Ryuu | Raven of the Inner Palace - # | 02:47 |
| Kittan Bachika | Gurren Lagann - #2135 | 02:47 |
| Levi Kazama | TRINITY SEVEN - #2139 | 02:47 |
| Ozu | The Tatami Galaxy - #2147 | 02:47 |
| Rokuro Enmadou | Twin Star Exorcists - #21... | 02:47 |
| Yuuki Izumi | Shikimori's Not Just a Cutie - | 02:47 |
| Elizabeth Thompsc | Soul Eater - #2136 | 02:47 |
| Koby | ONE PIECE - #2148 | 02:47 |
| Mei Kinosaki | MARRIAGETOXIN - #2144 | 02:47 |
| Riruka Dokugam... | Bleach - #2156 | 02:47 |
| Yori Asanagi | Whisper Me a Love Song - #2 | 02:47 |
| Doraemon | Doraemon - #2177 | 02:48 |
| Ferid Bathory | Seraph of the End: Vampi... | 02:48 |
| Fuegoleon Vernii... | Black Clover - #2173 | 02:48 |
| Ruby Kurosawa | Love Live! School Idol Pro... | 02:48 |
| Beatrix Amerha... | Zom 100: Bucket List of t... | 02:48 |
| Guanshan Mo | 19 Tian - #2178 | 02:48 |
| Ichirou Inuyashiki | Inuyashiki * #2162 | 02:48 |
| Kabru | Delicious in Dungeon - #2... | 02:48 |
| Ruri Aoki | RuriDragon * #2158 | 02:48 |
| Jusetsu Ryuu | Raven of the Inner Palace - #:! | 02:48 |
| Kalego Naberius | Welcome to Demon Scho... | 02:48 |
| Maria Kurose | Our Dating Story: The Ex... | 02:48 |
| Mithrun | Delicious in Dungeon - #2... | 02:48 |
| Satsuki Momoi | Kuroko's Basketball ‘#2171 | 02:48 |
| Gura Gawr | Holo no Graffiti - #2168 | 02:48 |
| Jinzouningen T7.... | Dragon Ball - #2176 | 02:48 |
| Riku Dola | No Game, No Life - #2152 | 02:48 |
| Sui | Campfire Cooking in Ano... | 02:48 |
| Theoto Rikka | 86 EIGHTY-SIX - #2164 | 02:48 |
| Ayumu Fujino | LOOK BACK - #2181 | 02:49 |
| Fuegoleon Vermii... | Black Clover - #2173 | 02:49 |
| Kazuki Kazami | The Fruit of Grisaia ‘ #2193 | 02:49 |
| Kiyoharu Togawa | Real - #2185 | 02:49 |
| Tamamo Cross | Umamusume: Pretty Derby ° 3 | 02:49 |
| Alexander Volg Z... | Hajime no Ippo: The Fight... | 02:49 |
| Eun-Tae Lee | Lookism - #2190 | 02:49 |
| Majin Boo | Dragon Ball - #2194 | 02:49 |
| Takuji Mamiya | Tsui no Sora - #2182 | 02:49 |
| Towa Amane | Shangri-La Frontier - #2186 | 02:49 |
| Yusei Fudou | Yu-Gi-Oh! - #2198 | 02:49 |
| Aisha Greyrat | Mushoku Tensei: Jobless Reir | 02:49 |
| Jou Togame | WIND BREAKER - #2183 | 02:49 |
| Noriko Takaya | Gunbuster - #2195 | 02:49 |
| Renako Amaori | There's No Freaking Way ... | 02:49 |
| Urek Mazino | Tower of God - #2179 | 02:49 |
| Izayoi Sakamaki | Problem Children Are Co... | 02:49 |
| Kyouko Honda | Fruits Basket - #2184 | 02:49 |
| Kyouya Onodera | Talentless Nana - #2192 | 02:49 |
| Suzume lwato | Suzume * #2188 | 02:49 |
| Akamaru | Naruto - #2189 | 02:50 |
| Kirara Hoshi | JUJUTSU KAISEN - #2217 | 02:50 |
| Mu-Won Jin | The Legend of the North... | 02:50 |
| Oczy | Orb: On the Movements o... | 02:50 |
| Ramona Flowers | Scott Pilgrim Takes Off - #22 | 02:50 |
| Saya Endou | Dagashi Kashi - #2209 | 02:50 |
| Chie Satonaka | Persona 4 the Animation -... | 02:50 |
| Hidan | Naruto * #2218 | 02:50 |
| Miyo Sasaki | A Whisker Away - #2214 | 02:50 |
| Seiji Amasawa | Whisper of the Heart - #2202 | 02:50 |
| Amane Suou | The Fruit of Grisaia * #22... | 02:50 |
| Diarmuid Ua Dui... | Fate/Zero - #2199 | 02:50 |
| Maria Otonashi | The Empty Box and Zeroth M | 02:50 |
| Reisalin Stout | Atelier Ryza: Ever Darkne... | 02:50 |
| Cheong-Myeong | Return of the Blossoming... | 02:50 |
| Natsumi | Date A Live - #2196 | 02:50 |
| Shiki Granbell | EDENS ZERO - #2260 | 02:50 |
| Videl | Dragon Ball - #2212 | 02:50 |
| Alois Trancy | Black Butler - #2233 | 02:51 |
| Frederica Baumam | Re:ZERO -Starting Life in An | 02:51 |
| Kiwi Araga | Gushing Over Magical Girl... | 02:51 |
| Sakonji Urokodaki | Demon Slayer: Kimetsu n... | 02:51 |
| Yakata no Jochuu | Fata Morgana no Yakata: ... | 02:51 |
| Ja'far | Magi: The Labyrinth of M... | 02:51 |
| Kakeru Ryuuen | Classroom of the Elite - #... | 02:51 |
| Ruby Rose | RWBY: Ice Queendom ° #... | 02:51 |
| Flamme | Frieren: Beyond Journey’s... | 02:51 |
| Haida | Aggretsuko - #2227 | 02:51 |
| Kana Kojima | Why the hell are you here, Te | 02:51 |
| Kanade Yoisaki | COLORFUL STAGE! The ... | 02:51 |
| Shizuka Kuze | Takopi's Original Sin - #2231 | 02:51 |
| Desscaras | Ichi the Witch - #2208 | 02:51 |
| Gray | Fate/strange Fake ‘#2228 | 02:51 |
| Lust | Fullmetal Alchemist - #22... | 02:51 |
| Mujika | The Promised Neverland -... | 02:51 |
| Frederioa Bauman | Re:ZERO -Starting Life in An: | 02:52 |
| Rong Sun | The Daily Life of the Imm... | 02:52 |
| Rui | Demon Slayer: Kimetsu n... | 02:52 |
| Tamsy Caines | Gachiakuta * #2237 | 02:52 |
| Vika Misumi | BanG Dream! It's MyGOI!... | 02:52 |
| Arthur Leywin | The Beginning After the ... | 02:52 |
| Aura Bella Fiora | Overlord - #2230 | 02:52 |
| Mirai Sasaki | My Hero Academia - #2256 | 02:52 |
| Musashi | Pokémon - #2226 | 02:52 |
| Kenny Ackerman | Attack on Titan * #2255 | 02:52 |
| Nozel Silva | Black Clover - #2235 | 02:52 |
| Rihito Sajou | Doukyuusei -Classmates-... | 02:52 |
| Yukari Hayasaka | Paradise Kiss - #2243 | 02:52 |
| Yushirou | Demon Slayer: Kimetsu n... | 02:52 |
| ichika Amasawa | Classroom of the Elite - #... | 02:52 |
| Kageaki Minato | Soukou Akki Muramasa: Makz | 02:52 |
| Kiana Kasiana | Cooking with Valkyries * #... | 02:52 |
| Moritaka Mashiro | Bakuman. * #2232 | 02:52 |
| Ruti Ragnason | Banished from the Hero’s... | 02:52 |
| Sebastian Moran | Moriarty the Patriot - #2236 | 02:52 |
| Akira Mado | Tokyo Ghoul * #2249 | 02:53 |
| Ena Shinonome | COLORFUL STAGE! The Movi | 02:53 |
| Hyeon-Un Baek | Lost in the Cloud - #2257 | 02:53 |
| Reita Toritsuka | The Disastrous Life of Sa... | 02:53 |
| Sousuke Yamaz... | Free! -lwatobi Swim Club... | 02:53 |
| Vika Misumi | BanG Dream! It's MyGO!!!... | 02:53 |
| Womuu | JoJo's Bizarre Adventure - #2 | 02:53 |
| Eda | Black Lagoon - #2246 | 02:53 |
| Reiju Vmemoke | ONE PIECE - #2262 | 02:53 |
| Rika Shinozaki | Sword Art Online - #2266 | 02:53 |
| Shohei Usami | The Fragrant Flower Bloo... | 02:53 |
| Yachiyo Runami | Cosmic Princess Kaguya! ... | 02:53 |
| Yuri Honjou | High-Rise Invasion - #2254 | 02:53 |
| Akira Tachibana | After the Rain - #2263 | 02:53 |
| Iichika Amasawa | Classroom of the Elite - #... | 02:53 |
| Miku Izayoi | Date A Live - #2259 | 02:53 |
| Rossweisse | High School DxD - #2275 | 02:53 |
| Tsumiki Miniwa | Place to Place - #2267 | 02:53 |
| Will A. Zeppeli | JoJo's Bizarre Adventure - #2 | 02:53 |
| Kiana Kaslana | Cooking with Valkyries * #... | 02:53 |
| Sae Chabashira | Classroom of the Elite - #... | 02:53 |
| Souji Okita | Carnival Phantasm - #2264 | 02:53 |
| Takeshi | Pokémon - #2266 | 02:53 |
| Ayato Yorita | The Fragrant Flower Bloo... | 02:54 |
| Guita Heavy Fan... | Gachiakuta ‘#2277 | 02:54 |
| Parona | To Your Eternity * #2281 | 02:54 |
| Sousuke Yamcaz... | Free! -lwatobi Swim Club... | 02:54 |
| Woamuu | JoJo's Bizarre Adventure - #2 | 02:54 |
| Joubin Higashik... | JoJo's Bizarre Adventure ... | 02:54 |
| Ken Kitano | Sun-Ken Rock - #2274 | 02:54 |
| Reiju Vmeamoke | ONE PIECE - #2262 | 02:54 |
| Teru Mikami | Death Note - #2276 | 02:54 |
| Daikenja | That Time / Got Reincarn... | 02:54 |
| Michiru Matsus... | The Fruit of Grisaia * #22... | 02:54 |
| Lucy Steel | JoJo's Bizarre Adventure ... | 02:54 |
| Lupusregina Beta | Overlord - #2286 | 02:54 |
| Sein | Frieren: Beyond Journey’s... | 02:54 |
| Special Week | Umamusume: Pretty Derb... | 02:54 |
| Sting Eucliffe | Fairy Tail - #2292 | 02:54 |
| Teto Kasane | Hatsune Miku: Unofficial ... | 02:54 |
| Ajisai Sena | There's No Freaking Way ... | 02:55 |
| Emul | Shangri-La Frontier - #23... | 02:55 |
| Junichirou Taniz... | Bungo Stray Dogs - #2293 | 02:55 |
| Naho Takamiya | Orange - #2301 | 02:55 |
| Olivia | Asobi Asobase - worksho... | 02:55 |
| Rika Hoshizaki | Girlfriend, Girlfriend * #2... | 02:55 |
| Kaname Chidori | Full Metal Panic! - #2298 | 02:55 |
| Kei Nagai | AJIN: Demi-Human * #2298 | 02:55 |
| Kon | Kemono Jihen - #2282 | 02:55 |
| Manhattan Cafe | Umamusume: Pretty Derby * 3 | 02:55 |
| Senpai | Magical Sempai * #2294 | 02:55 |
| Shuu Ouma | Guilty Crown - #2286 | 02:55 |
| Alice Kisaragi | Combatants Will Be Dispa... | 02:55 |
| Ayano Tateyama | Mekakucity Actors - #2307 | 02:55 |
| Fubuki Shirakami | Holo no Graffiti - #2287 | 02:55 |
| Shiemi Moriyama | Blue Exorcist - #2311 | 02:55 |
| Tsukasa Akeuraji | Medalist - #2291 | 02:55 |
| Celia Claire | Seirei Gensouki: Spirit Ch... | 02:55 |
| Morel Mackerna... | Hunter x Hunter - #2296 | 02:55 |
| Ciel | Carnival Phantasm - #2325 | 02:56 |
| Reimi Sugimoto | JoJo's Bizarre Adventure ... | 02:56 |
| Runa Shirakawa | Our Dating Story: The Ex... | 02:56 |
| Aldebaran | Re:ZERO -Starting Life in... | 02:56 |
| Elsa Granhiert | Re:ZERO -Starting Life in... | 02:56 |
| Ira Gamagoori | Kill la Kill - #2322 | 02:56 |
| Mayaka Ibara | Hyouka - #2306 | 02:56 |
| Yue-Lung Lee | BANANA FISH - #2310 | 02:56 |
| Boogiepop | Boogiepop and Others - #... | 02:56 |
| Kenjirou Shibasa... | Terror in Resonance - #2... | 02:56 |
| Qingxuan Shi | Heaven Official's Blessing... | 02:56 |
| Risa Shiramine | BOFURI: / Don't Want to Get | 02:56 |
| Yui Kurata | TRINITY SEVEN - #2299 | 02:56 |
| Alma | Gokurakugai - #2316 | 02:56 |
| Dot Pixis | Attack on Titan - #2300 | 02:56 |
| Kougyoku Ren | Magi: The Labyrinth of M... | 02:56 |
| Neko | K > #2304 | 02:56 |
| Nyaruko | Nyaruko: Crawling with L... | 02:56 |
| Yumiko Sakaki | The Fruit of Grisaia - #23... | 02:56 |
| My Melody | SANRIO BOYS - #2333 | 02:57 |
| Nico | NANBAKA - #2337 | 02:57 |
| Sadaharu | Gintama - #2321 | 02:57 |
| Zenith Greyrat | Mushoku Tensei: Jobless ... | 02:57 |
| Doppo Kannonz... | HYPNOSISMIC -Division ... | 02:57 |
| Karen Tendou | GAMERS! - #2342 | 02:57 |
| Melty Q Melrom... | The Rising of the Shield ... | 02:57 |
| Prushka | Made in Abyss - #2326 | 02:57 |
| Sayuki Tokihara | Hensuki: Are you willing to fal | 02:57 |
| Emma Sano | Tokyo Revengers - #2319 | 02:57 |
| Kiyoshi Fujino | Prison School - #2347 | 02:57 |
| Kourai Hoshiumi | HAIKYUI! - #2331 | 02:57 |
| Karen Kujou | KINMOZA! - #2336 | 02:57 |
| Mari Tamaki | A Place Further Than the ... | 02:57 |
| Oliver Aiku | BLUE LOCK - #2344 | 02:57 |
| Tsuneo Suzuka... | Josee, the Tiger and the ... | 02:57 |
| Xingyun Qing | To Be Hero X - #2324 | 02:57 |
| Kimimaro Kaguya | Naruto - #2345 | 02:58 |
| Michiru Kaiou | Sailor Moon - #2341 | 02:58 |
| Sasaki | Smoking Behind the Supe... | 02:58 |
| Vamola | DAN DA DAN - #2365 | 02:58 |
| Mafuyu Asahina | COLORFUL STAGE! The ... | 02:58 |
| Melty The Q Melrom... Shield | Rising of the ... | 02:58 |
| Yukari Takeba | Persona 3 the Movie: #1 S... | 02:58 |
| Yukiya Himuro | The Ice Guy and His Cool Fen | 02:58 |
| Yuuji Terushima | HAIKYUI!! - #2350 | 02:58 |
| Medusa #2335 Gorgon | Soul Eater * | 02:58 |
| Nephelia | An Archdemon's Dilemma... | 02:58 |
| Rin Kagamine | COLORFUL STAGE! The Mov | 02:58 |
| Teppei Kiyoshi | Kuroko's Basketball - #2359 | 02:58 |
| Yuuna Yunohana | Yuuna and the Haunted H... | 02:58 |
| Yuzuki Shiraishi | A Place Further Than the ... | 02:58 |
| Becky Blackbell | SPY x FAMILY - #2364 | 02:58 |
| Dragon | ONE PIECE - #2368 | 02:58 |
| Fenneko | Aggretsuko - #2356 | 02:58 |
| Raviel lvansia | SSS-Class Revival Hunter... | 02:58 |
| Roxanne | Harem in the Labyrinth of... | 02:58 |
| Sicily von Claude | Wise Man’s Grandchild - #23¢ | 02:58 |
| Afro Samurai | Afro Samurai - #2361 | 02:59 |
| Claire Kagenou | The Eminence in Shadow ... | 02:59 |
| Hiyori Shiina | Classroom of the Elite * #... | 02:59 |
| Laura Bodewig | infinite Stratos - #2377 | 02:59 |
| Tenza | Hell’s Paradise - #2357 | 02:59 |
| Zombieman | One-Punch Man - #2369 | 02:59 |
| Akane Hououji | The Café Terrace and Its ... | 02:59 |
| Elf Yamada | Eromanga Sensei - #2366 | 02:59 |
| Tsukasa Kazuki | Romantic Killer - #2382 | 02:59 |
| ll-Pyo Park | The God of High School - ... | 02:59 |
| Fuuka Kikuchi | Bottom-Tier Character T... | 02:59 |
| Len Kagamine | COLORFUL STAGE! The ... | 02:59 |
| Lucci Rob | ONE PIECE - #2355 | 02:59 |
| Paul von Oberst... | Legend of the Galactic H... | 02:59 |
| Link | The Legend of Zelda: Oca... | 02:59 |
| Ouka Makuzawa | The Café Terrace and !ts Goc | 02:59 |
| Rizu Ogata | We Never Learn ‘#2384 | 02:59 |
| Ashuramaru | Seraph of the End: Vampi... | 03:00 |
| Dorothy Unswor... | Black Clover - #2385 | 03:00 |
| Julis Alexia von ... | The Asterisk War - #2373 | 03:00 |
| Kaoru Hanayama | BAKI - #2389 | 03:00 |
| Semiu Grier | Gachiakuta - #2397 | 03:00 |
| Aerith Gainsbor... | Final Fantasy VII: Advent ... | 03:00 |
| Nanami Kiryuu | Revolutionary Girl Utena - #2. | 03:00 |
| Natsumi Kurobe | My Senpai is Annoying - #... | 03:00 |
| Rebecca Bluega... | EDENS ZERO - #2390 | 03:00 |
| Yuuga Aoyama | My Hero Academia * #2402 | 03:00 |
| Alex Benedetto | GANGSTA. - #2403 | 03:00 |
| Ayumi Otosaka | Charlotte - #2395 | 03:00 |
| Hot Pants | JoJo's Bizarre Adventure ... | 03:00 |
| Lenalee Lee | D.Gray-man - #2375 | 03:00 |
| Merlin | Fate/Zero- #2391 | 03:00 |
| Shisan Meihua | Scissor Seven * #2387 | 03:00 |
| Yuzuru Yamai | Date A Live - #2379 | 03:00 |
| Fuyuhiko Kuzuryv... | Danganronpa: The Anima... | 03:00 |
| Luciel Choi | Invitation of the Mystic M... | 03:00 |
| Ringo Oginome | Penguindrum - #2380 | 03:00 |
| Seiya Kanie | Amagi Brilliant Park - #24... | 03:00 |
| Mare Bello Fiore | Overlord - #2405 | 03:01 |
| Mitsuru Kirijou | Persona 3 the Movie: #1 S... | 03:01 |
| Shirayuki | Sword of the Demon Hun... | 03:01 |
| YiJian | 19 Tian * #2417 | 03:01 |
| Ika Musume | Sauid Girl - #2398 | 03:01 |
| Kisara | Engage Kiss - #2418 | 03:01 |
| Leon Kennedy | Resident Evil: Degenerati... | 03:01 |
| Soo-Won | Yona of the Dawn - #2394 | 03:01 |
| Yui Hachimitsu | Shikimori's Not Just a Cu... | 03:01 |
| Yuki Nonaka | The Testament of Sister ... | 03:01 |
| Kagaya Ubuyas... | Demon Slayer: Kimetsu n... | 03:01 |
| Kainé | NieR:Automata Ver1.1a - ... | 03:01 |
| Yuki Minakami | where happiness lives - #... | 03:01 |
| Aika Fuwa | Blast of Tempest - #2416 | 03:01 |
| Dot Barrett | MASHLE: MAGIC AND MUSC | 03:01 |
| Frankenstein | Noblesse - #2400 | 03:01 |
| Fuyuhiko Kuzury... | Danganronpa: The Anima... | 03:01 |
| Ranko Mannen | Akiba Maid War - #2408 | 03:01 |
| Takashi Komuro | High School of the Dead -... | 03:01 |
| Homura Kougetsu | EDENS ZERO - #2421 | 03:02 |
| Shinju Inui | My Dress-Up Darling * #2... | 03:02 |
| Suu | Monster Musume: Everyd... | 03:02 |
| Kesshouban | Cells at Work! - #2430 | 03:02 |
| Sephiroth | Final Fantasy VII: Advent ... | 03:02 |
| Shinobu Wakam... | Chihayafuru - #2434 | 03:02 |
| Somali | Somali and the Forest Spirit ' | 03:02 |
| Tooru Hagakure | My Hero Academia - #2438 | 03:02 |
| Juushirou Ukitake | Bleach - #2423 | 03:02 |
| Kaine | NieR:Automata Ver1.1a ° ... | 03:02 |
| Mikoto Yamato | Is It Wrong to Try to Pick ... | 03:02 |
| Reimu Hakurei | Forbidden Scrollery - #24... | 03:02 |
| Saki Watanabe | From the New World - #2... | 03:02 |
| Yume Irido | My Stepmom's Daughter i... | 03:02 |
| izuna Hatsuse | No Game, No Life - #2411 | 03:02 |
| Elimalise Dragonroc | Mushoku Tensei: Jobless Reir | 03:02 |
| Hayato Gokudera | REBORN! - #2412 | 03:02 |
| Mei Tachibana | Say / 5	1	1	23	1	3	125	5136	61	27	96.620628	love 5	1	1	23	1	4	201	5133	79	39	90.507484	you. - #2428 | 03:02 |
| Shirona | Pokémon - #2424 | 03:02 |
| Ayato Naoi | Angel Beats! «#2441 | 03:03 |
| Naomi Misora | Death Note - #2433 | 03:03 |
| Tomo Ebizuka | Girls Band Cry - #2437 | 03:03 |
| Touma Mita | Blue Flag - #2449 | 03:03 |
| Vermilio | Helck - #2429 | 03:03 |
| iketeru Daga | Life Lessons with Uramic... | 03:03 |
| Hakkai Shiba | Tokyo Revengers - #2458 | 03:03 |
| Kisame Hoshigaki | Naruto ‘#2446 | 03:03 |
| Soushi Miketsuk... | Inu X Boku Secret Service... | 03:03 |
| Misaki Yata | K + #2451 | 03:03 |
| Petra Ral | Attack on Titan ‘#2443 | 03:03 |
| Shizuka Marikawa | High School of the Dead - #2 | 03:03 |
| Chariot du Nord | Little Witch Academia * #... | 03:03 |
| Toguro Otouto | Yu Yu Hakusho « #2448 | 03:03 |
| Yoshino Somei | Yakuza Fiancé: Raise wa ... | 03:03 |
| Arisa Ichigaya | BanG Dream! ‘#2461 | 03:04 |
| Euphemia li Britanr | Code Geass: Lelouch of the R | 03:04 |
| Ren Kaiji | WIND BREAKER - #2465 | 03:04 |
| Shizuku Tsukishimn« | Whisper of the Heart - #246 | 03:04 |
| Yume Minami | SSSS.GRIDMAN - #2453 | 03:04 |
| Ayane Shirakawa | Overflow - #2462 | 03:04 |
| Hikari | Pokémon - #2470 | 03:04 |
| Jae-Yeol Hong | Lookism - #2450 | 03:04 |
| Kuromi | Onegai My Melody - #2474 | 03:04 |
| Serie | Frieren: Beyond Journey’s... | 03:04 |
| Firo Prochainezo | Baccano! «‘ #2447 | 03:04 |
| Heisuke Mashimo | SAKAMOTO DAYS « #2455 | 03:04 |
| Ikuto Tsukiyomi | Shugo Chara! - #2467 | 03:04 |
| Kanji Tatsumi | Persona 4 the Animation *... | 03:04 |
| Yousuke Shibcz... | Uncle from Another Worl... | 03:04 |
| Arnold Hein | 7th Time Loop: The Villain... | 03:04 |
| Eishi Tsukasa | Food Wars! - #2456 | 03:04 |
| Jun Aikawa | Kubikiri Cycle: The Blue S... | 03:04 |
| Komari Koshigaya | Non Non Biyori - #2460 | 03:04 |
| Meryl Stryfe | Trigun - #2452 | 03:04 |
| Anna Kyouyama | SHAMAN KING * #2481 | 03:05 |
| Charlotte Dunois | Infinite Stratos - #2477 | 03:05 |
| Hitomi Tsukishiro | IRODUKU: The World in C... | 03:05 |
| Izumo Kamiki | Blue Exorcist - #2489 | 03:05 |
| Reborn | REBORN! - #2485 | 03:05 |
| Shizuku Tsukishim« | Whisper of the Heart * #246 | 03:05 |
| Aika Granzchesta | Aria ‘#2466 | 03:05 |
| Matahachi Horii... | Vagabond - #2482 | 03:05 |
| Sorata Kanda | The Pet Girl of Sakurasou... | 03:05 |
| Tetsudo Hisakca... | Anohana: The Flower We ... | 03:05 |
| Enju Aihara | Black Bullet - #2479 | 03:05 |
| Genjirou Tanigaki | Golden Kamuy - #2495 | 03:05 |
| Ikuto Taukiyomi | Shugo Chara! - #2467 | 03:05 |
| Kisumi Shigino | Free! -lwatobi Swim Club... | 03:05 |
| Ryuuichi Naruho... | Ace Attorney - #2483 | 03:05 |
| Shizuka Nanaho... | Mushoku Tensei: Jobless ... | 03:05 |
| Kaguya Yamai | Date A Live - #2486 | 03:05 |
| Liscia Elfrieden | How a Realist Hero Rebuil... | 03:05 |
| Shamille Kitra K... | Alderamin on the Sky * #... | 03:05 |
| Shijima Tsukishi... | Shimeji Simulation - #2492 | 03:05 |
| Tomo Kunagisa | Kubikiri Cycle: The Blue Sava | 03:05 |
| Tooru Adachi | Persona 4 the Animation -... | 03:05 |
| Fate Testarossa | Magical Girl Lyrical Nanob... | 03:06 |
| Jeremiah Gottwalc | Code Geass: Lelouch of the R | 03:06 |
| Keiko Ayano | Sword Art Online - #2505 | 03:06 |
| Machi Kuragi | Fruits Basket - #2493 | 03:06 |
| Tsukiko Tsutsuk... | Hentai Prince & the Ston... | 03:06 |
| Bambietta Bast... | Bleach #2506 | 03:06 |
| Blanca | BANANA FISH - #2496 | 03:06 |
| Mo Sha | To Be Hero X * #2498 | 03:06 |
| Nana Ebina | Himouto! Umaru-chan * #249 | 03:06 |
| Spirit Albarn | Soul Eater - #2510 | 03:06 |
| Yuzuha Shiba | Tokyo Revengers - #2514 | 03:06 |
| Cana Alberona | Fairy Tail - #2499 | 03:06 |
| Jack | BEASTARS - #2491 | 03:06 |
| All For One | My Hero Academia ‘ #2508 | 03:06 |
| Dutch | Black Lagoon - #2516 | 03:06 |
| Harleen Quinzel | Suicide Squad ISEKAI - #... | 03:06 |
| Shalnark Ryuseih | Hunter x Hunter - #2504 | 03:06 |
| Bouryoku no Maj... | Chainsaw Man - #2513 | 03:07 |
| Fakir | Princess Tutu - #2517 | 03:07 |
| Fate Testarossa | Magical Girl Lyrical Nanoh... | 03:07 |
| Makkachin | Yuri!!! on ICE - #2529 | 03:07 |
| Porco Rosso | Porco Rosso - #2525 | 03:07 |
| Soyo Nagasaki | BanG Dream! It's MyGOl!!... | 03:07 |
| Aya Tokiwa | The Flowers of Evil - #2518 | 03:07 |
| Toshio Ozaki | Shiki - #2562 | 03:07 |
| Airi Gotou | Higehiro: After Being Rejecte | 03:07 |
| Albedo | Genshin Impact - #2515 | 03:07 |
| Grisha Yeager | Attack on Titan * #2511 | 03:07 |
| Maria Naruse | The Testament of Sister ... | 03:07 |
| Yukiteru Amano | The Future Diary - #2507 | 03:07 |
| Yuuichi Jin | World Trigger - #2503 | 03:07 |
| Cornelia li Britannic | Code Geass: Lelouch of the F | 03:07 |
| Emu Ootori | COLORFUL STAGE! The ... | 03:07 |
| Kiiohi Gotou | Mobile Police Patlabor - #253 | 03:08 |
| Makkachin | Yurill! on ICE - #2529 | 03:08 |
| Soyo Nagasaki | BanG Dream! It's MyGO!!!... | 03:08 |
| Sumire Heanna | Love Live! School Idol Pro... | 03:08 |
| Neptune | Hyperdimension Neptunia * # | 03:08 |
| Rize Tedeza | Is the Order a Rabbit? - #... | 03:08 |
| Rupa | Girls Band Cry - #2522 | 03:08 |
| Welf Crozzo | Is It Wrong to Try to Pick ... | 03:08 |
| Yuki | You are Ms. Servant * #2... | 03:08 |
| Crimson | Ragna Crimson - #2535 | 03:08 |
| Denken | Frieren: Beyond Journey’s... | 03:08 |
| Suigintou | Rozen Maiden - #2523 | 03:08 |
| Mikiya Kokutou | the Garden of sinners Ch... | 03:08 |
| Mio Haimiya | Haimiya Is Scary Cute - #... | 03:08 |
| Fang Yuan Gu Yue | Reverend Insanity * #2557 | 03:09 |
| Fudemushi | Witch Hat Atelier - #2541 | 03:09 |
| Karna | Fate/Zero - #2553 | 03:09 |
| Kisa Souma | Fruits Basket - #2537 | 03:09 |
| Monte-Cristo Ha... | Gankutsuou: The Count o... | 03:09 |
| Yamato Kurosa... | Say I 5	1	1	7	4	3	120	1176	63	27	96.365204	love 5	1	1	7	4	4	196	1174	80	38	86.409904	you. - #2561 | 03:09 |
| Yuki Yoshida | given * #2549 | 03:09 |
| Aina Yoshiwara | Grand Blue Dreaming ° #... | 03:09 |
| Atsushi Sendou | Tokyo Revengers - #2546 | 03:09 |
| Elliot Nightray | PandoraHearts ‘ #2576 | 03:09 |
| Gilthunder | The Seven Deadly Sins - #... | 03:09 |
| Nanako Yukishiro | Senryu Girl - #2538 | 03:09 |
| Seri Kikyou | Call of the Night - #2566 | 03:09 |
| Arthur Pendragon | The Seven Deadly Sins - #... | 03:09 |
| John | The Vampire Dies in No T... | 03:09 |
| Mabel Laybelle | Uncle from Another Worl... | 03:09 |
| Misa Kurobane | Charlotte - #2543 | 03:09 |
| Ryou Saeba | City Hunter - #2551 | 03:09 |
| Takato Saijou | DAKAICHI -I'm being hara... | 03:09 |
| Yuugiri | ZOMBIE LAND SAGA: #2... | 03:09 |
| Haruno Yukinos... | My Teen Romantic Come... | 03:09 |
| Mamako Oosuki | Do You Love Your Mom a... | 03:09 |
| Tomo Takino | Azumanga Daioh - #2540 | 03:09 |
| Ultear Milkovich | Fairy Tail - #2548 | 03:09 |
| Ushiwakamaru | Fate/Grand Order Absolu... | 03:09 |
| Yuna Amagami | Tying the Knot with an A... | 03:09 |
| Keke Tang | Love Live! School Idol Pro... | 03:10 |
| Makkuro-Kurosu... | Spirited Away - #2577 | 03:10 |
| Mariko Shinobu | Dear Brother - #2581 | 03:10 |
| Mitsuo Kumatani | Life Lessons with Uramic... | 03:10 |
| Yamato Kurosa... | Say I 5	1	1	1	4	3	120	276	63	27	96.591759	love 5	1	1	1	4	4	196	274	80	38	86.247360	you. - #2561 | 03:10 |
| Goemon Ishikaw... | Detective Conan - #2558 | 03:10 |
| Javier Asrahan | The Greatest Estate Deve... | 03:10 |
| Subaru Konoe | Mayo Chiki! - #2562 | 03:10 |
| Kikyou | InuYasha - #2559 | 03:10 |
| Kobato Hasega... | Haganai - #2571 | 03:10 |
| Koujirou Shinomii... | Food Wars! ‘ #2575 | 03:10 |
| Ryouta Watari | Your lie in April - #2579 | 03:10 |
| Tarte | The World's Finest Assassin ¢ | 03:10 |
| Yoichi Saotome | Seraph of the End: Vampi... | 03:10 |
| Anzu Hanashiro | The Tunnel to Summer, t... | 03:10 |
| Finnian | Black Butler - #25668 | 03:10 |
| Shuusei Kagari | PSYCHO-PASS - #2572 | 03:10 |
| Tinasha | Unnamed Memory - #2588 | 03:10 |
| Usagi | Chiikawa ‘#2576 | 03:10 |
| Alicia Magentano | The Greatest Estate Develops | 03:11 |
| Kakushi Gotou | Kakushigoto - #2585 | 03:11 |
| Tetsuo Shima | Akira - #2589 | 03:11 |
| Akito Takagi | Bakuman. - #2578 | 03:11 |
| Fujita | Dorohedoro - #2598 | 03:11 |
| Hayato Kamitani | School Babysitters - #2582 | 03:11 |
| Mafuyu Hoshika... | BLEND-S - #2598 | 03:11 |
| Ririna Sanada | LOVE and LIES - #2586 | 03:11 |
| Dieter | Monster - #2607 | 03:11 |
| Elaine | The Seven Deadly Sins - #... | 03:11 |
| Kiichi Someya | Kiichi!! - #2663 | 03:11 |
| Gudrid | Vinland Saga ‘ #2584 | 03:11 |
| Kaori Kanzaki | A Certain Magical Index ... | 03:11 |
| Moeka Kiryuu | Steins:Gate - #2604 | 03:11 |
| Ramuda Amemu... | HYPNOSISMIC -Division ... | 03:11 |
| ichigo Momomiya | Tokyo Mew Mew - #2592 | 03:11 |
| Alicia Magentano | The Greatest Estate Develop | 03:12 |
| Goro | DARLING in the FRANXX - #2 | 03:12 |
| Haruhiro | Grimgar of Fantasy and A... | 03:12 |
| Naoko Kirino | Pumpkin Night - #2605 | 03:12 |
| Ougai Mori | Bungo Stray Dogs ‘ #26809 | 03:12 |
| Tama | Gintama * #2593 | 03:12 |
| Yuuto Kidou | Inazuma Eleven « #2613 | 03:12 |
| Canary | Hunter x Hunter - #2594 | 03:12 |
| Charon | Fire Force - #2622 | 03:12 |
| Hyung-Suk Park | Lookism - #2610 | 03:12 |
| Nozomi | Sonny Boy - #2606 | 03:12 |
| Otsu | Vagabond - #2602 | 03:12 |
| Ariane Glenys M... | Skeleton Knight in Anothe... | 03:12 |
| Hitch Dreyse | Attack on Titan - #2611 | 03:12 |
| Kaoruko Moeta | Comic Girls - #2599 | 03:12 |
| Kiichi Someya | Kiichil! - #2603 | 03:12 |
| Misaki Kamiigusa | The Pet Girl of Sakurasou... | 03:12 |
| Nozomi Kasaki | Sound! Euphonium * #2595 | 03:12 |
| Asako Kusakabe | The Fruit of Grisaia - #26... | 03:12 |
| Chloé d'Apchier | The Case Study of Vanita... | 03:12 |
| Shinnosuke Noh... | Shin Chan - #2624 | 03:12 |
| Yozora Mikazuki | Haganai - #2608 | 03:12 |
| Kouichi Haimaw... | My Hero Academia - #2621 | 03:13 |
| TK | Angel Beats! «#2625 | 03:13 |
| Weiss Schnee | RWBY: Ice Queendom - #... | 03:13 |
| ichise | Texhnolyze - #2641 | 03:13 |
| Epsilon | PLUTO - #2642 | 03:13 |
| JP | Redline - #2626 | 03:13 |
| Maou | Maoyu: Archenemy & Hero * 4 | 03:13 |
| Masami lwasawa | Angel Beats! - #2614 | 03:13 |
| Nako Sunao | Hitoribocchi no Marumar... | 03:13 |
| Tome Kurata | Mob Psycho 100 - #2618 | 03:13 |
| Gordon Agrippa | Black Clover ‘#2631 | 03:13 |
| Hajime Kokonoi | Tokyo Revengers - #2639 | 03:13 |
| Kotetsu Kaburagi | Tiger & Bunny - #2627 | 03:13 |
| Padparadscha | Land of the Lustrous - #2... | 03:13 |
| Kanna Makino | Tamako Market - #2628 | 03:13 |
| Kikyou Kushida | Classroom of the Elite - #... | 03:13 |
| Miyako | Hidamari Sketch - #2632 | 03:13 |
| lroha Igarashi | Real Girl - #2616 | 03:13 |
| Adam Taylor | Why Raeliana Ended Up a... | 03:14 |
| Gorilla | 1-nichi Go ni Shinu Gorilla... | 03:14 |
| Paprika | Paprika - #2633 | 03:14 |
| Sayuri Akino | Hokkaido Gals Are Super ... | 03:14 |
| Mukuro Hoshimiya | Date A Live - #2638 | 03:14 |
| Regulus Corneas | Re:ZERO -Starting Life in... | 03:14 |
| Tilty Claret | The Magical Revolution of the | 03:14 |
| Harunobu Nikaid... | March comes in like a lion... | 03:14 |
| Mai Kawakami | Myriad Colors Phantom W... | 03:14 |
| Melissa Podebrat | Beware the Villainess! - #265 | 03:14 |
| Miku | The Way of the Househus... | 03:14 |
| Neco-Arc | Carnival Phantasm - #2643 | 03:14 |
| Ina'nis Ninomae | Holo no Graffiti - #2640 | 03:14 |
| Karen Aijou | Revue Starlight - #2648 | 03:14 |
| Sentarou Kawa... | Kids on the Slope - #2644 | 03:14 |
| Uriel | Omniscient Reader - #2652 | 03:14 |
| Adam Taylor | Why Raeliana Ended Up 2... | 03:15 |
| Gorou Honda | Major S1- #2653 | 03:15 |
| Hizashi Yamada | My Hero Academia - #2665 | 03:15 |
| Juno | BEASTARS - #2673 | 03:15 |
| Kaname Arisuga... | TONIKAWA: Over The Mo... | 03:15 |
| Nioo Niiyama | Kiznaiver - #2657 | 03:15 |
| Ryuunosuke Aka... | The Pet Girl of Sakurasou... | 03:15 |
| Hiiragi Kashima | given - #2666 | 03:15 |
| Himari Azuma | Chained Soldier - #2650 | 03:15 |
| Kuroh Yatogami | K - #2670 | 03:15 |
| Maria Ushiromiya | When They Cry ‘#2678 | 03:15 |
| Ryouta Suzui | Kakegurui - #2658 | 03:15 |
| Shelly | Wind Breaker - #2674 | 03:15 |
| Yuno | Hidamari Sketch - #2654 | 03:15 |
| Ayame Sarutobi | Gintama - #2675 | 03:15 |
| Hanyuu Furude | When They Cry - #2655 | 03:15 |
| Rajdhani | Sonny Boy ‘#2667 | 03:15 |
| Red | Pokémon * #2663 | 03:15 |
| Uketsuke-jou | GOBLIN SLAYER - #2679 | 03:15 |
| Akiha Tohno | Carnival Phantasm - #2668 | 03:15 |
| Gin Gagamaru | BLUE LOCK - #2688 | 03:15 |
| Kaede Kagayama | Non Non Biyori * #2664 | 03:15 |
| Kyuubei Yagyuu | Gintama - #2656 | 03:15 |
| Sana Sunomiya | DON'T TOY WITH ME, MI... | 03:15 |
| Akane Mizuno | Tsukigakirei - #2693 | 03:16 |
| Flare Arigrande ... | Redo of Healer - #2685 | 03:16 |
| Kasumi Nomura | Asobi Asobase - worksho... | 03:16 |
| Matsumoto | Vivy -Fluorite Eye's Song-... | 03:16 |
| Miroku | InuYasha - #2697 | 03:16 |
| Solf Kimblee | Fullmetal Alchemist - #26... | 03:16 |
| Beelzebub | I've Been Killing Slimes fo... | 03:16 |
| Hotaru Ichijou | Non Non Biyori * #2698 | 03:16 |
| Miyuki Takara | Lucky+¢Star - #2696 | 03:16 |
| Nekobasu | My Neighbor Totoro - #2... | 03:16 |
| Huan Li | Here U Are - #2699 | 03:16 |
| Kineshi Hairo | The Disastrous Life of Sa... | 03:16 |
| Yume | Grimgar of Fantasy and A... | 03:16 |
| Chisaki Hiradaira | A Lull in the Sea - #2684 | 03:16 |
| Minato Amamiya | The Ramparts of Ice - #2... | 03:16 |
| Ryouga Hibiki | Ranmal/2 - #2676 | 03:16 |
| Youji Itami | Gate - #2692 | 03:16 |
| Carole Stanley | Carole & Tuesday - #2717 | 03:17 |
| Kenichirou Ryuu... | Zom 100: Bucket List of t... | 03:17 |
| Marco Bott | Attack on Titan * #2713 | 03:17 |
| Mikado Ryuganii... | Durarara!! - #2709 | 03:17 |
| Hiro Segawa | A Couple of Cuckoos - #2... | 03:17 |
| Jesus Christ | JoJo's Bizarre Adventure ... | 03:17 |
| Nagomi Woahira | Akiba Maid War - #2702 | 03:17 |
| Reiko Kujirai | KOWLOON GENERIC ROMAN | 03:17 |
| Amanda O'Neill | Little Witch Academia - #... | 03:17 |
| Chiaki Oogaki | Laid-Back Camp - #2703 | 03:17 |
| Enmu | Demon Slayer: Kimetsu n... | 03:17 |
| Index Librorum Pro | A Certain Magical Index - #27 | 03:17 |
| Ju-Hui Lee | Solo Leveling #2695 | 03:17 |
| King Halo | Umamusume: Pretty Derby ° ; | 03:17 |
| Morisuke Yaku | HAIKYUI! - #2719 | 03:17 |
| Shinichi Akiyama | LIAR GAME - #2691 | 03:17 |
| Kasumi Yoshiza... | PERSONAS the Animatio... | 03:17 |
| Katsuya Serizc... | Mob Psycho 100 - #2704 | 03:17 |
| Nagi Aoe | Boy's Abyss - #2688 | 03:17 |
| Taichi Ichinose | Blue Flag - #2700 | 03:17 |
| Tsurugi no Otome | GOBLIN SLAYER : #2716 | 03:17 |
| Yumemi Yumemite | Kakegurui - #2720 | 03:17 |
| Ai Mizuno | ZOMBIE LAND SAGA - #2... | 03:18 |
| Itona Horibe | Assassination Classroom ... | 03:18 |
| Laika | I've Been Killing Slimes fo... | 03:18 |
| Ririsa Amano | 2.5 Dimensional Seductio... | 03:18 |
| Hachiware | Chiikawa - #2722 | 03:18 |
| Hikari Kagura | Revue Starlight - #2726 | 03:18 |
| Hyouka Fuwa | SHIMONETA: A Boring W... | 03:18 |
| Ling Lin | To Be Hero X - #2706 | 03:18 |
| Ritsu Kawai | The Kawai Complex Guid... | 03:18 |
| Kotonoha Katsura | School Days * #2723 | 03:18 |
| Kasumi Yoshizc... | PERSONAS the Animatio... | 03:18 |
| Kazunari Takao | Kuroko's Basketball - #2724 | 03:18 |
| Nobunaga Oda | Carnival Phantasm - #2736 | 03:18 |
| Ui Hirasawa | K-ON! - #2768 | 03:18 |
| Akira Kogami | LuckysStar - #2753 | 03:19 |
| Ariel | So I'm a Spider, So What? - # | 03:19 |
| Crimvael | Interspecies Reviewers ° ... | 03:19 |
| Hanayo Koizumi | Love Live! School Idol Pro... | 03:19 |
| Yuzuki Tachibana | Taisho Otome Fairy Tale -... | 03:19 |
| Alicia Florence | Aria * #2738 | 03:19 |
| Ittetsu Takeda | HAIKYUI!! - #2746 | 03:19 |
| Kasumi Nakasu | Love Live! School Idol Pro... | 03:19 |
| Sora | Kingdom Hearts - #2754 | 03:19 |
| Lily Hoshikawa | ZOMBIE LAND SAGA - #2... | 03:19 |
| Ninny Spangcole | BURN THE WITCH - #2735 | 03:19 |
| Orga itsuka | Mobile Suit Gundam - #2743 | 03:19 |
| Riko Suminoe | kiss Xsis - #2739 | 03:19 |
| Sullivan | Welcome to Demon School! Ir | 03:19 |
| Gaoshun | The Apothecary Diaries - #27 | 03:19 |
| Rinko Shirokane | BanG Dream! - #2728 | 03:19 |
| Rose Oriana | The Eminence in Shadow ... | 03:19 |
| Yukako Yamasgis... | JoJo's Bizarre Adventure ... | 03:19 |
| Zero | Grimoire of Zero - #2748 | 03:19 |
| Akira Kogami | Lucky3¢Star - #2753 | 03:20 |
| Fumiya Tomozaki | Bottom-Tier Character T... | 03:20 |
| Kyouya Sata | Wolf Girl and Black Prince... | 03:20 |
| Makoto Shishio | Rurouni Kenshin - #2741 | 03:20 |
| Guideau | The Witch and the Beast ... | 03:20 |
| Kaidou | ONE PIECE - #2750 | 03:20 |
| Luka Megurine | COLORFUL STAGE! The ... | 03:20 |
| Soujuurou Shizuki | Witch on the Holy Night: ... | 03:20 |
| Souta Hori | Horimiya - #2742 | 03:20 |
| Fuuka Ayase | Yotsuba&! - #2755 | 03:20 |
| Kabi Nagata | My Lesbian Experience W... | 03:20 |
| Nui Harime | Kill la Kill - #2747 | 03:20 |
| Orga iteuka | Mobile Suit Gundam - #2743 | 03:20 |
| Syaro Kirima | Is the Order a Rabbit? - #... | 03:20 |
| Kanata Hoshijima | ASTRA LOST IN SPACE -... | 03:20 |
| Tet | No Game, No Life - #2768 | 03:20 |
| Yifan Zhuo | The Devil Butler - #2752 | 03:20 |
| Yui Yamada | Kase-san and Morning Gl... | 03:20 |
| Yukako Yamasis... | JoJo's Bizarre Adventure ... | 03:20 |
| Hol Horse | JoJo's Bizarre Adventure ... | 03:21 |
| Hyun-Su Cha | Sweet Home * #2781 | 03:21 |
| Makomo | Demon Slayer: Kimetsu no Ya | 03:21 |
| Oota | Tanaka-kun is Always Listless | 03:21 |
| Shizuku Hoshika... | The Summer You Were Th... | 03:21 |
| ichimatsu Mats... | Mr. Osomatsu - #2785 | 03:21 |
| lia Coral | The Magical Revolution of... | 03:21 |
| Lilia | Mushoku Tensei: Jobless ... | 03:21 |
| Norn Greyrat | Mushoku Tensei: Jobless Reir | 03:21 |
| Ryouhei Arisu | Alice in Borderland - #2790 | 03:21 |
| Souta Munakata | Suzume * #2778 | 03:21 |
| Yuki Sorimachi | SHIBOYUGI: Playing Deat... | 03:21 |
| Ayase Aragaki | Oreimo - #2767 | 03:21 |
| Goten Son | Dragon Ball - #2763 | 03:21 |
| Jirou Horikoshi | The Wind Rises - #2779 | 03:21 |
| Miri Unasaka | Buddy Daddies - #2771 | 03:21 |
| Rio | Seirei Gensouki: Spirit Ch... | 03:21 |
| Teoritta | Sentenced to Be a Hero- ... | 03:21 |
| Arata Wataya | Chihayafuru - #2784 | 03:21 |
| Fischl | Genshin Impact - #2776 | 03:21 |
| Pandora's Actor | Overlord - #2786 | 03:21 |
| Takeshi Yamam... | REBORN! : #2772 | 03:21 |
| Yukiko Amagi | Persona 4 the Animation -... | 03:21 |
| Hao Asakura | SHAMAN KING - #2793 | 03:22 |
| Hitomi Hino | Seton Academy: Join the ... | 03:22 |
| Sana Kurata | Kodocha * #2801 | 03:22 |
| Hiroki Dan | Brutal - #2786 | 03:22 |
| Ragna | Ragna Crimson - #2810 | 03:22 |
| Richard / | Fate/strange Fake - #2794 | 03:22 |
| Bisco Akaboshi | Sabikui Bisco - #2791 | 03:22 |
| Ryuuji Suguro | Blue Exorcist - #2783 | 03:22 |
| Taishirou Toyomits | My Hero Academia - #2795 | 03:22 |
| Zodd | ranaora’s Berserk - #2811 ACtor | 03:22 |
| Keisuke Takahas... | Initial D Ist Stage - #2800 | 03:22 |
| Marina Kiraraza... | Takopi's Original Sin - #2... | 03:22 |
| Ririchiyo Shirakiin | Inu X Boku Secret Service... | 03:22 |
| Satomi Murano | Parasyte -the maxim-- #... | 03:22 |
| Shousuke Komi | Komi Can*t Communicate ... | 03:22 |
| Calliope Mori | Holo no Graffiti - #2821 | 03:23 |
| Hikari Takanashi | Interviews with Monster G... | 03:23 |
| Renji Yomo | Tokyo Ghoul - #2797 | 03:23 |
| Shrek | Kattobi! Shrek - #2809 | 03:23 |
| Tecchou Suehiro | Bungo Stray Dogs ‘ #2817 | 03:23 |
| Kasumi | Pokémon - #2802 | 03:23 |
| Mutsumi Yozaku... | Mission: Yozakura Family *... | 03:23 |
| Nico Wakatsuki | WITCH WATCH : #2798 | 03:23 |
| Shizu Delta | Overlord - #2814 | 03:23 |
| Bort | Land of the Lustrous - #2... | 03:23 |
| Bruce Wayne | Batman Ninja - #2827 | 03:23 |
| Kyouko Tsumugi | The Fragrant Flower Bloo... | 03:23 |
| Okayu Nekomata | Holo no Graffiti - #2807 | 03:23 |
| Snufkin | Moomin - #2803 | 03:23 |
| Viktor Licht | Fire Force ‘ #2815 | 03:23 |
| Vincent Nightray | PandoraHearts - #2823 | 03:23 |
| Zodd | Berserk - #2811 | 03:23 |
| Chan-U 0 | BJ Alex - #2816 | 03:23 |
| Lioyd Asplund | Code Geass: Lelouch of the F | 03:23 |
| Omoharu Nakai... | Komi Can’t Communicate ... | 03:23 |
| Amatsuyu Kisar... | ORESUKI: Are you the onl... | 03:24 |
| Franky Franklin | SPY x FAMILY - #2829 | 03:24 |
| Kirby | Kirby: Right Back at Ya! - ... | 03:24 |
| Souta Kazama | My Senpai is Annoying * #... | 03:24 |
| Suma | Demon Slayer: Kimetsu n... | 03:24 |
| Chinatsu Hiyama | Welcome to the Ballroom ... | 03:24 |
| Eita Semi | HAIKYUI!! - #2834 | 03:24 |
| Rui Kamishiro | COLORFUL STAGE! The ... | 03:24 |
| Setsuko | Grave of the Fireflies - #2... | 03:24 |
| Shuri von Neusc... | A Stepmother’s Marchen ... | 03:24 |
| Yaeka Sakuragi | The Yakuza's Guide to Ba... | 03:24 |
| Haru Okumura | PERSONAS the Animation - # | 03:24 |
| Rumia Tingel | Akashic Records of Basta... | 03:24 |
| Danjuurou Tobita | My Hero Academia ‘ #2826 | 03:24 |
| Jungle Pooket | Umamusume: Pretty Derby * ; | 03:24 |
| Kaname Sudou | Darwin's Game - #2836 | 03:24 |
| Nene Onemine | Komi Can’t Communicate - #3 | 03:24 |
| Omoharu Nakan... | Komi Can*t Communicate ... | 03:24 |
| Tuesday Simmo... | Carole & Tuesday - #2824 | 03:24 |
| Urushi Yaotome | When Will Ayumu Make Hi... | 03:24 |
| Crowley Eusford | Seraph of the End: Vampi... | 03:25 |
| Koukichi Muta | JUJUTSU KAISEN - #2861 | 03:25 |
| Mirellia Q Metro... | The Rising of the Shield ... | 03:25 |
| Miyu Edelfelt | Fate/Zero - #2853 | 03:25 |
| Atom | PLUTO : #2862 | 03:25 |
| Kasukabe | Dorohedoro - #2854 | 03:25 |
| Kohaku lohimura | In the Clear Moonlit Dusk - #2 | 03:25 |
| Mei Raiden | Cooking with Valkyries - #... | 03:25 |
| Shuu Sakamaki | Diabolik Lovers - #2842 | 03:25 |
| Tasuku Tsubakino | WIND BREAKER - #2846 | 03:25 |
| Hyouga | Dr. STONE - #2835 | 03:25 |
| Kei Shinomiya | Tomodachi Game - #2843 | 03:25 |
| Kouichi Sakakib... | Another ‘#2855 | 03:25 |
| Nunnally Lamperot | Code Geass: Lelouch of the F | 03:25 |
| Tooru Amuro | Detective Conan - #2847 | 03:25 |
| Kasumi Toyama | BanG Dream! - #2848 | 03:25 |
| Miria | Claymore - #2852 | 03:25 |
| Cocytus | Overlord - #2869 | 03:26 |
| George Koizumi | Paradise Kiss ‘#2877 | 03:26 |
| Jin Seon | Bastard - #2857 | 03:26 |
| Mari Setogaya | Vampire Vixen * #2865 | 03:26 |
| Maki Harukawa | New Danganronpa V3: Minna | 03:26 |
| Myuu | Arifureta: From Common... | 03:26 |
| Takanobu Aone | HAIKYUI!! - #2874 | 03:26 |
| Wanyin Jiang | The Founder of Diabolism... | 03:26 |
| Claudine Saijou | Revue Starlight - #2863 | 03:26 |
| Satoshi Fukube | Hyouka - #2871 | 03:26 |
| Shino Amakusa | Seitokai Yakuindomo * #2... | 03:26 |
| Yamato | Naruto - #2867 | 03:26 |
| Yayoi Houzuki | Dark Gathering - #2859 | 03:26 |
| Bonchien Nicoli ... | To Your Eternity - #2884 | 03:26 |
| Gash Bell | Zatch Bell! - #2868 | 03:26 |
| Ji-U Seo | Eleceed - #28660 | 03:26 |
| Julie Sigtuna | Absolute Duo * #2856 | 03:26 |
| Kanan Matsuura | Love Live! School Idol Pro... | 03:26 |
| Lisa Imai | BanG Dream! - #2864 | 03:26 |
| Hiromi Yuasa | True Tears - #2881 | 03:27 |
| Kyou Kasahara | Blue Box - #2893 | 03:27 |
| Mei Shijima | Toilet-bound Hanako-kun * #2 | 03:27 |
| Raana Kaname | BanG Dream! It's MyGOI!!!! - 7 | 03:27 |
| Tong Qiu | Tamen De Gushi - #2873 | 03:27 |
| Wing | Hunter x Hunter - #2889 | 03:27 |
| Loke | Fairy Tail - #2898 | 03:27 |
| Sakurako Busuii... | Grand Blue Dreaming - #... | 03:27 |
| Shouyou Yoshida | Gintama - #2878 | 03:27 |
| Cherry | Words Bubble Up Like So... | 03:27 |
| Hae-in Sin | My Bias Gets on the Last ... | 03:27 |
| Kinrou | Dr. STONE - #2875 | 03:27 |
| Miyako Hoshino | WATATEN!: an Angel Flew... | 03:27 |
| Naruzou Machio | How Heavy Are the Dumb... | 03:27 |
| Bonchien Nicoii ... | To Your Eternity - #2884 | 03:27 |
| Gamou | DON'T TOY WITH ME, MI... | 03:27 |
| Himari Kino | Whisper Me a Love Song - #2 | 03:27 |
| Mona Megistus | Genshin Impact - #2876 | 03:27 |
| Utsuro | Gintama - #2900 | 03:27 |
| Mayoi Ayasato | Ace Attorney - #2905 | 03:28 |
| Raana Kaname | BanG Dream! It's MyGO!!!!! - 7 | 03:28 |
| Sanae Furukawa | Clannad - #2917 | 03:28 |
| Wallace Wells | Scott Pilgrim Takes Off - ... | 03:28 |
| Aoi Kunieda | Beelzebub - #2906 | 03:28 |
| Aqua Minato | Holo no Graffiti - #2914 | 03:28 |
| Chizuru Tachiba... | Why the hell are you here... | 03:28 |
| Gou Matsuoka | Free! -lwatobi Swim Club- - # | 03:28 |
| Kentarou Yamada | You and / Are Polar Oppo... | 03:28 |
| Re=L Rayford | Akashic Records of Basta... | 03:28 |
| Rokusuke Kouenji | Classroom of the Elite - #... | 03:28 |
| Miyako Hoshino | WATATENI: an Angel Flew... | 03:28 |
| Olivia | Trapped in a Dating Sim: The | 03:28 |
| Patrasche | Re:ZERO -Starting Life in... | 03:28 |
| Super Sonico | Soni-Ani: SUPER SONIC... | 03:28 |
| Whis | Dragon Ball - #2899 | 03:28 |
| Yuusuke Tani | You and / Are Polar Oppo... | 03:28 |
| Echidna | I'm Quitting Heroing - #2... | 03:28 |
| Jin-A Seong | Solo Leveling - #2912 | 03:28 |
| Luna | Sailor Moon : #2964 | 03:28 |
| Tsugaru Shinuchi | Undead Murder Farce - #... | 03:28 |
| Wein Arbalest | The Genius Prince's Guid... | 03:28 |
| ichigo Hoshimiya | Aikatsu! - #2908 | 03:28 |
| Amiya | Arknights: PRELUDE TO ... | 03:29 |
| An Onoya | ReLIFE - #2989 | 03:29 |
| Geon-Hui Go | Solo Leveling - #2925 | 03:29 |
| Marisa Kirisame | Forbidden Scrollery - #29... | 03:29 |
| Patausohe Kivia | Sentenced to Be a Hero - #2‘ | 03:29 |
| Renzou Shima | Blue Exorcist - #2929 | 03:29 |
| Sensei | No Longer Allowed in Ano... | 03:29 |
| Arrow | Fire Force - #2930 | 03:29 |
| Ayame Nakiri | Holo no Graffiti - #2926 | 03:29 |
| Chizuru Tachibc... | Why the hell are you here... | 03:29 |
| Fai D. Flourite | Tsubasa RESERVoir CHR... | 03:29 |
| Mario Minakami | Rainbow * #2922 | 03:29 |
| Eun-Hyeok Go | Operation: True Love * #2... | 03:29 |
| Eun-Yeong Baek | Jibi Eopseo - #2927 | 03:29 |
| Rikka Inohana | Tune In to the Midnight H... | 03:29 |
| Uno | NANBAKA - #2923 | 03:29 |
| Yasuko Takasu | Toradora! - #2939 | 03:29 |
| Lero-Ro | Tower of God «#2924 | 03:29 |
| Michizou Tachih... | Bungo Stray Dogs - #2932 | 03:29 |
| Riri | Romantic Killer ‘#2926 | 03:29 |
| Shimobu Uzuki | Tune In to the Midnight Hear | 03:29 |
| Takenori Akagi | Slam Dunk * #2928 | 03:29 |
| Aileen Dautriche | I'm the Villainess, So I'm T... | 03:30 |
| Amu Hinamori | Shugo Chara! - #2957 | 03:30 |
| Haruchiyo Sanzu | Tokyo Revengers * #2949 | 03:30 |
| Kyousuke Natsu... | Little Busters! - #2953 | 03:30 |
| Tamamo-no-Mae | Fate/Grand Order Absolute L | 03:30 |
| Banken Man | One-Punch Man * #2942 | 03:30 |
| Elucia de Lute Ima | The World God Only Know... | 03:30 |
| Finn Ames | MASHLE: MAGIC AND M... | 03:30 |
| Ladd Russo | Baccano! - #2962 | 03:30 |
| Yumeko Suzukiri | Go! Go! Loser Ranger! - #... | 03:30 |
| Alina Clover | / May Be a Guild Receptionist | 03:30 |
| Hajime Ichinose | Gatchaman Crowds * #29... | 03:30 |
| Komekko | KONOSUBA -God's blessi... | 03:30 |
| Leonard Burns | Fire Force - #2943 | 03:30 |
| Scathach | Fate/Grand Order Absolu... | 03:30 |
| Utage Kinoshita | Tamon's B-Side - #2951 | 03:30 |
| Eita Sasaki | My Love Story with Yama... | 03:30 |
| Ena ibarada | Science Fell in Love, So / Trie | 03:30 |
| Hisui | Carnival Phantasm - #2952 | 03:30 |
| Last Order | A Certain Magical Index - #2‘ | 03:30 |
| Lemon Irvine | MASHLE: MAGIC AND M... | 03:30 |
| Miyako Ishida | A Silent Voice - #2948 | 03:30 |
| Junichirou Kubo... | Tomo-chan Is a Girl! * #2... | 03:31 |
| Mimi Kagari | / Want to Love You Till Yo... | 03:31 |
| Titan | takt op.Destiny * #2981 | 03:31 |
| Zeno Zoldyck | Hunter x Hunter ‘#2961 | 03:31 |
| Chihaya Kisaragi | The Idol Master - #2982 | 03:31 |
| Kuukaku Shiba | Bleach - #2966 | 03:31 |
| Mika Kagehira | Ensemble Stars! - #2978 | 03:31 |
| Minoru Mineta | My Hero Academia * #2958 | 03:31 |
| Silky | The Ancient Magus’ Bride - #: | 03:31 |
| William Vangean... | Black Clover - #2976 | 03:31 |
| Chibiusa | Sailor Moon - #2975 | 03:31 |
| Jin-Ho Yu | Solo Leveling - #2963 | 03:31 |
| Kazuichi Souda | Danganronpa: The Anima... | 03:31 |
| Melon | BEASTARS - #2967 | 03:31 |
| Seidou Takizawa | Tokyo Ghoul - #2979 | 03:31 |
| Vergil | Devil May Cry 5: Visions o... | 03:31 |
| Yukari Tanizaki | Azumanga Daioh - #2971 | 03:31 |
| Daijin | Suzume * #2968 | 03:31 |
| Fel | Campfire Cooking in Ano... | 03:31 |
| Geu Sonyeon | The Horizon - #2984 | 03:31 |
| Kobeni Yonomori | Engaged to the Unidentifi... | 03:31 |
| Ohana Matsum... | Hanasaku Iroha ~Blossom... | 03:31 |
| Pingu | Pingu in the City - #2980 | 03:31 |
| Yakumo Murai | Blue Period - #2964 | 03:31 |
| Aikurou Mikisugi | Kill la Kill: #3013 | 03:32 |
| Chiikawa | Chiikawa - #2989 | 03:32 |
| Evileye | Overlord - #3005 | 03:32 |
| Haru Urara | Umamusume: Pretty Derb... | 03:32 |
| Kei Amane | Gals Can't Be Kind to Ota... | 03:32 |
| Lucifer | Obey Me! - #3001 | 03:32 |
| Meiko Inoue | Solanin - #2997 | 03:32 |
| Peko Pekoyama | Danganronpa: The Anima... | 03:32 |
| Himawari Uzum... | Naruto ‘ #3010 | 03:32 |
| Ryoma Echizen | The Prince of Tennis - #2... | 03:32 |
| Ryuu Yamada | Yamada and the Seven W... | 03:32 |
| Ryuuichi Kashima | School Babysitters - #3062 | 03:32 |
| Shinobu Sensui | Yu Yu Hakusho - #3006 | 03:32 |
| Soma Schicksal | God Eater - #2998 | 03:32 |
| Anastasia Hoshin | Re:ZERO -Starting Life in... | 03:32 |
| Asuma Sarutobi | Naruto - #2995 | 03:32 |
| Kobato Hanato | Kobato - #3007 | 03:32 |
| Otoya Takechi | Riddle Story of Devil - #3... | 03:32 |
| Rally Vincent | Gunsmith Cats - #3011 | 03:32 |
| Reine Murasame | Date A Live - #2999 | 03:32 |
| Xylo Forbartz | Sentenced to Be a Hero- ... | 03:32 |
| Bepo | ONE PIECE - #2996 | 03:32 |
| Ginrou | Dr. STONE - #3008 | 03:32 |
| Miyano | Tanaka-kun is Always List... | 03:32 |
| Ryuuga | Beyblade - #3868 | 03:32 |
| Shin Wolford | Wise Man’s Grandchild - #... | 03:32 |
| Tenshinhan | Dragon Ball - #3016 | 03:32 |
| Ako Suminoe | kiss Xsis - #3021 | 03:33 |
| Elysia | Cooking with Valkyries - #... | 03:33 |
| Eureka | Eureka Seven - #3033 | 03:33 |
| Kaoru Tanamachi | Amagami SS ‘ #3025 | 03:33 |
| Mikitaka Hasek... | JoJo's Bizarre Adventure ... | 03:33 |
| Quinella | Sword Art Online - #3029 | 03:33 |
| Edward Mason | Angels of Death - #3034 | 03:33 |
| Emi Igawa | Your lie in April - #3026 | 03:33 |
| Ha-Yan Park | Unholy Blood - #3030 | 03:33 |
| Harumi Taniguohi | Citrus - #3022 | 03:33 |
| Ramiris | That Time ! Got Reincarn... | 03:33 |
| Snake | Black Butler ‘#3018 | 03:33 |
| Han-Nam Kang | Wind Breaker - #3035 | 03:33 |
| Izuko Gaen | Bakemonogatari - #3019 | 03:33 |
| Mary | Grimgar of Fantasy and A... | 03:33 |
| Mezou Shouji | My Hero Academia - #3027 | 03:33 |
| Sachi Umino | A Couple of Cuckoos - #3... | 03:33 |
| Yousuke Koiwai | Yotsuba&! - #3839 | 03:33 |
| Anri Sonohara | Durarara!! - #3024 | 03:33 |
| Cecilia | Saint Cecilia & Pastor La... | 03:33 |
| Kirie Motoba | Himouto! Umaru-chan * #... | 03:33 |
| Papi | Monster Musume: Everyd... | 03:33 |
| Shouta Raidou | Aharen-san wa Hakarenai... | 03:33 |
| Takayanagi | Welcome to Ethics Class °... | 03:33 |
| Banri Tada | Golden Time - #3049 | 03:34 |
| Billy Bat | Billy Bat - #3053 | 03:34 |
| Hannes | Attack on Titan * #3845 | 03:34 |
| Shou Naruse | Cheeky Brat - #3041 | 03:34 |
| Wiene | Is It Wrong to Try to Pick ... | 03:34 |
| Anri Teieri | BLUE LOCK - #3042 | 03:34 |
| Emma Brightness | The Hidden Dungeon Only / C | 03:34 |
| Hiroshi Kano | Freesia - #3046 | 03:34 |
| Miuna Shiodome | A Lull in the Sea - #3066 | 03:34 |
| Setsuna Ogiso | White Album 2 - #3054 | 03:34 |
| Torako Koshi | My Deer Friend Nokotan °... | 03:34 |
| Zeldris | The Seven Deadly Sins - #... | 03:34 |
| Haqua du Lot Herr | The World God Only Knows ° ; | 03:34 |
| Maya Tendou | Revue Starlight - #3055 | 03:34 |
| Nana Deviluke | To Love Ru Darkness - #304? | 03:34 |
| Riho Tsukishima | The Café Terrace and Its ... | 03:34 |
| Suzue Kanbe | The Millionaire Detective - Bz | 03:34 |
| Tae-Hoon Seong | Lookism * #3059 | 03:34 |
| Eiko Kawasega... | Remake Our Life! - #3060 | 03:34 |
| Eri Ninamori | FLCL + #3052 | 03:34 |
| Pariston Hill | Hunter x Hunter - #30460 | 03:34 |
| Riela Maroellis | Senjou no Valkyria 3: Tagatar | 03:34 |
| Sumika Kagami | Schwarzes Marken - #3048 | 03:34 |
| Tokio Kurohara | Choujin X - #3068 | 03:34 |
| Vanir | KONOSUBA -God's blessi... | 03:34 |
| Alucard | Castlevania: Curse of Dar... | 03:35 |
| Chiyo | The Elder Sister-Like One - # | 03:35 |
| Mail Jeevas | Death Note - #3077 | 03:35 |
| Natsumi Koshig... | Non Non Biyori - #3085 | 03:35 |
| Rudbeckia de Bo... | How to Win My Husband ... | 03:35 |
| Sofia Velmer | Jormungand - #3065 | 03:35 |
| Tsuki Uzaki | Uzaki-chan Wants to Han... | 03:35 |
| Balsa Yonsa | Moribito: Guardian of the... | 03:35 |
| Camie Utsushimi | My Hero Academia - #3086 | 03:35 |
| Himari Takakura | Penguindrum - #3078 | 03:35 |
| Majo | GOBLIN SLAYER - #3074 | 03:35 |
| Sylvia Sherwood | SPY x FAMILY - #3062 | 03:35 |
| Tae Shimura | Gintama - #3070 | 03:35 |
| Ao | Yona of the Dawn - #3075 | 03:35 |
| Asako Natsume | My Little Monster - #3071 | 03:35 |
| Clavis | Death Parade - #3079 | 03:35 |
| Gaku | SAKAMOTO DAYS - #38683 | 03:35 |
| Nanaka Kotegawa | Grand Blue Dreaming - #386’ | 03:35 |
| Hajime Saitou | Rurouni Kenshin - #3064 | 03:35 |
| Joujirou Takajou | Charlotte - #3080 | 03:35 |
| Kokoro Tsurumaki | BanG Dream! - #3092 | 03:35 |
| Lilith | The Maid / Hired Recently is / | 03:35 |
| Mary Macbeth | Blood Blockade Battlefront - ; | 03:35 |
| Yuusaku Kitamu... | Toradora! - #3084 | 03:35 |
| Charles-Henri Sa... | Innocent - #3689 | 03:36 |
| Ganta Nakami | insomniacs After School -... | 03:36 |
| Kazuho Haneva... | My Hero Academia - #3093 | 03:36 |
| Lioyd de Saloum | / Was Reincarnated as th... | 03:36 |
| Mihari Oyama | ONIMAI: I'm Now Your Sis... | 03:36 |
| Natsumi Koshicg... | Non Non Biyori - #3085 | 03:36 |
| Yang Xiao Long | RWBY: Ice Queendom - #... | 03:36 |
| Junta Azumaya | DAKAICHI -I'm being hara... | 03:36 |
| Kumo Oni Haha | Demon Slayer: Kimetsu n... | 03:36 |
| Mon | The World Is Mine - #3110 | 03:36 |
| Nyaako | Chainsaw Man - #3098 | 03:36 |
| Richard | Requiem of the Rose King... | 03:36 |
| Sakie Satou | Interviews with Monster G... | 03:36 |
| Sonia Nevermind | Danganronpa: The Anima... | 03:36 |
| Anko Mitarashi | Naruto - #3099 | 03:36 |
| Coconut | Nekopara - #3111 | 03:36 |
| Entoma Vasiliss... | Overlord - #3091 | 03:36 |
| Golem | Somali and the Forest Sp... | 03:36 |
| Rushia Uruha | Holo no Graffiti - #3103 | 03:36 |
| Taiyou Asano | Mission: Yozakura Family -... | 03:36 |
| Ying | Genshin - #3107 | 03:36 |
| Hiroto Kiyama | Inazuma Eleven - #3112 | 03:36 |
| Ji-Won Ahn | BJU Alex - #3116 | 03:36 |
| Megumi Noda | Nodame Cantabile - #31080 | 03:36 |
| Nao | Skip and Loafer - #3108 | 03:36 |
| Rei Sakuma | Ensemble Stars! - #3088 | 03:36 |
| Chiyomi Anzai | Girls und Panzer - #3121 | 03:37 |
| Leif Erikson | Vinland Saga - #3129 | 03:37 |
| Momose Sunoh... | IDOLISH7 « #3133 | 03:37 |
| Petra Leyte | Re:ZERO -Starting Life in... | 03:37 |
| Prinz Eugen | AZUR LANE - #3141 | 03:37 |
| Ritsu | Assassination Classroom ... | 03:37 |
| Roland Fortis | The Case Study of Vanita... | 03:37 |
| Tsukasa Ayatsuji | Amagami SS ‘ #3113 | 03:37 |
| Arc | Skeleton Knight in Anothe... | 03:37 |
| Ginti | Death Parade - #3130 | 03:37 |
| Itsuka Kendou | My Hero Academia * #3122 | 03:37 |
| Kotoha Tachibc.... | WIND BREAKER - #3134 | 03:37 |
| Nanoha Takama... | Magical Girl Lyrical Nanoh... | 03:37 |
| Aries Spring | ASTRA LOST IN SPACE - ... | 03:37 |
| Grey | Black Clover - #3115 | 03:37 |
| Isidro | Berserk - #3135 | 03:37 |
| Kakeru Kurahara | Run with the Wind «#3123 | 03:37 |
| Kyouko Otonashi | Maison Ikkoku - #3119 | 03:37 |
| Menou | The Executioner and Her ... | 03:37 |
| Ao Horie | Ao-chan Can't Study! - #... | 03:37 |
| Chaika Trabant | Chaika -The Coffin Princ... | 03:37 |
| Ji-Won Ahn | BJ Alex - #3116 | 03:37 |
| Neko Fujinomiya | Masamune-kun's Revenge... | 03:37 |
| Taichi Yagami | Digimon: Digital Monsters... | 03:37 |
| Takao | D-Frag! - #3136 | 03:37 |
| Akihiko Sanada | Persona 3 the Movie: #1 S... | 03:38 |
| Ayano Sugiura | YuruYuri - #3161 | 03:38 |
| Rifa | The Apothecary Diaries - #31 | 03:38 |
| Romio Inuzuka | Boarding School Juliet - #... | 03:38 |
| Tashigi | ONE PIECE « #3149 | 03:38 |
| Warumono-san | Mr. Villain's Day Off - #31... | 03:38 |
| Cosmo | Chainsaw Man - #3146 | 03:38 |
| Ena Saitou | Laid-Back Camp - #3138 | 03:38 |
| Gareki | Karneval - #3154 | 03:38 |
| Hacker | Akudama Drive - #3166 | 03:38 |
| Ichirou Miyata | Hajime no Ippo: The Fight... | 03:38 |
| Kirie Goshima | Uzumaki - #3150 | 03:38 |
| Koto | Kyousougiga - #3162 | 03:38 |
| Tsukasa Tenma | COLORFUL STAGE! The ... | 03:38 |
| Erio Touwa | Ground Control to Psycho... | 03:38 |
| Ferdinand | Ascendance of a Bookwor... | 03:38 |
| Kazuhiko Nukum... | Makeine: Too Many Losin... | 03:38 |
| Makio | Demon Slayer: Kimetsu n... | 03:38 |
| Manji | Blade of the Immortal - #... | 03:38 |
| Reina Izumi | Myriad Colors Phantom W... | 03:38 |
| Sumika Fujimiya | Uncle from Another Worl... | 03:38 |
| Claude Elmir | I'm the Villainess, So I'm T... | 03:38 |
| Junpei Hyuuga | Kuroko's Basketball - #3160 | 03:38 |
| Kabuto Yakushi | Naruto - #3152 | 03:38 |
| Natsumi Suga | Weathering With You - #3... | 03:38 |
| Rentarou Satomi | Black Bullet - #3144 | 03:38 |
| Riko Saikawa | Miss Kobayashi's Dragon ... | 03:38 |
| Enterprise | AZUR LANE - #3189 | 03:39 |
| Jerioho | The Seven Deadly Sins - #31° | 03:39 |
| Kotoko Ijichi | Gals Can't Be Kind to Ota... | 03:39 |
| Kurousagi | Problem Children Are Co... | 03:39 |
| May Chang | Fullmetal Alchemist - #31... | 03:39 |
| Niko Mikaciono | Dealing with Mikadono Si... | 03:39 |
| Rin Natsume | Little Busters! - #3181 | 03:39 |
| Alan Stuart | My Next Life as a Villaine... | 03:39 |
| Ayana Otonashi | Tsui no Sora - #3186 | 03:39 |
| Derieri | The Seven Deadly Sins - #... | 03:39 |
| Genji Kamogawa | Hajime no Ippo: The Fight... | 03:39 |
| Kruloifer Einfolk | Undefeated Bahamut Chronic | 03:39 |
| Tooru Mutsuki | Tokyo Ghoul - #3174 | 03:39 |
| Colette Loire | Wistoria: Wand and Swot... | 03:39 |
| Jean Gunnhildr | Genshin Impact - #3191 | 03:39 |
| Koala | ONE PIECE - #3171 | 03:39 |
| Kousuke Ooshiba | Hitorijime My Hero - #3175 | 03:39 |
| Musashi Miyam... | Carnival Phantasm * #3183 | 03:39 |
| You Hiori | BLUE LOCK - #3187 | 03:39 |
| irene Adier | Moriarty the Patriot - #3... | 03:39 |
| Fubuki Azuma | Chained Soldier - #3176 | 03:39 |
| Hajime Kashimo | JUJUTSU KAISEN - #3186 | 03:39 |
| Haruichi Komina... | Ace of the Diamond - #31... | 03:39 |
| Moahiru Tsuyuzaki | Revue Starlight - #3188 | 03:39 |
| Ume Kurumizawa | Kimi ni Todoke: From Me ... | 03:39 |
| Youko Nakajima | The Twelve Kingdoms « #319 | 03:39 |
| Angelise Ikaruga M | Cross Ange: Rondo of Angel z | 03:40 |
| Hakurou | That Time / Got Reincarn... | 03:40 |
| Mei Meido | The 100 Girlfriends Who R... | 03:40 |
| Navier Trobi | The Remarried Empress -... | 03:40 |
| Shounen | To Your Eternity * #3197 | 03:40 |
| Sonoshee McLa... | Redline - #3213 | 03:40 |
| Gaku Yashiro | ERASED - #3194 | 03:40 |
| Gantetsusai Ta... | Hell’s Paradise - #3202 | 03:40 |
| Itsuki Sumeragi | Kakegurui - #3206 | 03:40 |
| Nobunaga Oda | DRIFTERS - #3198 | 03:40 |
| Rim | The Dungeon of Black Co... | 03:40 |
| Tsubasa Kazanari | Symphogear * #3214 | 03:40 |
| Elizabeth Midford | Black Butler - #3211 | 03:40 |
| Ginko Sora | The Ryuo's Work is Never... | 03:40 |
| Hatz | Tower of God - #3207 | 03:40 |
| Haumea | Fire Force ‘ #32603 | 03:40 |
| Maria Ishida | A Silent Voice - #3195 | 03:40 |
| Yoshifumi Nitta | HINAMATSURI - #3199 | 03:40 |
| Bjorn | Vinland Saga * #3212 | 03:40 |
| Haru | My Roommate is a Cat - #... | 03:40 |
| Kiui Watase | Jellyfish Can’t Swim in th... | 03:40 |
| Moca Aoba | BanG Dream! - #3216 | 03:40 |
| Porco Galliard | Attack on Titan - #3200 | 03:40 |
| Smile | Words Bubble Up Like Soda f | 03:40 |
| Hideyoshi Kinos... | Baka and Test - Summon ... | 03:41 |
| Kurumu Kurono | Rosario + Vampire - #3245 | 03:41 |
| Murr | The Case Study of Vanita... | 03:41 |
| Pitohui | Sword Art Online - #3225 | 03:41 |
| Shizuku Yaegashi | Arifureta: From Common... | 03:41 |
| Shuuya Kano | Mekakucity Actors - #3229 | 03:41 |
| Yukari Yukino | The Garden of Words - #... | 03:41 |
| Ainosuke Shindou | SK8 the Infinity - #3242 | 03:41 |
| Amaimon | Blue Exorcist ‘#3238 | 03:41 |
| Bocchan | The Duke of Death and Hi... | 03:41 |
| Himari Inuzuka | Can a Boy-Girl Friendship... | 03:41 |
| Hoozuki | Hozuki's Coolheadedness ... | 03:41 |
| Krone | The Promised Neverland -... | 03:41 |
| Oushi Ashioki | A Sign of Affection * #3234 | 03:41 |
| Celica Arfonia | Akashic Records of Basta... | 03:41 |
| Firentia Lombardi | / Shall Master this Family!... | 03:41 |
| Ha-Neul Yeon | Lost in the Cloud - #3219 | 03:41 |
| Hana Yurikawa | Mieruko-chan * #3227 | 03:41 |
| Naoya Zenin | JUJUTSU KAISEN - #3243 | 03:41 |
| Nino | Arakawa Under the Bridg... | 03:41 |
| Yuma Isogai | Assassination Classroom ... | 03:41 |
| Fumihiko Takaba | JUJUTSU KAISEN - #3226 | 03:41 |
| Keqing | Genshin Impact - #3244 | 03:41 |
| Mako Reizei | Girls und Panzer ‘#3228 | 03:41 |
| Ruth | The Ancient Magus’ Bride... | 03:41 |
| Seiichi Samura | Kagurabachi - #3236 | 03:41 |
| Sylphynford Tac... | Himouto! Umaru-chan ° #... | 03:41 |
| Ayumu Vehara | Love Live! School Idol Pro... | 03:42 |
| Blake Belladonna | RWBY: Ice Queendom - #... | 03:42 |
| Cibo | BLAME! - #3257 | 03:42 |
| Lainie Cyan | The Magical Revolution of... | 03:42 |
| Roxas | Kingdom Hearts * #3249 | 03:42 |
| Eva Ushiromiya | When They Cry - #3254 | 03:42 |
| Kirin Toudou | The Asterisk War - #3250 | 03:42 |
| Miku Sakura | / Want to End this Love G... | 03:42 |
| Tae Takemi | PERSONAS the Animatio... | 03:42 |
| Wave | Akame ga Kill! - #3266 | 03:42 |
| Yamcha | Dragon Ball - #3258 | 03:42 |
| Boota | Gurren Lagann - #3271 | 03:42 |
| Commissioner Q | The God of High School - ... | 03:42 |
| Kae Serinuma | Kiss Him, Not Me - #3259 | 03:42 |
| Karamatsu Mat... | Mr. Osomatsu * #3255 | 03:42 |
| Najenda | Akame ga Kill! - #3267 | 03:42 |
| Sunako Kirishiki | Shiki - #3263 | 03:42 |
| Yurine Hanazono | Dropkick on My Devil! - #... | 03:42 |
| Ashaf | The Witch and the Beast ... | 03:42 |
| Komori | The Ice Guy and His Cool ... | 03:42 |
| Masaki Takigawa | Tsurune - #3268 | 03:42 |
| Naoki Azuma | Takopi's Original Sin - #3... | 03:42 |
| Shinichi Sakurai | Uzaki-chan Wants to Han... | 03:42 |
| Tomoka Kase | Kase-san and Morning Gl... | 03:42 |
| Henry Henderson | SPY x FAMILY - #3285 | 03:43 |
| Miroku | Even If You Slit My Mouth... | 03:43 |
| Mukuro Rokudo | REBORN! - #3281 | 03:43 |
| Popuko | Pop Team Epic - #3273 | 03:43 |
| Sayo Hikawa | BanG Dream! - #3277 | 03:43 |
| Yoshii Kazuho | Texhnolyze - #3289 | 03:43 |
| Dianna Soreil | Mobile Suit Gundam - #3286 | 03:43 |
| Fido | 86 EIGHTY-SIX - #3274 | 03:43 |
| Kaede Otori | Komi Can’t Communicate ... | 03:43 |
| Mitsuki Kiryuu | WIND BREAKER - #3270 | 03:43 |
| Nia Honjou | Date A Live ‘#3278 | 03:43 |
| Rin Kaga | Bunny Drop - #3298 | 03:43 |
| Rogue Cheney | Fairy Tail - #3282 | 03:43 |
| Crestia Bell | The Devil is a * #3283 | 03:43 |
| Inaho Kaizuka | ALDNOAH.ZERO - #3291 | 03:43 |
| Junna Hoshimi | Revue Starlight - #3287 | 03:43 |
| Koharu Fuyutsuki | Love Unseen Beneath the Cle | 03:43 |
| Loo | Farming Life in Another ... | 03:43 |
| Kalluto Zoldyck | Hunter x Hunter - #3276 | 03:43 |
| Lillie | Pokémon - #3284 | 03:43 |
| Mitsuru | DARLING in the FRANXX - #3 | 03:43 |
| R. Dorothy Wayner | The Big O - #3296 | 03:43 |
| Rickert | Berserk - #3280 | 03:43 |
| Teletha Testarossc | Full Metal Panic! - #3288 | 03:43 |
| Ai Miyashita | Love Live! School Idol Project | 03:44 |
| Aleksander | Veil - #3301 | 03:44 |
| Alicia Williams | Pil Become a Villainess W... | 03:44 |
| Jean Otus | ACCA: 13-Territory Inspe... | 03:44 |
| Kogorou Mouri | Detective Conan - #3317 | 03:44 |
| Methode | Frieren: Beyond Journey’s... | 03:44 |
| Otonoshin Koito | Golden Kamuy - #3297 | 03:44 |
| Anack Jahad | Tower of God - #3366 | 03:44 |
| Imca | Senjou no Valkyria 3: Tag... | 03:44 |
| Majime Yamashi... | Shimeji Simulation - #3298 | 03:44 |
| Mukuro Ikusaba | Danganronpa: The Animation | 03:44 |
| Rei Asaka | Dear Brother - #3316 | 03:44 |
| Shushu Suruga | Chained Soldier - #3314 | 03:44 |
| Akira | Kemono Jihen ‘ #3307 | 03:44 |
| Bayonetta | Bayonetta: Bloody Fate - ... | 03:44 |
| Sena Kobayaka... | Eyeshield 21 - #3295 | 03:44 |
| Sousuke | Ponyo - #3311 | 03:44 |
| Train Heartnet | Black Cat - #3315 | 03:44 |
| Tsubame Koyasu | Kaguya-sama: Love is Wa... | 03:44 |
| Yuliy Jirov | Sirius the Jaeger * #3299 | 03:44 |
| Jirou Yakuin | More than a Married Cou... | 03:44 |
| Markl | Howl's Moving Castle - #3... | 03:44 |
| Naito Mudano | TOUGEN ANKI - #3300 | 03:44 |
| Susanoo | Akame ga Kill! - #3312 | 03:44 |
| Terunori Kuga | Food Wars! - #3304 | 03:44 |
| Captain Harlook | Galaxy Express 999 - #3333 | 03:45 |
| Jolenta | Orb: On the Movements o... | 03:45 |
| Kazuki Hoshino | The Empty Box and Zerot... | 03:45 |
| Kuroha Shida | Osamake: Romcom Wher... | 03:45 |
| Shintarou Kisar... | Mekakucity Actors - #3337 | 03:45 |
| ikoma | Kabaneri of the Iron Fortr... | 03:45 |
| Ginshi Shirazu | Tokyo Ghoul - #3346 | 03:45 |
| Imeca | Senjou no Valkyria 3: Tag... | 03:45 |
| Kaguya-hime | The Tale of The Princess ... | 03:45 |
| Laboon | ONE PIECE - #3334 | 03:45 |
| Nice Nature | Umamusume: Pretty Derb... | 03:45 |
| Rin | Shelter - #3322 | 03:45 |
| Semiramis | Fate/Zero ‘#3338 | 03:45 |
| Duanhe Yang | Kingdom * #3319 | 03:45 |
| Hinatsuru | Demon Slayer: Kimetsu n... | 03:45 |
| Houki Shinonono | nfinite Stratos - #3343 | 03:45 |
| Kanade Hisaishi | Sound! Euphonium * #3331 | 03:45 |
| Ryouko Sakaki | Food Wars! - #3339 | 03:45 |
| Sayaka Maizono | Danganronpa: The Anima... | 03:45 |
| Basara Toujou | The Testament of Sister ... | 03:45 |
| Centorea Shianus | Monster Musume: Everyday L | 03:45 |
| Hildegard | Beelzebub - #3328 | 03:45 |
| Lisa Mishima | Terror in Resonance - #33460 | 03:45 |
| Towa Tokoyami | DEMON LORD 2099 - #33... | 03:45 |
| Yun-Ho Baek | Solo Leveling - #3324 | 03:45 |
| Beelzebub | Obey Me! - #3341 | 03:46 |
| Hee-Won Jung | Omniscient Reader - #3361 | 03:46 |
| Kano Yamanouchi | Jellyfish Can’t Swim in th... | 03:46 |
| Kiriha | Tsugumomo - #3365 | 03:46 |
| Magane Chikujouin | Re:CREATORS - #3353 | 03:46 |
| Shirahoshi | ONE PIECE « #3357 | 03:46 |
| Estelle Bright | The Legend of Heroes: Tr... | 03:46 |
| Genma Shiranui | Naruto - #3354 | 03:46 |
| Oguro lwao | My Hero Academia - #3374 | 03:46 |
| Setsuna F. Seiei | Mobile Suit Gundam - #3358 | 03:46 |
| Skip | BANANA FISH : #3366 | 03:46 |
| Tatara Fujita | Welcome to the Ballroom ... | 03:46 |
| Zeta | The Eminence in Shadow ... | 03:46 |
| Hina Satou | The Day / Became a God -... | 03:46 |
| Hiro Kurusu | Kono Oto Tomare! ‘#3367 | 03:46 |
| Hotori Arashiyc... | And Yet The Town Moves ... | 03:46 |
| Houki Shinonono | infinite Stratos - #3343 | 03:46 |
| Kaiser de Emper... | Beelzebub - #3363 | 03:46 |
| Kiyomaro Taka... | Zatch Bell! - #3355 | 03:46 |
| Sakurako Kujou | Beautiful Bones -Sakurak... | 03:46 |
| Shuuko Komi | Komi Can’t Communicate ... | 03:46 |
| Francesca Prelati | Fate/strange Fake - #3368 | 03:46 |
| Kukuru Misakino | The aquatope on white sa... | 03:46 |
| Natsuya Kirishi... | Free! -Dive to the Future... | 03:46 |
| Sakura Oogami | Danganronpa: The Anima... | 03:46 |
| Sakurako Oomuro | YuruYuri * #3356 | 03:46 |
| Tae Hanazono | BanG Dream! - #3372 | 03:46 |
| Tania | Beast Tamer - #3348 | 03:46 |
| Bercouli | Sword Art Online - #3373 | 03:47 |
| Clear | DRAMAtical Murder - #33... | 03:47 |
| Hoshino Takana... | Blue Archive The Animati... | 03:47 |
| Lakan | The Apothecary Diaries - ... | 03:47 |
| Moeko Sekine | The Dangers in My Heart ... | 03:47 |
| Ryouko Kaji | Tsuredure Children - #3381 | 03:47 |
| Setsuna Meiou | Sailor Moon - #3377 | 03:47 |
| Kamisama | Goodnight Punpun - #3370 | 03:47 |
| Kei Uzuki | SAKAMOTO DAYS ‘ #3398 | 03:47 |
| Ryuusuke Minami | BECK - #3378 | 03:47 |
| Tsutomu Goshiki | HAIKYUI!! - #3382 | 03:47 |
| Uta | Bubble - #3386 | 03:47 |
| Velvet Crowe | Tales of Zestiria the X - #... | 03:47 |
| Aya Maruyama | BanG Dream! - #3391 | 03:47 |
| Kouichi Zenigata | Detective Conan - #3387 | 03:47 |
| MISAKA 10032 | A Certain Magical Index - ... | 03:47 |
| Misaki Sakimiya | Dead Mount Death Play - ... | 03:47 |
| Ryang-ha Son | Love of Kill - #3383 | 03:47 |
| Sophia Ascart | My Next Life as a Villaine... | 03:47 |
| Aru Honshou | Hitoribocchi no Marumar... | 03:47 |
| Kakeru Manabe | Fruits Basket - #3400 | 03:47 |
| Miho Nishizumi | Girls und Panzer - #3388 | 03:47 |
| Nymph | Heaven's Lost Property: ... | 03:47 |
| Serufu Yua | Do It Yourself!! - #3376 | 03:47 |
| Subaru Oozora | Holo no Graffiti - #3384 | 03:47 |
| Akira Akao | SAKAMOTO DAYS - #34805 | 03:48 |
| Ivankov Emporio | ONE PIECE - #3401 | 03:48 |
| Jodio Joestar | JoJo's Bizarre Adventure ... | 03:48 |
| Kikunojou | ONE PIECE - #3413 | 03:48 |
| Kiyotaka Ishimca... | Danganronpa: The Anima... | 03:48 |
| Pina | BEASTARS * #3417 | 03:48 |
| Boros-sama | One-Punch Man - #3394 | 03:48 |
| Desir Herrman | A Returner's Magic Shoul... | 03:48 |
| Haruna Sairenji | To Love Ru - #3422 | 03:48 |
| Kuroe Akaishi | KAIJU GIRL CARAMELISE... | 03:48 |
| Mashiro Mitsumins | Engaged to the Unidentified ° | 03:48 |
| Shouma Toriashi | Yakuza Fiancé: Raise wa ... | 03:48 |
| Sunako Nakahara | The Wallflower - #3406 | 03:48 |
| Asa Takumi | Journal with Witch - #3419 | 03:48 |
| Kana Ichikawa | The Dangers in My Heart ... | 03:48 |
| Kimie Arashiyca... | MARRIAGETOXIN + #3415 | 03:48 |
| Kyouryuu no Hime | DARLING in the FRANXX - #3 | 03:48 |
| Sunny | OMORI - #3399 | 03:48 |
| Yiva | Vinland Saga - #34807 | 03:48 |
| Kiyoharu Hyoud.... | Welcome to the Ballroom ... | 03:48 |
| Mika Egashira | Skip and Loafer - #3404 | 03:48 |
| Nana Hayashida | Golden Time - #3408 | 03:48 |
| Rei Batsubami | Kakegurui - #3396 | 03:48 |
| Tadashi Kikuchi | SK8 the Infinity - #3420 | 03:48 |
| Wako Izumi | CITY THE ANIMATION - #... | 03:48 |
| Anna Schneider | takt op.Destiny ‘#3429 | 03:49 |
| Grimm | Combatants Will Be Dispatch: | 03:49 |
| Hikaru Gero | MARRIAGETOXIN + #3421 | 03:49 |
| Jin-Cheol U | Solo Leveling - #3425 | 03:49 |
| Nyarth | Pokémon - #3445 | 03:49 |
| Samatoki Aohit... | HYPNOSISMIC -Division ... | 03:49 |
| Tsukasa Mizugaki | Plastic Memories * #3441 | 03:49 |
| Yaniko Satou | Chainsmoker Cat - #3437 | 03:49 |
| Ayaka Kagari | Witch Craft Works - #3446 | 03:49 |
| Jong-in Choi | Solo Leveling - #3426 | 03:49 |
| Meme Bashame | My Deer Friend Nokotan « #3: | 03:49 |
| Mio | Dororo - #3434 | 03:49 |
| Sakuya Izayoi | Forbidden Scrollery - #34... | 03:49 |
| Shiva | Record of Ragnarok ° #3... | 03:49 |
| Chisato Arashi | Love Live! School Idol Pro... | 03:49 |
| Felix Robane | Who Made Me a Princess ... | 03:49 |
| Jyushimatsu M... | Mr. Osomatsu - #3447 | 03:49 |
| Kurumi Haraga | The 100 Girlfriends Who R... | 03:49 |
| Ryouma Nagare | Getter Robo - #3439 | 03:49 |
| Shino Aburame | Naruto - #3431 | 03:49 |
| Shintarou Jagas... | Jagaaan - #3423 | 03:49 |
| Masafumi Akagi | Tsuredure Children - #3448 | 03:49 |
| Nemu Miyao | WITCH WATCH ° #3436 | 03:49 |
| Olivia Servant | The Hidden Dungeon Onl... | 03:49 |
| Saruhiko Fushimi | K - #3432 | 03:49 |
| Shio Koube | Happy Sugar Life - #3424 | 03:49 |
| Squealer | From the New World - #3... | 03:49 |
| Eve Reese | Redo of Healer - #3457 | 03:50 |
| Karuta Roromiya | Inu X Boku Secret Service... | 03:50 |
| Mi-Ae Hwang | After School Lessons for ... | 03:50 |
| Nana | Elfen Lied - #3469 | 03:50 |
| Sang-A Yu | Omniscient Reader - #3473 | 03:50 |
| Vermouth | Detective Conan - #3453 | 03:50 |
| Glass | The Rising of the Shield ... | 03:50 |
| Hinata Tachibana | Life With an Ordinary Gu... | 03:50 |
| Kanade | Beast Tamer - #3458 | 03:50 |
| Takamura | SAKAMOTO DAYS * #3462 | 03:50 |
| Yoshitake Tanaka | Daily Lives of High Schoo... | 03:50 |
| Cinnamoroll | SANRIO BOYS : #3459 | 03:50 |
| Emil | NieR:Automata Ver1.1a ° ... | 03:50 |
| Favaro Leone | Rage ot Bahamut: Genesi... | 03:50 |
| Hakuri Sazanami | Kagurabachi - #3463 | 03:50 |
| Saito Hiraga | The Familiar of Zero - #3... | 03:50 |
| Hinata Hoshino | WATATENI: an Angel Flew... | 03:50 |
| Ikki | Saint Seiya: Knights of th... | 03:50 |
| Isabella Yamam... | Paradise Kiss - #3464 | 03:50 |
| Kanae Kochou | Demon Slayer: Kimetsu n... | 03:50 |
| Natsuko Hirose | ZENSHU - #3468 | 03:50 |
| Daiwa Scarlet | Umamusume: Pretty Derb... | 03:51 |
| Kaede Akamatsu | New Danganronpa V3: Minna | 03:51 |
| Ogun Montgom... | Fire Force - #3493 | 03:51 |
| Rance | Rance 01: Hikari wo Moto... | 03:51 |
| Yugo Hachiken | Silver Spoon - #3489 | 03:51 |
| Yuiko Kurugaya | Little Busters! - #3497 | 03:51 |
| Aika Natsukawa | The Dreaming Boy is a Re... | 03:51 |
| Akane Kashiwaz... | Run with the Wind - #3496 | 03:51 |
| Anna Anjou | Anjo the Mischievous Gal ... | 03:51 |
| Arisu Yamabuki | Tune In to the Midnight H... | 03:51 |
| Inferno Cop | Space Patrol Luluco - #34... | 03:51 |
| Layla Serizawa | NANA - #3474 | 03:51 |
| Rue Kuroha | Princess Tutu - #3494 | 03:51 |
| Shuuko Murao | Blue Spring Ride - #3482 | 03:51 |
| Dark Schneider | Bastard!! - #3495 | 03:51 |
| Ganta Igarashi | Deadman Wonderland - #... | 03:51 |
| Kenji Yamaguchi | My Little Monster - #3475 | 03:51 |
| Koharu Hidaka | Hi Score Girl - #3471 | 03:51 |
| Leleila Lelena | Gate - #3483 | 03:51 |
| Mimimi Utsukus... | The 100 Girlfriends Who R... | 03:51 |
| Nagisa Natsuna... | The Detective Is Already ... | 03:51 |
| Ruri | Dr. STONE - #3499 | 03:51 |
| Isshin Kurosaki | Bleach - #3496 | 03:51 |
| Kurosawa | The Legend of the Stron... | 03:51 |
| Masayuki Hori | Monthly Girls' Nozaki-kun ... | 03:51 |
| Miu lruma | New Danganronpa V3: Mi... | 03:51 |
| Nine Forton | Beware the Villainess! * #... | 03:51 |
| Soma Asman Ka... | Black Butler - #3486 | 03:51 |
| Teru Momijiyama | SHY - #3500 | 03:51 |
| Zest | The Testament of Sister ... | 03:51 |
| Jougo | JUJUTSU KAISEN - #3501 | 03:52 |
| Kishirika Kishirisu | Mushoku Tensei: Jobless ... | 03:52 |
| Kouta Hirano | High School of the Dead -... | 03:52 |
| Michiru Kinushi... | Plastic Memories - #3521 | 03:52 |
| Mifune | Soul Eater ‘ #3517 | 03:52 |
| Shizuku Ousaka | Love Live! School Idol Pro... | 03:52 |
| KAITO | COLORFUL STAGE! The ... | 03:52 |
| Meme Kakure | The 100 Girlfriends Who R... | 03:52 |
| Shiori Yomiuri | Days with My Stepsister *... | 03:52 |
| Yassan | Daily Lives of High School Bo | 03:52 |
| Genkai | Yu Yu Hakusho - #3515 | 03:52 |
| Jugram Haschw... | Bleach - #3519 | 03:52 |
| Lisa Isaribi | Fire Force ‘ #3527 | 03:52 |
| Loran Cehaock | Mobile Suit Gundam - #3503 | 03:52 |
| Nene Kusanagi | COLORFUL STAGE! The Mov | 03:52 |
| Yoshimura | Tokyo Ghoul ‘ #3511 | 03:52 |
| Konohamaru Sa... | Naruto - #3516 | 03:52 |
| Madoka Yuzuha... | The Fragrant Flower Bloo... | 03:52 |
| Manaka Mukaido | A Lull in the Sea - #3520 | 03:52 |
| Seita | Grave of the Fireflies - #3... | 03:52 |
| Shiki Tademaru | Kemono Jihen - #3512 | 03:52 |
| Yoi Takiguchi | In the Clear Moonlit Dusk ... | 03:52 |
| Alicia | Clevatess - #3529 | 03:53 |
| Nyanta | Log Horizon - #3525 | 03:53 |
| Reiji Kurose | Boy's Abyss * #3545 | 03:53 |
| Shihou Kimizuki | Seraph of the End: Vampi... | 03:53 |
| Yae Amagami | Tying the Knot with an A... | 03:53 |
| Yuuna Shigemura | Sword Art Online - #3533 | 03:53 |
| Amelia Watson | Holo no Graffiti - #3546 | 03:53 |
| Kefuka Fuura | Sayonara, Zetsubou-Sensei ‘ | 03:53 |
| Kenjaku | JUJUTSU KAISEN « #3538 | 03:53 |
| Nana Shimura | My Hero Academia - #3526 | 03:53 |
| Takuto Maruki | PERSONAS the Animatio... | 03:53 |
| Tsubame Mizus... | Keep Your Hands Off Eizo... | 03:53 |
| Willem Kmetsch | WorldEnd: What are you ... | 03:53 |
| Yo Go | Sign - #3522 | 03:53 |
| Atri | ATRI -My Dear Moments- - #: | 03:53 |
| Iku Sutou | The 100 Girlfriends Who R... | 03:53 |
| Jun Naruse | The Anthem of the Heart ... | 03:53 |
| Miku | DARLING in the FRANXX - #3 | 03:53 |
| Pip Bernadotte | Hellsing - #3539 | 03:53 |
| Sagiri Ameno | Yuuna and the Haunted H... | 03:53 |
| Erika Chiba | The Irregular at Magic Hi... | 03:53 |
| Ikta Solork | Alderamin on the Sky * #... | 03:53 |
| Ji-Yeong Yu | Eleceed « #3536 | 03:53 |
| Lapis Lazuli | Land of the Lustrous: #3... | 03:53 |
| Botan Kurashiki | Ookami Shounen wa Kyou... | 03:54 |
| Gaku Yaotome | IDOLISH7 - #3565 | 03:54 |
| Kaoru Kamiya | Rurouni Kenshin - #3561 | 03:54 |
| Quetzalcoatl | Fate/Grand Order Absolu... | 03:54 |
| Silva Zoldyck | Hunter x Hunter - #3553 | 03:54 |
| Yachiyo | Apocalypse Hotel - #3569 | 03:54 |
| Ai Nanasaki | Amagami SS - #3554 | 03:54 |
| Karin Asaka | Love Live! School Idol Pro... | 03:54 |
| Kongou | Land of the Lustrous - #3... | 03:54 |
| Miko Sakura | Holo no Graffiti - #3558 | 03:54 |
| Mizuki Nakahara | Lycoris Recoil - #3566 | 03:54 |
| Tatsuya Kimura | Hajime no Ippo: The Fight... | 03:54 |
| Beidou | Genshin Impact - #3551 | 03:54 |
| Li Nie | Tales of Demons and God... | 03:54 |
| Medea | Fate/Zero - #3563 | 03:54 |
| Rion Akao | SAKAMOTO DAYS - #3567 | 03:54 |
| Satan | Obey Me! - #3579 | 03:54 |
| Willard Wright | Umineko When They Cry ... | 03:54 |
| Zanoba Shirone | Mushoku Tensei: Jobless ... | 03:54 |
| Aashii Kedarui | The 100 Girlfriends Who R... | 03:54 |
| Jinta | Sword of the Demon Hun... | 03:54 |
| Justin Law | Soul Eater - #3564 | 03:54 |
| Odanna | Kakuriyo -Bed & Breakfas... | 03:54 |
| Roka Shibasaki | D-Frag! - #3556 | 03:54 |
| Sentouin Roku-g... | Combatants Will Be Dispa... | 03:54 |
| Shishiba | SAKAMOTO DAYS « #3552 | 03:54 |
| Aki ayoi | Yu-Gi-Oh! - #3585 | 03:55 |
| Hime Gotou | Kakushigoto - #3589 | 03:55 |
| Nagi Arato | Ruri Rocks * #3581 | 03:55 |
| Seiya Takehaya | Tsurune * #3573 | 03:55 |
| Tooru | JoJo's Bizarre Adventure ... | 03:55 |
| Yuuna Yuuki | Yuki Yuna is a Hero - #3593 | 03:55 |
| Adilet Mayer | Rokka -Braves of the Six ... | 03:55 |
| Akemi Souryuuin | How Heavy Are the Dumbbell | 03:55 |
| Casshern | Casshern Sins - #3586 | 03:55 |
| Kaori Asaka | The Summer You Were T... | 03:55 |
| Kazuma Souma | Fruits Basket - #3582 | 03:55 |
| Qingqiu Shen | Scumbag System * #3596 | 03:55 |
| Syaoran | Tsubasa RESERVoir CHR... | 03:55 |
| Dokuro Mitsukai | Bludgeoning Angel Dokur... | 03:55 |
| Gauche Adiai | Black Clover ‘#3595 | 03:55 |
| Miki Naoki | SCHOOL-LIVE! - #3587 | 03:55 |
| Ranka Ookami | Seton Academy: Join the ... | 03:55 |
| Toranosuke Miv... | Yamada and the Seven W... | 03:55 |
| Klee | Genshin Impact * #3606 | 03:55 |
| Oliva Biscuit | BAK! - #3604 | 03:55 |
| Paimon | Genshin - #3596 | 03:55 |
| Tenn Kujo | IDOLISHT - #3588 | 03:55 |
| Tsunemi Chiba | BECK - #3584 | 03:55 |
| Angelina Kudou Shi | The Irregular at Magic High S | 03:56 |
| Eri Shiina | Angel Beats! - #3629 | 03:56 |
| Feirune | So I'm a Spider, So What... | 03:56 |
| Grea | Rage of Bahamut: Genesi... | 03:56 |
| Hinata Sakaguchi | That Time / Got Reincarn... | 03:56 |
| Masaru Katou | Gantz * #3613 | 03:56 |
| Shin Iryuu | A Sign of Affection - #3601 | 03:56 |
| lori Nagase | Kokoro Connect - #3605 | 03:56 |
| Fuchi | Hell’s Paradise - #3622 | 03:56 |
| Harumi Takeda | My Senpai is Annoying - #... | 03:56 |
| Saya | Puella Magi Sonico Magica * 4 | 03:56 |
| Zack Fair | Final Fantasy VII: Advent ... | 03:56 |
| Amber | Genshin Impact - #3623 | 03:56 |
| Carla Yeager | Attack on Titan ‘#3631 | 03:56 |
| John | SHADOWS HOUSE - #3599 | 03:56 |
| Kanato Sakamaki | Diabolik Lovers - #3607 | 03:56 |
| Mercurius | Dies irae * #3619 | 03:56 |
| Mira Kamiunten | Chained Soldier - #3611 | 03:56 |
| Mystogan | Fairy Tail - #3603 | 03:56 |
| Siegfried Kircheis | Legend of the Galactic H... | 03:56 |
| Ayano Yuugiri | Engage Kiss - #3612 | 03:56 |
| Chi-Chi | Dragon Ball - #3628 | 03:56 |
| Hakaze Kusaribe | Blast of Tempest - #3616 | 03:56 |
| Kanan Zebul | Mistress Kanan is Devilish... | 03:56 |
| Oliva Biscuit | BAKI - #3604 | 03:56 |
| Subaru Sakamaki | Diabolik Lovers - #3608 | 03:56 |
| Alice Von Atarax... | Pm the Max-Level Newbie... | 03:57 |
| Ayu Tsukimiya | Kanon - #3645 | 03:57 |
| Coco Kiryu | Holo no Graffiti - #3633 | 03:57 |
| Kouichi Shindou | Horimiya * #3637 | 03:57 |
| Shunsuke Otosc... | Charlotte - #3641 | 03:57 |
| Andrew Gilbert ... | Sword Art Online * #36360 | 03:57 |
| Deedilit | Record of Lodoss War - #364 | 03:57 |
| Haku | Utawarerumono The Fals... | 03:57 |
| Natsuo Fujii | Domestic Girlfriend - #36... | 03:57 |
| Scott Pilgrim | Scott Pilgrim Takes Off - ... | 03:57 |
| Suigetsu Houzuki | Naruto * #3634 | 03:57 |
| Tenga Onigawara | Mob Psycho 100 - #3638 | 03:57 |
| Brandon Heat | Gungrave - #3627 | 03:57 |
| Hyuse | World Trigger - #3643 | 03:57 |
| Meteora Osterreio! | Re:CREATORS - #3639 | 03:57 |
| Miwa Inuzuka | How Do We Relationship?... | 03:57 |
| Road Kamelot | D.Gray-man - #3655 | 03:57 |
| Ryuu | Snow White with the Red ... | 03:57 |
| Yuu Kamishiro | Holyland - #3635 | 03:57 |
| Hiroko Seto | Your lie in April - #3648 | 03:57 |
| Kureha Crylet | Redo of Healer ‘ #3632 | 03:57 |
| Peter Parker | Deadpool: Samurai * #3644 | 03:57 |
| Theresia van As... | Re:ZERO -Starting Life in... | 03:57 |
| Chikara Ennoshii... | HAIKYU!! - #3657 | 03:58 |
| Eina Tulle | Is It Wrong to Try to Pick ... | 03:58 |
| Luna | KONOSUBA -God's blessi... | 03:58 |
| Masahiro Setag... | Hitorijime My Hero - #3665 | 03:58 |
| Mihai Florescu | Kemono Jihen - #3677 | 03:58 |
| Mimori Tougou | Yuki Yuna is a Hero - #3673 | 03:58 |
| Shugen | Hell’s Paradise - #3653 | 03:58 |
| Tokiyuki Houjou | The Elusive Samurai ‘ #3... | 03:58 |
| Aguri Sakurano | GAMERS! - #3658 | 03:58 |
| Chartreux Westia | Boarding School Juliet - #... | 03:58 |
| Dr. Xeno | Dr. STONE - #3666 | 03:58 |
| Kiwi | Cyberpunk: Edgerunners -... | 03:58 |
| Mitty | Made in Abyss - #3674 | 03:58 |
| Satsuki Koto | There's No Freaking Way ... | 03:58 |
| Watame Tsuno... | Holo no Graffiti - #3678 | 03:58 |
| Asahi Amagami | Tying the Knot with an Amag | 03:58 |
| Mami Yagihara | Blue Flag - #3659 | 03:58 |
| Niccolo | Attack on Titan - #3675 | 03:58 |
| Souma Shiki | Play It Cool, Guys - #3671 | 03:58 |
| itsuki Koizumi | The Melancholy of Haruhi... | 03:58 |
| Aya Asagiri | MAGICAL GIRL SITE: #3... | 03:58 |
| Jacuzzi Splot | Baccano! - #3680 | 03:58 |
| Mei | Hells Paradise ~ #3676 | 03:58 |
| Riko Amanai | JUJUTSU KAISEN - #3668 | 03:58 |
| Ruri Ichigyou | HELLO WORLD - #3652 | 03:58 |
| Shinichirou Sano | Tokyo Revengers - #3672 | 03:58 |
| Virgo | Fairy Tail- #3656 | 03:58 |
| Yuusuke Fujisaki | Gintama - #3668 | 03:58 |
| Laffey | AZUR LANE - #3693 | 03:59 |
| Maetel | Galaxy Express 999 - #3689 | 03:59 |
| Nene Himekawa | Tune In to the Midnight Heart | 03:59 |
| Noctis Lucis Ca... | Brotherhood Final Fantas... | 03:59 |
| Shuuichi Saitou | Uzumaki - #3681 | 03:59 |
| Yusa Kurobane | Charlotte - #3685 | 03:59 |
| Akira Sendou | Slam Dunk « #3698 | 03:59 |
| Kiki Seiran | Snow White with the Red Hai | 03:59 |
| Nier | NieR:Automata Ver1.1a - #36' | 03:59 |
| Noire | Hyperdimension Neptunia * # | 03:59 |
| Reines El-Melloi Arc | Fate/Zero - #3702 | 03:59 |
| Sukeroku Yuurc... | Showa Genroku Rakugo S... | 03:59 |
| Haruka Morishi... | Amagami SS * #3691 | 03:59 |
| Hoanabi Hyuuga | Naruto - #3699 | 03:59 |
| Izumi Akazawa | Another * #3683 | 03:59 |
| Kosame Amagai | MAGICAL GIRL SITE - #3... | 03:59 |
| Sei Takanashi | The Saint's Magic Power i... | 03:59 |
| Shiki Ichinose | TOUGEN ANKI - #3687 | 03:59 |
| ihwa | Hero Killer - #3695 | 03:59 |
| Ame | Wolf Children - #3692 | 03:59 |
| Ja-Ha Lee | Return of the Mad Demon... | 03:59 |
| Michiru Hyoudou | Saekano: How to Raise a ... | 03:59 |
| Shiroko Suncaoo... | Blue Archive The Animati... | 03:59 |
| Jun Manjoume | Yu-Gi-Oh! - #3717 | 04:00 |
| Mii-kun | How to Keep a Mummy - ... | 04:00 |
| Miwa Mikadono | Dealing with Mikadono Sister: | 04:00 |
| Pudding Charlo... | ONE PIECE « #3725 | 04:00 |
| Shigeshige Toku... | Gintama * #3729 | 04:00 |
| Solution Epsilon | Overlord - #3713 | 04:00 |
| Yui Funami | YuruYuri - #3705 | 04:00 |
| Capella Emerad... | Re:ZERO -Starting Life in... | 04:00 |
| Erika Karisawa | Durarara!! - #3718 | 04:00 |
| Kudryavka Noumi | Little Busters! - #3710 | 04:00 |
| Noiz | DRAMAtical Murder - #3706 | 04:00 |
| Shiro | The Helpful Fox Senko-sa... | 04:00 |
| Shirokusa Kachi | Osamake: Romcom Wher... | 04:00 |
| Belfast | AZUR LANE - #3731 | 04:00 |
| Kureno Souma | Fruits Basket * #3711 | 04:00 |
| Latina | if It's for My Daughter, I'd... | 04:00 |
| Lunch | Dragon Ball - #3723 | 04:00 |
| Madoka Ayuka... | Kimagure Orange Road - ... | 04:00 |
| Terumi Afuro | Inazuma Eleven ‘ #3719 | 04:00 |
| Yuuya Tenjou | / Got a Cheat Skill in Anot... | 04:00 |
| Aoi Yamada | Wagnaria!! - #3720 | 04:00 |
| Azest Kingscro... | A Returner's Magic Shoul... | 04:00 |
| Keith Kazama Fil... | B: The Beginning - #3708 | 04:00 |
| Miki Hoshii | The Idol Master - #3724 | 04:00 |
| Rin | Spirited Away - #3728 | 04:00 |
| Shiroko Sunaoo... | Blue Archive The Animati... | 04:00 |
| Aoi Kanzaki | Demon Slayer: Kimetsu n... | 04:01 |
| Ho-Bin Yu | Lookism * #3749 | 04:01 |
| Mira Suou | World's End Harem - #3733 | 04:01 |
| Shinjiro Aragaki | Persona 3 the Movie: #1 S... | 04:01 |
| Uvogin | Hunter x Hunter - #3745 | 04:01 |
| Zhengxi Zhan | 19 Tian - #3753 | 04:01 |
| Haruka Amami | The Idol Master - #3756 | 04:01 |
| Jong-Geon Park | Lookism - #3734 | 04:01 |
| Kaju Nukumizu | Makeine: Too Many Losin... | 04:01 |
| Kumatetsu | The Boy and the Beast - ... | 04:01 |
| Maria Cadenzav... | Symphogear - #3746 | 04:01 |
| Popura Taneshii... | Wagnaria!! - #3738 | 04:01 |
| Shiva | The Girl from the Other S... | 04:01 |
| Ako Udagawa | BanG Dream! « #3755 | 04:01 |
| Slaine Troyard | ALDNOAH.ZERO - #3739 | 04:01 |
| Yako | Toilet-bound Hanako-kun... | 04:01 |
| Yoshino Takigawa | Blast of Tempest - #3751 | 04:01 |
| Youta Hino | The Ramparts of Ice * #3... | 04:01 |
| itsuki Minami | Air Gear - #3735 | 04:01 |
| Aaduo | The Apothecary Diaries - ... | 04:01 |
| Ai Fuyuumi | Oreshura - #3752 | 04:01 |
| Eri Sawachika | School Rumble - #3744 | 04:01 |
| Fuuka Yamagishi | Persona 3 the Movie: #1 S... | 04:01 |
| Hermes | Is It Wrong to Try to Pick ... | 04:01 |
| Aoba Seragaki | DRAMAtical Murder - #37... | 04:02 |
| Frosch | Fairy Tail - #3773 | 04:02 |
| Haruka | Pokémon * #3761 | 04:02 |
| Hoon Lee | Suicide Boy - #3777 | 04:02 |
| Iko Kirino | Tune In to the Midnight H... | 04:02 |
| Youzou Ooba | Blue Literature Series - #... | 04:02 |
| Yuuji Yugami | Yugami-kun ni wa Tomod... | 04:02 |
| Akio Fudou | TRINITY SEVEN - #3774 | 04:02 |
| Hit | Dragon Ball - #3776 | 04:02 |
| Keiko Yukimura | Yu Yu Hakusho - #3758 | 04:02 |
| Nozomi Kaminashi | Keijollliill! - #3782 | 04:02 |
| Rill Boismortier | Black Clover - #3762 | 04:02 |
| Touma | Hell’s Paradise - #3778 | 04:02 |
| Yoshiharu Hisomu | Kiznaiver - #3766 | 04:02 |
| Marnie | When Marnie Was There -... | 04:02 |
| Mira Yamana | TRINITY SEVEN - #3775 | 04:02 |
| Riddle Roseheatr... | Disney Twisted-Wonderla... | 04:02 |
| Saeko Sawatari | How Do We Relationship? - #. | 04:02 |
| Takumi Ichinose | NANA * #3759 | 04:02 |
| Toshizou Hijikata | Golden Kamuy - #3783 | 04:02 |
| Liuying | Honkai: Star Rail - The E... | 04:02 |
| Michiru Inukai | Talentless Nana - #3756 | 04:02 |
| Mu Li | Kingdom - #3776 | 04:02 |
| Pipimi | Pop Team Epic - #3768 | 04:02 |
| Ren Tsuruga | Skip Beat! - #3768 | 04:02 |
| Shinpei Gotou | Firefly Wedding - #3772 | 04:02 |
| Kurumi Nonaka | The Testament of Sister New | 04:03 |
| Leviathan | Obey Me! - #3789 | 04:03 |
| Natsuno Yuuki | Shiki - #3801 | 04:03 |
| Shinya Yukimura | Science Fell in Love, So! ... | 04:03 |
| Symboli Rudolf | Umamusume: Pretty Derby ° 3 | 04:03 |
| Wilbell voll Erslied | Atelier Escha & Logy ~Alc... | 04:03 |
| Aika | Ane wa Yanmama Junyuu... | 04:03 |
| Arrietty | The Secret World of Arrietty | 04:03 |
| Atou | Apocalypse Bringer Myno... | 04:03 |
| Beatrix | The Eminence in Shadow ... | 04:03 |
| Luluco | Space Patrol Luluco - #37... | 04:03 |
| Nozomi Kaminashi | Keijolll!!ll! - #3782 | 04:03 |
| Jashi | DAN DA DAN - #3791 | 04:03 |
| Jashin-chan | Dropkick on My Devil! - #... | 04:03 |
| Kneesooks Demon | Panty & Stocking with Garter | 04:03 |
| Natsume | DECA-DENCE - #3787 | 04:03 |
| Ouka Shiunji | The Shiunji Family Childr... | 04:03 |
| Yuzuki Nanase | Chitose Is in the Ramune ... | 04:03 |
| Bum Yoon | Killing Stalking - #3804 | 04:03 |
| Inglis Eucus | Reborn to Master the Blade: | 04:03 |
| Isana Higashira | My Stepmom's Daughter i... | 04:03 |
| Makarov Dreyar | Fairy Tail - #3780 | 04:03 |
| Matsuemon Ten... | Demon Slayer: Kimetsu n... | 04:03 |
| Shishou | Reincarnated as a Sword ... | 04:03 |
| Yakumo Taukamot | School Rumble - #3792 | 04:03 |
| Jin-Yeong Choi | Seasons of Blossom: #3... | 04:04 |
| Kurihara | Prison School - #3813 | 04:04 |
| Kurou Sakuraga... | In/Spectre * #3821 | 04:04 |
| Luna Healer | The Hidden Dungeon Onl... | 04:04 |
| Saya | Wandering Witch: The Jo... | 04:04 |
| Xebec Rocks | ONE PIECE - #3833 | 04:04 |
| Erika Kurumi | Precure - #3810 | 04:04 |
| Gilda | The Promised Neverland - #3 | 04:04 |
| Kaede Manyuda | Kakegurui - #3814 | 04:04 |
| Lanzhu Zhong | Love Live! School Idol Project | 04:04 |
| Mylene Rafa Holfo: | Trapped in a Dating Sim: The | 04:04 |
| Myucel Foaran | Outbreak Company « #38... | 04:04 |
| Tobikichi Usahara | Life Lessons with Uramic... | 04:04 |
| Yukichi | The Masterful Cat is Depr... | 04:04 |
| Cinnamon | Nekopara - #3815 | 04:04 |
| Estarossa | The Seven Deadly Sins ° ... | 04:04 |
| Natsuki Seba | SAKAMOTO DAYS - #3827 | 04:04 |
| Risu | Dorohedoro ‘#3811 | 04:04 |
| Sentouin D | Go! Go! Loser Ranger! - #... | 04:04 |
| Shippo | InuYasha - #3819 | 04:04 |
| Snow | Combatants Will Be Dispa... | 04:04 |
| Chihiro Kosaka | The World God Only Kno... | 04:04 |
| Kazuya Souma | How a Realist Hero Rebuil... | 04:04 |
| Kisara Tendo | Black Bullet - #3828 | 04:04 |
| Max Lobo | BANANA FISH « #3836 | 04:04 |
| Najimi Ajimu | Medaka Box * #3812 | 04:04 |
| Sakura Akino | ORESUKI: Are you the onl... | 04:04 |
| Hades | Record of Ragnarok - #3... | 04:05 |
| Hajime Sugoroku | NANBAKA - #3841 | 04:05 |
| Hiromi Higa | SK8 the Infinity - #3845 | 04:05 |
| Kirika Akatsuki | Symphogear - #3829 | 04:05 |
| Megumi Sakura | SCHOOL-LIVE! - #3849 | 04:05 |
| Raito Sakamaki | Diabolik Lovers ‘ #3837 | 04:05 |
| Remilia Scarlet | Forbidden Scrollery - #38... | 04:05 |
| Akane Sakuram... | I'm Getting Married to a ... | 04:05 |
| Amanojaku | Ghost Stories - #3858 | 04:05 |
| Angra Mainyu | Fate/Zero - #3842 | 04:05 |
| Mylene Rafa Holfo1 | Trapped in a Dating Sim: The | 04:05 |
| Reinhard Tristan... | Dies irae - #3850 | 04:05 |
| Rin Onigawara | Armed Girl's Machiavellis... | 04:05 |
| Tina Sprout | Black Bullet - #3838 | 04:05 |
| Iris Cannary | Violet Evergarden ‘ #3843 | 04:05 |
| Nasse | Platinum End * #3839 | 04:05 |
| Noel Stollen | The Most Notorious Talk... 4	1	1	13	2	0	14	3804	436	39	-1	 5	1	1	13	2	1	14	3804	226	39	70.146996	Beatrice 5	1	1	13	2	2	252	3807	198	35	96.213959	Redden 3	1	1	14	0	0	15	3874	332	149	-1	 4	1	1	14	1	0	18	3874	329	38	-1	 5	1	1	14	1	1	18	3899	2	2	95.750610	/ 5	1	1	14	1	2	37	3877	76	26	95.750610	Love 5	1	1	14	1	3	126	3876	72	36	93.116219	Amy 5	1	1	14	1	4	213	3884	4	4	69.634819	* 5	1	1	14	1	5	233	3874	114	29	95.770973	#3851 4	1	1	14	2	0	15	3987	292	36	-1	 5	1	1	14	2	1	15	3987	157	36	94.740303	Kaoru 5	1	1	14	2	2	182	3987	125	35	95.822784	Seta 3	1	1	15	0	0	15	4053	495	508	-1	 4	1	1	15	1	0	17	4053	370	31	-1	 5	1	1	15	1	1	17	4056	86	27	92.947754	BanG 5	1	1	15	1	2	120	4056	117	27	92.808220	Dream! 5	1	1	15	1	3	254	4064	4	4	12.105026	« 5	1	1	15	1	4	274	4053	113	31	96.820801	#3855 4	1	1	15	2	0	15	4167	469	42	-1	 5	1	1	15	2	1	15	4167	168	35	95.528877	Kanon 5	1	1	15	2	2	195	4167	289	42	95.071350	Nakagawa 4	1	1	15	3	0	15	4235	495	37	-1	 5	1	1	15	3	1	15	4236	62	27	96.682945	The 5	1	1	15	3	2	90	4235	94	28	96.682945	World 5	1	1	15	3	3	199	4236	65	27	96.924568	God 5	1	1	15	3	4	279	4236	72	36	96.088242	Only 5	1	1	15	3	5	368	4236	103	27	93.203247	Knows 5	1	1	15	3	6	476	4231	8	45	47.550488	° 5	1	1	15	3	7	506	4242	4	21	67.522095	; 4	1	1	15	4	0	16	4344	351	37	-1	 5	1	1	15	4	1	16	4347	191	34	93.115601	Sakura 5	1	1	15	4	2	216	4344	151	37	92.417274	Akino 4	1	1	15	5	0	17	4415	467	37	-1	 5	1	1	15	5	1	17	4416	163	27	83.444542	ORESUKI: 5	1	1	15	5	2	195	4416	57	27	95.661339	Are 5	1	1	15	5	3	266	4424	56	28	95.767441	you 5	1	1	15	5	4	336	4416	54	27	95.271301	the 5	1	1	15	5	5	403	4415	81	28	94.914803	onl... 4	1	1	15	6	0	18	4527	255	34	-1	 5	1	1	15	6	1	18	4527	114	34	95.020187	Max 5	1	1	15	6	2	143	4527	130	34	96.135841	Lobo 3	1	1	16	0	0	18	4593	390	148	-1	 4	1	1	16	1	0	18	4593	390	30	-1	 5	1	1	16	1	1	18	4596	150	27	96.498207	BANANA 5	1	1	16	1	2	184	4596	75	27	93.284492	FISH 5	1	1	16	1	3	276	4604	3	4	19.613708	« 5	1	1	16	1	4	294	4593	114	30	96.856667	#3836 4	1	1	16	2	0	18	4704	323	37	-1	 5	1	1	16	2	1	18	4704	185	37	91.437729	Kurumi 5	1	1	16	2	2	213	4704	128	37	95.883308	Saiki 3	1	1	17	0	0	15	4775	467	154	-1	 4	1	1	17	1	0	17	4775	465	28	-1	 5	1	1	17	1	1	17	4776	61	27	96.745544	The 5	1	1	17	1	2	93	4776	177	27	95.943901	Disastrous 5	1	1	17	1	3	285	4775	60	28	96.501282	Life 5	1	1	17	1	4	360	4775	33	28	96.883064	of 5	1	1	17	1	5	408	4776	74	27	95.965317	Sa... 4	1	1	17	2	0	15	4884	267	45	-1	 5	1	1	17	2	1	15	4884	145	45	96.390900	Yayoi 5	1	1	17	2	2	171	4884	111	37	95.843979	Kise 3	1	1	18	0	0	18	4953	277	31	-1	 4	1	1	18	1	0	18	4953	277	31	-1	 5	1	1	18	1	1	18	4956	129	27	89.969604	Precure 5	1	1	18	1	2	162	4964	6	4	13.395706	- 5	1	1	18	1	3	182	4953	113	31	96.615219	#3848 3	1	1	19	0	0	18	5064	461	397	-1	 4	1	1	19	1	0	18	5064	300	37	-1	 5	1	1	19	1	1	18	5067	121	34	90.414055	Follo 5	1	1	19	1	2	149	5064	169	37	90.414055	Tunito 4	1	1	19	2	0	18	5133	334	30	-1	 5	1	1	19	2	1	18	5135	186	28	91.794006	Gachiakuta 5	1	1	19	2	2	219	5144	6	4	90.021080	- 5	1	1	19	2	3	239	5133	113	30	96.905212	#3852 4	1	1	19	3	0	18	5244	461	45	-1	 5	1	1	19	3	1	18	5244	187	37	92.305466	Minato 5	1	1	19	3	2	218	5244	261	45	88.798294	Hinageshi 4	1	1	19	4	0	18	5313	409	30	-1	 5	1	1	19	4	1	18	5316	72	27	95.935051	Ride 5	1	1	19	4	2	105	5316	70	27	96.221718	Your 5	1	1	19	4	3	192	5316	87	27	91.268318	Wave 5	1	1	19	4	4	294	5325	6	3	91.226524	- 5	1	1	19	4	5	313	5313	114	30	96.838623	#3856 4	1	1	19	5	0	18	5424	279	37	-1	 5	1	1	19	5	1	18	5427	130	34	89.043144	Rena 5	1	1	19	5	2	161	5424	136	37	91.787437	Kariu 3	1	1	20	0	0	18	5493	262	30	-1	 4	1	1	20	1	0	18	5493	262	30	-1	 5	1	1	20	1	1	18	5496	114	27	81.794731	ReLIFE 5	1	1	20	1	2	147	5504	6	4	91.141594	- 5	1	1	20	1	3	168	5493	112	30	72.688339	#38680 | 04:05 |
| Papika | FLIP FLAPPERS - #3831 | 04:05 |
| Galko | Please tell me! Galko-cha... | 04:06 |
| Kamaiii | Spirited Away - #3873 | 04:06 |
| Kufa Vampir | ASSASSINS PRIDE - #3861 | 04:06 |
| Ning Wen | The Founder of Diabolism... | 04:06 |
| Nobunaga Haza... | Hunter x Hunter * #3865 | 04:06 |
| Shiraishi | Tanaka-kun is Always List... | 04:06 |
| Yeon-U Cha | Second Life Ranker - #38... | 04:06 |
| Jack Hammer | BAK! - #3874 | 04:06 |
| Linca | Atelier Escha & Logy —Alc... | 04:06 |
| Menchi | Hunter x Hunter - #3866 | 04:06 |
| Qing Mu | Heaven Official's Blessing... | 04:06 |
| Rindou Haitani | Tokyo Revengers - #3870 | 04:06 |
| Tiona Hiryute | Is It Wrong to Try to Pick Up | 04:06 |
| Zero | Drag-On Dragoon: Utahi... | 04:06 |
| Echo | PandoraHearts - #3875 | 04:06 |
| Kanon Nakagawa | The World God Only Knows ° ; | 04:06 |
| Marion Quin | Atelier Escha & Logy ~Alc... | 04:06 |
| Nanami Yasuri | Katanagatari - #3867 | 04:06 |
| Shuntarou Chis... | Alice in Borderland - #3863 | 04:06 |
| Yeo-Un Cheon | Nano Machine - #3871 | 04:06 |
| Yoshiko Hanabatal | AHO-GIRL « #3879 | 04:06 |
| Adenela | Cautious Hero: The Hero ... | 04:06 |
| Kagetane Hiruko | Black Bullet - #3876 | 04:06 |
| Nicol Ascart | My Next Life as a Villaine... | 04:06 |
| Raiha Vesugi | The Quintessential Quint... | 04:06 |
| Rena Kariu | ReLIFE - #3860 | 04:06 |
| Shun | Saint Seiya: Knights of th... | 04:06 |
| Junta Shiraishi | Kubo Won't Let Me Be Invisib | 04:07 |
| Kazari Viharu | A Certain Magical Index - ... | 04:07 |
| Rai Mamezuku | JoJo's Bizarre Adventure ... | 04:07 |
| Taiju Shiba | Tokyo Revengers * #3889 | 04:07 |
| Akito Shmonome | COLORFUL STAGE! The ... | 04:07 |
| Arnheid | Vinland Saga - #3916 | 04:07 |
| Atena Saotome | Mother of the Goddess’ D... | 04:07 |
| Komaru Naegi | Danganronpa: The Anima... | 04:07 |
| Toshiya Misumi | The World Is Mine - #3898 | 04:07 |
| Botan Kamiina | Botan Kamiina Fully Bloss... | 04:07 |
| Cellmia Texas | Arknights: PRELUDE TO DAV | 04:07 |
| Kenichi Shiraha... | Kenichi: The Mightiest Dis... | 04:07 |
| Kurenai Yuuhi | Naruto - #3907 | 04:07 |
| Kurokami no Oto... | The Tatami Galaxy - #3887 | 04:07 |
| Zakuro Takashi... | Tsui no Sora ‘ #3899 | 04:07 |
| Douki-chan | GANBARE DOUKICHAN - ... | 04:07 |
| Iska | Our Last Crusade or the ... | 04:07 |
| Kaname Tousen | Bleach - #3896 | 04:07 |
| Tonari | To Your Eternity - #3912 | 04:07 |
| Amelia Rozequarts | My Status as an Assassin Ob | 04:08 |
| Harunobu Mada... | Genshiken - #3929 | 04:08 |
| Kotarou Azumi | Tsukigakirei - #3933 | 04:08 |
| Kouyou Akizuki | BLEND-S - #3925 | 04:08 |
| Martin Reest | Monster - #3921 | 04:08 |
| Shizuka Doumeki | xxxHOLiC - #3913 | 04:08 |
| Takumi Nishijou | ChaoS:HEAd « #3969 | 04:08 |
| Yuu Takasaki | Love Live! School Idol Pro... | 04:08 |
| Jonson | Dorohedoro - #3922 | 04:08 |
| Kei Muroda | Welcome Back, Alice - #3... | 04:08 |
| Koyomi Mizuhara | Azumanga Daioh - #3906 | 04:08 |
| Lily Amane | The Foolish Angel Dances... | 04:08 |
| Seiya | Saint Seiya: Knights of th... | 04:08 |
| Sougo Osaka | IDOLISHT - #3926 | 04:08 |
| Hua Fu | Cooking with Valkyries - #... | 04:08 |
| Kenkaya | Akudama Drive - #3935 | 04:08 |
| Meroune Lorelei | Monster Musume: Everyd... | 04:08 |
| Nero Vanetti | 91 Days - #3911 | 04:08 |
| Nurugai | Hell’s Paradise - #3915 | 04:08 |
| Ryouko Hakubi | Tenchi Muyo! Tenchi Univ... | 04:08 |
| W | Arknights: PRELUDE TO DAY | 04:08 |
| Bedivere | Fate/Zero - #39608 | 04:08 |
| Junpei lori | Persona 3 the Movie: #1 S... | 04:08 |
| Maru Mori | Blue Period - #3916 | 04:08 |
| Shaun | SHADOWS HOUSE - #3926 | 04:08 |
| Tabito Karasu | BLUE LOCK + #3936 | 04:08 |
| Tsumusgi Inuzuka | Sweetness & Lightning ° ... | 04:08 |
| Ginji | Kakuriyo -Bed & Breakfas... | 04:09 |
| Hiruzen Sarutobi | Naruto - #3953 | 04:09 |
| Moro no Kimi | Princess Mononoke * #3937 | 04:09 |
| Rose | Combatants Will Be Dispa... | 04:09 |
| Saaya Yamabuki | BanG Dream! - #3957 | 04:09 |
| Tsubomi Kido | Mekakucity Actors - #3941 | 04:09 |
| Yulia Niguredou | Mieruko-chan * #3949 | 04:09 |
| Chiaki Hoshino... | GAMERS! - #3934 | 04:09 |
| Ena Komiya | Just Because! - #3942 | 04:09 |
| Erin | Erin - #3938 | 04:09 |
| Juna Doma | How a Realist Hero Rebuil... | 04:09 |
| Lorraine Vivie | The Unwanted Undead A... | 04:09 |
| Rein Kashiwagi | Darwin's Game - #3958 | 04:09 |
| Satellizer el Bridget | Freezing - #3954 | 04:09 |
| Himagiku Katsura | Hayate the Combat Butler * 4 | 04:09 |
| Ouni | Children of the Whales ° ... | 04:09 |
| Rika Shiguma | Haganai - #3955 | 04:09 |
| Riku Nanase | IDOLISH7 « #3959 | 04:09 |
| Sakura | DON'T TOY WITH ME, MISS bh | 04:09 |
| Stanley Snyder | Dr. STONE - #3963 | 04:09 |
| Takeru Shirogane | Schwarzes Marken * #3939 | 04:09 |
| Bors | Akame ga Kill! - #3946 | 04:09 |
| Carlos Rivera | Megalobox * #3956 | 04:09 |
| Meidri | Interspecies Reviewers ° ... | 04:09 |
| Nuko | Girls' Last Tour - #3944 | 04:09 |
| Shiryu | Saint Seiya: Knights of th... | 04:09 |
| Constanze Amal... | Little Witch Academia - #... | 04:10 |
| Frankenstein | Fate/Zero - #3981 | 04:10 |
| Meleoron | Hunter x Hunter * #3977 | 04:10 |
| Uka Ishimori | Honey Lemon Soda - #39... | 04:10 |
| Walter C. Dornez | Hellsing - #3965 | 04:10 |
| Yoshiyuki Taira | BECK - #3973 | 04:10 |
| Belldandy | Oh! My Goddess - #3974 | 04:10 |
| Hana Shirosaki | WATATENI: an Angel Flew... | 04:10 |
| Masaru Aoki | Hajime no Ippo: The Fight... | 04:10 |
| Saki Hananoi | A Condition Called Love -... | 04:10 |
| Senjumaru Shutarc | Bleach - #3978 | 04:10 |
| Tonio Trussardi | JoJo's Bizarre Adventure ... | 04:10 |
| Aoba Wakura | Chained Soldier - #3983 | 04:10 |
| Arte | Arte - #3979 | 04:10 |
| Eboshi Gozen | Princess Mononoke * #3975 | 04:10 |
| Himiko | BTOOOM! - #3967 | 04:10 |
| ll-Hwan Seong | Solo Leveling - #3971 | 04:10 |
| Claudia Enfield | The Asterisk War - #3968 | 04:10 |
| Haruo Yaguchi | Hi Score Girl - #3986 | 04:10 |
| Kal'tsit | Arknights: PRELUDE TO ... | 04:10 |
| Makoto Konno | The Girl Who Leapt Throu... | 04:10 |
| Noa Himesaka | WATATENI: an Angel Flew... | 04:10 |
| UIti | ONE PIECE - #3984 | 04:10 |
| Izumi Sena | LOVE STAGE!! - #3989 | 04:11 |
| Kai Miura | Honey Lemon Soda - #48... | 04:11 |
| Ken Usato | The Wrong Way to Use H... | 04:11 |
| Kensuke Aida | Neon Genesis Evangelion - #4 | 04:11 |
| Momoko Koigak... | Ghost Stories - #4013 | 04:11 |
| Shen Xiang | Undead Unluck - #3993 | 04:11 |
| Aria Rosoent | The Villainess Turns the Hour | 04:11 |
| Fuuka Miyazawa | The aquatope on white sand | 04:11 |
| Mizuki Usami | This Art Club Has a Problem! | 04:11 |
| Mona Kawai | Medaka Kuroiwa is Imper... | 04:11 |
| Shouma Takaku... | Penguindrum - #3998 | 04:11 |
| Shuu Maiko | Nisekoi - #3990 | 04:11 |
| Haruka Kokonose | Mekakucity Actors - #3999 | 04:11 |
| Kyouko Kouda | March comes in like a lion... | 04:11 |
| Majima | Lycoris Recoil - #3995 | 04:11 |
| Morgana | PERSONAS the Animatio... | 04:11 |
| Ryou Yoake | ReLIFE - #4007 | 04:11 |
| Sense | Frieren: Beyond Journey’s... | 04:11 |
| Yuuri Amagake | Battle Game in 5 Seconds... | 04:11 |
| Falco | Cyberpunk: Edgerunners ~... | 04:11 |
| Keroli Crocell | Welcome to Demon Scho... | 04:11 |
| Konro Sagamiya | Fire Force - #4000 | 04:11 |
| Masa | The Way of the Househus... | 04:11 |
| Mimihime | Tengoku Daimakyo - #3996 | 04:11 |
| Yuuki Cross | Vampire Knight ‘ #4012 | 04:11 |
| Hime Onizuka | Gintama * #4029 | 04:12 |
| Kaori Houjou | / Got a Cheat Skill in Another | 04:12 |
| Lisa Minci | Genshin Impact - #4889 | 04:12 |
| Myung-Dae Kim | BJ Alex - #4021 | 04:12 |
| Ritsu Sakuma | Ensemble Stars! - #4017 | 04:12 |
| Sayla Mass | Mobile Suit Gundam - #4037 | 04:12 |
| Asagi Aiba | Strike the Blood - #4030 | 04:12 |
| Francis Fitzgerc... | Bungo Stray Dogs - #4018 | 04:12 |
| Kanon Hisui | Go! Go! Loser Ranger! - #... | 04:12 |
| Kite | Japan Sinks: 2020 - #4022 | 04:12 |
| Kyohei Kadota | Durarara!! - #4014 | 04:12 |
| Momonga | Chiikawa * #4026 | 04:12 |
| Sou Hiyori | Your Turn to Die: Majority... | 04:12 |
| Kabura Honda | Call of the Night - #4023 | 04:12 |
| Kadode Koyama | Dead Dead Demon's Dededex | 04:12 |
| Kagura | Azumanga Daioh - #4027 | 04:12 |
| Sonju | The Promised Neverland -... | 04:12 |
| Villetta Nu | Code Geass: Lelouch of the F | 04:12 |
| Ann Halford | Sugar Apple Fairy Tale ~ ... | 04:12 |
| Kenyu Yukimiya | BLUE LOCK - #4036 | 04:12 |
| Mashircao Ojiro | My Hero Academia * #4032 | 04:12 |
| Sayo Minakami | Gushing Over Magical Girl... | 04:12 |
| Tsubasa Oozora | Captain Tsubasa - #4028 | 04:12 |
| Arata Shindou | PSYCHO-PASS 3 - #4049 | 04:13 |
| Chiya Ujimatsu | is the Order a Rabbit? - #406 | 04:13 |
| Dietfried Bougaii... | Violet Evergarden ‘#4657 | 04:13 |
| Koguma | Super Cub - #4033 | 04:13 |
| Nice | To Be Hero X - #4053 | 04:13 |
| Sachi Komine | The Fruit of Grisaia ‘ #4041 | 04:13 |
| Sophie Twilight | Ms. vampire who lives in ... | 04:13 |
| Akane Hiyama | Love Tyrant - #4846 | 04:13 |
| Ha-Min Lee | Seasons of Blossom - #4... | 04:13 |
| Maple | Nekopara - #4058 | 04:13 |
| Saya Sasamiya | The Asterisk War - #4042 | 04:13 |
| Shaka | Saint Seiya: Knights of th... | 04:13 |
| Yami Bakura | Yu-Gi-Oh! - #4054 | 04:13 |
| Ch'en | Arknights: PRELUDE TO DAV | 04:13 |
| Don | The Promised Neverland -... | 04:13 |
| Godot | Ace Attorney ~ #4039 | 04:13 |
| Kaito Momota | New Danganronpa V3: Mi... | 04:13 |
| Milo Nekoyanagi | Sabikui Bisco - #4051 | 04:13 |
| Momotarou Mik... | Free! -lwatobi Swim Club... | 04:13 |
| Ritsuka Fujimaru | Fate/Grand Order Absolu... | 04:13 |
| Saigiku Jouno | Bungo Stray Dogs ‘ #4035 | 04:13 |
| Carue | ONE PIECE - #4040 | 04:13 |
| Leopold Vermiilii... | Black Clover - #4048 | 04:13 |
| Licht Todoroki | SERVAMP - #4044 | 04:13 |
| Mai OQuzuka | There's No Freaking Way ... | 04:13 |
| Tino Shade | Let This Grieving Soul Re... | 04:13 |
| Toya Aoyagi | COLORFUL STAGE! The ... | 04:13 |
| Youichi Kuramoc... | Ace of the Diamond - #46... | 04:13 |
| Yuuto Kiba | High School DxD - #4064 | 04:13 |
| Akira Ferrari | Aria - #4061 | 04:14 |
| Chateau Dankw.... | Love of Kill - #4085 | 04:14 |
| Domon Kasshu | Mobile Suit Gundam - #4089 | 04:14 |
| Evangeline Athcu... | UG Holder! - #4069 | 04:14 |
| Princess | Princess Principal - #4081 | 04:14 |
| Shiori Goshiki | A Galaxy Next Door * #40... | 04:14 |
| Takezou Kurata | Kono Oto Tomare! « #4073 | 04:14 |
| Karim Flam | Fire Force - #4082 | 04:14 |
| Kazuomi Ooga | ReLIFE - #4066 | 04:14 |
| Kazuyoshi Usui | Gintama - #4670 | 04:14 |
| Rin Kokonoe | Kodomo no Jikan - #4078 | 04:14 |
| Twin Turbo | Umamusume: Pretty Derb... | 04:14 |
| Vicious | Cowboy Bebop - #4062 | 04:14 |
| Bazett Fraga MoRe | Fate/Zero - #4071 | 04:14 |
| Birdy Cephon Alt... | Birdy the Mighty - #4063 | 04:14 |
| Chane Laforet | Baccano! ‘ #4079 | 04:14 |
| Francois | Dr. STONE - #4883 | 04:14 |
| Rika Orimoto | JUJUTSU KAISEN - #4075 | 04:14 |
| Taki Shiina | BanG Dream! It's MyGOl!!... | 04:14 |
| Chris Yuu Takiga... | Ace of the Diamond - #46... | 04:14 |
| Jonathan Mar | Jormungand ‘ #4872 | 04:14 |
| Kotone Shiraka... | Overflow - #4084 | 04:14 |
| Oberon | Fate/Zero ‘ #4076 | 04:14 |
| Rindou Amamiya | God Eater - #4080 | 04:14 |
| Akira Shiroyanagi | Battle Game in 5 Seconds... | 04:15 |
| Axel Gilberto | LAZARUS - #4113 | 04:15 |
| Bomon Kasshu | Mobile Suit Gundam - #4089 | 04:15 |
| Elise De Clorance | Doctor Elise: The Royal Lady | 04:15 |
| Mariabelle | Welcome to Japan, Ms. EL... | 04:15 |
| Reanette Elfelt | The Ossan Newbie Adven... | 04:15 |
| Rebecca | ONE PIECE - #4105 | 04:15 |
| Adele Von Ascha... | Didn't / Say to Make My A... | 04:15 |
| Anastasia Zelen... | SSS-Class Revival Hunter... | 04:15 |
| Kaoruko Tenkawa | Gushing Over Magical Girl... | 04:15 |
| Knives Millions | Trigun - #4098 | 04:15 |
| Mari Yoshizaki | Inside Mari - #4690 | 04:15 |
| Puri-Puri Prisoner | One-Punch Man * #4106 | 04:15 |
| Ranze Kurona | BLUE LOCK - #4162 | 04:15 |
| Shinku | Rozen Maiden - #4114 | 04:15 |
| Belphegor | Obey Me! - #4095 | 04:15 |
| Cayna | In the Land of Leadale - #... | 04:15 |
| Kei Takishima | S.A: Special A - #4103 | 04:15 |
| Lily Aquaria | Black Clover ‘ #4091 | 04:15 |
| Nagisa Misumi | Precure ‘#4115 | 04:15 |
| Nora | Noragami - #4107 | 04:15 |
| Rikuo Nura | Nura: Rise of the Yokai Cl... | 04:15 |
| Taki Shiina | BanG Dream! It's MyGOIIl... | 04:15 |
| Chris Yuu Takigc... | Ace of the Diamond - #46... | 04:15 |
| Hibiki | Bubble - #4096 | 04:15 |
| Kinemon | ONE PIECE - #4100 | 04:15 |
| Otoha Kurogane | Rock is a Lady’s Modesty ... | 04:15 |
| Ren Tao | SHAMAN KING - #48688 | 04:15 |
| William Maryblo... | The Faraway Paladin - #4... | 04:15 |
| Yashiro | Twittering Birds Never FI... | 04:15 |
| Chiaki Mamiya | The Girl Who Leapt Throu... | 04:16 |
| Hisako Arato | Food Wars! ‘#4129 | 04:16 |
| Mahiru Inami | Wagnaria!! - #4117 | 04:16 |
| Miki Kuroda | Devilman Crybaby - #4133 | 04:16 |
| Yumina Urnea Belf« | In Another World With My Sm | 04:16 |
| Amir Halgal | A Bride's Story - #4134 | 04:16 |
| Kai Ichinose | Forest of Piano - #4126 | 04:16 |
| Ran Haitani | Tokyo Revengers - #4122 | 04:16 |
| Shmku | Rozen Maiden * #4114 | 04:16 |
| Si-Eun Yeon | Weak Hero - #4142 | 04:16 |
| Tadakuni | Daily Lives of High Schoo... | 04:16 |
| Tadano | Aggretsuko - #4130 | 04:16 |
| Gojira | Godzilla Singular Point - #41 | 04:16 |
| Haato Akai | Holo no Graffiti - #4131 | 04:16 |
| Matsuri Mizusca... | Citrus - #4119 | 04:16 |
| Shou Suzuki | Mob Psycho 100 - #4139 | 04:16 |
| Yamato Ishida | Digimon: Digital Monsters... | 04:16 |
| Yumemi Hoshino | Planetarian - #4127 | 04:16 |
| Chouji Akimichi | Naruto * #4124 | 04:16 |
| Dokuga | Dorohedoro - #4136 | 04:16 |
| Guy Crimson | That Time ! Got Reincarn... | 04:16 |
| Hiluluk | ONE PIECE - #4116 | 04:16 |
| Meishou Dotou | Umamusume: Pretty Derb... | 04:16 |
| Shun Ibusaki | Food Wars! - #4128 | 04:16 |
| Aiki Hirose | Go For It, Nakamura-kunl... | 04:17 |
| Banri Shiunji | The Shiunji Family Children - ; | 04:17 |
| Emiru Ikuno | No Zo Ki A Na - #4137 | 04:17 |
| Shin | AMNESIA - #4149 | 04:17 |
| Thistle | Delicious in Dungeon - #4... | 04:17 |
| Yslat Han | Pick Me Up - #4157 | 04:17 |
| Liao Diao He | Kingdom - #4138 | 04:17 |
| Mu-Jin Park | The God of High School - ... | 04:17 |
| Ryou Mashiba | Hajime no Ippo: The Fight... | 04:17 |
| Sayaka Igarashi | Kakegurui - #4150 | 04:17 |
| Seiko Osabe | Blood on the Tracks « #4... | 04:17 |
| Shun Izuki | Kuroko's Basketball - #41... | 04:17 |
| Kanade Suzutsuhki | Mayo Chiki! - #4159 | 04:17 |
| Maou Tasogare | Sleepy Princess in the De... | 04:17 |
| Satono Diamond | Umamusume: Pretty Derb... | 04:17 |
| Tachikoma | Ghost in the Shell - #4147 | 04:17 |
| Teresa Wagner | Tada Never Falls In Love -... | 04:17 |
| Aria Holmes Kan... | Aria the Scarlet Ammo -... | 04:17 |
| Makoto Hanaoka | Senpai is an Otokonoko ° ... | 04:17 |
| Maria Campbell | My Next Life as a Villaine... | 04:17 |
| Steven A. Starph... | Blood Blockade Battlefro... | 04:17 |
| Villhaze | The Vexations of a Shut-l... | 04:17 |
| Fujiwara no Sai | Hikaru no Go - #4181 | 04:18 |
| Hikari Yagami | Digimon: Digital Monsters... | 04:18 |
| Makoto Kowata | Flying Witch - #4173 | 04:18 |
| Natsuhiko Hyuu... | Toilet-bound Hanako-kun... | 04:18 |
| Reona Kisaragi | Full Dive: This Ultimate N... | 04:18 |
| Reona Nyubara | BanG Dream! - #4161 | 04:18 |
| Shiroha Naruse | Summer Pockets - #4169 | 04:18 |
| Tooru Yukimura | Aoharu x Machinegun - #... | 04:18 |
| Benno | Ascendance of a Bookwor... | 04:18 |
| Hana | Tokyo Godfathers - #4170 | 04:18 |
| Kabane Shinden | Dead Mount Death Play ° ... | 04:18 |
| Miles Prower | Sonic X - #4196 | 04:18 |
| Neil Bowman | All Saints Street - #4178 | 04:18 |
| Sarasa Watanabe | Kageki Shojo!! - #4166 | 04:18 |
| Senor Pink | ONE PIECE - #4186 | 04:18 |
| Shenhua | Black Lagoon - #4182 | 04:18 |
| Binghe Luo | Scumbag System - #4187 | 04:18 |
| Jack the Ripper | Fate/Zero - #4183 | 04:18 |
| Jingo Raichi | BLUE LOCK - #4163 | 04:18 |
| Kohane Azusawa | COLORFUL STAGE! The ... | 04:18 |
| Luviagelita Edel... | Fate/Zero- #4191 | 04:18 |
| Nono | Gunbuster - #4171 | 04:18 |
| Seele Vollerei | Cooking with Valkyries - #... | 04:18 |
| Shizusumi Yagi | given * #4179 | 04:18 |
| Chastille Lillvqvi... | An Archdemon's Dilemma... | 04:18 |
| Hiyori Sarugaki | Bleach - #4196 | 04:18 |
| Juuzou Inui | No Guns Life - #4176 | 04:18 |
| Matsuri Natsuiro | Holo no Graffiti - #4180 | 04:18 |
| Mondo Oowada | Danganronpa: The Anima... | 04:18 |
| Mongfa Bai | LOVE FLOPS - #4188 | 04:18 |
| Pina Co Lada | Gate - #4172 | 04:18 |
| Akuma Shuudou... | Sleepy Princess in the De... | 04:19 |
| Eta | The Eminence in Shadow ... | 04:19 |
| Mia Tearmoon | Tearmoon Empire - #4205 | 04:19 |
| Mikako Kouda | Paradise Kiss ‘#4197 | 04:19 |
| Pan | Dragon Ball - #4213 | 04:19 |
| Tomomi Masaoka | PSYCHO-PASS * #4201 | 04:19 |
| Belno Light | Umamusume: Pretty Derb... | 04:19 |
| Eleonora Viltaria | Lord Marksman and Vana... | 04:19 |
| Nanako Kogure | Remake Our Life! - #4206 | 04:19 |
| Touji Suzuhara | Neon Genesis Evangelion - #4 | 04:19 |
| Ataru Moroboshi | Urusei Yatsura - #4199 | 04:19 |
| Edelgard | How NOT to Summon a D... | 04:19 |
| Gin | The Way of the Househus... | 04:19 |
| Kagura Souma | Fruits Basket - #4211 | 04:19 |
| Kit Church | Love Through A Prism - #... | 04:19 |
| Masami Kondou | After the Rain - #4203 | 04:19 |
| Admire Vega | Umamusume: Pretty Derb... | 04:19 |
| Daiki Mamura | Daytime Shooting Star - ... | 04:19 |
| Koku | B: The Beginning - #4204 | 04:19 |
| Mea Kurosaki | To Love Ru Darkness * #4... | 04:19 |
| Jean Havoc | Fullmetal Alchemist - #42... | 04:20 |
| Kai Yang | Martial Peak - #4225 | 04:20 |
| Kirishima Miyama | Yakuza Fiancé: Raise wa ... | 04:20 |
| Melida Angel | ASSASSINS PRIDE * #4221 | 04:20 |
| Nephren Rug Ins... | WorldEnd: What are you ... | 04:20 |
| Tsubasa Nanase | Classroom of the Elite - #423 | 04:20 |
| Uzu Sanageyama | Kill la Kill: #4217 | 04:20 |
| Aine Chidorigafuok | Hybrid x Heart Magias Acade | 04:20 |
| Gerald Stuart | My Next Life as a Villaine... | 04:20 |
| Hina | Plunderer * #4222 | 04:20 |
| Hiroto Ikuta | Hirayasumi - #4238 | 04:20 |
| Kagehisa Anotsu | Blade of the Immortal - #... | 04:20 |
| Kousetsu | Shinobi no Ittoki - #4226 | 04:20 |
| Raoh | Fist of the North Star - #... | 04:20 |
| Saki Yoshida | Metamorphosis * #4234 | 04:20 |
| Fitoria | The Rising of the Shield ... | 04:20 |
| Fran | Wandering Witch: The Journe | 04:20 |
| Hinagiku Kayou | Agents of the Four - #4227 | 04:20 |
| Kazuichi Arai | Kimi ni Todoke: From Me... | 04:20 |
| Neku Sakuraba | The World Ends with You ... | 04:20 |
| Onpu Segawa | Magical DoReMi - #4215 | 04:20 |
| Shiori Katase | My Tiny Senpai - #4235 | 04:20 |
| Ginga Hagane | Beyblade - #4248 | 04:20 |
| Jian Wang | Kingdom - #4232 | 04:20 |
| Mio | Date A Live * #4224 | 04:20 |
| Pippin | Berserk - #4228 | 04:20 |
| Sachi | One Room of Happiness -... | 04:20 |
| Tetta Kisaki | Tokyo Revengers - #4236 | 04:20 |
| Jouji Nezu | Prison School - #4265 | 04:21 |
| Liko | Pokémon Horizons: The S... | 04:21 |
| Makoto Kikuchi | The Idol Master - #4261 | 04:21 |
| Nanashi | Sword of the Stranger - #... | 04:21 |
| Nazuna Hiwatas... | BNA: #4245 | 04:21 |
| Yuuri Wakasa | SCHOOL-LIVE! «#4257 | 04:21 |
| iske van Omerta | How to Win My Husband ... | 04:21 |
| Ayumu Aikawa | Is this a Zombie? ‘ #4254 | 04:21 |
| Fujino Asagami | the Garden of sinners Chapte | 04:21 |
| Isami Aldini | Food Wars! - #4266 | 04:21 |
| Kimika Tachibana | where happiness lives * #... | 04:21 |
| Licht | Black Clover - #4258 | 04:21 |
| Red | Banished from the Hero’s... | 04:21 |
| Sitara | Jaadugar: A Witch in Mongoli | 04:21 |
| Grayfia Luoifuge | High School DxD - #4255 | 04:21 |
| Gris Rubion | Gachiakuta ‘#4271 | 04:21 |
| Hibari Oozora | Stop!! Hibari-kun! - #4263 | 04:21 |
| Lilisa Suzunomiya | Rock is a Lady’s Modesty ... | 04:21 |
| Shin Karino | Kotaro Lives Alone - #4247 | 04:21 |
| Tsuyoshi Mukou... | Campfire Cooking in Ano... | 04:21 |
| Yui | Hell’s Paradise - #4259 | 04:21 |
| Hiro Souma | Fruits Basket - #4252 | 04:21 |
| Leo Demonheart | I'm Quitting Heroing - #4... | 04:21 |
| Lisara Restall | So, / Can't Play H! - #4264 | 04:21 |
| Seiha Shiunji | The Shiunji Family Childr... | 04:21 |
| Takuma Ino | JUJUTSU KAISEN - #4266 | 04:21 |
| Tsubaki Sawabe | Your lie in April - #4256 | 04:21 |
| Akira Kagiura | Sasaki and Miyano * #4281 | 04:22 |
| Rimi Ushigome | BanG Dream! « #4285 | 04:22 |
| Rin Nohara | Naruto - #4273 | 04:22 |
| Yachiyo Nanami | Puella Magi Madoka Magica - | 04:22 |
| Aquarius | Fairy Tail - #4274 | 04:22 |
| Latifa | Seirei Gensouki: Spirit Ch... | 04:22 |
| Samurai Sword | Chainsaw Man - #4278 | 04:22 |
| Sorahiko Torino | My Hero Academia * #4286 | 04:22 |
| Wirbel | Frieren: Beyond Journey’s... | 04:22 |
| Do-Hwa Baek | Operation: True Love - #4... | 04:22 |
| Eiji Kitahama | Pseudo Harem * #4287 | 04:22 |
| Ju-Min Han | Invitation of the Mystic M... | 04:22 |
| Krebskulm | How NOT to Summon a D... | 04:22 |
| Shou Hazama | Akumetsu - #4283 | 04:22 |
| Aisha Udgard | How a Realist Hero Rebuil... | 04:22 |
| Custas | Witch Hat Atelier - #4292 | 04:22 |
| Ikki Niko | BLUE LOCK - #4286 | 04:22 |
| Lead Shax | Welcome to Demon Scho... | 04:22 |
| Barnaby Brooks Jr. | Tiger & Bunny - #4297 | 04:23 |
| Hae-Jun Go | Jibi Eopseo - #4313 | 04:23 |
| Jack Atlas | Yu-Gi-Oh! - #4317 | 04:23 |
| Kaito | AJIN: Demi-Human - #4301 | 04:23 |
| Koharu Hondou... | ID: INVADED - #4305 | 04:23 |
| Ryouta Sakamo... | BTOOOM! - #4309 | 04:23 |
| Siluca Meletes | Record of Grancrest War ... | 04:23 |
| Tamotsu Fukuda | ID: INVADED - #4289 | 04:23 |
| Xiaolan | The Apothecary Diaries - ... | 04:23 |
| Anonymous | Our Dreams at Dusk: Shi... | 04:23 |
| Chiri Kitsu | Sayonara, Zetsubou-Sensei ‘ | 04:23 |
| Kazuya Hiramaru | Bakuman. * #4318 | 04:23 |
| Keith Claes | My Next Life as a Villaine... | 04:23 |
| Mary Kozakura | Mekakucity Actors ‘ #4298 | 04:23 |
| Nagisa Akutsu | Aoashi ‘#4306 | 04:23 |
| Sett | Nina the Starry Bride - #... | 04:23 |
| Shinji Tokita | Grand Blue Dreaming - #... | 04:23 |
| Ben Beckman | ONE PIECE - #4315 | 04:23 |
| Bihyeong | Omniscient Reader - #4307 | 04:23 |
| Chiyoko Momoshir | ACT-AGE - #4323 | 04:23 |
| Du-Na Lee | The Girl Downstairs - #42... | 04:23 |
| Ranko Kanzaki | The Idol Master - #4299 | 04:23 |
| Shichirou Balam | Welcome to Demon Scho... | 04:23 |
| Yuu Mizuno | SANRIO BOYS : #4363 | 04:23 |
| Bright Noa | Mobile Suit Gundam - #4296 | 04:23 |
| Minerva | Re:ZERO -Starting Life in... | 04:23 |
| Misaki Tobisawa | AOKANA: Four Rhythm A... | 04:23 |
| Miu Shinoda | NANA - #4316 | 04:23 |
| Shao May | Fullmetal Alchemist - #43... | 04:23 |
| lroha Kohinata | My Friend's Little Sister ... | 04:23 |
| Cthuko | Nyaruko: Crawling with Love! | 04:24 |
| Henry Ales Lazio | The Remarried Empress -... | 04:24 |
| Rika Honjou | High-Rise Invasion - #4345 | 04:24 |
| Susamaru | Demon Slayer: Kimetsu n... | 04:24 |
| Tatsuya Uesugi | Touch * #4329 | 04:24 |
| Yuusei Shirosaki | My New Boss is Goofy - #... | 04:24 |
| Erica Blandelli | Campione! - #4342 | 04:24 |
| Ivy | The Weakest Tamer Bega... | 04:24 |
| Maria Takayama | Haganai - #4330 | 04:24 |
| North 2-gou | PLUTO + #4334 | 04:24 |
| Togo Shiba | Kagurabachi - #4326 | 04:24 |
| Bardroy | Black Butler - #4339 | 04:24 |
| Basil | OMORI - #4327 | 04:24 |
| Haruka Kotoura | The Troubled Life of Miss... | 04:24 |
| Hitoshiki Zerozaki | Kubikiri Cycle: The Blue S... | 04:24 |
| Rutile | Land of the Lustrous - #4... | 04:24 |
| Stunk | Interspecies Reviewers ° ... | 04:24 |
| Akihiko Nirei | WIND BREAKER - #4324 | 04:24 |
| Hermit Mio | EDENS ZERO - #4336 | 04:24 |
| Knov | Hunter x Hunter - #4344 | 04:24 |
| Lawless | SERVAMP - #4320 | 04:24 |
| Yayoi Kusakabe | High-Rise Invasion - #4348 | 04:24 |
| Aisha Belka | is It Wrong to Try to Pick Up: | 04:25 |
| Akira Takizawa | Eden of the East - #4365 | 04:25 |
| Raelza | Handyman Saitou in Anot... | 04:25 |
| Takane Shijou | The Idol Master - #4357 | 04:25 |
| Yumeko Shikiya | Makeine: Too Many Losin... | 04:25 |
| Jiren | Dragon Ball - #4370 | 04:25 |
| Mayumi Doujima | Pretty Boy Detective Club - # | 04:25 |
| Norn Clatalissa ... | Redo of Healer - #4346 | 04:25 |
| Plue | Fairy Tail - #4354 | 04:25 |
| Ruri Miyamoto | Nisekoi - #4366 | 04:25 |
| Si-Yun Baek | Dreaming Freedom - #4350 | 04:25 |
| Yayoi Kunizuka | PSYCHO-PASS - #4358 | 04:25 |
| Amelia Park Lee | / Love Amy * #4351 | 04:25 |
| Gakushuu Asano | Assassination Classroom ... | 04:25 |
| Hifumi Izanami | HYPNOSISMIC -Division ... | 04:25 |
| Kagura Mikazuchi | Fairy Tail #4367 | 04:25 |
| Lambo | REBORN! - #4363 | 04:25 |
| Sadayo Kawaka... | PERSONAS the Animatio... | 04:25 |
| lori Minase | The Idol Master - #4355 | 04:25 |
| Aya Rindou | Undead Murder Farce - #... | 04:25 |
| Honoka Yukishiro | Precure - #4364 | 04:25 |
| Joker | Black Butler - #4356 | 04:25 |
| Katyusha | Girls und Panzer - #4368 | 04:25 |
| Lufas Maphacahli | A Wild Last Boss Appear... | 04:25 |
| Ryuunosuke Mo... | Love Me for Who / Am: #... | 04:25 |
| Asura | Soul Eater - #4377 | 04:26 |
| Itto Ogami | Lone Wolf and Cub : #4389 | 04:26 |
| Malleus Draconia | Disney Twisted-Wonderla... | 04:26 |
| Otabek Altin | Yurill! on ICE - #4369 | 04:26 |
| Othinus | A Certain Magical Index - ... | 04:26 |
| Poseidon | Record of Ragnarok - #4397 | 04:26 |
| Rena Natsukawa | Hokkaido Gals Are Super ... | 04:26 |
| Honey Kisaragi | Re: Cutie Honey - #4386 | 04:26 |
| Klaus Lunettes | Black Clover - #4394 | 04:26 |
| Marulk | Made in Abyss - #4382 | 04:26 |
| Mumei Nanashi | Holo no Graffiti - #4374 | 04:26 |
| Nyamu Yuutenji | BanG Dream! It's MyGOI!II!! + 7 | 04:26 |
| Ponzu | Hunter x Hunter - #4398 | 04:26 |
| Touji Souya | March comes in like a lion... | 04:26 |
| Macht | Frieren: Beyond Journey’s... | 04:26 |
| Maria Mizuse | Tomodachi Game - #4395 | 04:26 |
| Meow | Space Dandy « #4391 | 04:26 |
| Miu Matsuoka | Strawberry Marshmallow - #4 | 04:26 |
| Reika Shimohira | Gantz ‘ #4387 | 04:26 |
| Tatenashi Sarashil | Infinite Stratos - #4379 | 04:26 |
| White | Tower of God - #4383 | 04:26 |
| Ai Magase | BABYLON - #4384 | 04:26 |
| Elizabeth | Persona 3 the Movie: #1 S... | 04:26 |
| Ema Yasuhara | SHIROBAKO - #4392 | 04:26 |
| Lufas Maphaahli | A Wild Last Boss Appear... | 04:26 |
| Suiseiseki | Rozen Maiden - #4406 | 04:26 |
| Togusa | Ghost in the Shell - #4376 | 04:26 |
| Asahi Shiina | Free! -Dive to the Future... | 04:27 |
| Byakuya Mimori | The Magical Girl and the ... | 04:27 |
| Kevin Goodman | Billy Bat - #4413 | 04:27 |
| Koito Minase | Myriad Colors Phantom ... | 04:27 |
| Kong | Genshin - #4409 | 04:27 |
| Kuon Shinzaki | High-Rise Invasion - #4417 | 04:27 |
| Natsume Hyuuga | Gakuen Alice - #4401 | 04:27 |
| Keichiro Tsumugi | The Fragrant Flower Bloo... | 04:27 |
| Leonardo da Vinci | Fate/Grand Order Absolu... | 04:27 |
| Misaki Okusawa | BanG Dream! - #4406 | 04:27 |
| Nyamu Yuutenji | BanG Dream! It's MyGOI!!!! - 4 | 04:27 |
| Ritsu Kasanoda | Ouran High School Host ... | 04:27 |
| Tsuyuno Yatsu... | MAGICAL GIRL SITE: #4... | 04:27 |
| Manabu Horikita | Classroom of the Elite - #... | 04:27 |
| Mitsuhide Rouen | Snow White with the Red ... | 04:27 |
| Popp | Dragon Quest: The Adven... | 04:27 |
| ichirouta Kazem... | Inazuma Eleven - #4423 | 04:27 |
| Daikoku | Noragami * #4404 | 04:27 |
| Ga-Eul | Lookism - #4408 | 04:27 |
| Osamu Mikumo | World Trigger - #4412 | 04:27 |
| Rody Soul | My Hero Academia ‘ #4426 | 04:27 |
| Sakura Kagamih... | Laid-Back Camp - #4416 | 04:27 |
| Yui Tamura | YarichinyzBitch-bu - #4396 | 04:27 |
| Ayato Amasgiri | The Asterisk War * #4445 | 04:28 |
| Dabao Ji | Scissor Seven * #4429 | 04:28 |
| Freyja Wion | Macross Frontier * #4425 | 04:28 |
| Kento Hinode | A Whisker Away - #4437 | 04:28 |
| Loki | ONE PIECE +: #4433 | 04:28 |
| Quiche | Tokyo Mew Mew - #4441 | 04:28 |
| Haruitsuki Abeno | The Morose Mononokean ... | 04:28 |
| Helck | Helck - #4426 | 04:28 |
| Isaburo Sasaki | Gintama - #4442 | 04:28 |
| Ito Manabu | Homunculus * #4422 | 04:28 |
| Makie Otono-Ta... | Blade of the Immortal * #... | 04:28 |
| Yuuta Asuka | Stars Align - #4430 | 04:28 |
| Zenon Zogratis | Black Clover - #4438 | 04:28 |
| GUMI | Hatsune Miku: Unofficial ... | 04:28 |
| Hatoko Kushika... | When Supernatural Battle... | 04:28 |
| Iichirouta Kazem... | Inazuma Eleven - #4423 | 04:28 |
| Kengo Haryuu | Blue Box «#4439 | 04:28 |
| Shimada Death | Dorohedoro * #4431 | 04:28 |
| Shirayuki Himeji | Liar, Liar - #4419 | 04:28 |
| Tatsuya Fukuda | Aoashi - #4427 | 04:28 |
| Triela | Gunslinger Girl - #4451 | 04:28 |
| Wangnan Ja | Tower of God - #4447 | 04:28 |
| Bruno Bangnyfe | BURN THE WITCH - #4432 | 04:28 |
| Gentarou Yumeno | HYPNOSISMIC -Division ... | 04:28 |
| Kojou Akatsuki | Strike the Blood - #4424 | 04:28 |
| Tuka Luna Marc... | Gate - #4444 | 04:28 |
| Zakuro Fujiwara | Tokyo Mew Mew * #4446 | 04:28 |
| lroha Tamaki | Puella Magi Madoka Magi... | 04:28 |
| Agni | Black Butler - #4461 | 04:29 |
| Ayato Amagiri | The Asterisk War * #4445 | 04:29 |
| Norra von Nirnb... | A Stepmother’s Marchen ... | 04:29 |
| Saki Aoi | Senpai is an Otokonoko - ... | 04:29 |
| Wolfgang Mitter... | Legend of the Galactic H... | 04:29 |
| Yoshikage Kira | JoJo's Bizarre Adventure ... | 04:29 |
| Agito Wanijima | Air Gear - #4458 | 04:29 |
| Aishia | Seirei Gensouki: Spirit Ch... | 04:29 |
| Akihisa Yoshii | Baka and Test - Summon ... | 04:29 |
| Chun-U Han | THE BREAKER - #44760 | 04:29 |
| Kaoru Nishimi | Kids on the Slope - #4466 | 04:29 |
| Leuvis | The Promised Neverland -... | 04:29 |
| Tsubomi Hanas... | Precure - #4462 | 04:29 |
| Amira | Rage of Bahamut: Genesi... | 04:29 |
| Beelzebub | As Miss Beelzebub Likes i... | 04:29 |
| Bridget | Guilty Gear Xtra - #4463 | 04:29 |
| Briefers Rock | Panty & Stocking with Ga... | 04:29 |
| Jougorou Kobato | SHOSHIMIN: How to Beco... | 04:29 |
| Aoba Tsukishima | Cross Game * #44660 | 04:29 |
| Hajime Machida | Machida-kun no Sekai - #... | 04:29 |
| Heine Wittgenst... | The Royal Tutor - #4456 | 04:29 |
| Kaburagi | DECA-DENCE - #4468 | 04:29 |
| Momoyo Kawak... | Majikoi: Oh! Samurai Girls... | 04:29 |
| Riku | Kingdom Hearts - #4452 | 04:29 |
| Yun lijima | NEW GAME! - #4472 | 04:29 |
| Aria Pokoteng | Aria: #4493 | 04:30 |
| Beelzebub | Record of Ragnarok - #4... | 04:30 |
| Kyara | Usogui - #4485 | 04:30 |
| Pawoo Nekoyan... | Sabikui Bisco - #4489 | 04:30 |
| Phichit Chulanont | Yurill! on ICE - #4481 | 04:30 |
| Taiga Fujimura | Fate/Zero - #4469 | 04:30 |
| Tamaki Yotsuba | IDOLISH7 « #4473 | 04:30 |
| Ichi | Ichi the Witch - #4498 | 04:30 |
| Lola Metrose | The Hidden Dungeon Onl... | 04:30 |
| Takashi Mitsuha... | Kyou kara Ore wa!! - #4494 | 04:30 |
| Tomosane Yuuki | where happiness lives * #... | 04:30 |
| Zorome | DARLING in the FRANXX - #4 | 04:30 |
| lori Izumi | IDOLISH7 - #4498 | 04:30 |
| Albis | That Time / Got Reincarn... | 04:30 |
| Koenma | Yu Yu Hakusho - #4479 | 04:30 |
| Lacie Baskerville | PandoraHearts - #4495 | 04:30 |
| Ryuujirou Kotob... | Grand Blue Dreaming - #... | 04:30 |
| Subaru Sumeragi | Tsubasa RESERVoir CHR... | 04:30 |
| Treyni | That Time / Got Reincarn... | 04:30 |
| Yukito Orikasa | IDOLISH7 « #4483 | 04:30 |
| Flatorte | I've Been Killing Slimes fo... | 04:30 |
| Hanazono | Spy Classroom - #4488 | 04:30 |
| Mei Karuma | Ace Attorney - #4480 | 04:30 |
| Ninja Ninja | Afro Samurai - #4492 | 04:30 |
| Seijuurou Mikos... | Free! -lwatobi Swim Club... | 04:30 |
| Vanica Zogratis | Black Clover - #4484 | 04:30 |
| Ebisu | Noragami - #4513 | 04:31 |
| Jack the Ripper | Black Clover - #4497 | 04:31 |
| Keith Shadis | Attack on Titan - #45609 | 04:31 |
| Kuroka | High School DxD - #4505 | 04:31 |
| Machikanetann... | Umamusume: Pretty Derb... | 04:31 |
| Sakazuki | ONE PIECE : #4561 | 04:31 |
| Takashi Hayashi... | March comes in like a lion... | 04:31 |
| Yuuko Yoshikawa | Sound! Euphonium * #4525 | 04:31 |
| Chioe Aubert | That Time / Got Reincarn... | 04:31 |
| Inshun Hozoin | Vagabond - #4526 | 04:31 |
| Kinta Sakata | DAN DA DAN - #4514 | 04:31 |
| Kusuke Saiki | The Disastrous Life of Sa... | 04:31 |
| Palm Siberia | Hunter x Hunter - #4502 | 04:31 |
| Remlin Tissark | Gachiakuta - #4510 | 04:31 |
| lori lzumi | IDOLISH7 - #4498 | 04:31 |
| Akihiko Kayaba | Sword Art Online - #4507 | 04:31 |
| Killer | ONE PIECE - #4519 | 04:31 |
| Lancelot | Fate/Zero- #4515 | 04:31 |
| Makoto Katai | Komi Can’t Communicate ... | 04:31 |
| Mei Terumi | Naruto - #4527 | 04:31 |
| Mewtwo | Pokémon - #4523 | 04:31 |
| Suzie Q | JoJo's Bizarre Adventure ... | 04:31 |
| Hiroto Maehara | Assassination Classroom ... | 04:31 |
| Kurogiri | My Hero Academia ‘ #4504 | 04:31 |
| Nodoka Manabe | K-ON! - #4524 | 04:31 |
| Semyon Brezhnev | Durarara!! ‘#4526 | 04:31 |
| Shouta Magats... | Miss Kobayashi's Dragon ... | 04:31 |
| Takeshi Aiza | Your lie in April - #4512 | 04:31 |
| Yamuraiha | Magi: The Labyrinth of M... | 04:31 |
| Aura | Frieren: Beyond Journey’s... | 04:32 |
| Lawine | Frieren: Beyond Journey’s... | 04:32 |
| Makoto Takiya | Miss Kobayashi's Dragon ... | 04:32 |
| Yukime | The Eminence in Shadow - #4 | 04:32 |
| Adam Smasher | Cyberpunk: Edgerunners -... | 04:32 |
| Ayame Moriya | Blue Box - #4546 | 04:32 |
| Bellemere | ONE PIECE - #4522 | 04:32 |
| Benny | Black Lagoon - #4542 | 04:32 |
| Inko-chan | Toradora! - #4534 | 04:32 |
| Meili Portroute | Re:ZERO -Starting Life in... | 04:32 |
| Shion Karanomori | PSYCHO-PASS - #4538 | 04:32 |
| Dear Santa | Gachiakuta - #4551 | 04:32 |
| Hiyoko Saionji | Danganronpa: The Anima... | 04:32 |
| Ji-Hye Lee | Omniscient Reader - #4539 | 04:32 |
| Kizuna Kazayama | The Rising of the Shield ... | 04:32 |
| Tetsutetsu Tets... | My Hero Academia - #4535 | 04:32 |
| Baiken Shishido | Vagabond - #4532 | 04:32 |
| Giselle Gewelle | Bleach - #4536 | 04:32 |
| Nanika | Hunter x Hunter - #45460 | 04:32 |
| Rolo Lamperouge | Code Geass: Lelouch of the F | 04:32 |
| Ango Sakaguchi | Bungo Stray Dogs - #4545 | 04:33 |
| Fujin Yuigahama | My Teen Romantic Comedy S | 04:33 |
| Heracles | Fate/Zero - #4565 | 04:33 |
| Kikurage | Dorohedoro * #4561 | 04:33 |
| Kouji Kouda | My Hero Academia - #4553 | 04:33 |
| Luoulia Mariborouc | Violet Evergarden ‘#4557 | 04:33 |
| Michiko Tendou | Chainsaw Man - #4549 | 04:33 |
| Mister Satan | Dragon Ball - #4577 | 04:33 |
| Leon Stephanotis | Violet Evergarden - #4570 | 04:33 |
| Mitsuba Sanguu | Seraph of the End: Vampi... | 04:33 |
| Noritoshi Kamo | JUJUTSU KAISEN « #4558 | 04:33 |
| Renner Theiere C... | Overlord - #4566 | 04:33 |
| Tama | ONE PIECE - #4554 | 04:33 |
| Tserriednich Hui ... | Hunter x Hunter - #4574 | 04:33 |
| Gamabunta | Naruto - #4555 | 04:33 |
| Kakuzu | Naruto - #4559 | 04:33 |
| Kojirou Sasaki | Fate/Zero - #4563 | 04:33 |
| Kouyou Ozaki | Bungo Stray Dogs * #4575 | 04:33 |
| Linia Dedoldia | Mushoku Tensei: Jobless Reir | 04:33 |
| Milly Ashford | Code Geass: Lelouch of the F | 04:33 |
| Yumichika Ayas... | Bleach - #4547 | 04:33 |
| Gin | Detective Conan - #4564 | 04:33 |
| Hazuki Katou | Sound! Euphonium - #4556 | 04:33 |
| Ichiyou Higuchi | Bungo Stray Dogs - #4568 | 04:33 |
| Junko Saotome | NANA - #4548 | 04:33 |
| Kankuro | Naruto - #4568 | 04:33 |
| Leeron Littner | Gurren Lagann * #4576 | 04:33 |
| Penny Chinkosu | DAN DA DAN - #4572 | 04:33 |
| Abiko Samejima | OSHI NO KO - #4589 | 04:34 |
| Gil-Young Lee | Omniscient Reader - #4581 | 04:34 |
| Melascula | The Seven Deadly Sins ° ... | 04:34 |
| Rishia Ivyred | The Rising of the Shield ... | 04:34 |
| Shen Long | Dragon Ball - #4573 | 04:34 |
| Zamasu | Dragon Ball - #4585 | 04:34 |
| Chiammy Zell | No Game, No Life ‘ #4578 | 04:34 |
| Jin-Seong Ha | Tower of God ‘ #4662 | 04:34 |
| Land | Frieren: Beyond Journey’s... | 04:34 |
| Nadeshiko Yamato | The 100 Girlfriends Who Reall | 04:34 |
| Nanao ise | Bleach - #4586 | 04:34 |
| Teuohi | Naruto * #4594 | 04:34 |
| El Condor Pasa | Umamusume: Pretty Derb... | 04:34 |
| Erina Pendleton | JoJo's Bizarre Adventure - #4 | 04:34 |
| Kirihito Mori | Kamisama Kiss * #4583 | 04:34 |
| Mimi Pearlbaton | Re:ZERO -Starting Life in... | 04:34 |
| Seiko Kimura | Danganronpa: The Anima... | 04:34 |
| Takehito Kumazga... | Charlotte - #4587 | 04:34 |
| Guts | Kill la Kill - #4584 | 04:34 |
| Hatsuka Suzush... | Call of the Night - #4588 | 04:34 |
| Ikumo | DARLING in the FRANXX - #4 | 04:34 |
| Lisa Yadoumaru | Bleach - #4596 | 04:34 |
| Midori Kohakobe | Call of the Night - #4580 | 04:34 |
| Yeong-U Sin | Overgeared ‘ #4604 | 04:34 |
| Akane Owari | Danganronpa: The Anima... | 04:35 |
| Daitaku Helios | Umamusume: Pretty Derby ° 3 | 04:35 |
| Kiriwo Amy | Welcome to Demon Scho... | 04:35 |
| Mathiru Koizumi | Danganronpa: The Anima... | 04:35 |
| Rossiu Adai | Gurren Lagann - #4597 | 04:35 |
| Ukogi | Demon Slayer: Kimetsu n... | 04:35 |
| Arale Norimaki | Dragon Ball - #4618 | 04:35 |
| August Stilza | Gachiakuta - #4626 | 04:35 |
| Bobobo-bo Bo-b... | Bobobo-bo Bo-bobo - #4... | 04:35 |
| Gabiru | That Time ! Got Reincarn... | 04:35 |
| Kuniharu Saiki | The Disastrous Life of Sa... | 04:35 |
| Lordgenome | Gurren Lagann - #4598 | 04:35 |
| Lyza | Made in Abyss - #4606 | 04:35 |
| Atla | The Rising of the Shield ... | 04:35 |
| Bete Loga | Is It Wrong to Try to Pick ... | 04:35 |
| Gosha | BEASTARS - #4615 | 04:35 |
| Nu | The Eminence in Shadow ... | 04:35 |
| Ryuuma Shimot... | ONE PIECE « #4619 | 04:35 |
| Tartah | Witch Hat Atelier - #4611 | 04:35 |
| Acnologia | Fairy Tail - #4600 | 04:35 |
| Azazel | High School DxD - #4626 | 04:35 |
| Chun-Li | TONIKAWA: Over The Mo... | 04:35 |
| Taishi Gotanda | OSHI NO KO - #4616 | 04:35 |
| Tanaka | Black Butler - #4612 | 04:35 |
| Caesar Clown | ONE PIECE + #4637 | 04:36 |
| Chusaku Kometani | Komi Can’t Communicate - #4 | 04:36 |
| Mika | Lycoris Recoil - #4649 | 04:36 |
| Monomi | Danganronpa: The Anima... | 04:36 |
| Rika Honjouji | 365 Days to the Wedding ... | 04:36 |
| Yuuki Yoshino | Food Wars! ‘#4633 | 04:36 |
| igneel | Fairy Tail - #4645 | 04:36 |
| Aya Arisugawa | TONIKAWA: Over The Mo... | 04:36 |
| Lisanna Strauss | Fairy Tail - #4650 | 04:36 |
| Lucas | The Promised Neverland -... | 04:36 |
| Sabro Sabnock | Welcome to Demon Scho... | 04:36 |
| Shikadai Nara | Naruto - #4638 | 04:36 |
| Super Creek | Umamusume: Pretty Derb... | 04:36 |
| Zenzou Hattori | Gintama - #4634 | 04:36 |
| As Nodt | Bleach - #4627 | 04:36 |
| Kariya Matou | Fate/Zero - #4635 | 04:36 |
| Lihaku | The Apothecary Diaries - ... | 04:36 |
| Sae Niijima | PERSONAS the Animatio... | 04:36 |
| Shibisu | Tower of God - #4643 | 04:36 |
| izuru Kira | Bleach - #4631 | 04:36 |
| Bachiko Barbatos | Welcome to Demon Scho... | 04:36 |
| Chiyo Yumehara | The Disastrous Life of Sa... | 04:36 |
| Kurcaudo Ooishi | When They Cry - #4646 | 04:36 |
| Ravel Phenex | High School DxD - #4636 | 04:36 |
| Fu Orostor | Gachiakuta * #4669 | 04:37 |
| Kanne | Frieren: Beyond Journey’s... | 04:37 |
| Mars | Black Clover - #4653 | 04:37 |
| Monspeet | The Seven Deadly Sins ° ... | 04:37 |
| Nojiko | ONE PIECE : #4657 | 04:37 |
| Sagaru Yamazaki | Gintama * #4677 | 04:37 |
| Shiage Hamazura | A Certain Magical Index ° ... | 04:37 |
| Artemis | Sailor Moon « #4662 | 04:37 |
| Charlés | Fairy Tail - #4658 | 04:37 |
| Erhard | The Rising of the Shield ... | 04:37 |
| Guila | The Seven Deadly Sins- ... | 04:37 |
| Linlm Charlotte | ONE PIECE - #46760 | 04:37 |
| Aikawa | Dorohedoro * #4659 | 04:37 |
| Charlotte | TONIKAWA: Over The Mo... | 04:37 |
| Freed Justine | Fairy Tail - #4663 | 04:37 |
| Komurasaki | ONE PIECE - #4675 | 04:37 |
| Miki Azumi | The Ramparts of Ice - #4655 | 04:37 |
| Noboru Taki | Sound! Euphonium * #4651 | 04:37 |
| Phinks Magcub | Hunter x Hunter ‘#4679 | 04:37 |
| Titus Alexius | Magi: The Labyrinth of M... | 04:37 |
| Chisa Yukizome | Danganronpa: The Anima... | 04:37 |
| Iron | Solo Leveling - #4668 | 04:37 |
| Kyuusaku Yume... | Bungo Stray Dogs - #4660 | 04:37 |
| Pakkun | Naruto - #4656 | 04:37 |
| Sajin Komamura | Bleach - #4672 | 04:37 |
| Sharrkan | Magi: The Labyrinth of M... | 04:37 |
| Takeru Noto | Fire Force - #4676 | 04:37 |
| Atsuhiro Sako | My Hero Academia - #4701 | 04:38 |
| Gasper Vladi | High School DxD - #4685 | 04:38 |
| Green Okido | Pokémon * #4689 | 04:38 |
| Tsunagu Hakam... | My Hero Academia - #4693 | 04:38 |
| Vodka | Umamusume: Pretty Derb... | 04:38 |
| Yasuhiro Hagak... | Danganronpa: The Anima... | 04:38 |
| Zodyl Typhon | Gachiakuta ‘#4697 | 04:38 |
| Akane Nishino | The Eminence in Shadow ... | 04:38 |
| Chisato Mera | The Disastrous Life of Sa... | 04:38 |
| Chitose Amano | My Dress-Up Darling - #4... | 04:38 |
| Monet | ONE PIECE - #4686 | 04:38 |
| Mutsu | Gintama - #4690 | 04:38 |
| Senjurou Rengoku | Demon Slayer: Kimetsu no Ya | 04:38 |
| Tatsuki Arisawa | Bleach - #4698 | 04:38 |
| lris Midgar | The Eminence in Shadow ... | 04:38 |
| Aoi Sakamoto | SAKAMOTO DAYS « #4683 | 04:38 |
| Barry the Chopp... | Fullmetal Alchemist - #47... | 04:38 |
| Haru Onodera | Nisekoi - #4687 | 04:38 |
| Mitsuko Kongou | A Certain Magical Index ° ... | 04:38 |
| Naki | Tokyo Ghoul - #4699 | 04:38 |
| Senritsu | Hunter x Hunter * #4695 | 04:38 |
| Unji Zuma | DAN DA DAN : #4707 | 04:38 |
| Cathleen Bate | My Hero Academia ‘ #4688 | 04:38 |
| Gloxinia | The Seven Deadly Sins-... | 04:38 |
| Kenjirou Minami | Yuri!!! on ICE - #4696 | 04:38 |
| Mr. Popo | Dragon Ball - #4684 | 04:38 |
| Nagisa Momoe | Puella Magi Madoka Magi... | 04:38 |
| Sandman | STEEL BALL RUN JoJo's ... | 04:38 |
| Hamusuke | Overlord - #4713 | 04:39 |
| Hanami | JUJUTSU KAISEN - #4721 | 04:39 |
| Masrur | Magi: The Labyrinth of M... | 04:39 |
| Masumi Sera | Detective Conan - #4709 | 04:39 |
| Walker Yumasaki | Durarara!! - #4717 | 04:39 |
| Gloria Martinez | Cyberpunk: Edgerunners -... | 04:39 |
| Kimihiko Kimizuka | The Detective Is Already ... | 04:39 |
| Schrédinger | Hellsing - #4722 | 04:39 |
| Yukiko Kanzaki | Assassination Classroom ... | 04:39 |
| Bai Ji-Shin Chang | Black Lagoon * #4723 | 04:39 |
| Gazef Stronoff | Overlord - #4719 | 04:39 |
| Heen | Howl's Moving Castle * #4... | 04:39 |
| Renge Houshakuji | Ouran High School Host ... | 04:39 |
| Astolfo Granatu... | The Case Study of Vanita... | 04:39 |
| Hinako Inui | Food Wars! - #4712 | 04:39 |
| Shinri | Fullmetal Alchemist - #47... | 04:39 |
| Souichirou Yag«... | Death Note ‘#4716 | 04:39 |
| Henry Legolant | Black Clover - #4741 | 04:40 |
| Jyuubei Aryuu | BLUE LOCK - #4737 | 04:40 |
| Kento Miura | Kimi ni Todoke: From Me ... | 04:40 |
| Pairin | The Apothecary Diaries - ... | 04:40 |
| Tiese Shtolienen | Sword Art Online - #4749 | 04:40 |
| Wakasa Imaushi | Tokyo Revengers * #4733 | 04:40 |
| Akuraou | Kamisama Kiss - #4754 | 04:40 |
| Karl | Bungo Stray Dogs - #4742 | 04:40 |
| Kou Shimizu | Goodnight Punpun - #4738 | 04:40 |
| Mizuki | One-Punch Man « #4756 | 04:40 |
| Slan | Berserk - #4726 | 04:40 |
| Tomohito Sugino | Assassination Classroom ... | 04:40 |
| Yukio Kasamatsu | Kuroko's Basketball - #47... | 04:40 |
| lharu Furuhashi | Kaiju No. 8 - #4734 | 04:40 |
| Miyoko Sahara | A Silent Voice - #4755 | 04:40 |
| Pocoloco | STEEL BALL RUN JoJo's ... | 04:40 |
| Sadeena | The Rising of the Shield Herc | 04:40 |
| Shigekiyo Yanguu | JoJo's Bizarre Adventure ... | 04:40 |
| Sortiliena Serlut | Sword Art Online - #4731 | 04:40 |
| Violet | ONE PIECE « #4735 | 04:40 |
| William T. Spears | Black Butler - #4743 | 04:40 |
| Yozuru Kagenui | Bakemonogatari - #4747 | 04:40 |
| Itori | Tokyo Ghoul - #4744 | 04:40 |
| Naomi Tanizaki | Bungo Stray Dogs - #4736 | 04:40 |
| Niko Hirata | Call of the Night - #4732 | 04:40 |
| Pedro | ONE PIECE - #4748 | 04:40 |
| Ryou Shimazaki | Mob Psycho 100 - #4756 | 04:40 |
| Tomo Hosaka | Sword Art Online - #47486 | 04:40 |
| Cairngorm | Land of the Lustrous - #4... | 04:41 |
| Caulifla | Dragon Ball - #4773 | 04:41 |
| Charlotte Wraith | As a Reincarnated Aristo... | 04:41 |
| Claude Faustus | Black Butler - #4753 | 04:41 |
| Kouha Ren | Magi: The Labyrinth of M... | 04:41 |
| Yunan | Magi: The Labyrinth of M... | 04:41 |
| Yuri Alpha | Overlord - #4765 | 04:41 |
| Atsuya Kusakabe | JUJUTSU KAISEN : #4774 | 04:41 |
| Jazz Andro | Welcome to Demon Scho... | 04:41 |
| Maria Ross | Fullmetal Alchemist - #47... | 04:41 |
| Melissa Shield | My Hero Academia * #4782 | 04:41 |
| Seiun Sky | Umamusume: Pretty Derb... | 04:41 |
| Yuriko Hori | Horimiya - #4770 | 04:41 |
| Hatchan | ONE PIECE - #4775 | 04:41 |
| Howzer | The Seven Deadly Sins - ... | 04:41 |
| Kyros | ONE PIECE - #4763 | 04:41 |
| Shizune | Naruto - #4779 | 04:41 |
| Yahiko | Naruto - #4759 | 04:41 |
| Yoo-Sung Shin | Omniscient Reader - #4767 | 04:41 |
| Inasa Yoarashi | My Hero Academia - #4764 | 04:41 |
| Lau | Black Butler - #4776 | 04:41 |
| Mikage | Kamisama Kiss - #4760 | 04:41 |
| Norland Montobi... | ONE PIECE - #4780 | 04:41 |
| Yatsuka no Tsur... | JUJUTSU KAISEN - #4768 | 04:41 |
| Yellow Diamond | Land of the Lustrous - #4... | 04:41 |
| Fuyumi Todoroki | My Hero Academia - #4793 | 04:42 |
| Gamakichi | Naruto - #4801 | 04:42 |
| Maaa | Made in Abyss - #4785 | 04:42 |
| Nezu | My Hero Academia - #4805 | 04:42 |
| Ryuunosuke Chi... | Assassination Classroom ... | 04:42 |
| Selim Bradley | Fullmetal Alchemist - #47... | 04:42 |
| Yukino Aguria | Fairy Tail - #4797 | 04:42 |
| Fuyumi Irisu | Hyouka - #4802 | 04:42 |
| Ibuki | BEASTARS * #4778 | 04:42 |
| Isane Kotetsu | Bleach - #4786 | 04:42 |
| Pieyon | OSHI NO KO - #4806 | 04:42 |
| Quetsu Nimaiya | Bleach - #4796 | 04:42 |
| Sherry Barnett | The Eminence in Shadow ° #4 | 04:42 |
| Suiryu | One-Punch Man : #4798 | 04:42 |
| Hephaestus | Is It Wrong to Try to Pick Up | 04:42 |
| Karin Kurosaki | Bleach - #4795 | 04:42 |
| Mike Zacharias | Attack on Titan ‘ #48603 | 04:42 |
| Paulie | ONE PIECE - #4787 | 04:42 |
| Rhya | Black Clover ‘ #4791 | 04:42 |
| isabella York | Violet Evergarden ‘ #4783 | 04:42 |
| Ariel Asura | Mushoku Tensei: Jobless Reir | 04:42 |
| Ghost Quartz | Land of the Lustrous - #4... | 04:42 |
| Norland Montbi... | ONE PIECE - #4780 | 04:42 |
| Pandaman | ONE PIECE - #4800 | 04:42 |
| Ran Mao | Black Butler - #4796 | 04:42 |
| Sally | Black Clover - #4804 | 04:42 |
| Zeff | ONE PIECE - #4788 | 04:42 |
| Frill Shiranui | OSHI NO KO: #4821 | 04:43 |
| Fuji Kiseki | Umamusume: Pretty Derby ° 3 | 04:43 |
| Kaku | ONE PIECE - #4817 | 04:43 |
| Mana Takamiya | Date A Live - #4809 | 04:43 |
| Metori Saiko | The Disastrous Life of Sa... | 04:43 |
| Pandora | Re:ZERO -Starting Life in... | 04:43 |
| Euini | Witch Hat Atelier - #4814 | 04:43 |
| Himiko Agari | Komi Can*t Communicate ... | 04:43 |
| Kung Fu Dugong | ONE PIECE - #4818 | 04:43 |
| The Major | Hellsing - #4822 | 04:43 |
| Yaku Yakuzen | The 100 Girlfriends Who R... | 04:43 |
| Cliff Grimoire | Mushoku Tensei: Jobless ... | 04:43 |
| Eruka Frog | Soul Eater * #4823 | 04:43 |
| Jean-Jacques L... | Yurill! on [CE - #4819 | 04:43 |
| Kaijin Hime Do-S | One-Punch Man - #4831 | 04:43 |
| Minami Kotobuki | OSHI NO KO: #4807 | 04:43 |
| Riishu | The Apothecary Diaries - ... | 04:43 |
| Romantica Eru | A Returner's Magic Shoul... | 04:43 |
| ichibe Hyousube | Bleach - #4835 | 04:43 |
| Chachamaru | Demon Slayer: Kimetsu n... | 04:43 |
| Karin | Naruto - #4816 | 04:43 |
| Manami Okuda | Assassination Classroom ... | 04:43 |
| Momo Nishimiya | JUJUTSU KAISEN - #4826 | 04:43 |
| Sin Sang | Solo Leveling - #4828 | 04:43 |
| Yuuichirou Kuro... | Fire Force - #4832 | 04:43 |
| Akira Kunimi | HAIKYUI!! - #4853 | 04:44 |
| Fuji Kiseki | Umamusume: Pretty Derby - 4 | 04:44 |
| Hee-Jin Park | Solo Leveling - #4833 | 04:44 |
| Lauroe Phonsekal | Tower of God - #4841 | 04:44 |
| Rinka Hayami | Assassination Classroom ... | 04:44 |
| Soldat Heckler | Mushoku Tensei: Jobless ... | 04:44 |
| Yuuma Kunimi | Rascal Does Not Dream o... | 04:44 |
| Yuuma Motoki | Aoashi - #4845 | 04:44 |
| Haro | Mobile Suit Gundam - #4834 | 04:44 |
| Jikka | Hell’s Paradise - #4830 | 04:44 |
| Kinoko Komori | My Hero Academia * #4838 | 04:44 |
| Maruzensky | Umamusume: Pretty Derby ° 3 | 04:44 |
| Masamichi Yaga | JUJUTSU KAISEN - #4856 | 04:44 |
| Willibald | Vinland Saga * #4846 | 04:44 |
| Cavendish | ONE PIECE : #4847 | 04:44 |
| Frey | That Time / Got Reincarn... | 04:44 |
| Momi Momiji | The 100 Girlfriends Who R... | 04:44 |
| Ryouji Fujioka | Ouran High School Host ... | 04:44 |
| Tetsuya #2 | Kuroko's Basketball - #48... | 04:44 |
| Candice Catnipp | Bleach - #4844 | 04:44 |
| Fiel Nilvalen | No Game, No Life ‘ #4836 | 04:44 |
| Luca | Berserk - #4840 | 04:44 |
| Mihono Bourbon | Umamusume: Pretty Derb... | 04:44 |
| Rigurd | That Time ! Got Reincarn... | 04:44 |
| Akira Kunimi | HAIKYU!! - #4853 | 04:45 |
| Dorio | Cyberpunk: Edgerunners -... | 04:45 |
| Fanatio | Sword Art Online - #4873 | 04:45 |
| Hifumi Togo | PERSONAS the Animatio... | 04:45 |
| Maya Satou | Classroom of the Elite - #... | 04:45 |
| Melt Narushima | OSHI NO KO: #4861 | 04:45 |
| Pell | ONE PIECE «‘ #4881 | 04:45 |
| Shoot McMahon | Hunter x Hunter - #4865 | 04:45 |
| Baby 5 | ONE PIECE - #4866 | 04:45 |
| Hanatarou Yam... | Bleach - #4870 | 04:45 |
| Kiyotaka Ijichi | JUJUTSU KAISEN - #4886 | 04:45 |
| Koduck | Pokémon - #4874 | 04:45 |
| Laufen | Frieren: Beyond Journey’s... | 04:45 |
| Ritsu Souma | Fruits Basket - #4858 | 04:45 |
| Sara Shane | Charlotte - #4854 | 04:45 |
| Szayel Aporro G... | Bleach - #4878 | 04:45 |
| Doll | Black Butler - #4871 | 04:45 |
| Kilik Rung | Soul Eater - #4863 | 04:45 |
| L’arc Berg | The Rising of the Shield ... | 04:45 |
| Ronald Knox | Black Butler - #4859 | 04:45 |
| Song-! Han | Solo Leveling - #4875 | 04:45 |
| izou | ONE PIECE « #4879 | 04:45 |
| Fana | Black Clover - #4880 | 04:45 |
| Kedama | given - #4868 | 04:45 |
| King | ONE PIECE - #4884 | 04:45 |
| Kouen Ren | Magi: The Labyrinth of M... | 04:45 |
| Nikki Hanada | Dr. STONE - #4876 | 04:45 |
| Tiger Fisher | ONE PIECE - #4864 | 04:45 |
| Gangar | Pokémon * #4893 | 04:46 |
| Kensei Muguruma | Bleach - #4897 | 04:46 |
| Maya Ibuki | Neon Genesis Evangelion - #4 | 04:46 |
| Megumi Jinno | Eromanga Sensei - #4889 | 04:46 |
| Cobra | Fairy Tail - #4894 | 04:46 |
| Kiyotaka lijichi | JUJUTSU KAISEN « #4886 | 04:46 |
| Kudelia Aina Berns | Mobile Suit Gundam « #4882 | 04:46 |
| Kyousuke Takak... | NANA - #4898 | 04:46 |
| Mirai no Akuma | Chainsaw Man - #4906 | 04:46 |
| Ren Amaki | The Rising of the Shield ... | 04:46 |
| Shikaku Nara | Naruto - #4962 | 04:46 |
| Bazz-B | Bleach - #4911 | 04:46 |
| Kenjirou Shirabu | HAIKYUI!! - #4899 | 04:46 |
| Nana | DARLING in the FRANXX - #4 | 04:46 |
| Nii-chan | Blue Exorcist - #4895 | 04:46 |
| Ninju Mukimukiéi ... | Demon Slayer: Kimetsu n... | 04:46 |
| Ryou Fujibayashi | Clannad - #4887 | 04:46 |
| ik-Su | Yona of the Dawn - #49863 | 04:46 |
| Inca Kasugatani | Fire Force - #4896 | 04:46 |
| Kaoru Gojou | My Dress-Up Darling - #4... | 04:46 |
| Shinji Koganei | Kuroko's Basketball - #48... | 04:46 |
| Utakata | Naruto - #4888 | 04:46 |
| Yaeko Nishimiya | A Silent Voice - #4912 | 04:46 |
| Yamame Yasash... | The 100 Girlfriends Who R... | 04:46 |
| Belaf | Made in Abyss - #4985 | 04:47 |
| Eita Otoya | BLUE LOCK - #4925 | 04:47 |
| Kureha | ONE PIECE « #49869 | 04:47 |
| Pram Schneider | A Returner's Magic Shoul... | 04:47 |
| Regto | Gachiakuta ‘#4913 | 04:47 |
| Secretive Plotter | Omniscient Reader - #4933 | 04:47 |
| Solomon Jehoah... | Magi: The Labyrinth of M... | 04:47 |
| Souka | That Time / Got Reincarnatec | 04:47 |
| Eishia Stilza | Gachiakuta - #4914 | 04:47 |
| Jinzouningen 16-... | Dragon Ball - #4922 | 04:47 |
| Makoto Isshiki | Love, Chunibyo & Other ... | 04:47 |
| Motoharu Tsuch... | A Certain Magical Index - ... | 04:47 |
| Otose | Gintama - #4934 | 04:47 |
| Ryuuzu Meyer | Re:ZERO -Starting Life in... | 04:47 |
| lrene Belserion | Fairy Tail - #4930 | 04:47 |
| Conny | The Promised Neverland « #4 | 04:47 |
| Frederica Sawyer | Black Lagoon * #4935 | 04:47 |
| Leon Kuwata | Danganronpa: The Anima... | 04:47 |
| Makino | ONE PIECE : #4915 | 04:47 |
| Meredy | Fairy Tail - #4927 | 04:47 |
| Miles | Fullmetal Alchemist - #49... | 04:47 |
| Pantheriily | Fairy Tail - #4923 | 04:47 |
| Kiyosumi Shirak... | Call of the Night - #4924 | 04:47 |
| Mathiru Hiiragi | Seraph of the End: Vampi... | 04:47 |
| Soi Purson | Welcome to Demon Scho... | 04:47 |
| Touma Akechi | The Disastrous Life of Sa... | 04:47 |
| Angel | Fairy Tail - #4953 | 04:48 |
| Angelina Durless | Black Butler - #4961 | 04:48 |
| Kamikaze | One-Punch Man - #4949 | 04:48 |
| Lillian Weinberg | Dr. STONE - #4937 | 04:48 |
| Suphia | That Time / Got Reincarn... | 04:48 |
| iceburg | ONE PIECE - #4941 | 04:48 |
| 9' Alpha | DARLING in the FRANXX - #4 | 04:48 |
| Ayumi Yamada | March comes in like a lion... | 04:48 |
| Flare Corona | Fairy Tail - #4954 | 04:48 |
| Henrietta von Penr | B6 EIGHTY-SIX - #4946 | 04:48 |
| Ren Yamai | Komi Can’t Communicate - #4 | 04:48 |
| Tatsuya Himuro | Kuroko's Basketball - #49... | 04:48 |
| Ichi Mezato | Mob Psycho 100 - #4943 | 04:48 |
| Jimihen | BOCCHI THE ROCK! - #4... | 04:48 |
| Senkou no Flash | One-Punch Man - #4959 | 04:48 |
| Shouhei Fukunc... | HAIKYUI! - #4955 | 04:48 |
| Stiyl Magnus | A Certain Magical Index ° ... | 04:48 |
| Takuya Yamamo... | Tokyo Revengers * #4939 | 04:48 |
| Anna | The Promised Neverland -... | 04:48 |
| Mai | Dragon Ball - #4940 | 04:48 |
| Marie Miolnir | Soul Eater - #4952 | 04:48 |
| Senzaemon Nakiri | Food Wars! - #4956 | 04:48 |
| Sojiro Sakura | PERSONAS the Animatio... | 04:48 |
| Alikred | Welcome to Demon Scho... | 04:49 |
| Askin Nakk Le V... | Bleach - #4957 | 04:49 |
| Hitomi Tadano | Komi Can’t Communicate ... | 04:49 |
| Setsuna Tokage | My Hero Academia - #4977 | 04:49 |
| Tatara | Tokyo Ghoul - #4973 | 04:49 |
| Tayuya | Naruto - #4985 | 04:49 |
| Garm | Vinland Saga - #4986 | 04:49 |
| Kurona Yasuhisa | Tokyo Ghoul - #4974 | 04:49 |
| Saori Makishima | Eromanga Sensei - #4962 | 04:49 |
| Shouichi Imayos... | Kuroko's Basketball - #49... | 04:49 |
| Yui Saikawa | The Detective Is Already Dea | 04:49 |
| Kishika Torotoro | The 100 Girlfriends Who Reall | 04:49 |
| Momonosuke Ko... | ONE PIECE « #4975 | 04:49 |
| Rico Brzenska | Attack on Titan ‘#4967 | 04:49 |
| Shuukurou Tsuki... | Bleach - #4963 | 04:49 |
| Tao Fa | Hell’s Paradise - #4987 | 04:49 |
| Thomas Andre | Solo Leveling - #4971 | 04:49 |
| Anpu | The Disastrous Life of Sa... | 04:49 |
| Kaguya Ootsuts... | Naruto - #4968 | 04:49 |
| Megumi Hanaiji... | Fruits Basket - #4988 | 04:49 |
| Seryuu Ubiquito... | Akame ga Kill! - #4972 | 04:49 |
| Yoshiaki Kibe | Rent-a-Girlfriend - #4968 | 04:49 |
| Haruka Hasebe | Classroom of the Elite - #506 | 04:50 |
| Inko Midoriya | My Hero Academia - #4981 | 04:50 |
| Margaret Liones | The Seven Deadly Sins ° ... | 04:50 |
| Masaki Kurosaki | Bleach - #5013 | 04:50 |
| Mito Freeoss | Hunter x Hunter * #4989 | 04:50 |
| Satoko Kirigaya | Firefly Wedding - #5009 | 04:50 |
| Yoshiteru Zaimo... | My Teen Romantic Come... | 04:50 |
| Zushi | Hunter x Hunter * #4997 | 04:50 |
| Chidaruma | Dorohedoro - #4998 | 04:50 |
| Gin Doujima | Food Wars! - #5006 | 04:50 |
| Julius Reichwein | Monster * #4994 | 04:50 |
| Lyon Vastia | Fairy Tail - #5014 | 04:50 |
| Mafuyu Seba | SAKAMOTO DAYS - #4982 | 04:50 |
| Meinya | Made in Abyss - #5002 | 04:50 |
| Mountain Tim | STEEL BALL RUN JoJo's ... | 04:50 |
| Alexandrite | Land of the Lustrous - #4... | 04:50 |
| Erica Brown | Violet Evergarden «#5607 | 04:50 |
| Misae Sagara | Clannad - #56003 | 04:50 |
| Noro | Tokyo Ghoul - #4999 | 04:50 |
| Ryouko Asakura | The Melancholy of Haruhi... | 04:50 |
| itsuwa | A Certain Magical Index ° ... | 04:50 |
| Emi Fukukado | My Hero Academia ‘ #5066 | 04:50 |
| Jin | Yu Yu Hakusho « #4984 | 04:50 |
| Jisai Kanemaki | Vagabond - #5004 | 04:50 |
| Megumi Hanaiiji... | Fruits Basket - #4988 | 04:50 |
| Nagomi Kinoshita | Rent-a-Girlfriend - #5068 | 04:50 |
| Numa no Himem... | Kamisama Kiss - #4996 | 04:50 |
| Sengoku | ONE PIECE - #4992 | 04:50 |
| Alexis Ness | BLUE LOCK - #5017 | 04:51 |
| Geld | That Time / Got Reincarn... | 04:51 |
| Satotz | Hunter x Hunter - #5021 | 04:51 |
| Zetsu | Naruto - #5629 | 04:51 |
| Darui | Naruto - #5022 | 04:51 |
| Kazuha Tooyama | Detective Conan - #5018 | 04:51 |
| Therese Alexandrit | The Rising of the Shield Hera | 04:51 |
| Tsuruya | The Melancholy of Haruhi... | 04:51 |
| Vorona | Durarara!! - #5036 | 04:51 |
| Zantetsu Tsurugi | BLUE LOCK - #5034 | 04:51 |
| Arachne Gorgon | Soul Eater - #5019 | 04:51 |
| Gillian | The Promised Neverland -... | 04:51 |
| Grencia Mars Eli... | Cowboy Bebop - #5011 | 04:51 |
| Hakuei Ren | Magi: The Labyrinth of M... | 04:51 |
| Haru | Dorohedoro « #5015 | 04:51 |
| Kita no Kaiou | Dragon Ball - #5035 | 04:51 |
| Lalicgh Sune | Mobile Suit Gundam - #5039 | 04:51 |
| Tusk | Solo Leveling - #5027 | 04:51 |
| Brain Unglaus | Overlord - #5016 | 04:51 |
| Chess Belle | Seraph of the End: Vampire f | 04:51 |
| Marguerite | ONE PIECE - #5020 | 04:51 |
| Minerva Orland | Fairy Tail - #5024 | 04:51 |
| Ryuuken Ishida | Bleach - #5028 | 04:51 |
| Wataru Takagi | Detective Conan - #5012 | 04:51 |
| AcDC | JoJo's Bizarre Adventure ... | 04:52 |
| Bege Capone | ONE PIECE - #5661 | 04:52 |
| Jean-Jacques C... | The Case Study of Vanita... | 04:52 |
| Kumo Oni Ane | Demon Slayer: Kimetsu no Ya | 04:52 |
| Nanako Hasega... | SK8 the Infinity - #5049 | 04:52 |
| Shinya Kamihara | My Hero Academia - #5057 | 04:52 |
| Sol Marron | Black Clover - #5045 | 04:52 |
| Tanjurou Kamado | Demon Slayer: Kimetsu n... | 04:52 |
| Eisaku Otomo | Aoashi ‘#5046 | 04:52 |
| Hilda Boreas Greyr | Mushoku Tensei: Jobless Reir | 04:52 |
| Meimei | The Apothecary Diaries - ... | 04:52 |
| Mireille Grangeon | As a Reincarnated Aristocrat | 04:52 |
| Mitsuki Bakugou | My Hero Academia * #5658 | 04:52 |
| Oboro | Gintama - #5054 | 04:52 |
| Yuugo Tennouji | Steins:Gate - #5862 | 04:52 |
| Clementine | Overlord - #5055 | 04:52 |
| Hayate Ayasaki | TONIKAWA: Over The Mo... | 04:52 |
| Lalah Sune | Mobile Suit Gundam - #5039 | 04:52 |
| Mashiro Kuna | Bleach - #5043 | 04:52 |
| Nnoitra Gilga | Bleach - #5847 | 04:52 |
| Ururu Tsumugiya | Bleach - #5051 | 04:52 |
| ikemen Kamen A... | One-Punch Man - #5063 | 04:52 |
| Katakuriko Mat... | Gintama - #50680 | 04:52 |
| Mew | Pokémon - #5052 | 04:52 |
| Momo Akanega... | Food Wars! - #5036 | 04:52 |
| Raynare | High School DxD - #5044 | 04:52 |
| Chelia Blendy | Fairy Tail» #5081 | 04:53 |
| Chimney | ONE PIECE - #5089 | 04:53 |
| Miko | No Game, No Life - #5065 | 04:53 |
| Pu'ar | Dragon Ball - #5069 | 04:53 |
| Satoshi Mashiba | A Silent Voice - #5077 | 04:53 |
| Smokey Brown | JoJo's Bizarre Adventure ... | 04:53 |
| Aleister Crowley | A Certain Magical Index ... | 04:53 |
| Alha Korvus | Gachiakuta - #5086 | 04:53 |
| Chaozu | Dragon Ball - #5070 | 04:53 |
| Mio Ibuki | Classroom of the Elite - #... | 04:53 |
| Nekomamushi | ONE PIECE - #5082 | 04:53 |
| Sylvia | KONOSUBA -God's blessi... | 04:53 |
| Kentarou Kyout... | HAIKYUL! - #5083 | 04:53 |
| Ophis | High School DxD - #5075 | 04:53 |
| Pinako Rockbell | Fullmetal Alchemist - #58... | 04:53 |
| Sheska | Fullmetal Alchemist - #5071 | 04:53 |
| Sketchy | SK8 the Infinity - #5079 | 04:53 |
| Venelana Gremo... | High School DxD - #5067 | 04:53 |
| iIkemen Kamen A... | One-Punch Man - #5063 | 04:53 |
| Ashborn | Solo Leveling - #5084 | 04:53 |
| Kaguya Sumeragi | Code Geass: Lelouch of the F | 04:53 |
| Nashiro Yasuhisa | Tokyo Ghoul - #5076 | 04:53 |
| Natalia Kaminski | Fate/Zero ‘#5072 | 04:53 |
| Sohneizel el Britan: | Code Geass: Lelouch of the F | 04:53 |
| Takeuchi | A Silent Voice - #5064 | 04:53 |
| Hayato Kawaiiri | JoJo's Bizarre Adventure ... | 04:54 |
| Hina | ONE PIECE - #5893 | 04:54 |
| Mality Melromaro | The Rising of the Shield Hero | 04:54 |
| Miwako Satou | Detective Conan - #5109 | 04:54 |
| Mjurran | That Time / Got Reincarn... | 04:54 |
| Neon Nostrade | Hunter x Hunter * #5161 | 04:54 |
| Persephone | Omniscient Reader - #5085 | 04:54 |
| Aiichirou Nitori | Free! -lwatobi Swim Club... | 04:54 |
| Chiyo lin | The 100 Girlfriends Who R... | 04:54 |
| Ellen | That Time / Got Reincarn... | 04:54 |
| Kazushi Yamazgi... | Tokyo Revengers - #5098 | 04:54 |
| Uraltugo Noi Nu... | Magi: The Labyrinth of M... | 04:54 |
| Ariong | ONE PIECE - #5899 | 04:54 |
| Ddraig | High School DxD - #5095 | 04:54 |
| Elisabeth | The Eminence in Shadow ... | 04:54 |
| Kanji Koganegza... | HAIKYUL! - #5163 | 04:54 |
| Kyousuke Kousa... | Eromanga Sensei - #5091 | 04:54 |
| Sigurd | Vinland Saga - #5115 | 04:54 |
| Fujimasa Maroh | Umamusume: Pretty Derby ° ; | 04:54 |
| Gaimon | ONE PIECE - #5100 | 04:54 |
| Hayato Hayama | My Teen Romantic Come... | 04:54 |
| Mario Freudenb... | Attack on Titan - #5096 | 04:54 |
| Tomoko Shiretoko | My Hero Academia ‘ #5164 | 04:54 |
| Chouchou | ONE PIECE - #5125 | 04:55 |
| Enri Emmot | Overlord - #5137 | 04:55 |
| Malty Melromaro | The Rising of the Shield Hero | 04:55 |
| Motoko lura | Horimiya ‘ #5133 | 04:55 |
| Seira Kawanishi | My Dress-Up Darling - #5... | 04:55 |
| Shakuyaku | ONE PIECE - #5117 | 04:55 |
| Tank | Solo Leveling ~ #5121 | 04:55 |
| Ajiichirou Nitori | Free! -lwatobi Swim Club... | 04:55 |
| Alter Ego | Danganronpa: The Anima... | 04:55 |
| Bansai Kawakami | Gintama - #5130 | 04:55 |
| Charlotte | Puella Magi Madoka Magi... | 04:55 |
| Hendricksen | The Seven Deadly Sins... | 04:55 |
| Houka Inumuta | Kill la Kill #5134 | 04:55 |
| Inojin Yamanaka | Naruto - #5135 | 04:55 |
| Jirochou Doronii... | Gintama - #5131 | 04:55 |
| Lilith | ONE PIECE : #5123 | 04:55 |
| Muramasa Senju | Eromanga Sensei ‘#5111 | 04:55 |
| Ran Khun | Tower of God - #5127 | 04:55 |
| Ruomen | The Apothecary Diaries - ... | 04:55 |
| Yousuke Hirata | Classroom of the Elite - #... | 04:55 |
| Gremmy Thoum... | Bleach - #5116 | 04:55 |
| Kazuki Shimada | A Silent Voice - #5112 | 04:55 |
| Ronye Arabel | Sword Art Online - #5136 | 04:55 |
| Anya Alstreim | Code Geass: Lelouch of the R | 04:56 |
| Nagi Sanzenin | TONIKAWA: Over The Mo... | 04:56 |
| Ryouma Terasaka | Assassination Classroom ... | 04:56 |
| Samui | Naruto - #5165 | 04:56 |
| Sirzechs Lucifer | High School DxD - #5153 | 04:56 |
| Stussy | ONE PIECE - #5157 | 04:56 |
| Aisa Himegami | A Certain Magical Index - #51 | 04:56 |
| Charlotte Abelfr... | Violet Evergarden - #5142 | 04:56 |
| Kureo Mado | Tokyo Ghoul - #5146 | 04:56 |
| Vali Lucifer | High School DxD - #5154 | 04:56 |
| Yu Han Sung | Tower of God - #5158 | 04:56 |
| Atra Mixta | Mobile Suit Gundam - #5147 | 04:56 |
| Cassandra Ilion | Is It Wrong to Try to Pick Up | 04:56 |
| Juliette | Mushoku Tensei: Jobless ... | 04:56 |
| Kotetsu | Kamisama Kiss ‘#5151 | 04:56 |
| Lizarcion | Pokémon - #5167 | 04:56 |
| Tomoko Higashikat | JoJo's Bizarre Adventure - #§ | 04:56 |
| Yui Ikari | Neon Genesis Evangelion - #§ | 04:56 |
| Elfman Strauss | Fairy Tail - #5144 | 04:56 |
| Masayoshi Komi | Komi Can’t Communicate... | 04:56 |
| Otohiko | Kamisama Kiss - #5152 | 04:56 |
| Black Maria | ONE PIECE - #5185 | 04:57 |
| Elaine Lo Po Bia | Tower of God - #5177 | 04:57 |
| Karim | Dragon Ball - #5169 | 04:57 |
| Luluci | Witch Hat Atelier - #5161 | 04:57 |
| Nekomaru Nidai | Danganronpa: The Anima... | 04:57 |
| Sakutarou Yana... | March comes in like a lion... | 04:57 |
| Sirius | My Hero Academia - #5181 | 04:57 |
| Akiteru Tsukishi... | HAIKYU!! - #5174 | 04:57 |
| Calgara | ONE PIECE - #5170 | 04:57 |
| Jecheon Daeseoc... | Omniscient Reader - #5186 | 04:57 |
| Jiruo | Made in Abyss - #5182 | 04:57 |
| Ryuu | TONIKAWA: Over The Mo... | 04:57 |
| Beldaruit | Witch Hat Atelier - #5187 | 04:57 |
| Chota | Dorohedoro * #5171 | 04:57 |
| Kanae von Rose... | Tokyo Ghoul - #5175 | 04:57 |
| Lizardon | Pokémon - #5167 | 04:57 |
| Minami Hokutou... | Dr. STONE - #5183 | 04:57 |
| Sekhmet | Re:ZERO -Starting Life in... | 04:57 |
| Shin Yasuda | Horimiya ‘#5179 | 04:57 |
| Dante Zogratis | Black Clover - #5184 | 04:57 |
| Gakuhou Asano | Assassination Classroom ... | 04:57 |
| Hideaki Sorachi | Gintama - #5164 | 04:57 |
| Ibara Shiozaki | My Hero Academia ‘ #5176 | 04:57 |
| Kraft | Frieren: Beyond Journey’... | 04:57 |
| Menthuthuyoupi | Hunter x Hunter - #5188 | 04:57 |
| Mosquito Musume | One-Punch Man : #51860 | 04:57 |
| Carmilla | Re:ZERO -Starting Life in... | 04:58 |
| Flask no Homun... | Fullmetal Alchemist - #52... | 04:58 |
| Muuko | DAN DA DAN « #5269 | 04:58 |
| Noda | Angel Beats! - #5197 | 04:58 |
| Tsumiki Fushiguro | JUJUTSU KAISEN - #5193 | 04:58 |
| Abuto | Gintama - #5198 | 04:58 |
| Eri Kisaki | Detective Conan - #5218 | 04:58 |
| Picero Agares | Welcome to Demon Scho... | 04:58 |
| Sumire Kakei | Naruto - #5214 | 04:58 |
| Tarou | DAN DA DAN - #5194 | 04:58 |
| Void | Berserk - #5210 | 04:58 |
| Colt | Hunter x Hunter - #5199 | 04:58 |
| Inutacde | Delicious in Dungeon - #5207 | 04:58 |
| Kalifa | ONE PIECE - #5211 | 04:58 |
| Lemiel Silvamilli... | Black Clover ‘ #5263 | 04:58 |
| Rip Van Winkle | Hellsing - #5195 | 04:58 |
| Sho Hinakawa | PSYCHO-PASS - #5215 | 04:58 |
| Keimi | ONE PIECE - #5220 | 04:58 |
| Mary | The Eminence in Shadow - #§ | 04:58 |
| Moblit Berner | Attack on Titan - #5200 | 04:58 |
| Morena Prudo | Hunter x Hunter - #5208 | 04:58 |
| Quillsh Wammy | Death Note - #5196 | 04:58 |
| Senta | Hell’s Paradise - #5216 | 04:58 |
| Christophe Giac... | Yuri!!! on ICE - #5225 | 04:59 |
| Felioia Mitsuki | Puella Magi Madoka Magica - | 04:59 |
| Julia | Cowboy Bebop - #5237 | 04:59 |
| Komoe Taukuyomi | A Certain Magical Index - #52 | 04:59 |
| Kuroi Seishi | One-Punch Man - #5233 | 04:59 |
| Toki Kouzuki | ONE PIECE - #5241 | 04:59 |
| Tsumugu Kinag... | Kill la Kill - #5213 | 04:59 |
| Uraume | JUJUTSU KAISEN - #5217 | 04:59 |
| Beans | Hunter x Hunter - #5222 | 04:59 |
| Eclair Seaetto | The Rising of the Shield ... | 04:59 |
| Haruka Ogasaw... | Sound! Euphonium - #5230 | 04:59 |
| Imu | ONE PIECE - #5226 | 04:59 |
| Kobachi Osaragi | Kaguya-sama: Love is War «4 | 04:59 |
| Yusuke Yoshino | Clannad - #5238 | 04:59 |
| MoGillis Fareed | Mobile Suit Gundam - #5231 | 04:59 |
| Ririka Kenzaki | Sound! Euphonium * #5227 | 04:59 |
| Ul | Fairy Tail - #5239 | 04:59 |
| Yukinori Shinoh... | Tokyo Ghoul - #5223 | 04:59 |
| Yuutarou Kurose | Chainsaw Man ‘ #5235 | 04:59 |
| igor | PERSONAS the Animatio... | 04:59 |
| Eida | Naruto * #5236 | 04:59 |
| Hairu thei | Tokyo Ghoul - #5224 | 04:59 |
| Ki J - | ONE PIECE - #5220 | 04:59 |
| Kuugo Sakamata | My Hero Academia - #5228 | 04:59 |
| Ost Horai | The Rising of the Shield Herc | 04:59 |
| Sekke Bronzazza | Black Clover - #5232 | 04:59 |
| Tsubomi Takane | Mob Psycho 100 - #5240 | 04:59 |
| Geese Nukadia | Mushoku Tensei: Jobless ... | 05:00 |
| Georgie Saikawa | Miss Kobayashi's Dragon Mai | 05:00 |
| Haruhisa Kuribaya. | Aoashi - #5253 | 05:00 |
| Hyun-Sung Lee | Omniscient Reader - #5245 | 05:00 |
| Lyoia Plaid | As a Reincarnated Aristocrat. | 05:00 |
| Ragnarék | Soul Eater ‘ #5249 | 05:00 |
| Machikanefuku... | Umamusume: Pretty Der... | 05:00 |
| Mei Sunohara | Clannad « #5262 | 05:00 |
| Namari | Delicious in Dungeon - #5... | 05:00 |
| Naoki Fujieda | NANA - #5254 | 05:00 |
| Aries | Fairy Tail - #5251 | 05:00 |
| Dende | Dragon Ball - #5255 | 05:00 |
| Hikaru Kamiki | OSHI NO KO: #5267 | 05:00 |
| Oolong | Dragon Ball - #5247 | 05:00 |
| Pluto | Black Butler - #5263 | 05:00 |
| Ryuuko Tsuchikaw | My Hero Academia - #5259 | 05:00 |
| Wazukyan | Made in Abyss « #5243 | 05:00 |
| Couronna Dola | No Game, No Life - #5252 | 05:00 |
| Hinano Kurahashi | Assassination Classroom - #§ | 05:00 |
| Juuzou Sakakura | Danganronpa: The Anima... | 05:00 |
| Kenji Futakuchi | HAIKYU!! - #5272 | 05:00 |
| Shizuru Kuwaba... | Yu Yu Hakusho « #5248 | 05:00 |
| Uzuki Hirokawa | Rascal Does Not Dream of Bi | 05:00 |
| Boingo | JoJo's Bizarre Adventure ... | 05:01 |
| Don Lorenzo | BLUE LOCK - #5277 | 05:01 |
| Erimi Mushibami | Kakegurui - #5289 | 05:01 |
| Kai Shiden | Mobile Suit Gundam - #5285 | 05:01 |
| Seung-Gil Lee | Yurill! on ICE - #5265 | 05:01 |
| Yajirobe | Dragon Ball - #5293 | 05:01 |
| Yui Kodai | My Hero Academia - #5281 | 05:01 |
| Aorobatio Sarasar | DAN DA DAN - #5266 | 05:01 |
| Kirara Hazama | Assassination Classroom ... | 05:01 |
| Leah Kazuno | Love Live! School Idol Project | 05:01 |
| Nagi Aiza | Your lie in April - #5282 | 05:01 |
| Yukine Miyazawa | Clannad - #5278 | 05:01 |
| Yusaku Kudo | Detective Conan - #5270 | 05:01 |
| Asfi Al Androme... | Is It Wrong to Try to Pick ... | 05:01 |
| Cammy | TONIKAWA: Over The Mo... | 05:01 |
| Charlotte Arisak... | The Detective Is Already ... | 05:01 |
| Grass Wonder | Umamusume: Pretty Der... | 05:01 |
| Nobuko Takada | JUJUTSU KAISEN - #5295 | 05:01 |
| Sena | KONOSUBA -God's blessi... | 05:01 |
| Sverkell | Vinland Saga - #5283 | 05:01 |
| Chiquitita | DAN DA DAN - #5276 | 05:01 |
| Kaisel | Solo Leveling - #5292 | 05:01 |
| Karen Moriya | Blue Box - #5284 | 05:01 |
| Kenji Futakuchi | HAIKYUI! - #5272 | 05:01 |
| Mayano Top Gun | Umamusume: Pretty Der... | 05:01 |
| Ryousuke Kira | BLUE LOCK - #5288 | 05:01 |
| Thoma | The Promised Neverland ... | 05:01 |
| Bisca Mulan | Fairy Tail - #5317 | 05:02 |
| Chiaki Matsushi... | Classroom of the Elite - #... | 05:02 |
| Gilles de Rais | Fate/Zero - #5309 | 05:02 |
| Linie | Frieren: Beyond Journey’... | 05:02 |
| Taketora Yama... | HAIKYU!! - #5301 | 05:02 |
| lrumyuui | Made in Abyss - #5305 | 05:02 |
| Bug-Eyes | Vinland Saga - #5294 | 05:02 |
| Genau | Frieren: Beyond Journey’... | 05:02 |
| Jun Suzuki | K-ON! - #5318 | 05:02 |
| Lucky Roux | ONE PIECE - #5298 | 05:02 |
| Nao Toramaru | SAKAMOTO DAYS * #5314 | 05:02 |
| Narita Brian | Umamusume: Pretty Der... | 05:02 |
| Rom | Re:ZERO -Starting Life in... | 05:02 |
| Bellamy | ONE PIECE « #5315 | 05:02 |
| Kawamatsu | ONE PIECE « #5311 | 05:02 |
| Momoshiki Oots... | Naruto - #5303 | 05:02 |
| Stephen Loud | Death Note - #5307 | 05:02 |
| Umibouzu | Gintama * #5299 | 05:02 |
| Daphne | Re:ZERO -Starting Life in... | 05:02 |
| Enryu | Tower of God - #5312 | 05:02 |
| Godot | Berserk - #5308 | 05:02 |
| Saul Jaguar | ONE PIECE - #5316 | 05:02 |
| Tsubaki Shinra | High School DxD - #5368 | 05:02 |
| Badigaci | Mushoku Tensei: Jobless ... | 05:03 |
| Futoshi | DARLING in the FRANXX - #5 | 05:03 |
| Gotou | Hunter x Hunter - #5329 | 05:03 |
| Olivier | The Case Study of Vanita... | 05:03 |
| Shigeru Ookido | Pokémon * #5337 | 05:03 |
| Taylor Bartlett | Violet Evergarden * #5321 | 05:03 |
| Annerose Nicht... | The Eminence in Shadow ... | 05:03 |
| Black Lady | Sailor Moon - #5318 | 05:03 |
| Jirou | Kamisama Kiss - #5322 | 05:03 |
| Kaori Nakaseko | Sound! Euphonium - #5330 | 05:03 |
| Pony Tsunotori | My Hero Academia - #5326 | 05:03 |
| Sounosuke Izayoi | Danganronpa: The Anima... | 05:03 |
| Ann Magnolia | Violet Evergarden «#5323 | 05:03 |
| Helbram | The Seven Deadly Sins ° ... | 05:03 |
| Kagari Shiina | Steins;Gate * #5331 | 05:03 |
| Keiji Togashi | Aoashi - #5335 | 05:03 |
| Koji Kashin | Naruto - #5347 | 05:03 |
| Makeru Yadano | Komi Can’t Communicate - #! | 05:03 |
| Shija | Hell’s Paradise - #5327 | 05:03 |
| Helga | Vinland Saga - #5320 | 05:03 |
| Isao Shinomiya | Kaiju No. 8 - #5336 | 05:03 |
| Typhon | Re:ZERO -Starting Life in... | 05:03 |
| Wiper | ONE PIECE - #5324 | 05:03 |
| Yuri Egin | Blue Exorcist - #5328 | 05:03 |
| Yuuya Fungami | JoJo's Bizarre Adventure ... | 05:03 |
| Asu | Dorohedoro * #5345 | 05:04 |
| Badigadi | Mushoku Tensei: Jobless ... | 05:04 |
| Bickslow | Fairy Tail - #5365 | 05:04 |
| Lefiya Viridis | Is It Wrong to Try to Pick ... | 05:04 |
| Maiya Hisau | Fate/Zero - #5349 | 05:04 |
| Nina Tuoker | Fullmetal Alchemist - #5361 | 05:04 |
| Seoelia Dote | Mobile Suit Gundam - #5357 | 05:04 |
| Cardinal | Sword Art Online - #5366 | 05:04 |
| Hagumi Hanam... | March comes in like a lion... | 05:04 |
| Natsuo Todoroki | My Hero Academia - #5354 | 05:04 |
| Rikidou Satou | My Hero Academia - #5346 | 05:04 |
| Alicia Rue | Sword Art Online - #5351 | 05:04 |
| Kyoushiro Toudou | Code Geass: Lelouch of the F | 05:04 |
| Natsume | Pokémon * #5363 | 05:04 |
| Shuuichi Iguchi | My Hero Academia - #5367 | 05:04 |
| Sonoko Suzuki | Detective Conan - #5359 | 05:04 |
| Zenigame | Pokémon * #5355 | 05:04 |
| Fumiko Mifune | Chainsaw Man - #5368 | 05:04 |
| Nao Kashiwagi | Your lie in April - #5352 | 05:04 |
| Razor | Hunter x Hunter - #5344 | 05:04 |
| Ripperdoc | Cyberpunk: Edgerunners ... | 05:04 |
| Shuuichi Aizawa | Death Note - #53660 | 05:04 |
| Takamatsu | Angel Beats! - #5364 | 05:04 |
| You Shindou | My Hero Academia ‘ #5348 | 05:04 |
| Arue | KONOSUBA -God's blessi... | 05:05 |
| Brogy | ONE PIECE - #5369 | 05:05 |
| Cassim | Magi: The Labyrinth of M... | 05:05 |
| Gluttony | Fullmetal Alchemist - #53... | 05:05 |
| Hikage | Fire Force - #5373 | 05:05 |
| Rinnosuke Mitobe | Kuroko's Basketball - #53... | 05:05 |
| Riveria Ljos Alf | Is It Wrong to Try to Pick ... | 05:05 |
| Aechmea | Land of the Lustrous ~- #5... | 05:05 |
| Dorry | ONE PIECE - #5386 | 05:05 |
| Keel | The Rising of the Shield ... | 05:05 |
| Magellan | ONE PIECE - #5390 | 05:05 |
| Pesche Guatiche | Bleach - #5370 | 05:05 |
| Rietz Muses | As a Reincarnated Aristo... | 05:05 |
| Togepy | Pokémon - #5394 | 05:05 |
| Akane Sawatari | Chainsaw Man ‘ #5399 | 05:05 |
| Hayate Gekkou | Naruto - #5371 | 05:05 |
| Iguin | Witch Hat Atelier - #5375 | 05:05 |
| Kirito Kamui | PSYCHO-PASS - #5395 | 05:05 |
| Kliabautermann | ONE PIECE - #5391 | 05:05 |
| Leroute | Hunter x Hunter ‘ #5387 | 05:05 |
| Tao Pai Pai | Dragon Ball : #5379 | 05:05 |
| Vegapunk | ONE PIECE - #5383 | 05:05 |
| Jinpei Matsuda | Detective Conan * #5392 | 05:05 |
| Kaien Shiba | Bleach - #5384 | 05:05 |
| Raizen | Yu Yu Hakusho - #5388 | 05:05 |
| Run | Akame ga Kill! - #5380 | 05:05 |
| Amuryllis Asmo... | Welcome to Demon Scho... | 05:06 |
| Headon | Tower of God - #5409 | 05:06 |
| Hiroshi Agasa | Detective Conan - #5405 | 05:06 |
| Nene Kinokuni | Food Wars! - #5421 | 05:06 |
| Sakura Bakushii... | Umamusume: Pretty Der... | 05:06 |
| Satoshi Houjou | When They Cry - #5417 | 05:06 |
| Toichirou Suzuki | Mob Psycho 100 - #5397 | 05:06 |
| Azriel | No Game, No Life « #5410 | 05:06 |
| Lambda | The Eminence in Shadow ... | 05:06 |
| Moria Gecko | ONE PIECE - #5406 | 05:06 |
| Omoi | Naruto * #5418 | 05:06 |
| Raph | The Rising of the Shield ... | 05:06 |
| Yasuie Shimots... | ONE PIECE - #5398 | 05:06 |
| Ganju Shiba | Bleach - #5415 | 05:06 |
| Hinata | Fire Force ‘#5411 | 05:06 |
| Kiyo Terauohi | Demon Slayer: Kimetsu no Ya | 05:06 |
| Komaro Michino... | Even the Student Council... | 05:06 |
| Sig Curtis | Fullmetal Alchemist - #54... | 05:06 |
| Assault | Fire Force - #5424 | 05:06 |
| Hisashi Kinoshita | HAIKYU!! - #5426 | 05:06 |
| Holly Kuujou | JoJo's Bizarre Adventure ... | 05:06 |
| Mairu Orihara | Durarara!! - #5408 | 05:06 |
| Naho Takada | Demon Slayer: Kimetsu n... | 05:06 |
| Sayoko Shinozaki | Code Geass: Lelouch of the F | 05:06 |
| Sougetsu no Ky... | The Case Study of Vanita... | 05:06 |
| Yuzu Kurosaki | Bleach - #5404 | 05:06 |
| Alina Gray | Puella Magi Madoka Magi... | 05:07 |
| Evergreen | Fairy Tail - #5429 | 05:07 |
| Murata | Demon Slayer: Kimetsu n... | 05:07 |
| Rekka Hoshimiya | Fire Force - #5433 | 05:07 |
| Toshirou Kamiya | Foal Night - #5441 | 05:07 |
| Biwa Haychide | Umamusume: Pretty Der... | 05:07 |
| Ichiya Vandalay ... | Fairy Tail - #5430 | 05:07 |
| Kenichi Natsuki | Re:ZERO -Starting Life in... | 05:07 |
| Kururi Orihara | Durarara!! - #5446 | 05:07 |
| Lefter Frankland | Mobile Suit Gundam * #5422 | 05:07 |
| Liz | The Seven Deadly Sins - ... | 05:07 |
| Ellen Mira Mathers | Date A Live - #5431 | 05:07 |
| Franz Bonaparta | Monster - #5427 | 05:07 |
| Koto | Yu Yu Hakusho - #5443 | 05:07 |
| Lioita | Black Clover ‘ #5439 | 05:07 |
| Miroslava Hone... | Kakegurui - #5435 | 05:07 |
| Shyarty | ONE PIECE - #5419 | 05:07 |
| Aoko Nakamori | Detective Conan * #5444 | 05:07 |
| Gamatatsu | Naruto - #5428 | 05:07 |
| Jahad | Tower of God « #5432 | 05:07 |
| Mai Meido | The 100 Girlfriends Who Reall | 05:07 |
| Mika Shimotsuki | PSYCHO-PASS - #5448 | 05:07 |
| Zeno | Dragon Ball - #5436 | 05:07 |
| Akihiro Altiand | Mobile Suit Gundam - #5465 | 05:08 |
| Alaira | Witch Hat Atelier - #5449 | 05:08 |
| Baka Ki El Dogra | Hunter x Hunter * #5453 | 05:08 |
| Drake X. | ONE PIECE « #5445 | 05:08 |
| Gaburoon | Made in Abyss - #5473 | 05:08 |
| Ikumi Unagiya | Bleach - #5469 | 05:08 |
| Jircniv Rune Farrl... | Overlord - #5457 | 05:08 |
| Vincent Volaju | Cowboy Bebop - #5461 | 05:08 |
| Dagger | Black Butler - #5454 | 05:08 |
| Kudou Kishi | One-Punch Man - #5456 | 05:08 |
| Midnight | Fairy Tail - #5462 | 05:08 |
| Pilar | Cyberpunk: Edgerunners ... | 05:08 |
| Arthur | Code Geass: Lelouch of the F | 05:08 |
| Cheadle Yorkshire | Hunter x Hunter ‘ #5447 | 05:08 |
| Fortuna | Re:ZERO -Starting Life in... | 05:08 |
| Millianna | Fairy Tail - #5467 | 05:08 |
| Moeha Fujiwara | Kaguya-sama: Love is Wa... | 05:08 |
| S'yne Lokk | The Rising of the Shield Herc | 05:08 |
| Shinjurou Rengo... | Demon Slayer: Kimetsu n..- | 05:08 |
| Ars Louvent | As a Reincarnated Aristo... | 05:08 |
| Euclase | Land of the Lustrous - #5... | 05:08 |
| Jessica Randy | BANANA FISH : #5464 | 05:08 |
| Karaka | Tower of God - #5472 | 05:08 |
| Miori Mitou | Rascal Does Not Dream o... | 05:08 |
| Richard Braun | Monster «#5468 | 05:08 |
| Diota Striker | Umamusume: Pretty Derby * 7 | 05:09 |
| Jishuka | Overgeared - #5485 | 05:09 |
| Jouji Saiga | PSYCHO-PASS - #5481 | 05:09 |
| Olvia Nico | ONE PIECE - #5497 | 05:09 |
| Omega | The Eminence in Shadow - #5 | 05:09 |
| Vinoent Phantomhi | Black Butler - #5493 | 05:09 |
| iIkumi Unagiya | Bleach - #5469 | 05:09 |
| Amaterasu | Fire Force - #5474 | 05:09 |
| Joka | The Apothecary Diaries - ... | 05:09 |
| Judy | Cowboy Bebop «#5490 | 05:09 |
| Kouichi Kizakura | Danganronpa: The Anima... | 05:09 |
| Kuro | ONE PIECE - #5478 | 05:09 |
| Shuuichi Tsukc... | Sound! Euphonium - #5470 | 05:09 |
| Sumire Kanou | Toradora! * #5494 | 05:09 |
| Chuu | Yu Yu Hakusho - #5491 | 05:09 |
| Harumi Kiyama | A Certain Magical Index - #5¢ | 05:09 |
| Hata Ouji | Gintama « #5479 | 05:09 |
| Queen | ONE PIECE « #5483 | 05:09 |
| Trainer | Umamusume: Pretty Der... | 05:09 |
| Yoyoko Ootsuki | BOCCHI THE ROCK! - #5487 | 05:09 |
| Hanzou | Hunter x Hunter - #5496 | 05:09 |
| Julian Loki | BLUE LOCK - #5476 | 05:09 |
| Miiko | DAN DA DAN - #5488 | 05:09 |
| Riz | BEASTARS + #5484 | 05:09 |
| Scheherazade | Magi: The Labyrinth of M... | 05:09 |
| Yuri Koigakubo | Toradora! - #5492 | 05:09 |
| Anne | JoJo's Bizarre Adventure ... | 05:10 |
| Basil Hawkins | ONE PIECE - #55869 | 05:10 |
| Kale | Dragon Ball - #5505 | 05:10 |
| Keiji Mogami | Mob Psycho 100 - #5501 | 05:10 |
| Sumi Nakahara | Demon Slayer: Kimetsu n... | 05:10 |
| Alice Rondo | That Time !/ Got Reincarnatec | 05:10 |
| Bellion | Solo Leveling - #5506 | 05:10 |
| Eduahn Khun | Tower of God - #5502 | 05:10 |
| Lemon Yamabuki | Toilet-bound Hanako-kun... | 05:10 |
| Mayuko Shiraki | Fruits Basket - #5498 | 05:10 |
| Otohime | ONE PIECE - #5510 | 05:10 |
| Akira Otoishi | JoJo's Bizarre Adventure ... | 05:10 |
| Finn Deimne | Is It Wrong to Try to Pick ... | 05:10 |
| Jade | Land of the Lustrous - #5... | 05:10 |
| Oliver | The Promised Neverland - #5 | 05:10 |
| Su-Ho Seong | Solo Leveling - #5507 | 05:10 |
| Yahya | BEASTARS - #5515 | 05:10 |
| Yakumo Oomori | Tokyo Ghoul - #5511 | 05:10 |
| Antilene Fouche | Overlord - #5526 | 05:10 |
| Belo Betty | ONE PIECE - #5528 | 05:10 |
| Easthies | Witch Hat Atelier - #5504 | 05:10 |
| Frieda Reiss | Attack on Titan - #55660 | 05:10 |
| Ibara Obami | Kakegurui - #5516 | 05:10 |
| Kyoushirou | ONE PIECE - #5512 | 05:10 |
| Mamoru Akasaka | When They Cry - #5588 | 05:10 |
| Joy | Pokémon - #5537 | 05:11 |
| Kabigon | Pokémon * #5521 | 05:11 |
| Ken Sudou | Classroom of the Elite - #... | 05:11 |
| Lannion | The Promised Neverland ... | 05:11 |
| Mai Tsuzuki | NANA - #5549 | 05:11 |
| Norn Ace | Umamusume: Pretty Der... | 05:11 |
| Pokkle | Hunter x Hunter ‘#5525 | 05:11 |
| You Vei | Dr. STONE - #5529 | 05:11 |
| Chalk | Dr. STONE - #5530 | 05:11 |
| Diethard Ried | Code Geass: Lelouch of the F | 05:11 |
| Hawk Mama | The Seven Deadly Sins - ... | 05:11 |
| Aoshi Tokimitsu | BLUE LOCK - #5531 | 05:11 |
| Beloukas | The Rising of the Shield ... | 05:11 |
| Gedoumaru | Gintama - #5539 | 05:11 |
| Katen Kyoukotsu | Bleach - #5523 | 05:11 |
| Mahiru Seki | Call of the Night - #5535 | 05:11 |
| Onikiri | Kamisama Kiss ‘ #5551 | 05:11 |
| Makoto Kyogoku | Detective Conan - #5524 | 05:11 |
| Raditz | Dragon Ball - #5536 | 05:11 |
| Robin Balse | Welcome to Demon Scho... | 05:11 |
| Ruka Rengoku | Demon Slayer: Kimetsu n... | 05:11 |
| Charles Grey | Black Butler - #5569 | 05:12 |
| Free | Soul Eater - #5565 | 05:12 |
| Gunko Manmayer | ONE PIECE - #5561 | 05:12 |
| Gyouza Otoko | Dorohedoro * #5553. | 05:12 |
| Sarah Kazuno | Love Live! School Idol Pr... | 05:12 |
| Chouchou Akinii... | Naruto * #5554 | 05:12 |
| Kouji Haruta | Toradora! - #5556 | 05:12 |
| Seijuro Yoshioka | Vagabond - #5566 | 05:12 |
| Toko | ONE PIECE - #5558 | 05:12 |
| Chi-Yul Song | Solo Leveling - #5559 | 05:12 |
| Ittousai Itou | Vagabond - #5567 | 05:12 |
| Masamune Izumi | Eromanga Sensei - #5571 | 05:12 |
| Sayu Yagami | Death Note - #5563 | 05:12 |
| Tenkaichi Budok... | Dragon Ball - #5547 | 05:12 |
| Yuriko Nishimotouir | Kakegurui - #5555 | 05:12 |
| Ayshe | The Promised Neverland ... | 05:12 |
| Bundus Begalkeit | Gachiakuta - #5560 | 05:12 |
| Kaya | ONE PIECE - #5564 | 05:12 |
| Rebecca Scarlet | Black Clover - #5556 | 05:12 |
| Rudy-Ulrich Gillen | Monster - #5548 | 05:12 |
| Someji Kawamo... | March comes in like a lion... | 05:12 |
| Adiane | Gurren Lagann - #5577 | 05:13 |
| Botan | Clannad - #5589 | 05:13 |
| Donovan | Berserk «#5597 | 05:13 |
| Fushigidane | Pokémon * #5573 | 05:13 |
| Juzo Megure | Detective Conan - #5593 | 05:13 |
| Mariella | Black Clover - #5581 | 05:13 |
| Nanase Nijirou | BLUE LOCK - #5585 | 05:13 |
| Baraggan Louis... | Bleach - #5578 | 05:13 |
| Cthoni Andor | Gachiakuta - #5590 | 05:13 |
| Dante | The Case Study of Vanita... | 05:13 |
| Kie Kamado | Demon Slayer: Kimetsu n... | 05:13 |
| Kouta Izumi | My Hero Academia * #5582 | 05:13 |
| Mikhail | The Case Study of Vanita... | 05:13 |
| Akinori Konoha | HAIKYUI!! - #5583 | 05:13 |
| Hitogami | Mushoku Tensei: Jobless ... | 05:13 |
| Kai | Dorohedoro - #5595 | 05:13 |
| Leysritt | Fate/Zero - #5579 | 05:13 |
| Minami no Yuus... | Frieren: Beyond Journey’... | 05:13 |
| Nakime | Demon Slayer: Kimetsu no Ya | 05:13 |
| Sumire Akane | Toilet-bound Hanako-kun... | 05:13 |
| Zagred | Black Clover - #5663 | 05:13 |
| Erza Knightwailk... | Fairy Tail - #5580 | 05:13 |
| Jigorou Kuwaiji... | Demon Slayer: Kimetsu n... | 05:13 |
| Nika Nanaura | Mobile Suit Gundam - #5576 | 05:13 |
| Thirteen | My Hero Academia ‘ #5660 | 05:13 |
| Thorgil | Vinland Saga * #5596 | 05:13 |
| Umehito Nekoza... | Ouran High School Host ... | 05:13 |
| Velzard | That Time !/ Got Reincarnatec | 05:13 |
| Charles Chevalier | BLUE LOCK - #5621 | 05:14 |
| Kohzou Fuyutsuki | Neon Genesis Evangelion - #6 | 05:14 |
| Lucy Ashley | Fairy Tail - #5613 | 05:14 |
| Mikoto Uohiha | Naruto - #5669 | 05:14 |
| Purin | Pokémon * #5661 | 05:14 |
| Rena Mmami | Puella Magi Madoka Magi... | 05:14 |
| Gohan Son | Dragon Ball - #5606 | 05:14 |
| Guren | Naruto * #5626 | 05:14 |
| Kurotsuchi | Naruto - #5616 | 05:14 |
| Morgans | ONE PIECE - #5598 | 05:14 |
| Sphintus Carmen | Magi: The Labyrinth of M... | 05:14 |
| Takuya Oohara | TONIKAWA: Over The Mo... | 05:14 |
| Baise | Hunter x Hunter - #5611 | 05:14 |
| Galand | The Seven Deadly Sins ° ... | 05:14 |
| Naoko Natsuki | Re:ZERO -Starting Life in... | 05:14 |
| Nova | Bleach - #5623 | 05:14 |
| Piccolo Daimaou | Dragon Ball - #5667 | 05:14 |
| Sadi-chan | ONE PIECE « #5627 | 05:14 |
| Black Hayate | Fullmetal Alchemist * #56... | 05:14 |
| Cheetu | Hunter x Hunter - #5612 | 05:14 |
| Drocell Cainz | Black Butler - #5608 | 05:14 |
| Natsuki | Dorohedoro - #5628 | 05:14 |
| Tolka no Shishou | Chainsaw Man - #5604 | 05:14 |
| Yu-Ra | Overgeared - #5626 | 05:14 |
| Doll | ONE PIECE - #5641 | 05:15 |
| Fanzell Kruger | Black Clover - #5645 | 05:15 |
| Inei Houzouin | Vagabond * #5637 | 05:15 |
| Kaijin | That Time / Got Reincarn... | 05:15 |
| Nagi Yoshino | JUJUTSU KAISEN - #5633 | 05:15 |
| Sakura Kasugano | TONIKAWA: Over The Mo... | 05:15 |
| Chiyo | Naruto - #5634 | 05:15 |
| Inaho Yamato | Kakegurui - #5638 | 05:15 |
| Issei Matsukawa | HAIKYUI!! - #5630 | 05:15 |
| Langris Vaude | Black Clover - #5646 | 05:15 |
| Sagwan | BEASTARS - #5658 | 05:15 |
| Anya Frome! | Is It Wrong to Try to Pick Up | 05:15 |
| Kaname Oogi | Code Geass: Lelouch of the F | 05:15 |
| Ryuunosuke Ury... | Fate/Zero - #5635 | 05:15 |
| Vados | Dragon Ball - #5647 | 05:15 |
| Wasuke Itadori | JUJUTSU KAISEN - #5639 | 05:15 |
| Andy Von de Ori... | Cowboy Bebop « #5636 | 05:15 |
| David Hockney | Tower of God « #5652 | 05:15 |
| Indra Ootsutsuki | Naruto * #56486 | 05:15 |
| Shisuto Naruse | Komi Cant Communicate... | 05:15 |
| Trisha Elric | Fullmetal Alchemist - #56... | 05:15 |
| isanari Vesugi | The Quintessential Quint... | 05:15 |
| Eliza Shimizu | BOCCHI THE ROCK! - #5657 | 05:16 |
| Enji Koma | Tokyo Ghoul - #5665 | 05:16 |
| Kairyu | Pokémon * #5649 | 05:16 |
| Leslie | The Promised Neverland ... | 05:16 |
| Mukuro | Yu Yu Hakusho - #5661 | 05:16 |
| Sakura Chiyono O | Umamusume: Pretty Derby ° 3 | 05:16 |
| Chikage Rokujo | Durarara!! - #5678 | 05:16 |
| Gretel | Black Lagoon - #5662 | 05:16 |
| Mejiro Palmer | Umamusume: Pretty Der... | 05:16 |
| Rin Sawaki | DAN DA DAN - #5670 | 05:16 |
| Shidoh | Death Note - #5674 | 05:16 |
| Yomiko Hourai | Fool Night - #5658 | 05:16 |
| Albert Yamada | Classroom of the Elite - #... | 05:16 |
| Baylord Yama | Tower of God - #5651 | 05:16 |
| Cain Blood | BANANA FISH - #5667 | 05:16 |
| Juvia (Edolas) | Fairy Tail - #5679 | 05:16 |
| Lahan | The Apothecary Diaries - ... | 05:16 |
| Vivian Hugo | BLUE LOCK - #5671 | 05:16 |
| Yugao Uzuki | Naruto - #5675 | 05:16 |
| iIsma | Berserk - #5663 | 05:16 |
| Jenny Realight | Fairy Tail - #5664 | 05:16 |
| Kitsune no Aku... | Chainsaw Man - #5656 | 05:16 |
| Kokepii | Chainsaw Man - #5668 | 05:16 |
| Raye Penber | Death Note - #56660 | 05:16 |
| Taii | Hellsing - #5672 | 05:16 |
| Amethyst 84 | Land of the Lustrous - #5... | 05:17 |
| Episode | Bakemonogatari - #5693 | 05:17 |
| Junsa | Pokémon * #5677 | 05:17 |
| Matsukaze | Dr. STONE - #5685 | 05:17 |
| Reiji Namikawa | Death Note - #5673 | 05:17 |
| Shigure Yukimi | Seraph of the End: Vampire F | 05:17 |
| Umigame | Dragon Ball - #5689 | 05:17 |
| Amane Ubuyash... | Demon Slayer: Kimetsu n... | 05:17 |
| August Ruthven | The Case Study of Vanita... | 05:17 |
| Franxx Hakase | DARLING in the FRANXX - #5 | 05:17 |
| Irvine | Berserk - #5690 | 05:17 |
| Mozu | Dr. STONE * #5682 | 05:17 |
| Souna Shitori | High School DxD - #5694 | 05:17 |
| Alexandra Garcia | Kuroko's Basketball - #56... | 05:17 |
| Electra Ovilo | Cowboy Bebop - #5691 | 05:17 |
| Lolopechka | Black Clover - #5683 | 05:17 |
| Shinki | Naruto - #5699 | 05:17 |
| Tomme Mima | Gachiakuta - #5687 | 05:17 |
| A | Naruto - #5676 | 05:17 |
| Gold City | Umamusume: Pretty Der... | 05:17 |
| Jou Kitahara | Umamusume: Pretty Der... | 05:17 |
| Ken Masters | TONIKAWA: Over The Mo... | 05:17 |
| Suirou | Kamisama Kiss - #5700 | 05:17 |
| Sukuyo Mankan... | Kill la Kill - #5680 | 05:17 |
| Aiho Yomikawa | A Certain Magical Index - ... | 05:18 |
| Cyan Sung-Sun | Bleach - #5717 | 05:18 |
| Majikaja | Made in Abyss - #5765 | 05:18 |
| Naobito Zenin | JUJUTSU KAISEN - #5713 | 05:18 |
| Rei Todoroki | My Hero Academia - #5701 | 05:18 |
| Sonans | Pokémon * #5725 | 05:18 |
| Sou Inuoka | HAIKYUI! - #5709 | 05:18 |
| Bubbles | Dragon Ball - #5730 | 05:18 |
| Johnny | ONE PIECE - #5706 | 05:18 |
| Tanji Washijou | HAIKYUI!! - #5710 | 05:18 |
| Yukinari Ookido | Pokémon - #5718 | 05:18 |
| Yuutarou Kinddai... | HAIKYUI! - #5722 | 05:18 |
| Hishi Amazon | Umamusume: Pretty Der... | 05:18 |
| Ito Nishimiya | A Silent Voice - #5723 | 05:18 |
| Juugo | Naruto - #5715 | 05:18 |
| Kotetsu Hagane | Naruto - #5707 | 05:18 |
| Sandersonia Boa | ONE PIECE - #5719 | 05:18 |
| Steven Steel | STEEL BALL RUN JoJo's ... | 05:18 |
| Tae-Shik Kang | Solo Leveling - #5703 | 05:18 |
| Alvida | ONE PIECE - #5728 | 05:18 |
| Cindry Victoria | ONE PIECE - #5716 | 05:18 |
| Code | Naruto * #5704 | 05:18 |
| Ju Fa | Hell’s Paradise - #5712 | 05:18 |
| Ryuuou Sukuna | Kamisama Kiss - #5708 | 05:18 |
| Satan | Blue Exorcist - #5732 | 05:18 |
| Tom | ONE PIECE - #5720 | 05:18 |
| Touch Me | Overlord «#5724 | 05:18 |
| Higashi no Kaiou... | Dragon Ball - #5729 | 05:19 |
| Inazuma | ONE PIECE - #5737 | 05:19 |
| Kaoruko Awata | My Hero Academia - #5745 | 05:19 |
| Megu Kataoka | Assassination Classroom * #5 | 05:19 |
| Yuki Sumi | OSHI NO KO: #5749 | 05:19 |
| Zera | Fairy Tail - #5733 | 05:19 |
| Arakuremono | KONOSUBA -God's blessi... | 05:19 |
| Hana Sakamoto | SAKAMOTO DAYS - #57586 | 05:19 |
| Mizuki Akabaya... | Durarara!! - #5738 | 05:19 |
| Prinz | Chainsaw Man - #5746 | 05:19 |
| Shinigami-sama | Toilet-bound Hanako-kun... | 05:19 |
| Sugar | ONE PIECE - #5742 | 05:19 |
| Howard Lovecra... | Bungo Stray Dogs - #5755 | 05:19 |
| Karion | That Time / Got Reincarn... | 05:19 |
| Kumagoro Saiki | The Disastrous Life of Sa... | 05:19 |
| Mr. C.B. | Umamusume: Pretty Derby ° ; | 05:19 |
| Rokari Migurdia | Mushoku Tensei: Jobless Reir | 05:19 |
| Ryuurou Hirotsu | Bungo Stray Dogs - #5735 | 05:19 |
| Seiri Fukiyose | A Certain Magical Index » #57 | 05:19 |
| Bones | BANANA FISH « #5736 | 05:19 |
| Chou Koukou Ky... | Danganronpa: The Anima... | 05:19 |
| Leon Cromwell | That Time ! Got Reincarn... | 05:19 |
| Mun-Deok Son | Yona of the Dawn - #5756 | 05:19 |
| Shinji Matou | Fate/Zero ‘#5752 | 05:19 |
| Welfin | Hunter x Hunter - #5746 | 05:19 |
| Ayako Mitsuzuri | Fate/Zero - #5765 | 05:20 |
| Bill | BEASTARS - #5773 | 05:20 |
| Hagoromo Oots... | Naruto - #5753 | 05:20 |
| Munehisa Iwai | PERSONAS the Animatio... | 05:20 |
| Rabo | Noragami - #5769 | 05:20 |
| Zoisite | Sailor Moon - #5761 | 05:20 |
| Don Kan'onji | Bleach - #5762 | 05:20 |
| Fohl | The Rising of the Shield ... | 05:20 |
| Hyourinmaru | Bleach - #5782 | 05:20 |
| Konekomaru Mi... | Blue Exorcist - #5766 | 05:20 |
| Ragnar | Vinland Saga - #5754 | 05:20 |
| Syiph | Black Clover - #5770 | 05:20 |
| Conis | ONE PIECE - #5763 | 05:20 |
| Junko Kaname | Puella Magi Madoka Magica - | 05:20 |
| Puu | Yu Yu Hakusho - #5779 | 05:20 |
| Rigur | That Time / Got Reincarn... | 05:20 |
| Toyomi Fujiwara | Kaguya-sama: Love is Wa... | 05:20 |
| ikumi Akagi | Rascal Does Not Dream o... | 05:20 |
| Deeno | That Time ! Got Reincarn... | 05:20 |
| Franceska Mila... | Bleach - #5780 | 05:20 |
| Hina Ebina | My Teen Romantic Come... | 05:20 |
| Kiyal Bachika | Gurren Lagann * #5760 | 05:20 |
| Nae Tennouji | Steins:Gate - #5784 | 05:20 |
| Narita Taishin | Umamusume: Pretty Der... | 05:20 |
| Queen Serenity | Sailor Moon «- #5764 | 05:20 |
| Corkus | Berserk - #5777 | 05:21 |
| Makoto Hanami... | Kuroko's Basketball - #57... | 05:21 |
| Shiida | Welcome to Demon Scho... | 05:21 |
| Shinji Nishiya | My Hero Academia - #5789 | 05:21 |
| Taka-tin | Gintama - #5781 | 05:21 |
| Zeus | ONE PIECE « #5797 | 05:21 |
| Garam Jahad | Tower of God - #5796 | 05:21 |
| Naaza Erisuis | Is It Wrong to Try to Pick ... | 05:21 |
| Roberto | Monster - #5778 | 05:21 |
| Ryouko Fueguchi | Tokyo Ghoul - #5786 | 05:21 |
| Yuuyoku no Shishi | Delicious in Dungeon - #5... | 05:21 |
| Emi | Mob Psycho 100 - #5803 | 05:21 |
| Lilynette Gingerbat | Bleach - #5799 | 05:21 |
| Magma | Dr. STONE - #5791 | 05:21 |
| Mii Konori | A Certain Magical Index ° ... | 05:21 |
| Olmar | Vinland Saga - #5795 | 05:21 |
| Snipe | My Hero Academia - #5807 | 05:21 |
| Yui Kanakura | Nisekoi - #5787 | 05:21 |
| Inuarashi | ONE PIECE - #5788 | 05:21 |
| Justine | PERSONAS the Animatio... | 05:21 |
| No.665 | The Eminence in Shadow ... | 05:21 |
| Rinsha | Delicious in Dungeon - #5804 | 05:21 |
| Veronica Liones | The Seven Deadly Sins - ... | 05:21 |
| Fenshen | The Apothecary Diaries - #58 | 05:22 |
| Johann | The Case Study of Vanita... | 05:22 |
| Kyousuke Irie | When They Cry - #5813 | 05:22 |
| Miki Kawai | A Silent Voice - #5821 | 05:22 |
| Rumia Uru | Kakegurui - #5805 | 05:22 |
| Ryokan Kurita | Eyeshield 21 - #5833 | 05:22 |
| Sid Barrett | Soul Eater ‘ #5817 | 05:22 |
| Tae-Jun Kan | Yona of the Dawn - #5861 | 05:22 |
| Toshirou Nakam... | Delicious in Dungeon - #5... | 05:22 |
| Leo | ONE PIECE - #5862 | 05:22 |
| Selka Zuberg | Sword Art Online - #5822 | 05:22 |
| Smoothie Charl... | ONE PIECE - #5826 | 05:22 |
| Stoltz | Frieren: Beyond Journey’... | 05:22 |
| Tonpa | Hunter x Hunter - #5818 | 05:22 |
| Yasopp | ONE PIECE - #5814 | 05:22 |
| Liltotto Lamperd | Bleach - #5831 | 05:22 |
| Nao Sadatsuka | Food Wars! - #5827 | 05:22 |
| Nozomi Kujo | Bleach - #5819 | 05:22 |
| Saguru Hakuba | Detective Conan - #5815 | 05:22 |
| Shou Tucker | Fullmetal Alchemist - #58... | 05:22 |
| Sora Vinsmoke | ONE PIECE - #5823 | 05:22 |
| Caroline | PERSONAS the Animatio... | 05:22 |
| Genzo | ONE PIECE - #5812 | 05:22 |
| Mira Nygus | Soul Eater - #5816 | 05:22 |
| Motojirou Kaijii | Bungo Stray Dogs - #5820 | 05:22 |
| Motoyasu Kita... | The Rising of the Shield ... | 05:22 |
| Srajo | Made in Abyss - #5808 | 05:22 |
| Amaryllis | Dr. STONE - #5857 | 05:23 |
| Saki Kamisato | Rascal Does Not Dream of Bu | 05:23 |
| Shamil Volkov | Dr. STONE - #5841 | 05:23 |
| Yaeno Muteki | Umamusume: Pretty Der... | 05:23 |
| Zenji Marui | Food Wars! - #5849 | 05:23 |
| Asaemon Ikeda | Gintama - #5842 | 05:23 |
| Mayu | Noragami « #5850 | 05:23 |
| Nao Serizawa | Free! -Ilwatobi Swim Club... | 05:23 |
| Olivier | The Eminence in Shadow ... | 05:23 |
| Oob | Dragon Ball - #5834 | 05:23 |
| Rin Obami | Kakegurui - #5838 | 05:23 |
| Yukina | Yu Yu Hakusho - #5846 | 05:23 |
| Akane Tachibana | Classroom of the Elite - #... | 05:23 |
| Byeong-Gu Min | Solo Leveling * #5839 | 05:23 |
| Dimaria Yesta | Fairy Tail - #5851 | 05:23 |
| Galdino | ONE PIECE - #5847 | 05:23 |
| Koji Yatake | given * #5855 | 05:23 |
| Oonoki | Naruto - #5835 | 05:23 |
| Cithis | Delicious in Dungeon - #5... | 05:23 |
| Ginyu | Dragon Ball - #5848 | 05:23 |
| Kai | The Eminence in Shadow ... | 05:23 |
| Lionel Messi | BLUE LOCK - #5832 | 05:23 |
| Liz | My Dress-Up Darling - #5... | 05:23 |
| Chougoukin Kur... | One-Punch Man - #5853 | 05:24 |
| Gyro | Hunter x Hunter * #5869 | 05:24 |
| Kiyoh Baohika | Gurren Lagann - #5861 | 05:24 |
| Prospera Meroury | Mobile Suit Gundam - #5873 | 05:24 |
| QGarma Zabi | Mobile Suit Gundam - #5881 | 05:24 |
| Saeko Kanaeno | Fool Night - #5877 | 05:24 |
| Shiori Kitahara | Grand Blue Dreaming - #... | 05:24 |
| Alexis Leskinen | Steins:Gate - #5866 | 05:24 |
| Chie Hoshinomiya | Classroom of the Elite - #587 | 05:24 |
| Meninas MoAlion | Bleach - #5874 | 05:24 |
| Miniskirt Santa | Rascal Does Not Dream o... | 05:24 |
| Nao Serizawa | Free! -lwatobi Swim Club... | 05:24 |
| Oriana Thomson | A Certain Magical Index - ... | 05:24 |
| Serena Rinnen | Tower of God - #5854 | 05:24 |
| Takaaki Morofu... | Detective Conan * #5862 | 05:24 |
| Kyouhei Kannazuki | Date A Live - #5883 | 05:24 |
| Marianne | ONE PIECE - #5879 | 05:24 |
| Rin Shinonome | Kaiju No. 8- #5875 | 05:24 |
| Shimaru Saitou | Gintama * #5863 | 05:24 |
| Slader | The Seven Deadly Sins ° ... | 05:24 |
| Traumerei Lo Po ... | Tower of God - #5859 | 05:24 |
| Yvette | The Promised Neverland - #5 | 05:24 |
| Foxy | ONE PIECE - #5880 | 05:24 |
| Karasu Shoujo | OSHI NO KO - #5876 | 05:24 |
| Kyougai | Demon Slayer: Kimetsu n... | 05:24 |
| Lakyus Alvein D... | Overlord - #5884 | 05:24 |
| Noel Noa | BLUE LOCK - #5872 | 05:24 |
| Wolbach | KONOSUBA -God's blessi... | 05:24 |
| Garma Zabi | Mobile Suit Gundam - #5881 | 05:25 |
| Layla Heartfilia | Fairy Tail - #5901 | 05:25 |
| Suzie Stolas | Welcome to Demon Scho... | 05:25 |
| Ventrioosus | Land of the Lustrous - #590$ | 05:25 |
| Yuuko | Chainsaw Man - #5897 | 05:25 |
| Zhigang Liu | Solo Leveling - #5893 | 05:25 |
| itsuki Kawasumi | The Rising of the Shield ... | 05:25 |
| Jigen | Naruto - #5918 | 05:25 |
| Kiga no Akuma | Chainsaw Man - #5898 | 05:25 |
| Kyousuke Muna... | Danganronpa: The Anima... | 05:25 |
| Romiere Ronove | Welcome to Demon Scho... | 05:25 |
| Scopper Gaban | ONE PIECE - #5894 | 05:25 |
| Tsugumi Harudori | Soul Eater - #5902 | 05:25 |
| Evankhell | Tower of God - #5911 | 05:25 |
| Griamor | The Seven Deadly Sins ° ... | 05:25 |
| Mei-Yu Wang | Classroom of the Elite - #... | 05:25 |
| Nobunobu Hitot... | Gintama - #5891 | 05:25 |
| Taketo Aida | Miss Kobayashi’s Dragon ... | 05:25 |
| Wrath | Fullmetal Alchemist - #58... | 05:25 |
| Yukio Hans Vora... | Bleach - #5903 | 05:25 |
| Evan Edrok | Tower of God - #5888 | 05:25 |
| Ganesha | Is It Wrong to Try to Pick ... | 05:25 |
| Gouki | TONIKAWA: Over The Mo... | 05:25 |
| Ricardo Welkin | Re:ZERO -Starting Life in... | 05:25 |
| Subaru Mimasa... | Food Wars! - #5908 | 05:25 |
| Taiki Himekawa | OSHI NO KO - #5896 | 05:25 |
| Yuuna Okuyama | Horimiya - #5904 | 05:25 |
| Michiyo Gotou | BOCCHI THE ROCK! - #5921 | 05:26 |
| Miyoko Houjou | Food Wars! - #5913 | 05:26 |
| Morda | Berserk - #5917 | 05:26 |
| Usamaro | Blue Exorcist - #5905 | 05:26 |
| Yosaku | ONE PIECE - #5925 | 05:26 |
| Kami | Dragon Ball - #5926 | 05:26 |
| Tiara Minamoto | Toilet-bound Hanako-kun... | 05:26 |
| Zazie | The Promised Neverland ... | 05:26 |
| Jun Asari-Marchs | Aoashi - #5919 | 05:26 |
| Momoa Rukel | Gachiakuta - #5923 | 05:26 |
| Pedro | A Silent Voice - #5935 | 05:26 |
| Porohe | ONE PIECE - #5927 | 05:26 |
| Yokoo | Toilet-bound Hanako-kun... | 05:26 |
| Arisa | Call of the Night - #5926 | 05:26 |
| Chie Hori | Tokyo Ghoul - #5932 | 05:26 |
| Heinkel Wolfe | Hellsing * #5924 | 05:26 |
| Mohmoo | ONE PIECE - #5928 | 05:26 |
| Subaru Mimasc... | Food Wars! - #5908 | 05:26 |
| Amida Aroa | Mobile Suit Gundam - #5957 | 05:27 |
| Ayame | Naruto - #5949 | 05:27 |
| Azami Nakiri | Food Wars! ‘#5961 | 05:27 |
| Elise | Bungo Stray Dogs ‘ #5937 | 05:27 |
| Hannah Anafeloz | Black Butler - #5953 | 05:27 |
| Marc Snuffy | BLUE LOCK - #5945 | 05:27 |
| Marx Francois | Black Clover - #5933 | 05:27 |
| Sakumo Hatake | Naruto - #5929 | 05:27 |
| Yami no Akuma | Chainsaw Man «#5941 | 05:27 |
| Chatllia Bull | Mobile Suit Gundam + #5946 | 05:27 |
| Masumi Kamuro | Classroom of the Elite - #... | 05:27 |
| Naomasa Tsuka... | My Hero Academia * #5958 | 05:27 |
| Rosine | Berserk - #5950 | 05:27 |
| Yoriko Kichijouji | OSHI NO KO - #5942 | 05:27 |
| Youm Farmenas | That Time / Got Reincarn... | 05:27 |
| Yuki Amane | Steins:Gate - #5954 | 05:27 |
| Jodie Starling | Detective Conan - #5951 | 05:27 |
| Kacdlomon Risch | Re:ZERO -Starting Life in... | 05:27 |
| Lavenza | PERSONAS the Animatio... | 05:27 |
| Nemu Takara | Blue Exorcist - #5931 | 05:27 |
| Rosé Tomas | Fullmetal Alchemist - #5947 | 05:27 |
| Sayuri Hanayori | Seraph of the End: Vampire f | 05:27 |
| Takemikazuchi | Noragami - #5963 | 05:27 |
| Yuu Haibara | JUJUTSU KAISEN - #5943 | 05:27 |
| Gina | Solo Leveling - #5940 | 05:27 |
| Giriko | Soul Eater - #5948 | 05:27 |
| Karen Kino | Kaguya-sama: Love is Wa... | 05:27 |
| Kasuka Heiwaiji... | Durarara!! - #5952 | 05:27 |
| Satoru Yotsumu... | SAKAMOTO DAYS - #5944 | 05:27 |
| Takahiro Hanam... | HAIKYUI!! - #5936 | 05:27 |
| Baruka | Solo Leveling - #5965 | 05:28 |
| Lacus Welt | Seraph of the End: Vampi... | 05:28 |
| Matako Kijima | Gintama - #5969 | 05:28 |
| Naze Turbine | Mobile Suit Gundam - #5977 | 05:28 |
| Thirteen | Dorohedoro « #5973 | 05:28 |
| Hansel | Black Lagoon - #5970 | 05:28 |
| Jouichirou Kaiji | SAKAMOTO DAYS : #5986 | 05:28 |
| Lin Lin | One-Punch Man - #5962 | 05:28 |
| Matarou Manka... | Kill la Kill - #5974 | 05:28 |
| Nazuna Asahina | Classroom of the Elite - #596 | 05:28 |
| Yusuke Sakurai | Mob Psycho 100 - #5978 | 05:28 |
| Haruna | That Time / Got Reincarn... | 05:28 |
| Lerohe | 86 EIGHTY-SIX - #5967 | 05:28 |
| Sayuri Hanayori | Seraph of the End: Vampire I | 05:28 |
| Tokiomi Toosaka | Fate/Zero - #5971 | 05:28 |
| Tomoe Takasago | Eromanga Sensei ‘ #5975 | 05:28 |
| Gyokuen Ren | Magi: The Labyrinth of M... | 05:28 |
| Kiku Hoshimi | Call of the Night - #5984 | 05:28 |
| Makoto Tsukada | The Fragrant Flower Bloo... | 05:28 |
| Pilaf | Dragon Ball - #5988 | 05:28 |
| Psykos | One-Punch Man: #5964 | 05:28 |
| Ritsu | Fire Force - #5980 | 05:28 |
| Shunichi Ibe | BANANA FISH « #5976 | 05:28 |
| Yuiyui | KONOSUBA -God's blessi... | 05:28 |
| Anri Kaido | Aoashi - #5985 | 05:29 |
| Cirucci Thunder... | Bleach - #5989 | 05:29 |
| Cristiano Ronaldo | BLUE LOCK - #6801 | 05:29 |
| Hinahoho | Magi: The Labyrinth of M... | 05:29 |
| Loly Aivirrne | Bleach - #6005 | 05:29 |
| Nifa | Attack on Titan - #5997 | 05:29 |
| Sode no Shirayuki | Bleach - #6869 | 05:29 |
| Ebisu | Naruto - #5998 | 05:29 |
| Goemon Garp | Welcome to Demon Scho... | 05:29 |
| Gonbe | ONE PIECE - #6006 | 05:29 |
| Jouichirou Kaji | SAKAMOTO DAYS - #5986 | 05:29 |
| Kuzuha Togashi | Love, Chunibyo & Other ... | 05:29 |
| Yasufumi Neko... | HAIKYUI!! - #5994 | 05:29 |
| Dondochakka Bi... | Bleach - #6003 | 05:29 |
| Izumo Kamizuki | Naruto - #5991 | 05:29 |
| Neon Nikaidou | My Dress-Up Darling - #5983 | 05:29 |
| Rumi Tsurumi | My Teen Romantic Come... | 05:29 |
| Santana | JoJo's Bizarre Adventure ... | 05:29 |
| Shigeru Aoba | Neon Genesis Evangelion - #§ | 05:29 |
| Shougo Itaya | given - #5999 | 05:29 |
| Asako Hague | Fire Force - #6000 | 05:29 |
| Denshichirou Yo... | Vagabond - #6004 | 05:29 |
| Yagura | Naruto - #6008 | 05:29 |
| Yui Michimiya | HAIKYUI!! - #6012 | 05:29 |
| Danzou Shimura | Naruto - #6033 | 05:30 |
| Gi-Gang | Yona of the Dawn - #6021 | 05:30 |
| Hina | Hunter x Hunter - #6813 | 05:30 |
| Jin Kiyora | BLUE LOCK - #66025 | 05:30 |
| Laplace | That Time / Got Reincarn... | 05:30 |
| Miho Amakata | Free! -lwatobi Swim Club- - # | 05:30 |
| Tsuu Terakado | Gintama - #6029 | 05:30 |
| Collot | BEASTARS - #6622 | 05:30 |
| Kanae Tawata | Solo Leveling - #6026 | 05:30 |
| Kimi Nishino | Tokyo Ghoul - #6038 | 05:30 |
| Silat | Berserk - #6030 | 05:30 |
| Aleister Chamber | Black Butler - #6031 | 05:30 |
| Aoba Kuronuma | Durarara!! - #6035 | 05:30 |
| Ectoplasm | My Hero Academia - #6019 | 05:30 |
| Mao | Code Geass: Lelouch of the F | 05:30 |
| Pina | Sword Art Online - #6023 | 05:30 |
| Seilah | Fairy Tail - #6015 | 05:30 |
| Tatsuyuki Misumi | March comes in like a lion... | 05:30 |
| Yuri Dreyar | Fairy Tail - #6039 | 05:30 |
| Danny | JoJo's Bizarre Adventure ... | 05:30 |
| Mary Kenwood | Death Note - #6028 | 05:30 |
| Straits | JoJo's Bizarre Adventure ... | 05:30 |
| Tae-Yeon | Yona of the Dawn - #6620 | 05:30 |
| Yuuki Kaguraza... | That Time ! Got Reincarn... | 05:30 |
| Aoier Silva | Black Clover - #6061 | 05:31 |
| Bo-Ra Lee | Solo Leveling - #6053 | 05:31 |
| Hyou | SAKAMOTO DAYS - #6849 | 05:31 |
| Kiriya Ubuyashiki | Demon Slayer: Kimetsu n... | 05:31 |
| Zanac Valleon Ig... | Overlord - #6041 | 05:31 |
| Bra | Dragon Ball - #6054 | 05:31 |
| Hanako | Pokémon - #6034 | 05:31 |
| Ishilly | ONE PIECE - #6058 | 05:31 |
| Mai no Haha | Rascal Does Not Dream o... | 05:31 |
| Naoki Gotou | BOCCHI THE ROCK! - #6... | 05:31 |
| Shihai Kuroiro | My Hero Academia * #6046 | 05:31 |
| Tooru Kishiri | Fire Force - #6062 | 05:31 |
| Aphelandra | ONE PIECE : #6655 | 05:31 |
| Forever | JoJo's Bizarre Adventure ... | 05:31 |
| Gardar | Vinland Saga - #6051 | 05:31 |
| Koala | Hunter x Hunter ‘ #6059 | 05:31 |
| Noguchi Eisaku | March comes in like a lion... | 05:31 |
| Perugius Dola | Mushoku Tensei: Jobless ... | 05:31 |
| Beldia | KONOSUBA -God's blessi... | 05:31 |
| Crusch Lulu | Overlord - #6046 | 05:31 |
| Heaven Canceler | A Certain Magical Index - ... | 05:31 |
| Mozgus | Berserk - #6036 | 05:31 |
| Ruruka Andou | Danganronpa: The Anima... | 05:31 |
| Ryouhei Hayashi | Tokyo Revengers - #6048 | 05:31 |
| Aocier Silva | Black Clover - #6061 | 05:32 |
| Apart | SAKAMOTO DAYS - #6069 | 05:32 |
| Atari | SAKAMOTO DAYS - #6873 | 05:32 |
| Ayami Sasaki | Komi Can’t Communicate - #€é | 05:32 |
| Bisouit Griffon | Mobile Suit Gundam - #6681 | 05:32 |
| Chiyo Shuuzenji | My Hero Academia - #6089 | 05:32 |
| Erika | Pokémon * #6077 | 05:32 |
| Rouge Portgas | ONE PIECE « #6057 | 05:32 |
| Shinobu Kawajiri | JoJo's Bizarre Adventure ... | 05:32 |
| Ash Landers | Black Butler - #6678 | 05:32 |
| Gadjah | Black Clover - #6866 | 05:32 |
| Obsidian | Land of the Lustrous - #6... | 05:32 |
| Rakka no Akuma | Chainsaw Man - #6070 | 05:32 |
| Yumie Takagi | Hellsing - #6074 | 05:32 |
| Blast | One-Punch Man - #6867 | 05:32 |
| Jun Sagawa | Mob Psycho 100 - #6087 | 05:32 |
| Konomi Okonogi | Kaiju No. 8 - #6671 | 05:32 |
| Nephrite | Sailor Moon - #6075 | 05:32 |
| Roland | Violet Evergarden - #6683 | 05:32 |
| Yusa | Angel Beats! - #6079 | 05:32 |
| Daphne Lauros | Is It Wrong to Try to Pick ... | 05:32 |
| Duy Might | Naruto - #6088 | 05:32 |
| Fam | As a Reincarnated Aristo... | 05:32 |
| No.664 | The Eminence in Shadow ... | 05:32 |
| Tensei lida | My Hero Academia « #6084 | 05:32 |
| Toshiki Hoshika... | Goodnight Punpun ‘ #6080 | 05:32 |
| Ayumi Yoshida | Detective Conan - #6897 | 05:33 |
| Bomb | One-Punch Man - #6113 | 05:33 |
| Grethe Wenzel | 86 EIGHTY-SIX - #6893 | 05:33 |
| Kouta Nakanishi | The Disastrous Life of Sa... | 05:33 |
| Misuzu Misaka | A Certain Magical Index - #61 | 05:33 |
| Shinobu Kawaijiri | JoJo's Bizarre Adventure ... | 05:33 |
| Gazel Dwargo | That Time / Got Reincarn... | 05:33 |
| Maika Tsuchinii... | A Certain Magical Index - ... | 05:33 |
| Makio Tanihara | Horimiya - #6102 | 05:33 |
| Makoto Teruhas... | The Disastrous Life of Sa... | 05:33 |
| Noerde Hew Am... | Gachiakuta - #6094 | 05:33 |
| Ton-chan | K-ON! - #6096 | 05:33 |
| Akira Komi | Komi Can’t Communicate... | 05:33 |
| Dr. Giovanni | Fire Force ‘#6115 | 05:33 |
| Dreyfus | The Seven Deadly Sins ° ... | 05:33 |
| Hyouka Kazakiri | A Certain Magical Index - ... | 05:33 |
| MISAKA 19090 | A Certain Magical Index - #66 | 05:33 |
| Too Lily | Gachiakuta - #6695 | 05:33 |
| Darry Adai | Gurren Lagann * #6096 | 05:33 |
| Kokoro | ONE PIECE - #6100 | 05:33 |
| Larcade Dragneel | Fairy Tail - #6108 | 05:33 |
| Mamiko Oumae | Sound! Euphonium - #6104 | 05:33 |
| Reiko Yanagi | My Hero Academia - #6092 | 05:33 |
| Drole | The Seven Deadly Sins - ... | 05:34 |
| Halle Bullook | Death Note - #6129 | 05:34 |
| Kanaguri | SAKAMOTO DAYS - #6125 | 05:34 |
| Sella | Fate/Zero - #6133 | 05:34 |
| Veronica de Sade | The Case Study of Vanitas * # | 05:34 |
| Yayoi Venoyama | given - #6117 | 05:34 |
| Ininia | Witch Hat Atelier - #6122 | 05:34 |
| Kamotarou Itou | Gintama - #6130 | 05:34 |
| Kaya | Attack on Titan - #6110 | 05:34 |
| Mari Kusakabe | Fire Force - #6118 | 05:34 |
| Michael Glenreed | BANANA FISH « #6114 | 05:34 |
| Mina Carolina | Attack on Titan - #6134 | 05:34 |
| Miri Sugou | Chainsaw Man - #6126 | 05:34 |
| Fukasaku | Naruto - #6131 | 05:34 |
| Kaijuu Kyuu-gou | Kaiju No. 8 - #6123 | 05:34 |
| Ken Ishiyama | My Hero Academia - #6139 | 05:34 |
| Natsuki Aki | Sword Art Online - #6111 | 05:34 |
| Piisuke | SAKAMOTO DAYS - #6127 | 05:34 |
| Winning Tioket | Umamusume: Pretty Derby ° ; | 05:34 |
| Zazan | Hunter x Hunter ‘#6135 | 05:34 |
| Aurora | TONIKAWA: Over The Mo... | 05:34 |
| Boiled | SAKAMOTO DAYS - #6124 | 05:34 |
| Cracker Charlo... | ONE PIECE - #6136 | 05:34 |
| Galette Charlotte | ONE PIECE - #6120 | 05:34 |
| Kaigaku | Demon Slayer: Kimetsu n... | 05:34 |
| Orsola Aquinas | A Certain Magical Index - ... | 05:34 |
| Dust | KONOSUBA -God's blessi... | 05:35 |
| Fleki | Delicious in Dungeon - #6161 | 05:35 |
| Hiroshi Kumagza... | Mob Psycho 100 - #6157 | 05:35 |
| Kyon no imouto | The Melancholy of Haruhi Suz | 05:35 |
| Ooyama | Angel Beats! - #6153 | 05:35 |
| S-Snake | ONE PIECE - #6149 | 05:35 |
| Touka Satomi | Puella Magi Madoka Magi... | 05:35 |
| Viktor Idinarohk | 86 EIGHTY-SIX - #6145 | 05:35 |
| Jango | ONE PIECE - #61580 | 05:35 |
| Jill | Berserk - #6154 | 05:35 |
| Kallavan | Tower of God « #6138 | 05:35 |
| Ouka Nakiri | TONIKAWA: Over The Mo... | 05:35 |
| Senjuu | Mushoku Tensei: Jobless ... | 05:35 |
| Teppei Sugou | PSYCHO-PASS - #6158 | 05:35 |
| Antares | Solo Leveling * #6147 | 05:35 |
| Gino Weinberg | Code Geass: Lelouch of the F | 05:35 |
| Gotou | Demon Slayer: Kimetsu n... | 05:35 |
| List | Hunter x Hunter ‘#6155 | 05:35 |
| Shoukichi Oka | SK8 the Infinity - #6159 | 05:35 |
| Susuki | Call of the Night - #6163 | 05:35 |
| Bakko | Kaiju No. 8 - #6148 | 05:35 |
| Isuzu | Hell’s Paradise - #6140 | 05:35 |
| Katsuki Shima | Clannad - #6152 | 05:35 |
| Liigner | Frieren: Beyond Journey’... | 05:35 |
| Tenjin | Noragami ‘ #6156 | 05:35 |
| Domino | ONE PIECE - #6169 | 05:36 |
| Kansuke Yamato | Detective Conan - #6189 | 05:36 |
| Metamon | Pokémon * #6181 | 05:36 |
| Mito Juujou | Seraph of the End: Vampi... | 05:36 |
| Norba Shino | Mobile Suit Gundam * #6177 | 05:36 |
| Tama | Dragon Ball - #6185 | 05:36 |
| Chojuro | Naruto - #6178 | 05:36 |
| Juzo Honenuki | My Hero Academia * #6178 | 05:36 |
| Keigo Asano | Bleach * #6166 | 05:36 |
| Miguel | JUJUTSU KAISEN - #6182 | 05:36 |
| Violet | The Promised Neverland ... | 05:36 |
| Erika Kose | Kaguya-sama: Love is War * 4 | 05:36 |
| Leyte Jokin | Gurren Lagann - #6187 | 05:36 |
| Mabui | Naruto - #6191 | 05:36 |
| Nappa | Dragon Ball - #6167 | 05:36 |
| Shima lwashita | BOCCHI THE ROCK! - #6183 | 05:36 |
| Shuntarou Haru... | Goodnight Punpun - #6171 | 05:36 |
| Wataru Kuon | BLUE LOCK - #6179 | 05:36 |
| Fels | Is It Wrong to Try to Pick ... | 05:36 |
| Ikumatsu Nishiki | Gintama - #6168 | 05:36 |
| Lector | Fairy Tail - #6192 | 05:36 |
| Mejiro Ardan | Umamusume: Pretty Der... | 05:36 |
| Zaryusu Shasha | Overlord - #6176 | 05:36 |
| Aika Kiryuu | High School DxD - #6197 | 05:37 |
| Gyuuki | Naruto - #6193 | 05:37 |
| Hanako Kamado | Demon Slayer: Kimetsu n... | 05:37 |
| Lycion | Delicious in Dungeon - #6... | 05:37 |
| Red Beryl | Land of the Lustrous - #6... | 05:37 |
| lohika Yami | Black Clover - #6213 | 05:37 |
| Dagon | JUJUTSU KAISEN - #6266 | 05:37 |
| Hifumi Yamada | Danganronpa: The Anima... | 05:37 |
| Ninzaburo Shirc... | Detective Conan - #6218 | 05:37 |
| Paula McCoy | Nisekoi - #6198 | 05:37 |
| Saint-Germain H... | DAN DA DAN - #6214 | 05:37 |
| Silver | Fairy Tail - #6202 | 05:37 |
| Conrad Leto | Black Clover - #6211 | 05:37 |
| Fuyumi Mizuhara | Food Wars! - #6199 | 05:37 |
| Kureto Hiiragi | Seraph of the End: Vampi... | 05:37 |
| Sakaki | Pokémon - #6219 | 05:37 |
| Sauros Boreas ... | Mushoku Tensei: Jobless ... | 05:37 |
| Yubelluna | High School DxD - #6195 | 05:37 |
| Angela Leon | Soul Eater - #6188 | 05:37 |
| Atlas | ONE PIECE - #6212 | 05:37 |
| Barbara | The Promised Neverland ... | 05:37 |
| Bruford | JoJo's Bizarre Adventure ... | 05:37 |
| Hablog | Made in Abyss - #6200 | 05:37 |
| Hongniang | The Apothecary Diaries - ... | 05:37 |
| Mitsuba Okita | Gintama - #62260 | 05:37 |
| Wataru | Pokémon - #6216 | 05:37 |
| Hedoro | Gintama * #6217 | 05:38 |
| Jan Valentine | Hellsing * #6241 | 05:38 |
| Pekoms | ONE PIECE : #6225 | 05:38 |
| Schneider Allocer | Welcome to Demon Scho... | 05:38 |
| Shinkaiou | One-Punch Man - #6229 | 05:38 |
| Urouge | ONE PIECE : #6221 | 05:38 |
| Drakon | Magi: The Labyrinth of M... | 05:38 |
| Foo | Fullmetal Alchemist * #62... | 05:38 |
| Kensuke | Delicious in Dungeon - #6... | 05:38 |
| Mikuni Katou | Komi Can*t Communicate... | 05:38 |
| Ninzaburo Shira... | Detective Conan - #6218 | 05:38 |
| Yonji Vinsmoke | ONE PIECE - #6230 | 05:38 |
| Hyou | ONE PIECE - #6231 | 05:38 |
| Nazo no Shoujo | Clannad - #6243 | 05:38 |
| Paimon | Magi: The Labyrinth of M... | 05:38 |
| Soyo Tokugawa | Gintama * #6223 | 05:38 |
| Tonton | Naruto - #6235 | 05:38 |
| Voll Jii | Frieren: Beyond Journey’... | 05:38 |
| Hideki Yamamura | Mob Psycho 100 - #6232 | 05:38 |
| MISAKA 10031 | A Certain Magical Index: ... | 05:38 |
| Shiu Kong | JUJUTSU KAISEN + #6236 | 05:38 |
| Takumi Mayama | March comes in like a lion... | 05:38 |
| Turkey | Dorohedoro - #6228 | 05:38 |
| Asahi Naruhaya | BLUE LOCK - #6257 | 05:39 |
| Bro Santa | Gachiakuta ‘#6237 | 05:39 |
| Kami-sama | The 100 Girlfriends Who R... | 05:39 |
| Mine Kuramae | Fruits Basket - #6245 | 05:39 |
| Minori Asagiri | Mob Psycho 100 - #6249 | 05:39 |
| Momo Ryuuju | Kaguya-sama: Love is War * 4 | 05:39 |
| Rien | Hell’s Paradise - #6253 | 05:39 |
| Coffee | Cowboy Bebop - #6246 | 05:39 |
| Perospero Charl... | ONE PIECE - #6258 | 05:39 |
| Yuuki Mishima | PERSONAS the Animatio... | 05:39 |
| Louisa May Alco... | Bungo Stray Dogs ‘ #6251 | 05:39 |
| Minako Okukawa | Yuri!!! on ICE * #6255 | 05:39 |
| Seol-Hwa Lee | Omniscient Reader - #6259 | 05:39 |
| Shaka | ONE PIECE - #6239 | 05:39 |
| Sumiaki Raida | OSHI NO KO: #6263 | 05:39 |
| Xuelan | High School DxD - #6247 | 05:39 |
| Yomi | Yu Yu Hakusho - #6267 | 05:39 |
| Jirou Tomitake | When They Cry - #6244 | 05:39 |
| Katai Tayama | Bungo Stray Dogs - #6252 | 05:39 |
| Patry | Black Clover - #6256 | 05:39 |
| Ravinho | BLUE LOCK - #6264 | 05:39 |
| Shukichi Haneda | Detective Conan * #6248 | 05:39 |
| Takeo Kamado | Demon Slayer: Kimetsu n... | 05:39 |
| Akihito Akiyama | Call of the Night - #6289 | 05:40 |
| Haohi | DARLING in the FRANXX - #6 | 05:40 |
| Kamui Caim | Welcome to Demon Scho... | 05:40 |
| Laura Stuart | A Certain Magical Index - #62 | 05:40 |
| Martel | Fullmetal Alchemist - #62... | 05:40 |
| Megumu Koyama | Mob Psycho 100 - #6281 | 05:40 |
| Raine | That Time / Got Reincarnatec | 05:40 |
| Anne | Vinland Saga - #6286 | 05:40 |
| Climb | Overlord - #6278 | 05:40 |
| Cricket Montbic... | ONE PIECE - #6270 | 05:40 |
| Jaco Teirimente... | Dragon Ball - #6282 | 05:40 |
| Kazuhito Narita | HAIKYUI!! - #6274 | 05:40 |
| Delta | Naruto - #6279 | 05:40 |
| Lyd | Is It Wrong to Try to Pick ... | 05:40 |
| Namie Yagiri | Durarara!! - #6271 | 05:40 |
| Raim | Welcome to Demon Scho... | 05:40 |
| Spinner Clow | Hunter x Hunter ‘#6275 | 05:40 |
| Suiko | One-Punch Man - #6295 | 05:40 |
| Yahaba | Demon Slayer: Kimetsu n... | 05:40 |
| Alex | BANANA FISH « #6284 | 05:40 |
| Arthur Auguste... | Blue Exorcist - #6272 | 05:40 |
| Bonolenov Ndon... | Hunter x Hunter - #6268 | 05:40 |
| Kirsch Vermillion | Black Clover - #6276 | 05:40 |
| Nafra Ampsey | Welcome to Demon School! Ir | 05:40 |
| Ray | Is It Wrong to Try to Pick Up | 05:40 |
| Ryouta Sekiguchi | That Time ! Got Reincarn... | 05:40 |
| George Joestar / | JoJo's Bizarre Adventure ... | 05:41 |
| Jinzouningen 8-... | Dragon Ball - #6365 | 05:41 |
| Norea du Noo | Mobile Suit Gundam - #6301 | 05:41 |
| Rinne Sonogami | Date A Live - #6297 | 05:41 |
| Alzack Connell | Fairy Tail - #6310 | 05:41 |
| Amande Charlo... | ONE PIECE - #6290 | 05:41 |
| Apis | ONE PIECE - #6306 | 05:41 |
| Jemima | The Promised Neverland ... | 05:41 |
| Luke Notos Grey... | Mushoku Tensei: Jobless .-.. | 05:41 |
| Toneri Ootsutsuki | Naruto ‘ #6318 | 05:41 |
| Vergo | ONE PIECE - #6314 | 05:41 |
| Amado | Naruto - #6319 | 05:41 |
| Kakunou Jurei | JUJUTSU KAISEN - #6303 | 05:41 |
| Kimi Toudou | Fruits Basket ‘#6307 | 05:41 |
| Kiriya Nouzen | 86 EIGHTY-SIX - #6299 | 05:41 |
| Takao Yaguchi | Goodnight Punpun - #6311 | 05:41 |
| Ai Coleman | Dorohedoro - #6312 | 05:41 |
| Faraday | Cyberpunk: Edgerunners ... | 05:41 |
| Karli | Vinland Saga ‘#6296 | 05:41 |
| Marie | The Eminence in Shadow ... | 05:41 |
| Shirou lori | Kill la Kill: #6316 | 05:41 |
| Tianzi | Code Geass: Lelouch of the F | 05:41 |
| Inari One | Umamusume: Pretty Derby - i | 05:42 |
| James Ratri | The Promised Neverland ... | 05:42 |
| Jugem Jugem | Gintama - #6313 | 05:42 |
| Matrona | The Seven Deadly Sins - ... | 05:42 |
| Mitama Yakumo | Puella Magi Madoka Magica - | 05:42 |
| Paikuhan | Dragon Ball - #6337 | 05:42 |
| Taurus | Fairy Tail * #6341 | 05:42 |
| ichigo Saitou | OSHI NO KO - #6333 | 05:42 |
| Benitoite | Land of the Lustrous - #6... | 05:42 |
| Diana | Sailor Moon - #6338 | 05:42 |
| Elena | Hunter x Hunter - #6342 | 05:42 |
| Jester Galandros | Black Clover - #6334 | 05:42 |
| Ottarl | Is It Wrong to Try to Pick ... | 05:42 |
| Yuuta lridatsu | The Disastrous Life of Sa... | 05:42 |
| Alioia | The Detective Is Already Dea | 05:42 |
| Amane | Hunter x Hunter ‘#6327 | 05:42 |
| Charlotte Beatrix fh | Berserk - #6335 | 05:42 |
| Ginji Matsuzaki | Black Lagoon * #6339 | 05:42 |
| Ignica | Fairy Tail - #6323 | 05:42 |
| Mii Fujibakama | Date A Live - #6315 | 05:42 |
| Pirako Doromizu | Gintama * #6343 | 05:42 |
| Beretta | That Time ! Got Reincarn... | 05:42 |
| Jan Suk | Monster * #6336 | 05:42 |
| Kuro | Delicious in Dungeon - #6... | 05:42 |
| Leonora Nakiri | Food Wars! - #6328 | 05:42 |
| Shirley | Fate/Zero ‘#6346 | 05:42 |
| Steely Dan | JoJo's Bizarre Adventure ... | 05:42 |
| Tama | JoJo's Bizarre Adventure ... | 05:42 |
| Artur Blouse | Attack on Titan ‘#6349 | 05:43 |
| Chicorita | Pokémon * #6357 | 05:43 |
| Dalton | ONE PIECE - #6365 | 05:43 |
| Hedin Selland | Is It Wrong to Try to Pick ... | 05:43 |
| Sneck | One-Punch Man - #6345 | 05:43 |
| Yinghua | The Apothecary Diaries - #63 | 05:43 |
| Den | Fullmetal Alchemist - #63... | 05:43 |
| Dragon | Fire Force - #6358 | 05:43 |
| Kuroe | Puella Magi Madoka Magi... | 05:43 |
| Mark Twain | Bungo Stray Dogs - #63580 | 05:43 |
| Aculeatus | Land of the Lustrous - #6... | 05:43 |
| Chigusa Hitachi | Is It Wrong to Try to Pick Up | 05:43 |
| Haruichi Izumo | Kaiju No. 8 - #6359 | 05:43 |
| Katsuyu | Naruto - #6367 | 05:43 |
| Mother Valac | Welcome to Demon Scho... | 05:43 |
| Shinichirou Tamaki | Code Geass: Lelouch of the F | 05:43 |
| Chioe Rollo | Is It Wrong to Try to Pick Up | 05:43 |
| Kaijuu 10-gou | Kaiju No. 8 - #6368 | 05:43 |
| Ryou Sakurai | Kuroko's Basketball - #63... | 05:43 |
| Soichirou Kuzuki | Fate/Zero - #6364 | 05:43 |
| Yoshinobu Gaku... | JUJUTSU KAISEN + #6356 | 05:43 |
| Yugito Nii | Naruto * #6368 | 05:43 |
| Arthur Rimbaud | Bungo Stray Dogs - #6385 | 05:44 |
| Darius Zackly | Attack on Titan - #6373 | 05:44 |
| Gurimu Igarashi | BLUE LOCK - #6389 | 05:44 |
| Hisako Fuchita | Angel Beats! - #6369 | 05:44 |
| Iishikoro | Land of the Lustrous - #6... | 05:44 |
| Maruo Nakano | The Quintessential Quint... | 05:44 |
| Oscar Webster | Violet Evergarden * #6393 | 05:44 |
| Vetto | Black Clover - #6377 | 05:44 |
| Amane Yotsumu... | SAKAMOTO DAYS * #6394 | 05:44 |
| Gustang Po Bidau | Tower of God « #6382 | 05:44 |
| Hades | Omniscient Reader - #6390 | 05:44 |
| Halkenburg Hui ... | Hunter x Hunter - #6386 | 05:44 |
| Hisako Kotobuki | Even the Student Council... | 05:44 |
| Mirai Sarutobi | Naruto - #6378 | 05:44 |
| Nobuyuki Kai | HAIKYU!! - #6374 | 05:44 |
| Bacchus | Fairy Tail - #6371 | 05:44 |
| Bunny Iglesias | BLUE LOCK - #6399 | 05:44 |
| Eizen | Hell’s Paradise - #6387 | 05:44 |
| Heiroku Shishido | Goodnight Punpun - #6379 | 05:44 |
| Kiwi | Made in Abyss ‘ #6375 | 05:44 |
| Miyo Inbami | Kakegurui ‘#6383 | 05:44 |
| Praline Charlotte | ONE PIECE + #6391 | 05:44 |
| Sophie Pulone | Mobile Suit Gundam - #6395 | 05:44 |
| Akari Shimizu | Solo Leveling - #6392 | 05:44 |
| Ami Nekota | Kamisama Kiss - #6372 | 05:44 |
| Hajime Damema... | Dorohedoro - #6388 | 05:44 |
| Ikkei Ukai | HAIKYUI!! - #6384 | 05:44 |
| Rosell Kischa | As a Reincarnated Aristo... | 05:44 |
| Ryohei Shimura | Mob Psycho 100 - #6380 | 05:44 |
| Zircon | Land of the Lustrous - #6... | 05:44 |
| Cobra Nefertari | ONE PIECE « #6405 | 05:45 |
| Koumei Ren | Magi: The Labyrinth of M... | 05:45 |
| Roujuuro Otorib... | Bleach - #6461 | 05:45 |
| Shingen Kishitani | Durarara!! - #64609 | 05:45 |
| Terunosuke Mivy... | JoJo's Bizarre Adventure ... | 05:45 |
| ishikoro | Land of the Lustrous - #6... | 05:45 |
| Bean | Attack on Titan - #6422 | 05:45 |
| Hibiki Laytis | Fairy Tail - #6410 | 05:45 |
| Mikita | ONE PIECE - #6402 | 05:45 |
| Momo Souma | Fruits Basket - #6406 | 05:45 |
| Pakura | Naruto - #6414 | 05:45 |
| Azusa Yumi | Soul Eater - #6407 | 05:45 |
| Cocco | Hunter x Hunter ‘#6415 | 05:45 |
| Kinzou Shima | Blue Exorcist - #6411 | 05:45 |
| Locus | Berserk - #6463 | 05:45 |
| ifrit | That Time / Got Reincarn... | 05:45 |
| Frau Bow | Mobile Suit Gundam « #6466 | 05:45 |
| Gin | ONE PIECE - #6404 | 05:45 |
| Ichiji Vnsmoke | ONE PIECE - #6420 | 05:45 |
| Piyon | Hunter x Hunter - #6412 | 05:45 |
| Quant Blitz | Tower of God - #6424 | 05:45 |
| Sairaorg Bael | High School DxD « #6416 | 05:45 |
| Shiryuu | ONE PIECE - #6408 | 05:45 |
| Brulee Charlotte | ONE PIECE « #6429 | 05:46 |
| Chika Netsuno | Komi Can’t Communicate... | 05:46 |
| Kyung-Hye Park | Solo Leveling - #6433 | 05:46 |
| Makoto Suzuki | Tokyo Revengers: Santen... | 05:46 |
| Mest Gryder | Fairy Tail - #6437 | 05:46 |
| Selene | Fairy Tail - #6441 | 05:46 |
| Suzuha | Noragami - #6417 | 05:46 |
| Basen | The Apothecary Diaries - ... | 05:46 |
| Dagda | Witch Hat Atelier - #6434 | 05:46 |
| Kumara | That Time ! Got Reincarn... | 05:46 |
| Mary | Detective Conan - #6418 | 05:46 |
| Mioono Shinobino | Komi Can*t Communicate... | 05:46 |
| Souichirou Tachi... | Aoashi * #6438 | 05:46 |
| Mansherry | ONE PIECE - #6419 | 05:46 |
| Minitona Dedold... | Mushoku Tensei: Jobless ... | 05:46 |
| Okuhito lemon | BLUE LOCK - #6427 | 05:46 |
| Raizou | ONE PIECE - #6431 | 05:46 |
| Talia Yang | Cyberpunk: Edgerunners ... | 05:46 |
| Yarite Baba | The Apothecary Diaries - ... | 05:46 |
| frit | That Time / Got Reincarn... | 05:46 |
| Asterius | Is It Wrong to Try to Pick ... | 05:46 |
| August | Fairy Tail - #6444 | 05:46 |
| Celestial Spirit K... | Fairy Tail - #6448 | 05:46 |
| LoveGreen | Call of the Night - #6436 | 05:46 |
| Undine | Black Clover - #6428 | 05:46 |
| Yumeka Gotou | Blue Box - #6440 | 05:46 |
| Gemi | Fairy Tail‘ #6461 | 05:47 |
| Irene | Overgeared - #6449 | 05:47 |
| Kinana | Fairy Tail - #6465 | 05:47 |
| Natsu Dragion | Fairy Tail - #6457 | 05:47 |
| Tepasté | Made in Abyss: Mezamer... | 05:47 |
| Urushi | Reincarnated as a Sword - #6 | 05:47 |
| Akine Atagawa | The Ramparts of Ice - #6462 | 05:47 |
| Asuka Connell | Fairy Tail - #6446 | 05:47 |
| Michelle Lobster | Fairy Tail - #6466 | 05:47 |
| Nozomi Date | Aoashi - #6456 | 05:47 |
| Sherry Blendy | Fairy Tail - #6454 | 05:47 |
| Wendy (Edolas) | Fairy Tail - #6458 | 05:47 |
| Akira Yatsuka | Fool Night - #6459 | 05:47 |
| Kenta Yoshitsune | Aoashi - #6447 | 05:47 |
| Kiria | Fairy Tail - #6471 | 05:47 |
| Mini | Fairy Tail - #6463 | 05:47 |
| Ryuuiohi Takeshim: | Aoashi - #6467 | 05:47 |
| Scorpio | Fairy Tail: #6451 | 05:47 |
| Zancrow | Fairy Tail - #6455 | 05:47 |
| Azuma | Fairy Tail - #6472 | 05:47 |
| Capricorn | Fairy Tail - #6456 | 05:47 |
| Coco | Fairy Tail - #6464 | 05:47 |
| Laki Olietta | Fairy Tail - #6460 | 05:47 |
| Mard Geer Tarta... | Fairy Tail - #6452 | 05:47 |
| Simon | Fairy Tail - #6468 | 05:47 |
| Anna Heartfilia | Fairy Tail - #6485 | 05:48 |
| Cancer | Fairy Tail - #6493 | 05:48 |
| Faker | Overgeared - #6489 | 05:48 |
| Grandine | Fairy Tail - #6469 | 05:48 |
| Romeo Conbolt | Fairy Tail - #6477 | 05:48 |
| Tobimaru Tsukiji | Witch on the Holy Night - ... | 05:48 |
| Ikaruga | Fairy Tail - #6482 | 05:48 |
| Porlyusica | Fairy Tail - #6474 | 05:48 |
| Precht Gaebolg | Fairy Tail - #6478 | 05:48 |
| Ren Akatsuki | Fairy Tail - #6494 | 05:48 |
| Rikuson | The Apothecary Diaries - ... | 05:48 |
| Rufus Lore | Fairy Tail - #6470 | 05:48 |
| Suzaku | Fairy Tail - #6486 | 05:48 |
| Arisu Terui | Even the Student Council... | 05:48 |
| Euphemina | Overgeared - #6479 | 05:48 |
| Jackal | Fairy Tail - #6487 | 05:48 |
| Kyouka | Fairy Tail - #6491 | 05:48 |
| Natsu no Haha ... | Fairy Tail - #6499 | 05:48 |
| Sagittarius | Fairy Tail - #6483 | 05:48 |
| D | Cyberpunk: Edgerunners ... | 05:48 |
| Jura Neekis | Fairy Tail - #6496 | 05:48 |
| Levy (Edolas) | Fairy Tail - #6480 | 05:48 |
| Mercphobia | Fairy Tail - #6492 | 05:48 |
| Touka | Fairy Tail - #6488 | 05:48 |
| Warrod Sequen | Fairy Tail - #6484 | 05:48 |
| Yuki Azumi | The Ramparts of Ice - #6... | 05:48 |
| Atlas Flame | Fairy Tail» #6521 | 05:49 |
| Libra | Fairy Tail - #6513 | 05:49 |
| Lyra | Fairy Tail > #6501 | 05:49 |
| Regas | Overgeared - #6505 | 05:49 |
| Se-Hee Shin | Overgeared - #6509 | 05:49 |
| Shagotte | Fairy Tail - #6517 | 05:49 |
| Taira Nakamura | Aoashi - #6497 | 05:49 |
| God Serena | Fairy Tail- #6514 | 05:49 |
| Gray Surge | Fairy Tail - #6502 | 05:49 |
| Kyou-u | The Apothecary Diaries ° ... | 05:49 |
| Lucky | Fairy Tail - #6518 | 05:49 |
| Macao Conbolt | Fairy Tail - #6510 | 05:49 |
| Tsubasa Igarashi | The Ramparts of Ice - #6... | 05:49 |
| Daphne | Fairy Tail - #6511 | 05:49 |
| Jet | Fairy Tail - #6507 | 05:49 |
| Kana (Edolas) | Fairy Tail - #6519 | 05:49 |
| Kanpei Kuroda | Aoashi - #6523 | 05:49 |
| Mato | Fairy Tail - #6495 | 05:49 |
| Momoka Kuriki | The Ramparts of Ice - #6515 | 05:49 |
| Orga Nanagear | Fairy Tail - #6503 | 05:49 |
| Cosmos | Fairy Tail - #6504 | 05:49 |
| Horologium | Fairy Tail - #6508 | 05:49 |
| Hoteye | Fairy Tail - #6516 | 05:49 |
| Marl | Fairy Tail - #6512 | 05:49 |
| Mary Hughes | Fairy Tail - #6520 | 05:49 |
| Toby Horhorta | Fairy Tail - #6524 | 05:49 |
| Beth Vanderwood | Fairy Tail - #6541 | 05:50 |
| Heine Lunasea | Fairy Tail - #6533 | 05:50 |
| Juliet Sun | Fairy Tail - #6545 | 05:50 |
| Nichiya | Fairy Tail - #6525 | 05:50 |
| Shou | Fairy Tail - #6537 | 05:50 |
| Toma E. Fiore | Fairy Tail - #6549 | 05:50 |
| Weak Kingsley | Cyberpunk: Edgerunners ... | 05:50 |
| Bob | Fairy Tail - #6538 | 05:50 |
| Briar | Fairy Tail - #6550 | 05:50 |
| Hayato Akahoshi | The Ramparts of Ice - #6... | 05:50 |
| Invel Yura | Fairy Tail - #6522 | 05:50 |
| Lahar | Fairy Tail - #6530 | 05:50 |
| Luiu | Fairy Tail - #6542 | 05:50 |
| Metalicana | Fairy Tail - #6526 | 05:50 |
| Coco (Earth Land) | Fairy Tail - #6527 | 05:50 |
| Gajeel (Edolas) | Fairy Tail - #6531 | 05:50 |
| Karameel | Fairy Tail - #6551 | 05:50 |
| Karen Lilica | Fairy Tail - #6539 | 05:50 |
| Lamy | Fairy Tail - #6543 | 05:50 |
| Totomaru | Fairy Tail - #6535 | 05:50 |
| Ajeel Ramal | Fairy Tail - #6544 | 05:50 |
| Droy | Fairy Tail - #6536 | 05:50 |
| Kamika | Fairy Tail - #6548 | 05:50 |
| Katja | Fairy Tail - #6540 | 05:50 |
| Mother Pisces | Fairy Tail - #6532 | 05:50 |
| Satomi Hiratsuka | Even the Student Council Ha: | 05:50 |
| Racer | Fairy Tail - #6557 | 05:51 |
| Rita Dreyar | Fairy Tail - #6569 | 05:51 |
| Rustyrose | Fairy Tail - #6565 | 05:51 |
| Son Pisces | Fairy Tail - #6561 | 05:51 |
| Wakaba Mine | Fairy Tail - #6553 | 05:51 |
| Yuka Suzuki | Fairy Tail - #6573 | 05:51 |
| Aceto Balsamico | Fairy Tail - #6546 | 05:51 |
| Arania Web | Fairy Tail - #6558 | 05:51 |
| Cravali | Made in Abyss: Mezamer... | 05:51 |
| Max Alors | Fairy Tail - #6554 | 05:51 |
| Niggy | Fairy Tail - #6570 | 05:51 |
| Samuel | Fairy Tail - #6566 | 05:51 |
| Dan Straight | Fairy Tail - #6559 | 05:51 |
| Eve Tilm | Fairy Tail - #6575 | 05:51 |
| Jean du Vix | Reincarnated as a Sword ... | 05:51 |
| Mary | Fairy Tail - #6567 | 05:51 |
| Ooba Babasac... | Fairy Tail - #6547 | 05:51 |
| Wally Buchanan | Fairy Tail - #6555 | 05:51 |
| Youichi Kiriki | Aoashi - #6571 | 05:51 |
| Fukurou | Fairy Tail - #6572 | 05:51 |
| Jacob Lessio | Fairy Tail - #6568 | 05:51 |
| Reedus Jonah | Fairy Tail - #6564 | 05:51 |
| Risley Law | Fairy Tail - #6560 | 05:51 |
| Roman Carax | Cyberpunk: Edgerunners ... | 05:51 |
| Yajima | Fairy Tail - #6556 | 05:51 |
| Chapati Lola | Fairy Tail - #6601 | 05:52 |
| Elfman (Edolas) | Fairy Tail - #6577 | 05:52 |
| Enshin Akiyama | Aoashi - #6593 | 05:52 |
| Grammi | Fairy Tail - #6581 | 05:52 |
| Mia Whitlock | The Detective Is Already ... | 05:52 |
| Sugarboy | Fairy Tail - #6597 | 05:52 |
| Vidaldus Taka | Fairy Tail - #6589 | 05:52 |
| Chico C. Hammitt | Fairy Tail - #6598 | 05:52 |
| Hughes | Fairy Tail - #6590 | 05:52 |
| Natsu no Chichi ... | Fairy Tail - #6582 | 05:52 |
| Skiadrum | Fairy Tail - #6602 | 05:52 |
| Sugarboy (Earth... | Fairy Tail - #6578 | 05:52 |
| Ume Mizunoe | Even the Student Council... | 05:52 |
| Vijeeter Ecor | Fairy Tail - #6594 | 05:52 |
| Warren Rocko | Fairy Tail - #6574 | 05:52 |
| Bluenote Stinger | Fairy Tail - #6599 | 05:52 |
| Crux | Fairy Tail - #6595 | 05:52 |
| Jason | Fairy Tail - #6591 | 05:52 |
| Kageyama | Fairy Tail - #6587 | 05:52 |
| Keyes | Fairy Tail - #6603 | 05:52 |
| Vantner | Overgeared - #6583 | 05:52 |
| Weisslogia | Fairy Tail - #6579 | 05:52 |
| Brain | Fairy Tail - #6596 | 05:52 |
| Guttman Kubrick | Fairy Tail - #6600 | 05:52 |
| Housuke Kinomi | Witch on the Holy Night > ... | 05:52 |
| Nab Lasaro | Fairy Tail - #6588 | 05:52 |
| Nadi | Fairy Tail - #6576 | 05:52 |
| Toban | Overgeared « #6592 | 05:52 |
| Wahl icht | Fairy Tail - #6580 | 05:52 |
| Arcadios | Fairy Tail * #6617 | 05:53 |
| Nalpudding | Fairy Tail - #6621 | 05:53 |
| Pon | Overgeared - #6609 | 05:53 |
| Torafuzar | Fairy Tail - #6605 | 05:53 |
| Yakdoriga | Fairy Tail * #6625 | 05:53 |
| ivan Dreyar | Fairy Tail - #6613 | 05:53 |
| Gato | Fairy Tail - #6618 | 05:53 |
| Jude Heartfilia | Fairy Tail - #6614 | 05:53 |
| Spetto | Fairy Tail - #6606 | 05:53 |
| Wraith | Fairy Tail - #6610 | 05:53 |
| Belserion | Fairy Tail - #6627 | 05:53 |
| Jerome | Fairy Tail - #6623 | 05:53 |
| Jose Porla | Fairy Tail - #6611 | 05:53 |
| Mrs. Robinson | STEEL BALL RUN JoJo's ... | 05:53 |
| Obra | Fairy Tail - #6619 | 05:53 |
| Sue | Fairy Tail - #6615 | 05:53 |
| Erigor | Fairy Tail - #6612 | 05:53 |
| Jiemma Orland | Fairy Tail - #6620 | 05:53 |
| Kurohebi | Fairy Tail - #6616 | 05:53 |
| Ritsuka Suse | Witch on the Holy Night: ... | 05:53 |
| Tempesta | Fairy Tail - #6604 | 05:53 |
| Dobengal | Fairy Tail - #6653 | 05:54 |
| Everlue | Fairy Tail * #6641 | 05:54 |
| Jin Hiragishi | Foal Night - #6637 | 05:54 |
| Roubaul | Fairy Tail #6645 | 05:54 |
| Uosuke | Fairy Tail * #6629 | 05:54 |
| War Cry | Fairy Tail» #6649 | 05:54 |
| Wonderful Gocc... | Fairy Tail - #6633 | 05:54 |
| Aria | Fairy Tail - #6638 | 05:54 |
| Franmailth | Fairy Tail - #6654 | 05:54 |
| Goldmine | Fairy Tail - #6642 | 05:54 |
| Hilda | Fairy Tail - #6646 | 05:54 |
| Kareem | Fairy Tail - #6630 | 05:54 |
| Karen Berg | Fairy Tail - #6634 | 05:54 |
| Michello | Fairy Tail - #6650 | 05:54 |
| Yajeel | Fairy Tail - #6626 | 05:54 |
| Zirconis | Fairy Tail - #6622 | 05:54 |
| Belno | Fairy Tail - #6651 | 05:54 |
| Byro Cracy | Fairy Tail - #6647 | 05:54 |
| Chronos | Fairy Tail - #6631 | 05:54 |
| Faust | Fairy Tail - #6643 | 05:54 |
| Marco Belunjay | Fairy Tail - #6635 | 05:54 |
| Sol | Fairy Tail - #6639 | 05:54 |
| Bloodman | Fairy Tail - #6628 | 05:54 |
| Draculos Hyberi... | Fairy Tail - #6656 | 05:54 |
| Ezel | Fairy Tail - #6624 | 05:54 |
| Kaby Melon | Fairy Tail - #6640 | 05:54 |
| Kazuma Matsuo... | Blue Box - #6636 | 05:54 |
| Madmole | Fairy Tail - #6632 | 05:54 |
| Zato | Fairy Tail - #6644 | 05:54 |
| Zoldeo | Fairy Tail - #6648 | 05:54 |
| Andre Boom Bo... | STEEL BALL RUN JoJo's ... | 05:55 |
| Bai Niangniang | The Apothecary Diaries - ... | 05:55 |
| Kaby no Tsuma | Fairy Tail - #6665 | 05:55 |
| Neinhart | Fairy Tail * #6657 | 05:55 |
| Rob | Fairy Tail - #6677 | 05:55 |
| Bora | Fairy Tail - #6670 | 05:55 |
| Eclipse Ophiuch... | Fairy Tail - #6666 | 05:55 |
| L.A. Boom Boom | STEEL BALL RUN JoJo's ... | 05:55 |
| Rung | Fairy Tail - #6658 | 05:55 |
| Benjamin Boom... | STEEL BALL RUN JoJo's ... | 05:55 |
| Novaili | Fairy Tail - #6679 | 05:55 |
| Sameko | Fairy Tail - #6667 | 05:55 |
| Skullion Raider | Fairy Tail - #6659 | 05:55 |
| Wolfheim | Fairy Tail - #6655 | 05:55 |
| Zekua Melon | Fairy Tail - #6671 | 05:55 |
| Elefseria | Fairy Tail - #6660 | 05:55 |
| Hakune | Fairy Tail - #6664 | 05:55 |
| Karakka | Fairy Tail - #6672 | 05:55 |
| Kashima | Fairy Tail - #6668 | 05:55 |
| Yomazu | Fairy Tail - #6652 | 05:55 |
| Goumon | Fairy Tail > #6697 | 05:56 |
| Guran Doma | Fairy Tail - #6681 | 05:56 |
| Kawazu | Fairy Tail - #6689 | 05:56 |
| Marin Hollow | Fairy Tail * #6701 | 05:56 |
| Moka | Fairy Tail - #6685 | 05:56 |
| Rayule | Fairy Tail * #6673 | 05:56 |
| Usagi | Fairy Tail > #6693 | 05:56 |
| Abel | Fairy Tail - #6698 | 05:56 |
| Bozu | Fairy Tail - #6674 | 05:56 |
| Lapointe | Fairy Tail - #6686 | 05:56 |
| Org | Fairy Tail - #6682 | 05:56 |
| Rabian | Fairy Tail - #6694 | 05:56 |
| Rocker | Fairy Tail - #6678 | 05:56 |
| Velveno | Fairy Tail - #6690 | 05:56 |
| Arlock | Fairy Tail - #6699 | 05:56 |
| Hikaru Kain | Fairy Tail - #6675 | 05:56 |
| Leiji | Fairy Tail - #6683 | 05:56 |
| Noval | Fairy Tail - #6679 | 05:56 |
| Pyxis | Fairy Tail - #6691 | 05:56 |
| Yeagar | Fairy Tail - #6687 | 05:56 |
| Zalty | Fairy Tail - #6695 | 05:56 |
| Alexei | Fairy Tail - #6680 | 05:56 |
| Bobo | Fairy Tail - #6684 | 05:56 |
| Byro | Fairy Tail - #6676 | 05:56 |
| Crawford Seam | Fairy Tail - #6700 | 05:56 |
| D-6 | Fairy Tail - #6696 | 05:56 |
| Darton | Fairy Tail - #6692 | 05:56 |
| Semmes | Fairy Tail - #6688 | 05:56 |
| Bakel | Fairy Tail - #6705 | 05:57 |
| Eita Takasugi | Aoashi - #6729 | 05:57 |
| Ribbon | Fairy Tail - #6717 | 05:57 |
| Balsamico Haku... | Fairy Tail - #6722 | 05:57 |
| Kama | Fairy Tail - #6702 | 05:57 |
| Nebal | Fairy Tail - #6706 | 05:57 |
| Noches | The Detective Is Already ... | 05:57 |
| Younger Vanish ... | Fairy Tail - #6726 | 05:57 |
| Eisenwaild Chick... | Fairy Tail - #6707 | 05:57 |
| Orochi Head | Fairy Tail - #6703 | 05:57 |
| Doran | Overgeared - #6708 | 05:57 |
| Joey Fullborn | Fairy Tail - #6720 | 05:57 |
| Neppa | Fairy Tail - #6704 | 05:57 |
| Scarlet | The Detective Is Already ... | 05:57 |
| Zaizen Batsuno... | Even the Student Council... | 05:57 |
| Eisenwald Twins | Fairy Tail - #6725 | 05:58 |
| Lioh | Reincarnated as a Sword - #6 | 05:58 |
| Mu Qing | Kusuriya no Hitorigoto: B... | 05:58 |
| Tenshu | Fairy Tail - #6709 | 05:58 |
| Avida Yang | Cyberpunk: Edgerunners ... | 05:58 |
| Byard | Fairy Tail - #6718 | 05:58 |
| Klodoa | Fairy Tail - #6730 | 05:58 |
| Yuika Suse | Witch on the Holy Night - #67 | 05:58 |
| Krov | Fairy Tail - #6715 | 05:58 |
| Mattan Ginger | Fairy Tail - #6711 | 05:58 |
| Mimi | Fairy Tail - #6727 | 05:58 |
| Older Vanish Bro... | Fairy Tail - #6723 | 05:58 |
| Snarl | Fairy Tail - #6719 | 05:58 |
| Youko | Fairy Tail - #6731 | 05:58 |
| Zaht Brozudo | As a Reincarnated Aristo... | 05:58 |
| Daichi Midorika... | The Ramparts of Ice - #6... | 05:58 |
| Joey Fullborm | Fairy Tail - #6720 | 05:58 |
| Musia Trick | As a Reincarnated Aristo... | 05:58 |
| Wan Chanzi | Fairy Tail - #6716 | 05:58 |
| Aed | Fairy Tail - #6721 | 06:01 |
| Fortune Teller | Fairy Tail - #6724 | 06:01 |
