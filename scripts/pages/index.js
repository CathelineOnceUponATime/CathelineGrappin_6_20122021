let tphotographes = []
let photographers

class Photographe {
  constructor (id, nom, ville, pays, tagLine, prix, portrait) {
    this.id = id
    this.nom = nom
    this.ville = ville
    this.pays = pays
    this.tagLine = tagLine
    this.prix = prix
    this.portrait = portrait
    this.tMedia = []
  }
}

class Media {
  constructor (id, photographeId, titre, image, likes, date, prix) {
    this.id = id
    this.photographeId = photographeId
    this.titre = titre
    this.image = image
    this.likes = likes
    this.date = date
    this.prix = prix
  }
}

async function getPhotographers (photographers) {
  let photographeCourant
  let mediaCourant
  for (let i = 0; i < photographers['photographers'].length; i++) {
    photographeCourant = new Photographe()
    photographeCourant.id = photographers.photographers[i].id
    photographeCourant.nom = photographers.photographers[i].name
    photographeCourant.ville = photographers.photographers[i].city
    photographeCourant.pays = photographers.photographers[i].country
    photographeCourant.tagLine = photographers.photographers[i].tagline
    photographeCourant.portrait = photographers.photographers[i].portrait
    photographeCourant.prix = photographers.photographers[i].price
    tphotographes.push(photographeCourant)
  }
  for (let k = 0; k < tphotographes.length; k++) {
    for (let j = 0; j < photographers['media'].length; j++) {
      if (photographers.media[j].photographerId === tphotographes[k].id) {
        mediaCourant = new Media()
        mediaCourant.id = photographers.media[j].id
        mediaCourant.photographeId = photographers.media[j].photographerId
        mediaCourant.titre = photographers.media[j].title
        mediaCourant.image = photographers.media[j].image
        mediaCourant.likes = photographers.media[j].likes
        mediaCourant.date = photographers.media[j].date
        mediaCourant.prix = photographers.media[j].price
        tphotographes[k].tMedia.push(mediaCourant)
      }
    }
  }
  return tphotographes
}

async function displayData (tphotographes) {
  const photographersSection = document.querySelector('.photographer_section')
  tphotographes.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}
const getDonnees = async function (photographers) {
  let response = await fetch('./data/photographers.json')
  photographers = await response.json()
  tphotographes = await getPhotographers(photographers)
  console.log(photographers)
}

async function init () {
  // photographers = obtenirJson(jsonData)
  // Récupère les datas des photographes
  await getDonnees(photographers)
  displayData(tphotographes)
}

init()
