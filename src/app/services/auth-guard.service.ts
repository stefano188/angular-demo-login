import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, 
    private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate route', route);
    console.log('canActivate state', state);
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(
        ['/login'], 
        { queryParams: { returnUrl: state.url } });
        return false;
    }
    return true;
  }
}
