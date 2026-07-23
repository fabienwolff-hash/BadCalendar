# Google Calendar

# Objectif

La fonctionnalité Google Calendar permet à un parent d'ajouter rapidement une compétition à son calendrier personnel.

L'objectif est de faciliter la planification de la saison et de réduire le risque d'oublier une compétition ou un stage.

BadCalendar ne remplace pas Google Calendar : il simplifie uniquement la création de l'événement.

---

# Principes UX

L'export doit être :

- immédiat ;
- sans configuration ;
- compatible mobile et desktop ;
- fidèle aux informations du tournoi.

Un clic doit suffire.

---

# Disponibilité

Le bouton **Ajouter au calendrier** est disponible sur chaque carte de compétition dépliée.

Il reste masqué lorsque la carte est repliée afin de limiter la charge visuelle.

---

# Déclenchement

Le clic ouvre Google Calendar avec un événement prérempli.

Aucune donnée n'est enregistrée par BadCalendar.

L'utilisateur reste libre de :

- modifier l'événement ;
- choisir son agenda ;
- enregistrer ou annuler.

---

# Informations exportées

## Titre

Le titre suit le format :

```text
[Type] Nom du tournoi
```

Exemples :

```text
TDJ 4 - Saint-Malo

TRJ 2 - Bretagne

Stage Départemental
```

Le titre doit rester court et facilement identifiable dans le calendrier.

---

## Date

### Tournoi

Les compétitions sont exportées comme événements "Toute la journée".

---

### Stage

Les stages peuvent durer plusieurs jours.

La date de fin est donc renseignée.

Google Calendar crée automatiquement un événement sur plusieurs jours.

---

# Heure

Aucune heure n'est définie.

Les événements sont créés comme :

> Toute la journée

Cela évite d'afficher une heure arbitraire.

---

# Lieu

Le lieu complet est exporté.

Exemple :

```text
Complexe Sportif Jean Moulin

12 rue des Sports

35000 Rennes
```

Google Calendar pourra proposer automatiquement l'ouverture dans Google Maps.

---

# Description

La description contient les informations utiles au parent.

Format recommandé :

```text
BadCalendar

Type :
TDJ

Catégories :
Minime / Cadet

Portée :
Départementale

Inscriptions :
Ouvertes

BadNet :
https://...
```

La description reste volontairement concise.

---

# Lien BadNet

Le lien BadNet est toujours ajouté dans la description.

Il constitue la référence officielle du tournoi.

Le parent peut retrouver :

- les informations détaillées ;
- les tableaux ;
- les convocations ;
- les résultats.

---

# Google Maps

Aucun lien Google Maps n'est généré.

Le champ **Lieu** est suffisant pour que Google Calendar propose automatiquement la navigation.

Cette solution est plus robuste et évite les URL inutiles.

---

# Données obligatoires

Les champs suivants sont toujours renseignés :

- titre ;
- date ;
- lieu (si disponible).

---

# Données facultatives

Lorsque disponibles :

- catégories ;
- portée ;
- état des inscriptions ;
- lien BadNet.

Le fonctionnement ne dépend jamais de ces informations.

---

# Cas particuliers

## Stage sur plusieurs jours

Création d'un événement "Toute la journée" avec :

- date de début ;
- date de fin.

---

## Lieu inconnu

Le champ lieu est laissé vide.

L'événement reste valide.

---

## Lien BadNet absent

La description est générée sans ce lien.

---

## Événement d'une seule journée

La date de début correspond à la date de fin.

---

# Compatibilité

La fonctionnalité repose sur l'URL officielle Google Calendar.

Elle fonctionne :

- Android ;
- iPhone ;
- Desktop.

Aucune API Google Calendar n'est utilisée.

Aucune authentification n'est nécessaire.

---

# Performance

L'URL d'export est générée côté frontend.

Aucun appel backend supplémentaire n'est effectué.

L'ouverture est immédiate.

---

# Usage Metrics

Chaque export génère un événement :

```text
EventType

calendar_export
```

Aucune information personnelle n'est enregistrée.

Seul le TournamentId est transmis.

---

# Philosophie

BadCalendar facilite la planification.

Google Calendar reste responsable :

- du stockage ;
- des rappels ;
- des notifications ;
- de la synchronisation multi-appareils.

BadCalendar prépare simplement l'événement.

---

# Hors périmètre

La version 1.0 ne comprend pas :

- synchronisation automatique ;
- suppression d'un événement ;
- modification d'un événement existant ;
- Apple Calendar ;
- Outlook Calendar ;
- ICS téléchargeable.

Ces fonctionnalités pourront être étudiées dans des versions futures.

---

# Critères d'acceptation

La fonctionnalité est considérée comme conforme lorsque :

- le bouton est disponible sur chaque carte dépliée ;
- Google Calendar s'ouvre correctement ;
- les événements sont créés "Toute la journée" ;
- les stages couvrent plusieurs jours lorsque nécessaire ;
- le lieu est correctement renseigné ;
- le lien BadNet est présent dans la description lorsqu'il est disponible ;
- aucun appel backend supplémentaire n'est réalisé ;
- un événement `calendar_export` est enregistré dans les Usage Metrics.
