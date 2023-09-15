// Remplacez 'YOUR_API_KEY' par votre clé d'API
const API_KEY = 'AIzaSyBkBLIaoeu-b7rQbzCy9byCW5XNQf30jw4';

// ID de la feuille de calcul Google Sheets
const SPREADSHEET_ID = '1-ejd-hiK_HEZKdhDRiLEXLwMcst_L9JueqO_dnGAvy4';

// Endpoint de l'API Google Sheets pour lire les données
const API_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`;

// Effectuer une requête GET pour lire les données
axios.get(API_ENDPOINT)
  .then(response => {
    // Les données se trouvent dans response.data.values
    console.log(response.data.values);
  })
  .catch(error => {
    console.error(error);
  });