# Version v0.12 — Refonte du modèle métier

## Objectif de la version

La version **v0.12** constitue une évolution majeure de l'architecture interne de BadCalendar.

Son objectif est de remplacer le modèle historique centré sur `Event` par un modèle métier plus fidèle au fonctionnement réel des compétitions de badminton.

Cette évolution prépare les futures versions du produit sans modifier l'expérience utilisateur.

La v0.12 est avant tout une **version d'architecture**.

---

# Pourquoi cette version ?

Le modèle actuel présente plusieurs limites :

- duplication d'informations communes ;
- difficulté à représenter des compétitions multi-sites ;
- difficulté à gérer plusieurs programmes au sein d'un même tournoi ;
- logique métier fortement couplée au modèle Event.

La v0.12 introduit un modèle plus cohérent :

```
Tournament
    │
    ├── Program
    │      └── Site
    │
    └── Registration
```

Ce modèle devient la nouvelle référence du projet.

---

# Objectifs

Les objectifs de cette version sont :

- introduire le modèle Tournament ;
- centraliser la construction du modèle dans TournamentService ;
- adapter ValidationService ;
- migrer le frontend vers le nouveau contrat de données ;
- supprimer l'ancien modèle Event.

Aucune évolution fonctionnelle visible n'est prévue.

---

# Sous-issues

| Id | Sous-issue | Statut |
|----|------------|--------|
| BC-12.1 | Nouveau modèle métier | ☐ |
| BC-12.2 | Implémentation de TournamentService | ☐ |
| BC-12.3 | Refonte de ValidationService | ☐ |
| BC-12.4 | Migration du frontend | ☐ |
| BC-12.5 | Finalisation et stabilisation | ☐ |

---

# Ordre de réalisation

Les sous-issues doivent être réalisées dans l'ordre suivant :

```
BC-12.1
      ↓
BC-12.2
      ↓
BC-12.3
      ↓
BC-12.4
      ↓
BC-12.5
```

Chaque étape dépend de la précédente.

---

# Documents de référence

Avant de commencer une sous-issue, consulter les documents suivants :

## Produit

- vision.md
- product_principles.md
- philosophy.md

## Métier

- domain_model.md
- data_model.md
- business_rules.md
- glossary.md

## Architecture

- architecture.md
- coding_guidelines.md
- tests.md

## Gestion du projet

- roadmap.md
- decisions.md
- release_checklist.md
- release_note.md

---

# Méthode de développement

Chaque sous-issue suit le processus suivant :

1. Lire le document de la sous-issue.
2. Identifier les impacts.
3. Implémenter la fonctionnalité.
4. Ajouter ou adapter les tests.
5. Vérifier les critères d'acceptation.
6. Mettre à jour la documentation.
7. Valider la Release Checklist.
8. Clôturer la sous-issue.

Une seule sous-issue est développée à la fois.

---

# Principes de la version

La v0.12 respecte les principes suivants :

- KISS ;
- Single Source of Truth ;
- Backend responsable de la logique métier ;
- Frontend responsable uniquement de l'affichage ;
- Documentation synchronisée avec le code.

Aucun pattern d'architecture complexe ne doit être introduit sans justification.

---

# Hors périmètre

La v0.12 ne comprend pas :

- évolution graphique ;
- nouvelles fonctionnalités utilisateur ;
- nouveaux filtres ;
- analytics ;
- amélioration UX ;
- optimisation des performances.

Ces évolutions seront traitées dans les versions suivantes.

---

# Critères de sortie de la version

La version est considérée terminée lorsque :

- les cinq sous-issues sont clôturées ;
- le modèle Event n'est plus utilisé ;
- TournamentService est la référence métier ;
- ValidationService est compatible avec le nouveau modèle ;
- le frontend consomme Tournament ;
- tous les tests sont passants ;
- la documentation est synchronisée ;
- la Release Checklist est validée.

---

# Livrable attendu

À l'issue de la v0.12, BadCalendar dispose :

- d'un modèle métier stable ;
- d'une architecture simplifiée ;
- d'un backend plus facilement évolutif ;
- d'un frontend découplé de la logique métier.

La v0.12 constitue le socle technique des futures versions du produit.
