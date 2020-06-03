import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserStartComponent } from './pages/user-start/user-start.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserLogoutComponent } from './pages/user-logout/user-logout.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserResetPwComponent } from './pages/user-reset-pw/user-reset-pw.component';

@NgModule({
  declarations: [UserStartComponent, UserLoginComponent, UserLogoutComponent, UserRegisterComponent, UserResetPwComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
