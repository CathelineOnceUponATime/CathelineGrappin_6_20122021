/* global photographerFactory, fetch, Photographe */
/* eslint no-undef: "error" */

let tphotographes = []
let photographers

// Fonction permettant de stocker dans un tableau toutes les infos de chaque photographe
function getPhotographers (photographers) {
  let photographeCourant
  for (let i = 0; i < photographers.photographers.length; i++) {
    photographeCourant = new Photographe()
    photographeCourant.id = photographers.photographers[i].id
    photographeCourant.nom = photographers.photographers[i].name
    photographeCourant.ville = photographers.photographers[i].city
    photographeCourant.pays = photographers.photographers[i].country
    photographeCourant.tagLine = photographers.photographers[i].tagline
    photographeCourant.portrait = photographers.photographers[i].portrait
    photographeCourant.prix = photographers.photographers[i].price
    photographeCourant.description = photographers.photographers[i].description
    tphotographes.push(photographeCourant)
  }
  return tphotographes
}
// Fonction qui permet l'affichage de chaque carte de photographe dans le DOM
function displayData (tphotographes) {
  const photographersSection = document.querySelector('.photographer_section')
  for (let i = 0; i < tphotographes.length; i++) {
    const photographerModel = photographerFactory(tphotographes[i])
    const userCardDOM = photographerModel.getUserCardDOM(i)
    photographersSection.appendChild(userCardDOM)
  }
}
// Fonction permettant de parcourir le fichier JSON fourni et de manipuler les données
const getDonnees = async function (photographers) {
  const response = await fetch('./data/photographers.json')
  photographers = await response.json()
  tphotographes = getPhotographers(photographers)
}

async function init () {
  await getDonnees(photographers)
  displayData(tphotographes)
}

init()
