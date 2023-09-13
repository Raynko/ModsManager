// Fonction pour ajouter un élément à la liste depuis les données JSON
function addElementToDOM(modData) {
    const elementTemplate = document.getElementById("element-template").cloneNode(true);
    elementTemplate.removeAttribute("style");

    elementTemplate.querySelector(".element-image").src = modData['mod-image-source'];
    elementTemplate.querySelector(".element-name").textContent = modData['mod-name'];
    elementTemplate.querySelector(".element-type").textContent = modData['mod-type'];
    elementTemplate.querySelector(".element-desc").textContent = modData['mod-desc'];
    elementTemplate.querySelector(".element-version").textContent = modData['mod-version'];
    elementTemplate.querySelector(".element-link").href = modData['mod-link'];

    document.getElementById("element-list").appendChild(elementTemplate);
}

// Fonction pour charger les données JSON et afficher les éléments
function loadAndDisplayElements() {
    fetch("https://raynko.github.io/ModsManager//JSON/data.json")
        .then(response => response.json())
        .then(data => {
            // Pour chaque élément dans le JSON, ajoutez-le à la liste
            data.category.forEach(modData => {
                addElementToDOM(modData);
            });
        })
        .catch(error => console.error('Erreur de chargement du fichier JSON :', error));
}

// Appel de la fonction pour charger et afficher les éléments au chargement de la page
loadAndDisplayElements();

// Fonction pour ajouter un mod
function addMod() {
    // Récupérez les données du formulaire
    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const desc = document.getElementById("desc").value;
    const version = document.getElementById("version").value;
    const link = document.getElementById("link").value;

    const newMod = {
        "mod-image-source": image,
        "mod-name": name,
        "mod-type": type,
        "mod-desc": desc,
        "mod-version": version,
        "mod-link": link
    };

    // Ajoutez le nouvel élément au JSON
    jsonData.category.push(newMod);

    // Mettez à jour l'affichage en ajoutant le nouvel élément à la liste
    addElementToDOM(newMod);

    // Réinitialisez les champs du formulaire
    document.getElementById("image").value = "";
    document.getElementById("name").value = "";
    document.getElementById("type").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("version").value = "";
    document.getElementById("link").value = "";

    // Mettez à jour le fichier JSON (vous devrez implémenter la sauvegarde du fichier JSON ici)
    console.log(jsonData);
}
