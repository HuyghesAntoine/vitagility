<center> <b style="font-size: 40px">VitAgility projet</b>
</center>

<center> 
<span style="font-size: 25px"> Huyghes, Pecqueux, Skibinski, Wallet </span>
<br> Documentation 
</center>

---

# Technologies utilisées : 
* Node.js avec les modules : 
    * cypress *6.2.1*
    * node-fetch *2.6.1*
    * ejs *3.1.5*
    * express *4.17.1*
    * nodemon *2.0.6*
    * vitamin design system *0.6*
    * @googlemaps/google-maps-services-js *3.1.14*

# API
## API utilisées
* API de google: API places
* API de Decathlon: API Sports et places 
* notre propre API

## Lien de l'API
* `/api/sports`:
    retourne la listes des sports disponibles trié par ordre alphabétique
* `/api/sport/$id`:
    * *id*: id d'un sport obtenable depuit `/api/sports`
    retourne le sport de l'*id* correspondant
* `/api/places/$long&$lat&$radius`:
    * *long*: longitude entre -180 et 180, coordonnée d'ouest en est
    * *lat*: latitude entre -90 et 90, coordonnée du nord au sud
    * *radius*: rayon de recherche entre 1 et 100
    retourne tous les lieux de sport autour de la *longitude*, *latitude* correspondante avec une limite de rayon de recherche
* `/api/places/$long&$lat&$limit&$sport&$outdoor&$indoor`:
    * *sport*: id d'une sport
    * *outdoor*: [true, false] sport d'exterieur
    * *indoor*: [true, false] sport d'intérieur
    retourne les salles pratiquant le *sport* souhaité autour de la *longitude*, *latitude*
* `/api/find/$input`
    * *input*: ville ou lieux qui seras convertie en coordonnées
    retourne la latitude et longitude d'un lieu
* `/api/places/details/$id`:
    * *id*: google\_place\_id
    retourne (buffer d'image max3), rating


# Fonctionnalitées pour le client
* Recherche d'une adresse ou d'un lieu via la barre de recherche directement liée à l'API google maps. 
* Ou de laisser la géolocalisation faire le travail
* Fixer le rayon de la zone de recherche grâce au selecteur 
* Outil de recherche avancée pour filtrer les résultats:
    * Lieux en plein air, couvert, les deux
    * Par type de sports
    * Lieux ouvert à l'heure de la recherche

* Possiblité de selectionner un lieu pour obtenir différentes informations:
    * Nom 
    * Adresse
    * Type de sport pratiqué dans ce lieu 
    * Notes google
    * Avis google
    * Position sur une map monde
