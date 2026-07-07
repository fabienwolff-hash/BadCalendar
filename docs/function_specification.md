# Functional Specification

## Projet

**Nom :** BadCalendar

**Version cible :** v1.0 (Document vivant)

---

# 1. Objet

BadCalendar est une application Web permettant de consulter le calendrier des compétitions jeunes de badminton.

L'application est alimentée automatiquement depuis un fichier Google Sheets unique et permet aux utilisateurs de rechercher rapidement les compétitions correspondant à leurs critères.

L'objectif est de proposer une consultation simple, rapide et adaptée aussi bien sur ordinateur que sur mobile.

---

# 2. Périmètre fonctionnel

L'application permet de :

- consulter les compétitions ;
- rechercher un événement ;
- filtrer les événements ;
- consulter les informations principales d'un tournoi ;
- accéder au site d'inscription ou aux résultats.

L'application est uniquement en consultation.

Aucune modification des données n'est possible depuis la WebApp.

---

# 3. Acteurs

## Utilisateur

L'utilisateur consulte le calendrier.

Il peut :

- rechercher un événement ;
- filtrer les événements ;
- consulter une fiche événement ;
- ouvrir le lien associé.

---

## Administrateur

L'administrateur maintient le fichier Master.

Il ajoute :

- les nouveaux événements ;
- les dates ;
- les liens ;
- les catégories.

Il n'intervient jamais directement sur la WebApp.

---

# 4. Source des données

Toutes les données proviennent de :

```
Google Sheets
    └── Master
```

Le backend lit ce fichier puis enrichit les données avant de les envoyer au navigateur.

---

# 5. Consultation des événements

Au chargement :

1. lecture du Master ;
2. enrichissement des données ;
3. tri chronologique ;
4. affichage.

Les événements sont regroupés par mois.

Exemple :

```
Septembre 2026

    TDJ Rennes

    Stage Départemental

Octobre 2026

    TRJ Brest
```

---

# 6. Informations affichées

Chaque carte affiche :

- type ;
- date ;
- titre ;
- ville ;
- catégories ;
- mode d'inscription ;
- état des inscriptions (si connu) ;
- bouton d'action (si URL disponible).

---

# 7. Recherche

Une zone de recherche permet de filtrer les événements.

La recherche porte sur :

- le titre ;
- la ville ;
- les catégories ;
- le type.

La recherche est insensible à la casse.

---

# 8. Filtres

Les filtres disponibles sont :

- Type ;
- Portée ;
- Catégorie ;
- Mois.

Chaque filtre possède une valeur par défaut :

```
Tous
```

Tous les filtres sont cumulables.

---

# 9. Gestion des catégories

Un événement peut appartenir à plusieurs catégories.

Exemple :

```
Benjamin
Minime
Cadet
```

Les catégories sont affichées sous forme de liste lisible.

---

# 10. Bouton d'action

Le bouton n'est affiché que lorsqu'une URL est disponible.

Son libellé dépend du contexte métier.

| Situation | Libellé |
|-----------|----------|
| Inscriptions ouvertes | S'inscrire |
| Événement terminé | Voir les résultats |
| Autres cas | Consulter le tournoi |

---

# 11. Gestion des inscriptions

Le backend calcule automatiquement l'état des inscriptions.

Les états possibles sont :

| Statut | Affichage |
|----------|-----------|
| UNKNOWN | aucun message |
| NOT_OPEN | Ouverture le ... |
| OPEN | Inscriptions jusqu'au ... |
| CLOSED | Inscriptions closes |

---

# 12. Gestion des événements

Le backend calcule également l'état de l'événement.

Valeurs :

- UPCOMING
- ONGOING
- FINISHED

Ces informations sont actuellement utilisées pour le choix du bouton mais ne sont pas affichées à l'utilisateur.

---

# 13. Gestion des erreurs

Si aucun événement ne correspond aux critères :

```
Aucun événement trouvé.
```

Aucune page vide ne doit être affichée.

---

# 14. Responsive Design

L'application fonctionne :

- sur smartphone ;
- sur tablette ;
- sur ordinateur.

Les cartes s'adaptent automatiquement à la largeur disponible.

---

# 15. Performances

Au chargement :

- une seule lecture Google Sheets ;
- aucun appel serveur supplémentaire.

Tous les filtres sont ensuite appliqués côté navigateur.

---

# 16. Contraintes fonctionnelles

L'application est :

- en lecture seule ;
- sans authentification ;
- sans compte utilisateur ;
- sans saisie de données.

---

# 17. Hors périmètre

Les fonctionnalités suivantes ne sont pas incluses dans la version actuelle :

- export ICS ;
- favoris ;
- notifications ;
- recherche avancée ;
- mode hors ligne ;
- multi-calendriers ;
- gestion des utilisateurs.

Ces fonctionnalités sont documentées dans la roadmap.

---

# 18. Évolutions prévues (v0.9+)

Les principales évolutions identifiées sont :

- filtres multi-sélection ;
- barre de filtres repliable ;
- affichage des filtres actifs ;
- tri métier enrichi ;
- amélioration de l'expérience desktop ;
- remplacement des émojis par des icônes ;
- enrichissement des informations géographiques ;
- export vers les calendriers.

---

# 19. Critères d'acceptation

Une version est considérée conforme si :

- les événements sont correctement lus depuis le Master ;
- les événements sont triés chronologiquement ;
- les regroupements par mois sont corrects ;
- les filtres fonctionnent individuellement et conjointement ;
- la recherche est opérationnelle ;
- les statuts sont correctement calculés ;
- le bouton d'action correspond au contexte métier ;
- les événements sans URL n'affichent aucun bouton ;
- le message "Aucun événement trouvé." apparaît lorsqu'aucun résultat n'est disponible ;
- l'affichage reste utilisable sur mobile et desktop.

---

# 20. Références

Ce document est complémentaire des documents suivants :

- `vision.md`
- `architecture.md`
- `business-rules.md`
- `data-model.md`
- `coding-guidelines.md`
- `roadmap.md`
- `known-limitations.md`
- `release-notes.md`

En cas de conflit, les règles métier définies dans `business-rules.md` prévalent sur cette spécification fonctionnelle.