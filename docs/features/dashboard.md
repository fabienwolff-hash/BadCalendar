# Dashboard

# Objectif

Le Dashboard permet de visualiser les Usage Metrics collectées par BadPlanner.

Il fournit une vue synthétique de l'utilisation de l'application afin d'orienter les décisions produit.

Le Dashboard est destiné exclusivement à l'administrateur.

---

# Philosophie

Le Dashboard répond à trois objectifs :

- mesurer l'adoption de BadPlanner ;
- identifier les fonctionnalités réellement utilisées ;
- détecter les points de friction.

Il ne cherche pas à produire des statistiques exhaustives mais des indicateurs simples et actionnables.

---

# Architecture

Le Dashboard repose sur deux onglets Google Sheets.

```text
Frontend
      │
      ▼
Backend
      │
      ▼
Logs
      │
(formules)
      ▼
Dashboard
```

Le Dashboard est entièrement alimenté par les données de l'onglet **Logs**.

Aucune saisie manuelle n'est nécessaire.

---

# Onglet Logs

Chaque ligne représente un événement utilisateur.

Structure :

| Colonne | Description |
|----------|-------------|
| Timestamp | Date et heure |
| SessionId | Identifiant de session |
| Version | Version de BadPlanner |
| EventType | Type d'événement |
| EventCategory | Catégorie concernée |
| EventValue | Valeur concernée |

Le Dashboard ne modifie jamais cet onglet.

Il constitue la source de vérité des métriques.

---

# Organisation du Dashboard

Le Dashboard est organisé en cinq sections.

```text
1. Vue générale

2. Utilisation des filtres

3. Actions utilisateur

4. Évolution

5. Diagnostic
```

---

# 1. Vue générale

Cette section mesure l'adoption globale.

Indicateurs :

- nombre de sessions ;
- nombre total d'événements ;
- nombre moyen d'événements par session ;
- version actuellement utilisée.

Ces indicateurs permettent de vérifier que l'application est réellement utilisée.

---

# 2. Utilisation des filtres

Cette section répond notamment aux questions suivantes :

- Quel filtre est le plus utilisé ?
- Quelles catégories sont les plus sélectionnées ?
- Les filtres multi-valeurs sont-ils utilisés ?
- Les utilisateurs réinitialisent-ils souvent les filtres ?

Les données proviennent des événements :

```text
filter_changed

filter_reset
```

---

# 3. Actions utilisateur

Cette section mesure les principales fonctionnalités.

Indicateurs :

- ouvertures BadNet ;
- ouvertures Google Maps ;
- exports Google Calendar ;
- compétitions consultées.

Elle permet de mesurer la valeur réelle de chaque fonctionnalité.

---

# 4. Évolution

Cette section suit l'activité dans le temps.

Exemples :

- événements par semaine ;
- sessions par semaine ;
- évolution après une nouvelle version.

Elle permet de mesurer l'adoption de BadPlanner.

---

# 5. Diagnostic

Cette section met en évidence les points de friction.

Exemples :

- recherches sans résultat ;
- filtres rarement utilisés ;
- fonctionnalités jamais utilisées.

Elle aide à identifier les améliorations prioritaires.

---

# Interprétation

Le Dashboard doit répondre à des questions concrètes.

Par exemple :

- Les parents utilisent-ils Google Calendar ?
- Les filtres sont-ils compris ?
- Les nouveautés sont-elles consultées ?
- Les utilisateurs ouvrent-ils BadNet ?
- Une version récente améliore-t-elle l'utilisation ?

Les décisions produit doivent s'appuyer sur ces observations.

---

# Mise à jour

Le Dashboard se met à jour automatiquement à partir de l'onglet Logs.

Aucune intervention manuelle n'est nécessaire.

---

# Visualisation

Les indicateurs sont présentés sous forme de cartes.

Exemple :

```text
Sessions

154
```

```text
Exports Calendar

83
```

Les tendances peuvent être représentées par des graphiques simples.

La lisibilité reste prioritaire.

---

# Qualité des données

Le Dashboard suppose que :

- toutes les métriques sont correctement enregistrées ;
- aucune ligne du journal n'est modifiée manuellement ;
- les événements respectent le contrat défini dans usage_metrics.md.

---

# Décisions produit

Le Dashboard ne sert pas uniquement à observer.

Il permet notamment de décider :

- quels filtres conserver ;
- quelles fonctionnalités améliorer ;
- quelles fonctionnalités supprimer ;
- quelles évolutions développer en priorité.

Il constitue un outil d'aide à la décision.

---

# Hors périmètre

La version 1.0 ne comprend pas :

- graphiques complexes ;
- statistiques temps réel ;
- segmentation des utilisateurs ;
- export PDF ;
- comparaison entre plusieurs installations.

Le Dashboard reste volontairement simple.

---

# Critères d'acceptation

Le Dashboard est considéré comme conforme lorsque :

- toutes les métriques sont calculées automatiquement ;
- aucune saisie manuelle n'est nécessaire ;
- les indicateurs reflètent fidèlement les données des Logs ;
- les principales fonctionnalités de BadPlanner sont mesurables ;
- les informations permettent de guider les décisions produit.
