import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private storage: Storage) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // API´s books and movies
    if (req.url.includes(environment.tmdbApi) || req.url.includes(environment.googleBooksApi)){
      return next.handle(req);
    }
    // BlackListedRoutes
    if (environment.blacklistedRoutes.includes(req.url)){
      return next.handle(req);
    }
    // convert promise to observable using 'from' operator
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const token = await this.storage.get(environment.tokenName) || '';
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });
    // Important: Note the .toPromise()
    return next.handle(authReq).toPromise();
  }
}
