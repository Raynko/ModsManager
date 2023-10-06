document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('serch-curseforge');
    const searchInput = document.getElementById('search-curseforge-field');
    const imageField = document.getElementById('image-field');
    const nameField = document.getElementById('name-field');
    const alertModNotFound = document.getElementById('alert-mod-not-found');
  
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Empêche la soumission du formulaire par défaut
  
      const modId = searchInput.value; // Récupère l'ID du mod saisi
  
      // Votre clé API CurseForge
      const apiKey = '$2a$10$HPBH/5BKOZmprEqwkFjIJu.QbVzXVV5MtxI8wF8X/qIOwZPkJpOHC';
  
      // Effectue la requête à l'API CurseForge
      fetch(`https://api.curseforge.com/v1/mods/${modId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-api-key': apiKey
        }
      })
      .then(function (res) {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Mod non trouvé');
        }
      })
      .then(function (data) {
        // Remplit les champs d'image et de nom du mod avec les données récupérées
        imageField.value = data.data.logo.thumbnailUrl;
        nameField.value = data.data.name;

        // Efface le champ de recherche après la soumission
        searchInput.value = '';

        // Cache la div d'alerte car le mod est trouvé
        alertModNotFound.style.display = 'none';
      })
      .catch(function (error) {
        console.error(error);
        // Affiche la div d'alerte car le mod n'est pas trouvé
        alertModNotFound.style.display = 'block';
      });
    });
  });
  