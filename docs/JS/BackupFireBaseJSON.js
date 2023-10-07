const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require('path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mods-manager-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'mods-manager.appspot.com',
});

// Reference to your Realtime Database data
const database = admin.database().ref('/');

// Download JSON data and save it as a local file
database.once('value', (snapshot) => {
  const jsonData = JSON.stringify(snapshot.val());
  fs.writeFileSync('local_file.json', jsonData);
  console.log('JSON data downloaded and saved as local_file.json');

  // Reference to Firebase Storage bucket
  const bucket = admin.storage().bucket();

  // Specify the local path to the JSON file
  const localFilePath = 'local_file.json';

  // Specify the destination path in Firebase Storage
  const storageFilePath = 'Mods-Manager Backup/';

  // Upload the local file to Firebase Storage
  bucket.upload(localFilePath, {
    destination: storageFilePath,
  })
    .then(() => {
      console.log('File uploaded to Firebase Storage');
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
    });
});

document.getElementById('board-backup-btn').addEventListener('click', function () {
    //Backup du fichier json sur Storage firebase
});