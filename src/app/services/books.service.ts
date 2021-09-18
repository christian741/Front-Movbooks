import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Book } from '../models/book.model';
import { catchError, map, retry } from 'rxjs/operators';
import { BookFilter } from '../query-filters/book.filter';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private url = `${ environment.host }/books`;
  dataChanges = new Subject<string>();

  constructor(private http: HttpClient) { }

  getBooks(filter: BookFilter): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageSize', filter.pageSize.toString());
    params = params.append('pageNumber', filter.pageNumber.toString());
    params = params.append('title', filter.title || '');
    params = params.append('aggregated', filter.aggregated.toString());

    return this.http.get(`${ this.url }`, { params });
  }

  getBookDetails(title: string): Observable<any> {
    return this.http.get<any>(`${ environment.googleBooksApi }/volumes?q=${ title }`)
                .pipe(
                  retry(2),
                  map(results => {
                    if (results.totalItems !== 0) {
                      console.log(results.results.items[0]);
                      return results.items[0];
                    } else {
                      return undefined;
                    }
                  }),
                  catchError(err => undefined)
                );
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${ this.url }/${ id }`)
                  .pipe(
                    catchError(err => of(undefined)), // 401 UnAuthorize
                    map((res: any) => res?.data)
                  );
  }

  insertBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${ this.url }`, book);
  }

  updateBook(id: number, book: Book): Observable<any> {
    return this.http.put(`${ this.url }/${ id }`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${ this.url }/${ id }`);
  }

  findByTitle(id: number, title: string): Observable<Book> {
    return this.http.get<Book>(`${ this.url }/findByTitle?id=${ id || '' }&title=${ title }`)
                    .pipe(
                      map((res: any) => res.data)
                    );
  }
}

