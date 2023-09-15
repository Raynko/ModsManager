// Récupérez la référence du champ de lien et du bouton Suivant
const linkField = document.getElementById("link-field");
const nextButton = document.getElementById("next-button");

// Récupérez la référence aux sections de formulaire
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");

// Récupérez la référence aux champs du formulaire étape 2
const linkField2 = document.getElementById("link-field-2");
const imageField = document.getElementById("image-field");
const nameField = document.getElementById("name-field");

// Écoutez l'événement de modification du champ de lien
linkField.addEventListener("input", function() {
    // Vérifiez si le champ de lien est rempli
    if (linkField.value.trim() !== "") {
        // Activez le bouton Suivant
        nextButton.disabled = false;

        // Extrait l'ID du mod à partir de l'URL
        const modId = extractModIdFromUrl(linkField.value);

        // Remplissez les champs du formulaire étape 2 avec les informations du mod
        fetchModInfo(modId);
    } else {
        // Désactivez le bouton Suivant s'il n'y a pas de lien
        nextButton.disabled = true;
    }
});

// Fonction pour extraire l'ID du mod à partir de l'URL
function extractModIdFromUrl(url) {
    // Vous devrez implémenter la logique pour extraire l'ID du mod à partir de l'URL.
    // Par exemple, si l'URL est "https://www.curseforge.com/minecraft/mc-mods/mod-name",
    // vous pouvez extraire l'ID à partir de la dernière partie de l'URL.
    // Assurez-vous de manipuler correctement l'URL pour obtenir l'ID.

    // Exemple de logique :
    const parts = url.split("/");
    const modId = parts[parts.length - 1];

    return modId;
}

// Fonction pour récupérer les informations du mod à partir de son ID
function fetchModInfo(modId) {
    // Utilisez l'ID du mod pour récupérer les informations du mod
    const headers = {
        'Accept': 'application/json',
        'x-api-key': 'c52359dd-aef3-4fcd-bb60-8dac7a602c71' // Remplacez par votre clé API CurseForge valide
    };

    fetch(`/v1/mods/${modId}`, {
        method: 'GET',
        headers: headers
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (body) {
        console.log(body);
        if (body && body.data) {
            // Remplissez les champs du formulaire étape 2 avec les données récupérées
            linkField2.value = body.data.links.websiteUrl;
            imageField.value = body.data.logo.thumbnailUrl;
            nameField.value = body.data.name;
            // Passez à l'étape 2
            showStep2();
        } else {
            console.error("Réponse vide ou non valide de l'API CurseForge");
        }
    })
    .catch(function (error) {
        console.error("Erreur lors de la récupération des informations du mod :", error);
    });
}

// Fonction pour passer de l'étape 1 à l'étape 2
function showStep2() {
    console.log("Passage de l'étape 1 à l'étape 2");
    step1.style.display = "none";
    step2.style.display = "block";
}

// Écoutez l'événement clic sur le bouton Suivant
nextButton.addEventListener("click", showStep2);
