/*
 * ============================================================================
 * File: server.js
 * Project: Gestion plancher
 * Created Date: 04/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 24/09/2024
 * Modified By: Lyes Hamrani
 * -----
 * Copyright (c) 2024 Lyes Hamrani, Quentin Lecourt, Steve Lepage
 * ============================================================================
 * Description: Fichier principal de l'API
 * ============================================================================
 */

// <----------- Section importation ------------->
require("dotenv").config(); // Importation du module dotenv
const express = require("express"); // Importation du module express
const sequelize = require("./config/db"); // Importation de la connexion à la base de données
const userRoutes = require("./routes/userRoutes"); // Importation des routes utilisateur
const swaggerJSDoc = require("swagger-jsdoc"); // Importation du module swagger-jsdoc
const swaggerUi = require("swagger-ui-express"); // Importation du module swagger-ui-express

// <----------- Section configuration ------------->
const port = process.env.PORT; // Configuration du port
const environment = process.env.NODE_ENV; // Configuration de l'environnement
const app = express(); // Création de l'application express
app.use(express.json()); // Utilisation du middleware pour comprendre les requêtes en JSON

// <-----------Section base de données------------->
// === Tester la connexion à la base de données ===
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((error) => {
    console.error("Impossible de se connecter à la base de données:", error);
  });

// <----------- Section API ------------->
// === Démarrer le serveur ===
app.listen(port, () => {
  console.log(`L'API est en ligne !`);
});

// <----------- Section swagger ------------->
// === Configuration de la documentation swagger ===
const swaggerOptions = {
  definition: { 
    openapi: "3.0.0",
    info: {
      title: "API Gestion Plancher",
      version: "1.0.0",
      description: "API pour la gestion des planchers",
      contact: {
        name: "Melyos",
        email: "melyos@shultersys.org",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`, 
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

// === Afficher la documentation swagger en développement ===
if (environment === "development") {
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// <----------- Section routes ------------->
// === Route de bienvenue ===
app.get("/", (req, res) => {
  const welcome = {
    message: "Bienvenue sur notre API en Node JS !",
  };
  res.json(welcome);
});

// === Routes utilisateur ===
app.use("/users", userRoutes);
