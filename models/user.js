/*
 * ============================================================================
 * File: user.js
 * Project: Gestion plancher
 * Created Date: 19/09/2024
 * Author: Lyes Hamrani
 * -----
 * Last Modified: 24/09/2024
 * Modified By: Lyes Hamrani
 * -----
 * Copyright (c) 2024 Lyes Hamrani, Quentin Lecourt, Steve Lepage
 * ============================================================================
 * Description: Modèle de la table "users"
 * ============================================================================
 */

// <------------------ Section Importation ------------------->
const sequelize = require("../config/db"); // Importation de la connexion à la base de données
const { DataTypes } = require("sequelize"); // Importation du DataTypes de sequelize (facilitant la création de modèles)

// <------------------ Création du modèle User ------------------->
const User = sequelize.define("Users", {
  UserId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  FirstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  State: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Zip: {
    type: DataTypes.STRING(7),
    allowNull: false,
  },
  Country: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true, // Vérifier si l'email est unique
    validate: {
      isEmail: true, // Vérifier si l'email est valide (format)
    },
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

// <------------------ Exportation du modèle User ------------------->
module.exports = User;
