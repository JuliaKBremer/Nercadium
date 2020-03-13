import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userIsLoggedIn = false;

  constructor(private loginService: FirebaseAuthService, private router: Router) {
    console.log(this.loginService.isLoggedIn);
    this.userIsLoggedIn = this.loginService.isLoggedIn ? this.userIsLoggedIn = true : this.userIsLoggedIn = false;
  }

  ngOnInit() {
  }

  async logout() {
    await this.router.navigate(['/user/logout']);
  }
}
