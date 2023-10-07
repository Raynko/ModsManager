// Lorsque le bouton est cliqué
document.getElementById('board-backup-btn').addEventListener('click', function () {
    // Reference to your Realtime Database data
    const database = firebase.database().ref('/');
  
    // Générer un nom de fichier unique basé sur le timestamp
    const backupFileName = `backup_${moment().format('YYYYMMDD_HHmmss')}.json`;
  
    // Télécharger JSON data
    database.once('value', (snapshot) => {
      const jsonData = JSON.stringify(snapshot.val());
  
      // Créer un objet Blob à partir des données JSON
      const blob = new Blob([jsonData], { type: 'application/json' });
  
      // Créer un lien d'ancrage pour le téléchargement
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = backupFileName;
  
      // Cliquez sur le lien pour démarrer le téléchargement
      downloadLink.click();
    });
  });

  
  
  
  