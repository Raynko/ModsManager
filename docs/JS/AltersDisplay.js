// Sélectionnez le bouton "Modifier des mods"
var modifyButton = document.querySelector(".board-alter-btn");

// Sélectionnez la div avec l'ID "header-alter"
var headerAlterDiv = document.getElementById("header-alter");

var cellAlterDivs;

// Sélectionnez toutes les div avec la classe "cell-alter"
function GetAllCellAlter() {
    cellAlterDivs = document.querySelectorAll(".cell-alter");
}

// Ajoutez un gestionnaire d'événements au bouton "Modifier des mods"
modifyButton.addEventListener("click", function () {
    // Vérifiez si la div avec l'ID "header-alter" est en "flex"
    if (headerAlterDiv.style.display === "flex") {
        // Si oui, change son style à "none"
        headerAlterDiv.style.display = "none";
    } else {
        // Sinon, change son style à "flex"
        headerAlterDiv.style.display = "flex";
    }

    // Pour chaque div avec la classe "cell-alter"
    cellAlterDivs.forEach(function (cellAlterDiv) {
        // Vérifiez si la div est en "flex"
        if (cellAlterDiv.style.display === "flex") {
            // Si oui, change son style à "none"
            cellAlterDiv.style.display = "none";
        } else {
            // Sinon, change son style à "flex"
            cellAlterDiv.style.display = "flex";
        }
    });
});

// indicateur de l'état actuel des Alters
var isAlterActive = false;

// Ajoutez un gestionnaire d'événements au bouton "Modifier des mods"
modifyButton.addEventListener("click", function () {
    // Inversez l'état actuel (vert ou non)
    isAlterActive = !isAlterActive;

    if (isAlterActive) {
        modifyButton.style.outline = "2px dashed #ad2b89";  
    } else {
        modifyButton.style.outline = "none";
    }
});


