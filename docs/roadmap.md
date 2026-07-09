# BadCalendar - Roadmap

## Vision

BadCalendar est une application Web Google Apps Script destinée aux parents d'un club de badminton.

Son objectif est de fournir une vue simple, fiable et toujours à jour des compétitions, stages et événements jeunes, avec un accès rapide aux informations essentielles et aux pages officielles des tournois.

L'administration de l'application reposera exclusivement sur Google Sheets afin de rester simple à maintenir pour les bénévoles du club.

---

## Versions livrées

- V0.6
- V0.7
- V0.8
- V0.9
- V0.10
- V0.11
- V0.12

Voir release-note.md pour le détail.

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