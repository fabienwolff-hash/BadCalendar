# Release Notes — BadCalendar

Ce document retrace l'historique des évolutions fonctionnelles et techniques de BadCalendar.

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

## V0.6 — Consultation des événements

### Fonctionnalités

- Séparation du backEnd et du frontEnd
- Lecture des événements depuis le Google Sheet Master
- Affichage des événements sous forme de cartes
- Tri chronologique
- Regroupement par mois
- Recherche textuelle
- Filtres (type, catégorie, mois)
- Responsive mobile
- Architecture Backend / Frontend séparée


---

## V0.7

### Nouveau modèle de données

Refonte complète du Master.

Principales évolutions :

- normalisation des intitulés ;
- Centralisation des constantes ;
- Statuts métier calculés ;
- enrichissement du backend ;
- documentation du modèle de données.

---

## V0.8 — Amélioration de l'expérience utilisateur

Objectif : améliorer l'ergonomie et la lisibilité de la WebApp sans modifier son architecture métier.

### Fonctionnalités

#### Filtres

- Ajout du filtre par portée
- Tri métier des catégories (Minibad → Junior)
- Tri métier des portées (Départementale → Nationale)

#### Affichage

- Refonte graphique des cartes d'événements
- Affichage compact des catégories
- Affichage des informations d'inscription uniquement lorsqu'elles sont pertinentes
- Bouton dynamique selon le statut de l'événement :
  - S'inscrire
  - Consulter le tournoi
  - Voir les résultats
- Nouvelle palette de badges colorés selon le type de compétition
- Amélioration de la lisibilité des en-têtes de mois
- Optimisation de l'affichage desktop (compactage de l'en-tête)

#### Architecture

- Centralisation des constantes Frontend (`Constants.html`)
- Centralisation des messages liés aux inscriptions (`getRegistrationMessage()`)
- Suppression de duplications de code
- Nettoyage des composants Frontend
- Utilisation exclusive des dates `null` en remplacement des anciennes dates sentinelles
- Harmonisation des statuts métier entre backend et frontend

#### Documentation

- Mise à jour de la Roadmap
- Mise à jour du modèle de données
- Rédaction du document de vision du projet
- Ajout des Release Notes
- Création de la documentation d'architecture et des règles de développement


---

## V0.9 — Amélioration de l'expérience utilisateur

Objectif : améliorer l'ergonomie, la lisibilité et le confort d'utilisation de la WebApp sans modifier son architecture métier.

### Fonctionnalités

#### Navigation

- Barre des filtres repliable
- Mémorisation de l'état des filtres (localStorage)
- Résumé des filtres lorsque la zone est repliée
- Écran d'initialisation pendant le chargement
- Écran d'erreur en cas d'échec du chargement

#### Filtres

- Filtre par portée
- Option "Afficher les compétitions terminées"
- Préférence mémorisée dans le navigateur
- Réinitialisation complète des filtres

#### Affichage

- Tri métier des catégories
- Tri métier des portées
- Affichage compact des catégories
- Bouton dynamique selon le statut de l'événement
- Badges colorés par type de compétition
- Compétitions terminées masquées par défaut
- Style spécifique des compétitions terminées
- Mise en évidence discrète des compétitions en cours
- Responsive amélioré (mobile / tablette / desktop)

#### Qualité

- Refactoring du stockage local
- Centralisation de l'initialisation de l'application
- Réduction des duplications de code
- Nettoyage et simplification du Frontend

---


## V0.10 — Administration

### Fonctionnalités

* Introduction de readNormalized()
* Création du ValidationService
* Création du ReportService
* Création du modèle ValidationIssue
* Ajout du menu BadCalendar
* Contrôles bloquants
* Avertissements
* Rapport de validation

---

---

# V0.11 — Validation métier du Master

## Objectif

Renforcer la qualité des données du Master en mettant en place une validation métier complète avant toute utilisation des données.
Cette version introduit un véritable moteur de validation permettant de détecter les erreurs bloquantes et les avertissements de qualité.

---

## Infrastructure

- Création du modèle `ValidationIssue`
- Introduction des niveaux de validation (`ERROR`, `WARNING`)
- Validation générique basée sur des règles
- Rapport de validation trié par ligne puis par champ

---

## Contrôles implémentés

- Champs obligatoires
- Valeurs autorisées
- Cohérence des dates

## Rapport de validation

Le rapport présente les colonnes :

- Niveau
- Ligne
- Champ
- Message

Les anomalies sont triées afin de faciliter leur correction.

---

# V0.12 — Externalisation des référentiels et évolution du modèle métier

## Objectif

Renforcer le socle technique de BadCalendar en externalisant les référentiels métier dans le Google Sheets et en faisant évoluer le modèle de localisation, sans modifier l'expérience utilisateur.

Cette version prépare les futures évolutions (Google Maps, filtres géographiques, etc.) tout en conservant une architecture simple, maintenable et centrée sur le Master comme unique source de vérité.

---

## Architecture

- Création du `ParameterService`
- Introduction de l'onglet `Parameters`
- Externalisation des référentiels métier
- Suppression des listes codées en dur dans `Config.gs`
- Lecture centralisée des paramètres métier

---

## Modèle de données

Évolution du modèle de localisation :

- ajout de `Region`
- ajout de `Department`
- ajout de `City`
- conservation temporaire de `Location` afin d'assurer une migration progressive

---

## Validation

Les contrôles métier utilisent désormais exclusivement les référentiels du Google Sheets.

Validation des :

- types
- portées
- catégories
- modes de participation
- régions
- départements
- villes

---

## Frontend

Les nouveaux champs de localisation sont transmis jusqu'au navigateur.

Aucune évolution visuelle n'est introduite.

L'affichage continue d'utiliser le champ `Location` de manière transitoire.

La stratégie d'affichage du lieu sera définie dans une version ultérieure.

---

# Philosophie des versions

Les versions mineures (0.x) permettent d'enrichir progressivement l'application tout en consolidant son architecture.

La version **1.0** représentera la première version considérée comme stable, documentée et prête à être utilisée dans un contexte de production.
