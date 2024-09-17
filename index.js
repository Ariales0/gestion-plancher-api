require('dotenv').config(); // Importer la configuration de dotenv

const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express'); // Importer le framework Express

const swaggerUI = require('swagger-ui-express'); // Importer Swagger UI
const swaggerJsDoc = require('swagger-jsdoc'); // Importer Swagger JS Doc

const port = 3000; // Port du serveur

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
    message: "Test Quentin 8 !",
  };
  res.json(welcome);
});






