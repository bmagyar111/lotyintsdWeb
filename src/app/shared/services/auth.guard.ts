import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_SERVICE } from './auth.service.token'; // <<< ÚJ: token import!

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  private authService = inject(AUTH_SERVICE); // <<< itt injection tokennel szúrjuk be
  private router = inject(Router); // Angular 16+ rövidebb inject

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.authState$.pipe(
      map(user => {
        return user ? true : this.router.createUrlTree(['/login']);
      })
    );
  }
}
