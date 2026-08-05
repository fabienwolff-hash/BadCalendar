# Navigation

# Objectif

La navigation de BadPlanner permet à un parent de consulter rapidement les compétitions correspondant à son enfant.

Elle repose sur une interface unique, sans changement de page ni navigation complexe.

L'objectif est de minimiser le nombre d'actions nécessaires pour trouver une compétition.

---

# Philosophie

BadPlanner privilégie une navigation :

- simple ;
- linéaire ;
- mobile-first ;
- sans apprentissage.

L'utilisateur ne doit jamais se demander où cliquer ensuite.

---

# Parcours utilisateur

Le parcours standard est le suivant :

```text
Ouverture de l'application
        ↓
Chargement des compétitions
        ↓
Application des filtres persistés
        ↓
Consultation de la liste
        ↓
Modification éventuelle des filtres
        ↓
Ouverture d'une carte
        ↓
Choix d'une action
```

Toutes les fonctionnalités sont accessibles depuis cet écran unique.

---

# Chargement initial

Au lancement de l'application :

- les compétitions sont récupérées ;
- les filtres persistés sont restaurés ;
- les compétitions passées sont masquées ;
- la liste est affichée.

L'utilisateur arrive directement sur les compétitions à venir.

---

# Écran principal

L'écran principal comprend :

- le panneau de filtres ;
- la liste chronologique des compétitions.

Aucun menu supplémentaire n'est nécessaire.

---

# Liste chronologique

Les compétitions sont affichées par ordre chronologique.

Elles sont regroupées par mois.

Exemple :

```text
Novembre

TDJ 2 Rennes

TRJ Bretagne

Décembre

Stage Départemental

TDJ 3 Dinan
```

Cette organisation facilite la planification de la saison.

---

# Filtres

Le panneau de filtres est placé au-dessus de la liste.

Par défaut :

- les filtres peuvent être repliés ;
- les filtres actifs restent visibles sous forme de chips.

Toute modification met à jour immédiatement la liste.

---

# Consultation d'une compétition

Chaque compétition est représentée par une carte.

Deux états sont possibles :

- repliée ;
- dépliée.

Une seule interaction est nécessaire pour accéder aux informations détaillées.

---

# Carte repliée

La carte repliée présente uniquement les informations essentielles.

L'objectif est de permettre une lecture rapide de la liste.

Les informations détaillées restent masquées.

---

# Carte dépliée

Le dépliage permet d'accéder :

- aux informations complètes ;
- aux liens utiles ;
- aux actions disponibles.

Le dépliage ne provoque jamais de changement de page.

---

# Actions disponibles

Depuis une carte dépliée, le parent peut :

- ouvrir BadNet ;
- ouvrir Google Maps ;
- ajouter la compétition à Google Calendar.

Ces actions ouvrent les services correspondants dans un nouvel onglet ou l'application associée.

---

# Nouveautés

Les nouveaux tournois sont signalés par un badge dédié.

Le badge est visible directement dans la liste afin d'attirer l'attention sans nécessiter l'ouverture de la carte.

---

# États d'inscription

L'état des inscriptions est visible directement sur la carte.

Un indicateur visuel distingue :

- inscriptions ouvertes ;
- ouverture prochaine ;
- inscriptions fermées.

Cette information est immédiatement identifiable.

---

# Absence de résultat

Lorsque les filtres ne retournent aucune compétition :

- un message explicite est affiché ;
- le bouton de réinitialisation des filtres reste accessible.

L'utilisateur est invité à élargir sa recherche.

---

# Responsive

La navigation est conçue en priorité pour les smartphones.

Sur desktop :

- la présentation s'adapte à la largeur disponible ;
- le comportement reste identique.

Aucune fonctionnalité n'est réservée à une plateforme.

---

# Performance

Toutes les interactions doivent être instantanées.

Notamment :

- ouverture d'une carte ;
- fermeture d'une carte ;
- modification des filtres ;
- réinitialisation des filtres.

Aucun rechargement complet de la page n'est effectué.

---

# Usage Metrics

Les événements suivants sont enregistrés :

- `app_open`
- `filter_changed`
- `filter_reset`
- `empty_result`
- `tournament_opened`
- `badnet_open`
- `maps_open`
- `calendar_export`

La navigation permet ainsi d'analyser le comportement réel des utilisateurs.

---

# Accessibilité

La navigation doit rester utilisable :

- avec une seule main sur mobile ;
- sans connaître le badminton ;
- sans lire de documentation préalable.

Les libellés doivent être explicites.

Les acronymes peu connus doivent pouvoir être expliqués via une infobulle ou une aide contextuelle.

---

# Hors périmètre

La version 1.0 ne comprend pas :

- navigation multi-pages ;
- système d'onglets ;
- menu latéral ;
- historique de navigation ;
- moteur de recherche global.

La navigation repose exclusivement sur la liste chronologique et les filtres.

---

# Critères d'acceptation

La navigation est considérée comme conforme lorsque :

- un utilisateur retrouve une compétition en quelques interactions ;
- aucun changement de page n'est nécessaire ;
- les filtres sont immédiatement accessibles ;
- les cartes se déplient et se replient instantanément ;
- les actions BadNet, Google Maps et Google Calendar sont accessibles depuis la carte dépliée ;
- la navigation est fluide sur mobile comme sur desktop ;
- les Usage Metrics reflètent fidèlement les interactions utilisateur.
