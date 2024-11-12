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
const User = sequelize.define("Users", {
  UserId: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  FirstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  LastName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Address: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  City: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  State: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  Zip: {
    type: DataTypes.STRING(7),
    allowNull: false
  },
  Country: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: "Email"
  },
  Password: {
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
        { name: "UserId" },
      ]
    },
    {
      name: "Email",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "Email" },
      ]
    },
  ]
});

// <------------------ Exportation du modèle User ------------------->
module.exports = User;