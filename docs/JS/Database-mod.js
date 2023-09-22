const urlParams = new URLSearchParams(window.location.search);
const modpackName = Array.from(urlParams.keys())[0];

// Récupérez une référence à la base de données Firebase avec le nom du modpack
const modpackRef = firebase.database().ref('Modpacks/' + modpackName);

// Sélectionnez le conteneur global pour les mods
const elementListContainer = document.querySelector('.all-mods');

// Récupérez une référence aux catégories depuis Firebase
const categoriesRef = firebase.database().ref('Mods-Settings/Catégories');

// Récupére une référence au select de catégories dans le formulaire
const categoryDropdown = document.getElementById('category-field');



// Chargez les options de category depuis Firebase
categoriesRef.on('value', (snapshot) => {

    // Supprimez toutes les options actuelles du select, sauf la première option ajoutée manuellement
    while (categoryDropdown.childNodes.length > 2) {
        categoryDropdown.removeChild(categoryDropdown.lastChild);
    }

    snapshot.forEach((childSnapshot) => {
        const category = childSnapshot.val();
        const option = document.createElement('option');
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
});

// Récupérez une référence aux versions depuis Firebase
const versionsRef = firebase.database().ref('Modpack-Settings/Modpack-Version');

// Récupére une référence au select de versions dans le formulaire
const versionDropdown = document.getElementById('version-field');

// Chargez les options de version de minecraft depuis Firebase
versionsRef.on('value', (snapshot) => {

    // Supprimez toutes les options actuelles du select, sauf la première option ajoutée manuellement
    while (versionDropdown.childNodes.length > 2) {
        versionDropdown.removeChild(versionDropdown.lastChild);
    }

    snapshot.forEach((childSnapshot) => {
        const version = childSnapshot.val();
        const option = document.createElement('option');
        option.textContent = version;
        versionDropdown.appendChild(option);
    });
});

// Cette fonction supprime tous les enfants d'un élément
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Fonction pour supprimer une catégorie si elle est vide
function removeEmptyCategory(categoryElement) {
    const modsContainer = categoryElement.querySelector('.list-content');
    if (!modsContainer.hasChildNodes()) {
        categoryElement.remove(); // Supprimez la catégorie de l'affichage
    }
}

categoriesRef.on('value', (snapshot) => {
    const categories = snapshot.val();

    // Videz le conteneur global pour les mods
    removeAllChildren(elementListContainer);

    // Bouclez sur chaque catégorie
    categories.forEach((category) => {
        // Créez un nouvel élément de catégorie basé sur le modèle
        const categoryElement = document.querySelector('#category-template').cloneNode(true);
        categoryElement.removeAttribute('style'); // Afficher l'élément

        // Mettez à jour le titre de la catégorie
        categoryElement.querySelector('.list-cat-title').textContent = category;

        // Sélectionnez le conteneur pour les mods de cette catégorie
        const modsContainer = categoryElement.querySelector('.list-content');

        // Récupérez une référence aux mods du modpack actuel dans cette catégorie
        const modsInCategoryRef = modpackRef.child('Mods');

        modsInCategoryRef.on('value', (modsSnapshot) => {
            let categoryHasMods = false; // Indicateur pour vérifier s'il y a des mods dans la catégorie

            // Videz le conteneur des mods de cette catégorie
            removeAllChildren(modsContainer);

            modsSnapshot.forEach((modSnapshot) => {
                // Obtenir les données du mod à partir de Firebase
                const modData = modSnapshot.val();

                // Vérifier si le mod appartient à la catégorie actuelle
                if (modData.category === category) {
                    // Créez un nouvel élément mod basé sur le modèle
                    const modElement = document.querySelector('#element-template').cloneNode(true);
                    modElement.removeAttribute('style'); // Afficher l'élément

                    // Mettez à jour les éléments du modèle avec les données du mod
                    modElement.querySelector('.element-image').src = modData.image || 'IMG/blankPic.png';
                    modElement.querySelector('.element-name').textContent = modSnapshot.key;
                    modElement.querySelector('.element-type').textContent = modData.type;
                    modElement.querySelector('.element-desc').textContent = modData.description;
                    modElement.querySelector('.element-version').textContent = modData['version-installed'];
                    modElement.querySelector('.element-link').href = modData.link;

                    // Ajoutez l'élément mod au conteneur des mods de cette catégorie
                    modsContainer.appendChild(modElement);

                    // Indiquez qu'il y a des mods dans la catégorie
                    categoryHasMods = true;
                }
            });

            // Appelez la fonction pour supprimer la catégorie si elle est vide
            removeEmptyCategory(categoryElement);

            // Ajoutez l'élément de catégorie au conteneur global des mods seulement s'il y a des mods dans la catégorie
            if (categoryHasMods) {
                elementListContainer.appendChild(categoryElement);
            }
            
            SynchScroll();
        });
    });
});

// Sélectionnez le formulaire d'ajout de catégorie
const addCategoryForm = document.getElementById('add-new-category');


// Fonction pour récupérer le dernier nombre d'identifiant utilisé
function getLastCategoryId() {
    return categoriesRef.once('value').then((snapshot) => {
        // Parcourez toutes les catégories pour trouver la plus grande clé numérique
        let lastCategoryId = -1;
        snapshot.forEach((childSnapshot) => {
            const categoryId = parseInt(childSnapshot.key);
            if (!isNaN(categoryId) && categoryId > lastCategoryId) {
                lastCategoryId = categoryId;
            }
        });
        return lastCategoryId;
    });
}

// Écoutez l'événement de soumission du formulaire
addCategoryForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêchez la soumission par défaut du formulaire

    // Récupérez la valeur du champ de texte pour la nouvelle catégorie
    const newCategoryInput = document.getElementById('new-category-field');
    const newCategory = newCategoryInput.value.trim(); // Supprimez les espaces inutiles

    // Vérifiez si la nouvelle catégorie n'est pas vide
    if (newCategory !== '') {
        try {
            // Obtenez le dernier numéro d'identifiant utilisé
            const lastCategoryId = await getLastCategoryId();

            // Calculez le prochain identifiant
            const nextCategoryId = lastCategoryId + 1;

            // Ajoutez la nouvelle catégorie avec l'identifiant calculé
            await categoriesRef.child(nextCategoryId.toString()).set(newCategory);

            // Effacez le champ de texte après l'ajout
            newCategoryInput.value = '';
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie :', error);
        }
    }
});
