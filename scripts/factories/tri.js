/* global mediaFactory */
/* eslint no-undef: "error" */
/* eslint-env jquery */

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
