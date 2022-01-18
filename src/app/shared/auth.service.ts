import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "./user/User";
import {catchError, map, Observable, throwError} from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  url = "http://localhost:8010/api/auth";


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  register(user: User): Observable<any> {
    return this.http.post(this.url+'/register', {name: user.name, email: user.email, password: user.password})
      .pipe(
        catchError(this.handleError)
      )
  }

  logIn(user: User) {
    return this.http.post<any>(this.url + '/login', {email: user.email, password: user.password})
      .subscribe((res: any) => {
        localStorage.setItem('x-access-token', res.token)
        console.log(this.getToken())
        if(res.auth === true) {
          this.getUserProfile().subscribe((res) => {
            this.currentUser = res;
            console.log(res)
            this.router.navigate(['profile/' + res._id]);
          })
        }
      })
  }

  getToken() {
    return localStorage.getItem('x-access-token');
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(this.url + `/me`, { headers: this.headers.set('x-access-token', this.getToken()!) }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  logOut(): Observable<any> {
    return this.http.get<any>(this.url + `/logout`).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    // renvoie une promesse !
    return isUserAdmin;
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

  constructor(private http: HttpClient, public router: Router) { }
}
