import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    UserRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UserModule { }
