function photographerFactory (data) { // eslint-disable-line no-unused-vars
  // const { nom, portrait, tagLine } = data

  const picture = `assets/photographers/${data.portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')
    const img = document.createElement('img')
    const tagLine = document.createElement('p')
    const villePays = document.createElement('p')
    const prix = document.createElement('p')
    img.setAttribute('src', picture)
    const h2 = document.createElement('h2')
    h2.textContent = data.nom
    tagLine.textContent = data.tagLine
    tagLine.classList.add('tagLine')
    villePays.textContent = data.ville + ', ' + data.pays
    villePays.classList.add('ville')
    prix.textContent = data.prix + '€/jour'
    prix.classList.add('prix')
    article.appendChild(img)
    article.appendChild(h2)
    article.appendChild(villePays)
    article.appendChild(tagLine)
    article.appendChild(prix)
    return (article)
  }
  return { picture, data, getUserCardDOM }
}
