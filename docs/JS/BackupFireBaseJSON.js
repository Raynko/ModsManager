BackupButton = document.getElementById('board-backup-btn');

// Lorsque le bouton est cliqué
BackupButton.addEventListener('click', function () {
    // Référence à votre base de données Firebase Realtime
    const database = firebase.database();
    
    // Générer un nom de fichier unique basé sur le timestamp
    const backupFileName = `Backup ${moment().format('(DD-MM-YYYY HH:mm:ss)')}.json`;
    
    // Récupérer les données JSON de la base de données
    database.ref('/').once('value')
      .then((snapshot) => {
        const jsonData = JSON.stringify(snapshot.val());

        // Référence au stockage Firebase
        const storageRef = firebase.storage().ref();

        // Créer une référence au fichier dans le stockage Firebase
        const backupFileRef = storageRef.child(backupFileName);

        // Mettre le contenu JSON dans le fichier
        return backupFileRef.putString(jsonData, 'raw');
      })
      .then((snapshot) => {
        console.log('Fichier JSON sauvegardé dans le stockage Firebase');

        // Afficher l'alerte Backup
        alertmessage.innerHTML = "Backup Réussi !"
        alertmessage.style.display = "block";

        // Cacher l'alerte après 3 secondes
        setTimeout(() => {
          alertmessage.style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        console.error('Erreur lors de la sauvegarde du fichier JSON dans le stockage Firebase :', error);
      });
  });
