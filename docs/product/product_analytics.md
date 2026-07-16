# Product Analytics

## Objectif

Ce document décrit la vision du suivi statistique de BadCalendar.

L'objectif n'est pas de produire un grand nombre d'indicateurs, mais de mesurer si l'application répond réellement à sa mission.

Les statistiques doivent permettre d'améliorer le produit au fil du temps en observant les usages réels des parents.

Toutes les données collectées sont anonymes.

---

# Philosophie

BadCalendar ne cherche pas à mesurer les compétitions.

BadCalendar cherche à mesurer l'utilisation de l'application.

Le tableau de bord est un outil d'aide à la décision pour le Product Owner.

Il doit permettre d'identifier :

- si l'application est utilisée ;
- si les utilisateurs reviennent régulièrement ;
- quelles fonctionnalités apportent de la valeur ;
- quelles fonctionnalités sont peu ou jamais utilisées.

Les statistiques ne doivent jamais être collectées "au cas où".

Chaque indicateur doit répondre à une question précise.

---

# Principes

## Respect de la vie privée

BadCalendar ne collecte aucune donnée personnelle.

Aucun compte utilisateur n'est nécessaire.

Les statistiques sont entièrement anonymes.

Les visiteurs sont identifiés uniquement par un identifiant anonyme généré localement afin de distinguer les visiteurs uniques.

---

## Simplicité

Le tableau de bord doit rester volontairement limité.

Quelques indicateurs utiles sont préférables à une multitude de graphiques difficiles à interpréter.

---

# Questions auxquelles doit répondre le tableau de bord

Le tableau de bord doit permettre de répondre aux questions suivantes.

## Adoption

Les parents utilisent-ils réellement BadCalendar ?

## Fidélisation

Les parents reviennent-ils consulter l'application au fil de la saison ?

## Utilisation

Quelles fonctionnalités sont réellement utilisées ?

## Évolution

Une nouvelle fonctionnalité apporte-t-elle une valeur mesurable ?

---

# Indicateurs

## Adoption

### Visiteurs uniques (7 derniers jours)

Nombre de visiteurs différents ayant utilisé BadCalendar durant les sept derniers jours.

Cet indicateur mesure la diffusion réelle de l'application.

---

## Fidélisation

### Nombre de sessions

Nombre total de sessions ouvertes durant les sept derniers jours.

Une session correspond à une période d'utilisation continue de l'application.

Une nouvelle session débute après une période d'inactivité significative (durée à définir lors de l'implémentation).

---

### Sessions moyennes par visiteur

Permet d'évaluer si les utilisateurs reviennent consulter BadCalendar régulièrement.

Cet indicateur est plus représentatif que le simple nombre de visites.

---

# Utilisation des fonctionnalités

Les fonctionnalités suivantes sont instrumentées.

## Dépliage d'une carte

Nombre de fois où un utilisateur affiche le détail d'un tournoi.

Cet indicateur mesure l'intérêt porté aux informations détaillées.

---

## Ouverture BadNet

Nombre de clics sur le bouton permettant d'accéder à BadNet.

Cet indicateur mesure la complémentarité entre BadCalendar et BadNet.

---

## Ouverture Google Maps

Nombre de clics sur Google Maps.

Cet indicateur permet d'évaluer l'utilité de cette fonctionnalité.

---

## Ajout Google Calendar

Nombre de clics permettant d'ajouter une compétition dans Google Calendar.

Cet indicateur mesure l'intérêt pour la planification de la saison.

---

# Utilisation des filtres

BadCalendar ne cherche pas à connaître les valeurs recherchées.

Seul le type de filtre utilisé est enregistré.

Exemples :

- filtre Catégorie ;
- filtre Type ;
- filtre Discipline ;
- filtre Portée ;
- filtre Localisation.

Ces statistiques permettent d'identifier les filtres réellement utiles.

---

# Indicateurs volontairement exclus

Les éléments suivants ne font pas partie des statistiques produit.

- tournoi le plus consulté ;
- catégorie la plus recherchée ;
- discipline la plus recherchée ;
- nombre de compétitions ;
- nombre de compétitions ouvertes ;
- temps passé sur une carte ;
- nombre de pages vues ;
- parcours détaillé des utilisateurs.

Ces informations ne répondent pas aux objectifs de BadCalendar et n'apportent pas une valeur suffisante.

---

# Fréquence de consultation

Le tableau de bord est conçu pour être consulté principalement de manière hebdomadaire.

L'objectif est d'observer les tendances générales et non les variations quotidiennes.

---

# Exemple de tableau de bord

## Adoption

- 👤 Visiteurs uniques : 84
- 🔄 Sessions : 137
- 📈 Sessions / visiteur : 1,63

## Fonctionnalités

- 📂 Dépliages de cartes : 284
- 🎯 Clics BadNet : 119
- 🗺️ Ouvertures Google Maps : 38
- 📅 Ajouts Google Calendar : 52

## Filtres

- Catégorie : 74 utilisations
- Type : 31 utilisations
- Discipline : 18 utilisations
- Portée : 9 utilisations
- Localisation : 6 utilisations

---

# Utilisation des statistiques

Les statistiques ont pour objectif de guider les évolutions du produit.

Quelques exemples :

- une fonctionnalité très utilisée pourra être enrichie ;
- une fonctionnalité jamais utilisée pourra être simplifiée ou supprimée ;
- une nouvelle fonctionnalité pourra être évaluée objectivement après son déploiement.

Les statistiques ne constituent pas une finalité mais un outil d'amélioration continue.

---

# Évolutions futures

Le périmètre pourra évoluer ultérieurement avec notamment :

- évolution hebdomadaire des indicateurs ;
- taux de retour des visiteurs ;
- comparaison entre versions ;
- tableau de bord d'administration enrichi.

Toute nouvelle statistique devra cependant respecter les principes définis dans ce document : simplicité, anonymat et utilité.
