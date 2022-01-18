import {Component, HostListener, OnInit} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user/User";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  email = "";
  password ="";

  constructor(public authService: AuthService, private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  login() {
    let user = new User(this.email, this.password)

    this.authService.logIn(user).subscribe( res => {
      if (this.authService.loggedIn) {
        this.dialogRef.close(true);
      }
      }
    );

    console.log(localStorage.getItem('x-access-token'));



  }
}

