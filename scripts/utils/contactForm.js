/* global fetch, Photographe */
/* eslint no-undef: "error" */
class Erreur {
  constructor (id, message, presenceErreur, idErreur, typeErreur) {
    this.id = id
    this.message = message
    this.presenceErreur = presenceErreur
    this.idErreur = idErreur
    this.typeErreur = typeErreur
  }
}

let fichPhotographes
let photographeC
const prenom = document.getElementById('prenom')
const nom = document.getElementById('nom')
const email = document.getElementById('email')
const message = document.getElementById('message')
const modal = document.getElementsByClassName('modal')
const logo = document.getElementsByClassName('logo')
const main = document.getElementById('main')
const tErreurs = []

// Nouvel objet pour chaque erreur
const ePrenom = new Erreur('prenom', 'Merci de saisir minimum deux caractères pour le prénom', false, 'prenomErreur', 'saisie')
const eNom = new Erreur('nom', 'Merci de saisir minimum deux caractères pour le nom', false, 'nomErreur', 'saisie')
const eMail = new Erreur('email', 'Merci de saisir une adresse e-mail valide', false, 'emailErreur', 'email')
const eMessage = new Erreur('message', 'Merci de saisir votre message', false, 'messageErreur', 'saisie')

// remplissage du tableau avec chaque erreur
tErreurs.push(ePrenom)
tErreurs.push(eNom)
tErreurs.push(eMail)
tErreurs.push(eMessage)

function displayModal () { // eslint-disable-line no-unused-vars
  const lienSite = window.location.href
  const url = new URL(lienSite)
  const searchParam = new URLSearchParams(url.search)
  let id
  if (searchParam.has('id')) {
    id = searchParam.get('id')
  }
  const bFermer = document.getElementsByClassName('contact_button')
  bFermer[1].style.marginTop = '25px'
  main.style.display = 'none'
  logo[0].style.display = 'none'
  modal[0].style.display = 'flex'

  // Fonction permettant de parcourir le fichier JSON fourni et de manipuler les données
  const getDonneesMedia = async function (fichPhotographes) {
    const response = await fetch('./data/photographers.json')
    fichPhotographes = await response.json()
    photographeC = await getPhotographe(fichPhotographes)
    console.log(photographeC)
  }

  // Fonction permettant de récupérer le nom du photographe pour
  // le rajouter au contacter-moi du formulaire
  async function getPhotographeNom () {
    const titre = document.getElementById('titre')
    titre.innerHTML += '<br>' + photographeC.nom + '</br>'
  }

  async function init () {
    await getDonneesMedia(fichPhotographes)
    await getPhotographeNom()
  }

  init()

  // Fonction permettant de récupérer les données du photographe voulu dans son objet
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
// Fonction appelé lors de la fermeture du formulaire
// permettant de vider le formulaire et réafficher les données voulu
function closeModal () { // eslint-disable-line no-unused-vars
  videFormulaire()
  modal[0].style.display = 'none'
  main.style.display = 'block'
  logo[0].style.display = 'block'
}
// Fonction permettant de rajouter au label ayant une erreur
// un nouveau label contenant le message d'erreur et une coloration rouge du champ
function montreErreur (eErreur) {
  const elt = document.getElementById(eErreur.id)
  const eltParent = elt.parentElement
  const erreur = document.createElement('label')
  erreur.classList.add('erreur')
  erreur.setAttribute('for', eErreur.id)
  erreur.innerHTML = eErreur.message
  erreur.id = eErreur.idErreur
  eltParent.insertBefore(erreur, elt.nextElementSibling)

  if (eErreur.typeErreur !== 'checkbox') {
    elt.style.border = '3px solid red'
  }
}

// Fonction permettant de supprimer du DOM
// le label créé auparavant
function fermeErreur (eErreur) {
  const elt = document.getElementById(eErreur.id)
  const eltParent = elt.parentElement
  const erreur = document.getElementById(eErreur.idErreur)
  eltParent.removeChild(erreur)

  if (eErreur.typeErreur !== 'checkbox') {
    elt.style.border = '0.8px solid #ccc'
  }
}

// Fonction permettant d'effectuer une vérification
// des données entrées dans le formulaire
function verificationFormulaire (idChamp, contenuChamp) {
  let bErreur = false
  for (let i = 0; i < tErreurs.length; i++) {
    if (tErreurs[i].id === idChamp) {
      if (tErreurs[i].typeErreur === 'email') {
        let bValide = false
        // boucle permettant de parcourir chaque caractère de l'email
        for (let j = 0; j < (contenuChamp.length); j++) {
          // Si on trouve un @
          if (contenuChamp.charAt(j) === '@') {
            if (j < (contenuChamp.length - 4)) {
              for (let k = j; k < (contenuChamp.length - 2); k++) {
                // Si il y a un point après @
                if (contenuChamp.charAt(k) === '.') {
                  bValide = true
                  break
                }
              }
            }
          }
        }
        bErreur = !bValide
      } else {
        if (contenuChamp === '' || contenuChamp.length < 2) {
          bErreur = true
        }
      }
      if (bErreur) {
        // S'il n'y a pas déjà une erreur
        // On crée une erreur et on actualise l'objet
        if (!tErreurs[i].presenceErreur) {
          tErreurs[i].presenceErreur = true
          montreErreur(tErreurs[i])
          break
        }
      } else {
        if (tErreurs[i].presenceErreur) {
          tErreurs[i].presenceErreur = false
          fermeErreur(tErreurs[i])
          break
        }
      }
    }
  }
}
// Fonction permettant de donner si oui ou non il y a la présence
//  d'une erreur sur l'un des champs
function presenceErreurChamp () {
  let bErreur = false
  for (let i = 0; i < tErreurs.length; i++) {
    if (tErreurs[i].presenceErreur && !bErreur) {
      bErreur = true
      break
    }
  }
  return bErreur
}

// Fonction permettant de vider les champs du formulaire
// après envoi ou fermeture de ce dernier
function videFormulaire () {
  prenom.value = ''
  nom.value = ''
  email.value = ''
  message.value = ''
  const titre = document.getElementById('titre')
  titre.innerHTML = 'Contactez-moi'
  for (let i = 0; i < tErreurs.length; i++) {
    if (tErreurs[i].presenceErreur) {
      tErreurs[i].presenceErreur = false
      fermeErreur(tErreurs[i])
    }
  }
}

// Fonction effectuant les vérifications nécessaires du formulaire
// ainsi qu'un affichage des données si ces dernières sont correctes
function envoiMessage () { // eslint-disable-line no-unused-vars
  const form = document.getElementsByTagName('form')
  form[0].action = 'photographer.html?id=' + photographeC.id
  verificationFormulaire(prenom.id, prenom.value)
  verificationFormulaire(nom.id, nom.value)
  verificationFormulaire(email.id, email.value)
  verificationFormulaire(message.id, message.value)
  if (presenceErreurChamp()) {
    return false
  } else {
    console.log(' prénom : ' + prenom.value + '\n nom : ' + nom.value + '\n email : ' + email.value + '\n message : ' + message.value)
    closeModal()
    return false
  }
}
