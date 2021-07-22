# Coding Interview Developer Frontend DRI - GitInpector

Ce dépôt github contient les sources des problèmes de Frontend imposé par la DRI de CinetPay. L'application obtenue suite a nos travaux; que nous avons nommées **GitInspector**; tente de répondre aux exigences des problèmes par la proposition des fonctionnalitées suivantes:

- Connexion avec timeout total de 30 secondes
- Recherche du profil git d'un candidat
- Module de comparaison des profils basée sur une évaluation des données fournis par l'API Github

Image de l'interface principale.

Ce readme représente à la fois le guide d'installation et le manuel d'utilisation et suivra le plan suivant:

- [Parlons technique](#parlons-technique)
    - [Outils de développement](#outils-de-développement)
    - [Modèle d'optimisation](#modèle-d'optimisation)
    - [L'API Github](#l'api-github)
- [Installation](#installation)
- [Manuel d'utilisation](#manuel-d'utilisation)
- Captures d'écran

## Parlons technique

### Outils de développement

Pour donner vie a ce projet, nous avons opté pour Vue.js en raison de la forte expérience que nous avec lui. Ci-dessous la liste des outils supplémentaires que nous avons utilisés.

- Bootstrap 5.0.2, comme fondation de notre IHM
- FontAwesome 5, pour les icônes de l'interface

### Modèle d'optimisation

Après analyse des problèmes, nous avons déduit que le Frontend ne sera pas soumis a une forte charge de travail. Ce constat nous a ammené a utiliser des algorithmes de Frontend pour les calculs de rendus tel que le **tri bulle** qui est éfficace pour les ordannacements de petits volumes. L'idée de cette approche d'optimiser le rendu de la page et les ressources utilisée.

### L'API Github

Il s'agit d'un point à lire attentivement. Pour rechercher les profils des candidats sur Github nous avons utilisé les endpoints suivants: `GET /search/users?q=:q&per_page=10&page=1` et `GET /search/users/:login`. Remarquons que nous avons volontairement réduit le nombre de candidats à 10. En effet, dans le cadre de l'interview nous avons réduis ce nombre pour réduire les appels d'API car nous sommes limités en nombre d'appels par heure. Etant donné que l'affichage des candidats néccessite `1 + nombre_de_resultats` appels d'API, il est donc possible de finir notre quotas d'appel un seul. C'est pourquoi nous avons opté pour 10 candidats par requête. Nous utilisons notre Github "personal access token" pour étendre le nombre d'appels. Ainsi, nous vous prions de faite attention à ne pas le diffuser.

## Installation

Dans votre terminal, taper les commandes suivantes
```
git clone https://github.com/jdjebi/GitInpector.git // Téléchargement du projet sur votre machine

cd GitInpector/

npm install // Installation des dépendances

npm run serve // Lancement de l'application
```
En principe l'application se lancera à l'adresse suivante: `[http://localhost:8080/](http://localhost:8080/ )` 

## Manuel d'utilisation
