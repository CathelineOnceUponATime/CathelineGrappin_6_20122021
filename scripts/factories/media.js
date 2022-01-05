/* global lightboxFactory */
/* eslint no-undef: "error" */
/* eslint-env jquery */
function photographeEnteteFactory (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/photographers/${data.portrait}`

  // Fonction permettant de créer dans le DOM l'en-tête de la page d'un photographe
  function getPhotographeEntete () {
    const article = document.createElement('article')
    const h1 = document.createElement('h1')
    const infoPhotographe = document.createElement('div')
    const villePays = document.createElement('p')
    const tagLine = document.createElement('p')
    h1.textContent = data.nom
    h1.tabIndex = '2'
    villePays.classList.add('ville')
    villePays.textContent = data.ville + ', ' + data.pays
    tagLine.classList.add('tagLine')
    tagLine.textContent = data.tagLine
    article.appendChild(h1)
    infoPhotographe.tabIndex = '3'
    infoPhotographe.appendChild(villePays)
    infoPhotographe.appendChild(tagLine)
    article.appendChild(infoPhotographe)
    return article
  }

  // Fonction permetttant de récupéré l'image du photographe pour l'en-tête de la page photographe
  function getPhotographeImage () {
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', data.description)
    img.tabIndex = '5'
    return img
  }
  return { picture, data, getPhotographeEntete, getPhotographeImage }
}

// Fonction permettant de créer l'encart affichant le nb de likes sur la page d'un photographe
function encart (data) { // eslint-disable-line no-unused-vars
  function getEncart () {
    const article = document.createElement('article')
    const nbLikes = document.createElement('h3')
    const icone = document.createElement('span')
    const tarif = document.createElement('p')
    article.classList.add('encart')
    nbLikes.textContent = data.nbLikesTotal + ' '
    nbLikes.id = 'nbLikesTotal'
    icone.classList.add('fas')
    icone.classList.add('fa-heart')
    nbLikes.appendChild(icone)
    tarif.textContent = data.prix + '€ / jour'
    article.appendChild(nbLikes)
    article.appendChild(tarif)
    article.tabIndex = '6'
    return article
  }
  return { data, getEncart }
}

function mediaFactory (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/images/${data.photographeId}/${data.image}`
  const lienVideo = `assets/images/${data.photographeId}/${data.video}`
  const lightBox = lightboxFactory(data)

  function getMediaCardDOM (nbMedia) {
    const article = document.createElement('article')
    const lien = document.createElement('a')
    const img = document.createElement('img')
    const video = document.createElement('video')
    const source = document.createElement('source')
    const h2 = document.createElement('h2')
    const likes = document.createElement('p')
    const icone = document.createElement('span')
    const divMedia = document.createElement('div')
    const nbLikesTotal = document.getElementById('nbLikesTotal')
    const iconeTotal = document.createElement('span')
    const descriptionVideo = document.createElement('p')
    let nbLikes = 0
    article.classList.add('media')
    h2.textContent = data.titre
    h2.classList.add(data.id)
    h2.tabIndex = (nbMedia + 11)
    lien.tabIndex = (nbMedia + 10)
    lien.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        const mediasSection = document.querySelector('.media_section')
        const laLightBox = lightBox.getLightbox()
        mediasSection.parentElement.appendChild(laLightBox)
        lightBox.afficheLightBox(false)
      }
    })
    lien.addEventListener('click', function () {
      const mediasSection = document.querySelector('.media_section')
      const laLightBox = lightBox.getLightbox()
      mediasSection.parentElement.appendChild(laLightBox)
      lightBox.afficheLightBox(false)
    })
    icone.classList.add('fas')
    icone.classList.add('fa-heart')
    likes.textContent = data.likes + ' '
    likes.classList.add('like')
    likes.tabIndex = (nbMedia + 12)
    article.appendChild(lien)
    if (data.image === undefined) {
      source.setAttribute('src', lienVideo)
      descriptionVideo.innerText = data.description
      video.controls = false
      video.width = 350
      video.height = 300
      video.style.objectFit = 'cover'
      video.preload = 'metadata'
      video.appendChild(source)
      video.appendChild(descriptionVideo)
      video.classList.add(data.id)
      lien.appendChild(video)
    } else {
      img.setAttribute('src', picture)
      img.setAttribute('alt', data.description)
      img.classList.add(data.id)
      lien.appendChild(img)
    }
    likes.appendChild(icone)
    divMedia.appendChild(h2)
    divMedia.appendChild(likes)
    article.appendChild(divMedia)
    likes.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') icone.click()
    })
    icone.addEventListener('click', function () {
      data.likes++
      likes.textContent = data.likes + ' '
      likes.appendChild(icone)
      nbLikes = parseInt(nbLikesTotal.textContent)
      nbLikes++
      nbLikesTotal.textContent = nbLikes + ' '
      iconeTotal.classList.add('fas')
      iconeTotal.classList.add('fa-heart')
      nbLikesTotal.appendChild(iconeTotal)
    })
    return article
  }
  if (data.image === undefined) {
    return { lienVideo, data, getMediaCardDOM }
  } else {
    return { picture, data, getMediaCardDOM }
  }
}
