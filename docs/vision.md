# Vision — BadCalendar

## Présentation

BadCalendar est une application web permettant de publier simplement le calendrier d'une saison sportive à partir d'un unique fichier Google Sheets.

L'objectif est de fournir une consultation moderne, responsive et toujours à jour des compétitions, stages et événements, sans nécessiter de développement spécifique lors de l'ajout ou de la modification d'un événement.

Le projet est volontairement centré sur la simplicité d'administration, la qualité des données et une architecture facilement maintenable.

---

# Objectifs

BadCalendar poursuit plusieurs objectifs.

## Simplifier la diffusion des calendriers

Les calendriers sportifs sont souvent diffusés sous forme de fichiers PDF, de tableaux ou de pages web difficiles à maintenir.

BadCalendar propose une consultation dynamique, filtrable et adaptée aussi bien aux ordinateurs qu'aux smartphones.

---

## Simplifier l'administration

L'ensemble des événements est administré dans un unique fichier Google Sheets.

Les responsables n'ont pas besoin de connaître le fonctionnement technique de l'application.

Une simple modification du fichier Master est immédiatement prise en compte.

---

## Garantir une source de vérité unique

Le fichier **Master** constitue la seule source officielle des données.

Toutes les informations affichées dans l'application proviennent directement de ce fichier ou sont calculées automatiquement.

Aucune donnée métier n'est dupliquée.

---

## Séparer les responsabilités

Le projet repose sur une séparation claire des responsabilités.

### Le Master

Décrit les événements.

### Le backend

Valide, normalise et enrichit les données.

Calcule également tous les états métier.

### Le frontend

Affiche les données et gère les interactions utilisateur.

Il ne contient aucune règle métier.

---

# Public cible

BadCalendar est destiné à l'ensemble des acteurs d'une organisation sportive.

- joueurs
- parents
- entraîneurs
- clubs
- comités départementaux
- ligues

L'application peut également être adaptée à d'autres disciplines sportives.

---

# Fonctionnalités actuelles

## Consultation

- affichage chronologique
- regroupement par mois
- consultation sur mobile et desktop
- affichage responsive

---

## Recherche

- recherche texte
- filtre par type
- filtre par portée
- filtre par catégorie
- filtre par mois

---

## Informations affichées

Chaque événement présente notamment :

- son type
- sa portée
- son titre
- ses dates
- son lieu
- les catégories concernées
- le mode d'inscription
- le statut des inscriptions
- un lien vers la plateforme associée

---

## Calculs automatiques

Le backend calcule automatiquement :

- le mois
- l'année
- les catégories sous forme de tableau
- le statut de l'événement
- le statut des inscriptions

Le frontend exploite ensuite ces informations pour construire l'affichage.

---

# Architecture générale

Le fonctionnement de BadCalendar peut être résumé par le schéma suivant.

```
                Master Google Sheets
                         │
                         ▼
                 Validation des données
                         │
                         ▼
                   Normalisation
                         │
                         ▼
                  Enrichissement
                         │
                         ▼
              Calcul des états métier
                         │
                         ▼
                     Frontend
                         │
                         ▼
                 Affichage utilisateur
```

Chaque étape possède une responsabilité clairement identifiée.

---

# Principes de conception

Le développement de BadCalendar repose sur plusieurs principes.

## Simplicité

Une nouvelle fonctionnalité doit rester simple à comprendre, à maintenir et à faire évoluer.

---

## Données avant présentation

Le Master décrit uniquement les événements.

Toutes les décisions d'affichage sont prises par l'application.

---

## Responsabilités clairement séparées

Les traitements métier sont exclusivement réalisés dans le backend.

Le frontend ne fait qu'afficher les données.

---

## Documentation systématique

Chaque évolution importante s'accompagne de la mise à jour :

- du modèle de données ;
- de la roadmap ;
- de la documentation technique.

---

## Évolutivité

Le modèle de données est conçu pour accueillir de nouveaux champs sans remettre en cause l'architecture existante.

---

# Vision à long terme

À terme, BadCalendar a vocation à devenir une plateforme générique de publication de calendriers sportifs.

L'objectif n'est pas de répondre uniquement aux besoins du badminton, mais de proposer une architecture suffisamment souple pour être adaptée à d'autres sports ou organisations.

Le fichier Google Sheets reste le point d'entrée unique des données, tandis que l'application prend en charge automatiquement leur validation, leur enrichissement et leur présentation.

Cette approche permet à une structure sportive de publier rapidement un calendrier moderne sans développement spécifique.

---

# Valeurs du projet

Le développement de BadCalendar repose sur quelques valeurs fondamentales.

- simplicité d'utilisation ;
- qualité des données ;
- lisibilité du code ;
- séparation des responsabilités ;
- documentation complète ;
- évolutivité ;
- maintenabilité.

Ces principes guident l'ensemble des décisions techniques et fonctionnelles du projet.