# Gestion Plancher

Ce projet est une API construite avec Node JS, dans le cadre du cours programmation WEB avané. Elle est toujours en cours de développement et sera améliorée tout au long du cours.

## Équipe de développement

- Lyes Hamrani
  
- Quentin Lecourt
  
- Steve Lepage
  

## Prérequis

Pour le bon fonctionnement du projet nous aurons besoin de :

- Visual Studio Code (avec REST Client)
  
- Git
  
- Node JS
  
- Serveur SQL
  
- Postman
  

## Dépendances

Les diffirents packages utilisés dans la réalisation de l'API

- Express.js
- Sequelize ORM
- JWT Authentication
- Swagger Documentation
- MySQL

## Instructions d'installation

1. Clonez le projet Git sur votre machine locale.
  
2. Ouvrez le dossier dans VSCode.
  
3. Installez les dépendances du projet en exécutant la commande suivante :
  

```bash
npm install

ou

npm i
```

## Configuration

Ce projet utilise des variables d'environnement pour la configuration. Créez un fichier `.env` à la racine du projet et définissez les variables suivantes :

```plaintext
# Exemple, spécifiez l'URL de votre BDD
DB_HOST='localhost' # Mettre l'URL de la base de données
DB_USER='utilisateur_BD' # Mettre le nom d'utilisateur pour la base de données
DB_PASS='mot_de_passe_bd' # Mettre le mot de passe de la base de données
DB_NAME='test' # Modifier selon le nom de la base de données
DB_PORT=3306  # Exemple, spécifiez le port de la base de données si nécessaire
PORT=5000  # Exemple, spécifiez le port souhaité pour démarrer l'API
```

Remplacez les valeurs par celles qui correspondent à votre configuration.

## Lancer le service

```bash
node app.js

ou

npm start
```

## Utilisation

Une fois l'API démarrée, vous pouvez envoyer des requêtes HTTP à `http://localhost:5000`

## Documentation de l'API

Accéder à la documentation de l'api via `http://localhost:5000/api-docs`

## Collaboration

N'hésitez pas à ouvrir une issue ou à faire une pull request pour vos modifications !