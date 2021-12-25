function mediaFactory (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/images/${data.photographeId}/${data.image}`

  function getMediaCardDOM () {
    const article = document.createElement('article')
    const lien = document.createElement('a')
    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const likes = document.createElement('p')
    const icone = document.createElement('i')
    const divMedia = document.createElement('div')
    article.classList.add('media')
    img.setAttribute('src', picture)
    h3.textContent = data.titre
    lien.href = '#'
    icone.classList.add('fas')
    icone.classList.add('fa-heart')
    likes.textContent = data.likes
    article.appendChild(lien)
    lien.appendChild(img)
    likes.appendChild(icone)
    divMedia.appendChild(h3)
    divMedia.appendChild(likes)
    article.appendChild(divMedia)
    return (article)
  }
  return { picture, data, getMediaCardDOM }
}
