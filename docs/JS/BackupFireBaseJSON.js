document.getElementById('board-backup-btn').addEventListener('click', function () {
    // Récupérez une référence à la base de données Firebase
    const database = firebase.database();

    // Récupérez toutes les données de la base de données Firebase
    database.ref('/').once('value', (snapshot) => {
        const firebaseData = snapshot.val();
        const jsonData = JSON.stringify(firebaseData);
    
        // Créez un nouveau fichier sur Google Drive
        const fileMetadata = {
        name: 'exportedData.json', // Nom du fichier
        mimeType: 'application/json', // Type MIME du fichier
        };
    
        const media = {
        mimeType: 'application/json',
        body: jsonData, // Les données JSON que vous souhaitez écrire
        };
    
        gapi.client.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id', // Vous pouvez spécifier les champs que vous voulez récupérer ici
        }).then((response) => {
        console.log('Fichier créé avec succès. ID du fichier : ', response.result.id);
        }).catch((error) => {
        console.error('Erreur lors de la création du fichier : ', error);
        });
    });
});

// Assurez-vous que la bibliothèque Google API Client JavaScript est chargée
gapi.load('client:auth2', () => {
    // Initialisez le client Google Drive
    gapi.client.init({
      apiKey: 'AIzaSyCu2bExV4bdbSrB11UAxDIP3p-G9FWSj9o', // Remplacez par votre clé API Google
      clientId: '32145566432-4hibl0s0si390h2thhv70qdejhs898ee.apps.googleusercontent.com', // Remplacez par votre ID client Google
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      scope: 'https://www.googleapis.com/auth/drive.file',
    }).then(function () {
      // Configuration de l'authentification avec le compte de service
      const key = {
        client_email: 'firebase-adminsdk-1tlra@mods-manager.iam.gserviceaccount.com',
        private_key: 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC18i3kOEk889uV\ngBctUGUVvTG/EUA0fGsS8HSbsjdi76ytkiwZfkKhWMHsvFPMdyYgBNBFcSOL/vFJ\nXsERGTVStoiXAy/+wDxnqO9lxaJhqaVnkd2H5Nd8kU5udAiVrQo78n7sbjgQcgg4\newrxMbja5aMg01efIB8xGeOe4VVDlKeeIyYN7MMu4ZJfzA4vn3Wa50VpFuTW3qvp\nwias/85L4Ekcqd1CF/onYrnK16jJ86Bwgzr9/jsdMWC771pmEjnJYgkxh+ab40w7\nWaeemL9efVkSWvtwGMR7gIoZNG8U6uBlpjm4P+bKiII8TNuLKguClDi7h+zNPP+E\nB8019hozAgMBAAECggEAP3esVHjh61YxWdQlwZPSvyORD9JnsCdafm/MbWdcdLGg\nbaeYpIfrnDbG5trG7IL/lJm5QQ/3U2VqK6rW9Czz8ddkjDD7dAUAzTQb1kd7nk+8\nOAWk3juQg454aoUlXXjQIhsz9St5eRseDP220m4CyrDiF5hBb2uYFduvEAQQZxME\nP5SIPiaDmnL25ikBBT5hyOihDAx9vbTK+fTvd8UJHHVjuOo2tBQ8ujZsMPjXPbKJ\nn7dyxNVyu2NrtkPADRn6QEaaS2LrjOOU0BwgKkFuWDkCACL/WCJQe0oVe2zUJ/oK\nceKoypkgdkNeBttA3lAt/Jm+EXgoMtcn6cZnwQMz+QKBgQDflDFsK+Yf3z/mciB/\nXh141vyDGtccTCfG7Qxpn+AVMJ87QZ8iWzqkJUkY9Ohby0TAQ2Gi4Fbwc+YWTMWe\nps2RDWOdmNWu1eJyHsqN4PXrZbavm1WHZaN9UP1+9z3DAbM/a+Ica4qRjigRpjpB\nWlONajjVncD6mb1l12vTSEpdFwKBgQDQVHhaDZP+k3l6SSjoUnXwGNPhuy2n7kVW\nhxBFPBsFbWAdm6OQ8HCMai9TX7om8ue5ktTnc4eEKlnB8akemxB7sVW5v4o9xxxH\njdy2KbPMMWaiu7XlgoRSRJBFYSmHCK179J0gUfvKcS1/EBhn8EIAk/b6OKONdoa/\nWHDS9Ez1RQKBgD4V8e9+9UWOgjklIh8cbIS89pwVnPyPrVARTawbKGfZ+63B2EX7\nHXqtm/HhOJEdDjdxvrAzKhFVreQtZ4dZ/KW2GR6PbW9Cl8JnCIqDmObIdQWo1gRm\nVhMbpXlXgQAg/byz4bNQrccjub7E8VJqmd8gSy4Ow6MThEO+oYOnhHb7AoGABJv5\n1bQ7NAS7SVNZDlrUtS03cuUbS33gFtwCJiYASwxydfU9lzVaqCCpT2Tsz3PMYLS4\n9S3/L5NoTPw1y7GOmc4AoY11V4ySOZsP6Q/fJINrS+pvSdaras6NipttuckdXYK5\n/z8RHReH9Cm9AH+2ViDv8/VQ2Q5oSM+CH4i8MykCgYEAzUc3veW996305f5gKmO8\n7ISNYivqWr3n0EuP+KsF1XSlfl/jF4ftRlnQT79xU1lcceNrXaaRFdFuEUAQSsZq\n3zVDPN0OohxieUlYJigVRlbwi65H7Xls7T9sfbLKNLoFzPNu1GKrdSgTe1ODeBu0\nPFMKgxLJ81u8eN0lBuJvZrA='
        // Le client Google Drive est initialisé avec succès.
        // Vous pouvez maintenant l'utiliser pour interagir avec Google Drive.
}}).catch(function (error) {
    console.error('Erreur lors de linitialisation du client Google Drive : ', error);
  });
});