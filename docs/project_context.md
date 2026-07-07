# PROJECT_CONTEXT.md

# BadCalendar

Version de référence : **v0.9.0**

Ce document décrit le contexte global du projet. Il constitue la référence à utiliser au début d'une nouvelle conversation avec ChatGPT afin de conserver la cohérence technique, fonctionnelle et architecturale du projet.

---

# 1. Contexte du projet

BadCalendar est une WebApp Google Apps Script permettant de consulter le calendrier des compétitions jeunes de badminton.

Le projet est développé en solo.

La priorité est donnée à :
- la simplicité ;
- la maintenabilité ;
- la cohérence documentaire ;
- les évolutions incrémentales.

L'objectif est d'atteindre une V1.0 stable avant toute diffusion.

---

# 2. Règles de réponse

Lorsque tu proposes une évolution :

- privilégier les petites sous-issues ;
- éviter les gros refactorings ;
- justifier les arbitrages ;
- distinguer anomalies, améliorations et optimisations ;
- respecter l'architecture existante ;
- éviter les dépendances externes ;
- documentation synchronisée avec le code ;
- privilégier la cohérence documentaire et éviter les duplications entre documents ;

---

# 3. Architecture résumée

Architecture actuelle

Google Sheets
   ↓
EventService
   ↓
JSON
   ↓
Frontend

Responsabilités :

Backend :
- lecture
- validation
- enrichissement
- calcul métier

Frontend :
- affichage
- filtrage
- interactions

Le frontend ne recalcule jamais une règle métier.

---

# 4. Etat actuel du projet

Version actuelle : V0.9

Fonctionnalités déjà présentes :
- recherche
- filtres
- filtre portée
- barre repliable
- résumé des filtres
- état vide
- écran de chargement
- écran d'erreur

Travail en cours :
- gestion des événements terminés
- revue documentaire

---

# 5. Cartographie documentaire

Références documentaires

Vision produit :
vision.md

Architecture :
architecture.md

Modèle de données :
data-model.md

Règles métier :
business_rules.md

Spécification fonctionnelle :
function_specification.md

UX :
ui_guidelines.md

Rôle et comportement de l'IA :
role_IA.md


Décisions :
decisions.md

Roadmap :
roadmap.md

Historique :
release-notes.md