import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordRecovery } from '../models/password-recovery.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  private url = `${ environment.host }/passwordRecoveries`;

  constructor(private http: HttpClient) { }

  create(passwordRecovery: PasswordRecovery): Observable<any> {
    return this.http.post(`${ this.url }`, passwordRecovery);
  }

  find(token: string): Observable<any> {
    return this.http.get(`${ this.url }/find?token=${ token }`)
                    .pipe(
                      map((res: any) => res?.data)
                    );
  }
}
