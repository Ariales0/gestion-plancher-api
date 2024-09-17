require('dotenv').config(); // Importer la configuration de dotenv

const swaggerJSDoc = require('swagger-jsdoc');
const connection = require('./utils/database'); // Importer la connexion à la base de données
const express = require('express'); // Importer le framework Express

const swaggerUI = require('swagger-ui-express'); // Importer Swagger UI
const swaggerJsDoc = require('swagger-jsdoc'); // Importer Swagger JS Doc

const port = process.env.PORT; // Port du serveur

// Créer une application Express
const app = express();

// Middleware pour parser les requêtes de type application/json
app.use(express.json());




// Vérifier si la connexion est active
app.listen(port, () => {
  console.log(`L'API est en ligne !`);
});



// Définir la route par défaut
app.get('/', (req, res) => {
  const welcome = {
    message: "Test Quentin 2 !",
  };
  res.json(welcome);
});






