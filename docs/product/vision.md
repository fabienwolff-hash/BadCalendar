# Vision — BadCalendar

## Présentation

BadCalendar est une application Web développée avec Google Apps Script permettant de publier simplement le calendrier d'une saison sportive de badminton à partir d'une source de données facilement administrable.

L'objectif est de fournir une consultation moderne, responsive et toujours à jour des compétitions, stages et événements, sans nécessiter de développement spécifique lors de l'ajout ou de la modification d'un événement.

Chaque événement est présenté sous la forme d'une fiche synthétique conçue pour permettre aux utilisateurs d'identifier rapidement les informations essentielles, puis d'accéder aux informations complémentaires et aux actions disponibles uniquement lorsqu'elles sont utiles.

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

L'objectif n'est pas d'afficher un maximum d'informations, mais de présenter uniquement celles qui facilitent la décision de l'utilisateur au moment où il en a besoin.

---

# Objectifs

BadCalendar poursuit plusieurs objectifs.

## Promesse utilisateur

BadCalendar doit permettre à un utilisateur de retrouver en quelques secondes les informations essentielles d'un événement sportif sans avoir à consulter plusieurs documents ou plateformes.

La fiche événement doit permettre au parent de déterminer rapidement si une compétition correspond à son enfant, avant de lui proposer les informations complémentaires et les actions disponibles.

La consultation doit rester simple, rapide et compréhensible quel que soit le support utilisé.

---

## Aider à la prise de décision

BadCalendar est conçu comme un outil d'aide à la décision.

L'interface privilégie une lecture rapide des informations essentielles afin que les utilisateurs puissent identifier immédiatement les événements susceptibles de les intéresser.

Les informations secondaires ainsi que les actions disponibles sont volontairement regroupées dans une vue détaillée accessible à la demande.

Cette approche permet de conserver une interface légère, évolutive et particulièrement adaptée à une utilisation sur smartphone.

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

Les choix d'ergonomie, d'affichage et de navigation sont prioritairement pensés pour accompagner ce public dans le choix d'une compétition adaptée au profil de leur enfant.

---

# Principes directeurs

BadCalendar est conçu autour de quelques principes simples :

* aide à la prise de décision ;
* hiérarchisation des informations ;
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

Elles devront également respecter la philosophie de présentation des fiches événement : proposer une information progressive, où l'utilisateur décide d'abord, puis accède aux informations complémentaires et aux actions uniquement lorsqu'il en exprime le besoin.

---

# Vision de succès

Le succès de BadCalendar se mesure par sa capacité à fournir une information fiable, facilement accessible et maintenue sans effort technique particulier pour les responsables sportifs.

Une évolution est considérée comme réussie lorsqu'elle enrichit l'expérience utilisateur sans alourdir la consultation des événements.

Le succès se mesure également par la capacité du projet à évoluer progressivement, sans complexifier son architecture ni remettre en cause les choix techniques fondateurs.
