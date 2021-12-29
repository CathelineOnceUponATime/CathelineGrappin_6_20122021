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
    h2.classList.add(data.id)
    lien.addEventListener('click', function () {
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
      video.controls = false
      video.width = 350
      video.height = 300
      video.style.objectFit = 'cover'
      video.preload = 'metadata'
      video.appendChild(source)
      video.classList.add(data.id)
      lien.appendChild(video)
    } else {
      img.setAttribute('src', picture)
      img.classList.add(data.id)
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
    const figure = document.getElementById('figure')

    if (bAffiche) {
      header[0].style.display = 'flex'
      mediaSection[0].style.display = 'flex'
      encart[0].style.display = 'flex'
      figure.parentElement.removeChild(figure)
    } else {
      header[0].style.display = 'none'
      mediaSection[0].style.display = 'none'
      encart[0].style.display = 'none'
    }
  }

  function getMediaSuivPrec (bSuivant, image, fig, figCaption) {
    let photoSuivante
    let titreSuivant
    let photoSuivanteId
    let photoPrecedente
    let titrePrecedent
    let photoPrecedenteId
    let indiceSuivant
    let indicePrecedent
    let k
    let bVideo = false
    const video = document.createElement('video')
    const source = document.createElement('source')

    const photos = document.querySelectorAll('.media > a')

    for (let j = 0; j < photos.length; j++) {
      if (parseInt(photos[j].firstChild.classList[0]) === data.id) {
        bVideo = false
        k = j
        indiceSuivant = (j + 1)
        j = k
        indicePrecedent = (j - 1)
        j = k
        switch (j) {
          case photos.length - 1 :
            if ((bSuivant) && (photos[0].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoSuivante = photos[0].firstChild.firstChild.src
            } else {
              photoSuivante = photos[0].firstChild.src
            }
            titreSuivant = photos[0].parentElement.lastChild.firstChild.textContent
            photoSuivanteId = photos[0].firstChild.classList[0]
            if ((!bSuivant) && (photos[indicePrecedent].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoPrecedente = photos[indicePrecedent].firstChild.firstChild.src
            } else {
              photoPrecedente = photos[indicePrecedent].firstChild.src
            }
            titrePrecedent = photos[indicePrecedent].parentElement.lastChild.firstChild.textContent
            photoPrecedenteId = photos[indicePrecedent].firstChild.classList[0]
            break
          case 0 :
            titrePrecedent = photos[photos.length - 1].parentElement.lastChild.firstChild.textContent
            if ((!bSuivant) && (photos[photos.length - 1].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoPrecedente = photos[photos.length - 1].firstChild.firstChild.src
            } else {
              photoPrecedente = photos[photos.length - 1].firstChild.src
            }
            photoPrecedenteId = photos[photos.length - 1].firstChild.classList[0]
            titreSuivant = photos[indiceSuivant].parentElement.lastChild.firstChild.textContent
            if ((bSuivant) && (photos[indiceSuivant].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoSuivante = photos[indiceSuivant].firstChild.firstChild.src
            } else {
              photoSuivante = photos[indiceSuivant].firstChild.src
            }
            photoSuivanteId = photos[indiceSuivant].firstChild.classList[0]
            break
          default :
            titreSuivant = photos[indiceSuivant].parentElement.lastChild.firstChild.textContent
            if ((bSuivant) && (photos[indiceSuivant].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoSuivante = photos[indiceSuivant].firstChild.firstChild.src
            } else {
              photoSuivante = photos[indiceSuivant].firstChild.src
            }
            photoSuivanteId = photos[indiceSuivant].firstChild.classList[0]
            titrePrecedent = photos[indicePrecedent].parentElement.lastChild.firstChild.textContent
            if ((!bSuivant) && (photos[indicePrecedent].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoPrecedente = photos[indicePrecedent].firstChild.firstChild.src
            } else {
              photoPrecedente = photos[indicePrecedent].firstChild.src
            }
            photoPrecedenteId = photos[indicePrecedent].firstChild.classList[0]
            break
        }
        break
      }
    }
    video.controls = true
    video.width = 1050
    video.height = 900
    video.preload = 'metadata'
    video.appendChild(source)
    if (bVideo) {
      fig.replaceChild(video, image)
      if (bSuivant) {
        source.setAttribute('src', photoSuivante)
        figCaption.textContent = titreSuivant
        data.id = parseInt(photoSuivanteId)
      } else {
        source.setAttribute('src', photoPrecedente)
        figCaption.textContent = titrePrecedent
        data.id = parseInt(photoPrecedenteId)
      }
    } else {
      for (let y = 0; y < fig.children.length; y++) {
        if (fig.children[y].tagName === 'VIDEO') {
          fig.removeChild(fig.children[y])
          fig.insertBefore(image, fig.children[1])
        }
      }
      if (bSuivant) {
        image.setAttribute('src', photoSuivante)
        figCaption.textContent = titreSuivant
        data.id = parseInt(photoSuivanteId)
      } else {
        image.setAttribute('src', photoPrecedente)
        figCaption.textContent = titrePrecedent
        data.id = parseInt(photoPrecedenteId)
      }
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
    fig.id = 'figure'
    fig.appendChild(iconeFG)

    if (data.image === undefined) {
      source.setAttribute('src', lienVideo)
      video.controls = true
      video.width = 1050
      video.height = 900
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
      getMediaSuivPrec(true, image, fig, figCaption)
    })
    iconeFG.addEventListener('click', function () {
      getMediaSuivPrec(false, image, fig, figCaption)
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
