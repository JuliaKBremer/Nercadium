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
    this.userIsLoggedIn = loginService.isLoggedIn ? this.userIsLoggedIn = true : this.userIsLoggedIn = false;
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/user/logout']);
  }
}
