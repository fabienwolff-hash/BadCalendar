# Vision — Module d'administration BadCalendar

## Objectif

Le module d'administration a pour vocation d'accompagner le gestionnaire de BadCalendar dans la maintenance du calendrier.

Contrairement à la WebApp, destinée aux utilisateurs finaux, ce module est réservé à l'administrateur du projet.

À ce stade du projet, un seul administrateur est prévu.

Le module privilégie la simplicité, la fiabilité et l'automatisation des contrôles plutôt que la multiplication des interfaces de saisie.

---

# Philosophie

Le Master reste la source de vérité unique.

L'administrateur continue à saisir les événements directement dans la feuille Google Sheets.

Le module d'administration ne remplace pas cette saisie.

Il apporte :

- des contrôles automatiques ;
- des outils d'aide ;
- des rapports de qualité ;
- des fonctions de maintenance.

Autrement dit :

> saisir dans le Master,
> contrôler avec les outils,
> publier dans la WebApp.

---

# Principes

Le module respecte plusieurs principes.

## Simplicité

L'administration doit rester compréhensible en quelques minutes.

Aucune interface complexe n'est recherchée.

Les fonctionnalités doivent s'intégrer naturellement dans Google Sheets.

---

## Contrôle avant publication

Avant chaque publication, l'administrateur doit pouvoir vérifier :

- la cohérence des données ;
- les oublis ;
- les erreurs de saisie.

L'objectif est d'éviter qu'une erreur atteigne la WebApp.

---

## Aide plutôt qu'interdiction

Le système privilégie les avertissements plutôt que les blocages.

Exemple :

"Le tournoi n'a pas de lien."

n'empêche pas la publication.

En revanche :

"La date de début est absente."

constitue une erreur.

---

## Réutilisation

Les contrôles doivent être indépendants de la source des données.

Aujourd'hui :

Google Sheets

Demain éventuellement :

- autre Google Sheet ;
- import CSV ;
- API fédérale.

Le moteur de validation doit rester identique.

---

# Architecture cible

Le module s'appuie sur plusieurs services spécialisés.

```
Master
   │
   ▼
EventRepository
   │
   ├─────────────► ValidationService
   │                     │
   │                     ▼
   │              ReportService
   │
   ▼
EventService
   │
   ▼
WebApp
```

Chaque composant possède une responsabilité unique.

---

# EventRepository

Responsable uniquement de la lecture des données.

Il ne calcule rien.

Il ne valide rien.

Il retourne les données brutes du Master.

---

# ValidationService

Responsable de l'ensemble des règles métier.

Chaque contrôle est indépendant.

Exemple :

- validateDates()
- validateCategories()
- validateUrls()
- validateRegistration()

Le service retourne une liste d'erreurs et d'avertissements.

---

# ReportService

Responsable de la génération des rapports.

Dans un premier temps :

un onglet "Contrôles".

À terme :

- export PDF ;
- historique ;
- statistiques qualité.

---

# EventService

Continue de préparer les données destinées exclusivement à la WebApp.

Il ne réalise aucun contrôle administratif.

---

# Nature des contrôles

Les contrôles sont répartis en plusieurs familles.

## Erreurs

Empêchent la publication.

Exemples :

- date absente ;
- date de fin avant la date de début ;
- type inconnu ;
- portée inconnue.

---

## Avertissements

N'empêchent pas la publication.

Exemples :

- URL absente ;
- inscriptions inconnues ;
- ville inconnue du référentiel.

---

## Informations

Signalent simplement des éléments utiles.

Exemples :

- tournoi terminé ;
- inscription bientôt ouverte ;
- événement très éloigné.

---

# Rapport de contrôle

Les résultats sont générés dans un onglet dédié.

Exemple :

| Niveau | Ligne | Champ | Message |
|--------|------:|-------|---------|
| Erreur | 18 | StartDate | Date obligatoire |
| Erreur | 22 | Categories | Catégorie inconnue |
| Avertissement | 31 | EventUrl | URL absente |

Le rapport est régénéré à chaque exécution.

---

# Intégration à Google Sheets

Le module s'intègre directement dans le tableur.

Un menu personnalisé permet d'accéder aux principales fonctions.

Exemple :

BadCalendar

- Vérifier les données
- Générer le rapport
- Publier
- Paramètres

Cette approche respecte les usages de Google Workspace.

---

# Évolutions envisagées

Le module pourra progressivement intégrer :

- contrôle des doublons ;
- contrôle des chevauchements de dates ;
- contrôle des villes via un référentiel ;
- détection des URLs invalides ;
- statistiques de qualité des données ;
- historique des contrôles ;
- publication en un clic.

---

# Hors périmètre

Le module ne prévoit pas :

- de formulaire de saisie ;
- d'éditeur graphique ;
- de gestion multi-utilisateur ;
- de workflow de validation ;
- de gestion des droits.

Ces fonctionnalités seraient disproportionnées au regard des besoins actuels.

---

# Vision long terme

Le module d'administration doit devenir un véritable assistant qualité.

Son objectif n'est pas de remplacer l'administrateur mais de détecter automatiquement les erreurs, les incohérences et les oublis avant qu'ils n'atteignent la WebApp.

La simplicité de Google Sheets est conservée, tandis que BadCalendar apporte progressivement des garanties de qualité comparables à celles d'une chaîne d'intégration continue (CI) dans un projet logiciel.

À terme, quel que soit le mode d'alimentation des données (saisie manuelle, import ou synchronisation), le même moteur de validation continuera d'assurer la fiabilité du calendrier.