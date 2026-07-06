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

# Structure du Master

| Ordre | Colonne                | Nom technique         | Type           | Obligatoire  |
| ----: | ---------------------- | --------------------- | -------------- | :---------:  |
|     1 | Type                   | type                  | Liste          |      ✅      |
|     2 | Portée                 | scope                 | Liste          |      ✅      |
|     3 | Titre                  | title                 | Texte          |      ✅      |
|     4 | Date début             | startDate             | Date           |      ✅      |
|     5 | Date fin               | endDate               | Date           |      ✅      |
|     6 | Ville                  | location              | Texte          |      ✅      |
|     7 | Catégories             | categories            | Liste multiple |      ✅      |
|     8 | Ouverture inscriptions | registrationOpenDate  | Date           |      ❌      |
|     9 | Fermeture inscriptions | registrationCloseDate | Date           |      ❌      |
|    10 | Mode inscription       | registrationMode      | Liste          |      ✅      |
|    11 | Lien vers l'event      | eventUrl              | URL            |      ❌      |

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
* Interrégionale
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

Le frontend adapte automatiquement le libellé du bouton d'action selon le contexte métier (inscription ouverte, tournoi terminé, consultation des résultats, etc.).

---

# Champs calculés

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
| isPast             | Booléen | L'événement est terminé            |
| isToday            | Booléen | L'événement a lieu aujourd'hui     |
| isFuture           | Booléen | L'événement est à venir            |

---

# États calculés

## eventStatus

Calculé à partir de :

* Date début
* Date fin
* Aujourd'hui

### UPCOMING

Aujourd'hui < Date début

---

### ONGOING

Date début ≤ Aujourd'hui ≤ Date fin

---

### FINISHED

Aujourd'hui > Date fin

---

## registrationStatus

Calculé à partir de :

* Ouverture inscriptions
* Fermeture inscriptions
* Aujourd'hui

### UNKNOWN

Dates non renseignées.

L'événement est annoncé mais les inscriptions ne sont pas encore disponibles.

---

### NOT_OPEN

Aujourd'hui < Ouverture inscriptions

---

### OPEN

Ouverture inscriptions ≤ Aujourd'hui ≤ Fermeture inscriptions

---

### CLOSED

Aujourd'hui > Fermeture inscriptions

---

# Données volontairement absentes

Le Master ne contient pas :

* couleurs ;
* badges ;
* textes d'affichage ;
* icônes ;
* organisateur ;
* gymnase ;
* adresse ;
* département ;
* coordonnées GPS ;
* lien Google Maps.

Ces informations sont calculées ou obtenues via des tables de paramètres.

---

# Règles métier

## Événement

* La date de fin est obligatoire.
* Pour un événement sur une seule journée :

```
Date début = Date fin
```

* La date de fin doit être supérieure ou égale à la date de début.

## Inscriptions

* Les dates d'ouverture et de fermeture des inscriptions sont facultatives.
* Si les deux dates sont absentes, les modalités d'inscription sont considérées comme inconnues (`registrationStatus = UNKNOWN`).
* Le lien vers l'événement (`eventUrl`) est totalement indépendant du statut des inscriptions et peut rester consultable même après leur fermeture ou après la fin de l'événement.

---

# Futur onglet Paramètres

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

* organisateur ;
* saison ;
* coordonnées GPS ;
* documents associés ;
* liens externes complémentaires.

---

# Principes d'architecture

## Master

Le Master constitue la source de vérité du projet.

Il contient uniquement les données métier saisies par les administrateurs.

## Backend (`EventService`)

Le backend est responsable :

* de la validation des données ;
* de leur normalisation ;
* de leur enrichissement ;
* du calcul des états métier ;
* de la préparation des données destinées au frontend.

## Frontend

Le frontend est responsable :

* des filtres ;
* de la recherche ;
* de l'affichage ;
* de la mise en forme ;
* des interactions utilisateur.

Il ne doit jamais recalculer une règle métier.
