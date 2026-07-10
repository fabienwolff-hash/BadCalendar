# Modèle de données — BadCalendar

## Objectif

Le Google Sheets **Master** constitue la source de données unique des événements de BadCalendar.

Il contient exclusivement les données métier décrivant les compétitions, stages et autres événements.

Toutes les informations affichées dans la WebApp sont :

* soit directement issues du Master ;
* soit calculées automatiquement par le backend (`EventService`) ;
* soit validées à partir des référentiels de l'onglet `Parameters`.

Le Master ne doit jamais contenir de données de présentation (couleurs, badges, textes calculés, statuts, etc.).

---

> **Principe fondamental**
>
> Le Master décrit uniquement **ce qu'est un événement**.
>
> Il ne décrit jamais **comment cet événement doit être affiché**.

Toute logique de présentation appartient exclusivement au backend ou au frontend.

---

# Données sources — Master

| Ordre | Colonne                  | Nom technique         | Type           | Obligatoire |
| ----: | ------------------------ | --------------------- | -------------- | :---------: |
|     1 | Type                     | Type                  | Liste          |      ✅      |
|     2 | Portée                   | Scope                 | Liste          |      ✅      |
|     3 | Titre                    | Title                 | Texte          |      ✅      |
|     4 | Date début               | StartDate             | Date           |      ✅      |
|     5 | Date fin                 | EndDate               | Date           |      ✅      |
|     6 | Région                   | Region                | Liste          |      ❌      |
|     7 | Département              | Department            | Liste          |      ❌      |
|     8 | Ville                    | City                  | Liste          |      ❌      |
|     9 | Disciplines              | Disciplines           | Liste multiple |      ❌      |
|    10 | Catégories               | Categories            | Liste multiple |      ✅      |
|    11 | Ouverture inscriptions   | RegistrationOpenDate  | Date           |      ❌      |
|    12 | Fermeture inscriptions   | RegistrationCloseDate | Date           |      ❌      |
|    13 | Mode inscription         | RegistrationMode      | Liste          |      ✅      |
|    14 | Lien vers l'événement    | EventUrl              | URL            |      ❌      |

---

# Référentiels — Onglet Parameters

L'onglet `Parameters` contient l'ensemble des listes métier utilisées par l'application.

Exemples :

* Type
* Scope
* Category
* RegistrationMode
* Region
* Department
* City

Ces référentiels sont lus exclusivement par `ParameterService`.

Ils permettent :

* l'administration des listes métier ;
* la validation des données du Master ;
* les futures évolutions fonctionnelles.

---

# Description des champs

## Type

Nature de l'événement.

Validation :

* obligatoire ;
* valeur appartenant au référentiel `Type`.

---

## Scope

Rayonnement de l'événement.

Validation :

* obligatoire ;
* valeur appartenant au référentiel `Scope`.

La portée n'est jamais déduite du type.

---

## Title

Nom officiel de l'événement.

Validation :

* obligatoire ;
* non vide.

---

## StartDate

Premier jour de l'événement.

Validation :

* date valide.

---

## EndDate

Dernier jour de l'événement.

Validation :

* obligatoire ;
* supérieure ou égale à `StartDate`.

---

## Region

Région concernée par l'événement.

Peut être renseignée avant que la localisation précise soit connue.

Validation :

* valeur appartenant au référentiel `Region`.

---

## Department

Département concerné.

Validation :

* valeur appartenant au référentiel `Department`.

---

## City

Commune dans laquelle se déroule l'événement.

Validation :

* valeur appartenant au référentiel `City`.

Cette information servira ultérieurement à l'intégration avec Google Maps.

---

## Disciplines

Disciplines proposées par l'événement.

Le stockage utilise une liste multiple séparée par le caractère :

;

Exemple : Simple;Double

---

## Localisation

Le Master décrit la localisation d'un événement de manière progressive.

Selon les informations connues au moment de la publication, un événement peut renseigner :

