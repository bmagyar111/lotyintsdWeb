import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email: string = "";
  authState$: Observable<any>;
  private authStateSnapshot: any = null;

  constructor(private auth: AngularFireAuth, private router: Router)
  {
    this.authState$ = this.auth.authState;

    this.auth.authState.subscribe(authState => {
      this.authStateSnapshot = authState;
    });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  getLoggedInUserEmail(): string{
    if(this.authStateSnapshot?.email){
      return this.authStateSnapshot.email;
    }else{
      const storedUser = JSON.parse(localStorage.getItem('user')!);
      return storedUser?.email || '';
    }
  }
}
