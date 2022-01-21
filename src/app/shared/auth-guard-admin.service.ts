import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private authService:AuthService,
    private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isAdmin()
    .then(authentifie => {
      if(authentifie) {
        console.log("Authentifié en tant qu'admin, navigation autorisée")
        return true;
      }
      else {
        console.log("NON Authentifié en tant qu'admin, navigation non autorisée");

        this.router.navigate(["/home"]);

        return false;
      }
    })

  }

}
