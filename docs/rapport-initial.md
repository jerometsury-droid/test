# Kyara — audit de reproduction locale solo

**Date : 14 octobre 2026. Site : https://kyara.games/. Mise à jour : analyse de la vidéo utilisateur de 23,45 secondes (1920 × 1080, 60 images/s).**

## 1. Portée, résultat et limite de l’audit

Ce document sert de cahier de reconstruction à ChatGPT et Codex. Il décrit les observations réellement obtenues sur le site, les données chiffrées affichées et les choix d’implémentation proposés pour une version locale solo.

**L’exploration exhaustive demandée n’a pas pu être terminée.** Un widget Cloudflare « Vérifiez que vous êtes humain » est apparu pendant l’examen des cartes sur `/raretes`. Il était encore présent après un unique rechargement. L’exploration du site a été arrêtée à ce point, sans résolution de CAPTCHA ni contournement. Les pages Collection, Marché, Missions, Parrainage, Wiki et les profils n’ont donc pas été visitées. Leurs liens et certaines de leurs fonctions sont visibles depuis l’accueil, mais cela ne constitue pas une inspection de leurs écrans.

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
| `/wiki` | Toutes les fiches des personnages | Lien du menu Plus observé seulement |
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
