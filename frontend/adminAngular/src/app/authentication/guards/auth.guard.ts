import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public router: Router) {}
    canActivate(): boolean {
      if (!localStorage.getItem('currentUser')) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
}
