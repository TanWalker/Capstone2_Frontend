import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn: 'root'
  })
export class UserGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

          // check for vendor
          if (this.authService.isLogined()) {
            return true;
          }

          // not a vendor in so redirect to login page with the return url
         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
      }
}
