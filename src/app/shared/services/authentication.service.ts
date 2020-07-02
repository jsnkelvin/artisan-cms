import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CacheService } from './cache.service';
import { GlobalService } from './global.service';
import { ApiService } from './core/api.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: User = null;
  allowed = false;

  constructor(
    private jwtHelper: JwtHelperService,
    private cache: CacheService,
    private gs: GlobalService,
    private api: ApiService
  ) {}

  checkToken() {
    const token = this.cache.getToken();
    this.gs.log('token check', token);
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      const isExpired = this.jwtHelper.isTokenExpired(token);

      if (!isExpired) {
        this.cache.setCurrentUser(decoded, token);
        this.user = this.cache.currentUser;
        this.gs.log('not expired!');
      } else {
        this.cache.removeToken();
        this.gs.log('expired');
      }
    }
  }

  isAuthenticated(allowedRoles: any[] = []) {
    this.gs.log('cek allowed routing roles->', allowedRoles);
    return new Observable<boolean>((observer) => {
      const token = this.cache.getToken();
      if (token) {
        const decoded = this.jwtHelper.decodeToken(token);
        const isExpired = this.jwtHelper.isTokenExpired(token);

        if (!isExpired) {
          this.gs.log('not expired');
          this.cache.setCurrentUser(decoded, token);
          this.user = this.cache.currentUser;
          this.gs.log('check user -->', this.user);
          // HANDLE USER ROLE HERE IF ANY!
          // EXAMPLE:

          // this.allowed = allowedRoles
          //   ? allowedRoles[0] === "all"
          //     ? true
          //     : allowedRoles.includes(this.user.type)
          //   : false;
          // this.gs.log("this user role", this.user.type);
        } else {
          this.gs.log('expired');
          this.user = null;
          this.cache.removeCurrentUser();
          observer.next(false);
        }
      } else {
        this.gs.log('user not available');
        this.user = null;
        this.cache.removeCurrentUser();
        observer.next(false);
      }
    });
  }

  login(credentials: any): Observable<Response> {
    return this.api.postData('api_login_path', credentials).pipe(
      tap((res) => {
        const response = res.result;
        const token = response.token;
        const decoded = this.jwtHelper.decodeToken(token);
        this.cache.setCurrentUser(decoded, token);
      })
    );
  }

  logout() {
    this.cache.removeCurrentUser();
    this.cache.removeToken();
    this.checkToken();
  }
}
