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
const sequelize = require("../config/dbConfig"); // Importation de la connexion à la base de données
const { DataTypes } = require("sequelize"); // Importation du module sequelize

// <------------------ Création du modèle User ------------------->
const User = sequelize.define("users", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  zip: {
    type: DataTypes.STRING(7),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: "Email"
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }, 
}, {
  sequelize,
  tableName: "users",
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "email",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "email" },
      ]
    },
  ]
});

// <------------------ Exportation du modèle User ------------------->
module.exports = User;