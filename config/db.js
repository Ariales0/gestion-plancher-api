/*
 * ============================================================================
 * File: db.js
 * Project: Gestion plancher
 * Created Date: 17/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 24/09/2024
 * Modified By: Lyes Hamrani
 * -----
 * Copyright (c) 2024 Lyes Hamrani, Quentin Lecourt, Steve Lepage
 * ============================================================================
 * Description: Configuration de la connexion à la base de données
 * ============================================================================
 */

//<------------------ Section importation ------------------->
require("dotenv").config(); // Importation du module dotenv
const { Sequelize } = require("sequelize"); // Importation du module sequelize

//<------------------ Section configuration ------------------->
// === Créer une instance de Sequelize ===
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false, // Désactiver les timestamps par défaut
      freezeTableName: true, // Désactiver la pluralisation des noms de table
    },
  }
);

// === Exporter la connexion à la base de données ===
module.exports = sequelize;
