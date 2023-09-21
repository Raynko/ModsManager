function ShowHideForm() {
  var form = document.getElementById("add-mod-form");
  var btn = document.getElementById("show-hide-form");
  if (form.classList.contains("show")) {
    form.classList.remove("show");
    btn.textContent = "+";
  } else {
    form.classList.add("show");
    btn.textContent = "−";
  }
}

function ShowNewModpackForm() {
  var form = document.getElementById("form-new-modpack-background");
  form.style.display = "block";
}

function HideNewModpackForm() {
  var form = document.getElementById("form-new-modpack-background");
  form.style.display = "none";
}

function SynchScroll() {
  const listContents = document.querySelectorAll('.list-content'); // Sélectionnez toutes les divs avec la classe .list-content
  const scroll = document.querySelector('.scroll');

  listContents.forEach(function(element) {
  
    function moveElement() {
      // Récupérez la position actuelle de défilement
      const scrollPosition = scroll.scrollLeft;

      element.scrollLeft = scrollPosition; // Définissez la position de défilement

      // Répétez la fonction de déplacement avec une animation
      requestAnimationFrame(moveElement);
    }
  
    // Démarrez l'animation pour chaque élément .list-content
    moveElement();
  });
}




