const urlParams = new URLSearchParams(window.location.search);
const modpackName = Array.from(urlParams.keys())[0];

console.log("Modpack Name:", modpackName);
