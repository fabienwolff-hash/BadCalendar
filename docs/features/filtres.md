# Filters

# Objectif

Le système de filtres permet à un parent de retrouver rapidement les compétitions correspondant à son enfant.

Les filtres doivent rester simples, rapides à utiliser et ne jamais donner l'impression d'être un moteur de recherche complexe.

La philosophie de BadPlanner est de réduire progressivement la liste des compétitions jusqu'à afficher uniquement celles pertinentes.

---

# Principes UX

Le système de filtres respecte les principes suivants :

- simplicité avant exhaustivité ;
- manipulation rapide sur mobile ;
- filtres combinables ;
- mémorisation des préférences permanentes ;
- possibilité de revenir facilement à l'état initial.

Les filtres ne doivent jamais masquer leur fonctionnement.

---

# Organisation

Les filtres sont regroupés dans un panneau repliable situé au-dessus de la liste des compétitions.

Lorsque le panneau est replié :

- seuls les filtres actifs sont visibles sous forme de chips ;
- le nombre de filtres actifs est affiché.

Lorsque le panneau est déplié :

- tous les filtres sont accessibles.

---

# Liste des filtres

## Catégorie

Type :

Multi-sélection.

Exemples :

- Poussin
- Benjamin
- Minime
- Cadet
- Junior

La catégorie correspond à l'âge du joueur.

Ce filtre est mémorisé localement.

---

## Type

Type :

Multi-sélection.

Exemples :

- TDJ
- TRJ
- Départemental
- Régional
- National
- Stage
- Plateau

Le filtre est optimisé pour gérer un grand nombre de valeurs.

L'utilisateur peut rechercher une valeur directement par saisie textuelle.

---

## Portée

Type :

Multi-sélection.

Exemples :

- Départementale
- Régionale
- Nationale

Par défaut, la valeur **Nationale** n'est pas sélectionnée.

Cette préférence est mémorisée localement.

---

## Mois

Type :

Sélection simple.

Permet de limiter l'affichage aux compétitions d'un mois donné.

Par défaut :

Tous les mois.

---

## État des inscriptions

Type :

Multi-sélection.

Valeurs :

- Ouvertes
- Ouvrent bientôt
- Fermées

---

# Multi-sélection

Les filtres Catégorie, Type, Portée et État des inscriptions acceptent plusieurs valeurs simultanément.

Exemple :

```text
Catégorie

✓ Minime
✓ Cadet
```

Le résultat contient les compétitions correspondant à l'une ou l'autre de ces catégories.

La logique appliquée est un **OU** à l'intérieur d'un même filtre.

---

# Combinaison des filtres

Les différents filtres sont combinés entre eux selon une logique **ET**.

Exemple :

```text
Catégorie = Cadet

ET

Type = TDJ

ET

Mois = Novembre
```

Une compétition doit satisfaire tous les filtres actifs pour être affichée.

---

# Recherche textuelle

Lorsque le nombre de valeurs devient important (par exemple pour le Type), une zone de recherche permet de filtrer instantanément les valeurs disponibles.

Cette recherche agit uniquement dans la liste des valeurs du filtre.

Elle ne constitue pas une recherche globale sur les compétitions.

---

# Persistance

Certains filtres représentent des préférences permanentes.

Ils sont automatiquement mémorisés localement.

Filtres persistés :

- Catégorie
- Portée

Les autres filtres sont réinitialisés lors d'une nouvelle session.

---

# Réinitialisation

Un bouton **Réinitialiser les filtres** permet de revenir rapidement à l'état initial.

L'état initial correspond à :

- Catégorie : dernière valeur mémorisée ;
- Portée : dernière valeur mémorisée ;
- Mois : Tous ;
- Type : aucun filtre ;
- État des inscriptions : tous les états.

---

# Affichage des filtres actifs

Lorsque le panneau est replié, chaque filtre actif apparaît sous forme de chip.

Exemple :

```text
Cadet

TRJ

Novembre
```

Les chips permettent de comprendre immédiatement quels filtres sont appliqués.

---

# Absence de résultat

Lorsque aucun tournoi ne correspond aux filtres sélectionnés :

- un message explicite est affiché ;
- le bouton de réinitialisation reste visible.

Le message doit rassurer l'utilisateur.

Exemple :

> Aucune compétition ne correspond aux filtres sélectionnés.

---

# Performance

Le filtrage est réalisé entièrement côté frontend.

L'application doit mettre à jour la liste instantanément après chaque modification.

Aucun appel supplémentaire au backend n'est nécessaire.

---

# Usage Metrics

Les événements suivants sont enregistrés :

- `filter_changed`
- `filter_reset`
- `empty_result`

Chaque modification de filtre génère un événement indépendant.

Les métriques permettent d'analyser :

- les filtres les plus utilisés ;
- les valeurs les plus sélectionnées ;
- les recherches sans résultat ;
- l'utilisation du bouton de réinitialisation.

---

# Cas particuliers

## Aucune catégorie sélectionnée

Toutes les catégories sont affichées.

---

## Aucune portée sélectionnée

Toutes les portées sont affichées.

---

## Toutes les valeurs sélectionnées

Le filtre est considéré comme inactif.

---

## Une seule valeur disponible

La valeur est affichée normalement.

Aucun comportement spécifique n'est prévu.

---
Récapitulatif 

| Filtre                | Multi | Persisté | Valeur par défaut          |
| --------------------- | :---: | :------: | -------------------------- |
| Catégorie             |   ✅   |     ✅    | Dernière valeur            |
| Type                  |   ✅   |     ❌    | Toutes                     |
| Portée                |   ✅   |     ✅    | Départementale + Régionale |
| Mois                  |   ❌   |     ❌    | Tous                       |
| État des inscriptions |   ✅   |     ❌    | Tous                       |

---

# Hors périmètre

La version 1.0 ne comprend pas :

- recherche plein texte sur les compétitions ;
- filtres enregistrés par compte utilisateur ;
- filtres favoris ;
- opérateurs complexes (ET / OU personnalisés) ;
- filtres dépendants.

---

# Critères d'acceptation

Le système de filtres est considéré comme conforme lorsque :

- les filtres sont simples à comprendre ;
- les filtres multi-valeurs fonctionnent correctement ;
- les préférences sont mémorisées ;
- le filtrage est instantané ;
- les filtres actifs restent visibles lorsque le panneau est replié ;
- le bouton de réinitialisation fonctionne ;
- les métriques d'utilisation sont correctement enregistrées ;
- le comportement est identique sur mobile et desktop.
