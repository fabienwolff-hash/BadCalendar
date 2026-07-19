# BadCalendar v1.0 Scope

# Objectif

Ce document définit le périmètre officiel de la version 1.0 de BadCalendar.

Il constitue la référence permettant de décider :

- ce qui doit impérativement être livré ;
- ce qui peut être reporté ;
- ce qui ne fera pas partie du produit.

L'objectif est d'éviter l'ajout progressif de fonctionnalités ("scope creep") et de garantir une première version simple, stable et utile.

---

# Vision

La version 1.0 doit permettre à un parent de joueur de badminton de :

- consulter rapidement les compétitions à venir ;
- identifier les compétitions pertinentes pour son enfant ;
- connaître l'état des inscriptions ;
- accéder facilement à BadNet ;
- planifier sa saison sans risque d'oublier un événement.

La simplicité d'utilisation est la priorité absolue.

---

# Fonctionnalités incluses

## Consultation

- Consultation chronologique des événements
- Regroupement par mois
- Masquage automatique des événements passés
- Affichage responsive (mobile / desktop)

---

## Recherche

Filtres disponibles :

- Catégorie
- Type
- Portée
- Mois
- État des inscriptions

Les états de filtres jugés permanents (ex. catégorie) pourront être mémorisés localement.

---

## Informations d'un événement

Chaque carte présente notamment :

- type d'événement ;
- date ;
- lieu ;
- catégories concernées ;
- portée ;
- mode d'inscription ;
- état des inscriptions.

---

## Actions

Chaque événement permet :

- ouverture de BadNet ;
- ouverture dans Google Maps ;
- export vers Google Calendar.

---

## Navigation

La navigation repose sur une liste chronologique unique.

Aucun système d'onglets ou de vues multiples n'est prévu.

L'objectif est de limiter la complexité et de favoriser une prise en main immédiate.

---

## UX

L'application doit proposer :

- un écran de chargement simple ;
- l'affichage du numéro de version ;
- des messages explicites en cas d'absence de résultat ;
- un bouton de réinitialisation des filtres ;
- une interface adaptée au mobile.

---

## Administration

L'administrateur dispose :

- d'un rapport de validation du Master ;
- d'un tableau de bord d'utilisation (Usage Metrics).

Les statistiques sont exclusivement anonymes.

---

# Critères de qualité

La version 1.0 doit être :

- stable ;
- simple ;
- cohérente ;
- documentée.

Les anomalies bloquantes doivent être corrigées avant publication.

La validation repose sur des tests fonctionnels manuels.

---

# Hors périmètre

Les fonctionnalités suivantes sont volontairement exclues de la v1.0.

## Comptes utilisateurs

- création de compte ;
- authentification ;
- profils.

---

## Fonctionnalités sociales

- commentaires ;
- chat ;
- partage.

---

## Personnalisation avancée

- favoris ;
- préférences complexes ;
- paramètres utilisateur.

---

## Fonctionnalités sportives

- résultats ;
- convocations ;
- statistiques des joueurs ;
- classements.

Ces informations restent accessibles via BadNet.

---

## Plateformes

La version 1.0 reste une Web App.

Aucune application Android ou iOS n'est prévue.

---

## Multi-sport

La version 1.0 est exclusivement dédiée au badminton.

---

## Administration avancée

- multi-administrateurs ;
- gestion des rôles ;
- interface d'administration.

---

# Reporté après la v1.0

Les sujets suivants pourront être étudiés ultérieurement.

- tests automatisés ;
- mémorisation avancée des préférences ;
- suivi des nouveautés depuis la dernière visite ;
- amélioration continue des métriques d'utilisation.

Leur réalisation dépendra des retours des utilisateurs.

---

# Définition du succès

La version 1.0 sera considérée comme réussie si un parent peut, sans apprentissage :

- retrouver rapidement les compétitions qui l'intéressent ;
- savoir si les inscriptions sont ouvertes ;
- accéder à BadNet en un clic ;
- ajouter un événement à son calendrier ;
- utiliser l'application depuis son téléphone.

---

# Philosophie

La version 1.0 privilégie :

- la simplicité ;
- la fiabilité ;
- la rapidité d'utilisation.

Chaque fonctionnalité présente doit apporter une valeur immédiate au parent.

Tout ce qui ajoute de la complexité sans bénéfice clair est volontairement repoussé.
