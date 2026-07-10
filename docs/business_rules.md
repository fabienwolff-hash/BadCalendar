# Business Rules

## Objectif

Ce document centralise l'ensemble des règles métier de BadCalendar.

Il décrit les règles de gestion indépendamment de l'implémentation technique afin de garantir un comportement cohérent de l'application.

---

# BR-003 — Les événements sont toujours triés chronologiquement

L'ordre d'affichage est exclusivement basé sur :

1. la date de début ;
2. puis l'ordre naturel du tableau si deux événements commencent le même jour.

Aucun autre critère de tri n'est actuellement pris en compte.

---

# BR-004 — Les événements sont regroupés par mois

L'affichage est organisé par :

```text
Mois
    Événements...
```

Le changement de mois entraîne automatiquement l'affichage d'un nouvel en-tête.

---

# BR-005 — Les catégories sont multiples

Un événement peut concerner plusieurs catégories.

Le stockage dans le Master utilise le séparateur officiel :

```text
;
```

Le backend transforme automatiquement cette valeur en tableau.

---

# BR-006 — Les catégories suivent un ordre métier

Ordre officiel :

1. Minibad
2. Poussin
3. Benjamin
4. Minime
5. Cadet
6. Junior

Cet ordre est utilisé dans tous les affichages métier.

Le tri alphabétique n'est jamais utilisé.

---

# BR-007 — Les portées suivent un ordre métier

Ordre officiel :

1. Départementale
2. Régionale
3. Inter-Régionale
4. Nationale

Cet ordre est utilisé dans les filtres.

---

# BR-008 — Les filtres utilisent une valeur par défaut

Chaque filtre possède une valeur représentant l'absence de filtrage :

```text
Tous
```

Cette valeur ne correspond jamais à une donnée métier.

---

# BR-009 — Les filtres sont combinés

Tous les filtres sont cumulés.

Un événement doit satisfaire simultanément l'ensemble des critères sélectionnés.

---

# BR-010 — La recherche textuelle est insensible à la casse

La recherche est effectuée sans tenir compte des majuscules/minuscules.

Elle porte actuellement sur :

* le titre ;
* la localisation affichée ;
* les catégories ;
* le type.

La recherche s'effectue sur la propriété `displayLocation` calculée par le backend.

---

# BR-011 — Les actions dépendent des données disponibles

Chaque action est affichée uniquement lorsque les informations nécessaires sont disponibles.

Exemples :

* le bouton BadNet nécessite `eventUrl` ;
* le bouton Google Maps nécessite `googleMapsUrl`.

Le backend prépare les informations nécessaires afin que le frontend n'ait aucune logique métier à appliquer.

---

# BR-012 — Les actions disponibles dépendent du contexte métier

Les actions proposées à l'utilisateur dépendent de l'état de l'événement et des données disponibles.

Le backend détermine les informations nécessaires au frontend afin que celui-ci puisse afficher uniquement les actions pertinentes.

---

# BR-013 — Les informations d'inscription sont affichées uniquement lorsqu'elles sont connues

Lorsque :

```text
registrationStatus = UNKNOWN
```

aucune information d'inscription n'est affichée.

---

# BR-014 — Les statuts d'inscription sont calculés

Les statuts sont calculés automatiquement.

Valeurs possibles :

* UNKNOWN
* NOT_OPEN
* OPEN
* CLOSED

Ils ne sont jamais saisis dans le Master.

---

# BR-015 — Les statuts des événements sont calculés

Valeurs possibles :

* UPCOMING
* ONGOING
* FINISHED

Ils sont calculés automatiquement à partir des dates.

---

# BR-019 — Les listes de filtres sont alimentées dynamiquement

Les filtres utilisent exclusivement les valeurs réellement présentes dans les événements.

Les listes ne sont pas codées en dur, à l'exception des ordres métier.

---

# BR-020 — Les événements inexistants sont explicitement signalés

