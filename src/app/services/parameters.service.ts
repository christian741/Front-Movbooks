import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parameter } from '../models/parameter.model';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  dataChanges = new Subject<string>();

  private url = `${ environment.host }/parameters`;

  constructor(private http: HttpClient) { }

  getParameters(): Observable<Parameter[]> {
    return this.http.get<Parameter[]>(this.url)
                .pipe(
                  map((res: any) => res.data)
                );
  }

  getParameter(id: number): Observable<Parameter> {
    return this.http.get<Parameter>(`${ this.url }/${ id }`)
                .pipe(
                  map((res: any) => res.data)
                );
  }

  insertParamater(parameter: Parameter): Observable<any> {
    return this.http.post<any>(`${ this.url }`, parameter);
  }

  udpateParameter(id: number, parameter: Parameter): Observable<any> {
    return this.http.put<any>(`${ this.url }/${ id }`, parameter);
  }

  deleteParameter(id: number): Observable<any> {
    return this.http.delete<any>(`${ this.url }/${ id }`);
  }

  findByKey(key: string, id?: number): Observable<Parameter> {
    return this.http.get<Parameter>(`${ this.url }/findByKey?key=${ key }&id=${ id || '' }`)
                .pipe(
                  catchError(err => of(undefined)),
                  map((res: any) => res.data)
                );
  }
}

