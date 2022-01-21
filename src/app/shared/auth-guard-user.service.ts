import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUser implements CanActivate {

  constructor(private authService:AuthService,
              private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.authService.isLogged()
      .then(authentifie => {
        if(authentifie) {
          console.log("Authentifié, navigation autorisée")
          return true;
        }
        else {
          console.log("NON Authentifié, navigation non autorisée");

          this.router.navigate(["/home"]);

          return false;
        }
      })

  }

}
