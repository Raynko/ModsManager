var confirmDeletePanel = document.getElementById('delete-confirm-background');
var deleteConfirmTitle = document.querySelector('.delete-confirm-title');

var modToDelete;

function HideDeleteConfirmPanel() {
    confirmDeletePanel.style.display = "none";
}

function ShowDeleteConfirmPanel(dataModID) {
    confirmDeletePanel.style.display = "block";
    modToDelete = dataModID;

    deleteConfirmTitle.innerHTML = 'Supprimer ' + dataModID + ' ?';
    console.log(dataModID);
}

function DeleteMod() {

    // Récupérez l'identifiant du mod à supprimer, par exemple, depuis le modèle HTML
    const modId = modToDelete;

    // Construisez la référence à l'emplacement du mod que vous souhaitez supprimer
    const modRef = modpackRef.child('Mods/' + modId);

    // Utilisez la méthode remove() pour supprimer le mod de la base de données Firebase
    modRef.remove()
    .then(function () {
        // La suppression a réussi
        HideDeleteConfirmPanel();
    })
    .catch(function (error) {
        // Une erreur s'est produite lors de la suppression
        console.error("Erreur lors de la suppression du mod : ", error);
        alert("Une erreur s'est produite lors de la suppression du mod.");
    });
}