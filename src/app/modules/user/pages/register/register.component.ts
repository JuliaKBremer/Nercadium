import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService} from '../../services/firebase-auth.service';
import { Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private fireService: FirebaseAuthService) { }

  ngOnInit() {
  }

  async userSubmittedForm() {
    const registerProcess = await this.fireService.register(this.registerForm.get('email').value, this.registerForm.get('password').value);
    await this.router.navigate(['/user/login']);
  }
}
