# Tests

# Objectif

Ce document décrit l'organisation des tests automatisés de BadPlanner.

L'objectif est de garantir la stabilité du produit tout en conservant un développement simple et rapide.

Les tests doivent permettre de détecter les régressions lors des évolutions du modèle métier ou des services.

Ils ne remplacent pas les validations fonctionnelles réalisées avant une release.

---

# Philosophie

BadPlanner privilégie les tests métier.

La majorité des règles de gestion étant implémentées dans le backend, les efforts de test portent principalement sur les services métier.

Le frontend contenant très peu de logique, il ne fait pas l'objet d'une stratégie de tests automatisés spécifique.

---

# Principes

Les tests doivent être :

- rapides ;
- indépendants ;
- déterministes ;
- simples à comprendre ;
- simples à exécuter.

Chaque test doit vérifier un comportement métier précis.

---

# Pyramide des tests

Les tests sont organisés selon trois niveaux.

## 1. Tests unitaires métier

Ils constituent le cœur de la stratégie de tests.

Ils vérifient les services métier indépendamment du reste de l'application.

Exemples :

- TournamentService
- ValidationService
- RegistrationService
- ParameterService

Ces tests sont prioritaires.

---

## 2. Tests d'intégration

Ils vérifient la collaboration entre plusieurs services.

Exemples :

Master

↓

TournamentService

↓

DTO

↓

Frontend

Ils permettent de s'assurer que les objets produits sont conformes au modèle métier.

---

## 3. Tests fonctionnels

Ils sont réalisés manuellement avant chaque release.

Ils permettent de vérifier notamment :

- affichage desktop ;
- affichage mobile ;
- filtres ;
- ouverture BadNet ;
- Google Maps ;
- Google Calendar.

---

# Jeux de données

Les tests s'appuient sur des Masters de référence.

Chaque fichier représente un scénario métier.

Exemples :

```text
tests/data/

master-valid

master-multi-program

master-multi-site

master-invalid-registration

master-invalid-duplicate

master-invalid-category
```

Ces fichiers constituent la référence de validation du modèle métier.

Ils doivent rester les plus simples possible.

---

# Organisation des tests

Les fichiers de test suivent la même organisation que les services.

```text
tests/

TournamentServiceTest.gs

ValidationServiceTest.gs

RegistrationServiceTest.gs

ParameterServiceTest.gs

TestRunner.gs
```

Chaque service possède son propre fichier de tests.

---

# Convention de nommage

Les méthodes de test suivent le format :

```javascript
testBuildTournament()

testMergePrograms()

testRegistrationStatusOpen()

testDuplicateTournamentId()
```

Le nom du test doit décrire le comportement attendu.

---

# Exécution

Tous les tests peuvent être exécutés via un point d'entrée unique.

```javascript
runAllTests();
```

Le résultat doit présenter un résumé clair.

Exemple :

```text
TournamentService

✔ buildTournament

✔ mergePrograms

✔ multiSite

ValidationService

✔ duplicateTournament

✔ registrationDates

✔ categoryValidation

--------------------------------

37 tests

37 passed

0 failed
```

---

# Tests de validation

Chaque règle métier importante doit posséder au moins un test.

Exemples :

- TournamentId obligatoire
- unicité des TournamentId
- cohérence des propriétés d'un Tournament
- Program valide
- Site valide
- catégories autorisées
- type autorisé
- portée autorisée
- dates d'inscription cohérentes

Une nouvelle règle métier doit être accompagnée d'un nouveau test.

---

# Non-régression

Chaque anomalie corrigée doit donner lieu à un test.

Le principe est le suivant :

1. reproduire le bug avec un test ;
2. vérifier que le test échoue ;
3. corriger le code ;
4. vérifier que le test passe.

Ainsi, un bug corrigé ne doit jamais réapparaître.

---

# Frontend

Le frontend ne comporte que peu de logique métier.

Les comportements suivants sont vérifiés principalement lors des tests fonctionnels :

- affichage des cartes ;
- filtres ;
- navigation ;
- ouverture des liens externes ;
- responsive.

Les règles métier ne sont jamais testées dans le frontend.

---

# Maintenance

Les tests font partie intégrante du projet.

Toute évolution du modèle métier doit entraîner la mise à jour des tests concernés.

Un test obsolète doit être corrigé ou supprimé.

---

# Bonnes pratiques

Préférer plusieurs petits tests à un unique test complexe.

Chaque test doit rester indépendant.

Les données de test doivent être minimales.

Un test ne doit jamais dépendre de l'ordre d'exécution d'un autre test.

---

# Ce qui n'est pas testé

BadPlanner ne cherche pas à automatiser :

- les performances ;
- les styles CSS ;
- les animations ;
- les composants HTML.

Ces aspects sont validés lors des tests fonctionnels.

---

# Évolutions futures

À terme, les tests pourront être exécutés automatiquement avant chaque déploiement.

L'objectif est de disposer d'une suite de non-régression permettant de faire évoluer le projet en toute confiance.
