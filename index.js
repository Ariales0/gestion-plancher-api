require('dotenv').config(); // Importer la configuration de dotenv
const connection = require('./utils/database'); // Importer la connexion à la base de données
const express = require('express'); // Importer le framework Express
const port = process.env.PORT; // Port du serveur

// Créer une application Express
const app = express();

// Middleware pour parser les requêtes de type application/json
app.use(express.json());

// Vérifier la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données !');
});


// Vérifier si la connexion est active
app.listen(port, () => {
  console.log(`L'API est en ligne !`);
});



// Définir la route par défaut
app.get('/', (req, res) => {
  const welcome = {
    message: "Bienvenue sur notre API en Node JS !",
  };
  res.json(welcome);
});

// Récupérer tous les messages
app.get('/ObtenirListeMessages', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des messages');
    } else {
      res.json(results);
    }
  });
});

// Ajouter un message
app.post('/AjouterMessage', (req, res) => {
  const content = req.body.content;
  connection.query('INSERT INTO messages (content) VALUES (?)', [content], (err) => {
    if (err) {
      res.status(500).send('Erreur lors de l\'ajout du message');
    } else {
      res.status(201).send('Message ajouté avec succès');
    }
  });
});






