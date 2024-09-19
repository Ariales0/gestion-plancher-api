// <------------------ Modele User ------------------->
// === Importer le module Sequelize ===
const sequelize = require("../config/db");


// === Créer le modèle de la table "users" ===
const User = sequelize.define("users", {
    id: {
      type: sequelize.Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
});


// === Exporter le modèle User ===
module.exports = User;
