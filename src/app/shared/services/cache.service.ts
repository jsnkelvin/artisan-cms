import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private tokenKey = 'project_token_key_here';
  currentUser: any;

  constructor() {}

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    return sessionStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    return sessionStorage.removeItem(this.tokenKey);
  }

  setCurrentUser(data, token) {
    this.setToken(token);
    this.currentUser = data;
    this.currentUser.token = token;
  }

  removeCurrentUser() {
    this.currentUser = null;
    this.removeToken();
  }
}
