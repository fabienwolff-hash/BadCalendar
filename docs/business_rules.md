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

```
Mois
    Événements...
```

Le changement de mois entraîne automatiquement l'affichage d'un nouvel en-tête.

---

# BR-005 — Les catégories sont multiples

Un événement peut concerner plusieurs catégories.

Exemple :

```
Benjamin
Minime
Cadet
```

Le stockage dans le Master utilise le séparateur officiel :

```
;
```

---

# BR-006 — Une catégorie appartient toujours à l'ordre officiel

Ordre métier :

1. Minibad
2. Poussin
3. Benjamin
4. Minime
5. Cadet
6. Junior

Cet ordre est utilisé pour :

- les filtres ;
- les affichages futurs.

Cet ordre est obligatoire dans tous les affichages métier et filtres.

Le tri alphabétique n'est jamais utilisé.

---

# BR-007 — Les portées utilisent un ordre métier

Ordre officiel :

1. Départementale
2. Régionale
3. Inter-Régionale
4. Nationale

Cet ordre est utilisé dans les listes de filtres.

---

# BR-008 — Les filtres utilisent une valeur par défaut

Chaque filtre possède une valeur représentant l'absence de filtrage :

```
Tous
```

Cette valeur ne correspond jamais à une donnée métier.

---

# BR-009 — Les filtres sont combinés

Lorsqu'un utilisateur applique plusieurs filtres, ceux-ci sont cumulés.

Le résultat affiché doit satisfaire simultanément l'ensemble des critères.

Exemple :

```
Type = TDJ
ET

Catégorie = Benjamin
ET

Mois = Janvier
```

---

# BR-010 — La recherche textuelle est insensible à la casse

La recherche compare en minuscules :

- titre ;
- ville ;
- catégories ;
- type.

La casse ne doit jamais influencer le résultat.

---

# BR-011 — Un événement sans URL ne propose aucune action

Si :

```
eventUrl = vide
```

alors aucun bouton n'est affiché.

---

# BR-012 — Le bouton d'action dépend du contexte métier

Le libellé du bouton est calculé automatiquement.

Règles actuelles :

| Situation | Libellé |
|-----------|----------|
| Événement terminé | Voir les résultats |
| Inscriptions ouvertes | S'inscrire |
| Autres cas | Consulter le tournoi |

Le bouton n'apparaît que si une URL est disponible.

---

# BR-013 — Les informations d'inscription sont affichées uniquement lorsqu'elles sont connues

Si :

```
registrationStatus = UNKNOWN
```

aucun message n'est affiché.

Cela signifie que les modalités d'inscription ne sont pas encore connues.

---

# BR-014 — Les statuts d'inscription sont calculés

Les statuts ne sont jamais saisis.

Ils sont calculés à partir :

- de la date d'ouverture ;
- de la date de fermeture ;
- de la date du jour.

Valeurs possibles :

- UNKNOWN (Dates d'inscription absentes)
- NOT_OPEN (Aujourd'hui < ouverture)
- OPEN (Ouverture ≤ aujourd'hui ≤ fermeture)
- CLOSED (Aujourd'hui > fermeture)

---

# BR-015 — Les statuts des événements sont calculés

Le statut d'un événement est calculé automatiquement.

Valeurs possibles :

- UPCOMING (Aujourd'hui < Date début)
- ONGOING (Date début ≤ Aujourd'hui ≤ Date fin)
- FINISHED (Aujourd'hui > Date fin)
 
Aucun statut n'est saisi dans le Master.


---

# BR-019 — Les listes de filtres sont alimentées dynamiquement

Les valeurs disponibles dans les filtres proviennent des événements présents dans le Master.

Aucune liste n'est codée en dur, à l'exception de l'ordre métier utilisé pour le tri.

---

# BR-020 — Les événements inexistants sont explicitement signalés

Si aucun événement ne correspond aux filtres actifs, l'application affiche un message dédié :

```
Aucun événement trouvé.
```

L'utilisateur ne doit jamais voir une page vide sans explication.

---

# Principes

Les règles décrites dans ce document constituent la référence fonctionnelle de BadCalendar.

En cas de divergence entre le code et ce document, une revue devra être réalisée afin de déterminer si :

- le code doit être corrigé ;
- ou si la règle métier a évolué et nécessite une mise à jour de cette documentation.

---

# BR-025 — Les événements terminés sont masqués par défaut

Par défaut, seuls les événements UPCOMING et ONGOING sont affichés.

L'utilisateur peut explicitement demander l'affichage des événements FINISHED.

---


# BR-026 — Les préférences utilisateur sont conservées

Les préférences d'interface suivantes sont conservées :

- état de repli de la barre de filtres ;
- affichage des compétitions terminées.
