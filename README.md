# Gestion Plancher

Ce projet est une API construite avec Node JS pour le projet WEB. Elle est toujours en cours de développement et sera améliorée tout au long du cours.

## Équipe de développement

- Lyes Hamrani
  
- Quentin Lecourt
  
- Steve Lepage
  

## Prérequis

- Visual Studio Code (avec REST Client)
  
- Git
  
- Node JS
  
- Serveur SQL
  
- Postman
  

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

DB_HOST='localhost' 

DB_USER='utilisateur_BD'

DB_PASS='mot_de_passe_bd'

DB_NAME='chat'

DB_PORT=3306  # Exemple, spécifiez le port si nécessaire

PORT=3000  # Exemple, spécifiez le port souhaité
```

Remplacez les valeurs par celles qui correspondent à votre configuration.

## Lancer le service

```bash
node index.js
```

## Utilisation

Une fois l'API démarrée, vous pouvez envoyer des requêtes HTTP à `http://localhost:3000`

## Documentation de l'API

## Collaboration

N'hésitez pas à ouvrir une issue ou à faire une pull request pour vos modifications !