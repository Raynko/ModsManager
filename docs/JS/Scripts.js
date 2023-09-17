function ShowHideForm() {
  console.log("Fonction ShowHideForm appelée.");
  var x = document.getElementById("add-mod-form");
  var btn = document.getElementById("show-hide-form");
  if (x.classList.contains("show")) {
      x.classList.remove("show");
      btn.textContent = "+";
  } else {
      x.classList.add("show");
      btn.textContent = "−";
  }
}
