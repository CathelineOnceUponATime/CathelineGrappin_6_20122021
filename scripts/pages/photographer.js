// Mettre le code JavaScript lié à la page photographer.html
/* global mediaFactory, fetch, photographeEntete, encart, tri */
/* eslint no-undef: "error" */

let tabPhotographes = []
let lesPhotographes

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

class Media {
  constructor (id, photographeId, titre, image, video, likes, date, prix, description) {
    this.id = id
    this.photographeId = photographeId
    this.titre = titre
    this.image = image
    this.video = video
    this.likes = likes
    this.date = date
    this.prix = prix
    this.description = description
  }
}

const lienSite = window.location.href
const url = new URL(lienSite)
const searchParam = new URLSearchParams(url.search)
let id
if (searchParam.has('id')) {
  id = searchParam.get('id')
}

async function getMedias (lesPhotographes) {
  let photographeCourant
  let mediaCourant
  for (let i = 0; i < lesPhotographes.photographers.length; i++) {
    photographeCourant = new Photographe()
    photographeCourant.id = lesPhotographes.photographers[i].id
    photographeCourant.nom = lesPhotographes.photographers[i].name
    photographeCourant.ville = lesPhotographes.photographers[i].city
    photographeCourant.pays = lesPhotographes.photographers[i].country
    photographeCourant.tagLine = lesPhotographes.photographers[i].tagline
    photographeCourant.portrait = lesPhotographes.photographers[i].portrait
    photographeCourant.prix = lesPhotographes.photographers[i].price
    photographeCourant.description = lesPhotographes.photographers[i].description
    tabPhotographes.push(photographeCourant)
  }
  for (let k = 0; k < tabPhotographes.length; k++) {
    for (let j = 0; j < lesPhotographes.media.length; j++) {
      if (lesPhotographes.media[j].photographerId === tabPhotographes[k].id) {
        mediaCourant = new Media()
        mediaCourant.id = lesPhotographes.media[j].id
        mediaCourant.photographeId = lesPhotographes.media[j].photographerId
        mediaCourant.titre = lesPhotographes.media[j].title
        if (lesPhotographes.media[j].image === undefined) {
          mediaCourant.video = lesPhotographes.media[j].video
        } else {
          mediaCourant.image = lesPhotographes.media[j].image
        }
        mediaCourant.likes = lesPhotographes.media[j].likes
        mediaCourant.date = lesPhotographes.media[j].date
        mediaCourant.prix = lesPhotographes.media[j].price
        mediaCourant.description = lesPhotographes.media[j].description
        tabPhotographes[k].nbLikesTotal += parseInt(mediaCourant.likes)
        tabPhotographes[k].tMedia.push(mediaCourant)
      }
    }
  }
  return tabPhotographes
}

async function afficheMedia (tphotographes) {
  const mediasSection = document.querySelector('.media_section')
  const photographeHeader = document.querySelector('.photograph-header')
  tphotographes.forEach((photographer) => {
    if (photographer.id === parseInt(id)) {
      const photographe = photographeEntete(photographer)
      const photographeTete = photographe.getPhotographeEntete()
      const photographeImage = photographe.getPhotographeImage()
      const photographeEncart = encart(photographer)
      const photographeGetEncart = photographeEncart.getEncart()
      const triMedia = tri(photographer)
      const tabPopularite = triMedia.trier('Popularité')
      const label = triMedia.getLabelTri()
      const select = triMedia.getTri()
      mediasSection.parentElement.insertBefore(select, mediasSection.parentElement.children[1])
      mediasSection.parentElement.insertBefore(label, mediasSection.parentElement.children[1])
      mediasSection.parentElement.appendChild(photographeGetEncart)
      photographeHeader.insertBefore(photographeTete, photographeHeader.firstChild)
      photographeHeader.appendChild(photographeImage)
      photographer.tMedia = tabPopularite
      photographer.tMedia.forEach((media) => {
        const mediaModel = mediaFactory(media)
        const userCardDOM = mediaModel.getMediaCardDOM()
        mediasSection.appendChild(userCardDOM)
      })
      triMedia.enFormeTri()
    }
  })
}

const getDonneesMedia = async function (lesPhotographes) {
  const response = await fetch('./data/photographers.json')
  lesPhotographes = await response.json()
  tabPhotographes = await getMedias(lesPhotographes)
}

async function init () {
  await getDonneesMedia(lesPhotographes)
  afficheMedia(tabPhotographes)
}

init()
