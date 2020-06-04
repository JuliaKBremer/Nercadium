import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserStartComponent } from './pages/user-start/user-start.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserLogoutComponent} from './pages/user-logout/user-logout.component';

const routes: Routes = [
  { path: '', component: UserStartComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'logout', component: UserLogoutComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: '**', component: UserStartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
