# v0.13 — TestKit

## Objectif

La version 0.13 introduit TestKit, le framework de tests automatisés de BadCalendar.

Cette version ne comporte aucune évolution fonctionnelle visible pour les utilisateurs.

Son objectif est de sécuriser les développements futurs en mettant en place une infrastructure de tests simple, légère et adaptée à Google Apps Script.

À terme, TestKit permettra de détecter automatiquement les régressions avant chaque publication d'une nouvelle version.

---

# Pourquoi cette version ?

Jusqu'à présent, la validation de BadCalendar repose principalement sur des tests manuels.

Cette approche reste adaptée aux premières versions du projet, mais devient progressivement insuffisante à mesure que les règles métier se multiplient.

L'introduction d'une suite de tests automatisés poursuit plusieurs objectifs :

- sécuriser les évolutions du modèle métier ;
- limiter les régressions ;
- faciliter les refactorings ;
- améliorer la confiance avant chaque release ;
- documenter le comportement attendu des services métier.

---

# Principes

TestKit respecte les mêmes principes que BadCalendar :

- simplicité avant richesse fonctionnelle ;
- aucune dépendance externe ;
- architecture modulaire ;
- API minimale ;
- faible coût de maintenance ;
- priorité aux tests métier.

Le framework est développé exclusivement pour les besoins de BadCalendar.

---

# Contenu de la version

## BC-13.1 — TestKit Core

Mise en place du cœur du framework :

- gestion des suites de tests ;
- exécution des tests ;
- découverte automatique des suites ;
- génération d'un rapport d'exécution.

---

## BC-13.2 — Assertions

Création des assertions utilisées par les tests :

- assertEquals()
- assertTrue()
- assertFalse()
- assertNull()
- assertNotNull()
- assertThrows()
- fail()

Ces assertions constituent l'API principale utilisée par les développeurs.

---

## BC-13.3 — Test Data

Création des jeux de données de référence.

Ces scénarios permettent de tester les règles métier de manière reproductible et constituent la base de la stratégie de non-régression.

---

## BC-13.4 — Initial Test Suite

Écriture des premiers tests automatisés couvrant les principaux services métier :

- ValidationService ;
- TournamentService ;
- RegistrationService ;
- ParameterService.

---

# Résultat attendu

À l'issue de cette version, le projet dispose :

- d'un framework de tests interne ;
- d'une première suite de non-régression ;
- de jeux de données de référence ;
- d'une commande unique permettant d'exécuter l'ensemble des tests.

Le développement des futures fonctionnalités pourra ainsi s'appuyer sur une base de tests automatisés fiable.

---

# Hors périmètre

Cette version ne comprend pas :

- les tests du frontend ;
- les tests de performance ;
- les tests de charge ;
- les tests d'accessibilité ;
- les tests de sécurité.

Ces sujets pourront être abordés ultérieurement si un besoin apparaît.

---

# Impact sur le produit

Cette version n'apporte aucune nouvelle fonctionnalité visible pour les utilisateurs.

Son impact est exclusivement technique.

Elle constitue néanmoins une étape importante dans la maturité du projet en améliorant sa robustesse, sa maintenabilité et sa capacité d'évolution.

---

# Critères de réussite

La version sera considérée comme terminée lorsque :

- TestKit est opérationnel ;
- les assertions sont disponibles ;
- les jeux de données de référence sont créés ;
- les premiers tests métier sont écrits ;
- tous les tests s'exécutent avec succès via `runAllTests()`.

---

# Documentation associée

- BC-13.1 — TestKit Core
- BC-13.2 — Assertions
- BC-13.3 — Test Data
- BC-13.4 — Initial Test Suite

Cette version complète la stratégie définie dans `tests.md` et marque l'introduction des tests automatisés dans BadCalendar.
