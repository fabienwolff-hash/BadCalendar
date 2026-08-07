# BC-16.5 - Analytics Quality & Insights

## Contexte

BC-16.4 a permis la mise en place d'un premier dashboard produit basé sur des agrégations hebdomadaires.

Cependant, une interrogation est apparue :

> Une métrique doit-elle être affichée dans le dashboard simplement parce qu'elle est collectée ?

Pour répondre à cette question, chaque KPI a été analysé selon la grille suivante :

1. Quelle question produit cherche-t-il à répondre ?
2. Quels scénarios sont possibles ?
3. Quelles actions concrètes peuvent être prises ?
4. Quelle est sa valeur pour le pilotage du produit ?

L'objectif est de distinguer :

- Les KPI de pilotage produit.
- Les KPI de contexte.
- Les KPI techniques.
- Les métriques collectées mais peu exploitables.

---

# Synthèse

| KPI | Valeur | Dashboard | Analyse | Commentaire |
|------|------|------|------|------|
| Visiteurs récurrents | Très forte | ✅ | ✅ | Indicateur de fidélisation principal |
| Sessions / Utilisateur | Très forte | ✅ | ✅ | Mesure l'habitude d'utilisation |
| CardExpand / Session | Très forte | ✅ | ✅ | KPI le plus proche de la proposition de valeur |
| Calendar Export | Forte | ✅ | ✅ | Mesure la planification de saison |
| Filter Type | Forte | ✅ | ✅ | Peut justifier une persistance du filtre |
| OS | Forte | ⚠️ Contexte | ✅ | Influence les choix fonctionnels |
| Nouveaux visiteurs | Moyenne à forte | ✅ | ✅ | Important surtout durant la phase de croissance |
| Filter New | Moyenne | ✅ | ✅ | Fortement dépendant de la saisonnalité |
| BadNet Open | Moyenne | ⚠️ À réévaluer | ✅ | Peu de décisions produit associées |
| Device Type | Moyenne | ⚠️ Contexte | ✅ | Oriente les choix UX |
| Maps Open | Faible à moyenne | ❌ | ✅ | Peu de décisions produit exploitables |
| Filter Scope | Faible | ❌ | ✅ | Filtre persistant, difficilement interprétable |
| App Load Duration | Technique | ✅ | ✅ | Santé applicative |
| App Load Failed | Technique | ✅ | ✅ | Santé applicative |
| Success Rate | Technique | ✅ | ✅ | Santé applicative |
| Browser | Technique | ❌ | ✅ | Aide au diagnostic et aux tests |

---

# Analyse détaillée

## Visiteurs récurrents

### Question produit

Les utilisateurs reviennent-ils ?

### Actions possibles

- Identifier les facteurs de fidélisation.
- Investir dans les fonctionnalités utilisées par les utilisateurs fidèles.
- Orienter les futures évolutions produit.

### Verdict

**Très forte valeur.**

---

## Sessions / Utilisateur

### Question produit

Les utilisateurs utilisent-ils régulièrement BadPlanner ?

### Actions possibles

- Mettre davantage en avant les nouveautés.
- Réfléchir à des mécanismes de fidélisation.
- Évaluer la fréquence réelle de consultation.

### Verdict

**Très forte valeur.**

---

## CardExpand / Session

### Question produit

Les utilisateurs explorent-ils réellement les tournois proposés ?

### Actions possibles

- Améliorer les cartes tournoi.
- Revoir les informations affichées.
- Revoir les mécanismes de découverte.

### Remarque

Un taux trop faible comme trop élevé peut révéler un problème.

### Verdict

**Très forte valeur.**

---

## Calendar Export

### Question produit

Les utilisateurs planifient-ils leur saison ?

### Actions possibles

- Export ICS.
- Intégration Apple Calendar.
- Favoris.
- Agenda personnel.

### Attention

Métrique fortement saisonnière.

### Remarque

Le faible usage peut être expliqué par la prédominance d'utilisateurs iOS et l'absence d'un export adapté.

Une analyse croisée avec l'OS et éventuellement une enquête utilisateur est recommandée.

### Verdict

**Forte valeur.**

---

## Filter Type

### Question produit

Les utilisateurs ont-ils besoin d'affiner leurs recherches ?

### Actions possibles

- Persister le filtre.
- Pré-remplir le dernier choix.
- Revoir les résultats affichés par défaut.

### Remarque

Contrairement à Filter Scope, ce filtre n'est pas persistant.

