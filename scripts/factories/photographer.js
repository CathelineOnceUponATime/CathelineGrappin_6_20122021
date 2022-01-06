function photographerFactory (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/photographers/${data.portrait}`

  function getUserCardDOM (nbCart) {
    const article = document.createElement('article')
    const lien = document.createElement('a')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const articleInfo = document.createElement('article')
    const tagLine = document.createElement('p')
    const villePays = document.createElement('h3')
    const prix = document.createElement('p')
    img.setAttribute('src', picture)
    img.setAttribute('alt', data.description)
    h2.textContent = data.nom
    lien.href = 'photographer.html?id=' + data.id
    lien.tabIndex = (nbCart + 3)
    tagLine.textContent = data.tagLine
    tagLine.classList.add('tagLine')
    villePays.textContent = data.ville + ', ' + data.pays
    villePays.classList.add('ville')
    prix.textContent = data.prix + '€ / jour'
    prix.classList.add('prix')
    article.appendChild(lien)
    lien.appendChild(img)
    lien.appendChild(h2)
    articleInfo.tabIndex = (nbCart + 4)
    articleInfo.classList.add('info')
    articleInfo.appendChild(villePays)
    articleInfo.appendChild(tagLine)
    articleInfo.appendChild(prix)
    article.appendChild(articleInfo)
    return (article)
  }
  return { picture, data, getUserCardDOM }
}
