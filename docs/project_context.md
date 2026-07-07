# PROJECT_CONTEXT.md

# BadCalendar

Version de référence : **v0.8.0**

Ce document décrit le contexte global du projet. Il constitue la référence à utiliser au début d'une nouvelle conversation avec ChatGPT afin de conserver la cohérence technique, fonctionnelle et architecturale du projet.

---

# 1. Vision du projet

BadCalendar est une WebApp Google Apps Script permettant de consulter le calendrier des compétitions de badminton jeunes.

Le projet est développé en solo.

Les objectifs sont :

- simplicité d'utilisation ;
- code facilement maintenable ;
- architecture claire ;
- documentation complète ;
- aucune dépendance externe ;
- préparation d'une V1.0 stable avant diffusion.

Le projet privilégie la qualité du code plutôt que la vitesse de développement.

---

# 2. Technologies

Backend

- Google Apps Script
- JavaScript ES6

Frontend

- HtmlService
- HTML
- CSS
- JavaScript Vanilla

Base de données

- Google Sheets

Aucun framework.

Aucune bibliothèque externe.

---

# 3. Architecture générale

Le projet est organisé en trois couches.

## Master Google Sheets

Source unique de vérité.

Contient uniquement les données métier.

Aucune donnée calculée.

Aucune donnée de présentation.

---

## Backend (Apps Script)

Responsable de :

- lecture du Master ;
- validation ;
- normalisation ;
- enrichissement ;
- calcul des statuts métier ;
- tri ;
- sérialisation JSON.

Le frontend ne recalcule jamais une règle métier.

---

## Frontend

Responsable de :

- affichage ;
- filtres ;
- rendu HTML ;
- interactions utilisateur.

Le frontend ne contient aucune logique métier.

---

# 4. Structure du projet

Backend

- Code.gs
- Config.gs
- EventService.gs

Frontend

- Index.html
- Style.html
- Filters.html
- Components.html
- Constants.html
- Utils.html
- Script.html

Documentation

/docs

- Vision.md
- Roadmap.md
- DataModel.md
- ReleaseNotes.md
- PROJECT_CONTEXT.md

---

# 5. Architecture logicielle

Le projet suit les principes suivants.

## Responsabilité unique

Chaque fichier possède une responsabilité clairement définie.

Exemple :

Components.html

→ uniquement le rendu HTML

Utils.html

→ uniquement les fonctions utilitaires

Constants.html

→ uniquement les constantes

Script.html

→ uniquement la logique de l'application

---

## Aucune logique métier dans le frontend

Les statuts sont calculés dans EventService.

Jamais dans le navigateur.

---

## Les constantes sont centralisées

Toutes les chaînes techniques et fonctionnelles sont regroupées dans Constants.html ou Config.gs.

Aucune valeur métier en dur.

---

## Les fonctions doivent rester courtes

Préférer plusieurs fonctions simples qu'une grosse fonction.

---

# 6. Modèle métier

Le Master contient uniquement :

- type
- portée
- titre
- dates
- ville
- catégories
- mode d'inscription
- dates d'inscription
- URL

Tout le reste est calculé.

---

# 7. Champs calculés

EventService calcule automatiquement :

- month
- monthNumber
- year
- categoriesArray
- eventStatus
- registrationStatus

---

# 8. États métier

eventStatus

- UPCOMING
- ONGOING
- FINISHED

registrationStatus

- UNKNOWN
- NOT_OPEN
- OPEN
- CLOSED

Les dates absentes sont représentées par :

null

Jamais par 9999.

---

# 9. Décisions importantes

## Bouton principal

Le bouton est affiché uniquement si eventUrl existe.

Son libellé dépend :

eventStatus

registrationStatus

Actuellement :

OPEN

→ S'inscrire

FINISHED

→ Voir les résultats

autres cas

→ Consulter le tournoi

Cette logique pourra évoluer sans modifier le modèle de données.

---

## Catégories

Le Master stocke :

Benjamin;Minime;Cadet

Le backend transforme en

categoriesArray

Le frontend n'effectue jamais ce traitement.

---

## Tri

Les événements sont triés dans EventService.

Le frontend ne trie jamais les données.

---

## Dates

Toutes les dates sont converties en ISO avant envoi au frontend.

Le frontend les reformate uniquement pour l'affichage.

---

# 10. Documentation existante

Le projet possède une documentation complète.

Vision

Décrit les objectifs à long terme.

Roadmap

Liste les évolutions futures.

DataModel

Décrit le modèle métier.

ReleaseNotes

Historique des versions.

---

# 11. Fonctionnalités déjà développées

## Backend

✔ lecture du Master

✔ normalisation

✔ enrichissement

✔ calcul des statuts

✔ tri

✔ sérialisation

---

## Frontend

✔ affichage des cartes

✔ regroupement par mois

✔ recherche texte

✔ filtre Type

✔ filtre Portée

✔ filtre Catégorie

✔ filtre Mois

✔ état vide

✔ responsive

✔ badges

✔ bouton dynamique

✔ messages d'inscription

---

# 12. Revue de code

Une revue complète a été réalisée en V0.8.

Les décisions prises :

suppression des duplications

centralisation des constantes

simplification des conditions

clarification des responsabilités

conservation temporaire des console.log et console.table jusqu'à la V1.0

---

# 13. Roadmap connue

Les principales évolutions identifiées sont :

UX

- barre de filtres repliable
- résumé des filtres actifs
- filtres multi-valeurs
- suppression rapide d'un filtre
- tri métier des listes déroulantes

Cartes

- badges de statut
- couleurs métier
- icônes homogènes

Navigation

- retour au mois courant
- navigation rapide par mois

Données

- organisateur
- gymnase
- Google Maps
- coordonnées GPS

Technique

- nettoyage final
- suppression des logs
- optimisation CSS
- optimisation JS

---

# 14. Principes de développement

Toujours privilégier :

- simplicité
- lisibilité
- robustesse
- faible couplage
- documentation
- évolutivité

Éviter :

- optimisation prématurée
- duplication
- logique métier côté frontend
- dépendances externes

---

# 15. Méthode de travail

Le projet avance par versions.

Chaque version est découpée en sous-issues.

Chaque sous-issue doit :

- être courte ;
- être testable indépendamment ;
- être validée avant de passer à la suivante.

Une version est clôturée uniquement lorsque :

- tous les tests sont validés ;
- la documentation est mise à jour ;
- la roadmap est mise à jour ;
- les release notes sont mises à jour.

---

# 16. Relation avec ChatGPT

ChatGPT agit comme :

- architecte logiciel ;
- reviewer de code ;
- développeur ;
- rédacteur de documentation ;
- garant de la cohérence du projet.

Il doit toujours privilégier :

- les évolutions incrémentales ;
- les refactorings sûrs ;
- la stabilité de l'architecture ;
- la maintenabilité à long terme.

Les propositions doivent respecter les décisions déjà prises et éviter les régressions.