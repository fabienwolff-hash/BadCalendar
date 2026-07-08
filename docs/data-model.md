# Modèle de données — BadCalendar

## Objectif

Le fichier **Master** est la source de données unique de BadCalendar.

Il contient exclusivement les données métier des événements.

Toutes les informations affichées dans la Web App sont :

* soit directement issues du Master ;
* soit calculées automatiquement par le backend (`EventService`).

Le Master ne doit jamais contenir de données de présentation (couleurs, badges, textes calculés, statuts…).

---

> **Principe fondamental**
>
> Le Master décrit uniquement **ce qu'est un événement**.
>
> Il ne décrit jamais **comment cet événement doit être affiché**.
>
> Toute logique de présentation (couleurs, icônes, badges, textes, boutons, statuts affichés…) appartient exclusivement au frontend.

---

# Données sources (Google Sheets)

| Ordre | Colonne                | Nom technique         | Type           | Obligatoire  |
| ----: | ---------------------- | --------------------- | -------------- | :---------:  |
|     1 | Type                   | Type                  | Liste          |      ✅      |
|     2 | Portée                 | Scope                 | Liste          |      ✅      |
|     3 | Titre                  | Title                 | Texte          |      ✅      |
|     4 | Date début             | StartDate             | Date           |      ✅      |
|     5 | Date fin               | EndDate               | Date           |      ✅      |
|     6 | Ville                  | Location              | Texte          |      ✅      |
|     7 | Catégories             | Categories            | Liste multiple |      ✅      |
|     8 | Ouverture inscriptions | RegistrationOpenDate  | Date           |      ❌      |
|     9 | Fermeture inscriptions | RegistrationCloseDate | Date           |      ❌      |
|    10 | Mode inscription       | RegistrationMode      | Liste          |      ✅      |
|    11 | Lien vers l'event      | EventUrl              | URL            |      ❌      |

---

# Description des champs

## Type

Nature de l'événement.

### Valeurs autorisées

* Stage
* Promobad
* CDJ
* TDJ
* TRJ
* TIJ
* CEJ
* BAC
* BNP
* Interclub
* Championnat

Validation :

* valeur appartenant à la liste.

---

## Portée

Rayonnement de l'événement.

### Valeurs autorisées

* Départementale
* Régionale
* Inter-Régionale
* Nationale

Validation :

* valeur appartenant à la liste.

Remarque :

La portée n'est jamais déduite du type.

Exemple :

Un Stage peut être départemental, régional ou national.

---

## Titre

Nom officiel de l'événement.

Validation :

* obligatoire ;
* non vide.

---

## Date début

Premier jour de l'événement.

Validation :

* date valide.

---

## Date fin

Dernier jour de l'événement.

Validation :

* obligatoire ;
* supérieure ou égale à la date de début.

Pour un événement sur une seule journée :

Date début = Date fin.

---

## Ville

Ville dans laquelle se déroule l'événement.

Validation :

* obligatoire ;
* nom de ville uniquement.

Le département, le gymnase et l'adresse seront obtenus ultérieurement via l'onglet Paramètres.

---

## Catégories

Catégories concernées par l'événement.

Valeurs possibles :

* Minibad
* Poussin
* Benjamin
* Minime
* Cadet
* Junior

Le stockage se fait dans une seule cellule.

Exemple :

Benjamin;Minime

ou

Minibad;Poussin;Benjamin

Le séparateur officiel est le point-virgule (;).

Le backend transforme automatiquement cette chaîne en tableau.

---

## Ouverture inscriptions

Date d'ouverture des inscriptions.

Peut être vide si les inscriptions ne sont pas encore ouvertes.

---

## Fermeture inscriptions

Date de fermeture des inscriptions.

Peut être vide.

Si les deux dates sont absentes, cela signifie que les modalités d'inscription ne sont pas encore connues.

---

## Mode inscription

Valeurs autorisées :

* Libre
* Sur sélection

Validation :

* valeur appartenant à la liste.

---

## Lien de l'évènement

Lien associé à l'évènement.

Exemples :

* BadNet
* Google Forms
* Google Sheets
* autre URL

Validation :

* URL valide ;
* ou vide.

Le backend ne fait aucune hypothèse sur la plateforme utilisée.

---

# Données enrichies (Backend)

Les champs suivants n'existent pas dans le Master.

Ils sont calculés automatiquement par EventService.

| Champ              | Type    | Description                        |
| ------------------ | ------- | ---------------------------------- |
| id                 | Texte   | Identifiant technique calculé      |
| month              | Texte   | Nom du mois                        |
| monthNumber        | Nombre  | Numéro du mois                     |
| year               | Nombre  | Année                              |
| categoriesArray    | Tableau | Liste des catégories               |
| eventStatus        | Enum    | UPCOMING / ONGOING / FINISHED      |
| registrationStatus | Enum    | UNKNOWN / NOT_OPEN / OPEN / CLOSED |

---

# Contrat Backend → Frontend

Un objet réellement envoyé au frontend ressemble à : 

{
  "type": "TDJ",
  "scope": "Départementale",
  "title": "...",
  "startDate": "2026-09-12T00:00:00.000Z",
  "endDate": "2026-09-12T00:00:00.000Z",
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
  "eventUrl": "...",
  "categoriesArray": [...]

}

Toutes les dates sont transmises sous forme de chaînes ISO 8601.

---

# Données volontairement absentes

Le Master ne contient pas :

* couleurs ;
* badges ;
* textes d'affichage ;
* icônes ;
* gymnase ;
* adresse ;
* département ;
* coordonnées GPS ;
* lien Google Maps.

Ces informations sont calculées ou obtenues via des tables de paramètres.

---

# Evolutions possibles du modèle

Le projet pourra contenir un onglet **Paramètres**.

Il permettra notamment de gérer :

* villes ;
* départements ;
* gymnases ;
* adresses ;
* coordonnées GPS ;
* liens Google Maps.

Le Master restera centré uniquement sur les données métier des événements.

Le modèle de données a été conçu pour permettre l'ajout futur de nouvelles informations sans remettre en cause la structure du Master.

Exemples :

* saison ;
* coordonnées GPS ;
* liens externes complémentaires.

## Évolution de la localisation

Le champ actuel `Location` représente la ville de l'événement.

Une évolution future pourra introduire plusieurs niveaux de localisation :

- Region
- Department
- Location (ville)

Cette évolution vise à permettre la planification d'événements dont la localisation exacte n'est pas encore connue.

Exemples :

TRJ planifié :

- Region = Bretagne
- Department = vide
- Location = vide

CDJ planifié :

- Region = Bretagne
- Department = 35
- Location = vide

Événement attribué :

- Region = Bretagne
- Department = 35
- Location = Rennes

## Référentiel des lieux

Un futur onglet Paramètres pourra permettre d'associer une ville à une information de localisation utilisée pour l'ouverture dans Google Maps.

Exemple :

Ville → Requête Google Maps

Saint-Grégoire → Flume Ille Badminton Saint-Grégoire
Rennes → Complexe des Gayeulles Rennes