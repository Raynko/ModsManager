const urlParams = new URLSearchParams(window.location.search);
const modpackName = Array.from(urlParams.keys())[0];

// Récupérez une référence à la base de données Firebase avec le nom du modpack
const modpackRef = firebase.database().ref('Modpacks/' + modpackName);

// Sélectionnez le conteneur global pour les mods
const elementListContainer = document.querySelector('.all-mods');

// Récupérez une référence aux catégories depuis Firebase
const categoriesRef = firebase.database().ref('Mods-Settings/Catégories');

categoriesRef.once('value', (snapshot) => {
    const categories = snapshot.val();

    // Bouclez sur chaque catégorie
    categories.forEach((category) => {
        // Vérifiez si le modpack possède des mods dans cette catégorie
        modpackRef.child('Mods').orderByChild('category').equalTo(category).once('value', (modsSnapshot) => {
            if (modsSnapshot.exists()) {
                // Créez un nouvel élément de catégorie basé sur le modèle
                const categoryElement = document.querySelector('#category-template').cloneNode(true);
                categoryElement.removeAttribute('style'); // Afficher l'élément

                // Mettez à jour le titre de la catégorie
                categoryElement.querySelector('.list-cat-title').textContent = category;

                // Sélectionnez le conteneur pour les mods de cette catégorie
                const modsContainer = categoryElement.querySelector('.list-content');

                // Gérez les modifications dans le nœud "Mods" pour cette catégorie
                modsSnapshot.forEach((modSnapshot) => {
                    // Obtenir les données du mod à partir de Firebase
                    const modData = modSnapshot.val();

                    // Créez un nouvel élément mod basé sur le modèle
                    const modElement = document.querySelector('#element-template').cloneNode(true);
                    modElement.removeAttribute('style'); // Afficher l'élément

                    // Mettez à jour les éléments du modèle avec les données du mod
                    modElement.querySelector('.element-image').src = modData.image || 'IMG/blankPic.png';
                    modElement.querySelector('.element-name').textContent = modData.name;
                    modElement.querySelector('.element-type').textContent = modData.type;
                    modElement.querySelector('.element-desc').textContent = modData.description;
                    modElement.querySelector('.element-version').textContent = modData['version-installed'];
                    modElement.querySelector('.element-link').href = modData.link;

                    // Ajoutez l'élément mod au conteneur des mods de cette catégorie
                    modsContainer.appendChild(modElement);
                });

                // Ajoutez l'élément de catégorie au conteneur global des mods
                elementListContainer.appendChild(categoryElement);
            }
        });
    });
});
