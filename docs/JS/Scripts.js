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

// Récupérez l'élément .cat-header
const catHeader = document.querySelector('.cat-header');

// Ajoutez un gestionnaire d'événement de défilement à la fenêtre
window.addEventListener('scroll', () => {
    // Calculez la distance entre le haut de l'élément et le haut de la fenêtre
    const distanceFromTop = catHeader.getBoundingClientRect().top;

    // Si la distance est supérieure à 0, déplacez progressivement l'élément vers le haut
    if (distanceFromTop > 0) {
        const newPosition = Math.max(0, 75 - window.scrollY);
        catHeader.style.top = newPosition + 'px';
    } else {
        // Une fois que l'élément atteint le haut de la fenêtre, il reste fixe
        catHeader.style.top = '0';
    }
});
