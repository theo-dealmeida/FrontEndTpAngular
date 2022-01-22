import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {RouterModule, Routes} from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";

import {AppComponent} from './app.component';
import {AssignmentsComponent} from './assignments/assignments.component';
import {AssignmentDetailComponent} from './assignments/assignment-detail/assignment-detail.component';
import {AddAssignmentComponent} from './assignments/add-assignment/add-assignment.component';
import {EditAssignmentComponent} from './assignments/edit-assignment/edit-assignment.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";

import {RenduDirective} from './shared/rendu.directive';

import {AuthGuardAdmin} from './shared/auth-guard-admin.service';
import {AuthInterceptor} from "./shared/authconfig.interceptor";
import {AuthService} from "./shared/auth.service";
import {AuthGuardUser} from "./shared/auth-guard-user.service";

export function tokenGetter() {
  return localStorage.getItem("x-access-token");
}

const routes:Routes = [
  {
    path:"",
    component: AssignmentsComponent
  },
  {
    path:"home",
    component: AssignmentsComponent
  },
  {
    path:"add",
    component: AddAssignmentComponent
  },
  {
    path:"assignment/:id",
    component: AssignmentDetailComponent
  },
  {
    path:"assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate : [AuthGuardAdmin]
  },
  {
    path:"profile/:id",
    component: ProfileComponent,
    canActivate: [AuthGuardUser]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    FormsModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule,
    MatCheckboxModule, MatSlideToggleModule, HttpClientModule,
    RouterModule.forRoot(routes), MatSidenavModule, MatToolbarModule,
    MatDialogModule, MatSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }), ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
