// <----------- Section importation ------------->
// === Importer le module dotenv ===
require("dotenv").config();
// === Importer Express ===
const express = require("express");
// === Importer la connexion à la base de données ===
const sequelize = require("./utils/database");



// <----------- Section configuration ------------->
// === Configuration du port ===
const port = process.env.PORT;
// === Créer une application Express ===
const app = express();
// === Middleware pour parser le JSON ===
app.use(express.json());



// <----------- Section API ------------->
// === Démarrer le serveur ===
app.listen(port, () => {
  console.log(`L'API est en ligne !`);
});
// === Route de bienvenue ===
app.get("/", (req, res) => {
  const welcome = {
    message: "Bienvenue sur notre API en Node JS !",
  };
  res.json(welcome);
});



// <-----------Section base de données------------->
// === Authentification à la base de données ===
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
