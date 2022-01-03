/* global photographerFactory, fetch */
/* eslint no-undef: "error" */

let tphotographes = []
let photographers

class Photographe {
  constructor (id, nom, ville, pays, tagLine, prix, portrait, description) {
    this.id = id
    this.nom = nom
    this.ville = ville
    this.pays = pays
    this.tagLine = tagLine
    this.prix = prix
    this.portrait = portrait
    this.description = description
    this.tMedia = []
    this.nbLikesTotal = 0
  }
}

async function getPhotographers (photographers) {
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

async function displayData (tphotographes) {
  const photographersSection = document.querySelector('.photographer_section')
  for (let i = 0; i < tphotographes.length; i++) {
    const photographerModel = photographerFactory(tphotographes[i])
    const userCardDOM = photographerModel.getUserCardDOM(i)
    photographersSection.appendChild(userCardDOM)
  }
  /* tphotographes.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  }) */
}
const getDonnees = async function (photographers) {
  const response = await fetch('./data/photographers.json')
  photographers = await response.json()
  tphotographes = await getPhotographers(photographers)
  console.log(photographers)
}

async function init () {
  await getDonnees(photographers)
  displayData(tphotographes)
}

init()
