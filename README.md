# AssignmentApp

Pour start l'application, utiliser "ng serve" ou "npm run start"

## Inscription

Pour s'inscrire, utiliser le bouton s'inscrire en haut à droite de l'écran, dans la toolbar.

Renseigner une adresse mail, un mot de passe et un nom qui n'est pas "admin" pour s'inscrire.

Si 

## Ce qui a été implémenté

La gestion des identifiants/mdp sont gérés par les JWT
Le compte admin permet de modifier les assignments

Les propriétés implémentées :
- L'auteur (nom de l'élève)
- La matière
- Une image associée à chaque matière et une photo du prof
- Une Note sur 20 et on ne peut marquer "rendu" un Assignment qui n'a pas été noté.

Les améliorations de l'affichage des Assignments :
- Utilisation d'une table angular material
- Une vue "détails" 
- Les formulaires d'ajout et de détails proposeront un choix fixe de matières

Ajout d'un filtre rendu/non rendue 
Utilisation d'un Formulaire de type Stepper

