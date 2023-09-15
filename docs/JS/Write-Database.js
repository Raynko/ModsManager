// Fonction pour ajouter des données à Google Sheets
function addToGoogleSheets(cat, image, name, type, desc, version, link) {
    // Données à ajouter à la feuille de calcul
    const data = {
      values: [[cat, image, name, type, desc, version, link]],
    };
  
    // Endpoint de l'API Google Sheets pour ajouter des données
    const writeApiEndpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS&key=${API_KEY}`;
  
    // Effectuer une requête POST pour ajouter des données
    axios.post(writeApiEndpoint, data)
      .then(response => {
        // Les données ont été ajoutées avec succès
        console.log('Données ajoutées avec succès :', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout des données :', error);
      });
  }
  
  // Écouter la soumission du formulaire
  document.getElementById('new-mod-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher la soumission par défaut du formulaire
  
    // Récupérer les valeurs du formulaire
    const cat = document.getElementById('cat-field').value;
    const image = document.getElementById('image-field').value;
    const name = document.getElementById('name-field').value;
    const type = document.getElementById('type-field').value;
    const desc = document.getElementById('desc-field').value;
    const version = document.getElementById('version-field').value;
    const link = document.getElementById('link-field').value;
  
    // Ajouter les données à Google Sheets
    addToGoogleSheets(cat, image, name, type, desc, version, link);
  
    // Réinitialiser le formulaire
    this.reset();
  
    // Afficher un message de confirmation (vous pouvez personnaliser ce comportement)
    document.querySelector('.alert').style.display = 'block';
  });
  