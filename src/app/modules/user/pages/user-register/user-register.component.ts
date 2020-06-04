import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService} from '../../services/firebase-auth.service';
import { Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.min(6)]],
    password: ['', [Validators.required, Validators.min(6)]]
  });

  errorMessage: string = null;
  constructor(private fb: FormBuilder, private router: Router, private fireService: FirebaseAuthService) { }

  ngOnInit() {
  }

  async userSubmittedForm() {
    this.errorMessage = null;

    const registerProcess = await this.fireService
      .register(this.registerForm.get('email').value, this.registerForm.get('password').value)
      .then(async value => {
        await this.router.navigate(['/user/login']);
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

  isFieldValid(field) {
    return !(field.invalid && field.dirty && field.touched);
  }
}
