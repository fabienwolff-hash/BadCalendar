# Usage Metrics

## Objectif

Ce document décrit la vision du suivi statistique de BadPlanner.

L'objectif n'est pas de produire un grand nombre d'indicateurs mais de mesurer si l'application répond réellement à sa mission.

Les statistiques doivent permettre d'améliorer le produit au fil du temps en observant les usages réels des parents et des jeunes badistes.

Toutes les données collectées sont anonymes.

---

# Philosophie

BadPlanner ne cherche pas à mesurer les compétitions.

BadPlanner cherche à mesurer l'utilisation de l'application.

Le tableau de bord est un outil d'aide à la décision pour le Product Owner.

Il doit permettre d'identifier :

- si l'application est utilisée ;
- si les utilisateurs reviennent régulièrement ;
- quelles fonctionnalités apportent de la valeur ;
- quelles fonctionnalités sont peu ou jamais utilisées ;
- si de nouvelles versions améliorent réellement l'expérience utilisateur ;
- si l'application reste fiable au cours du temps.

Les statistiques ne doivent jamais être collectées "au cas où".

Chaque indicateur doit répondre à une question précise.

---

# Principes

## Respect de la vie privée

BadPlanner ne collecte aucune donnée personnelle.

Aucun compte utilisateur n'est nécessaire.

Les statistiques sont entièrement anonymes.

Aucune adresse e-mail n'est collectée.

Aucune adresse IP n'est stockée.

Aucun cookie de suivi n'est utilisé.

Les visiteurs sont identifiés uniquement à l'aide d'un identifiant anonyme généré localement.

---

## Simplicité

Le tableau de bord doit rester volontairement limité.

Quelques indicateurs utiles sont préférables à une multitude de graphiques difficiles à interpréter.

---

## Utilité

Chaque métrique doit permettre de prendre une décision produit.

Les métriques sans usage concret doivent être évitées.

---

# Modèle de données

## Structure d'un événement

Chaque événement enregistré possède la structure suivante.

| Champ | Description |
|---------|-------------|
| Timestamp | Date et heure de l'événement |
| Week | Semaine ISO |
| Version | Version de BadPlanner |
| VisitorId | Identifiant anonyme permanent |
| SessionId | Identifiant anonyme de session |
| DeviceType | Type d'appareil |
| OS | Système d'exploitation |
| Browser | Navigateur |
| Action | Action réalisée |
| Value | Valeur complémentaire éventuelle |

---

## VisitorId

Le VisitorId permet d'identifier un visiteur de manière anonyme.

Il est généré localement lors de la première utilisation de l'application.

Le même VisitorId est réutilisé lors des visites ultérieures.

Il permet notamment de mesurer :

- les visiteurs uniques ;
- les visiteurs récurrents ;
- les sessions par visiteur.

Le VisitorId ne contient aucune donnée personnelle.

---

## SessionId

Une SessionId est générée à chaque ouverture de l'application.

Elle permet de regrouper les événements d'une même visite.

Une nouvelle SessionId est créée à chaque nouvelle session.

Elle ne permet pas d'identifier un utilisateur.

---

## Informations techniques

Les informations suivantes sont enregistrées automatiquement :

### DeviceType

Valeurs possibles :

- Desktop
- Mobile
- Tablet

### OS

Valeurs possibles :

- Android
- iOS
- Windows
- macOS
- Linux
- Unknown

### Browser

Valeurs possibles :

- Chrome
- Safari
- Edge
- Firefox
- Other

Ces informations permettent de comprendre quels environnements sont réellement utilisés et d'orienter les priorités de test et d'amélioration.

---

# Questions auxquelles doit répondre le tableau de bord

## Adoption

Les parents utilisent-ils réellement BadPlanner ?

## Fidélisation

Les utilisateurs reviennent-ils consulter l'application au cours de la saison ?

## Utilisation

Quelles fonctionnalités sont réellement utilisées ?

## Évolution

Une nouvelle version apporte-t-elle une amélioration mesurable ?

## Santé

L'application reste-t-elle fiable et performante ?

---

# Événements collectés

## Application

### APP_OPEN

Déclenché lors de l'ouverture d'une nouvelle session.

---

### APP_LOAD_SUCCESS

Déclenché lorsque les données sont chargées avec succès.

---

### APP_LOAD_FAILED

Déclenché lorsqu'une erreur empêche le chargement de l'application.

---

### APP_LOAD_DURATION

Temps de chargement de l'application exprimé en millisecondes.

Cet événement permet de suivre les performances au fil des versions.

---

## Filtres

### FILTER_CATEGORY

Modification du filtre Catégorie.

---

### FILTER_TYPE

Modification du filtre Type.

---

### FILTER_SCOPE

Modification du filtre Portée.

---

### FILTER_FINISHED_TOURNAMENT

Modification du filtre Tournois terminés.

---

### FILTER_NEW_TOURNAMENT

Modification du filtre Nouveaux tournois.

---

### FILTER_RESET

Réinitialisation des filtres.

---

## Consultation

### CARD_EXPAND

Dépliage d'une carte événement.

Cet indicateur mesure l'intérêt porté aux informations détaillées.

---

## Actions

### BADNET_OPEN

Ouverture d'un lien BadNet.

---

### MAPS_OPEN

Ouverture d'un lien Google Maps.

---

### CALENDAR_EXPORT

Export vers Google Calendar.

---

# Indicateurs

## Adoption

### Visiteurs uniques

Nombre de VisitorId distincts.

Cet indicateur mesure la diffusion réelle de l'application.

---

### Sessions

Nombre total de sessions ouvertes.

---

### Sessions par visiteur

Rapport entre le nombre de sessions et le nombre de visiteurs uniques.

Cet indicateur permet de mesurer l'engagement.

---

## Fidélisation

### 1 seule visite

Nombre de visiteurs n'ayant réalisé qu'une seule session.

---

### Au moins 2 visites

Nombre de visiteurs ayant réalisé au moins deux sessions.

---

### Au moins 5 visites

Nombre de visiteurs ayant réalisé au moins cinq sessions.

---

## Fonctionnalités

### Dépliages de cartes

Nombre total de CARD_EXPAND.

---

### Ouvertures BadNet

Nombre total de BADNET_OPEN.

---

### Ouvertures Google Maps

Nombre total de MAPS_OPEN.

---

### Exports Google Calendar

Nombre total de CALENDAR_EXPORT.

---

## Utilisation des filtres

Nombre d'utilisations des filtres suivants :

- Catégorie
- Type
- Portée
- Tournois terminés
- Nouveaux tournois
- Réinitialisation