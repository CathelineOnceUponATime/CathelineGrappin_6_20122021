/* eslint-env jquery */
function photographeEntete (data) { // eslint-disable-line no-unused-vars
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

function tri (data) { // eslint-disable-line no-unused-vars
  // Fonction permettant de prendre en compte un type de tri et de faire le tri puis renvoyer le tableau trié
  function trier (type) {
    const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b))
    const byValue = (a, b) => b - a
    let toTri
    switch (type) {
      case 'Popularité' : {
        toTri = e => e.likes
        const byPopularite = sortByMapped(toTri, byValue)
        data.tMedia.sort(byPopularite)
        break
      }
      case 'Date' : {
        toTri = e => new Date(e.date).getTime()
        const byDate = sortByMapped(toTri, byValue)
        data.tMedia.sort(byDate)
        break
      }
      case 'Titre' : {
        const sortBySensitivity = sensitivity => (a, b) => a.localeCompare(b, undefined, { sensitivity })
        toTri = e => e.titre
        const byTitre = sortByMapped(toTri, sortBySensitivity('variant'))
        data.tMedia.sort(byTitre)
        break
      }
    }
    return data.tMedia
  }

  // Fonction permettant de rajouter un label au tri
  function getLabelTri () {
    const label = document.createElement('label')
    label.textContent = 'Trier par'
    label.classList.add('pTrier')
    label.tabIndex = '7'
    return label
  }

  // Fonction permettant de créer dans le DOM le select pour le tri
  function getTri () {
    const ensembleTri = document.createElement('div')
    const select = document.createElement('select')
    const popularite = document.createElement('option')
    const date = document.createElement('option')
    const titre = document.createElement('option')
    ensembleTri.classList.add('select')
    ensembleTri.appendChild(select)
    popularite.textContent = 'Popularité'
    popularite.value = 'Popularité'
    date.textContent = 'Date'
    date.value = 'Date'
    titre.textContent = 'Titre'
    titre.value = 'Titre'
    popularite.classList.add('option')
    date.classList.add('option')
    titre.classList.add('option')
    select.id = 'selectBox'
    select.classList.add('s-hidden')

    select.appendChild(popularite)
    select.appendChild(date)
    select.appendChild(titre)

    return ensembleTri
  }

  // Fonction permettant de mettre en forme le tri
  function enFormeTri () {
    const nbLikesTotal = document.getElementById('nbLikesTotal')
    const iconeCoeur = document.createElement('span')
    iconeCoeur.classList.add('fas')
    iconeCoeur.classList.add('fa-heart')
    const label = document.createElement('label')
    label.classList.add('s-hidden')
    label.textContent = 'Trier par'
    label.htmlFor = 'selectBox'
    const selectTri = document.getElementById('selectBox')
    selectTri.parentElement.insertBefore(label, selectTri)
    const elmtSelect = document.createElement('div')
    elmtSelect.classList.add('styledSelect')
    elmtSelect.tabIndex = '8'
    const options = document.createElement('ul')
    const icone = document.createElement('span')
    icone.classList.add('fas')
    icone.classList.add('fa-chevron-down')
    options.classList.add('options')
    for (let i = 0; i < selectTri.children.length; i++) {
      const option = document.createElement('li')
      selectTri.classList.add('s-hidden')
      option.textContent = selectTri.children[i].textContent
      option.rel = selectTri.children[i].value
      options.appendChild(option)
    }
    selectTri.parentElement.appendChild(elmtSelect)
    selectTri.parentElement.appendChild(options)
    elmtSelect.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') elmtSelect.click()
    })
    elmtSelect.addEventListener('click', function (e) {
      e.stopPropagation()
      if (options.style.display === 'none') {
        elmtSelect.classList.add('active')
        $('ul.options').toggle()
        icone.style.transform = 'rotate(180deg)'
      } else {
        $('ul.options').toggle()
        icone.style.transform = 'rotate(0deg)'
      }
    })
    const listItems = document.getElementsByTagName('li')
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', function (e) {
        e.stopPropagation()
        elmtSelect.textContent = listItems[i].textContent
        elmtSelect.appendChild(icone)
        icone.style.transform = 'rotate(0deg)'
        listItems[i].style.display = 'none'
        trier(elmtSelect.textContent)
        const mediasSection = document.querySelector('.media_section')
        while (mediasSection.children.length !== 0) {
          mediasSection.removeChild(mediasSection.children[mediasSection.children.length - 1])
        }
        if (mediasSection.children.length === 0) {
          let nbEnPlus = 0
          for (let e = 0; e < data.tMedia.length; e++) {
            const mediaModel = mediaFactory(data.tMedia[e])
            const userCardDOM = mediaModel.getMediaCardDOM((e + nbEnPlus))
            mediasSection.appendChild(userCardDOM)
            nbEnPlus += 2
          }
          nbLikesTotal.innerText = data.nbLikesTotal + ' '
          nbLikesTotal.appendChild(iconeCoeur)
        }
        selectTri.classList.remove('active')
        $('#selectBox').val($('#selectBox').attr('rel'))
        $('ul').hide()
        for (let j = 0; j < listItems.length; j++) {
          if (j !== i) {
            listItems[j].style.display = 'block'
            listItems[j].tabIndex = '9'
            listItems[j].addEventListener('keydown', (e) => {
              if (e.code === 'Enter') {
                listItems[j].click()
              }
            })
            if (j === listItems.length - 1) {
              listItems[j].addEventListener('focusout', (e) => {
                elmtSelect.click()
              })
            }
          }
        }
      })
    }
    $(document).click(function () {
      elmtSelect.classList.remove('active')
      $('ul').hide()
      icone.style.transform = 'rotate(0deg)'
    })
    listItems[0].click()
  }
  return { data, getLabelTri, getTri, enFormeTri, trier }
}

function mediaFactory (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/images/${data.photographeId}/${data.image}`
  const lienVideo = `assets/images/${data.photographeId}/${data.video}`

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
        const lightBox = getLightbox()
        mediasSection.parentElement.appendChild(lightBox)
        afficheLightBox(false)
      }
    })
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

  function afficheLightBox (bAffiche) {
    const header = document.getElementsByClassName('photograph-header')
    const mediaSection = document.getElementsByClassName('media_section')
    const encart = document.getElementsByClassName('encart')
    const figure = document.getElementById('figure')
    const labelTri = document.getElementsByClassName('pTrier')
    const tri = document.getElementsByClassName('select')

    if (bAffiche) {
      header[0].style.display = 'flex'
      mediaSection[0].style.display = 'flex'
      encart[0].style.display = 'flex'
      labelTri[0].style.display = 'inline-block'
      tri[0].style.display = 'inline-block'
      figure.parentElement.removeChild(figure)
    } else {
      header[0].style.display = 'none'
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
    return { lienVideo, data, getMediaCardDOM, getLightbox }
  } else {
    return { picture, data, getMediaCardDOM, getLightbox }
  }
}
