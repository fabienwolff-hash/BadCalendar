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


## 2. Backend Apps Script

Le backend est responsable de toute la logique métier.

Cette logique est portée par :

- Code.gs
- Config.gs
- EventService.gs

### Responsabilités

# Backend

Au niveau du backend, le traitement des événements s'effectue en plusieurs étapes :

- lecture des données ;
- valide les données ;
- transformation des données ;
- enrichissement métier ;
- calcule les statuts métier ;
- tri ;
- prépare les données destinées au frontend.

Le frontend ne doit jamais recalculer une information métier.

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

Le frontend conserve l'état des filtres dans une structure applicative locale.

Toute modification d'un filtre entraîne un nouveau rendu de la liste affichée.

Le filtrage est entièrement réalisé côté client à partir des données déjà enrichies fournies par le backend.

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

## Contrat entre le backend et le frontend

Le backend fournit au frontend des données déjà validées, normalisées et enrichies.

Le frontend doit considérer ces données comme la source de vérité.

Le frontend ne doit jamais :

- recalculer un statut ;
- retraiter les catégories ;
- retraiter les dates ;
- réordonner les données métier.

---

## Données enrichies

Le backend prépare les données afin de simplifier le frontend.
Les transformations, normalisations et enrichissements nécessaires sont réalisés avant l'envoi des données au navigateur. (Voir data-model.md)

---

# Évolutions prévues

L'architecture est conçue pour permettre :

- l'ajout de nouveaux champs métier ;
- l'enrichissement des données ;
- l'intégration de nouveaux modules.

Les évolutions fonctionnelles détaillées sont décrites dans roadmap.md.

---

# Documents associés

Modèle de données :
data-model.md

Règles métier :
business_rules.md

Décisions d'architecture :
decisions.md

Vision produit :
vision.md

Contexte du projet :
project_context.md

---

# Conclusion

L'architecture actuelle est volontairement simple, mais déjà suffisamment structurée pour accompagner les évolutions prévues jusqu'à la version 1.0 et au-delà.

Les principes fondamentaux à préserver sont :

- **une seule source de vérité (Master)** ;
- **toute la logique métier dans le backend** ;
- **un frontend limité à l'affichage et aux interactions** ;
- **une séparation claire des responsabilités** ;
- **un code modulaire, lisible et facilement testable**.