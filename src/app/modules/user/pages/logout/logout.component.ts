import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {


  constructor(private loginService: FirebaseAuthService, private router: Router) {
  }

  async ngOnInit() {
    await this.loginService.logout();
    await this.router.navigate(['/user']);
  }
}
