const firebaseConfig = {
  apiKey: "AIzaSyCu2bExV4bdbSrB11UAxDIP3p-G9FWSj9o",
  authDomain: "mods-manager.firebaseapp.com",
  databaseURL: "https://mods-manager-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mods-manager",
  storageBucket: "mods-manager.appspot.com",
  messagingSenderId: "32145566432",
  appId: "1:32145566432:web:f1902aa8d286f49e88be85"
};

// Initialisez Firebase
firebase.initializeApp(firebaseConfig);

// Référence à la base de données
const modsManagerDB = firebase.database().ref('ModsManager');

// Écouteur pour soumettre le formulaire
document.getElementById('new-mod-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const category = getElementVal('cat-field');
  const image = getElementVal('image-field');
  const name = getElementVal('name-field');
  const type = getElementVal('type-field');
  const desc = getElementVal('desc-field');
  const version = getElementVal('version-field');
  const link = getElementVal('link-field');

  saveNewMod(category, image, name, type, desc, version, link);

  // Afficher l'alerte
  document.querySelector('.alert').style.display = "block";

  // Cacher l'alerte après 3 secondes
  setTimeout(() => {
    document.querySelector('.alert').style.display = "none";
  }, 3000);

  // Réinitialiser le formulaire
  document.getElementById('new-mod-form').reset();
});

// Fonction pour sauvegarder un nouveau mod
const saveNewMod = (category, image, name, type, desc, version, link) => {
  const newModForm = modsManagerDB.push();

  newModForm.set({
    category: category,
    image: image,
    name: name,
    type: type,
    desc: desc,
    version: version,
    link: link
  });
};

// Fonction pour obtenir la valeur d'un élément par son ID
const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Fonction pour afficher les éléments depuis Firebase dans la liste
const displayElementsFromFirebase = () => {
  const elementList = document.getElementById('element-list');

  // Utilisez la méthode "on" pour écouter les modifications continues
  modsManagerDB.on('value', (snapshot) => {
    elementList.innerHTML = ''; // Effacez le contenu précédent de la liste

    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();

      // Créez un élément div pour chaque donnée de Firebase
      const element = document.createElement('div');
      element.classList.add('cat-content', 'element');
      element.innerHTML = `
        <div class="cell"><img class="element-image" src="${data.image}" onerror="this.src='IMG/blankPic.png'"></div>
        <div class="cell element-name">${data.name}</div>
        <div class="cell element-type">${data.type}</div>
        <div class="cell element-desc">${data.desc}</div>
        <div class="cell element-version">${data.version}</div>
        <div class="cell"><a target="_blank" href="${data.link}" class="element-link">CurseForge</a></div>
      `;

      // Ajoutez l'élément à la liste
      elementList.appendChild(element);
    });
  });
};

// Appelez cette fonction pour afficher les éléments dès que la page se charge
window.addEventListener('load', displayElementsFromFirebase);

