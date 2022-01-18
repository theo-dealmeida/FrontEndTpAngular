import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user/User";
import {JwtHelperService} from "@auth0/angular-jwt";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hide = true;

  currentUser: User = new User();

  expDate: any;
  token: any;


  constructor(private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService, public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {

    this.token =  localStorage.getItem('x-access-token')!;

    this.expDate = this.jwtHelper.getTokenExpirationDate(this.token)

    this.authService.getUserProfile().subscribe(res => {
      this.currentUser = res;
    })

  }
}
