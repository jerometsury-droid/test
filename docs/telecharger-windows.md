# Télécharger la version Windows depuis GitHub

1. Ouvrir https://github.com/jerometsury-droid/test/actions .
2. Ouvrir le dernier lancement « Kyara Solo Windows » et attendre sa réussite.
3. En bas, dans **Artifacts**, télécharger **KyaraSolo-Windows-v0.3**. GitHub demande une connexion pour télécharger un artefact.
4. Extraire **tout** le ZIP avec WinRAR ou l'Explorateur Windows, puis lancer **KyaraSolo.exe**. Windows 10/11 64 bits est nécessaire.

Le workflow compile sur Windows, exécute les tests du moteur et un parcours réel du .exe, puis fournit le dossier complet. Le fichier .exe seul ne suffit pas : ses DLL et `resources` doivent rester à côté. L'artefact est conservé 30 jours ; l'action peut être relancée manuellement avec « Run workflow » pour en recréer un.

La première compilation et son test natif ne sont pas réputés réussis avant que GitHub affiche le résultat. Cette procédure évite les liens de fichiers cloud dont le téléchargement a échoué dans le chat.
