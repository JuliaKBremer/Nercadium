import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginFailed = false;

  constructor(private fb: FormBuilder, private loginService: FirebaseAuthService, private router: Router) {
    this.checkIfUserLoggedInAndRedirect();
  }

  ngOnInit() {
  }

  async userSubmittedForm() {
    /* Process the input data and submit */
    await this.loginService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    this.checkIfUserLoggedInAndRedirect();
  }

  checkIfUserLoggedInAndRedirect() {
    if (this.loginService.isLoggedIn) {
      this.router.navigate(['user']);
    }
  }
}
