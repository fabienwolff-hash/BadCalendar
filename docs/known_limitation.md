# Known Limitations

## Objectif

Ce document recense les limitations actuellement connues de BadCalendar.

Ces limitations sont **volontaires**, **acceptées** ou **planifiées** dans les versions futures. Elles ne doivent pas être considérées comme des anomalies.

---

# Fonctionnalités non encore implémentées

## Multi-sélection des filtres

Les filtres n'acceptent actuellement qu'une seule valeur.

Exemple :

- une seule catégorie ;
- un seul type ;
- une seule portée ;
- un seul mois.

Une évolution est prévue afin de permettre la sélection de plusieurs valeurs simultanément.

Exemple :

```
Catégories :
☑ Benjamin
☑ Minime
☑ Cadet
```

---

## Icônes métier

Les cartes utilisent actuellement des émojis.

Exemple :

```
📍
👦
👥
📝
```

Ces pictogrammes pourront être remplacés ultérieurement par une bibliothèque d'icônes homogène.

---

## Informations géographiques limitées

Le Master ne contient actuellement que :

- la ville.

Les informations suivantes ne sont pas encore disponibles :

- gymnase ;
- adresse ;
- département ;
- coordonnées GPS ;
- lien Google Maps.

Ces informations seront probablement gérées via un futur onglet **Paramètres**.

---

## Gestion des favoris

Il n'est pas encore possible de :

- enregistrer des favoris ;
- masquer certains événements ;
- suivre uniquement certaines catégories.

---

## Export calendrier

L'application ne permet pas encore :

- l'export ICS ;
- l'ajout au calendrier Google ;
- l'ajout au calendrier Apple.

---

## Notifications

Aucune notification n'est actuellement disponible.

Exemples futurs :

- ouverture des inscriptions ;
- fermeture prochaine ;
- ajout d'un nouveau tournoi.

---

## Recherche avancée

La recherche actuelle est volontairement simple.

Elle ne permet pas encore :

- les expressions exactes ;
- les opérateurs logiques ;
- les recherches multi-critères.

---

## Tri des événements

Les événements sont toujours affichés :

- par date croissante.

Il n'existe pas encore d'autres modes de tri.

Exemple futur :

- par ville ;
- par type ;
- par portée.

---

## Persistance utilisateur limitée

Les préférences suivantes sont conservées :

- état replié de la barre de filtres ;
- affichage des compétitions terminées.

Les autres critères de filtrage ne sont pas restaurés entre deux sessions.

---


# Limitations techniques

## Aucune authentification

La WebApp est publique.

Il n'existe pas de gestion :

- des utilisateurs ;
- des rôles ;
- des permissions.

---

## Pas de mode hors ligne

Une connexion Internet est nécessaire.

---

## Pas de cache applicatif

Les données sont relues depuis Google Sheets à chaque chargement de la page.

Aucun mécanisme de cache n'est encore mis en place.

---

## Une seule source de données

L'application ne lit actuellement qu'une seule feuille :

```
Master
```

La gestion de plusieurs calendriers ou saisons n'est pas encore prévue.

---

# Limitations UX

## Responsive desktop perfectible

L'affichage desktop est fonctionnel mais pourra être amélioré.

Des pistes existent :

- meilleure utilisation de la largeur disponible ;
- optimisation de la barre de filtres ;
- meilleure densité d'information.

---

## Pas d'indication visuelle des statuts d'événement

Le statut :

- À venir
- En cours
- Terminé

est calculé mais n'est volontairement pas affiché.

Cette décision a été prise afin de limiter le bruit visuel.

Elle pourra être réévaluée dans une future version.

---

# Principe

Toutes les limitations présentes dans ce document sont connues et assumées.

Elles ne constituent pas des défauts de conception mais des choix de priorisation afin de conserver une application simple, robuste et facile à maintenir.