- uniquement la Région ;
- la Région et le Département ;
- ou la Ville.

Le backend calcule automatiquement la propriété métier `displayLocation` destinée à l'affichage dans la WebApp.

---

## Categories

Catégories concernées par l'événement.

Le stockage est réalisé dans une seule cellule en utilisant le séparateur officiel :

```text
;
```

Exemple :

```text
Benjamin;Minime
```

Le backend transforme automatiquement cette chaîne en tableau.

Validation :

* toutes les valeurs doivent appartenir au référentiel `Category`.

---

## RegistrationOpenDate

Date d'ouverture des inscriptions.

Peut être vide.

---

## RegistrationCloseDate

Date de fermeture des inscriptions.

Peut être vide.

---

## RegistrationMode

Mode de participation.

Validation :

* valeur appartenant au référentiel `RegistrationMode`.

---

## EventUrl

Lien associé à l'événement.

Validation :

* URL valide ;
* ou vide.

Le backend ne fait aucune hypothèse sur la plateforme utilisée.

---

# Données enrichies (Backend)

Les champs suivants sont calculés automatiquement par `EventService`.

| Champ              | Type    | Description                        |
| ------------------ | ------- | ---------------------------------- |
| month              | Texte   | Nom du mois                        |
| monthNumber        | Nombre  | Numéro du mois                     |
| year               | Nombre  | Année                              |
| categoriesArray    | Tableau | Liste des catégories               |
| eventStatus        | Enum    | UPCOMING / ONGOING / FINISHED      |
| registrationStatus | Enum    | UNKNOWN / NOT_OPEN / OPEN / CLOSED |

---

# Contrat Backend → Frontend

Exemple simplifié :

```json
{
  "type": "TDJ",
  "scope": "Départementale",
  "title": "...",
  "startDate": "...",
  "endDate": "...",
  "region": "Bretagne",
  "department": "35",
  "city": "Rennes",
  "location": "Rennes",
  "categories": "Benjamin;Minime",
  "categoriesArray": [
    "Benjamin",
    "Minime"
  ],
  "eventStatus": "UPCOMING",
  "registrationStatus": "OPEN",
  "month": "...",
  "monthNumber": 9,
  "year": 2026,
  "displayLocation" : "...",
  "googleMapsUrl" : "...",
  "disciplinesArray" : "..."
  "registrationMode": "...",
  "registrationOpenDate": "...",
  "registrationCloseDate": "...",
  "eventUrl": "..."
  
}
```

Toutes les dates sont transmises au frontend au format ISO-8601.

---

# Référentiel Locations

L'onglet `Locations` complète les informations géographiques.

Chaque ville peut être associée à une requête Google Maps.

Exemple :

| City | GoogleMapsQuery |
|------|-----------------|
| Rennes | Complexe Sportif Jean Prouff Rennes |

Ce référentiel permet de construire automatiquement les liens Google Maps sans alourdir le Master.


---

# Séparation des responsabilités

Le Master contient uniquement les données métier.

Les informations calculées ou dérivées sont produites par le backend.

Exemples :

- displayLocation ;
- googleMapsUrl ;
- eventStatus ;
- registrationStatus ;
- month ;
- year ;
- catégories sous forme de tableau ;
- disciplines sous forme de tableau.

Le frontend consomme directement ces propriétés sans appliquer de logique métier.

---

# Évolutions prévues

Le modèle de données est conçu pour évoluer sans remettre en cause la structure du Master.

Les principales évolutions envisagées sont :

- enrichissement des référentiels géographiques ;
- amélioration du référentiel Locations ;
- ajout d'informations complémentaires sur les lieux (gymnase, salle, coordonnées GPS...) ;
- personnalisation des cartes en fonction du profil utilisateur ;
- enrichissement progressif de la fiche détaillée d'un événement.

Le modèle continuera de privilégier une séparation stricte entre les données métier, les données enrichies par le backend et les informations de présentation.