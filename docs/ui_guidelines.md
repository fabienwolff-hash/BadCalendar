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

BadCalendar est une application d'aide à la décision.

La liste des événements constitue une vue synthétique permettant à un parent d'identifier rapidement les compétitions pertinentes pour son enfant.

Les informations détaillées et les actions associées à un événement ne sont affichées qu'à la demande de l'utilisateur.


Les principes de conception sont donc :

- simplicité ;
- lisibilité ;
- rapidité ;
- peu de distractions ;
- responsive first.

Chaque élément affiché doit avoir une utilité métier.

---

# 2. Principes UX

L'utilisateur ne doit jamais être submergé par l'information.

Les informations nécessaires à la décision sont affichées immédiatement.

Les informations complémentaires sont accessibles via le détail d'un événement.


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

Les filtres disponibles évoluent avec les fonctionnalités de l'application.

Les principaux filtres sont actuellement :

- Recherche
- Type
- Portée
- Catégorie
- Mois

Tous les filtres sont actuellement indépendants.

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

# 8.1 Cartes événements

Chaque événement est représenté par une carte synthétique.

Cette carte doit permettre au parent de décider rapidement si l'événement mérite une consultation plus approfondie.

Elle ne cherche pas à afficher toutes les informations disponibles.

Les actions et informations secondaires sont volontairement reportées dans une fiche détaillée accessible depuis la carte.

┌────────────────────────────────────┐
│ TDJ                 Sam. 12 sept.  │
│ TDJ de Guichen                    │
│ Rennes (35)                       │
│ Benjamin • Minime                 │
│ Simple • Double                   │
│ Ouverture : 25 août               │
│                                    │
│              ▼ Voir les détails    │
└────────────────────────────────────┘

---

# 8.2 Vue détaillée d'un événement

La vue détaillée complète la carte synthétique.

Elle contient les informations et actions utiles lorsque l'utilisateur souhaite approfondir un événement.

Elle peut notamment afficher :

- mode d'inscription ;
- lien BadNet ;
- ouverture Google Maps ;
- ajout Google Calendar ;
- informations complémentaires.

Cette vue est accessible par le bouton « Voir les détails ».

---

# 9. Priorité visuelle

1. Type de compétition
2. Date
3. Titre
4. Localisation
5. Catégories concernées
6. Disciplines proposées
7. Statut d'inscription

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

Les actions principales sont regroupées dans la vue détaillée.

La carte synthétique ne présente qu'une action permettant d'accéder aux informations détaillées.

Les actions métier (BadNet, Google Maps, Google Calendar...) sont volontairement séparées de la prise de décision.


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
- meilleure gestion des grands écrans.
- fiche détaillée ;
- profil utilisateur ;
- filtres intelligents ;
- badges catégories ;
- badges disciplines ;

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

---

# 21. Etat d'un évènement

Un événement peut être présenté sous différents états :

- annonce ;
- inscriptions non ouvertes ;
- inscriptions ouvertes ;
- inscriptions closes ;
- terminé.

L'affichage s'adapte à chacun de ces états afin de présenter uniquement les informations utiles.

---

# 22. Localisation

La localisation affichée est une information métier calculée par le backend.

Elle peut représenter :

- une ville ;
- un département ;
- une région ;
- ou un texte indiquant que le lieu reste à définir.

Le frontend ne contient aucune logique de décision concernant la localisation.

---

# 23. Informations affichées

La carte synthétique privilégie les informations utiles à la décision :

- type ;
- date ;
- localisation ;
- catégories ;
- disciplines ;
- statut d'inscription.

Les informations secondaires sont volontairement reportées dans la vue détaillée.
