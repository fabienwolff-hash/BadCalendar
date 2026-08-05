# Analyse de performance du chargement initial - BadPlanner v0.8

**Date :** 2026-07-07
**Objectif :** Identifier l'origine du temps de chargement initial (~2 secondes) avant toute optimisation.

---

## 1. Contexte

L'application BadPlanner présente un temps de chargement initial supérieur à 1 seconde, pouvant atteindre environ 2 secondes selon les mesures réalisées.

Avant d'envisager une optimisation, une phase d'instrumentation a été réalisée afin d'identifier précisément où est consommé le temps de chargement :

* lecture des données Google Sheets ;
* traitement métier backend ;
* préparation des données ;
* transfert Apps Script vers le navigateur ;
* initialisation frontend ;
* rendu de l'interface.

L'objectif était de prendre des décisions basées sur des mesures réelles et non sur des hypothèses.

---

# 2. Méthode de mesure

Des mesures temporaires ont été ajoutées :

## Frontend

Mesure du temps entre :

```text
appel google.script.run.readEvents()
        |
        v
réception des événements côté navigateur
```

Puis mesure de :

* l'initialisation de l'application ;
* le rendu du calendrier.

## Backend

Mesure des différentes étapes de `EventService.read()` :

* ouverture du Google Spreadsheet ;
* lecture des données ;
* transformation métier ;
* tri ;
* conversion des dates.

---

# 3. Résultats frontend

Mesures réalisées :

| Étape                        | Temps constaté |
| ---------------------------- | -------------: |
| Appel complet `readEvents()` |  1,4 s à 2,3 s |
| Initialisation frontend      |          ~6 ms |
| Rendu calendrier             |          ~3 ms |

Exemple :

```
readEvents: 1853 ms
Frontend initialization: 6 ms
render: 3 ms
```

## Conclusion frontend

Le frontend n'est pas responsable du temps de chargement.

Les opérations suivantes sont négligeables :

* construction de l'interface ;
* application des filtres ;
* rendu DOM.

Aucune optimisation frontend n'est nécessaire actuellement.

---

# 4. Résultats backend

Plusieurs exécutions directes de `EventService.read()` ont été réalisées.

Exemples de mesures :

```
Open spreadsheet: 347 ms
Read sheet data: 513 ms
Transform events: 53 ms
Sort events: 1 ms
Serialize dates: 2 ms

EventService.read total: 929 ms
```

Autres mesures :

```
Open spreadsheet: 218 ms
Read sheet data: 256 ms
Transform events: 44 ms

EventService.read total: 531 ms
```

## Synthèse backend

| Composant             |      Temps |
| --------------------- | ---------: |
| Ouverture Spreadsheet | 200-350 ms |
| Lecture Google Sheet  | 250-500 ms |
| Transformation métier |   40-50 ms |
| Tri                   |      ~1 ms |
| Sérialisation dates   |     1-3 ms |
| Total backend         | 500-900 ms |

---

# 5. Taille des données échangées

Une mesure de la taille de la réponse a également été réalisée.

Résultat :

```
Nombre événements : 27
JSON size : 13457 caractères
```

La taille des données échangées est très faible.

Conclusion :

* le volume de données n'est pas un facteur limitant ;
* aucune optimisation du modèle de données n'est nécessaire actuellement.

---

# 6. Diagnostic final

Le temps de chargement observé côté navigateur provient principalement de l'appel :

```
google.script.run.readEvents()
```

Le traitement métier BadPlanner est performant.

Répartition approximative :

| Zone                      | Diagnostic                 |
| ------------------------- | -------------------------- |
| EventService              | Performant                 |
| Lecture Google Sheet      | Principal coût backend     |
| Sérialisation             | Négligeable                |
| Frontend                  | Négligeable                |
| Taille des données        | Négligeable                |
| Latence Apps Script / RPC | Principal facteur résiduel |

---

# 7. Décision technique

## Aucune optimisation immédiate recommandée

Les mesures montrent qu'il n'existe pas de problème identifié dans le code applicatif.

Les optimisations suivantes ne sont pas justifiées à ce stade :

* refactoring EventService ;
* optimisation du rendu frontend ;
* modification du modèle de données ;
* réduction des traitements métier.

Le gain potentiel serait faible au regard de la complexité introduite.

---

# 8. Pistes futures éventuelles

Si une amélioration du temps de chargement devient nécessaire, les pistes à étudier seraient :

## Cache des données

Utilisation éventuelle d'un mécanisme de cache Apps Script afin de limiter les lectures répétées du Google Sheet.

Points à étudier avant mise en œuvre :

* fréquence de modification des données ;
* stratégie d'invalidation ;
* impact sur la fraîcheur des informations.

## Chargement différé

Afficher rapidement la structure de l'application puis charger les événements en arrière-plan.

Cette approche serait principalement une amélioration UX plutôt qu'une optimisation du traitement.

---

# 9. Conclusion

L'analyse de performance v0.8 montre que :

* le code métier est suffisamment performant ;
* le frontend n'est pas un facteur limitant ;
* la principale latence provient de l'environnement Apps Script et de l'accès aux services Google.

Le temps de chargement actuel (~1,5 à 2 secondes) est considéré comme acceptable pour une application Google Apps Script basée sur Google Sheets.

Une optimisation pourra être envisagée ultérieurement si :

* le volume de données augmente ;
* le nombre d'utilisateurs augmente ;
* l'expérience utilisateur nécessite un chargement perçu plus rapide.

**Statut : analyse terminée - aucune action corrective nécessaire.**
