# Release Checklist

# Objectif

Cette checklist est utilisée avant chaque déploiement de BadPlanner.

Son objectif est de garantir qu'une version est prête à être publiée et qu'aucune étape importante n'a été oubliée.

Elle complète les tests automatisés et les validations fonctionnelles.

---

# 1. Développement

## Fonctionnalités

- [ ] Toutes les sous-issues prévues pour la version sont terminées.
- [ ] Aucun développement expérimental n'est inclus dans la release.
- [ ] Les TODO temporaires ont été supprimés ou planifiés.

## Qualité du code

- [ ] Le code respecte les Coding Guidelines.
- [ ] Aucun code mort n'est conservé.
- [ ] Les logs temporaires ont été supprimés.

---

# 2. Tests automatisés

- [ ] Tous les tests automatisés sont exécutés.
- [ ] Aucun test n'est en échec.
- [ ] Les nouveaux comportements sont couverts par des tests si nécessaire.

---

# 3. Validation métier

## Validation Admin

- [ ] Le Master est validé sans erreur bloquante.
- [ ] Les rapports de validation sont conformes.

## Contrôle métier

- [ ] Les nouvelles règles métier sont correctement appliquées.
- [ ] Les référentiels sont cohérents.

---

# 4. Vérifications fonctionnelles

## Consultation

- [ ] Les cartes s'affichent correctement.
- [ ] Les filtres fonctionnent.
- [ ] Les recherches retournent les résultats attendus.

## Actions

- [ ] Les liens BadNet sont corrects.
- [ ] Les liens Google Maps fonctionnent.
- [ ] L'ajout à Google Calendar fonctionne.

## Responsive

- [ ] Vérification sur mobile.
- [ ] Vérification sur desktop.

---

# 5. Documentation

- [ ] La Roadmap est à jour.
- [ ] Les Release Notes sont rédigées.
- [ ] Les documents impactés ont été mis à jour si nécessaire.

Exemples :

- architecture.md
- business_rules.md
- data_model.md
- glossary.md
- coding_guidelines.md

---

# 6. Version

- [ ] Le numéro de version est mis à jour.
- [ ] La version affichée dans l'application est correcte.

---

# 7. Déploiement

- [ ] Déploiement de la Web App.
- [ ] Vérification que le déploiement est accessible.
- [ ] Vérification rapide des principales fonctionnalités en production.

---

# 8. Après la mise en production

- [ ] Vérifier que les données sont correctement chargées.
- [ ] Vérifier que les liens principaux fonctionnent.
- [ ] Vérifier qu'aucune erreur inattendue n'est remontée.

---

# Principe

Une release est considérée comme terminée uniquement lorsque toutes les étapes de cette checklist sont validées.

Si une étape ne peut pas être cochée, la publication doit être reportée ou faire l'objet d'une décision explicite.
