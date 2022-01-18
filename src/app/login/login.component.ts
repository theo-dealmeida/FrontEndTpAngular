import {Component, OnInit} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  email = "";
  password ="";
  closeDialog = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {

    console.log(this.email);

    let user = new User(this.email, this.password)

    this.authService.logIn(user);
    if (localStorage.getItem('x-access-token')) {
      this.closeDialog = true;
    }


  }
}

