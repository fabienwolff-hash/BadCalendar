# Architecture — BadCalendar

# Objectif

Ce document décrit l'architecture générale de BadCalendar, les responsabilités de chaque couche et les principes retenus pour faire évoluer le projet.

L'objectif est de conserver une architecture simple, maintenable et adaptée à Google Apps Script, tout en séparant clairement les responsabilités entre les données, le métier et la présentation.

---

# Vue d'ensemble

BadCalendar s'appuie sur une architecture en couches où chaque service possède une responsabilité unique.

```text
                 Google Spreadsheet
      ┌────────────┬──────────────┬─────────────┐
      ▼            ▼              ▼
   Master      Parameters      Locations
      │            │              │
      ▼            ▼              ▼
 EventService  ParameterService  LocationService
      │            │              │
      └────────────┴──────┬───────┘
                           ▼
                  enrichissement métier
                           │
                           ▼
                     données enrichies
                           │
                           ▼
                       Frontend
```

Chaque couche possède une responsabilité unique.

---

# Backend Apps Script

Le backend est responsable de toute la logique métier.

Cette logique est portée par :

* Code.gs
* Config.gs
* EventService.gs
* ParameterService.gs
* ValidationService.gs
* ReportService.gs

---

# Responsabilités

## Backend

Le traitement des événements s'effectue en plusieurs étapes.

### Pipeline WebApp

* lecture des événements ;
* lecture du référentiel Locations ;
* normalisation des données ;
* lecture des référentiels métier ;
* enrichissement métier ;
* calcul des statuts métier ;
* construction des URLs Google Maps ;
* tri ;
* sérialisation ;
* préparation des données destinées au frontend.

Le frontend ne doit jamais recalculer une information métier.

### Pipeline Administration

* lecture des événements ;
* lecture des référentiels métier ;
* validation des données ;
* génération d'un rapport de contrôle.

---

# Frontend

Le frontend est volontairement léger.

Il ne contient quasiment aucune logique métier.

Sa responsabilité est de :

* afficher les données ;
* gérer les interactions utilisateur ;
* appliquer les filtres ;
* générer le HTML.

---

# Organisation des fichiers

## Code.gs

Point d'entrée des traitements Apps Script.

Responsabilités :

* exposer les fonctions appelées par la WebApp ;
* coordonner les services métier.

---

## Config.gs

Centralise les constantes techniques de l'application.

Responsabilités :

* identifiants des feuilles ;
* constantes de configuration ;
* paramètres techniques.

Les listes métier n'y sont plus stockées.

---

## EventService.gs

Responsabilités :

* lecture du Master ;
* normalisation des données ;
* enrichissement métier ;
* calcul des statuts ;
* calcul de displayLocation ;
* enrichissement avec googleMapsUrl ;
* sérialisation


---

## ParameterService.gs

Responsabilités :

* lecture de l'onglet `Parameters` ;
* mise en cache des référentiels ;
* accès centralisé aux listes métier.

Aucun autre composant ne lit directement l'onglet `Parameters`.

---

## ValidationService.gs

Responsabilités :

* appliquer les règles de validation ;
* vérifier la conformité avec les référentiels ;
* produire une liste de `ValidationIssue` ;
* ne réaliser aucun affichage.

---

## ReportService.gs

Responsabilités :

* générer le rapport de validation ;
* créer ou mettre à jour l'onglet **Contrôles** ;
* présenter les anomalies détectées.

---

## LocationService.gs

Responsabilités :

* lecture de l'onglet `Locations` ;
* mise en cache du référentiel géographique ;
* construction des URL Google Maps ;
* centralisation de la logique de localisation.

Le frontend ne construit jamais lui-même une URL Google Maps.

---

## Menu.gs

Responsabilités :

* créer le menu BadCalendar ;
* lancer les traitements d'administration.

---

## Index.html

Point d'entrée de l'application.

Assemble les différents composants HTML.

---

## Style.html

Contient exclusivement le CSS.

Responsabilités :

* responsive ;
* cartes ;
* badges ;
* boutons ;
* filtres.

Aucune logique JavaScript.

---

## Components.html

Contient les fonctions de rendu.

Exemples :

* renderCard()
* renderEvents()
* renderMonthHeader()

Ces fonctions affichent uniquement les données fournies.

---

## Utils.html

Fonctions utilitaires d'affichage.

Exemples :

* formatDate()
* shortDate()
* eventButton()
* getRegistrationMessage()

Ces fonctions ne recalculent jamais les règles métier.

---

## Constants.html

Centralise les constantes utilisées par le frontend.

Exemples :

