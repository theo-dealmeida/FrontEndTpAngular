import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  logIn() {
    // typiquement, on devrait prendre en paramètres
    // login et password, vérifier qu'ils sont valides
    // en utilisant un web service en ligne (soit via une BD)
    // soit via oAuth, etc.

    // Nous pour le moment, on simule...
    this.loggedIn = true;
  }

  logOut() {
    // appelée typiquement par le bouton de deconnexion

    this.loggedIn = false;
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    // renvoie une promesse !
    return isUserAdmin;
  }

  constructor() { }
}
