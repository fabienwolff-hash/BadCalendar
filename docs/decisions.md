# DECISIONS.md

# BadCalendar — Journal des décisions d'architecture

## Objectif

Ce document recense les décisions d'architecture et de conception prises au cours du développement de BadCalendar.

Contrairement à la documentation fonctionnelle, il répond à la question :

> **Pourquoi cette décision a-t-elle été prise ?**

Il constitue la mémoire technique du projet.

---

# DEC-001 — Le Master est la source unique de vérité

## Décision

Toutes les données métier proviennent exclusivement du Google Sheets **Master**.

Aucune donnée métier n'est stockée ailleurs.

## Motivation

Éviter les incohérences.

Le Master est la seule référence fonctionnelle.

## Conséquences

Le backend ne crée jamais de données persistantes.

Le frontend ne conserve aucun état métier.

---

# DEC-002 — Le frontend ne contient aucune logique métier

## Décision

Toutes les règles métier sont calculées dans EventService.

Le frontend ne fait que présenter les données.

## Motivation

Éviter les doublons.

Faciliter les évolutions.

Centraliser les règles métier.

## Exemple

Le frontend ne calcule jamais :

- eventStatus
- registrationStatus
- categoriesArray

Ils sont reçus directement du backend.

---

# DEC-003 — Les statuts sont calculés

## Décision

Les statuts ne sont jamais stockés dans le Master.

Ils sont calculés automatiquement.

## Motivation

Éviter les oublis de mise à jour.

Garantir leur cohérence.

---

# DEC-004 — Les dates inconnues sont représentées par null

## Décision

Une date absente est représentée par :

```
null
```

et jamais par :

```
9999
```

ou toute autre valeur sentinelle.

## Motivation

Le modèle devient plus naturel.

Le code est plus simple.

Les tests sont plus lisibles.

---

# DEC-005 — Les catégories sont stockées sous forme de chaîne

## Décision

Le Master conserve :

```
Benjamin;Minime;Cadet
```

Le backend transforme automatiquement cette valeur en :

```
categoriesArray
```

## Motivation

Le stockage reste simple.

Le frontend dispose directement d'un tableau.

---

# DEC-006 — Le frontend reçoit uniquement du JSON

## Décision

Le backend convertit les objets Date en chaînes ISO.

## Motivation

Éviter les problèmes de sérialisation Apps Script.

Garantir un format unique.

---

# DEC-007 — Les constantes sont centralisées

## Décision

Les constantes du frontend sont regroupées dans :

Constants.html

Les constantes backend sont regroupées dans :

Config.gs

## Motivation

Supprimer les chaînes en dur.

Faciliter les évolutions.

---

# DEC-008 — Une responsabilité par fichier

## Décision

Chaque fichier possède un rôle unique.

## Répartition

Code.gs

Entrée de la WebApp.

Config.gs

Configuration.

EventService.gs

Lecture et enrichissement des données.

Components.html

Construction du HTML.

Script.html

Logique applicative.

Utils.html

Fonctions utilitaires.

Constants.html

Constantes.

Style.html

Présentation.

## Motivation

Faciliter la maintenance.

---

# DEC-009 — Les événements sont triés dans le backend

## Décision

Le tri chronologique est effectué dans EventService.

Le frontend ne trie jamais.

## Motivation

Le backend maîtrise totalement les données.

---

# DEC-010 — Les listes métier possèdent un ordre métier

## Décision

Certaines listes ne doivent pas être triées alphabétiquement.

Exemple :

Catégories

```
Minibad
Poussin
Benjamin
Minime
Cadet
Junior
```

Portée

```
Départementale
Régionale
Inter-Régionale
Nationale
```

## Motivation

L'ordre métier est plus naturel.

---

# DEC-011 — Les boutons dépendent des statuts métier

## Décision

Le bouton principal dépend :

- eventUrl
- eventStatus
- registrationStatus

## Exemple

OPEN

→ S'inscrire

FINISHED

→ Voir les résultats

Autres cas

→ Consulter le tournoi

## Motivation

Le lien BadNet reste utile après la fermeture des inscriptions.

---

# DEC-012 — Les informations d'inscription sont calculées

## Décision

Le texte affiché dans la carte est construit à partir de :

registrationStatus

registrationOpenDate

registrationCloseDate

## Motivation

Éviter la duplication.

---

# DEC-013 — Les filtres sont purement visuels

## Décision

Les filtres n'ont aucun impact sur les données.

Ils filtrent uniquement les événements déjà chargés.

## Motivation

Performance.

Simplicité.

---

# DEC-014 — Aucune dépendance externe

## Décision

Le projet utilise uniquement :

- Apps Script
- HTML
- CSS
- JavaScript

## Motivation

Limiter la maintenance.

Faciliter le déploiement.

---

# DEC-015 — Les évolutions sont incrémentales

## Décision

Chaque version est découpée en sous-issues.

Chaque sous-issue :

- est indépendante ;
- est testable ;
- est validée avant la suivante.

## Motivation

Limiter les régressions.

---

# DEC-016 — Documentation systématique

## Décision

Chaque version met à jour :

- Vision
- Roadmap
- Release Notes
- Data Model

## Motivation

Toujours conserver une documentation synchronisée avec le code.

---

# DEC-017 — Les logs sont conservés jusqu'à la V1.0

## Décision

Les appels :

```
console.log()
console.table()
```

sont volontairement conservés.

## Motivation

Faciliter les validations pendant le développement.

Ils seront supprimés lors de la stabilisation V1.0.

---

# DEC-018 — Les optimisations sont différées

## Décision

Ne pas optimiser prématurément.

Les refactorings ne sont réalisés que lorsqu'ils améliorent réellement :

- la lisibilité ;
- la maintenance ;
- l'évolutivité.

## Motivation

Privilégier un code simple.

---

# DEC-019 — La documentation fait partie du produit

## Décision

La documentation est considérée comme une fonctionnalité du projet.

Une version n'est jamais terminée tant que la documentation n'est pas à jour.

## Motivation

Garantir la pérennité du projet.

---

# DEC-020 — L'UX prime désormais sur les nouvelles fonctionnalités

## Décision

À partir de la V0.9, les évolutions concernent principalement :

- l'expérience utilisateur ;
- l'ergonomie ;
- le confort d'utilisation.

L'architecture métier est considérée comme stable.

## Motivation

Préparer une V1.0 mature et agréable à utiliser.

---

# Historique

| Décision | Version |
|----------|---------|
| DEC-001 à DEC-009 | V0.6 - V0.7 |
| DEC-010 à DEC-020 | V0.8 |

---

# Règle d'évolution

Toute nouvelle décision d'architecture doit être ajoutée dans ce document.

Une décision ne doit jamais être supprimée.

Si elle devient obsolète, elle est marquée comme :

**Remplacée par DEC-XXX**

afin de conserver l'historique des choix techniques du projet.