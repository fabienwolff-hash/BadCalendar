# Vision — BadCalendar

## Présentation

BadCalendar est une application Web développée avec Google Apps Script permettant de publier simplement le calendrier d'une saison sportive de badminton à partir d'une source de données facilement administrable.

L'objectif est de fournir une consultation moderne, responsive et toujours à jour des compétitions, stages et événements, sans nécessiter de développement spécifique lors de l'ajout ou de la modification d'un événement.

BadCalendar est un produit de consultation. Son objectif n'est pas de gérer l'organisation des compétitions, les inscriptions ou les résultats, mais de faciliter l'accès à l'information pour ses utilisateurs.

Le projet est volontairement centré sur la simplicité d'administration, la qualité des données, la maintenabilité du code et la pérennité de la solution.

---

# Problème à résoudre

Les calendriers sportifs sont souvent diffusés sous forme de documents PDF, tableaux Excel ou pages Web statiques.

Ces supports sont difficiles à maintenir, rapidement obsolètes et peu adaptés à une consultation sur mobile.

Les familles doivent souvent consulter plusieurs sources pour retrouver les informations essentielles :

* date ;
* lieu ;
* catégories concernées ;
* modalités d'inscription ;
* lien vers la compétition.

BadCalendar vise à centraliser ces informations dans une interface unique, simple, toujours à jour et adaptée à une consultation rapide.

---

# Objectifs

BadCalendar poursuit plusieurs objectifs.

## Promesse utilisateur

BadCalendar doit permettre à un utilisateur de retrouver en quelques secondes les informations essentielles d'un événement sportif sans avoir à consulter plusieurs documents ou plateformes.

La consultation doit rester simple, rapide et compréhensible quel que soit le support utilisé.

---

## Simplifier la diffusion des calendriers

Les calendriers sportifs sont souvent diffusés sous forme de fichiers PDF, de tableaux ou de pages Web difficiles à maintenir.

BadCalendar propose une consultation dynamique, filtrable et adaptée aussi bien aux ordinateurs qu'aux smartphones.

---

## Simplifier l'administration

L'ensemble des événements et des référentiels métier est administré dans un unique fichier Google Sheets.

Les responsables n'ont pas besoin de connaître le fonctionnement technique de l'application.

Une simple mise à jour des données suffit à actualiser le calendrier publié.

Le module d'administration permet de contrôler la qualité du Master avant toute utilisation des données.

Les listes métier (types de compétitions, catégories, portées, modes de participation, etc.) sont administrables sans modification du code.

---

## Garantir la qualité des données

La qualité des informations constitue un objectif majeur du projet.

Avant toute publication, les données sont validées afin de détecter les erreurs, les incohérences et les valeurs non conformes aux référentiels métier.

Le Master demeure l'unique source de vérité du système.

---

# Public cible

Bien que BadCalendar puisse être utilisée par l'ensemble des acteurs d'une organisation sportive, la conception du produit privilégie avant tout les besoins de consultation des parents et des jeunes licenciés.

---

# Principes directeurs

BadCalendar est conçu autour de quelques principes simples :

* simplicité d'utilisation ;
* consultation rapide ;
* priorité à l'usage mobile ;
* informations toujours à jour ;
* faible charge de maintenance ;
* qualité des données ;
* référentiels administrables ;
* architecture simple et modulaire ;
* évolutivité ;
* documentation maintenue.

---

# Vision à long terme

À terme, BadCalendar a vocation à devenir une plateforme générique de publication de calendriers sportifs.

Le Google Sheets Master reste le point d'entrée unique des données.

L'application s'appuie sur des services spécialisés, chacun responsable d'un domaine fonctionnel clairement identifié :

* lecture des événements ;
* validation des données ;
* lecture des référentiels métier ;
* enrichissement du modèle ;
* génération des rapports ;
* présentation des informations.

Cette séparation des responsabilités garantit la qualité des données, facilite les évolutions et limite les impacts des futurs développements.

Les futures évolutions (Google Maps, filtres géographiques, calendrier intelligent, etc.) devront s'appuyer sur ce socle sans remettre en cause son architecture.

---

# Vision de succès

Le succès de BadCalendar se mesure par sa capacité à fournir une information fiable, facilement accessible et maintenue sans effort technique particulier pour les responsables sportifs.

Le succès se mesure également par la capacité du projet à évoluer progressivement, sans complexifier son architecture ni remettre en cause les choix techniques fondateurs.
