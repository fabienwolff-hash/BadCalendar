# Architecture — BadCalendar

# Objectif

Ce document décrit l'architecture générale de BadCalendar, les responsabilités de chaque couche et les principes retenus pour faire évoluer le projet.

L'objectif est de conserver une architecture simple, maintenable et adaptée à Google Apps Script, tout en séparant clairement les responsabilités entre les données, le métier et la présentation.

---

# Vue d'ensemble

BadCalendar suit une architecture en trois couches.

```text
                Google Spreadsheet
                     (Master)
                         │
                         ▼
                EventService.gs
        (lecture + enrichissement métier)
                         │
                         ▼
                  Code.gs (API)
                         │
                         ▼
               Frontend HTML / JS
                         │
                         ▼
                  Utilisateur
```

Chaque couche possède une responsabilité unique.

---

# Architecture logique

## 1. Source de données

Le fichier Google Sheets constitue la source de vérité (Single Source of Truth).

Il contient uniquement les données métier.

Exemples :

- type
- portée
- dates
- catégories
- mode d'inscription
- URL

Il ne contient jamais :

- couleurs
- badges
- textes affichés
- icônes
- statuts calculés

Toutes ces informations sont calculées ailleurs.

---

## 2. Backend Apps Script

Le backend est responsable de toute la logique métier.

Aujourd'hui cette logique est portée par :

- Code.gs
- Config.gs
- EventService.gs

### Responsabilités

Le backend :

- lit le Master ;
- valide les données ;
- normalise les valeurs ;
- enrichit les événements ;
- calcule les statuts métier ;
- prépare les données destinées au frontend.

Le frontend ne doit jamais recalculer une information métier.

---

# EventService

EventService est le cœur métier de l'application.

Aujourd'hui il est organisé autour de plusieurs étapes.

```text
Lecture du Sheet
        │
        ▼
normalize_
        │
        ▼
enrich_
        │
        ▼
sort_
        │
        ▼
conversion JSON
```

---

## normalize_

Transforme une ligne du tableur en objet JavaScript.

Responsabilités :

- lecture des colonnes
- conversion des dates
- gestion des valeurs nulles
- renommage des colonnes

Aucune logique métier.

---

## enrich_

Ajoute toutes les informations calculées.

Exemples :

- eventStatus
- registrationStatus
- month
- monthNumber
- year
- categoriesArray

C'est ici que se trouve toute l'intelligence métier.

---

## sort_

Trie les événements.

Aujourd'hui :

- ordre chronologique croissant

Demain :

- critères secondaires
- priorités éventuelles

---

# Frontend

Le frontend est volontairement "léger".

Il ne contient quasiment aucune logique métier.

Sa responsabilité est :

- afficher les données
- gérer les interactions utilisateur
- appliquer les filtres
- générer le HTML

---

# Organisation des fichiers

## Index.html

Point d'entrée de l'application.

Assemble les différents composants HTML.

---

## Style.html

Contient exclusivement le CSS.

Responsabilités :

- responsive
- cartes
- badges
- boutons
- filtres

Aucune logique JavaScript.

---

## Components.html

Contient les fonctions de rendu.

Exemples :

- renderCard()
- renderEvents()
- renderMonthHeader()

Ces fonctions ne calculent rien.

Elles affichent uniquement les données fournies.

---

## Utils.html

Fonctions utilitaires.

Exemples :

- formatDate()
- shortDate()
- eventButton()
- getRegistrationMessage()

Ces fonctions peuvent produire des textes d'affichage mais ne recalculent jamais les états métier.

---

## Constants.html

Centralise toutes les constantes utilisées par le frontend.

Exemples :

- textes UI
- identifiants DOM
- ordre des catégories
- ordre des portées
- statuts connus

Cela évite les chaînes codées en dur.

---

## Script.html

Point d'entrée JavaScript.

Responsabilités :

- chargement des données
- initialisation
- gestion des filtres
- rendu

Le fichier contient l'objet principal :

```text
App
```

qui pilote toute l'application.

