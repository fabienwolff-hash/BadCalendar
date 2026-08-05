# Glossaire — BadPlanner

## Objectif

Ce document centralise le vocabulaire officiel du projet.

Il sert à éviter les ambiguïtés entre le métier (badminton), le modèle de données, le backend et le frontend.

---

# A

## Application

La Web App Google Apps Script permettant de consulter le calendrier des compétitions jeunes.

Nom du projet :

**BadPlanner**

---

# B

## Badge

Élément graphique affiché sur une carte permettant d'identifier rapidement le type d'événement.

Exemples :

- TDJ
- TRJ
- TIJ
- Stage

Les badges sont exclusivement des éléments de présentation.

Ils ne sont jamais stockés dans le Master.

---

## Backend

Partie serveur du projet.

Elle est implémentée en Google Apps Script.

Responsabilités :

- lecture du Master ;
- validation des données ;
- enrichissement métier ;
- calcul des statuts ;
- préparation des données envoyées au frontend.

---

# C

## Carte (Card)

Bloc affiché dans la Web App représentant un Tournament.

Une carte contient notamment :

- le type ;
- la date ;
- le titre ;
- la ville ;
- les catégories ;
- le mode d'inscription ;
- l'état des inscriptions ;
- un bouton d'action.

---

## Catégorie

Classe d'âge concernée par un événement.

Valeurs officielles :

- Minibad
- Poussin
- Benjamin
- Minime
- Cadet
- Junior

Un événement peut concerner plusieurs catégories.

---

## CEJ

Circuit Elite Jeunes.

Type d'événement prévu dans le modèle mais pas encore exploité dans la saison actuelle.

---

## Championnat

Compétition officielle de type championnat.

---

## CDJ

Circuit Départemental Jeunes.

Compétition départementale.

---

## Configuration

Ensemble des constantes globales définies dans `Config.gs`.

Exemples :

- nom de l'application ;
- version ;
- identifiant du classeur ;
- constantes métier.

---

# D

## Desktop

Affichage destiné aux écrans d'ordinateur.

À partir de 900 px de largeur.

---

# E

## Event

Ancien modèle métier utilisé dans les premières versions de BadPlanner.

À partir de l'introduction de TournamentService, le modèle métier est structuré autour des entités :

- Tournament
- Program
- Site

Le terme "Event" reste utilisé uniquement pour certains objets techniques hérités de l'architecture initiale.

---

## EventService

Service historique chargé de la lecture des données du Master.

À terme, ses responsabilités seront progressivement transférées vers TournamentService afin de refléter le nouveau modèle métier.
---

## EventStatus

État d'un événement calculé automatiquement.

Valeurs possibles :

- UPCOMING
- ONGOING
- FINISHED

---

# F

## Filtre

Critère permettant de limiter les événements affichés.

Filtres actuels :

- recherche libre ;
- type ;
- portée ;
- catégorie ;
- mois.

---

## Frontend

Partie cliente de l'application.

Composée des fichiers HTML :

- Index
- Components
- Script
- Style
- Utils
- Constants

Le frontend ne contient aucune logique métier.

---

# G

## Gymnasium

Nom d'un équipement sportif.

Le gymnase est optionnel.

Lorsque le Tournament ne comporte qu'un seul site dans une ville, seul le nom de la ville est affiché.

---

# I

## Interclub

Compétition par équipes.

---

# M

## Master

Feuille Google Sheets contenant la totalité des données métier.

Il constitue la source unique de vérité (Single Source of Truth).

---

## Mode d'inscription

Modalité permettant de participer à un événement.

Valeurs actuelles :

- Libre
- Sur sélection

---

## Mois

Champ calculé utilisé pour :

- l'affichage ;
- le regroupement des cartes ;
- le filtre par mois.

Il n'existe pas dans le Master.

---

# P

## Portée

Représente le niveau sportif ou niveau de compétition.
Elle ne décrit pas la localisation géographique réelle.

Valeurs officielles :

- Départementale
- Régionale
- Inter-Régionale
- Nationale

---

## Promobad

Compétition d'initiation.

Accessible à des joueurs débutants.

---

## Program

Partie d'un Tournament correspondant à une discipline ou à un ensemble d'épreuves disputées selon un même programme sportif.

