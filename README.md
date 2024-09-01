Gestion Plancher

Ce projet est une API construite avec Node.js. Pour commencer à l'utiliser, suivez les instructions ci-dessous.

L'API est toujours en cours de développement pour le projet WEB. Elle a été créée par l'équipe de : Lyes, Quentin et Steve et sera améliorée tout au long du cours.

Prérequis :

Visual Studio Code (avec REST Client)
Git
Node.js
Serveur MySQL ou phpMyAdmin
Postman
Instructions :

Clonez le projet Git sur votre machine locale.
Ouvrez le dossier dans VSCode.
Installez les dépendances du projet en exécutant la commande suivante :
bash
Copier le code
npm install
Configuration :

Ce projet utilise des variables d'environnement pour la configuration. Vous devez créer un fichier .env à la racine du projet et y définir les variables d'environnement suivantes :

plaintext
Copier le code
DB_HOST='localhost' // Exemple, spécifiez l'URL de votre BDD
DB_USER='utilisateur_BD'
DB_PASS='mot_de_passe_bd'
DB_NAME='chat'
DB_PORT=3306 // Exemple, spécifiez le port si nécessaire
PORT=3000 // Exemple, spécifiez le port souhaité
Remplacez les valeurs par celles qui correspondent à votre configuration.

Lancer le service :

bash
Copier le code
npm start
Utilisation :

Une fois l'API démarrée, vous pouvez envoyer des requêtes HTTP à http://localhost:3000.

Documentation de l'API :

Une fois l'API démarrée, vous pouvez demander sa documentation à [insérez ici le lien vers la documentation si disponible].

Collaboration :

N'hésitez pas à ouvrir une issue ou à faire une pull request pour vos modifications !