import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = `${ environment.host }/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${ this.url }`)
                  .pipe(
                    map((res: any) => {
                      const users = res.data;
                      return users.filter((x: User) => x.roleId !== 2);
                    }),
                    catchError(err => of([])) // 401 Unauthorize
                  );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${ this.url }/${ id }`)
                .pipe(
                  catchError(err => of(undefined)), // Not Found
                  map((res: any) => res.data)
                );
  }

  update(user: User): Observable<any> {
    return this.http.put(`${ this.url }/${ user.id }`, user);
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${ this.url }/findByEmail?email=${ email }`)
                    .pipe(
                      catchError(err => of(undefined)), // 404 Not found - No existe un usuario con el email
                      map((res: any) => res?.data)
                    );
  }

  findByNickname(nickname: string): Observable<User> {
    return this.http.get<User>(`${ this.url }/findByNickname?nickname=${ nickname }`)
                    .pipe(
                      catchError(err => of(undefined)), // 404 Not found - No existe un usuario con el nickname
                      map((res: any) => res?.data)
                    );
  }
}
