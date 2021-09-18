import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gender } from '../models/gender.model';
import { catchError, map, retry } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { environment } from '../../environments/environment.prod';
import {  GenderFilter } from '../query-filters/gender.filter';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private url = `${ environment.host }/gender`;
  dataChanges = new Subject<string>();
  constructor(private http: HttpClient) { }
  
  getGenders(filters: GenderFilter): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageSize', filters.pageSize.toString());
    params = params.append('pageNumber', filters.pageNumber.toString());
    params = params.append('title', filters.Name);
  
    return this.http.get(`${ this.url }`, { params });
  }

  
  getGender(id: number): Observable<Gender> {
    return this.http.get<Gender>(`${ this.url }/${ id }`)
                  .pipe(
                    catchError(err => of(undefined)), // 401 UnAuthorize
                    map((res: any) => res?.data)
                  );
  }

  insertGender(movie: Gender): Observable<Gender> {
    return this.http.post<Gender>(`${ this.url }`, movie);
  }

  updateGender(id: number, gender: Gender): Observable<any> {
    return this.http.put(`${ this.url }/${ id }`, gender);
  }

  deleteGender(id: number): Observable<any> {
    return this.http.delete(`${ this.url }/${ id }`);
  }

  
}
