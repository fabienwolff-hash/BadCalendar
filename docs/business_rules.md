# Business Rules

## Objectif

Ce document centralise l'ensemble des règles métier de BadCalendar.

Il décrit les règles de gestion indépendamment de l'implémentation technique afin de garantir un comportement cohérent de l'application.

---

# BR-001 — Le Master est la source de vérité

Toutes les données métier proviennent exclusivement de la feuille **Master**.

Aucune information métier ne doit être créée ou modifiée dans le frontend.

Le backend est responsable de l'enrichissement des données.

---

# BR-002 — Un événement est défini par ses données métier

Un événement est composé des informations suivantes :

- type
- portée
- titre
- date de début
- date de fin
- ville
- catégories
- mode d'inscription
- dates d'inscription
- URL éventuelle

Les couleurs, textes d'affichage et éléments graphiques ne font pas partie du modèle métier.

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

Le backend transforme cette valeur en tableau.

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

- UNKNOWN
- NOT_OPEN
- OPEN
- CLOSED

---

# BR-015 — Les statuts des événements sont calculés

Le statut d'un événement est calculé automatiquement.

Valeurs possibles :

- UPCOMING
- ONGOING
- FINISHED

Aucun statut n'est saisi dans le Master.

---

# BR-016 — Le frontend ne recalcule jamais une règle métier

Le frontend affiche uniquement :

- les données ;
- les statuts ;
- les informations calculées par le backend.

Toute règle métier doit être implémentée dans `EventService`.

---

# BR-017 — Les dates sont normalisées

Toutes les dates transmises au frontend sont sérialisées au format ISO 8601.

Le frontend est responsable uniquement du format d'affichage.

---

# BR-018 — Les valeurs absentes sont représentées par `null`

Une date inconnue est transmise sous la forme :

```
null
```

Aucune valeur sentinelle (comme `9999-12-31`) ne doit être utilisée.

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

# BR-021 — Les constantes métier sont centralisées

Les chaînes de caractères utilisées par l'application sont regroupées dans `Constants.html`.

Cela concerne notamment :

- les libellés des boutons ;
- les messages utilisateur ;
- les statuts affichés ;
- les identifiants DOM ;
- les ordres métier.

---

# BR-022 — L'interface ne dépend pas des valeurs techniques

Le frontend ne doit jamais afficher directement des valeurs internes telles que :

- `UPCOMING`
- `OPEN`
- `FINISHED`
- `UNKNOWN`

Ces valeurs restent réservées à la logique métier.

---

# BR-023 — Les données métier priment sur la présentation

Une évolution graphique ne doit jamais modifier les règles métier.

Les changements de style (couleurs, icônes, disposition) doivent être indépendants des traitements fonctionnels.

---

# BR-024 — Les fonctionnalités futures doivent préserver la simplicité

Toute nouvelle fonctionnalité devra respecter les principes fondateurs du projet :

- simplicité d'utilisation ;
- maintenance minimale ;
- absence de dépendances externes ;
- architecture claire ;
- séparation stricte entre métier, présentation et données.

---

# Principes

Les règles décrites dans ce document constituent la référence fonctionnelle de BadCalendar.

En cas de divergence entre le code et ce document, une revue devra être réalisée afin de déterminer si :

- le code doit être corrigé ;
- ou si la règle métier a évolué et nécessite une mise à jour de cette documentation.