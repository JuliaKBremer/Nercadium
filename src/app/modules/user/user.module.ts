import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {AngularFireModule, FirebaseApp} from '@angular/fire';

import { UserRoutingModule } from './user-routing.module';
import { UserStartComponent } from './pages/user-start/user-start.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserLogoutComponent } from './pages/user-logout/user-logout.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserResetPwComponent } from './pages/user-reset-pw/user-reset-pw.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FirebaseAuthService} from './services/firebase-auth.service';

const firebaseConfig = {
  apiKey: 'AIzaSyCufvS4X-dH7MGUcGThI7Cl5LHWip_zPMU',
  authDomain: 'nercadiu.firebaseapp.com',
  databaseURL: 'https://nercadiu.firebaseio.com',
  projectId: 'nercadiu',
  storageBucket: 'nercadiu.appspot.com',
  messagingSenderId: '960478451787',
  appId: '1:960478451787:web:3381cafa59c1c04250d5ce'
};

@NgModule({
  declarations: [UserStartComponent, UserLoginComponent, UserLogoutComponent, UserRegisterComponent, UserResetPwComponent],
  providers: [ FirebaseAuthService ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class UserModule {
}
