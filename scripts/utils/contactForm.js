/* global fetch, Photographe */
/* eslint no-undef: "error" */
let fichPhotographes
let photographeC
const prenom = document.getElementById('prenom')
const nom = document.getElementById('nom')
const email = document.getElementById('email')
const message = document.getElementById('message')
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
  const bFermer = document.getElementsByClassName('contact_button')
  bFermer[1].style.marginTop = '25px'
  main.style.filter = 'blur(5px)'
  main.style.pointerEvents = 'none'
  main.tabIndex = -1
  logo[0].style.filter = 'blur(5px)'
  logo[0].style.pointerEvents = 'none'
  modal[0].style.display = 'flex'

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
  videFormulaire()
  modal[0].style.display = 'none'
  main.style.filter = 'none'
  main.style.pointerEvents = 'auto'
  logo[0].style.filter = 'none'
  logo[0].style.pointerEvents = 'auto'
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
