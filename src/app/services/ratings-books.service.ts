import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RatingBook } from '../models/rating-book.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RatingBookQueryFilter } from '../query-filters/rating-book.filter';

@Injectable({
  providedIn: 'root'
})
export class RatingsBooksService {

  private url = `${ environment.host }/ratingsBooks`;

  constructor(private http: HttpClient) { }

  getAll(filters: RatingBookQueryFilter): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageSize', filters.pageSize.toString());
    params = params.append('pageNumber', filters.pageNumber.toString());
    params = params.append('bookId', filters.bookId.toString());

    return this.http.get(`${ this.url }`, { params });
  }

  insert(data: RatingBook): Observable<RatingBook> {
    return this.http.post(`${ this.url }`, data)
                .pipe(map((res: any) => res.data));
  }

  update(data: RatingBook): Observable<any> {
    return this.http.put(`${ this.url }/${ data.id }`, data)
                .pipe(map((res: any) => res.data));
  }

  find(userId: number, bookId: number): Observable<RatingBook> {
    return this.http.get<RatingBook>(`${ this.url }/find?userId=${ userId }&bookId=${ bookId }`)
                  .pipe(
                    map((res: any) => res?.data),
                    catchError(err => of(undefined))
                  );
  }
}
