require('dotenv').config();
const express = require('express');
const port = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
    const welcome = {
        message: "Bienvenue sur notre API en Node JS!",
    };
    res.json(welcome);
});

app.listen(port, () => {
  console.log(`Serveur est en ligne sur le port ${port}`);
})

