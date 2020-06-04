import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FirebaseAuthService} from '../../services/firebase-auth.service';
import {errorObject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-user-reset-pw',
  templateUrl: './user-reset-pw.component.html',
  styleUrls: ['./user-reset-pw.component.css']
})
export class UserResetPwComponent implements OnInit {
  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.min(6)]],
  });
  errorMessage: string = null;
  successSending = null;

  constructor(private fb: FormBuilder, private router: Router, private fireService: FirebaseAuthService) { }

  ngOnInit() {
  }

  async userSubmittedForm() {
    this.errorMessage = null;

    if (!this.isFieldValid(this.resetPasswordForm.controls.email)) {
      return true;
    }
    if (this.successSending === true) {
      return true;
    }

    const loginProcess = await this.fireService.afAuth
      .sendPasswordResetEmail(this.resetPasswordForm.get('email').value)
      .then(async value => {
        this.successSending = true;
      })
      .catch(err => {
        this.successSending = false;
        this.handleErrorOnCatch(err.message);
      });
  }

  handleErrorOnCatch(err: string) {
    this.errorMessage = err;
  }

  isFieldValid(field) {
    return !(field.invalid && field.dirty && field.touched);
  }
}
