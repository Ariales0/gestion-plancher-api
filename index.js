// <----------- Section importation ------------->
require("dotenv").config(); // Importation du module dotenv
const express = require("express"); // Importation du module express
const sequelize = require("./config/db"); // Importation de la connexion à la base de données
const userRoutes = require("./routes/userRoutes");  // Importation des routes utilisateur


// <----------- Section configuration ------------->
const port = process.env.PORT;  // Récupération du port du serveur
const app = express();  // Création de l'application express
app.use(express.json());  // Utilisation du middleware pour comprendre les requêtes en JSON


// <-----------Section base de données------------->
// === Authentification et Synchronisation à la base de données ===
sequelize.authenticate().then(() => {
  console.log("Connexion à la base de données réussie !");
  return sequelize.sync({ force: false });  // Force: false pour ne pas écraser les données
}).then(() => {
  console.log("Synchronisation des modèles réussie !");
}).catch((error) => {
  console.error("Impossible de se connecter à la base de données:", error);
});


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


// <----------- Section des routes ------------->
app.use("/users", userRoutes); // Routes pour les utilisateurs

