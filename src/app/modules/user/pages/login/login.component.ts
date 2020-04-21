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
    email: ['', [Validators.required, Validators.email, Validators.min(6)]],
    password: ['', [Validators.required, Validators.min(6)]]
  });

  errorMessage: string = null;
  constructor(private fb: FormBuilder, private fireService: FirebaseAuthService, private router: Router) {
  }

  ngOnInit() {
  }

  async userSubmittedForm() {
    this.errorMessage = null;

    const loginProcess = await this.fireService
      .login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(async value => {
        await this.router.navigate(['/user']);
      })
      .catch(err => {
        this.handleErrorOnCatch(err);
      });
  }

  handleErrorOnCatch(err: string) {
    console.log(err);
    /*switch(err) {
      case: '':
        break;
    }*/
  }

  async checkIfUserLoggedInAndRedirect() {
    if (this.fireService.isLoggedIn) {
     await this.router.navigate(['user']);
    }
  }

  isFieldValid(field) {
    return !(field.invalid && field.dirty && field.touched);
  }
}
