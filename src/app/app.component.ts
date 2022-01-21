import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Application de gestion des assignments';

  constructor(
    public authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.authService.getToken())
    if (localStorage.getItem('x-access-token') != 'null' && !this.authService.isTokenExpired()) {
      this.authService.loggedIn = true;
      this.authService.getUserProfile();
    }
  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
    })

  }

  logout() {
    this.authService.logOut().subscribe((res) => {
          localStorage.setItem('x-access-token', res.token);
    });
  }

  remplirBD() {
    //this.assignmentsService.peuplerBD();

    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log('LA BASE EST ENTIEREMENT REMPLIE AVEC LES DONNEES DE TEST');

      // replaceUrl = true = force le refresh, même si
      // on est déjà sur la page d’accueil
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }
}
