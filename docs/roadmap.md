# BadCalendar - Roadmap

## Vision

BadCalendar est une application Web Google Apps Script destinée aux parents d'un club de badminton.

Son objectif est de fournir une vue simple, fiable et toujours à jour des compétitions, stages et événements jeunes, avec un accès rapide aux informations essentielles et aux pages officielles des tournois.

L'administration de l'application reposera exclusivement sur Google Sheets afin de rester simple à maintenir pour les bénévoles du club.

---

# Versions

## ✅ V0.6 — Consultation des événements

### Fonctionnalités

- Lecture des événements depuis le Google Sheet Master
- Affichage des événements sous forme de cartes
- Tri chronologique
- Regroupement par mois
- Recherche textuelle
- Filtres (type, catégorie, mois)
- Responsive mobile
- Architecture Backend / Frontend séparée

Statut : Terminée

---

## ✅ V0.7 — Nouveau modèle métier

### Fonctionnalités

* Nouveau modèle de données du Master
* Centralisation des constantes
* Suppression de la colonne Actif
* Statuts métier calculés

  * EventStatus
  * RegistrationStatus
* Gestion propre des dates nulles
* Documentation du modèle de données

Statut : **Terminée**

---

## ✅ V0.8 — Amélioration de l'expérience utilisateur

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

Statut : **Terminée**

---

## ✅ V0.9 — Amélioration de l'expérience utilisateur

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

Statut : **Terminée**

---

## ✅ V0.10 — Administration

### Fonctionnalités

* Introduction de readNormalized()
* Création du ValidationService
* Création du ReportService
* Création du modèle ValidationIssue
* Ajout du menu BadCalendar
* Contrôles bloquants
* Avertissements
* Rapport de validation

Statut : **Terminée**

---

# ✅ V0.11 — Validation métier du Master

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

Statut : **Terminée**

---

# ✅ V0.12 — Externalisation des référentiels et évolution du modèle métier

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

Statut : **Terminée**

---

### Clarifier les filtres

Aujourd'hui :

Tous

L'utilisateur ne sait pas ce que filtre la liste.

Proposition :

Type :

[Tous]

Catégorie :

[Toutes]

Mois :

[Tous]

Portée :

[Toutes]

ou utiliser un texte indicatif directement dans chaque liste.

Exemple :

Type d'événement

Catégorie

Mois

Portée

---

### Bouton dynamique

Le texte du bouton pourrait dépendre des statuts métier.

Exemples :

* S'inscrire
* Consulter le tournoi
* Voir l'événement
* Suivre le tournoi
* Voir les résultats

---

### Badges colorés

Remplacer les lignes de texte :

📅 À venir

📝 Inscriptions ouvertes

par de véritables badges colorés.

---

## Priorité moyenne

### Fiche détaillée d'un événement

Afficher :

* toutes les informations
* statut
* lien officiel
* éventuellement une carte Google Maps

---

### Paramètres

Créer un onglet Paramètres contenant notamment :

Ville → Département

afin d'éviter les doublons dans le Master.

---

### Uniformiser les libellés

Étudier le renommage éventuel de :

RegistrationMode

vers

ParticipationMode

si cela améliore la compréhension du modèle métier.

---

## Priorité faible

* Animations légères
* Icônes améliorées
* Partage de l'événement
* Export iCal
* Impression PDF

---

# V0.X — Fonctionnalités à planifier

* Tests automatisés (non-régression)

---

# V1.0 — Première version publique

Objectif :

Publier l'application auprès des familles.

Fonctionnalités attendues :

* stabilité
* ergonomie finalisée
* documentation utilisateur
* administration complète

---

# Évolutions futures

## Amélioration de l'affichage des lieux

Le modèle de données distingue désormais :

- Region
- Department
- City

Une future évolution définira la règle métier permettant de déterminer automatiquement le lieu affiché dans la WebApp selon le type d'événement et les informations disponibles.

L'objectif est que le Frontend affiche une propriété métier unique (`displayLocation`) sans embarquer de logique de décision.

---

## Google Calendar

Permettre l'ajout d'un événement dans le calendrier personnel.

---

## Localisation intelligente

Définir une règle métier permettant de calculer automatiquement le lieu affiché à l'utilisateur.

Exemples :

- ville lorsque celle-ci est connue ;
- département lorsque la ville n'est pas encore renseignée ;
- région pour les compétitions inter-régionales.

