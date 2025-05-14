import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FbAuthService {
  userData: any; // Save logged in user data
  userToken: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.afAuth.idToken.subscribe((userIdToken) => {
      this.userToken = userIdToken || '';
    });
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async InitApp() {
    const user = await this.isLoggedIn();
    if (user) {
      return this.authSvc
        .loginSubscriber(
          this.authSvc.loginInfo.email,
          this.authSvc.loginInfo.password
        )
        .toPromise()
        .then((res) => {
          this.userData = res;
          return true;
        })
        .catch(() => {
          this.logout();
          return true;
        });
    } else {
      return true;
    }
  }

  async signup(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  async resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  getSignInMethods(email: string) {
    return this.afAuth.fetchSignInMethodsForEmail(email);
  }
}