Si aucun événement ne correspond aux filtres actifs, un message est affiché.

L'utilisateur ne doit jamais obtenir une page vide.

---

# BR-025 — Les événements terminés sont masqués par défaut

Par défaut :

* les événements UPCOMING sont affichés ;
* les événements ONGOING sont affichés ;
* les événements FINISHED sont masqués.

L'utilisateur peut choisir de les afficher.

---

# BR-026 — Les préférences utilisateur sont conservées

Les préférences suivantes sont mémorisées localement :

* état de repli des filtres ;
* affichage des compétitions terminées.

---

# BR-027 — Certains champs sont obligatoires

Les champs suivants doivent obligatoirement être renseignés :

* Type
* Scope
* Title
* StartDate
* EndDate
* Categories
* RegistrationMode

L'absence de l'un de ces champs constitue une erreur bloquante.

---

# BR-028 — Les référentiels métier sont obligatoires

Les valeurs suivantes doivent appartenir à leur référentiel respectif :

* Type
* Scope
* Category
* RegistrationMode
* Region
* Department
* City

Toute valeur absente du référentiel constitue une erreur de validation.

---

# BR-029 — Les contrôles sont exécutés avant publication

Les données du Master sont systématiquement analysées avant leur publication.

Chaque anomalie détectée est restituée dans le rapport de validation.

---

# BR-030 — Les référentiels sont administrés dans Parameters

Les listes métier ne sont pas codées dans l'application.

Elles sont administrées dans l'onglet `Parameters`, qui constitue l'unique source de vérité des référentiels.

---

# BR-031 — Le backend est responsable des règles métier

Toutes les règles métier sont appliquées par le backend.

Le frontend ne réalise aucun calcul métier.

Il consomme uniquement des données déjà :

* normalisées ;
* enrichies ;
* validées.

---

# BR-032 — Le modèle de localisation est progressif

La localisation d'un événement peut être connue avec différents niveaux de précision.

Le modèle distingue désormais :

* Region ;
* Department ;
* City.

---

# Principes

Les règles décrites dans ce document constituent la référence fonctionnelle de BadCalendar.

En cas de divergence entre le code et cette documentation, une revue doit déterminer si :

* le code doit être corrigé ;
* ou si la règle métier a évolué et nécessite une mise à jour de ce document.

---

# BR-033 — Un événement peut proposer plusieurs disciplines

Un événement peut proposer une ou plusieurs disciplines.

Exemples :

* Simple
* Double
* Mixte

Le stockage dans le Master utilise le séparateur officiel :

```text
;
```

Elle sera le pendant de BR-005 pour les catégories.

---

# BR-034 — La localisation affichée est calculée

La localisation affichée (`displayLocation`) est calculée par le backend.

La règle actuelle est :

1. City si elle est connue ;
2. sinon Department ;
3. sinon Region ;
4. sinon "Lieu à définir".

Le frontend utilise uniquement cette propriété et ne réalise aucun choix concernant la localisation.


---

# BR-035 — La carte synthétique est une aide à la décision

La carte d'un événement présente uniquement les informations nécessaires à la prise de décision.

Les informations complémentaires ainsi que les actions sont accessibles via la vue détaillée de l'événement.

Cette séparation garantit une consultation rapide, en particulier sur mobile.

---

# BR-036 — Les informations affichées dépendent du statut d'inscription

Les informations présentées à l'utilisateur dépendent du statut d'inscription de l'événement.

Exemples :

* UNKNOWN : aucune information d'inscription ;
* NOT_OPEN : affichage de la date d'ouverture ;
* OPEN : affichage de la date de clôture ;
* CLOSED : affichage d'un message indiquant que les inscriptions sont closes.

Le frontend ne détermine jamais ces règles. Il applique les informations fournies par le backend.

---

# BR-037 — Disciplines

Un événement de type compétitif (i.e. hors stage) doit avoir au moins une discipline renseignée.