---

# Flux de données

Le cycle de vie d'un événement est le suivant.

```text
Google Sheet

↓

EventService.read()

↓

normalize_

↓

enrich_

↓

JSON

↓

google.script.run

↓

App.init()

↓

render()

↓

renderCard()
```

Les données circulent toujours dans le même sens.

Aucune modification n'est renvoyée vers le backend.

---

# Gestion des filtres

Le frontend conserve l'état courant dans :

```javascript
App.state
```

Exemple :

```javascript
state = {

    search:"",
    type:"Tous",
    scope:"Tous",
    category:"Tous",
    month:"Tous"

}
```

Chaque modification :

↓

met à jour le state

↓

relance render()

↓

recalcule la liste affichée.

Le filtrage est entièrement côté client.

---

# États métier

Deux états sont calculés par le backend.

## eventStatus

Valeurs :

- UPCOMING
- ONGOING
- FINISHED

Calcul :

- Date début
- Date fin
- Aujourd'hui

---

## registrationStatus

Valeurs :

- UNKNOWN
- NOT_OPEN
- OPEN
- CLOSED

Calcul :

- Date ouverture
- Date fermeture
- Aujourd'hui

Le frontend exploite uniquement ces valeurs.

Il ne refait jamais les calculs.

---

# Principes d'architecture

## Source de vérité unique

Le Master est la seule source de données.

---

## Une seule responsabilité par couche

Backend :

→ logique métier

Frontend :

→ affichage

CSS :

→ présentation

---

## Pas de duplication

Une information ne doit être calculée qu'une seule fois.

Exemple :

registrationStatus

est calculé uniquement dans EventService.

---

## Pas de chaînes magiques

Les constantes sont centralisées.

Exemple :

```javascript
STATUS.REGISTRATION.OPEN
```

au lieu de

```javascript
"OPEN"
```

---

## Fonctions courtes

Une fonction doit remplir une seule responsabilité.

Les fonctions longues doivent être découpées.

---

## Données enrichies

Le backend prépare les données afin de simplifier le frontend.

Exemple :

Au lieu de :

```javascript
categories.split(";")
```

dans plusieurs endroits,

EventService fournit directement :

```javascript
categoriesArray
```

---

# Dépendances

Aujourd'hui le projet dépend uniquement de :

- Google Apps Script
- Google Spreadsheet
- HTML
- CSS
- JavaScript ES6

Aucune bibliothèque externe.

---

# Évolutions prévues

L'architecture est prévue pour accueillir de nouveaux modules sans remettre en cause les fondations.

Par exemple :

- Paramètres (villes, gymnases, Google Maps)
- Organisateurs
- Résultats
- Favoris
- Export iCal
- Notifications
- Cache
- PWA
- Internationalisation
- Authentification éventuelle

Ces fonctionnalités devront respecter les mêmes principes :

- séparation métier / affichage ;
- source de vérité unique ;
- calcul métier côté backend ;
- frontend le plus simple possible.

---

# Vision de l'architecture cible (v1.x)

```text
                    Google Spreadsheet

                 +---------------------+
                 |      Master         |
                 +---------------------+
                           │
                 +---------------------+
                 |    Paramètres       |
                 +---------------------+
                           │
                           ▼
                  +------------------+
                  |  EventService    |
                  +------------------+
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼
   StatusService                    LocationService
          ▼                                 ▼
      JSON enrichi                    Données enrichies
          └────────────────┬────────────────┘
                           ▼
                     Frontend WebApp
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      Filtres         Cartes          Navigation
```

---

# Conclusion

L'architecture actuelle est volontairement simple, mais déjà suffisamment structurée pour accompagner les évolutions prévues jusqu'à la version 1.0 et au-delà.

Les principes fondamentaux à préserver sont :

- **une seule source de vérité (Master)** ;
- **toute la logique métier dans le backend** ;
- **un frontend limité à l'affichage et aux interactions** ;
- **une séparation claire des responsabilités** ;
- **un code modulaire, lisible et facilement testable**.