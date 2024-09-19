// <------------------ Section Importation ------------------->
const express = require("express"); // Importation du module express
const router = express.Router();
const userController = require("../controllers/userController"); // Importation du contrôleur utilisateur

// <------------------ Routes ------------------->
router.post('/register', userController.register);


// <------------------ Exportation du module ------------------->
module.exports = router;