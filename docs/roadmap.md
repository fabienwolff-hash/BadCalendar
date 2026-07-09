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
- [ ] Amélioration de l'affichage des statuts d'inscription
- [ ] Utiliser des couleurs ou icônes pour représenter les statuts d'événement

## Qualité

- [ ] Revue complète du code
- [ ] Suppression du code mort
- [ ] Harmonisation du style de code
- [ ] Optimisation des performances
- [ ] Revue UX

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
- [ ] documentation complète ;
- [ ] modèle de données.


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
- [ ] clôture prochaine
- [ ] modification d'un tournoi



## Amélioration de l'affichage des lieux

Le modèle de données distingue désormais :

- Region
- Department
- City

Une future évolution définira la règle métier permettant de déterminer automatiquement le lieu affiché dans la WebApp selon le type d'événement et les informations disponibles.

L'objectif est que le Frontend affiche une propriété métier unique (`displayLocation`) sans embarquer de logique de décision.

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

- le Master conserve les informations de localisation métier (Region, Department, City).
- les informations de localisation détaillées sont centralisées dans le référentiel des lieux ;
- l'intégration Google Maps repose sur une recherche textuelle du lieu ;
- aucun stockage d'adresse ou de coordonnées GPS n'est nécessaire dans les événements.

## Synchronisation

Synchronisation automatique avec :

* BadNet
* Google Sheets
* autres sources éventuelles

---

# Idées à étudier

Ces idées sont volontairement conservées sans engagement de développement.

- Utilisation d'icônes pour les statuts
- Affichage des badges de catégories avec couleurs
- Animation légère des cartes
- Recherche avancée
- Géolocalisation des compétitions
- Carte interactive des événements
- Mode hors connexion
- Thème clair / sombre
- Personnalisation des couleurs
- Logo personnalisable
- Partage de l'événement
- Navigation événement (post V1)

	Objectif :
	Permettre l'accès direct à un événement via une URL stable.

	Pré-requis :
	- identifiant événement stable
	- fiche événement
	- gestion des paramètres WebApp

	Usages possibles :
	- partage
	- Google Calendar
	- liens externes

---

# Backlog validé

## Haute priorité

- Tests automatisés de non-régression
- Google Calendar (Permettre l'ajout d'un événement dans le calendrier personnel.)
- Google Maps (Permettre l'ouverture directe du lieu de compétition dans Google Maps.)
- Fiche détaillée d'un événement (Afficher :
* toutes les informations
* statut
* lien officiel
* éventuellement une carte Google Maps)

Objectif :
Séparer l'affichage synthétique (liste/cartes) des informations complètes d'un événement.
La carte événement doit rester limitée aux informations nécessaires à la décision rapide.

## Moyenne priorité 

- Localisation intelligente
- Filtres multi-valeurs




## Faible priorité
- Export iCal
- Animations légères
- Icônes améliorées
- Personnalisation
- catégories sous forme de badges ;
- amélioration des statuts ;
- amélioration des boutons d'action.

- tri métier enrichi ;
- amélioration de l'expérience desktop ;
- remplacement des émojis par des icônes ;
- enrichissement des informations géographiques ;