import {Component, HostListener, OnInit} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user/User";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  email = "";
  password ="";

  loginSection = new FormGroup({
    emailValidation: new FormControl('', [Validators.required, Validators.email]),
    passwordValidation : new FormControl('', [Validators.required])
  });

  constructor(public authService: AuthService, private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  login() {
    let user = new User(this.email, this.password)

    if (this.loginSection.get('emailValidation')!.valid && this.loginSection.get('passwordValidation')!.valid) {
      this.authService.logIn(user).subscribe(res => {
        if (this.authService.loggedIn) {
          this.dialogRef.close(true);
        }
      }, err => {
        if (err.status === 401) {
          this.loginSection.get('passwordValidation')!.setErrors({'incorrect': true});
        }

        if (err.status === 404) {
          this.loginSection.get('emailValidation')!.setErrors({'incorrect': true});
        }
      });
      console.log(localStorage.getItem('x-access-token'));
    }
  }

  getErrorEmailMessage() {
    if ( this.loginSection.get('emailValidation')!.hasError('required')) {
      return 'Veuillez saisir une valeur';
    }

    if ( this.loginSection.get('emailValidation')!.hasError('incorrect')) {
      return 'Utilisateur inconnu'
    }

    return  this.loginSection.get('emailValidation')!.hasError('email') ? 'Email invalide' : '';
  }

  getErrorPasswordMessage() {

    if ( this.loginSection.get('passwordValidation')!.hasError('required')) {
      return 'Veuillez saisir une valeur';
    }
      return 'Mot de passe incorrect'
  }
}

