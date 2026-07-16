# Master Validation Rules

## Type

- ERROR : obligatoire
- ERROR : valeur autorisée

## Scope

- ERROR : obligatoire
- ERROR : valeur autorisée

## Title

- ERROR : obligatoire
- WARNING : espaces inutiles
- WARNING : doublon probable avec un autre événement ayant même titre, même ville et même date.

## StartDate

- ERROR : date valide
- WARNING : date incohérente avec la saison

## EndDate

- ERROR : date valide
- ERROR : >= StartDate
- WARNING : durée anormalement longue
- WARNING : date incohérente avec la saison

## Location (A ne traiter que lorsqu'on aura séparé en Region, Department, City)


## Categories

- ERROR : obligatoire
- ERROR : séparateur ';'
- ERROR : catégories autorisées
- ERROR : au moins une catégorie renseignée.
- WARNING : catégorie dupliquée


## RegistrationOpenDate

ERROR : date valide si renseignée
WARNING : renseignée alors que RegistrationCloseDate est vide
WARNING : date d'ouverture postérieure à la date de début de l’événement.
WARNING : date incohérente avec la saison

## RegistrationCloseDate

ERROR : date valide si renseignée
ERROR : RegistrationCloseDate <= RegistrationOpenDate si les deux dates sont renseignées
WARNING : renseignée alors que RegistrationOpenDate est vide
WARNING : date de fermeture postérieure à la date de début de l’événement.
WARNING : date incohérente avec la saison

## RegistrationMode

ERROR : obligatoire
ERROR : valeur autorisée
WARNING : espaces inutiles avant/après

## EventUrl

ERROR : commence par http:// ou https:// si renseigné
WARNING : contient des espaces
WARNING : URL manifestement incomplète
WARNING : URL identique utilisée sur plusieurs événements différents

## Contrôles inter-lignes

WARNING : doublon strict (Type + Title + StartDate + Location)
WARNING : doublon probable (même titre, même date, même ville)
