// Définissez la clé d'API
const API_KEY = "AIzaSyBt9lVYDzQlZejxBazEUWQ5cpFoiwIipFc";

// Chargez la bibliothèque auth2 de l'API Google
gapi.load('auth2', function() {
  // Initialisez la bibliothèque auth2 avec l'ID client OAuth
  gapi.auth2.init({
    client_id: '702805947096-frr4g6bhsesi47rttemrop3g6tqonbe7.apps.googleusercontent.com',
  }).then(function() {
    // Lorsque la bibliothèque auth2 est initialisée, vous pouvez gérer l'autorisation OAuth
    const auth2 = gapi.auth2.getAuthInstance();

    // Fonction pour gérer l'authentification de l'utilisateur
    function handleAuth() {
      auth2.signIn().then(function() {
        // L'utilisateur est authentifié, vous pouvez maintenant accéder à la feuille Google Sheets.
        // Vous devrez utiliser le jeton d'accès OAuth pour effectuer des requêtes à l'API Sheets.
        // Vous pouvez ajouter votre code d'accès à Sheets ici.
      }).catch(function(error) {
        // Gérez les erreurs d'authentification ici, par exemple affichez un message à l'utilisateur.
        console.error('Erreur d\'authentification :', error);
      });
    }

    // Associez la fonction de gestion de l'authentification à un bouton ou un événement de votre choix.
    // Par exemple, lorsque l'utilisateur clique sur un bouton "Se connecter".
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', handleAuth);
  });
});

gapi.load('client:auth2', function() {
    gapi.client.init({
      apiKey: 'AIzaSyBt9lVYDzQlZejxBazEUWQ5cpFoiwIipFc',
      clientId: '702805947096-frr4g6bhsesi47rttemrop3g6tqonbe7.apps.googleusercontent.com',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    }).then(function() {
      // L'initialisation est terminée, vous pouvez maintenant effectuer des opérations sur Google Sheets.
    });
  });

// Fonction pour écrire des données dans Google Sheets
function writeToSheet(values) {
  // ID de la feuille Google Sheets que vous souhaitez mettre à jour.
  const spreadsheetId = '1-ejd-hiK_HEZKdhDRiLEXLwMcst_L9JueqO_dnGAvy4';

  // Utilisez la méthode spreadsheets.values.append pour ajouter les données à la feuille.
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: 'A1', // Indiquez la cellule de départ où vous souhaitez ajouter les données.
    valueInputOption: 'RAW', // Vous pouvez spécifier comment les données doivent être interprétées (en brut, formules, etc.).
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [values],
    },
  }).then(function(response) {
    console.log('Données ajoutées avec succès !');
    // Réinitialisez les champs du formulaire ou affichez un message de succès à l'utilisateur.
  }).catch(function(error) {
    console.error('Erreur lors de l\'écriture des données :', error);
  });
}

// Ajoutez un gestionnaire d'événements pour le formulaire.
document.getElementById('new-mod-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre normalement.

  // Obtenez les valeurs des champs du formulaire.
  const cat = document.getElementById('cat-field').value;
  const image = document.getElementById('image-field').value;
  const name = document.getElementById('name-field').value;
  const type = document.getElementById('type-field').value;
  const desc = document.getElementById('desc-field').value;
  const version = document.getElementById('version-field').value;
  const link = document.getElementById('link-field').value;

  // Créez un tableau avec les valeurs du formulaire.
  const values = [cat, image, name, type, desc, version, link];

  // Utilisez la fonction writeToSheet() pour ajouter les données à Google Sheets.
  writeToSheet(values);
});
