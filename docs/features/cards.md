# Cards

# Objectif

Les cartes représentent les compétitions affichées dans BadPlanner.

Elles permettent à un parent d'obtenir rapidement les informations essentielles d'un tournoi et d'accéder aux principales actions sans quitter l'application.

Les cartes constituent l'élément principal de l'interface utilisateur.

---

# Philosophie

Les cartes doivent respecter quatre principes :

- lisibilité ;
- simplicité ;
- progressivité ;
- rapidité.

L'utilisateur doit comprendre une carte en quelques secondes.

---

# États

Une carte possède deux états :

- repliée ;
- dépliée.

Aucun autre état intermédiaire n'est prévu.

---

# Carte repliée

La carte repliée présente uniquement les informations indispensables à la décision.

Elle permet de parcourir rapidement une longue liste de compétitions.

Les informations affichées sont :

- nom du tournoi ;
- date ;
- type de compétition ;
- état des inscriptions ;
- badge "Nouveau" (si applicable).

Le lieu, les catégories et les actions restent masqués.

---

# Carte dépliée

Le dépliage révèle l'ensemble des informations utiles.

Les informations supplémentaires sont :

- lieu complet ;
- catégories concernées ;
- portée ;
- mode d'inscription ;
- dates d'inscription (si disponibles) ;
- organisateur (si disponible).

Les boutons d'action deviennent également visibles.

---

# Ordre des informations

L'ordre d'affichage est volontairement constant.

1. Badge "Nouveau"
2. Nom du tournoi
3. Date
4. Type
5. État des inscriptions
6. Lieu
7. Catégories
8. Portée
9. Informations complémentaires
10. Boutons d'action

Cette hiérarchie met en avant les informations utiles à la prise de décision.

---

# Badge "Nouveau"

Le badge est affiché lorsque :

```text
isNew = true
```

Le badge est visible :

- sur la carte repliée ;
- sur la carte dépliée.

Il disparaît automatiquement lorsque le backend indique :

```text
isNew = false
```

---

# État des inscriptions

Chaque carte affiche un indicateur clair.

Valeurs possibles :

- Ouvertes
- Ouvrent bientôt
- Fermées

L'état doit être identifiable immédiatement.

---

# Boutons d'action

Les boutons sont visibles uniquement lorsque la carte est dépliée.

Actions disponibles :

## BadNet

Ouvre la fiche officielle du tournoi.

---

## Google Maps

Ouvre le lieu de la compétition dans Google Maps.

---

## Google Calendar

Ajoute la compétition au calendrier personnel.

---

# Interaction

## Déplier

Un clic (ou un appui) sur la carte la déplie.

---

## Replier

Un second clic replie la carte.

---

## Boutons

Le clic sur un bouton n'affecte pas l'état de la carte.

---

# Comportement

Le dépliage doit être instantané.

Aucun appel au backend n'est réalisé.

Toutes les informations sont déjà disponibles côté frontend.

---

# Données manquantes

Certaines informations peuvent être absentes.

Dans ce cas :

- aucun texte "Non renseigné" n'est affiché ;
- la ligne concernée est simplement masquée.

La carte ne doit jamais paraître incomplète.

---

# Responsive

## Mobile

La carte occupe presque toute la largeur de l'écran.

Les boutons sont suffisamment espacés pour être facilement utilisables au doigt.

---

## Desktop

La largeur augmente naturellement.

Le comportement reste identique.

---

# Performance

Le dépliage ne doit provoquer :

- aucun rechargement ;
- aucune animation complexe ;
- aucun recalcul métier.

Le changement d'état est purement visuel.

---

# Usage Metrics

Les événements suivants sont enregistrés.

## Ouverture

```text
tournament_opened
```

Déclenché lors du premier dépliage.

L'EventValue contient le TournamentId.

---

## BadNet

```text
badnet_open
```

---

## Google Maps

```text
maps_open
```

---

## Google Calendar

```text
calendar_export
```

---

# Accessibilité

Les cartes doivent être utilisables :

- sur smartphone ;
- avec une seule main ;
- sans connaissance préalable du badminton.

Les boutons disposent d'un libellé ou d'un tooltip explicite.

---

# Principes UX

Une carte ne doit jamais :

- afficher trop d'informations ;
- nécessiter plusieurs clics pour accéder à une action ;
- changer de page ;
- surprendre l'utilisateur.

Chaque action doit être prévisible.

---

# Hors périmètre

La version 1.0 ne comprend pas :

- favoris ;
- partage ;
- commentaires ;
- édition d'un tournoi ;
- affichage des résultats ;
- convocations ;
- notifications.

Ces fonctionnalités pourront être étudiées dans des versions ultérieures.

---

# Critères d'acceptation

Les cartes sont considérées comme conformes lorsque :

- la lecture de la liste est rapide ;
- les informations essentielles sont visibles sans déplier la carte ;
- les informations détaillées apparaissent après dépliage ;
- les actions BadNet, Google Maps et Google Calendar sont accessibles ;
- les badges sont correctement affichés ;
- les métriques d'utilisation sont enregistrées ;
- le comportement est identique sur mobile et desktop.
