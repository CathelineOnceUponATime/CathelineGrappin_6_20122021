/* eslint-env jquery */
function lightboxFactory (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/images/${data.photographeId}/${data.image}`
  const lienVideo = `assets/images/${data.photographeId}/${data.video}`

  function afficheLightBox (bAffiche) {
    const photoHeader = document.getElementsByClassName('photograph-header')
    const header = document.getElementsByTagName('header')
    const mediaSection = document.getElementsByClassName('media_section')
    const encart = document.getElementsByClassName('encart')
    const figure = document.getElementById('figure')
    const labelTri = document.getElementsByClassName('pTrier')
    const tri = document.getElementsByClassName('select')

    if (bAffiche) {
      header[0].style.display = 'flex'
      photoHeader[0].style.display = 'flex'
      mediaSection[0].style.display = 'flex'
      encart[0].style.display = 'flex'
      labelTri[0].style.display = 'inline-block'
      tri[0].style.display = 'inline-block'
      figure.parentElement.removeChild(figure)
    } else {
      header[0].style.display = 'none'
      photoHeader[0].style.display = 'none'
      mediaSection[0].style.display = 'none'
      encart[0].style.display = 'none'
      labelTri[0].style.display = 'none'
      tri[0].style.display = 'none'
    }
  }

  function getMediaSuivPrec (bSuivant, image, fig, figCaption) {
    let photoSuivante
    let titreSuivant
    let photoSuivanteId
    let descriptionSuivante
    let photoPrecedente
    let titrePrecedent
    let photoPrecedenteId
    let descriptionPrecedente
    let indiceSuivant
    let indicePrecedent
    let k
    let bVideo = false
    const video = document.createElement('video')
    const source = document.createElement('source')
    const descriptionVideo = document.createElement('p')
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
            descriptionPrecedente = photos[0].firstChild.alt
            if ((!bSuivant) && (photos[indicePrecedent].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoPrecedente = photos[indicePrecedent].firstChild.firstChild.src
            } else {
              photoPrecedente = photos[indicePrecedent].firstChild.src
            }
            descriptionPrecedente = photos[indicePrecedent].firstChild.alt
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
            descriptionPrecedente = photos[photos.length - 1].firstChild.alt
            titreSuivant = photos[indiceSuivant].parentElement.lastChild.firstChild.textContent
            if ((bSuivant) && (photos[indiceSuivant].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoSuivante = photos[indiceSuivant].firstChild.firstChild.src
            } else {
              photoSuivante = photos[indiceSuivant].firstChild.src
            }
            photoSuivanteId = photos[indiceSuivant].firstChild.classList[0]
            descriptionSuivante = photos[indiceSuivant].firstChild.alt
            break
          default :
            titreSuivant = photos[indiceSuivant].parentElement.lastChild.firstChild.textContent
            if ((bSuivant) && (photos[indiceSuivant].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoSuivante = photos[indiceSuivant].firstChild.firstChild.src
            } else {
              photoSuivante = photos[indiceSuivant].firstChild.src
            }
            descriptionSuivante = photos[indiceSuivant].firstChild.alt
            photoSuivanteId = photos[indiceSuivant].firstChild.classList[0]
            titrePrecedent = photos[indicePrecedent].parentElement.lastChild.firstChild.textContent
            if ((!bSuivant) && (photos[indicePrecedent].firstChild.tagName === 'VIDEO')) {
              bVideo = true
              photoPrecedente = photos[indicePrecedent].firstChild.firstChild.src
            } else {
              photoPrecedente = photos[indicePrecedent].firstChild.src
            }
            descriptionPrecedente = photos[indicePrecedent].firstChild.alt
            photoPrecedenteId = photos[indicePrecedent].firstChild.classList[0]
            break
        }
        break
      }
    }
    video.controls = true
    video.width = '90%'
    video.height = 'auto'
    video.preload = 'metadata'
    video.appendChild(source)
    video.appendChild(descriptionVideo)
    if (bVideo) {
      for (let y = 0; y < fig.children.length; y++) {
        if (fig.children[y].tagName === 'IMG') {
          fig.removeChild(fig.children[y])
          fig.insertBefore(video, fig.children[1])
        }
      }
      video.tabIndex = '2'
      if (bSuivant) {
        source.setAttribute('src', photoSuivante)
        descriptionVideo.innerText = descriptionSuivante
        figCaption.textContent = titreSuivant
        data.id = parseInt(photoSuivanteId)
      } else {
        source.setAttribute('src', photoPrecedente)
        descriptionVideo.innerText = descriptionPrecedente
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
      image.tabIndex = '2'
      if (bSuivant) {
        image.setAttribute('src', photoSuivante)
        figCaption.textContent = titreSuivant
        data.id = parseInt(photoSuivanteId)
        image.setAttribute('alt', descriptionSuivante)
      } else {
        image.setAttribute('src', photoPrecedente)
        figCaption.textContent = titrePrecedent
        data.id = parseInt(photoPrecedenteId)
        image.setAttribute('alt', descriptionPrecedente)
      }
    }
  }

  function getLightbox () {
    const fig = document.createElement('figure')
    const figCaption = document.createElement('figcaption')
    const image = document.createElement('img')
    const video = document.createElement('video')
    const descriptionVideo = document.createElement('p')
    const source = document.createElement('source')
    const iconeFD = document.createElement('span')
    const iconeFG = document.createElement('span')
    const iconeF = document.createElement('span')
    iconeFG.classList.add('fas')
    iconeFG.classList.add('fa-angle-left')
    iconeFD.classList.add('fas')
    iconeFD.classList.add('fa-angle-right')
    iconeF.classList.add('fas')
    iconeF.classList.add('fa-times')
    figCaption.textContent = data.titre
    figCaption.tabIndex = '3'
    fig.id = 'figure'
    fig.appendChild(iconeFG)
    fig.tabIndex = '1'
    if (data.image === undefined) {
      source.setAttribute('src', lienVideo)
      descriptionVideo.innerText = data.description
      video.controls = true
      video.width = 1050
      video.preload = 'metadata'
      fig.appendChild(video)
      video.appendChild(source)
      video.appendChild(descriptionVideo)
      video.tabIndex = '2'
    } else {
      image.setAttribute('src', picture)
      image.tabIndex = '2'
      image.setAttribute('alt', data.description)
      fig.appendChild(image)
    }

    fig.appendChild(iconeFD)
    fig.appendChild(iconeF)
    fig.appendChild(figCaption)
    iconeFG.tabIndex = '4'
    iconeFG.ariaLabel = 'Previous image'
    iconeFD.tabIndex = '5'
    iconeFD.ariaLabel = 'Next image'
    iconeF.tabIndex = '6'
    iconeF.ariaLabel = 'Close dialog'
    iconeFD.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') iconeFD.click()
    })
    iconeFG.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') iconeFG.click()
    })
    iconeF.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') iconeF.click()
    })
    iconeFD.addEventListener('click', function () {
      getMediaSuivPrec(true, image, fig, figCaption)
    })
    iconeFG.addEventListener('click', function () {
      getMediaSuivPrec(false, image, fig, figCaption)
    })
    iconeF.addEventListener('click', function () {
      afficheLightBox(true)
    })
    $(document).keydown(function (e) {
      const keyCode = e.keyCode ? e.keyCode : e.which
      if (keyCode === 39) {
        getMediaSuivPrec(true, image, fig, figCaption)
      } else if (keyCode === 37) {
        getMediaSuivPrec(false, image, fig, figCaption)
      }
    })
    return fig
  }

  if (data.image === undefined) {
    return { lienVideo, data, getLightbox, getMediaSuivPrec, afficheLightBox }
  } else {
    return { picture, data, getLightbox, getMediaSuivPrec, afficheLightBox }
  }
}
