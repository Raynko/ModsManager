// Récupérez une référence à la base de données Firebase
const database = firebase.database();

// Référence aux nœuds "Modpack-Settings" pour les options d'auteur et de version
const authorRef = database.ref('Modpack-Settings/Author');
const versionRef = database.ref('Modpack-Settings/Modpack-Version');

// Sélectionnez les éléments de formulaire
const authorDropdown = document.getElementById('author-field');
const versionDropdown = document.getElementById('version-field');

// Chargez les options depuis Firebase
authorRef.on('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const author = childSnapshot.val();
        const option = document.createElement('option');
        option.textContent = author;
        authorDropdown.appendChild(option);
    });
});

versionRef.on('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const version = childSnapshot.val();
        const option = document.createElement('option');
        option.textContent = version;
        versionDropdown.appendChild(option);
    });
});

// Gérez l'ajout dans la base de données lorsque l'utilisateur soumet le formulaire
const form = document.querySelector('.new-modpack-form');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêchez la soumission par défaut du formulaire

    const name = document.getElementById('name-field').value;
    const author = authorDropdown.value;
    const version = versionDropdown.value;

    // Vérifiez si l'utilisateur a sélectionné une option autre que la valeur par défaut
    if (author === 'Choisir l\'auteur :') {
        // Affichez un message d'erreur
        document.getElementById('alert-author-not-select').style.display = "block";
    } else {
        document.getElementById('alert-author-not-select').style.display = "none";
    }

    if (version === 'Choisir la version :') {
        // Affichez un message d'erreur
        document.getElementById('alert-version-not-select').style.display = "block";
    } else {
        document.getElementById('alert-version-not-select').style.display = "none";
    }

    // Vérifiez si le nom du modpack est unique
    const modpacksRef = database.ref('Modpacks');
    modpacksRef.child(name).once('value', (snapshot) => {

        if (snapshot.exists()) {
            // Si le nom du modpack n'est pas unique
            document.getElementById('alert-existing-modpack').style.display = "block";
        } else {
            document.getElementById('alert-existing-modpack').style.display = "none";
        }

        if (author === 'Choisir l\'auteur :' || version === 'Choisir la version :' || snapshot.exists()) {
            return; // Arrêtez la soumission du formulaire
        }

        // Le nom est unique, ajoutez les données à la base de données Firebase sous "Modpacks" avec les cases à cocher
        // Obtenez les valeurs des cases à cocher
        const categoryChecked = document.getElementById('chk-category').checked;
        const imageChecked = document.getElementById('chk-image').checked;
        const nameChecked = document.getElementById('chk-name').checked;
        const typeChecked = document.getElementById('chk-type').checked;
        const descriptionChecked = document.getElementById('chk-description').checked;
        const installedVersionChecked = document.getElementById('chk-installed-version').checked;
        const modVersionChecked = document.getElementById('chk-mod-version').checked;
        const linkChecked = document.getElementById('chk-link').checked;

        // Ajoutez les données à la base de données Firebase sous "Modpacks" avec les cases à cocher
        const newModpackRef = database.ref(`Modpacks/${name}/Settings`);
        newModpackRef.set({
            Author: author,
            Version: version,
            Section: {
                category: categoryChecked,
                image: imageChecked,
                name: nameChecked,
                type: typeChecked,
                description: descriptionChecked,
                'version-installed': installedVersionChecked,
                'mod-version': modVersionChecked,
                link: linkChecked
            }
        });

        // Réinitialisez le formulaire après l'ajout
        form.reset();

        HideNewModpackForm();
        
    });
});


// Fonction pour afficher les modpacks depuis Firebase sur la page
function displayModpacks() {
    const modpacksContainer = document.querySelector('.all-modpacks');

    // Référence aux nœuds "Modpacks"
    const modpacksRef = database.ref('Modpacks');

    // Récupérez le bouton "Nouveau modpack" et stockez-le dans une variable
    const newModpackButton = document.querySelector('.new-modpack-btn');

    modpacksRef.on('value', (snapshot) => {
        // Réinitialisez le contenu de modpacksContainer
        modpacksContainer.innerHTML = '';

        // Réinsérez le bouton "Nouveau modpack" dans modpacksContainer après avoir ajouté les modpacks
        modpacksContainer.appendChild(newModpackButton);

        snapshot.forEach((childSnapshot) => {
            const modpackKey = childSnapshot.key;
            const modpackData = childSnapshot.child('Settings').val();
            const modpackName = modpackKey;
            const modpackAuthor = modpackData.Author;
            const modpackVersion = modpackData.Version;

            // Créez un élément modpack et ajoutez-le à la page
            const modpackElement = document.createElement('div');
            modpackElement.classList.add('modpack');

            const modpackNameElement = document.createElement('div');
            modpackNameElement.classList.add('modpack-name');
            modpackNameElement.textContent = modpackName;

            const modpackVersionElement = document.createElement('div');
            modpackVersionElement.classList.add('modpack-version');
            modpackVersionElement.textContent = modpackVersion;

            const modpackAuthorElement = document.createElement('div');
            modpackAuthorElement.classList.add('modpack-author');
            if (modpackAuthor !== "") {
                modpackAuthorElement.textContent = `Par ${modpackAuthor}`;
            } else {
                modpackAuthorElement.textContent = modpackAuthor;
            }

            const modpackAccessBtn = document.createElement('a');
            modpackAccessBtn.classList.add('modpack-access-btn');
            modpackAccessBtn.textContent = `Voir`;
            modpackAccessBtn.href = `modpack.html?${modpackName}`; // Ajoutez votre logique pour le lien

            modpackElement.appendChild(modpackNameElement);
            modpackElement.appendChild(modpackVersionElement);
            modpackElement.appendChild(modpackAuthorElement);
            modpackElement.appendChild(modpackAccessBtn);

            modpacksContainer.appendChild(modpackElement);
        });
    });
}

// Appelez la fonction pour afficher les modpacks au chargement de la page
window.addEventListener('load', displayModpacks);