import { Injectable } from '@angular/core';
import { canActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements canActivate {
  constructor(private authService: LoginService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.authService.isAuthenticated()) {
      return true;
    }
  }
}