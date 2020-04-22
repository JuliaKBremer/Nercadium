import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import {PlayRoutingModule} from './user-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatButtonModule, MatFormFieldDefaultOptions, MatInputModule} from '@angular/material';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [LoginComponent, UserComponent, RegisterComponent, LogoutComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    PlayRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ], providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class UserModule { }
