# Domain Model

## Objectif

Ce document décrit le modèle métier de BadPlanner.

Il définit les principales entités manipulées par l'application, leurs responsabilités ainsi que leurs relations.

Il constitue la référence fonctionnelle du projet. Toute évolution du modèle métier doit être validée ici avant d'être implémentée dans le code.

---

# Principes

Le modèle métier est indépendant :

- de l'architecture technique ;
- du stockage des données ;
- de l'interface utilisateur.

Il décrit uniquement les concepts fonctionnels du domaine.

---

# Vue d'ensemble

```text
Tournament
    │
    ├── Program
    │      │
    │      └── Site
```

Un tournoi est constitué d'un ou plusieurs programmes.

Chaque programme est organisé sur un site.

---

# Tournament

## Définition

Le Tournament représente une compétition ou un événement sportif.

Il constitue l'entité principale manipulée par BadPlanner.

Un Tournament correspond à ce qu'un utilisateur identifie comme une compétition.

Exemples :

- TRJ Simple n°1
- TIJ n°2
- Championnat Départemental Jeunes
- Stage de la Ligue

---

## Responsabilités

Le Tournament porte toutes les informations communes à l'ensemble de la compétition.

Par exemple :

- TournamentId
- type
- titre
- lien d'inscription
- mode d'inscription
- ouverture des inscriptions
- fermeture des inscriptions
- description éventuelle

Toutes les lignes partageant un même TournamentId doivent posséder les mêmes valeurs pour ces propriétés.

---

# Program

## Définition

Un Program représente une partie du déroulement d'un Tournament.

Il permet de modéliser les différentes journées, disciplines ou organisations particulières d'une compétition.

Un Tournament possède un ou plusieurs Programs.

Exemples :

- Simple
- Double
- Mixte
- Journée du samedi
- Journée du dimanche

Le Program permet notamment de gérer les compétitions se déroulant sur plusieurs jours avec une organisation différente selon les disciplines.

---

## Responsabilités

Le Program porte les informations propres à son déroulement.

Par exemple :

- disciplines concernées ;
- ordre de déroulement ;
- remarques spécifiques.

---

# Site

## Définition

Le Site représente le lieu où se déroule un Program.

Un Program est organisé sur un seul Site.

Plusieurs Programs peuvent partager le même Site.

---

## Responsabilités

Le Site porte toutes les informations géographiques.

Par exemple :

- ville ;
- département ;
- région ;
- gymnase (optionnel) ;
- coordonnées GPS (évolution future).

Les dates du Program sont également portées par le Site.

Cette modélisation permet de gérer les compétitions réparties sur plusieurs lieux ou plusieurs journées.

---

# Relations

## Tournament → Program

Relation : 1..N

Un Tournament possède au moins un Program.

---

## Program → Site

Relation : 1..1

Chaque Program est organisé sur un Site unique.

---

# Principes métier

## Complémentarité avec BadNet

Le découpage des Tournament suit autant que possible celui utilisé par BadNet.

Lorsqu'une compétition est publiée comme deux tournois distincts sur BadNet (par exemple un TRJ Simple et un TRJ Double), BadPlanner utilise également deux Tournament distincts.

---

## Source de vérité

Le fichier Master constitue l'unique source de vérité.

Toutes les entités du modèle métier sont construites à partir des données du Master.

---

## Validation

Les contrôles de cohérence entre les différentes lignes d'un même Tournament sont réalisés exclusivement par le module d'administration.

La Web App ne réalise aucune validation métier lors de la consultation des données.

---

# Évolutions prévues

Le modèle permet d'intégrer ultérieurement :

- plusieurs sites pour une même compétition ;
- plusieurs gymnases sur une même ville ;
- affichage détaillé par site ;
- génération de cartes Google Maps par site ;
- calendrier intelligent ;
- nouveaux enrichissements métiers.

Ces évolutions ne remettent pas en cause les concepts fondamentaux du modèle.
