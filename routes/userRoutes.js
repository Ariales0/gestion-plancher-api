// <------------------ Section Importation ------------------->
const express = require("express"); // Importation du module express
const router = express.Router(); // Création d'un routeur express
const userController = require("../controllers/userController"); // Importation du contrôleur utilisateur

// <------------------ Routes ------------------->
// === Route d'enregistrement d'un utilisateur ===
router.post('/register', userController.register);

// === Route de connexion d'un utilisateur ===
router.post('/login', userController.login);


// <------------------ Exportation du module ------------------->
module.exports = router;