Cette logique sera implémentée dans le backend afin de conserver un Frontend purement dédié à l'affichage.

## Google Maps

Permettre l'ouverture directe du lieu de compétition dans Google Maps.

### Objectifs

- simplifier la localisation des lieux de compétition ;
- éviter la saisie répétée des informations de localisation ;
- conserver le Master centré sur les données métier des événements.

### Évolutions prévues

- ajout d'un référentiel dédié aux lieux (onglet spécifique)
- association d'une ville à une requête Google Maps via un référentiel dédié
- ajout d'un bouton « Ouvrir dans Google Maps » sur les événements ;
- ouverture du lieu dans Google Maps sur mobile et desktop.

### Principes

- le Master conserve uniquement la ville de l'événement ;
- les informations de localisation détaillées sont centralisées dans le référentiel des lieux ;
- l'intégration Google Maps repose sur une recherche textuelle du lieu ;
- aucun stockage d'adresse ou de coordonnées GPS n'est nécessaire dans les événements.

---

## Synchronisation

Synchronisation automatique avec :

* BadNet
* Google Sheets
* autres sources éventuelles

---

## Notifications

Étudier la possibilité de notifier :

* ouverture des inscriptions
* clôture prochaine
* modification d'un tournoi

---

# Dette technique

Aucune dette bloquante.

Refactorings possibles si le projet grandit :

* EventModel
* EventStore
* UIService
* séparation plus fine des composants Frontend

Ces évolutions ne sont pas nécessaires avant une montée significative de la complexité fonctionnelle.

---

# Idées retenues

* bouton dynamique selon les statuts
* badges colorés
* filtre par portée
* amélioration de l'affichage des catégories
* clarification des filtres
* fiche détaillée d'un événement

---

# Idées abandonnées

## Badge "Aujourd'hui"

Non retenu.

La majorité des utilisateurs utilisent déjà Google Calendar et les rappels associés.

---

## Mise en avant automatique du prochain événement

Non retenu.

Une vue chronologique par mois est jugée plus simple et plus naturelle.

---

# V1.0 — Première version stable

## Filtres

- [ ] Optimisation de l'occupation de l'espace sur desktop
- [ ] Amélioration de l'affichage de l'en-tête
- [ ] Filtre multi-valeurs (catégories)
- [ ] Filtre multi-valeurs (types)
- [ ] Filtre multi-valeurs (portées)
- [ ] Conservation des critères lors d'un rafraîchissement (à étudier)

## Affichage

- [ ] Afficher les catégories sous forme de badges
- [ ] Tri métier des catégories (Minibad → Junior)
- [ ] Tri métier des portées (Départementale → Nationale)
- [ ] Amélioration de l'affichage des statuts d'inscription
- [ ] Utiliser des couleurs ou icônes pour représenter les statuts d'événement
- [ ] Bouton dont le libellé s'adapte au statut d'inscription
    - S'inscrire
    - Voir le tournoi
    - Voir les résultats

## Qualité

- [ ] Revue complète du code
- [ ] Suppression du code mort
- [ ] Harmonisation du style de code
- [ ] Optimisation des performances

## Tests

- [ ] Revue fonctionnelle complète
- [ ] Tests de non-régression
- [ ] Validation sur mobile
- [ ] Validation sur desktop

## Documentation

- [ ] README
- [ ] Guide d'installation
- [ ] Guide développeur
- [ ] Documentation d'architecture

---

# Evolutions futures

## Administration

- [ ] Enrichissement des référentiels métier

- gestion des villes
- gestion des lieux
- référentiels géographiques

## Consultation

- [ ] Vue calendrier mensuelle
- [ ] Vue agenda
- [ ] Favoris
- [ ] Partage d'un événement

## Export

- [ ] Export iCal
- [ ] Export Google Agenda

## Notifications

- [ ] Notification des ouvertures d'inscription
- [ ] Notification des nouveaux événements
- [ ] Rappels avant un tournoi

## Personnalisation

- [ ] Thème clair / sombre
- [ ] Personnalisation des couleurs
- [ ] Logo personnalisable

---

# Idées à étudier

Ces idées sont volontairement conservées sans engagement de développement.

- Utilisation d'icônes pour les statuts
- Affichage des badges de catégories avec couleurs
- Animation légère des cartes
- Recherche avancée
- Géolocalisation des compétitions
- Carte interactive des événements
- Gestion multilingue
- PWA (installation sur mobile)
- Mode hors connexion