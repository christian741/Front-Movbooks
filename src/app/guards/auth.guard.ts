import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> {
    return this.validate();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
      return this.validate();
  }

  private validate(): Observable<boolean> {
    return this.authService.validateToken()
          .pipe(
            tap(user => {
              if (!user) {
                this.router.navigateByUrl('/login');
              }
            }),
            map(user => {
              return (user !== undefined);
            })
          );
  }

}
