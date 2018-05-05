import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthGoogleService } from '../../authentication/services/auth-google.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userAuthenticated: boolean;
  subscription: Subscription;

  constructor(  public authService: AuthGoogleService,
                public router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated();
    this.subscription = this.authService.authObser.subscribe( result => {
      this.userAuthenticated = result;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
    localStorage.removeItem('currentUser');
  }

}
