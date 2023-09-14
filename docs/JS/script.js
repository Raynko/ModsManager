document.getElementById("add-button").addEventListener("click", () => {
  const nouvelElement = {
    "mod-image-source": document.getElementById("image").value,
    "mod-name": document.getElementById("name").value,
    "mod-type": document.getElementById("type").value,
    "mod-desc": document.getElementById("desc").value,
    "mod-version": document.getElementById("version").value,
    "mod-link": document.getElementById("link").value,
  };

  fetch("/ajouterElement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nouvelElement),
  })
    .then((response) => response.json())
    .then((data) => {
      // Traitez la réponse du serveur (par exemple, affichez un message de confirmation)
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'élément :", error);
    });
});
