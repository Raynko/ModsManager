const express = require("express");
const app = express();
const port = 3000;

// Configurez votre point de terminaison
app.get("/mon-endpoint", (req, res) => {
  // Traitement de la requête ici
  res.send("Réponse depuis Node.js !");
});

app.use(express.json()); // Middleware pour analyser le corps des requêtes en JSON

// Votre fichier JSON (supposez qu'il est déjà chargé dans une variable `jsonData`)

app.post("/ajouterElement", (req, res) => {
  const nouvelElement = req.body; // Données JSON envoyées depuis la page HTML

  // Ajoutez le nouvel élément à votre fichier JSON
  jsonData.category.push(nouvelElement);

  // Enregistrez les modifications dans le fichier JSON (vous devez écrire ce code)
  // ...

  res.json({ message: "Élément ajouté avec succès" });
});

app.use(express.static(__dirname));

// Route pour servir le fichier HTML à la racine
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/model.html');
});

app.listen(port, () => console.log(`Serveur en cours d'exécution sur http://localhost:${port}`));
