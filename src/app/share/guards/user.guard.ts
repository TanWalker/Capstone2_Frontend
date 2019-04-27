import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  public user: User = new User();
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // check for vendor
    if (this.authService.isLogined()) {
      return true;
    }

    // not a vendor in so redirect to login page with the return url
    this.router.navigate([''], { queryParams: { returnUrl: state.url } });
    // console.log('is');
    return false;
  }
}
