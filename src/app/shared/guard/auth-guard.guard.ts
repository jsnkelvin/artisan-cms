import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private as: AuthenticationService, private router: Router, private gs: GlobalService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>((observer) => {
      const role = next.data.roles;
      this.gs.log('ROLE FROM GUARD -->', role);
      this.as.isAuthenticated(role).subscribe((exists) => {
        if (exists) {
          return observer.next(true);
        } else {
          // HANDLE CONDITION IF NOT LOGGED IN HERE & RETURN OBSERVER FALSE
          return observer.next(false);
        }
      });
    });
  }
}
