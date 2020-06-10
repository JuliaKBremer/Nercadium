import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule, FirebaseApp} from '@angular/fire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-start',
  templateUrl: './user-start.component.html',
  styleUrls: ['./user-start.component.css']
})
export class UserStartComponent implements OnInit {
  userIsLoggedIn = false;

  constructor(private loginService: FirebaseAuthService, private firebase: FirebaseApp, private router: Router) {
    /*console.log(this.loginService.isLoggedIn);
    this.userIsLoggedIn = this.loginService.isLoggedIn ? this.userIsLoggedIn = true : this.userIsLoggedIn = false;*/
  }

  async ngOnInit() {
    this.userIsLoggedIn = await this.loginService.isLoggedIn();
  }

  async logout() {
    await this.router.navigate(['/user/logout']);
  }
}
