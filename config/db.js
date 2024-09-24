//<------------------ Database Connection ------------------->
require("dotenv").config(); // Importation du module dotenv
const { Sequelize } = require("sequelize"); // Importation du module sequelize


// === Créer une instance de Sequelize ===
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define:{
        timestamps: false, // Désactiver les timestamps par défaut
        freezeTableName: true, // Désactiver la pluralisation des noms de table
    },
});


// === Exporter la connexion à la base de données ===
module.exports = sequelize;
