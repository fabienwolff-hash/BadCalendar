# UX

# Objectif

L'expérience utilisateur de BadCalendar vise à permettre à un parent de trouver une compétition pertinente en quelques secondes, sans apprentissage préalable.

Chaque décision d'interface doit contribuer à cet objectif.

La simplicité est prioritaire sur la richesse fonctionnelle.

---

# Philosophie

BadCalendar applique les principes suivants :

- mobile-first ;
- une seule vue principale ;
- peu d'actions nécessaires ;
- informations progressives ;
- interface rassurante.

L'utilisateur ne doit jamais se sentir perdu.

---

# Principes de conception

## Simplicité

Chaque écran doit répondre à une seule question.

L'application ne doit jamais donner l'impression d'être un outil complexe.

---

## Rapidité

Les actions courantes doivent être réalisables en quelques interactions :

- trouver un tournoi ;
- vérifier les inscriptions ;
- ouvrir BadNet ;
- ajouter au calendrier.

---

## Progressivité

L'information est affichée progressivement.

La liste présente uniquement les informations essentielles.

Les détails apparaissent uniquement lorsque la carte est dépliée.

---

## Cohérence

Les mêmes éléments apparaissent toujours au même endroit.

Les icônes, couleurs et badges gardent la même signification dans toute l'application.

---

# Écran principal

L'application repose sur un écran unique.

Il comprend :

- le panneau de filtres ;
- la liste chronologique des compétitions.

Aucune navigation secondaire n'est nécessaire.

---

# Chargement

Au lancement :

- un indicateur de chargement est affiché ;
- l'utilisateur comprend que les données sont en cours de récupération.

Le chargement doit être aussi court que possible.

---

# Cartes

Les cartes constituent l'élément principal de l'interface.

Deux états existent :

## Repliée

Affiche uniquement les informations essentielles :

- nom ;
- date ;
- type ;
- état des inscriptions ;
- badge "Nouveau" si applicable.

---

## Dépliée

Affiche toutes les informations disponibles :

- lieu ;
- catégories ;
- portée ;
- mode d'inscription ;
- actions.

Le passage d'un état à l'autre doit être fluide.

---

# Filtres

Les filtres permettent de réduire progressivement la liste.

Ils doivent :

- être compréhensibles ;
- être rapides à manipuler ;
- fonctionner instantanément.

Les filtres les plus utilisés sont mémorisés.

---

# Boutons d'action

Les actions principales sont regroupées dans la carte dépliée.

Actions disponibles :

- BadNet ;
- Google Maps ;
- Google Calendar.

Chaque bouton possède une icône facilement identifiable.

---

# Gestion des nouveautés

Les nouveaux tournois sont signalés par un badge.

Le badge doit :

- attirer l'attention ;
- rester discret ;
- disparaître automatiquement après la durée définie.

Une modification d'un tournoi existant ne crée pas de badge.

---

# États

L'application doit toujours expliquer sa situation.

Exemples :

## Chargement

Une animation simple informe que les données sont en cours de récupération.

---

## Aucun résultat

Un message explicite est affiché.

Le bouton de réinitialisation reste visible.

---

## Erreur

Les messages d'erreur sont compréhensibles.

Ils évitent le vocabulaire technique.

---

# Responsive

L'interface est conçue en priorité pour les smartphones.

Sur desktop :

- les espacements sont adaptés ;
- la largeur des cartes augmente ;
- le comportement reste identique.

Aucune fonctionnalité n'est spécifique à une plateforme.

---

# Lisibilité

Les informations importantes doivent être immédiatement visibles.

Ordre de priorité :

1. Nom du tournoi
2. Date
3. État des inscriptions
4. Badge "Nouveau"
5. Type
6. Actions

Le regard doit naturellement suivre cette hiérarchie.

---

# Performance perçue

L'utilisateur ne doit jamais avoir l'impression que l'application attend.

Les interactions suivantes sont instantanées :

- ouverture d'une carte ;
- fermeture d'une carte ;
- modification des filtres ;
- changement de mois.

---

# Confirmation

Les actions ouvrant un service externe :

- BadNet ;
- Google Maps ;
- Google Calendar

ne demandent pas de confirmation.

Le clic déclenche immédiatement l'action.

---

# Accessibilité

L'interface doit rester compréhensible :

- pour un parent découvrant le badminton ;
- pour un utilisateur peu habitué aux applications web ;
- sur un petit écran.

Les acronymes peu connus peuvent être accompagnés d'une aide contextuelle.

---

# Ce que BadCalendar n'est pas

BadCalendar ne cherche pas à remplacer :

- BadNet ;
- Google Calendar ;
- Google Maps.

L'application agit comme un point d'entrée simple vers ces services.

---

# Principes de décision UX

Avant d'ajouter une nouvelle fonctionnalité, les questions suivantes doivent être posées :

- apporte-t-elle une valeur immédiate ?
- réduit-elle le nombre d'actions ?
- simplifie-t-elle la vie du parent ?
- peut-elle être comprise sans explication ?

Si la réponse est non, la fonctionnalité doit être repoussée.

---

# Hors périmètre

La version 1.0 ne comprend pas :

- animations complexes ;
- personnalisation avancée ;
- thèmes ;
- mode sombre ;
- tableaux de bord utilisateur ;
- gamification.

L'objectif reste une interface sobre et efficace.

---

# Critères d'acceptation

L'expérience utilisateur est considérée comme conforme lorsque :

- un parent retrouve rapidement une compétition ;
- les filtres sont simples à utiliser ;
- les cartes sont faciles à comprendre ;
- les actions principales sont accessibles en un clic ;
- les nouveaux tournois sont immédiatement identifiables ;
- l'application est fluide sur mobile comme sur desktop ;
- aucun apprentissage préalable n'est nécessaire.
