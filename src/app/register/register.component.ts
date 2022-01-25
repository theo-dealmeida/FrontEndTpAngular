import {Component, OnInit} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  email= "";
  password="";
  name="";

  registerSection = new FormGroup({
    emailValidation: new FormControl('', [Validators.required, Validators.email]),
    nameValidation : new FormControl('', [Validators.required]),
    passwordValidation : new FormControl('', [Validators.required])
  });


  constructor( public authService: AuthService, private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

  register() {

    let user = new User(this.email, this.password, this.name)

    if (this.name === 'admin') {
     this.registerSection.get('nameValidation')!.setErrors({'incorrect': true});
    }

    if (this.registerSection.get('emailValidation')!.valid && this.registerSection.get('passwordValidation')!.valid && this.registerSection.get('nameValidation')!.valid) {
      this.authService.register(user).subscribe((res) => {
        let user = new User(this.email, this.password)

        this.authService.logIn(user).subscribe(res => {
          if (this.authService.loggedIn) {
            this.dialogRef.close(true);
          }
        });
      })
    } else {

    }
  }

  getErrorEmailMessage() {
    if (this.registerSection.get('emailValidation')!.hasError('required')) {
      return 'Veuillez saisir une valeur';
    }

    return this.registerSection.get('emailValidation')!.hasError('email') ? 'Email invalide' : '';
  }

  getErrorPasswordMessage() {
      return 'Veuillez saisir une valeur';
  }

  getErrorNameMessage() {
    if (this.registerSection.get('nameValidation')!.hasError('required')) {
      return 'Veuillez saisir une valeur';
    }

    return this.registerSection.get('nameValidation')!.hasError('incorrect') ? 'Le nom "admin" est interdit' : '';
  }
}
