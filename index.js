const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.json({message: "Bienvenue sur notre API en Node JS !"});
});

app.listen(port, () => {
  console.log(`Serveur est en ligne !`);
})

