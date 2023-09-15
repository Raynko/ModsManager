// Écoutez le clic sur le bouton "Suivant" à l'étape 1
document.getElementById('next-button').addEventListener('click', function () {
    // Vérifiez si le champ du lien CurseForge est rempli
    const linkField = document.getElementById('link-field');
    const linkValue = linkField.value.trim();

    if (linkValue !== '') {
        // Utilisez le lien saisi par l'utilisateur pour extraire les informations
        fetchCurseForgeInfo(linkValue);
    } else {
        alert("Veuillez entrer un lien CurseForge.");
    }
});

// Fonction pour extraire les informations depuis CurseForge en utilisant fetch
function fetchCurseForgeInfo(link) {
    // Effectuez la requête JSON en utilisant fetch
    fetch(link)
        .then(response => {
            if (!response.ok) {
                throw new Error("Réponse non valide de CurseForge");
            }
            return response.json();
        })
        .then(data => {
            // Extraire les données souhaitées de la réponse JSON
            const modName = data.modName;
            const imageUrl = data.imageUrl;

            // Vérifiez si les données sont correctement stockées en les affichant dans la console
            console.log("Mod Name:", modName);
            console.log("Image URL:", imageUrl);

            // Passez à l'étape 2
            document.getElementById('step-1').style.display = 'none';
            document.getElementById('step-2').style.display = 'block';

            // Remplissez automatiquement les champs d'image et de nom avec les données obtenues
            document.getElementById('name-field').value = modName;
            document.getElementById('image-field').value = imageUrl;
        })
        .catch(error => {
            console.error("Erreur lors de la requête JSON:", error);
            alert("Une erreur s'est produite lors de la récupération des données CurseForge.");
        });
}
