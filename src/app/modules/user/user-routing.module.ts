import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {UserComponent} from './pages/user/user.component';
import {RegisterComponent} from './pages/register/register.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