Une utilisation importante peut indiquer que les utilisateurs ressaisissent systématiquement le même critère à chaque session.

### Verdict

**Forte valeur.**

---

## OS

### Question produit

L'écosystème utilisateur influence-t-il les choix fonctionnels ?

### Actions possibles

- Priorisation Android.
- Priorisation iOS.
- Support Apple Calendar.
- Export ICS.
- Stratégie de tests.

### Verdict

**Forte valeur analytique.**

À afficher plutôt dans une section "Contexte d'utilisation" que dans les KPI principaux.

---

## Nouveaux visiteurs

### Question produit

BadPlanner continue-t-il à recruter ?

### Actions possibles

- Communication.
- Promotion au sein des clubs.
- Acquisition utilisateur.

### Limite

Sa valeur diminue lorsque le produit atteint sa maturité.

### Verdict

**Valeur moyenne à forte.**

---

## Filter New

### Question produit

Les utilisateurs cherchent-ils les nouveaux tournois ?

### Actions possibles

- Mise en avant des nouveautés.
- Notifications.
- Vue dédiée.

### Limites

- Saisonnalité importante.
- Compréhension potentiellement ambiguë du terme "Nouveaux".

### Verdict

**Valeur moyenne.**

---

## BadNet Open

### Question produit

Les utilisateurs utilisent-ils le lien vers BadNet ?

### Actions possibles

- Revoir la visibilité du bouton.
- Revoir son libellé.

### Limite

Peu de décisions produit stratégiques découlent directement de cette métrique.

### Verdict

**Valeur moyenne.**

---

## Device Type

### Question produit

BadPlanner est-il principalement utilisé sur mobile ou desktop ?

### Actions possibles

- Prioriser les développements mobile-first.
- Adapter les choix UX.

### Remarque

Tablet doit continuer d'être collecté mais peut être regroupé avec Mobile dans les analyses.

### Verdict

**Valeur moyenne.**

À afficher dans une section "Contexte d'utilisation".

---

## Maps Open

### Question produit

Les utilisateurs utilisent-ils la navigation ?

### Actions possibles

Très limitées.

### Limite

Difficile d'associer une décision produit claire à cette métrique.

### Verdict

**Faible à moyenne valeur.**

---

## Filter Scope (Niveau de compétition)

### Question produit

Difficile à définir.

### Problème principal

Le filtre est persistant.

Ainsi :

- Peu de changements peuvent signifier que le filtre est inutile.
- Peu de changements peuvent également signifier qu'il est parfaitement configuré.

La métrique est donc difficilement interprétable.

### Verdict

**Faible valeur.**

Conserver éventuellement en collecte mais retirer du dashboard.

---

# KPI techniques

## App Load Duration

### Question

L'application est-elle suffisamment rapide ?

### Actions

- Optimisation.
- Analyse de performance.

### Verdict

Conservation obligatoire.

---

## App Load Failed

### Question

Existe-t-il des erreurs bloquantes ?

### Actions

- Diagnostic.
- Correction.

### Amélioration identifiée

Créer un historique persistant des erreurs :

- Timestamp
- Version
- VisitorId
- SessionId
- ErrorType
- ErrorMessage
- StackTrace

afin de ne pas dépendre uniquement des logs Apps Script.

### Verdict

Conservation obligatoire.

---

## Success Rate

### Question

L'application est-elle fiable ?

### Actions

- Surveillance.
- Correction.

### Verdict

Conservation obligatoire.

---

## Browser

### Question

Sur quels navigateurs concentrer les efforts de test ?

### Actions

- Priorisation QA.
- Compatibilité.

### Verdict

Conserver pour l'analyse technique uniquement.

---

# Conséquences sur l'architecture Analytics

L'analyse a montré qu'il convient de distinguer :

## Analytics_Data

Vision analytique complète du produit.

Contient toutes les données agrégées utiles à l'analyse.

## Dashboard_Data

Vision orientée affichage.

Contient uniquement les KPI réellement présents dans le dashboard.

## Dashboard

Restitution visuelle.

---

Architecture cible :

Logs
↓
Analytics_Data
↓
Dashboard_Data
↓
Dashboard

avec éventuellement :

Analytics_Reference

pour les tables techniques (VisitorId → FirstWeek, etc.).

Cette séparation permettra de conserver des données analytiques riches tout en évitant de surcharger le dashboard avec des métriques de faible valeur.