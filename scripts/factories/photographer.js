function photographerFactory (data) { // eslint-disable-line no-unused-vars
  const picture = `assets/photographers/${data.portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')
    const lien = document.createElement('a')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const tagLine = document.createElement('p')
    const villePays = document.createElement('p')
    const prix = document.createElement('p')
    img.setAttribute('src', picture)
    img.setAttribute('alt', data.description)
    h2.textContent = data.nom
    lien.href = 'photographer.html?id=' + data.id
    tagLine.textContent = data.tagLine
    tagLine.classList.add('tagLine')
    villePays.textContent = data.ville + ', ' + data.pays
    villePays.classList.add('ville')
    prix.textContent = data.prix + '€ / jour'
    prix.classList.add('prix')
    article.appendChild(lien)
    lien.appendChild(img)
    lien.appendChild(h2)
    article.appendChild(villePays)
    article.appendChild(tagLine)
    article.appendChild(prix)
    return (article)
  }
  return { picture, data, getUserCardDOM }
}
