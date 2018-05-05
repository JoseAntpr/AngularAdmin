import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthorizedGuard implements CanActivate {

  id: number;

    constructor(public router: Router,
                public userService: UserService,
                public snackBar: MatSnackBar) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      this.id = +route.paramMap.get('id');
       return this.userService.getUser(this.id).map( (user: User) => {

         if ( !user.own ) {
          this.router.navigate(['home']);
          this.snackBar.open(`You don´t have access to this page`, 'Close', {duration: 2000});
          return false;
        }
        return true;
       });
    }
}
