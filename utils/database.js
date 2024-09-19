//<------------------ Database Connection ------------------->
// === Importer le dotenv ===
require("dotenv").config();
// === Importer le module Sequelize ===
const { Sequelize } = require("sequelize");



// === Créer une instance de Sequelize ===
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);



// === Exporter la connexion à la base de données ===
module.exports = sequelize;
