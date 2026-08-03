# Coding Guidelines — BadCalendar

# Objectif

Ce document définit les conventions de développement de BadCalendar.

Son objectif est de garantir un code :

- simple ;
- cohérent ;
- lisible ;
- facilement testable ;
- facilement maintenable.

Ces règles s'appliquent à l'ensemble du projet.

---

# Principes fondamentaux

Le développement de BadCalendar repose sur les principes suivants :

- KISS (Keep It Simple, Stupid)
- YAGNI (You Aren't Gonna Need It)
- DRY (Don't Repeat Yourself)
- Single Source of Truth
- Separation of Concerns

Toute évolution doit respecter ces principes avant toute autre considération.

---

# Philosophie générale

Le projet est développé par un seul développeur.

La priorité n'est donc pas la performance absolue mais :

- la compréhension du code ;
- la facilité de maintenance ;
- la robustesse ;
- la simplicité des évolutions futures.

Un code légèrement plus long mais plus explicite est préféré à une implémentation complexe.

---

# Organisation des responsabilités

## Google Sheets

Le Master est l'unique source de vérité.

Il contient uniquement les données métier.

Il ne contient jamais :

- de données calculées ;
- de données de présentation ;
- de données techniques.

---

## Backend

Le backend est responsable de :

- la lecture des données ;
- la normalisation ;
- la validation ;
- l'enrichissement métier ;
- la préparation des données destinées au frontend.

Toute règle métier appartient au backend.

---

## Frontend

Le frontend est responsable uniquement de :

- l'affichage ;
- les interactions utilisateur ;
- le filtrage des données déjà enrichies.

Le frontend ne doit jamais recalculer une règle métier.

---

# Organisation des services

Chaque service possède une responsabilité unique.

## EventService

Responsable :

- lecture du Master ;
- normalisation ;
- enrichissement ;
- tri ;
- sérialisation.

Il ne valide pas les données.

---

## ValidationService

Responsable :

- application des règles métier ;
- production des ValidationIssue.

Il ne lit pas directement le Spreadsheet.

---

## ReportService

Responsable :

- génération du rapport de validation.

Aucune règle métier.

---

## ParameterService

Responsable :

- lecture des référentiels métier ;
- mise en cache des paramètres.

Il ne contient aucune logique métier.

---

# Règles de conception

## Une méthode = une responsabilité

Chaque méthode doit réaliser une seule tâche.

Si une méthode nécessite plusieurs commentaires pour être comprise, elle doit probablement être découpée.

---

## Éviter les effets de bord

Une méthode ne doit modifier que les données dont elle est responsable.

Les fonctions utilitaires doivent être aussi pures que possible.

---

## Limiter la profondeur d'imbrication

Éviter les blocs imbriqués.

Préférer les retours anticipés ("early return") lorsque cela améliore la lisibilité.

---

## Nommage

Les noms doivent être explicites.

Préférer :

```javascript
registrationStatus
```

à

```javascript
status
```

Préférer :

```javascript
validateAllowedValues_
```

à

```javascript
checkValues
```

---

# Constantes

Toute valeur métier réutilisable doit être centralisée.

Exemples :

- statuts ;
- noms des feuilles ;
- identifiants ;
- paramètres globaux.

Éviter les chaînes codées en dur.

---

# Référentiels métier

Les listes métier ne doivent jamais être codées directement dans les services.

Elles sont exclusivement lues via :

```
ParameterService
```

Cela concerne notamment :

- Type
- Scope
- Category
- RegistrationMode
- Region
- Department
- City

---

# Modèle de données

Le modèle d'un événement est défini dans `data-model.md`.

Toute évolution du modèle doit être répercutée simultanément dans :

- EventService ;
- ValidationService ;
- documentation.

---

# Validation

Les validations doivent être :

- indépendantes ;
- réutilisables ;
- déterministes.

Chaque règle produit une ou plusieurs ValidationIssue.

Une validation ne doit jamais modifier les données.

---

# Frontend

Le frontend ne contient aucune logique métier.

Il ne doit jamais :

- recalculer un statut ;
- déduire une catégorie ;
- enrichir les événements.

Toutes les informations nécessaires doivent être fournies par le backend.

---

# Documentation

Toute évolution significative doit être accompagnée de la mise à jour de la documentation concernée.

Selon les cas :

- roadmap.md
- vision.md
- architecture.md
- business_rules.md
- data-model.md
- ui_guidelines.md
- coding_guidelines.md

La documentation fait partie intégrante du code.

---

# Refactoring

Un refactoring n'est réalisé que s'il apporte une valeur réelle.

Exemples :

- suppression de duplication ;
- amélioration de la lisibilité ;
- simplification de l'architecture.

Un refactoring purement esthétique est à éviter.

---

# Gestion des évolutions

Chaque évolution doit :

- être indépendante ;
- être facilement testable ;
- être facilement réversible.

Les grosses modifications doivent être découpées en sous-issues.

---

# Tests

Chaque sous-issue doit être validée par :

- des tests fonctionnels ;
- des tests de non-régression.

Une fonctionnalité est considérée terminée uniquement lorsque les tests sont concluants.

---

# Style de code

Les conventions suivantes sont utilisées dans le projet :

- indentation de deux espaces ;
- accolades ouvrantes sur la même ligne ;
- noms de méthodes en camelCase ;
- méthodes privées suffixées par `_` ;
- constantes en MAJUSCULES lorsqu'elles sont globales ;
- objets de configuration regroupés dans `Config.gs`.

---

# Business Model First

Toute nouvelle fonctionnalité doit commencer par vérifier si le modèle métier représente correctement le besoin.

Lorsque le modèle est incomplet, celui-ci doit évoluer avant toute implémentation.

Le code doit refléter le modèle métier, jamais l'inverse.

---

# Business Logic

Toute logique métier appartient au backend.

Le frontend consomme uniquement un modèle déjà enrichi.

Toute règle métier présente dans le frontend constitue une anomalie de conception.


---

# Conclusion

BadCalendar privilégie une architecture simple, lisible et évolutive.

Chaque contribution doit chercher à améliorer la qualité globale du projet sans introduire de complexité inutile.

La meilleure solution est généralement la plus simple répondant correctement au besoin métier.
