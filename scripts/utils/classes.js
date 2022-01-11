class Photographe { // eslint-disable-line no-unused-vars
  constructor (id, nom, ville, pays, tagLine, prix, portrait, description) {
    this.id = id
    this.nom = nom
    this.ville = ville
    this.pays = pays
    this.tagLine = tagLine
    this.prix = prix
    this.portrait = portrait
    this.description = description
    this.tMedia = []
    this.nbLikesTotal = 0
  }
}

class Media { // eslint-disable-line no-unused-vars
  constructor (id, photographeId, titre, image, video, likes, date, prix, description) {
    this.id = id
    this.photographeId = photographeId
    this.titre = titre
    this.image = image
    this.video = video
    this.likes = likes
    this.date = date
    this.prix = prix
    this.description = description
  }
}
