import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email: string = '';
  authState$: Observable<User | null>;
  private authStateSnapshot: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    this.authState$ = authState(this.auth);

    this.authState$.subscribe(authState => {
      this.authStateSnapshot = authState;
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  isUserLoggedIn(): Observable<User | null> {
    return authState(this.auth);
  }

  logout() {
    return signOut(this.auth);
  }

  getLoggedInUserEmail(): string {
    if (this.authStateSnapshot?.email) {
      return this.authStateSnapshot.email;
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user')!);
      return storedUser?.email || '';
    }
  }
}