Un Tournament contient un ou plusieurs Programs.

Un Program possède notamment :

- une ou plusieurs dates ;
- une ou plusieurs disciplines ;
- un ou plusieurs Sites.

Exemple :

Championnat Départemental

Program 1
→ Simple

Program 2
→ Double

---

# R

## Registration

Ensemble des informations relatives à l'inscription à un Tournament.

Comprend notamment :

- le mode d'inscription ;
- la date d'ouverture ;
- la date de fermeture ;
- l'URL d'inscription.

---

## RegistrationStatus

État calculé des inscriptions.

Valeurs possibles :

- UNKNOWN
- NOT_OPEN
- OPEN
- CLOSED

---

## Roadmap

Document décrivant les évolutions prévues du projet.

Elle est organisée par versions et sous-issues.

---

# S

## Scope

Nom technique de la portée d'un événement.

Correspond au champ `scope`.

---

## Saison

Période sportive couverte par le calendrier.

Exemple :

2026–2027.

---

## Site

Lieu physique où se déroule un Program.

Un Site est défini par :

- une ville ;
- éventuellement un gymnase.

Un Program peut comporter plusieurs Sites.

---

## Stage

Événement de formation.

---

# T

## TDJ

Trophée Départemental Jeunes.

Compétition départementale.

---

## TIJ

Trophée Interrégional Jeunes.

Compétition interrégionale.

---

## Tournament

Entité métier principale de BadPlanner.

Un Tournament représente une compétition ou un événement sportif identifié de manière unique par un `TournamentId`.

Un Tournament regroupe un ou plusieurs Programs.

Les propriétés communes (titre, URL d'inscription, dates d'inscription, type, portée, etc.) sont portées par le Tournament.

Exemples :

- TRJ 3 Guichen Simple
- Championnat Départemental Jeunes
- Stage Départemental Minimes

---

## TournamentId

Identifiant fonctionnel d'un Tournament.

Toutes les lignes appartenant au même Tournament possèdent le même TournamentId.

Il permet de reconstruire le modèle métier à partir du Master.

---

## TRJ

Trophée Régional Jeunes.

Compétition régionale.

---

## Type

Nature d'un événement.

Exemples :

- TDJ
- TRJ
- TIJ
- Stage
- Championnat

---

# U

## UI

Constantes d'interface utilisateur définies dans `Constants.html`.

Exemples :

- textes des boutons ;
- messages ;
- libellés ;
- filtres.

---

## Utils

Ensemble des fonctions utilitaires du frontend.

Exemples :

- formatage des dates ;
- génération du bouton ;
- calcul du texte des inscriptions.

---

# V

## Version

Numéro de version du projet.

Convention utilisée :

MAJEUR.MINEUR.CORRECTIF

Exemples :

- v0.7.0
- v0.8.0
- v0.9.0

---

# W

## Web App

Application Google Apps Script publiée.

Elle constitue l'interface utilisateur de BadPlanner.

---

# Principes de vocabulaire

Les termes suivants sont considérés comme les références officielles du projet.

| Terme | À utiliser | À éviter |
|---------|------------|-----------|
| Événement | ✅ | Compétition (trop restrictif) |
| Portée | ✅ | Niveau |
| Catégorie | ✅ | Classe d'âge |
| Type | ✅ | Nature |
| Master | ✅ | Base de données |
| Carte | ✅ | Tuile |
| Backend | ✅ | Serveur |
| Frontend | ✅ | Interface |
| RegistrationStatus | ✅ | État des inscriptions |
| EventStatus | ✅ | État du tournoi |

---

# Abréviations

| Abréviation | Signification |
|--------------|---------------|
| FIB | Fédération / Ligue organisatrice (selon contexte du projet) |
| TDJ | Trophée Départemental Jeunes |
| TRJ | Trophée Régional Jeunes |
| TIJ | Trophée Interrégional Jeunes |
| CDJ | Circuit Départemental Jeunes |
| CEJ | Circuit Elite Jeunes |
| UI | User Interface |
| GAS | Google Apps Script |
| SSOT | Single Source of Truth |
| UX | User Experience |
| URL | Uniform Resource Locator |
