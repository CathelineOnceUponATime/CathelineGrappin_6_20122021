/* global fetch, Photographe */
/* eslint no-undef: "error" */
let fichPhotographes
let photographeC

function displayModal () { // eslint-disable-line no-unused-vars
  const lienSite = window.location.href
  const url = new URL(lienSite)
  const searchParam = new URLSearchParams(url.search)
  let id
  if (searchParam.has('id')) {
    id = searchParam.get('id')
    console.log(id)
  }

  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'
  const main = document.getElementById('main')
  main.style.display = 'none'

  const getDonneesMedia = async function (fichPhotographes) {
    const response = await fetch('./data/photographers.json')
    fichPhotographes = await response.json()
    photographeC = await getPhotographe(fichPhotographes)
    console.log(photographeC)
  }
  async function getPhotographeNom () {
    const titre = document.getElementById('titre')
    titre.innerHTML += '<br>' + photographeC.nom + '</br>'
  }

  async function init () {
    await getDonneesMedia(fichPhotographes)
    await getPhotographeNom()
  }

  init()

  async function getPhotographe (fichPhotographes) {
    let photographeCourant
    for (let i = 0; i < fichPhotographes.photographers.length; i++) {
      if (parseInt(fichPhotographes.photographers[i].id) === parseInt(id)) {
        photographeCourant = new Photographe()
        photographeCourant.id = fichPhotographes.photographers[i].id
        photographeCourant.nom = fichPhotographes.photographers[i].name
        photographeCourant.ville = fichPhotographes.photographers[i].city
        photographeCourant.pays = fichPhotographes.photographers[i].country
        photographeCourant.tagLine = fichPhotographes.photographers[i].tagline
        photographeCourant.portrait = fichPhotographes.photographers[i].portrait
        photographeCourant.prix = fichPhotographes.photographers[i].price
        break
      }
    }
    return photographeCourant
  }
}

function closeModal () { // eslint-disable-line no-unused-vars
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
  const main = document.getElementById('main')
  main.style.display = 'block'
}

function envoiMessage () { // eslint-disable-line no-unused-vars
  const form = document.getElementsByTagName('form')
  form[0].action = 'photographer.html?id=' + photographeC.id
  const prenom = document.getElementById('idPrenom')
  const nom = document.getElementById('idNom')
  const email = document.getElementById('idEmail')
  const message = document.getElementById('idMessage')

  console.log(' prénom : ' + prenom.value + '\n nom : ' + nom.value + '\n email : ' + email.value + '\n message : ' + message.value)
  prenom.value = ''
  nom.value = ''
  email.value = ''
  message.value = ''
  closeModal()
  return false
}
