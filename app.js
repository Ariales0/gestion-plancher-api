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
const sequelize = require("./config/dbConfig"); // Importation de la connexion à la base de données
const userRoutes = require("./routes/userRoutes"); // Importation des routes utilisateur
const brokerRoutes = require("./routes/brokerRoutes"); // Importation des routes broker
const thermostatRoutes = require("./routes/thermostatRoutes"); // Importation des routes thermostat
const swaggerJSDoc = require("swagger-jsdoc"); // Importation du module swagger-jsdoc
const swaggerUi = require("swagger-ui-express"); // Importation du module swagger-ui-express
const { initAssociations } = require("./models/association"); // Importation des associations
const cors = require('cors'); // Importation de CORS

// <----------- Section configuration ------------->
const port = process.env.PORT; // Configuration du port
const environment = process.env.NODE_ENV; // Configuration de l'environnement
const app = express(); // Création de l'application express
app.use(express.json()); // Utilisation du middleware pour comprendre les requêtes en JSON
app.use(cors()); // Utilisation de CORS

// <-----------Section base de données------------->
// === Tester la connexion à la base de données ===
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
    try {
      initAssociations();
      console.log("Associations initialisées !");
    } catch (error) {
      console.error("Impossible d'initialiser les associations:", error);
    }
  })
  .catch((error) => {
    console.error("Impossible de se connecter à la base de données:", error);
  });

// <----------- Section API ------------->
// === Démarrer le serveur ===
app.listen(port, () => {
  console.log(`Le serveur est en ligne sur l'adresse http://localhost:${port}`);
});

// <----------- Section swagger ------------->
// === Configuration de la documentation swagger ===
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gestion Plancher",
      version: "1.0.0",
      description: "API principale pour la gestion des planchers",
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
  res.json("API principale pour la gestion des planchers");
});

// === Routes utilisateur ===
app.use("/users", userRoutes);

// === Routes broker ===
app.use("/brokers", brokerRoutes);

// === Routes thermostat ===
app.use("/thermostats", thermostatRoutes);
