document.getElementById('login-button').addEventListener('click', function() {
    // Redirigez l'utilisateur vers l'URL d'autorisation OAuth2
    const clientId = '471223344745-vm46l33eim5l0n4936eus85rvtqk9ti6.apps.googleusercontent.com';
    const redirectUri = 'https://raynko.github.io/ModsManager/';
    const scope = 'https://www.googleapis.com/auth/spreadsheets';
    const responseType = 'token';
  
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  
    window.location.href = authUrl;
  });