import {Component, OnInit} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user/User";

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

  constructor( public authService: AuthService) { }

  ngOnInit(): void {
  }

  register() {

    let user = new User(this.email, this.password, this.name)

    this.authService.register(user).subscribe((res) => {
      if (res.result) {

      }
    })
  }
}
