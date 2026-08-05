# Usage Metrics

# Objectif

Les Usage Metrics permettent de comprendre comment BadPlanner est réellement utilisé.

Elles ont pour objectif de :

- mesurer l'adoption de l'application ;
- identifier les fonctionnalités les plus utilisées ;
- détecter les points de friction ;
- orienter les évolutions futures.

Les métriques servent exclusivement à améliorer BadPlanner.

---

# Philosophie

La collecte repose sur quatre principes.

## Anonymat

Aucune donnée personnelle n'est enregistrée.

Aucun nom.

Aucune adresse e-mail.

Aucun compte utilisateur.

---

## Simplicité

Seules les informations utiles au pilotage du produit sont collectées.

Tout événement inutile est exclu.

---

## Transparence

Les métriques enregistrées sont connues et documentées.

Aucune collecte cachée n'est réalisée.

---

## Performance

La collecte ne doit jamais ralentir l'application.

Le tracking reste totalement transparent pour l'utilisateur.

---

# Architecture

Le système repose sur trois composants.

```text
Frontend
      │
      ▼
UsageMetricsService
      │
      ▼
Backend
      │
      ▼
Google Sheets (Logs)
      │
      ▼
Dashboard
```

Chaque événement suit ce circuit.

---

# Session

Une session correspond à une utilisation continue de BadPlanner.

Chaque session possède un identifiant unique.

Exemple :

```text
SessionId

6fd29b81
```

Cet identifiant permet de regrouper les événements d'une même utilisation.

---

# Version

Chaque événement contient la version de BadPlanner.

Exemple :

```text
1.0.0
```

Cette information permet de comparer les usages après une mise à jour.

---

# Structure d'un événement

Chaque ligne enregistrée dans l'onglet **Logs** contient :

| Champ | Description |
|--------|-------------|
| Timestamp | Date et heure |
| SessionId | Identifiant de session |
| Version | Version de l'application |
| EventType | Type d'événement |
| EventCategory | Catégorie concernée |
| EventValue | Valeur associée |

---

# Événements enregistrés

## Ouverture

```text
app_open
```

Déclenché à chaque ouverture de BadPlanner.

---

## Filtres

```text
filter_changed
```

Déclenché à chaque modification d'un filtre.

Exemple :

```text
Category

Cadet
```

---

## Réinitialisation

```text
filter_reset
```

Déclenché lorsque les filtres sont réinitialisés.

---

## Aucun résultat

```text
empty_result
```

Déclenché lorsqu'aucune compétition ne correspond aux filtres.

---

## Consultation d'une compétition

```text
tournament_opened
```

Déclenché lors de l'ouverture d'une carte.

La valeur enregistrée est le TournamentId.

---

## BadNet

```text
badnet_open
```

Déclenché lors de l'ouverture de BadNet.

---

## Google Maps

```text
maps_open
```

Déclenché lors de l'ouverture de Google Maps.

---

## Google Calendar

```text
calendar_export
```

Déclenché lors d'un export Google Calendar.

---

# Données enregistrées

Les métriques permettent notamment de connaître :

- le nombre de sessions ;
- le nombre d'événements ;
- les filtres les plus utilisés ;
- les valeurs de filtres les plus sélectionnées ;
- les compétitions les plus consultées ;
- le nombre d'ouvertures BadNet ;
- le nombre d'ouvertures Google Maps ;
- le nombre d'exports Google Calendar.

---

# Données volontairement exclues

BadPlanner ne collecte jamais :

- identité de l'utilisateur ;
- adresse IP ;
- géolocalisation ;
- navigateur ;
- système d'exploitation ;
- durée exacte de consultation ;
- données Google Calendar ;
- historique personnel.

La collecte reste strictement limitée au comportement dans l'application.

---

# Dashboard

Les métriques alimentent automatiquement le Dashboard Google Sheets.

Le Dashboard présente notamment :

- les indicateurs globaux ;
- les statistiques sur les filtres ;
- les actions réalisées ;
- les évolutions hebdomadaires.

Aucune saisie manuelle n'est nécessaire.

---

# Exploitation

Les Usage Metrics permettent notamment de répondre à des questions telles que :

- Quels filtres sont réellement utilisés ?
- Google Calendar est-il adopté ?
- Les parents ouvrent-ils BadNet ?
- Certaines recherches ne retournent-elles aucun résultat ?
- Les nouveautés attirent-elles l'attention ?

Les réponses orientent la roadmap du produit.

---

# Robustesse

Une erreur lors du tracking ne doit jamais empêcher l'utilisation de BadPlanner.

En cas d'échec :

- l'application continue de fonctionner ;
- l'événement est simplement perdu.

Le tracking est considéré comme non bloquant.

---

# Performance

Le tracking doit rester léger.

Les événements sont enregistrés de manière asynchrone lorsque cela est possible.

Le temps de réponse de l'interface ne doit pas être impacté.

---

# Documentation

Toute nouvelle métrique doit être documentée dans ce fichier.

Le Dashboard doit rester cohérent avec les événements réellement collectés.

---

# Hors périmètre

La version 1.0 ne comprend pas :

- Google Analytics ;
- Firebase Analytics ;
- suivi individuel ;
- profils utilisateurs ;
- heatmaps ;
- A/B testing ;
- statistiques temps réel.

Ces besoins pourront être étudiés dans les versions futures.

---

# Critères d'acceptation

Le système de métriques est considéré comme conforme lorsque :

- tous les événements sont correctement enregistrés ;
- les données sont anonymes ;
- le Dashboard est alimenté automatiquement ;
- aucune régression de performance n'est observée ;
- les métriques permettent de comprendre l'utilisation réelle de BadPlanner ;
- toute nouvelle métrique est documentée avant son intégration.
