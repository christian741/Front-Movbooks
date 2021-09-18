import { RatingMovie } from '../models/rating-movie.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { RatingMovieQueryFilter } from '../query-filters/rating-movie.filter';

@Injectable({
  providedIn: 'root'
})
export class RatingsMoviesService {

  private url = `${ environment.host }/ratingsMovies`;

  constructor(private http: HttpClient) { }

  getAll(filters: RatingMovieQueryFilter): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageSize', filters.pageSize.toString());
    params = params.append('pageNumber', filters.pageNumber.toString());
    params = params.append('movieId', filters.movieId.toString());

    return this.http.get(`${ this.url }`, { params });
  }

  insert(data: RatingMovie): Observable<RatingMovie> {
    return this.http.post(`${ this.url }`, data)
                .pipe(map((res: any) => res.data));
  }

  update(data: RatingMovie): Observable<any> {
    return this.http.put(`${ this.url }/${ data.id }`, data)
                .pipe(map((res: any) => res.data));
  }

  find(userId: number, movieId: number): Observable<RatingMovie> {
    return this.http.get<RatingMovie>(`${ this.url }/find?userId=${ userId }&movieId=${ movieId }`)
                  .pipe(
                    map((res: any) => res?.data),
                    catchError(err => of(undefined))
                  );
  }
}
