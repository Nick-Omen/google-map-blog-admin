import { Injectable } from '@angular/core';
import { LocalStorage } from '../utils/LocalStorage';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginModel, LoginResponseModel } from './auth.models';

function getTokenPayload(token) {
  if (!token) {
    return null;
  }
  const [type, payload, secret] = token.split('.');

  return JSON.parse(atob(payload));
}

function tokenNotExpired(token) {
  const payload = getTokenPayload(token);
  if (!payload) {
    return false;
  }
  const date = moment.unix(payload.exp);
  return date.isAfter(moment());
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
              private http: HttpClient) {
  }

  public getToken(): string {
    return LocalStorage.getItem('token');
  }

  public getTokenType(): string {
    return LocalStorage.getItem('token_type') || 'Bearer';
  }

  public getAuthorizationToken(): string {
    const token = this.getToken();
    if (token === null) {
      return null;
    }
    return `${this.getTokenType()} ${token}`;
  }

  public isRemember(): boolean {
    return LocalStorage.getItem('is_remember') !== null;
  }

  public saveCredentials(data: LoginResponseModel) {
    LocalStorage.setItems(data);
  }

  public purgeCredentials() {
    LocalStorage.removeItems(['token', 'token_type', 'is_remember']);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    return tokenNotExpired(token);
  }

  public login(data: LoginModel) {
    return this.http.post('auth/obtain-token/', data);
  }

  public refreshOrPurgeToken() {
    if (this.isRemember()) {
      this.http.post('auth/refresh-token/', {})
        .pipe(
          catchError(e => {
            console.log(e);
            return Observable.create(o => o.next(null));
          })
        )
        .subscribe(d => {
          if (d === null) {
            this.logout();
          } else {
            console.log(d);
          }
        });
    }
  }

  public validateToken() {
    if (this.getAuthorizationToken() !== null) {
      this.http.post('auth/verify-token/', {})
        .pipe(
          catchError(() => {
            this.refreshOrPurgeToken();
            return Observable.create(o => o.next(null));
          })
        )
        .subscribe(res => {
          if (res === null) {
            this.refreshOrPurgeToken();
          }
        });
    } else {
      this.logout();
    }
  }

  public logout() {
    this.purgeCredentials();
  }
}
