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