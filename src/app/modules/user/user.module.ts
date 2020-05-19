import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserStartComponent } from './pages/user-start/user-start.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserLogoutComponent } from './pages/user-logout/user-logout.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

@NgModule({
  declarations: [UserStartComponent, UserLoginComponent, UserLogoutComponent, UserRegisterComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
