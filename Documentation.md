<center> <b style="font-size: 40px">VitAgility projet</b>
</center>

<center> 
<span style="font-size: 25px"> Huyghes, Pecqueux, Skibinski, Wallet </span>
<br> Documentation 
</center>

---

* **Technologies utilisées** : 
    * Node.js avec les modules : 
        * cypress *6.2.1*
        * node-fetch *2.6.1*
        * ejs *3.1.5*
        * express *4.17.1*
        * nodemon *2.0.6*
        * @googlemaps/google-maps-services-js *3.1.14*

* **API utilisées**
    * API places by google
    * API Sports and places by Dectahlon 
    * Our own API

* **Fonctionnalitées pour le client** 
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