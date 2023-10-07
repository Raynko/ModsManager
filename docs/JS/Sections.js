//Tous les Chk
var imageChk = document.getElementById("chk-image");
var typeChk = document.getElementById("chk-type");
var descriptionChk = document.getElementById("chk-description");
var installedVersionChk = document.getElementById("chk-installed-version");
var modVersionChk = document.getElementById("chk-mod-version");
var linkChk = document.getElementById("chk-link");

//tous les fields
var imageField = document.getElementById("image-field");
var typeField = document.getElementById("type-field");
var descriptionField = document.getElementById("description-field");
var installedVersionField = document.getElementById("installed-version-field");
var modVersionField = document.getElementById("version-field");
var linkField = document.getElementById("link-field");

//Tous les header
var imageHeader = document.getElementById("header-image");
var typeHeader = document.getElementById("header-type");
var descriptionHeader = document.getElementById("header-description");
var installedVersionHeader = document.getElementById("header-installed-version");
var modVersionHeader = document.getElementById("header-mod-version");
var linkHeader = document.getElementById("header-link");

//Toutes les cell-...
var imageCell;
var typeCell;
var descriptionCell;
var installedVersionCell;
var modVersionCell;
var linkCell;

// Sélectionnez toutes les div avec la classe "cell-..."
function GetAllElementClass() {
    imageCell = document.querySelectorAll(".cell-image");
    typeCell = document.querySelectorAll(".cell-type");
    descriptionCell = document.querySelectorAll(".cell-desc");
    installedVersionCell = document.querySelectorAll(".cell-installed-version");
    modVersionCell = document.querySelectorAll(".cell-version");
    linkCell = document.querySelectorAll(".cell-link");

    // Appeler la fonction pour chaque élément
    handleCheckboxDisplay(imageChk, imageField, imageHeader, imageCell);
    handleCheckboxDisplay(typeChk, typeField, typeHeader, typeCell);
    handleCheckboxDisplay(descriptionChk, descriptionField, descriptionHeader, descriptionCell);
    handleCheckboxDisplay(installedVersionChk, installedVersionField, installedVersionHeader, installedVersionCell);
    handleCheckboxDisplay(modVersionChk, modVersionField, modVersionHeader, modVersionCell);
    handleCheckboxDisplay(linkChk, linkField, linkHeader, linkCell);
}

// Fonction pour gérer l'affichage en fonction de la case à cocher
function handleCheckboxDisplay(checkbox, field, header, cells) {

    verifyCheckBox(checkbox, field, header, cells);

    checkbox.addEventListener("change", function () {
        verifyCheckBox(checkbox, field, header, cells);
    });
}

// Fonction pour vérifier les checkboxs
function verifyCheckBox(checkbox, field, header, cells) {
    if (checkbox.checked) {
        field.style.display = "flex";
        header.style.display = "flex";
        cells.forEach(function (cell) {
            cell.style.display = "flex";
        });
    } else {
        field.style.display = "none";
        header.style.display = "none";
        cells.forEach(function (cell) {
            cell.style.display = "none";
        });
    }
} 

// Fonction pour récupérer les valeurs des cases à cocher depuis la base de données Firebase
function getCheckboxValuesFromFirebase() {
    modpackRef.child('Settings/Section').once('value', function(snapshot) {
        const sectionData = snapshot.val();

        // Mettez à jour les cases à cocher en fonction des données récupérées
        imageChk.checked = sectionData.image;
        typeChk.checked = sectionData.type;
        descriptionChk.checked = sectionData.description;
        installedVersionChk.checked = sectionData['version-installed'];
        modVersionChk.checked = sectionData['mod-version'];
        linkChk.checked = sectionData.link;
    });
}

// Fonction pour mettre à jour la base de données Firebase lorsque les cases à cocher sont modifiées
function updateFirebaseFromCheckboxes() {
    modpackRef.child('Settings/Section').update({
        image: imageChk.checked,
        type: typeChk.checked,
        description: descriptionChk.checked,
        'version-installed': installedVersionChk.checked,
        'mod-version': modVersionChk.checked,
        link: linkChk.checked
    });
}

// Ajoutez des gestionnaires d'événements pour les cases à cocher
imageChk.addEventListener("change", updateFirebaseFromCheckboxes);
typeChk.addEventListener("change", updateFirebaseFromCheckboxes);
descriptionChk.addEventListener("change", updateFirebaseFromCheckboxes);
installedVersionChk.addEventListener("change", updateFirebaseFromCheckboxes);
modVersionChk.addEventListener("change", updateFirebaseFromCheckboxes);
linkChk.addEventListener("change", updateFirebaseFromCheckboxes);

// Appelez la fonction pour récupérer les valeurs des cases à cocher depuis la base de données Firebase lors du chargement de la page
document.addEventListener("DOMContentLoaded", getCheckboxValuesFromFirebase);