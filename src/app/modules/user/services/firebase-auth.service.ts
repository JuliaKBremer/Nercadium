import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  user: User;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {
    let success = false;

    // tslint:disable-next-line:only-arrow-functions
    this.afAuth.signInWithEmailAndPassword(email, password).then(function(userI) {
      if (userI !== null) {
        success = true;
      }
      // tslint:disable-next-line:only-arrow-functions
    }).catch(function(error) {
      success = false;
      console.log(error.message);
    });

    return success;
  }

  async isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
  }

  async register(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    await this.router.navigate(['/user/login']);
  }
}


