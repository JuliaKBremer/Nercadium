import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.min(6)]],
    password: ['', [Validators.required, Validators.min(6)]]
  });

  errorMessage: string = null;
  constructor(private fb: FormBuilder, private fireService: FirebaseAuthService, private router: Router) {
  }

  ngOnInit() {
  }

  async userSubmittedForm(): Promise<boolean> {
    this.errorMessage = null;

    if (this.loginForm.controls.email.invalid || this.loginForm.controls.password.invalid) {
      this.errorMessage = 'Überprüfe bitte deine Eingaben, diese sind nicht valide.';
      return true;
    }

    const loginProcess = await this.fireService
      .login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(async value => {
        this.checkIfUserLoggedInAndRedirect();
      })
      .catch((error: firebase.FirebaseError) => {
        this.handleErrorOnCatch(error.message);
      });
    return true;
  }

  handleErrorOnCatch(err) {
    this.errorMessage = 'Es ist ein Problem aufgetreten, versuche es bitte (später) erneut.';
    if (err.includes('EMAIL_NOT_FOUND')) {
      this.errorMessage = 'Diese E-Mail ist bei uns nicht hinterlegt, lege dir doch ein Konto an.';
    }
  }
  async checkIfUserLoggedInAndRedirect() {
    if (await this.fireService.isLoggedIn) {
     return true;
    }
    this.errorMessage = 'Leider trat ein Fehler auf und wir konnten dich nicht einloggen.';
  }

  isFieldValid(field) {
    return !(field.invalid && field.dirty && field.touched);
  }
}
