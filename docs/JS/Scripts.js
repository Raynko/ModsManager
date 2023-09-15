function ShowHideForm() {
    var x = document.getElementById("step-1");
    var btn = document.getElementById("show-hide-form");
    if (x.style.display === "none") {
      x.style.display = "block";
      btn.textContent = "−";
    } else {
      x.style.display = "none";
      btn.textContent = "+";
    }
  }
  