* textes UI ;
* identifiants DOM ;
* ordre des catégories ;
* ordre des portées ;
* statuts connus.

---

## Script.html

Point d'entrée JavaScript.

Responsabilités :

* chargement des données ;
* initialisation ;
* gestion des filtres ;
* rendu.

L'objet principal de l'application est :

```text
App
```

---

# Flux de données

## WebApp

```text
Master
      │
      ▼
readNormalized()
      │
      ▼
ParameterService.read()
      │
      ▼
enrich_()
      │
      ▼
serialize()
      │
      ▼
Frontend
```

---

## Administration

```text
Master
      │
      ▼
readNormalized()
      │
      ├──────────────► ParameterService.read()
      │
      ▼
ValidationService
      │
      ▼
ValidationIssue[]
      │
      ▼
ReportService
      │
      ▼
Onglet Contrôles
```

---

# Gestion des filtres

Le frontend conserve localement certaines préférences utilisateur :

* barre de filtres repliée ;
* affichage des compétitions terminées.

Toute modification entraîne un nouveau rendu.

Le filtrage est entièrement réalisé côté client à partir des données déjà enrichies fournies par le backend.

---

# Principes d'architecture

## Source de vérité unique

Le Google Sheets Master constitue l'unique source des données métier.

Les référentiels sont administrés dans l'onglet `Parameters`.

---

## Une seule responsabilité par service

Chaque service possède un domaine clairement identifié :

* **EventService** : événements ;
* **ParameterService** : référentiels ;
* **ValidationService** : contrôles ;
* **ReportService** : restitution des contrôles.

---

## Contrat entre le backend et le frontend

Le backend fournit au frontend des données :

* normalisées ;
* enrichies ;
* validées ;
* prêtes à être affichées.

Le frontend ne doit jamais :

* recalculer un statut ;
* appliquer une règle métier ;
* enrichir les données ;
* interpréter les référentiels.

---

## Référentiels centralisés

Toutes les listes métier sont lues exclusivement via `ParameterService`.

Aucun composant ne doit accéder directement à l'onglet `Parameters`.

Cette règle garantit un point d'accès unique aux référentiels et facilite les futures évolutions.

---

## Données enrichies

Le backend prépare les données afin de simplifier le frontend.

Les transformations, normalisations et enrichissements nécessaires sont réalisés avant l'envoi des données au navigateur.

Voir également `data-model.md`.

---

## Backend orienté métier

Le backend expose au frontend un modèle directement exploitable.

Les informations calculées (statuts, localisation affichée, URL Google Maps, etc.) sont produites une seule fois côté serveur.

Le frontend ne réalise aucun enrichissement des données.

---

## Référentiels spécialisés

Chaque référentiel possède une responsabilité unique.

• Parameters : listes métier
• Locations : informations géographiques

Cette séparation permet de faire évoluer indépendamment les données métier et les données d'enrichissement.

---

# Évolutions prévues

L'architecture est conçue pour permettre :

* l'enrichissement des référentiels ;

L'architecture est conçue pour accueillir de nouveaux services spécialisés sans remettre en cause les responsabilités existantes.

Des services dédiés pourront notamment être ajoutés pour :

* Google Calendar ;
* notifications ;
* synchronisation avec des sources externes ;
* enrichissement des données géographiques.

Chaque nouveau service devra conserver le principe de responsabilité unique.

Les évolutions fonctionnelles détaillées sont décrites dans `roadmap.md`.

---

# Documents associés

* `data-model.md`
* `business_rules.md`
* `decisions.md`
* `vision.md`
* `project_context.md`

---

# Architecture orientée enrichissement

BadCalendar repose sur un modèle d'enrichissement progressif.

Les données métier sont volontairement simples dans le Master.

Chaque service backend ajoute ensuite les informations nécessaires à la consultation :

Master
    ↓
données normalisées
    ↓
données enrichies
    ↓
données prêtes à afficher

Cette approche permet :

* de conserver un Master simple à administrer ;
* de limiter les redondances ;
* de centraliser les règles métier ;
* de simplifier fortement le frontend.

---

# Conclusion

L'architecture actuelle reste volontairement simple tout en étant désormais organisée autour de services spécialisés, chacun responsable d'un domaine fonctionnel clairement identifié.

Les principes fondamentaux à préserver sont :

* **une seule source de vérité (Master)** ;
* **des référentiels centralisés (Parameters)** ;
* **toute la logique métier dans le backend** ;
* **un frontend limité à l'affichage et aux interactions** ;
* **une séparation claire des responsabilités** ;
* **un code modulaire, lisible et facilement testable**.
