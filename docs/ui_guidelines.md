# UI Guidelines

## Projet

**Nom :** BadCalendar

**Objectif :** définir les règles de conception de l'interface utilisateur afin de garantir une expérience homogène, simple et maintenable.

Ce document complète les documents :

- vision.md
- functional-specification.md
- architecture.md
- coding-guidelines.md

---

# 1. Philosophie

BadCalendar est une application de consultation.

L'utilisateur doit pouvoir trouver un tournoi en quelques secondes.

Les principes de conception sont donc :

- simplicité ;
- lisibilité ;
- rapidité ;
- peu de distractions ;
- responsive first.

Chaque élément affiché doit avoir une utilité métier.

---

# 2. Principes UX

L'utilisateur doit toujours comprendre :

- où il est ;
- quels filtres sont actifs ;
- quelles actions sont possibles.

L'interface doit limiter au maximum les ambiguïtés.

---

# 3. Responsive First

L'application est conçue en priorité pour le mobile.

Le desktop adapte ensuite la présentation afin d'utiliser l'espace disponible.

Le comportement fonctionnel doit rester identique sur toutes les plateformes.

---

# 4. Organisation de la page

L'ordre des éléments est fixe.

```
Header

↓

Barre des filtres

↓

Liste des mois

↓

Cartes événements
```

---

# 5. Header

Le header contient :

- le logo ;
- le titre de l'application.

Il reste visible pendant le défilement (sticky).

Le header doit rester compact afin de maximiser la zone utile.

---

# 6. Barre des filtres

Les filtres sont placés sous le header.

Ils restent visibles lors du scroll.

Les filtres disponibles sont :

- Recherche
- Type
- Portée
- Catégorie
- Mois

Tous les filtres sont indépendants.

---

# 7. Barre de filtres repliable

La barre de filtres peut être repliée afin d'augmenter
l'espace disponible pour la consultation.

Lorsqu'elle est repliée :

- un bouton permet son ouverture ;
- un résumé des filtres actifs reste visible.

L'état replié est conservé pendant la navigation.

À terme, chaque filtre actif pourra être supprimé individuellement via une croix (✕).

---

# 8. Cartes événements

Chaque événement est représenté par une carte.

Une carte ne doit jamais être surchargée.

Les informations sont présentées selon un ordre constant.

```
Badge

Date

Titre

Ville

Catégories

--------------------

Mode d'inscription

Informations d'inscription

Bouton
```

---

# 9. Priorité visuelle

L'œil doit naturellement lire :

1. le type
2. la date
3. le titre
4. le lieu
5. les informations secondaires

Les informations métier les plus importantes doivent toujours apparaître en premier.

---

# 10. Couleurs

Les couleurs servent uniquement à identifier le type d'événement.

Elles ne doivent jamais porter une information métier critique.

Chaque type possède une couleur stable.

Exemple :

| Type | Couleur |
|-------|----------|
| TDJ | Bleu |
| TRJ | Bleu foncé |
| TIJ | Bleu clair |
| Stage | Jaune |
| Promobad | Vert |
| Championnat | Orange |
| CDJ | Turquoise |
| Interclub | Gris |

Les couleurs doivent rester sobres et cohérentes.

---

# 11. Icônes

Les icônes servent uniquement à améliorer la lecture.

Aujourd'hui, des émojis sont utilisés.

Exemple :

```
📍 Ville

👦 Catégories

👥 Mode

📝 Inscriptions
```

À terme, ils seront remplacés par une bibliothèque d'icônes homogène (Material Symbols ou équivalent).

---

# 12. Boutons

Un seul bouton d'action est affiché par carte.

Le texte du bouton dépend du contexte métier.

Exemples :

```
S'inscrire

Consulter le tournoi

Voir les résultats
```

Le bouton est toujours placé en bas de la carte.

---

# 13. Typographie

La hiérarchie visuelle repose principalement sur la taille de police.

Ordre recommandé :

- Titre application
- Titre événement
- Mois
- Informations principales
- Informations secondaires

Éviter les changements inutiles de police.

---

# 14. Espacements

Les espacements doivent rester réguliers.

Utiliser des marges homogènes.

Les cartes doivent respirer.

Éviter les interfaces trop denses.

---

# 15. États vides

Lorsque la recherche ne retourne aucun résultat, afficher un message explicite.

```
Aucun événement trouvé.
```

Ne jamais afficher une page vide.

---

# 16. États de chargement

Au chargement de l'application :

```
Chargement...
```

---

# 17. Accessibilité

Les contrastes doivent rester suffisants.

Les couleurs ne doivent jamais être la seule information.

Les boutons doivent être suffisamment grands pour une utilisation tactile.

Les champs de saisie doivent être facilement utilisables sur mobile.

---

# 18. Desktop

Le desktop n'a pas vocation à afficher un grand nombre de colonnes.

L'objectif reste une lecture confortable.

La largeur maximale du contenu est volontairement limitée.

---

# 19. Évolutions UX prévues

Les améliorations identifiées sont :

- suppression d'un filtre actif en un clic ;
- compteur de filtres actifs ;
- icônes Material Design ;
- animations légères lors des interactions ;
- amélioration de la densité d'affichage desktop ;
- meilleure gestion des grands écrans.

---

# 20. Principes à respecter

Toute nouvelle évolution de l'interface devra respecter les règles suivantes :

- privilégier la simplicité ;
- éviter la surcharge visuelle ;
- conserver une hiérarchie claire ;
- maintenir une cohérence graphique ;
- rester utilisable sur mobile avant tout ;
- ne jamais afficher une information métier redondante ;
- favoriser la lisibilité plutôt que la quantité d'informations.

Ces principes constituent la référence de conception de l'interface utilisateur de BadCalendar.