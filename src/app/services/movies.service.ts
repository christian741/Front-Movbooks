import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { catchError, map, retry } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MovieFilter } from '../query-filters/movie.filter';

const paramsUrl = 'language=es&include_image_language=es&api_key=' + environment.tmdbApiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = `${ environment.host }/movies`;
  dataChanges = new Subject<string>();

  constructor(private http: HttpClient) { }

  getMovies(filters: MovieFilter): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageSize', filters.pageSize.toString());
    params = params.append('pageNumber', filters.pageNumber.toString());
    params = params.append('title', filters.title);
    params = params.append('aggregated', filters.aggregated.toString());

    return this.http.get(`${ this.url }`, { params });
  }

  getMovieDetails(title: string): Observable<any> {
    return this.http.get<any>(`${ environment.tmdbApi }/search/movie?${ paramsUrl }&query=${ title }`)
                .pipe(
                  retry(2),
                  map(resp => {
                    if (resp.total_results !== 0) {
                      console.log(resp.results[0]);
                      return resp.results[0];
                    } else {
                      return undefined;
                    }
                  }),
                  catchError(err => undefined)
                );
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${ this.url }/${ id }`)
                  .pipe(
                    catchError(err => of(undefined)), // 401 UnAuthorize
                    map((res: any) => res?.data)
                  );
  }

  insertMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${ this.url }`, movie);
  }

  updateMovie(id: number, movie: Movie): Observable<any> {
    return this.http.put(`${ this.url }/${ id }`, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${ this.url }/${ id }`);
  }

  findByTitle(id: number, title: string): Observable<Movie> {
    return this.http.get<Movie>(`${ this.url }/findByTitle?id=${ id || '' }&title=${ title }`)
              .pipe(
                map((res: any) => res.data)
              );
  }
}
