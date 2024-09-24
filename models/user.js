// <------------------ Modele User ------------------->
// === Importer le module Sequelize ===
const sequelize = require("../config/db");


// === Créer le modèle de la table "users" ===
const User = sequelize.define("Users", {
    UserId: {
      type: sequelize.Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    FirstName: {
      type: sequelize.Sequelize.STRING(50),
      allowNull: false,
    },
    LastName: {
      type: sequelize.Sequelize.STRING(50),
      allowNull: false,
    },
    Address: {
      type: sequelize.Sequelize.STRING(150),
      allowNull: false,
    },
    City: {
      type: sequelize.Sequelize.STRING(70),
      allowNull: false,
    },
    State: {
      type: sequelize.Sequelize.STRING(30),
      allowNull: false,
    },
    Zip: {
      type: sequelize.Sequelize.STRING(7),
      allowNull: false,
    },
    Country: {
      type: sequelize.Sequelize.STRING(30),
      allowNull: false,
    },
    Email: {
      type: sequelize.Sequelize.STRING(200),
      allowNull: false,
    },
    Password: {
      type: sequelize.Sequelize.STRING(255),
      allowNull: false,
    },
});


// === Exporter le modèle User ===
module.exports = User;