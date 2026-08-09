[MEDIUM]
TournamentService concentre plusieurs responsabilités

Responsabilités :
- lecture des données
- normalisation
- construction du modèle métier
- calcul des statuts
- formatage d'affichage
- sérialisation

Impact :
La complexité fonctionnelle est concentrée dans un seul composant.
Les évolutions futures risquent d'augmenter le coût des modifications.

Coût de correction :
Moyen à élevé.

Priorité :
Moyenne après mise en production.

[MEDIUM]
Objet App centralise plusieurs domaines

Domaines observés :
- état applicatif
- filtres
- rendu
- bootstrap
- analytics

Impact :
Chaque nouvelle fonctionnalité a tendance à être ajoutée dans App.
Risque d'effet "God Object" sur le long terme.

Coût de correction :
Moyen.

Priorité :
Moyenne uniquement si la croissance fonctionnelle continue.

[LOW]
Absence de tests automatisés

Impact :
Les régressions sont détectées par validation manuelle.

Coût de correction :
Élevé.

Priorité :
Faible avant production.
Moyenne après stabilisation