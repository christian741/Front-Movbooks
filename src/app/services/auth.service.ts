import { UserLogin } from './../models/userLogin.model';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${ environment.host }/account`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) { }

  login(login: UserLogin): Observable<any> {
    return this.http.post(`${ this.url }/login`, login)
              .pipe(
                tap(async (resp: any) => {
                  await this.storage.set(environment.tokenName, resp.token);
                  await this.storage.set('user', resp.userDetails);
                })
              );
  }

  register(user: User): Observable<any> {
    user.enabled = true;
    return this.http.post(`${ this.url }/register`, user)
              .pipe(
                tap(async (resp: any) => {
                  await this.storage.set(environment.tokenName, resp.token);
                  await this.storage.set('user', resp.userDetails);
                })
              );
  }

  validateToken(): Observable<User>{
    return this.http.get(`${ this.url }`).pipe(
      retry(2),
      catchError(err => { // 401 Unauthorized
        return of(undefined);
      })
    );
  }

  updateToken(user: User): Observable<any> {
    // Renovar el token
    return this.http.post(`${ this.url }/login`, user) // aunque solo se usará el email y password
    .pipe(
      tap(async (resp: any) => {
        await this.storage.set(environment.tokenName, resp.token);
        await this.storage.set('user', resp.userDetails);
      })
    );
  }

  getCurrentUserAsync(): Promise<any> {
    return this.storage.get('user');
  }

  async logOut() {
    await this.storage.remove(environment.tokenName);
    this.router.navigateByUrl('/login');
  }
}
