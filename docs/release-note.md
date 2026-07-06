# Release Notes — BadCalendar

Ce document retrace l'historique des évolutions fonctionnelles et techniques de BadCalendar.

---

# V0.8.0

## Date

Version de développement.

## Objectif

Stabilisation de l'architecture et enrichissement fonctionnel de la WebApp.

---

## Fonctionnalités

### Nouveaux filtres

- ajout du filtre par portée (Scope) ;
- amélioration des filtres existants ;
- gestion dynamique des valeurs.

### Recherche

- recherche plein texte sur les événements ;
- combinaison des filtres.

### Présentation

- regroupement automatique des événements par mois ;
- affichage des catégories sous forme de liste ;
- amélioration des cartes.

### États métier

Calcul automatique :

- eventStatus
- registrationStatus

Gestion des états :

- UNKNOWN
- NOT_OPEN
- OPEN
- CLOSED

### Gestion des inscriptions

- affichage du statut des inscriptions ;
- disparition du statut lorsque celui-ci est inconnu ;
- calcul automatique côté backend.

### Bouton d'action

Introduction d'un bouton permettant d'accéder à l'URL associée à l'événement.

Le bouton est volontairement indépendant de la plateforme utilisée (BadNet, Google Forms, Google Sheets…).

---

## Architecture

### Refactoring

- séparation des composants HTML ;
- création de `Constants.html` ;
- centralisation des constantes d'interface ;
- amélioration de la lisibilité du code.

### Backend

`EventService` devient responsable :

- de la normalisation ;
- de l'enrichissement ;
- du calcul des états métier.

Le frontend ne contient plus de logique métier.

---

## Qualité

- nombreuses corrections de bugs ;
- simplification du code ;
- homogénéisation du modèle de données.

---

# V0.9 (en préparation)

## Expérience utilisateur

- barre des filtres repliable sur mobile ;
- optimisation desktop ;
- filtres multi-valeurs ;
- tri métier des listes de valeurs.

## Affichage

- catégories sous forme de badges ;
- amélioration des statuts ;
- amélioration des boutons d'action.

---

# V1.0 (objectif)

## Stabilisation

- revue complète du code ;
- suppression du code mort ;
- optimisation des performances ;
- revue UX.

## Documentation

- documentation complète ;
- guide d'installation ;
- architecture ;
- modèle de données.

## Validation

- tests de non-régression ;
- validation mobile ;
- validation desktop.

---

# Historique détaillé

## V0.1

### Prototype

Première version expérimentale permettant d'afficher une liste d'événements issue d'un Google Sheets.

---

## V0.2

### Lecture du Master

Mise en place de la lecture du fichier Master et première normalisation des données.

---

## V0.3

### Première interface

Création des premières cartes d'événements.

---

## V0.4

### Recherche

Ajout de la recherche textuelle.

---

## V0.5

### Filtres

Ajout des premiers filtres :

- type ;
- catégorie ;
- mois.

---

## V0.6

### Architecture

Refonte progressive du code.

Séparation :

- Backend
- Frontend
- Composants HTML

---

## V0.7

### Nouveau modèle de données

Refonte complète du Master.

Principales évolutions :

- normalisation des intitulés ;
- nouvelles colonnes ;
- enrichissement du backend ;
- documentation du modèle de données.

Version taguée **v0.7.0**.

---

## V0.8

### Stabilisation fonctionnelle

Principales nouveautés :

- filtre Scope ;
- statuts métier ;
- architecture plus modulaire ;
- composants réutilisables ;
- constantes centralisées ;
- nombreuses améliorations UX.

Cette version constitue la base de la future V1.0.

---

# Philosophie des versions

Les versions mineures (0.x) permettent d'enrichir progressivement l'application tout en consolidant son architecture.

La version **1.0** représentera la première version considérée comme stable, documentée et prête à être utilisée dans un contexte de production.