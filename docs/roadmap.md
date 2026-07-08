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

Ville → Gymnase

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

# V0.11 — Renforcement des contrôles métier

Fonctionnalités envisagées :
* Validation des dates
* Validation des référentiels
* Validation des URL
* Tri des anomalies
* Tests automatisés (non-régression)

---

# V0.12 — Assistance à l'administration

Fonctionnalités envisagées :
* Navigation vers les lignes en erreur
* Validation à la modification
* Paramètres d'administration
* Historique des contrôles

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

## Amélioration du modèle de localisation :

- gestion de la région ;
- gestion du département ;
- gestion de la ville ;
- référentiel des lieux. (avec gestion du google place id pour les besoins de google maps ?)

---

## Google Calendar

Permettre l'ajout d'un événement dans le calendrier personnel.

---

## Google Maps

Afficher l'emplacement exact du gymnase.

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

- [ ] Paramétrage avancé des listes de valeurs

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