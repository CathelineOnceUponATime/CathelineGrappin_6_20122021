function photographeEntete (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/photographers/${data.portrait}`

  function getPhotographeEntete () {
    const article = document.createElement('article')
    const h1 = document.createElement('h1')
    const infoPhotographe = document.createElement('div')
    const villePays = document.createElement('p')
    const tagLine = document.createElement('p')
    h1.textContent = data.nom
    villePays.classList.add('ville')
    villePays.textContent = data.ville + ', ' + data.pays
    tagLine.classList.add('tagLine')
    tagLine.textContent = data.tagLine
    article.appendChild(h1)
    infoPhotographe.appendChild(villePays)
    infoPhotographe.appendChild(tagLine)
    article.appendChild(infoPhotographe)
    return article
  }

  function getPhotographeImage () {
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    return img
  }
  return { picture, data, getPhotographeEntete, getPhotographeImage }
}

function encart (data) { // eslint-disable-line no-unused-vars
  function getEncart () {
    const article = document.createElement('article')
    const nbLikes = document.createElement('p')
    const icone = document.createElement('i')
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
    return article
  }
  return { data, getEncart }
}

function mediaFactory (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/images/${data.photographeId}/${data.image}`
  const lienVideo = `assets/images/${data.photographeId}/${data.video}`

  function getMediaCardDOM () {
    const article = document.createElement('article')
    const lien = document.createElement('a')
    const img = document.createElement('img')
    const video = document.createElement('video')
    const source = document.createElement('source')
    const h2 = document.createElement('h2')
    const likes = document.createElement('p')
    const icone = document.createElement('i')
    const divMedia = document.createElement('div')
    const nbLikesTotal = document.getElementById('nbLikesTotal')
    const iconeTotal = document.createElement('i')
    let nbLikes = 0
    article.classList.add('media')
    h2.textContent = data.titre
    img.addEventListener('click', function () {
      const mediasSection = document.querySelector('.media_section')
      const lightBox = getLightbox()
      mediasSection.parentElement.appendChild(lightBox)
      afficheLightBox(false)
    })
    icone.classList.add('fas')
    icone.classList.add('fa-heart')
    likes.textContent = data.likes + ' '
    likes.classList.add('like')
    article.appendChild(lien)
    if (data.image === undefined) {
      source.setAttribute('src', lienVideo)
      video.controls = true
      video.width = 400
      video.preload = 'metadata'
      video.appendChild(source)
      video.id = data.id
      lien.appendChild(video)
    } else {
      img.setAttribute('src', picture)
      img.id = data.id
      lien.appendChild(img)
    }
    likes.appendChild(icone)
    divMedia.appendChild(h2)
    divMedia.appendChild(likes)
    article.appendChild(divMedia)
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

  function afficheLightBox (bAffiche) {
    const header = document.getElementsByClassName('photograph-header')
    const mediaSection = document.getElementsByClassName('media_section')
    const encart = document.getElementsByClassName('encart')
    const figure = document.getElementsByClassName('figure')

    if (bAffiche) {
      header[0].style.display = 'flex'
      mediaSection[0].style.display = 'flex'
      encart[0].style.display = 'flex'
      for (let i = 0; i < figure.length; i++) {
        figure[i].style.display = 'none'
      }
    } else {
      header[0].style.display = 'none'
      mediaSection[0].style.display = 'none'
      encart[0].style.display = 'none'
    }
  }

  function getMediaSuivPrec (bSuivant, image) {
    let photoSuivante
    let photoSuivanteId
    let photoPrecedente
    let photoPrecedenteId
    let indiceSuivant
    let indicePrecedent
    let k
    const photos = document.querySelectorAll('.media > a > img')
    for (let j = 0; j < photos.length; j++) {
      if (parseInt(photos[j].id) === data.id) {
        k = j
        indiceSuivant = (j + 1)
        j = k
        indicePrecedent = (j - 1)
        j = k
        switch (j) {
          case photos.length - 1 :
            photoSuivante = photos[0].src
            photoSuivanteId = photos[0].id
            photoPrecedente = photos[indicePrecedent].src
            photoPrecedenteId = photos[indicePrecedent].id
            break
          case 0 :
            photoPrecedente = photos[photos.length - 1].src
            photoPrecedenteId = photos[photos.length - 1].id
            photoSuivante = photos[indiceSuivant].src
            photoSuivanteId = photos[indiceSuivant].id
            break
          default :
            photoSuivante = photos[indiceSuivant].src
            photoSuivanteId = photos[indiceSuivant].id
            photoPrecedente = photos[indicePrecedent].src
            photoPrecedenteId = photos[indicePrecedent].id
            break
        }
        break
      }
    }
    if (bSuivant) {
      image.setAttribute('src', photoSuivante)
      data.id = parseInt(photoSuivanteId)
    } else {
      image.setAttribute('src', photoPrecedente)
      data.id = parseInt(photoPrecedenteId)
    }
  }

  function getLightbox () {
    const fig = document.createElement('figure')
    const figCaption = document.createElement('figcaption')
    const image = document.createElement('img')
    const video = document.createElement('video')
    const source = document.createElement('source')
    const iconeFD = document.createElement('i')
    const iconeFG = document.createElement('i')
    const iconeF = document.createElement('i')
    iconeFG.classList.add('fas')
    iconeFG.classList.add('fa-angle-left')
    iconeFD.classList.add('fas')
    iconeFD.classList.add('fa-angle-right')
    iconeF.classList.add('fas')
    iconeF.classList.add('fa-times')
    figCaption.textContent = data.titre
    fig.classList.add('figure')
    fig.appendChild(iconeFG)

    if (data.image === undefined) {
      source.setAttribute('src', lienVideo)
      video.controls = true
      video.width = 400
      video.preload = 'metadata'
      video.appendChild(source)
      fig.appendChild(video)
    } else {
      image.setAttribute('src', picture)
      fig.appendChild(image)
    }

    fig.appendChild(iconeFD)
    fig.appendChild(iconeF)
    fig.appendChild(figCaption)
    iconeFD.addEventListener('click', function () {
      getMediaSuivPrec(true, image)
    })
    iconeFG.addEventListener('click', function () {
      getMediaSuivPrec(false, image)
    })
    iconeF.addEventListener('click', function () {
      afficheLightBox(true)
    })
    return fig
  }

  if (data.image === undefined) {
    return { lienVideo, data, getMediaCardDOM, getLightbox }
  } else {
    return { picture, data, getMediaCardDOM, getLightbox }
  }
}
