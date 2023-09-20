const urlParams = new URLSearchParams(window.location.search);
const modpackName = Array.from(urlParams.keys())[0];

// Récupérez une référence à la base de données Firebase avec le nom du modpack
const modpackRef = firebase.database().ref('Modpacks/' + modpackName);

// Sélectionnez le conteneur pour les mods
const modsContainer = document.getElementById('element-list');

// Gérez les modifications dans le nœud "Mods"
modpackRef.child('Mods').on('child_added', (snapshot) => {
    // Obtenir les données du mod à partir de Firebase
    const modData = snapshot.val();

    // Créez un nouvel élément mod basé sur le modèle
    const modElement = document.getElementById('element-template').cloneNode(true);
    modElement.removeAttribute('style'); // Afficher l'élément

    // Mettez à jour les éléments du modèle avec les données du mod
    modElement.querySelector('.element-image').src = modData.image || 'IMG/blankPic.png';
    modElement.querySelector('.element-name').textContent = modData.name;
    modElement.querySelector('.element-type').textContent = modData.type;
    modElement.querySelector('.element-desc').textContent = modData.description;
    modElement.querySelector('.element-version').textContent = modData['version-installed'];
    modElement.querySelector('.element-link').href = modData.link;

    // Ajoutez l'élément mod au conteneur des mods
    modsContainer.appendChild(modElement);
});
