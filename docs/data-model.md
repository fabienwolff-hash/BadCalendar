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
|     9 | Location *(transitoire)* | Location              | Texte          |      ❌      |
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

## Location *(transitoire)*

Champ historique conservé uniquement afin d'assurer une migration progressive du modèle.

Il continuera d'être utilisé par le frontend jusqu'à la mise en place d'une règle métier de calcul du lieu affiché.

Ce champ a vocation à disparaître.

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
  "registrationMode": "...",
  "registrationOpenDate": "...",
  "registrationCloseDate": "...",
  "eventUrl": "..."
}
```

Toutes les dates sont transmises au frontend au format ISO-8601.

---

# Données volontairement absentes

Le Master ne contient pas :

* couleurs ;
* badges ;
* textes d'affichage ;
* icônes ;
* adresse complète ;
* coordonnées GPS ;
* lien Google Maps.

Ces informations seront obtenues ultérieurement à partir de référentiels spécialisés.

---

# Évolutions prévues

Le modèle de données est conçu pour évoluer sans remettre en cause la structure du Master.

Les principales évolutions envisagées sont :

* suppression définitive du champ `Location` ;
* calcul d'un champ métier `displayLocation` par le backend ;
* enrichissement des référentiels géographiques ;
* intégration avec Google Maps ;
* ajout éventuel d'informations complémentaires (coordonnées GPS, liens externes, etc.).

Le frontend continuera à consommer un modèle déjà enrichi sans embarquer de logique métier.
