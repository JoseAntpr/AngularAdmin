import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthorizedGuard implements CanActivate {

  id: number;
  user: User;

    constructor(public router: Router,
                public activatedRoute: ActivatedRoute,
                public userService: UserService) {
       this.activatedRoute.params.subscribe( params => {
        this.userService.getUser(params['id']).subscribe( (user: User) => {
          this.user = user;
        });
      });
    }

    canActivate(): boolean {
      if ( !this.user.own ) {
        this.router.navigate(['home']);
        return false;
      }
      return true;
    }
}
