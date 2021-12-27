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
    article.classList.add('media')
    h2.textContent = data.titre
    lien.href = '#'
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
      lien.appendChild(video)
    } else {
      img.setAttribute('src', picture)
      lien.appendChild(img)
    }
    likes.appendChild(icone)
    divMedia.appendChild(h2)
    divMedia.appendChild(likes)
    article.appendChild(divMedia)
    return article
  }
  if (data.image === undefined) {
    return { lienVideo, data, getMediaCardDOM }
  } else {
    return { picture, data, getMediaCardDOM }
  }
}
