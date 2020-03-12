import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import {PlayRoutingModule} from './user-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule} from '@angular/material';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [LoginComponent, UserComponent, RegisterComponent, LogoutComponent],
  imports: [
    CommonModule,
    PlayRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class UserModule { }
