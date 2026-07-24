# New Features

# Objectif

Le système de nouveautés permet de mettre en évidence les nouveaux tournois ajoutés à BadCalendar.

Il aide les parents à identifier rapidement les compétitions récemment publiées sans avoir à parcourir l'ensemble du calendrier.

---

# Philosophie

Une nouveauté correspond exclusivement à l'apparition d'un nouveau tournoi.

L'objectif est d'attirer l'attention sur les nouvelles opportunités de compétition.

Une modification d'un tournoi existant n'est pas considérée comme une nouveauté.

Cette règle garantit un comportement simple et prévisible.

---

# Définition d'une nouveauté

Un tournoi est considéré comme nouveau lorsque :

- une nouvelle ligne est ajoutée dans le Master ;
- un timestamp de création est automatiquement renseigné.

Exemples :

✅ Nouveau TDJ ajouté

✅ Nouveau stage ajouté

✅ Nouveau TRJ ajouté

---

Les cas suivants ne sont **pas** des nouveautés :

- modification du lieu ;
- modification des catégories ;
- changement de date limite d'inscription ;
- correction d'une faute de frappe ;
- ajout d'un lien BadNet ;
- modification de la salle.

Le tournoi conserve sa date de création d'origine.

---

# Date de création

Chaque tournoi possède un champ dédié :

```text
CreatedAt
```

Cette date est renseignée automatiquement lors de la création de la ligne dans le Master.

Elle n'est jamais modifiée par la suite.

---

# Génération automatique

Le timestamp est créé automatiquement par un déclencheur Apps Script.

Principe :

```text
Nouvelle ligne

↓

CreatedAt vide

↓

Timestamp ajouté

↓

Valeur conservée définitivement
```

Le système fonctionne quel que soit le mode de saisie :

- Google Sheets Desktop ;
- Google Sheets Android ;
- Google Sheets iOS.

Aucune intervention manuelle n'est nécessaire.

---

# Calcul d'une nouveauté

Au chargement des données, le backend compare :

- la date actuelle ;
- le champ `CreatedAt`.

Un tournoi est considéré comme nouveau si son ancienneté est inférieure à la durée configurée.

---

# Durée d'affichage

La durée de visibilité du badge est configurable.

Valeur par défaut :

```text
30 jours
```

Après cette période, le tournoi reste affiché normalement mais n'est plus considéré comme une nouveauté.

---

# Affichage

Les nouveautés sont signalées par un badge :

```text
Nouveau
```

Le badge est visible directement sur la carte repliée.

Il reste également visible lorsque la carte est dépliée.

---

# Position

Le badge est placé dans la partie supérieure de la carte.

Il doit être immédiatement identifiable sans masquer les informations principales.

---

# Comportement

Le badge est uniquement informatif.

Il ne modifie pas :

- le tri des compétitions ;
- les filtres ;
- les actions disponibles.

Les compétitions restent classées chronologiquement.

---

# Usage Metrics

L'affichage du badge ne génère aucun événement.

En revanche, les consultations de ces compétitions peuvent être analysées grâce à :

```text
tournament_opened
```

Les métriques permettront de vérifier si les nouveautés attirent davantage les utilisateurs.

---

# Configuration

Les paramètres suivants sont configurables :

- durée du badge ;
- libellé du badge.

La logique de calcul reste identique.

---

# Cas particuliers

## Ancien tournoi importé

Si un ancien tournoi est ajouté dans le Master aujourd'hui, il sera considéré comme nouveau.

La nouveauté correspond à sa date d'ajout dans BadCalendar, et non à la date réelle de la compétition.

---

## Suppression puis recréation

Si un tournoi est supprimé puis recréé :

- un nouveau timestamp est généré ;
- il redevient une nouveauté.

---

## Modification d'un tournoi

Toute modification conserve le timestamp d'origine.

Le statut de nouveauté ne change pas.

---

# Architecture

Le calcul est réalisé côté backend.

Le frontend reçoit directement un indicateur :

```text
isNew
```

Le frontend n'a donc aucune logique métier liée aux nouveautés.

Il se contente d'afficher le badge lorsque cette propriété est vraie.

---

# Hors périmètre

La version 1.0 ne comprend pas :

- suivi des nouveautés par utilisateur ;
- mémorisation des nouveautés déjà vues ;
- notifications ;
- classement spécifique des nouveautés ;
- filtre "Afficher uniquement les nouveautés".

Ces évolutions pourront être étudiées dans une version ultérieure.

---

# Critères d'acceptation

Le système est considéré comme conforme lorsque :

- chaque nouveau tournoi reçoit automatiquement un timestamp ;
- le timestamp n'est jamais modifié ;
- les modifications d'un tournoi existant ne créent pas de nouveauté ;
- le badge est affiché pendant la durée configurée ;
- le backend calcule la propriété `isNew` ;
- le frontend affiche simplement le badge correspondant.
