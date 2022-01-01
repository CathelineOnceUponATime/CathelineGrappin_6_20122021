/* global fetch, Photographe */
/* eslint no-undef: "error" */
let fichPhotographes
let photographeC
const prenom = document.getElementById('idPrenom')
const nom = document.getElementById('idNom')
const email = document.getElementById('idEmail')
const message = document.getElementById('idMessage')
const modal = document.getElementsByClassName('modal')
const logo = document.getElementsByClassName('logo')
const main = document.getElementById('main')

function displayModal () { // eslint-disable-line no-unused-vars
  const lienSite = window.location.href
  const url = new URL(lienSite)
  const searchParam = new URLSearchParams(url.search)
  let id
  if (searchParam.has('id')) {
    id = searchParam.get('id')
    console.log(id)
  }
  modal[0].style.display = 'block'
  const bFermer = document.getElementsByClassName('contact_button')
  bFermer[1].style.marginTop = '25px'
  logo[0].style.display = 'none'
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
        photographeCourant.description = fichPhotographes.photographers[i].description
        break
      }
    }
    return photographeCourant
  }
}

function closeModal () { // eslint-disable-line no-unused-vars
  modal[0].style.display = 'none'
  main.style.display = 'block'
  logo[0].style.display = 'block'
  videFormulaire()
}

function videFormulaire () {
  prenom.value = ''
  nom.value = ''
  email.value = ''
  message.value = ''
  const titre = document.getElementById('titre')
  titre.innerHTML = 'Contactez-moi'
}

function envoiMessage () { // eslint-disable-line no-unused-vars
  const form = document.getElementsByTagName('form')
  form[0].action = 'photographer.html?id=' + photographeC.id

  console.log(' prénom : ' + prenom.value + '\n nom : ' + nom.value + '\n email : ' + email.value + '\n message : ' + message.value)

  closeModal()
  return false
}
