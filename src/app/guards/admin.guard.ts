import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
      return this.validate();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> {
    return this.validate();
  }

  private validate(): Observable<boolean> {
    return this.authService.validateToken()
              .pipe(
                tap(({ roleId }) => {
                  if (roleId === 2) {
                    this.router.navigateByUrl('/dashboard');
                  }
                }),
                map(({ roleId }) => {
                  return (roleId !== 2);
                })
              );
  }
}
