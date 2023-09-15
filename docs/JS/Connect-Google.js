document.getElementById('login-button').addEventListener('click', function() {
    // Redirigez l'utilisateur vers l'URL d'autorisation OAuth2
    const clientId = '471223344745-vm46l33eim5l0n4936eus85rvtqk9ti6.apps.googleusercontent.com';
    const redirectUri = 'https://raynko.github.io/ModsManager/';
    const scope = 'https://www.googleapis.com/auth/spreadsheets';
    const responseType = 'token';
  
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  
    window.location.href = authUrl;
  });

const { google } = require('googleapis');
const credentials = require('JSON/client_secret_471223344745-vm46l33eim5l0n4936eus85rvtqk9ti6.apps.googleusercontent.com.json');

const client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Configurer le scope pour les autorisations en écriture
client.scope = 'https://www.googleapis.com/auth/spreadsheets';

// Créer un lien d'autorisation
const authUrl = client.generateAuthUrl({
  access_type: 'offline',
  scope: client.scope,
});

// Rediriger l'utilisateur vers l'URL d'autorisation
console.log('Autorisez cette application en visitant cette URL :', authUrl);
