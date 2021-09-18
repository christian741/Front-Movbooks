import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pqr } from '../models/pqr.model';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  dataChanges = new Subject<string>();

  private url = `${ environment.host }/pqrs`;

  constructor(private http: HttpClient) { }

  getPqrs(): Observable<Pqr[]> {
    return this.http.get<Pqr[]>(`${ this.url }`)
                .pipe(
                  catchError(err => of([])), // 401 UnAuthorize
                  map((res: any) => res.data)
                );
  }

  getPqr(id: number): Observable<Pqr> {
    return this.http.get<Pqr>(`${ this.url }/${ id }`)
                .pipe(
                  catchError(err => of(undefined)), // 401 UnAuthorize
                  map((res: any) => res.data)
                );
  }

  insertPqr(pqr: Pqr): Observable<Pqr> {
    return this.http.post<Pqr>(`${ this.url }`, pqr);
  }

  updatePqr(id: number, pqr: Pqr): Observable<any> {
    return this.http.put(`${ this.url }/${ id }`, pqr);
  }

  deletePqr(id: number): Observable<any> {
    return this.http.delete(`${ this.url }/${ id }`);
  }

  getPqrsByUser(userId: number): Observable<Pqr[]> {
    return this.http.get<Pqr[]>(`${ this.url }?userId=${ userId }`)
                .pipe(
                  catchError(err => of([])),
                  map((res: any) => res.data)
                );
  }
}
