import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "./user/User";
import {catchError, map, Observable, throwError} from "rxjs";
import {Router} from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:8010/api/auth";

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public currentUser: User = new User();
  loggedIn = false;

  register(user: User): Observable<any> {
    return this.http.post(this.url+'/register', {name: user.name, email: user.email, password: user.password})
      .pipe(
        catchError(this.handleError)
      )
  }

  logIn(user: User): Observable<any> {
    return this.http.post<any>(this.url + '/login', {email: user.email, password: user.password})
      .pipe(map((res: any) => {
        AuthService.setSession(this.jwtHelper.getTokenExpirationDate(res.token), res.token)
        if(res.auth === true) {
          this.loggedIn = true;
          this.getUserProfile().subscribe((res) => {
            this.currentUser = new User(res.email, res.password, res.name, res._id);
            this.router.navigate(['profile/' + res._id]);
          })
        }
      }))
  }

  getToken() {
    return localStorage.getItem('x-access-token');
  }

  isTokenExpired() {
    let tokenDate = new Date(localStorage.getItem('expires_at')!);
    if (tokenDate.getTime() < new Date().getTime()) {
      this.logOut()
      return true;
    } else{
      return false;
    }
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.url + `/me`, { headers: this.headers.set('x-access-token', this.getToken()!) }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  private static setSession(expiresIn: any, token: string ) {
    console.log(token);
    localStorage.setItem('x-access-token',token);
    localStorage.setItem("expires_at", expiresIn );
  }

  public getExpiration() {
    return localStorage.getItem("expires_at");
  }

  logOut(): Observable<any> {
    this.loggedIn = false;
    return this.http.get<any>(this.url + `/logout`).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  isAdmin() {
    // renvoie une promesse !
    return new Promise((resolve, reject) => {
      if (!this.isTokenExpired()) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  constructor(private http: HttpClient, public router: Router, public jwtHelper: JwtHelperService) { }
}
