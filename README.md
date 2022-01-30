# AssignmentApp

Pour start l'application, utiliser "ng serve" pour le coté client et "npm run start" pour le coté serveur.

Le client est hébergé sur Heroku à l'adresse suivante : https://client-intense2022.herokuapp.com/
Le serveur : https://back-angular2022.herokuapp.com/

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

Ajout d'un filtre rendu/non rendu

Utilisation d'un Formulaire de type Stepper

## Inscription

Pour s'inscrire, utiliser le bouton s'inscrire en haut à droite de l'écran, dans la toolbar.

Renseigner une adresse mail, un mot de passe et un nom qui n'est pas "admin" pour s'inscrire.

Détails non demandés :

- Gestion des validations de format email.
- Afficher/masquer le mot de passe.
- Ne pas pouvoir saisir admin en nom.
- Vérification du remplissage des champs requis avant inscription
- Connexion immédiate après l'inscription.

## Connexion

Après s'être inscrit, vous pouvez vous déconnecter puis vous reconnecter avec les identifiants saisis.

Pour se connecter en tant qu'admin :

- email : admin@gmail.com
- mdp : admin

Nous avons également mis en place la connexion avec JWT. Lors de la connexion, un token est attribué à l'utilisateur.
L'expiration et l'id de celui-ci peut-être visible dans le profil de l'utilisateur.

Le token expire 24 heures après la dernière connexion, ou si l'utilisateur se déconnecte. Lorsque l'utilisateur change
de page après que le token ait expiré, il sera automatiquement déconnecté.

De plus, le mot de passe de l'utilisateur n'est jamais remonté par le serveur, par question de sécurité.

## Liste des assignments

La liste, affiché dans une mat-table, affiche la liste de tous les assignments présents en base.

Il est possible de cliquer sur une ligne de la liste pour avoir différents détails sur l'assignment.

De plus, il est possible de filtrer sur le nom des assignments grâce au champ input 'filtrer'.

Les cases à cocher "Rendu" et "non rendus" permettent d'afficher les assignments rendus ou non rendus seulement.

Lorsque les tables Assignments, Matières et Eleves sont vides, les bouton "Peupler Assignments", "Peupler Eleves" et
Peupler matières" apparaissent sous la liste.

## Ajouter un assignment

Un formulaire stepper permet d'ajouter un assignment.

## Détail d'un assignment

Il est toujours possible de modifier un assignment si l'utilisateur est admin.

## Profil

Le profil affiche simplement le nom de l'utilisateur, son adresse mail, la durée de validité du token et son id.

## Matière

Depuis le détail d'un assignment, il est possible de se rendre sur la page d'une matière sur laquelle sera visible une
image de la matière et une photo du prof.

## Backend

Le backend permet de gérer les JWT, de gérer la connexion avec la base pour les différentes collections (Assignments,
User, eleves, matières)



